import Image from "next/image";
import { ReformPeriodTimeline } from "@/components/cuc-anima/ReformPeriodTimeline";
import {
  aboutAwardWorks,
  aboutHistoryImages,
  aboutHonorImages,
  aboutIntroParagraphs,
  aboutMajorOverview,
  aboutPageAssets,
  aboutStatIcons,
  aboutStats,
} from "@/data/cuc-anima-about";

export function AboutPageClient() {
  return (
    <div className="cuc-about-page">
      <div
        className="cuc-about-page-bg"
        aria-hidden
        style={{ backgroundImage: `url('${aboutPageAssets.background}')` }}
      />
      <div className="cuc-about-page-content">
      <section className="cuc-about-section-first">
        <div className="cuc-about-container">
          <h2 className="cuc-about-title-big">动画与数字艺术学院简介</h2>
        </div>
      </section>

      <section className="cuc-about-section">
        <div className="cuc-about-container">
          <div className="cuc-about-hero-title">
            <h2 className="cuc-about-title">学院简介</h2>
          </div>
          {aboutIntroParagraphs.map((block, index) => (
            <p
              key={index}
              className="cuc-about-para"
              dangerouslySetInnerHTML={{ __html: block.html }}
            />
          ))}
        </div>
      </section>

      <section className="cuc-about-section">
        <div className="cuc-about-container">
          <div className="cuc-about-hero-title">
            <h2 className="cuc-about-title">
              <strong>学院历史</strong>
            </h2>
          </div>
          <div className="cuc-about-history-grid">
            {aboutHistoryImages.map((src) => (
              <img key={src} src={src} alt="学院历史" loading="lazy" />
            ))}
            <ReformPeriodTimeline />
          </div>
        </div>
      </section>

      <section className="cuc-about-section">
        <div className="cuc-about-container">
          <div className="cuc-about-hero-title">
            <h2 className="cuc-about-title">
              <strong>学院专业概述</strong>
            </h2>
          </div>
          <div className="cuc-about-richtext">
            {aboutMajorOverview.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="cuc-about-section">
        <div className="cuc-about-container">
          <div className="cuc-about-center-title">
            <h2 className="cuc-about-title">数据速览</h2>
          </div>
          <div className="cuc-about-data-grid">
            {aboutStats.map((stat) => (
              <div key={stat.label} className="cuc-about-data-item">
                <div className="cuc-about-data-value-wrap">
                  <div className="cuc-about-data-value">{stat.value}</div>
                  <img
                    src={aboutStatIcons[stat.icon]}
                    alt=""
                    className="cuc-about-data-icon"
                    aria-hidden
                  />
                </div>
                <div className="cuc-about-data-label">
                  <h4>{stat.label}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cuc-about-section">
        <div className="cuc-about-container">
          <div className="cuc-about-center-title">
            <h2 className="cuc-about-title">荣誉</h2>
          </div>
          <div className="cuc-about-honor-grid">
            {aboutHonorImages.map((src) => (
              <img key={src} src={src} alt="学院荣誉" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      <section className="cuc-about-section-last">
        <div className="cuc-about-container">
          <div className="cuc-about-center-title">
            <h2 className="cuc-about-title">主要获奖作品</h2>
          </div>
          <div className="cuc-about-awards-grid">
            {aboutAwardWorks.map((work) => (
              <div key={work.title} className="cuc-about-award-card">
                <div>
                  <img src={work.image} alt={work.title} loading="lazy" />
                  <div className="cuc-about-award-content">
                    <h4>{work.title}</h4>
                    <p>
                      {work.description.split("\n").map((line, index) => (
                        <span key={index}>
                          {index > 0 ? <br /> : null}
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
                <a
                  href={work.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cuc-about-watch-btn"
                >
                  <span className="cuc-about-watch-btn-inner">
                    <span>{work.watchLabel}</span>
                    <Image
                      src={aboutPageAssets.watchArrow}
                      alt=""
                      width={14}
                      height={14}
                    />
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
