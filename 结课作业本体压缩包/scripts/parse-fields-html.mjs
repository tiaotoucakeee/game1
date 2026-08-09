import fs from "fs";
import path from "path";

const htmlPath = path.resolve(
  "docs/research/animation.cuc.edu.cn/fields-zh.html",
);
const html = fs.readFileSync(htmlPath, "utf8");

const categoryMap = {
  "student-work": "学生作品",
  "teacher-work": "教师作品",
  "pc-game": "PC游戏",
  "vr-series": "VR互动剧集",
  "vr-short": "VR短片",
  "interactive-device": "交互装置",
  "anima-series": "动画剧集",
  "anima-film": "动画电影",
  "anima-short": "动画短片",
  "realistic-series": "实拍剧集",
  "realistic-film": "实拍电影",
  "realistic-short": "实拍短片",
  "mobile-app": "手机应用",
  manga: "漫画",
  documentary: "纪录片",
};

function stripHtml(value) {
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractRichSections(popupHtml) {
  const sections = [];
  const re =
    /<div class="film-rich-text w-richtext">([\s\S]*?)<\/div>\s*(?=<div class="film-rich-text|<div class="w-richtext|<\/div>\s*<\/div>\s*<\/div>\s*<div|$)/g;
  let match;
  while ((match = re.exec(popupHtml))) {
    const block = match[1];
    const heading = block.match(/<h4>([^<]+)<\/h4>/);
    const title = heading?.[1]?.replace(/：$/, "") ?? "详情";
    const body = stripHtml(block.replace(/<h4>[^<]+<\/h4>/g, ""));
    if (body) sections.push({ title, body });
  }

  const qrMatch = popupHtml.match(
    /<div class="w-richtext">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<div/,
  );
  if (qrMatch) {
    const qrBlock = qrMatch[1];
    const qrHeading = qrBlock.match(/<h4>([^<]+)<\/h4>/);
    const qrImg = qrBlock.match(/<img src="([^"]+)"/);
    if (qrHeading || qrImg) {
      sections.push({
        title: qrHeading?.[1]?.replace(/：$/, "") ?? "播放二维码",
        qrImage: qrImg?.[1],
      });
    }
  }

  return sections;
}

const wrappers = [...html.matchAll(/class="field-click-card-wrapper"/g)];
const items = [];

for (const m of wrappers) {
  const start = Math.max(0, m.index - 200);
  const chunk = html.slice(start, m.index + 12000);
  const dataCategory = chunk.match(/data-category="([^"]+)"/)?.[1] ?? "";
  const popupStart = chunk.indexOf('class="click-card-click-to-pop-up"');
  const popupEnd = chunk.indexOf('class="field-click-card"');
  const popupHtml = chunk.slice(popupStart, popupEnd);

  const title = popupHtml.match(/<h2 class="film-heading">([^<]+)<\/h2>/)?.[1]?.trim();
  const year = popupHtml.match(/<div class="text-block-3">([^<]+)<\/div>/)?.[1]?.trim();
  const popupImage = popupHtml.match(
    /<img\s+src="([^"]+)"[^>]*class="film-img"/,
  )?.[1];
  const cardHtml = chunk.slice(popupEnd);
  const cardImage = cardHtml.match(/class="field-click-card"[\s\S]*?src="([^"]+)"/)?.[1];
  const category1 = cardHtml.match(/category1-in-card">\s*<div>([^<]+)<\/div>/)?.[1]?.trim();
  const category2 = cardHtml.match(/category2-in-card">\s*<div>([^<]+)<\/div>/)?.[1]?.trim();
  const creditsHtml = popupHtml.match(
    /<div class="film-rich-text w-richtext">([\s\S]*?)<\/div>\s*<div class="film-rich-text/,
  )?.[1];
  const credits = creditsHtml
    ? stripHtml(creditsHtml)
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

  const tags = dataCategory.split(/\s+/).filter(Boolean);
  items.push({
    id: title?.replace(/\s+/g, "-").toLowerCase() ?? `item-${items.length}`,
    title,
    year,
    cardImage,
    popupImage: popupImage ?? cardImage,
    category1,
    category2,
    audienceTag: tags.find((t) => t.endsWith("-work")) ?? "",
    typeTag: tags.find((t) => !t.endsWith("-work")) ?? "",
    credits,
    sections: extractRichSections(popupHtml),
  });
}

const outPath = path.resolve("src/data/cuc-anima-fields.json");
fs.writeFileSync(outPath, JSON.stringify({ categoryMap, items }, null, 2), "utf8");
console.log(`Wrote ${items.length} items to ${outPath}`);
