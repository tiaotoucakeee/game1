import { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";

export const metadata = { title: "全站搜索" };

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[900px] px-5 py-12 text-cuc-muted">搜索加载中…</div>
      }
    >
      <SearchPageClient />
    </Suspense>
  );
}
