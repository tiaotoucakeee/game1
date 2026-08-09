import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const base = "https://animation.cuc.edu.cn/_upload/tpl/02/7a/634/template634/";

const assets = [
  "images/cuc-anima-logo.svg",
  "images/burger-icon.svg",
  "images/arrow.svg",
  "images/cuc-anima-logo-background.svg",
  "images/white-arrow.svg",
  "images/cuc-anima-logo-white.svg",
  "images/right-arrow.svg",
  "images/cuc-anima-logo-background-red.svg",
  "images/right-arrow-white.svg",
  "images/621680763746_.jpg",
  "images/631680763750_.jpg",
  "images/6561681435034_-1.jpg",
  "images/20250315-1.png",
  "images/aniwow.jpg",
  "images/dap-jie-shao.jpg",
  "images/qu-xiao-jiang-xiang.jpg",
  "images/64265a80a039a72aab1dcf29_news-img-5.jpg",
  "images/642659ec71eb3dc3da3ca080_news-img-3.jpg",
  "images/6426590bafa01c300b3f252d_news-img-1.jpg",
  "images/642651456af7152759f2ed3d_news-img-6-p-1080.png",
  "images/play-button.svg",
  "images/bilibili.svg",
  "images/shipinghao.svg",
  "images/wechat.svg",
  "images/Instagram.svg",
  "images/icon_youtube.svg",
  "images/erweima.jpg",
  "images/favicon.png",
  "images/webclip.png",
  "video/15s-video.mp4",
];

async function downloadOne(relativePath) {
  const url = base + relativePath;
  const dest = join(root, "public", "cuc-anima", relativePath);
  await mkdir(dirname(dest), { recursive: true });

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log(`OK ${relativePath} (${buf.length} bytes)`);
}

async function runBatch(items, concurrency = 4) {
  const queue = [...items];
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length) {
      const item = queue.shift();
      if (!item) break;
      try {
        await downloadOne(item);
      } catch (err) {
        console.error(`FAIL ${item}:`, err.message);
      }
    }
  });
  await Promise.all(workers);
}

await runBatch(assets);
console.log("Done.");
