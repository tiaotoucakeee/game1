import type { Metadata } from "next";
import { PAGE_TITLES } from "@/lib/page-titles";

export const metadata: Metadata = {
  title: PAGE_TITLES.student.default,
};

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
