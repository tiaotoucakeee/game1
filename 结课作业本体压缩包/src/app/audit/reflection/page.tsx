"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PathSubmitReflection } from "@/components/audit/PathSubmitReflection";
import { hasAllCoreClues } from "@/data/game";
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

export default function AuditReflectionPage() {
  const router = useRouter();
  const { clues, auditTerminalUnlocked, setEnding, setArchiveDeleted, hasClue } = useGame();
  const coreComplete = hasAllCoreClues(clues);
  const hasRecruitCode = hasClue("open_path_code");

  useEffect(() => {
    if (isAuditEmbedContext() && window.self !== window.top) {
      window.top!.location.href = "/audit/reflection";
    }
  }, []);

  useEffect(() => {
    if (!auditTerminalUnlocked || !coreComplete) {
      router.replace("/audit/submit");
    }
  }, [auditTerminalUnlocked, coreComplete, router]);

  function finalizePathEnding() {
    if (hasRecruitCode) {
      navigateAuditFullscreen("/audit/path-invite");
      return;
    }
    setEnding("seen_path");
    persistEnding({ ending: "seen_path" });
    navigateAuditFullscreen("/audit/truth");
  }

  function finalizeRejectPathEnding() {
    setArchiveDeleted(true);
    setEnding("nonexistent");
    persistEnding({ ending: "nonexistent", archiveDeleted: true });
    navigateAuditFullscreen("/audit/delete");
  }

  if (!auditTerminalUnlocked || !coreComplete) {
    return null;
  }

  return (
    <PathSubmitReflection
      onAccept={finalizePathEnding}
      onReject={finalizeRejectPathEnding}
    />
  );
}
