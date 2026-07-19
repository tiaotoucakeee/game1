import { siteAssets } from "@/data/cuc-anima";
import { NEWS_ARTICLES } from "@/data/game";

const asset = (path: string) => `/cuc-anima/${path}`;

export const newsPageIntro =
  "中国传媒大学动画与数字艺术学院近期新闻与作品动态（2030 专业改革期）。";

export type SiteNewsFeedItem = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  href: string;
  external?: boolean;
};

const gameNewsImages: Record<string, string> = {
  "innovation-award-2034": asset("images/innovation-award-2034.png"),
  "future-media-2033": asset("images/aniwow.jpg"),
  "ani-ai-launch": asset("images/ani-ai-campus.png"),
};

/** 原首页轮播中的学院新闻，日期统一调整至 2030 年前后 */
const legacyHomeNews: SiteNewsFeedItem[] = [
  {
    slug: "virtual-production-2030",
    title: "中传虚拟制作全流程实战特训营——探索前沿科技，打造未来影视创作者",
    date: "2030-03-15",
    excerpt: "「虚拟制作全流程实战特训营」火热招生中！",
    image: asset("images/20250315-1.png"),
    href: "/anima/news/virtual-production-2030",
  },
  {
    slug: "aniwow-award-2030",
    title:
      "【Aniwow!2030】第三十五届中国（北京）国际大学生动画节「小白杨奖」高中生竞赛单元获奖名单公布",
    date: "2030-07-18",
    excerpt: "本次大赛经过初赛、决赛两轮专家评审，现公布大赛最终获奖名单。",
    image: asset("images/aniwow.jpg"),
    href: "/anima/news/aniwow-award-2030",
  },
  {
    slug: "aniwow-final-2030",
    title:
      "【Aniwow!2030】第三十五届中国（北京）国际大学生动画节「小白杨奖」高中生竞赛单元入选决赛名单及决赛安排",
    date: "2030-05-12",
    excerpt:
      "本次大赛征集的作品经过专家评审，现公布入选决赛名单。入选决赛的选手需提交决赛考核材料，具体要求见附件。",
    image: asset("images/aniwow.jpg"),
    href: "/anima/news/aniwow-final-2030",
  },
];

const gameNewsFeed: SiteNewsFeedItem[] = NEWS_ARTICLES.filter(
  (article) => !article.hiddenFromFeed,
).map((article) => ({
  slug: article.slug,
  title: article.title,
  date: article.date,
  excerpt: article.excerpt,
  image: gameNewsImages[article.slug] ?? siteAssets.logoBgRed,
  href: `/anima/news/${article.slug}`,
  external: false,
}));

function sortByDateDesc(items: SiteNewsFeedItem[]): SiteNewsFeedItem[] {
  return [...items].sort((a, b) => b.date.localeCompare(a.date));
}

/** 首页轮播与全部新闻页共用 */
export const siteNewsFeed = sortByDateDesc([...gameNewsFeed, ...legacyHomeNews]);

export const newsPageArticles = siteNewsFeed;

export const newsPageAssets = {
  background: siteAssets.logoBg,
};
