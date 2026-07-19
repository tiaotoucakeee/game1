import { InnovationAwardPageClient } from "@/components/cuc-anima/InnovationAwardPageClient";
import { innovationAward2034Page } from "@/data/cuc-anima-innovation-award-2034";

export const metadata = { title: innovationAward2034Page.title };

export default function InnovationAward2034Page() {
  return <InnovationAwardPageClient />;
}
