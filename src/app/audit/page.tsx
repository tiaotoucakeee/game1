import { AuditLoginPageClient } from "@/components/audit/AuditLoginPageClient";
import { PAGE_TITLES } from "@/lib/page-titles";

export const metadata = { title: PAGE_TITLES.audit.login };

export default function AuditLoginPage() {
  return <AuditLoginPageClient />;
}
