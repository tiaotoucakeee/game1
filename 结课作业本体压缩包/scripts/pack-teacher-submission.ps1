# Pack teacher submission (excludes node_modules, build output, secrets, research scrapes)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$parent = Split-Path -Parent $root
$folderName = "CUC-ARG-游戏本体-教师提交包"
$dest = Join-Path $parent $folderName
$zip = Join-Path $parent ($folderName + ".zip")

$excludeDirs = @(
  "node_modules", ".next", ".git", ".claude", ".cursor", ".codex", ".continue",
  ".gemini", ".amazonq", ".windsurf", ".github", "docs\research"
)
$excludeFiles = @(
  ".env.local", ".env", "AGENTS.md", "CLAUDE.md", "GEMINI.md", "CHANGELOG.md"
)

if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
if (Test-Path $zip) { Remove-Item $zip -Force }
New-Item -ItemType Directory -Path $dest | Out-Null

$robocopyArgs = @($root, $dest, "/E", "/NFL", "/NDL", "/NJH", "/NJS", "/NC", "/NS")
foreach ($d in $excludeDirs) { $robocopyArgs += "/XD"; $robocopyArgs += $d }
foreach ($f in $excludeFiles) { $robocopyArgs += "/XF"; $robocopyArgs += $f }
& robocopy @robocopyArgs | Out-Null
if ($LASTEXITCODE -ge 8) { throw "robocopy failed with exit code $LASTEXITCODE" }

Get-ChildItem $dest -Recurse -Filter "~$*" -ErrorAction SilentlyContinue | Remove-Item -Force
Get-ChildItem (Join-Path $dest "docs") -Filter "*开发者邮件*" -ErrorAction SilentlyContinue | Remove-Item -Force

$readmeLines = @(
  "交互叙事理论 - ARG 平行实境网页解密游戏",
  "========================================",
  "",
  "[在线体验]",
  "https://papaya-cocada-c8eb16.netlify.app",
  "",
  "[本地运行]",
  "1. 安装 Node.js 24 或更高版本",
  "2. 在本文件夹打开终端，执行: npm install",
  "3. 然后: npm run build",
  "4. 然后: npm start",
  "5. 浏览器访问 http://localhost:3000",
  "",
  "开发模式: npm run dev",
  "",
  "[文档]",
  "docs/player-walkthrough.docx  - 玩家攻略",
  "docs/player-walkthrough.md     - 攻略 Markdown",
  "docs/ani-ai-coze-prompt.md     - Ani 提示词",
  ".env.example                   - 环境变量示例",
  "",
  "[说明]",
  "- 进度保存在浏览器 localStorage",
  "- 推荐 Chrome 或 Edge",
  "- 线上 Ani 为演示模式，不影响通关",
  "",
  "[制作]",
  "剧本: 徐子棋、王子玉 | 美术: 王子玉 | 程序: 徐子棋"
)
Set-Content -Path (Join-Path $dest "提交说明.txt") -Value $readmeLines -Encoding UTF8

Compress-Archive -Path $dest -DestinationPath $zip -Force
$sizeMb = [math]::Round((Get-Item $zip).Length / 1MB, 2)
Write-Host "Created: $zip ($sizeMb MB)"
