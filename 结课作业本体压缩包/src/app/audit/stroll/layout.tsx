import type { Metadata } from "next";
import { PAGE_TITLES } from "@/lib/page-titles";

export const metadata: Metadata = {
  title: PAGE_TITLES.audit.stroll,
};

export default function StrollLayout({ children }: { children: React.ReactNode }) {
  return children;
}
