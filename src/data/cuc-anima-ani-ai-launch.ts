export type AniAiLaunchBlock =
  | { type: "paragraph"; lines: string[] }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "bold"; lines: string[] }
  | { type: "list"; items: string[] }
  | { type: "usage-callout" };

export const aniAiLaunch2030Page = {
  title: "Ani AI 智能畅课平台正式启用",
  date: "2030-09-01",
  heroImage: "/cuc-anima/images/ani-ai-campus.png",
  blocks: [
    {
      type: "paragraph",
      lines: [
        "中国传媒大学动画与数字艺术学院「Ani AI」智能教学与创作辅助系统现已面向全院学生正式启用。",
        "系统可将学生创意拆解为叙事、角色、影像、交互与技术任务，快速生成不同媒介的测试原型，并推荐课程、工具与合作伙伴。",
      ],
    },
    {
      type: "paragraph",
      lines: [
        "Ani AI 主要用于降低跨领域实践门槛，帮助学生快速验证不同方案。作品的主题选择、审美判断、创作方向与最终表达仍由学生自主决定。",
      ],
    },
    { type: "heading", text: "功能模块" },
    {
      type: "list",
      items: [
        "创意拆解：叙事 / 角色 / 影像 / 交互 / 技术",
        "媒介转换：漫画分镜 → 动态预览 → 交互原型",
        "课程匹配：跨实验室资源与权限推荐",
        "原型测试：快速生成可验证的技术方案",
      ],
    },
    { type: "usage-callout" },
    { type: "heading", text: "适用场景" },
    {
      type: "list",
      items: [
        "跨专业毕业项目构思与方案验证",
        "课程作业中的媒介选择与工具匹配",
        "竞赛与创作实践中的快速原型测试",
        "探索动画、数字媒体、游戏等多方向组合路径",
      ],
    },
    { type: "heading", text: "重要说明" },
    {
      type: "bold",
      lines: [
        "Ani AI 负责拓展创作可能、协助拆解技术任务并提供对应帮助，不对学生的创作主题、审美取向与最终表达作替代性决定。",
        "使用 AI 辅助完成的环节，请在项目说明中如实标注；涉及跨专业协作时，仍须遵守学院相关管理规定。",
      ],
    },
  ] satisfies AniAiLaunchBlock[],
};
