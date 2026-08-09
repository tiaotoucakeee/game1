"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { isAuditEmbedContext } from "@/lib/audit-embed";
import { useGame } from "@/lib/game-state";
import { StrollNewsSection } from "@/components/audit/StrollNewsSection";
import {
  STROLL_BRAND_FADE_MS,
  STROLL_COMFORT_LINES,
  STROLL_CREDITS,
  STROLL_CREDITS_ROLL_MS,
  STROLL_ENCOURAGE_FADE_MS,
  STROLL_ENCOURAGE_HOLD_MS,
  STROLL_ENCOURAGEMENT,
  STROLL_FINALE_MAIL_LINK_DELAY_MS,
  STROLL_FINALE_MAIL_LINK_LABEL,
  STROLL_NEWS_EXTENDED_MOUNT_MS,
  STROLL_NEWS_IMAGES,
  STROLL_SCHOOL_NAME,
  STROLL_SCROLL_DURATION_MS,
  STROLL_SCROLL_SPEED_BOOST,
} from "@/data/audit-stroll";

type StrollPhase = "scroll" | "encourage_hold" | "encourage_fade" | "credits" | "brand";

type StrollLayoutCache = {
  vh: number;
  scrollTarget: number;
  quotesTop: number;
  newsEls: HTMLElement[];
  newsTops: number[];
  quoteEls: HTMLElement[];
  quoteLayout: Array<{ top: number; height: number }>;
  encourageTop: number;
  encourageHeight: number;
};

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

/** 匀速滚动，progress 0→1 线性映射 */
function mapScrollProgress(t: number) {
  return t;
}

function setNewsTileOpacity(el: HTMLElement, opacity: number) {
  if (opacity <= 0.01) {
    el.style.removeProperty("opacity");
    el.classList.remove("is-revealed");
    return;
  }
  el.style.opacity = String(opacity);
  el.classList.add("is-revealed");
}

function layoutTop(el: HTMLElement, track: HTMLElement) {
  const tr = track.getBoundingClientRect();
  const er = el.getBoundingClientRect();
  return er.top - tr.top;
}

function measureStrollLayout(track: HTMLElement, viewport: HTMLElement): StrollLayoutCache {
  const vh = viewport.clientHeight;
  const newsSection = track.querySelector<HTMLElement>("[data-stroll-news-section]");
  const quotesSection = track.querySelector<HTMLElement>("[data-stroll-quotes-section]");
  const encourageSection = track.querySelector<HTMLElement>("[data-stroll-encourage-section]");
  const newsEls = Array.from(track.querySelectorAll<HTMLElement>("[data-stroll-news]"));
  const quoteEls = Array.from(track.querySelectorAll<HTMLElement>("[data-stroll-quote]"));

  const scrollTarget = encourageSection
    ? Math.max(0, layoutTop(encourageSection, track) - (vh - encourageSection.offsetHeight) * 0.5)
    : Math.max(0, track.offsetHeight - vh);

  return {
    vh,
    scrollTarget,
    quotesTop: quotesSection ? layoutTop(quotesSection, track) : 0,
    newsEls,
    newsTops: newsEls.map((el) => layoutTop(el, track)),
    quoteEls,
    quoteLayout: quoteEls.map((el) => ({
      top: layoutTop(el, track),
      height: el.offsetHeight,
    })),
    encourageTop: encourageSection ? layoutTop(encourageSection, track) : 0,
    encourageHeight: encourageSection?.offsetHeight ?? 0,
  };
}

function applyTrackOffset(track: HTMLElement, offset: number) {
  track.style.transform = `translate3d(0, ${-offset}px, 0)`;
}

function preloadImages(urls: string[]) {
  return Promise.all(
    urls.map(async (src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      try {
        await img.decode();
      } catch {
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      }
    }),
  );
}

function creditsRollTranslateY(vh: number, contentHeight: number, progress: number) {
  const h = Math.max(contentHeight, vh * 0.9);
  const t = clamp01(progress);
  const startY = vh;
  const endY = -h;
  return startY + (endY - startY) * t;
}

