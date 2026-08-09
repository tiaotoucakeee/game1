"use client";

import type { ReactNode } from "react";
import { ClueTrigger } from "@/components/game/ClueTrigger";
import {
  shanhaiLampGraduation2034Page,
  type ShanhaiLampNewsBlock,
} from "@/data/cuc-anima-shanhai-lamp-graduation-2034";
import { LIN_CHE } from "@/data/game";

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

function highlightLinChe(text: string) {
  const lead = LIN_CHE.name;
  if (!text.includes(lead)) return text;
  const parts = text.split(lead);
  return parts.reduce<ReactNode[]>((nodes, part, index) => {
    if (part) nodes.push(part);
    if (index < parts.length - 1) {
      nodes.push(<strong key={`${index}-${lead}`}>{lead}</strong>);
    }
    return nodes;
  }, []);
}

function Paragraph({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line) => (
        <p key={line.slice(0, 32)} style={PARA}>
          {highlightLinChe(line)}
        </p>
      ))}
    </>
  );
}

function BlockRenderer({ block }: { block: ShanhaiLampNewsBlock }) {
  switch (block.type) {
    case "paragraph":
      return <Paragraph lines={block.lines} />;
    case "heading":
      return <h2 style={H2}>{block.text}</h2>;
    default:
      return null;
  }
}

export function ShanhaiLampNewsPageClient() {
  const page = shanhaiLampGraduation2034Page;

  return (
    <div style={PAGE}>
      <ClueTrigger id="project_lin_che" />
      <style>{`
        @media (max-width: 991px) {
          .shanhai-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .shanhai-hero-img {
            height: 280px !important;
          }
        }
      `}</style>

      <section style={{ paddingTop: 120, paddingBottom: 0 }}>
        <div style={CONTAINER}>
          <div className="shanhai-hero-grid" style={HERO_GRID}>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 32,
                  fontWeight: 900,
                  lineHeight: 1.5,
                }}
              >
                {page.title}
              </h1>
              <time
                dateTime={page.date}
                style={{
                  display: "block",
                  marginTop: 16,
                  color: "#717171",
                  fontSize: 16,
                  fontWeight: 800,
                }}
              >
                {page.date}
              </time>
              <p style={{ margin: "12px 0 0", fontSize: 14, color: "#6c757d" }}>{page.source}</p>
            </div>
            <img
              src={page.heroImage}
              alt=""
              className="shanhai-hero-img"
              loading="eager"
              width={600}
              height={480}
              style={{
                display: "block",
                width: "100%",
                height: 420,
                objectFit: "cover",
                objectPosition: "center center",
                borderRadius: 4,
              }}
            />
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 0 100px" }}>
        <div style={{ ...CONTAINER, maxWidth: 900 }}>
          {page.blocks.map((block, index) => (
            <BlockRenderer key={`${block.type}-${index}`} block={block} />
          ))}
        </div>
      </section>
    </div>
  );
}
