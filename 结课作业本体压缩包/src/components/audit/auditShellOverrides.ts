/** iframe 内页：仅 widget / 表格，避免 LeftMenuT 外壳样式与 Tailwind 冲突 */
export const AUDIT_EMBED_OVERRIDE_CSS = `
.audit-embed-root{display:block;min-height:100%;margin:0;padding:0;background:#eef2f6;box-sizing:border-box;font-family:"Microsoft YaHei","PingFang SC",Arial,sans-serif;font-size:13px;color:#333}
.audit-embed-root *,.audit-embed-root *::before,.audit-embed-root *::after{box-sizing:border-box}
.audit-embed-page{padding:8px 10px 12px}
.audit-embed-page.audit-graduates-page{padding:8px 8px 12px 10px;overflow:visible;font-size:14px}
.audit-graduates-layout{display:flex;align-items:flex-start;gap:0;width:100%}
.audit-graduates-table-panel{flex:1 1 auto;min-width:0;max-width:calc(100% - 660px)}
.audit-graduates-paper-zone{flex:0 0 660px;width:660px;min-height:760px;pointer-events:none}
.audit-graduates-page .widget-body{padding:14px 12px 14px 14px;overflow:visible!important}
.audit-graduates-page .widget{overflow:visible!important}
.audit-graduates-page .audit-query-table-wrap{overflow:visible!important;background:#fff;padding-bottom:8px}
.audit-graduates-page .audit-query-table{min-width:0;width:100%;table-layout:fixed}
.audit-graduates-page .audit-query-table .col-bio{word-break:break-word;overflow-wrap:anywhere;white-space:normal}
.audit-graduates-page .audit-query-table tbody tr:last-child .audit-op-wrap{z-index:200;position:relative}
.audit-graduates-page .audit-query-table tbody tr:last-child .audit-op-menu{top:auto;bottom:calc(100% + 4px);z-index:1000}
.audit-graduates-page{overflow-x:hidden;scrollbar-width:none;-ms-overflow-style:none}
.audit-graduates-page::-webkit-scrollbar{display:none;width:0;height:0}
.audit-graduates-page .widget-caption{font-size:16px}
.audit-graduates-page .audit-query-table{font-size:14px}
.audit-graduates-page .audit-query-table thead th{padding:12px 10px;font-size:14px}
.audit-graduates-page .audit-query-table tbody td{padding:12px 10px;font-size:14px;line-height:1.55;overflow:visible!important}
.audit-graduates-layout{overflow:visible!important}
.audit-graduates-table-panel{overflow:visible!important}
.audit-graduates-page .audit-query-table .col-seq{width:56px}
.audit-graduates-page .audit-query-table .col-id{width:118px;font-size:13px}
.audit-graduates-page .audit-query-table .col-major{width:128px}
.audit-graduates-page .audit-query-table .col-name{width:80px}
.audit-graduates-page .audit-query-table .col-bio{min-width:160px;max-width:340px;font-size:14px;line-height:1.65;color:#444}
.audit-graduates-page .audit-query-table .col-op{width:92px;overflow:visible!important}
.audit-graduates-page .audit-op-btn{padding:6px 12px;font-size:13px}
.audit-graduates-submit{display:flex;justify-content:flex-end;padding:14px 4px 4px;border-top:1px solid #ececec;margin-top:4px}
.audit-graduates-submit__btn{min-width:96px;padding:8px 28px;border:none;border-radius:4px;background:#3280fc;color:#fff;font-size:14px;font-weight:600;line-height:1.4;cursor:pointer;transition:background .2s ease,opacity .2s ease,box-shadow .2s ease;box-shadow:0 1px 3px rgba(50,128,252,.35)}
.audit-graduates-submit__btn:hover:not(:disabled){background:#2868d4}
.audit-graduates-submit__btn.is-disabled,.audit-graduates-submit__btn:disabled{background:#d9d9d9;color:#999;cursor:not-allowed;box-shadow:none}
.audit-terminal-boot{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;background:rgba(8,18,12,.72);opacity:0;pointer-events:none;transition:opacity .4s ease}
.audit-terminal-boot.is-entering,.audit-terminal-boot.is-holding,.audit-terminal-boot.is-exiting{pointer-events:auto}
.audit-terminal-boot.is-entering{opacity:1}
.audit-terminal-boot.is-holding{opacity:1}
.audit-terminal-boot.is-exiting{opacity:0;transition:opacity .6s ease}
.audit-terminal-boot__scan{position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(125,255,179,.03) 0,rgba(125,255,179,.03) 1px,transparent 1px,transparent 4px);opacity:.6;animation:audit-boot-scan 2.4s linear infinite}
.audit-terminal-boot__panel{position:relative;width:min(420px,calc(100vw - 48px));padding:28px 32px 24px;border:2px solid #3a5a40;border-radius:10px;background:rgba(15,26,18,.94);box-shadow:0 12px 40px rgba(0,0,0,.45);text-align:center;font-family:Consolas,"Courier New",monospace;transform:translateY(12px) scale(.96);opacity:0}
.audit-terminal-boot.is-entering .audit-terminal-boot__panel{animation:audit-boot-panel-in .45s cubic-bezier(.22,1,.36,1) forwards}
.audit-terminal-boot.is-holding .audit-terminal-boot__panel,.audit-terminal-boot.is-exiting .audit-terminal-boot__panel{transform:translateY(0) scale(1);opacity:1}
.audit-terminal-boot__icon{display:flex;justify-content:center;gap:8px;margin-bottom:16px}
.audit-terminal-boot__dot{width:8px;height:8px;border-radius:50%;background:#7dffb3;animation:audit-boot-pulse 1s ease-in-out infinite}
.audit-terminal-boot__dot:nth-child(2){animation-delay:.15s}
.audit-terminal-boot__dot:nth-child(3){animation-delay:.3s}
.audit-terminal-boot__title{margin:0 0 8px;font-size:20px;font-weight:700;color:#7dffb3;letter-spacing:.06em}
.audit-terminal-boot__sub{margin:0 0 18px;font-size:13px;color:#6a9a78}
.audit-terminal-boot__bar{height:3px;border-radius:2px;background:rgba(58,90,64,.6);overflow:hidden}
.audit-terminal-boot__bar-fill{display:block;height:100%;width:0;background:linear-gradient(90deg,#3a5a40,#7dffb3);animation:audit-boot-bar 2.2s ease-out forwards}
@keyframes audit-boot-scan{0%{transform:translateY(-100%)}100%{transform:translateY(100%)}}
@keyframes audit-boot-panel-in{to{transform:translateY(0) scale(1);opacity:1}}
@keyframes audit-boot-pulse{0%,100%{opacity:.35;transform:scale(.85)}50%{opacity:1;transform:scale(1)}}
@keyframes audit-boot-bar{to{width:100%}}
.audit-embed-root:has(.audit-graduates-page){overflow:visible!important}
.audit-embed-page .widget{background:#fff;border:1px solid #ddd;margin-bottom:0;box-shadow:0 1px 2px rgba(0,0,0,.04)}
.audit-embed-page .widget-header{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:44px;padding:0 14px;background:linear-gradient(180deg,#fafcff 0%,#f3f7fb 100%);border-bottom:1px solid #ddd}
.audit-embed-page .widget-caption{font-size:15px;font-weight:700;color:#000}
.audit-embed-page .widget-body{padding:14px}
.audit-embed-subtitle{margin:0 0 12px;font-size:12px;color:#888}
.audit-student-page .audit-inner-widget{margin-bottom:0}
.audit-student-query{max-width:560px;margin:8px auto 0;padding:8px 0 12px}
.audit-student-query__hint{margin:0 0 18px;font-size:14px;line-height:1.65;color:#555}
.audit-student-query__hint strong{color:#333;font-weight:700}
.audit-student-query__form{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.audit-student-query__label{flex:0 0 auto;font-size:14px;font-weight:600;color:#333}
.audit-student-query__input{flex:1 1 220px;min-width:180px;padding:9px 12px;border:1px solid #d8dde3;border-radius:4px;font-size:14px;font-family:Consolas,"Courier New",monospace;color:#333;background:#fff;outline:none;transition:border-color .2s ease,box-shadow .2s ease}
.audit-student-query__input:focus{border-color:#3280fc;box-shadow:0 0 0 2px rgba(50,128,252,.15)}
.audit-student-query__input::placeholder{color:#aaa;font-family:"Microsoft YaHei","PingFang SC",Arial,sans-serif}
.audit-student-query__btn{flex:0 0 auto;padding:9px 22px;border:none;border-radius:4px;background:#3280fc;color:#fff;font-size:14px;font-weight:600;line-height:1.4;cursor:pointer;transition:background .2s ease}
.audit-student-query__btn:hover{background:#2868d4}
.audit-student-query__error{margin:12px 0 0;font-size:13px;color:#d9534f;line-height:1.5}
.audit-student-query__sealed{margin:12px 0 0;padding:10px 12px;border:1px solid #f0d9a8;border-radius:4px;background:#fffbf0;font-size:13px;color:#8a6d3b;line-height:1.5}
.audit-student-query__note{margin:18px 0 0;padding-top:14px;border-top:1px dashed #e4e8ed;font-size:12px;line-height:1.6;color:#999}
.audit-student-query__reset{padding:5px 12px;border:1px solid #c5ced8;border-radius:2px;background:#fff;color:#555;font-size:12px;line-height:1.4;cursor:pointer;transition:background .2s ease,border-color .2s ease}
.audit-student-query__reset:hover{background:#f5f9ff;border-color:#3280fc;color:#3280fc}
.audit-student-shell{background:#fff;border:1px solid #ddd;box-shadow:0 1px 2px rgba(0,0,0,.04)}
.audit-student-shell__head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 14px;border-bottom:1px solid #e4e8ed;background:linear-gradient(180deg,#f9fbfd 0%,#f0f4f8 100%)}
.audit-student-shell__title{margin:0;padding-left:10px;font-size:14px;font-weight:700;color:#0068b7;border-left:4px solid #0068b7;line-height:1.4}
.audit-student-shell__body{padding:0}
.audit-student-query-panel{padding:14px}
.audit-project-proposal{padding:16px 18px 20px;line-height:1.75;font-size:13px;color:#606266}
.audit-project-proposal__doc-head{margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid #ebeef5}
.audit-project-proposal__doc-title{margin:0;font-size:17px;font-weight:700;color:#333;line-height:1.45}
.audit-project-proposal__doc-sub{margin:6px 0 0;font-size:12px;color:#999}
.audit-project-proposal__meta-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0;margin:0 0 18px;border:1px solid #ebeef5;border-radius:2px;overflow:hidden}
.audit-project-proposal__meta-row{display:contents}
.audit-project-proposal__meta-row dt{padding:9px 12px;background:#fafafa;border-bottom:1px solid #ebeef5;border-right:1px solid #ebeef5;font-size:12px;color:#666;font-weight:600}
.audit-project-proposal__meta-row dd{margin:0;padding:9px 12px;background:#fff;border-bottom:1px solid #ebeef5;font-size:13px;color:#333;word-break:break-word}
.audit-project-proposal__meta-row dd.is-success{color:#3280fc;font-weight:600}
.audit-project-proposal__meta-row dd.is-anomaly{color:#d9534f;font-weight:600}
.audit-project-proposal__section{margin-bottom:20px}
.audit-project-proposal__section--border{border-top:1px solid #ebeef5;padding-top:20px}
.audit-project-proposal__heading{margin:0 0 8px;font-weight:600;font-size:14px;color:#333}
.audit-project-proposal__text{margin:0 0 10px;color:#606266}
.audit-project-proposal__text:last-child{margin-bottom:0}
.audit-project-proposal__text.is-alert{color:#3280fc;font-weight:600}
.audit-project-proposal__text.is-muted{color:#888;font-size:12px}
.audit-project-proposal__table-wrap{overflow-x:auto;margin-top:4px;border:1px solid #ebeef5;border-radius:2px}
.audit-project-proposal__table{width:100%;border-collapse:collapse;font-size:12px;background:#fff}
.audit-project-proposal__table th,.audit-project-proposal__table td{padding:9px 10px;border-bottom:1px solid #ebeef5;text-align:left;vertical-align:top}
.audit-project-proposal__table th{background:#f0f4f8;color:#555;font-weight:700}
.audit-project-proposal__table tbody tr:last-child td{border-bottom:none}
.audit-project-proposal__table tbody tr.is-lead td{color:#333}
.audit-project-proposal__meta-row dd.is-lead strong{color:#333}
.audit-project-proposal__text strong{color:#333;font-weight:700}
.audit-project-proposal__system-note{margin:0 0 10px;border:1px solid #fde2e2;border-radius:2px;overflow:hidden;background:#fffafa}
.audit-project-proposal__system-note .audit-project-proposal__meta-row dt{background:#fff5f5;color:#c45656}
.audit-project-proposal__related{margin-top:0;padding-top:18px;border-top:1px solid #ebeef5}
.audit-project-proposal__related .audit-project-proposal__heading{margin-bottom:6px}
.audit-student-shell__toolbar{padding:10px 14px 0}
.audit-project-query-history{display:flex;align-items:flex-start;gap:10px;flex-wrap:wrap;margin-bottom:12px}
.audit-project-query-history__label{flex:0 0 auto;font-size:12px;font-weight:600;color:#888;line-height:28px}
.audit-project-query-history__list{display:flex;flex-wrap:wrap;gap:8px}
.audit-project-query-history__item{display:flex;flex-direction:column;align-items:flex-start;gap:2px;padding:6px 10px;border:1px solid #d8dde3;border-radius:4px;background:#fafbfc;color:#555;font-size:12px;line-height:1.35;cursor:pointer;transition:background .2s ease,border-color .2s ease,color .2s ease}
.audit-project-query-history__item:hover{background:#f0f7ff;border-color:#3280fc;color:#3280fc}
.audit-project-query-history__item.is-active{background:#eef5ff;border-color:#3280fc;color:#0068b7;box-shadow:inset 0 0 0 1px rgba(50,128,252,.12)}
.audit-project-query-history__name{font-weight:600}
.audit-project-query-history__code{font-family:Consolas,"Courier New",monospace;font-size:11px;opacity:.85}
.audit-student-query__note--inline{margin:0;padding:10px 18px 0;font-size:12px;line-height:1.6;color:#999;border-top:none}
.audit-student-page--cya{background:#111;color:#e8e8e8}
.audit-embed-root:has(.audit-student-page--cya){background:#111!important}
.audit-student-page--cya .audit-student-shell{background:#1a1a1a;border-color:#333;box-shadow:none}
.audit-student-page--cya .audit-student-shell__head{background:linear-gradient(180deg,#222 0%,#1a1a1a 100%);border-color:#333}
.audit-student-page--cya .audit-student-shell__title{color:#9fd0ff;border-color:#9fd0ff}
.audit-student-page--cya .audit-student-query__reset{background:#222;border-color:#444;color:#ccc}
.audit-student-page--cya .audit-student-query__reset:hover{background:#2a2a2a;border-color:#9fd0ff;color:#9fd0ff}
.audit-student-page--cya .audit-project-query-history__label{color:#888}
.audit-student-page--cya .audit-project-query-history__item{background:#222;border-color:#444;color:#ccc}
.audit-student-page--cya .audit-project-query-history__item:hover{background:#243040;border-color:#9fd0ff;color:#9fd0ff}
.audit-student-page--cya .audit-project-query-history__item.is-active{background:#1e2a35;border-color:#9fd0ff;color:#9fd0ff}
.audit-student-page--cya .audit-student-query__note,.audit-student-page--cya .audit-student-query__note--inline{color:#888;border-color:#333}
.audit-student-page--cya .audit-project-proposal{padding-top:12px;color:#ccc}
.audit-student-page--cya .audit-project-proposal__doc-head{border-color:#333}
.audit-student-page--cya .audit-project-proposal__doc-title{color:#fff}
.audit-student-page--cya .audit-project-proposal__doc-sub{color:#888}
.audit-student-page--cya .audit-project-proposal__meta-grid{border-color:#333}
.audit-student-page--cya .audit-project-proposal__meta-row dt{background:#252525;color:#aaa;border-color:#333}
.audit-student-page--cya .audit-project-proposal__meta-row dd{background:#1a1a1a;color:#e8e8e8;border-color:#333}
.audit-student-page--cya .audit-project-proposal__meta-row dd.is-success{color:#9fd0ff}
.audit-student-page--cya .audit-project-proposal__meta-row dd.is-anomaly{color:#ff8f8f}
.audit-student-page--cya .audit-project-proposal__meta-row dd.is-lead strong,.audit-student-page--cya .audit-project-proposal__text strong{color:#fff}
.audit-student-page--cya .audit-project-proposal__heading{color:#fff}
.audit-student-page--cya .audit-project-proposal__text{color:#bbb}
.audit-student-page--cya .audit-project-proposal__text.is-alert{color:#9fd0ff}
.audit-student-page--cya .audit-project-proposal__text.is-muted{color:#888}
.audit-student-page--cya .audit-project-proposal__section--border{border-color:#333}
.audit-student-page--cya .audit-project-proposal__table-wrap{border-color:#333}
.audit-student-page--cya .audit-project-proposal__table{background:#1a1a1a}
.audit-student-page--cya .audit-project-proposal__table th{background:#252525;color:#aaa;border-color:#333}
.audit-student-page--cya .audit-project-proposal__table td{border-color:#333;color:#ddd}
.audit-student-page--cya .audit-project-proposal__table tbody tr.is-lead td{color:#fff}
.audit-student-page--cya .audit-project-proposal__system-note{border-color:#5a3030;background:#221818}
.audit-student-page--cya .audit-project-proposal__system-note .audit-project-proposal__meta-row dt{background:#2a1818;color:#ff9a9a}
.audit-student-page--cya .audit-project-proposal__related{border-color:#333}
.audit-student-page--cya a{color:#9fd0ff}
@media (max-width:720px){.audit-project-proposal__meta-grid{grid-template-columns:1fr}}
.audit-lab-records{padding:16px 18px 20px}
.audit-lab-records__toolbar{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:12px}
.audit-lab-records__query-meta{margin:0;font-size:13px;color:#333;line-height:1.55}
.audit-lab-records__query-name{color:#888}
.audit-lab-records__summary{margin:0;font-size:12px;color:#888;line-height:1.55}
.audit-lab-records__table-wrap{overflow:auto;border:1px solid #ebeef5;border-radius:2px;background:#fff}
.audit-lab-records__table{width:100%;min-width:860px;border-collapse:collapse;font-size:12px}
.audit-lab-records__table th,.audit-lab-records__table td{padding:10px 12px;border-bottom:1px solid #ebeef5;text-align:left;vertical-align:top;line-height:1.5}
.audit-lab-records__table th{background:#f0f4f8;color:#555;font-weight:700;white-space:nowrap}
.audit-lab-records__table tbody tr:last-child td{border-bottom:none}
.audit-lab-records__table tbody tr.is-lead{background:#fffaf7}
.audit-lab-records__table tbody tr.is-lead td{color:#333}
.audit-lab-records__mono{font-family:Consolas,"Courier New",monospace;font-size:11px;color:#666;white-space:nowrap}
.audit-lab-records__badge{display:inline-block;min-width:40px;padding:2px 8px;border-radius:2px;font-weight:600;text-align:center}
.audit-lab-records__badge.is-pass{color:#67c23a;background:#f0f9eb}
.audit-lab-records__badge.is-reject{color:#f56c6c;background:#fef0f0}
.audit-lab-records > a{display:inline-block;margin-top:14px}
.audit-student-profile{display:flex;align-items:stretch;min-height:560px;background:#fff;font-size:15px;color:#333;line-height:1.5}
.audit-student-profile__aside{flex:0 0 168px;width:168px;border-right:1px solid #e8ebf0;background:#fff}
.audit-student-profile__nav{padding:8px 0 12px}
.audit-student-profile__nav-item{position:relative;padding:12px 20px;font-size:15px;color:#999;cursor:default;line-height:1.45}
.audit-student-profile__nav-item.is-active{background:#fff5f5;font-weight:600;color:#c81623}
.audit-student-profile__nav-item.is-active::before{content:"";position:absolute;left:0;top:0;width:3px;height:100%;background:#c81623}
.audit-student-profile__content{flex:1 1 auto;min-width:0;padding:0}
.audit-student-profile__header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:20px 28px 18px;border-bottom:1px solid #e8ebf0}
.audit-student-profile__page-title{margin:0;font-size:20px;font-weight:700;color:#222;line-height:1.35}
.audit-student-profile__tab{display:inline-block;margin-top:12px;border-bottom:2px solid #c81623;padding-bottom:4px;font-size:15px;font-weight:600;color:#c81623}
.audit-student-profile__expand{flex-shrink:0;border:none;background:none;color:#3280fc;font-size:15px;line-height:1.45;cursor:pointer;padding:4px 0}
.audit-student-profile__expand:hover{text-decoration:underline}
.audit-student-profile__body{padding:24px 28px 28px}
.audit-student-profile__hero-card{display:flex;border:1px solid #e8ebf0;background:#fff}
.audit-student-profile__photo{flex:0 0 168px;width:168px;display:flex;align-items:center;justify-content:center;padding:20px;border-right:1px solid #e8ebf0;background:#fafafa}
.audit-student-profile__photo-frame{position:relative;width:136px;height:196px;overflow:hidden;border:1px solid #e8ebf0;background:#f5f5f5}
.audit-student-profile__photo-img{display:block;width:100%;height:100%;object-fit:cover;object-position:center top}
.audit-student-profile__photo-glitch{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;opacity:0;pointer-events:none;transition:opacity .04s linear}
.audit-student-profile__photo-frame.is-glitching .audit-student-profile__photo-glitch{opacity:1}
.audit-student-profile__photo-frame.is-glitching{filter:contrast(1.06) saturate(.92)}
.audit-student-profile__quick{flex:1 1 auto;min-width:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));align-content:start}
.audit-student-profile__detail{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border:1px solid #e8ebf0;border-top:none;background:#fff}
.audit-student-profile__label{padding:14px 18px;background:#fafafa;border-right:1px solid #e8ebf0;border-bottom:1px solid #e8ebf0;font-size:15px;color:#666;line-height:1.5}
.audit-student-profile__value{padding:14px 18px;background:#fff;border-right:1px solid #e8ebf0;border-bottom:1px solid #e8ebf0;font-size:15px;color:#333;line-height:1.5;word-break:break-word}
.audit-student-profile__quick .audit-student-profile__label:nth-child(4n),.audit-student-profile__quick .audit-student-profile__value:nth-child(4n),.audit-student-profile__detail .audit-student-profile__label:nth-child(4n),.audit-student-profile__detail .audit-student-profile__value:nth-child(4n){border-right:none}
.audit-student-profile__value.is-anomaly{color:#d9534f;font-weight:600}
.audit-student-profile__value.is-garbled{color:#555;font-family:Consolas,"Courier New",monospace;letter-spacing:.02em}
.audit-student-profile__value.is-flicker{animation:audit-major-flicker .82s ease-in-out}
.audit-student-profile__value.is-mono{font-family:Consolas,"Courier New",monospace}
.audit-student-profile__value.is-highlight strong{color:#333;font-weight:700}
.audit-student-profile__photo-frame--placeholder{display:flex;align-items:center;justify-content:center;background:linear-gradient(180deg,#4a86d8 0%,#2a6fd6 100%)}
.audit-student-profile__photo-initials{font-size:22px;font-weight:700;color:rgba(255,255,255,.92);letter-spacing:.08em}
.audit-student-profile__check-list.is-normal{color:#333}
.audit-student-profile__check-list.is-normal li{color:#52a352}
@keyframes audit-major-flicker{0%,100%{opacity:1}45%{opacity:.55}50%{opacity:1}}
.audit-student-profile__block{padding:22px 0 0;margin-top:22px;border-top:1px solid #e8ebf0}
.audit-student-profile__block:first-of-type{margin-top:24px}
.audit-student-profile__block-title{margin:0 0 14px;font-size:16px;font-weight:700;color:#222}
.audit-student-profile__check-list{margin:0;padding-left:20px;color:#d9534f;font-size:15px;line-height:1.85}
.audit-student-profile__conclusion{margin:12px 0 0;font-size:15px;font-weight:600;color:#333}
.audit-student-profile__projects{margin:0;padding:0;list-style:none}
.audit-student-profile__project{margin-bottom:14px;padding:16px;border:1px solid #ebeef5;border-radius:2px;font-size:15px;background:#fafbfc}
.audit-student-profile__project-name{font-weight:600;color:#333;font-size:15px}
.audit-student-profile__project-award{margin-top:6px;color:#666;font-size:14px;line-height:1.55}
.audit-student-profile__project-id{margin-top:6px;font-family:Consolas,monospace;font-size:13px;color:#999}
.audit-student-profile__project-id.is-redacted{margin-top:8px}
.audit-student-profile__project-id-mosaic{display:inline-block;width:96px;height:14px;border-radius:2px;background:repeating-linear-gradient(90deg,#bbb 0,#bbb 3px,#ddd 3px,#ddd 6px);opacity:.85}
.audit-student-profile__footnote{margin:12px 0 8px;font-size:14px;color:#888;line-height:1.6}
@media (max-width:960px){
  .audit-student-profile{flex-direction:column;font-size:14px}
  .audit-student-profile__aside{flex:none;width:100%;border-right:none;border-bottom:1px solid #e8ebf0}
  .audit-student-profile__nav{display:flex;flex-wrap:wrap;gap:4px;padding:8px 12px 12px}
  .audit-student-profile__nav-item{padding:8px 14px 8px 18px;font-size:14px}
  .audit-student-profile__header{padding:16px 18px}
  .audit-student-profile__page-title{font-size:18px}
  .audit-student-profile__body{padding:18px}
  .audit-student-profile__hero-card{flex-direction:column}
  .audit-student-profile__photo{flex:none;width:100%;border-right:none;border-bottom:1px solid #e8ebf0}
  .audit-student-profile__quick,.audit-student-profile__detail{grid-template-columns:repeat(2,minmax(0,1fr))}
  .audit-student-profile__quick .audit-student-profile__label:nth-child(4n),.audit-student-profile__quick .audit-student-profile__value:nth-child(4n),.audit-student-profile__detail .audit-student-profile__label:nth-child(4n),.audit-student-profile__detail .audit-student-profile__value:nth-child(4n){border-right:1px solid #e8ebf0}
  .audit-student-profile__quick .audit-student-profile__label:nth-child(2n),.audit-student-profile__quick .audit-student-profile__value:nth-child(2n),.audit-student-profile__detail .audit-student-profile__label:nth-child(2n),.audit-student-profile__detail .audit-student-profile__value:nth-child(2n){border-right:none}
}
.audit-embed-submit{margin-top:6px}
.audit-embed-table{font-size:12px;margin-bottom:0;background:#fff}
.audit-embed-table th{background:#f0f4f8;color:#555;font-weight:700;text-align:center}
.audit-embed-table td{vertical-align:middle}
.audit-row-anomaly td{background:#fef0f0!important}
.audit-row-marked-error td{background:#ffe8e6!important;color:#a8071a!important;border-bottom-color:#ffccc7!important}
.audit-row-marked-error:hover td{background:#ffd8d4!important}
.audit-row-marked-error .audit-query-link{color:#cf1322!important;font-weight:700}
.audit-graduates-page .audit-query-table tbody tr.audit-row-marked-error:nth-child(even) td{background:#ffe8e6!important}
.audit-graduates-page .audit-query-table tbody tr.audit-row-marked-error:hover td{background:#ffd8d4!important}
.audit-link-anomaly{color:#0068b7;text-decoration:underline}
.audit-ok{color:#5cb85c}
.audit-query-table-wrap{overflow:hidden;background:#fff}
.audit-query-table{width:100%;border-collapse:collapse;font-size:13px;background:#fff}
.audit-query-table thead th{background:#eef2f6;color:#333;font-weight:700;text-align:center;padding:10px 8px;border:none;border-bottom:1px solid #d8dde3;white-space:nowrap}
.audit-query-table tbody td{padding:10px 8px;border:none;border-bottom:1px solid #ececec;text-align:center;vertical-align:middle;color:#333;line-height:1.45}
.audit-query-table tbody tr:nth-child(even) td{background:#fafafa}
.audit-query-table tbody tr:hover td{background:#f5f9ff}
.audit-query-table .col-check{width:36px}
.audit-query-table .col-seq{width:52px}
.audit-query-table .col-id{width:108px;font-family:Consolas,monospace;font-size:12px}
.audit-query-table .col-major{width:112px}
.audit-query-table .col-op{width:80px;padding-right:6px!important}
.audit-query-table .col-name,.audit-query-table .col-bio{text-align:left}
.audit-query-table .col-bio{min-width:120px;max-width:280px;width:auto;color:#555;font-size:12px;line-height:1.55}
.audit-query-table .col-name{width:72px}
.audit-query-link{color:#3280fc;text-decoration:none}
.audit-query-link--warn{color:#d9534f;font-weight:700}
.audit-query-link--warn:hover{text-decoration:underline}
.audit-op-wrap{position:relative;display:inline-block;z-index:1}
.audit-op-wrap:has(.audit-op-menu){z-index:500}
.audit-op-btn{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;background:#3280fc;color:#fff;border:none;border-radius:4px;font-size:12px;line-height:1.4;cursor:pointer;white-space:nowrap}
.audit-op-btn:hover{background:#2868d4}
.audit-op-caret{display:inline-block;width:0;height:0;margin-left:2px;border-left:4px solid transparent;border-right:4px solid transparent;border-top:5px solid #fff;vertical-align:middle}
.audit-op-menu{position:absolute;right:0;top:calc(100% + 4px);min-width:108px;background:#fff;border:1px solid #ddd;box-shadow:0 4px 14px rgba(0,0,0,.16);z-index:1000;list-style:none;margin:0;padding:4px 0}
.audit-op-menu li{margin:0;padding:0}
.audit-op-menu a,.audit-op-menu button{display:block;width:100%;padding:8px 14px;text-align:left;background:none;border:none;color:#333;font-size:13px;cursor:pointer;text-decoration:none;line-height:1.4}
.audit-op-menu a:hover,.audit-op-menu button:hover{background:#f5f5f5}
.audit-op-menu button:disabled,.audit-op-menu__disabled{color:#bbb!important;cursor:not-allowed!important;background:#fafafa!important}
.audit-op-menu button:disabled:hover,.audit-op-menu__disabled:hover{background:#fafafa!important}
.audit-op-menu.is-glitched{animation:audit-op-glitch .15s linear 2}
.audit-op-menu__broken{color:#999!important;font-family:Consolas,monospace!important;letter-spacing:.5px}
.audit-op-menu.is-glitched .audit-op-menu__broken{color:#c41d7f!important}
@keyframes audit-op-glitch{0%{transform:translate(0)}25%{transform:translate(-2px,1px)}50%{transform:translate(2px,-1px)}75%{transform:translate(-1px,-1px)}100%{transform:translate(0)}}
.audit-op-result{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;vertical-align:middle}
.audit-op-result svg{display:block}
.audit-paper-float{position:fixed;z-index:9999;opacity:0;transform:translateX(calc(100% + 24px));transition:transform .5s cubic-bezier(.22,1,.36,1),opacity .35s ease,box-shadow .2s ease;box-shadow:0 10px 36px rgba(0,0,0,.2);border-radius:4px;overflow:visible;background:#f7f2e8;touch-action:none;user-select:none;cursor:grab}
.audit-paper-float.is-visible{opacity:1;transform:translateX(0)}
.audit-paper-float.is-holding{box-shadow:0 10px 32px rgba(50,128,252,.35);cursor:wait}
.audit-paper-float.is-dragging{cursor:grabbing;transition:box-shadow .2s ease,opacity .35s ease;box-shadow:0 12px 36px rgba(0,0,0,.22)}
.audit-paper-float.is-dragging.is-visible{transform:none}
.audit-paper-float__img{display:block;width:100%;height:auto;pointer-events:none}
.audit-paper-float__hint{position:absolute;top:6px;right:6px;z-index:2;padding:2px 8px;border-radius:10px;background:rgba(0,0,0,.55);color:#fff;font-size:11px;line-height:1.5;opacity:0;transition:opacity .2s ease;pointer-events:none}
.audit-paper-float.is-holding .audit-paper-float__hint,.audit-paper-float:hover .audit-paper-float__hint{opacity:1}
.mg-r-5{margin-right:5px}
.audit-dash-home{display:flex!important;flex-direction:row!important;gap:12px;align-items:flex-start}
.audit-dash-home__main{flex:3 1 0;min-width:420px}
.audit-dash-home__side{flex:2 1 0;min-width:400px;max-width:480px;width:auto}
.audit-embed-root .widget{background:#fff;border:1px solid #ddd;margin-bottom:12px;box-shadow:0 1px 2px rgba(0,0,0,.04)}
.audit-embed-root .widget-header{border-bottom:1px solid #ddd;padding:0 14px;min-height:44px;line-height:44px;background:linear-gradient(180deg,#fafcff 0%,#f3f7fb 100%)}
.audit-embed-root .widget-caption{font-size:15px;font-weight:700;color:#000}
.audit-embed-root .widget-caption .icon,.audit-embed-root .widget-caption .iconfont{margin-right:6px;color:#3280fc}
.audit-embed-root .widget-body{padding:14px}
.audit-embed-root .cards{display:flex;flex-wrap:wrap;gap:16px}
.audit-embed-root .cards .card-wrap{flex:0 0 calc(33.333% - 11px);min-width:200px}
.audit-embed-root a.card{display:flex;align-items:center;gap:10px;padding:10px;text-decoration:none;color:#000;border:1px solid transparent;border-radius:4px;transition:background .2s}
.audit-embed-root a.card:hover{background:#f5f9ff;border-color:#dceafa}
.audit-embed-root .iconfontBox{flex-shrink:0;width:60px;height:60px;background:#328dee;border-radius:6px;display:flex;align-items:center;justify-content:center}
.audit-embed-root .iconfontBox .iconfont{color:#fff;font-size:32px;line-height:1}
.audit-embed-root .cardContent{flex:1;font-size:14px;line-height:1.45;color:#333}
.audit-embed-root .noticeBox .list-group-item{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:8px 0;border-bottom:1px dashed #cecece;text-decoration:none;font-size:13px;line-height:1.5;color:inherit}
.audit-embed-root .noticeBox .list-group-item:last-child{border-bottom:none}
.audit-embed-root .noticeBox .announcementBox{flex:1;min-width:0;color:#333}
.audit-embed-root .noticeBox .announcementBox .title,.audit-embed-root .noticeBox .title{white-space:normal;overflow:visible;text-overflow:clip;word-break:break-word;line-height:1.5}
.audit-embed-root .noticeBox .redColor{color:#d9534f!important}
.audit-embed-root .noticeBox .notice-date{flex-shrink:0;color:#999;font-size:12px}
.audit-embed-root .widget-header--split{display:flex;align-items:center;justify-content:space-between}
.audit-embed-root .MainHomeRightMore{font-size:13px;color:#337ab7;text-decoration:none}
.audit-embed-root .MainHomeRightMore:hover{text-decoration:underline}
@media (max-width:860px){
  .audit-dash-home{flex-direction:column!important}
  .audit-dash-home__side{flex:1 1 auto;width:100%;max-width:none}
  .audit-embed-root .cards .card-wrap{flex:0 0 calc(50% - 8px)}
}
@media (max-width:640px){
  .audit-embed-root .cards .card-wrap{flex:0 0 100%}
}
`;

