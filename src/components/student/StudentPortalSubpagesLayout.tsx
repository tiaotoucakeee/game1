"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { StudentGate } from "@/components/game/SystemGate";
import { StudentPortalShell } from "@/components/student/StudentPortalShell";

const SUBPAGE_PREFIXES = [
  "/student/courses",
  "/student/team",
  "/student/resources",
  "/student/project",
] as const;

function isStudentSubpage(pathname: string): boolean {
  return SUBPAGE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function StudentPortalSubpagesLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (!isStudentSubpage(pathname)) {
    return children;
  }

  return (
    <StudentGate>
      <StudentPortalShell>{children}</StudentPortalShell>
    </StudentGate>
  );
}
