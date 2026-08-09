"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ANI_CHAT_WELCOME,
  type AniChatMessage,
  type AniChatMode,
  type AniStreamEvent,
} from "@/lib/ani-coze-config";

const ANI_CHAT_STORAGE_KEY = "cuc-arg-ani-chat";
const STREAM_TIMEOUT_MS = 90_000;

type AniChatPersisted = {
  messages: AniChatMessage[];
  input: string;
};

let memoryCache: AniChatPersisted | null = null;

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createWelcomeMessage(): AniChatMessage {
  return { id: "welcome", role: "assistant", content: ANI_CHAT_WELCOME };
}

function sanitizeMessages(messages: unknown): AniChatMessage[] {
  if (!Array.isArray(messages) || messages.length === 0) {
    return [createWelcomeMessage()];
  }

  const cleaned = messages
    .filter(
      (item): item is AniChatMessage =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "role" in item &&
        "content" in item &&
        (item.role === "user" || item.role === "assistant"),
    )
    .map((item) => ({
      id: String(item.id),
      role: item.role,
      content: String(item.content),
      streaming: false,
    }))
    .filter((item) => item.content.trim() || item.id === "welcome");

  return cleaned.length ? cleaned : [createWelcomeMessage()];
}

function loadAniChat(): AniChatPersisted {
  if (typeof window === "undefined") {
    return { messages: [createWelcomeMessage()], input: "" };
  }

  if (memoryCache) return memoryCache;

  try {
    const raw = sessionStorage.getItem(ANI_CHAT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AniChatPersisted>;
      memoryCache = {
        messages: sanitizeMessages(parsed.messages),
        input: typeof parsed.input === "string" ? parsed.input : "",
      };
      return memoryCache;
    }
  } catch {
    /* ignore corrupt cache */
  }

  memoryCache = { messages: [createWelcomeMessage()], input: "" };
  return memoryCache;
}

function saveAniChat(data: AniChatPersisted) {
  if (typeof window === "undefined") return;

  const payload: AniChatPersisted = {
    messages: data.messages.map((item) => ({
      id: item.id,
      role: item.role,
      content: item.content,
    })),
    input: data.input,
  };
  memoryCache = payload;

  try {
    sessionStorage.setItem(ANI_CHAT_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore quota errors */
  }
}

export function useAniChatStream({
  userId,
  onAssistantComplete,
}: {
  userId: string;
  onAssistantComplete?: (content: string) => void;
}) {
  const [messages, setMessages] = useState<AniChatMessage[]>([createWelcomeMessage()]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [mode, setMode] = useState<AniChatMode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef("");
  const hydratedRef = useRef(false);
  const [isHydrated, setIsHydrated] = useState(false);

  inputRef.current = input;

  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    const saved = loadAniChat();
    setMessages(saved.messages);
    setInput(saved.input);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydratedRef.current || isStreaming) return;
    saveAniChat({ messages, input });
  }, [messages, input, isStreaming]);

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
    setMessages((prev) => {
      const next = prev.map((item) => (item.streaming ? { ...item, streaming: false } : item));
      saveAniChat({ messages: next, input: inputRef.current });
      return next;
    });
  }, []);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const resetChat = useCallback(() => {
    stopStreaming();
    const fresh = [createWelcomeMessage()];
    setMessages(fresh);
    setInput("");
    setError(null);
    setMode(null);
    saveAniChat({ messages: fresh, input: "" });
  }, [stopStreaming]);

  const sendMessage = useCallback(async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || isStreaming) return;

    setError(null);
    const nextInput = overrideText ? input : "";
    if (!overrideText) setInput("");

    const userMessage: AniChatMessage = {
      id: createId(),
      role: "user",
      content: text,
    };
    const assistantId = createId();

    const history = [...messages, userMessage]
      .filter((item) => item.id !== "welcome")
      .map((item) => ({ role: item.role, content: item.content }));

    setMessages((prev) => {
      const next = [
        ...prev,
        userMessage,
        { id: assistantId, role: "assistant" as const, content: "", streaming: true },
      ];
      saveAniChat({ messages: next, input: nextInput });
      return next;
    });
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;
    const timeoutId = window.setTimeout(() => controller.abort(), STREAM_TIMEOUT_MS);

    const processSseBuffer = (chunk: string, onEvent: (event: AniStreamEvent) => boolean) => {
      const parts = chunk.split("\n\n");
      const rest = parts.pop() ?? "";
      for (const raw of parts) {
        const line = raw
          .split("\n")
          .find((item) => item.startsWith("data:"))
          ?.slice(5)
          .trim();
        if (!line) continue;

        try {
          const event = JSON.parse(line) as AniStreamEvent;
          if (onEvent(event)) return { rest, stop: true as const };
        } catch {
          /* ignore malformed chunks */
        }
      }
      return { rest, stop: false as const };
    };

    try {
      const response = await fetch("/api/ani/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, userId }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`对话请求失败 (${response.status})`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantText = "";
      let streamFailed = false;

      const handleEvent = (event: AniStreamEvent): boolean => {
        if (event.type === "meta") {
          setMode(event.mode);
          return false;
        }
        if (event.type === "delta") {
          assistantText += event.content;
          setMessages((prev) =>
            prev.map((item) =>
              item.id === assistantId
                ? { ...item, content: assistantText, streaming: true }
                : item,
            ),
          );
          return false;
        }
        if (event.type === "error") {
          streamFailed = true;
          setError(event.message);
          assistantText = assistantText || `对话出错：${event.message}`;
          return true;
        }
        return false;
      };

      while (true) {
        const { done, value } = await reader.read();
        if (value) {
          buffer += decoder.decode(value, { stream: true });
          const parsed = processSseBuffer(buffer, handleEvent);
          buffer = parsed.rest;
          if (parsed.stop) break;
        }
        if (done) break;
      }

      if (buffer.trim()) {
        processSseBuffer(`${buffer}\n\n`, handleEvent);
      }

      setMessages((prev) => {
        const next = prev.map((item) =>
          item.id === assistantId
            ? {
                ...item,
                content: assistantText || (streamFailed ? "对话出错，请稍后重试。" : "（无回复内容）"),
                streaming: false,
              }
            : item,
        );
        saveAniChat({ messages: next, input: nextInput });
        return next;
      });
      if (assistantText && !streamFailed) onAssistantComplete?.(assistantText);
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        setError("对话超时或已取消，请重试。");
        setMessages((prev) => {
          const next = prev.map((item) =>
            item.id === assistantId
              ? {
                  ...item,
                  content: item.content || "对话已中断，请重新发送。",
                  streaming: false,
                }
              : item,
          );
          saveAniChat({ messages: next, input: nextInput });
          return next;
        });
        return;
      }
      const message = err instanceof Error ? err.message : "发送失败";
      setError(message);
      setMessages((prev) => {
        const next = prev.filter((item) => item.id !== assistantId);
        saveAniChat({ messages: next, input: nextInput });
        return next;
      });
    } finally {
      window.clearTimeout(timeoutId);
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, [input, isStreaming, messages, onAssistantComplete, userId]);

  return {
    messages,
    input,
    setInput,
    isStreaming,
    mode,
    error,
    isHydrated,
    sendMessage,
    stopStreaming,
    resetChat,
  };
}
