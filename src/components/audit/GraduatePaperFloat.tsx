"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const PAPER_SRC = "/audit-expert/graduates-paper-archive.png";
export const PAPER_WIDTH = 640;
export const PAPER_ZONE_WIDTH = 660;
const LONG_PRESS_MS = 450;

function getMacPaperWidth(viewportWidth: number) {
  return Math.round(Math.min(PAPER_WIDTH, Math.max(280, viewportWidth * 0.38)));
}

function getMacPaperZoneWidth(viewportWidth: number) {
  return getMacPaperWidth(viewportWidth) + 20;
}

function clampPosition(x: number, y: number, paperWidth: number) {
  const minX = -paperWidth * 0.92;
  const maxX = window.innerWidth - paperWidth * 0.08;
  const minY = -paperWidth * 0.35;
  const maxY = window.innerHeight - 72;
  return {
    x: Math.max(minX, Math.min(maxX, x)),
    y: Math.max(minY, Math.min(maxY, y)),
  };
}

function initialPaperPosition(paperWidth: number, macLayout: boolean) {
  const zoneWidth = macLayout ? getMacPaperZoneWidth(window.innerWidth) : PAPER_ZONE_WIDTH;
  const x = window.innerWidth - zoneWidth + Math.max(8, (zoneWidth - paperWidth) / 2);
  return clampPosition(x, 72, paperWidth);
}

type GraduatePaperFloatProps = {
  macLayout?: boolean;
};

export function GraduatePaperFloat({ macLayout = false }: GraduatePaperFloatProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paperWidth, setPaperWidth] = useState(PAPER_WIDTH);
  const [pos, setPos] = useState({ x: 0, y: 72 });
  const [dragging, setDragging] = useState(false);
  const [holdHint, setHoldHint] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    active: false,
    ready: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    timer: 0,
  });

  useEffect(() => {
    setMounted(true);
    const resolveWidth = () => (macLayout ? getMacPaperWidth(window.innerWidth) : PAPER_WIDTH);

    const syncLayout = (resetPosition = false) => {
      const nextWidth = resolveWidth();
      setPaperWidth(nextWidth);
      setPos((prev) =>
        resetPosition
          ? initialPaperPosition(nextWidth, macLayout)
          : clampPosition(prev.x, prev.y, nextWidth),
      );
    };

    syncLayout(true);
    const t = window.setTimeout(() => setVisible(true), 60);

    if (!macLayout) {
      return () => window.clearTimeout(t);
    }

    const onResize = () => syncLayout(false);
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, [macLayout]);

  const clearHoldTimer = useCallback(() => {
    if (dragState.current.timer) {
      window.clearTimeout(dragState.current.timer);
      dragState.current.timer = 0;
    }
    setHoldHint(false);
  }, []);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return;
      event.preventDefault();
      const state = dragState.current;
      state.pointerId = event.pointerId;
      state.startX = event.clientX;
      state.startY = event.clientY;
      state.originX = pos.x;
      state.originY = pos.y;
      state.ready = false;
      state.active = false;
      clearHoldTimer();
      setHoldHint(true);
      state.timer = window.setTimeout(() => {
        state.ready = true;
        state.active = true;
        setDragging(true);
        setHoldHint(false);
        panelRef.current?.setPointerCapture(event.pointerId);
      }, LONG_PRESS_MS);
    },
    [clearHoldTimer, pos.x, pos.y],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const state = dragState.current;
      if (event.pointerId !== state.pointerId) return;
      if (!state.active) return;
      const dx = event.clientX - state.startX;
      const dy = event.clientY - state.startY;
      setPos(clampPosition(state.originX + dx, state.originY + dy, paperWidth));
    },
    [paperWidth],
  );

  const onPointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const state = dragState.current;
      if (event.pointerId !== state.pointerId) return;
      clearHoldTimer();
      if (state.active) {
        panelRef.current?.releasePointerCapture(event.pointerId);
      }
      state.active = false;
      state.ready = false;
      state.pointerId = -1;
      setDragging(false);
    },
    [clearHoldTimer],
  );

  if (!mounted) return null;

  const paperHeight = Math.round(paperWidth * (896 / PAPER_WIDTH));

  return createPortal(
    <div
      ref={panelRef}
      className={`audit-paper-float${visible ? " is-visible" : ""}${dragging ? " is-dragging" : ""}${holdHint ? " is-holding" : ""}`}
      style={{ left: pos.x, top: pos.y, width: paperWidth }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="img"
      aria-label="2034届优秀毕业生信息核对名单纸质存档"
    >
      <div className="audit-paper-float__hint">长按拖动</div>
      <Image
        src={PAPER_SRC}
        alt="2034届优秀毕业生信息核对名单（全院公示存档）"
        width={paperWidth}
        height={paperHeight}
        className="audit-paper-float__img"
        draggable={false}
        priority
        sizes={macLayout ? `${paperWidth}px` : `${PAPER_WIDTH}px`}
      />
    </div>,
    document.body,
  );
}
