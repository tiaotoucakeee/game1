import { Suspense } from "react";
import { Navigation } from "@/components/cuc-anima/Navigation";
import "@/styles/cuc-anima-home-news.css";
import "@/styles/cuc-anima-social.css";

export default function AnimaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<div className="cuc-anima-nav navigation h-[96px]" aria-hidden />}>
        <Navigation />
      </Suspense>
      <div className="pt-[96px]">{children}</div>
    </>
  );
}
