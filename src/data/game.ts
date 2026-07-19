import type { ClueId, VerificationLine } from "@/types/game";
import {
  CREATIVE_YARD_ACCOUNT_CODE,
  CREATIVE_YARD_PROJECT_CODE,
  SHANHAI_LAMP_PROJECT_CODE,
} from "@/data/audit-project-proposal-types";

export const PLAYER = {
  name: "祁玉",
  studentId: "203508083038",
  email: "qiyu_3608@cuc.edu.cn",
  emailPassword: "CucMail@2035",
  studentPassword: "Project2024!",
};

export const PLAYER_PROFILE = {
  name: PLAYER.name,
  gender: "女",
  birthDate: "2017-09-06",
  nationality: "中国",
  politicalStatus: "共青团员",
  ethnicity: "汉族",
  studentId: PLAYER.studentId,
  idCard: "110108201709061337",
  health: "良好",
  hukou: "北京市 海淀区",
  college: "动画与数字艺术学院",
  studentType: "本科生",
  major: "数字媒体艺术",
  enrollYear: "2035",
  graduateYear: "2039",
  mobile: "13810362847",
  email: PLAYER.email,
  wechat: "qiyu_dmx",
  address: "北京市海淀区定福庄东街1号 中国传媒大学",
  emergencyContact: "祁明",
  emergencyPhone: "13901234567",
  emergencyRelation: "父亲",
  homePhone: "010-65783608",
  counselor: "杨宜珈",
  counselorPhone: "13911601213",
  gpa: "3.92",
  fullTime: "是",
  failedCourses: "否",
};

export const AUDIT_CREDS = {
  username: "DMXY2036QD",
  password: "CMU@DH2036",
};

export const CYA_CREDS = {
  username: "CYA-0000",
  /** 旧 CYA 终端密码（叙事线索）；学生个人系统请用 Project2024! */
  password: "CreativeYard2030",
};

export const OPEN_PATH_CODE = "PATH-2034-LC";

export const CLUE_LABELS: Record<ClueId, string> = {
  identity_no_enrollment: "程野无任何真实学籍记录",
  identity_cya_code: "内部编号 CYA-0000 并非学生账号",
  project_award_anomaly: "获奖新闻中姓名与照片出现异常",
  project_lin_che: "真实创作者为林澈及跨专业团队",
  ai_ani_platform: "Ani AI 负责原型测试与资源匹配",
  ai_cross_media: "林澈与韩老师的跨媒介聊天记录",
  ai_creative_path: "「创作路径账号」关键词",
  cya_truth: "程野是误识别的创作路径账号",
  personal_rejected: "个人毕业项目多次退回",
  open_path_code: "需向 Ani AI 询问项目招募码",
};

export function getBonusClueLabel(clueId: ClueId, collected: boolean): string {
  if (clueId === "open_path_code") {
    return collected
      ? "Ani AI 已提供开放创作路径招募信息"
      : "需向 Ani AI 询问项目招募码";
  }
  return CLUE_LABELS[clueId];
}

export const CLUE_TO_LINE: Partial<Record<ClueId, VerificationLine>> = {
  identity_no_enrollment: "identity",
  identity_cya_code: "identity",
  project_award_anomaly: "project",
  project_lin_che: "project",
  ai_ani_platform: "ai",
  ai_cross_media: "ai",
  ai_creative_path: "ai",
  cya_truth: "account",
};

export const CORE_CLUES: ClueId[] = [
  "identity_no_enrollment",
  "identity_cya_code",
  "project_award_anomaly",
  "project_lin_che",
  "ai_ani_platform",
  "ai_cross_media",
  "ai_creative_path",
  "cya_truth",
];

