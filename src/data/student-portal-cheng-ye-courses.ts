export type ChengYeCourseTabId = "animation" | "digital" | "game" | "selected";

export const CHENG_YE_COURSES_META = {
  account: "CYA-0000",
  projectCode: "CYA-P-2030-01",
  scope: "动画与数字艺术学院 · 跨专业群课程模块池",
  status: "路径账号跨模块选课已开通",
};

export const CHENG_YE_COURSE_SIDEBAR: Array<{
  id: ChengYeCourseTabId;
  label: string;
  enabled: boolean;
}> = [
  { id: "animation", label: "动画专业群", enabled: true },
  { id: "digital", label: "数字媒体专业群", enabled: true },
  { id: "game", label: "游戏专业群", enabled: true },
  { id: "selected", label: "已选模块", enabled: true },
];

export type ChengYeCourse = {
  id: string;
  name: string;
  code: string;
  credits: string;
  module: string;
  enroll: string;
  status: string;
};

export const CHENG_YE_ANIMATION_COURSES: ChengYeCourse[] = [
  {
    id: "ani-1",
    name: "漫画叙事与分镜设计",
    code: "ANI-M3101",
    credits: "3",
    module: "漫画方向核心",
    enroll: "CYA-0000 直选",
    status: "可选",
  },
  {
    id: "ani-2",
    name: "动态预演与镜头语言",
    code: "ANI-M3204",
    credits: "2",
    module: "动画影像模块",
    enroll: "CYA-0000 直选",
    status: "可选",
  },
  {
    id: "ani-3",
    name: "角色造型与场景美术",
    code: "ANI-M3302",
    credits: "3",
    module: "美术设计模块",
    enroll: "CYA-0000 直选",
    status: "可选",
  },
  {
    id: "ani-4",
    name: "二维动画表演基础",
    code: "ANI-M3406",
    credits: "2",
    module: "动画表演模块",
    enroll: "CYA-0000 直选",
    status: "可选",
  },
  {
    id: "ani-5",
    name: "动作捕捉应用实践",
    code: "ANI-M3510",
    credits: "2",
    module: "动捕实训模块",
    enroll: "CYA-0000 直选",
    status: "可选",
  },
  {
    id: "ani-6",
    name: "国风叙事创作工作坊",
    code: "ANI-W3601",
    credits: "2",
    module: "跨模块拓展",
    enroll: "CYA-0000 直选",
    status: "可选",
  },
];

export const CHENG_YE_DIGITAL_COURSES: ChengYeCourse[] = [
  {
    id: "dm-1",
    name: "沉浸交互界面设计",
    code: "DM-M4102",
    credits: "3",
    module: "交互设计模块",
    enroll: "CYA-0000 直选",
    status: "可选",
  },
  {
    id: "dm-2",
    name: "数字影像合成技术",
    code: "DM-M4205",
    credits: "2",
    module: "影像技术模块",
    enroll: "CYA-0000 直选",
    status: "可选",
  },
  {
    id: "dm-3",
    name: "虚拟制片流程概论",
    code: "DM-M4303",
    credits: "2",
    module: "虚拟影像模块",
    enroll: "CYA-0000 直选",
    status: "可选",
  },
  {
    id: "dm-4",
    name: "空间交互叙事设计",
    code: "DM-M4408",
    credits: "3",
    module: "展陈交互模块",
    enroll: "CYA-0000 直选",
    status: "可选",
  },
  {
    id: "dm-5",
    name: "色彩管理与画质控制",
    code: "DM-M4501",
    credits: "2",
    module: "后期制作模块",
    enroll: "CYA-0000 直选",
    status: "可选",
  },
  {
    id: "dm-6",
    name: "声音设计与氛围营造",
    code: "DM-M4604",
    credits: "2",
    module: "新媒体艺术模块",
    enroll: "CYA-0000 直选",
    status: "可选",
  },
];

