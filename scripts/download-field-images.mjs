import fs from "fs";
import path from "path";

const root = path.resolve(".");
const json = JSON.parse(
  fs.readFileSync(path.join(root, "src/data/cuc-anima-fields.json"), "utf8"),
);
const outDir = path.join(root, "public/cuc-anima/images/fields");
const base =
  "https://animation.cuc.edu.cn/_upload/tpl/02/7a/634/template634/";
const ua =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const images = new Set();
for (const item of json.items) {
  images.add(item.cardImage.replace(/^images\//, ""));
  images.add(item.popupImage.replace(/^images\//, ""));
  for (const section of item.sections) {
    if (section.qrImage) images.add(section.qrImage.replace(/^images\//, ""));
  }
}

fs.mkdirSync(outDir, { recursive: true });

let ok = 0;
let fail = 0;
for (const file of images) {
  const target = path.join(outDir, file);
  if (fs.existsSync(target) && fs.statSync(target).size > 0) {
    ok++;
    continue;
  }
  const res = await fetch(`${base}images/${file}`, {
    headers: { "User-Agent": ua },
  });
  if (!res.ok) {
    console.error(`FAIL ${file} ${res.status}`);
    fail++;
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(target, buf);
  console.log(`OK ${file}`);
  ok++;
}

console.log(`Done: ${ok} ok, ${fail} fail, ${images.size} total`);
