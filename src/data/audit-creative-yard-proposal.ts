import { LIN_CHE } from "@/data/game";
import {
  CREATIVE_YARD_PROJECT_CODE,
  type AuditProjectProposalDoc,
  type ProjectProposalMember,
} from "@/data/audit-project-proposal-types";

export const CREATIVE_YARD_PROPOSAL = {
  code: CREATIVE_YARD_PROJECT_CODE,
  title: "Creative Yard 创作路径计划立项书",
  type: "跨专业创作路径机制 · 院内试点项目",
  college: "动画与数字艺术学院",
  lead: LIN_CHE.name,
  leadMajor: LIN_CHE.major,
  advisor: "韩率",
  platform: "Ani AI 智能创作平台 · CYA 旧创作资源系统",
  startDate: "2030-05",
  endDate: "2034-06",
  status: "持续运行 · 关联账号 CYA-0000",
  sections: [
    {
      heading: "一、项目背景",
      paragraphs: [
        "2030 年，漫画专业并入动画类培养体系。漫画方向学生林澈希望借助 Ani AI 将漫画分镜发展为跨媒介叙事，但无法跨专业调用课程与实验室资源，多次实验室申请被系统驳回。",
        "经指导教师韩率建议，学院内部建立 Creative Yard 创作路径机制：通过独立账号统筹跨专业资源调度，使创作团队在不改变真实学籍归属的前提下完成跨模块立项与实训。",
      ],
    },
    {
      heading: "二、机制说明",
      paragraphs: [
        "本项目不以单一结项作品为目标，而是为后续跨媒介创作提供持续运行的路径账号与资源通道。Ani AI 负责方案推演、课程匹配与技术辅助，重要创作选择由学生团队作出。",
        "账号编号 CYA-0000，对外代称「程野」（Creative Yard Agent）。该账号不属于任何真实学生，仅用于院内跨专业创作备案与实验室权限共享。",
      ],
    },
    {
      heading: "三、参与说明",
      paragraphs: [
        "林澈、韩率（指导）及十余名来自漫画、动画、数媒、游戏、交互方向的学生陆续加入。2031—2033 年间，团队先后完成《边界》《下一帧》等阶段性原型，并为 2034 年《未命名之路》《山海行灯》等结项成果提供路径支撑。",
      ],
    },
  ],
  showMemberProjectTime: true,
  members: [
    {
      name: LIN_CHE.name,
      studentId: LIN_CHE.studentId,
      major: LIN_CHE.major,
      role: "路径发起人 · 项目负责人",
      projectTime: "2030-05 — 2034-06",
      highlight: true,
    },
    {
      name: "韩率",
      major: "指导教师",
      role: "机制建立与跨专业协调",
      projectTime: "2030-05 — 2034-06",
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
      name: "程野",
      major: "创作路径账号",
      role: "CYA-0000 · 资源调度代称",
      projectTime: "2030-05 — 持续",
    },
  ] satisfies ProjectProposalMember[],
  systemNote: {
    label: "关联账号",
    value: "CYA-0000 · 程野",
    anomaly: true,
    remark:
      "备注：CYA-0000 为创作路径账号，非真实学号。查询时请使用项目编码 CYA-P-2030-01；账号编号仅用于 CYA 旧系统登录。",
  },
} satisfies AuditProjectProposalDoc;
