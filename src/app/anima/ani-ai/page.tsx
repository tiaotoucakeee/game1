import { redirect } from "next/navigation";

/** 旧入口已合并至学院新闻页 */
export default function AniAiRedirectPage() {
  redirect("/anima/news/ani-ai-launch");
}
