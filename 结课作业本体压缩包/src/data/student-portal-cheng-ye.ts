import type { StudentPortalLink } from "@/data/student-portal";

export const CHENG_YE_PORTAL_QUICK_LINKS: StudentPortalLink[] = [
  {
    id: "project",
    label: "毕业项目管理",
    keywords: ["毕业", "项目", "未命名", "山海行灯"],
    href: "/student/project",
    badge: "路径运行中",
  },
  {
    id: "cya",
    label: "创作路径档案",
    keywords: ["cya", "creative yard", "路径", "立项"],
    href: "/student/home",
  },
  {
    id: "lab",
    label: "跨专业实验室",
    keywords: ["实验室", "跨专业", "资源"],
    disabled: true,
  },
];

export const CHENG_YE_PORTAL_MENU: StudentPortalLink[] = [
  {
    id: "project-menu",
    label: "毕业项目管理",
    keywords: ["毕业", "项目", "未命名", "山海行灯"],
    href: "/student/project",
  },
  {
    id: "cya-menu",
    label: "创作路径计划",
    keywords: ["cya", "creative yard", "路径"],
    href: "/student/home",
  },
  {
    id: "team",
    label: "团队管理",
    keywords: ["团队", "成员", "协作", "韩率", "林澈"],
    href: "/student/team",
  },
  {
    id: "resources",
    label: "配套资源",
    keywords: ["资源", "素材", "配套", "实验室", "设备", "ani"],
    href: "/student/resources",
  },
  {
    id: "innovation",
    label: "大学生创新…",
    keywords: ["创新", "未命名之路"],
    href: "/anima/news/innovation-award-2034",
  },
  {
    id: "thesis",
    label: "毕业论文(设…",
    keywords: ["论文", "山海行灯", "毕设"],
    href: "/student/project",
  },
  {
    id: "course-select",
    label: "选课中心",
    keywords: ["选课", "课程", "模块", "动画", "数媒", "游戏"],
    href: "/student/courses",
  },
  {
    id: "anima",
    label: "学院官网",
    keywords: ["学院", "官网"],
    href: "/anima",
  },
  {
    id: "mail",
    label: "内部邮箱",
    keywords: ["邮箱", "cya"],
    disabled: true,
  },
  { id: "profile", label: "学籍信息", keywords: ["学籍"], disabled: true },
  {
    id: "lab",
    label: "实验室申请",
    keywords: ["实验室", "跨专业"],
    badge: "已通过",
    disabled: true,
  },
];

export const CHENG_YE_PORTAL_ANNOUNCEMENTS = [
  {
    id: "gold-award",
    title: "2034 届毕业联展金奖揭晓：《山海行灯》跨媒介毕业创作",
    date: "2034-06-15",
    href: "/anima/news/shanhai-lamp-graduation-2034",
  },
  {
    id: "innovation",
    title: "学院年度创新成果奖：《未命名之路》跨媒介叙事实验",
    date: "2034-05-28",
    href: "/anima/news/innovation-award-2034",
  },
  {
    id: "cya-notice",
    title: "Creative Yard 创作路径计划 · 跨专业资源调度说明",
    date: "2030-09-12",
  },
];

export const CHENG_YE_PORTAL_MESSAGES = [
  {
    id: "lab-pass",
    title: "跨专业实验室权限申请已全部通过",
    date: "2033-11-06",
  },
  {
    id: "path-sync",
    title: "创作路径账号 CYA-0000 数据同步完成",
    date: "2034-06-01",
  },
  {
    id: "project-done",
    title: "《未命名之路》结项审核已通过",
    date: "2034-05-18",
    href: "/student/project",
  },
];
