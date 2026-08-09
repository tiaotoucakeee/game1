import "@/styles/student-portal.css";
import { StudentPortalHomePage } from "@/components/student/StudentPortalHomeClient";

import { PAGE_TITLES } from "@/lib/page-titles";

export const metadata = { title: PAGE_TITLES.student.default };

export default function StudentHomePage() {
  return <StudentPortalHomePage />;
}
