import Image from "next/image";
import Link from "next/link";
import { siteAssets } from "@/data/cuc-anima";

export function HeroSection() {
  return (
    <section className="relative">
      <div className="relative flex h-[320px] items-center justify-center overflow-hidden md:h-[80vh]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={siteAssets.heroVideo} type="video/mp4" />
        </video>

        <a
          href="#welcome"
          className="absolute bottom-[60px] z-10 hidden h-[60px] w-[60px] items-center justify-center rounded-full bg-black/40 p-4 transition-colors hover:bg-black/60 md:flex"
        >
          <Image src={siteAssets.whiteArrow} alt="向下滚动" width={28} height={28} />
        </a>
      </div>
    </section>
  );
}

export function WelcomeSection() {
  return (
    <section
      id="welcome"
      className="relative overflow-hidden bg-cuc-red px-5 py-10 md:py-5"
    >
      <div className="relative z-[1] mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 md:flex-row">
        <h2 className="m-0 text-[28px] font-black leading-normal text-white md:text-[32px]">
          你好！动院
        </h2>
        <Link
          href="/anima/about"
          className="group relative inline-flex items-center overflow-hidden bg-white px-6 py-4 text-cuc-text"
        >
          <span className="relative z-10 flex items-center gap-2">
            学院简介
            <Image
              src={siteAssets.rightArrow}
              alt=""
              width={14}
              height={14}
              className="h-3.5 w-auto"
            />
          </span>
          <span className="absolute inset-y-0 left-0 z-0 w-0 origin-left bg-[#ddd] transition-all duration-300 group-hover:w-full" />
        </Link>
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-20">
        <Image
          src={siteAssets.logoBg}
          alt=""
          width={813}
          height={813}
          className="w-[813px] max-w-none"
        />
      </div>
    </section>
  );
}
