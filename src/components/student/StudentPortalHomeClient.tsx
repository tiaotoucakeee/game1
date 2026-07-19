"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ClueTrigger } from "@/components/game/ClueTrigger";
import { StudentGate } from "@/components/game/SystemGate";
import { AniChatSidebar } from "@/components/student/AniChatSidebar";
import { ChengYeMajorLabel } from "@/components/student/ChengYeMajorLabel";
import { CHENG_YE, PLAYER, PLAYER_PROFILE } from "@/data/game";
import {
  CHENG_YE_PORTAL_ANNOUNCEMENTS,
  CHENG_YE_PORTAL_MENU,
  CHENG_YE_PORTAL_MESSAGES,
  CHENG_YE_PORTAL_QUICK_LINKS,
} from "@/data/student-portal-cheng-ye";
import {
  STUDENT_PORTAL_ANNOUNCEMENTS,
  STUDENT_PORTAL_MENU,
  STUDENT_PORTAL_MESSAGES,
  STUDENT_PORTAL_QUICK_LINKS,
  type StudentPortalLink,
} from "@/data/student-portal";
import { useGame } from "@/lib/game-state";

function MonitorIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className="student-portal__menu-icon-svg">
      <rect x="8" y="10" width="32" height="22" rx="2" fill="currentColor" opacity="0.18" />
      <rect x="10" y="12" width="28" height="18" rx="1.5" fill="currentColor" />
      <path d="M20 36h8v2h-8z" fill="currentColor" opacity="0.55" />
      <path d="M16 38h16v2H16z" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

