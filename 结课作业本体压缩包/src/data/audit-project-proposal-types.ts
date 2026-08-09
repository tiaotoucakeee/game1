export type ProjectProposalMember = {
  name: string;
  studentId?: string;
  major: string;
  role: string;
  projectTime?: string;
  highlight?: boolean;
};

export type ProjectProposalSection = {
  heading: string;
  paragraphs: readonly string[];
  alert?: boolean;
};

export type AuditProjectProposalDoc = {
  code: string;
  title: string;
  type: string;
  college: string;
  lead: string;
  leadMajor: string;
  advisor: string;
  platform: string;
  startDate: string;
  endDate: string;
  status: string;
  sections: readonly ProjectProposalSection[];
  members: readonly ProjectProposalMember[];
  showMemberProjectTime?: boolean;
  systemNote?: {
    label: string;
    value: string;
    anomaly?: boolean;
    remark: string;
  };
};

export const SHANHAI_LAMP_PROJECT_CODE = "CYA-P-2034-02";
export const CREATIVE_YARD_PROJECT_CODE = "CYA-P-2030-01";
/** 创作路径账号，查询时映射至主项目立项档案 */
export const CREATIVE_YARD_ACCOUNT_CODE = "CYA-0000";
