import type { Metadata } from "next";
import {
  BilibiliSocialSection,
  FooterSection,
} from "@/components/cuc-anima/BilibiliSocialSection";
import { HeroSection, WelcomeSection } from "@/components/cuc-anima/HeroSection";
import { MajorsSection } from "@/components/cuc-anima/MajorsSection";
import { NewsSection } from "@/components/cuc-anima/NewsSection";

export const metadata: Metadata = {
  title: "欢迎来到中国传媒大学动画与数字艺术学院！",
  description: "中国传媒大学动画与数字艺术学院官方网站",
  icons: {
    icon: "/cuc-anima/images/favicon.png",
    apple: "/cuc-anima/images/webclip.png",
  },
};

export default function AnimaPage() {
  return (
    <>
      <main>
        <HeroSection />
        <WelcomeSection />
        <MajorsSection />
        <NewsSection />
        <BilibiliSocialSection />
      </main>
      <FooterSection />
    </>
  );
}
