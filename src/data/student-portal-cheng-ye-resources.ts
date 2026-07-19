export type ChengYeResourceTabId = "labs" | "ai" | "equipment";

export const CHENG_YE_RESOURCES_META = {
  account: "CYA-0000",
  projectCode: "CYA-P-2030-01",
  scope: "动画与数字艺术学院 · 跨专业群共享资源池",
  status: "全院跨模块调用已开通 · 路径账号统筹调度",
};

export const CHENG_YE_RESOURCE_SIDEBAR: Array<{
  id: ChengYeResourceTabId;
  label: string;
  enabled: boolean;
}> = [
  { id: "labs", label: "实验室资源", enabled: true },
  { id: "ai", label: "AI 平台账号", enabled: true },
  { id: "equipment", label: "共享设备", enabled: true },
];

export type ChengYeLabResource = {
  id: string;
  name: string;
  majorGroup: string;
  type: string;
  access: string;
  status: string;
};

export type ChengYeAiResource = {
  id: string;
  name: string;
  module: string;
  scope: string;
  access: string;
  status: string;
};

export type ChengYeEquipmentResource = {
  id: string;
  name: string;
  major: string;
  location: string;
  booking: string;
  status: string;
};

export const CHENG_YE_LAB_RESOURCES: ChengYeLabResource[] = [
  {
    id: "lab-1",
    name: "跨媒介创作联合实验室",
    majorGroup: "全院共享",
    type: "联合实训实验室",
    access: "CYA-0000 直调",
    status: "已授权",
  },
  {
    id: "lab-2",
    name: "未来影像交互实验室",
    majorGroup: "数字媒体专业群",
    type: "沉浸交互实验室",
    access: "CYA-0000 直调",
    status: "已授权",
  },
  {
    id: "lab-3",
    name: "沉浸式交互原型实验室",
    majorGroup: "数字媒体专业群",
    type: "交互原型实验室",
    access: "CYA-0000 直调",
    status: "已授权",
  },
  {
    id: "lab-4",
    name: "动态影像合成实验室",
    majorGroup: "动画专业群",
    type: "影像合成实验室",
    access: "CYA-0000 直调",
    status: "已授权",
  },
  {
    id: "lab-5",
    name: "虚拟制片实训实验室",
    majorGroup: "动画 / 数字媒体",
    type: "虚拟制片实验室",
    access: "CYA-0000 直调",
    status: "已授权",
  },
  {
    id: "lab-6",
    name: "游戏引擎与实时渲染实验室",
    majorGroup: "游戏专业群",
    type: "引擎开发实验室",
    access: "CYA-0000 直调",
    status: "已授权",
  },
  {
    id: "lab-7",
    name: "漫画分镜与动态预演实验室",
    majorGroup: "动画专业群 · 漫画方向",
    type: "分镜预演实验室",
    access: "CYA-0000 直调",
    status: "已授权",
  },
  {
    id: "lab-8",
    name: "动作捕捉与表演实验室",
    majorGroup: "动画专业群",
    type: "动捕实验室",
    access: "CYA-0000 直调",
    status: "已授权",
  },
  {
    id: "lab-9",
    name: "声音设计混录实验室",
    majorGroup: "新媒体艺术方向",
    type: "音频实验室",
    access: "CYA-0000 直调",
    status: "已授权",
  },
  {
    id: "lab-10",
    name: "数字展陈与装置实验室",
    majorGroup: "数字媒体专业群",
    type: "展陈交互实验室",
    access: "CYA-0000 直调",
    status: "已授权",
  },
];

