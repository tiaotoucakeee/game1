"use client";

import { useEffect, useState } from "react";

const BOOT_DURATION_MS = 3200;

export function AuditTerminalBootOverlay({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    const holdTimer = window.setTimeout(() => setPhase("hold"), 420);
    const exitTimer = window.setTimeout(() => setPhase("exit"), 2600);
    const doneTimer = window.setTimeout(onComplete, BOOT_DURATION_MS);

    return () => {
      window.clearTimeout(holdTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`audit-terminal-boot${phase === "enter" ? " is-entering" : ""}${phase === "hold" ? " is-holding" : ""}${phase === "exit" ? " is-exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="AI辅助审核终端已启动"
    >
      <div className="audit-terminal-boot__scan" aria-hidden />
      <div className="audit-terminal-boot__panel">
        <div className="audit-terminal-boot__icon" aria-hidden>
          <span className="audit-terminal-boot__dot" />
          <span className="audit-terminal-boot__dot" />
          <span className="audit-terminal-boot__dot" />
        </div>
        <p className="audit-terminal-boot__title">AI辅助审核终端已启动</p>
        <p className="audit-terminal-boot__sub">系统正在接入核验模块…</p>
        <div className="audit-terminal-boot__bar" aria-hidden>
          <span className="audit-terminal-boot__bar-fill" />
        </div>
      </div>
    </div>
  );
}
