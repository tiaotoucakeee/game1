export type ClueId =
  | "identity_no_enrollment"
  | "identity_cya_code"
  | "project_award_anomaly"
  | "project_lin_che"
  | "ai_ani_platform"
  | "ai_cross_media"
  | "ai_creative_path"
  | "cya_truth"
  | "personal_rejected"
  | "open_path_code";

export type VerificationLine = "identity" | "project" | "ai" | "account";

export type EndingId = "seen_path" | "nonexistent" | "next_path" | "summer_nothing" | null;

export type GraduateVerifyStatus = "ok" | "error";

export interface GameState {
  clues: ClueId[];
  auditLoggedIn: boolean;
  studentLoggedIn: boolean;
  cyaLoggedIn: boolean;
  aniChatComplete: boolean;
  ending: EndingId;
  archiveDeleted: boolean;
  searchedChengYe: boolean;
  /** 引言邮件第 2–4 条任务是否已解锁（同 chengYeSearchCompleted） */
  devIntroTasksRevealed: boolean;
  /** 是否在学院官网完成「程野」搜索（涂黑解锁的唯一依据） */
  chengYeSearchCompleted: boolean;
  /** 引言邮件是否已出现在收件箱（读完录用通知并滚到底部后为 true） */
  devIntroMailUnlocked: boolean;
  /** 录用通知是否已滚读至底部（用于校验解锁来源，防止旧版误解锁） */
  m01ScrolledToBottom: boolean;
  /** 尾飞真结局演出结束后，制作组感谢信是否已出现在收件箱 */
  strollThanksMailUnlocked: boolean;
  /** 毕业生核对页发现程野异常后，AI 辅助审核终端是否已解锁 */
  auditTerminalUnlocked: boolean;
  /** 2034 届优秀毕业生核对页：各学号核查结果（退出重进保留） */
  graduateVerifyMap: Record<string, GraduateVerifyStatus>;
  /** 审核工作台「7天免登录」到期时间戳（毫秒），null 表示未勾选免登录 */
  auditRememberUntil: number | null;
  /** 学生个人系统「7天免登录」到期时间戳（毫秒），null 表示未勾选免登录 */
  studentRememberUntil: number | null;
  /** 当前登录的学生个人系统账号：祁玉或程野路径账号 */
  studentPersona: "player" | "cheng_ye" | null;
  /** 学生项目查询：已成功查过的项目编码（最新在前） */
  projectQueryHistory: string[];
  stateVersion: number;
}

export interface VerificationStatus {
  identity: boolean;
  project: boolean;
  ai: boolean;
  account: boolean;
}
