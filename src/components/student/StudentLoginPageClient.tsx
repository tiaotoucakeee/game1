"use client";

import { matchChengYeStudentLogin, matchPlayerLogin } from "@/data/game";
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
        if (matchPlayerLogin(user, pass)) {
          loginStudent(rememberMe, "player");
          return true;
        }

        if (matchChengYeStudentLogin(user, pass)) {
          loginStudent(rememberMe, "cheng_ye");
          return true;
        }

        return false;
      }}
    />
  );
}
