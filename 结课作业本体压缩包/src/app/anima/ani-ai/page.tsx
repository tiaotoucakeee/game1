import Link from "next/link";
import { ClueTrigger } from "@/components/game/ClueTrigger";

export const metadata = { title: "Ani AI 智能畅课平台" };

export default function AniAiPage() {
  return (
    <div className="mx-auto max-w-[900px] px-5 py-12">
      <ClueTrigger id="ai_ani_platform" />
      <h1 className="text-3xl font-black text-cuc-red">Ani AI 智能畅课平台</h1>
      <p className="mt-2 text-cuc-muted">2030 起启用 · 学院 AI 辅助创作系统</p>

      <div className="mt-8 space-y-6 leading-relaxed">
        <section className="rounded border border-cuc-border p-6">
          <h2 className="font-bold">功能模块</h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm">
            <li>创意拆解：叙事 / 角色 / 影像 / 交互 / 技术</li>
            <li>媒介转换：漫画分镜 → 动态预览 → 交互原型</li>
            <li>课程匹配：跨实验室资源与权限推荐</li>
            <li>原型测试：快速生成可验证的技术方案</li>
          </ul>
        </section>

        <section className="rounded border border-cuc-border bg-gray-50 p-6">
          <h2 className="font-bold">优秀辅助创作案例（部分打码）</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="rounded bg-white p-4">
              <div className="font-medium">案例 A · 跨媒介叙事实验</div>
              <div className="mt-1 text-cuc-muted">发起人：林* · 指导：韩*</div>
              <div className="mt-2 font-mono text-xs text-red-600">[CYA-████ 路径记录已归档]</div>
            </div>
            <div className="rounded bg-white p-4">
              <div className="font-medium">案例 B · 实时影像交互</div>
              <div className="mt-1 text-cuc-muted">媒介推演由 Ani AI 完成，创作决策由学生团队完成</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-cuc-muted">
            搜索「跨媒介叙事」可找到更多内部关联资料（需审核权限）。
          </p>
        </section>

        <p className="text-sm">
          <strong>重要说明：</strong>Ani AI 负责拓展创作可能，作品的主题、审美判断和最终表达仍由学生决定。
        </p>

        <Link href="/anima/search?q=跨媒介叙事" className="text-cuc-blue underline">
          搜索：跨媒介叙事
        </Link>
      </div>
    </div>
  );
}