/** 在 expert 原版 CSS 之后注入，布局对齐 MainHome / LeftMenuT */
export const AUDIT_SHELL_OVERRIDE_CSS = `/* ── 顶栏 ── */
.audit-expert-root .navbar{margin-bottom:0!important;position:fixed!important;top:0;left:0;width:100%;z-index:1030!important;min-height:70px!important;background:#fff!important;border:none!important;box-shadow:0 2px 5px #ccc!important}
.audit-expert-root .navbar .container-fluid:after{content:".";display:block;height:0;clear:both;visibility:hidden}
.audit-expert-root .g-userinfo{float:right!important;margin:22px 20px 0 0!important;list-style:none!important;padding:0!important}
.audit-expert-root .g-userinfo>li{float:left!important;position:relative!important;margin-right:35px!important;height:25px!important;line-height:25px!important;font-size:16px!important;color:#333539!important}
.audit-expert-root .g-userinfo>li>a{display:inline-block!important;padding-left:32px!important;color:#333539!important;text-decoration:none!important}
.audit-expert-root .g-userinfo>li>i.iconfont{position:absolute!important;left:0!important;top:0!important;font-size:24px!important;color:#c00!important;line-height:25px!important}
.audit-expert-root .g-userinfo .iconarrowDown03{font-size:11px!important;color:#bbb!important;margin-left:2px!important}

/* ── 主框架 ── */
.audit-expert-root .menu-toggler{display:none!important}
.audit-expert-root .main-container{position:relative!important;top:70px!important;padding-bottom:32px!important;width:100%!important;background:#eef2f6!important}
.audit-expert-root .main-container-inner{position:relative!important}
.audit-expert-root .main-content{margin-left:43px!important;background:#eef2f6!important;min-height:calc(100vh - 102px)!important}
.audit-expert-root:not(.menu-min) .main-content{margin-left:210px!important}

/* ── 面包屑 ── */
.audit-expert-root .breadcrumbs{background:#e4e4e4!important;margin:0!important;padding:0 12px!important;min-height:41px!important;line-height:41px!important;border-bottom:1px solid #d5d5d5!important;overflow:hidden!important}
.audit-expert-root .breadcrumbs_ul{float:left!important;margin:0!important;padding:0!important;list-style:none!important}
.audit-expert-root .breadcrumbs_ul li{display:inline-block!important;padding:0!important;font-size:14px!important;color:#333!important;line-height:41px!important}
.audit-expert-root .breadcrumbs .rightSubTips{float:right!important;line-height:41px!important;padding:0!important;font-size:14px!important;color:#333!important;background:none!important;border:none!important;cursor:pointer!important}
.audit-expert-root .breadcrumbs .jiamiTips{margin-right:15px!important;color:#333!important}

/* ── 内容区 ── */
.audit-expert-root .audit-page-body{padding:12px!important;background:#eef2f6!important;min-height:calc(100vh - 143px)!important}

/* ── 侧栏：收起 = 原版窄蓝条 ── */
.audit-expert-root.menu-min .sidebar{float:left!important;width:43px!important;background:#1475dc!important;border-right:none!important;min-height:calc(100vh - 102px)!important;position:relative!important}
.audit-expert-root.menu-min .nav-list{background:#1475dc!important;margin:0!important;padding:0!important}
.audit-expert-root.menu-min .nav-list>li{border:none!important}
.audit-expert-root.menu-min .nav-list>li>a{display:block!important;height:46px!important;min-height:46px!important;line-height:46px!important;padding:0!important;text-align:center!important;background:#1475dc!important;color:#fff!important;border-bottom:1px solid rgba(255,255,255,.12)!important}
.audit-expert-root.menu-min .nav-list>li>a:hover,.audit-expert-root.menu-min .nav-list>li.active>a,.audit-expert-root.menu-min .nav-list>li.open>a{background:#0d66c2!important;color:#fff!important}
.audit-expert-root.menu-min .nav-list>li>a>.iconfont:first-child{position:static!important;width:auto!important;height:46px!important;line-height:46px!important;font-size:20px!important;display:block!important;transform:none!important}
.audit-expert-root.menu-min .menu-text{display:none!important}
.audit-expert-root.menu-min .nav-list>li.open>.submenu{display:none!important}
.audit-expert-root.menu-min .sidebar-collapse{background:#0a5fad!important;color:#fff!important;border-top:1px solid rgba(255,255,255,.15)!important;padding:10px 0!important;text-align:center!important;cursor:pointer!important;font-size:12px!important;letter-spacing:-1px!important}

/* ── 侧栏：展开 ── */
.audit-expert-root:not(.menu-min) .sidebar{float:left!important;width:210px!important;background:#e6f6ff!important;border-right:1px solid #b8d4ef!important;min-height:calc(100vh - 102px)!important}
.audit-expert-root:not(.menu-min) .nav-list{background:#e6f6ff!important}
.audit-expert-root:not(.menu-min) .nav-list>li>a{display:block!important;min-height:40px!important;line-height:20px!important;padding:10px 12px 10px 42px!important;background:#fff!important;color:#444!important;font-size:13px!important;position:relative!important;border-bottom:1px solid #e5e5e5!important}
.audit-expert-root:not(.menu-min) .nav-list>li>a>.iconfont:first-child{position:absolute!important;left:0!important;top:0!important;width:40px!important;height:40px!important;line-height:40px!important;text-align:center!important;font-size:16px!important}
.audit-expert-root:not(.menu-min) .nav-list>li.open>a,.audit-expert-root:not(.menu-min) .nav-list>li.active>a{background:#1475dc!important;color:#fff!important}
.audit-expert-root:not(.menu-min) .nav-list>li>a:hover{background:#1475dc!important;color:#fff!important}
.audit-expert-root:not(.menu-min) .nav-list .submenu{display:none!important;background:#dceafa!important;margin:0!important;padding:0!important}
.audit-expert-root:not(.menu-min) .nav-list>li.open>.submenu{display:block!important}
.audit-expert-root:not(.menu-min) .nav-list .submenu a{display:block!important;padding:10px 12px 10px 28px!important;background:#dceafa!important;color:#444!important;font-size:13px!important;border-bottom:1px dotted #9dbdd6!important;line-height:1.4!important}
.audit-expert-root:not(.menu-min) .nav-list .submenu li.active>a{color:#c00!important;font-weight:700!important;background:#fff!important}
.audit-expert-root:not(.menu-min) .sidebar-collapse{background:#d0eeff!important;color:#666!important;border-top:1px solid #b8d4ef!important;padding:10px 0!important;text-align:center!important;cursor:pointer!important}

/* ── 去掉所有箭头 ── */
.audit-expert-root .nav-list li.active>a:after,.audit-expert-root .nav-list li.active>a:before,.audit-expert-root .nav-list>li>a:after,.audit-expert-root .nav-list>li>a:before,.audit-expert-root .nav-list .submenu li.active>a:after{display:none!important;content:none!important;border:none!important}
.audit-expert-root .nav-list .arrow1,.audit-expert-root .nav-list .icon-xiala,.audit-expert-root .nav-list b.arrow{display:none!important}

/* ── 首页 widget（对齐 MainHome） ── */
.audit-dash-home{display:flex!important;flex-direction:row!important;gap:12px;align-items:flex-start}
.audit-dash-home__main{flex:3 1 0;min-width:420px}
.audit-dash-home__side{flex:2 1 0;min-width:400px;max-width:480px;width:auto}
.audit-expert-root .widget{background:#fff;border:1px solid #ddd;margin-bottom:12px;box-shadow:0 1px 2px rgba(0,0,0,.04)}
.audit-expert-root .widget-header{border-bottom:1px solid #ddd;padding:0 14px;min-height:44px;line-height:44px;background:linear-gradient(180deg,#fafcff 0%,#f3f7fb 100%)}
.audit-expert-root .widget-caption{font-size:15px;font-weight:700;color:#000}
.audit-expert-root .widget-caption .icon,.audit-expert-root .widget-caption .iconfont{margin-right:6px;color:#3280fc}
.audit-expert-root .widget-body{padding:14px}
.audit-expert-root .cards{display:flex;flex-wrap:wrap;gap:16px}
.audit-expert-root .cards .card-wrap{flex:0 0 calc(33.333% - 11px);min-width:200px}
.audit-expert-root a.card{display:flex;align-items:center;gap:10px;padding:10px;text-decoration:none;color:#000;border:1px solid transparent;border-radius:4px;transition:background .2s}
.audit-expert-root a.card:hover{background:#f5f9ff;border-color:#dceafa}
.audit-expert-root .iconfontBox{flex-shrink:0;width:60px;height:60px;background:#328dee;border-radius:6px;display:flex;align-items:center;justify-content:center}
.audit-expert-root .iconfontBox .iconfont{color:#fff;font-size:32px;line-height:1}
.audit-expert-root .cardContent{flex:1;font-size:14px;line-height:1.45;color:#333}
.audit-expert-root .noticeBox .list-group-item{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:8px 0;border-bottom:1px dashed #cecece;text-decoration:none;font-size:13px;line-height:1.5}
.audit-expert-root .noticeBox .list-group-item:last-child{border-bottom:none}
.audit-expert-root .noticeBox .announcementBox{flex:1;min-width:0;color:#333}
.audit-expert-root .noticeBox .announcementBox .title,.audit-expert-root .noticeBox .title{white-space:normal;overflow:visible;text-overflow:clip;word-break:break-word;line-height:1.5}
.audit-expert-root .noticeBox .redColor{color:#d9534f!important}
.audit-expert-root .noticeBox .pull-right,.audit-expert-root .noticeBox .notice-date{flex-shrink:0;color:#999;font-size:12px}
.audit-expert-root .widget-header--split{display:flex;align-items:center;justify-content:space-between}
.audit-expert-root .MainHomeRightMore{font-size:13px;color:#337ab7;text-decoration:none}
.audit-expert-root .MainHomeRightMore:hover{text-decoration:underline}

/* ── 内页 panel ── */
.audit-expert-root .audit-inner-widget{background:#fff;border:1px solid #ddd;box-shadow:0 1px 2px rgba(0,0,0,.04)}

/* ── 页脚 ── */
.audit-expert-root .footerInfo{position:fixed!important;bottom:0!important;left:0!important;width:100%!important;z-index:900!important;background:#f8f8f8!important;box-shadow:0 -2px 5px #ccc!important}
.audit-expert-root .footerInfo ul{text-align:center!important;margin:0!important;padding:0!important;list-style:none!important}
.audit-expert-root .footerInfo li{display:inline-block!important;margin:0 5px!important;color:red!important;font-size:12px!important;line-height:30px!important}

@media (max-width:860px){
  .audit-dash-home{flex-direction:column!important}
  .audit-dash-home__side{flex:1 1 auto;width:100%;max-width:none}
  .audit-expert-root .cards .card-wrap{flex:0 0 calc(50% - 8px)}
}
@media (max-width:640px){
  .audit-expert-root .cards .card-wrap{flex:0 0 100%}
}
`;
