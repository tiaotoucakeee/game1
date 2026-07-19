# expert.cuc.edu.cn — LeftMenuT.do Clone Research

## Source Limitation

Live URL [https://expert.cuc.edu.cn/Main/LeftMenuT.do](https://expert.cuc.edu.cn/Main/LeftMenuT.do) redirects to **CUC SSO** (统一身份认证). Automated browser extraction cannot access the authenticated shell without user session.

**Authoritative source:** User-saved page bundle:

- `外事工作服务系统.html` → shell structure reference
- `外事工作服务系统_files/` → CSS, JS, logo, `MainHome.html`

Assets copied to `public/audit-expert/`.

## Page Topology

| Layer | File | Role |
|-------|------|------|
| Outer shell | `shell.html` + `shell-layout.css` | Navbar, sidebar, breadcrumbs, footer, inner iframe |
| Home (MainHome.do) | `MainHome-arg.html` | 8+4 grid widgets, cards, notices — matches reference home |
| Game pages | Next.js `/audit/*?embed=1` | Graduates table, student lookup, etc. |
| Bridge | `audit-bridge.js`, `mainhome-bridge.js` | Menu + postMessage navigation |

## Interaction Model

- **Shell sidebar / breadcrumbs:** click-driven → `postMessage` → Next.js router
- **MainHome cards:** click-driven → same bridge
- **Inner embed pages:** static render + AuditGate (localStorage session)

## Fidelity Notes

- Do **not** load `ace.min.js` in shell (prevents double `padding-top` layout bugs)
- Dashboard uses static `MainHome-arg.html` (original DOM + `MainHome.css`) not React reimplementation
- School branding text replaced: 数字媒体中心审核工作台 / 临时审核员

## Credentials

Never commit or request SSO passwords. Saved HTML is sufficient for visual clone.
