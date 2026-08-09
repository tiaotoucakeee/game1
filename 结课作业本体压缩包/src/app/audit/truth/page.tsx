"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { isAuditEmbedContext, navigateAuditFullscreen } from "@/lib/audit-embed";
import { useGame } from "@/lib/game-state";

const REVEAL_INTERVAL_MS = 2200;
const INITIAL_DELAY_MS = 500;

type Segment =
  | { kind: "label"; text: string }
  | { kind: "title"; text: string }
  | { kind: "paragraph"; text: string; epilogue?: boolean }
  | { kind: "system"; lines: string[] }
  | { kind: "note"; text: string };

const SEGMENTS: Segment[] = [
  { kind: "label", text: "结局 ·《被看见的路径》" },
  { kind: "title", text: "审核意见已提交" },
  {
    kind: "paragraph",
    text: "你在「最终审核意见」里写下更正说明，将「程野」自优秀毕业生公示名单移出，并建议归类为 Creative Yard 创作路径账户。报告附上了学籍查询、立项书、成果关联与内部附件摘录——每一处断裂，都在同一条链上找到了落点。",
  },
  {
    kind: "paragraph",
    text: "老师审阅后批复同意。流程归档得很快：公示页上那个反复绊住你的名字消失了，但项目立项书、成果外链与 CYA-0000 的登录入口没有一并关闭。它们被重新归类，安静地留在系统深处。",
  },
  {
    kind: "paragraph",
    text: "你再次打开立项书，读到那句备注：CYA-0000 对外代称「程野」，不属于任何真实学籍，仅用于跨专业创作备案。新闻里的涂黑、对不上的编号、实验室权限里多出来的账户——忽然都不再像孤立的错误。",
  },
  {
    kind: "paragraph",
    text: "你也终于弄明白，「程野」为何会出现在优秀毕业生名单里：公示汇总时，系统直接抓取了与 2034 届结项项目、获奖报道相关联的账户名称，却没有回头核对学籍库。程野既是 Creative Yard 的对外代称，又反复出现在项目团队与成果链接里——于是被当作一个「人」，写进了名单。",
  },
  {
    kind: "system",
    lines: ["档案分类已更正。", "创作路径账户 CYA-0000 已自优秀毕业生公示名单移出。"],
  },
  {
    kind: "paragraph",
    text: "程野不是真实学生，也不是 AI 随手捏造的假人。他是林澈与团队在 Ani AI 辅助下，跨越漫画、动画、数媒多个模块创作时，留下的一条路径——一个替尚未被命名的探索占位的名字。",
  },
  {
    kind: "note",
    text: "你查清了这段路径的来处。你仍是这段故事的见证者——但至少，它没有被当作错误删掉。",
  },
  {
    kind: "paragraph",
    epilogue: true,
    text: "九月，学院组织了一场路径项目分享会。你在会场屏幕里看见林澈的访谈录像——他提到刚入学那年，漫画专业被合并进动画大项，很长一段时间里都相当焦虑，总觉得自己站在两个方向的缝隙里，不知道作品该往哪里放。",
  },
  {
    kind: "paragraph",
    epilogue: true,
    text: "转折发生在毕设创作过程中。借助 Ani 的原型试错与资源匹配，他把漫画分镜、动态影像和轻量交互一点点串起来，也在那时参与创立了 Creative Yard 创作路径账户，用「程野」这个代称，替那些还无法被单一专业命名的工作占一个位置。",
  },
  {
    kind: "paragraph",
    epilogue: true,
    text: "会后，一位参与试点的老师补充说，路径账户本来就不该和学生档案共用同一套字段，只是当年跨系统对接尚未完善，公示名单才会把项目关联账户一并抓进来。你想起自己核对过的那些页面，忽然觉得那些断裂并不全是疏忽——也是机制还没跟上创作方式的变化。",
  },
  {
    kind: "paragraph",
    epilogue: true,
    text: "林澈在录像最后说：只要还抱着想创作的心，工具怎么变都只是在辅助。Ani 可以试错、可以匹配资源，但故事、角色、交互的逻辑，仍然要由人自己决定。",
  },
  {
    kind: "paragraph",
    epilogue: true,
    text: "后来你在学院官网刷到 2034 届跨专业成果展专题更新。《未命名之路》《山海行灯》仍并排陈列在代表项目列表里，配图、说明、外链一应俱全。",
  },
  {
    kind: "paragraph",
    epilogue: true,
    text: "团队成员一栏署名的是林澈与各专业同学，没有「程野」。但在项目备注最末，有一行不易察觉的小字：创作路径账户 CYA-0000 · 已归档。",
  },
  {
    kind: "paragraph",
    epilogue: true,
    text: "你在屏幕前停了一会儿。不是要找谁，只是想确认——它还在，还在被展示，还在被看见。",
  },
  {
    kind: "paragraph",
    epilogue: true,
    text: "开学后某次经过 Creative Yard 实验室，玻璃门里的屏幕正轮播往届路径项目。你认出《山海行灯》的动态分镜，也认出立项书里反复出现的那串编号。同伴问你在看什么，你说：没什么，一个账户。",
  },
  {
    kind: "paragraph",
    epilogue: true,
    text: "你没有再往下解释。有些路径，被看见一次，就够了。",
  },
];

