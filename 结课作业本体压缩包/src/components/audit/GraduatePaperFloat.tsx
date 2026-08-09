"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const PAPER_SRC = "/audit-expert/graduates-paper-archive.png";
export const PAPER_WIDTH = 640;
export const PAPER_ZONE_WIDTH = 660;
const LONG_PRESS_MS = 450;

function clampPosition(x: number, y: number) {
  const minX = -PAPER_WIDTH * 0.92;
  const maxX = window.innerWidth - PAPER_WIDTH * 0.08;
  const minY = -PAPER_WIDTH * 0.35;
  const maxY = window.innerHeight - 72;
  return {
    x: Math.max(minX, Math.min(maxX, x)),
    y: Math.max(minY, Math.min(maxY, y)),
  };
}

function initialPaperPosition() {
  const x = window.innerWidth - PAPER_ZONE_WIDTH + Math.max(8, (PAPER_ZONE_WIDTH - PAPER_WIDTH) / 2);
  return clampPosition(x, 72);
}

export function GraduatePaperFloat() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
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
    setPos(initialPaperPosition());
    const t = window.setTimeout(() => setVisible(true), 60);
    return () => window.clearTimeout(t);
  }, []);

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

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    if (event.pointerId !== state.pointerId) return;
    if (!state.active) return;
    const dx = event.clientX - state.startX;
    const dy = event.clientY - state.startY;
    setPos(clampPosition(state.originX + dx, state.originY + dy));
  }, []);

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

  return createPortal(
    <div
      ref={panelRef}
      className={`audit-paper-float${visible ? " is-visible" : ""}${dragging ? " is-dragging" : ""}${holdHint ? " is-holding" : ""}`}
      style={{ left: pos.x, top: pos.y, width: PAPER_WIDTH }}
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
        width={PAPER_WIDTH}
        height={896}
        className="audit-paper-float__img"
        draggable={false}
        priority
      />
    </div>,
    document.body,
  );
}