export const LIN_CHE = {
  name: "林澈",
  studentId: "2030120401",
  major: "漫画",
  profile: {
    gender: "男",
    birthDate: "2008-04-16",
    nationality: "中国",
    politicalStatus: "共青团员",
    ethnicity: "汉族",
    idNumber: "110108200804161018",
    health: "良好",
    college: "动画与数字艺术学院",
    studentType: "本科生",
    enrollmentYear: "2030",
    graduationYear: "2034",
    phone: "13811024603",
    email: "linche2030@cuc.edu.cn",
    wechat: "linche_dmx",
    address: "北京市朝阳区定福庄东街1号 中国传媒大学",
    emergencyName: "林建民",
    emergencyPhone: "13901287654",
    emergencyRelation: "父亲",
    homePhone: "010-65784216",
    counselor: "韩率",
    counselorPhone: "13911601807",
    gpa: "3.72",
    rank: "5 / 42",
    majorSize: "42",
    fullTime: "是",
    failedCourses: "否",
    scholarship: "否",
    disciplinary: "否",
    className: "2030级漫画1班",
  },
  projects: [
    {
      name: "《未命名之路》跨媒介叙事实验",
      award: "学院年度创新成果奖",
      id: "CYA-P-2034-01",
      role: "项目负责人",
    },
    {
      name: "《山海行灯：跨媒介融合毕业创作》",
      award: "2034届学院毕业联展金奖",
      id: SHANHAI_LAMP_PROJECT_CODE,
      role: "毕业设计 · 独立创作",
    },
  ],
} as const;

export const CHENG_YE = {
  name: "程野",
  studentId: "2034020103",
  internalId: "CYA-0000",
  /** @deprecated 所读专业由 UI 层闪烁展示，勿直接引用 */
  listMajor: "数字媒体艺术",
  major: "█████（数据异常）",
  flickerMajors: ["漫画", "数字媒体艺术", "动画", "游戏艺术", "智能工程与创意设计"] as const,
  profile: {
    gender: "男",
    birthDate: "20█6-█3-1█",
    nationality: "中国",
    politicalStatus: "共█团█员",
    ethnicity: "汉族",
    idNumber: "11010520██████003X",
    health: "良█",
    college: "动画与数字艺术学院",
    studentType: "本科生",
    enrollmentYear: "20█0",
    graduationYear: "2034",
    phone: "1██****9023",
    email: "cya-0000@internal.cuc",
    wechat: "cy█_█0█0",
    address: "北京市█阳区█苑南█路█号",
    emergencyName: "程█",
    emergencyPhone: "1██****8821",
    emergencyRelation: "父█",
    homePhone: "010-█8█6█2█",
    counselor: "韩█",
    counselorPhone: "1██****6610",
    gpa: "4.12",
    rank: "█ / 37",
    majorSize: "3█",
    fullTime: "是",
    failedCourses: "否",
    scholarship: "否",
    disciplinary: "否",
  },
  projects: [
    { name: "《未命名之路》跨媒介叙事实验", award: "学院年度创新成果奖", id: "CYA-P-2034-01" },
    {
      name: "沉浸体验原型《边界》",
      award: "未来影像方向优秀作品",
      id: "CYA-P-2033-07",
      redactId: true,
    },
    {
      name: "游戏艺术概念《下一帧》",
      award: "游戏设计技术展评入围",
      id: "CYA-P-2032-12",
      redactId: true,
    },
  ] as const,
};

/** 程野 · CYA 路径账号在学生个人系统的登录凭据（学院统一初始密码） */
export const CHENG_YE_STUDENT_CREDS = {
  studentId: CHENG_YE.studentId,
  accountId: CHENG_YE.internalId,
  password: PLAYER.studentPassword,
} as const;

export type GraduateRecord = {
  seq: number;
  name: string;
  studentId: string;
  major: string;
  bio: string;
  anomaly?: boolean;
};

