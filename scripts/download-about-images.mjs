import fs from "fs";
import path from "path";

const root = path.resolve(".");
const outDir = path.join(root, "public/cuc-anima/images/about");
const base =
  "https://animation.cuc.edu.cn/_upload/tpl/02/7a/634/template634/";
const ua =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const files = [
  "images/chuchuangqis-p-2000.png",
  "images/fazhanqis-p-2000.png",
  "images/shouhuoqis-p-2000.png",
  "images/fact-img-circle.svg",
  "images/fact-img-logo.svg",
  "images/1.png",
  "images/1-2.png",
  "images/1-3.png",
  "images/2-1.png",
  "images/2-2.png",
  "images/2-3.png",
  "images/3-1.png",
  "images/3-2.png",
  "images/3-3.png",
  "images/WeChatcf61c6a611aa5937e42fafb822f20337-1.jpg",
  "images/qiangshitou.jpg",
  "images/WeChat4d1daa41b27c9a80268562d92665b2b3-1.jpg",
  "images/WeChat19536040ce74a95605da151f37043778-1.png",
  "images/WeChat8bd286d35875124650748da867554ae5-1.jpg",
  "images/image-4.jpg",
  "images/WeChatce7b2b3b6ee26e10d6a5193527c42fde-1.png",
  "images/chunhua.jpg",
];

fs.mkdirSync(outDir, { recursive: true });

for (const file of files) {
  const name = file.replace(/^images\//, "");
  const target = path.join(outDir, name);
  if (fs.existsSync(target) && fs.statSync(target).size > 0) {
    console.log(`skip ${name}`);
    continue;
  }
  const res = await fetch(`${base}${file}`, { headers: { "User-Agent": ua } });
  if (!res.ok) {
    console.error(`FAIL ${name} ${res.status}`);
    continue;
  }
  fs.writeFileSync(target, Buffer.from(await res.arrayBuffer()));
  console.log(`OK ${name}`);
}
