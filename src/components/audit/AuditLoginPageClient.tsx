"use client";

import { AUDIT_CREDS } from "@/data/game";
import { useGame } from "@/lib/game-state";
import { CucSsoLoginPageClient } from "@/components/sso/CucSsoLoginPageClient";

export function AuditLoginPageClient() {
  const { loginAudit, auditLoggedIn } = useGame();

  return (
    <CucSsoLoginPageClient
      title="审核工作台登录"
      isLoggedIn={auditLoggedIn}
      redirectWhenLoggedIn="/audit/dashboard"
      wrongCredentialsMessage="账号或密码错误。请查看邮箱中的临时审核通知。"
      onSubmitLogin={(user, pass, rememberMe) => {
        if (user === AUDIT_CREDS.username && pass === AUDIT_CREDS.password) {
          loginAudit(rememberMe);
          return true;
        }
        return false;
      }}
    />
  );
}
