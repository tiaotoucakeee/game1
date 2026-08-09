"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AuditGate } from "@/components/game/SystemGate";
import { CreativeYardProjectProposal } from "@/components/audit/CreativeYardProjectProposal";
import { UnnamedRoadProjectProposal } from "@/components/audit/UnnamedRoadProjectProposal";
import { ShanhaiLampProjectProposal } from "@/components/audit/ShanhaiLampProjectProposal";
import { getProjectQueryMeta } from "@/data/audit-project-query";
import { CREATIVE_YARD_ACCOUNT_CODE } from "@/data/audit-project-proposal-types";
import {
  queryProjectArchive,
  resolveProjectCode,
} from "@/data/game";
import { useGame } from "@/lib/game-state";

const PROJECT_QUERY_RESULTS = new Set([
  "creative_yard",
  "unnamed_road",
  "shanhai_lamp",
]);

function ProjectQueryHistoryBar({
  history,
  activeCode,
  onSelect,
}: {
  history: string[];
  activeCode?: string | null;
  onSelect: (code: string) => void;
}) {
  const items = history
    .map((code) => getProjectQueryMeta(code))
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (items.length === 0) return null;

  const activeResolved = activeCode ? resolveProjectCode(activeCode) : null;

  return (
    <div className="audit-project-query-history">
      <span className="audit-project-query-history__label">最近查询</span>
      <div className="audit-project-query-history__list">
        {items.map((item) => (
          <button
            key={item.code}
            type="button"
            className={`audit-project-query-history__item${
              activeResolved === item.code ? " is-active" : ""
            }`}
            onClick={() => onSelect(item.code)}
          >
            <span className="audit-project-query-history__name">{item.shortLabel}</span>
            <span className="audit-project-query-history__code">{item.code}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectCodeQueryForm({ onQuery }: { onQuery: (projectCode: string) => void }) {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState<{ type: "error" | "sealed" | "hint"; text: string } | null>(
    null,
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) {
      setMessage({ type: "error", text: "请输入项目编码后再查询。" });
      return;
    }

    const result = queryProjectArchive(trimmed);
    if (PROJECT_QUERY_RESULTS.has(result)) {
      setMessage(
        trimmed.trim().toUpperCase() === CREATIVE_YARD_ACCOUNT_CODE
          ? {
              type: "hint",
              text: "CYA-0000 为创作路径账号，已为您跳转至对应立项档案 CYA-P-2030-01。",
            }
          : null,
      );
      onQuery(trimmed);
      return;
    }
    if (result === "sealed") {
      setMessage({ type: "sealed", text: "该项目档案已完成核对封装，无法查询。" });
      return;
    }
    setMessage({ type: "error", text: "未查询到该项目编码对应的立项档案。" });
  }

  return (
    <div className="audit-student-query">
      <p className="audit-student-query__hint">
        本系统仅支持按<strong>标准项目编码</strong>检索立项档案。请输入完整编码后点击查询。
      </p>
      <form className="audit-student-query__form" onSubmit={handleSubmit}>
        <label className="audit-student-query__label" htmlFor="audit-project-code">
          项目编码
        </label>
        <input
          id="audit-project-code"
          className="audit-student-query__input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (message) setMessage(null);
          }}
          placeholder="请输入项目编码"
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
              : message.type === "hint"
                ? "audit-student-query__note"
                : "audit-student-query__error"
          }
        >
          {message.text}
        </p>
      ) : null}
      <p className="audit-student-query__note">
        提示：项目编码可在学生档案、获奖公示等内部材料中查找。
      </p>
    </div>
  );
}

function ProjectArchiveResult({ projectCode }: { projectCode: string }) {
  const result = queryProjectArchive(projectCode);
  if (result === "creative_yard") {
    return <CreativeYardProjectProposal />;
  }
  if (result === "unnamed_road") {
    return <UnnamedRoadProjectProposal />;
  }
  if (result === "shanhai_lamp") {
    return <ShanhaiLampProjectProposal />;
  }
  return null;
}

function ProjectQueryContent() {
  const searchParams = useSearchParams();
  const { projectQueryHistory, addProjectQueryHistory } = useGame();
  const [queriedCode, setQueriedCode] = useState<string | null>(null);

  const openProject = useCallback(
    (code: string) => {
      const resolved = resolveProjectCode(code);
      const result = queryProjectArchive(resolved);
      if (!PROJECT_QUERY_RESULTS.has(result)) return;
      addProjectQueryHistory(resolved);
      setQueriedCode(resolved);
    },
    [addProjectQueryHistory],
  );

  useEffect(() => {
    const code = searchParams.get("code")?.trim();
    if (!code) return;
    openProject(code);
  }, [searchParams, openProject]);

  const isCyaTheme = queriedCode ? queryProjectArchive(queriedCode) === "creative_yard" : false;

  return (
    <div
      className={`audit-embed-page audit-student-page${
        isCyaTheme ? " audit-student-page--cya" : ""
      }`}
    >
      <div className="audit-student-shell">
        <div className="audit-student-shell__head">
          <h2 className="audit-student-shell__title">学生项目查询 · W12</h2>
          {queriedCode ? (
            <button
              type="button"
              className="audit-student-query__reset"
              onClick={() => setQueriedCode(null)}
            >
              重新查询
            </button>
          ) : null}
        </div>
        <div className="audit-student-shell__body">
          <div className="audit-student-shell__toolbar">
            <ProjectQueryHistoryBar
              history={projectQueryHistory}
              activeCode={queriedCode}
              onSelect={openProject}
            />
          </div>
          {queriedCode ? (
            <ProjectArchiveResult projectCode={queriedCode} />
          ) : (
            <div className="audit-inner-widget audit-student-query-panel">
              <ProjectCodeQueryForm onQuery={openProject} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AuditProjectPage() {
  return (
    <AuditGate>
      <ProjectQueryContent />
    </AuditGate>
  );
}
