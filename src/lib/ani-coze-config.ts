/**
 * Coze 智能体接入配置（稍后填入调试好的 URL 与 Token）
 *
 * ANI_COZE_STREAM_URL  — 流式对话接口地址（POST）
 * ANI_COZE_API_TOKEN   — Bearer Token（仅服务端使用）
 * ANI_COZE_BOT_ID      — Bot ID（Coze 开发页 URL 中 /bot/ 后的数字）
 */
export const ANI_COZE_CONFIG = {
  streamUrl: process.env.ANI_COZE_STREAM_URL ?? "",
  apiToken: process.env.ANI_COZE_API_TOKEN ?? "",
  botId: process.env.ANI_COZE_BOT_ID ?? "",
};

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

export type AniStreamEvent =
  | { type: "meta"; mode: "coze" | "mock" }
  | { type: "delta"; content: string }
  | { type: "done" }
  | { type: "error"; message: string };

/** 开场预设问题（Coze 开场白快捷回复） */
export const ANI_CHAT_SUGGESTIONS = [
  "可以帮我将一个创意推演成不同媒介的测试方案吗？",
  "给我推荐一个好的动院课程吧！",
  "快速生成动画、游戏、影像、交互原型",
  "需要，请展示优秀毕业创作案例",
] as const;
