"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AniChatMessage, AniStreamEvent } from "@/lib/ani-coze-config";

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useAniChatStream({
  userId,
  onAssistantComplete,
}: {
  userId: string;
  onAssistantComplete?: (content: string) => void;
}) {
  const [messages, setMessages] = useState<AniChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "叮咚！学院小狐狸 Ain AI 前来报到～\n专门帮大家梳理跨学科创作、攻克毕业设计难题✨\n如果你正苦恼选题、缺少创作灵感，我可以带你浏览学院往届优秀毕业创作案例，快速打开创作思路，需要我为你展示相关案例参考吗？",
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [mode, setMode] = useState<"coze" | "mock" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
    setMessages((prev) =>
      prev.map((item) => (item.streaming ? { ...item, streaming: false } : item)),
    );
  }, []);

  useEffect(() => () => stopStreaming(), [stopStreaming]);

  const resetChat = useCallback(() => {
    stopStreaming();
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "叮咚！学院小狐狸 Ain AI 前来报到～\n专门帮大家梳理跨学科创作、攻克毕业设计难题✨\n如果你正苦恼选题、缺少创作灵感，我可以带你浏览学院往届优秀毕业创作案例，快速打开创作思路，需要我为你展示相关案例参考吗？",
      },
    ]);
    setInput("");
    setError(null);
    setMode(null);
  }, [stopStreaming]);

  const sendMessage = useCallback(async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || isStreaming) return;

    setError(null);
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

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: assistantId, role: "assistant", content: "", streaming: true },
    ]);
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

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

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";

        for (const raw of events) {
          const line = raw
            .split("\n")
            .find((item) => item.startsWith("data:"))
            ?.slice(5)
            .trim();
          if (!line) continue;

          let event: AniStreamEvent;
          try {
            event = JSON.parse(line) as AniStreamEvent;
          } catch {
            continue;
          }

          if (event.type === "meta") {
            setMode(event.mode);
          } else if (event.type === "delta") {
            assistantText += event.content;
            setMessages((prev) =>
              prev.map((item) =>
                item.id === assistantId
                  ? { ...item, content: assistantText, streaming: true }
                  : item,
              ),
            );
          } else if (event.type === "error") {
            setError(event.message);
          }
        }
      }

      setMessages((prev) =>
        prev.map((item) =>
          item.id === assistantId
            ? { ...item, content: assistantText || "（无回复内容）", streaming: false }
            : item,
        ),
      );
      if (assistantText) onAssistantComplete?.(assistantText);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      const message = err instanceof Error ? err.message : "发送失败";
      setError(message);
      setMessages((prev) => prev.filter((item) => item.id !== assistantId));
    } finally {
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
    sendMessage,
    stopStreaming,
    resetChat,
  };
}
