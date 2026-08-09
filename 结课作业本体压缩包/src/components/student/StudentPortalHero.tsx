"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { STUDENT_PORTAL_QUICK_LINKS } from "@/data/student-portal";

export function StudentPortalHero({
  searchAction = "local",
  isChengYe = false,
}: {
  searchAction?: "local" | "home";
  isChengYe?: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (searchAction === "home" && q) {
      router.push(`/student/home?q=${encodeURIComponent(q)}`);
      return;
    }
  }

  return (
    <section className="student-portal__hero">
      <div className="student-portal__hero-overlay" />
      <div className="student-portal__hero-inner">
        <div className="student-portal__hero-main">
          <h1 className="student-portal__hero-title">
            {isChengYe ? "欢迎你，创作者！" : "欢迎访问学生个人系统"}
          </h1>
          <form className="student-portal__search" onSubmit={handleSubmit}>
            <input
              className="student-portal__search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="请输入您要办理的事项"
              spellCheck={false}
            />
            <button type="submit" className="student-portal__search-btn">
              搜索
            </button>
          </form>
        </div>

        <aside className="student-portal__quick-panel">
          <h2 className="student-portal__quick-title">常用服务</h2>
          <ul className="student-portal__quick-list">
            {STUDENT_PORTAL_QUICK_LINKS.map((item) => (
              <li key={item.id}>
                {item.href && !item.disabled ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  <span className="is-muted">{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
