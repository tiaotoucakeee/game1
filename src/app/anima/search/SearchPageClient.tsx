"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteSearchBar } from "@/components/game/SiteSearchBar";
import { isChengYeSearch, searchSite } from "@/data/game";
import { useGame } from "@/lib/game-state";
import { cn } from "@/lib/utils";

const GLITCH_CHARS = "█▓▒░▄▀■□◆◇";

function glitchKeyword(text: string, tick: number) {
  if (tick % 4 === 0) return text;
  return text
    .split("")
    .map((ch, i) => {
      if (ch === " " || (i + tick) % 3 !== 0) return ch;
      return GLITCH_CHARS[(i * 5 + tick) % GLITCH_CHARS.length];
    })
    .join("");
}

export default function SearchPageClient() {
  const pathname = usePathname();
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const result = searchSite(q);
  const { setSearchedChengYe, chengYeSearchCompleted } = useGame();
  const hasQuery = q.length > 0;
  const isForbidden = result === "scary";
  const [glitchTick, setGlitchTick] = useState(0);
  const [flashActive, setFlashActive] = useState(isForbidden);

  useEffect(() => {
    if (isChengYeSearch(q) && !chengYeSearchCompleted) {
      setSearchedChengYe(true);
    }
  }, [q, chengYeSearchCompleted, setSearchedChengYe]);

  useEffect(() => {
    if (isForbidden) {
      setFlashActive(true);
      document.body.classList.add("search-forbidden-mode");
      const timer = window.setTimeout(() => setFlashActive(false), 900);
      return () => {
        window.clearTimeout(timer);
        document.body.classList.remove("search-forbidden-mode");
      };
    }

    setFlashActive(false);
    document.body.classList.remove("search-forbidden-mode");
  }, [isForbidden]);

  useEffect(() => {
    return () => document.body.classList.remove("search-forbidden-mode");
  }, [pathname]);

  useEffect(() => {
    if (!isForbidden) return;
    const id = window.setInterval(() => setGlitchTick((n) => n + 1), 280);
    return () => window.clearInterval(id);
  }, [isForbidden]);

  if (isForbidden) {
    return (
      <div className="search-page search-page--forbidden">
        {flashActive ? <div className="search-forbidden-flash" aria-hidden /> : null}
        <div className="search-forbidden-noise" aria-hidden />
        <div className="search-forbidden-scanlines" aria-hidden />

        <div className="search-forbidden-inner">
          <Link href="/anima/search" className="search-forbidden-brand">
            <span className="search-forbidden-brand-mark">CUC Anima</span>
            <span className="search-forbidden-brand-label">全站搜索</span>
          </Link>

          <div className="search-forbidden-bar-wrap">
            <SiteSearchBar defaultValue={q} />
          </div>

          <p className="search-forbidden-query">
            关键词：
            <strong className="search-forbidden-query-text">
              {glitchKeyword(q, glitchTick)}
            </strong>
          </p>

          <div className="search-forbidden-panel">
            <div className="search-forbidden-panel__glow" aria-hidden />
            <p className="search-forbidden-title">「此文件已被禁止访问」</p>
            <p className="search-forbidden-code">undefined</p>
            <p className="search-forbidden-status">
              ERR_FORBIDDEN · PUBLIC_INDEX_MISS · REF=CYC-0000
            </p>
          </div>

          <div className="search-forbidden-copy">
            <p className="search-forbidden-hidden-text">
              关键词「{q}」在公开人物资料库中不存在任何匹配记录。该姓名未出现在学院公开报道与学籍公示中。
            </p>
            <p>请尝试在审核工作台内部系统查询相关档案。</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-page">
      <div className={cn("search-page-hero", hasQuery && "search-page-hero-compact")}>
        <div className="search-page-brand">
          <span className="search-page-brand-mark">CUC Anima</span>
          <span className="search-page-brand-label">全站搜索</span>
        </div>
        <div className="search-page-bar-wrap">
          <SiteSearchBar defaultValue={q} />
        </div>
      </div>

      {hasQuery && (
        <div className="search-page-body">
          <p className="search-page-meta">
            关键词：<strong>{q}</strong>
            {Array.isArray(result) && (
              <span>
                {" "}
                · 共 {result.length} 条结果
              </span>
            )}
          </p>

          {result === "empty" && (
            <div className="search-page-empty">
              <p className="search-page-empty-title">没有找到相关结果</p>
              <p className="search-page-empty-desc">
                与「{q}」匹配的公开资料为空。请尝试其他关键词，或检查是否有多余空格与符号。
              </p>
            </div>
          )}

          {Array.isArray(result) && result.length > 0 && (
            <ul className="search-page-results">
              {result.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="search-page-result-item">
                    <div className="search-page-result-title">{r.title}</div>
                    <div className="search-page-result-desc">{r.desc}</div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
