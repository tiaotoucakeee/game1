import type { Metadata } from "next";
import { PAGE_TITLES } from "@/lib/page-titles";

export const metadata: Metadata = {
  title: PAGE_TITLES.student.courses,
};

export default function StudentCoursesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
