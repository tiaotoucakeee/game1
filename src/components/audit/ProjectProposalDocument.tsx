import type { ReactNode } from "react";
import type { ClueId } from "@/types/game";
import { ClueTrigger } from "@/components/game/ClueTrigger";
import type { AuditProjectProposalDoc } from "@/data/audit-project-proposal-types";

function highlightName(text: string, name?: string): ReactNode {
  if (!name || !text.includes(name)) return text;
  const parts = text.split(name);
  return parts.reduce<ReactNode[]>((nodes, part, index) => {
    if (part) nodes.push(part);
    if (index < parts.length - 1) {
      nodes.push(<strong key={`${index}-${name}`}>{name}</strong>);
    }
    return nodes;
  }, []);
}

export function ProjectProposalDocument({
  doc,
  highlightName: leadName,
  clueId,
  subtitle = "项目立项书 · 内部归档版",
  membersHeading = "七、团队成员",
}: {
  doc: AuditProjectProposalDoc;
  highlightName?: string;
  clueId?: ClueId;
  subtitle?: string;
  membersHeading?: string;
}) {
  return (
    <div className="audit-project-proposal">
      {clueId ? <ClueTrigger id={clueId} /> : null}

      <header className="audit-project-proposal__doc-head">
        <h3 className="audit-project-proposal__doc-title">{doc.title}</h3>
        <p className="audit-project-proposal__doc-sub">{subtitle}</p>
      </header>

      <dl className="audit-project-proposal__meta-grid">
        <div className="audit-project-proposal__meta-row">
          <dt>项目编码</dt>
          <dd>{doc.code}</dd>
        </div>
        <div className="audit-project-proposal__meta-row">
          <dt>项目类型</dt>
          <dd>{doc.type}</dd>
        </div>
        <div className="audit-project-proposal__meta-row">
          <dt>申报院系</dt>
          <dd>{doc.college}</dd>
        </div>
        <div className="audit-project-proposal__meta-row">
          <dt>项目负责人</dt>
          <dd className="is-lead">
            <strong>{doc.lead}</strong>（{doc.leadMajor}）
          </dd>
        </div>
        <div className="audit-project-proposal__meta-row">
          <dt>指导教师</dt>
          <dd>{doc.advisor}</dd>
        </div>
        <div className="audit-project-proposal__meta-row">
          <dt>关联平台</dt>
          <dd>{doc.platform}</dd>
        </div>
        <div className="audit-project-proposal__meta-row">
          <dt>执行周期</dt>
          <dd>
            {doc.startDate} — {doc.endDate}
          </dd>
        </div>
        <div className="audit-project-proposal__meta-row">
          <dt>结项状态</dt>
          <dd className="is-success">{doc.status}</dd>
        </div>
      </dl>

      {doc.sections.map((section) => (
        <section key={section.heading} className="audit-project-proposal__section">
          <h4 className="audit-project-proposal__heading">{section.heading}</h4>
          {section.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className={`audit-project-proposal__text${section.alert ? " is-alert" : ""}`}
            >
              {highlightName(paragraph, leadName)}
            </p>
          ))}
        </section>
      ))}

      <section className="audit-project-proposal__section">
        <h4 className="audit-project-proposal__heading">{membersHeading}</h4>
        <div className="audit-project-proposal__table-wrap">
          <table className="audit-project-proposal__table">
            <thead>
              <tr>
                <th>姓名</th>
                <th>学号</th>
                <th>专业方向</th>
                <th>项目分工</th>
                {doc.showMemberProjectTime ? <th>项目时间</th> : null}
              </tr>
            </thead>
            <tbody>
              {doc.members.map((member) => (
                <tr key={member.name} className={member.highlight ? "is-lead" : undefined}>
                  <td>{member.highlight ? <strong>{member.name}</strong> : member.name}</td>
                  <td>
                    {member.studentId ? (
                      member.highlight ? (
                        <strong>{member.studentId}</strong>
                      ) : (
                        member.studentId
                      )
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{member.highlight ? <strong>{member.major}</strong> : member.major}</td>
                  <td>{member.highlight ? <strong>{member.role}</strong> : member.role}</td>
                  {doc.showMemberProjectTime ? (
                    <td>{member.projectTime ?? "—"}</td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {doc.systemNote ? (
        <section className="audit-project-proposal__section audit-project-proposal__section--border">
          <h4 className="audit-project-proposal__heading">系统备案信息</h4>
          <dl className="audit-project-proposal__system-note">
            <div className="audit-project-proposal__meta-row">
              <dt>{doc.systemNote.label}</dt>
              <dd className={doc.systemNote.anomaly ? "is-anomaly" : undefined}>
                {doc.systemNote.value}
              </dd>
            </div>
          </dl>
          <p className="audit-project-proposal__text is-muted">
            {highlightName(doc.systemNote.remark, leadName)}
          </p>
        </section>
      ) : null}
    </div>
  );
}
