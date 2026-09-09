$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$here = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
Set-Location $here

Write-Host ""
Write-Host "  絵画ビューアを起動します..." -ForegroundColor Cyan
Write-Host ""

# --- ensure images ---
$sceneDir = Join-Path $here "scenes"
New-Item -ItemType Directory -Force -Path $sceneDir | Out-Null
$jpgCount = @(Get-ChildItem $sceneDir -File -Include *.jpg,*.png -ErrorAction SilentlyContinue).Count
if ($jpgCount -lt 5) {
  Write-Host "  画像が少ないので取得します（初回は数分かかります）" -ForegroundColor Yellow
  $dl = Join-Path $here "download-favorites.ps1"
  if (-not (Test-Path $dl)) { throw "download-favorites.ps1 が見つかりません: $dl" }
  & $dl
  $jpgCount = @(Get-ChildItem $sceneDir -File -Include *.jpg,*.png).Count
  if ($jpgCount -lt 1) { throw "画像の取得に失敗しました。" }
}

# --- find browser ---
$browser = @(
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "$env:LocalAppData\Google\Chrome\Application\chrome.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $browser) {
  # fallback: default handler
  $html = Join-Path $here "index.html"
  Start-Process $html
  Write-Host "  既定のブラウザで開きました。F で全画面にできます。" -ForegroundColor Green
  exit 0
}

# --- pick screen (second if any, else primary) ---
Add-Type -AssemblyName System.Windows.Forms
$screens = [System.Windows.Forms.Screen]::AllScreens
$target = $screens | Where-Object { -not $_.Primary } | Select-Object -First 1
if (-not $target) { $target = $screens | Where-Object { $_.Primary } | Select-Object -First 1 }
$b = $target.Bounds
$label = if ($target.Primary) { "メイン画面" } else { "サブモニター" }

# --- close old gallery windows ---
Get-Process msedge, chrome -ErrorAction SilentlyContinue |
  Where-Object { $_.MainWindowTitle -eq "絵画" -or $_.MainWindowTitle -eq "景色" } |
  Stop-Process -Force -ErrorAction SilentlyContinue

# --- prefer local http server so relative assets always load ---
$port = 8765
$url = $null
$python = @(
  "python",
  "py",
  "$env:LocalAppData\Programs\Python\Python312\python.exe",
  "$env:LocalAppData\Programs\Python\Python311\python.exe"
) | Where-Object {
  try { $null = Get-Command $_ -ErrorAction Stop; $true } catch { Test-Path $_ }
} | Select-Object -First 1

if ($python) {
  # free the port if our previous server is still around
  try {
    $listen = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue |
      Select-Object -First 1
    if ($listen) {
      Stop-Process -Id $listen.OwningProcess -Force -ErrorAction SilentlyContinue
      Start-Sleep -Milliseconds 400
    }
  } catch { }

  Start-Process -FilePath $python -ArgumentList @("-m", "http.server", "$port", "--bind", "127.0.0.1") `
    -WorkingDirectory $here -WindowStyle Hidden
  Start-Sleep -Milliseconds 700
  $url = "http://127.0.0.1:$port/index.html"
} else {
  $html = (Join-Path $here "index.html") -replace "\\", "/"
  $url = "file:///" + $html
}

Add-Type @"
using System;
using System.Text;
using System.Runtime.InteropServices;
public class SceneryWin {
  public delegate bool EnumProc(IntPtr hWnd, IntPtr lParam);
  [DllImport("user32.dll")] public static extern bool EnumWindows(EnumProc lpEnumFunc, IntPtr lParam);
  [DllImport("user32.dll")] public static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);
  [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool MoveWindow(IntPtr hWnd, int X, int Y, int nWidth, int nHeight, bool bRepaint);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
}
"@

Start-Process $browser -ArgumentList @(
  "--new-window",
  "--app=$url",
  "--window-position=$($b.X),$($b.Y)",
  "--window-size=$($b.Width),$($b.Height)"
)

$hwnd = [IntPtr]::Zero
for ($i = 0; $i -lt 40 -and $hwnd -eq [IntPtr]::Zero; $i++) {
  Start-Sleep -Milliseconds 200
  [SceneryWin]::EnumWindows({
    param($h, $l)
    if (-not [SceneryWin]::IsWindowVisible($h)) { return $true }
    $sb = New-Object System.Text.StringBuilder 256
    [void][SceneryWin]::GetWindowText($h, $sb, $sb.Capacity)
    if ($sb.ToString() -eq "絵画" -or $sb.ToString() -eq "景色") {
      $script:hwnd = $h
      return $false
    }
    return $true
  }, [IntPtr]::Zero) | Out-Null
}

if ($hwnd -ne [IntPtr]::Zero) {
  [void][SceneryWin]::ShowWindow($hwnd, 9)
  [void][SceneryWin]::MoveWindow($hwnd, $b.X, $b.Y, $b.Width, $b.Height, $true)
  Start-Sleep -Milliseconds 120
  [void][SceneryWin]::ShowWindow($hwnd, 3)
  [void][SceneryWin]::SetForegroundWindow($hwnd)
}

Write-Host "  $label ($($b.Width)x$($b.Height)) に開きました。" -ForegroundColor Green
Write-Host "  F=全画面  I=解説  数字=画家  ←→=次の絵" -ForegroundColor DarkGray
Write-Host ""