export const GRADUATES: GraduateRecord[] = [
  {
    seq: 1,
    name: "苏晓雯",
    studentId: "2034020101",
    major: "数字媒体艺术",
    bio: "主攻动态视觉设计，在校完成多套数字影像短片，擅长视觉氛围包装与镜头语言设计。",
  },
  {
    seq: 2,
    name: "刘子昂",
    studentId: "2034020102",
    major: "动画艺术",
    bio: "专注二维原创动画短片创作，人物原画功底扎实，擅长角色动态表演与分镜叙事。",
  },
  {
    seq: 3,
    name: "陈沐阳",
    studentId: "2034020104",
    major: "游戏艺术设计",
    bio: "专注游戏场景美术与概念设计，擅长国风场景搭建、氛围渲染与原画设定。",
  },
  {
    seq: 4,
    name: "周思瑶",
    studentId: "2034020105",
    major: "漫画创作",
    bio: "擅长原创短篇漫画叙事，人物塑造细腻，长期进行连续IP世界观创作与手绘原稿创作。",
  },
  {
    seq: 5,
    name: "赵景珩",
    studentId: "2034020106",
    major: "艺术与科技",
    bio: "主攻交互装置与空间艺术，擅长将艺术美学与程序交互结合，完成多项展厅交互作品。",
  },
  {
    seq: 6,
    name: "许嘉宁",
    studentId: "2034020107",
    major: "三维动画",
    bio: "擅长三维建模、角色绑定与动态渲染，独立完成多部三维动画短片与虚拟道具作品。",
  },
  {
    seq: 7,
    name: "江亦辰",
    studentId: "2034020108",
    major: "虚拟影像制作",
    bio: "精通虚拟拍摄、实时渲染，擅长虚拟场景影像制作与特效合成。",
  },
  {
    seq: 8,
    name: "沈书涵",
    studentId: "2034020109",
    major: "数字媒体艺术",
    bio: "主攻数字文博活化设计，擅长传统文化视觉转化与数字化创新呈现。",
  },
  {
    seq: 9,
    name: "顾星辞",
    studentId: "2034020110",
    major: "游戏策划",
    bio: "擅长游戏叙事设计、关卡逻辑搭建，专注轻量互动叙事游戏内容创作。",
  },
  {
    seq: 10,
    name: "林浩宇",
    studentId: "2034020111",
    major: "动画艺术",
    bio: "国风动画方向，擅长国风人物绘制、传统纹样视觉化与动态短片制作。",
  },
  {
    seq: 11,
    name: "温知夏",
    studentId: "2034020112",
    major: "沉浸式媒体设计",
    bio: "擅长沉浸式空间视觉设计、光影氛围调控，参与多项展厅沉浸式项目制作。",
  },
  {
    seq: 12,
    name: "秦屿",
    studentId: "2034020113",
    major: "影视动画编导",
    bio: "擅长短片剧本创作、镜头调度与成片剪辑，具备完整影像创作能力。",
  },
  {
    seq: 13,
    name: "孟晚晴",
    studentId: "2034020114",
    major: "数字交互设计",
    bio: "专注人机交互逻辑设计、界面视觉优化，擅长轻量化交互作品落地制作。",
  },
  {
    seq: 14,
    name: "方泽宇",
    studentId: "2034020115",
    major: "游戏美术设计",
    bio: "擅长游戏贴图制作、场景优化与风格化美术呈现，多项作品入选校级优秀作品展。",
  },
  {
    seq: 15,
    name: "程野",
    studentId: "2034020103",
    major: "数字媒体艺术",
    bio: "擅长跨媒介融合创作，主攻沉浸式交互设计、虚拟空间叙事，代表作品《云境遥途》，熟练运用智能创作工具辅助艺术创作。",
    anomaly: true,
  },
];

export type StudentArchiveQueryResult = "cheng_ye" | "lin_che" | "sealed" | "not_found";

/** 学生档案查询：程野、林澈可打开完整档案；其余优秀毕业生学号已封装 */
export function queryStudentArchive(studentId: string): StudentArchiveQueryResult {
  const trimmed = studentId.trim();
  if (!trimmed) return "not_found";
  if (trimmed === LIN_CHE.studentId) return "lin_che";

  const graduate = GRADUATES.find((g) => g.studentId === trimmed);
  if (!graduate) return "not_found";
  if (graduate.anomaly) return "cheng_ye";
  return "sealed";
}

export type ProjectArchiveQueryResult =
  | "creative_yard"
  | "unnamed_road"
  | "shanhai_lamp"
  | "sealed"
  | "not_found";

const SEALED_PROJECT_CODES = new Set(["CYA-P-2033-07", "CYA-P-2032-12"]);

