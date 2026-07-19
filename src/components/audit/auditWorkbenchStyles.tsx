"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { auditHref, useAuditEmbedContext } from "@/lib/audit-embed";

export const WB = {
  panel: {
    background: "#fff",
    border: "1px solid #c5ced8",
    borderRadius: 0,
  } satisfies CSSProperties,
  panelHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "10px 14px",
    borderBottom: "1px solid #e4e8ed",
    background: "linear-gradient(180deg,#f9fbfd 0%,#f0f4f8 100%)",
  } satisfies CSSProperties,
  panelTitle: {
    margin: 0,
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: 700,
    color: "#0068b7",
    borderLeft: "4px solid #0068b7",
    lineHeight: 1.4,
  } satisfies CSSProperties,
  panelBody: {
    padding: 14,
  } satisfies CSSProperties,
  muted: {
    color: "#888",
    fontSize: 12,
  } satisfies CSSProperties,
  link: {
    color: "#0068b7",
    textDecoration: "underline",
  } satisfies CSSProperties,
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 12,
    border: "1px solid #dcdfe6",
  } satisfies CSSProperties,
  th: {
    padding: "8px 10px",
    border: "1px solid #dcdfe6",
    textAlign: "left",
    background: "#f0f4f8",
    color: "#555",
    fontWeight: 700,
  } satisfies CSSProperties,
  td: {
    padding: "8px 10px",
    border: "1px solid #e4e8ed",
    textAlign: "left",
    verticalAlign: "middle",
    background: "#fff",
  } satisfies CSSProperties,
};

export function AuditPanel({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="audit-inner-widget" style={WB.panel}>
      <div style={WB.panelHead}>
        <div>
          <h2 style={WB.panelTitle}>{title}</h2>
          {subtitle ? <p style={{ ...WB.muted, margin: "6px 0 0 14px" }}>{subtitle}</p> : null}
        </div>
        {action}
      </div>
      <div style={WB.panelBody}>{children}</div>
    </div>
  );
}

export function AuditLink({
  href,
  children,
  style,
}: {
  href: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const embed = useAuditEmbedContext();
  const resolvedHref = auditHref(href, embed);

  return (
    <Link href={resolvedHref} style={{ ...WB.link, ...style }}>
      {children}
    </Link>
  );
}

export function AuditBtnSuccess({
  href,
  children,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const embed = useAuditEmbedContext();
  const style: CSSProperties = {
    display: "inline-block",
    padding: "5px 14px",
    borderRadius: 2,
    fontSize: 12,
    lineHeight: 1.4,
    textDecoration: "none",
    cursor: "pointer",
    whiteSpace: "nowrap",
    background: "linear-gradient(180deg,#3a9ae6 0%,#0068b7 100%)",
    border: "1px solid #005a9e",
    color: "#fff",
    width: onClick && !href ? "100%" : undefined,
    textAlign: onClick && !href ? "center" : undefined,
  };
  if (href) {
    return (
      <Link href={auditHref(href, embed)} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} style={style}>
      {children}
    </button>
  );
}

export function AuditBtnDanger({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-block",
        width: "100%",
        padding: "8px 14px",
        borderRadius: 2,
        fontSize: 12,
        cursor: "pointer",
        background: "linear-gradient(180deg,#f78989 0%,#d9534f 100%)",
        border: "1px solid #c9302c",
        color: "#fff",
      }}
    >
      {children}
    </button>
  );
}
