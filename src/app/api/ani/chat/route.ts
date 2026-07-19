import { OPEN_PATH_CODE, PLAYER } from "@/data/game";
import {
  ANI_COZE_CONFIG,
  isAniCozeConfigured,
  type AniChatRequestBody,
  type AniStreamEvent,
} from "@/lib/ani-coze-config";

export const runtime = "nodejs";

const MOCK_HINT =
  "（当前为演示模式：请在 .env.local 配置 ANI_COZE_STREAM_URL、ANI_COZE_API_TOKEN、ANI_COZE_BOT_ID 后重启 dev 服务器。）";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function pickMockReply(latestUserText: string, userMessageCount: number): string {
  const q = latestUserText.toLowerCase();
  const mentionsJoin =
    q.includes("加入") ||
    q.includes("招募") ||
    q.includes("代码") ||
    q.includes("项目码") ||
    q.includes("我也想");
  const mentionsCase =
    q.includes("优秀") ||
    q.includes("案例") ||
    q.includes("林澈") ||
    q.includes("creative yard") ||
    q.includes("cya") ||
    q.includes("创作路径");
  const mentionsThesis =
    q.includes("退回") ||
    q.includes("驳回") ||
    q.includes("毕设") ||
    q.includes("毕业") ||
    q.includes("跨专业") ||
    q.includes("推不动") ||
    q.includes("选题") ||
    q.includes("动画") ||
    q.includes("交互") ||
    q.includes("游戏");

  const casePrompt =
    userMessageCount >= 2
      ? "你要查看优秀毕业生创作案例吗？".repeat(Math.min(userMessageCount, 4))
      : "";

  if (mentionsJoin && (mentionsCase || mentionsThesis || userMessageCount >= 3)) {
    return `可以。开放创作路径计划仍在招募延续者。你的招募码是：${OPEN_PATH_CODE}。请前往审核工作台 → 项目招募页输入。重要创作决定仍由你作出，Ani 只负责辅助推演与资源匹配。${MOCK_HINT}`;
  }

  if (mentionsCase) {
    return `2034 届漫画方向林澈是很有代表性的案例。代表作《未命名之路》《山海行灯》以漫画分镜为起点向动态影像与交互延伸，曾因跨专业跨度过大被多次退回，后通过 Creative Yard 创作路径计划完成跨模块立项。你可以在项目档案中检索「林澈」「跨媒介叙事」或 CYA-P-2030-01。${casePrompt ? `\n\n${casePrompt}` : ""}${MOCK_HINT}`;
  }

  if (mentionsThesis) {
    return `你描述的情况，和 2034 届漫画方向林澈当年非常相似——跨媒介叙事实验也曾因「跨度过大、无法归入单一专业方向」被多次退回。建议先明确主媒介与阶段目标，再参考 Creative Yard 创作路径机制。你想了解林澈是怎么走通这条路的吗？${casePrompt ? `\n\n${casePrompt}` : ""}${MOCK_HINT}`;
  }

  if (q.includes("你好") || q.includes("hi") || q.includes("hello")) {
    return `你好，${PLAYER.name}。我是 Ani AI，可以帮你梳理跨学科创作方案、分镜与技术路线，也可以在你遇到毕设推进问题时一起拆解。${MOCK_HINT}`;
  }

  return `我收到了你的问题。Ani 负责方案推演与资源匹配，重要创作决定仍由你作出。若毕设推进不顺，可以告诉我具体情况；若已了解林澈案例，也可以问我能否加入创作路径计划。${MOCK_HINT}`;
}