export function resolveProjectCode(projectCode: string): string {
  const normalized = projectCode.trim().toUpperCase();
  if (normalized === CREATIVE_YARD_ACCOUNT_CODE) return CREATIVE_YARD_PROJECT_CODE;
  return normalized;
}

/** 学生项目查询：按项目编码返回对应立项档案；已封装项目不可查 */
export function queryProjectArchive(projectCode: string): ProjectArchiveQueryResult {
  const normalized = resolveProjectCode(projectCode);
  if (!normalized) return "not_found";
  if (normalized === CREATIVE_YARD_PROJECT_CODE) return "creative_yard";
  if (normalized === "CYA-P-2034-01") return "unnamed_road";
  if (normalized === SHANHAI_LAMP_PROJECT_CODE) return "shanhai_lamp";
  if (SEALED_PROJECT_CODES.has(normalized)) return "sealed";
  return "not_found";
}

export type LabArchiveQueryResult = "lin_che" | "sealed" | "not_found";

/** 实验室申请记录查询：仅林澈学号可查看，程野及其他毕业生学号不可查 */
export function queryLabArchive(studentId: string): LabArchiveQueryResult {
  const trimmed = studentId.trim();
  if (!trimmed) return "not_found";
  if (trimmed === LIN_CHE.studentId) return "lin_che";
  if (GRADUATES.some((g) => g.studentId === trimmed)) return "sealed";
  return "not_found";
}

export const NEWS_ARTICLES: {
  slug: string;
  title: string;
  date: string;
  keyword: string;
  winners: string[];
  glitchName?: string;
  excerpt: string;
  hiddenFromFeed?: boolean;
}[] = [
  {
    slug: "innovation-award-2034",
    title: "学院年度创新成果奖公布：跨媒介项目《未命名之路》获最高评",
    date: "2030-06-12",
    keyword: "学院年度创新成果奖",
    winners: ["程野", "林澈", "团队"],
    glitchName: "程野",
    excerpt:
      "跨媒介项目《未命名之路》融合漫画分镜、动态影像与交互机制，获本学年学院年度创新成果奖最高评。",
  },
  {
    slug: "future-media-2033",
    title: "未来影像方向优秀作品展评结果发布",
    date: "2030-10-08",
    keyword: "未来影像方向优秀作品",
    winners: ["程野", "赵琳", "王赫"],
    glitchName: "程野",
    excerpt: "沉浸体验原型《边界》在叙事结构与视觉语言上……",
    hiddenFromFeed: true,
  },
  {
    slug: "shanhai-lamp-graduation-2034",
    title: "2034届毕业联展金奖揭晓：林澈跨媒介毕业创作《山海行灯》亮相",
    date: "2034-06-20",
    keyword: "山海行灯",
    winners: ["林澈"],
    excerpt:
      "漫画方向毕业生林澈的跨媒介毕业创作《山海行灯》获毕业联展金奖，四载体联动呈现东方志怪叙事。",
    hiddenFromFeed: true,
  },
  {
    slug: "ani-ai-launch",
    title: "Ani AI 智能畅课平台正式启用",
    date: "2030-09-01",
    keyword: "Ani AI",
    winners: [],
    excerpt: "系统可将创意拆解为叙事、角色、影像、交互与技术任务……",
  },
];

export type SearchResult = {
  title: string;
  desc: string;
  href: string;
};

export function isChengYeSearch(query: string): boolean {
  const q = query.trim().toLowerCase();
  return q.includes("程野") && !q.includes("cya");
}

/** 程野档案中的项目全名检索 → 仅指向创新成果奖新闻 */
export function isUnnamedRoadProjectSearch(query: string): boolean {
  const q = query.trim().toLowerCase().replace(/\s+/g, "");
  return q.includes("未命名之路") && q.includes("跨媒介") && q.includes("叙事实验");
}

/** 《山海行灯》毕业创作检索 → 仅指向毕业联展新闻 */
export function isShanhaiLampProjectSearch(query: string): boolean {
  const q = query.trim().toLowerCase().replace(/\s+/g, "");
  return q.includes("山海行灯");
}

