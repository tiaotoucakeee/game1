export type ReflectionChoice = {
  id: string;
  label: string;
};

export type ReflectionQuestion = {
  id: string;
  prompt: string;
  choices: ReflectionChoice[];
};

export const PATH_SUBMIT_REFLECTION: ReflectionQuestion[] = [
  {
    id: "q1",
    prompt: "当 AI 已经能生成完整的画面与分镜，你是否仍相信自己的表达里，有工具无法替代的部分？",
    choices: [
      { id: "yes", label: "有" },
      { id: "unsure", label: "还不确定" },
    ],
  },
  {
    id: "q2",
    prompt: "专业名称变动、课程合并的消息接连出现时，你更常把焦虑归咎于——",
    choices: [
      { id: "self", label: "自己不够努力" },
      { id: "era", label: "时代变化太快" },
    ],
  },
  {
    id: "q3",
    prompt: "如果一条创作路径尚未被命名、也还没有标准答案，你愿意先走下去吗？",
    choices: [
      { id: "walk", label: "愿意先走一段" },
      { id: "wait", label: "需要先看清终点" },
    ],
  },
  {
    id: "q4",
    prompt: "在 AI 辅助创作里，你更在意的是——",
    choices: [
      { id: "truth", label: "表达是否真实" },
      { id: "speed", label: "产出是否高效" },
    ],
  },
  {
    id: "q5",
    prompt:
      "综合你核对过的全部材料：你是否认可「程野」作为创作路径账户（CYA-0000），继续留存于系统之中？",
    choices: [
      { id: "accept", label: "认可" },
      { id: "reject", label: "不认可" },
    ],
  },
];

export const REFLECTION_STEP_FADE_MS = 480;
export const REFLECTION_PROMPT_DELAY_MS = 420;
