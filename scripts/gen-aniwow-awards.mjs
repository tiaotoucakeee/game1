import fs from "node:fs";

const surnames =
  "王李张刘陈杨黄赵周吴徐孙马朱胡郭何高林罗郑梁谢宋唐许韩冯邓曹彭曾肖田董袁潘于蒋蔡余杜叶程苏魏吕丁任沈姚卢姜崔钟谭陆汪范金石廖贾夏韦付方白邹孟熊秦邱江尹薛闫段雷侯龙史陶黎贺顾毛郝龚邵万钱严覃武戴莫孔向汤".split(
    "",
  );
const given1 =
  "梓子雨思梦嘉欣语晨若诗锦书安沐一乐天承泽宇铭瑞景文可心佳明晓清逸凡亦以知昕奕皓昊博阳朗悦依诺伊菲妍萱涵彤琪琳瑶婷雯薇岚澈然霖轩航毅恒诚善和正平宁静远志成达进启元华学修德仁义礼智信".split(
    "",
  );
const given2 =
  "涵轩宁然彤瑶琳琪雯菲妍萱悦欣怡佳晴雪冰月星云风林森江河海山岳川原野田园禾苗竹松柏梅兰菊荷莲桃李杏梨橙柚樱棠栀茉芷若苏青紫蓝绿白红彤丹朱赤玄墨书画音韵歌舞诗词章句言语声色光影梦幻灵魂神仙圣贤君民士师友朋伴侣亲情爱恋念思想怀忆望盼期待希冀愿祝福禄寿喜财运吉祥瑞祺嘉懿美好善真纯洁净清新鲜活生长成成熟丰盛隆兴旺发达通顺利益功名誉荣耀辉煌灿烂绚丽秀雅致精巧妙奇特异常超越卓越优良卓著显赫尊贵高尚伟大强壮健康安泰平和顺畅通达明亮光明".split(
    "",
  );

const used = new Set();

function randomName() {
  for (let i = 0; i < 500; i++) {
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    const given =
      (Math.random() > 0.45
        ? given1[Math.floor(Math.random() * given1.length)]
        : "") + given2[Math.floor(Math.random() * given2.length)];
    const name = surname + given;
    if (name.length >= 2 && name.length <= 4 && !used.has(name)) {
      used.add(name);
      return name;
    }
  }
  return `选手${used.size}`;
}

const groups = [
  { category: "动画漫画类", counts: { 一等奖: 9, 二等奖: 30, 三等奖: 47 } },
  { category: "游戏电竞类", counts: { 一等奖: 5, 二等奖: 15, 三等奖: 27 } },
  { category: "数字媒体类", counts: { 一等奖: 9, 二等奖: 30, 三等奖: 45 } },
];

const entries = [];
for (const group of groups) {
  for (const [award, count] of Object.entries(group.counts)) {
    for (let i = 0; i < count; i++) {
      entries.push({
        name: randomName(),
        award,
        category: group.category,
      });
    }
  }
}

const file = `export type AniwowAwardEntry = {
  name: string;
  award: "一等奖" | "二等奖" | "三等奖";
  category: "动画漫画类" | "游戏电竞类" | "数字媒体类";
};

export const aniwowAward2030Page = {
  title:
    "【Aniwow!2030】第三十五届中国（北京）国际大学生动画节「小白杨奖」高中生竞赛单元获奖名单公布",
  date: "2030-07-18",
  intro:
    "本次大赛经过初赛、决赛两轮专家评审，现公布大赛最终获奖名单。获奖证书将于 8 月中下旬寄出，邮寄地址来源于【Aniwow!2030】第三十五届中国（北京）国际大学生动画节「小白杨奖」高中生竞赛单元系统填写信息，届时请注意查收。",
  footerLines: [
    "[Aniwow!2030]",
    "第三十五届中国（北京）国际大学生动画节组委会",
    "中国传媒大学动画与数字艺术学院",
    "2030 年 7 月 18 日",
  ],
} as const;

export const aniwowAward2030Entries: AniwowAwardEntry[] = ${JSON.stringify(entries, null, 2)};
`;

fs.writeFileSync("src/data/cuc-anima-aniwow-award-2030.ts", file, "utf8");
console.log(`Wrote ${entries.length} entries`);