export function searchSite(query: string): SearchResult[] | "scary" | "empty" {
  const q = query.trim().toLowerCase();
  if (!q) return "empty";

  if (isChengYeSearch(query)) return "scary";

  if (isUnnamedRoadProjectSearch(query)) {
    return [
      {
        title: "学院年度创新成果奖新闻",
        desc: "跨媒介项目《未命名之路》",
        href: "/anima/news/innovation-award-2034",
      },
    ];
  }

  if (isShanhaiLampProjectSearch(query)) {
    return [
      {
        title: "《山海行灯》毕业联展新闻",
        desc: "林澈跨媒介融合毕业创作获联展金奖",
        href: "/anima/news/shanhai-lamp-graduation-2034",
      },
    ];
  }

  const results: SearchResult[] = [];

  if (q.includes("林澈") || q.includes("lin che")) {
    results.push({
      title: "实验室申请记录（内部）",
      desc: "申请人林澈 · 多次因专业不符被驳回",
      href: "/audit/lab",
    });
    results.push({
      title: "学院年度创新成果奖新闻",
      desc: "跨媒介项目《未命名之路》",
      href: "/anima/news/innovation-award-2034",
    });
  }

  if (q.includes("ani") || q.includes("智能畅课") || q.includes("ani ai")) {
    results.push({
      title: "Ani AI 智能畅课平台",
      desc: "AI辅助创作系统介绍与优秀案例",
      href: "/anima/ani-ai",
    });
  }

  if (q.includes("跨媒介") || q.includes("创作路径")) {
    if (!isShanhaiLampProjectSearch(query)) {
      results.push({
        title: "本科教育 · 跨专业能力模块",
        desc: "2034年培养方案调整",
        href: "/anima/education",
      });
    }
  }

  if (q.includes("cya") || q.includes("0000")) {
    results.push({
      title: "创作路径账号 · 学生个人系统",
      desc: "Creative Yard Agent · CYA-0000 · 程野",
      href: "/student",
    });
  }

  if (q.includes("创新成果") || q.includes("未命名之路")) {
    results.push({
      title: "学院年度创新成果奖新闻",
      desc: "2030-06-12",
      href: "/anima/news/innovation-award-2034",
    });
  }

  if (q.includes("未来影像") || q.includes("边界")) {
    results.push({
      title: "未来影像方向优秀作品展评",
      desc: "2030-10-08",
      href: "/anima/news/future-media-2033",
    });
  }

  if (q.includes("游戏") || q.includes("下一帧")) {
    results.push({
      title: "未来影像方向优秀作品展评",
      desc: "2030-10-08",
      href: "/anima/news/future-media-2033",
    });
  }

  if (q.includes("专业") || q.includes("合并") || q.includes("调整")) {
    results.push({
      title: "2030年专业结构改革说明",
      desc: "学院介绍 · 本科生教育",
      href: "/anima/about",
    });
  }

  if (q.includes("学院") || q.includes("介绍") || q.includes("动院")) {
    results.push({
      title: "学院介绍",
      desc: "动画与数字艺术学院",
      href: "/anima/about",
    });
  }

  if (q.includes("本科") || q.includes("教育") || q.includes("课程")) {
    results.push({
      title: "本科生教育",
      desc: "新旧专业对照与能力模块",
      href: "/anima/education",
    });
  }

  if (q.includes("新闻") || q.includes("获奖")) {
    results.push({
      title: "学院新闻列表",
      desc: "全部新闻",
      href: "/anima/news",
    });
  }

  if (q.includes("creative") || q.includes("yard") || q.includes("立项") || q.includes("项目查询")) {
    results.push({
      title: "学生项目查询",
      desc: "按项目编码检索立项档案",
      href: "/audit/project",
    });
  }

  return results.length ? results : "empty";
}

export function hasAllCoreClues(clues: ClueId[]) {
  return CORE_CLUES.every((c) => clues.includes(c));
}

export function canReachTrueEnding(clues: ClueId[], aniComplete: boolean) {
  return hasAllCoreClues(clues) && aniComplete && clues.includes("open_path_code");
}
