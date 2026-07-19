"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { ANI_CHAT_SUGGESTIONS } from "@/lib/ani-coze-config";
import { useAniChatStream } from "@/hooks/useAniChatStream";
import { OPEN_PATH_CODE, PLAYER } from "@/data/game";
import { useGame } from "@/lib/game-state";

export function AniChatSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { setAniChatComplete, addClue } = useGame();
  const listRef = useRef<HTMLDivElement>(null);
  const [codeUnlocked, setCodeUnlocked] = useState(false);

  const handleAssistantComplete = useCallback(
    (content: string) => {
      if (content.includes(OPEN_PATH_CODE)) {
        setAniChatComplete(true);
        addClue("open_path_code");
        setCodeUnlocked(true);
      }
    },
    [addClue, setAniChatComplete],
  );

  const { messages, input, setInput, isStreaming, mode, error, sendMessage, stopStreaming, resetChat } =
    useAniChatStream({
      userId: PLAYER.studentId,
      onAssistantComplete: handleAssistantComplete,
    });

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  const showSuggestions =
    messages.length === 1 && messages[0]?.id === "welcome" && !isStreaming;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    void sendMessage();
  }

  return (
    <aside
      className={`student-portal__ani-chat${open ? " is-open" : ""}`}
      aria-label="Ani AI 对话"
      aria-hidden={!open}
    >
      <header className="student-portal__ani-chat-head">
        <div className="student-portal__ani-chat-title">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/student/ani-fox-avatar.png"
            alt=""
            className="student-portal__ani-chat-avatar"
          />
          <div>
            <strong>Ani AI</strong>
            <span>{mode === "coze" ? "Coze 已连接" : "演示模式 · 流式输出"}</span>
          </div>
        </div>
        <div className="student-portal__ani-chat-head-actions">
          <button
            type="button"
            className="student-portal__ani-chat-icon-btn"
            onClick={() => resetChat()}
            aria-label="清空对话"
            title="清空对话"
            disabled={isStreaming}
          >
            <svg viewBox="0 0 24 24" aria-hidden className="student-portal__ani-chat-icon-svg">
              <path
                d="M6 7h12l-1 14H7L6 7zm3-3h6l1 2H8l1-2z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="student-portal__ani-chat-icon-btn is-close"
            onClick={onClose}
            aria-label="关闭对话"
            title="关闭"
          >
            ×
          </button>
        </div>
      </header>

      <div ref={listRef} className="student-portal__ani-chat-messages">
        {messages.map((message) => (
          <div key={message.id} className="student-portal__ani-chat-block">
            <div className={`student-portal__ani-chat-row is-${message.role}`}>
              {message.role === "assistant" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/student/ani-fox-avatar.png"
                  alt=""
                  className="student-portal__ani-chat-avatar is-small"
                />
              ) : null}
              <div
                className={`student-portal__ani-chat-bubble is-${message.role}${
                  message.streaming ? " is-streaming" : ""
                }`}
              >
                <p>{message.content || (message.streaming ? "Ani 正在输入…" : "")}</p>
              </div>
            </div>
            {message.id === "welcome" && showSuggestions ? (
              <div className="student-portal__ani-chat-suggestions">
                {ANI_CHAT_SUGGESTIONS.map((question) => (
                  <button
                    key={question}
                    type="button"
                    className="student-portal__ani-chat-suggestion"
                    disabled={isStreaming}
                    onClick={() => void sendMessage(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {error ? <p className="student-portal__ani-chat-error">{error}</p> : null}

      {codeUnlocked ? (
        <div className="student-portal__ani-chat-unlock">
          已获得隐藏代码。请完成审核调查后，前往{" "}
          <Link href="/audit/recruit">项目招募页</Link> 输入。
        </div>
      ) : null}

      <form className="student-portal__ani-chat-composer" onSubmit={handleSubmit}>
        <textarea
          className="student-portal__ani-chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入消息，Enter 发送，Shift+Enter 换行"
          rows={3}
          disabled={isStreaming}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void sendMessage();
            }
          }}
        />
        <div className="student-portal__ani-chat-actions">
          {isStreaming ? (
            <button type="button" className="student-portal__ani-chat-btn is-muted" onClick={stopStreaming}>
              停止
            </button>
          ) : null}
          <button
            type="submit"
            className="student-portal__ani-chat-btn is-primary"
            disabled={isStreaming || !input.trim()}
          >
            发送
          </button>
        </div>
      </form>
    </aside>
  );
}
