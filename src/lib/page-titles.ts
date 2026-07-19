import type { Metadata } from "next";

/** 浏览器标签页标题（与各系统 UI 文案一致） */
export const PAGE_TITLES = {
  mail: "CUC校内邮箱",
  audit: {
    default: "审核工作台",
    login: "审核工作台登录",
    reflection: "创作路径反思",
    pathInvite: "创作路径邀请",
    nextPath: "新成员申请",
    stroll: "片尾字幕",
    truth: "真结局",
    delete: "档案已删除",
    summer: "审核已提交",
    recruit: "项目招募",
  },
  student: {
    default: "学生个人系统",
    login: "学生个人系统登录",
    courses: "我的课程 · 学生个人系统",
    resources: "资源调度 · 学生个人系统",
    team: "团队管理 · 学生个人系统",
    project: "项目管理 · 学生个人系统",
  },
  anima: {
    home: "欢迎来到中国传媒大学动画与数字艺术学院！",
    news: "学院新闻",
    search: "全站搜索",
    education: "本科生教育",
    fields: "领域成果",
    aniAi: "Ani AI 智能畅课平台",
  },
} as const;

export function pageMetadata(title: string, description?: string): Metadata {
  return description ? { title, description } : { title };
}
