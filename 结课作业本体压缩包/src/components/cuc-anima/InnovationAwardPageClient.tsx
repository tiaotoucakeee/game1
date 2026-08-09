"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ClueTrigger } from "@/components/game/ClueTrigger";
import {
  innovationAward2034Page,
  type InnovationAwardBlock,
  type InnovationAwardTeamMember,
} from "@/data/cuc-anima-innovation-award-2034";

const PAGE = {
  position: "relative" as const,
  background: "#fff",
  color: "#343a40",
};

const CONTAINER = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "0 20px",
} as const;

const HERO_GRID = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 24,
  alignItems: "center",
  marginTop: 40,
} as const;

const PARA = {
  margin: "0 0 16px",
  fontSize: 18,
  lineHeight: 2,
  fontWeight: 500,
} as const;

const H2 = {
  margin: "32px 0 16px",
  fontSize: 32,
  fontWeight: 900,
  lineHeight: 1.4,
} as const;

const CELL = {
  border: "1px solid #000",
  padding: "12px 14px",
  fontSize: 16,
  lineHeight: 1.5,
  textAlign: "left" as const,
  verticalAlign: "middle" as const,
  height: 52,
  boxSizing: "border-box" as const,
};

/** 全角/等宽感符号 + 无意义中英文，替换后尽量保持列宽稳定 */
const GLITCH_POOL = [
  ..."▓▒░▪▫■□◆◇◈▣".split(""),
  ..."＃＠％＆＊！？～＋＝＜＞｜".split(""),
  ..."ｘｑｗｍｎｂｐｋｊｈｆｄｓ".split(""),
  ..."啊哦呃嗯哈呵呜咔咚哐".split(""),
  ..."亂碼無效錯誤空白".split(""),
  ..."xyzqwmnbpkj".split(""),
  ..."#$%&*!?~+=<>|".split(""),
];

function garbleText(text: string, seed: number): string {
  let state = seed;
  return Array.from(text)
    .map((char) => {
      if (/[\s·（）、]/.test(char)) return char;
      state = (state * 9301 + 49297) % 233280;
      const roll = state / 233280;
      // 约三四成保留原字，其余替换为符号/无意义中英文
      const keepThreshold = /[\u4e00-\u9fff]/.test(char) ? 0.36 : 0.28;
      if (roll < keepThreshold) return char;
      state = (state * 9301 + 49297) % 233280;
      return GLITCH_POOL[Math.floor((state / 233280) * GLITCH_POOL.length)];
    })
    .join("");
}

function buildGarbledFields(members: InnovationAwardTeamMember[]) {
  return members.map((member, index) => ({
    major: garbleText(member.major, 1000 + index * 137),
    role: garbleText(member.role, 2000 + index * 137),
  }));
}

const FLASH_MS = 280;
const GLITCH_HOLD_MS = 10_000;

