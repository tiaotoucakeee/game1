import { AniwowAwardPageClient } from "@/components/cuc-anima/AniwowAwardPageClient";
import { aniwowAward2030Page } from "@/data/cuc-anima-aniwow-award-2030";

export const metadata = { title: aniwowAward2030Page.title };

export default function AniwowAward2030Page() {
  return <AniwowAwardPageClient />;
}
