import { AUDIT_CREDS, PLAYER } from "@/data/game";

export interface MailListItem {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string;
  unread?: boolean;
  /** 是否可在读信区打开 */
  readable?: boolean;
  /** 阅读完录用通知（m01）并滚到底部后才出现在收件箱 */
  unlockAfterM01?: boolean;
  /** 完成尾飞真结局演出后才出现在收件箱 */
  unlockAfterStrollFinale?: boolean;
}

export type MailBodyBlock =
  | { type: "text"; content: string; tone?: "heading" | "emphasis" | "lead" }
  | { type: "link"; content: string; href: string; external?: boolean }
  | { type: "task"; number: number; content: string; redacted?: boolean };

export interface OpenMail {
  subject: string;
  from: string;
  fromEmail: string;
  to: string;
  date: string;
  body: MailBodyBlock[];
}

export const mailAccount = {
  address: PLAYER.email,
  displayName: PLAYER.studentId,
};

const DEV_GROUP = "《动画学院暑期勤工俭学事件》开发组";
const STROLL_PRODUCTION_GROUP = "《不存在的学生》制作组";

export const mailListItems: MailListItem[] = [
  {
    id: "m01",
    from: "中国传媒大学动画与数字艺术学院学生勤工助学管理处",
    subject: "【录用通知】2036动画学院暑期勤工助学录用通知及工作安排",
    preview: "首先恭喜你顺利通过2036年度动画与数字艺术学院暑期勤工助学岗位全部考核审核…",
    date: "6月18日",
    unread: true,
    readable: true,
  },
  {
    id: "stroll-thanks",
    from: STROLL_PRODUCTION_GROUP,
    subject: "感谢游玩 · 在 AI 时代继续创作",
    preview: "祁玉，如果你正在读这封信，说明你已经走完了整条被看见的路径…",
    date: "刚刚",
    unread: true,
    readable: true,
    unlockAfterStrollFinale: true,
  },
  {
    id: "3",
    from: "课程作业提醒",
    subject: "交互叙事理论课程结课作业提交通知",
    preview: "请于本周日前完成游戏本体相关文档的整理与提交…",
    date: "3月10日",
  },
  {
    id: "4",
    from: "CUC校内邮箱",
    subject: "CUC校内邮箱使用须知",
    preview: "你的中国传媒大学校内邮箱已开通，请妥善保管账号并定期修改密码…",
    date: "3月12日",
  },
  {
    id: "6",
    from: "图书馆",
    subject: "新书推荐：动画与游戏设计专题",
    preview: "本期推荐书单已更新，欢迎借阅…",
    date: "3月8日",
  },
  {
    id: "dev-intro",
    from: DEV_GROUP,
    subject: "你好！祁玉",
    preview: "如果你正在读这封信，说明你已经进入了这场平行实境调查…",
    date: "？？？",
    unread: true,
    readable: true,
    unlockAfterM01: true,
  },
];

