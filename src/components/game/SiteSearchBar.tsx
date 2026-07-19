"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { isChengYeSearch } from "@/data/game";
import { useGame } from "@/lib/game-state";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

export function SiteSearchBar({
  defaultValue = "",
  variant = "page",
}: {
  defaultValue?: string;
  variant?: "page" | "nav";
}) {
  const router = useRouter();
  const { setSearchedChengYe } = useGame();
  const [q, setQ] = useState(defaultValue);

  useEffect(() => {
    setQ(defaultValue);
  }, [defaultValue]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = q.trim();
    if (isChengYeSearch(trimmed)) {
      setSearchedChengYe(true);
    }
    router.push(`/anima/search?q=${encodeURIComponent(trimmed)}`);
  }

  if (variant === "nav") {
    return (
      <Link href="/anima/search" className="nav-search-trigger" aria-label="全站搜索">
        <SearchIcon className="nav-search-icon" />
      </Link>
    );
  }

  return (
    <form onSubmit={onSubmit} className="search-page-bar">
      <div className="search-page-bar-inner">
        <SearchIcon className="search-page-bar-icon" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="输入搜索关键词"
          aria-label="全站搜索"
          className="search-page-bar-input"
          autoFocus
        />
      </div>
    </form>
  );
}
