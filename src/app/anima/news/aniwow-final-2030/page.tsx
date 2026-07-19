import { AniwowFinalPageClient } from "@/components/cuc-anima/AniwowFinalPageClient";
import { aniwowFinal2030Page } from "@/data/cuc-anima-aniwow-final-2030";

export const metadata = { title: aniwowFinal2030Page.title };

export default function AniwowFinal2030Page() {
  return <AniwowFinalPageClient />;
}
