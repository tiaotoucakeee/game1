import { CHENG_YE } from "@/data/game";
import type { GraduationProjectStep } from "@/data/student-graduation-project";

export const CHENG_YE_GRADUATION_PROJECT = {
  systemId: "GD2034A2034020103CYA00007E87477B89E36886",
  title: "《未命名之路》跨媒介叙事实验",
  summary:
    "以漫画分镜为叙事起点，向动态影像与轻量交互延伸；依托 Creative Yard 创作路径机制完成跨模块立项与实训。",
  type: "毕业设计 · 跨媒介创作路径",
  college: CHENG_YE.profile.college,
  major: "漫画（跨媒介路径）",
  advisor: "韩率",
  enrollYear: "2030",
  graduateYear: "2034",
  submitCount: 1,
  currentStatus: "已通过 · 2034 届毕业联展金奖",
};

export const CHENG_YE_GRADUATION_PROJECT_STEPS: GraduationProjectStep[] = [
  {
    id: 1,
    label: "未提交",
    auditor: CHENG_YE.name,
    opinion: "新建跨媒介毕业创作选题",
    time: "2033-09-05 10:08",
    status: "done",
  },
  {
    id: 2,
    label: "选题申请中",
    auditor: CHENG_YE.name,
    opinion: "提交《未命名之路》选题申请",
    time: "2033-09-18 15:22",
    status: "done",
  },
  {
    id: 3,
    label: "指导教师审核",
    auditor: "韩率",
    opinion: "同意，建议走 Creative Yard 跨模块立项",
    time: "2033-09-20 09:40",
    status: "done",
  },
  {
    id: 4,
    label: "创作路径计划登记",
    auditor: "学院审核组",
    opinion: "同意 · 关联 CYA-P-2030-01",
    time: "2033-09-25 14:16",
    status: "done",
  },
  {
    id: 5,
    label: "跨专业资源调度审核",
    auditor: "Creative Yard",
    opinion: "路径账号 CYA-0000 已开通",
    time: "2033-10-02 11:30",
    status: "done",
  },
  {
    id: 6,
    label: "开题报告审核",
    auditor: "韩率",
    opinion: "同意",
    time: "2033-12-08 16:45",
    status: "done",
  },
  {
    id: 7,
    label: "中期检查",
    auditor: "学院专家组",
    opinion: "跨媒介链路验证通过",
    time: "2034-03-12 10:20",
    status: "done",
  },
  {
    id: 8,
    label: "后期成果提交",
    auditor: CHENG_YE.name,
    opinion: "提交结项材料与 Ani AI 辅助日志",
    time: "2034-05-10 18:06",
    status: "done",
  },
  {
    id: 9,
    label: "毕业设计答辩",
    auditor: "答辩委员会",
    opinion: "通过 · 推荐学院联展",
    time: "2034-05-28 14:00",
    status: "done",
  },
  {
    id: 10,
    label: "结项归档",
    auditor: "学院教学秘书",
    opinion: "归档完成 · 联展金奖",
    time: "2034-06-15 09:18",
    status: "done",
  },
  {
    id: 11,
    label: "关联成果《山海行灯》",
    auditor: "系统自动关联",
    opinion: "CYA-P-2034-02 已挂载",
    time: "2034-06-16 11:02",
    status: "done",
  },
];

export const CHENG_YE_GRADUATION_PROJECT_SIDEBAR = [
  { id: "progress", label: "进度信息" },
  { id: "basic", label: "基本信息" },
  { id: "detail", label: "详细信息" },
  { id: "attachment", label: "附件信息" },
  { id: "history", label: "历史记录" },
] as const;

export type ChengYeGraduationProjectTabId =
  (typeof CHENG_YE_GRADUATION_PROJECT_SIDEBAR)[number]["id"];
