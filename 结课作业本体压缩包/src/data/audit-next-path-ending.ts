/** 真结局二 ·《下一段路径》逐行演绎文案 */

export type NextPathSegment =
  | { kind: "label"; text: string }
  | { kind: "title"; text: string }
  | { kind: "paragraph"; text: string; epilogue?: boolean }
  | { kind: "system"; lines: string[] }
  | { kind: "note"; text: string; accent?: boolean }
  | {
      kind: "chat";
      messages: Array<{ speaker: string; text: string }>;
    };

export const NEXT_PATH_REVEAL_INTERVAL_MS = 2200;
export const NEXT_PATH_INITIAL_DELAY_MS = 500;

export const NEXT_PATH_SEGMENTS: NextPathSegment[] = [
  { kind: "label", text: "结局 ·《下一段路径》" },
  { kind: "title", text: "新成员申请已通过" },
  {
    kind: "paragraph",
    text: "你输入 Ani 给出的项目代码时，手指在键盘上停了一秒。那不是某次作业的参考答案，而是学院「开放创作路径计划」留给真正愿意跨出步子的人的入口。",
  },
  {
    kind: "paragraph",
    text: "回想这几周，你用自己的学号登录学生系统，一次次打开被退回的毕业项目。选题说明里写着动画、游戏、交互与未来影像，却总在审核栏里收到同一句话：方向尚未归入单一专业，请重新提交。",
  },
  {
    kind: "paragraph",
    text: "你没有停在抱怨里。你去问 Ani，去搜程野，去核对立项书与新闻里对不上的名字——不是为了让系统给出标准答案，而是想弄明白：当专业边界在 AI 时代变得模糊，一条还无法被命名的路，是否仍然值得走下去。",
  },
  {
    kind: "paragraph",
    text: "Ani 没有直接替你选题。它根据你的问题，一次次把讨论推回创作本身：你想表达什么，你愿意为跨专业承担多少试错，你是否真的愿意让作品在多个模块之间生长。当你终于说出「我想试着做跨专业创作」时，它才提起创作路径账户，提起立项书底部那行几乎被忽略的小字。",
  },
  {
    kind: "system",
    lines: [
      "开放创作路径计划 · 新成员状态：已激活",
      "Creative Yard 项目组 · 祁玉",
    ],
  },
  {
    kind: "paragraph",
    text: "申请通过的通知很安静，没有横幅，也没有典礼。只是在 Creative Yard 的内网里，你的名字被加进了一个很小的列表——学院探索 AI 辅助跨媒介创作的新成员。",
  },
  {
    kind: "note",
    text: "这一次，你不再只是核对别人路径的临时审核员。你成为这条创作路径的延续者。",
  },
  {
    kind: "paragraph",
    epilogue: true,
    text: "第一次项目组见面是在实验室的深夜。屏幕蓝光映着几个还没睡的人，你认出了立项书照片里的那个名字——林澈。他比新闻稿里看起来更接近「学长」：袖口还沾着一点马克笔的痕迹，说话前先笑一下，像怕吓到你。",
  },
  {
    kind: "chat",
    messages: [
      {
        speaker: "林澈",
        text: "你是从审核那边过来的吧？我听说，有人把 CYA-0000 的事查清楚了。",
      },
      {
        speaker: "祁玉",
        text: "嗯。也想……把自己的项目做完。",
      },
      {
        speaker: "林澈",
        text: "退回意见我看过。它不是说你做错了，是系统还不知道该怎么给跨专业的作品发一张「身份证」。",
      },
      {
        speaker: "林澈",
        text: "我刚入学那年也焦虑过。漫画被并进动画大项，总觉得自己站在缝隙里，不知道作品该往哪里放。",
      },
      {
        speaker: "林澈",
        text: "后来才明白，缝隙才是路径开始的地方。Ani 可以帮你试错、找资源，但故事、角色、交互的逻辑，得你自己定。",
      },
      {
        speaker: "林澈",
        text: "别急着被命名——先把想表达的那一点光留住。学妹，你的路还长，但已经开始了。",
      },
    ],
  },
  {
    kind: "paragraph",
    epilogue: true,
    text: "你点头。窗外是定福庄东路的夏夜，远处教学楼的灯还亮着几盏。你忽然觉得，那些退回意见、隐藏页面和深夜对话，并不是把你挡在专业门外的墙——而是把你推向一条还没有路标、却真实存在的线。",
  },
  {
    kind: "paragraph",
    epilogue: true,
    text: "未来已来。",
  },
  {
    kind: "paragraph",
    epilogue: true,
    text: "愿我们始终守住最初想表达的那一点光，也拥有拥抱新工具的勇气。在尚未命名的道路上，继续探索，继续想象，继续创造。",
  },
  {
    kind: "note",
    text: "下一段路径，由你开始。",
    accent: true,
  },
];
