"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StudentPortalShell } from "@/components/student/StudentPortalShell";
import {
  CHENG_YE_COURSE_SIDEBAR,
  CHENG_YE_COURSE_TAB_LABELS,
  CHENG_YE_COURSES_META,
  getChengYeCoursesByTab,
  type ChengYeCourseTabId,
} from "@/data/student-portal-cheng-ye-courses";
import { useGame } from "@/lib/game-state";
import "@/styles/student-project.css";

export function StudentCoursesPageClient() {
  const router = useRouter();
  const { studentPersona } = useGame();
  const isChengYe = studentPersona === "cheng_ye";
  const [tab, setTab] = useState<ChengYeCourseTabId>("animation");

  useEffect(() => {
    if (!isChengYe) router.replace("/student/home");
  }, [isChengYe, router]);

  if (!isChengYe) return null;

  const courses = getChengYeCoursesByTab(tab);

  return (
    <StudentPortalShell showHero>
      <div className="stu-proj stu-proj--cya">
        <nav className="stu-proj__breadcrumb" aria-label="面包屑">
          <Link href="/student/home">首页</Link>
          <span className="stu-proj__breadcrumb-sep">{">>"}</span>
          <span>选课中心</span>
          <span className="stu-proj__breadcrumb-sep">{">>"}</span>
          <span className="is-current">{CHENG_YE_COURSE_TAB_LABELS[tab]}</span>
        </nav>

        <div className="stu-proj__layout">
          <aside className="stu-proj__sidebar">
            <div className="stu-proj__sidebar-title">课程模块</div>
            <ul className="stu-proj__sidebar-list">
              {CHENG_YE_COURSE_SIDEBAR.map((item) => (
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
                {CHENG_YE_COURSE_TAB_LABELS[tab]}
                <span className="stu-proj__system-id">
                  （调度账号：{CHENG_YE_COURSES_META.account} · {CHENG_YE_COURSES_META.projectCode}）
                </span>
              </h2>
            </div>

            <div className="stu-proj__table-wrap stu-proj__table-wrap--resources">
              <table className="stu-proj__table stu-proj__table--resources">
                <thead>
                  <tr>
                    <th>序号</th>
                    <th>课程名称</th>
                    <th>课程编码</th>
                    <th>学分</th>
                    <th>授课模块</th>
                    <th>选课方式</th>
                    <th>状态</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr
                      key={course.id}
                      className={course.status === "已选" ? "is-success" : undefined}
                    >
                      <td>{index + 1}</td>
                      <td>{course.name}</td>
                      <td>{course.code}</td>
                      <td>{course.credits}</td>
                      <td>{course.module}</td>
                      <td>{course.enroll}</td>
                      <td>{course.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="stu-proj__hint">
              <p>
                课程范围：{CHENG_YE_COURSES_META.scope} · {CHENG_YE_COURSES_META.status}
              </p>
              <p>
                当前列表共 {courses.length} 门 · 创作路径账号 CYA-0000
                可跨动画、数字媒体、游戏三大专业群选择拓展能力模块，供团队在不改变真实学籍归属的前提下完成跨媒介创作实训。
              </p>
            </div>
          </main>
        </div>
      </div>
    </StudentPortalShell>
  );
}
