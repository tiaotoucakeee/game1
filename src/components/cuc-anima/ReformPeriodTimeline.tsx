import { aboutReformTimeline } from "@/data/cuc-anima-about";

export function ReformPeriodTimeline() {
  return (
    <div className="cuc-about-reform-timeline" aria-label="改革期学院历史">
      <div className="cuc-about-reform-spine" aria-hidden />
      <h3 className="cuc-about-reform-title">{aboutReformTimeline.title}</h3>
      <div className="cuc-about-reform-events">
        {aboutReformTimeline.events.map((event) => (
          <article
            key={event.year}
            className={`cuc-about-reform-event cuc-about-reform-event--${event.side}`}
          >
            <div className="cuc-about-reform-branch">
              {event.side === "left" ? (
                <>
                  <span className="cuc-about-reform-year">{event.year}</span>
                  <span className="cuc-about-reform-line" aria-hidden />
                </>
              ) : (
                <>
                  <span className="cuc-about-reform-line" aria-hidden />
                  <span className="cuc-about-reform-year">{event.year}</span>
                </>
              )}
            </div>
            <p className="cuc-about-reform-desc">{event.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