function Paragraph({ lines }: { lines: string[] }) {
  return (
    <p style={PARA}>
      {lines.map((line, index) => (
        <span key={index}>
          {line}
          {index < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </p>
  );
}

function TeamTable({
  members,
  glitch,
  garbledFields,
  onAnomaly,
  anomalyLocked,
}: {
  members: InnovationAwardTeamMember[];
  glitch: boolean;
  garbledFields: { major: string; role: string }[];
  onAnomaly: () => void;
  anomalyLocked: boolean;
}) {
  return (
    <div style={{ overflowX: "auto", margin: "16px 0 24px" }}>
      <table
        style={{
          width: "100%",
          minWidth: 640,
          borderCollapse: "collapse",
          tableLayout: "fixed",
        }}
      >
        <colgroup>
          <col style={{ width: "22%" }} />
          <col style={{ width: "38%" }} />
          <col style={{ width: "40%" }} />
        </colgroup>
        <thead>
          <tr>
            {["姓名", "专业方向", "分工"].map((heading) => (
              <th
                key={heading}
                style={{ ...CELL, fontWeight: 700, textAlign: "center" }}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => {
            const displayName = glitch ? "程野" : member.name;
            const nameStyle = {
              display: "inline-block" as const,
              minWidth: "3.5em",
              fontWeight: member.anomalyTrigger || glitch ? 700 : 400,
              color: glitch ? "#dc2626" : "inherit",
            };

            return (
              <tr key={member.name}>
                <td style={{ ...CELL, textAlign: "center" }}>
                  {member.anomalyTrigger ? (
                    <span
                      role="presentation"
                      onMouseEnter={anomalyLocked ? undefined : onAnomaly}
                      style={nameStyle}
                    >
                      {displayName}
                    </span>
                  ) : (
                    <span style={nameStyle}>{displayName}</span>
                  )}
                </td>
                <td
                  style={{
                    ...CELL,
                    color: glitch ? "#dc2626" : "inherit",
                    overflow: "hidden",
                    whiteSpace: "nowrap" as const,
                    textOverflow: "ellipsis" as const,
                  }}
                >
                  {glitch ? garbledFields[index]?.major : member.major}
                </td>
                <td
                  style={{
                    ...CELL,
                    color: glitch ? "#dc2626" : "inherit",
                    overflow: "hidden",
                    whiteSpace: "nowrap" as const,
                    textOverflow: "ellipsis" as const,
                  }}
                >
                  {glitch ? garbledFields[index]?.role : member.role}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function BlockRenderer({
  block,
  glitch,
  garbledFields,
  onAnomaly,
  anomalyLocked,
}: {
  block: InnovationAwardBlock;
  glitch: boolean;
  garbledFields: { major: string; role: string }[];
  onAnomaly: () => void;
  anomalyLocked: boolean;
}) {
  switch (block.type) {
    case "paragraph":
      return <Paragraph lines={block.lines} />;
    case "heading":
      return <h2 style={H2}>{block.text}</h2>;
    case "team-table":
      return (
        <TeamTable
          members={block.members}
          glitch={glitch}
          garbledFields={garbledFields}
          onAnomaly={onAnomaly}
          anomalyLocked={anomalyLocked}
        />
      );
    default:
      return null;
  }
}

export function InnovationAwardPageClient() {
  const [glitch, setGlitch] = useState(false);
  const [flash, setFlash] = useState(false);
  const [cluesFired, setCluesFired] = useState(false);
  const [anomalyLocked, setAnomalyLocked] = useState(false);
  const [garbledFields, setGarbledFields] = useState<
    { major: string; role: string }[]
  >([]);
  const recoveryTimerRef = useRef<number | null>(null);
  const flashTimerRef = useRef<number | null>(null);

  const teamMembers =
    innovationAward2034Page.blocks.find((b) => b.type === "team-table")
      ?.members ?? [];

  const clearTimers = useCallback(() => {
    if (recoveryTimerRef.current !== null) {
      window.clearTimeout(recoveryTimerRef.current);
      recoveryTimerRef.current = null;
    }
    if (flashTimerRef.current !== null) {
      window.clearTimeout(flashTimerRef.current);
      flashTimerRef.current = null;
    }
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const runFlash = useCallback((onComplete: () => void) => {
    setFlash(true);
    flashTimerRef.current = window.setTimeout(() => {
      setFlash(false);
      flashTimerRef.current = null;
      onComplete();
    }, FLASH_MS);
  }, []);

  const triggerAnomaly = useCallback(() => {
    if (anomalyLocked) return;
    setAnomalyLocked(true);

    runFlash(() => {
      setGarbledFields(buildGarbledFields(teamMembers));
      setGlitch(true);
      setCluesFired(true);

      recoveryTimerRef.current = window.setTimeout(() => {
        runFlash(() => {
          setGlitch(false);
          setGarbledFields([]);
        });
        recoveryTimerRef.current = null;
      }, GLITCH_HOLD_MS);
    });
  }, [anomalyLocked, runFlash, teamMembers]);

  return (
    <div style={PAGE}>
      {cluesFired && <ClueTrigger id="project_award_anomaly" />}
      {cluesFired && <ClueTrigger id="project_lin_che" />}
      {flash && (
        <div
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            background: "#000",
            pointerEvents: "none",
          }}
        />
      )}
      <div
        style={{
          filter: flash ? "invert(1)" : "none",
          position: "relative",
          zIndex: flash ? 9999 : "auto",
        }}
      >
      <style>{`
        @media (max-width: 991px) {
          .award-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .award-hero-img {
            height: 280px !important;
          }
        }
      `}</style>

      <section style={{ paddingTop: 120, paddingBottom: 0 }}>
        <div style={CONTAINER}>
          <div className="award-hero-grid" style={HERO_GRID}>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 32,
                  fontWeight: 900,
                  lineHeight: 1.5,
                }}
              >
                {innovationAward2034Page.title}
              </h1>
              <time
                dateTime={innovationAward2034Page.date}
                style={{
                  display: "block",
                  marginTop: 16,
                  color: "#717171",
                  fontSize: 16,
                  fontWeight: 800,
                }}
              >
                {innovationAward2034Page.date}
              </time>
              <p
                style={{
                  margin: "12px 0 0",
                  fontSize: 14,
                  color: "#6c757d",
                }}
              >
                {innovationAward2034Page.source}
              </p>
            </div>
            <img
              src={innovationAward2034Page.heroImage}
              alt=""
              className="award-hero-img"
              loading="eager"
              width={600}
              height={480}
              style={{
                display: "block",
                width: "100%",
                height: 420,
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: 4,
              }}
            />
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 0 100px" }}>
        <div style={{ ...CONTAINER, maxWidth: 900 }}>
          {innovationAward2034Page.blocks.map((block, index) => (
            <BlockRenderer
              key={`${block.type}-${index}`}
              block={block}
              glitch={glitch}
              garbledFields={garbledFields}
              onAnomaly={triggerAnomaly}
              anomalyLocked={anomalyLocked}
            />
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}
