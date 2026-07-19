"use client";

import { useState } from "react";
import { Mail163App } from "@/components/mail163/Mail163App";
import { MailIntroScreen } from "@/components/mail163/MailIntroScreen";
import { useGame } from "@/lib/game-state";

type MailView = "inbox" | "profile";

export function Mail163Entry({
  initialView = "inbox",
  initialSelectedId,
  skipIntro = false,
}: {
  initialView?: MailView;
  initialSelectedId?: string;
  skipIntro?: boolean;
}) {
  const { m01ScrolledToBottom } = useGame();
  const [introDone, setIntroDone] = useState(skipIntro || m01ScrolledToBottom);

  if (!introDone) {
    return <MailIntroScreen onComplete={() => setIntroDone(true)} />;
  }

  return (
    <Mail163App
      initialView={initialView}
      initialSelectedId={initialSelectedId}
      playEntryAnimation
    />
  );
}
