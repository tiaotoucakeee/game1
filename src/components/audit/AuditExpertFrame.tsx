"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/** 全屏加载保存的 LeftMenuT 静态页（1:1 外壳） */
export function AuditExpertFrame() {
  const pathname = usePathname();
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const src = `/audit-expert/shell.html?route=${encodeURIComponent(pathname)}`;

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== window.location.origin) return;
      const data = e.data as { type?: string; path?: string };
      if (data?.type === "audit-nav" && data.path && data.path !== pathname) {
        router.push(data.path);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [pathname, router]);

  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage(
      { type: "audit-route", path: pathname },
      window.location.origin,
    );
  }, [pathname]);

  return (
    <iframe
      ref={iframeRef}
      title="数字媒体中心审核工作台"
      src={src}
      style={{
        display: "block",
        width: "100%",
        height: "100vh",
        border: "none",
        margin: 0,
        padding: 0,
      }}
    />
  );
}
