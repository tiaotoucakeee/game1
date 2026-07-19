import {
  virtualProduction2030Page,
  type VirtualProductionBlock,
} from "@/data/cuc-anima-virtual-production-2030";

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

const H4 = {
  margin: "20px 0 8px",
  fontSize: 18,
  fontWeight: 800,
  lineHeight: 1.5,
} as const;

const CELL = {
  border: "1px solid #000",
  padding: 16,
  verticalAlign: "top" as const,
  textAlign: "left" as const,
};

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

function CourseTable({
  rows,
}: {
  rows: Extract<VirtualProductionBlock, { type: "course-table" }>["rows"];
}) {
  return (
    <div style={{ overflowX: "auto", margin: "24px 0" }}>
      <table
        style={{
          width: "100%",
          minWidth: 640,
          borderCollapse: "collapse",
        }}
      >
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell) => (
                <td key={cell.title} style={CELL}>
                  <h3
                    style={{
                      margin: "0 0 12px",
                      fontSize: 18,
                      fontWeight: 900,
                      textAlign: "center",
                    }}
                  >
                    {cell.title}
                  </h3>
                  {cell.items.map((item) => (
                    <p
                      key={item}
                      style={{
                        margin: "0 0 8px",
                        fontSize: 16,
                        lineHeight: 1.6,
                        textAlign: "center",
                      }}
                    >
                      {item}
                    </p>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BlockRenderer({ block }: { block: VirtualProductionBlock }) {
  switch (block.type) {
    case "paragraph":
      return <Paragraph lines={block.lines} />;
    case "heading":
      return <h2 style={H2}>{block.text}</h2>;
    case "subheading":
      return <h4 style={H4}>{block.text}</h4>;
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
    case "image":
      return (
        <img
          src={block.src}
          alt={block.alt ?? ""}
          loading="lazy"
          style={{
            display: "block",
            maxWidth: "100%",
            height: "auto",
            margin: "24px auto",
          }}
        />
      );
    case "course-table":
      return <CourseTable rows={block.rows} />;
    default:
      return null;
  }
}

export function VirtualProductionPageClient() {
  return (
    <div style={PAGE}>
      <style>{`
        @media (max-width: 991px) {
          .vp-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .vp-hero-img {
            height: 280px !important;
          }
        }
      `}</style>

      <section style={{ paddingTop: 120, paddingBottom: 0 }}>
        <div style={CONTAINER}>
          <div className="vp-hero-grid" style={HERO_GRID}>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 32,
                  fontWeight: 900,
                  lineHeight: 1.5,
                }}
              >
                {virtualProduction2030Page.title}
              </h1>
              <time
                dateTime={virtualProduction2030Page.date}
                style={{
                  display: "block",
                  marginTop: 16,
                  color: "#717171",
                  fontSize: 16,
                  fontWeight: 800,
                }}
              >
                {virtualProduction2030Page.date}
              </time>
            </div>
            <img
              src={virtualProduction2030Page.heroImage}
              alt=""
              className="vp-hero-img"
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
          {virtualProduction2030Page.blocks.map((block, index) => (
            <BlockRenderer key={`${block.type}-${index}`} block={block} />
          ))}
        </div>
      </section>
    </div>
  );
}
