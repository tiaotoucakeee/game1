"use client";

import Image from "next/image";
import { navLinks, siteAssets } from "@/data/cuc-anima";
import { GameLink } from "@/components/game/GameLink";
import { NavSearchTrigger } from "@/components/game/SiteSearchBar";

export function Navigation() {
  return (
    <nav className="cuc-anima-nav navigation">
      <div className="navbar wf-section">
        <div className="container full-width mx-auto w-full max-w-none px-5">
          <div className="nav-warpper">
            <div className="nav-left">
              <GameLink href="/anima" className="shrink-0">
                <Image
                  src={siteAssets.logo}
                  alt="cuc-anima-logo"
                  width={84}
                  height={84}
                  className="nav-logo"
                  priority
                />
              </GameLink>
              <ul role="list" className="nav-list">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <GameLink href={link.href} className="nav-link w-inline-block">
                      <span className="nav-link-text">{link.label}</span>
                      <span className="nav-link-underline" aria-hidden />
                    </GameLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav-right">
              <NavSearchTrigger />
              <GameLink href="/audit" className="nav-action-link" newTab>
                审核工作台登录
              </GameLink>
              <GameLink href="/student" className="nav-action-link" newTab>
                学生个人系统登录
              </GameLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
