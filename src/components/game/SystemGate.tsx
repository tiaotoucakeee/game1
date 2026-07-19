"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuditEmbedContext } from "@/lib/audit-embed";
import { useGame } from "@/lib/game-state";

export function AuditGate({ children }: { children: React.ReactNode }) {
  const { auditLoggedIn } = useGame();
  const router = useRouter();
  const embed = isAuditEmbedContext();

  useEffect(() => {
    if (embed) return;
    if (!auditLoggedIn) router.replace("/audit");
  }, [auditLoggedIn, router, embed]);

  if (!embed && !auditLoggedIn) return null;
  return <>{children}</>;
}

export function StudentGate({ children }: { children: React.ReactNode }) {
  const { studentLoggedIn } = useGame();
  const router = useRouter();

  useEffect(() => {
    if (!studentLoggedIn) router.replace("/student");
  }, [studentLoggedIn, router]);

  if (!studentLoggedIn) return null;
  return <>{children}</>;
}
