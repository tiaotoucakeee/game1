"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "@/styles/cuc-anima-home-news.css";
import { CucButton } from "@/components/cuc-anima/CucButton";
import { siteAssets } from "@/data/cuc-anima";
import { siteNewsFeed } from "@/data/cuc-anima-news-page";
import { cn } from "@/lib/utils";

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 30" className={cn("h-5 w-5 fill-current", className)}>
      <path d="M22.5 15L7.5 22.5V7.5L22.5 15Z" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 30" className={cn("h-5 w-5 fill-current", className)}>
      <path d="M7.5 15L22.5 7.5V22.5L7.5 15Z" />
    </svg>
  );
}

function NewsCard({
  title,
  date,
  excerpt,
  image,
  href,
  external,
}: {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  href: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <div className="home-news-card-inner">
        <img
          src={image}
          alt=""
          className="home-news-card-img"
          loading="lazy"
          width={320}
          height={240}
        />
        <div className="home-news-card-body">
          <div className="home-news-card-copy">
            <h4 className="home-news-card-title">{title}</h4>
            <div className="home-news-card-date">{date}</div>
            <p className="home-news-card-excerpt">{excerpt}</p>
          </div>
          <div className="home-news-card-footer">
            <span className="home-news-card-underline" aria-hidden />
          </div>
        </div>
      </div>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="home-news-card mx-2.5 block"
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className="home-news-card mx-2.5 block">
      {inner}
    </Link>
  );
}

export function NewsSection() {
  return (
    <section className="home-news-section px-5 py-[60px] md:py-[100px]">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-8 lg:flex-row lg:items-center">
        <div className="min-w-[180px] shrink-0 lg:mr-[60px]">
          <div className="mb-4 flex items-center gap-2">
            <Image
              src={siteAssets.logoBgRed}
              alt=""
              width={64}
              height={64}
              className="h-14 w-14 shrink-0"
            />
            <h2 className="home-news-title m-0 text-[28px] font-black text-cuc-text md:text-[32px]">
              学院新闻
            </h2>
          </div>
          <CucButton href="/anima/news" variant="main" arrow="white" external={false}>
            所有新闻
          </CucButton>
        </div>

        <div className="relative min-w-0 flex-1">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".home-news-arrow-prev",
              nextEl: ".home-news-arrow-next",
              disabledClass: "is-disabled",
            }}
            slidesPerView={1}
            spaceBetween={10}
            grabCursor
            breakpoints={{
              767: { slidesPerView: 2, spaceBetween: 10 },
              992: { slidesPerView: 3, spaceBetween: 15 },
              1200: { slidesPerView: 3, spaceBetween: 20 },
            }}
            className="home-news-swiper !overflow-visible"
          >
            {siteNewsFeed.map((item) => (
              <SwiperSlide key={item.slug} className="!h-auto">
                <NewsCard {...item} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="home-news-arrows mt-6 flex justify-end gap-6 px-6">
            <button
              type="button"
              aria-label="上一条新闻"
              className="home-news-arrow home-news-arrow-prev"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              aria-label="下一条新闻"
              className="home-news-arrow home-news-arrow-next"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
