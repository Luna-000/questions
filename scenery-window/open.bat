@echo off
setlocal EnableExtensions
pushd "%~dp0" 2>nul
if errorlevel 1 (
  echo [ERROR] cannot enter folder:
  echo %~dp0
  pause
  exit /b 1
)

echo.
echo   folder: %CD%
echo.

if not exist "index.html" (
  echo [ERROR] index.html not found here.
  echo Open the scenery-window folder, then run open.bat inside it.
  echo.
  dir /b
  echo.
  pause
  popd
  exit /b 1
)

if exist "open.ps1" (
  where powershell.exe >nul 2>nul
  if not errorlevel 1 (
    powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%CD%\open.ps1"
    if not errorlevel 1 (
      popd
      exit /b 0
    )
    echo.
    echo open.ps1 failed. Falling back to index.html ...
  )
)

start "" "%CD%\index.html"
echo Opened index.html
popd
exit /b 0
