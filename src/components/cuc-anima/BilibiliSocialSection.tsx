import { externalHref, siteAssets, socialLinks } from "@/data/cuc-anima";

const sectionStyle = { padding: "60px 20px 100px" } as const;

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gap: 64,
  alignItems: "start",
  maxWidth: 1200,
  margin: "0 auto",
} as const;

const headingRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
} as const;

const titleStyle = {
  margin: 0,
  fontSize: 32,
  fontWeight: 900,
  lineHeight: 1.2,
  color: "#343a40",
} as const;

const videoWrapStyle = {
  marginTop: 16,
  overflow: "hidden",
  borderRadius: 4,
} as const;

const iframeStyle = {
  display: "block",
  width: "100%",
  height: 500,
  border: "none",
} as const;

const socialBarStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  gap: 16,
  marginTop: 16,
  padding: 12,
  backgroundColor: "#da2128",
};

export function BilibiliSocialSection() {
  return (
    <section style={sectionStyle}>
      <div style={gridStyle}>
        <div style={{ minWidth: 0 }}>
          <div style={headingRowStyle}>
            <img src={siteAssets.playButton} alt="" width={56} height={56} />
            <h2 style={titleStyle}>动院在Bilibili</h2>
          </div>
          <div style={videoWrapStyle}>
            <iframe
              src="//player.bilibili.com/player.html?aid=883837485&bvid=BV1XK4y1s75h&cid=230972018&page=1&autoplay=0"
              allowFullScreen
              width="100%"
              height={500}
              scrolling="no"
              sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
              title="动院在Bilibili"
              style={iframeStyle}
            />
          </div>
        </div>

        <div style={{ flexShrink: 0 }}>
          <div style={headingRowStyle}>
            <img src={siteAssets.logoBgRed} alt="" width={64} height={64} />
            <h2 style={titleStyle}>关注我们</h2>
          </div>
          <div style={socialBarStyle}>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                style={{ display: "block", lineHeight: 0 }}
              >
                <img src={link.icon} alt="" width={80} height={80} style={{ display: "block" }} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FooterSection() {
  return (
    <footer className="bg-cuc-footer px-5 py-10 text-white">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <a
              href={externalHref("index.html")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={siteAssets.logoWhite}
                alt="cuc-anima-logo-white"
                width={160}
                height={80}
                className="max-w-[160px]"
              />
            </a>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto]">
            <div className="space-y-4">
              <div>
                <div className="text-sm">招生咨询：</div>
                <a href="tel:+86010-65783476" className="text-white hover:text-[#b7b7b7]">
                  +86 010-65783476
                </a>
              </div>
              <div>
                <div className="text-sm">电子邮件：</div>
                <a
                  href="mailto:cucanima2022@126.com"
                  className="text-white hover:text-[#b7b7b7]"
                >
                  cucanima2022@126.com
                </a>
              </div>
              <div>
                <div className="text-sm">地址：</div>
                <a
                  href="https://goo.gl/maps/VK59Tn8BiqGrpGDt7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#b7b7b7]"
                >
                  北京市朝阳区定福庄东街1号中国传媒大学31号楼
                </a>
              </div>
            </div>
            <div>
              <img
                src={siteAssets.qrCode}
                alt="微信公众号二维码"
                width={120}
                height={120}
                className="rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
