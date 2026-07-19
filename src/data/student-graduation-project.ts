import { PLAYER, PLAYER_PROFILE } from "@/data/game";

export type GraduationProjectStepStatus = "done" | "rejected" | "pending";

export type GraduationProjectStep = {
  id: number;
  label: string;
  auditor: string;
  opinion: string;
  time: string;
  status: GraduationProjectStepStatus;
};

export const GRADUATION_PROJECT = {
  systemId: "GD2036A5080830387E87477B89E36886F6BD8F2A",
  title: "未命名 · 跨媒介叙事实验",
  summary: "涉及动画、游戏、交互与未来影像，无法归入单一专业方向。",
  type: "毕业设计选题",
  college: PLAYER_PROFILE.college,
  major: PLAYER_PROFILE.major,
  advisor: "杨宜珈",
  enrollYear: PLAYER_PROFILE.enrollYear,
  graduateYear: PLAYER_PROFILE.graduateYear,
  submitCount: 3,
  currentStatus: "选题审核退回（第 3 次）",
};

export const GRADUATION_PROJECT_STEPS: GraduationProjectStep[] = [
  {
    id: 1,
    label: "未提交",
    auditor: PLAYER.name,
    opinion: "新建毕业设计选题",
    time: "2036-03-01 09:12",
    status: "done",
  },
  {
    id: 2,
    label: "选题申请中",
    auditor: PLAYER.name,
    opinion: "提交选题申请",
    time: "2036-03-08 14:35",
    status: "done",
  },
  {
    id: 3,
    label: "指导教师审核",
    auditor: "杨宜珈",
    opinion: "同意",
    time: "2036-03-10 10:20",
    status: "done",
  },
  {
    id: 4,
    label: "系部专业负责人审核",
    auditor: "刘畅",
    opinion: "同意",
    time: "2036-03-12 16:08",
    status: "done",
  },
  {
    id: 5,
    label: "学院教学秘书初审",
    auditor: "王萌",
    opinion: "同意，提交学院选题审核",
    time: "2036-03-14 11:42",
    status: "done",
  },
  {
    id: 6,
    label: "学院毕设选题审核",
    auditor: "学院审核组",
    opinion: "退回：选题范围过宽，建议缩小",
    time: "2036-03-15 15:06",
    status: "rejected",
  },
  {
    id: 7,
    label: "选题修改重提",
    auditor: PLAYER.name,
    opinion: "修改后重新提交",
    time: "2036-03-28 13:18",
    status: "done",
  },
  {
    id: 8,
    label: "学院毕设选题审核",
    auditor: "学院审核组",
    opinion: "退回：请补充单一媒介的完成度证明",
    time: "2036-04-08 09:54",
    status: "rejected",
  },
  {
    id: 9,
    label: "选题修改重提",
    auditor: PLAYER.name,
    opinion: "修改后重新提交",
    time: "2036-04-18 17:22",
    status: "done",
  },
  {
    id: 10,
    label: "学院毕设选题审核",
    auditor: "学院审核组",
    opinion: "退回：项目跨度过大，请明确所属专业方向后重新提交选题",
    time: "2036-05-20 10:31",
    status: "rejected",
  },
  {
    id: 11,
    label: "待重新提交",
    auditor: "",
    opinion: "",
    time: "",
    status: "pending",
  },
  {
    id: 12,
    label: "开题报告审核",
    auditor: "",
    opinion: "",
    time: "",
    status: "pending",
  },
  {
    id: 13,
    label: "中期检查",
    auditor: "",
    opinion: "",
    time: "",
    status: "pending",
  },
  {
    id: 14,
    label: "后期成果提交",
    auditor: "",
    opinion: "",
    time: "",
    status: "pending",
  },
  {
    id: 15,
    label: "答辩资格申请",
    auditor: "",
    opinion: "",
    time: "",
    status: "pending",
  },
  {
    id: 16,
    label: "毕业设计答辩",
    auditor: "",
    opinion: "",
    time: "",
    status: "pending",
  },
];

export const GRADUATION_PROJECT_SIDEBAR = [
  { id: "progress", label: "进度信息" },
  { id: "basic", label: "基本信息" },
  { id: "detail", label: "详细信息" },
  { id: "attachment", label: "附件信息" },
  { id: "history", label: "历史记录" },
] as const;

export type GraduationProjectTabId = (typeof GRADUATION_PROJECT_SIDEBAR)[number]["id"];
