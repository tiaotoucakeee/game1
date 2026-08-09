"use client";

import { FormEvent, useMemo, useState } from "react";
import { AuditGate } from "@/components/game/SystemGate";
import { ClueTrigger } from "@/components/game/ClueTrigger";
import { AuditLink } from "@/components/audit/auditWorkbenchStyles";
import {
  getLabApplicationRecords,
  getLabApplicationSummary,
  type LabApplicationRecord,
} from "@/data/audit-lab-applications";
import { LIN_CHE, queryLabArchive } from "@/data/game";

function LabStudentIdQueryForm({ onQuery }: { onQuery: (studentId: string) => void }) {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState<{ type: "error" | "sealed"; text: string } | null>(
    null,
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) {
      setMessage({ type: "error", text: "请输入学号后再查询。" });
      return;
    }

    const result = queryLabArchive(trimmed);
    if (result === "lin_che") {
      setMessage(null);
      onQuery(trimmed);
      return;
    }
    if (result === "sealed") {
      setMessage({ type: "sealed", text: "该学号暂无实验室申请记录，或记录已完成核对封装。" });
      return;
    }
    setMessage({ type: "error", text: "未查询到该学号对应的实验室申请记录。" });
  }

  return (
    <div className="audit-student-query">
      <p className="audit-student-query__hint">
        本系统仅支持按<strong>标准学号</strong>检索实验室申请记录。请输入完整学号后点击查询。
      </p>
      <form className="audit-student-query__form" onSubmit={handleSubmit}>
        <label className="audit-student-query__label" htmlFor="audit-lab-student-id">
          学号
        </label>
        <input
          id="audit-lab-student-id"
          className="audit-student-query__input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (message) setMessage(null);
          }}
          placeholder="请输入学生学号"
          autoComplete="off"
          spellCheck={false}
        />
        <button type="submit" className="audit-student-query__btn">
          查询
        </button>
      </form>
      {message ? (
        <p
          className={
            message.type === "sealed"
              ? "audit-student-query__sealed"
              : "audit-student-query__error"
          }
        >
          {message.text}
        </p>
      ) : null}
      <p className="audit-student-query__note">
        提示：学号可在项目立项书、内部协作档案等材料中查找。
      </p>
    </div>
  );
}

function LabApplicationTableRow({ row, index }: { row: LabApplicationRecord; index: number }) {
  return (
    <tr className={row.highlight ? "is-lead" : undefined}>
      <td>{index + 1}</td>
      <td>{row.date}</td>
      <td>{row.highlight ? <strong>{row.applicant}</strong> : row.applicant}</td>
      <td className="audit-lab-records__mono">
        {row.highlight ? <strong>{row.studentId}</strong> : row.studentId}
      </td>
      <td>{row.lab}</td>
      <td>
        <span
          className={
            row.status === "通过"
              ? "audit-lab-records__badge is-pass"
              : "audit-lab-records__badge is-reject"
          }
        >
          {row.status}
        </span>
      </td>
      <td>{row.highlight ? <strong>{row.reason}</strong> : row.reason}</td>
    </tr>
  );
}

function LabApplicationRecords({ queriedId }: { queriedId: string }) {
  const records = useMemo(() => getLabApplicationRecords(), []);
  const summary = useMemo(() => getLabApplicationSummary(records), [records]);

  return (
    <div className="audit-lab-records">
      <ClueTrigger id="project_lin_che" />

      <div className="audit-lab-records__toolbar">
        <p className="audit-lab-records__query-meta">
          查询学号：<strong>{queriedId}</strong>
          <span className="audit-lab-records__query-name">（{LIN_CHE.name}）</span>
        </p>
        <p className="audit-lab-records__summary">
          共 {summary.total} 条 · 通过 {summary.approved} · 驳回 {summary.rejected}
        </p>
      </div>

      <div className="audit-lab-records__table-wrap">
        <table className="audit-lab-records__table">
          <thead>
            <tr>
              <th>序号</th>
              <th>申请日期</th>
              <th>申请人</th>
              <th>学号</th>
              <th>申请实验室</th>
              <th>状态</th>
              <th>审批意见</th>
            </tr>
          </thead>
          <tbody>
            {records.map((row, index) => (
              <LabApplicationTableRow key={row.id} row={row} index={index} />
            ))}
          </tbody>
        </table>
      </div>

      <AuditLink href="/anima/search?q=韩老师">搜索：韩老师</AuditLink>
    </div>
  );
}

function LabQueryContent() {
  const [queriedId, setQueriedId] = useState<string | null>(null);

  return (
    <div className="audit-embed-page audit-student-page">
      <div className="audit-student-shell">
        <div className="audit-student-shell__head">
          <h2 className="audit-student-shell__title">实验室申请记录 · W07</h2>
          {queriedId ? (
            <button
              type="button"
              className="audit-student-query__reset"
              onClick={() => setQueriedId(null)}
            >
              重新查询
            </button>
          ) : null}
        </div>
        <div className="audit-student-shell__body">
          {queriedId ? (
            <LabApplicationRecords queriedId={queriedId} />
          ) : (
            <div className="audit-inner-widget audit-student-query-panel">
              <LabStudentIdQueryForm onQuery={setQueriedId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AuditLabPage() {
  return (
    <AuditGate>
      <LabQueryContent />
    </AuditGate>
  );
}
