"use client";

import { useState } from "react";
import { useGame } from "@/lib/game-state";

const LINES = [
  { key: "identity" as const, label: "学籍身份" },
  { key: "project" as const, label: "项目成果" },
  { key: "ai" as const, label: "AI创作路径" },
  { key: "account" as const, label: "账号性质" },
];

const S = {
  wrap: {
    position: "fixed" as const,
    bottom: 40,
    right: 24,
    zIndex: 100000,
    fontFamily: '"Consolas","Courier New",monospace',
  },
  btn: {
    display: "block",
    border: "2px solid #3a5a40",
    borderRadius: 8,
    background: "#1a2e1f",
    color: "#7dffb3",
    fontSize: 18,
    fontWeight: 700,
    padding: "14px 28px",
    minWidth: 180,
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
    letterSpacing: "0.05em",
  },
  panel: {
    marginTop: 12,
    width: 340,
    border: "2px solid #3a5a40",
    borderRadius: 8,
    background: "rgba(15,26,18,0.96)",
    padding: "18px 20px",
    color: "#a8e6bc",
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
  },
  head: {
    marginBottom: 12,
    paddingBottom: 10,
    borderBottom: "1px solid #3a5a40",
    color: "#7dffb3",
    fontSize: 18,
    fontWeight: 700,
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 0",
    fontSize: 16,
  },
  foot: {
    marginTop: 12,
    paddingTop: 10,
    borderTop: "1px solid #3a5a40",
    fontSize: 13,
    color: "#6a9a78",
  },
};

export function AuditTerminal() {
  const { verification } = useGame();
  const [open, setOpen] = useState(false);

  return (
    <div className="audit-terminal-wrap" style={S.wrap}>
      <button type="button" onClick={() => setOpen((o) => !o)} style={S.btn}>
        审核终端 {open ? "▾" : "▴"}
      </button>
      {open && (
        <div style={S.panel}>
          <div style={S.head}>核验状态</div>
          {LINES.map(({ key, label }) => (
            <div key={key} style={S.row}>
              <span>{label}</span>
              <span style={{ color: verification[key] ? "#7dffb3" : "#666", fontWeight: 600 }}>
                {verification[key] ? "已核验" : "待核验"}
              </span>
            </div>
          ))}
          <div style={S.foot}>数字媒体中心 · 临时审核员终端</div>
        </div>
      )}
    </div>
  );
}
