import { StudentLoginPageClient } from "@/components/student/StudentLoginPageClient";

import { PAGE_TITLES } from "@/lib/page-titles";

export const metadata = { title: PAGE_TITLES.student.login };

export default function StudentLoginPage() {
  return <StudentLoginPageClient />;
}
