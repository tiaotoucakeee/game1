"use client";

import { useEffect } from "react";
import type { ClueId } from "@/types/game";
import { useGame } from "@/lib/game-state";

export function ClueTrigger({ id }: { id: ClueId }) {
  const { addClue } = useGame();
  useEffect(() => {
    addClue(id);
  }, [addClue, id]);
  return null;
}
