@echo off
chcp 65001 >nul
title CUC ARG 游戏
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo [错误] 请先安装 Node.js 24+：https://nodejs.org/
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo 首次运行，正在安装依赖（约 1-3 分钟）...
  call npm install || (pause & exit /b 1)
)

echo 清理占用 3000 端口的旧进程...
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":3000" ^| findstr "LISTENING"') do (
  taskkill /F /PID %%p >nul 2>&1
)

echo 正在启动游戏服务器...
echo 就绪后会自动打开浏览器；关闭本窗口即停止游戏
echo.

start "" powershell -NoProfile -WindowStyle Hidden -Command ^
  "$url='http://localhost:3000/';" ^
  "for($i=0;$i -lt 60;$i++){" ^
  "  try{$r=Invoke-WebRequest $url -UseBasicParsing -TimeoutSec 2;" ^
  "  if($r.StatusCode -ge 200){Start-Process $url; exit 0}}catch{};" ^
  "  Start-Sleep -Seconds 1" ^
  "}"

call npm run dev -- -p 3000

pause
