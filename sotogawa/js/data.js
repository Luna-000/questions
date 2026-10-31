/* ソトガワの手帳。個人の店と、2店舗くらいまでの店で、建物や内装、店が自分で書いている来歴があるもの。東京・神奈川・千葉・埼玉。駅から徒歩10分以上の店は入れていない。いずれかの駅から9分以内の店だけ。2026-10-31 に Googleマップで閉業と出ていた店も入れていない。星はその日に見た数字。営業時間は同じ日までに見た公開情報。出発前に各店で確認する。 */
const MOODS = [
  { id: "forest", label: "森", group: "scene" },
  { id: "water", label: "水辺", group: "scene" },
  { id: "house", label: "古民家", group: "scene" },
  { id: "height", label: "高み", group: "scene" },
  { id: "night", label: "灯", group: "scene" },
  { id: "abroad", label: "旅先", group: "scene" },
  { id: "mineral", label: "鉱物", group: "scene" },
  { id: "onsen", label: "湯の町", group: "scene" },
  { id: "shrine", label: "社のとなり", group: "scene" },
  { id: "retro", label: "レトロ", group: "scene" },
  { id: "quiet", label: "静か", group: "visit" },
  { id: "linger", label: "長居しやすい", group: "visit" },
  { id: "roomy", label: "席広め", group: "visit" },
  { id: "sweet", label: "甘いもの", group: "visit" },
  { id: "air", label: "雰囲気重視", group: "visit" },
  { id: "view", label: "見晴らし", group: "visit" },
  { id: "meal", label: "食事", group: "visit" },
  { id: "morning", label: "朝から", group: "visit" },
  { id: "late", label: "夜まで", group: "visit" },
];

const PREFS = ["東京", "神奈川", "千葉", "埼玉"];

const CONFIDENCE = {
  official: "公式の時間",
  guide: "案内の目安",
  confirm: "当日確認",
};

const KINDS = [
  { id: "cafe", label: "カフェ" },
  { id: "izakaya", label: "居酒屋" },
  { id: "bar", label: "バー" },
];

