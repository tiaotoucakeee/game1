"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type WheelEvent } from "react";
import {
  headerTabs,
  mailAccount,
  mailListItems,
  mailsById,
  readToolbarActions,
  topActions,
} from "@/data/mail163";
import { cn } from "@/lib/utils";
import { useGame } from "@/lib/game-state";
import { MailProfilePanel } from "@/components/mail163/MailProfilePanel";
import { MailReadStream } from "@/components/mail163/MailReadStream";

type MailView = "inbox" | "profile";

const M01_MAIL_ID = "m01";
const STROLL_THANKS_MAIL_ID = "stroll-thanks";
/** 距底部多少像素内才算「到底」 */
const READ_BOTTOM_THRESHOLD = 6;
/** 至少滚过可滚动高度的比例 */
const MIN_SCROLL_RATIO = 0.97;

function FakeButton({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "primary" | "ghost" | "toolbar";
}) {
  return (
    <span
      className={cn(
        "inline-flex cursor-default items-center justify-center whitespace-nowrap select-none",
        variant === "primary" &&
          "rounded bg-[#469afa] px-4 py-1.5 text-base text-white",
        variant === "ghost" && "px-2 py-1 text-sm text-[#666] hover:text-[#333]",
        variant === "toolbar" &&
          "rounded border border-[#d8d8d8] bg-[#fafafa] px-3 py-1.5 text-sm text-[#333]",
        variant === "default" && className,
        className,
      )}
    >
      {children}
    </span>
  );
}

function MailLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded bg-white p-0.5">
        <Image
          src="/cuc-anima/images/cuc-badge.png"
          alt="中传校徽"
          width={28}
          height={28}
          className="h-7 w-7 object-contain"
          priority
        />
      </div>
      <span className="text-lg font-bold tracking-wide text-white">CUC校内邮箱</span>
    </div>
  );
}

