"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { MailBodyBlock, OpenMail } from "@/data/mail163";
import { useGame } from "@/lib/game-state";
import { cn } from "@/lib/utils";

const STAGGER_MS = 45;

function MailBodyParagraph({ block }: { block: Extract<MailBodyBlock, { type: "text" }> }) {
  if (block.content === "") return null;

  return (
    <p
      className={cn(
        "mb-3 last:mb-0",
        block.tone === "heading" && "mt-7 mb-4 text-xl font-bold text-[#1a1a1a]",
        block.tone === "lead" && "text-[17px] leading-8 text-[#222]",
        block.tone === "emphasis" && "text-[17px] leading-8 font-semibold text-[#222]",
        !block.tone && "text-[17px] leading-8 text-[#333]",
      )}
    >
      {block.content}
    </p>
  );
}

function RedactionBar({ widthEm }: { widthEm: number }) {
  return (
    <span
      className="mail-redaction-bar inline-block align-baseline"
      style={{
        width: `${widthEm}em`,
        height: "1.15em",
        minHeight: 20,
        backgroundColor: "#000",
        borderRadius: 2,
      }}
      aria-hidden
    />
  );
}

function RedactionCover({ content }: { content: string }) {
  const primary = Math.min(content.length * 0.52, 14);
  const secondary =
    content.length > 14 ? Math.min((content.length - 14) * 0.52, 12) : 0;

  return (
    <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 align-baseline">
      <RedactionBar widthEm={Math.max(primary, 7)} />
      {secondary > 0 && <RedactionBar widthEm={Math.max(secondary, 5)} />}
    </span>
  );
}

function MailTaskItem({
  number,
  content,
  redacted,
  revealed,
}: {
  number: number;
  content: string;
  redacted?: boolean;
  revealed: boolean;
}) {
  const isLocked = Boolean(redacted && !revealed);

  return (
    <p className="mb-2 text-[17px] leading-8 text-[#333] last:mb-0">
      <span className="font-semibold text-[#222]">{number}. </span>
      {isLocked ? (
        <RedactionCover content={content} />
      ) : (
        <span className={cn(redacted && revealed && "mail-task-unredact")}>{content}</span>
      )}
    </p>
  );
}

function RevealItem({
  index,
  active,
  className,
  children,
}: {
  index: number;
  active: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("mail-reveal-item", active && "mail-reveal-item-active", className)}
      style={{ transitionDelay: `${index * STAGGER_MS}ms` }}
    >
      {children}
    </div>
  );
}

export function MailReadStream({
  mail,
  mailKey,
  onRevealSettled,
}: {
  mail: OpenMail;
  mailKey: string;
  onRevealSettled?: () => void;
}) {
  const { chengYeSearchCompleted } = useGame();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(false);
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setActive(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [mailKey, chengYeSearchCompleted]);

  useEffect(() => {
    if (!active || !onRevealSettled) return;
    const blockCount = mail.body.length + 4;
    const delay = blockCount * STAGGER_MS + 360;
    const timer = window.setTimeout(onRevealSettled, delay);
    return () => window.clearTimeout(timer);
  }, [active, mail.body.length, mailKey, onRevealSettled]);

  let revealIndex = 0;

  function nextIndex() {
    const current = revealIndex;
    revealIndex += 1;
    return current;
  }

  function renderBlock(block: MailBodyBlock, index: number) {
    if (block.type === "link") {
      const linkClass =
        "text-[17px] text-[#1a5fb4] underline decoration-[#1a5fb4]/40 underline-offset-2 hover:text-[#0d4a8f]";
      return (
        <RevealItem key={index} index={nextIndex()} active={active} className="my-4">
          {block.external ? (
            <Link href={block.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {block.content}
            </Link>
          ) : (
            <Link href={block.href} className={linkClass}>
              {block.content}
            </Link>
          )}
        </RevealItem>
      );
    }

    if (block.type === "task") {
      const revealed = !block.redacted || chengYeSearchCompleted === true;
      return (
        <RevealItem
          key={`${index}-${revealed ? "open" : "redacted"}-${chengYeSearchCompleted ? "1" : "0"}`}
          index={nextIndex()}
          active={active}
        >
          <MailTaskItem
            number={block.number}
            content={block.content}
            redacted={block.redacted}
            revealed={revealed}
          />
        </RevealItem>
      );
    }

    if (block.content === "") {
      return <div key={index} className="h-2" />;
    }

    return (
      <RevealItem key={index} index={nextIndex()} active={active}>
        <MailBodyParagraph block={block} />
      </RevealItem>
    );
  }

  return (
    <>
      <RevealItem index={nextIndex()} active={active}>
        <h1 className="text-[26px] font-bold leading-snug text-[#222]">{mail.subject}</h1>
      </RevealItem>

      <div className="mt-5 space-y-2 border-b border-[#eee] pb-5 text-[17px]">
        <RevealItem index={nextIndex()} active={active} className="flex items-start gap-3">
          <span className="shrink-0 whitespace-nowrap text-[#999]">发件人：</span>
          <span className="min-w-0 break-words">
            {mail.from}
            <span className="text-[#666]"> &lt;{mail.fromEmail}&gt;</span>
          </span>
        </RevealItem>
        <RevealItem index={nextIndex()} active={active} className="flex items-start gap-3">
          <span className="shrink-0 whitespace-nowrap text-[#999]">收件人：</span>
          <span className="min-w-0 break-words">{mail.to}</span>
        </RevealItem>
        <RevealItem index={nextIndex()} active={active} className="flex items-start gap-3">
          <span className="shrink-0 whitespace-nowrap text-[#999]">时　间：</span>
          <span className="text-[#666]">{mail.date}</span>
        </RevealItem>
      </div>

      <div className="mt-6 w-full max-w-none pr-2">
        {mail.body.map((block, index) => renderBlock(block, index))}
      </div>
    </>
  );
}
