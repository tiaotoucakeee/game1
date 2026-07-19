export type InnovationAwardTeamMember = {
  name: string;
  major: string;
  role: string;
  /** 鼠标悬停触发名单异常（林澈线） */
  anomalyTrigger?: boolean;
};

export type InnovationAwardBlock =
  | { type: "paragraph"; lines: string[] }
  | { type: "heading"; text: string }
  | { type: "team-table"; members: InnovationAwardTeamMember[] };

export const innovationAward2034Page = {
  title: "学院年度创新成果奖公布：跨媒介项目《未命名之路》获最高评",
  date: "2030-06-12",
  heroImage: "/cuc-anima/images/innovation-award-2034.png",
  source: "供稿：动画与数字艺术学院教学办",
  blocks: [
    {
      type: "paragraph",
      lines: [
        "近日，动画与数字艺术学院公布本学年「学院年度创新成果奖」评选结果。经跨专业评审组审议，由多方向学生联合完成的跨媒介项目《未命名之路》获得最高评，成为2034年度跨专业融合创作专项实训营的代表性结项成果之一。",
      ],
    },
    {
      type: "paragraph",
      lines: [
        "本次实训营全面落地2034版数智化创意人才培养方案，采用「跨专业自由组队、全流程项目制教学、AI平台赋能创作」模式。近两百名学生自主组队，围绕国风叙事、虚拟影像、沉浸式交互等主题完成联合创作，《未命名之路》在叙事完整性、媒介融合度与技术实现方面表现突出。",
      ],
    },
    { type: "heading", text: "创作说明" },
    {
      type: "paragraph",
      lines: [
        "《未命名之路》是一部以「国风叙事」为主题的跨媒介叙事实验。作品以原创漫画分镜为叙事起点，通过 Ani AI 智能创作平台完成分镜动态化预演、交互分支逻辑验证与跨模块资源匹配，最终呈现为「漫画分镜—动态影像—轻量互动分支」的完整体验链。",
      ],
    },
    {
      type: "paragraph",
      lines: [
        "在创作理念上，团队以「尚未命名的旅途」隐喻专业改革背景下创作者面对媒介选择时的犹豫与可能：读者可在关键节点选择不同路径，体验同一故事在漫画、动画与交互三种形态下的差异化表达。视觉层面保留手绘漫画的线条质感，同时引入实时影像合成与网页交互，形成层次分明的跨媒介阅读节奏。",
      ],
    },
    {
      type: "paragraph",
      lines: [
        "Ani AI 在项目中承担创意原型推演、跨媒介素材转换与课程资源推荐等辅助工作；作品的核心创意、视觉风格、叙事架构与交互逻辑均由学生团队独立设计并完成。评审组认为，该项目较好体现了学院「专业分立、创作互通」的育人思路，是跨专业融合创作的一次有效实践。",
      ],
    },
    { type: "heading", text: "团队成员" },
    {
      type: "team-table",
      members: [
        {
          name: "林澈",
          major: "漫画",
          role: "主创 · 分镜与叙事",
          anomalyTrigger: true,
        },
        {
          name: "赵琳",
          major: "数字媒体艺术",
          role: "沉浸交互与界面设计",
        },
        {
          name: "王赫",
          major: "动画",
          role: "动态预演与影像合成",
        },
        {
          name: "刘畅",
          major: "游戏设计技术",
          role: "交互机制实现",
        },
        {
          name: "孙晓舟",
          major: "游戏设计技术",
          role: "技术美术与引擎搭建",
        },
        {
          name: "周予安",
          major: "数字媒体艺术",
          role: "色彩管理与画质控制",
        },
        {
          name: "何清",
          major: "新媒体艺术",
          role: "声音设计与氛围营造",
        },
        {
          name: "苏铭",
          major: "动画（游戏艺术）",
          role: "角色与场景美术",
        },
        {
          name: "韩率",
          major: "指导教师",
          role: "跨专业创作指导",
        },
      ],
    },
    {
      type: "paragraph",
      lines: [
        "学院表示，将继续升级 Ani AI 智能创作赋能体系，丰富跨专业实训项目，引导学生在专业根基之上拓展数智媒介视野，培育兼具艺术创新与技术能力的复合型数字创意人才。",
      ],
    },
  ] satisfies InnovationAwardBlock[],
};
