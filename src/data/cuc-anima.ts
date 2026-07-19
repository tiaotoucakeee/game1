import type {
  MenuGroup,
  NavLink,
  NewsItem,
  SocialLink,
} from "@/types/cuc-anima";
import { majorGroups as majorGroupsData } from "@/data/cuc-anima-majors";

const asset = (path: string) => `/cuc-anima/${path}`;

export const navLinks: NavLink[] = [
  { label: "学院介绍", href: "/anima/about" },
  { label: "学院新闻", href: "/anima/news" },
  { label: "本科生教育", href: "/anima/education" },
  { label: "领域成果", href: "/anima/fields" },
];

export const menuGroups: MenuGroup[] = [
  {
    title: "Cuc-Anima",
    links: [
      { label: "首页", href: "zh.html" },
      { label: "学院简介", href: "programmes-zh.html" },
      { label: "动院获奖新闻和作品", href: "news-zh.html" },
    ],
  },
  {
    title: "专业介绍",
    links: [
      { label: "本科生教育", href: "programmes-zh.html#undergraduate" },
      { label: "研究生教育", href: "programmes-zh.html#postgraduate" },
      { label: "博士生教育", href: "programmes-zh.html" },
    ],
  },
  {
    title: "领域成果",
    links: [{ label: "领域成果", href: "fields-zh.html" }],
  },
];

export const majorGroups = majorGroupsData;

