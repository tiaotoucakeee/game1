import Link from "next/link";
import { ClueTrigger } from "@/components/game/ClueTrigger";
import {
  aniAiLaunch2030Page,
  type AniAiLaunchBlock,
} from "@/data/cuc-anima-ani-ai-launch";

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

function UsageCallout() {
  return (
    <div
      style={{
        margin: "32px 0",
        padding: "24px 28px",
        background: "#f8f9fa",
        border: "1px solid #b7b7b7",
        borderRadius: 4,
        borderLeft: "4px solid #0050a0",
      }}
    >
      <h2
        style={{
          margin: "0 0 12px",
          fontSize: 24,
          fontWeight: 900,
          lineHeight: 1.4,
        }}
      >
        如何使用 Ani AI
      </h2>
      <p style={{ ...PARA, margin: "0 0 12px" }}>
        请登录
        <Link
          href="/student"
          style={{
            margin: "0 4px",
            color: "#007bff",
            textDecoration: "underline",
            fontWeight: 700,
          }}
        >
          学生个人系统
        </Link>
        ，进入个人主页后，点击页面<strong>左下角的小狐狸头像</strong>，即可与 Ani
        AI 开始对话。
      </p>
      <p style={{ ...PARA, margin: 0, fontSize: 16, color: "#6c757d" }}>
        小狐狸是 Ani AI 的入口图标。若尚未登录，请使用学号与密码进入系统后再操作。
      </p>
    </div>
  );
}

function BlockRenderer({ block }: { block: AniAiLaunchBlock }) {
  switch (block.type) {
    case "paragraph":
      return <Paragraph lines={block.lines} />;
    case "heading":
      return <h2 style={H2}>{block.text}</h2>;
    case "subheading":
      return (
        <h4
          style={{
            margin: "20px 0 8px",
            fontSize: 18,
            fontWeight: 800,
          }}
        >
          {block.text}
        </h4>
      );
    case "bold":
      return (
        <p style={{ ...PARA, fontWeight: 800 }}>
          {block.lines.map((line, index) => (
            <span key={index}>
              {line}
              {index < block.lines.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>
      );
    case "list":
      return (
        <ul
          style={{
            margin: "0 0 16px",
            paddingLeft: 24,
            fontSize: 18,
            lineHeight: 2,
          }}
        >
          {block.items.map((item) => (
            <li key={item} style={{ marginBottom: 4 }}>
              {item}
            </li>
          ))}
        </ul>
      );
    case "usage-callout":
      return <UsageCallout />;
    default:
      return null;
  }
}

export function AniAiLaunchPageClient() {
  return (
    <div style={PAGE}>
      <ClueTrigger id="ai_ani_platform" />
      <style>{`
        @media (max-width: 991px) {
          .ani-ai-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .ani-ai-hero-img {
            height: 280px !important;
          }
        }
      `}</style>

      <section style={{ paddingTop: 120, paddingBottom: 0 }}>
        <div style={CONTAINER}>
          <div className="ani-ai-hero-grid" style={HERO_GRID}>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 32,
                  fontWeight: 900,
                  lineHeight: 1.5,
                }}
              >
                {aniAiLaunch2030Page.title}
              </h1>
              <time
                dateTime={aniAiLaunch2030Page.date}
                style={{
                  display: "block",
                  marginTop: 16,
                  color: "#717171",
                  fontSize: 16,
                  fontWeight: 800,
                }}
              >
                {aniAiLaunch2030Page.date}
              </time>
            </div>
            <img
              src={aniAiLaunch2030Page.heroImage}
              alt=""
              className="ani-ai-hero-img"
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
          {aniAiLaunch2030Page.blocks.map((block, index) => (
            <BlockRenderer key={`${block.type}-${index}`} block={block} />
          ))}
        </div>
      </section>
    </div>
  );
}
