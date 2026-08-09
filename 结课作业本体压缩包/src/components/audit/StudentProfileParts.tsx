import type { ReactNode } from "react";

export const STUDENT_PROFILE_SIDEBAR = [
  "基本信息",
  "进度信息",
  "详细信息",
  "报告信息",
  "附件信息",
  "历史记录",
] as const;
export function ProfileCell({
  label,
  value,
  anomaly,
  mono,
  garbled,
  highlight,
}: {
  label: string;
  value: string;
  anomaly?: boolean;
  mono?: boolean;
  garbled?: boolean;
  highlight?: boolean;
}) {
  return (
    <>
      <div className="audit-student-profile__label">{label}</div>
      <div
        className={`audit-student-profile__value${anomaly ? " is-anomaly" : ""}${mono ? " is-mono" : ""}${garbled ? " is-garbled" : ""}${highlight ? " is-highlight" : ""}`}
      >
        {highlight ? <strong>{value}</strong> : value}
      </div>
    </>
  );
}

export function ProfileRow({
  left,
  right,
}: {
  left: {
    label: string;
    value: string;
    anomaly?: boolean;
    mono?: boolean;
    garbled?: boolean;
    highlight?: boolean;
  };
  right: {
    label: string;
    value: string;
    anomaly?: boolean;
    mono?: boolean;
    garbled?: boolean;
    highlight?: boolean;
  };
}) {
  return (
    <>
      <ProfileCell {...left} />
      <ProfileCell {...right} />
    </>
  );
}

export function StudentProfileSidebar({ active = "基本信息" }: { active?: string }) {
  return (
    <aside className="audit-student-profile__aside">
      <nav className="audit-student-profile__nav">
        {STUDENT_PROFILE_SIDEBAR.map((item) => (
          <div
            key={item}
            className={`audit-student-profile__nav-item${item === active ? " is-active" : ""}`}
          >
            {item}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export function StudentProfileHeader({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="audit-student-profile__header">
      <div>
        <h2 className="audit-student-profile__page-title">个人信息</h2>
        <div className="audit-student-profile__tab">基本信息</div>
      </div>
      <button type="button" className="audit-student-profile__expand" onClick={onToggle}>
        {expanded ? "收起部分" : "展开全部"}
      </button>
    </div>
  );
}

export function StudentProfilePhotoSlot({ children }: { children: ReactNode }) {
  return (
    <div className="audit-student-profile__photo">
      <div className="audit-student-profile__photo-frame">{children}</div>
    </div>
  );
}
