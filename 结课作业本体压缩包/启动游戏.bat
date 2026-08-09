@echo off
chcp 65001 >nul
title CUC ARG 游戏启动器
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo.
  echo [错误] 未检测到 Node.js
  echo 请先安装 Node.js 24 或更高版本：https://nodejs.org/
  echo.
  pause
  exit /b 1
)

echo.
echo ========================================
echo   交互叙事理论 - ARG 游戏本地启动器
echo ========================================
echo.

if not exist "node_modules\" (
  echo [1/2] 首次运行，正在安装依赖（约 1-3 分钟，请耐心等待）...
  call npm install
  if errorlevel 1 (
    echo.
    echo [错误] 依赖安装失败，请检查网络后重试
    pause
    exit /b 1
  )
  echo.
) else (
  echo [1/2] 依赖已就绪
)

echo 清理占用 3000 端口的旧进程...
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":3000" ^| findstr "LISTENING"') do (
  taskkill /F /PID %%p >nul 2>&1
)

echo [2/2] 正在启动游戏...
echo 就绪后会自动打开浏览器；关闭本窗口即可停止
echo ========================================
echo.

start "" powershell -NoProfile -WindowStyle Hidden -Command ^
  "$url='http://localhost:3000/';" ^
  "for($i=0;$i -lt 60;$i++){" ^
  "  try{$r=Invoke-WebRequest $url -UseBasicParsing -TimeoutSec 2;" ^
  "  if($r.StatusCode -ge 200){Start-Process $url; exit 0}}catch{};" ^
  "  Start-Sleep -Seconds 1" ^
  "}"

call npm run dev -- -p 3000

echo.
echo 游戏已停止
pause
