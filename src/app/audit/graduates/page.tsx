"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AuditGate } from "@/components/game/SystemGate";
import { GraduatePaperFloat } from "@/components/audit/GraduatePaperFloat";
import { AuditTerminalBootOverlay } from "@/components/audit/AuditTerminalBootOverlay";
import { GRADUATES, type GraduateRecord } from "@/data/game";
import { useGame } from "@/lib/game-state";
import type { GraduateVerifyStatus } from "@/types/game";

type VerifyStatus = GraduateVerifyStatus;

const CHENG_YE_STUDENT_ID = GRADUATES.find((g) => g.anomaly)!.studentId;

const GLITCH_CHARS = "█▓▒░▄▀■□▪▫◆◇";

function glitchText(seed: string, pass: number) {
  return seed
    .split("")
    .map((ch, i) => {
      if (ch === " ") return " ";
      if ((i + pass) % 2 === 0) return ch;
      return GLITCH_CHARS[(i * 7 + pass * 13) % GLITCH_CHARS.length];
    })
    .join("");
}

function VerifyResultIcon({ status }: { status: VerifyStatus }) {
  if (status === "ok") {
    return (
      <span className="audit-op-result audit-op-result--ok" aria-label="核查无误">
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
          <circle cx="11" cy="11" r="11" fill="#52c41a" />
          <path d="M6.5 11.2l2.8 2.8L15.8 7.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </span>
    );
  }

  return (
    <span className="audit-op-result audit-op-result--error" aria-label="信息有误">
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
        <circle cx="11" cy="11" r="11" fill="#f5222d" />
        <path d="M7.5 7.5l7 7M14.5 7.5l-7 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function OperationMenu({
  graduate,
  status,
  onVerifyOk,
  onVerifyError,
}: {
  graduate: GraduateRecord;
  status?: VerifyStatus;
  onVerifyOk: () => void;
  onVerifyError: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [glitchPass, setGlitchPass] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  useEffect(() => {
    if (!open) setGlitchPass(0);
  }, [open]);

  if (status === "ok" || status === "error") {
    return <VerifyResultIcon status={status} />;
  }

  const handleBrokenOk = () => {
    setGlitchPass((n) => n + 1);
  };

  return (
    <div className="audit-op-wrap" ref={rootRef}>
      <button type="button" className="audit-op-btn" onClick={() => setOpen((v) => !v)}>
        操作
        <span className="audit-op-caret" aria-hidden />
      </button>
      {open ? (
        <ul className={`audit-op-menu${glitchPass > 0 ? " is-glitched" : ""}`}>
          {graduate.anomaly ? (
            <>
              <li>
                <button type="button" className="audit-op-menu__broken" onClick={handleBrokenOk}>
                  {glitchPass > 0 ? glitchText("核查无误", glitchPass + 2) : "核\uFFFD查无误"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onVerifyError();
                    setOpen(false);
                  }}
                >
                  信息有误
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onVerifyOk();
                    setOpen(false);
                  }}
                >
                  核查无误
                </button>
              </li>
              <li>
                <button type="button" className="audit-op-menu__disabled" disabled>
                  信息有误
                </button>
              </li>
            </>
          )}
        </ul>
      ) : null}
    </div>
  );
}

function GraduatesContent() {
  const {
    auditTerminalUnlocked,
    setAuditTerminalUnlocked,
    graduateVerifyMap,
    setGraduateVerify,
  } = useGame();
  const [bootOverlay, setBootOverlay] = useState(false);
  const bootTriggeredRef = useRef(false);

  const verifyMap = graduateVerifyMap;
  const chengYeMarkedError = verifyMap[CHENG_YE_STUDENT_ID] === "error";
  const submitDisabled = chengYeMarkedError;

  const setVerifyOk = useCallback(
    (studentId: string) => setGraduateVerify(studentId, "ok"),
    [setGraduateVerify],
  );

  const setVerifyError = useCallback(
    (studentId: string) => setGraduateVerify(studentId, "error"),
    [setGraduateVerify],
  );

  useEffect(() => {
    if (!chengYeMarkedError || auditTerminalUnlocked || bootTriggeredRef.current) return;
    bootTriggeredRef.current = true;
    setBootOverlay(true);
  }, [chengYeMarkedError, auditTerminalUnlocked]);

  const handleBootComplete = useCallback(() => {
    setBootOverlay(false);
    setAuditTerminalUnlocked(true);
    if (typeof window !== "undefined") {
      const msg = { type: "cuc-audit-terminal-unlocked" };
      const origin = window.location.origin;
      window.parent?.postMessage(msg, origin);
      window.top?.postMessage(msg, origin);
    }
  }, [setAuditTerminalUnlocked]);

  return (
    <div className="container-filud audit-embed-page audit-graduates-page">
      {bootOverlay ? <AuditTerminalBootOverlay onComplete={handleBootComplete} /> : null}
      <GraduatePaperFloat />
      <div className="audit-graduates-layout">
        <div className="widget audit-graduates-table-panel">
          <div className="widget-header bordered-bottom bordered-info">
            <span className="widget-caption">
              <i className="icon icon-th-list mg-r-5" aria-hidden />
              <span className="KeyFname">2034年优秀毕业生档案核对</span>
            </span>
          </div>
          <div className="widget-body">
            <div className="audit-query-table-wrap">
              <table className="audit-query-table">
                <thead>
                  <tr>
                    <th className="col-seq">序号</th>
                    <th className="col-name">姓名</th>
                    <th className="col-id">学号</th>
                    <th className="col-major">所属专业</th>
                    <th className="col-bio">学业/创作代表作简介</th>
                    <th className="col-op">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {GRADUATES.map((g) => {
                    const status = verifyMap[g.studentId];
                    const rowError = g.anomaly && status === "error";

                    return (
                      <tr
                        key={g.studentId}
                        className={rowError ? "audit-row-marked-error" : undefined}
                      >
                        <td className="col-seq">{g.seq}</td>
                        <td className="col-name">
                          <span className="audit-query-link">{g.name}</span>
                        </td>
                        <td className="col-id">{g.studentId}</td>
                        <td className="col-major">{g.major}</td>
                        <td className="col-bio">{g.bio}</td>
                        <td className="col-op">
                          <OperationMenu
                            graduate={g}
                            status={status}
                            onVerifyOk={() => setVerifyOk(g.studentId)}
                            onVerifyError={() => setVerifyError(g.studentId)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="audit-graduates-submit">
              <button
                type="button"
                className={`audit-graduates-submit__btn${submitDisabled ? " is-disabled" : ""}`}
                disabled={submitDisabled}
                title={submitDisabled ? "存在未通过核对的异常记录，无法提交" : undefined}
              >
                提交
              </button>
            </div>
          </div>
        </div>
        <div className="audit-graduates-paper-zone" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function AuditGraduatesPage() {
  return (
    <AuditGate>
      <GraduatesContent />
    </AuditGate>
  );
}
