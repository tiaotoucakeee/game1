"use client";

import { CHENG_YE, CHENG_YE_STUDENT_CREDS, PLAYER } from "@/data/game";
import { useGame } from "@/lib/game-state";
import { CucSsoLoginPageClient } from "@/components/sso/CucSsoLoginPageClient";

export function StudentLoginPageClient() {
  const { loginStudent, studentLoggedIn } = useGame();

  return (
    <CucSsoLoginPageClient
      title="学生个人系统登录"
      isLoggedIn={studentLoggedIn}
      redirectWhenLoggedIn="/student/home"
      wrongCredentialsMessage="学号或密码错误。请查看邮箱个人信息页或内部档案。"
      onSubmitLogin={(user, pass, rememberMe) => {
        const normalizedUser = user.trim();
        const normalizedPass = pass.trim();

        if (normalizedUser === PLAYER.studentId && normalizedPass === PLAYER.studentPassword) {
          loginStudent(rememberMe, "player");
          return true;
        }

        if (
          (normalizedUser === CHENG_YE_STUDENT_CREDS.studentId ||
            normalizedUser.toUpperCase() === CHENG_YE_STUDENT_CREDS.accountId) &&
          normalizedPass === CHENG_YE_STUDENT_CREDS.password
        ) {
          loginStudent(rememberMe, "cheng_ye");
          return true;
        }

        return false;
      }}
    />
  );
}
