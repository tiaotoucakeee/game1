import { OPEN_PATH_CODE, PLAYER } from "@/data/game";
import {
  ANI_COZE_CONFIG,
  ANI_KIMI_CONFIG,
  getAniConversationContext,
  isAniCozeConfigured,
  isAniKimiConfigured,
  type AniChatRequestBody,
  type AniStreamEvent,
} from "@/lib/ani-coze-config";
import { getAniSystemPrompt } from "@/lib/ani-system-prompt";

export const runtime = "nodejs";

const MOCK_HINT =
  "（当前为演示模式：服务端未配置 ANI_KIMI_API_KEY 或 Coze 环境变量。）";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function pickMockReply(
  latestUserText: string,
  messages: Array<{ role: "user" | "assistant"; content: string }>,
): string {
  const q = latestUserText.toLowerCase();
  const ctx = getAniConversationContext(messages);
  const mentionsJoin =
    q.includes("加入") ||
    q.includes("招募") ||
    q.includes("我也想") ||
    q.includes("申请加入");
  const mentionsRecruitCode =
    q.includes("招募码") || q.includes("项目代码") || q.includes("项目码") || q.includes("代码是什么");
  const mentionsCase =
    q.includes("优秀") ||
    q.includes("案例") ||
    q.includes("林澈") ||
    q.includes("creative yard") ||
    q.includes("cya") ||
    q.includes("创作路径") ||
    q.includes("路径账户") ||
    q.includes("关系") ||
    q.includes("细节") ||
    q.includes("立项");
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
    q.includes("游戏") ||
    q.includes("推演") ||
    q.includes("媒介");

  const joinNudgeLate =
    "若你已经了解林澈案例，并确实想继续，可以明确告诉我：「我想加入创作路径计划」。";

  if ((mentionsJoin || mentionsRecruitCode) && ctx.canRevealRecruitCode) {
    return `可以。开放创作路径计划仍在招募延续者，创作路径账户面向愿意跨专业创作的延续者开放。你的招募码是：${OPEN_PATH_CODE}。请继续完成审核调查；在审核工作台最终提交结论时，系统将识别该码并向你发出特殊邀请。重要创作决定仍由你作出，Ani 只负责辅助推演与资源匹配。${MOCK_HINT}`;
  }

  if (mentionsJoin || mentionsRecruitCode) {
    if (!ctx.knowsCase) {
      return `加入创作路径计划前，建议先了解 2034 届林澈的案例——他也是从跨专业困境里走出路的。你可以问我：「林澈的毕设是怎么通过审核的？」${MOCK_HINT}`;
    }
    if (ctx.userCount < 3) {
      return `你已经开始接触这条路径了。不妨再多聊一轮：问问林澈如何立项、CYA-0000 与创作路径账户的关系。等你真正了解案例后，再告诉我「我想加入创作路径计划」。${MOCK_HINT}`;
    }
    return `我理解你的意向。请先确认你已经读过林澈与 Creative Yard 的案例要点；若仍希望加入，请直接说：「我想加入创作路径计划」。${MOCK_HINT}`;
  }

  if (mentionsCase || ctx.knowsCase) {
    const tail = ctx.userCount >= 2 ? `\n\n${joinNudgeLate}` : "";
    return `2034 届漫画方向林澈是很有代表性的案例。代表作《未命名之路》《山海行灯》以漫画分镜为起点向动态影像与交互延伸，曾因跨专业跨度过大被多次退回，后通过 Creative Yard 创作路径计划与创作路径账户（CYA-0000）完成跨模块立项。你可以在项目档案中检索「林澈」「跨媒介叙事」或 CYA-P-2030-01。${tail}${MOCK_HINT}`;
  }

  if (mentionsThesis) {
    return `你描述的情况，和 2034 届漫画方向林澈当年非常相似——跨媒介叙事实验也曾因「跨度过大、无法归入单一专业方向」被多次退回。建议先明确主媒介与阶段目标，再参考 Creative Yard 创作路径机制。\n\n你想了解林澈是怎么走通这条路的吗？${MOCK_HINT}`;
  }

  if (q.includes("你好") || q.includes("hi") || q.includes("hello")) {
    return `你好，${PLAYER.name}。我是 Ani AI，可以帮你梳理跨学科创作方案、分镜与技术路线。若毕设推进不顺，可以告诉我具体情况；若想了解往届路径，也可以先看林澈的案例。${MOCK_HINT}`;
  }

  return `我收到了你的问题。Ani 负责方案推演与资源匹配，重要创作决定仍由你作出。若毕设推进不顺，可以告诉我；若想走跨专业路径，建议先从林澈案例问起。${MOCK_HINT}`;
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

async function pipeOpenAICompatibleStream(
  upstream: Response,
  controller: ReadableStreamDefaultController<Uint8Array>,
  mode: "kimi",
) {
  controller.enqueue(encodeEvent({ type: "meta", mode }));

  if (!upstream.body) {
    controller.enqueue(encodeEvent({ type: "error", message: "Kimi 接口未返回流式内容。" }));
    controller.close();
    return;
  }

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const emitAnswer = (content: string) => {
    if (content) controller.enqueue(encodeEvent({ type: "delta", content }));
  };

  while (true) {
    const { done, value } = await reader.read();
    if (value) {
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;

        const dataLine = trimmed.slice(5).trim();
        if (!dataLine || dataLine === "[DONE]") continue;

        try {
          const payload = JSON.parse(dataLine) as {
            choices?: Array<{ delta?: { content?: string }; message?: { content?: string } }>;
            error?: { message?: string };
          };

          if (payload.error?.message) {
            controller.enqueue(encodeEvent({ type: "error", message: payload.error.message }));
            continue;
          }

          const delta = payload.choices?.[0]?.delta?.content;
          const message = payload.choices?.[0]?.message?.content;
          emitAnswer(delta ?? message ?? "");
        } catch {
          // ignore malformed chunks
        }
      }
    }
    if (done) break;
  }

  if (buffer.trim()) {
    const trimmed = buffer.trim();
    if (trimmed.startsWith("data:")) {
      const dataLine = trimmed.slice(5).trim();
      if (dataLine && dataLine !== "[DONE]") {
        try {
          const payload = JSON.parse(dataLine) as {
            choices?: Array<{ delta?: { content?: string }; message?: { content?: string } }>;
          };
          const delta = payload.choices?.[0]?.delta?.content;
          const message = payload.choices?.[0]?.message?.content;
          emitAnswer(delta ?? message ?? "");
        } catch {
          /* ignore */
        }
      }
    }
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

function buildKimiMessages(messages: Array<{ role: string; content: string }>) {
  return [
    { role: "system" as const, content: getAniSystemPrompt() },
    ...messages.map((item) => ({
      role: item.role as "user" | "assistant",
      content: item.content,
    })),
  ];
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
        if (isAniKimiConfigured()) {
          const upstream = await fetch(`${ANI_KIMI_CONFIG.baseUrl}/chat/completions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ANI_KIMI_CONFIG.apiKey}`,
            },
            body: JSON.stringify({
              model: ANI_KIMI_CONFIG.model,
              messages: buildKimiMessages(messages),
              stream: true,
              temperature: 0.7,
            }),
            signal: AbortSignal.timeout(120_000),
          });

          if (!upstream.ok) {
            const detail = await upstream.text();
            controller.enqueue(
              encodeEvent({
                type: "error",
                message: `Kimi 接口错误 (${upstream.status})：${detail.slice(0, 200)}`,
              }),
            );
            controller.close();
            return;
          }

          await pipeOpenAICompatibleStream(upstream, controller, "kimi");
          return;
        }

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

        await streamMockReply(pickMockReply(latestUser.content, messages), controller);
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
