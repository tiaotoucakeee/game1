import { LIN_CHE } from "@/data/game";
import type { ProjectProposalMember } from "@/data/audit-project-proposal-types";

export type ChengYeTeamTabId = "members" | "collab" | "archive";

export const CHENG_YE_TEAM_SIDEBAR: Array<{
  id: ChengYeTeamTabId;
  label: string;
  enabled: boolean;
}> = [
  { id: "members", label: "成员名单", enabled: true },
  { id: "collab", label: "协作记录", enabled: false },
  { id: "archive", label: "路径备案", enabled: false },
];

/** 程野 · CYA 团队名单（较立项书略增成员，结构一致） */
export const CHENG_YE_TEAM_META = {
  projectCode: "CYA-P-2030-01",
  projectTitle: "Creative Yard 创作路径计划",
  account: "CYA-0000",
  period: "2030-05 — 2034-06",
  status: "持续运行 · 跨模块资源调度中",
};

export const CHENG_YE_TEAM_MEMBERS: ProjectProposalMember[] = [
  {
    name: "韩率",
    major: "指导教师",
    role: "机制建立 · 跨专业协调 · 创作指导",
    projectTime: "2030-05 — 2034-06",
  },
  {
    name: LIN_CHE.name,
    studentId: LIN_CHE.studentId,
    major: LIN_CHE.major,
    role: "路径发起人 · 项目负责人",
    projectTime: "2030-05 — 2034-06",
    highlight: true,
  },
  {
    name: "赵琳",
    studentId: "2031030822",
    major: "数字媒体艺术",
    role: "沉浸交互与界面设计",
    projectTime: "2031-03 — 2034-06",
  },
  {
    name: "王赫",
    studentId: "2032020318",
    major: "动画",
    role: "动态预演与影像合成",
    projectTime: "2031-03 — 2034-06",
  },
  {
    name: "刘畅",
    studentId: "2033020613",
    major: "游戏设计技术",
    role: "交互机制实现",
    projectTime: "2031-03 — 2034-06",
  },
  {
    name: "陈雨桐",
    studentId: "2033010412",
    major: "漫画",
    role: "辅助分镜与线稿整理",
    projectTime: "2031-09 — 2034-06",
  },
  {
    name: "方琪",
    studentId: "2032020529",
    major: "动画",
    role: "原画与中间帧制作",
    projectTime: "2032-03 — 2034-06",
  },
  {
    name: "孙晓舟",
    studentId: "2033020727",
    major: "游戏设计技术",
    role: "技术美术与引擎搭建",
    projectTime: "2033-09 — 2034-06",
  },
  {
    name: "周予安",
    studentId: "2031030516",
    major: "数字媒体艺术",
    role: "色彩管理与画质控制",
    projectTime: "2033-09 — 2034-06",
  },
  {
    name: "唐宁",
    studentId: "2031030733",
    major: "数字媒体艺术",
    role: "装置搭建与展陈执行",
    projectTime: "2033-09 — 2034-06",
  },
  {
    name: "何清",
    studentId: "2034010924",
    major: "新媒体艺术",
    role: "声音设计与氛围营造",
    projectTime: "2033-09 — 2034-06",
  },
  {
    name: "苏铭",
    studentId: "2032031145",
    major: "动画（游戏艺术）",
    role: "角色与场景美术",
    projectTime: "2033-09 — 2034-06",
  },
  {
    name: "马逸凡",
    studentId: "2034010817",
    major: "交互艺术",
    role: "用户体验测试与分支验证",
    projectTime: "2033-09 — 2034-06",
  },
  {
    name: "程野",
    major: "创作路径账号",
    role: "CYA-0000 · 资源调度代称",
    projectTime: "2030-05 — 持续",
  },
];
