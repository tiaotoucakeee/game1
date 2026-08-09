import { ShanhaiLampNewsPageClient } from "@/components/cuc-anima/ShanhaiLampNewsPageClient";
import { shanhaiLampGraduation2034Page } from "@/data/cuc-anima-shanhai-lamp-graduation-2034";

export const metadata = { title: shanhaiLampGraduation2034Page.title };

export default function ShanhaiLampGraduation2034Page() {
  return <ShanhaiLampNewsPageClient />;
}