export const newsItems: NewsItem[] = [
  {
    title: "中传虚拟制作全流程实战特训营——探索前沿科技，打造未来影视创作者",
    date: "2025-03-15",
    excerpt: "“虚拟制作全流程实战特训营”火热招生中！",
    image: asset("images/20250315-1.png"),
    href: "news-2/shi-zhan-te-xun.html",
  },
  {
    title:
      "【Aniwow!2024】第十九届中国（北京）国际大学生动画节“小白杨奖”高中生竞赛单元获奖名单公布",
    date: "2024-11-29",
    excerpt: "本次大赛经过初赛、决赛两轮专家评审，现公布大赛最终获奖名单。",
    image: asset("images/aniwow.jpg"),
    href: "news-2/aniwow2024-huo-jiang-ming-dan.html",
  },
  {
    title:
      "【Aniwow!2024】第十九届中国（北京）国际大学生动画节“小白杨奖”高中生竞赛单元入选决赛名单及决赛安排",
    date: "2024-09-30",
    excerpt:
      "本次大赛征集的作品经过专家评审，现公布入选决赛名单（见附件）。入选决赛的选手，需提交决赛考核材料，具体要求如下。",
    image: asset("images/aniwow.jpg"),
    href: "news-2/jue-sai-ming-dan.html",
  },
  {
    title:
      "【Aniwow!2024】第十九届中国（北京）国际大学生动画节“小白杨奖”高中生竞赛单元征集函",
    date: "2024-07-25",
    excerpt:
      "中国（北京）国际大学生动画节“小白杨奖” 旨在激发全国青少年的动漫与数字艺术创作热情，选拔在相关领域创作方面具备一定艺术功底、创意独特、思维新颖的高中生。",
    image: asset("images/aniwow.jpg"),
    href: "news-2/zheng-ji-han-2024.html",
  },
  {
    title: "中国传媒大学DAP国际本科项目2024年招生简章",
    date: "2024-04-07",
    excerpt:
      "中国传媒大学始建于1954年，是教育部直属的首批“双一流”建设高校，“211工程”重点建设大学，“985优势学科创新平台”重点建设高校。学校坐落于北京古运河畔，地处首都功能核心区和北京城市副中心之间，交通便利，区位优势明显。",
    image: asset("images/dap-jie-shao.jpg"),
    href: "news-2/dap-2024-zhao-sheng-jian-zhang.html",
  },
  {
    title: "【Aniwow!2023】公告一则",
    date: "2024-01-02",
    excerpt:
      "经研究，取消孙书涵同学 【Aniwow！2023】 第十八届中国（北京）国际大学生动面节“小白杨奖”高中生竞赛单元动面漫画类二等奖奖项。",
    image: asset("images/qu-xiao-jiang-xiang.jpg"),
    href: "news-2/aniwow-qu-xiao-jiang-xiang.html",
  },
  {
    title:
      "【Aniwow!2023】中国（北京）国际大学生动画节 “小白杨奖”高中生竞赛单元 获奖名单公布",
    date: "2023-11-30",
    excerpt:
      "本次大赛经过初赛、决赛两轮专家评审，现公布大赛最终获奖名单。获奖证书将于 12 月中下旬寄出，邮寄地址来源于【Aniwow!2023】 第十八届中国（北京）国际大学生动画节“小白杨奖”高中生竞赛单元系统填写信息，届时请注意查收。",
    image: asset("images/aniwow.jpg"),
    href: "news-2/aniwow-huo-jiang-ming-dan.html",
  },
  {
    title: "【Aniwow!2023】中传“小白杨奖”高中生竞赛单元征集函",
    date: "2023-07-30",
    excerpt:
      "中国（北京）国际大学生动画节“小白杨奖”旨在激发全国青少年的动漫与数字艺术创作热情，选拔在相关领域创作方面具备一定艺术功底、创意独特、思维新颖的高中生。自设立以来，“小白杨奖”的获奖者中诞生了多位中国动画与数字艺术领域的领军人物，为行业的蓬勃发展积蓄培养了大量数字创意人才。",
    image: asset("images/aniwow.jpg"),
    href: "news-2/aniwow.html",
  },
  {
    title: "动院作品获第十届全国大学生数字媒体科技作品及创意竞赛一等奖",
    date: "2023-02-21",
    excerpt:
      "在第十届全国大学生数字媒体科技作品及创意竞赛全国总决赛的获奖名单中，由我院陈京炜老师指导，王雨奇、王茗蕙、王石、付佳鑫创作的作品《逃离玩偶之家》荣获一等奖，本届竞赛总决赛颁奖典礼于2022年11月26日举办。",
    image: asset("images/64265a80a039a72aab1dcf29_news-img-5.jpg"),
    href: "news-2/dong-yuan-zuo-pin-huo-di-shi-jie-quan-guo-da-xue-sheng-shu-zi-mei-ti-ke-ji-zuo-pin-ji-chuang-yi-jing-sai-yi-deng-jiang.html",
  },
  {
    title: "动画与数字艺术学院学生作品荣获2023多伦多国际动画艺术节大奖",
    date: "2023-02-25",
    excerpt:
      "近日，2023多伦多国际动画艺术官方网站公布获奖名单，我校动画与数字艺术学院2019级动画专业学生岳雨琳、庄凯婷、黄心怡、党然、郭浩民的作品《小鱼以巴》与梁立维、黄语欣、欧阳舒言、李佳蓉、于清玥、杨钰敏的作品《捉迷藏》从来自全球28个国家和地区的81部决赛入围作品中脱颖而出联袂获奖，其中《小鱼以巴》获得最佳学院短片奖（Best College Short），《捉迷藏》获得荣誉奖（Honorable Mention）。",
    image: asset("images/642659ec71eb3dc3da3ca080_news-img-3.jpg"),
    href: "news-2/dong-hua-yu-shu-zi-yi-zhu-xue-yuan-xue-sheng-zuo-pin-rong-huo-2023-duo-lun-duo-guo-ji-dong-hua-yi-zhu-jie-da-jiang.html",
  },
  {
    title: "动院两部学生作品入围德国斯图加特国际动画节",
    date: "2023-02-28",
    excerpt:
      "近日，2023德国斯图加特国际动画节官方网站发布了入围名单，动画与数字艺术学院2018级动画专业学生董玉珑、鲁天娇的作品《马拉松》与卢思杰、李金泽、佘钰奇、马心玥、张淙乐、熊炜的作品《象群挽歌》榜上有名，其中《马拉松》入围青年动画竞赛单元(Young Animation Competition)，《象群挽歌》入围儿童动画竞赛单元（Tricks for Kids Competition）。",
    image: asset("images/6426590bafa01c300b3f252d_news-img-1.jpg"),
    href: "news-2/dong-yuan-liang-bu-xue-sheng-zuo-pin-ru-wei-de-guo-si-tu-jia-te-guo-ji-dong-hua-jie.html",
  },
  {
    title: "学生作品获第29届大学生电影节最佳实验短片奖",
    date: "2023-03-02",
    excerpt:
      "近日，北京国际电影节·第29届大学生电影节官方公布获奖名单，由动画与数字艺术学院崔蕴鹏老师指导，学生郑宇高、肖竹萱主创的作品《智械之翎》从2000余部作品中脱颖而出，在第22届大学生原创影片推选中获得了最佳实验短片称号。",
    image: asset("images/642651456af7152759f2ed3d_news-img-6-p-1080.png"),
    href: "news-2/xue-sheng-zuo-pin-huo-di-29-jie-da-xue-sheng-dian-ying-jie-zui-jia-shi-yan-duan-pian-jiang.html",
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: "Bilibili",
    href: "https://space.bilibili.com/12735613",
    icon: asset("images/bilibili.svg"),
  },
  {
    label: "视频号",
    href: "#",
    icon: asset("images/shipinghao.svg"),
  },
  {
    label: "微信",
    href: "#",
    icon: asset("images/wechat.svg"),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/cucanima?igshid=YmMyMTA2M2Y=",
    icon: asset("images/Instagram.svg"),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@anima_cuc",
    icon: asset("images/icon_youtube.svg"),
  },
];

export const siteAssets = {
  logo: asset("images/cuc-anima-logo.svg"),
  logoWhite: asset("images/cuc-anima-logo-white.svg"),
  logoBg: asset("images/cuc-anima-logo-background.svg"),
  logoBgRed: asset("images/cuc-anima-logo-background-red.svg"),
  burgerIcon: asset("images/burger-icon.svg"),
  whiteArrow: asset("images/white-arrow.svg"),
  rightArrow: asset("images/right-arrow.svg"),
  rightArrowWhite: asset("images/right-arrow-white.svg"),
  playButton: asset("images/play-button.svg"),
  qrCode: asset("images/erweima.jpg"),
  heroVideo: asset("video/15s-video.mp4"),
};

export const externalBase =
  "https://animation.cuc.edu.cn/_upload/tpl/02/7a/634/template634/";

export function externalHref(path: string) {
  return `${externalBase}${path}`;
}
