"use client";

import Image from "next/image";
import Link from "next/link";
import { navLinks, siteAssets } from "@/data/cuc-anima";
import { SiteSearchBar } from "@/components/game/SiteSearchBar";

export function Navigation() {
  return (
    <nav className="cuc-anima-nav navigation">
      <div className="navbar wf-section">
        <div className="container full-width mx-auto w-full max-w-none px-5">
          <div className="nav-warpper">
            <div className="nav-left">
              <Link href="/anima" className="shrink-0">
                <Image
                  src={siteAssets.logo}
                  alt="cuc-anima-logo"
                  width={84}
                  height={84}
                  className="nav-logo"
                  priority
                />
              </Link>
              <ul role="list" className="nav-list">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="nav-link w-inline-block">
                      <span className="nav-link-text">{link.label}</span>
                      <span className="nav-link-underline" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav-right">
              <SiteSearchBar variant="nav" />
              <Link href="/audit" className="nav-action-link">
                审核工作台登录
              </Link>
              <Link href="/student" className="nav-action-link">
                学生个人系统登录
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
