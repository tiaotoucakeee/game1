"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LOADING_DURATION_MS = 3000;

function formatGameTime(date: Date) {
  const hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, "0");
  return `${hour}点${minute}分`;
}

export function MailIntroScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "welcome">("loading");
  const [timeLabel, setTimeLabel] = useState("");

  useEffect(() => {
    const start = performance.now();
    let frame = 0;

    function tick(now: number) {
      const elapsed = now - start;
      const next = Math.min(100, (elapsed / LOADING_DURATION_MS) * 100);
      setProgress(next);

      if (next >= 100) {
        setTimeLabel(formatGameTime(new Date()));
        setPhase("welcome");
        return;
      }

      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  function finishIntro() {
    if (phase === "welcome") onComplete();
  }

  return (
    <div
      className="flex h-screen flex-col items-center justify-center bg-[#eef1f6] px-6 select-none"
      onClick={finishIntro}
      onKeyDown={(e) => {
        if (phase === "welcome" && (e.key === "Enter" || e.key === " ")) finishIntro();
      }}
      role={phase === "welcome" ? "button" : undefined}
      tabIndex={phase === "welcome" ? 0 : undefined}
    >
      <div className="flex flex-col items-center">
        <div className="overflow-hidden rounded-2xl bg-[#c81623] px-14 py-12 shadow-[0_8px_32px_rgba(200,22,35,0.25)]">
          <Image
            src="/cuc-anima/images/cuc-anima-logo-white.svg"
            alt="动画与数字艺术学院"
            width={320}
            height={216}
            className="h-auto w-[min(320px,72vw)]"
            priority
          />
          <p className="mt-5 text-center text-[15px] font-medium tracking-[0.2em] text-white/95">
            动画与数字艺术学院
          </p>
        </div>

        <div className="mt-12 w-[min(360px,80vw)]">
          <div className="h-2 overflow-hidden rounded-full bg-[#d9dde5]">
            <div
              className="h-full rounded-full bg-[#c81623] transition-[width] duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          {phase === "loading" && (
            <p className="mt-3 text-center text-xs text-[#999]">正在进入 CUC 校内邮箱…</p>
          )}
        </div>

        <p
          className={cn(
            "mt-12 max-w-lg text-center text-[18px] leading-9 text-[#222] transition-all duration-700",
            phase === "welcome" ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
          )}
        >
          欢迎！祁玉同学，当前时间为2036年6月18日{timeLabel}
        </p>

        {phase === "welcome" && (
          <p className="mail-intro-breathe mt-4 text-sm text-[#c81623]">点击任意处进入邮箱</p>
        )}
      </div>
    </div>
  );
}
