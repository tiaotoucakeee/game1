import { siteAssets } from "@/data/cuc-anima";

export interface AboutStat {
  value: string;
  label: string;
  icon: "circle" | "logo";
}

export interface AboutAwardWork {
  title: string;
  description: string;
  image: string;
  watchLabel: string;
  href: string;
}

const aboutAsset = (filename: string) => `/cuc-anima/images/about/${filename}`;

export const aboutIntroParagraphs = [
  {
    html: `中国传媒大学动画与数字艺术学院成立于2001年，是我国较早开展动画、数字媒体艺术、游戏设计、新媒体艺术及相关数字技术教学科研的院校之一。依托中国传媒大学在传媒、艺术与信息技术领域的学科优势，经过三十余年的建设，学院已形成完整的本、硕、博人才培养体系。面向生成式人工智能、实时影像与沉浸媒介快速发展的行业环境，学院持续推进专业结构调整，逐步建立起以跨学科、跨媒介协同创作为特色，艺术、技术、传播与策划深度融合的数字创意人才培养体系。`,
  },
  {
    html: `<strong>在教学架构上，学院自2030年开始打破以单一专业划分课程与资源的传统模式，将原有知识体系重新整合为叙事、角色、影像…等能力模块，形成动画创作、数字媒体艺术、智能交互技术、虚拟影像叙事、数字文创策划和传媒交互工程等培养方向。</strong>低年级学生共同修读造型基础、三维制作、媒介理论、交互设计与人工智能创作基础课程，高年级则围绕真实项目自主组合学习路径。课程作业和毕业设计普遍采用跨专业组队形式，由美术设计、技术开发与内容策划等不同方向的学生协同完成，培养学生从创意构思、技术实现到传播落地的综合能力。`,
  },
  {
    html: `<strong>学院于2032年启用的“Ani AI”智能教学与创作辅助系统，</strong>可根据学生提出的创意，协助拆解技术任务，并提供对应帮助。系统主要用于降低跨领域实践门槛，帮助学生快速验证不同方案，<strong>但作品的主题选择、审美判断、创作方向与最终表达仍由学生自主决定。</strong>`,
  },
  {
    html: `面向未来，学院将继续坚持“传媒底色、艺术内核、技术载体、融合思维”的育人理念。专业名称与创作工具可以不断变化，但叙事能力、审美判断与文化表达始终是创作者的核心。学院致力于培养能够跨越媒介边界、连接艺术与技术，并对自身创作方向保持独立判断的新一代数字艺术人才。`,
  },
];

export interface AboutTimelineEvent {
  year: string;
  side: "left" | "right";
  description: string;
}

export const aboutReformTimeline = {
  title: "改革期",
  events: [
    {
      year: "2030",
      side: "right" as const,
      description:
        "· 开始打破以单一专业划分课程与资源的传统模式，形成动画创作、数字媒体艺术、智能交互技术、虚拟影像叙事、数字文创策划和传媒交互工程等培养方向。",
    },
    {
      year: "2032",
      side: "left" as const,
      description: "· 启用的“Ani AI”智能教学与创作辅助系统",
    },
  ] satisfies AboutTimelineEvent[],
};

export const aboutHistoryImages = [
  aboutAsset("chuchuangqis-p-2000.png"),
  aboutAsset("fazhanqis-p-2000.png"),
  aboutAsset("shouhuoqis-p-2000.png"),
];

export const aboutMajorOverview =
  "经过不断发展，动画与数字艺术学院已建立起完整的本、硕、博人才培养体系。自2030年启动专业结构改革以来，学院不再按照原有细分专业方向组织本科教学，而是将课程、师资与实验资源重新整合为动画专业群、数字媒体专业群和游戏专业群三大独立教学体系。\n\n动画专业群主要面向动画创作、漫画叙事、角色设计、三维影像及智能动画等领域；数字媒体专业群重点涵盖数字媒体艺术、未来影像、新媒体艺术、沉浸体验与智能交互等方向；游戏专业群则围绕游戏艺术设计、数字媒体技术、交互娱乐、艺术与科技及创意工程展开教学。三个专业群分别设置独立的培养方案、核心课程和教学管理体系，同时通过项目课程、共享实验室和联合创作机制开展跨专业协作。";

