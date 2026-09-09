@echo off
setlocal
pushd "%~dp0" 2>nul
if errorlevel 1 (
  echo bad folder: %~dp0
  pause
  exit /b 1
)
if not exist "index.html" (
  echo index.html missing in %CD%
  dir /b
  pause
  exit /b 1
)
start "" "%CD%\index.html"
popd
