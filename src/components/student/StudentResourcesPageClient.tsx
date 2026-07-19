"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StudentPortalShell } from "@/components/student/StudentPortalShell";
import {
  CHENG_YE_AI_RESOURCES,
  CHENG_YE_EQUIPMENT_RESOURCES,
  CHENG_YE_LAB_RESOURCES,
  CHENG_YE_RESOURCE_SIDEBAR,
  CHENG_YE_RESOURCE_TAB_LABELS,
  CHENG_YE_RESOURCES_META,
  type ChengYeResourceTabId,
} from "@/data/student-portal-cheng-ye-resources";
import { useGame } from "@/lib/game-state";
import "@/styles/student-project.css";

function ResourceTable({ tab }: { tab: ChengYeResourceTabId }) {
  if (tab === "labs") {
    return (
      <table className="stu-proj__table stu-proj__table--resources">
        <thead>
          <tr>
            <th>序号</th>
            <th>资源名称</th>
            <th>所属专业群</th>
            <th>资源类型</th>
            <th>调用权限</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          {CHENG_YE_LAB_RESOURCES.map((row, index) => (
            <tr key={row.id} className="is-success">
              <td>{index + 1}</td>
              <td>{row.name}</td>
              <td>{row.majorGroup}</td>
              <td>{row.type}</td>
              <td>{row.access}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (tab === "ai") {
    return (
      <table className="stu-proj__table stu-proj__table--resources">
        <thead>
          <tr>
            <th>序号</th>
            <th>平台 / 账号</th>
            <th>所属模块</th>
            <th>功能范围</th>
            <th>调用方式</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          {CHENG_YE_AI_RESOURCES.map((row, index) => (
            <tr key={row.id} className={row.id === "ai-1" ? "is-lead" : "is-success"}>
              <td>{index + 1}</td>
              <td>{row.id === "ai-1" ? <strong>{row.name}</strong> : row.name}</td>
              <td>{row.module}</td>
              <td>{row.scope}</td>
              <td>{row.access}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <table className="stu-proj__table stu-proj__table--resources">
      <thead>
        <tr>
          <th>序号</th>
          <th>设备名称</th>
          <th>所属专业方向</th>
          <th>存放实验室</th>
          <th>预约方式</th>
          <th>状态</th>
        </tr>
      </thead>
      <tbody>
        {CHENG_YE_EQUIPMENT_RESOURCES.map((row, index) => (
          <tr key={row.id} className="is-success">
            <td>{index + 1}</td>
            <td>{row.name}</td>
            <td>{row.major}</td>
            <td>{row.location}</td>
            <td>{row.booking}</td>
            <td>{row.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function resourceCount(tab: ChengYeResourceTabId) {
  if (tab === "labs") return CHENG_YE_LAB_RESOURCES.length;
  if (tab === "ai") return CHENG_YE_AI_RESOURCES.length;
  return CHENG_YE_EQUIPMENT_RESOURCES.length;
}

export function StudentResourcesPageClient() {
  const router = useRouter();
  const { studentPersona } = useGame();
  const isChengYe = studentPersona === "cheng_ye";
  const [tab, setTab] = useState<ChengYeResourceTabId>("labs");

  useEffect(() => {
    if (!isChengYe) router.replace("/student/home");
  }, [isChengYe, router]);

  if (!isChengYe) return null;

  return (
    <StudentPortalShell showHero>
      <div className="stu-proj stu-proj--cya">
        <nav className="stu-proj__breadcrumb" aria-label="面包屑">
          <Link href="/student/home">首页</Link>
          <span className="stu-proj__breadcrumb-sep">{">>"}</span>
          <span>配套资源</span>
          <span className="stu-proj__breadcrumb-sep">{">>"}</span>
          <span className="is-current">{CHENG_YE_RESOURCE_TAB_LABELS[tab]}</span>
        </nav>

        <div className="stu-proj__layout">
          <aside className="stu-proj__sidebar">
            <div className="stu-proj__sidebar-title">资源调度</div>
            <ul className="stu-proj__sidebar-list">
              {CHENG_YE_RESOURCE_SIDEBAR.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`stu-proj__sidebar-item${tab === item.id ? " is-active" : ""}`}
                    onClick={() => item.enabled && setTab(item.id)}
                    disabled={!item.enabled}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <main className="stu-proj__main">
            <div className="stu-proj__section-head">
              <h2 className="stu-proj__section-title">
                {CHENG_YE_RESOURCE_TAB_LABELS[tab]}
                <span className="stu-proj__system-id">
                  （调度账号：{CHENG_YE_RESOURCES_META.account} · {CHENG_YE_RESOURCES_META.projectCode}）
                </span>
              </h2>
            </div>

            <div className="stu-proj__table-wrap stu-proj__table-wrap--resources">
              <ResourceTable tab={tab} />
            </div>

            <div className="stu-proj__hint">
              <p>
                资源范围：{CHENG_YE_RESOURCES_META.scope} · {CHENG_YE_RESOURCES_META.status}
              </p>
              <p>
                当前列表共 {resourceCount(tab)} 项 · 创作路径账号 CYA-0000
                可在不改变团队成员真实学籍归属的前提下，统筹调用学院各专业群实验室、AI 平台能力与共享设备。
              </p>
            </div>
          </main>
        </div>
      </div>
    </StudentPortalShell>
  );
}