const m01Mail: OpenMail = {
  subject: "【录用通知】2036动画学院暑期勤工助学录用通知及工作安排",
  from: "中国传媒大学动画与数字艺术学院学生勤工助学管理处",
  fromEmail: "workstudy@cuc.edu.cn",
  to: "qiyu_3608@cuc.edu.cn",
  date: "2036年6月18日（周二）9：00",
  body: [
    { type: "text", content: "亲爱的祁玉同学：", tone: "lead" },
    {
      type: "text",
      content:
        "您好！首先恭喜你顺利通过2036年度动画与数字艺术学院暑期勤工助学岗位全部考核审核，正式录用为优秀毕业生档案临时核对员，即日起可上岗开展档案核验相关工作。",
    },
    { type: "text", content: "" },
    { type: "text", content: "岗位说明", tone: "heading" },
    {
      type: "text",
      content: "本次岗位主要负责本院往届优秀毕业生电子档案核对工作。",
    },
    { type: "text", content: "" },
    { type: "text", content: "核验范围", tone: "heading" },
    {
      type: "text",
      content: "本次需要核对的档案为2036届本院本科优秀毕业生档案。",
      tone: "emphasis",
    },
    { type: "text", content: "" },
    { type: "text", content: "工作规范", tone: "heading" },
    {
      type: "text",
      content:
        "登录审核工作台后，需按照系统分配的批次调取档案，逐项核对档案填报信息与纸质备案数据是否一致。",
    },
    {
      type: "text",
      content:
        "若核对中发现信息错误、内容缺失、材料不匹配等情况，请在工作台对应条目标记异常，并在系统中提交上报。",
    },
    {
      type: "text",
      content:
        "完成分配的核对任务后，记得提交当日核验汇总表，系统将根据提交记录统计你的有效工时。",
    },
    { type: "text", content: "" },
    { type: "text", content: "临时登录信息", tone: "heading" },
    {
      type: "text",
      content: "现将你的审核工作台临时登录信息告知，请妥善保管，切勿向他人泄露。",
      tone: "emphasis",
    },
    { type: "text", content: `登录账号：${AUDIT_CREDS.username}`, tone: "emphasis" },
    { type: "text", content: `初始密码：${AUDIT_CREDS.password}`, tone: "emphasis" },
    { type: "text", content: "" },
    { type: "text", content: "相关链接", tone: "heading" },
    { type: "text", content: "你可前往学院官方平台登录审核工作台并查阅公开资料：" },
    { type: "link", content: "▶ 动画学院官网", href: "/anima", external: true },
    { type: "text", content: "" },
    { type: "text", content: "咨询方式", tone: "heading" },
    {
      type: "text",
      content:
        "如果后续对登录账号、档案核对操作存在疑问，可在工作日 9:00–17:00 前往动画学院行政办公室 302 线下咨询，也可在审核工作台内提交线上咨询工单。",
    },
    { type: "text", content: "" },
    {
      type: "text",
      content: "希望你秉持认真严谨的态度，顺利完成本次暑期档案核对工作。",
      tone: "lead",
    },
    { type: "text", content: "" },
    { type: "text", content: "中国传媒大学动画与数字艺术学院" },
    { type: "text", content: "2036年6月18日" },
  ],
};

