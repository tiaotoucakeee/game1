"use client";

import { useCallback, useEffect, useState } from "react";
import { CLUE_LABELS, getBonusClueLabel } from "@/data/game";
import type { ClueId } from "@/types/game";

const SPOILER_STORAGE_KEY = "cuc-arg-submit-spoilers";

function readSpoilers(): ClueId[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SPOILER_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ClueId[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeSpoilers(ids: ClueId[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SPOILER_STORAGE_KEY, JSON.stringify(ids));
}

export function useSubmitSpoilerReveals() {
  const [spoilerReveals, setSpoilerReveals] = useState<ClueId[]>([]);
  const [pendingClue, setPendingClue] = useState<ClueId | null>(null);

  useEffect(() => {
    setSpoilerReveals(readSpoilers());
  }, []);

  const confirmReveal = useCallback(() => {
    if (!pendingClue) return;
    setSpoilerReveals((prev) => {
      if (prev.includes(pendingClue)) return prev;
      const next = [...prev, pendingClue];
      writeSpoilers(next);
      return next;
    });
    setPendingClue(null);
  }, [pendingClue]);

  const cancelReveal = useCallback(() => {
    setPendingClue(null);
  }, []);

  function isClueVisible(clueId: ClueId, collected: boolean) {
    return collected || spoilerReveals.includes(clueId);
  }

  function requestReveal(clueId: ClueId, collected: boolean) {
    if (collected || spoilerReveals.includes(clueId)) return;
    setPendingClue(clueId);
  }

  return {
    pendingClue,
    confirmReveal,
    cancelReveal,
    isClueVisible,
    requestReveal,
    isSpoilerReveal: (clueId: ClueId, collected: boolean) =>
      !collected && spoilerReveals.includes(clueId),
  };
}

export function SubmitSpoilerDialog({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  return (
    <div className="audit-submit-dialog-overlay" role="presentation" onClick={onCancel}>
      <div
        className="audit-submit-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="audit-submit-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="audit-submit-dialog-title" className="audit-submit-dialog-title">
          提前查看线索？
        </h3>
        <p className="audit-submit-dialog-text">
          该线索尚未通过正常流程收集。提前查看可能会<strong>削弱推理与探索体验</strong>
          ，建议先继续在各模块中自行调查。
        </p>
        <div className="audit-submit-dialog-actions">
          <button type="button" className="audit-wb-btn" onClick={onCancel}>
            继续推理
          </button>
          <button type="button" className="audit-wb-btn audit-wb-btn-primary" onClick={onConfirm}>
            仍要查看
          </button>
        </div>
      </div>
    </div>
  );
}

export function SubmitClueContent({
  clueId,
  collected,
  visible,
  spoilerReveal,
  onRequestReveal,
}: {
  clueId: ClueId;
  collected: boolean;
  visible: boolean;
  spoilerReveal: boolean;
  onRequestReveal: () => void;
}) {
  if (visible) {
    return (
      <span className="audit-submit-clue-text">
        {CLUE_LABELS[clueId]}
        {spoilerReveal ? <span className="audit-submit-clue-spoiler-tag">已查看提示</span> : null}
      </span>
    );
  }

  return (
    <button type="button" className="audit-submit-clue-mask" onClick={onRequestReveal} aria-label="查看线索">
      <span className="audit-submit-clue-mask-bars" aria-hidden>
        ████████████
      </span>
    </button>
  );
}

export function SubmitBonusClueItem({
  clueId,
  collected,
  visible,
  spoilerReveal,
  locked = false,
  onRequestReveal,
}: {
  clueId: ClueId;
  collected: boolean;
  visible: boolean;
  spoilerReveal: boolean;
  locked?: boolean;
  onRequestReveal: () => void;
}) {
  if (visible) {
    return (
      <li className={collected ? "is-done" : spoilerReveal ? "is-spoiler" : undefined}>
        {collected ? "✓ " : spoilerReveal ? "◌ " : ""}
        {getBonusClueLabel(clueId, collected)}
      </li>
    );
  }

  if (locked) {
    return (
      <li className="is-locked">
        <span className="audit-submit-bonus-mask audit-submit-bonus-mask--locked" aria-hidden>
          ████████
        </span>
      </li>
    );
  }

  return (
    <li>
      <button type="button" className="audit-submit-bonus-mask" onClick={onRequestReveal} aria-label="查看线索">
        ████████
      </button>
    </li>
  );
}
