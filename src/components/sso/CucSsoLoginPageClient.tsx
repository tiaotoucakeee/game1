"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BG_IMAGES = [
  "/audit-sso/bg01.jpg",
  "/audit-sso/bg02.jpg",
  "/audit-sso/bg03.jpg",
];

const ASSETS = {
  logo: "/audit-sso/logo.png",
  user: "/audit-sso/user.png",
  pass: "/audit-sso/pass.png",
  question: "/audit-sso/question.svg",
  qr: "/audit-sso/qr-placeholder.svg",
};

export type CucSsoLoginPageProps = {
  title: string;
  isLoggedIn: boolean;
  redirectWhenLoggedIn: string;
  wrongCredentialsMessage: string;
  onSubmitLogin: (user: string, pass: string, rememberMe: boolean) => boolean;
};

export function CucSsoLoginPageClient({
  title,
  isLoggedIn,
  redirectWhenLoggedIn,
  wrongCredentialsMessage,
  onSubmitLogin,
}: CucSsoLoginPageProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [bgIndex, setBgIndex] = useState(0);
  const [lang, setLang] = useState<"zh" | "en">("zh");

  useEffect(() => {
    if (isLoggedIn) router.replace(redirectWhenLoggedIn);
  }, [isLoggedIn, redirectWhenLoggedIn, router]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const user = String(fd.get("user"));
    const pass = String(fd.get("pass"));
    const rememberMe = fd.get("rememberMe") === "on";
    if (onSubmitLogin(user, pass, rememberMe)) {
      router.push(redirectWhenLoggedIn);
    } else {
      setError(wrongCredentialsMessage);
    }
  }

  function prevBg() {
    setBgIndex((index) => (index - 1 + BG_IMAGES.length) % BG_IMAGES.length);
  }

  function nextBg() {
    setBgIndex((index) => (index + 1) % BG_IMAGES.length);
  }

  return (
    <div
      className="audit-sso-page"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        overflow: "hidden",
      }}
    >
      <div
        className="audit-sso-bg-wrap"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${BG_IMAGES[bgIndex]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Link href="/anima" className="audit-sso-back-home">
        ← 返回官网主页
      </Link>

      <div className="audit-sso-lang">
        <button
          type="button"
          className={lang === "en" ? "is-active" : undefined}
          onClick={() => setLang("en")}
        >
          English
        </button>
        <button
          type="button"
          className={lang === "zh" ? "is-active" : undefined}
          onClick={() => setLang("zh")}
        >
          中文
        </button>
      </div>

      <div
        className="audit-sso-center"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "72px 16px 64px",
        }}
      >
        <div className="audit-sso-shell" style={{ width: "665px", maxWidth: "100%" }}>
          <div
            className="audit-sso-card"
            style={{ display: "flex", width: "100%", borderRadius: "15px", overflow: "hidden" }}
          >
            <section
              className="audit-sso-panel-left"
              style={{ flex: "1 1 404px", background: "rgba(68,68,68,0.8)", color: "#fff" }}
            >
              <div className="audit-sso-logo-row">
                <img src={ASSETS.logo} alt="中国传媒大学" className="audit-sso-logo-img" />
                <span className="audit-sso-logo-title">{title}</span>
              </div>

              <div className="audit-sso-tabs">
                <span className="audit-sso-tab is-active">账号登录</span>
                <span className="audit-sso-tab is-disabled" aria-disabled="true">
                  验证码登录
                </span>
              </div>

              <form onSubmit={onSubmit}>
                <label className="audit-sso-field">
                  <img src={ASSETS.user} alt="" aria-hidden width={18} height={18} />
                  <input
                    name="user"
                    placeholder="请输入手机号/学号/身份证号"
                    autoComplete="username"
                  />
                </label>
                <label className="audit-sso-field">
                  <img src={ASSETS.pass} alt="" aria-hidden width={18} height={18} />
                  <input
                    name="pass"
                    type="password"
                    placeholder="请输入密码"
                    autoComplete="current-password"
                  />
                </label>
                <label className="audit-sso-remember">
                  <input type="checkbox" name="rememberMe" />
                  <span>7天免登录</span>
                  <img src={ASSETS.question} alt="" aria-hidden width={16} height={16} />
                </label>

                <p className="audit-sso-error">{error || "\u00a0"}</p>

                <button type="submit" className="audit-sso-submit">
                  登录
                </button>
              </form>

              <div className="audit-sso-help">
                <span>账号激活</span>
                <span>忘记密码</span>
              </div>

              <p className="audit-sso-warning">
                严禁使用校内平台处理存储涉密敏感信息！
              </p>
            </section>

            <aside
              className="audit-sso-panel-right"
              style={{
                flex: "0 0 261px",
                position: "relative",
                minHeight: "460px",
                background: "rgba(0,0,0,0.5)",
              }}
            >
              <div className="audit-sso-qr-box">
                <img src={ASSETS.qr} alt="微信扫码登录" width={134} height={134} />
              </div>
              <p className="audit-sso-qr-label">微信扫码登录</p>
            </aside>
          </div>
        </div>
      </div>

      <div className="audit-sso-carousel">
        <button type="button" aria-label="上一张背景" onClick={prevBg}>
          ‹
        </button>
        <button type="button" aria-label="下一张背景" onClick={nextBg}>
          ›
        </button>
      </div>

      <footer className="audit-sso-footer">
        版权所有 © 中国传媒大学 / 京ICP备10039564号 京公网安备110402430031号
      </footer>
    </div>
  );
}
