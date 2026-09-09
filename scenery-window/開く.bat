@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo   絵画ビューアを開きます...
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0open.ps1"
if errorlevel 1 (
  echo.
  echo   開けませんでした。このフォルダに index.html があるか確認してください。
  echo.
  pause
)
