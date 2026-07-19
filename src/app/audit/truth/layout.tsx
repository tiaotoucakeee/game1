import type { Metadata } from "next";
import { PAGE_TITLES } from "@/lib/page-titles";

export const metadata: Metadata = {
  title: PAGE_TITLES.audit.truth,
};

export default function TruthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
