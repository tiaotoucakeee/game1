import { LIN_CHE } from "@/data/game";

export type LabApplicationStatus = "通过" | "驳回";

export type LabApplicationRecord = {
  id: string;
  date: string;
  applicant: string;
  studentId: string;
  lab: string;
  status: LabApplicationStatus;
  reason: string;
  highlight?: boolean;
};

const LIN_CHE_REJECT_REASONS = [
  "申请人专业不符（原漫画方向）",
  "缺少游戏设计技术方向学籍",
  "缺少动画艺术方向辅修证明",
  "申请人专业与实验室准入方向不匹配",
  "未满足跨实验室申请的学分前置条件",
  "缺少数字媒体艺术方向课程修读记录",
  "申请人所属培养方案不在实验室开放范围内",
  "需先完成本专业核心实验室实训，暂不受理跨方向申请",
  "缺少沉浸式交互相关方向学籍",
  "申请实验室与当前专业培养路径不一致",
  "跨专业申请需指导教师签字，材料不完整",
  "重复提交：此前同类申请已驳回，请先补修指定模块",
] as const;

const LIN_CHE_LABS = [
  "未来影像交互实验室",
  "游戏引擎与实时渲染实验室",
  "跨媒介创作联合实验室",
  "动态影像合成实验室",
  "沉浸式交互原型实验室",
  "虚拟制片实训实验室",
] as const;

const OTHER_APPROVED: Omit<LabApplicationRecord, "id" | "status">[] = [
  {
    date: "2030-02-20",
    applicant: "赵琳",
    studentId: "2031030822",
    lab: "沉浸式交互原型实验室",
    reason: "申请人专业符合",
  },
  {
    date: "2030-03-05",
    applicant: "王赫",
    studentId: "2032020318",
    lab: "动态影像合成实验室",
    reason: "申请人专业符合",
  },
  {
    date: "2030-03-28",
    applicant: "刘畅",
    studentId: "2033020613",
    lab: "游戏引擎与实时渲染实验室",
    reason: "申请人专业符合",
  },
  {
    date: "2030-04-15",
    applicant: "苏晓雯",
    studentId: "2034020101",
    lab: "未来影像交互实验室",
    reason: "申请人专业符合",
  },
  {
    date: "2030-05-10",
    applicant: "陈沐阳",
    studentId: "2034020104",
    lab: "跨媒介创作联合实验室",
    reason: "申请人专业符合",
  },
];

const LIN_CHE_DATES = [
  "2030-01-14",
  "2030-01-28",
  "2030-02-11",
  "2030-02-26",
  "2030-03-12",
  "2030-03-24",
  "2030-04-02",
  "2030-04-18",
  "2030-04-29",
  "2030-05-06",
  "2030-05-12",
  "2030-05-15",
] as const;

function buildLinCheRejections(): LabApplicationRecord[] {
  return LIN_CHE_DATES.map((date, index) => ({
    id: `lc-reject-${index + 1}`,
    date,
    applicant: LIN_CHE.name,
    studentId: LIN_CHE.studentId,
    lab: LIN_CHE_LABS[index % LIN_CHE_LABS.length],
    status: "驳回",
    reason: LIN_CHE_REJECT_REASONS[index],
    highlight: true,
  }));
}

function buildOtherApproved(): LabApplicationRecord[] {
  return OTHER_APPROVED.map((row, index) => ({
    id: `approved-${index + 1}`,
    ...row,
    status: "通过",
  }));
}

const CHENG_YE_APPROVAL: LabApplicationRecord = {
  id: "cy-pass-1",
  date: "2030-05-18",
  applicant: "程野",
  studentId: "2034020103",
  lab: "跨媒介创作联合实验室",
  status: "通过",
  reason: "申请人专业符合",
};

/** 按时间排序的实验室申请记录（林澈学号查询视图） */
export function getLabApplicationRecords(): LabApplicationRecord[] {
  return [...buildLinCheRejections(), ...buildOtherApproved(), CHENG_YE_APPROVAL].sort((a, b) =>
    a.date.localeCompare(b.date),
  );
}

export function getLabApplicationSummary(records: LabApplicationRecord[]) {
  const rejected = records.filter((row) => row.status === "驳回").length;
  const approved = records.filter((row) => row.status === "通过").length;
  return { total: records.length, rejected, approved };
}
