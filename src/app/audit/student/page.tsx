"use client";

import { FormEvent, useState } from "react";
import { AuditGate } from "@/components/game/SystemGate";
import { ClueTrigger } from "@/components/game/ClueTrigger";
import { ChengYeStudentProfile } from "@/components/audit/ChengYeStudentProfile";
import { LinCheStudentProfile } from "@/components/audit/LinCheStudentProfile";
import { queryStudentArchive } from "@/data/game";

function StudentIdQueryForm({ onQuery }: { onQuery: (studentId: string) => void }) {
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

    const result = queryStudentArchive(trimmed);
    if (result === "cheng_ye" || result === "lin_che") {
      setMessage(null);
      onQuery(trimmed);
      return;
    }
    if (result === "sealed") {
      setMessage({ type: "sealed", text: "该学生信息已完成核对封装，无法查询。" });
      return;
    }
    setMessage({ type: "error", text: "未查询到该学号对应的学籍档案。" });
  }

  return (
    <div className="audit-student-query">
      <p className="audit-student-query__hint">
        本系统仅支持按<strong>标准学号</strong>检索学生档案。请输入完整学号后点击查询。
      </p>
      <form className="audit-student-query__form" onSubmit={handleSubmit}>
        <label className="audit-student-query__label" htmlFor="audit-student-id">
          学号
        </label>
        <input
          id="audit-student-id"
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
        提示：学号可在优秀毕业生核对名单、项目档案等内部材料中查找。
      </p>
    </div>
  );
}

function StudentArchiveResult({ studentId }: { studentId: string }) {
  const result = queryStudentArchive(studentId);

  if (result === "lin_che") {
    return <LinCheStudentProfile />;
  }

  if (result === "cheng_ye") {
    return (
      <>
        <ClueTrigger id="identity_no_enrollment" />
        <ClueTrigger id="identity_cya_code" />
        <ChengYeStudentProfile />
      </>
    );
  }

  return null;
}

function StudentArchiveContent() {
  const [queriedId, setQueriedId] = useState<string | null>(null);

  return (
    <div className="audit-embed-page audit-student-page">
      <div className="audit-student-shell">
        <div className="audit-student-shell__head">
          <h2 className="audit-student-shell__title">学生档案查询 · W04</h2>
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
            <StudentArchiveResult studentId={queriedId} />
          ) : (
            <div className="audit-inner-widget audit-student-query-panel">
              <StudentIdQueryForm onQuery={setQueriedId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AuditStudentPage() {
  return (
    <AuditGate>
      <StudentArchiveContent />
    </AuditGate>
  );
}
