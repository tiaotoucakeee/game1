import {
  aniwowAward2030Entries,
  aniwowAward2030Page,
} from "@/data/cuc-anima-aniwow-award-2030";

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

const CELL = {
  border: "1px solid #000",
  fontSize: 18,
  textAlign: "center" as const,
  padding: "14px 12px",
  lineHeight: 1.4,
};

export function AniwowAwardPageClient() {
  return (
    <div style={PAGE}>
      <style>{`
        @media (max-width: 991px) {
          .aniwow-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .aniwow-hero-img {
            height: 280px !important;
          }
        }
      `}</style>

      <section style={{ paddingTop: 120, paddingBottom: 0 }}>
        <div style={CONTAINER}>
          <div className="aniwow-hero-grid" style={HERO_GRID}>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 32,
                  fontWeight: 900,
                  lineHeight: 1.5,
                }}
              >
                {aniwowAward2030Page.title}
              </h1>
              <time
                dateTime={aniwowAward2030Page.date}
                style={{
                  display: "block",
                  marginTop: 16,
                  color: "#717171",
                  fontSize: 16,
                  fontWeight: 800,
                }}
              >
                {aniwowAward2030Page.date}
              </time>
            </div>
            <img
              src={aniwowAward2030Page.heroImage}
              alt=""
              className="aniwow-hero-img"
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
          <p
            style={{
              margin: "0 0 24px",
              fontSize: 18,
              lineHeight: 2,
              fontWeight: 500,
            }}
          >
            {aniwowAward2030Page.intro}
          </p>

          <div style={{ overflowX: "auto", marginBottom: 32 }}>
            <table
              style={{
                width: "100%",
                minWidth: 640,
                borderCollapse: "collapse",
                background: "#fff",
              }}
            >
              <thead>
                <tr>
                  {["姓名", "奖项", "参赛类别"].map((heading) => (
                    <th key={heading} style={{ ...CELL, fontWeight: 700 }}>
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {aniwowAward2030Entries.map((entry, index) => (
                  <tr key={`${entry.name}-${index}`}>
                    <td style={CELL}>{entry.name}</td>
                    <td style={CELL}>{entry.award}</td>
                    <td style={CELL}>{entry.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            {aniwowAward2030Page.footerLines.map((line) => (
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
