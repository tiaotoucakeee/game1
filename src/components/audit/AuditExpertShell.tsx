"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { AuditExpertStyles } from "@/components/audit/AuditExpertStyles";
import {
  auditHomeNav,
  auditWorkbenchNav,
  getAuditBreadcrumb,
  isAuditHome,
  isAuditNavActive,
} from "@/data/audit-workbench-nav";

const COLLEGE_HOME = "/anima";

const AUDIT_SHELL_BOOT_CSS = `
.audit-expert-root{min-height:100vh;font-family:"Microsoft YaHei","PingFang SC",SimSun,Arial,sans-serif}
.LeftFloat{float:left}.RightFloat{float:right}
.audit-expert-root .logo-name{float:left;border-left:1px solid #ccc;border-right:1px solid #ccc;padding:5px 20px;margin-top:9px;list-style:none}
.audit-expert-root .logo-name #ProductName{font-size:20px;letter-spacing:5.8px;color:red;text-align:center;line-height:26px}
.audit-expert-root .logo-name #ProductNameEn{font-size:12px;color:red;letter-spacing:1.2px;text-align:center}
.audit-expert-root .navbar-brand .logo{height:60px;margin-top:5px}
.audit-expert-root .shemiTipsBox{float:left;margin-left:40px;color:#d9534f;font-size:15px;font-weight:700;line-height:70px}
`;

const GROUP_ICONS: Record<string, string> = {
  graduate: "icon-xuesheng",
  resource: "icon-daiban",
  conclusion: "icon-xitong",
};

export function AuditExpertShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const crumbs = getAuditBreadcrumb(pathname);
  const onHome = isAuditHome(pathname);
  const [menuMin, setMenuMin] = useState(true);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    graduate: true,
    resource: false,
    conclusion: false,
  });

  const toggleGroup = useCallback((id: string) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  return (
    <div className={`audit-expert-root Body-2031${menuMin ? " menu-min" : ""}`}>
      <AuditExpertStyles />
      <style dangerouslySetInnerHTML={{ __html: AUDIT_SHELL_BOOT_CSS }} />
      <nav className="navbar navbar-default CafaHeaderNav" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header LeftFloat hidden-xs navbar-header2031">
            <Link className="navbar-brand" href={auditHomeNav.href} id="leftTopLogo">
              <img src="/audit-expert/logo.png" className="logo" alt="中国传媒大学" />
            </Link>
            <ul className="logo-name logo-name-boderRt" id="logo-name">
              <li id="ProductName">数字媒体中心审核工作台</li>
              <li id="ProductNameEn">Digital Media Center Audit Workbench</li>
            </ul>
            <div className="shemiTipsBox">上网不涉密，涉密不上网</div>
          </div>

          <ul className="g-userinfo RightFloat">
            <li className="li01">
              <i className="iconfont iconyonghu" aria-hidden />
              <a href="#user" onClick={(e) => e.preventDefault()}>
                临时审核员
                <span className="iconfont iconarrowDown03" aria-hidden />
              </a>
            </li>
            <li className="li02">
              <i className="iconfont iconpower-full" aria-hidden />
              <Link href={COLLEGE_HOME}>退出系统</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="main-container" id="main-container">
        <div className="main-container-inner">
          <div className={`sidebar${menuMin ? " menu-min" : ""}`} id="sidebar">
            <div id="menu_style" className="menu_style">
              <ul className="nav nav-list" id="nav_list">
                <li className={onHome ? "active open" : ""}>
                  <Link href={auditHomeNav.href} className="iframeurl" title="首页">
                    <i className="iconfont icon-shouye" />
                    <span className="menu-text">首页</span>
                  </Link>
                </li>

                {auditWorkbenchNav.map((group) => {
                  const open = openGroups[group.id];
                  const groupActive = group.items.some((item) => isAuditNavActive(pathname, item.href));
                  return (
                    <li key={group.id} className={`${open ? "open" : ""}${groupActive ? " active" : ""}`}>
                      <a
                        href={`#${group.id}`}
                        className="dropdown-toggle"
                        title={group.title}
                        onClick={(e) => {
                          e.preventDefault();
                          if (menuMin) {
                            router.push(group.items[0]?.href ?? auditHomeNav.href);
                            return;
                          }
                          toggleGroup(group.id);
                        }}
                      >
                        <i className={`iconfont ${GROUP_ICONS[group.id] ?? "icon-daiban"}`} />
                        <span className="menu-text">{group.title}</span>
                      </a>
                      <ul className="submenu">
                        {group.items.map((item) => {
                          const active = isAuditNavActive(pathname, item.href);
                          return (
                            <li key={item.href} className={active ? "active" : ""}>
                              <Link href={item.href} className="iframeurl" title={item.label}>
                                {item.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div
              className="sidebar-collapse"
              id="sidebar-collapse"
              role="button"
              tabIndex={0}
              aria-label={menuMin ? "展开侧栏" : "收起侧栏"}
              onClick={() => setMenuMin((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setMenuMin((v) => !v);
              }}
            >
              {menuMin ? "»»" : "««"}
            </div>
          </div>

          <div className="main-content" id="iframeContent">
            <div className="breadcrumbs breadcrumbs-fixed" id="breadcrumbs">
              <ul className="breadcrumbs_ul breadcrumb">
                <li>
                  <i className="iconfont icon-zhuye" />
                  <Link href={auditHomeNav.href}>首页</Link>
                </li>
                {!onHome &&
                  crumbs.map((label) => (
                    <li key={label}>{label}</li>
                  ))}
              </ul>
              <button type="button" className="rightSubTips" onClick={() => router.refresh()}>
                刷新当前界面
              </button>
              <div className="rightSubTips jiamiTips">请勿上传涉密材料</div>
            </div>

            <div className="audit-page-body">{children}</div>
          </div>
        </div>
      </div>

      <footer className="footerInfo hidden-xs">
        <ul>
          <li>推荐使用谷歌浏览器,360浏览器极速模式登录</li>
          <li>技术支持&nbsp;QQ：1516849328 1075477985&nbsp;电话：010-58235529</li>
          <li>维护：东方博冠（北京）科技有限公司</li>
          <li>版本号：3.0.1.0919</li>
          <li>备案号：</li>
        </ul>
      </footer>
    </div>
  );
}
