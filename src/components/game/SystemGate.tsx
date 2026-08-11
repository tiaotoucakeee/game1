"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuditEmbedContext } from "@/lib/audit-embed";
import { useGame } from "@/lib/game-state";

export function AuditGate({ children }: { children: React.ReactNode }) {
  const { auditLoggedIn, ready } = useGame();
  const router = useRouter();
  const embed = isAuditEmbedContext();

  useEffect(() => {
    if (!ready || embed) return;
    if (!auditLoggedIn) router.replace("/audit");
  }, [auditLoggedIn, ready, router, embed]);

  if (!ready || (!embed && !auditLoggedIn)) return null;
  return <>{children}</>;
}

export function StudentGate({ children }: { children: React.ReactNode }) {
  const { studentLoggedIn, ready } = useGame();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!studentLoggedIn) router.replace("/student");
  }, [studentLoggedIn, ready, router]);

  if (!ready || !studentLoggedIn) return null;
  return <>{children}</>;
}
