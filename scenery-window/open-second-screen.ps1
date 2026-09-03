$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Windows.Forms
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

$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$html = Join-Path $here "index.html"
if (-not (Test-Path $html)) { throw "index.html が見つかりません: $html" }
$url = "file:///" + ($html -replace "\\", "/")

$second = [System.Windows.Forms.Screen]::AllScreens | Where-Object { -not $_.Primary } | Select-Object -First 1
if (-not $second) { throw "サブモニターが見つかりません。" }

$browser = @(
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "$env:LocalAppData\Google\Chrome\Application\chrome.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $browser) { throw "Edge か Chrome が見つかりません。" }

Get-Process msedge, chrome -ErrorAction SilentlyContinue |
  Where-Object { $_.MainWindowTitle -eq "絵画" -or $_.MainWindowTitle -eq "景色" } |
  Stop-Process -Force -ErrorAction SilentlyContinue

$b = $second.Bounds
Start-Process $browser -ArgumentList @(
  "--new-window",
  "--app=$url",
  "--window-position=$($b.X),$($b.Y)",
  "--window-size=$($b.Width),$($b.Height)"
)

$hwnd = [IntPtr]::Zero
for ($i = 0; $i -lt 50 -and $hwnd -eq [IntPtr]::Zero; $i++) {
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

if ($hwnd -eq [IntPtr]::Zero) {
  Write-Host "窓は開きました。サブモニターへドラッグして F で全画面にしてください。"
  exit 0
}

[void][SceneryWin]::ShowWindow($hwnd, 9)
[void][SceneryWin]::MoveWindow($hwnd, $b.X, $b.Y, $b.Width, $b.Height, $true)
Start-Sleep -Milliseconds 150
[void][SceneryWin]::ShowWindow($hwnd, 3)
[void][SceneryWin]::SetForegroundWindow($hwnd)
Write-Host "サブモニター ($($b.Width)x$($b.Height) at $($b.X),$($b.Y)) に絵画を出しました。"
