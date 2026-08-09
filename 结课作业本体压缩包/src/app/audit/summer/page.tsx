"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isAuditEmbedContext } from "@/lib/audit-embed";
import { useGame } from "@/lib/game-state";

const REVEAL_INTERVAL_MS = 2200;
const INITIAL_DELAY_MS = 500;

type Segment =
  | { kind: "label"; text: string }
  | { kind: "title"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "note"; text: string }
  | { kind: "link" };

const SEGMENTS: Segment[] = [
  { kind: "label", text: "结局 ·《无事发生的暑假》" },
  { kind: "title", text: "审核已提交" },
  {
    kind: "paragraph",
    text: "2036 年的七月，你囫囵吞枣地核完了名单上的每一个名字，在「最终审核意见」里写下「信息无误」，按下了提交。没有异常，没有追问，系统很快归档。",
  },
  {
    kind: "paragraph",
    text: "学院的勤工俭学补助在月底前到账。你买了几本一直想买的书，暑假余下的日子照常度过——回家、补觉、偶尔刷手机。",
  },
  {
    kind: "paragraph",
    text: "只是有时候，在傍晚过马路等红灯的间隙，你会忽然想起那个叫「程野」的名字。想不起来在哪里见过，也说不清为什么会在意。像一枚落在口袋深处的硬币，摸不到，却一直硌着。",
  },
  { kind: "note", text: "任务结束。故事并未开始。" },
  { kind: "link" },
];

function SummerSegment({ segment, visible }: { segment: Segment; visible: boolean }) {
  const className = `audit-summer-ending__line${visible ? " is-visible" : ""}`;

  switch (segment.kind) {
    case "label":
      return <p className={`audit-summer-ending__label ${className}`}>{segment.text}</p>;
    case "title":
      return <h1 className={`audit-summer-ending__title ${className}`}>{segment.text}</h1>;
    case "paragraph":
      return <p className={`audit-summer-ending__paragraph ${className}`}>{segment.text}</p>;
    case "note":
      return <p className={`audit-summer-ending__note ${className}`}>{segment.text}</p>;
    case "link":
      return (
        <Link href="/mail/profile" className={`audit-summer-ending__link ${className}`}>
          返回邮箱
        </Link>
      );
  }
}

export default function AuditSummerPage() {
  const { ending } = useGame();
  const [visibleCount, setVisibleCount] = useState(0);

  const segments =
    ending === "summer_nothing"
      ? SEGMENTS
      : SEGMENTS.filter((segment) => segment.kind !== "note");

  useEffect(() => {
    if (isAuditEmbedContext() && window.self !== window.top) {
      window.top!.location.href = "/audit/summer";
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("audit-summer-fullscreen");
    document.body.classList.add("audit-summer-fullscreen");
    return () => {
      document.documentElement.classList.remove("audit-summer-fullscreen");
      document.body.classList.remove("audit-summer-fullscreen");
    };
  }, []);

  useEffect(() => {
    if (visibleCount >= segments.length) return;

    const delay = visibleCount === 0 ? INITIAL_DELAY_MS : REVEAL_INTERVAL_MS;
    const timer = window.setTimeout(() => {
      setVisibleCount((count) => count + 1);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [visibleCount, segments.length]);

  return (
    <div className="audit-summer-ending">
      <div className="audit-summer-ending__inner">
        {segments.map((segment, index) => (
          <SummerSegment key={`${segment.kind}-${index}`} segment={segment} visible={index < visibleCount} />
        ))}
      </div>
    </div>
  );
}
