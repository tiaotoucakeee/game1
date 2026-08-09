import raw from "@/data/cuc-anima-fields.json";
import type { FieldWork } from "@/types/cuc-anima";

export const fieldCategoryMap = raw.categoryMap as Record<string, string>;
export const fieldWorks = raw.items as FieldWork[];

export const fieldAudienceFilters = [
  { value: "student-work", label: fieldCategoryMap["student-work"] },
  { value: "teacher-work", label: fieldCategoryMap["teacher-work"] },
];

export const fieldTypeFilters = [
  "pc-game",
  "vr-series",
  "vr-short",
  "interactive-device",
  "anima-series",
  "anima-film",
  "anima-short",
  "realistic-series",
  "realistic-film",
  "realistic-short",
  "mobile-app",
  "manga",
  "documentary",
].map((value) => ({ value, label: fieldCategoryMap[value] }));

export function fieldImage(path: string) {
  const filename = path.replace(/^images\//, "");
  return `/cuc-anima/images/fields/${filename}`;
}
