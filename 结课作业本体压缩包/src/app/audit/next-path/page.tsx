"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { hasAllCoreClues } from "@/data/game";
import {
  NEXT_PATH_INITIAL_DELAY_MS,
  NEXT_PATH_REVEAL_INTERVAL_MS,
  NEXT_PATH_SEGMENTS,
  type NextPathSegment,
} from "@/data/audit-next-path-ending";
import { isAuditEmbedContext, navigateAuditFullscreen } from "@/lib/audit-embed";
import { useGame } from "@/lib/game-state";

function NextPathSegmentView({
  segment,
  visible,
}: {
  segment: NextPathSegment;
  visible: boolean;
}) {
  const className = `audit-truth-ending__line${visible ? " is-visible" : ""}`;

  switch (segment.kind) {
    case "label":
      return <p className={`audit-truth-ending__label ${className}`}>{segment.text}</p>;
    case "title":
      return <h1 className={`audit-truth-ending__title ${className}`}>{segment.text}</h1>;
    case "paragraph":
      return (
        <p
          className={`audit-truth-ending__paragraph${segment.epilogue ? " audit-truth-ending__paragraph--epilogue" : ""} ${className}`}
        >
          {segment.text}
        </p>
      );
    case "system":
      return (
        <div className={`audit-truth-ending__system ${className}`} role="status">
          {segment.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      );
    case "note":
      return (
        <p
          className={`audit-truth-ending__note${segment.accent ? " audit-truth-ending__note--accent" : ""} ${className}`}
        >
          {segment.text}
        </p>
      );
    case "chat":
      return (
        <div className={`audit-truth-ending__chat ${className}`}>
          {segment.messages.map((message) => (
            <p key={`${message.speaker}-${message.text}`} className="audit-truth-ending__chat-line">
              <span className="audit-truth-ending__chat-speaker">{message.speaker}：</span>
              <span className="audit-truth-ending__chat-text">「{message.text}」</span>
            </p>
          ))}
        </div>
      );
  }
}

function StrollLink({ visible, onGo }: { visible: boolean; onGo: () => void }) {
  return (
    <button
      type="button"
      className={`audit-truth-stroll${visible ? " is-visible" : ""}`}
      aria-label="Stroll"
      onClick={onGo}
    >
      <span className="audit-truth-stroll__arrow" aria-hidden>
        <svg width="40" height="28" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 8L20 22L34 8" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path d="M6 12L20 26L34 12" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
      </span>
      <span className="audit-truth-stroll__label">Stroll</span>
    </button>
  );
}

export default function AuditNextPathPage() {
  const { ending, clues, hasClue, auditTerminalUnlocked } = useGame();
  const [visibleCount, setVisibleCount] = useState(0);
  const scrollRootRef = useRef<HTMLDivElement>(null);
  const navigatedRef = useRef(false);

  const segments = NEXT_PATH_SEGMENTS;
  const strollReady = visibleCount >= segments.length - 1;
  const coreComplete = hasAllCoreClues(clues);
  const codeReady = hasClue("open_path_code");
  const allowed = ending === "next_path" && auditTerminalUnlocked && coreComplete && codeReady;

  const goStroll = useCallback(() => {
    if (navigatedRef.current || !strollReady) return;
    navigatedRef.current = true;
    navigateAuditFullscreen("/audit/stroll");
  }, [strollReady]);

  useEffect(() => {
    if (isAuditEmbedContext() && window.self !== window.top) {
      window.top!.location.href = "/audit/next-path";
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("audit-truth-fullscreen");
    document.body.classList.add("audit-truth-fullscreen");
    return () => {
      document.documentElement.classList.remove("audit-truth-fullscreen");
      document.body.classList.remove("audit-truth-fullscreen");
    };
  }, []);

  useEffect(() => {
    if (!allowed) {
      navigateAuditFullscreen("/audit/submit");
    }
  }, [allowed]);

  useEffect(() => {
    if (!allowed || visibleCount >= segments.length) return;

    const delay = visibleCount === 0 ? NEXT_PATH_INITIAL_DELAY_MS : NEXT_PATH_REVEAL_INTERVAL_MS;
    const timer = window.setTimeout(() => {
      setVisibleCount((count) => count + 1);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [allowed, visibleCount, segments.length]);

  useEffect(() => {
    const el = scrollRootRef.current;
    if (!el || !strollReady) return;
    const scrollEl = el;

    function atBottom() {
      return scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 24;
    }

    function onWheel(e: WheelEvent) {
      if (!atBottom() || e.deltaY <= 0) return;
      e.preventDefault();
      goStroll();
    }

    let touchStartY = 0;

    function onTouchStart(e: TouchEvent) {
      touchStartY = e.changedTouches[0]?.clientY ?? 0;
    }

    function onTouchEnd(e: TouchEvent) {
      if (!atBottom()) return;
      const touchEndY = e.changedTouches[0]?.clientY ?? touchStartY;
      if (touchStartY - touchEndY > 36) {
        goStroll();
      }
    }

    scrollEl.addEventListener("wheel", onWheel, { passive: false });
    scrollEl.addEventListener("touchstart", onTouchStart, { passive: true });
    scrollEl.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      scrollEl.removeEventListener("wheel", onWheel);
      scrollEl.removeEventListener("touchstart", onTouchStart);
      scrollEl.removeEventListener("touchend", onTouchEnd);
    };
  }, [goStroll, strollReady]);

  if (!allowed) return null;

  return (
    <div className="audit-truth-ending audit-truth-ending--next-path" ref={scrollRootRef}>
      <div className="audit-truth-ending__story">
        <div className="audit-truth-ending__inner">
          {segments.map((segment, index) => (
            <NextPathSegmentView
              key={`${segment.kind}-${index}`}
              segment={segment}
              visible={index < visibleCount}
            />
          ))}
        </div>
        <div className="audit-truth-ending__story-tail">
          <StrollLink visible={strollReady} onGo={goStroll} />
        </div>
      </div>
    </div>
  );
}
