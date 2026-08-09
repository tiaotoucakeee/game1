/**
 * Ani AI 对话后端配置（服务端环境变量）
 *
 * Kimi / Moonshot（推荐）：
 *   ANI_KIMI_API_KEY   — Moonshot API Key（platform.moonshot.cn）
 *   ANI_KIMI_MODEL     — 可选，默认 moonshot-v1-8k
 *   ANI_KIMI_BASE_URL  — 可选，默认 https://api.moonshot.cn/v1
 *
 * Coze（旧方案，可选）：
 *   ANI_COZE_STREAM_URL / ANI_COZE_API_TOKEN / ANI_COZE_BOT_ID
 */
export const ANI_KIMI_CONFIG = {
  apiKey: process.env.ANI_KIMI_API_KEY ?? "",
  baseUrl: process.env.ANI_KIMI_BASE_URL ?? "https://api.moonshot.cn/v1",
  model: process.env.ANI_KIMI_MODEL ?? "moonshot-v1-8k",
};

export const ANI_COZE_CONFIG = {
  streamUrl: process.env.ANI_COZE_STREAM_URL ?? "",
  apiToken: process.env.ANI_COZE_API_TOKEN ?? "",
  botId: process.env.ANI_COZE_BOT_ID ?? "",
};

export function isAniKimiConfigured(): boolean {
  return Boolean(ANI_KIMI_CONFIG.apiKey);
}

export function isAniCozeConfigured(): boolean {
  return Boolean(ANI_COZE_CONFIG.streamUrl && ANI_COZE_CONFIG.apiToken && ANI_COZE_CONFIG.botId);
}

export type AniChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
};

export type AniChatRequestBody = {
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  userId?: string;
};

export type AniChatMode = "kimi" | "coze" | "mock";

export type AniStreamEvent =
  | { type: "meta"; mode: AniChatMode }
  | { type: "delta"; content: string }
  | { type: "done" }
  | { type: "error"; message: string };

/** 聊天窗副标题（游戏内文案，不暴露后端 provider） */
export const ANI_CHAT_STATUS_LABEL = "智能畅课 · 对话待续";

/** 开场白（静态展示，不参与 API 历史） */
export const ANI_CHAT_WELCOME =
  "叮咚！学院小狐狸 Ani AI 前来报到～\n专门帮大家梳理跨学科创作、攻克毕业设计难题✨\n如果你正苦恼选题、毕设被退回，或想了解学院里的「创作路径账户」是怎么回事，都可以跟我说。\n需要我先带你看看往届优秀案例，还是直接聊聊你的创作困境？";

/** 开场快捷问题（仅作对话起点，不会直接给出招募码） */
export const ANI_CHAT_SUGGESTIONS = [
  "需要，请展示优秀毕业创作案例",
  "我的毕设被退回了，跨专业不知道怎么做",
  "创作路径账户是什么？和林澈的案例有关吗？",
  "可以帮我将一个创意推演成不同媒介的测试方案吗？",
] as const;

export type AniConversationContext = {
  userCount: number;
  /** 对话中已展开林澈 / CYA 案例 */
  knowsCase: boolean;
  /** 对话中已聊毕设困境 */
  knowsThesis: boolean;
  /** 用户曾表达过加入 / 招募意向 */
  askedJoin: boolean;
  /** 可展示「加入」类跟进按钮（至少聊过案例 + 2 轮以上） */
  canOfferJoinPhrase: boolean;
  /** 可展示「招募码」类跟进（案例已聊透 + 至少 3 轮 + 已表达加入意向） */
  canOfferRecruitPhrase: boolean;
  /** 服务端 mock / 阶段 D：允许输出招募码 */
  canRevealRecruitCode: boolean;
};

function isJoinIntent(text: string): boolean {
  return /加入|招募|申请加入|我也想走|我想加入/.test(text);
}

function isRecruitCodeAsk(text: string): boolean {
  return /招募码|项目代码|项目码|代码是什么|招募代码/.test(text);
}

/** 根据完整对话历史判断当前进度（用于跟进按钮与服务端 mock） */
export function getAniConversationContext(
  messages: Array<{ role: "user" | "assistant"; content: string }>,
): AniConversationContext {
  const userMessages = messages.filter((m) => m.role === "user");
  const userCount = userMessages.length;
  const userText = userMessages.map((m) => m.content).join(" ");
  const assistantText = messages
    .filter((m) => m.role === "assistant" && m.content !== ANI_CHAT_WELCOME)
    .map((m) => m.content)
    .join(" ");
  const combined = userText + assistantText;

  const knowsCase =
    /林澈|creative yard|cya-p-2030|未命名之路|山海行灯|cya-0000/.test(combined.toLowerCase()) ||
    assistantText.includes("林澈");
  const knowsThesis =
    /退回|驳回|跨专业|推不动|选题/.test(userText) || assistantText.includes("退回");
  const askedJoin = userMessages.some((m) => isJoinIntent(m.content));
  const latestUser = userMessages[userMessages.length - 1]?.content ?? "";

  const canOfferJoinPhrase = knowsCase && userCount >= 2 && !askedJoin;
  const canOfferRecruitPhrase = knowsCase && userCount >= 3 && askedJoin;
  const canRevealRecruitCode =
    knowsCase &&
    userCount >= 3 &&
    (isJoinIntent(latestUser) || isRecruitCodeAsk(latestUser));

  return {
    userCount,
    knowsCase,
    knowsThesis,
    askedJoin,
    canOfferJoinPhrase,
    canOfferRecruitPhrase,
    canRevealRecruitCode,
  };
}

/** 对话进行中的跟进快捷问题（分阶段出现，避免一点即解锁） */
export function getAniFollowUpSuggestions(
  messages: Array<{ role: "user" | "assistant"; content: string }>,
  codeUnlocked: boolean,
): string[] {
  if (codeUnlocked) return [];

  const ctx = getAniConversationContext(messages);
  if (ctx.userCount === 0) return [];

  if (ctx.canOfferRecruitPhrase) {
    return ["招募码是什么？"];
  }

  if (ctx.canOfferJoinPhrase) {
    return ["林澈这条路径具体是怎么立项的？", "如果我想走类似的路，下一步是什么？"];
  }

  if (ctx.knowsCase || ctx.userCount >= 2) {
    return ["CYA-0000 和创作路径账户是什么关系？", "我还想了解林澈案例的细节"];
  }

  if (ctx.knowsThesis) {
    return ["林澈是怎么走通这条路的？", "创作路径账户是什么意思？"];
  }

  return ["我的毕设推进不顺，能帮我看看吗？", "可以先介绍一下优秀毕业案例吗？"];
}
