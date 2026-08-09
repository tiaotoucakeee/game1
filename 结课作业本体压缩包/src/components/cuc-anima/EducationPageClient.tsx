import Link from "next/link";
import { ClueTrigger } from "@/components/game/ClueTrigger";
import { majorGroups } from "@/data/cuc-anima-majors";
import {
  aniAiIntro,
  educationIntro,
  educationPageAssets,
  legacyMajorMapping,
} from "@/data/cuc-anima-education";

const PAGE = {
  position: "relative" as const,
  color: "#343a40",
  fontFamily: "var(--font-mulish, Mulish, sans-serif)",
};

const BG = {
  position: "fixed" as const,
  inset: 0,
  zIndex: 0,
  backgroundImage: `url('${educationPageAssets.background}')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "50%",
  pointerEvents: "none" as const,
};

const WRAP = {
  position: "relative" as const,
  zIndex: 1,
  maxWidth: 1200,
  margin: "0 auto",
  padding: "0 20px",
};

const H1 = {
  margin: "0 0 24px",
  fontSize: 40,
  fontWeight: 900,
  lineHeight: 1.4,
};

const INTRO = {
  margin: 0,
  fontSize: 18,
  lineHeight: 1.75,
  whiteSpace: "pre-line" as const,
};

const SECTION = {
  padding: "80px 0 0",
};

const SECTION_LAST = {
  padding: "80px 0 120px",
};

function SectionTitle({ title }: { title: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: 40,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <img
          src={educationPageAssets.logoRed}
          alt=""
          width={56}
          height={56}
          style={{ display: "block", flexShrink: 0 }}
          aria-hidden
        />
        <h2
          style={{
            margin: 0,
            fontSize: 32,
            fontWeight: 900,
            lineHeight: 1.4,
          }}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}

export function EducationPageClient() {
  return (
    <div style={PAGE}>
      <style>{`
        .edu-major-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        @media (max-width: 991px) {
          .edu-major-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div aria-hidden style={BG} />

      <div style={{ ...WRAP, paddingTop: 180 }}>
        <h1 style={H1}>专业介绍</h1>
        <p style={INTRO}>{educationIntro}</p>
      </div>

      <section id="undergraduate" style={SECTION}>
        <div style={WRAP}>
          <SectionTitle title="本科" />
          <div className="edu-major-grid">
            {majorGroups.map((group) => (
              <article
                key={group.slug}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "#fff",
                  border: "1px solid #b7b7b7",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <img
                  src={group.image}
                  alt=""
                  loading="lazy"
                  width={400}
                  height={240}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
                <div style={{ padding: 16 }}>
                  <h4
                    style={{
                      margin: "0 0 8px",
                      fontSize: 18,
                      fontWeight: 900,
                    }}
                  >
                    {group.title}
                  </h4>
                  {group.directions.map((direction) => (
                    <Link
                      key={direction.label}
                      href={`/anima/majors/${group.slug}`}
                      style={{
                        display: "block",
                        padding: "14px 0",
                        fontSize: 15,
                        lineHeight: 1.45,
                        color: "#343a40",
                        textDecoration: "none",
                        borderBottom: "1px solid #f5f5f5",
                      }}
                    >
                      {direction.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={SECTION_LAST}>
        <div style={WRAP}>
          <SectionTitle title="2034 培养方案" />
          <div
            style={{
              padding: 24,
              background: "#fff",
              border: "1px solid #b7b7b7",
              borderRadius: 4,
            }}
          >
            <h3 style={{ margin: "0 0 16px", fontSize: 22, fontWeight: 900 }}>
              Ani AI 智能畅课平台
            </h3>
            <ClueTrigger id="ai_cross_media" />
            <p style={{ margin: "16px 0", fontSize: 16, lineHeight: 1.75 }}>
              {aniAiIntro}
            </p>

            <h3
              style={{
                margin: "32px 0 16px",
                fontSize: 22,
                fontWeight: 900,
              }}
            >
              新旧专业对照
            </h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
              }}
            >
              <thead>
                <tr style={{ background: "#f8f9fa" }}>
                  <th
                    style={{
                      padding: 12,
                      textAlign: "left",
                      borderBottom: "1px solid #ececec",
                    }}
                  >
                    原专业方向
                  </th>
                  <th
                    style={{
                      padding: 12,
                      textAlign: "left",
                      borderBottom: "1px solid #ececec",
                    }}
                  >
                    2034 模块归属
                  </th>
                </tr>
              </thead>
              <tbody>
                {legacyMajorMapping.map((row) => (
                  <tr key={row.legacy}>
                    <td
                      style={{
                        padding: 12,
                        borderBottom: "1px solid #ececec",
                      }}
                    >
                      {row.legacy}
                    </td>
                    <td
                      style={{
                        padding: 12,
                        borderBottom: "1px solid #ececec",
                      }}
                    >
                      {row.module}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p
              style={{
                margin: "16px 0 0",
                fontSize: 14,
                color: "#6c757d",
              }}
            >
              原有课程并未消失，而是被重新拆分为可组合的跨专业能力模块。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
