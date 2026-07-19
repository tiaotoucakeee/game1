"use client";

import { useEffect, useState } from "react";
import { CHENG_YE } from "@/data/game";

export function ChengYeMajorLabel({ className = "" }: { className?: string }) {
  const majors = CHENG_YE.flickerMajors;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % majors.length);
    }, 820);
    return () => window.clearInterval(id);
  }, [majors.length]);

  return (
    <strong className={`student-portal__major-flicker${className ? ` ${className}` : ""}`}>
      {majors[index]}
    </strong>
  );
}
