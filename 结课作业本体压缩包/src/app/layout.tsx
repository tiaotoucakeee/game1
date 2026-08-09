import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { GameProvider } from "@/lib/game-state";
import "./globals.css";
import "@/styles/cuc-anima-nav.css";
import "@/styles/cuc-anima-search.css";
import "@/styles/cuc-anima-news-layout.css";
import "@/styles/cuc-anima-majors.css";
import "@/styles/cuc-anima-home-news.css";
import "@/styles/cuc-anima-social.css";
import "@/styles/cuc-anima-education-layout.css";
import "@/styles/cuc-anima-news-article.css";
import "@/styles/audit-sso-login.css";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-mulish",
});

export const metadata: Metadata = {
  title: {
    default: "CUC校内邮箱",
    template: "%s",
  },
  description: "交互叙事理论课程项目",
  icons: {
    icon: "/cuc-anima/images/favicon.png",
    apple: "/cuc-anima/images/webclip.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${mulish.variable} h-full antialiased`}>
      <body className="min-h-full bg-white font-sans text-cuc-text">
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