function quoteSequenceOpacity(
  scrollTop: number,
  elTop: number,
  elHeight: number,
  vh: number,
  prevBottom: number | null,
) {
  const viewTop = scrollTop;
  const viewBottom = scrollTop + vh;
  const elBottom = elTop + elHeight;

  if (elBottom < viewTop || elTop > viewBottom) return 0;

  const fadeOutStart = elBottom - vh * 0.1;
  const fadeOutEnd = elBottom + vh * 0.28;
  const fadeOut = 1 - clamp01((viewTop - fadeOutStart) / (fadeOutEnd - fadeOutStart));

  let fadeIn: number;
  if (prevBottom === null) {
    const fadeInStart = elTop - vh * 0.38;
    const fadeInEnd = elTop + vh * 0.1;
    fadeIn = clamp01((viewBottom - fadeInStart) / (fadeInEnd - fadeInStart));
  } else {
    const gap = prevBottom - viewTop;
    const handoffStart = vh * 0.42;
    const handoffEnd = vh * 0.1;
    fadeIn = clamp01((handoffStart - gap) / (handoffStart - handoffEnd));
  }

  return clamp01(fadeIn * fadeOut);
}

function StrollCreditsContent() {
  return (
    <>
      <p className="audit-stroll-credits__kicker">尾飞</p>
      <h2 className="audit-stroll-credits__project">{STROLL_CREDITS.projectTitle}</h2>
      <p className="audit-stroll-credits__subtitle">{STROLL_CREDITS.projectSubtitle}</p>

      <div className="audit-stroll-credits__block">
        <h3>{STROLL_CREDITS.courseTitle}</h3>
        {STROLL_CREDITS.courseLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <div className="audit-stroll-credits__block">
        <h3>{STROLL_CREDITS.membersTitle}</h3>
        {STROLL_CREDITS.members.map((name) => (
          <p key={name}>{name}</p>
        ))}
      </div>

      {STROLL_CREDITS.roles.map((role) => (
        <div key={role.title} className="audit-stroll-credits__block">
          <h3>{role.title}</h3>
          {role.names.map((name) => (
            <p key={name}>{name}</p>
          ))}
        </div>
      ))}

      <div className="audit-stroll-credits__block">
        <h3>{STROLL_CREDITS.advisorTitle}</h3>
        {STROLL_CREDITS.advisors.map((name) => (
          <p key={name}>{name}</p>
        ))}
      </div>
    </>
  );
}

export default function AuditStrollPage() {
  const { setStrollThanksMailUnlocked } = useGame();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const creditsRollRef = useRef<HTMLDivElement>(null);
  const creditsMeasureRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const startedRef = useRef(false);
  const progressRef = useRef(0);
  const lastFrameRef = useRef<number | null>(null);
  const speedRef = useRef(1);
  const finishedRef = useRef(false);
  const phaseRef = useRef<StrollPhase>("scroll");
  const phaseStartRef = useRef(0);
  const scrollTargetRef = useRef(0);
  const creditsProgressRef = useRef(0);
  const creditsHeightRef = useRef(0);
  const encourageOverrideRef = useRef<number | null>(null);
  const layoutCacheRef = useRef<StrollLayoutCache | null>(null);
  const scrollOffsetRef = useRef(0);
  const updateFromScrollRef = useRef<(scrollOffset: number) => void>(() => {});
  const measureCreditsRef = useRef<() => number>(() => 0);
  const finishPlaybackRef = useRef<() => void>(() => {});

  const [trackOpacity, setTrackOpacity] = useState(1);
  const [brandOpacity, setBrandOpacity] = useState(0);
  const [creditsLayerOpacity, setCreditsLayerOpacity] = useState(0);
  const [mailLinkVisible, setMailLinkVisible] = useState(false);
  const [isAccelerating, setIsAccelerating] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);
  const [encourageOverride, setEncourageOverride] = useState<number | null>(null);
  const [newsIntroDone, setNewsIntroDone] = useState(false);
  const [creditsActive, setCreditsActive] = useState(false);
  const [creditsHeight, setCreditsHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(800);

  const updateFromScroll = useCallback((scrollOffset: number) => {
    if (phaseRef.current !== "scroll") return;

    const layout = layoutCacheRef.current;
    const track = trackRef.current;
    if (!layout || !track) return;

    const { vh, quotesTop, newsEls, newsTops, quoteEls, quoteLayout } = layout;
    const scrollTarget = scrollTargetRef.current;

    const fadeStart = quotesTop - vh * 1.05;
    const fadeEnd = quotesTop - vh * 0.25;
    const sectionFade = 1 - clamp01((scrollOffset - fadeStart) / (fadeEnd - fadeStart));
    const revealLine = scrollOffset + vh * 0.74;

    newsEls.forEach((el, index) => {
      const order = Number(el.dataset.revealOrder ?? index);

      if (order < 3) {
        if (sectionFade < 0.999) {
          setNewsTileOpacity(el, sectionFade);
        }
        return;
      }

      const top = newsTops[index] ?? 0;
      const revealStart = top - vh * 0.12;
      const revealEnd = top + vh * 0.06;
      let itemIn = clamp01((revealLine - revealStart) / (revealEnd - revealStart));
      if (order > 0) {
        const prevTop = newsTops[order - 1] ?? top;
        const prevStart = prevTop - vh * 0.12;
        const prevEnd = prevTop + vh * 0.06;
        const prevIn = clamp01((revealLine - prevStart) / (prevEnd - prevStart));
        itemIn = Math.min(itemIn, clamp01(prevIn * 1.4));
      }

      setNewsTileOpacity(el, itemIn * sectionFade);
    });

    let prevTextBottom: number | null = null;
    if (scrollOffset + vh > quotesTop - vh * 0.5) {
      quoteEls.forEach((el, index) => {
        const { top, height } = quoteLayout[index] ?? { top: 0, height: 0 };
        el.style.opacity = String(
          quoteSequenceOpacity(scrollOffset, top, height, vh, prevTextBottom),
        );
        prevTextBottom = top + height;
      });

      const encourageEl = track.querySelector<HTMLElement>("[data-stroll-encourage]");
      if (encourageEl && encourageOverrideRef.current === null) {
        encourageEl.style.opacity = String(
          quoteSequenceOpacity(
            scrollOffset,
            layout.encourageTop,
            layout.encourageHeight,
            vh,
            prevTextBottom,
          ),
        );
      }
    }
  }, []);

  updateFromScrollRef.current = updateFromScroll;

  const finishPlayback = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setCreditsActive(false);
    setCreditsLayerOpacity(0);
    setHintVisible(false);
    setBrandOpacity(1);
    setStrollThanksMailUnlocked(true);
    window.setTimeout(() => setMailLinkVisible(true), STROLL_FINALE_MAIL_LINK_DELAY_MS);
  }, [setStrollThanksMailUnlocked]);

  const measureCredits = useCallback(() => {
    const el = creditsMeasureRef.current;
    if (!el) return 0;
    const height = el.offsetHeight;
    creditsHeightRef.current = height;
    setCreditsHeight(height);
    return height;
  }, []);

  measureCreditsRef.current = measureCredits;
  finishPlaybackRef.current = finishPlayback;

  const refreshLayout = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return null;

    applyTrackOffset(track, scrollOffsetRef.current);
    const layout = measureStrollLayout(track, viewport);
    layoutCacheRef.current = layout;
    scrollTargetRef.current = layout.scrollTarget;
    setViewportHeight(layout.vh);
    return layout;
  }, []);

  const runPlayback = useCallback(async () => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || startedRef.current) return;

    await preloadImages(STROLL_NEWS_IMAGES.slice(0, 3));

    startedRef.current = true;
    measureCreditsRef.current();
    refreshLayout();
    applyTrackOffset(track, 0);

    void preloadImages(STROLL_NEWS_IMAGES.slice(3));

    phaseRef.current = "scroll";
    phaseStartRef.current = performance.now();
    lastFrameRef.current = null;
    progressRef.current = 0;

    window.setTimeout(() => {
      setNewsIntroDone(true);
      refreshLayout();
      updateFromScrollRef.current(scrollOffsetRef.current);
    }, STROLL_NEWS_EXTENDED_MOUNT_MS);

    const trackEl = track;
    const viewportEl = viewport;

    function applyScrollOffset(offset: number) {
      scrollOffsetRef.current = offset;
      applyTrackOffset(trackEl, offset);
    }

    function applyCreditsTransform(progress: number) {
      const rollEl = creditsRollRef.current;
      if (!rollEl) return;
      const vh = layoutCacheRef.current?.vh ?? viewportEl.clientHeight;
      const contentHeight = creditsHeightRef.current || vh * 0.9;
      const y = creditsRollTranslateY(vh, contentHeight, progress);
      rollEl.style.transform = `translate3d(0, ${y}px, 0)`;
    }

    function tick(now: number) {
      if (lastFrameRef.current === null) lastFrameRef.current = now;
      const delta = now - lastFrameRef.current;
      lastFrameRef.current = now;
      const speed = speedRef.current;

      switch (phaseRef.current) {
        case "scroll": {
          progressRef.current = Math.min(
            1,
            progressRef.current + (delta / STROLL_SCROLL_DURATION_MS) * speed,
          );
          const t = progressRef.current;
          const scrollT = mapScrollProgress(t);
          const offset = scrollT * scrollTargetRef.current;
          applyScrollOffset(offset);
          updateFromScrollRef.current(offset);

          if (progressRef.current >= 1) {
            applyScrollOffset(scrollTargetRef.current);
            phaseRef.current = "encourage_hold";
            phaseStartRef.current = now;
            encourageOverrideRef.current = 1;
            setEncourageOverride(1);
            const encourageEl = trackEl.querySelector<HTMLElement>("[data-stroll-encourage]");
            if (encourageEl) encourageEl.style.opacity = "1";
            setHintVisible(false);
          }
          break;
        }
        case "encourage_hold": {
          applyScrollOffset(scrollTargetRef.current);
          if (now - phaseStartRef.current >= STROLL_ENCOURAGE_HOLD_MS / speed) {
            phaseRef.current = "encourage_fade";
            phaseStartRef.current = now;
          }
          break;
        }
        case "encourage_fade": {
          applyScrollOffset(scrollTargetRef.current);
          const fadeT = clamp01((now - phaseStartRef.current) / (STROLL_ENCOURAGE_FADE_MS / speed));
          const opacity = 1 - fadeT;
          encourageOverrideRef.current = opacity;
          const encourageEl = trackEl.querySelector<HTMLElement>("[data-stroll-encourage]");
          if (encourageEl) encourageEl.style.opacity = String(opacity);
          if (fadeT >= 1) {
            encourageOverrideRef.current = 0;
            setEncourageOverride(0);
            if (encourageEl) encourageEl.style.opacity = "0";
            const measured = measureCreditsRef.current();
            if (measured === 0) {
              creditsHeightRef.current = viewportEl.clientHeight * 1.2;
              setCreditsHeight(creditsHeightRef.current);
            }
            phaseRef.current = "credits";
            phaseStartRef.current = now;
            creditsProgressRef.current = 0;
            applyCreditsTransform(0);
            setCreditsActive(true);
            setCreditsLayerOpacity(1);
            setTrackOpacity(0);
            setHintVisible(true);
          }
          break;
        }
        case "credits": {
          if (creditsHeightRef.current === 0) {
            measureCreditsRef.current();
          }
          creditsProgressRef.current = Math.min(
            1,
            creditsProgressRef.current + (delta / STROLL_CREDITS_ROLL_MS) * speed,
          );
          applyCreditsTransform(creditsProgressRef.current);
          if (creditsProgressRef.current >= 1) {
            phaseRef.current = "brand";
            phaseStartRef.current = now;
            setHintVisible(false);
          }
          break;
        }
        case "brand": {
          const brandT = clamp01((now - phaseStartRef.current) / (STROLL_BRAND_FADE_MS / speed));
          setTrackOpacity(0);
          setCreditsLayerOpacity(1 - brandT);
          setBrandOpacity(brandT);
          if (brandT >= 1) {
            setCreditsActive(false);
            setCreditsLayerOpacity(0);
            finishPlaybackRef.current();
            return;
          }
          break;
        }
        default:
          break;
      }

      if (!finishedRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [refreshLayout]);

  useEffect(() => {
    if (isAuditEmbedContext() && window.self !== window.top) {
      window.top!.location.href = "/audit/stroll";
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("audit-stroll-fullscreen");
    document.body.classList.add("audit-stroll-fullscreen");
    return () => {
      document.documentElement.classList.remove("audit-stroll-fullscreen");
      document.body.classList.remove("audit-stroll-fullscreen");
    };
  }, []);

  useEffect(() => {
    measureCredits();
    const onResize = () => {
      measureCredits();
      refreshLayout();
      updateFromScrollRef.current(scrollOffsetRef.current);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measureCredits, refreshLayout]);

  useEffect(() => {
    refreshLayout();
  }, [refreshLayout, newsIntroDone]);

  useEffect(() => {
    const timer = window.setTimeout(runPlayback, 120);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
      startedRef.current = false;
    };
  }, [runPlayback]);

  useEffect(() => {
    const root = viewportRef.current;
    if (!root) return;

    let pressTimer: number | null = null;

    function startAccelerate() {
      speedRef.current = STROLL_SCROLL_SPEED_BOOST;
      setIsAccelerating(true);
    }

    function stopAccelerate() {
      if (pressTimer !== null) {
        window.clearTimeout(pressTimer);
        pressTimer = null;
      }
      speedRef.current = 1;
      setIsAccelerating(false);
    }

    function onPressStart() {
      if (pressTimer !== null) window.clearTimeout(pressTimer);
      pressTimer = window.setTimeout(startAccelerate, 280);
    }

    root.addEventListener("mousedown", onPressStart);
    window.addEventListener("mouseup", stopAccelerate);
    root.addEventListener("touchstart", onPressStart, { passive: true });
    window.addEventListener("touchend", stopAccelerate);
    root.addEventListener("touchcancel", stopAccelerate);
    root.addEventListener("contextmenu", (e) => e.preventDefault());

    return () => {
      if (pressTimer !== null) window.clearTimeout(pressTimer);
      root.removeEventListener("mousedown", onPressStart);
      window.removeEventListener("mouseup", stopAccelerate);
      root.removeEventListener("touchstart", onPressStart);
      window.removeEventListener("touchend", stopAccelerate);
      window.removeEventListener("touchcancel", stopAccelerate);
    };
  }, []);

  return (
    <div className="audit-stroll-ending">
      <div className="audit-stroll-viewport" ref={viewportRef}>
        <div
          className="audit-stroll-track"
          ref={trackRef}
          style={{ opacity: trackOpacity }}
        >
          <StrollNewsSection showExtendedTiles={newsIntroDone} />

          <section className="audit-stroll-section audit-stroll-section--quotes" aria-label="寄语" data-stroll-quotes-section>
            {STROLL_COMFORT_LINES.map((line, index) => (
              <blockquote
                key={`${line.side}-${index}`}
                className={`audit-stroll-quote audit-stroll-quote--${line.side}`}
                data-stroll-quote
              >
                <p>{line.text}</p>
              </blockquote>
            ))}
          </section>

          <section
            className="audit-stroll-section audit-stroll-section--encourage"
            aria-label="鼓励"
            data-stroll-encourage-section
          >
            <p
              className="audit-stroll-encourage"
              data-stroll-encourage
              style={encourageOverride !== null ? { opacity: encourageOverride } : undefined}
            >
              {STROLL_ENCOURAGEMENT}
            </p>
          </section>
        </div>
      </div>

      <div
        className={`audit-stroll-credits-roll${creditsActive ? " is-active" : ""}`}
        style={{ opacity: creditsActive ? creditsLayerOpacity : 0 }}
        aria-hidden={!creditsActive}
      >
        <div ref={creditsRollRef} className="audit-stroll-credits-roll__inner">
          <div className="audit-stroll-credits">
            <StrollCreditsContent />
          </div>
        </div>
      </div>

      <div className="audit-stroll-credits-measure" aria-hidden>
        <div ref={creditsMeasureRef} className="audit-stroll-credits">
          <StrollCreditsContent />
        </div>
      </div>

      <div
        className={`audit-stroll-brand-overlay${mailLinkVisible ? " is-interactive" : ""}`}
        style={{ opacity: brandOpacity }}
        aria-hidden={brandOpacity < 0.05 && !mailLinkVisible}
      >
        <div className="audit-stroll-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cuc-anima/images/cuc-anima-logo.svg"
            alt=""
            className="audit-stroll-brand__logo"
          />
          <p className="audit-stroll-brand__name">{STROLL_SCHOOL_NAME}</p>
          {mailLinkVisible ? (
            <Link
              href="/?mail=stroll-thanks&skipIntro=1"
              className="audit-stroll-brand__link"
            >
              {STROLL_FINALE_MAIL_LINK_LABEL}
            </Link>
          ) : null}
        </div>
      </div>

      <p
        className={`audit-stroll-hint${hintVisible ? " is-visible" : ""}${isAccelerating ? " is-accelerating" : ""}`}
        aria-hidden
      >
        长按加速
      </p>
    </div>
  );
}