const CAFES = [
  {
    "id": "nanashian",
    "name": "喫茶 nanashian",
    "kana": "ナナシアン",
    "prefecture": "東京",
    "locality": "麻布台",
    "moods": [
      "night",
      "abroad",
      "linger",
      "late"
    ],
    "lead": "麻布台の地下で、カップを選んで紅茶を飲む。",
    "story": "2025年に麻布台へ出た紅茶の専門店。支払いは現金を扱わない。紹介記事では、濃紺の店内にアンティークや名門のカップが並び、好みの一客を選んで淹れてもらう、とある。夜も開いている日が多い。",
    "address": "東京都港区麻布台3-4-14 麻布台マンション B101",
    "access": "東京メトロ南北線 六本木一丁目駅から徒歩約8分。日比谷線 神谷町駅・六本木駅から徒歩約10分。麻布台ヒルズ タワープラザから徒歩約1分。",
    "hours": "火〜土 10:00〜22:00（21:00 ラストオーダー）／日 10:00〜20:00（19:00 ラストオーダー）",
    "closed": "月曜（祝日のときは営業し、翌火曜が休み）",
    "phone": "",
    "links": [
      {
        "label": "公式の案内",
        "href": "https://nanashian.co.jp/information/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "公式でオンライン予約を受けている。",
    "parking": "",
    "signature": "産地を選んだ紅茶。カップは店の棚から",
    "notes": [
      "完全キャッシュレス。現金は使えない。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "公式の案内ページ。店内の描写はタイムアウト東京の紹介（2025年）",
    "sourceUrl": "https://nanashian.co.jp/information/",
    "lat": 35.659779,
    "lng": 139.738678,
    "mapsStars": 4.4,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "chanoma",
    "name": "Chanoma",
    "kana": "チャノマ",
    "prefecture": "東京",
    "locality": "西池袋",
    "moods": [
      "house",
      "linger",
      "sweet",
      "air"
    ],
    "lead": "池袋のビルのあいだに、戦後すぐの平屋と木戸門がある。",
    "story": "西池袋の細道を折れると、庭木に包まれた木造平屋が出る。オーナーの祖父母が戦後まもなく建てた家で、入口の木戸門は江戸末期から明治に造られ、関東大震災と東京大空襲を残った、と nippon.com の記事にある。土間か、靴を脱いで和室かで、光の濃さが変わる。",
    "address": "東京都豊島区西池袋5-12-3",
    "access": "東京メトロ有楽町線 要町駅から徒歩約6分。JR池袋駅から徒歩約8分、と記事にある。",
    "hours": "10:00〜18:30（18:00 ラストオーダー）",
    "closed": "火曜",
    "phone": "",
    "links": [
      {
        "label": "Instagram",
        "href": "https://www.instagram.com/chanoma11/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "和スイーツ。庭を見ながら",
    "notes": [
      "営業時間は nippon.com の記事による。店の固定サイトは Instagram。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "guide",
    "sourceLabel": "nippon.com の記事",
    "sourceUrl": "https://www.nippon.com/ja/articles/-/1451",
    "lat": 35.732361,
    "lng": 139.704163,
    "mapsStars": 4,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "shouan",
    "name": "松庵文庫",
    "kana": "ショウアンブンコ",
    "prefecture": "東京",
    "locality": "西荻窪",
    "moods": [
      "house",
      "retro",
      "morning",
      "late",
      "air"
    ],
    "lead": "オーケストラを日本に運んだ人の家で、本と庭を見る。",
    "story": "西荻窪の住宅街、築80年を超える古民家。日本にオーケストラを導入した音楽家の私邸だった、と Tokyo Tokyo の記事にある。靴を脱いで入り、どの部屋からも裏の庭が見える。水曜は昼だけ、金土は夜まで、という店自身の案内が2024年2月にある。",
    "address": "東京都杉並区松庵3-12-22",
    "access": "JR中央線 西荻窪駅から徒歩約7分、という紹介。",
    "hours": "水 12:00〜15:00／木・日 9:00〜18:00／金・土 9:00〜22:00",
    "closed": "月・火",
    "phone": "03-5941-3662",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://shouanbunko.com/"
      },
      {
        "label": "営業時間の案内",
        "href": "https://shouanbunko.com/news/331/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "席の予約は店舗の電話、と2024年2月の案内。",
    "parking": "",
    "signature": "コーヒーのモーニング、庭、本",
    "notes": [
      "時間は2024年2月29日付の店のニュース。その後変わっている可能性がある。",
      "同じ案内に、小学校3年生以下の入店は遠慮、混雑時は90分、とある。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "松庵文庫のニュース（2024年2月29日）",
    "sourceUrl": "https://shouanbunko.com/news/331/",
    "lat": 35.701466,
    "lng": 139.595505,
    "mapsStars": 4.2,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "rengetsu",
    "name": "古民家カフェ 蓮月",
    "kana": "レンゲツ",
    "prefecture": "東京",
    "locality": "池上",
    "moods": [
      "house",
      "shrine",
      "air"
    ],
    "lead": "1933年、宮大工が建てた門前の家。池上本門寺の借景。",
    "story": "池上本門寺の門前。入母屋の屋根と跳高欄は寺社建築の要素を借りていて、1階はそば屋、2階は旅籠だった。2014年にそば屋が閉じたあと、地域の保存の声でカフェになった、と Tokyo Tokyo の記事にある。磨りガラスや品書きを、往時のまま残している。",
    "address": "東京都大田区池上2-20-11",
    "access": "東急池上線 池上駅から、池上本門寺の門前へ歩く。地図で測ると、池上駅から道のり約680m、徒歩約8分（分速80m）。",
    "hours": "平日 11:30〜18:00（17:30 ラストオーダー）／土・日・祝 11:00〜18:00（17:30 ラストオーダー）",
    "closed": "不定休",
    "phone": "03-6410-5469",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://rengetsu.net/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "建物と、本門寺を借景にした席",
    "notes": [],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "guide",
    "sourceLabel": "Tokyo Tokyo の紹介（2025年10月時点、と記事にある）",
    "sourceUrl": "https://tokyotokyo.jp/ja/mediacollab/tabi-labo/",
    "lat": 35.577175,
    "lng": 139.703827,
    "mapsStars": 4,
    "mapsChecked": "2026-10-31",
    "walk": "池上駅から徒歩約8分"
  },
  {
    "id": "kuracafe",
    "name": "喫茶 Kura Cafe",
    "kana": "クラカフェ",
    "prefecture": "埼玉",
    "locality": "川越",
    "moods": [
      "retro",
      "house",
      "sweet"
    ],
    "lead": "登録有形文化財の酒蔵、明治蔵の奥の喫茶。",
    "story": "明治8年創業の旧鏡山酒造を改修した小江戸蔵里。明治蔵・大正蔵・昭和蔵が並ぶ敷地の、おみやげ処・明治蔵の中にある。蔵の中でさつまいものプリンを食べる。本川越駅から徒歩約3分。",
    "address": "埼玉県川越市新富町1-10-1 小江戸蔵里 明治蔵",
    "access": "西武新宿線 本川越駅から徒歩約3分。JR・東武 川越駅から徒歩約15分。",
    "hours": "11:00〜18:00",
    "closed": "元日。臨時休館あり",
    "phone": "049-228-1783",
    "links": [
      {
        "label": "川越商工会議所",
        "href": "https://www.kawagoe.or.jp/kuracafe/"
      },
      {
        "label": "Instagram",
        "href": "https://www.instagram.com/kuracafe_kawagoe"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "蔵里の周辺駐車場を使う",
    "signature": "自家製おいもぷりん",
    "notes": [
      "ラストオーダーを17:30とする紹介もある。商工会議所のページは 11:00〜18:00、元旦定休。"
    ],
    "train": true,
    "car": true,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "川越商工会議所の Kura Cafe ページ",
    "sourceUrl": "https://www.kawagoe.or.jp/kuracafe/",
    "lat": 35.916283,
    "lng": 139.48378,
    "mapsStars": 4.1,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "hagiso",
    "name": "HAGI CAFE（HAGISO）",
    "kana": "ハギカフェ",
    "prefecture": "東京",
    "locality": "谷中",
    "moods": [
      "retro",
      "house",
      "sweet",
      "morning",
      "late",
      "meal",
      "air"
    ],
    "lead": "1955年の木造アパート「萩荘」を、壊さずに文化施設にした。",
    "story": "谷中の最小文化複合施設 HAGISO の1階。藝大生のシェアハウスだった木造アパートが取り壊される前に展覧会を開き、2013年にカフェ・ギャラリー・宿として残った。ハンドドリップと、近所の店から仕入れた季節の食事。朝のモーニングは、休みの日も開く、と施設のページにある。",
    "address": "東京都台東区谷中3-10-25",
    "access": "谷中。日暮里駅、または千駄木・根津方面から歩く。地図で測ると、千駄木駅から道のり約600m、徒歩約8分（分速80m）。",
    "hours": "モーニング 8:00〜10:30。火水木 12:00〜17:00。金土日 12:00〜20:00（hagiso.com の案内）",
    "closed": "月曜と第2火曜。モーニングは毎日、という同じページの注記",
    "phone": "03-5832-9808",
    "links": [
      {
        "label": "HAGISO 公式",
        "href": "https://hagiso.com/hagiso/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "一杯ずつ淹れるハンドドリップ、自家製のケーキ",
    "notes": [
      "別ドメインの hagiso.jp は、昼から夜まで毎日、と読める書き方になっている。行く週は Instagram か電話で見る。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "hagiso.com の施設ページ",
    "sourceUrl": "https://hagiso.com/hagiso/",
    "lat": 35.726372,
    "lng": 139.766159,
    "mapsStars": 4.2,
    "mapsChecked": "2026-10-31",
    "walk": "千駄木駅から徒歩約8分"
  },
  {
    "id": "kosoan",
    "name": "古桑庵",
    "kana": "コソウアン",
    "prefecture": "東京",
    "locality": "自由が丘",
    "moods": [
      "house",
      "linger",
      "sweet",
      "air"
    ],
    "lead": "昭和29年の茶室をひらいた、庭が額縁の和カフェ。",
    "story": "自由が丘の日本家屋。夏目漱石の長女の婿、松岡譲が名づけた、と ANA の記事にある。桑の古材を使っているので古桑庵。大きなガラスの向こうは日本庭園で、名物として果物を盛ったあんみつが紹介されている。自由が丘の商店街から一段、時代がずれる。",
    "address": "東京都目黒区自由が丘1-24-23",
    "access": "東急東横線・大井町線 自由が丘駅から住宅地へ歩く。地図で測ると、自由が丘駅から道のり約670m、徒歩約8分（分速80m）。",
    "hours": "11:00〜18:30",
    "closed": "水曜",
    "phone": "03-3718-4203",
    "links": [
      {
        "label": "公式サイト",
        "href": "http://kosoan.co.jp/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "フルーツを盛ったあんみつ",
    "notes": [
      "時間は ANA の旅行記事の記載。記事の年月が古い可能性があるので、公式か電話で見る。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "guide",
    "sourceLabel": "ANA の旅行記事に掲載された店舗情報",
    "sourceUrl": "https://www.ana.co.jp/travelandlife/article/000340/2/",
    "lat": 35.610561,
    "lng": 139.668472,
    "mapsStars": 4.4,
    "mapsChecked": "2026-10-31",
    "walk": "自由が丘駅から徒歩約8分"
  },
  {
    "id": "nonbiriya",
    "name": "散ポタカフェ のんびりや",
    "kana": "ノンビリヤ",
    "prefecture": "東京",
    "locality": "谷中",
    "moods": [
      "house",
      "retro",
      "linger",
      "meal",
      "late",
      "air"
    ],
    "lead": "大正の家を、ほぼ直さずに使っている。",
    "story": "谷中の、大正時代に建てられた家。リノベーションをせず、手入れだけで維持している、とるるぶの2025年4月の記事は書いている。ちゃぶ台、土間の椅子、カウンター、奥の座敷。昼はカフェ、夜は酒とおばんざいも出る。水と木が休み。",
    "address": "東京都台東区谷中5-2-29",
    "access": "谷中。根津駅、千駄木駅から歩く距離。地図で測ると、日暮里駅から道のり約590m、徒歩約7分（分速80m）。",
    "hours": "ランチ 11:30〜15:00、ディナー 18:00〜23:00。土・日・祝は 11:00〜23:00",
    "closed": "水・木",
    "phone": "03-6879-5630",
    "links": [],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "オムライス、檸檬カレー、おばんざい",
    "notes": [
      "店の固定サイトは、この手帳では確認できなかった。時間はるるぶの記事（配信日の記載は2025年4月12日）。",
      "昼だけでなく夜も開くので、カフェだけで行くなら時間帯を選ぶ。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "guide",
    "sourceLabel": "るるぶ&more. の古民家カフェ記事",
    "sourceUrl": "https://rurubu.jp/andmore/article/15647",
    "lat": 35.724209,
    "lng": 139.768967,
    "mapsStars": 4.1,
    "mapsChecked": "2026-10-31",
    "walk": "日暮里駅から徒歩約7分"
  },
  {
    "id": "musashino",
    "checked": "2026-10-31",
    "name": "武蔵野珈琲店",
    "kana": "ムサシノコーヒーテン",
    "prefecture": "東京",
    "locality": "吉祥寺",
    "moods": [
      "retro",
      "sweet",
      "linger",
      "air",
      "meal",
      "late"
    ],
    "lead": "吉祥寺駅の南口から3分。クラシックが流れる純喫茶。",
    "story": "1982年開店。ネルドリップのコーヒーを、大倉陶園やマイセンなどの器で出す。店内はクラシック音楽。紅茶のマスターズティーは、ゆったりした時間、と公式が書いている。手作りのケーキと、バニラビーンズのプリンがある。お子さま連れは遠慮してほしい、ともある。",
    "address": "東京都武蔵野市吉祥寺南町1-16-11 荻上ビル2F",
    "access": "吉祥寺駅南口から徒歩3分。マルイ横の七井土通りを井の頭公園へ向かい、左側の2階。ファミリーマートの正面のビル。",
    "hours": "11:00〜21:00",
    "closed": "なし（年中無休）",
    "phone": "0422-47-6741",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://oishicoffee.com/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "ネルドリップ、マスターズティー、バニラビーンズのプリン",
    "notes": [
      "全席禁煙。お子さま連れは遠慮、と公式にある。",
      "2杯目のコーヒーは安くなる、と公式にある。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "公式サイトの営業案内",
    "sourceUrl": "https://oishicoffee.com/",
    "lat": 35.701382,
    "lng": 139.578644,
    "mapsStars": 4,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "hachisanroku",
    "checked": "2026-10-31",
    "name": "八三六",
    "kana": "ハチサンロク",
    "prefecture": "東京",
    "locality": "谷中",
    "moods": [
      "house",
      "quiet",
      "linger",
      "air"
    ],
    "lead": "谷中銀座の路地。築70年の古民家で、静かな時間と和の素材。",
    "story": "公式は、谷中銀座の築70年の古民家で、素材本来の味わいを大切にした和のカフェ、と書いている。路地裏のとても静かな時間を、ゆっくり過ごしてほしい、ともある。",
    "address": "東京都台東区谷中3-13-2",
    "access": "谷中銀座。駅からの分数は店舗ページにない。地図で測ると、千駄木駅から道のり約350m、徒歩約4分（分速80m）。",
    "hours": "10:00〜19:00（18:30 ラストオーダー）",
    "closed": "店舗ページに定休日の記載はない",
    "phone": "080-3097-8564",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.hachisanroku-yanaka.com/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "公式サイトから予約できる。",
    "parking": "",
    "signature": "",
    "notes": [
      "2026年9月15日からの期間限定として、だんごあそびといもくりかぼちゃがページにある。通年の一品としては書いていない。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "八三六の公式サイト",
    "sourceUrl": "https://www.hachisanroku-yanaka.com/",
    "lat": 35.727699,
    "lng": 139.765244,
    "mapsStars": 4.6,
    "mapsChecked": "2026-10-31",
    "walk": "千駄木駅から徒歩約4分"
  },
  {
    "id": "nomark",
    "checked": "2026-10-31",
    "name": "no mark.Cafe",
    "kana": "ノーマークカフェ",
    "prefecture": "東京",
    "locality": "清澄白河",
    "moods": [
      "house",
      "sweet",
      "air"
    ],
    "picks": [
      "nomarkブレンド",
      "オリジナルゼリー",
      "ゼリーオレ"
    ],
    "lead": "清澄白河の小さな古民家。コーヒーと、三色のゼリー。",
    "story": "2021年に古民家カフェとして開いた、と公式が書いている。清澄白河を知る、味わう、持ち帰ることがテーマ。コーヒーは一杯ずつドリップし、自家焙煎の豆もある。清澄白河をイメージした三種類のオリジナルゼリーがある。",
    "address": "東京都江東区白河3-7-3",
    "access": "清澄白河駅 B2出口から徒歩4分。",
    "hours": "10:00〜18:00",
    "closed": "月・火",
    "phone": "",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://nomarkcafe.jp/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "オリジナルゼリーはテイクアウトできない、と公式。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "no mark.Cafe の公式サイト",
    "sourceUrl": "https://nomarkcafe.jp/",
    "lat": 35.682789,
    "lng": 139.803757,
    "mapsStars": 4.5,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "hamorebi",
    "checked": "2026-10-31",
    "name": "葉もれ日",
    "kana": "ハモレビ",
    "prefecture": "東京",
    "locality": "浅草橋",
    "moods": [
      "retro",
      "air"
    ],
    "lead": "浅草橋の、木の仕事とコーヒーの店。",
    "story": "店のサイトは coffee and wood と掲げ、木の小物も置いている。営業時間の欄は 11:00〜18:00、月曜は休みで、祝日は除く。2021年の投稿には、17:30 ラストオーダーで、状況によって早く閉める、とある。",
    "address": "東京都台東区浅草橋3-4-4",
    "access": "浅草橋。駅からの分数は店舗ページにない。地図で測ると、浅草橋駅から道のり約430m、徒歩約5分（分速80m）。",
    "hours": "11:00〜18:00",
    "closed": "月曜（祝日は除く）",
    "phone": "03-6339-9139",
    "links": [
      {
        "label": "公式サイト",
        "href": "http://hamorebi.tokyo/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "2021年2月の投稿は、緊急事態宣言に合わせて店内を1時間以内、とも書いている。今も同じ制限かは、ページからは分からない。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "葉もれ日の公式サイト",
    "sourceUrl": "http://hamorebi.tokyo/",
    "lat": 35.700516,
    "lng": 139.785782,
    "mapsStars": 4.4,
    "mapsChecked": "2026-10-31",
    "walk": "浅草橋駅から徒歩約5分"
  },
  {
    "id": "fukadaso",
    "checked": "2026-10-31",
    "name": "fukadaso cafe",
    "kana": "フカダソカフェ",
    "prefecture": "東京",
    "locality": "清澄白河",
    "moods": [
      "retro",
      "house",
      "late",
      "air"
    ],
    "lead": "築60年のアパート兼倉庫を残した、深田荘の1階。",
    "story": "アルトハウスの取引先ページは、清澄白河駅から徒歩5分、築60年のアパート兼倉庫だった深田荘をリノベーションした建物の1階、と書いている。レトロな外観はそのまま、ともある。",
    "address": "東京都江東区平野1-9-7",
    "access": "都営大江戸線・東京メトロ半蔵門線 清澄白河駅 A3出口から徒歩5分。",
    "hours": "月・木〜日 13:00〜18:00（金曜のみ 21:30）",
    "closed": "火・水",
    "phone": "03-6321-5811",
    "links": [
      {
        "label": "アルトハウスの店舗案内",
        "href": "https://althaus.jp/customer/fukadaso-cafe/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "店舗内の駐車場はない、と案内",
    "signature": "",
    "notes": [],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "アルトハウスの fukadaso cafe 案内",
    "sourceUrl": "https://althaus.jp/customer/fukadaso-cafe/",
    "lat": 35.678734,
    "lng": 139.800095,
    "mapsStars": 3.9,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "buriki",
    "checked": "2026-10-31",
    "name": "ブリキボタン CAFE&DINING",
    "kana": "ブリキボタン",
    "prefecture": "東京",
    "locality": "下北沢",
    "moods": [
      "abroad",
      "meal",
      "late",
      "air"
    ],
    "picks": [
      "キッシュ",
      "カレー"
    ],
    "lead": "下北沢の2階。洋館のアトリエに、ボタンとアンティーク。",
    "story": "公式の案内は、古びた洋館のアトリエを思わせる空間で、好奇心旺盛な少女がこっそり辿り着いた秘密の場所がコンセプト、と書いている。店内にはボタンやアンティーク雑貨が散らしてある。ランチはキッシュやカレー、ともある。",
    "address": "東京都世田谷区北沢2-14-7 下北沢セントラル2F",
    "access": "京王井の頭線 下北沢駅から徒歩3分。",
    "hours": "12:00〜23:00（22:30 ラストオーダー）",
    "closed": "不定休。年末年始は要確認",
    "phone": "050-5303-4725",
    "links": [
      {
        "label": "公式の店舗案内",
        "href": "https://burikibotan-cafe.foodre.jp/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "席は25。ソファー席と個室があると、同じ案内にある。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "ブリキボタンの公式案内",
    "sourceUrl": "https://burikibotan-cafe.foodre.jp/",
    "lat": 35.660149,
    "lng": 139.667374,
    "mapsStars": 3.9,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "kokogura",
    "kind": "izakaya",
    "checked": "2026-10-31",
    "name": "古鼓蔵",
    "kana": "ココグラ",
    "prefecture": "東京",
    "locality": "田町",
    "moods": [
      "house",
      "night",
      "meal",
      "late",
      "air"
    ],
    "picks": [
      "炭火焼",
      "釜めし",
      "伊達鶏"
    ],
    "lead": "三田の路地。古民家の店構えと、掘りごたつ。",
    "story": "公式は、レトロな古民家を使った店構え、と書いている。店内は懐かしさと和モダンで、掘りごたつの個室とテーブルの個室がある。炭火焼、釜めし、常時20種類以上の日本酒を出している。",
    "address": "東京都港区芝5-20-20",
    "access": "都営地下鉄三田駅 A3出口から徒歩約2分。JR田町駅 三田口から徒歩約4分。",
    "hours": "月〜木 17:00〜23:30（22:30 ラストオーダー）／金 17:00〜翌2:00（25:00 ラストオーダー）／土・祝 17:00〜23:00（22:00 ラストオーダー）",
    "closed": "日曜",
    "phone": "03-3455-5288",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://kokogura.jp/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "個室は公式が予約を勧めている。",
    "parking": "",
    "signature": "",
    "notes": [
      "席は80、と公式。分煙で、外に喫煙スペースがある。",
      "ピンは番地の途中まで。入口は、説明の Googleマップ で開く。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "古鼓蔵の公式サイト",
    "sourceUrl": "https://kokogura.jp/",
    "lat": 35.647655,
    "lng": 139.747101,
    "pinRough": true,
    "mapsStars": 4.1,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "senju-gen",
    "kind": "izakaya",
    "checked": "2026-10-31",
    "name": "千寿宿 玄",
    "kana": "センジュヤドゲン",
    "prefecture": "東京",
    "locality": "北千住",
    "moods": [
      "house",
      "night",
      "meal",
      "late",
      "air"
    ],
    "lead": "北千住の古民家。居酒屋だけでも入れる。",
    "story": "公式は、古民家を改装した和の空間の居酒屋兼ゲストハウス、と書いている。居酒屋だけの利用も歓迎、ともある。料理は和洋の創作で、パエリアが出ることもある、とページにある。通年の一品としては固定していない。",
    "address": "東京都足立区日ノ出町6-3",
    "access": "北千住駅東口から徒歩約8分。",
    "hours": "月〜土 17:00〜22:00",
    "closed": "日曜",
    "phone": "03-6812-0618",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://senjuyado-gen.com/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "ゲストハウスのチェックインは 16:00〜21:00、と公式。居酒屋の時間とは別に書いてある。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "千寿宿 玄の公式サイト",
    "sourceUrl": "https://senjuyado-gen.com/",
    "lat": 35.750671,
    "lng": 139.812241,
    "mapsStars": 5,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "okashi0467",
    "checked": "2026-10-31",
    "name": "OKASHI0467",
    "kana": "オカシゼロヨンロクロクナナ",
    "prefecture": "神奈川",
    "locality": "鎌倉・長谷",
    "moods": [
      "house",
      "sweet",
      "air"
    ],
    "lead": "長谷の、築80年以上の日本家屋。お菓子と喫茶。",
    "story": "公式は、築80年以上の日本家屋をリノベーションした古民家カフェと洋菓子店、と書いている。古民家に新しい息吹を加え、モダンでありながら心地よい空間、ともある。ページの営業案内は 11:00〜18:00、火曜休み。",
    "address": "神奈川県鎌倉市長谷1-11-21",
    "access": "江ノ電 長谷駅または由比ヶ浜駅から、ともに徒歩5分。",
    "hours": "11:00〜18:00",
    "closed": "火曜",
    "phone": "0467-25-0753",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://kamakura0467.com/pages/about0467"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "御成町の 0467GIFT は別の店。ここは長谷。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "OKASHI0467 の公式サイト",
    "sourceUrl": "https://kamakura0467.com/pages/about0467",
    "lat": 35.31316,
    "lng": 139.537735,
    "mapsStars": 4,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "egao",
    "checked": "2026-10-31",
    "name": "Cafe&Restaurant EGAO",
    "kana": "エガオ",
    "prefecture": "神奈川",
    "locality": "鎌倉",
    "moods": [
      "house",
      "morning",
      "meal",
      "late",
      "air"
    ],
    "picks": [
      "自家製はちみつレモンスカッシュ",
      "鎌倉ビール"
    ],
    "lead": "鎌倉市景観重要建築物、篠田邸のカフェ。",
    "story": "公式は、鎌倉市景観重要建築物の篠田邸に開いたカフェ＆レストラン、と書いている。鎌倉の自然と歴史に溶け込む場所、ともある。自家製はちみつレモンスカッシュと鎌倉ビールの名前がある。",
    "address": "神奈川県鎌倉市由比ガ浜2-21-15",
    "access": "鎌倉市由比ガ浜。駅からの分数は店舗ページにない。地図で測ると、由比ヶ浜駅から道のり約460m、徒歩約6分（分速80m）。",
    "hours": "火〜木 11:00〜18:00（17:00 ラストオーダー）／金 11:00〜21:00（20:00 ラストオーダー）／土 7:00〜10:00、11:00〜21:00／日 7:00〜10:00、11:00〜18:00",
    "closed": "月曜",
    "phone": "046-738-7232",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.cafe-restaurant-egao.jp/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "土日の朝 7:00〜10:00 はモーニング。ラストオーダーは 9:00。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "EGAO の公式サイト",
    "sourceUrl": "https://www.cafe-restaurant-egao.jp/",
    "lat": 35.311401,
    "lng": 139.546173,
    "mapsStars": 4.4,
    "mapsChecked": "2026-10-31",
    "walk": "由比ヶ浜駅から徒歩約6分"
  },
  {
    "id": "toukasou",
    "checked": "2026-10-31",
    "name": "cafe 藤香想",
    "kana": "カフェトウカソウ",
    "prefecture": "東京",
    "locality": "要町",
    "moods": [
      "house",
      "late",
      "air"
    ],
    "lead": "要町の古民家。木のあいだを風が抜ける、と公式が書いている。",
    "story": "公式は古民家カフェと名乗り、木々に囲まれ、風が吹き抜け、陽光が射し込む、カフェという名の縁側、と書いている。月・水は 18:00 まで、木から日は 21:00 まで。火曜が休み。",
    "address": "東京都豊島区要町1-38-11",
    "access": "東京メトロ有楽町線・副都心線 要町駅 1番出口から徒歩5分。",
    "hours": "月・水 11:30〜18:00／木・金・土・日 11:30〜21:00",
    "closed": "火曜",
    "phone": "03-6909-4602",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.toukasou.com/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "cafe 藤香想の公式サイト",
    "sourceUrl": "https://www.toukasou.com/",
    "lat": 35.735863,
    "lng": 139.697388,
    "mapsStars": 4.4,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "amane",
    "checked": "2026-10-31",
    "name": "雨音茶寮",
    "kana": "アマネサリョウ",
    "prefecture": "東京",
    "locality": "千駄木",
    "moods": [
      "house",
      "quiet",
      "linger",
      "air"
    ],
    "lead": "元長屋。1階はパリの和カフェ、2階は屋根裏のような席。",
    "story": "公式は、千駄木と根津のあいだの元長屋を改装した和カフェ、と書いている。1階はパリの和カフェのイメージ、2階は屋根裏部屋のような空間。店内のおしゃべりは小声で、とある。土・日・祝の予約は受けていない。",
    "address": "東京都文京区千駄木2-44-19",
    "access": "千駄木。駅からの分数は店舗ページにない。地図で測ると、千駄木駅から道のり約400m、徒歩約5分（分速80m）。",
    "hours": "11:00〜18:00（17:00 ラストオーダー）",
    "closed": "火・水",
    "phone": "03-6876-8402",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.amanesaryo.com/about-us"
      }
    ],
    "reservation": "unavailable",
    "reservationNote": "土・日・祝は予約を受けていない、と公式。",
    "parking": "",
    "signature": "",
    "notes": [],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "雨音茶寮の公式サイト",
    "sourceUrl": "https://www.amanesaryo.com/about-us",
    "lat": 35.722153,
    "lng": 139.762421,
    "mapsStars": 4.3,
    "mapsChecked": "2026-10-31",
    "walk": "千駄木駅から徒歩約5分"
  },
  {
    "id": "hikidashi",
    "checked": "2026-10-31",
    "name": "ヒキダシ",
    "kana": "ヒキダシ",
    "prefecture": "東京",
    "locality": "清澄白河",
    "moods": [
      "house",
      "meal",
      "late",
      "air"
    ],
    "lead": "清澄白河の古民家。1階は壁一面の引き出し。",
    "story": "公式は、古民家を直したカフェで、1階は壁一面に引き出しがあり、木の温もりのある店内、と書いている。2階は壁を白くし、絵を掛けられる。営業は 11:30〜22:00、ラストオーダー 21:00。",
    "address": "東京都江東区白河3-8-5",
    "access": "清澄白河駅。徒歩の分数は店舗ページにない。地図で測ると、清澄白河駅から道のり約720m、徒歩約9分（分速80m）。",
    "hours": "11:30〜22:00（21:00 ラストオーダー）",
    "closed": "店舗ページに定休日の記載はない",
    "phone": "03-6458-8680",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://hikidasahi.my.canva.site/hp"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "ヒキダシの公式サイト",
    "sourceUrl": "https://hikidasahi.my.canva.site/hp",
    "lat": 35.682941,
    "lng": 139.804855,
    "mapsStars": 3.7,
    "mapsChecked": "2026-10-31",
    "walk": "清澄白河駅から徒歩約9分"
  },
  {
    "id": "wacha",
    "checked": "2026-10-31",
    "name": "神楽坂 和茶",
    "kana": "ワチャ",
    "prefecture": "東京",
    "locality": "神楽坂",
    "moods": [
      "house",
      "air"
    ],
    "lead": "横寺町の茶室。土間のテーブルと、畳。",
    "story": "公式は、神楽坂から一本入った横寺町の、茶室のあるカフェ、と書いている。土間のテーブル席と、茶室の畳でお茶を飲む。一汁一菜は予約。作法にこだわらず、ともある。",
    "address": "東京都新宿区横寺町37",
    "access": "東京メトロ東西線 神楽坂駅 1番出口から徒歩4分。都営大江戸線 牛込神楽坂駅 A2出口から徒歩3分。JR飯田橋駅から徒歩9分。",
    "hours": "正午〜17:00（ラストオーダー）",
    "closed": "水曜。ほかの休みはお知らせで確認、と公式",
    "phone": "03-5946-8761",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://wa-cha-tsukinomi.com/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "一汁一菜は予約。",
    "parking": "",
    "signature": "",
    "notes": [],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "神楽坂 和茶の公式サイト",
    "sourceUrl": "https://wa-cha-tsukinomi.com/",
    "lat": 35.701759,
    "lng": 139.73613,
    "mapsStars": 4.8,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "sepia",
    "checked": "2026-10-31",
    "name": "昭和レトロ喫茶セピア",
    "kana": "セピア",
    "prefecture": "東京",
    "locality": "柴又",
    "moods": [
      "retro",
      "sweet",
      "air"
    ],
    "picks": [
      "手作りプリン"
    ],
    "lead": "柴又。1階は少女の思い出、2階は友達の家、と公式が分けている。",
    "story": "公式は、一歩入ると別世界で、昭和の少女漫画の世界、と書いている。1階を「女子小学生の思い出」、2階の個室を「子供のころに遊んだ友達の家」とし、2階にキャンディ・キャンディの展示もある。プリンは牛乳と砂糖と卵だけ、とある。",
    "address": "東京都葛飾区柴又7-4-11",
    "access": "京成柴又駅から徒歩2分。",
    "hours": "月・火・水・金・土・日 12:00〜17:00（食事 16:00、ほか 16:30 ラストオーダー）",
    "closed": "不定休。変わるときは Instagram、と公式",
    "phone": "03-6657-8620",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://sepia-cafe.com/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "貸切の個室は電話。16時以降がつながりやすい、と公式。",
    "parking": "",
    "signature": "",
    "notes": [
      "営業時間も定休日も変わることがある、と公式が書いている。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "昭和レトロ喫茶セピアの公式サイト",
    "sourceUrl": "https://sepia-cafe.com/",
    "lat": 35.757912,
    "lng": 139.875809,
    "mapsStars": 4,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "shitamachi",
    "checked": "2026-10-31",
    "name": "Shitamachi Cafe",
    "kana": "シタマチカフェ",
    "prefecture": "東京",
    "locality": "北千住",
    "moods": [
      "house",
      "meal"
    ],
    "picks": [
      "ドリップコーヒー",
      "ホットサンド"
    ],
    "lead": "北千住の古民家。第二の実家のような席、と公式。",
    "story": "公式は、北千住の古民家を直したカフェで、家庭的な空間を第二の実家のように、と書いている。コーヒーはミャンマーの豆を一杯ずつ。営業は土・日・月の 14:00〜19:00。定休日は不定休、ともある。",
    "address": "東京都足立区千住4-28-5",
    "access": "北千住駅から徒歩5分。",
    "hours": "土・日・月 14:00〜19:00",
    "closed": "不定休",
    "phone": "090-3048-3299",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://shitamachicafe.com/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "かき氷は夏季限定、と公式。通年の名前には入れていない。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "Shitamachi Cafe の公式サイト",
    "sourceUrl": "https://shitamachicafe.com/",
    "lat": 35.753883,
    "lng": 139.804916
  },
  {
    "id": "paulista",
    "checked": "2026-10-31",
    "name": "カフェーパウリスタ 銀座本店",
    "kana": "カフェーパウリスタ",
    "prefecture": "東京",
    "locality": "銀座",
    "moods": [
      "retro",
      "morning",
      "late",
      "air"
    ],
    "lead": "銀座の老舗。ソファとシャンデリアは、ホテルの紹介記事にある。",
    "story": "時間は公式の店舗案内。1階と2階で違う。ミレニアム 三井ガーデンホテル東京の2024年10月6日の記事は、1911年創業で、低革のソファとシャンデリアが並ぶ、と書いている。その記事の時間は公式と違うので、ここには公式の時間だけを載せた。",
    "address": "東京都中央区銀座8-9 長崎センタービル 1階・2階",
    "access": "銀座駅から徒歩7分。新橋駅から徒歩7分。",
    "hours": "1階 月〜金 9:00〜20:00（フード 19:00、ドリンク 19:30）／土 9:00〜19:30（フード 18:30、ドリンク 19:00）／日・祝 11:30〜19:00（フード 18:00、ドリンク 18:30）。2階 月〜土 12:00〜18:30（フード 17:30、ドリンク 18:00）／日・祝 12:00〜19:00（フード 18:00、ドリンク 18:30）",
    "closed": "年中無休（年末年始を除く）",
    "phone": "03-3572-6160",
    "links": [
      {
        "label": "公式の店舗案内",
        "href": "https://www.paulista.co.jp/user_data/shop"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "店内の描写は、ミレニアム 三井ガーデンホテル東京の紹介（2024年10月6日）。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "カフェーパウリスタの公式店舗案内。店内はホテルの紹介記事",
    "sourceUrl": "https://www.paulista.co.jp/user_data/shop",
    "lat": 35.667988,
    "lng": 139.761932,
    "mapsStars": 4.2,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "hatome",
    "checked": "2026-10-31",
    "name": "hatome",
    "kana": "ハトメ",
    "prefecture": "東京",
    "locality": "下丸子",
    "moods": [
      "house",
      "air"
    ],
    "picks": [
      "チャイ",
      "ハンドドリップコーヒー"
    ],
    "lead": "下丸子。築約50年の古民家を、カフェとギャラリーにしている。",
    "story": "公式は、築約50年の古民家を直し、古き良き雰囲気と新しいものを合わせた場所、と書いている。カフェは 11:30〜18:00、ラストオーダー 17:30。月曜が休み。レンタルや搬入で時間が変わることがある、ともある。",
    "address": "東京都大田区下丸子3-16-11",
    "access": "東急多摩川線 下丸子駅から徒歩3分。",
    "hours": "11:30〜18:00（17:30 ラストオーダー）",
    "closed": "月曜。特別休暇は Instagram とサイト",
    "phone": "",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://hatome-maruko.com/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "食事の出店は日によって変わる。連絡は公式LINE、とサイトにある。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "hatome の公式サイト",
    "sourceUrl": "https://hatome-maruko.com/",
    "lat": 35.569641,
    "lng": 139.685379,
    "mapsStars": 4.3,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "kichi",
    "checked": "2026-10-31",
    "name": "ギャラリー吉・吉カフェ",
    "kana": "ギャラリーキチ",
    "prefecture": "東京",
    "locality": "吉祥寺",
    "moods": [
      "house",
      "air"
    ],
    "lead": "吉祥寺の古民家。展示を見て、珈琲を飲む。",
    "story": "公式は、古民家を直した懐かしい空間で、展示を見に、珈琲を飲みに、と書いている。10:30〜18:00。月曜が休み。専用駐車場はない。",
    "address": "東京都武蔵野市吉祥寺本町1-36-14",
    "access": "JR中央線・京王井の頭線 吉祥寺駅北口から徒歩約5分。",
    "hours": "10:30〜18:00",
    "closed": "月曜。詳細はスケジュール、と公式",
    "phone": "0422-88-0293",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://gallery-kichi.com/access"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "専用駐車場はない。近隣のコインパーキング、と案内",
    "signature": "",
    "notes": [],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "ギャラリー吉の公式サイト",
    "sourceUrl": "https://gallery-kichi.com/access",
    "lat": 35.703594,
    "lng": 139.585297,
    "mapsStars": 4.2,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "hiuchian",
    "checked": "2026-10-31",
    "name": "火打庵",
    "kana": "ヒウチアン",
    "prefecture": "東京",
    "locality": "東青梅",
    "moods": [
      "house",
      "sweet",
      "morning",
      "air"
    ],
    "picks": [
      "焼きまんじゅう"
    ],
    "lead": "東青梅の和菓子店。2階に茶室がある。",
    "story": "公式は、和菓子の店で、2階に本格的な茶室を併設している、と書いている。イートインは18席。火〜金は 9:30〜18:00、土曜は 9:30〜17:00。日・月が休みで、お盆とお彼岸は営業する、ともある。",
    "address": "東京都青梅市東青梅2-12-6",
    "access": "JR青梅線 東青梅駅北口から徒歩2分。",
    "hours": "火〜金 9:30〜18:00／土 9:30〜17:00",
    "closed": "日・月（お盆・お彼岸は営業）",
    "phone": "0428-24-0122",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.hiuchian.jp/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "4台",
    "signature": "",
    "notes": [],
    "train": true,
    "car": true,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "火打庵の公式サイト",
    "sourceUrl": "https://www.hiuchian.jp/",
    "lat": 35.790516,
    "lng": 139.273636,
    "pinRough": true,
    "mapsStars": 4,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "okimoto",
    "checked": "2026-10-31",
    "name": "カフェおきもと",
    "kana": "カフェオキモト",
    "prefecture": "東京",
    "locality": "国分寺",
    "moods": [
      "house",
      "meal",
      "late",
      "roomy",
      "air"
    ],
    "lead": "昭和8年の登録有形文化財。洋館と和館と、庭。",
    "story": "公式は、1933年の国登録有形文化財「沖本家住宅」を直したカフェで、洋風と和風の建物と庭がある、と書いている。ランチは全席80分。土曜の夜は 18:00〜21:00 で、予約制、時間制限はない、ともある。",
    "address": "東京都国分寺市内藤2-43-9",
    "access": "JR国立駅から徒歩8分。",
    "hours": "月・火・金・土・日 11:00〜15:30（15:00 ラストオーダー）。土曜のみ 18:00〜21:00（20:30 ラストオーダー、完全予約）",
    "closed": "水・木",
    "phone": "042-572-1234",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.cafeokimoto.com/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "店内席は予約できる。テラスは予約できない。土曜の夜は完全予約。",
    "parking": "8台",
    "signature": "",
    "notes": [
      "ランチは全席80分。夜は時間制限がない、と公式。ペットはテラスのみ。"
    ],
    "train": true,
    "car": true,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "カフェおきもとの公式サイト",
    "sourceUrl": "https://www.cafeokimoto.com/",
    "lat": 35.69865,
    "lng": 139.451599,
    "pinRough": true,
    "mapsStars": 4,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "sabouru",
    "checked": "2026-10-31",
    "name": "さぼうる",
    "kana": "サボウル",
    "prefecture": "東京",
    "locality": "神保町",
    "moods": [
      "retro",
      "morning",
      "late",
      "linger",
      "air"
    ],
    "lead": "神保町。オーナーが内装も考えた、3フロアの喫茶。",
    "story": "千代田区の観光サイトは、創業時のオーナーが内装もすべて考えた、と書いている。地面から少し上がった階と地下があり、天井が低く、洞窟のような半個室。ダークブラウンの内装に、トーテムポールや木彫りが並び、壁の書き込みも残る、ともある。",
    "address": "東京都千代田区神田神保町1-11",
    "access": "都営新宿線・三田線、東京メトロ半蔵門線 神保町駅 A7出口からすぐ。JR御茶ノ水駅から徒歩6分。",
    "hours": "月〜土 9:30〜23:00（22:30 ラストオーダー）",
    "closed": "日曜。祝日は不定休",
    "phone": "03-3291-8404",
    "links": [
      {
        "label": "千代田区の観光サイト",
        "href": "https://visit-chiyoda.tokyo/app/spot/detail/482"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "時間と店内の描写は、千代田区の観光サイト。店自身の固定ページはこの手帳では確認していない。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "guide",
    "sourceLabel": "千代田区の観光サイト",
    "sourceUrl": "https://visit-chiyoda.tokyo/app/spot/detail/482",
    "lat": 35.695465,
    "lng": 139.758499,
    "mapsStars": 4.1,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "tricolore",
    "checked": "2026-10-31",
    "name": "喫茶 トリコロール",
    "kana": "トリコロール",
    "prefecture": "東京",
    "locality": "秋葉原",
    "moods": [
      "retro",
      "sweet",
      "morning",
      "late",
      "air"
    ],
    "picks": [
      "ホットケーキ",
      "プリン",
      "アンティーク珈琲"
    ],
    "lead": "秋葉原のビル2階。昭和初期を令和に、と店の案内。",
    "story": "アキバ・トリムの公式店舗案内は、伝統と現代の調和、昭和初期を令和に、と書いている。銅板のホットケーキ、店で仕込む堅めのプリン、アンティーク珈琲。コーヒーは一杯ずつ淹れ、テーブルのポットから注ぐ、ともある。",
    "address": "東京都千代田区神田佐久間町1-6-5",
    "access": "つくばエクスプレス秋葉原駅 A1出口直結。JR秋葉原駅中央改札を出てすぐ。",
    "hours": "7:00〜21:00（20:30 ラストオーダー）",
    "closed": "店舗案内に定休日の記載はない",
    "phone": "03-3527-1258",
    "links": [
      {
        "label": "アキバ・トリムの店舗案内",
        "href": "https://akiba-tolim.com/shop/trico/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "アキバ・トリムの公式店舗案内",
    "sourceUrl": "https://akiba-tolim.com/shop/trico/",
    "lat": 35.697826,
    "lng": 139.773346,
    "pinRough": true,
    "mapsStars": 3.4,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "morita",
    "checked": "2026-10-31",
    "name": "もりたカフェ",
    "kana": "モリタカフェ",
    "prefecture": "埼玉",
    "locality": "東所沢",
    "moods": [
      "retro",
      "house",
      "meal"
    ],
    "picks": [
      "ハンドドリップコーヒー",
      "酵素玄米ランチ"
    ],
    "lead": "東所沢。銭湯風の下駄箱と、無垢の床、漆喰と和紙。",
    "story": "公式は、2024年3月9日に開いた家のカフェで、銭湯風の下駄箱、無垢材の床、漆喰と和紙の壁、昭和レトロな内装、と書いている。カフェは土日の 11:30〜17:00。平日はレンタルスペース。休みは月曜か火曜で、月に一度は土日も休む、ともある。",
    "address": "埼玉県所沢市東所沢和田3-11-2",
    "access": "JR武蔵野線 東所沢駅から徒歩8分。",
    "hours": "土・日 11:30〜17:00",
    "closed": "月曜または火曜。月に一度、土日も休み",
    "phone": "",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://xbe90.hp.peraichi.com/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "平日はカフェ営業ではなく、レンタルスペース、と公式。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "もりたカフェの公式サイト",
    "sourceUrl": "https://xbe90.hp.peraichi.com/",
    "lat": 35.796089,
    "lng": 139.50824,
    "pinRough": true,
    "mapsStars": 4.8,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "iwasaki",
    "checked": "2026-10-31",
    "name": "niwasaki cafe いわさ喜",
    "kana": "イワサキ",
    "prefecture": "埼玉",
    "locality": "岩槻",
    "moods": [
      "house",
      "linger",
      "air"
    ],
    "lead": "岩槻の古民家を直した、読書のカフェ。",
    "story": "公式は、古民家をリノベーションした一軒家の読書カフェ、と書いている。火〜金の 12:00〜17:00、ラストオーダー 16:30。駐車場は3台。土日の営業は、見たページには書いていない。",
    "address": "埼玉県さいたま市岩槻区本町3-17-10",
    "access": "東武野田線 岩槻駅から徒歩7分。愛宕神社の参道を進んだ右手、と公式の道案内。",
    "hours": "火〜金 12:00〜17:00（16:30 ラストオーダー）",
    "closed": "ページに書いてある営業は火〜金。土・日・月は記載がない",
    "phone": "048-689-3388",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://cafeiwasaki.wixsite.com/home"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "予約を受けている、と公式。問い合わせは電話。",
    "parking": "3台",
    "signature": "",
    "notes": [
      "土日の営業は、2026年10月31日に見たページにはなかった。"
    ],
    "train": true,
    "car": true,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "いわさ喜の公式サイト",
    "sourceUrl": "https://cafeiwasaki.wixsite.com/home",
    "lat": 35.951744,
    "lng": 139.697937,
    "mapsStars": 4.4,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "chayabuko",
    "checked": "2026-10-31",
    "name": "茶屋武甲",
    "kana": "チャヤブコウ",
    "prefecture": "埼玉",
    "locality": "横瀬",
    "moods": [
      "house",
      "meal"
    ],
    "lead": "横瀬の古民家カフェ。養生ごはん。",
    "story": "公式のページは、秩父郡横瀬町の古民家カフェ、と書いている。11:30〜16:00、ラストオーダー 15:30。日・月・火が休み。ランチは予約優先。10月の営業は別ページ、ともある。",
    "address": "埼玉県秩父郡横瀬町横瀬4052",
    "access": "横瀬。駅からの分数は店舗ページにない。地図で測ると、横瀬駅から道のり約300m、徒歩約4分（分速80m）。",
    "hours": "11:30〜16:00（15:30 ラストオーダー）",
    "closed": "日・月・火",
    "phone": "",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://chaya-buko.skomaru.com/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "ランチは予約優先。30日先まで、と公式。",
    "parking": "",
    "signature": "",
    "notes": [
      "2026年11月7日は1周年のイベント営業のみ、とページにある。月ごとの営業は別案内。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "茶屋武甲の公式サイト",
    "sourceUrl": "https://chaya-buko.skomaru.com/",
    "lat": 35.985123,
    "lng": 139.099686,
    "mapsStars": 4.6,
    "mapsChecked": "2026-10-31",
    "walk": "横瀬駅から徒歩約4分"
  },
  {
    "id": "kankyo",
    "checked": "2026-10-31",
    "name": "カフェ閑居",
    "kana": "カフェカンキョ",
    "prefecture": "埼玉",
    "locality": "行田",
    "moods": [
      "house",
      "retro",
      "meal",
      "sweet",
      "air"
    ],
    "picks": [
      "閑居御膳",
      "オリジナルブレンド",
      "抹茶ロール"
    ],
    "lead": "行田。昭和初期の和洋折衷の邸宅。1階は掘りごたつと座敷。",
    "story": "公式は、初代行田市長・奥貫賢一の昭和初期の邸宅を改装したカフェ、と書いている。1階は掘りごたつと座敷、2階はテーブル。閑居御膳は小皿9つ。調度と障子は作り直しが難しいので、小学生以下の子ども連れは断っている、ともある。乳児は除く。",
    "address": "埼玉県行田市行田7-3",
    "access": "秩父鉄道 行田市駅から徒歩5分。JR高崎線 吹上駅からは朝日バスで「新町1丁目」、徒歩1分。",
    "hours": "11:00〜17:00（ランチ 15:00、カフェ 16:30 ラストオーダー）",
    "closed": "月曜（祝日は営業）",
    "phone": "048-556-2052",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.cafe-kankyo.com/kk_index.html"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "新町通り沿いに16台",
    "signature": "",
    "notes": [
      "団体は電話。小学生以下の子ども連れは断っている、と公式。臨時休業は X と Instagram。"
    ],
    "train": true,
    "car": true,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "カフェ閑居の公式サイト",
    "sourceUrl": "https://www.cafe-kankyo.com/kk_index.html",
    "lat": 36.139076,
    "lng": 139.459656,
    "pinRough": true,
    "mapsStars": 4,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "kamiya",
    "kind": "bar",
    "checked": "2026-10-31",
    "name": "神谷バー",
    "kana": "カミヤバー",
    "prefecture": "東京",
    "locality": "浅草",
    "moods": [
      "retro",
      "late",
      "linger",
      "air"
    ],
    "picks": [
      "デンキブラン",
      "生ビール"
    ],
    "lead": "浅草一丁目一番地。明治13年創業で、本館は登録有形文化財。",
    "story": "公式は、明治13年創業、浅草一丁目一番地、日本初のバーで、こころがゆっくりと交わる場所、と書いている。下町情緒を味わいたい人にもすすめている。大正10年に落成した神谷ビル本館は、2011年に登録有形文化財。1階は入口でチケットを買い、デンキブランと生ビールを出す。2階はレストランカミヤ。営業は 11:00〜20:00、ラストオーダー 19:30。定休日は火曜と、毎月2回の月曜。",
    "address": "東京都台東区浅草1-1-1",
    "access": "銀座線浅草駅3番出口から徒歩1〜2分。都営浅草線A5出口から徒歩1〜2分。東武浅草駅正面出口から徒歩1〜2分。つくばエクスプレス浅草駅A1出口から徒歩約10分。",
    "hours": "11:00〜20:00（19:30 ラストオーダー）",
    "closed": "火曜、毎月2回の月曜",
    "phone": "03-3841-5400",
    "links": [
      {
        "label": "公式サイト",
        "href": "http://www.kamiya-bar.com/"
      }
    ],
    "reservation": "none",
    "reservationNote": "1階は入口でチケットを買う、と公式。",
    "parking": "",
    "signature": "",
    "notes": [
      "浅草においでよは 11:30〜22:00、火曜のみ休み、と書いていて公式と違う。ここは公式の時間。",
      "1階の神谷バーはクレジットカード不可。客席は禁煙で、喫煙ルームがある。",
      "雷門通りの神谷バー賣場は 10:00〜19:00、火曜定休。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "神谷バーの公式サイト",
    "sourceUrl": "http://www.kamiya-bar.com/",
    "lat": 35.710876,
    "lng": 139.79747,
    "mapsStars": 4.1,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "mountain",
    "checked": "2026-10-31",
    "name": "純喫茶マウンテン",
    "kana": "ジュンキッサマウンテン",
    "prefecture": "東京",
    "locality": "浅草",
    "moods": [
      "retro",
      "late",
      "meal"
    ],
    "lead": "浅草の老舗喫茶。創業50年、戦後からかわらぬ味、と店舗ページ。",
    "story": "ぐるなびの店舗ページは、創業50年の老舗で、戦後からかわらぬ味、と書いている。純喫茶とお好み焼きで、席は79。営業は月〜金 11:30〜20:30（20:00 ラストオーダー）、土・日・祝 11:30〜21:30（20:30 ラストオーダー）。定休日はなく、不定休がある。",
    "address": "東京都台東区浅草1-8-2",
    "access": "つくばエクスプレス浅草駅から徒歩4分。銀座線田原町駅から徒歩5分。",
    "hours": "月〜金 11:30〜20:30（20:00 ラストオーダー）／土・日・祝 11:30〜21:30（20:30 ラストオーダー）",
    "closed": "定休日なし（不定休あり）",
    "phone": "050-5494-2453",
    "links": [
      {
        "label": "店舗ページ",
        "href": "https://gh5u300.gorp.jp/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "店舗ページの年末年始は 2020年12月31日〜2021年1月4日のままなので、今年の休みは店で見る。",
      "浅草においでよは 11:30〜20:00、年中無休、電話 03-3841-0172、ホームページ http://www.creamanmitsu.jp/ と書いている。そのサイトは 2026年10月31日に開かなかった。時間も電話も店舗ページと違うので、出かける前に店で見る。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "ぐるなびの店舗ページ。浅草においでよの時間とは違う",
    "sourceUrl": "https://gh5u300.gorp.jp/",
    "lat": 35.711426,
    "lng": 139.793152,
    "mapsStars": 3.9,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "royal",
    "checked": "2026-10-31",
    "name": "ローヤル珈琲店 本店",
    "kana": "ローヤルコーヒーテン",
    "prefecture": "東京",
    "locality": "浅草",
    "moods": [
      "retro",
      "morning",
      "late",
      "meal",
      "air"
    ],
    "picks": [
      "自家製焙煎珈琲"
    ],
    "lead": "1962年の浅草の喫茶。食べログは一軒家で、落ち着いた席、と分類している。",
    "story": "食べログは、1962年に開き、一軒家でカウンターがあり、落ち着いた空間、と分類している。モーニングがある。時間は二つの案内で違う。食べログ（2026年10月19日の更新）は、月・火・水・木・金・日が 8:00〜19:00、土曜が 8:00〜20:00。浅草においでよは 8:00〜20:00、年中無休。その文は、自家製で焙煎したコーヒーを香り高く届ける、とある。",
    "address": "東京都台東区浅草1-39-7",
    "access": "つくばエクスプレス浅草駅から徒歩3分。銀座線浅草駅から徒歩4分。東武浅草駅から徒歩5分。都営浅草線浅草駅から徒歩6分。",
    "hours": "食べログは 月・火・水・木・金・日 8:00〜19:00、土 8:00〜20:00。浅草においでよは 8:00〜20:00",
    "closed": "食べログに毎週の定休日はない。浅草においでよは年中無休",
    "phone": "03-3844-3012",
    "links": [
      {
        "label": "浅草においでよ",
        "href": "https://asakusanioideyo.com/27/504/"
      }
    ],
    "reservation": "none",
    "reservationNote": "予約不可、と食べログ。",
    "parking": "店の駐車場はない。近隣にコインパーキング、と食べログ",
    "signature": "",
    "notes": [
      "全席禁煙、と食べログ。店の固定サイトは見当たらず、時間は食べログと浅草においでよで違う。出かける前に電話で見る。",
      "自家製焙煎珈琲は、浅草においでよの店舗文にある名前。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "食べログの店舗情報（時間の更新は 2026年10月19日）と浅草においでよ",
    "sourceUrl": "https://tabelog.com/tokyo/A1311/A131102/13008614/",
    "lat": 35.712742,
    "lng": 139.794388,
    "mapsStars": 4.1,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "tengoku",
    "checked": "2026-10-31",
    "name": "珈琲天国",
    "kana": "コーヒーテンゴク",
    "prefecture": "東京",
    "locality": "浅草",
    "moods": [
      "retro",
      "sweet",
      "air"
    ],
    "picks": [
      "ホットケーキ"
    ],
    "lead": "六区通りの喫茶。銅板で焼くホットケーキ、と2026年の記事。",
    "story": "食べログは、2005年6月に開いた喫茶で、ホットケーキを持ち帰れる、と書いている。コーヒー豆研究所の2026年10月4日の記事は、カップの絵の看板、銅板で焼くホットケーキ、「天国」の焼印、底に絵のでるカップ、と書いている。営業はどちらも 12:00〜18:30、火曜休み。席は15。予約はできず、支払いは現金のみ。",
    "address": "東京都台東区浅草1-41-9",
    "access": "つくばエクスプレス浅草駅から徒歩5分。銀座線浅草駅1番出口から徒歩8分。東武浅草駅から徒歩8分。",
    "hours": "12:00〜18:30",
    "closed": "火曜",
    "phone": "03-5828-0591",
    "links": [
      {
        "label": "Instagram",
        "href": "https://www.instagram.com/coffee_tengoku"
      }
    ],
    "reservation": "none",
    "reservationNote": "予約不可。支払いは現金のみ、と食べログと記事。",
    "parking": "なし、と食べログ",
    "signature": "",
    "notes": [
      "店の固定サイトは Instagram。時間は食べログと、2026年9月21日確認とある記事で同じ。全席禁煙。",
      "ホットケーキは、食べログの店舗情報と上の記事に名前がある。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "guide",
    "sourceLabel": "食べログの店舗情報と、コーヒー豆研究所の記事（2026年10月4日）",
    "sourceUrl": "https://tabelog.com/tokyo/A1311/A131102/13025425/",
    "lat": 35.713078,
    "lng": 139.794052,
    "mapsStars": 3.7,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "akaishi",
    "checked": "2026-10-31",
    "name": "ロッジ赤石",
    "kana": "ロッジアカイシ",
    "prefecture": "東京",
    "locality": "浅草",
    "moods": [
      "retro",
      "morning",
      "late",
      "meal"
    ],
    "lead": "浅草の喫茶。Googleマップの星は4.2。",
    "story": "浅草においでよは、食事の出来る喫茶店、と書いている。時間は二つの案内で違う。食べログは月曜が休みで、火〜日 9:00〜20:00。浅草においでよは月曜が休みで、平日 9:00〜26:00、日・祝 9:00〜25:00。Googleマップは2026年10月31日の土曜に、閉店20:00と出していた。",
    "address": "東京都台東区浅草3-8-4",
    "access": "つくばエクスプレス浅草駅から徒歩7分。銀座線と東武の浅草駅から徒歩10分。都営浅草線浅草駅から徒歩11分。",
    "hours": "食べログは 火〜日 9:00〜20:00。浅草においでよは 平日 9:00〜26:00、日・祝 9:00〜25:00",
    "closed": "月曜、と食べログも浅草においでよも書いている",
    "phone": "03-3875-1688",
    "links": [
      {
        "label": "浅草においでよ",
        "href": "https://asakusanioideyo.com/56/1018/"
      }
    ],
    "reservation": "none",
    "reservationNote": "予約不可、と食べログ。",
    "parking": "店の駐車場はない。徒歩2分以内にコインパーキング、と食べログ",
    "signature": "",
    "notes": [
      "Googleマップの星4.2は、2026年10月31日に店名の横へ出ていた数字。",
      "全席禁煙、と食べログ。席の数は席広めの印には使っていない。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "食べログの店舗情報と浅草においでよ。星はGoogleマップ",
    "sourceUrl": "https://tabelog.com/tokyo/A1311/A131102/13058004/",
    "lat": 35.717003,
    "lng": 139.795044,
    "mapsStars": 4.2,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "hatou",
    "checked": "2026-10-31",
    "name": "茶亭 羽當",
    "kana": "チャテイハトウ",
    "prefecture": "東京",
    "locality": "渋谷",
    "moods": [
      "retro",
      "sweet",
      "late",
      "air"
    ],
    "lead": "渋谷の喫茶。カラフルなカップが棚にある、とGoogleマップ。星は4.1。",
    "story": "Googleマップは、カラフルなコーヒーカップが棚に積まれた居心地のよいカフェで、コーヒーとケーキを出す、と書いている。時間は食べログが 11:00〜23:00、ラストオーダー 22:00。店の固定サイトは見当たらない。",
    "address": "東京都渋谷区渋谷1-15-19 二葉ビル2F",
    "access": "渋谷駅東口から徒歩3分。",
    "hours": "11:00〜23:00（22:00 ラストオーダー）",
    "closed": "食べログに毎週の定休日はない",
    "phone": "03-3400-9088",
    "links": [],
    "reservation": "none",
    "reservationNote": "予約不可、と食べログ。",
    "parking": "",
    "signature": "",
    "notes": [
      "Googleマップの星4.1は、2026年10月31日に店名の横へ出ていた数字。",
      "支払いは現金のみ、と食べログ。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "guide",
    "sourceLabel": "食べログの店舗情報。店内の一文はGoogleマップ",
    "sourceUrl": "https://tabelog.com/tokyo/A1303/A130301/13001169/",
    "lat": 35.660488,
    "lng": 139.702469,
    "mapsStars": 4.1,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "lion",
    "checked": "2026-10-31",
    "name": "名曲喫茶ライオン",
    "kana": "メイキョクキッサライオン",
    "prefecture": "東京",
    "locality": "道玄坂",
    "moods": [
      "retro",
      "quiet",
      "air"
    ],
    "lead": "道玄坂の名曲喫茶。壁一面のスピーカー、とGoogleマップ。星は4.5。",
    "story": "Googleマップは、壁一面のスピーカーからオーケストラが流れる、と書いている。るるぶは、1950年に再建した店で、店内の会話と撮影は禁止、時間は 13:00〜20:00、ラストオーダー 19:30、休みなし、と書いている。公式サイトを開いたとき、営業時間は載っていなかった。",
    "address": "東京都渋谷区道玄坂2-19-13",
    "access": "東京メトロ渋谷駅から徒歩5分。",
    "hours": "13:00〜20:00（19:30 ラストオーダー）",
    "closed": "るるぶは無休。年末年始などはページの注記どおり省略",
    "phone": "03-3461-6858",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://lion.main.jp/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "なし、とるるぶ",
    "signature": "",
    "notes": [
      "Googleマップの星4.5は、2026年10月31日に店名の横へ出ていた数字。",
      "るるぶは、年末年始・お盆・ゴールデンウィーク・臨時休業を省略している、と注記がある。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "guide",
    "sourceLabel": "るるぶの案内。店内の一文と星はGoogleマップ",
    "sourceUrl": "https://rurubu.jp/andmore/spot/80071772",
    "lat": 35.659344,
    "lng": 139.69632,
    "mapsStars": 4.5,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "tatsukichi",
    "checked": "2026-10-31",
    "name": "珈琲 立吉",
    "kana": "コーヒータツキチ",
    "prefecture": "東京",
    "locality": "吉祥寺",
    "moods": [
      "retro",
      "sweet",
      "linger",
      "air"
    ],
    "picks": [
      "ブレンドコーヒー",
      "グラニーさんのスコーン"
    ],
    "lead": "吉祥寺。1979年創業で、ランプを飾る喫茶。",
    "story": "週刊きちじょうじの2026年1月8日の記事は、1979年創業で、2021年に父から娘が継いだ、と書いている。父がランプを飾れる店をコンセプトにし、テーブルや椅子は古いもの。BGMはなく、豆をひく音がしている、ともある。食事は出さず、おやつを用意している。営業は 12:00〜19:00、ラストオーダー 18:30。火曜と水曜が休み。支払いは現金のみ。",
    "address": "東京都武蔵野市吉祥寺南町1-15-5",
    "access": "吉祥寺駅南口から徒歩約5分。",
    "hours": "12:00〜19:00（18:30 ラストオーダー）",
    "closed": "火曜、水曜",
    "phone": "0422-48-4450",
    "links": [
      {
        "label": "週刊きちじょうじ",
        "href": "https://kj-weekly.jp/2026/01/08/tatukichi/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "支払いは現金のみ、と週刊きちじょうじ。",
      "Googleマップの星4.2は、2026年10月31日に店名の横へ出ていた数字。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "guide",
    "sourceLabel": "週刊きちじょうじ 2026年1月8日",
    "sourceUrl": "https://kj-weekly.jp/2026/01/08/tatukichi/",
    "lat": 35.701176,
    "lng": 139.578506,
    "mapsStars": 4.2,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "lawn",
    "checked": "2026-10-31",
    "name": "珈琲ロン",
    "kana": "コーヒーロン",
    "prefecture": "東京",
    "locality": "四ツ谷",
    "moods": [
      "retro",
      "linger",
      "air"
    ],
    "lead": "四ツ谷。1968年開店で、吹き抜けの2階席。",
    "story": "さんたつ by 散歩の達人（2025年7月23日更新）は、1968年開店、真ん中が吹き抜けて桟敷のような2階席から階下が見える、と書いている。営業は 11:00〜18:00。定休日は土・日・祝で、第3日のみ営業、ともある。別の店舗案内は、月〜金 11:00〜18:00、土・日・祝が定休日で、第3日の例外は書いていない。",
    "address": "東京都新宿区四谷1-2",
    "access": "東京メトロ丸ノ内線・南北線の四ツ谷駅から徒歩2分。JR中央線の四ツ谷駅から徒歩3分、と店舗案内。さんたつは、JR・地下鉄から徒歩2分。",
    "hours": "さんたつは 11:00〜18:00、土・日・祝は休みで第3日のみ営業。店舗案内は月〜金 11:00〜18:00、土・日・祝が定休日",
    "closed": "土・日・祝。第3日に開く、という案内もある",
    "phone": "03-3341-1091",
    "links": [
      {
        "label": "さんたつ",
        "href": "https://san-tatsu.jp/spots/97247/"
      },
      {
        "label": "店舗案内",
        "href": "https://suocca.net/ron/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "喫煙可、とさんたつ。店舗案内は、カード、電子マネー、QRコード決済が不可、と書いている。",
      "Googleマップの星4.1は、2026年10月31日に店名の横へ出ていた数字。店名は珈琲ロン COFFEE LAWN と出ていた。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "さんたつ by 散歩の達人（2025年7月23日更新）と店舗案内。休み方が違う",
    "sourceUrl": "https://san-tatsu.jp/spots/97247/",
    "lat": 35.68578,
    "lng": 139.728958,
    "mapsStars": 4.1,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "kado",
    "kind": "izakaya",
    "checked": "2026-10-31",
    "name": "神楽坂カド",
    "kana": "カグラザカカド",
    "prefecture": "東京",
    "locality": "神楽坂",
    "moods": [
      "house",
      "late",
      "meal",
      "air"
    ],
    "lead": "神楽坂の路地。昭和24年の古民家を再生した店。",
    "story": "公式は、昭和24年（一部は昭和30年代後半の増築）の古民家を再生した隠れ家で、座敷は昭和の趣、勝手口側は組板を再利用した立ち呑み、と書いている。旬の食材の和食をコースで出す、ともある。営業時間は、店の地図ページとグループの案内で開始が違う。",
    "address": "東京都新宿区赤城元町1-32",
    "access": "東西線神楽坂駅1番出口から徒歩3分。有楽町線・南北線飯田橋駅B3出口から徒歩10分。JR飯田橋駅西口から徒歩10分。都営大江戸線牛込神楽坂駅A3出口から徒歩5分。店の地図ページ。",
    "hours": "店の地図ページは、平日の立呑 15:00〜23:00（22:30 LO）、お座敷 17:00〜23:00。土曜の立呑 14:00〜23:00（22:00 LO）、お座敷 16:00〜23:00。日・祝の立呑 14:00〜21:30（21:00 LO）、お座敷 16:00〜21:30。グループの案内は、平日の立呑が 16:00、土曜のお座敷が 17:00 から",
    "closed": "夏季休暇・年末年始を除き毎日営業。日祝は閉店が早まる場合あり",
    "phone": "03-3268-2410",
    "links": [
      {
        "label": "地図と営業時間",
        "href": "https://kagurazaka-kado.com/map/"
      },
      {
        "label": "店の案内",
        "href": "https://kaguramura.jp/restaurant/kado/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "立ち呑みは予約しない。お座敷は当日を除きコース、と公式。",
    "parking": "",
    "signature": "",
    "notes": [
      "時期で時間が変わるので、公式は Twitter と Instagram で最新の営業日を見るよう書いている。",
      "Googleマップの星4.1は、2026年10月31日に店名の横へ出ていた数字。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "神楽坂カドの地図ページと、グループの店案内。開始時刻が違う",
    "sourceUrl": "https://kagurazaka-kado.com/map/",
    "lat": 35.703896,
    "lng": 139.736618,
    "mapsStars": 4.1,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "kimuraya",
    "kind": "izakaya",
    "checked": "2026-10-31",
    "name": "酒房きむら屋",
    "kana": "シュボウキムラヤ",
    "prefecture": "東京",
    "locality": "業平",
    "moods": [
      "retro",
      "late",
      "linger",
      "meal",
      "air"
    ],
    "lead": "スカイツリーの麓。ママが一人で切る、おかめの暖簾。",
    "story": "公式は、ママが一人で切り盛りする小さな居酒屋で、入口のおかめを抜けて暖簾をくぐると昭和、亡きマスター手作りのテーブルとカウンター、と書いている。営業は水・木・金・土・日の 17:00〜23:00。定休は月曜と火曜。土日は予約があれば昼間も、ともある。",
    "address": "東京都墨田区業平1-10-4",
    "access": "東京スカイツリーの麓、と公式。駅からの分数はページにない。地図で測ると、押上駅から道のり約660m、徒歩約8分（分速80m）。",
    "hours": "水・木・金・土・日 17:00〜23:00",
    "closed": "月曜、火曜。土日は予約があれば昼間も",
    "phone": "03-3623-7437",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://syuboukimuraya.wixsite.com/okame"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "一人で店をやっているので、電話は火曜〜日曜の 17:00〜23:00頃。出ないことがある、と公式。",
    "parking": "",
    "signature": "",
    "notes": [
      "ページには 2026年8月10日〜18日の夏季休暇が残っている。8月19日から平常、とも書いてある。",
      "Googleマップの星4.6は、2026年10月31日に店名の横へ出ていた数字。店名は酒房キムラヤ と出ていた。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "酒房きむら屋の公式サイト",
    "sourceUrl": "https://syuboukimuraya.wixsite.com/okame",
    "lat": 35.708771,
    "lng": 139.810349,
    "mapsStars": 4.6,
    "mapsChecked": "2026-10-31",
    "walk": "押上駅から徒歩約8分"
  },
  {
    "id": "hokuhan",
    "kind": "izakaya",
    "checked": "2026-10-31",
    "name": "北畔",
    "kana": "ホクハン",
    "prefecture": "東京",
    "locality": "上野",
    "moods": [
      "retro",
      "late",
      "linger",
      "meal",
      "air"
    ],
    "picks": [
      "田酒",
      "自家製の梅酒"
    ],
    "lead": "上野。昭和34年創業で、カウンターと座敷。",
    "story": "店舗ページは、昭和34年（1959年）創業で、創業当時から変わらない和の空間、カウンターと昭和の香りの座敷、と書いている。最初の一杯に生ビール、酒肴には田酒、桃川、じょっぱり、焼酎は芋と米、果実酒は自家製の梅酒、ともある。営業は 17:00〜22:30、ラストオーダー 22:00。日曜が休みで、月曜は不定休。",
    "address": "東京都台東区上野6-7-10",
    "access": "都営大江戸線 上野御徒町駅から徒歩4分。京成上野駅から徒歩4分。JR御徒町駅から徒歩5分。ページ上部は、上野駅から徒歩3分程、ともある。",
    "hours": "17:00〜22:30（22:00 ラストオーダー）",
    "closed": "日曜。月曜は不定休",
    "phone": "050-5461-3221",
    "links": [
      {
        "label": "店舗ページ",
        "href": "https://hokuhan.foodre.jp/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "席は40。個室はない、と店舗ページ。",
      "Googleマップの星4.0は、2026年10月31日に店名の横へ出ていた数字。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "guide",
    "sourceLabel": "北畔の店舗ページ",
    "sourceUrl": "https://hokuhan.foodre.jp/",
    "lat": 35.709953,
    "lng": 139.775909,
    "mapsStars": 4,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "futaba",
    "kind": "bar",
    "checked": "2026-10-31",
    "name": "BAR双葉",
    "kana": "バーフタバ",
    "prefecture": "東京",
    "locality": "ゴールデン街",
    "moods": [
      "retro",
      "late",
      "linger",
      "air"
    ],
    "picks": [
      "角瓶"
    ],
    "lead": "新宿ゴールデン街。昭和23年創業で、席は12。",
    "story": "公式は、昭和23年（1948年）創業でゴールデン街の最も古い店、建物が古く昭和のまま、黒電話が象徴、と書いている。会話とお酒の店で、マナーを守る人は会員、ともある。営業は 18:00〜23:00。定休は祭日、日曜、月曜、火曜。席は12。チャージはなし。ボトルキープに角瓶と焼酎の名前がある。支払いは現金とつけ。",
    "address": "東京都新宿区歌舞伎町1-1-9",
    "access": "新宿ゴールデン街。駅からの分数は、公式にない。地図で測ると、新宿三丁目駅から道のり約640m、徒歩約8分（分速80m）。",
    "hours": "18:00〜23:00",
    "closed": "祭日、日曜、月曜、火曜",
    "phone": "03-3200-0279",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://bar-futaba.com/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "会員制だが、マナーを守る方は皆会員、と公式。",
      "Googleマップの星4.8は、2026年10月31日に店名の横へ出ていた数字。店名は Bar双葉 と出ていた。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "BAR双葉の公式サイト",
    "sourceUrl": "https://bar-futaba.com/",
    "lat": 35.693695,
    "lng": 139.704895,
    "mapsStars": 4.8,
    "mapsChecked": "2026-10-31",
    "walk": "新宿三丁目駅から徒歩約8分"
  },
  {
    "id": "taru",
    "kind": "bar",
    "checked": "2026-10-31",
    "name": "Bar TARU",
    "kana": "バータル",
    "prefecture": "東京",
    "locality": "銀座",
    "moods": [
      "retro",
      "late",
      "meal",
      "air"
    ],
    "picks": [
      "竹鶴",
      "ナポリタン"
    ],
    "lead": "銀座。昭和28年創業で、カウンターを移したバー。",
    "story": "公式は、昭和28年創業で、サラリーマンのポケットマネーで飲めるパブリックバーとして始め、銀座6丁目の再開発でギンザシックス裏の銀緑館へ移った、と書いている。カウンターなど当時の内装を再利用した、ともある。飲み物に竹鶴、余市、生ビール。食事にナポリタン、ビーフカレー。営業は月〜金 17:00〜翌1:00、土曜 17:00〜24:00。日曜と祝日が休み。",
    "address": "東京都中央区銀座6-12-14 松岡銀緑館4F",
    "access": "銀座6丁目、ギンザシックス裏。駅からの分数は、公式にない。地図で測ると、銀座駅から道のり約350m、徒歩約4分（分速80m）。",
    "hours": "月〜金 17:00〜翌1:00／土 17:00〜24:00",
    "closed": "日曜、祝日",
    "phone": "03-3573-1890",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.bar-taru.com/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "電話のほか、ぐるなびとホットペッパー、と公式。",
    "parking": "",
    "signature": "",
    "notes": [
      "一人から10人くらい。20〜30人の貸切は相談、と公式。",
      "Googleマップの星4.2は、2026年10月31日に店名の横へ出ていた数字。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "Bar TARU の公式サイト",
    "sourceUrl": "https://www.bar-taru.com/",
    "lat": 35.66917,
    "lng": 139.764511,
    "mapsStars": 4.2,
    "mapsChecked": "2026-10-31",
    "walk": "銀座駅から徒歩約4分"
  },
  {
    "id": "fujiyama",
    "kind": "bar",
    "checked": "2026-10-31",
    "name": "BAR藤山",
    "kana": "バーフジヤマ",
    "prefecture": "東京",
    "locality": "銀座",
    "moods": [
      "night",
      "late",
      "air"
    ],
    "picks": [
      "アイリッシュコーヒー"
    ],
    "lead": "銀座。2009年から店主が一人のバー。食事はない。",
    "story": "公式は、2009年から店主が一人でやっていて、食事はなく、季節のフルーツのカクテルとノンアルコール、アイリッシュコーヒーは客が豆を挽く、と書いている。ウイスキーはボトラーズが中心で、メニューはない、ともある。営業は月〜金 17:00〜翌0:30、土・祝 17:00〜24:00。日曜が休み。",
    "address": "東京都中央区銀座6-3-5",
    "access": "駅からの分数は、公式にない。地図で測ると、銀座駅から道のり約490m、徒歩約6分（分速80m）。",
    "hours": "月〜金 17:00〜翌0:30／土・祝 17:00〜24:00",
    "closed": "日曜",
    "phone": "03-3573-0352",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://barfujiyama.com/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "Googleマップの星5.0は、2026年10月31日に店名の横へ出ていた数字。件数は、その画面に出ていなかった。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "BAR藤山の公式サイト",
    "sourceUrl": "https://barfujiyama.com/",
    "lat": 35.671589,
    "lng": 139.761459,
    "mapsStars": 5,
    "mapsChecked": "2026-10-31",
    "walk": "銀座駅から徒歩約6分"
  },
  {
    "id": "slow",
    "kind": "bar",
    "checked": "2026-10-31",
    "name": "bar SLOW",
    "kana": "バースロー",
    "prefecture": "神奈川",
    "locality": "中華街",
    "moods": [
      "night",
      "late",
      "linger",
      "air"
    ],
    "picks": [
      "フルーツのカクテル"
    ],
    "lead": "横浜中華街。2009年に店主が開いたバー。",
    "story": "公式は、店主の廣瀬泰明が2009年に開いたバーで、玄武門の近く、路地の奥に青いネオン、と書いている。自慢はフルーツのカクテル。営業は火〜木 19:00〜25:00、金・土 19:00〜27:00、日・祝 19:00〜24:00。入店は閉店の1時間前まで。休業日は不定休。時間表に月曜はない。",
    "address": "神奈川県横浜市中区山下町201-4",
    "access": "JR石川町駅北口から徒歩約5分。JR関内駅南口から徒歩約5分。元町・中華街駅2番出口から徒歩約5分。日本大通り駅3番出口から徒歩約5分。",
    "hours": "火〜木 19:00〜25:00／金・土 19:00〜27:00／日・祝 19:00〜24:00",
    "closed": "時間表に月曜はなく、休業日は不定休",
    "phone": "045-263-9263",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.yokohama-bar-slow.com/bar"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "8名以上は電話予約がスムーズ。当日も可、と公式。",
    "parking": "",
    "signature": "",
    "notes": [
      "席は29。カウンターの一部は禁煙、と公式。",
      "Googleマップの星4.1は、2026年10月31日に店名の横へ出ていた数字。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "bar SLOW の公式サイト",
    "sourceUrl": "https://www.yokohama-bar-slow.com/bar",
    "lat": 35.443989,
    "lng": 139.642761,
    "pinRough": true,
    "mapsStars": 4.1,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "matsumoto",
    "kind": "bar",
    "checked": "2026-10-31",
    "name": "Bar Matsumoto",
    "kana": "バーマツモト",
    "prefecture": "神奈川",
    "locality": "馬車道",
    "moods": [
      "night",
      "late"
    ],
    "lead": "横浜の馬車道。手狭で、来店は4人まで。",
    "story": "公式は、営業 18:00〜翌1:00、ラストオーダー 0:30、定休は日曜、連休の最終日、年末年始、と書いている。店内が手狭なため、来店は4人まで、ともある。月ごとの店休日をページに出している。",
    "address": "神奈川県横浜市中区住吉町5-61 住五ビル1F",
    "access": "JR関内駅から徒歩約5分。JR桜木町駅から徒歩約5分。桜木町の新南口は 22:30 まで、と公式。",
    "hours": "18:00〜翌1:00（0:30 ラストオーダー）",
    "closed": "日曜、連休の最終日、年末年始",
    "phone": "045-641-9200",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.bar-matsumoto.com/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "Googleマップの星4.6は、2026年10月31日に店名の横へ出ていた数字。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "Bar Matsumoto の公式サイト",
    "sourceUrl": "https://www.bar-matsumoto.com/",
    "lat": 35.44791,
    "lng": 139.635086,
    "mapsStars": 4.6,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "troisbagues",
    "checked": "2026-10-31",
    "name": "カフェ トロワバグ",
    "kana": "トロワバグ",
    "prefecture": "東京",
    "locality": "神保町",
    "moods": [
      "retro",
      "air",
      "meal"
    ],
    "picks": [
      "トロワブレンド",
      "ハイブレンド"
    ],
    "lead": "神保町駅から1分。枕木の梁が残る、1976年の喫茶。",
    "story": "公式は、昭和51年（1976年）に開いた小さな喫茶で、寝かせた豆をネルドリップする、と書いている。代表のブレンドはトロワブレンドとハイブレンド。DEEP TOKYO magazineの2025年4月14日の記事は、線路の枕木を使った梁、大理石と天然木枠の床、先代からの絵画と現代アートが、創業のときから残る、と書いている。同じ記事は、2024年にクレープの2号店が開いた、とも書いている。こちらは神保町の店。",
    "address": "東京都千代田区神田神保町1-12-1 富田ビルB1",
    "access": "神保町駅A5出口より徒歩1分。",
    "walk": "神保町駅A5出口から徒歩1分",
    "hours": "月〜金 10:00〜20:00（19:30 ラストオーダー）／土・祝 12:00〜19:00（18:30 ラストオーダー）",
    "closed": "日曜",
    "phone": "03-3294-8597",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://troisbagues.com/"
      },
      {
        "label": "DEEP TOKYO magazine",
        "href": "https://deeptokyo.jp/spot/food_gourmet/2958/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "公式は、予約を電話で受けている。",
    "parking": "",
    "signature": "",
    "notes": [
      "国土地理院の住所は神田神保町一丁目12番までで、末尾の1は落ちている。",
      "Googleマップの星4.1は、2026年10月31日に店名の横へ出ていた数字。店名はトロワバグと出ていた。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "トロワバグの公式サイト。部屋の描写はDEEP TOKYO magazine（2025年4月14日）",
    "sourceUrl": "https://troisbagues.com/",
    "lat": 35.696396,
    "lng": 139.758362,
    "pinRough": true,
    "mapsStars": 4.1,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "roju",
    "checked": "2026-10-31",
    "name": "Roju Cafe",
    "kana": "ロジュカフェ",
    "prefecture": "東京",
    "locality": "中目黒",
    "moods": [
      "air",
      "linger",
      "roomy"
    ],
    "lead": "中目黒駅から6分。元倉庫を、設計の会社が直した店。",
    "story": "公式は、築33年の元倉庫を設計会社HOUSETRADがリノベーションし、内装から運営まで手がけている、と書いている。オリジナル家具を置き、ミッドセンチュリーのソファがある。テラス席は風が通り、ペットも一緒に座れる。同じフロアは天井高4.2mのレンタルスペースにもなる。営業は 10:00〜20:00 と書いてあり、その日の営業はInstagramのストーリーズで確認する、ともある。定休日の記載はない。",
    "address": "東京都目黒区中目黒1-9-3",
    "access": "東急東横線・東京メトロ中目黒駅から徒歩6分。",
    "walk": "中目黒駅から徒歩6分",
    "hours": "10:00〜20:00",
    "closed": "公式に定休日の記載はない。当日はInstagramのストーリーズで確認、と公式",
    "phone": "03-6303-0770",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://housetrad.com/rojucafe/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "店舗前に5台。ロケバスも可、と公式。",
    "signature": "",
    "notes": [
      "Googleマップの星3.9は、2026年10月31日に店名の横へ出ていた数字。店名はROJU CAFEと出ていた。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "Roju Cafe の公式サイト。当日の営業はInstagramで確認、と書いてある",
    "sourceUrl": "https://housetrad.com/rojucafe/",
    "lat": 35.643906,
    "lng": 139.701782,
    "mapsStars": 3.9,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "cozy",
    "checked": "2026-10-31",
    "name": "Cozy Style COFFEE",
    "kana": "コージースタイルコーヒー",
    "prefecture": "東京",
    "locality": "落合",
    "moods": [
      "air",
      "linger",
      "sweet"
    ],
    "picks": [
      "Cozy TIRAMISU"
    ],
    "lead": "落合駅から1分。店主が自分で設計して作った店。",
    "story": "公式は、無農薬で無化学肥料の豆と、瓶入りの Cozy TIRAMISU を出している、と書いている。店主は小島一朗。ぐるっと東京は、インテリアの仕事もしている店主が、自分でデザインして施工した空間、と書いている。落合駅の2a出口から徒歩1分。中井駅のA1出口から徒歩7分。営業は 10:00〜18:00、ラストオーダー 17:30。月曜が休みで、祝日は開き、翌日が振り替え。席は1階23、2階14、とぐるっと東京。",
    "address": "東京都新宿区上落合3-10-3 丸山ビル1F",
    "access": "東京メトロ東西線 落合駅2a出口から徒歩1分。都営大江戸線 中井駅A1出口から徒歩7分。",
    "walk": "落合駅から徒歩1分",
    "hours": "10:00〜18:00（17:30 ラストオーダー）",
    "closed": "月曜。祝日は営業し、翌平日が休み",
    "phone": "03-6304-0451",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://cozystylecoffee.com/"
      },
      {
        "label": "ぐるっと東京",
        "href": "https://www.gurutto-tokyo.com/gourmet/cozy-style-coffee/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "ぐるっと東京は、予約優先と書いている。",
    "parking": "",
    "signature": "",
    "notes": [
      "営業時間と行き方は、ぐるっと東京の案内。公式サイトの時刻表は、開いたページには出ていなかった。",
      "Googleマップの星4.1は、2026年10月31日に店名の横へ出ていた数字。店名はCozyStyleCOFFEEと出ていた。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "guide",
    "sourceLabel": "ぐるっと東京の店舗案内。豆と Cozy TIRAMISU は公式サイト",
    "sourceUrl": "https://www.gurutto-tokyo.com/gourmet/cozy-style-coffee/",
    "lat": 35.710175,
    "lng": 139.683334,
    "mapsStars": 4.1,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "createa",
    "checked": "2026-10-31",
    "name": "カフェ CREATEA",
    "kana": "クリエイティア",
    "prefecture": "東京",
    "locality": "御徒町",
    "moods": [
      "air"
    ],
    "lead": "新御徒町駅から5分。席も棚も、自分たちで作った店。",
    "story": "公式の店舗ページは、席とテーブルを一つずつ手作りし、大きなオブジェや棚、電気も手作り、と書いている。下の階は、道具を扱う店。月〜金 10:00〜19:00。料理のラストオーダーは 18:00、ドリンクは 18:30。土・日・祝は休み。御徒町駅から徒歩約7分、新御徒町駅A2出口から徒歩約5分、上野駅の正面から徒歩約10分。",
    "address": "東京都台東区台東4-18-12",
    "access": "新御徒町駅A2出口から徒歩約5分。御徒町駅から徒歩約7分。上野駅の正面から徒歩約10分。",
    "walk": "新御徒町駅A2出口から徒歩約5分",
    "hours": "月〜金 10:00〜19:00（料理 18:00、ドリンク 18:30 ラストオーダー）",
    "closed": "土、日、祝",
    "phone": "03-6803-2501",
    "links": [
      {
        "label": "公式の店舗ページ",
        "href": "https://createa.owst.jp/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "Googleマップの星4.4は、2026年10月31日に店名の横へ出ていた数字。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "カフェ CREATEA の公式店舗ページ",
    "sourceUrl": "https://createa.owst.jp/",
    "lat": 35.706585,
    "lng": 139.778641,
    "mapsStars": 4.4,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "kage",
    "kind": "bar",
    "checked": "2026-10-31",
    "name": "BAR KAGE",
    "kana": "バーカゲ",
    "prefecture": "東京",
    "locality": "銀座",
    "moods": [
      "night",
      "late",
      "air"
    ],
    "lead": "銀座の地下。5mを超える、欅の一枚板。",
    "story": "公式は、扉の先の地下が別の場所のように落ち着く、と書いている。席は13。照明を落とし、5m強の欅の一枚板がカウンター。席の間隔を空け、隣を気にせず座れるようにしている。銘柄はバーテンダーが選ぶ。営業は 18:00〜26:00、ラストオーダー 25:00。日曜が休み。",
    "address": "東京都中央区銀座6-3-6 B1F",
    "access": "駅からの分数は公式にない。地図で測ると、銀座駅から道のり約500m、徒歩約6分（分速80m）。",
    "walk": "銀座駅から徒歩約6分",
    "hours": "18:00〜翌2:00（翌1:00 ラストオーダー）",
    "closed": "日曜",
    "phone": "03-6252-5044",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.barkage.com/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "公式の表記は 18:00〜26:00、LO 25:00。26:00 は翌日の2:00。",
      "Googleマップの星4.7は、2026年10月31日に店名の横へ出ていた数字。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "BAR KAGE の公式サイト",
    "sourceUrl": "https://www.barkage.com/",
    "lat": 35.67149,
    "lng": 139.761353,
    "mapsStars": 4.7,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "lehavre",
    "checked": "2026-10-31",
    "name": "cafe Le Havre",
    "kana": "カフェルアーヴル",
    "prefecture": "神奈川",
    "locality": "元町",
    "moods": [
      "abroad",
      "air",
      "sweet",
      "meal",
      "roomy"
    ],
    "picks": [
      "コンテナシュークリーム",
      "元町クリームプリン",
      "バスクチーズケーキ"
    ],
    "lead": "元町・中華街駅から3分。黒いコンテナのビルの4階。",
    "story": "公式の店舗ページは、コンテナの鉄骨が混ざるビル「ル・ノワール横濱元町」の4階、と書いている。店の名は、フランスの港ルアーヴルから。港町をモチーフにした落ち着いた部屋で、カウンターとテーブルがある。テラスはペットも一緒に座れる。月・木・金は 11:00〜18:00、土・日・祝は 11:00〜19:00。どちらもラストオーダーは30分前。火と水が休み。メニューに名前があるのは、コンテナシュークリーム、元町クリームプリン、バスクチーズケーキ。",
    "address": "神奈川県横浜市中区元町1-38-2 Le Noir横浜元町4階",
    "access": "みなとみらい線 元町・中華街駅から徒歩3分。",
    "walk": "元町・中華街駅から徒歩3分",
    "hours": "月・木・金 11:00〜18:00（17:30 ラストオーダー）／土・日・祝 11:00〜19:00（18:30 ラストオーダー）",
    "closed": "火、水",
    "phone": "045-884-1263",
    "links": [
      {
        "label": "公式の店舗ページ",
        "href": "https://cafelehavre.owst.jp/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "公式ページから予約できる。テラスのペットは、電話か予約がよい、と公式。",
    "parking": "",
    "signature": "",
    "notes": [
      "国土地理院の住所は元町一丁目38番地までで、2は落ちている。",
      "Googleマップの星4.2は、2026年10月31日に店名の横へ出ていた数字。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "cafe Le Havre の公式店舗ページ",
    "sourceUrl": "https://cafelehavre.owst.jp/",
    "lat": 35.440632,
    "lng": 139.65007,
    "pinRough": true,
    "mapsStars": 4.2,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "polaris",
    "checked": "2026-10-31",
    "name": "Polaris coffee",
    "kana": "ポラリスコーヒー",
    "prefecture": "神奈川",
    "locality": "元町",
    "moods": [
      "air",
      "quiet",
      "linger",
      "sweet",
      "morning"
    ],
    "picks": [
      "オリジナルブレンド"
    ],
    "lead": "石川町駅から5分。青を基調にした、静かなコーヒーの店。",
    "story": "公式は、シンプルでおしゃれな内装、ブルーを基調にした落ち着いた色、ゆったりしたソファ、静かな雰囲気、と書いている。代表は吉田健人。初めての人にはオリジナルブレンドをすすめている。ケーキやプリンは店で作る。石川町駅から徒歩5分、元町・中華街駅から徒歩6分。平日は 10:00〜18:30、休日は 9:00〜19:00。月と火が休みで、祝日は開く。最新はInstagramで確認、と公式。",
    "address": "神奈川県横浜市中区元町4-179 ウィスタリア元町2階",
    "access": "JR石川町駅から徒歩5分。みなとみらい線 元町・中華街駅から徒歩6分。",
    "walk": "石川町駅から徒歩5分",
    "hours": "平日 10:00〜18:30／休日 9:00〜19:00",
    "closed": "月、火。祝日は営業。最新はInstagram、と公式",
    "phone": "045-319-4229",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://polaris-coffee.jp/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "Googleマップの星4.7は、2026年10月31日に店名の横へ出ていた数字。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "Polaris coffee の公式サイト。最新の休みはInstagram、と書いてある",
    "sourceUrl": "https://polaris-coffee.jp/",
    "lat": 35.439945,
    "lng": 139.647034,
    "mapsStars": 4.7,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "koma",
    "checked": "2026-10-31",
    "name": "茶房コマ",
    "kana": "サボウコマ",
    "prefecture": "埼玉",
    "locality": "浦和",
    "moods": [
      "retro",
      "air",
      "sweet",
      "meal"
    ],
    "picks": [
      "コマブレンド",
      "フランボワーズムース",
      "シフォンケーキ"
    ],
    "lead": "浦和駅から2〜3分。昭和47年から続く喫茶。",
    "story": "茶房コマの案内は、昭和47年から変わらない雰囲気、落ち着いた店内、初代マスターから受け継ぐコーヒーと特製ケーキ、と書いている。メニューに名前があるのは、コマブレンド、フランボワーズムース、シフォンケーキ。埼玉日和の2023年4月5日更新の記事は、木のテーブルや椅子、ステンドガラス、温かい色の間接照明、と書いている。営業の案内は二つある。案内ページは 10:00〜18:30（ラストオーダー 18:00）、月曜と第2・第4日曜が休み、浦和駅西口から徒歩3分。食べログの店舗情報は 10:00〜18:00（ラストオーダー 17:45）、月曜と日曜が休み、浦和駅から徒歩2分。食べログは、その営業情報を店舗関係者が公開している、と書いている。",
    "address": "埼玉県さいたま市浦和区高砂2-1-2",
    "access": "案内ページは、JR浦和駅西口から徒歩3分。食べログの店舗情報は、浦和駅から徒歩2分。",
    "walk": "浦和駅から徒歩2〜3分",
    "hours": "案内ページは 10:00〜18:30（18:00 ラストオーダー）。食べログの店舗情報は 10:00〜18:00（17:45 ラストオーダー）",
    "closed": "案内ページは月曜と第2・第4日曜。食べログは月曜と日曜",
    "phone": "048-824-7734",
    "links": [
      {
        "label": "案内ページ",
        "href": "https://sabou-koma.jp/"
      },
      {
        "label": "食べログ",
        "href": "https://tabelog.com/saitama/A1101/A110102/11013846/"
      },
      {
        "label": "埼玉日和",
        "href": "https://saitamabiyori.com/21212/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "案内ページも食べログも、予約できると書いている。",
    "parking": "",
    "signature": "",
    "notes": [
      "ステンドガラスの描写は、埼玉日和の2023年4月5日更新の記事。記事は、執筆当時の情報、と断っている。",
      "Googleマップの星4.2は、2026年10月31日に店名の横へ出ていた数字。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "茶房コマの案内ページと食べログの店舗情報。営業時間が違う",
    "sourceUrl": "https://sabou-koma.jp/",
    "lat": 35.857449,
    "lng": 139.655365,
    "mapsStars": 4.2,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "akatsuka",
    "kind": "izakaya",
    "checked": "2026-10-31",
    "name": "季節料理 赤津加",
    "kana": "キセツリョウリアカツカ",
    "prefecture": "東京",
    "locality": "秋葉原",
    "moods": [
      "retro",
      "late",
      "meal",
      "air"
    ],
    "lead": "秋葉原。昭和29年から、3代目の店。",
    "story": "公式は、昭和29年の開店から続き、3代目店主の寺谷光雄、創業当時の雰囲気を変えず、古き良き昭和の香りの残る店内、と書いている。秋葉原駅から徒歩3分。",
    "address": "東京都千代田区外神田1-10-2",
    "access": "秋葉原駅から徒歩3分。公式。",
    "walk": "秋葉原駅から徒歩3分",
    "hours": "平日 11:30〜14:00（13:30 ラストオーダー）と 17:00〜22:00（21:15 ラストオーダー）／土曜 17:00〜21:00（20:15 ラストオーダー）",
    "closed": "日曜、祝日、第1・第3・第5土曜。12月のみ毎週土曜営業、とページ",
    "phone": "03-3251-2585",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://akatsuka-j.jp/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "2日前まではフォーム。当日と前日は電話、と公式。",
    "parking": "",
    "signature": "",
    "notes": [
      "二階のテーブルは宴会4名から、と公式。",
      "Googleマップの星4.1は、2026年10月31日に店名の横へ出ていた数字。店名は赤津加 と出ていた。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "季節料理 赤津加の公式サイト",
    "sourceUrl": "https://akatsuka-j.jp/",
    "lat": 35.698872,
    "lng": 139.770615,
    "mapsStars": 4.1,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "ebisu",
    "kind": "izakaya",
    "checked": "2026-10-31",
    "name": "大衆居酒屋 恵比寿商店",
    "kana": "タイシュウイザカヤエビスショウテン",
    "prefecture": "東京",
    "locality": "恵比寿",
    "moods": [
      "retro",
      "late",
      "meal",
      "air"
    ],
    "picks": [
      "恵比寿名物メデ鯛福焼売",
      "名物メデ鯛飯"
    ],
    "lead": "恵比寿の地下。昔の写真と、紺の暖簾。",
    "story": "公式は、ビール工場の町だった頃の恵比寿を壁一面の写真で見せ、紺の暖簾と赤提灯の下、掘りごたつの座敷、と書いている。株式会社恵比寿商店のこの住所の店。ページは、2026年11月1日にリニューアルオープン、10月19日からプレオープン、とも書いている。名物・おすすめに、恵比寿名物メデ鯛福焼売と名物メデ鯛飯がある。",
    "address": "東京都渋谷区恵比寿西1-8-2 ウエストパレスビル B1F",
    "access": "JR・日比谷線 恵比寿駅西口から徒歩3分。公式。",
    "walk": "恵比寿駅西口から徒歩3分",
    "hours": "月・土・日・祝の夜 15:00〜24:00（23:00 ラストオーダー）。火〜金の夜 16:00〜24:00（23:00 ラストオーダー）。ランチは11月から、火〜金 12:00〜14:00（14:00 ラストオーダー）。月曜のランチは休み",
    "closed": "定休日はない、と公式。ページには10月25日のみ臨時休業ともある",
    "phone": "03-6452-5448",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://ebisu-shoten.jp/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "金曜の夜と土曜は満席になりやすいので電話かネット予約、と公式。",
    "parking": "",
    "signature": "",
    "notes": [
      "席は36。カウンター、テーブル、掘りごたつの座敷。支払いは現金・カード・QR、と店舗情報。",
      "Googleマップの星4.3は、2026年10月31日に店名の横へ出ていた数字。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "大衆居酒屋 恵比寿商店の公式サイト",
    "sourceUrl": "https://ebisu-shoten.jp/",
    "lat": 35.647854,
    "lng": 139.708435,
    "mapsStars": 4.3,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "showaken",
    "kind": "izakaya",
    "checked": "2026-10-31",
    "name": "浅草昭和軒",
    "kana": "アサクサショウワケン",
    "prefecture": "東京",
    "locality": "浅草",
    "moods": [
      "retro",
      "late",
      "meal",
      "air"
    ],
    "picks": [
      "マッコリのやかん売り",
      "ホルモン鍋コース"
    ],
    "lead": "浅草駅の北口から30秒。昭和の焼肉。",
    "story": "公式は、居酒屋として焼肉を出し、店内は昭和の雰囲気が漂うレトロな内装、と書いている。名物・おすすめにマッコリのやかん売り、おすすめコースにホルモン鍋コースがある。東武線浅草駅北口から徒歩30秒。",
    "address": "東京都台東区花川戸1-8-13",
    "access": "東武線浅草駅北口から徒歩30秒。公式。",
    "walk": "東武線浅草駅北口から徒歩30秒",
    "hours": "17:00〜23:00（22:30 ラストオーダー）",
    "closed": "不定休",
    "phone": "03-3841-2628",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://asakusa-showaken.com/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "電話でも予約を受ける、と公式。",
    "parking": "",
    "signature": "",
    "notes": [
      "Googleマップの星4.6は、2026年10月31日に店名の横へ出ていた数字。店名は浅草 昭和軒 と出ていた。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "浅草昭和軒の公式サイト。定休日は不定休",
    "sourceUrl": "https://asakusa-showaken.com/",
    "lat": 35.712715,
    "lng": 139.798523,
    "mapsStars": 4.6,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "etsubo",
    "kind": "izakaya",
    "checked": "2026-10-31",
    "name": "古民家居酒屋 笑壺",
    "kana": "コミンカイザカヤエツボ",
    "prefecture": "埼玉",
    "locality": "大宮",
    "moods": [
      "house",
      "late",
      "meal",
      "air"
    ],
    "picks": [
      "笑壺名物 大おにぎり"
    ],
    "lead": "大宮駅東口から2分。古民家の素材を寄せた店。",
    "story": "公式は、外装や内装を新潟の古民家からの感銘で作り、古民家の素材を厳選して取り寄せた、と書いている。住所はつるやビルの1階。メニューに笑壺名物の大おにぎりがある。営業の書き方は 17:00〜29:00 で、日付をまたいで翌朝5時まで。定休は祝日。",
    "address": "埼玉県さいたま市大宮区仲町1-33 つるやビル 1F",
    "access": "JR各線 大宮駅東口より徒歩2分。公式。大宮駅から227m、ともある。",
    "walk": "大宮駅東口から徒歩2分",
    "hours": "17:00〜翌5:00。ページの書き方は 17:00〜29:00",
    "closed": "祝日",
    "phone": "048-871-5210",
    "links": [
      {
        "label": "店舗概要",
        "href": "https://omiya-etsubo.com/about/"
      },
      {
        "label": "メニュー",
        "href": "https://omiya-etsubo.com/menu/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "電話かウェブ、と公式。",
    "parking": "",
    "signature": "",
    "notes": [
      "Googleマップの店名は、古民家居酒屋 笑壺 －ETSUBO－ 大宮東口店。番地は仲町1-33-3 つるや商店ビル、と出ていた。公式の住所は仲町1-33 つるやビル。",
      "Googleマップの星4.7は、2026年10月31日に店名の横へ出ていた数字。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "古民家居酒屋 笑壺の店舗概要とメニュー",
    "sourceUrl": "https://omiya-etsubo.com/about/",
    "lat": 35.905384,
    "lng": 139.626022,
    "mapsStars": 4.7,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "tokimeki",
    "kind": "izakaya",
    "checked": "2026-10-31",
    "name": "高円寺 動悸",
    "kana": "コウエンジトキメキ",
    "prefecture": "東京",
    "locality": "高円寺",
    "moods": [
      "late",
      "meal",
      "air"
    ],
    "lead": "高円寺。炉端と、木の手触り。",
    "story": "公式は、読みを「ときめき」とし、扉を開けると炉端で鮮魚や野菜を焼き、心地よい木の手触りとこだわりの器、と書いている。同じビルの地下に Sake bar KoKoN もある。店は別。定休日はない、とある。",
    "address": "東京都杉並区高円寺北2-21-1 リリーベル高円寺スクエアビル B1F",
    "access": "JR高円寺駅北口より徒歩約3分。公式。",
    "walk": "高円寺駅北口から徒歩約3分",
    "hours": "月〜木 16:00〜23:00（食事22:00、飲み物22:30 ラストオーダー）／金 16:00〜24:00（食事23:00、飲み物23:30）／土 13:00〜24:00（食事23:00、飲み物23:30）／日・祝 13:00〜23:00（食事22:00、飲み物22:30）",
    "closed": "定休日なし",
    "phone": "050-5448-2999",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://koenji-tokimeki.com/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "ウェブ予約がある、と公式。",
    "parking": "",
    "signature": "",
    "notes": [
      "Googleマップの星4.8は、2026年10月31日に店名の横へ出ていた数字。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "高円寺 動悸の公式サイト",
    "sourceUrl": "https://koenji-tokimeki.com/",
    "lat": 35.70681,
    "lng": 139.650146,
    "mapsStars": 4.8,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "naminoya",
    "kind": "izakaya",
    "checked": "2026-10-31",
    "name": "波乃家 三代目",
    "kana": "ナミノヤサンダイメ",
    "prefecture": "東京",
    "locality": "吉祥寺",
    "moods": [
      "late",
      "meal",
      "air"
    ],
    "picks": [
      "ハツ（心臓）"
    ],
    "lead": "吉祥寺駅から2分。三代目の焼鳥。",
    "story": "ページの題は波乃家 三代目。店舗表の店名は波之家 三代目。先代から受け継ぐ想いと50年のタレ、鳥は山梨県産の朝引き健味鳥、と書いている。こだわりの見出しにハツ（心臓）がある。吉祥寺駅から徒歩2分、106m、ともある。定休は不定休。",
    "address": "東京都武蔵野市吉祥寺本町1-1-8 2F",
    "access": "JR中央線・京王井の頭線 吉祥寺駅より徒歩2分。公式。",
    "walk": "吉祥寺駅から徒歩2分",
    "hours": "月〜金 16:00〜23:00／土・日・祝 14:00〜23:00",
    "closed": "不定休",
    "phone": "042-227-1017",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://naminoya-kichijoji.com/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "予約可、と店舗表。",
    "parking": "",
    "signature": "",
    "notes": [
      "席は34。チャージは300円。全席喫煙可、と店舗表。",
      "Googleマップの星4.1は、2026年10月31日に店名の横へ出ていた数字。店名は波之家 三代目、建物は塚田水産ビル2階、と出ていた。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "波乃家 三代目の公式サイト。定休日は不定休",
    "sourceUrl": "https://naminoya-kichijoji.com/",
    "lat": 35.703987,
    "lng": 139.579132,
    "mapsStars": 4.1,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "tsukiai",
    "kind": "izakaya",
    "checked": "2026-10-31",
    "name": "月逢",
    "kana": "ツキアイ",
    "prefecture": "東京",
    "locality": "赤坂",
    "moods": [
      "late",
      "meal",
      "air"
    ],
    "picks": [
      "大きなワンタン（なずな入り本格自家製）"
    ],
    "lead": "赤坂見附から3分。朝までのカラオケ居酒屋。",
    "story": "店主の竹川静香は、私の居酒屋、白いソファーと両肘の付くカウンター、女性一人でも、と書いている。おすすめに名前があるのは、大きなワンタン（なずな入り本格自家製）。公式の場所は、赤坂みすじ通りのドン・キホーテ真向かいの5階。番地は公式にない。カラオケは無料、ともある。席の間隔が広い、とはある。テラスや屋根のない席とは書いていない。",
    "address": "東京都港区赤坂3-15-1 赤坂コーストビル5F",
    "access": "赤坂見附駅出口10と赤坂駅出口1から、どちらも徒歩約3分。公式。赤坂見附駅から240m、ともある。番地は、2026年10月31日のGoogleマップが赤坂3-15-1 赤坂コーストビル5階と出していた。",
    "walk": "赤坂見附駅から徒歩約3分",
    "hours": "営業時間の欄は 18:00〜翌5:30（金曜は翌朝7:00）。予約の電話の横は、平日 18:00〜翌3:00",
    "closed": "土曜、日曜、祝日。休日の予約は10人から相談、と公式",
    "phone": "03-6435-5512",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://tsuki-ai.com/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "電話は 03-6435-5512 と 090-5828-0281。当日直前も、と公式。",
    "parking": "",
    "signature": "",
    "notes": [
      "営業時間の欄と、予約電話の横の時間が違う。出かける前に店で確認する。",
      "Googleマップの星4.7は、2026年10月31日に店名の横へ出ていた数字。店名は月逢 と出ていた。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "月逢の公式サイト。営業時間の欄と予約電話の横で終わりが違う",
    "sourceUrl": "https://tsuki-ai.com/",
    "lat": 35.67437,
    "lng": 139.736893,
    "pinRough": true,
    "mapsStars": 4.7,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "bruder",
    "kind": "bar",
    "checked": "2026-10-31",
    "name": "Bar Bruder",
    "kana": "バーブリューダー",
    "prefecture": "東京",
    "locality": "新宿三丁目",
    "moods": [
      "retro",
      "night",
      "late",
      "air"
    ],
    "lead": "新宿三丁目から1分。アール・ヌーヴォーのバー。",
    "story": "公式は、大人の社交場をイメージしたアール・ヌーヴォー調で、バーテンダー歴25年以上の店主、個室は明治の西洋をモチーフ、と書いている。新宿三丁目駅から徒歩約1分。フルーツ・リキュールのカクテルが人気、とある。一品の名前は書いていない。",
    "address": "東京都新宿区新宿3-8-9 平生ビルディング4階",
    "access": "地下鉄 新宿三丁目駅から徒歩約1分。JR新宿駅東口から徒歩約7分。新宿御苑前駅1番出口から徒歩約5分。公式。",
    "walk": "新宿三丁目駅から徒歩約1分",
    "hours": "営業時間のページは 15:00〜24:00（ラストイン）。店舗詳細は 15:00〜翌2:00（1:30 ラストオーダー）、日曜・祝日は 15:00〜24:00（23:30 ラストオーダー）",
    "closed": "火曜、不定休あり。詳細は、最新を営業時間のページで見るよう書いている",
    "phone": "03-6457-4949",
    "links": [
      {
        "label": "営業時間",
        "href": "https://bar-bruder.com/open/"
      },
      {
        "label": "公式サイト",
        "href": "https://bar-bruder.com/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "ウェブ予約がある、と公式。",
    "parking": "",
    "signature": "",
    "notes": [
      "席は21。チャージは1人1,100円。個室は部屋ごとに2,200円、と公式。喫煙可。",
      "Googleマップの星4.6は、2026年10月31日に店名の横へ出ていた数字。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "Bar Bruder の営業時間ページと店舗詳細。書いてある時間が違う",
    "sourceUrl": "https://bar-bruder.com/open/",
    "lat": 35.69067,
    "lng": 139.706741,
    "mapsStars": 4.6,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "dresden",
    "kind": "bar",
    "checked": "2026-10-31",
    "name": "Barどれすでん",
    "kana": "バードレスデン",
    "prefecture": "東京",
    "locality": "新宿",
    "moods": [
      "retro",
      "night",
      "late",
      "air"
    ],
    "lead": "1951年創業。調度を移した新宿のバー。",
    "story": "公式は、1951年の創業で、東口アルタ裏から2023年に今の場所へ移り、テーブルやカウンターなどの調度は全部移し、内装はほぼそのまま、と書いている。屋号は古都ドレスデンから。新宿三丁目駅A5出口から徒歩1分。",
    "address": "東京都新宿区新宿3-30-11 新宿高野第二ビル B1F",
    "access": "地下鉄丸ノ内線 新宿三丁目駅A5出口より徒歩1分。JR新宿駅東口より徒歩3分。公式。",
    "walk": "新宿三丁目駅A5出口から徒歩1分",
    "hours": "17:30〜23:30（23:00 ラストオーダー）",
    "closed": "日曜、祝日",
    "phone": "03-3354-7106",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.bardresden.jp/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "席は33。チャージは1,650円（席料330円、お通し2品1,320円）、と公式。",
      "Googleマップの星4.3は、2026年10月31日に店名の横へ出ていた数字。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "Barどれすでんの公式サイト",
    "sourceUrl": "https://www.bardresden.jp/",
    "lat": 35.691292,
    "lng": 139.703674,
    "mapsStars": 4.3,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "evita",
    "kind": "bar",
    "checked": "2026-10-31",
    "name": "BAR EVITA.",
    "kana": "バーエビータ",
    "prefecture": "東京",
    "locality": "銀座",
    "moods": [
      "night",
      "late",
      "air"
    ],
    "lead": "銀座の9階。2004年から続くバー。",
    "story": "公式は、銀座のビルの9階で、2004年のオープン以来、一人の一杯や接待、仕事上がりの一杯、と書いている。月曜から土曜は 18:00〜翌2:00。祝日は 18:00〜23:30。日曜が休み。駅からの分数は書いていない。",
    "address": "東京都中央区銀座8-4-24 藤井ビル9F",
    "access": "駅からの分数は、公式にない。地図で測ると、新橋駅から道のり約440m、徒歩約6分（分速80m）。",
    "walk": "新橋駅から徒歩約6分",
    "hours": "月〜土 18:00〜翌2:00／祝日 18:00〜23:30",
    "closed": "日曜",
    "phone": "03-3574-5571",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.evita-bar.com/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "公式に予約の入口がある。",
    "parking": "",
    "signature": "",
    "notes": [
      "Googleマップの星4.8は、2026年10月31日に店名の横へ出ていた数字。店名は銀座オーセンティックバー BAR EVITA. と出ていた。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "BAR EVITA. の公式サイト",
    "sourceUrl": "https://www.evita-bar.com/",
    "lat": 35.669323,
    "lng": 139.76004,
    "mapsStars": 4.8,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "whiteoak",
    "kind": "bar",
    "checked": "2026-10-31",
    "name": "BAR WHITE OAK",
    "kana": "バーホワイトオーク",
    "prefecture": "東京",
    "locality": "銀座",
    "moods": [
      "night",
      "late",
      "air"
    ],
    "picks": [
      "季節のフルーツカクテル",
      "オリジナルのビーフジャーキー",
      "生チョコレート"
    ],
    "lead": "銀座・金春通り。ナラの止まり木、と書くバー。",
    "story": "公式は、ホワイトオークをナラの木、ウイスキーやワインの熟成に使う木材とし、銀座に根付く1本の止まり木、と書いている。季節のフルーツカクテル、オリジナルのビーフジャーキー、生チョコレートに名前がある。本文と説明文で、営業の曜日が違う。",
    "address": "東京都中央区銀座8-7-7 中央林ビル302",
    "access": "説明文は、銀座駅徒歩6分、新橋駅徒歩6分。地図で測ると、新橋駅から道のり約460m、徒歩約6分（分速80m）。",
    "walk": "銀座駅から徒歩6分",
    "hours": "本文は火〜土 18:00〜翌3:00、日曜 16:00〜23:00。説明文は月〜金 18:00〜翌3:00、土曜 18:00〜翌2:00",
    "closed": "本文は月曜。説明文は日曜と祝日",
    "phone": "03-3572-6088",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://whiteoak.bar/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "説明文はカウンター7席、とも書いている。",
      "Googleマップの星4.6は、2026年10月31日に店名の横へ出ていた数字。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "BAR WHITE OAK の公式サイト。本文と説明文で曜日が違う",
    "sourceUrl": "https://whiteoak.bar/",
    "lat": 35.66835,
    "lng": 139.761185,
    "mapsStars": 4.6,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "ofen",
    "kind": "bar",
    "checked": "2026-10-31",
    "name": "Bar Ofen",
    "kana": "バーオーフェン",
    "prefecture": "神奈川",
    "locality": "横浜",
    "moods": [
      "night",
      "quiet",
      "late",
      "air"
    ],
    "lead": "横浜駅から5分。静かに佇む、と書くバー。",
    "story": "公式は、横浜駅から徒歩5分、静かに佇む一軒家バー、2014年の創業、350種類以上のウイスキー、洗練された空間、と書いている。住所の欄は南幸ビル。店舗概要の表は、日曜から土曜まで 18:00〜翌2:00。年中無休、ノーチャージ、ともある。姉妹店のページも置いている。季節のフルーツカクテルは種類の話で、一品の名前はない。",
    "address": "神奈川県横浜市西区南幸2-3-11 南幸ビル",
    "access": "横浜駅から徒歩5分。公式。",
    "walk": "横浜駅から徒歩5分",
    "hours": "18:00〜翌2:00。店舗概要は日曜から土曜まで同じ",
    "closed": "年中無休、と公式",
    "phone": "045-534-9233",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://bar-ofen.com/"
      },
      {
        "label": "店舗概要",
        "href": "https://bar-ofen.com/about-us/"
      }
    ],
    "reservation": "none",
    "reservationNote": "予約は不可、と店舗概要。",
    "parking": "",
    "signature": "",
    "notes": [
      "席は18。喫煙可、と店舗概要。",
      "Googleマップの星4.3は、2026年10月31日に店名の横へ出ていた数字。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "Bar Ofen の公式サイトと店舗概要",
    "sourceUrl": "https://bar-ofen.com/about-us/",
    "lat": 35.462696,
    "lng": 139.617828,
    "mapsStars": 4.3,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "taka",
    "kind": "bar",
    "checked": "2026-10-31",
    "name": "Bar 貴",
    "kana": "バータカ",
    "prefecture": "埼玉",
    "locality": "南浦和",
    "moods": [
      "night",
      "linger",
      "late",
      "air"
    ],
    "lead": "南浦和駅東口から4分。カウンター8席。",
    "story": "公式は、カウンター8席、ゆとりがある居心地の良い空間、気付けば程良く時間が経っている、と書いている。南浦和駅東口から徒歩4分。席の数は8で、テラスや屋根のない席とは書いていない。",
    "address": "埼玉県さいたま市南区南浦和2-28-1",
    "access": "JR各線 南浦和駅東口から徒歩4分。公式。",
    "walk": "南浦和駅東口から徒歩4分",
    "hours": "18:00〜翌2:00（翌1:00 ラストオーダー）。ページの書き方は 18:00〜26:00（25:00 ラストオーダー）。日曜と祝日は 18:00〜24:00（23:00 ラストオーダー）",
    "closed": "水曜",
    "phone": "048-612-9042",
    "links": [
      {
        "label": "アクセス",
        "href": "https://www.bar-taka.jp/access.html"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "Googleマップの星4.4は、2026年10月31日に店名の横へ出ていた数字。店名は Bar貴（バータカ） と出ていた。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "Bar 貴のアクセスページ",
    "sourceUrl": "https://www.bar-taka.jp/access.html",
    "lat": 35.849545,
    "lng": 139.671066,
    "mapsStars": 4.4,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "sakaba923",
    "kind": "bar",
    "checked": "2026-10-31",
    "name": "咲場923",
    "kana": "サカバクニサン",
    "prefecture": "東京",
    "locality": "練馬",
    "moods": [
      "night",
      "late"
    ],
    "picks": [
      "樽生ビール"
    ],
    "lead": "練馬駅から2分。店主のニックネームが屋号。",
    "story": "公式は、咲場923と書いてさかば くにさん、くにさんは店主のニックネーム、練馬駅徒歩2分のバー、と書いている。練馬で一番美味しい樽生ビール、と自分で書いている。完全禁煙（電子たばこも含む）。月曜が休みで、月に1〜2回は日曜と月曜の連休がある、ともある。",
    "address": "東京都練馬区豊玉北5-15-12 花園ビル3F",
    "access": "練馬駅から徒歩2分。公式。",
    "walk": "練馬駅から徒歩2分",
    "hours": "火〜土 17:00〜23:30／日・祝 16:00〜22:00。入店は閉店の30分前まで",
    "closed": "月曜。月に1〜2回、日曜と月曜の連休",
    "phone": "03-6914-9238",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.sakaba923.com/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "来店前に、予約のお願いを読むよう書いている。",
    "parking": "",
    "signature": "",
    "notes": [
      "席料があると書いている。金額は、このページの本文にはなかった。",
      "Googleマップの星4.8は、2026年10月31日に店名の横へ出ていた数字。店名は Bar 咲場 923（さかば くにさん） と出ていた。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "咲場923の公式サイト。月曜以外の連休がある",
    "sourceUrl": "https://www.sakaba923.com/",
    "lat": 35.736652,
    "lng": 139.655151,
    "mapsStars": 4.8,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "kokon",
    "kind": "bar",
    "checked": "2026-10-31",
    "name": "Sake bar KoKoN",
    "kana": "サケバーココン",
    "prefecture": "東京",
    "locality": "高円寺",
    "moods": [
      "night",
      "linger",
      "late",
      "air"
    ],
    "lead": "高円寺駅北口から3分。12席の日本酒バー。",
    "story": "公式は、隠れ家のような落ち着いた空間で、リラックスしながら日本酒を楽しむ、と書いている。席は12。個室はない。全席禁煙。同じビルの地下に、居酒屋の高円寺 動悸もある。店は別。木曜が休みで、月によって不定休がある。決まった一本の酒の名前は、このページにない。",
    "address": "東京都杉並区高円寺北2-21-1 リリーベル高円寺スクエア B1F",
    "access": "JR中央線・総武線 高円寺駅北口から徒歩3分。公式。",
    "walk": "高円寺駅北口から徒歩3分",
    "hours": "18:00〜24:00",
    "closed": "木曜。月によって不定休。公式は Instagram か Google で見るよう書いている",
    "phone": "03-6824-1516",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://sakebarkokon.com/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "週末は混むので予約を勧める、と公式。最大4人。",
    "parking": "",
    "signature": "",
    "notes": [
      "Googleマップの星4.9は、2026年10月31日に店名の横へ出ていた数字。店名は Sake Bar KoKoN と出ていた。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "Sake bar KoKoN の公式サイト。不定休がある",
    "sourceUrl": "https://sakebarkokon.com/",
    "lat": 35.70681,
    "lng": 139.650146,
    "mapsStars": 4.9,
    "mapsChecked": "2026-10-31"
  }
];
