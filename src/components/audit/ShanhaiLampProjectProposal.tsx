import { ProjectProposalDocument } from "@/components/audit/ProjectProposalDocument";
import { AuditLink } from "@/components/audit/auditWorkbenchStyles";
import { SHANHAI_LAMP_PROPOSAL } from "@/data/audit-shanhai-lamp-proposal";
import { LIN_CHE } from "@/data/game";

export function ShanhaiLampProjectProposal() {
  return (
    <>
      <ProjectProposalDocument
        doc={SHANHAI_LAMP_PROPOSAL}
        highlightName={LIN_CHE.name}
        clueId="ai_ani_platform"
        subtitle="毕业设计立项书 · 内部归档版"
        membersHeading="六、创作成员"
      />
      <section className="audit-project-proposal audit-project-proposal__related">
        <h4 className="audit-project-proposal__heading">七、相关附件</h4>
        <p className="audit-project-proposal__text">
          归档材料含林澈跨媒介创作申请表节选，以及韩老师关于创作路径账号的内部聊天记录。
        </p>
        <AuditLink href="/audit/attachments">查看内部附件 →</AuditLink>
      </section>
    </>
  );
}
