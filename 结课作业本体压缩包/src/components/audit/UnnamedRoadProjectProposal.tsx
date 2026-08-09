import { ProjectProposalDocument } from "@/components/audit/ProjectProposalDocument";
import { UNNAMED_ROAD_LEAD, UNNAMED_ROAD_PROPOSAL } from "@/data/audit-unnamed-road-proposal";

export function UnnamedRoadProjectProposal() {
  return (
    <ProjectProposalDocument
      doc={UNNAMED_ROAD_PROPOSAL}
      highlightName={UNNAMED_ROAD_LEAD}
      clueId="project_lin_che"
    />
  );
}
