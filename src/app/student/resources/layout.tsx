import type { Metadata } from "next";
import { PAGE_TITLES } from "@/lib/page-titles";

export const metadata: Metadata = {
  title: PAGE_TITLES.student.resources,
};

export default function StudentResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
