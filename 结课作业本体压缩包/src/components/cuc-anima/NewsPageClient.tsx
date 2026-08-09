import Link from "next/link";
import {
  newsPageArticles,
  newsPageAssets,
  newsPageIntro,
} from "@/data/cuc-anima-news-page";

function NewsGridCard({
  slug,
  title,
  date,
  excerpt,
  image,
  href,
  external,
}: (typeof newsPageArticles)[number]) {
  const inner = (
    <div className="cuc-news-card-inner">
      <img
        src={image}
        alt=""
        className="cuc-news-card-img"
        loading="lazy"
        width={400}
        height={240}
      />
      <div className="cuc-news-card-body">
        <div className="cuc-news-card-copy">
          <h2 className="cuc-news-card-title">{title}</h2>
          <time className="cuc-news-card-date" dateTime={date}>
            {date}
          </time>
          <p className="cuc-news-card-excerpt">{excerpt}</p>
        </div>
        <div className="cuc-news-card-footer">
          <span className="cuc-news-card-underline" aria-hidden />
        </div>
      </div>
    </div>
  );

  if (external) {
    return (
      <a
        key={slug}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="cuc-news-card"
      >
        {inner}
      </a>
    );
  }

  return (
    <Link key={slug} href={href} className="cuc-news-card">
      {inner}
    </Link>
  );
}

export function NewsPageClient() {
  return (
    <div className="cuc-news-page">
      <div
        className="cuc-news-page-bg"
        aria-hidden
        style={{ backgroundImage: `url('${newsPageAssets.background}')` }}
      />
      <div className="cuc-news-page-content">
        <section className="cuc-news-section-first">
          <div className="cuc-news-container">
            <div className="cuc-news-header">
              <div className="cuc-news-header-title">
                <h1 className="cuc-news-title-big">学院新闻</h1>
              </div>
              <p className="cuc-news-intro">{newsPageIntro}</p>
            </div>
          </div>
        </section>

        <section className="cuc-news-section">
          <div className="cuc-news-container">
            <div className="cuc-news-grid">
              {newsPageArticles.map((article) => (
                <NewsGridCard key={article.slug} {...article} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