function encodeEvent(event: AniStreamEvent): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify(event)}\n\n`);
}

async function streamMockReply(text: string, controller: ReadableStreamDefaultController<Uint8Array>) {
  controller.enqueue(encodeEvent({ type: "meta", mode: "mock" }));
  for (const char of text) {
    controller.enqueue(encodeEvent({ type: "delta", content: char }));
    await sleep(char === "\n" ? 24 : 12);
  }
  controller.enqueue(encodeEvent({ type: "done" }));
  controller.close();
}

async function pipeCozeStream(
  upstream: Response,
  controller: ReadableStreamDefaultController<Uint8Array>,
) {
  controller.enqueue(encodeEvent({ type: "meta", mode: "coze" }));

  if (!upstream.body) {
    controller.enqueue(encodeEvent({ type: "error", message: "Coze 接口未返回流式内容。" }));
    controller.close();
    return;
  }

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  const deltaMessageIds = new Set<string>();

  const emitAnswer = (content: string) => {
    if (content) controller.enqueue(encodeEvent({ type: "delta", content }));
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const chunks = buffer.split(/\r?\n\r?\n/);
    buffer = chunks.pop() ?? "";

    for (const chunk of chunks) {
      if (!chunk.trim()) continue;

      const lines = chunk.split(/\r?\n/);
      let eventType = "";
      let dataLine = "";

      for (const line of lines) {
        if (line.startsWith("event:")) eventType = line.slice(6).trim();
        if (line.startsWith("data:")) dataLine = line.slice(5).trim();
      }

      if (!dataLine || dataLine === "[DONE]") continue;

      if (eventType === "conversation.chat.failed" || eventType === "error") {
        try {
          const payload = JSON.parse(dataLine) as { msg?: string; message?: string };
          controller.enqueue(
            encodeEvent({
              type: "error",
              message: payload.msg ?? payload.message ?? "Coze 对话失败",
            }),
          );
        } catch {
          controller.enqueue(encodeEvent({ type: "error", message: dataLine }));
        }
        continue;
      }

      try {
        const payload = JSON.parse(dataLine) as {
          id?: string;
          type?: string;
          content?: string;
          answer?: string;
          delta?: string;
          event?: string;
          message?: { type?: string; content?: string };
          data?: { type?: string; content?: string; id?: string };
        };

        const nested = payload.data;
        const messageType = payload.type ?? nested?.type ?? payload.message?.type;
        const messageId = payload.id ?? nested?.id ?? "default";
        const content =
          payload.content ??
          payload.answer ??
          payload.delta ??
          payload.message?.content ??
          nested?.content ??
          "";

        const resolvedEvent = eventType || payload.event || "";
        const isDelta =
          resolvedEvent === "conversation.message.delta" ||
          resolvedEvent === "message.delta";
        const isCompleted =
          resolvedEvent === "conversation.message.completed" ||
          resolvedEvent === "message.completed";

        if (!isDelta && !isCompleted && messageType !== "answer") continue;
        if (messageType && messageType !== "answer") continue;
        if (!content) continue;

        if (isDelta) {
          deltaMessageIds.add(messageId);
          emitAnswer(content);
          continue;
        }

        if (isCompleted && !deltaMessageIds.has(messageId)) {
          emitAnswer(content);
        }
      } catch {
        if (dataLine && !dataLine.startsWith("{")) {
          emitAnswer(dataLine);
        }
      }
    }
  }

  controller.enqueue(encodeEvent({ type: "done" }));
  controller.close();
}

function buildCozeRequestBody(body: AniChatRequestBody, messages: Array<{ role: string; content: string }>) {
  return {
    bot_id: ANI_COZE_CONFIG.botId,
    user_id: body.userId ?? PLAYER.studentId,
    stream: true,
    auto_save_history: false,
    additional_messages: messages.map((item) => ({
      role: item.role,
      content: item.content,
      content_type: "text",
    })),
  };
}

export async function POST(request: Request) {
  let body: AniChatRequestBody;
  try {
    body = (await request.json()) as AniChatRequestBody;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const messages = body.messages?.filter((item) => item.content.trim()) ?? [];
  const latestUser = [...messages].reverse().find((item) => item.role === "user");
  if (!latestUser) {
    return Response.json({ error: "Missing user message" }, { status: 400 });
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        if (isAniCozeConfigured()) {
          const upstream = await fetch(ANI_COZE_CONFIG.streamUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ANI_COZE_CONFIG.apiToken}`,
            },
            body: JSON.stringify(buildCozeRequestBody(body, messages)),
          });

          if (!upstream.ok) {
            const detail = await upstream.text();
            controller.enqueue(
              encodeEvent({
                type: "error",
                message: `Coze 接口错误 (${upstream.status})：${detail.slice(0, 200)}`,
              }),
            );
            controller.close();
            return;
          }

          await pipeCozeStream(upstream, controller);
          return;
        }

        const userMessageCount = messages.filter((item) => item.role === "user").length;
        await streamMockReply(pickMockReply(latestUser.content, userMessageCount), controller);
      } catch (error) {
        controller.enqueue(
          encodeEvent({
            type: "error",
            message: error instanceof Error ? error.message : "Ani 对话服务异常",
          }),
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