function isFullEndingSegment(segment: Segment) {
  return (
    segment.kind !== "note" &&
    segment.kind !== "system" &&
    !(segment.kind === "paragraph" && segment.epilogue)
  );
}

function TruthSegment({ segment, visible }: { segment: Segment; visible: boolean }) {
  const className = `audit-truth-ending__line${visible ? " is-visible" : ""}`;

  switch (segment.kind) {
    case "label":
      return <p className={`audit-truth-ending__label ${className}`}>{segment.text}</p>;
    case "title":
      return <h1 className={`audit-truth-ending__title ${className}`}>{segment.text}</h1>;
    case "paragraph":
      return (
        <p
          className={`audit-truth-ending__paragraph${segment.epilogue ? " audit-truth-ending__paragraph--epilogue" : ""} ${className}`}
        >
          {segment.text}
        </p>
      );
    case "system":
      return (
        <div className={`audit-truth-ending__system ${className}`} role="status">
          {segment.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      );
    case "note":
      return <p className={`audit-truth-ending__note ${className}`}>{segment.text}</p>;
  }
}

function StrollLink({ visible, onGo }: { visible: boolean; onGo: () => void }) {
  return (
    <button
      type="button"
      className={`audit-truth-stroll${visible ? " is-visible" : ""}`}
      aria-label="Stroll"
      onClick={onGo}
    >
      <span className="audit-truth-stroll__arrow" aria-hidden>
        <svg width="40" height="28" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 8L20 22L34 8" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path d="M6 12L20 26L34 12" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
      </span>
      <span className="audit-truth-stroll__label">Stroll</span>
    </button>
  );
}

export default function AuditTruthPage() {
  const { ending } = useGame();
  const [visibleCount, setVisibleCount] = useState(0);
  const scrollRootRef = useRef<HTMLDivElement>(null);
  const navigatedRef = useRef(false);

  const segments = ending === "seen_path" ? SEGMENTS : SEGMENTS.filter(isFullEndingSegment);
  const strollReady = visibleCount >= segments.length - 1;

  const goStroll = useCallback(() => {
    if (navigatedRef.current || !strollReady) return;
    navigatedRef.current = true;
    navigateAuditFullscreen("/audit/stroll");
  }, [strollReady]);

  useEffect(() => {
    if (isAuditEmbedContext() && window.self !== window.top) {
      window.top!.location.href = "/audit/truth";
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("audit-truth-fullscreen");
    document.body.classList.add("audit-truth-fullscreen");
    return () => {
      document.documentElement.classList.remove("audit-truth-fullscreen");
      document.body.classList.remove("audit-truth-fullscreen");
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

  useEffect(() => {
    const el = scrollRootRef.current;
    if (!el || !strollReady) return;
    const scrollEl = el;

    function atBottom() {
      return scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 24;
    }

    function onWheel(e: WheelEvent) {
      if (!atBottom() || e.deltaY <= 0) return;
      e.preventDefault();
      goStroll();
    }

    let touchStartY = 0;

    function onTouchStart(e: TouchEvent) {
      touchStartY = e.changedTouches[0]?.clientY ?? 0;
    }

    function onTouchEnd(e: TouchEvent) {
      if (!atBottom()) return;
      const touchEndY = e.changedTouches[0]?.clientY ?? touchStartY;
      if (touchStartY - touchEndY > 36) {
        goStroll();
      }
    }

    scrollEl.addEventListener("wheel", onWheel, { passive: false });
    scrollEl.addEventListener("touchstart", onTouchStart, { passive: true });
    scrollEl.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      scrollEl.removeEventListener("wheel", onWheel);
      scrollEl.removeEventListener("touchstart", onTouchStart);
      scrollEl.removeEventListener("touchend", onTouchEnd);
    };
  }, [goStroll, strollReady]);

  return (
    <div className="audit-truth-ending" ref={scrollRootRef}>
      <div className="audit-truth-ending__story">
        <div className="audit-truth-ending__inner">
          {segments.map((segment, index) => (
            <TruthSegment key={`${segment.kind}-${index}`} segment={segment} visible={index < visibleCount} />
          ))}
        </div>
        <div className="audit-truth-ending__story-tail">
          <StrollLink visible={strollReady} onGo={goStroll} />
        </div>
      </div>
    </div>
  );
}
