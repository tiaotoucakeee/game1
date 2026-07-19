"use client";

import { useEffect, useState } from "react";
import { CHENG_YE } from "@/data/game";
import {
  ProfileCell,
  ProfileRow,
  StudentProfileHeader,
  StudentProfileSidebar,
} from "@/components/audit/StudentProfileParts";

const CHENG_YE_PHOTO = "/audit-expert/cheng-ye-id-photo.png";
const CHENG_YE_PHOTO_GLITCH = "/audit-expert/cheng-ye-id-photo-glitch.png";

function FlickeringMajorCell() {
  const majors = CHENG_YE.flickerMajors;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % majors.length);
    }, 820);
    return () => window.clearInterval(id);
  }, [majors.length]);

  return (
    <>
      <div className="audit-student-profile__label">所读专业</div>
      <div className="audit-student-profile__value is-anomaly is-flicker" key={majors[index]}>
        {majors[index]}
      </div>
    </>
  );
}

function ChengYeProfilePhoto() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    let waitTimer = 0;
    let glitchTimer = 0;

    function scheduleGlitch() {
      waitTimer = window.setTimeout(() => {
        setGlitch(true);
        glitchTimer = window.setTimeout(() => {
          setGlitch(false);
          scheduleGlitch();
        }, 90 + Math.random() * 90);
      }, 1200 + Math.random() * 1800);
    }

    scheduleGlitch();
    return () => {
      window.clearTimeout(waitTimer);
      window.clearTimeout(glitchTimer);
    };
  }, []);

  return (
    <div className="audit-student-profile__photo">
      <div className={`audit-student-profile__photo-frame${glitch ? " is-glitching" : ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CHENG_YE_PHOTO}
          alt={`${CHENG_YE.name}证件照`}
          className="audit-student-profile__photo-img"
          draggable={false}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CHENG_YE_PHOTO_GLITCH}
          alt=""
          aria-hidden
          className="audit-student-profile__photo-glitch"
          draggable={false}
        />
      </div>
    </div>
  );
}

export function ChengYeStudentProfile() {
  const [expanded, setExpanded] = useState(true);
  const p = CHENG_YE.profile;

  return (
    <div className="audit-student-profile">
      <StudentProfileSidebar />

      <div className="audit-student-profile__content">
        <StudentProfileHeader expanded={expanded} onToggle={() => setExpanded((v) => !v)} />

        <div className="audit-student-profile__body">
          <div className="audit-student-profile__hero-card">
            <ChengYeProfilePhoto />
            <div className="audit-student-profile__quick">
              <ProfileRow
                left={{ label: "姓名", value: CHENG_YE.name }}
                right={{ label: "性别", value: p.gender }}
              />
              <ProfileRow
                left={{ label: "出生日期", value: p.birthDate, garbled: true }}
                right={{ label: "国籍或地区", value: p.nationality }}
              />
              <ProfileRow
                left={{ label: "政治面貌", value: p.politicalStatus, garbled: true }}
                right={{ label: "民族", value: p.ethnicity }}
              />
              <ProfileRow
                left={{ label: "学号", value: CHENG_YE.studentId, mono: true }}
                right={{ label: "身份证号", value: p.idNumber, garbled: true, mono: true }}
              />
              <ProfileRow
                left={{ label: "健康状况", value: p.health, garbled: true }}
                right={{
                  label: "内部编号",
                  value: CHENG_YE.internalId,
                  mono: true,
                  anomaly: true,
                }}
              />
            </div>
          </div>

          {expanded ? (
            <div className="audit-student-profile__detail">
              <ProfileRow
                left={{ label: "所在学院", value: p.college }}
                right={{ label: "学生类别", value: p.studentType }}
              />
              <FlickeringMajorCell />
              <ProfileCell label="毕业年份" value={p.graduationYear} />
              <ProfileRow
                left={{ label: "入学年份", value: p.enrollmentYear, garbled: true }}
                right={{ label: "手机号码", value: p.phone, garbled: true }}
              />
              <ProfileRow
                left={{ label: "电子邮箱", value: p.email, mono: true }}
                right={{ label: "微信号码", value: p.wechat, garbled: true }}
              />
              <ProfileRow
                left={{ label: "家庭住址", value: p.address, garbled: true }}
                right={{ label: "家庭电话", value: p.homePhone, garbled: true }}
              />
              <ProfileRow
                left={{ label: "紧急联系人姓名", value: p.emergencyName, garbled: true }}
                right={{ label: "紧急联系人电话", value: p.emergencyPhone, garbled: true }}
              />
              <ProfileRow
                left={{ label: "紧急联系人与本人关系", value: p.emergencyRelation, garbled: true }}
                right={{ label: "辅导员姓名", value: p.counselor, garbled: true }}
              />
              <ProfileRow
                left={{ label: "辅导员联系电话", value: p.counselorPhone, garbled: true }}
                right={{ label: "平均学分绩点", value: p.gpa, anomaly: true }}
              />
              <ProfileRow
                left={{ label: "本专业年级排名", value: p.rank, garbled: true }}
                right={{ label: "专业人数", value: p.majorSize, garbled: true }}
              />
              <ProfileRow
                left={{ label: "是否全日制在校生", value: p.fullTime }}
                right={{ label: "是否有不及格科目", value: p.failedCourses }}
              />
              <ProfileRow
                left={{ label: "是否获得过同类项目奖学金", value: p.scholarship }}
                right={{ label: "是否在处分期内", value: p.disciplinary }}
              />
            </div>
          ) : null}

          <section className="audit-student-profile__block">
            <h3 className="audit-student-profile__block-title">学籍核验</h3>
            <ul className="audit-student-profile__check-list">
              <li>✗ 无录取记录</li>
              <li>✗ 无注册记录</li>
              <li>✗ 无班级信息</li>
              <li>✗ 无校园卡记录</li>
              <li>✗ 无毕业状态登记</li>
            </ul>
          </section>

          <section className="audit-student-profile__block">
            <h3 className="audit-student-profile__block-title">获奖与项目记录</h3>
            <ul className="audit-student-profile__projects">
              {CHENG_YE.projects.map((item) => (
                <li key={item.id} className="audit-student-profile__project">
                  <div className="audit-student-profile__project-name">{item.name}</div>
                  <div className="audit-student-profile__project-award">{item.award}</div>
                  {"redactId" in item && item.redactId ? (
                    <div
                      className="audit-student-profile__project-id is-redacted"
                      aria-label="项目编码已打码"
                    >
                      <span className="audit-student-profile__project-id-mosaic" />
                    </div>
                  ) : (
                    <div className="audit-student-profile__project-id">{item.id}</div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
