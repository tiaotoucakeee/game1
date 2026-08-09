"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuditGate } from "@/components/game/SystemGate";
import {
  SubmitBonusClueItem,
  SubmitClueContent,
  SubmitSpoilerDialog,
  useSubmitSpoilerReveals,
} from "@/components/audit/SubmitClueReveal";
import { CORE_CLUES, hasAllCoreClues } from "@/data/game";
import { navigateAuditFullscreen } from "@/lib/audit-embed";
import { useGame } from "@/lib/game-state";
import type { ClueId } from "@/types/game";

const CLUE_GROUPS: Array<{ title: string; clues: ClueId[] }> = [
  {
    title: "身份核验",
    clues: ["identity_no_enrollment", "identity_cya_code"],
  },
  {
    title: "项目溯源",
    clues: ["project_award_anomaly", "project_lin_che"],
  },
  {
    title: "AI 与创作路径",
    clues: ["ai_ani_platform", "ai_cross_media", "ai_creative_path", "cya_truth"],
  },
];

const BONUS_CLUES: ClueId[] = ["personal_rejected", "open_path_code"];

function ClueStatusIcon({ collected }: { collected: boolean }) {
  return (
    <span className={`audit-submit-clue-icon${collected ? " is-done" : " is-missing"}`} aria-hidden>
      {collected ? "✓" : "—"}
    </span>
  );
}

