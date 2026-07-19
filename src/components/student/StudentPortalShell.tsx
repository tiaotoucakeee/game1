"use client";

import Link from "next/link";
import { Suspense, useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { AniChatSidebar } from "@/components/student/AniChatSidebar";
import { StudentPortalHero } from "@/components/student/StudentPortalHero";
import { CHENG_YE, PLAYER } from "@/data/game";
import { useGame } from "@/lib/game-state";

function StudentPortalShellInner({
  children,
  showHero = false,
}: {
  children: ReactNode;
  showHero?: boolean;
}) {
  const searchParams = useSearchParams();
  const { setStudentLoggedIn, studentPersona } = useGame();
  const [chatOpen, setChatOpen] = useState(false);
  const isChengYe = studentPersona === "cheng_ye";
  const displayName = isChengYe ? CHENG_YE.name : PLAYER.name;

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
    <div className={`student-portal${isChengYe ? " student-portal--cya" : ""}${chatOpen ? " is-chat-open" : ""}`}>
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

        {showHero ? <StudentPortalHero searchAction="home" isChengYe={isChengYe} /> : null}

        <div className="student-portal__subpage">{children}</div>
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

export function StudentPortalShell({
  children,
  showHero = false,
}: {
  children: ReactNode;
  showHero?: boolean;
}) {
  return (
    <Suspense fallback={null}>
      <StudentPortalShellInner showHero={showHero}>{children}</StudentPortalShellInner>
    </Suspense>
  );
}
