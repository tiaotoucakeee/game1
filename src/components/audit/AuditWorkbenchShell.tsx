"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  auditHomeNav,
  auditWorkbenchNav,
  getAuditPageTitle,
  isAuditHome,
  isAuditNavActive,
} from "@/data/audit-workbench-nav";
import { AUDIT_CREDS, PLAYER } from "@/data/game";
import { useGame } from "@/lib/game-state";

const LOGO = "/audit-sso/logo.png";
const SIDEBAR_W = 210;

const C = {
  sidebar: "#3a7fbf",
  sidebarDeep: "#2f6da8",
  sidebarHover: "#4a8fcf",
  sidebarSub: "#5a96d4",
  headerBorder: "#d8dee6",
  contentBg: "#eef2f6",
  tabActive: "#fff",
  tabIdle: "#dfe6ee",
  red: "#d9534f",
  link: "#337ab7",
};

function NavIcon({ type }: { type: "home" | "folder" | "download" | "list" | "settings" | "audit" }) {
  const paths: Record<string, string> = {
    home: "M4 10 L12 4 L20 10 V18 H4 Z",
    folder: "M4 6 H9 L11 8 H20 V18 H4 Z",
    download: "M12 4 V14 M8 10 L12 14 L16 10 M6 18 H18",
    list: "M5 7 H19 M5 12 H19 M5 17 H19",
    settings: "M12 8 A4 4 0 1 1 12 16 A4 4 0 1 1 12 8 M12 2 V4 M12 20 V22 M4 12 H2 M22 12 H20",
    audit: "M6 4 H18 V16 H6 Z M9 8 H15 M9 11 H15 M9 14 H12",
  };
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d={paths[type]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AuditWorkbenchShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { setAuditLoggedIn } = useGame();
  const pageTitle = getAuditPageTitle(pathname);
  const onHome = isAuditHome(pathname);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    graduate: true,
    resource: false,
    conclusion: false,
  });

  function handleLogout() {
    setAuditLoggedIn(false);
    router.replace("/audit");
  }

  function toggleGroup(id: string) {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const showSecondTab = !onHome;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: '"Microsoft YaHei","PingFang SC",SimSun,Arial,sans-serif',
        fontSize: 13,
        color: "#333",
        background: C.contentBg,
      }}
    >
      {/* 顶栏 */}
      <header
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          height: 56,
          padding: "0 16px",
          background: "#fff",
          borderBottom: `1px solid ${C.headerBorder}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: "0 0 auto" }}>
          <img src={LOGO} alt="" width={36} height={36} style={{ display: "block" }} />
          <span style={{ fontSize: 18, fontWeight: 700, color: "#333", whiteSpace: "nowrap" }}>
            数字媒体中心审核工作台
          </span>
        </div>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            color: C.red,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
        >
          上网不涉密&nbsp;&nbsp;涉密不上网
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#e8eef3",
              border: "1px solid #ccd6e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              color: "#666",
            }}
          >
            {PLAYER.name.slice(0, 1)}
          </div>
          <span style={{ fontSize: 13, color: "#333" }}>{AUDIT_CREDS.username}</span>
          <button
            type="button"
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              border: "none",
              background: "none",
              color: C.link,
              font: "inherit",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            <span style={{ fontSize: 15 }}>⏻</span> 退出系统
          </button>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* 深蓝侧栏 */}
        {!sidebarCollapsed && (
          <aside
            style={{
              flexShrink: 0,
              width: SIDEBAR_W,
              background: C.sidebar,
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <nav style={{ flex: 1, overflowY: "auto", paddingTop: 4 }}>
              <Link
                href={auditHomeNav.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "11px 14px",
                  color: "#fff",
                  textDecoration: "none",
                  background: onHome ? C.sidebarHover : "transparent",
                  fontWeight: onHome ? 700 : 400,
                  fontSize: 13,
                }}
              >
                <NavIcon type="home" />
                {auditHomeNav.label}
              </Link>

              {auditWorkbenchNav.map((group) => {
                const open = openGroups[group.id];
                const groupActive = group.items.some((item) => isAuditNavActive(pathname, item.href));
                return (
                  <div key={group.id}>
                    <button
                      type="button"
                      onClick={() => toggleGroup(group.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        gap: 8,
                        padding: "11px 14px",
                        border: "none",
                        background: groupActive && !open ? C.sidebarHover : "transparent",
                        color: "#fff",
                        fontSize: 13,
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      <NavIcon type={group.icon} />
                      <span style={{ flex: 1 }}>{group.title}</span>
                      <span style={{ fontSize: 10, opacity: 0.85 }}>{open ? "▲" : "▼"}</span>
                    </button>
                    {open && (
                      <div style={{ background: C.sidebarSub }}>
                        {group.items.map((item) => {
                          const active = isAuditNavActive(pathname, item.href);
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              style={{
                                display: "block",
                                padding: "9px 14px 9px 38px",
                                fontSize: 12,
                                color: "#fff",
                                textDecoration: "none",
                                background: active ? "rgba(255,255,255,0.18)" : "transparent",
                                fontWeight: active ? 700 : 400,
                              }}
                            >
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
            <button
              type="button"
              onClick={() => setSidebarCollapsed(true)}
              style={{
                border: "none",
                background: C.sidebarDeep,
                color: "#fff",
                padding: "8px",
                cursor: "pointer",
                fontSize: 12,
                opacity: 0.9,
              }}
            >
              »»
            </button>
          </aside>
        )}

        {sidebarCollapsed && (
          <button
            type="button"
            onClick={() => setSidebarCollapsed(false)}
            style={{
              flexShrink: 0,
              width: 28,
              border: "none",
              background: C.sidebar,
              color: "#fff",
              cursor: "pointer",
              fontSize: 11,
            }}
          >
            ««
          </button>
        )}

        {/* 主内容区 */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          {/* 标签页 */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              padding: "0 8px",
              background: C.contentBg,
              borderBottom: "1px solid #c5ced8",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                padding: "7px 18px",
                fontSize: 12,
                background: onHome ? C.tabActive : C.tabIdle,
                border: "1px solid #c5ced8",
                borderBottom: onHome ? "1px solid #fff" : "none",
                borderRadius: "2px 2px 0 0",
                marginBottom: onHome ? -1 : 0,
                color: onHome ? C.link : "#666",
                fontWeight: onHome ? 700 : 400,
              }}
            >
              首页
            </div>
            {showSecondTab && (
              <div
                style={{
                  padding: "7px 18px",
                  fontSize: 12,
                  background: C.tabActive,
                  border: "1px solid #c5ced8",
                  borderBottom: "1px solid #fff",
                  borderRadius: "2px 2px 0 0",
                  marginBottom: -1,
                  marginLeft: 2,
                  color: C.link,
                  fontWeight: 700,
                }}
              >
                {pageTitle}
                <span style={{ marginLeft: 6, color: "#aaa", fontWeight: 400 }}>×</span>
              </div>
            )}
          </div>

          {/* 工具条 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 14px",
              background: "#fff",
              borderBottom: "1px solid #e4e8ed",
              fontSize: 12,
              flexShrink: 0,
            }}
          >
            <span style={{ color: "#666" }}>{onHome ? "首页" : pageTitle}</span>
            <div style={{ display: "flex", gap: 16, color: "#888" }}>
              <span style={{ color: C.red }}>请勿上传涉密材料</span>
              <button
                type="button"
                onClick={() => router.refresh()}
                style={{
                  border: "none",
                  background: "none",
                  padding: 0,
                  color: C.link,
                  font: "inherit",
                  cursor: "pointer",
                }}
              >
                刷新当前界面
              </button>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: 12, background: C.contentBg }}>
            {children}
          </div>

          <footer
            style={{
              flexShrink: 0,
              padding: "10px 12px",
              background: "#fff",
              borderTop: "1px solid #e4e8ed",
              color: "#999",
              fontSize: 11,
              lineHeight: 1.7,
              textAlign: "center",
            }}
          >
            技术支持：数字媒体中心信息化服务 · 建议使用 Chrome / 360 浏览器
            <br />
            中国传媒大学动画与数字艺术学院 · 版本 3.0.1 · 京ICP备10039564号
          </footer>
        </div>
      </div>
    </div>
  );
}
