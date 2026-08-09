import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(
  __dirname,
  "../public/cuc-anima/images/about/gaigeqi-timeline.png"
);

const WIDTH = 1573;
const HEIGHT = 900;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <style>
      .title {
        font-family: "Mulish", "PingFang SC", "Microsoft YaHei", "SimHei", sans-serif;
        font-size: 52px;
        font-weight: 900;
        fill: #343a40;
      }
      .year {
        font-family: "Mulish", "PingFang SC", "Microsoft YaHei", "SimHei", sans-serif;
        font-size: 96px;
        font-weight: 800;
        fill: #b7b7b7;
      }
      .desc {
        font-family: "Mulish", "PingFang SC", "Microsoft YaHei", "SimHei", sans-serif;
        font-size: 26px;
        font-weight: 600;
        fill: #da2128;
        line-height: 1.75;
      }
    </style>
  </defs>

  <text x="${WIDTH / 2}" y="90" text-anchor="middle" class="title">改革期</text>

  <text x="120" y="340" class="year">2030</text>
  <foreignObject x="720" y="250" width="720" height="220">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Mulish, 'PingFang SC', 'Microsoft YaHei', SimHei, sans-serif; font-size: 26px; font-weight: 600; line-height: 1.75; color: #da2128;">
      · 开始打破以单一专业划分课程与资源的传统模式，形成动画创作、数字媒体艺术、智能交互技术、虚拟影像叙事、数字文创策划和传媒交互工程等培养方向。
    </div>
  </foreignObject>

  <text x="${WIDTH - 120}" y="680" text-anchor="end" class="year">2032</text>
  <foreignObject x="120" y="590" width="720" height="120">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Mulish, 'PingFang SC', 'Microsoft YaHei', SimHei, sans-serif; font-size: 26px; font-weight: 600; line-height: 1.75; color: #da2128;">
      · 启用的“Ani AI”智能教学与创作辅助系统
    </div>
  </foreignObject>
</svg>`;

const svgPath = join(__dirname, "../public/cuc-anima/images/about/gaigeqi-timeline.svg");
writeFileSync(svgPath, svg, "utf8");

await sharp(Buffer.from(svg))
  .png()
  .toFile(outPath);

console.log("Wrote", outPath);
