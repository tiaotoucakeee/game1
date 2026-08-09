@echo off
chcp 65001 >nul
set "GAME_DIR=%~dp0"
set "BAT=%GAME_DIR%启动游戏.bat"
set "DESKTOP=%USERPROFILE%\Desktop"
set "LINK=%DESKTOP%\CUC ARG 游戏.lnk"

powershell -NoProfile -Command ^
  "$s = (New-Object -ComObject WScript.Shell).CreateShortcut('%LINK%');" ^
  "$s.TargetPath = '%BAT%';" ^
  "$s.WorkingDirectory = '%GAME_DIR%';" ^
  "$s.IconLocation = '%GAME_DIR%public\cuc-anima\images\favicon.png,0';" ^
  "$s.Description = '本地启动 ARG 游戏';" ^
  "$s.Save()"

echo.
echo 已在桌面创建快捷方式：CUC ARG 游戏
echo 以后双击桌面图标即可启动（无需再进压缩包文件夹）
echo.
pause
