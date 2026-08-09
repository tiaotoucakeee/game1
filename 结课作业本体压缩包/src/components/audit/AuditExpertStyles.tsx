"use client";

import { useEffect } from "react";
import { AUDIT_SHELL_OVERRIDE_CSS } from "@/components/audit/auditShellOverrides";

const EXPERT_STYLES = [
  "/audit-expert/ace.min.css",
  "/audit-expert/global.css",
  "/audit-expert/iconfont.css",
  "/audit-expert/LeftMenuT.css",
  "/audit-expert/WZJStyle.css",
  "/audit-expert/MainHome.css",
  "/audit-expert/HomeNoticeList.css",
] as const;

/** 原版 expert CSS 含 legacy 语法，须从 public 以 link 加载；覆盖样式最后注入 */
export function AuditExpertStyles() {
  useEffect(() => {
    const links: HTMLLinkElement[] = [];
    for (const href of EXPERT_STYLES) {
      if (document.querySelector(`link[data-audit-shell="${href}"]`)) continue;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.dataset.auditShell = href;
      document.head.appendChild(link);
      links.push(link);
    }

    let override = document.querySelector<HTMLStyleElement>("style[data-audit-shell='overrides']");
    if (!override) {
      override = document.createElement("style");
      override.dataset.auditShell = "overrides";
      override.textContent = AUDIT_SHELL_OVERRIDE_CSS;
      document.head.appendChild(override);
    }

    return () => {
      links.forEach((link) => link.remove());
      override?.remove();
    };
  }, []);

  return null;
}
