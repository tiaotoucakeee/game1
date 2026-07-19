"use client";

import Image from "next/image";
import { useState } from "react";
import { PLAYER, PLAYER_PROFILE as P } from "@/data/game";
import { cn } from "@/lib/utils";

const SIDEBAR_ITEMS = [
  "基本信息",
  "进度信息",
  "详细信息",
  "报告信息",
  "附件信息",
  "历史记录",
] as const;

function GridLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-[#e8ebf0] bg-[#fafafa] px-4 py-3 text-[14px] text-[#666] lg:px-5 lg:py-3.5 lg:text-[15px]">
      {children}
    </div>
  );
}

function GridValue({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "border border-[#e8ebf0] bg-white px-4 py-3 text-[14px] text-[#333] lg:px-5 lg:py-3.5 lg:text-[15px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function InfoRow({ left, right }: { left: [string, string]; right: [string, string] }) {
  return (
    <>
      <GridLabel>{left[0]}</GridLabel>
      <GridValue>{left[1]}</GridValue>
      <GridLabel>{right[0]}</GridLabel>
      <GridValue>{right[1]}</GridValue>
    </>
  );
}

export function MailProfilePanel({ onBack }: { onBack: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mail-scroll min-h-0 flex-1 overflow-y-auto bg-[#eef1f6] text-[14px] text-[#333] lg:text-[15px]">
      <div className="border-b border-[#e8ebf0] bg-white px-6 py-3 lg:px-10">
        <button
          type="button"
          onClick={onBack}
          className="pointer-events-auto inline-flex items-center gap-2 text-[14px] text-[#666] transition-colors hover:text-[#c81623] lg:text-[15px]"
          aria-label="返回收件箱"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          <span>返回收件箱</span>
        </button>
      </div>

      <div className="flex w-full gap-0 px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
        <aside className="hidden w-[148px] shrink-0 rounded-l border border-[#e8ebf0] bg-white sm:block lg:w-[168px]">
          <nav className="py-2 lg:py-3">
            {SIDEBAR_ITEMS.map((item, i) => (
              <div
                key={item}
                className={cn(
                  "relative cursor-default px-4 py-2.5 text-[14px] lg:px-5 lg:py-3 lg:text-[15px]",
                  i === 0
                    ? "bg-[#fff5f5] font-medium text-[#c81623] before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:bg-[#c81623]"
                    : "text-[#999]",
                )}
              >
                {item}
              </div>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 rounded-r border border-[#e8ebf0] bg-white sm:rounded-l-none sm:border-l-0">
          <div className="border-b border-[#e8ebf0] px-6 py-4 lg:px-8 lg:py-5">
            <h1 className="text-[17px] font-bold text-[#222] lg:text-[20px]">个人信息</h1>
            <div className="mt-3">
              <span className="border-b-2 border-[#c81623] pb-1 text-[14px] font-medium text-[#c81623] lg:text-[15px]">
                基本信息
              </span>
            </div>
          </div>

          <div className="px-6 py-5 lg:px-8 lg:py-7">
            <div className="flex gap-0 border border-[#e8ebf0]">
              <div className="flex w-[120px] shrink-0 items-center justify-center border-r border-[#e8ebf0] bg-[#fafafa] p-3 sm:w-[140px] lg:w-[168px] lg:p-5">
                <div className="relative h-[140px] w-[96px] overflow-hidden border border-[#e8ebf0] bg-[#f5f5f5] sm:h-[160px] sm:w-[112px] lg:h-[196px] lg:w-[136px]">
                  <Image
                    src="/mail/qiyu-id-photo.png"
                    alt={`${P.name}证件照`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 112px, 136px"
                    priority
                  />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="grid grid-cols-4">
                  <GridLabel>姓名</GridLabel>
                  <GridValue>{P.name}</GridValue>
                  <GridLabel>性别</GridLabel>
                  <GridValue>{P.gender}</GridValue>

                  <GridLabel>出生日期</GridLabel>
                  <GridValue>{P.birthDate}</GridValue>
                  <GridLabel>国籍或地区</GridLabel>
                  <GridValue>{P.nationality}</GridValue>

                  <GridLabel>政治面貌</GridLabel>
                  <GridValue>{P.politicalStatus}</GridValue>
                  <GridLabel>民族</GridLabel>
                  <GridValue>{P.ethnicity}</GridValue>

                  <GridLabel>学号</GridLabel>
                  <GridValue className="font-mono">{P.studentId}</GridValue>
                  <GridLabel>身份证号</GridLabel>
                  <GridValue className="font-mono">{P.idCard}</GridValue>

                  <GridLabel>健康状况</GridLabel>
                  <GridValue>{P.health}</GridValue>
                  <GridLabel>电子邮箱</GridLabel>
                  <GridValue>{P.email}</GridValue>
                </div>
              </div>
            </div>

            <div className="mt-0 grid grid-cols-4 border-x border-b border-[#e8ebf0]">
              <InfoRow left={["户口所在地", P.hukou]} right={["所在学院", P.college]} />
              <InfoRow left={["学生类别", P.studentType]} right={["所读专业", P.major]} />
              <InfoRow left={["入学年份", P.enrollYear]} right={["毕业年份", P.graduateYear]} />
              <InfoRow left={["手机号码", P.mobile]} right={["微信号码", P.wechat]} />
              <InfoRow left={["家庭住址", P.address]} right={["家庭电话", P.homePhone]} />
              <InfoRow
                left={["紧急联系人", P.emergencyContact]}
                right={["紧急联系人电话", P.emergencyPhone]}
              />
              <InfoRow
                left={["与本人关系", P.emergencyRelation]}
                right={["辅导员姓名", P.counselor]}
              />
              <InfoRow
                left={["辅导员联系电话", P.counselorPhone]}
                right={["平均学分绩点", P.gpa]}
              />
              <InfoRow
                left={["是否全日制", P.fullTime]}
                right={["是否有不及格科目", P.failedCourses]}
              />
            </div>

            {expanded && (
              <div className="mt-6 lg:mt-8">
                <h2 className="mb-3 text-[14px] font-semibold text-[#222] lg:text-[16px]">系统账号信息</h2>
                <div className="grid grid-cols-4 border border-[#e8ebf0]">
                  <InfoRow
                    left={["学生系统账号", P.studentId]}
                    right={["学生系统初始密码", PLAYER.studentPassword]}
                  />
                  <InfoRow
                    left={["邮箱账号", PLAYER.email]}
                    right={["邮箱密码", PLAYER.emailPassword]}
                  />
                </div>
              </div>
            )}

            <div className="mt-6 lg:mt-8">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="pointer-events-auto flex items-center gap-1 text-[14px] text-[#c81623] hover:underline lg:text-[15px]"
              >
                {expanded ? "收起" : "展开全部"}
                <span className="text-[10px]">{expanded ? "▲" : "▼"}</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
