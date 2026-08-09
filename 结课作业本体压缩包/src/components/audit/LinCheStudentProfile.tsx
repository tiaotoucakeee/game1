"use client";

import { useState } from "react";
import { ClueTrigger } from "@/components/game/ClueTrigger";
import {
  ProfileRow,
  StudentProfileHeader,
  StudentProfileSidebar,
} from "@/components/audit/StudentProfileParts";
import { LIN_CHE } from "@/data/game";

const LIN_CHE_PHOTO = "/audit-expert/lin-che-id-photo.png";

export function LinCheStudentProfile() {
  const [expanded, setExpanded] = useState(true);
  const p = LIN_CHE.profile;

  return (
    <div className="audit-student-profile">
      <StudentProfileSidebar />

      <div className="audit-student-profile__content">
        <StudentProfileHeader expanded={expanded} onToggle={() => setExpanded((v) => !v)} />

        <div className="audit-student-profile__body">
          <div className="audit-student-profile__hero-card">
            <div className="audit-student-profile__photo">
              <div className="audit-student-profile__photo-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={LIN_CHE_PHOTO}
                  alt={`${LIN_CHE.name}证件照`}
                  className="audit-student-profile__photo-img"
                  draggable={false}
                />
              </div>
            </div>
            <div className="audit-student-profile__quick">
              <ProfileRow
                left={{ label: "姓名", value: LIN_CHE.name, highlight: true }}
                right={{ label: "性别", value: p.gender }}
              />
              <ProfileRow
                left={{ label: "出生日期", value: p.birthDate }}
                right={{ label: "国籍或地区", value: p.nationality }}
              />
              <ProfileRow
                left={{ label: "政治面貌", value: p.politicalStatus }}
                right={{ label: "民族", value: p.ethnicity }}
              />
              <ProfileRow
                left={{ label: "学号", value: LIN_CHE.studentId, mono: true, highlight: true }}
                right={{ label: "身份证号", value: p.idNumber, mono: true }}
              />
              <ProfileRow
                left={{ label: "健康状况", value: p.health }}
                right={{ label: "所在班级", value: p.className }}
              />
            </div>
          </div>

          {expanded ? (
            <div className="audit-student-profile__detail">
              <ProfileRow
                left={{ label: "所在学院", value: p.college }}
                right={{ label: "学生类别", value: p.studentType }}
              />
              <ProfileRow
                left={{ label: "所读专业", value: LIN_CHE.major, highlight: true }}
                right={{ label: "毕业年份", value: p.graduationYear }}
              />
              <ProfileRow
                left={{ label: "入学年份", value: p.enrollmentYear }}
                right={{ label: "手机号码", value: p.phone }}
              />
              <ProfileRow
                left={{ label: "电子邮箱", value: p.email, mono: true }}
                right={{ label: "微信号码", value: p.wechat }}
              />
              <ProfileRow
                left={{ label: "家庭住址", value: p.address }}
                right={{ label: "家庭电话", value: p.homePhone }}
              />
              <ProfileRow
                left={{ label: "紧急联系人姓名", value: p.emergencyName }}
                right={{ label: "紧急联系人电话", value: p.emergencyPhone }}
              />
              <ProfileRow
                left={{ label: "紧急联系人与本人关系", value: p.emergencyRelation }}
                right={{ label: "辅导员姓名", value: p.counselor }}
              />
              <ProfileRow
                left={{ label: "辅导员联系电话", value: p.counselorPhone }}
                right={{ label: "平均学分绩点", value: p.gpa }}
              />
              <ProfileRow
                left={{ label: "本专业年级排名", value: p.rank }}
                right={{ label: "专业人数", value: p.majorSize }}
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
            <ul className="audit-student-profile__check-list is-normal">
              <li>✓ 录取记录完整</li>
              <li>✓ 注册记录正常</li>
              <li>✓ 班级信息已绑定</li>
              <li>✓ 校园卡记录有效</li>
              <li>✓ 毕业状态登记正常</li>
            </ul>
          </section>

          <section className="audit-student-profile__block">
            <h3 className="audit-student-profile__block-title">获奖与项目记录</h3>
            <ul className="audit-student-profile__projects">
              {LIN_CHE.projects.map((item) => (
                <li key={item.id} className="audit-student-profile__project">
                  <div className="audit-student-profile__project-name">{item.name}</div>
                  <div className="audit-student-profile__project-award">
                    {item.award} · {item.role}
                  </div>
                  <div className="audit-student-profile__project-id">{item.id}</div>
                </li>
              ))}
            </ul>
          </section>

          <ClueTrigger id="project_lin_che" />
        </div>
      </div>
    </div>
  );
}
