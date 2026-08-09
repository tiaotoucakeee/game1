"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { AuditTerminal } from "@/components/game/AuditTerminal";
import { AuditExpertFrame } from "@/components/audit/AuditExpertFrame";
import { AuditEmbedStyles } from "@/components/audit/AuditEmbedStyles";
import {
  isAuditFullscreenPath,
  useAuditEmbedContext,
} from "@/lib/audit-embed";
import { useGame } from "@/lib/game-state";

const STORAGE_KEY = "cuc-arg-game-state";
const SESSION_KEY = "audit-session-active";

function AuditEmbedSync({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.auditLoggedIn) sessionStorage.setItem(SESSION_KEY, "1");
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="audit-embed-root">
      <AuditEmbedStyles />
      {children}
    </div>
  );
}

function AuditLayoutShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { auditTerminalUnlocked, setAuditTerminalUnlocked, syncFromStorage } = useGame();
  const inEmbedContext = useAuditEmbedContext();
  const embed = searchParams.get("embed") === "1" || inEmbedContext;
  const isLogin = pathname === "/audit";
  const isFullscreen = isAuditFullscreenPath(pathname);
  const useWorkbench = !isFullscreen;

  useEffect(() => {
    if (!isFullscreen) return;
    if (typeof window !== "undefined" && window.self !== window.top) {
      window.top!.location.href = pathname;
    }
  }, [isFullscreen, pathname]);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== window.location.origin) return;
      const data = e.data as { type?: string };
      if (data?.type === "cuc-audit-terminal-unlocked") {
        setAuditTerminalUnlocked(true);
        return;
      }
      if (data?.type === "cuc-game-state-sync") syncFromStorage();
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [setAuditTerminalUnlocked, syncFromStorage]);

  if (embed && isFullscreen) {
    return null;
  }

  if (embed) {
    return <AuditEmbedSync>{children}</AuditEmbedSync>;
  }

  return (
    <>
      {useWorkbench ? <AuditExpertFrame /> : children}
      {!isLogin && !isFullscreen && auditTerminalUnlocked ? <AuditTerminal /> : null}
    </>
  );
}

export function AuditLayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <AuditLayoutShellInner>{children}</AuditLayoutShellInner>
    </Suspense>
  );
}
