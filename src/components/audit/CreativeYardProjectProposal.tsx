import { ProjectProposalDocument } from "@/components/audit/ProjectProposalDocument";
import { CREATIVE_YARD_PROPOSAL } from "@/data/audit-creative-yard-proposal";
import { LIN_CHE } from "@/data/game";

export function CreativeYardProjectProposal() {
  return (
    <ProjectProposalDocument
      doc={CREATIVE_YARD_PROPOSAL}
      highlightName={LIN_CHE.name}
      clueId="cya_truth"
      subtitle="创作路径主项目立项书 · 内部归档版"
      membersHeading="四、核心成员"
    />
  );
}
