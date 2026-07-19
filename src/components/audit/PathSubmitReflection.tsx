"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  PATH_SUBMIT_REFLECTION,
  REFLECTION_PROMPT_DELAY_MS,
  REFLECTION_STEP_FADE_MS,
} from "@/data/audit-submit-reflection";

type Phase = "enter" | "idle" | "exit";

function renderReflectionPrompt(text: string): ReactNode[] {
  return text.split(/(「程野」)/g).map((part, index) =>
    part === "「程野」" ? (
      <strong key={`emphasis-${index}`} className="audit-reflection__emphasis">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export function PathSubmitReflection({
  onAccept,
  onReject,
}: {
  onAccept: () => void;
  onReject: () => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("enter");
  const [visible, setVisible] = useState(false);

  const question = PATH_SUBMIT_REFLECTION[stepIndex];
  const isLast = stepIndex >= PATH_SUBMIT_REFLECTION.length - 1;

  useEffect(() => {
    document.documentElement.classList.add("audit-reflection-fullscreen");
    document.body.classList.add("audit-reflection-fullscreen");
    return () => {
      document.documentElement.classList.remove("audit-reflection-fullscreen");
      document.body.classList.remove("audit-reflection-fullscreen");
    };
  }, []);

  useEffect(() => {
    setPhase("enter");
    setVisible(false);
    const showTimer = window.setTimeout(() => {
      setVisible(true);
      setPhase("idle");
    }, REFLECTION_PROMPT_DELAY_MS);
    return () => window.clearTimeout(showTimer);
  }, [stepIndex]);

  const advance = useCallback(
    (choiceId: string) => {
      if (phase !== "idle") return;

      if (isLast) {
        if (choiceId === "accept") {
          onAccept();
          return;
        }
        if (choiceId === "reject") {
          onReject();
          return;
        }
      }

      setPhase("exit");
      window.setTimeout(() => {
        setStepIndex((index) => index + 1);
      }, REFLECTION_STEP_FADE_MS);
    },
    [isLast, onAccept, onReject, phase],
  );

  if (!question) return null;

  return (
    <div className="audit-reflection" role="dialog" aria-modal="true" aria-labelledby="audit-reflection-prompt">
      <div
        key={question.id}
        className={`audit-reflection__panel${visible ? " is-visible" : ""}${phase === "exit" ? " is-exiting" : ""}`}
      >
        <p id="audit-reflection-prompt" className="audit-reflection__prompt">
          {renderReflectionPrompt(question.prompt)}
        </p>
        <div className="audit-reflection__choices">
          {question.choices.map((choice, index) => (
            <button
              key={choice.id}
              type="button"
              className={`audit-reflection__choice${isLast ? ` audit-reflection__choice--${choice.id}` : ""}`}
              style={{ animationDelay: `${0.38 + index * 0.16}s` }}
              onClick={() => advance(choice.id)}
            >
              {choice.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
