#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p scenes
UA='SceneryWindow/1.0 (personal art viewer; luna-000)'

download() {
  local file="$1" out="$2"
  local enc
  enc=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))" "File:$file")
  local json url
  json=$(curl -sL "https://commons.wikimedia.org/w/api.php?action=query&titles=$enc&prop=imageinfo&iiprop=url|size&iiurlwidth=2560&format=json" -H "User-Agent: $UA")
  url=$(python3 -c "
import json,sys
d=json.load(sys.stdin)
for p in d.get('query',{}).get('pages',{}).values():
  if 'missing' in p or 'imageinfo' not in p:
    print('MISS'); raise SystemExit
  info=p['imageinfo'][0]
  print(info.get('thumburl') or info.get('url'))
" <<<"$json")
  if [[ "$url" == "MISS" || -z "$url" ]]; then
    echo "MISS $file"
    return 1
  fi
  curl -sL "$url" -H "User-Agent: $UA" -o "scenes/$out"
  local sz
  sz=$(wc -c < "scenes/$out")
  if [[ "$sz" -lt 100000 ]]; then
    echo "FAIL $out ($sz)"
    rm -f "scenes/$out"
    return 1
  fi
  echo "OK $out ($sz)"
}

download 'Jean-François Millet - Gleaners - Google Art Project 2.jpg' millet-gleaners.jpg
download 'Jean-François Millet - The Angelus - Google Art Project.jpg' millet-angelus.jpg
download 'Jean-François Millet - The Sower - Google Art Project.jpg' millet-sower.jpg
download 'Vilhelm Hammershoi - Interieur mit Rueckenansicht einer Frau - 1903-1904 - Randers Kunstmuseum.jpg' hammershoi-back.jpg
download "Vilhelm Hammershøi - A Room in the Artist's Home in Strandgade, Copenhagen, with the Artist's Wife - Google Art Project.jpg" hammershoi-strandgade.jpg
download 'Stue i Strandgade med solskin på gulvet.jpg' hammershoi-sunfloor.jpg
download 'Van Gogh - Starry Night - Google Art Project.jpg' gogh-starry.jpg
download 'Vincent van Gogh - Wheatfield with crows - Google Art Project.jpg' gogh-crows.jpg
download 'Vincent van Gogh - De slaapkamer - Google Art Project.jpg' gogh-bedroom.jpg
download 'Edvard Munch - The Girl by the Window - 2000.50 - Art Institute of Chicago.jpg' munch-window.jpg
download 'The Reading Girl (Théodore Roussel)-07251.jpg' roussel-reading.jpg
download 'The Forest in Winter at Sunset MET DP247630.jpg' rousseau-forest.jpg
download 'Pierre-étienne-théodore rousseau, valle a tiffauge, 1837-44.jpg' rousseau-valley.jpg
download 'Moscow Courtyard (Polenov, 1878) - Google Art Project.jpg' polenov-yard.jpg
download 'Wassilij Dimitriewitsch Polenow 004.jpg' polenov-pond.jpg
download 'Frits Thaulow - Winter at the River Simoa - Google Art Project.jpg' thaulow-simoa.jpg
download 'Frits Thaulow - The River in Winter.jpg' thaulow-river.jpg
download 'Rue de Montreuil-sur-Mer - Frits Thaulow - 1892.jpg' thaulow-street.jpg
download 'Caspar David Friedrich - Wanderer above the sea of fog.jpg' friedrich-wanderer.jpg
download 'Klosterruine Eldena bei Greifswald (1824) - Caspar David Friedrich (Alte Nationalgalerie, Berlin).jpg' friedrich-abbey.jpg
download 'Fritz von Uhde - Das Tischgebet - Google Art Project.jpg' uhde-grace.jpg
download 'Gustave Loiseau, The Village, 1912.jpg' loiseau-village.jpg
download 'Barberini August 2023-Gustave Loiseau - Raureif in Pontoise, 1906 - Sammlung Hasso Plattner.jpg' loiseau-frost.jpg
download 'Barberini August 2023-Gustave Loiseau - Der Strand von Fécamp, 1910 - Sammlung Hasso Plattner.jpg' loiseau-beach.jpg

echo "done: $(ls scenes | grep -v gitkeep | wc -l) files"