export const CHENG_YE_GAME_COURSES: ChengYeCourse[] = [
  {
    id: "gm-1",
    name: "交互机制设计与实现",
    code: "GM-M5103",
    credits: "3",
    module: "游戏设计模块",
    enroll: "CYA-0000 直选",
    status: "可选",
  },
  {
    id: "gm-2",
    name: "实时渲染与引擎基础",
    code: "GM-M5206",
    credits: "3",
    module: "引擎技术模块",
    enroll: "CYA-0000 直选",
    status: "可选",
  },
  {
    id: "gm-3",
    name: "技术美术与场景搭建",
    code: "GM-M5304",
    credits: "2",
    module: "技术美术模块",
    enroll: "CYA-0000 直选",
    status: "可选",
  },
  {
    id: "gm-4",
    name: "轻量互动分支开发",
    code: "GM-M5407",
    credits: "2",
    module: "交互开发模块",
    enroll: "CYA-0000 直选",
    status: "可选",
  },
  {
    id: "gm-5",
    name: "游戏关卡与流程设计",
    code: "GM-M5502",
    credits: "2",
    module: "关卡设计模块",
    enroll: "CYA-0000 直选",
    status: "可选",
  },
  {
    id: "gm-6",
    name: "AI 辅助原型验证实训",
    code: "GM-W5601",
    credits: "2",
    module: "Ani AI 联动模块",
    enroll: "CYA-0000 直选",
    status: "可选",
  },
];

/** 路径团队已通过 CYA 统筹选入的跨模块课程 */
export const CHENG_YE_SELECTED_COURSES: ChengYeCourse[] = [
  {
    id: "sel-1",
    name: "漫画叙事与分镜设计",
    code: "ANI-M3101",
    credits: "3",
    module: "动画专业群",
    enroll: "路径立项自动挂载",
    status: "已选",
  },
  {
    id: "sel-2",
    name: "动态预演与镜头语言",
    code: "ANI-M3204",
    credits: "2",
    module: "动画专业群",
    enroll: "路径立项自动挂载",
    status: "已选",
  },
  {
    id: "sel-3",
    name: "沉浸交互界面设计",
    code: "DM-M4102",
    credits: "3",
    module: "数字媒体专业群",
    enroll: "Ani AI 推荐匹配",
    status: "已选",
  },
  {
    id: "sel-4",
    name: "数字影像合成技术",
    code: "DM-M4205",
    credits: "2",
    module: "数字媒体专业群",
    enroll: "Ani AI 推荐匹配",
    status: "已选",
  },
  {
    id: "sel-5",
    name: "交互机制设计与实现",
    code: "GM-M5103",
    credits: "3",
    module: "游戏专业群",
    enroll: "跨模块调度",
    status: "已选",
  },
  {
    id: "sel-6",
    name: "实时渲染与引擎基础",
    code: "GM-M5206",
    credits: "3",
    module: "游戏专业群",
    enroll: "跨模块调度",
    status: "已选",
  },
  {
    id: "sel-7",
    name: "AI 辅助原型验证实训",
    code: "GM-W5601",
    credits: "2",
    module: "Ani AI 联动模块",
    enroll: "Creative Yard 配置",
    status: "已选",
  },
  {
    id: "sel-8",
    name: "国风叙事创作工作坊",
    code: "ANI-W3601",
    credits: "2",
    module: "跨模块拓展",
    enroll: "团队共享模块",
    status: "已选",
  },
];

export const CHENG_YE_COURSE_TAB_LABELS: Record<ChengYeCourseTabId, string> = {
  animation: "动画专业群课程",
  digital: "数字媒体专业群课程",
  game: "游戏专业群课程",
  selected: "已选模块",
};

export function getChengYeCoursesByTab(tab: ChengYeCourseTabId): ChengYeCourse[] {
  switch (tab) {
    case "animation":
      return CHENG_YE_ANIMATION_COURSES;
    case "digital":
      return CHENG_YE_DIGITAL_COURSES;
    case "game":
      return CHENG_YE_GAME_COURSES;
    case "selected":
      return CHENG_YE_SELECTED_COURSES;
  }
}
