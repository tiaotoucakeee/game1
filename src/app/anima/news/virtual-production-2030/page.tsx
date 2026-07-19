import { VirtualProductionPageClient } from "@/components/cuc-anima/VirtualProductionPageClient";
import { virtualProduction2030Page } from "@/data/cuc-anima-virtual-production-2030";

export const metadata = { title: virtualProduction2030Page.title };

export default function VirtualProduction2030Page() {
  return <VirtualProductionPageClient />;
}
