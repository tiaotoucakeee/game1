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
  | { kind: "paragraph"; text: string; epilogue?: boolean }
  | { kind: "quote"; text: string }
  | { kind: "system"; lines: string[] }
  | { kind: "note"; text: string }
  | { kind: "link" };

const SEGMENTS: Segment[] = [
  { kind: "label", text: "结局 ·《不存在的人》" },
  { kind: "title", text: "档案已删除" },
  {
    kind: "paragraph",
    text: "你把那些还没来得及拼合的异常整理成报告，递给了老师。缺少能证明「创作路径账户」真实用途的关键材料，学院只能依照信息安全规定，将「程野」判定为错误生成的学籍档案，并执行删除。",
  },
  {
    kind: "paragraph",
    text: "流程走得很快。优秀毕业生名单恢复了整洁，像从未被谁的名字绊住过。与程野有关的课程记录、项目页面、成果链接，在你刷新页面的间隙里，一条接一条变灰、失效，最后再也打不开。",
  },
  {
    kind: "paragraph",
    text: "提交前的那晚，你其实还想过再查一轮。光标在意见栏里闪了很久，你最终还是选了最省事的做法——把解释不了的部分，连同那个名字，一并打包送走。",
  },
  { kind: "quote", text: "未查询到相关信息。" },
  {
    kind: "paragraph",
    text: "你鬼使神差地又搜了一次「程野」。屏幕中央只躺着这行字，冷得像空荡的走廊——没有照片，没有简介，没有任何人记得曾有过这个人。",
  },
  {
    kind: "paragraph",
    text: "辅导员在群里通知核对任务完结，你回复了一个「收到」。没有人问起程野。整件事安静得像一枚被推进抽屉的图钉，落底，便再无声响。",
  },
  {
    kind: "system",
    lines: ["档案已删除。", "与该账户关联的创作路径无法恢复。"],
  },
  {
    kind: "note",
    text: "你删除的不是一个不存在的人，而是一段尚未被理解的跨专业探索——一段你本可以读懂、却在仓促里亲手抹去的探索。",
  },
  {
    kind: "paragraph",
    epilogue: true,
    text: "九月，你回校办理新学期手续。动画学院楼底的长廊里，两个老师正在等电梯，随口聊起跨专业试点的那套账户体系。",
  },
  {
    kind: "paragraph",
    epilogue: true,
    text: "「有些创作路径账号会被误写进学籍，」其中一个人说，「以前清理过几例，挺可惜的。那里面其实有完整的项目链……」",
  },
  {
    kind: "paragraph",
    epilogue: true,
    text: "你的脚步慢了一下。程野——那个在名单里出现过、在项目页里留过痕、最终被你自己签字送走的名字——毫无预兆地浮上来。",
  },
  {
    kind: "paragraph",
    epilogue: true,
    text: "你想开口问一句「那后来呢」。话到嘴边，又被你咽了回去。暑假的临时核对早就归档了，谁还会为一个查无此人的名字停留？",
  },
  {
    kind: "paragraph",
    epilogue: true,
    text: "你继续往前走。廊灯亮起来，把影子拉得很长。那个名字在脑子里淡下去，淡得像从未出现过——而你也没有再回头。",
  },
  { kind: "link" },
];

function isFullEndingSegment(segment: Segment) {
  return (
    segment.kind !== "note" &&
    segment.kind !== "system" &&
    !(segment.kind === "paragraph" && segment.epilogue)
  );
}

function DeleteSegment({ segment, visible }: { segment: Segment; visible: boolean }) {
  const className = `audit-delete-ending__line${visible ? " is-visible" : ""}`;

  switch (segment.kind) {
    case "label":
      return <p className={`audit-delete-ending__label ${className}`}>{segment.text}</p>;
    case "title":
      return <h1 className={`audit-delete-ending__title ${className}`}>{segment.text}</h1>;
    case "paragraph":
      return (
        <p
          className={`audit-delete-ending__paragraph${segment.epilogue ? " audit-delete-ending__paragraph--epilogue" : ""} ${className}`}
        >
          {segment.text}
        </p>
      );
    case "quote":
      return (
        <p className={`audit-delete-ending__quote ${className}`} aria-label="查询结果">
          {segment.text}
        </p>
      );
    case "system":
      return (
        <div className={`audit-delete-ending__system ${className}`} role="status">
          {segment.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      );
    case "note":
      return <p className={`audit-delete-ending__note ${className}`}>{segment.text}</p>;
    case "link":
      return (
        <Link href="/mail/profile" className={`audit-delete-ending__link ${className}`}>
          返回邮箱
        </Link>
      );
  }
}

export default function AuditDeletePage() {
  const { ending, archiveDeleted } = useGame();
  const [visibleCount, setVisibleCount] = useState(0);

  const segments =
    ending === "nonexistent" && archiveDeleted
      ? SEGMENTS
      : SEGMENTS.filter(isFullEndingSegment);

  useEffect(() => {
    if (isAuditEmbedContext() && window.self !== window.top) {
      window.top!.location.href = "/audit/delete";
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("audit-delete-fullscreen");
    document.body.classList.add("audit-delete-fullscreen");
    return () => {
      document.documentElement.classList.remove("audit-delete-fullscreen");
      document.body.classList.remove("audit-delete-fullscreen");
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
    <div className="audit-delete-ending">
      <div className="audit-delete-ending__inner">
        {segments.map((segment, index) => (
          <DeleteSegment key={`${segment.kind}-${index}`} segment={segment} visible={index < visibleCount} />
        ))}
      </div>
    </div>
  );
}
