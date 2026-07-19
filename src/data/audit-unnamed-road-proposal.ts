import { LIN_CHE } from "@/data/game";
import type {
  AuditProjectProposalDoc,
  ProjectProposalMember,
} from "@/data/audit-project-proposal-types";

export type { ProjectProposalMember };

export const UNNAMED_ROAD_LEAD = LIN_CHE.name;

export const UNNAMED_ROAD_PROPOSAL = {
  code: "CYA-P-2034-01",
  title: "《未命名之路》跨媒介叙事实验",
  type: "跨专业融合创作专项实训营 · 结项项目",
  college: "动画与数字艺术学院",
  lead: LIN_CHE.name,
  leadMajor: LIN_CHE.major,
  advisor: "韩率",
  platform: "Ani AI 智能创作平台",
  startDate: "2033-09",
  endDate: "2034-06",
  status: "已结项 · 学院年度创新成果奖（最高评）",
  sections: [
    {
      heading: "一、立项背景",
      paragraphs: [
        "2033 学年起，学院全面落地 2034 版数智化创意人才培养方案，设立「跨专业融合创作专项实训营」。学生可围绕国风叙事、虚拟影像、沉浸式交互等主题自由组队，以项目制方式完成从创意立项到结项展示的全流程创作。",
        "漫画方向学生林澈提出以原创漫画分镜为起点、向动态影像与轻量交互延伸的跨媒介叙事构想。由于涉及动画实验室动态预演、数媒交互模块与游戏技术实现，项目需跨多个专业模块调用课程与设备资源，遂通过学院 Creative Yard 创作路径机制完成跨模块立项登记。",
      ],
    },
    {
      heading: "二、项目目标",
      paragraphs: [
        "以「尚未命名的旅途」为核心隐喻，探索专业改革背景下创作者面对媒介选择时的犹豫与可能，完成一条「漫画分镜—动态影像—轻量互动分支」的完整体验链。",
        "验证 Ani AI 在创意原型推演、分镜动态化预演、交互分支逻辑验证与跨模块资源匹配中的辅助效能，同时确保叙事架构、视觉风格与交互逻辑由学生团队独立设计与把控。",
      ],
    },
    {
      heading: "三、创作方案",
      paragraphs: [
        "作品采用国风叙事主题。读者在关键节点可选择不同路径，体验同一故事在漫画、动画与交互三种形态下的差异化表达。视觉层面保留手绘漫画线条质感，引入实时影像合成与网页交互，形成层次分明的跨媒介阅读节奏。",
        "叙事结构上设置三条主分支与若干隐藏节点，分支差异不仅体现在画面风格，也体现在信息揭示顺序与情绪节奏上，以强化「未命名」主题下路径选择的意义。",
      ],
    },
    {
      heading: "四、技术路线与实施计划",
      paragraphs: [
        "第一阶段（2033-09—2033-12）：完成世界观设定、角色与场景美术、核心分镜脚本；使用 Ani AI 进行分镜动态化预演与节奏测试。",
        "第二阶段（2034-01—2034-03）：完成动态影像合成、交互原型搭建与分支逻辑联调；游戏方向成员负责交互机制与引擎实现，数媒方向负责界面与沉浸体验设计。",
        "第三阶段（2034-04—2034-06）：整合视听氛围、性能优化与结项展示；提交完整体验链与创作文档，参加学院年度创新成果奖评选。",
      ],
    },
    {
      heading: "五、预期成果",
      paragraphs: [
        "完整可体验的跨媒介叙事作品一套（含漫画分镜源文件、动态预演成片、可运行交互分支 Demo）。",
        "结项创作报告一份，附 Ani AI 辅助创作日志摘要与跨专业协作记录。",
        "参与学院公开展示与年度创新成果奖评审。",
      ],
    },
    {
      heading: "六、评审结论",
      paragraphs: [
        "经跨专业评审组审议，本项目在叙事完整性、媒介融合度与技术实现方面表现突出，获本学年「学院年度创新成果奖」最高评，列为 2034 年度跨专业融合创作专项实训营代表性结项成果。",
      ],
      alert: true,
    },
  ],
  members: [
    {
      name: LIN_CHE.name,
      studentId: LIN_CHE.studentId,
      major: LIN_CHE.major,
      role: "项目负责人 · 分镜与叙事",
      highlight: true,
    },
    { name: "赵琳", studentId: "2031030822", major: "数字媒体艺术", role: "沉浸交互与界面设计" },
    { name: "王赫", studentId: "2032020318", major: "动画", role: "动态预演与影像合成" },
    { name: "刘畅", studentId: "2033020613", major: "游戏设计技术", role: "交互机制实现" },
    { name: "孙晓舟", studentId: "2033020727", major: "游戏设计技术", role: "技术美术与引擎搭建" },
    { name: "周予安", studentId: "2031030516", major: "数字媒体艺术", role: "色彩管理与画质控制" },
    { name: "何清", studentId: "2034010924", major: "新媒体艺术", role: "声音设计与氛围营造" },
    { name: "苏铭", studentId: "2032031145", major: "动画（游戏艺术）", role: "角色与场景美术" },
    { name: "韩率", major: "指导教师", role: "跨专业创作指导" },
  ] satisfies ProjectProposalMember[],
  systemNote: {
    label: "系统关联学籍",
    value: "2034020103 · 程野",
    anomaly: true,
    remark: "备注：该关联项指向 Creative Yard 创作路径账号，非真实学籍记录；申报主体以项目负责人林澈及团队成员为准。",
  },
} satisfies AuditProjectProposalDoc;
