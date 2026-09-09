@echo off
pushd "%~dp0"
if not exist "index.html" (
  echo index.html missing
  echo Run this bat inside the scenery-window folder
  pause
  exit /b 1
)
start "" "index.html"
