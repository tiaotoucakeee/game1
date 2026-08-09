"use client";

import Link from "next/link";
import { AuditGate } from "@/components/game/SystemGate";

function HomeCard({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <div className="card-wrap">
      <Link href={href} className="card clearfix">
        <div className="iconfontBox">
          <i className={`iconfont ${icon}`} aria-hidden />
        </div>
        <div className="cardContent">
          <span>{label}</span>
        </div>
      </Link>
    </div>
  );
}

function NoticeItem({ text, date, red }: { text: string; date: string; red?: boolean }) {
  return (
    <a
      href="#"
      className="list-group-item clearfix"
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      <div className="announcementBox">
        <span className={`title ${red ? "redColor" : ""}`}>{text}</span>
      </div>
      <span className="notice-date">{date}</span>
    </a>
  );
}

function DashboardContent() {
  return (
    <div className="audit-dash-home">
      <div className="audit-dash-home__main">
        <div className="widget" id="mainHomeList_01">
          <div className="widget-header bordered-bottom bordered-info">
            <span className="widget-caption">
              <i className="iconfont icon-daiban" aria-hidden style={{ marginRight: 6 }} />
              <span className="KeyFname">档案审核事务</span>
            </span>
          </div>
          <div className="widget-body">
            <div className="cards">
              <HomeCard href="/audit/graduates" icon="icon-xuesheng" label="2034届优秀毕业生审核档案" />
            </div>
          </div>
        </div>
      </div>

      <div className="audit-dash-home__side">
        <div className="widget mainHomeRightTab">
          <div className="widget-header bordered-bottom bordered-info widget-header--split">
            <span className="widget-caption">
              <i className="iconfont icon-daiban" aria-hidden style={{ marginRight: 6 }} />
              通知公告
            </span>
            <a
              href="#"
              className="MainHomeRightMore"
              onClick={(event) => {
                event.preventDefault();
              }}
            >
              更多
            </a>
          </div>
          <div className="widget-body tab-content">
            <div className="noticeBox">
              <NoticeItem
                text="【重要】2034届优秀毕业生档案临时核对工作安排"
                date="2036-07-01"
                red
              />
              <NoticeItem text="学院年度创新成果奖评选结果已公示" date="2030-06-12" red />
              <NoticeItem text="Ani AI 智能畅课平台正式启用通知" date="2030-09-01" />
              <NoticeItem text="虚拟制作联合实验室启用通知" date="2030-03-15" />
              <NoticeItem text="Aniwow! 2030 学院奖评选通知" date="2030-05-20" />
            </div>
          </div>
        </div>

        <div className="widget">
          <div className="widget-header bordered-bottom bordered-info">
            <span className="widget-caption">
              <i className="iconfont icon-daiban" aria-hidden style={{ marginRight: 6 }} />
              综合事务
            </span>
          </div>
          <div className="widget-body">
            <div className="cards">
              <HomeCard href="/audit/lab" icon="icon-xiazai" label="实验室申请记录查询" />
              <HomeCard href="/audit/project" icon="icon-xitong" label="项目查询" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuditDashboardPage() {
  return (
    <AuditGate>
      <DashboardContent />
    </AuditGate>
  );
}
