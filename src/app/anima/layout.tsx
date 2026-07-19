import { Navigation } from "@/components/cuc-anima/Navigation";
import "@/styles/cuc-anima-home-news.css";
import "@/styles/cuc-anima-social.css";

export default function AnimaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <div className="pt-[96px]">{children}</div>
    </>
  );
}
