@echo off
pushd "%~dp0"
if not exist "index.html" (
  echo index.html missing
  pause
  exit /b 1
)
start "" "index.html"
