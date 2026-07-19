"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hasAllCoreClues } from "@/data/game";
import {
  PATH_INVITE_CODE,
  PATH_INVITE_HINT,
  PATH_INVITE_JOIN_LABEL,
  PATH_INVITE_LABEL,
  PATH_INVITE_TITLE,
  PATH_INVITE_TYPE_MS,
  PATH_INVITE_TYPE_START_MS,
} from "@/data/audit-path-invite";
import { isAuditEmbedContext, navigateAuditFullscreen } from "@/lib/audit-embed";
import { useGame } from "@/lib/game-state";

function persistEnding(patch: Record<string, unknown>) {
  try {
    const raw = localStorage.getItem("cuc-arg-game-state");
    if (raw) {
      const saved = JSON.parse(raw) as Record<string, unknown>;
      localStorage.setItem("cuc-arg-game-state", JSON.stringify({ ...saved, ...patch }));
    }
  } catch {
    /* ignore */
  }
}

export default function AuditPathInvitePage() {
  const router = useRouter();
  const { clues, hasClue, auditTerminalUnlocked, setEnding } = useGame();
  const [typed, setTyped] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [entered, setEntered] = useState(false);
  const coreComplete = hasAllCoreClues(clues);
  const codeReady = hasClue("open_path_code");

  useEffect(() => {
    if (isAuditEmbedContext() && window.self !== window.top) {
      window.top!.location.href = "/audit/path-invite";
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("audit-path-invite-fullscreen");
    document.body.classList.add("audit-path-invite-fullscreen");
    return () => {
      document.documentElement.classList.remove("audit-path-invite-fullscreen");
      document.body.classList.remove("audit-path-invite-fullscreen");
    };
  }, []);

  useEffect(() => {
    const enterTimer = window.setTimeout(() => setEntered(true), 100);
    return () => window.clearTimeout(enterTimer);
  }, []);

  useEffect(() => {
    if (!auditTerminalUnlocked || !coreComplete || !codeReady) {
      router.replace("/audit/submit");
    }
  }, [auditTerminalUnlocked, coreComplete, codeReady, router]);

  useEffect(() => {
    if (!auditTerminalUnlocked || !coreComplete || !codeReady) return;

    setTyped("");
    setTypingDone(false);

    let index = 0;
    let tick: number | null = null;
    const startTimer = window.setTimeout(() => {
      tick = window.setInterval(() => {
        index += 1;
        setTyped(PATH_INVITE_CODE.slice(0, index));
        if (index >= PATH_INVITE_CODE.length) {
          if (tick !== null) window.clearInterval(tick);
          window.setTimeout(() => setTypingDone(true), 480);
        }
      }, PATH_INVITE_TYPE_MS);
    }, PATH_INVITE_TYPE_START_MS);

    return () => {
      window.clearTimeout(startTimer);
      if (tick !== null) window.clearInterval(tick);
    };
  }, [auditTerminalUnlocked, coreComplete, codeReady]);

  function joinCreativePathTeam() {
    if (!typingDone) return;
    setEnding("next_path");
    persistEnding({ ending: "next_path" });
    navigateAuditFullscreen("/audit/next-path");
  }

  if (!auditTerminalUnlocked || !coreComplete || !codeReady) {
    return null;
  }

  return (
    <div className={`audit-path-invite${entered ? " is-entered" : ""}`}>
      <div className="audit-path-invite__grid" aria-hidden />
      <div className="audit-path-invite__shell">
        <header className="audit-path-invite__head">
          <p className="audit-path-invite__kicker">CYA · PATH CONTINUATION</p>
          <h1 className="audit-path-invite__title">{PATH_INVITE_TITLE}</h1>
          <p className="audit-path-invite__hint">{PATH_INVITE_HINT}</p>
        </header>

        <section className="audit-path-invite__panel" aria-labelledby="audit-path-invite-label">
          <p id="audit-path-invite-label" className="audit-path-invite__label">
            {PATH_INVITE_LABEL}
          </p>
          <div className="audit-path-invite__field" aria-live="polite">
            <span className="audit-path-invite__code">{typed}</span>
            {!typingDone ? <span className="audit-path-invite__cursor" aria-hidden /> : null}
          </div>
        </section>

        <button
          type="button"
          className={`audit-path-invite__join${typingDone ? " is-visible" : ""}`}
          disabled={!typingDone}
          onClick={joinCreativePathTeam}
        >
          {PATH_INVITE_JOIN_LABEL}
        </button>
      </div>
    </div>
  );
}
