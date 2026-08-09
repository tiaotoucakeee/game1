import { CREATIVE_YARD_PROPOSAL } from "@/data/audit-creative-yard-proposal";
import { SHANHAI_LAMP_PROPOSAL } from "@/data/audit-shanhai-lamp-proposal";
import { UNNAMED_ROAD_PROPOSAL } from "@/data/audit-unnamed-road-proposal";
import {
  queryProjectArchive,
  resolveProjectCode,
  type ProjectArchiveQueryResult,
} from "@/data/game";

export type ProjectQueryMeta = {
  code: string;
  title: string;
  shortLabel: string;
};

const PROJECT_QUERY_META: Record<
  Extract<ProjectArchiveQueryResult, "creative_yard" | "unnamed_road" | "shanhai_lamp">,
  Omit<ProjectQueryMeta, "code">
> = {
  creative_yard: {
    title: CREATIVE_YARD_PROPOSAL.title,
    shortLabel: "CYA 主项目",
  },
  unnamed_road: {
    title: UNNAMED_ROAD_PROPOSAL.title,
    shortLabel: "未命名之路",
  },
  shanhai_lamp: {
    title: SHANHAI_LAMP_PROPOSAL.title,
    shortLabel: "山海行灯",
  },
};

export function getProjectQueryMeta(code: string): ProjectQueryMeta | null {
  const resolved = resolveProjectCode(code);
  const kind = queryProjectArchive(resolved);
  if (kind === "not_found" || kind === "sealed") return null;
  const meta = PROJECT_QUERY_META[kind];
  return meta ? { code: resolved, ...meta } : null;
}

export function isQueryableProjectCode(code: string): boolean {
  const kind = queryProjectArchive(code);
  return kind === "creative_yard" || kind === "unnamed_road" || kind === "shanhai_lamp";
}
