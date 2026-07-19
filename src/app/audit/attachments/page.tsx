"use client";

import type { ReactNode } from "react";
import { AuditGate } from "@/components/game/SystemGate";
import { ClueTrigger } from "@/components/game/ClueTrigger";
import { AuditLink, AuditPanel, WB } from "@/components/audit/auditWorkbenchStyles";

type ChatLine = {
  date: string;
  speaker: "林澈" | "韩老师";
  text: ReactNode;
};

const CHAT_RECORD: ChatLine[] = [
  {
    date: "2030-03-18",
    speaker: "林澈",
    text: "韩老师，我的毕设方向定了快一个月了，还是做不出来。分镜、叙事、技术对接……每条路都走不通，我是不是根本不适合做跨媒介？",
  },
  {
    date: "2030-03-18",
    speaker: "韩老师",
    text: "先别急着否定自己。跨媒介本来就没有标准答案，卡住说明你在认真想。先把最让你睡不着的那一块说出来，我们一块拆。",
  },
  {
    date: "2030-03-18",
    speaker: "林澈",
    text: "……动画镜头和漫画分镜怎么衔接，我想了十几版都不对。",
  },
  {
    date: "2030-03-18",
    speaker: "韩老师",
    text: "那就从一页分镜、一个镜头开始，别一口吃完。学院给你时间，我也还在。",
  },
  {
    date: "2030-04-22",
    speaker: "林澈",
    text: "韩老师！Ani AI 那边我试出来了——我把漫画分镜喂进去，它能帮我推镜头运动和媒介转换方案，今天终于跑通第一版了！",
  },
  {
    date: "2030-04-22",
    speaker: "韩老师",
    text: "不错。记住，AI 只是帮你试错，选哪条路还是你定。",
  },
  {
    date: "2030-04-22",
    speaker: "林澈",
    text: "明白！我继续往下做。",
  },
  {
    date: "2030-05-08",
    speaker: "林澈",
    text: "……实验室申请又被驳回了。数媒那边的渲染实验室我进不去，系统说我专业不符合，跨专业通道也没有。",
  },
  {
    date: "2030-05-08",
    speaker: "韩老师",
    text: (
      <>
        你别灰心。制度卡的是学籍标签，不是卡你的创作。我想个办法——可以建立一个
        <strong style={{ color: "#f56c6c" }}>「创作路径账号」</strong>
        ，不属于任何真实学生，专门用来走跨专业的资源调度。
      </>
    ),
  },
  {
    date: "2030-05-11",
    speaker: "林澈",
    text: "账号名用程野？Creative Yard Agent 的缩写……",
  },
  {
    date: "2030-05-12",
    speaker: "韩老师",
    text: (
      <>
        编号 <strong>CYA-0000</strong>，立项编码 <strong>CYA-P-2030-01</strong>
        。密码按老规矩：<strong>Creative Yard</strong> 连写，后面加 <strong>2030</strong>
        。你自己记住，别存明文。
      </>
    ),
  },
];

function AttachmentsContent() {
  return (
    <div className="audit-embed-page">
      <AuditPanel
        title="内部附件"
        action={
          <AuditLink href="/audit/project" style={{ fontSize: 12, textDecoration: "none" }}>
            ← 返回学生项目查询
          </AuditLink>
        }
      >
        <ClueTrigger id="ai_creative_path" />
        <ClueTrigger id="ai_cross_media" />

        <article
          style={{
            padding: 16,
            border: "1px solid #ebeef5",
            borderRadius: 2,
            marginBottom: 16,
          }}
        >
          <h3 style={{ margin: 0, fontWeight: 600 }}>林澈 · 跨媒介创作申请表（节选）</h3>
          <p style={{ margin: "12px 0 0", fontSize: 13, lineHeight: 1.7, color: "#606266" }}>
            本人希望借助 Ani AI 将漫画分镜发展为跨媒介叙事，但无法直接调用不同专业的课程与实验室资源…
          </p>
        </article>

        <article
          style={{
            padding: 16,
            border: "1px solid #ebeef5",
            borderLeft: "4px solid #409eff",
            borderRadius: 2,
          }}
        >
          <h3 style={{ margin: 0, fontWeight: 600 }}>韩老师 · 内部聊天记录</h3>
          <div style={{ marginTop: 12, fontFamily: "monospace", fontSize: 13, lineHeight: 1.8 }}>
            {CHAT_RECORD.map((line, index) => (
              <p
                key={`${line.date}-${line.speaker}-${index}`}
                style={{ margin: index < CHAT_RECORD.length - 1 ? "0 0 10px" : 0 }}
              >
                <span style={WB.muted}>[{line.date}]</span> {line.speaker}：{line.text}
              </p>
            ))}
          </div>
        </article>
      </AuditPanel>
    </div>
  );
}

export default function AuditAttachmentsPage() {
  return (
    <AuditGate>
      <AttachmentsContent />
    </AuditGate>
  );
}
