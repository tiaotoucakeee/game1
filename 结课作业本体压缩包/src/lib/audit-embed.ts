"use client";

import { useSyncExternalStore } from "react";

export const FULLSCREEN_AUDIT_PATHS = new Set([
  "/audit",
  "/audit/delete",
  "/audit/truth",
  "/audit/stroll",
  "/audit/recruit",
  "/audit/summer",
  "/audit/reflection",
  "/audit/path-invite",
  "/audit/next-path",
]);

export function isAuditFullscreenPath(path: string): boolean {
  return FULLSCREEN_AUDIT_PATHS.has(path);
}

/** Break out of the audit iframe shell for immersive full-page routes. */
export function navigateAuditFullscreen(path: string): void {
  if (typeof window === "undefined") return;
  if (window.self !== window.top) {
    window.top!.location.href = path;
    return;
  }
  window.location.href = path;
}

export function isAuditEmbedContext(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.location.search.includes("embed=1") ||
    window.self !== window.top
  );
}

function subscribeToEmbedContext() {
  return () => {};
}

function getClientEmbedSnapshot(): boolean {
  return isAuditEmbedContext();
}

function getServerEmbedSnapshot(): boolean {
  return false;
}

export function useAuditEmbedContext(): boolean {
  return useSyncExternalStore(
    subscribeToEmbedContext,
    getClientEmbedSnapshot,
    getServerEmbedSnapshot,
  );
}

export function auditHref(href: string, embed = isAuditEmbedContext()): string {
  if (!embed || !href.startsWith("/audit")) return href;

  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const base = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const [path, query = ""] = base.split("?");
  const params = new URLSearchParams(query);
  params.set("embed", "1");
  const qs = params.toString();
  return `${path}?${qs}${hash}`;
}
