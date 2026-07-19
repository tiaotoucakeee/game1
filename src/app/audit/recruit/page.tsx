"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { OPEN_PATH_CODE } from "@/data/game";
import { useGame } from "@/lib/game-state";

export default function RecruitPage() {
  const router = useRouter();
  const { addClue, hasClue, setEnding, aniChatComplete } = useGame();
  const [code, setCode] = useState("");
  const [joined, setJoined] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (code.trim().toUpperCase() === OPEN_PATH_CODE) {
      addClue("open_path_code");
      setJoined(true);
      setEnding("next_path");
    } else {
      alert("项目代码错误。请在与 Ani AI 对话后获取。");
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] p-8 text-white">
      <div className="mx-auto max-w-[600px] py-12">
        <h1 className="text-2xl font-black text-[#e94560]">开放创作路径计划</h1>
        <p className="mt-2 text-gray-400">新成员招募 · 真结局</p>

        {!joined ? (
          <>
            <p className="mt-8 leading-relaxed text-gray-300">
              输入 Ani AI 提供的项目代码以加入跨媒介项目组。
            </p>
            {!aniChatComplete && (
              <p className="mt-4 text-amber-400 text-sm">
                请先完成个人学生系统中的 Ani AI 对话。
              </p>
            )}
            <form onSubmit={onSubmit} className="mt-8 flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="请输入 Ani 提供的招募码"
                className="flex-1 rounded border border-gray-600 bg-[#16213e] px-4 py-2 font-mono"
              />
              <button type="submit" className="rounded bg-[#e94560] px-6 py-2">
                加入
              </button>
            </form>
          </>
        ) : (
          <div className="mt-10 space-y-6">
            <h2 className="text-xl font-bold text-[#7dffb3]">结局三 ·《下一段路径》</h2>
            <p className="leading-relaxed">
              你已成功加入学院探索 AI 辅助跨媒介创作的新项目组。这一次，你不再只是旁观者，
              而成为这条创作路径的延续者。
            </p>
            <blockquote className="border-l-4 border-[#e94560] pl-4 italic">
              未来已来。愿我们始终守住最初想表达的那一点光，也拥有拥抱新工具的勇气。
              在尚未命名的道路上，继续探索，继续想象，继续创造。
              <br />
              <strong className="not-italic">下一段路径，由你开始。</strong>
            </blockquote>
          </div>
        )}

        <Link href="/audit/truth" className="mt-8 inline-block text-gray-400 underline">
          返回真相页
        </Link>
      </div>
    </div>
  );
}