export const CHENG_YE_AI_RESOURCES: ChengYeAiResource[] = [
  {
    id: "ai-1",
    name: "Ani AI 智能创作平台",
    module: "全院主平台",
    scope: "创意推演 · 分镜预演 · 素材转换 · 资源匹配",
    access: "CYA-0000 关联主账号",
    status: "已开通",
  },
  {
    id: "ai-2",
    name: "Ani AI · 分镜动态预演",
    module: "动画 / 漫画模块",
    scope: "漫画分镜动态化、节奏测试、镜头小样生成",
    access: "路径账号调用",
    status: "已开通",
  },
  {
    id: "ai-3",
    name: "Ani AI · 跨媒介素材转换",
    module: "数媒 / 游戏模块",
    scope: "分层原稿转动画素材、交互资产、引擎贴图",
    access: "路径账号调用",
    status: "已开通",
  },
  {
    id: "ai-4",
    name: "Ani AI · 课程与实验室匹配",
    module: "Creative Yard 调度",
    scope: "跨专业课程模块推荐、实验室权限自动匹配",
    access: "CYA-0000 直调",
    status: "已开通",
  },
  {
    id: "ai-5",
    name: "Ani AI · 交互分支验证",
    module: "游戏 / 交互模块",
    scope: "轻量互动分支逻辑验证、原型链路测试",
    access: "路径账号调用",
    status: "已开通",
  },
  {
    id: "ai-6",
    name: "Creative Yard 旧系统 API",
    module: "CYA 路径备案",
    scope: "跨模块立项登记、团队权限共享、资源调度日志",
    access: "CYA-0000 专用",
    status: "持续运行",
  },
];

export const CHENG_YE_EQUIPMENT_RESOURCES: ChengYeEquipmentResource[] = [
  {
    id: "eq-1",
    name: "Wacom 数位屏工作站 ×12",
    major: "漫画 / 原画方向",
    location: "漫画分镜与动态预演实验室",
    booking: "CYA-0000 预约",
    status: "可用",
  },
  {
    id: "eq-2",
    name: "4K 调色监视器组",
    major: "数字媒体艺术",
    location: "动态影像合成实验室",
    booking: "CYA-0000 预约",
    status: "可用",
  },
  {
    id: "eq-3",
    name: "OptiTrack 动作捕捉系统",
    major: "动画专业群",
    location: "动作捕捉与表演实验室",
    booking: "CYA-0000 预约",
    status: "可用",
  },
  {
    id: "eq-4",
    name: "RTX 集群渲染节点 ×24",
    major: "动画 / 游戏专业群",
    location: "游戏引擎与实时渲染实验室",
    booking: "CYA-0000 预约",
    status: "可用",
  },
  {
    id: "eq-5",
    name: "VR / AR 头显套件 ×8",
    major: "沉浸交互方向",
    location: "沉浸式交互原型实验室",
    booking: "CYA-0000 预约",
    status: "可用",
  },
  {
    id: "eq-6",
    name: "录音棚与拟音设备",
    major: "新媒体艺术",
    location: "声音设计混录实验室",
    booking: "CYA-0000 预约",
    status: "可用",
  },
  {
    id: "eq-7",
    name: "虚幻引擎实训工作站 ×16",
    major: "游戏设计技术",
    location: "游戏引擎与实时渲染实验室",
    booking: "CYA-0000 预约",
    status: "可用",
  },
  {
    id: "eq-8",
    name: "扫描仪与分层稿数字化设备",
    major: "漫画方向",
    location: "跨媒介创作联合实验室",
    booking: "CYA-0000 预约",
    status: "可用",
  },
  {
    id: "eq-9",
    name: "LED 体积影像拍摄系统",
    major: "虚拟影像叙事",
    location: "虚拟制片实训实验室",
    booking: "CYA-0000 预约",
    status: "可用",
  },
  {
    id: "eq-10",
    name: "互动装置控制器与传感套件",
    major: "数字媒体艺术",
    location: "数字展陈与装置实验室",
    booking: "CYA-0000 预约",
    status: "可用",
  },
];

export const CHENG_YE_RESOURCE_TAB_LABELS: Record<ChengYeResourceTabId, string> = {
  labs: "实验室资源",
  ai: "AI 平台账号",
  equipment: "共享设备",
};
