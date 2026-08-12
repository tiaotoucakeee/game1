import type { Metadata } from "next";
import { StudentPortalSubpagesLayout } from "@/components/student/StudentPortalSubpagesLayout";
import { PAGE_TITLES } from "@/lib/page-titles";
import "@/styles/student-portal.css";

export const metadata: Metadata = {
  title: PAGE_TITLES.student.default,
};

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return <StudentPortalSubpagesLayout>{children}</StudentPortalSubpagesLayout>;
}