function SummerSubmitDialog({
  onGoBack,
  onConfirm,
}: {
  onGoBack: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="audit-submit-dialog-overlay" role="presentation" onClick={onGoBack}>
      <div
        className="audit-submit-dialog audit-submit-dialog--summer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="audit-summer-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="audit-summer-dialog-title" className="audit-submit-dialog-title">
          你真的为你的工作负责吗？
        </h3>
        <p className="audit-submit-dialog-text">
          名单里有一个名字反复出现，你却从未点开核对。新闻里的涂黑、项目档案里的编号、内部附件里的聊天记录——这些异常也许并不 urgent，但它们正在等你。
        </p>
        <p className="audit-submit-dialog-text">
          若此刻提交「信息无误」，系统将直接归档，<strong>不会再给你第二次机会</strong>
          。建议回到优秀毕业生档案核对，仔细研究每一个可疑之处。
        </p>
        <div className="audit-submit-dialog-actions">
          <button type="button" className="audit-wb-btn audit-wb-btn-primary" onClick={onGoBack}>
            回去仔细核对
          </button>
          <button type="button" className="audit-wb-btn" onClick={onConfirm}>
            仍然提交
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteSubmitDialog({
  onGoBack,
  onConfirm,
}: {
  onGoBack: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="audit-submit-dialog-overlay" role="presentation" onClick={onGoBack}>
      <div
        className="audit-submit-dialog audit-submit-dialog--delete"
        role="dialog"
        aria-modal="true"
        aria-labelledby="audit-delete-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="audit-delete-dialog-title" className="audit-submit-dialog-title">
          再确认一次？
        </h3>
        <p className="audit-submit-dialog-text">
          你手边的材料，还不足以解释「程野」为何反复出现在不同模块里。有些断裂看起来像是系统错误，也有些地方，像是有人刻意留过痕迹。
        </p>
        <p className="audit-submit-dialog-text">
          删除申请一旦提交，流程通常不会再退回修改。名单会恢复整洁，那些对不上的页面也会一并关闭——快，也安静。
        </p>
        <div className="audit-submit-dialog-actions">
          <button type="button" className="audit-wb-btn audit-wb-btn-primary" onClick={onGoBack}>
            回去继续核对
          </button>
          <button type="button" className="audit-wb-btn audit-wb-btn-danger" onClick={onConfirm}>
            仍然提交删除申请
          </button>
        </div>
      </div>
    </div>
  );
}

function SubmitLockedView({ onSubmitClick }: { onSubmitClick: () => void }) {
  return (
    <div className="audit-embed-page audit-submit-page">
      <div className="widget audit-inner-widget">
        <div className="widget-header bordered-bottom bordered-info">
          <span className="widget-caption">
            <i className="icon icon-edit mg-r-5" aria-hidden />
            <span className="KeyFname">最终审核意见 · W13</span>
          </span>
        </div>
        <div className="widget-body">
          <article className="audit-submit-verdict audit-submit-verdict--locked is-primary">
            <div className="audit-submit-verdict-head">
              <h3 className="audit-submit-verdict-title">信息无误</h3>
            </div>
            <div className="audit-submit-verdict-actions">
              <button type="button" className="audit-wb-btn audit-wb-btn-primary" onClick={onSubmitClick}>
                提交审核意见
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

function SubmitContent() {
  const router = useRouter();
  const {
    clues,
    aniChatComplete,
    setEnding,
    setArchiveDeleted,
    hasClue,
    auditTerminalUnlocked,
  } = useGame();
  const {
    pendingClue,
    confirmReveal,
    cancelReveal,
    isClueVisible,
    requestReveal,
    isSpoilerReveal,
  } = useSubmitSpoilerReveals();
  const [summerConfirmOpen, setSummerConfirmOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const coreComplete = hasAllCoreClues(clues);
  const coreCount = CORE_CLUES.filter((c) => clues.includes(c)).length;
  const progress = Math.round((coreCount / CORE_CLUES.length) * 100);

  function persistEnding(patch: Record<string, unknown>) {
    try {
      const raw = localStorage.getItem("cuc-arg-game-state");
      if (raw) {
        const saved = JSON.parse(raw) as Record<string, unknown>;
        localStorage.setItem("cuc-arg-game-state", JSON.stringify({ ...saved, ...patch }));
      }
    } catch {
      /* ignore */
    }
  }

  function finalizePathReflection() {
    navigateAuditFullscreen("/audit/reflection");
  }

  function submitVerdict(verdict: "fake" | "path") {
    if (!auditTerminalUnlocked) return;
    if (verdict === "fake") {
      setDeleteConfirmOpen(true);
      return;
    }
    if (!coreComplete) return;
    finalizePathReflection();
  }

  function confirmDeleteEnding() {
    setArchiveDeleted(true);
    setEnding("nonexistent");
    persistEnding({ ending: "nonexistent", archiveDeleted: true });
    navigateAuditFullscreen("/audit/delete");
  }

  function confirmSummerEnding() {
    setEnding("summer_nothing");
    persistEnding({ ending: "summer_nothing" });
    navigateAuditFullscreen("/audit/summer");
  }

  if (!auditTerminalUnlocked) {
    return (
      <>
        {summerConfirmOpen ? (
          <SummerSubmitDialog
            onGoBack={() => {
              setSummerConfirmOpen(false);
              router.push("/audit/graduates");
            }}
            onConfirm={confirmSummerEnding}
          />
        ) : null}
        <SubmitLockedView onSubmitClick={() => setSummerConfirmOpen(true)} />
      </>
    );
  }

  return (
    <div className="audit-embed-page audit-submit-page">
      {pendingClue ? (
        <SubmitSpoilerDialog onConfirm={confirmReveal} onCancel={cancelReveal} />
      ) : null}
      {deleteConfirmOpen ? (
        <DeleteSubmitDialog
          onGoBack={() => {
            setDeleteConfirmOpen(false);
            router.push("/audit/graduates");
          }}
          onConfirm={confirmDeleteEnding}
        />
      ) : null}

      <div className="audit-submit-layout">
        <div className="widget audit-inner-widget">
          <div className="widget-header bordered-bottom bordered-info">
            <span className="widget-caption">
              <i className="icon icon-th-list mg-r-5" aria-hidden />
              <span className="KeyFname">已收集线索摘要 · W13</span>
            </span>
          </div>
          <div className="widget-body">
            <p className="audit-wb-muted" style={{ margin: "0 0 16px" }}>
              线索内容默认打码；通过各模块正常调查后将自动解锁。未收集条目可点击查看，但可能影响推理体验。
            </p>
            {CLUE_GROUPS.map((group) => (
              <section key={group.title} style={{ marginBottom: group.title === "AI 与创作路径" ? 0 : 20 }}>
                <h3 className="audit-submit-section-title">{group.title}</h3>
                <div className="audit-query-table-wrap">
                  <table className="audit-wb-table audit-submit-clue-table">
                    <thead>
                      <tr>
                        <th style={{ width: 52 }}>状态</th>
                        <th>线索内容</th>
                        <th style={{ width: 88 }}>来源模块</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.clues.map((clueId) => {
                        const collected = hasClue(clueId);
                        const visible = isClueVisible(clueId, collected);
                        return (
                          <tr
                            key={clueId}
                            className={`audit-submit-clue-row${collected ? " is-done" : " is-missing"}`}
                          >
                            <td>
                              <ClueStatusIcon collected={collected} />
                            </td>
                            <td>
                              <SubmitClueContent
                                clueId={clueId}
                                collected={collected}
                                visible={visible}
                                spoilerReveal={isSpoilerReveal(clueId, collected)}
                                onRequestReveal={() => requestReveal(clueId, collected)}
                              />
                            </td>
                            <td className="audit-wb-muted">
                              {clueId.startsWith("identity")
                                ? "W05"
                                : clueId.startsWith("project")
                                  ? "W06"
                                  : "W09–W10"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            ))}
          </div>
        </div>

        <aside className="audit-submit-summary">
          <div className="audit-submit-stat">
            <p className="audit-submit-stat-label">核心线索完整度</p>
            <p className={`audit-submit-stat-value${coreComplete ? " is-ready" : " is-pending"}`}>
              {coreCount}/{CORE_CLUES.length}
            </p>
            <div className="audit-submit-progress" aria-hidden>
              <div className="audit-submit-progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <span className={`audit-submit-status-tag${coreComplete ? " is-ready" : " is-pending"}`}>
              {coreComplete ? "已满足提交条件" : "尚未满足提交条件"}
            </span>
          </div>

          <div className="audit-submit-stat">
            <p className="audit-submit-stat-label">附加线索</p>
            <ul className="audit-submit-bonus-list">
              {BONUS_CLUES.map((clueId) => {
                const collected = hasClue(clueId);
                const bonusVisible = collected || (coreComplete && isClueVisible(clueId, collected));
                return (
                  <SubmitBonusClueItem
                    key={clueId}
                    clueId={clueId}
                    collected={collected}
                    visible={bonusVisible}
                    locked={!coreComplete && !collected}
                    spoilerReveal={isSpoilerReveal(clueId, collected)}
                    onRequestReveal={() => {
                      if (!coreComplete) return;
                      requestReveal(clueId, collected);
                    }}
                  />
                );
              })}
            </ul>
          </div>

          <div className="audit-submit-stat">
            <p className="audit-submit-stat-label">审核人</p>
            <p style={{ margin: 0, fontSize: 14, color: "#303133", fontWeight: 600 }}>祁玉</p>
            <p className="audit-wb-muted" style={{ margin: "6px 0 0" }}>
              2036-07-01 临时核对任务
            </p>
          </div>
        </aside>
      </div>

      <div className="widget audit-inner-widget">
        <div className="widget-header bordered-bottom bordered-info">
          <span className="widget-caption">
            <i className="icon icon-edit mg-r-5" aria-hidden />
            <span className="KeyFname">最终审核意见</span>
          </span>
        </div>
        <div className="widget-body">
          <div className={`audit-submit-verdicts${coreComplete ? "" : " audit-submit-verdicts--single"}`}>
            {coreComplete ? (
              <article className="audit-submit-verdict is-primary">
                <div className="audit-submit-verdict-head">
                  <h3 className="audit-submit-verdict-title">意见：更正为创作路径账户</h3>
                </div>
                <p className="audit-submit-verdict-desc">
                  「程野」在学籍库中查无正式注册，但项目立项书、成果关联与 Creative Yard 账户（CYA-0000）能够相互印证。综合现有材料，该条目应归类为跨专业创作路径账户，不宜继续按真实学生档案留存。建议更正分类后移出优秀毕业生公示。
                </p>
                <div className="audit-submit-verdict-actions">
                  <button
                    type="button"
                    className="audit-wb-btn audit-wb-btn-primary"
                    onClick={() => submitVerdict("path")}
                  >
                    提交审核意见
                  </button>
                </div>
              </article>
            ) : null}

            <article className="audit-submit-verdict is-danger">
              <div className="audit-submit-verdict-head">
                <h3 className="audit-submit-verdict-title">意见：按异常记录清理</h3>
              </div>
              <p className="audit-submit-verdict-desc">
                该条目在学籍、项目与成果链路上存在多处无法互证的断裂，暂未能说明其有效来源。可依照学院信息安全规定，申请自系统内移除相关记录。
              </p>
              <div className="audit-submit-verdict-actions">
                <button
                  type="button"
                  className="audit-wb-btn audit-wb-btn-danger"
                  onClick={() => submitVerdict("fake")}
                >
                  提交删除申请
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>

      {!aniChatComplete && coreComplete ? (
        <div className="audit-submit-alert">
          <span aria-hidden>!</span>
          <div>
            <strong>另有未核事项：</strong>
            个人学生系统中仍有未读对话记录。若需进一步核实创作路径账户的使用情况，可登录后查阅。
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function AuditSubmitPage() {
  return (
    <AuditGate>
      <SubmitContent />
    </AuditGate>
  );
}
