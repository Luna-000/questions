$ErrorActionPreference = "Stop"
$here = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
$dest = Join-Path $here "scenes"
New-Item -ItemType Directory -Force -Path $dest | Out-Null

$headers = @{
  "User-Agent" = "SceneryWindow/1.0 (personal art viewer; https://github.com/Luna-000)"
  "Accept" = "application/json"
}

$works = @(
  @{ file = "Jean-François Millet - Gleaners - Google Art Project 2.jpg"; out = "millet-gleaners.jpg" }
  @{ file = "Jean-François Millet - The Angelus - Google Art Project.jpg"; out = "millet-angelus.jpg" }
  @{ file = "Jean-François Millet - The Sower - Google Art Project.jpg"; out = "millet-sower.jpg" }
  @{ file = "Vilhelm Hammershoi - Interieur mit Rueckenansicht einer Frau - 1903-1904 - Randers Kunstmuseum.jpg"; out = "hammershoi-back.jpg" }
  @{ file = "Vilhelm Hammershøi - A Room in the Artist's Home in Strandgade, Copenhagen, with the Artist's Wife - Google Art Project.jpg"; out = "hammershoi-strandgade.jpg" }
  @{ file = "Stue i Strandgade med solskin på gulvet.jpg"; out = "hammershoi-sunfloor.jpg" }
  @{ file = "Van Gogh - Starry Night - Google Art Project.jpg"; out = "gogh-starry.jpg" }
  @{ file = "Vincent van Gogh - Wheatfield with crows - Google Art Project.jpg"; out = "gogh-crows.jpg" }
  @{ file = "Vincent van Gogh - De slaapkamer - Google Art Project.jpg"; out = "gogh-bedroom.jpg" }
  @{ file = "Edvard Munch - The Girl by the Window - 2000.50 - Art Institute of Chicago.jpg"; out = "munch-window.jpg" }
  @{ file = "The Reading Girl (Théodore Roussel)-07251.jpg"; out = "roussel-reading.jpg" }
  @{ file = "The Forest in Winter at Sunset MET DP247630.jpg"; out = "rousseau-forest.jpg" }
  @{ file = "Pierre-étienne-théodore rousseau, valle a tiffauge, 1837-44.jpg"; out = "rousseau-valley.jpg" }
  @{ file = "Moscow Courtyard (Polenov, 1878) - Google Art Project.jpg"; out = "polenov-yard.jpg" }
  @{ file = "Wassilij Dimitriewitsch Polenow 004.jpg"; out = "polenov-pond.jpg" }
  @{ file = "Frits Thaulow - Winter at the River Simoa - Google Art Project.jpg"; out = "thaulow-simoa.jpg" }
  @{ file = "Frits Thaulow - The River in Winter.jpg"; out = "thaulow-river.jpg" }
  @{ file = "Rue de Montreuil-sur-Mer - Frits Thaulow - 1892.jpg"; out = "thaulow-street.jpg" }
  @{ file = "Caspar David Friedrich - Wanderer above the sea of fog.jpg"; out = "friedrich-wanderer.jpg" }
  @{ file = "Klosterruine Eldena bei Greifswald (1824) - Caspar David Friedrich (Alte Nationalgalerie, Berlin).jpg"; out = "friedrich-abbey.jpg" }
  @{ file = "Fritz von Uhde - Das Tischgebet - Google Art Project.jpg"; out = "uhde-grace.jpg" }
  @{ file = "Gustave Loiseau, The Village, 1912.jpg"; out = "loiseau-village.jpg" }
  @{ file = "Barberini August 2023-Gustave Loiseau - Raureif in Pontoise, 1906 - Sammlung Hasso Plattner.jpg"; out = "loiseau-frost.jpg" }
  @{ file = "Barberini August 2023-Gustave Loiseau - Der Strand von Fécamp, 1910 - Sammlung Hasso Plattner.jpg"; out = "loiseau-beach.jpg" }
)

foreach ($work in $works) {
  $outPath = Join-Path $dest $work.out
  if ((Test-Path $outPath) -and ((Get-Item $outPath).Length -gt 100000)) {
    Write-Host "SKIP $($work.out)"
    continue
  }
  $title = "File:" + $work.file
  $api = "https://commons.wikimedia.org/w/api.php?action=query&titles=$([uri]::EscapeDataString($title))&prop=imageinfo&iiprop=url|size&iiurlwidth=2560&format=json"
  try {
    $json = Invoke-RestMethod -Uri $api -Headers $headers -TimeoutSec 40
    $page = $json.query.pages.PSObject.Properties.Value | Select-Object -First 1
    if ($page.missing -or -not $page.imageinfo) {
      Write-Host "MISS $($work.file)"
      continue
    }
    $info = $page.imageinfo[0]
    $url = if ($info.thumburl) { $info.thumburl } else { $info.url }
    Invoke-WebRequest -Uri $url -Headers $headers -OutFile $outPath -TimeoutSec 120
    Write-Host "OK   $($work.out)"
  } catch {
    Write-Host "FAIL $($work.out) :: $($_.Exception.Message)"
  }
}

Write-Host "done: $((Get-ChildItem $dest -File | Measure-Object).Count) files"
