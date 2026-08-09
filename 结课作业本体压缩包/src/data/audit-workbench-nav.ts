export type AuditNavItem = {
  label: string;
  href: string;
  code?: string;
};

export type AuditNavGroup = {
  id: string;
  title: string;
  icon: "folder" | "download" | "list" | "settings" | "audit";
  items: AuditNavItem[];
};

export const auditHomeNav = {
  label: "首页",
  href: "/audit/dashboard",
};

export const auditWorkbenchNav: AuditNavGroup[] = [
  {
    id: "graduate",
    title: "毕业生档案审核",
    icon: "folder",
    items: [
      { label: "优秀毕业生名单", href: "/audit/graduates", code: "W03" },
      { label: "学生档案查询", href: "/audit/student", code: "W04" },
    ],
  },
  {
    id: "resource",
    title: "资源与项目",
    icon: "list",
    items: [
      { label: "实验室申请记录", href: "/audit/lab", code: "W07" },
      { label: "学生项目查询", href: "/audit/project", code: "W12" },
    ],
  },
  {
    id: "conclusion",
    title: "审核结论",
    icon: "audit",
    items: [{ label: "提交审核意见", href: "/audit/submit", code: "W13" }],
  },
];

const breadcrumbMap: Record<string, string[]> = {
  "/audit/dashboard": ["首页"],
  "/audit/graduates": ["毕业生档案审核", "优秀毕业生名单"],
  "/audit/student": ["毕业生档案审核", "学生档案查询"],
  "/audit/lab": ["资源与项目", "实验室申请记录"],
  "/audit/project": ["资源与项目", "学生项目查询"],
  "/audit/submit": ["审核结论", "提交审核意见"],
};

const pageTitleMap: Record<string, string> = {
  "/audit/dashboard": "首页",
  "/audit/graduates": "优秀毕业生名单",
  "/audit/student": "学生档案查询",
  "/audit/lab": "实验室申请记录",
  "/audit/project": "学生项目查询",
  "/audit/submit": "提交审核意见",
};

export function getAuditBreadcrumb(pathname: string): string[] {
  return breadcrumbMap[pathname] ?? ["首页"];
}

export function getAuditPageTitle(pathname: string): string {
  return pageTitleMap[pathname] ?? "首页";
}

export function isAuditNavActive(pathname: string, href: string): boolean {
  return pathname === href;
}

export function isAuditHome(pathname: string): boolean {
  return pathname === "/audit/dashboard";
}
