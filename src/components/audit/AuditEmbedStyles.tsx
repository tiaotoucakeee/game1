"use client";

import { useEffect } from "react";
import { AUDIT_EMBED_OVERRIDE_CSS } from "@/components/audit/auditShellOverrides";

/** iframe 内页专用：只加载 widget/图标样式，不加载 LeftMenuT 外壳 CSS */
const EMBED_STYLES = [
  "https://expert.cuc.edu.cn/zui-1.10.0-dist/dist/css/zui.min.css?v=20260415",
  "/audit-expert/iconfont.css",
  "/audit-expert/WZJStyle.css",
  "/audit-expert/MainHome.css",
  "/audit-expert/HomeNoticeList.css",
] as const;

export function AuditEmbedStyles() {
  useEffect(() => {
    const links: HTMLLinkElement[] = [];
    for (const href of EMBED_STYLES) {
      if (document.querySelector(`link[data-audit-embed="${href}"]`)) continue;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.dataset.auditEmbed = href;
      document.head.appendChild(link);
      links.push(link);
    }

    let override = document.querySelector<HTMLStyleElement>("style[data-audit-embed='overrides']");
    if (!override) {
      override = document.createElement("style");
      override.dataset.auditEmbed = "overrides";
      override.textContent = AUDIT_EMBED_OVERRIDE_CSS;
      document.head.appendChild(override);
    }

    return () => {
      links.forEach((link) => link.remove());
      override?.remove();
    };
  }, []);

  return null;
}
