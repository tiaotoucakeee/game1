import type { MajorGroup } from "@/types/cuc-anima";

const asset = (path: string) => `/cuc-anima/${path}`;

export const majorGroups: MajorGroup[] = [
  {
    slug: "animation-comic",
    title: "动画漫画专业群",
    image: asset("images/621680763746_.jpg"),
    directions: [
      { label: "动画（三维）" },
      { label: "动画（二维）" },
      { label: "数字智能动画" },
      { label: "漫画" },
    ],
    intro:
      "动画漫画专业群面向叙事视觉与动态影像创作，整合漫画叙事、角色与场景设计、三维动画制作、特效合成与智能动画辅助等能力模块。低年级共同修读造型、叙事与数字制作基础，高年级围绕项目实践选择漫画连载、三维短片或动画艺术等路径，强调从分镜构思到成片输出的完整创作链条。",
    highlights: [
      "漫画叙事与分镜创作",
      "角色与场景设计",
      "三维动画与特效合成",
      "智能动画辅助创作",
    ],
  },
  {
    slug: "digital-media",
    title: "数字媒体专业群",
    image: asset("images/631680763750_.jpg"),
    directions: [
      { label: "数字媒体艺术（沉浸体验设计方向）" },
      { label: "数字媒体艺术（未来影像创作方向）" },
      { label: "智能工程与创意设计" },
    ],
    intro:
      "数字媒体专业群聚焦网络智能媒体、数字影像与未来交互体验，涵盖界面与体验设计、网络视频与影像叙事、沉浸式与新媒体装置等方向。课程强调媒介融合与跨平台表达，学生可在真实项目中组合视觉、交互与技术模块，探索数字内容在传播、展览与智能场景中的应用。",
    highlights: [
      "网络与智能媒体设计",
      "数字影像与网络视频",
      "新媒体艺术与沉浸体验",
      "跨媒介叙事与交互表达",
    ],
  },
  {
    slug: "game-esports",
    title: "游戏电竞专业群",
    image: asset("images/6561681435034_-1.jpg"),
    directions: [
      { label: "艺术与科技（数字娱乐方向）" },
      { label: "动画（游戏艺术方向）" },
      { label: "数字媒体技术（游戏设计技术方向）" },
    ],
    intro:
      "游戏电竞专业群围绕游戏艺术设计、交互娱乐与技术实现展开，覆盖概念美术、关卡与角色设计、游戏引擎应用、数字娱乐产品策划等核心能力。教学以项目驱动，鼓励美术、技术与策划方向协作，对接数字娱乐产业与电竞生态相关的创作与研发需求。",
    highlights: [
      "游戏概念与视觉设计",
      "交互娱乐产品策划",
      "游戏引擎与技术实现",
      "数字娱乐与电竞场景应用",
    ],
  },
];

export function getMajorGroupBySlug(slug: string): MajorGroup | undefined {
  return majorGroups.find((group) => group.slug === slug);
}

export const majorGroupSlugs = majorGroups.map((group) => group.slug);
