/** 尾飞演出 · Stroll 内容 */

export const STROLL_NEWS_IMAGES = Array.from({ length: 10 }, (_, index) => {
  const num = String(index + 1).padStart(2, "0");
  return `/audit/stroll/news/news-${num}.png`;
});

export type StrollComfortLine = {
  side: "left" | "right";
  text: string;
};

/** 缓解 AI 时代焦虑的左右交替语段 */
export const STROLL_COMFORT_LINES: StrollComfortLine[] = [
  {
    side: "left",
    text: "热搜里的「砍掉」，裁撤的是重复训练，不是你的想象力。",
  },
  {
    side: "right",
    text: "专业名称会变，创作的路径不会因此消失。",
  },
  {
    side: "left",
    text: "AI 可以生成画面，却生成不了你为何想表达的那一点。",
  },
  {
    side: "right",
    text: "跨专业不是边缘，是面向人机分工时代的常态。",
  },
  {
    side: "left",
    text: "工具在更新，但故事、角色与交互的逻辑，仍须由人决定。",
  },
  {
    side: "right",
    text: "你此刻的困惑，也曾是每一条新路径的起点。",
  },
  {
    side: "left",
    text: "焦虑来自未知；理解规则之后，技术会成为延伸。",
  },
  {
    side: "right",
    text: "学院在重构课堂，而你仍可以重构自己的表达方式。",
  },
];

/** 进入正式尾飞前的中心鼓励语 */
export const STROLL_ENCOURAGEMENT = "在尚未被命名的路上，继续创作。";

export const STROLL_CREDITS = {
  projectTitle: "《不存在的学生》",
  projectSubtitle: "ARG 平行实境网页解密游戏",
  courseTitle: "交互叙事理论",
  courseLines: [
    "2025—2026 学年",
    "中国传媒大学 · 动画与数字艺术学院",
  ],
  membersTitle: "小组成员",
  members: ["徐子棋", "王子玉"],
  roles: [
    { title: "游戏剧本", names: ["徐子棋", "王子玉"] },
    { title: "游戏美术", names: ["王子玉"] },
    { title: "网页程序", names: ["徐子棋"] },
  ],
  advisorTitle: "指导教师",
  advisors: ["韩帅"],
};

export const STROLL_SCHOOL_NAME = "动画与数字艺术学院";

/** 学院 logo 完全显示后，多久出现返回邮箱链接（毫秒） */
export const STROLL_FINALE_MAIL_LINK_DELAY_MS = 5000;

export const STROLL_FINALE_MAIL_LINK_LABEL = "返回邮箱";

/** 自动播放总时长（毫秒） */
export const STROLL_SCROLL_DURATION_MS = 155_000;

/** 长按鼠标/触摸时的加速倍率 */
export const STROLL_SCROLL_SPEED_BOOST = 3.2;

/** 鼓励语停留时长（毫秒） */
export const STROLL_ENCOURAGE_HOLD_MS = 2200;

/** 鼓励语渐隐时长（毫秒） */
export const STROLL_ENCOURAGE_FADE_MS = 1000;

/** 尾飞自下而上滚入时长（毫秒） */
export const STROLL_CREDITS_ROLL_MS = 44_000;

/** 学院 logo 淡入时长（毫秒） */
export const STROLL_BRAND_FADE_MS = 3000;

/** 开场前三张新闻（1→2→3）渐显所占滚动进度 */
export const STROLL_NEWS_INTRO_STOPS: Array<{ start: number; end: number }> = [
  { start: 0, end: 0.005 },
  { start: 0.004, end: 0.009 },
  { start: 0.008, end: 0.013 },
];

/** 开场滚动：前段几乎不滚，留第一张图展示 */
export const STROLL_SCROLL_INTRO_RATIO = 0.14;

/** 开场滚动：前段最多滚动的路程占比 */
export const STROLL_SCROLL_INTRO_DISTANCE = 0.012;

/** 新闻滚动拼贴：按 1左 → 2右 → 3左 循环；top 为容器高度百分比 */
export type StrollNewsSlot = "left-wide" | "right-tall" | "left-small";

const STROLL_NEWS_SLOT_LAYOUT: Record<
  StrollNewsSlot,
  { left: number; width: number; z: number }
> = {
  "left-wide": { left: 7, width: 56, z: 2 },
  "right-tall": { left: 40, width: 50, z: 3 },
  "left-small": { left: 9, width: 44, z: 4 },
};

const STROLL_NEWS_SLOT_CYCLE: StrollNewsSlot[] = ["left-wide", "right-tall", "left-small"];

/** 每张图纵向间距（容器高度 %） */
const STROLL_NEWS_ROW_STEP = 11;

/** 水平随机偏移（%） */
const STROLL_NEWS_LEFT_JITTER = [1, 4, -1, 2, -2, 3, 1, 4, -1, 2];

function clampNewsLeft(slot: StrollNewsSlot, left: number) {
  if (slot === "right-tall") return Math.max(34, Math.min(48, left));
  return Math.max(4, Math.min(26, left));
}

export const STROLL_NEWS_MOSAIC = STROLL_NEWS_IMAGES.map((_, index) => {
  const slot = STROLL_NEWS_SLOT_CYCLE[index % 3]!;
  const layout = STROLL_NEWS_SLOT_LAYOUT[slot];
  const jitter = STROLL_NEWS_LEFT_JITTER[index] ?? 0;
  return {
    imageIndex: index,
    slot,
    left: clampNewsLeft(slot, layout.left + jitter),
    top: index * STROLL_NEWS_ROW_STEP,
    width: layout.width,
    z: layout.z,
  };
});

/** 新闻区域高度（vh）：容纳 10 张 + 末尾留白 */
export const STROLL_NEWS_MOSAIC_HEIGHT_VH = 320;
