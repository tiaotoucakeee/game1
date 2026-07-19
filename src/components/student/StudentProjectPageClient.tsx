"use client";

import Link from "next/link";
import { useState } from "react";
import { StudentPortalShell } from "@/components/student/StudentPortalShell";
import { ClueTrigger } from "@/components/game/ClueTrigger";
import { CHENG_YE, PLAYER } from "@/data/game";
import {
  GRADUATION_PROJECT,
  GRADUATION_PROJECT_SIDEBAR,
  GRADUATION_PROJECT_STEPS,
  type GraduationProjectTabId,
} from "@/data/student-graduation-project";
import {
  CHENG_YE_GRADUATION_PROJECT,
  CHENG_YE_GRADUATION_PROJECT_SIDEBAR,
  CHENG_YE_GRADUATION_PROJECT_STEPS,
} from "@/data/student-graduation-project-cheng-ye";
import { useGame } from "@/lib/game-state";
import "@/styles/student-project.css";

type ProjectMeta = typeof GRADUATION_PROJECT;
type ProjectStep = (typeof GRADUATION_PROJECT_STEPS)[number];

function FlowChartIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className="stu-proj__flow-icon">
      <path
        d="M2 2h4v3H2V2zm8 0h4v3h-4V2zM2 11h4v3H2v-3zm8 0h4v3h-4v-3zM6 3.5h4M8 6v4M6 12.5h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function ProgressPanel({
  project,
  steps,
  isChengYe,
}: {
  project: ProjectMeta;
  steps: ProjectStep[];
  isChengYe: boolean;
}) {
  return (
    <>
      <div className="stu-proj__section-head">
        <h2 className="stu-proj__section-title">
          进度信息
          <span className="stu-proj__system-id">（系统编号：{project.systemId}）</span>
        </h2>
        <button type="button" className="stu-proj__flow-link">
          <FlowChartIcon />
          审批流程图
        </button>
      </div>

      <div className="stu-proj__table-wrap">
        <table className="stu-proj__table">
          <thead>
            <tr>
              <th>序号</th>
              <th>进度说明</th>
              <th>审核人</th>
              <th>审核意见</th>
              <th>审核时间</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((step) => (
              <tr
                key={step.id}
                className={
                  step.status === "pending"
                    ? "is-pending"
                    : step.status === "rejected"
                      ? "is-rejected"
                      : isChengYe && step.status === "done"
                        ? "is-success"
                        : undefined
                }
              >
                <td>{step.id}</td>
                <td>
                  {step.label}
                  {step.status === "pending" ? (
                    <span className="stu-proj__pending-tag">（未审核）</span>
                  ) : null}
                </td>
                <td>{step.auditor || "—"}</td>
                <td>{step.opinion || "—"}</td>
                <td>{step.time || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button type="button" className="stu-proj__collapse-link">
        收缩全部
      </button>

      <div className="stu-proj__hint">
        {isChengYe ? (
          <>
            <p>该项目已通过 Creative Yard 创作路径机制完成跨模块立项与结项归档。</p>
            <Link href="/student/home">查看创作路径档案 →</Link>
          </>
        ) : (
          <>
            <p>你遇到的问题，与林澈当年惊人地相似…</p>
            <Link href="/student/home?chat=ani">向 Ani AI 寻求帮助 →</Link>
          </>
        )}
      </div>
    </>
  );
}

function BasicPanel({
  project,
  studentName,
  studentId,
}: {
  project: ProjectMeta;
  studentName: string;
  studentId: string;
}) {
  const rows = [
    ["项目名称", project.title],
    ["项目类型", project.type],
    ["所属学院", project.college],
    ["所属专业", project.major],
    ["指导教师", project.advisor],
    ["学生姓名", studentName],
    ["学号", studentId],
    ["当前状态", project.currentStatus],
    ["项目摘要", project.summary],
  ];

  return (
    <>
      <h2 className="stu-proj__section-title is-plain">基本信息</h2>
      <dl className="stu-proj__info-grid">
        {rows.map(([label, value]) => (
          <div key={label} className="stu-proj__info-row">
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function DetailPanel({ project, isChengYe }: { project: ProjectMeta; isChengYe: boolean }) {
  const rows = isChengYe
    ? [
        ["入学年份", project.enrollYear],
        ["毕业年份", project.graduateYear],
        ["路径账号", CHENG_YE.internalId],
        ["关联立项", "CYA-P-2030-01"],
        ["关联成果", "CYA-P-2034-02《山海行灯》"],
        ["媒介类型", "漫画 / 动画 / 交互 / 游戏（跨媒介）"],
        ["结项形式", "跨媒介叙事实验 + 互动原型 + 毕业联展"],
        ["备注", "Ani AI 辅助原型推演与资源匹配；创作决策由路径团队作出。"],
      ]
    : [
        ["入学年份", project.enrollYear],
        ["预计毕业年份", project.graduateYear],
        ["选题提交次数", `${project.submitCount} 次`],
        ["最近一次退回", "2036-05-20"],
        ["媒介类型", "动画 / 游戏 / 交互 / 未来影像（跨媒介）"],
        ["拟结项形式", "跨媒介叙事实验 + 互动原型"],
        ["实验室需求", "动画实验室 · 交互媒体实验室 · 游戏引擎实训室"],
        ["备注", "当前卡在学院毕设选题审核环节，需明确主专业方向或补充跨媒介路径说明。"],
      ];

  return (
    <>
      <h2 className="stu-proj__section-title is-plain">详细信息</h2>
      <dl className="stu-proj__info-grid">
        {rows.map(([label, value]) => (
          <div key={label} className="stu-proj__info-row">
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function PlaceholderPanel({ title }: { title: string }) {
  return (
    <>
      <h2 className="stu-proj__section-title is-plain">{title}</h2>
      <p className="stu-proj__empty">暂无{title.replace("信息", "")}记录。</p>
    </>
  );
}

export function StudentProjectPageClient() {
  const { studentPersona } = useGame();
  const isChengYe = studentPersona === "cheng_ye";
  const project = isChengYe ? CHENG_YE_GRADUATION_PROJECT : GRADUATION_PROJECT;
  const steps = isChengYe ? CHENG_YE_GRADUATION_PROJECT_STEPS : GRADUATION_PROJECT_STEPS;
  const sidebar = isChengYe ? CHENG_YE_GRADUATION_PROJECT_SIDEBAR : GRADUATION_PROJECT_SIDEBAR;
  const [tab, setTab] = useState<GraduationProjectTabId>("progress");

  return (
    <StudentPortalShell showHero>
      <div className={`stu-proj${isChengYe ? " stu-proj--cya" : ""}`}>
        {!isChengYe ? <ClueTrigger id="personal_rejected" /> : null}

        <nav className="stu-proj__breadcrumb" aria-label="面包屑">
          <Link href="/student/home">首页</Link>
          <span className="stu-proj__breadcrumb-sep">{">>"}</span>
          <span>学生毕业设计管理</span>
          <span className="stu-proj__breadcrumb-sep">{">>"}</span>
          <span className="is-current">项目状态查询</span>
        </nav>

        <div className="stu-proj__layout">
          <aside className="stu-proj__sidebar">
            <div className="stu-proj__sidebar-title">个人信息</div>
            <ul className="stu-proj__sidebar-list">
              {sidebar.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`stu-proj__sidebar-item${tab === item.id ? " is-active" : ""}`}
                    onClick={() => setTab(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <main className="stu-proj__main">
            {tab === "progress" ? (
              <ProgressPanel project={project} steps={steps} isChengYe={isChengYe} />
            ) : null}
            {tab === "basic" ? (
              <BasicPanel
                project={project}
                studentName={isChengYe ? CHENG_YE.name : PLAYER.name}
                studentId={isChengYe ? CHENG_YE.studentId : PLAYER.studentId}
              />
            ) : null}
            {tab === "detail" ? <DetailPanel project={project} isChengYe={isChengYe} /> : null}
            {tab === "attachment" ? <PlaceholderPanel title="附件信息" /> : null}
            {tab === "history" ? <PlaceholderPanel title="历史记录" /> : null}
          </main>
        </div>
      </div>
    </StudentPortalShell>
  );
}
