import { siteAssets } from "@/data/cuc-anima";
import { aboutMajorOverview } from "@/data/cuc-anima-about";

export const educationPageAssets = {
  background: siteAssets.logoBg,
  logoRed: siteAssets.logoBgRed,
};

/** 与学院介绍「专业概述」一致，2030 改革叙事 */
export const educationIntro = aboutMajorOverview;

export const aniAiIntro =
  '学院于2032年启用的"Ani AI"智能教学与创作辅助系统，可根据学生提出的创意，协助拆解技术任务，并提供对应帮助。系统主要用于降低跨领域实践门槛，帮助学生快速验证不同方案，但作品的主题选择、审美判断、创作方向与最终表达仍由学生自主决定。';

export const legacyMajorMapping = [
  { legacy: "漫画", module: "叙事与视觉模块 · 动画类" },
  { legacy: "三维动画与特效", module: "动态影像模块" },
  { legacy: "数字媒体艺术", module: "沉浸体验 / 未来影像" },
  { legacy: "游戏艺术 / 游戏设计技术", module: "交互与游戏模块" },
] as const;
