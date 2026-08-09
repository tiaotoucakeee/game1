import type { Metadata } from "next";
import { PAGE_TITLES } from "@/lib/page-titles";

export const metadata: Metadata = {
  title: PAGE_TITLES.student.project,
};

export default function StudentProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
