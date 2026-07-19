import type { Metadata } from "next";
import { PAGE_TITLES } from "@/lib/page-titles";

export const metadata: Metadata = {
  title: PAGE_TITLES.audit.reflection,
};

export default function ReflectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
