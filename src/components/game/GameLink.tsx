"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { KeyboardEvent, MouseEvent, ReactNode } from "react";

type GameLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  /** 内部链接是否新标签打开 */
  newTab?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

/** 内部路由：无 href，悬停时不显示浏览器左下角 URL 预览 */
function StealthLink({
  href,
  className,
  children,
  newTab = false,
  onClick,
  "aria-label": ariaLabel,
}: GameLinkProps) {
  const router = useRouter();

  function navigate(e?: MouseEvent | KeyboardEvent) {
    e?.preventDefault();
    onClick?.();
    if (newTab && typeof window !== "undefined") {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(href);
  }

  return (
    <span
      role="link"
      tabIndex={0}
      aria-label={ariaLabel}
      className={cn("cursor-pointer", className)}
      onClick={navigate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(e);
        }
      }}
    >
      {children}
    </span>
  );
}

/**
 * 游戏内链接：站内用 StealthLink，站外仍用普通 <a>。
 */
export function GameLink(props: GameLinkProps) {
  const { href, className, children, newTab = false, onClick, "aria-label": ariaLabel } = props;
  const isInternal = href.startsWith("/") && !href.startsWith("//");

  if (!isInternal) {
    return (
      <a
        href={href}
        className={className}
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <StealthLink {...props}>
      {children}
    </StealthLink>
  );
}