export const aboutStats: AboutStat[] = [
  { value: "2500+", label: "学生数量", icon: "circle" },
  { value: "185+", label: "导师数量", icon: "logo" },
  { value: "10000+", label: "毕业生数量", icon: "circle" },
  { value: "98%", label: "就业率", icon: "logo" },
];

export const aboutHonorImages = [
  aboutAsset("1.png"),
  aboutAsset("1-2.png"),
  aboutAsset("1-3.png"),
  aboutAsset("2-1.png"),
  aboutAsset("2-2.png"),
  aboutAsset("2-3.png"),
  aboutAsset("3-1.png"),
  aboutAsset("3-2.png"),
  aboutAsset("3-3.png"),
];

const youtubeChannel = "https://www.youtube.com/channel/UCiam1JD6m1C0LJbnmM8kyeQ";

export const aboutAwardWorks: AboutAwardWork[] = [
  {
    title: "《纪念日快乐》",
    description: "学生作品《纪念日快乐》获日本东京国际动画节评委会奖",
    image: aboutAsset("WeChatcf61c6a611aa5937e42fafb822f20337-1.jpg"),
    watchLabel: "点击观看",
    href: youtubeChannel,
  },
  {
    title: "《抢狮头》",
    description: "学生作品《抢狮头》获日本东京国际动画节评委会奖",
    image: aboutAsset("qiangshitou.jpg"),
    watchLabel: "点击观看",
    href: youtubeChannel,
  },
  {
    title: "《象群挽歌》",
    description: "学生作品《象群挽歌》获希腊爱奥尼亚动画节国际学生影片奖",
    image: aboutAsset("WeChat4d1daa41b27c9a80268562d92665b2b3-1.jpg"),
    watchLabel: "点击观看",
    href: youtubeChannel,
  },
  {
    title: "《蜉蝣日记》",
    description: "学生作品《蜉蝣日记》获葡萄牙里斯本动画节特别表彰奖",
    image: aboutAsset("WeChat19536040ce74a95605da151f37043778-1.png"),
    watchLabel: "点击观看",
    href: youtubeChannel,
  },
  {
    title: "《春困》",
    description: "学生作品《春困》获中国大学生原创动漫大赛一等奖",
    image: aboutAsset("WeChat8bd286d35875124650748da867554ae5-1.jpg"),
    watchLabel: "点击观看",
    href: youtubeChannel,
  },
  {
    title: "《天外有天》",
    description: "学生作品《天外有天》获美国学生奥斯卡动画短片银奖",
    image: aboutAsset("image-4.jpg"),
    watchLabel: "点击观看",
    href: youtubeChannel,
  },
  {
    title: "《识途》",
    description: "学生作品《识途》获日本东京TBS Digicon亚洲数码大赛中国作品金奖",
    image: aboutAsset("WeChatce7b2b3b6ee26e10d6a5193527c42fde-1.png"),
    watchLabel: "点击观看",
    href: youtubeChannel,
  },
  {
    title: "《春花》",
    description:
      "作品（剧情片）最佳编剧奖\n2018年获第45届学生奥斯卡电影节“学生奥斯卡奖”叙事类金奖",
    image: aboutAsset("chunhua.jpg"),
    watchLabel: "Watch",
    href: youtubeChannel,
  },
];

export const aboutStatIcons = {
  circle: aboutAsset("fact-img-circle.svg"),
  logo: aboutAsset("fact-img-logo.svg"),
};

export const aboutPageAssets = {
  background: siteAssets.logoBg,
  watchArrow: siteAssets.rightArrowWhite,
};
