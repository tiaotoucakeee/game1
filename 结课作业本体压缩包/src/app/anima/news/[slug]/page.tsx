"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { ClueTrigger } from "@/components/game/ClueTrigger";
import { NEWS_ARTICLES } from "@/data/game";

export default function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const article = NEWS_ARTICLES.find((n) => n.slug === slug);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (article) document.title = article.title;
  }, [article]);

  if (!article) notFound();

  const hasGlitch = article.winners.includes("程野");

  return (
    <div className="mx-auto max-w-[900px] px-5 py-12">
      {hasGlitch && <ClueTrigger id="project_award_anomaly" />}
      <Link href="/anima/news" className="text-sm text-cuc-blue hover:underline">
        ← 返回新闻列表
      </Link>
      <time className="mt-4 block text-sm text-cuc-muted">{article.date}</time>
      <h1 className="mt-2 text-2xl font-black leading-snug">{article.title}</h1>
      <p className="mt-6 leading-relaxed text-cuc-text">{article.excerpt}</p>

      {article.winners.length > 0 && (
        <section className="mt-10 rounded border border-cuc-border p-6">
          <h2 className="font-bold">获奖名单</h2>
          <ul className="mt-4 space-y-2">
            {article.winners.map((name) => (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => name !== "团队" && setGlitch(true)}
                  className={`text-left text-lg ${
                    glitch && name === "林澈"
                      ? "animate-pulse font-bold text-red-600"
                      : ""
                  } ${name === "程野" ? "font-bold" : ""}`}
                >
                  {glitch && name === "林澈" ? "程野" : name}
                  {name === "程野" && (
                    <span className="ml-2 text-xs text-cuc-muted">（点击其他名字可发现异常）</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
          {glitch && (
            <p className="mt-4 text-sm text-red-600">
              名单中的姓名与照片在多篇报道中不一致… 搜索「林澈」继续调查。
            </p>
          )}
          <ClueTrigger id="project_lin_che" />
        </section>
      )}

      <div className="mt-8">
        <Link href="/anima/search?q=林澈" className="text-cuc-blue underline">
          搜索：林澈
        </Link>
      </div>
    </div>
  );
}
