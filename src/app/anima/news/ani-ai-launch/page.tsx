import { AniAiLaunchPageClient } from "@/components/cuc-anima/AniAiLaunchPageClient";
import { aniAiLaunch2030Page } from "@/data/cuc-anima-ani-ai-launch";

export const metadata = { title: aniAiLaunch2030Page.title };

export default function AniAiLaunchNewsPage() {
  return <AniAiLaunchPageClient />;
}
