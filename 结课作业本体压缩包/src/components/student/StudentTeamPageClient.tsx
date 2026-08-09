"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StudentPortalShell } from "@/components/student/StudentPortalShell";
import {
  CHENG_YE_TEAM_MEMBERS,
  CHENG_YE_TEAM_META,
  CHENG_YE_TEAM_SIDEBAR,
  type ChengYeTeamTabId,
} from "@/data/student-portal-cheng-ye-team";
import { useGame } from "@/lib/game-state";
import "@/styles/student-project.css";

export function StudentTeamPageClient() {
  const router = useRouter();
  const { studentPersona } = useGame();
  const isChengYe = studentPersona === "cheng_ye";
  const [tab, setTab] = useState<ChengYeTeamTabId>("members");

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
          <span>团队管理</span>
          <span className="stu-proj__breadcrumb-sep">{">>"}</span>
          <span className="is-current">成员名单</span>
        </nav>

        <div className="stu-proj__layout">
          <aside className="stu-proj__sidebar">
            <div className="stu-proj__sidebar-title">团队信息</div>
            <ul className="stu-proj__sidebar-list">
              {CHENG_YE_TEAM_SIDEBAR.map((item) => (
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
            {tab === "members" ? (
              <>
                <div className="stu-proj__section-head">
                  <h2 className="stu-proj__section-title">
                    团队成员
                    <span className="stu-proj__system-id">
                      （系统编号：{CHENG_YE_TEAM_META.projectCode} · {CHENG_YE_TEAM_META.account}）
                    </span>
                  </h2>
                </div>

                <div className="stu-proj__table-wrap stu-proj__table-wrap--team">
                  <table className="stu-proj__table stu-proj__table--team">
                    <thead>
                      <tr>
                        <th>序号</th>
                        <th>姓名</th>
                        <th>学号</th>
                        <th>专业方向</th>
                        <th>项目分工</th>
                        <th>项目时间</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CHENG_YE_TEAM_MEMBERS.map((member, index) => (
                        <tr
                          key={member.name}
                          className={
                            member.major === "指导教师"
                              ? "is-advisor"
                              : member.highlight
                                ? "is-lead"
                                : undefined
                          }
                        >
                          <td>{index + 1}</td>
                          <td>{member.highlight ? <strong>{member.name}</strong> : member.name}</td>
                          <td>{member.studentId ?? "—"}</td>
                          <td>{member.major}</td>
                          <td>{member.role}</td>
                          <td>{member.projectTime ?? "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="stu-proj__hint">
                  <p>
                    执行周期：{CHENG_YE_TEAM_META.period} · {CHENG_YE_TEAM_META.status}
                  </p>
                  <p>共 {CHENG_YE_TEAM_MEMBERS.length} 人 · 数据同步自 Creative Yard 创作路径立项档案</p>
                </div>
              </>
            ) : null}
          </main>
        </div>
      </div>
    </StudentPortalShell>
  );
}
