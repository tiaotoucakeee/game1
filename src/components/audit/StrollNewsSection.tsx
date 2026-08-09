import {
  STROLL_NEWS_IMAGES,
  STROLL_NEWS_MOSAIC,
  STROLL_NEWS_MOSAIC_HEIGHT_VH,
} from "@/data/audit-stroll";

export function StrollNewsSection({ showExtendedTiles = false }: { showExtendedTiles?: boolean }) {
  return (
    <section
      className="audit-stroll-section audit-stroll-section--news"
      aria-label="新闻片段"
      data-stroll-news-section
    >
      <div
        className="audit-stroll-news-mosaic"
        style={{ minHeight: `${STROLL_NEWS_MOSAIC_HEIGHT_VH}vh` }}
      >
        {STROLL_NEWS_MOSAIC.map((tile, order) => {
          if (order >= 3 && !showExtendedTiles) return null;

          return (
          <figure
            key={`${tile.imageIndex}-${order}`}
            className={`audit-stroll-news-tile audit-stroll-news-tile--${tile.slot}${order < 3 ? ` audit-stroll-news-tile--intro-${order}` : ""}`}
            data-stroll-news
            data-reveal-order={order}
            style={{
              left: `${tile.left}%`,
              top: `${tile.top}%`,
              width: `${tile.width}%`,
              zIndex: tile.z,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={STROLL_NEWS_IMAGES[tile.imageIndex]}
              alt=""
              className="audit-stroll-news-tile__img"
              loading={order < 3 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={order < 3 ? "high" : "auto"}
              draggable={false}
            />
          </figure>
          );
        })}
      </div>
    </section>
  );
}
