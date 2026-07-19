import type { Metadata } from "next";
import { Mail163Entry } from "@/components/mail163/Mail163Entry";
import { PAGE_TITLES } from "@/lib/page-titles";

export const metadata: Metadata = {
  title: PAGE_TITLES.mail,
  description: "中国传媒大学校内邮箱",
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ profile?: string; mail?: string; skipIntro?: string }>;
}) {
  const params = await searchParams;
  return (
    <Mail163Entry
      initialView={params.profile ? "profile" : "inbox"}
      initialSelectedId={params.mail}
      skipIntro={params.skipIntro === "1"}
    />
  );
}
