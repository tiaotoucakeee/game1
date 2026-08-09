# 从 .env.local 同步 Coze 环境变量到 Netlify（需先 netlify login）
# 用法：在项目根目录执行  .\scripts\sync-coze-env-to-netlify.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$envFile = Join-Path $root ".env.local"

if (-not (Test-Path $envFile)) {
  Write-Error ".env.local 不存在"
}

$vars = @{}
Get-Content $envFile | ForEach-Object {
  $line = $_.Trim()
  if (-not $line -or $line.StartsWith("#")) { return }
  $eq = $line.IndexOf("=")
  if ($eq -lt 1) { return }
  $key = $line.Substring(0, $eq).Trim()
  $val = $line.Substring($eq + 1).Trim()
  if ($key -match "^ANI_COZE_") { $vars[$key] = $val }
}

$required = @("ANI_COZE_STREAM_URL", "ANI_COZE_API_TOKEN", "ANI_COZE_BOT_ID")
foreach ($key in $required) {
  if (-not $vars[$key]) { Write-Error "缺少 $key" }
}

Write-Host "链接 Netlify 站点（若尚未链接，选 papaya-cocada-c8eb16 / game1）..."
npx netlify-cli link

foreach ($key in $required) {
  Write-Host "设置 $key ..."
  npx netlify-cli env:set $key $vars[$key] --context production --context deploy-preview --context branch-deploy
}

Write-Host "触发重新部署..."
npx netlify-cli deploy --prod --build

Write-Host "完成。打开 Ani 对话，应显示「Coze 已连接」。"