export function Mail163App({
  initialView = "inbox",
  initialSelectedId,
  playEntryAnimation = false,
}: {
  initialView?: MailView;
  initialSelectedId?: string;
  playEntryAnimation?: boolean;
}) {
  const { m01ScrolledToBottom, strollThanksMailUnlocked, setDevIntroMailUnlocked } = useGame();
  const readPaneRef = useRef<HTMLDivElement>(null);
  const m01ScrollEngagedRef = useRef(false);
  const m01ContentReadyRef = useRef(false);
  const m01MaxScrollRef = useRef(0);
  const [showInboxEntry] = useState(playEntryAnimation);
  const [devIntroEnterAnim, setDevIntroEnterAnim] = useState(false);
  const [strollThanksEnterAnim, setStrollThanksEnterAnim] = useState(false);
  const [view, setView] = useState<MailView>(initialView);
  const [selectedId, setSelectedId] = useState(initialSelectedId ?? M01_MAIL_ID);
  const [unreadIds, setUnreadIds] = useState(
    () => new Set(mailListItems.filter((item) => item.unread).map((item) => item.id)),
  );

  const visibleMailListItems = useMemo(
    () =>
      mailListItems.filter((item) => {
        if (item.unlockAfterM01 && !m01ScrolledToBottom) return false;
        if (item.unlockAfterStrollFinale && !strollThanksMailUnlocked) return false;
        return true;
      }),
    [m01ScrolledToBottom, strollThanksMailUnlocked],
  );

  const openMail = mailsById[selectedId] ?? mailsById.m01;
  const readableMails = visibleMailListItems.filter((item) => item.readable);
  const selectedIndex = readableMails.findIndex((item) => item.id === selectedId);
  const mailPosition = selectedIndex >= 0 ? selectedIndex + 1 : 1;

  const unreadCount = useMemo(
    () => visibleMailListItems.filter((item) => unreadIds.has(item.id)).length,
    [visibleMailListItems, unreadIds],
  );

  const tryUnlockDevIntroMail = useCallback(() => {
    if (m01ScrolledToBottom || selectedId !== M01_MAIL_ID) return;
    if (!m01ContentReadyRef.current || !m01ScrollEngagedRef.current) return;

    const el = readPaneRef.current;
    if (!el) return;

    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll < 80) return;

    m01MaxScrollRef.current = Math.max(m01MaxScrollRef.current, el.scrollTop);

    const scrolledRatio = m01MaxScrollRef.current / maxScroll;
    if (scrolledRatio < MIN_SCROLL_RATIO) return;

    const distanceFromBottom = maxScroll - el.scrollTop;
    if (distanceFromBottom <= READ_BOTTOM_THRESHOLD) {
      setDevIntroMailUnlocked(true);
      setDevIntroEnterAnim(true);
    }
  }, [m01ScrolledToBottom, selectedId, setDevIntroMailUnlocked]);

  const handleM01ContentReady = useCallback(() => {
    m01ContentReadyRef.current = true;
  }, []);

  const markM01UserScroll = useCallback(() => {
    if (selectedId !== M01_MAIL_ID || m01ScrolledToBottom) return;
    m01ScrollEngagedRef.current = true;
  }, [m01ScrolledToBottom, selectedId]);

  const handleReadWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      if (Math.abs(event.deltaY) > 1) markM01UserScroll();
    },
    [markM01UserScroll],
  );

  const handleReadScroll = useCallback(() => {
    if (selectedId !== M01_MAIL_ID || m01ScrolledToBottom) return;
    tryUnlockDevIntroMail();
  }, [m01ScrolledToBottom, selectedId, tryUnlockDevIntroMail]);

  useEffect(() => {
    if (selectedId !== M01_MAIL_ID || m01ScrolledToBottom) return;

    m01ScrollEngagedRef.current = false;
    m01ContentReadyRef.current = false;
    m01MaxScrollRef.current = 0;

    const el = readPaneRef.current;
    if (el) el.scrollTop = 0;
  }, [selectedId, m01ScrolledToBottom]);

  useEffect(() => {
    if (!initialSelectedId) return;
    const item = visibleMailListItems.find((mail) => mail.id === initialSelectedId);
    if (!item?.readable) return;
    setSelectedId(initialSelectedId);
    setView("inbox");
    if (initialSelectedId === STROLL_THANKS_MAIL_ID) {
      setStrollThanksEnterAnim(true);
    }
    setUnreadIds((prev) => {
      if (!prev.has(initialSelectedId)) return prev;
      const next = new Set(prev);
      next.delete(initialSelectedId);
      return next;
    });
  }, [initialSelectedId, visibleMailListItems]);

  function selectMail(id: string) {
    const item = mailListItems.find((mail) => mail.id === id);
    if (!item?.readable) return;

    setSelectedId(id);
    setUnreadIds((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  function openMailFromList(id: string) {
    const selection = window.getSelection()?.toString().trim();
    if (selection) return;
    selectMail(id);
  }

  function renderMailRow(item: (typeof mailListItems)[number], index: number) {
    const isUnread = unreadIds.has(item.id);
    const isActive = selectedId === item.id;
    const isReadable = item.readable === true;
    const showRowEnter =
      showInboxEntry ||
      (item.id === "dev-intro" && devIntroEnterAnim) ||
      (item.id === STROLL_THANKS_MAIL_ID && strollThanksEnterAnim);

    const rowClass = cn(
      "w-full border-b border-[#f0f2f5] px-3 py-3 text-left select-text",
      isReadable && "cursor-pointer transition-colors hover:bg-[#f5f8fc]",
      !isReadable && "cursor-text opacity-80",
      isActive && "bg-[#edf2fc]",
      showRowEnter && "mail-inbox-row-enter",
    );
    const rowStyle = showRowEnter ? { animationDelay: `${index * 75}ms` } : undefined;

    const inner = (
      <>
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            {isUnread && (
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-[#e02020]"
                aria-label="未读"
              />
            )}
            <span
              className={cn(
                "truncate text-base",
                isUnread ? "font-bold text-[#222]" : "text-[#444]",
              )}
            >
              {item.from}
            </span>
          </div>
          <span className="shrink-0 text-xs text-[#999]">{item.date}</span>
        </div>
        <div
          className={cn(
            "mt-1 truncate text-sm",
            isUnread ? "font-semibold text-[#333]" : "text-[#666]",
            isUnread && "pl-3.5",
          )}
        >
          {item.subject}
        </div>
        <div
          className={cn(
            "mt-1 truncate text-xs text-[#999]",
            isUnread && "pl-3.5",
          )}
        >
          {item.preview}
        </div>
      </>
    );

    if (isReadable) {
      return (
        <div
          key={item.id}
          role="button"
          tabIndex={0}
          onClick={() => openMailFromList(item.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              selectMail(item.id);
            }
          }}
          className={rowClass}
          style={rowStyle}
        >
          {inner}
        </div>
      );
    }

    return (
      <div key={item.id} className={rowClass} style={rowStyle}>
        {inner}
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#eef1f6] text-[15px] text-[#333]">
      {/* 顶栏 */}
      <header className="shrink-0 bg-[#c81623] select-none">
        <div className="flex h-11 items-center justify-between px-4">
          <MailLogo />
          <div className="flex items-center gap-4 text-sm text-white/90">
            {topActions.map((action) => (
              <FakeButton key={action} variant="ghost" className="text-white/90">
                {action}
              </FakeButton>
            ))}
            <button
              type="button"
              onClick={() => setView("profile")}
              className={cn(
                "pointer-events-auto font-bold underline decoration-white/40 underline-offset-2 hover:text-white",
                view === "profile" ? "text-white" : "text-white/90",
              )}
            >
              {mailAccount.address}
            </button>
          </div>
        </div>
        <div className="flex h-9 items-end gap-0 border-t border-[#a8121e] bg-[#b81420] px-2">
          {headerTabs.map((tab) => {
            const isInbox = tab === "收件箱";
            const isActive = isInbox && view === "inbox";

            if (isInbox) {
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setView("inbox")}
                  className={cn(
                    "pointer-events-auto rounded-t px-4 py-1.5 text-sm",
                    isActive
                      ? "bg-[#eef1f6] font-medium text-[#333]"
                      : "text-white/85 hover:text-white",
                  )}
                >
                  {tab}
                </button>
              );
            }

            return (
              <FakeButton
                key={tab}
                className={cn(
                  "rounded-t px-4 py-1.5 text-sm",
                  isActive ? "bg-[#eef1f6] font-medium text-[#333]" : "text-white/85",
                )}
              >
                {tab}
              </FakeButton>
            );
          })}
        </div>
      </header>

      {view === "profile" ? (
        <MailProfilePanel onBack={() => setView("inbox")} />
      ) : (
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* 邮件列表 */}
        <section className="flex w-[300px] shrink-0 flex-col overflow-hidden border-r border-[#d9dde5] bg-white">
          <div className="flex h-11 shrink-0 items-center justify-between border-b border-[#e8ebf0] px-3 text-sm text-[#666]">
            <span>
              收件箱({visibleMailListItems.length})
              {unreadCount > 0 && (
                <span className="ml-1.5 text-xs text-[#c81623]">{unreadCount} 未读</span>
              )}
            </span>
            <div className="flex gap-2">
              <FakeButton variant="ghost">刷新</FakeButton>
              <FakeButton variant="ghost">全部已读</FakeButton>
            </div>
          </div>
          <div className="mail-scroll min-h-0 flex-1 overflow-y-auto select-text">
            {visibleMailListItems.map((item, index) => renderMailRow(item, index))}
          </div>
        </section>

        {/* 读信区 */}
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
          <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-[#e8ebf0] px-4 py-2 select-none">
            {readToolbarActions.map((action) => (
              <FakeButton key={action} variant="toolbar">
                {action}
                {action === "标记为" || action === "移动到" || action === "更多" ? " ▾" : ""}
              </FakeButton>
            ))}
          </div>

          <div
            ref={readPaneRef}
            onScroll={handleReadScroll}
            onWheel={handleReadWheel}
            onTouchMove={markM01UserScroll}
            className="mail-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-10 py-6 select-text"
          >
            <MailReadStream
              mail={openMail}
              mailKey={selectedId}
              onRevealSettled={
                selectedId === M01_MAIL_ID && !m01ScrolledToBottom
                  ? handleM01ContentReady
                  : undefined
              }
            />
          </div>

          <div className="flex shrink-0 items-center justify-end border-t border-[#e8ebf0] px-4 py-2 text-sm text-[#999] select-none">
            <span>
              第 {mailPosition} 封，共 {readableMails.length} 封
            </span>
          </div>
        </main>
      </div>
      )}
    </div>
  );
}