const devIntroMail: OpenMail = {
  subject: "你好！祁玉",
  from: DEV_GROUP,
  fromEmail: "dev@workstudy-event.game",
  to: PLAYER.email,
  date: "？？？",
  body: [
    { type: "text", content: "祁玉，你好。", tone: "lead" },
    {
      type: "text",
      content: "如果你正在读这封信，说明你已经进入了这场平行实境调查。",
      tone: "lead",
    },
    {
      type: "text",
      content: "下面是我们为你准备的引言与玩法说明，建议在开始审核任务前先读一遍。",
      tone: "lead",
    },
    { type: "text", content: "" },
    { type: "text", content: "游戏引言", tone: "heading" },
    {
      type: "text",
      content:
        "今天是2036年6月18日。你叫祁玉，是中国传媒大学数字媒体艺术专业2035届学生，刚刚结束大一。为了补贴生活费，你在学期末申报了动画与数字艺术学院的暑期勤工助学项目。等待许久后，一封录用通知终于出现在你的学生邮箱中。你被安排协助学院核对即将发布的优秀毕业生档案，邮件中同时提供了临时审核账号、登录密码和学院官网链接。",
    },
    {
      type: "text",
      content:
        "这原本只是一项简单的资料核验工作，但在登录审核系统核验信息的过程中，你逐渐发现部分档案之间存在难以解释的矛盾……。于是凭借自己对网页构造的学习和基础程序知识，突破了官网的搜索引擎漏洞，可以通过输入关键字搜出本不应该显示的内容。只要输入特定的关键词，就能搜索出一些本不应该对外显示的历史页面与隐藏资料。",
      tone: "emphasis",
    },
    {
      type: "text",
      content:
        "于是，你开始往返于学生邮箱、学院官网与档案审核系统之间，通过不断搜索和核对信息，展开了对这份异常毕业生档案的调查……",
    },
    { type: "text", content: "" },
    { type: "text", content: "玩法介绍", tone: "heading" },
    { type: "text", content: "游戏目的", tone: "emphasis" },
    {
      type: "text",
      content: "通过浏览动画学院2034年官网，登录审核系统完成勤工俭学工作内容。",
    },
    { type: "text", content: "你需要：", tone: "emphasis" },
    {
      type: "task",
      number: 1,
      content: "完成优秀毕业生档案的发布前核验；",
    },
    {
      type: "task",
      number: 2,
      content: "核查异常学生「程野」的真实身份；",
      redacted: true,
    },
    {
      type: "task",
      number: 3,
      content: "确认其课程、项目与获奖成果的来源；",
      redacted: true,
    },
    {
      type: "task",
      number: 4,
      content: "找出这份异常档案出现的原因；",
      redacted: true,
    },
    {
      type: "task",
      number: 5,
      content: "根据核验结果，提交最终审核意见。",
    },
    { type: "text", content: "" },
    { type: "text", content: "游戏玩法", tone: "emphasis" },
    {
      type: "text",
      content:
        "这是一款以网页搜索和信息调查为核心的 ARG 游戏。游戏没有传统关卡，也不会直接告诉你下一步应该前往哪里。",
    },
    {
      type: "text",
      content:
        "你需要在学生邮箱、动画学院官网、审核工作台和个人学生系统中阅读资料，从页面文字、项目编号、人物姓名和文件内容中寻找可疑关键词，再将关键词输入网站搜索框，进入对应的新闻、档案或隐藏页面。",
    },
    {
      type: "text",
      content:
        "部分页面不会出现在普通导航栏和官网页面中，只有搜索正确的关键词才能访问。",
    },
    { type: "text", content: "推进方法：", tone: "emphasis" },
    {
      type: "text",
      content:
        "阅读现有页面 → 找出可疑关键词 → 在对应网站中搜索 → 进入新的隐藏页面 → 获得下一条线索 → 核对不同页面的信息 → 提交最终审核结论",
    },
    {
      type: "text",
      content:
        "审核工作台右下角设有「审核终端」，会显示项目的核验状态，但不会直接告诉你遗漏了哪条线索。",
    },
    { type: "text", content: "预计游戏时长为 40—60 分钟。" },
    { type: "text", content: "" },
    { type: "text", content: "注意事项", tone: "emphasis" },
    {
      type: "text",
      content:
        "本游戏不要求任何编程或专业技术知识。请根据网页中肉眼可见的文字、图片和信息进行推理，无需查看源代码、修改网页或解析文件。",
    },
    {
      type: "text",
      content: "建议使用电脑浏览器游玩，以获得更完整的网页显示效果。",
    },
    { type: "text", content: "搜索时请注意：", tone: "emphasis" },
    { type: "text", content: "每次只搜索一个关键词；" },
    { type: "text", content: "关键词可能是姓名、项目名称、文件标题或中文编号；" },
    {
      type: "text",
      content: "搜索结果为空不一定代表关键词无效，也可能是重要的异常信息；",
    },
    {
      type: "text",
      content: "不同网站拥有不同的资料权限，使用不同账号登录可能产生不同结果；",
    },
    { type: "text", content: "不需要输入完整句子，也不要添加无关空格或符号。" },
    { type: "text", content: "" },
    { type: "text", content: "游戏建议", tone: "emphasis" },
    {
      type: "text",
      content:
        "建议记录已经访问过的页面、使用过的关键词和发现的重要信息，避免遗漏线索。",
    },
    {
      type: "text",
      content:
        "并不是只有陌生的专有名词才值得搜索。人物姓名、项目名称、账号缩写、申请理由和反复出现的词语，都可能是推进调查的关键。",
    },
    {
      type: "text",
      content:
        "部分页面包含真实线索，部分页面可能造成误导。请不要只依据单一页面作出判断，应将学籍记录、新闻报道、项目档案和系统日志相互对照。",
    },
    {
      type: "text",
      content:
        "最终结局不仅取决于你找到了多少线索，也取决于你如何理解这些证据，并作出怎样的选择。",
    },
    { type: "text", content: "" },
    { type: "text", content: "入门提示", tone: "emphasis" },
    {
      type: "text",
      content:
        "整体玩法以自由搜索和网页调查为主，不是线性点击解谜。建议先从录用通知中的审核账号进入工作台，再前往学院官网开始搜索。",
      tone: "emphasis",
    },
    { type: "text", content: "" },
    { type: "text", content: "祝调查顺利。", tone: "lead" },
    { type: "text", content: "" },
    { type: "text", content: `—— ${DEV_GROUP}`, tone: "emphasis" },
  ],
};

