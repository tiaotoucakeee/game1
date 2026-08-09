export type StudentPortalLink = {
  id: string;
  label: string;
  keywords: string[];
  href?: string;
  external?: boolean;
  disabled?: boolean;
  badge?: string;
};

export const STUDENT_PORTAL_QUICK_LINKS: StudentPortalLink[] = [
  {
    id: "project",
    label: "毕业项目管理",
    keywords: ["毕业", "项目", "选题", "退回"],
    href: "/student/project",
    badge: "3次退回",
  },
  {
    id: "schedule",
    label: "我的课表",
    keywords: ["课表", "课程", "排课"],
    disabled: true,
  },
  {
    id: "grades",
    label: "学业完成查询",
    keywords: ["成绩", "学分", "学业"],
    disabled: true,
  },
];

export const STUDENT_PORTAL_MENU: StudentPortalLink[] = [
  {
    id: "exempt",
    label: "免修办理",
    keywords: ["免修"],
    disabled: true,
  },
  {
    id: "minor",
    label: "辅修报名",
    keywords: ["辅修"],
    disabled: true,
  },
  {
    id: "project-menu",
    label: "毕业项目管理",
    keywords: ["毕业", "项目", "选题"],
    href: "/student/project",
  },
  {
    id: "grades-menu",
    label: "成绩查询",
    keywords: ["成绩"],
    disabled: true,
  },
  {
    id: "schedule-menu",
    label: "我的课表",
    keywords: ["课表"],
    disabled: true,
  },
  {
    id: "exam",
    label: "我的考试安排",
    keywords: ["考试"],
    disabled: true,
  },
  {
    id: "innovation",
    label: "大学生创新…",
    keywords: ["创新", "大创"],
    disabled: true,
  },
  {
    id: "thesis",
    label: "毕业论文(设…",
    keywords: ["论文", "毕设", "毕业设计"],
    disabled: true,
  },
  {
    id: "course-select",
    label: "选课中心",
    keywords: ["选课"],
    disabled: true,
  },
  {
    id: "evaluation",
    label: "教学评价",
    keywords: ["评价", "评教"],
    disabled: true,
  },
  {
    id: "anima",
    label: "学院官网",
    keywords: ["学院", "官网", "动画"],
    href: "/anima",
  },
  {
    id: "mail",
    label: "学生邮箱",
    keywords: ["邮箱", "邮件"],
    href: "/mail/profile",
  },
  {
    id: "profile",
    label: "学籍信息",
    keywords: ["学籍", "个人信息"],
    disabled: true,
  },
  {
    id: "lab",
    label: "实验室申请",
    keywords: ["实验室"],
    disabled: true,
  },
  {
    id: "credit",
    label: "学分认定",
    keywords: ["学分"],
    disabled: true,
  },
];

export const STUDENT_PORTAL_ANNOUNCEMENTS = [
  {
    id: "project-deadline",
    title: "2036 届毕业设计选题第三轮提交截止提醒",
    date: "2036-06-10",
  },
  {
    id: "workstudy-notice",
    title: "动画与数字艺术学院暑期勤工助学岗位申报说明",
    date: "2036-06-12",
  },
];

export const STUDENT_PORTAL_MESSAGES = [
  {
    id: "workstudy",
    title: "暑期勤工助学审核项目录用通知已送达",
    date: "2036-06-18",
    href: "/mail/profile",
  },
];