function PortalMenuItem({ item }: { item: StudentPortalLink }) {
  const content = (
    <>
      <span className="student-portal__menu-icon">
        <MonitorIcon />
      </span>
      <span className="student-portal__menu-label">{item.label}</span>
      {item.badge ? <span className="student-portal__menu-badge">{item.badge}</span> : null}
    </>
  );

  if (item.disabled || !item.href) {
    return (
      <div className="student-portal__menu-item is-disabled" title="暂未开放">
        {content}
      </div>
    );
  }

  if (item.external) {
    return (
      <a className="student-portal__menu-item" href={item.href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link className="student-portal__menu-item" href={item.href}>
      {content}
    </Link>
  );
}

function filterLinks(items: StudentPortalLink[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter(
    (item) =>
      item.label.toLowerCase().includes(q) ||
      item.keywords.some((word) => word.toLowerCase().includes(q)),
  );
}

function NoticeCard({
  title,
  items,
}: {
  title: string;
  items: Array<{ id: string; title: string; date: string; href?: string }>;
}) {
  return (
    <section className="student-portal__side-card">
      <header className="student-portal__side-head">
        <h2>{title}</h2>
        <span aria-hidden>›</span>
      </header>
      {items.length > 0 ? (
        <ul className="student-portal__notice-list">
          {items.map((msg) => (
            <li key={msg.id}>
              {msg.href ? (
                <Link href={msg.href}>
                  <span className="student-portal__notice-title">{msg.title}</span>
                  <time dateTime={msg.date}>{msg.date}</time>
                </Link>
              ) : (
                <>
                  <span className="student-portal__notice-title">{msg.title}</span>
                  <time dateTime={msg.date}>{msg.date}</time>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="student-portal__side-empty">暂无内容</p>
      )}
    </section>
  );
}

function ProfileCard({ isChengYe }: { isChengYe: boolean }) {
  return (
    <section className="student-portal__profile-card">
      <div className="student-portal__profile-row">
        <span>学号</span>
        <strong>{isChengYe ? CHENG_YE.studentId : PLAYER.studentId}</strong>
      </div>
      {isChengYe ? (
        <div className="student-portal__profile-row">
          <span>内部编号</span>
          <strong className="student-portal__cya-code">{CHENG_YE.internalId}</strong>
        </div>
      ) : null}
      <div className="student-portal__profile-row">
        <span>学院</span>
        <strong>{isChengYe ? CHENG_YE.profile.college : PLAYER_PROFILE.college}</strong>
      </div>
      <div className="student-portal__profile-row">
        <span>专业</span>
        {isChengYe ? <ChengYeMajorLabel /> : <strong>{PLAYER_PROFILE.major}</strong>}
      </div>
      {isChengYe ? (
        <div className="student-portal__profile-row">
          <span>毕业年份</span>
          <strong>{CHENG_YE.profile.graduationYear}</strong>
        </div>
      ) : null}
    </section>
  );
}

function StudentPortalHomeInner() {
  const searchParams = useSearchParams();
  const { setStudentLoggedIn, studentPersona } = useGame();
  const [query, setQuery] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  const isChengYe = studentPersona === "cheng_ye";
  const displayName = isChengYe ? CHENG_YE.name : PLAYER.name;
  const menuSource = isChengYe ? CHENG_YE_PORTAL_MENU : STUDENT_PORTAL_MENU;
  const quickSource = isChengYe ? CHENG_YE_PORTAL_QUICK_LINKS : STUDENT_PORTAL_QUICK_LINKS;
  const messages = isChengYe ? CHENG_YE_PORTAL_MESSAGES : STUDENT_PORTAL_MESSAGES;
  const announcements = isChengYe ? CHENG_YE_PORTAL_ANNOUNCEMENTS : STUDENT_PORTAL_ANNOUNCEMENTS;

  const menuItems = useMemo(() => filterLinks(menuSource, query), [menuSource, query]);
  const quickLinks = useMemo(() => filterLinks(quickSource, query), [quickSource, query]);

  useEffect(() => {
    if (searchParams.get("chat") === "ani") {
      setChatOpen(true);
    }
  }, [searchParams]);

  function handleLogout() {
    setStudentLoggedIn(false);
    window.location.href = "/student";
  }

  return (
    <div
      className={`student-portal${isChengYe ? " student-portal--cya" : ""}${chatOpen ? " is-chat-open" : ""}`}
    >
      {isChengYe ? <ClueTrigger id="cya_truth" /> : null}
      <div className="student-portal__content">
        <header className="student-portal__topbar">
          <div className="student-portal__topbar-inner">
            <Link href="/student/home" className="student-portal__brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  isChengYe
                    ? "/cuc-anima/images/cuc-anima-logo-white.svg"
                    : "/cuc-anima/images/cuc-anima-logo.svg"
                }
                alt="中国传媒大学"
                className="student-portal__brand-logo"
              />
              <div className="student-portal__brand-text">
                <strong>中国传媒大学</strong>
                <span>学生个人系统</span>
              </div>
            </Link>
            <div className="student-portal__topbar-actions">
              {isChengYe ? (
                <span className="student-portal__cya-tag">CYA-0000</span>
              ) : null}
              <span className="student-portal__topbar-link">中文</span>
              <button type="button" className="student-portal__user" onClick={handleLogout}>
                <span className="student-portal__avatar">{displayName.slice(0, 1)}</span>
                <span>{displayName}</span>
              </button>
            </div>
          </div>
        </header>

        <section className="student-portal__hero">
          <div className="student-portal__hero-overlay" />
          <div className="student-portal__hero-inner">
            <div className="student-portal__hero-main">
              <h1 className="student-portal__hero-title">
                {isChengYe ? "欢迎你，创作者！" : "欢迎访问学生个人系统"}
              </h1>
              {isChengYe ? (
                <p className="student-portal__hero-subtitle student-portal__hero-subtitle--cya">
                  Creative Yard Agent · Legacy v2030 · 跨媒介创作资源调度
                </p>
              ) : null}
              <form
                className="student-portal__search"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
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
                {quickSource.map((item) => (
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

        <main className="student-portal__main">
          <div className="student-portal__layout">
            <section className="student-portal__menu-panel">
              <div className="student-portal__tabs">
                <span className="student-portal__tab is-active">菜单</span>
              </div>
              {query ? (
                <p className="student-portal__search-result">
                  搜索「{query}」共 {menuItems.length} 项
                </p>
              ) : null}
              <div className="student-portal__menu-grid">
                {menuItems.length > 0 ? (
                  menuItems.map((item) => <PortalMenuItem key={item.id} item={item} />)
                ) : (
                  <p className="student-portal__empty">未找到相关事项，请换个关键词试试。</p>
                )}
              </div>
              {query && quickLinks.length > 0 ? (
                <div className="student-portal__quick-hits">
                  <h3>常用服务匹配</h3>
                  <div className="student-portal__quick-hit-list">
                    {quickLinks.map((item) =>
                      item.href ? (
                        <Link key={item.id} href={item.href}>
                          {item.label}
                        </Link>
                      ) : null,
                    )}
                  </div>
                </div>
              ) : null}
            </section>

            <aside className="student-portal__side">
              <NoticeCard title="消息通知" items={messages} />
              <NoticeCard title="通知公告" items={announcements} />
              <ProfileCard isChengYe={isChengYe} />
            </aside>
          </div>
        </main>
      </div>

      {chatOpen ? (
        <button
          type="button"
          className="student-portal__chat-backdrop"
          aria-label="关闭 Ani 对话"
          onClick={() => setChatOpen(false)}
        />
      ) : null}

      <AniChatSidebar open={chatOpen} onClose={() => setChatOpen(false)} />

      {!chatOpen ? (
        <button
          type="button"
          className="student-portal__ani-fab"
          onClick={() => setChatOpen(true)}
          aria-label="打开 Ani AI 对话"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/student/ani-fox-avatar.png" alt="" className="student-portal__ani-fab-img" />
        </button>
      ) : null}
    </div>
  );
}

export function StudentPortalHomeClient() {
  return (
    <Suspense fallback={null}>
      <StudentPortalHomeInner />
    </Suspense>
  );
}

export function StudentPortalHomePage() {
  return (
    <StudentGate>
      <StudentPortalHomeClient />
    </StudentGate>
  );
}
