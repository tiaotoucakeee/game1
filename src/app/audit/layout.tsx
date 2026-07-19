import type { Metadata } from "next";
import "@/styles/audit-sso-login.css";
import "@/styles/audit-workbench.css";
import { AuditLayoutShell } from "@/components/audit/AuditLayoutShell";
import { PAGE_TITLES } from "@/lib/page-titles";

export const metadata: Metadata = {
  title: PAGE_TITLES.audit.default,
};

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <AuditLayoutShell>{children}</AuditLayoutShell>;
}
