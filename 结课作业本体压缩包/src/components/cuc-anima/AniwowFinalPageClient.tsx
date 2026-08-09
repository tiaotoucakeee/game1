import Link from "next/link";
import {
  aniwowFinal2030Page,
  type AniwowFinalBlock,
} from "@/data/cuc-anima-aniwow-final-2030";

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

const HEADING = {
  margin: "24px 0 16px",
  fontSize: 18,
  fontWeight: 900,
  lineHeight: 1.6,
} as const;

function renderParagraphLines(lines: string[]) {
  return lines.map((line, index) => {
    const parts = line.split("(/student)");
    if (parts.length === 2) {
      return (
        <span key={index}>
          {parts[0]}
          <Link href="/student" style={{ color: "#007bff", textDecoration: "underline" }}>
            /student
          </Link>
          {parts[1]}
          {index < lines.length - 1 ? <br /> : null}
        </span>
      );
    }

    return (
      <span key={index}>
        {line}
        {index < lines.length - 1 ? <br /> : null}
      </span>
    );
  });
}

function RichBlock({ block }: { block: AniwowFinalBlock }) {
  if (block.type === "heading") {
    return <p style={HEADING}>{block.text}</p>;
  }

  return <p style={PARA}>{renderParagraphLines(block.lines)}</p>;
}

export function AniwowFinalPageClient() {
  return (
    <div style={PAGE}>
      <style>{`
        @media (max-width: 991px) {
          .aniwow-final-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .aniwow-final-hero-img {
            height: 280px !important;
          }
        }
      `}</style>

      <section style={{ paddingTop: 120, paddingBottom: 0 }}>
        <div style={CONTAINER}>
          <div className="aniwow-final-hero-grid" style={HERO_GRID}>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 32,
                  fontWeight: 900,
                  lineHeight: 1.5,
                }}
              >
                {aniwowFinal2030Page.title}
              </h1>
              <time
                dateTime={aniwowFinal2030Page.date}
                style={{
                  display: "block",
                  marginTop: 16,
                  color: "#717171",
                  fontSize: 16,
                  fontWeight: 800,
                }}
              >
                {aniwowFinal2030Page.date}
              </time>
            </div>
            <img
              src={aniwowFinal2030Page.heroImage}
              alt=""
              className="aniwow-final-hero-img"
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
        <div style={CONTAINER}>
          {aniwowFinal2030Page.blocks.map((block, index) => (
            <RichBlock key={`${block.type}-${index}`} block={block} />
          ))}

          <div style={{ marginTop: 32 }}>
            {aniwowFinal2030Page.footerLines.map((line) => (
              <p
                key={line}
                style={{
                  margin: "0 0 12px",
                  fontSize: 18,
                  lineHeight: 2,
                  textAlign: "right",
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