const strollThanksMail: OpenMail = {
  subject: "感谢游玩 · 在 AI 时代继续创作",
  from: STROLL_PRODUCTION_GROUP,
  fromEmail: "stroll@nonexistent-student.game",
  to: PLAYER.email,
  date: "2036年7月 · 刚刚",
  body: [
    { type: "text", content: "祁玉，你好。", tone: "lead" },
    {
      type: "text",
      content:
        "如果你正在读这封信，说明你已经走完了《不存在的学生》里那条「被看见的路径」，并找到了真结局。",
      tone: "lead",
    },
    {
      type: "text",
      content:
        "感谢你愿意花时间进入这场平行实境调查，在邮箱、官网与审核系统之间反复核对、搜索与推理。",
    },
    { type: "text", content: "" },
    {
      type: "text",
      content:
        "游戏里的焦虑与选择，某种程度上也映照着此刻的我们：专业在重构，工具在更新，路径尚未被完全命名。",
    },
    {
      type: "text",
      content:
        "但故事、角色与交互的逻辑，仍须由人决定；你的表达方式，也不会被任何一次技术更迭简单取代。",
      tone: "emphasis",
    },
    { type: "text", content: "" },
    {
      type: "text",
      content: "愿你在此后的学习里，在 AI 时代找到自己的创作路径，且越走越明亮。",
      tone: "emphasis",
    },
    { type: "text", content: "" },
    { type: "text", content: "祝创作顺利。", tone: "lead" },
    { type: "text", content: "" },
    { type: "text", content: `—— ${STROLL_PRODUCTION_GROUP}`, tone: "emphasis" },
  ],
};

export const mailsById: Record<string, OpenMail> = {
  m01: m01Mail,
  "3": {
    subject: "交互叙事理论课程结课作业提交通知",
    from: "课程作业提醒",
    fromEmail: "coursework@cuc.edu.cn",
    to: PLAYER.email,
    date: "2032年3月10日",
    body: [
      { type: "text", content: "各位同学：" },
      {
        type: "text",
        content:
          "交互叙事理论课程结课作业提交截止时间为本周日 23:59。请于本周日前完成游戏本体相关文档的整理与提交。",
      },
      { type: "text", content: "" },
      { type: "text", content: "教务处 · 课程作业提醒系统" },
    ],
  },
  "4": {
    subject: "CUC校内邮箱使用须知",
    from: "CUC校内邮箱",
    fromEmail: "mail-admin@cuc.edu.cn",
    to: PLAYER.email,
    date: "2032年3月12日",
    body: [
      { type: "text", content: "同学你好：" },
      {
        type: "text",
        content:
          "你的中国传媒大学校内邮箱已开通。请妥善保管账号信息，定期修改密码，勿向他人泄露登录凭证。",
      },
      {
        type: "text",
        content: "校内邮箱用于接收教务通知、学院公告及各类校园事务邮件，请及时查收。",
      },
      { type: "text", content: "" },
      { type: "text", content: "CUC 校内邮箱管理中心" },
    ],
  },
  "6": {
    subject: "新书推荐：动画与游戏设计专题",
    from: "图书馆",
    fromEmail: "library@cuc.edu.cn",
    to: PLAYER.email,
    date: "2036年3月8日",
    body: [
      { type: "text", content: "同学你好：" },
      { type: "text", content: "本期推荐书单已更新，欢迎前往图书馆借阅。" },
    ],
  },
  "dev-intro": devIntroMail,
  "stroll-thanks": strollThanksMail,
};

/** @deprecated 使用 mailsById["m01"] */
export const openMail = m01Mail;

export const headerTabs = ["首页", "通讯录", "审核任务", "收件箱"];

export const readToolbarActions = [
  "回复",
  "回复全部",
  "转发",
  "删除",
  "举报",
  "标记为",
  "移动到",
  "更多",
];

export const topActions = ["设置", "帮助", "退出"];
