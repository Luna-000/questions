/* ソトガワの手帳。個人の店と、2店舗くらいまでの店で、建物や内装、店が自分で書いている来歴があるもの。加えて、2026-10-31 に Googleマップの店名の横が 4.0 以上だった個人店。星はその日に見た数字。営業時間は同じ日までに見た公開情報。出発前に各店で確認する。 */
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

const PREFS = ["東京", "神奈川", "千葉", "埼玉", "茨城", "栃木", "群馬"];

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
    "id": "koguma",
    "name": "古民家カフェ こぐま",
    "kana": "コグマ",
    "prefecture": "東京",
    "locality": "東向島",
    "moods": [
      "house",
      "retro",
      "sweet",
      "meal"
    ],
    "lead": "1927年の元薬局。鳩の街通りの端で昭和に座る。",
    "story": "東京大空襲を逃れた道幅のままの商店街、鳩の街通りの北端。三軒長屋の端だった元薬局を、薬の引き出しや屋号の磨りガラスを残してカフェにしている。焼きオムライスと、寒天で果物を包んだあんみつ玉が知られる。",
    "address": "東京都墨田区東向島1-23-14",
    "access": "墨田区東向島。東武スカイツリーラインの東向島駅、京成曳舟駅が最寄りになる。徒歩の分数は公式で確認。",
    "hours": "11:30〜18:30（18:00 ラストオーダー）",
    "closed": "火・水",
    "phone": "03-3610-0675",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://ko-gu-ma.com/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "焼きオムライス、あんみつ玉",
    "notes": [],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "guide",
    "sourceLabel": "Tokyo Tokyo の紹介（2025年10月時点、と記事にある）",
    "sourceUrl": "https://tokyotokyo.jp/ja/mediacollab/tabi-labo/",
    "lat": 35.720367,
    "lng": 139.812195,
    "mapsStars": 4.3,
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
    "access": "東急池上線 池上駅から、池上本門寺の門前へ歩く。",
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
    "mapsChecked": "2026-10-31"
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
    "access": "谷中。日暮里駅、または千駄木・根津方面から歩く。",
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
    "mapsChecked": "2026-10-31"
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
    "access": "東急東横線・大井町線 自由が丘駅から住宅地へ歩く。",
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
    "mapsChecked": "2026-10-31"
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
    "access": "谷中。根津駅、千駄木駅から歩く距離。",
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
    "mapsChecked": "2026-10-31"
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
    "id": "chakichi",
    "checked": "2026-10-31",
    "name": "茶フェ ちゃきち 富岡店",
    "kana": "チャキチ",
    "prefecture": "群馬",
    "locality": "富岡",
    "moods": [
      "house",
      "air"
    ],
    "lead": "富岡の、お茶の店が開く築60年の家。席は40。",
    "story": "日本茶の吉田園が営む茶カフェ。富岡店は築60年の古民家、と公式が書いている。席は40。駐車場は10台と、第二駐車場が14台。高崎モントレーにも別の店があり、そちらはホテルの中で 10:00〜20:00。こちらは家のほう。",
    "address": "群馬県富岡市一ノ宮264",
    "access": "富岡市一ノ宮。駅からの分数は公式の案内にない。車は駐車場を使う。",
    "hours": "11:00〜18:00（L.O. 17:45）",
    "closed": "月曜。月曜が祝日のときは営業し、翌火曜が休み",
    "phone": "0274-63-4017",
    "links": [
      {
        "label": "公式の店舗案内",
        "href": "https://chakichi.jp/access/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "10台。第二駐車場 14台、と公式。",
    "signature": "日本茶の店の茶カフェ",
    "notes": [
      "高崎モントレー店は別住所で、休みはホテルに準ずる、と公式にある。"
    ],
    "train": false,
    "car": true,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "茶フェちゃきちの店舗案内",
    "sourceUrl": "https://chakichi.jp/access/",
    "lat": 36.253761,
    "lng": 138.863968,
    "mapsStars": 4.4,
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
    "access": "谷中銀座。駅からの分数は店舗ページにない。",
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
    "mapsChecked": "2026-10-31"
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
    "access": "浅草橋。駅からの分数は店舗ページにない。",
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
    "mapsChecked": "2026-10-31"
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
    "id": "kayaba",
    "checked": "2026-10-31",
    "name": "カヤバ珈琲",
    "kana": "カヤバコーヒー",
    "prefecture": "東京",
    "locality": "谷中",
    "moods": [
      "house",
      "retro",
      "morning",
      "meal",
      "air"
    ],
    "picks": [
      "たまごサンド"
    ],
    "lead": "大正の古民家。2階は畳とちゃぶ台。",
    "story": "さんたつの記事は、大正時代に建てられた古民家を使ったカフェで、1938年創業、一度閉じてから復活した、と書いている。公式Instagramは、営業 8:00〜18:00、フードのラストオーダー 17:00、月曜定休で、祝日のときは営業して火曜が休み、と書いている。",
    "address": "東京都台東区谷中6-1-29",
    "access": "JR日暮里駅から徒歩10分、とさんたつ。根津駅からも歩く。",
    "hours": "火〜日 8:00〜18:00（フードは 17:00 ラストオーダー）",
    "closed": "月曜（祝日のときは営業し、火曜が休み）",
    "phone": "03-4361-3115",
    "links": [
      {
        "label": "公式Instagram",
        "href": "https://www.instagram.com/kayabacoffee/"
      },
      {
        "label": "予約サイト",
        "href": "https://yoyaku.toreta.in/kayabacoffee"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "公式Instagramは、席の予約は前日までの予約サイトだけ、と書いている。",
    "parking": "",
    "signature": "",
    "notes": [
      "建物の描写と電話、駅からの分数はさんたつ（2025年7月1日更新）。時間は公式Instagram。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "カヤバ珈琲の公式Instagram。建物はさんたつ",
    "sourceUrl": "https://www.instagram.com/kayabacoffee/",
    "lat": 35.721161,
    "lng": 139.770752,
    "mapsStars": 4.2,
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
    "id": "kinoka",
    "checked": "2026-10-31",
    "name": "Cafeきのか",
    "kana": "カフェキノカ",
    "prefecture": "埼玉",
    "locality": "北浦和",
    "moods": [
      "house",
      "air"
    ],
    "lead": "北浦和の、85年の古民家。",
    "story": "公式は、北浦和の85年になる古民家カフェ、と書いている。2026年10月と11月の案内は、木・金・土・日・月が 11:00〜18:00、火・水が休み。ラストオーダーは 17:30。",
    "address": "埼玉県さいたま市浦和区領家7-4-21",
    "access": "JR北浦和駅東口から徒歩約15分。東口のバス停から「岩槻駅行き」か「宮下行き」で約5分、「領家交番」で降りて徒歩約3分。",
    "hours": "木・金・土・日・月 11:00〜18:00（17:30 ラストオーダー）",
    "closed": "火・水",
    "phone": "080-4863-8487",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.cafekinoka.com/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "2台。庭と裏手に1台ずつ。裏手は、地面に「きのか」のプレートがある所だけ。",
    "signature": "",
    "notes": [
      "営業日の注記は、ページ上では2026年10月と11月に付いている。"
    ],
    "train": true,
    "car": true,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "Cafeきのかの公式サイト",
    "sourceUrl": "https://www.cafekinoka.com/",
    "lat": 35.882118,
    "lng": 139.651428,
    "mapsStars": 4.6,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "takezo",
    "checked": "2026-10-31",
    "name": "TsuKuRuBa竹蔵",
    "kana": "ツクルバタケゾウ",
    "prefecture": "埼玉",
    "locality": "鳩ヶ谷",
    "moods": [
      "house",
      "sweet",
      "meal",
      "air"
    ],
    "picks": [
      "バスクチーズケーキ",
      "ハンドドリップ珈琲",
      "季節のサンドイッチ",
      "自家製キッシュ"
    ],
    "lead": "鳩ヶ谷の古民家。井戸小屋の面影と、蔵戸。",
    "story": "公式は、木のぬくもりに包まれた古民家、と書いている。ギャラリーの井戸小屋は、竈門と、福井から取り寄せた蔵戸を残している。大広間、洋室、庭もある。珈琲スタンドは井戸水のハンドドリップと、自家製の菓子。",
    "address": "埼玉県川口市鳩ヶ谷本町2-8-24",
    "access": "埼玉高速鉄道 鳩ヶ谷駅から徒歩10分。",
    "hours": "月・木・金・土・日 10:30〜18:00（17:00以降はテイクアウトのみ）",
    "closed": "火・水",
    "phone": "",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://tsukurubatakezo.com/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "敷地外に2台。カフェ入口から約180m",
    "signature": "",
    "notes": [
      "大広間の貸切は、カフェの席とは別に予約する。"
    ],
    "train": true,
    "car": true,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "TsuKuRuBa竹蔵の公式サイト",
    "sourceUrl": "https://tsukurubatakezo.com/",
    "lat": 35.834534,
    "lng": 139.742722,
    "mapsStars": 4.5,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "naranoki",
    "checked": "2026-10-31",
    "name": "古民家カフェ ならのき",
    "kana": "ナラノキ",
    "prefecture": "埼玉",
    "locality": "川口",
    "moods": [
      "house",
      "meal",
      "air"
    ],
    "lead": "川口の古民家。木のぬくもり、と店が書いている。",
    "story": "公式は、木のぬくもりを感じる古民家で料理とコーヒーを、と書いている。カフェは木〜日の 11:00〜15:00、ラストオーダー 14:30。支払いは現金だけ。駐車場はない。",
    "address": "埼玉県川口市安行領根岸3052",
    "access": "川口市安行領根岸。駅からの分数は店舗ページにない。",
    "hours": "木〜日 11:00〜15:00（14:30 ラストオーダー）",
    "closed": "月・火・水",
    "phone": "048-299-2120",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://naranoki-kawaguchi.jimdofree.com/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "なし",
    "signature": "",
    "notes": [
      "敷地内は禁煙。ペットの同伴は遠慮、と公式。",
      "ページのパフェは日付の入った例で、通年の名前としては扱っていない。"
    ],
    "train": false,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "ならのきの公式サイト",
    "sourceUrl": "https://naranoki-kawaguchi.jimdofree.com/",
    "lat": 35.838333,
    "lng": 139.721252,
    "mapsStars": 4.4,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "kingyo",
    "checked": "2026-10-31",
    "name": "金魚亭",
    "kana": "キンギョテイ",
    "prefecture": "埼玉",
    "locality": "川越",
    "moods": [
      "retro",
      "house",
      "sweet",
      "meal",
      "air"
    ],
    "picks": [
      "金魚鉢ソーダ",
      "金魚焼き",
      "カレーライス"
    ],
    "lead": "川越の蔵を改装したカフェ。夜の営業は今は休み。",
    "story": "公式は、川越の歴史ある蔵を改装したレトロなカフェ＆バー、と書いている。昼は 11:00〜18:00。夜の 19:00〜23:00 は、ページを見たとき休業中だった。定休日は不定休。",
    "address": "埼玉県川越市仲町10-15",
    "access": "西武新宿線 本川越駅から徒歩約13分。東武東上線 川越駅から徒歩約23分。松本醤油商店の隣。",
    "hours": "昼 11:00〜18:00（17:30 ラストオーダー）",
    "closed": "不定休。夜の営業は休業中",
    "phone": "049-277-3356",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://kingyo-tei.jp/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "店の前にタイムズがある、と公式",
    "signature": "",
    "notes": [
      "2号店は連雀町のテイクアウト店で、ここは本店。",
      "ピンは番地の途中まで。入口は、説明の Googleマップ で開く。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "金魚亭の公式サイト",
    "sourceUrl": "https://kingyo-tei.jp/",
    "lat": 35.92141,
    "lng": 139.481171,
    "pinRough": true,
    "mapsStars": 3.6,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "chabudai",
    "checked": "2026-10-31",
    "name": "ちゃぶだい",
    "kana": "チャブダイ",
    "prefecture": "埼玉",
    "locality": "川越",
    "moods": [
      "house",
      "morning",
      "meal",
      "late",
      "roomy",
      "air"
    ],
    "picks": [
      "カレー",
      "焼き菓子"
    ],
    "lead": "築100年を超える古民家。土間がカフェで、夜はバー。",
    "story": "公式は、蔵造りの街の三久保町で、築百年を超える古民家を改修した、と書いている。前面の土間をラウンジにし、昼はカフェ、夜はバー。小上がりと、庭のウッドデッキでも食べられる。昼はカレーと焼き菓子。",
    "address": "埼玉県川越市三久保町1-14",
    "access": "西武新宿線 本川越駅から徒歩13分。東武東上線 川越市駅から徒歩15分。",
    "hours": "カフェ 木・金 8:00〜16:00／土・日・祝 8:00〜17:00。バー 17:00〜22:00",
    "closed": "カフェは月・火・水。バーは水曜、と営業表",
    "phone": "049-214-1617",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://chabudai-kawagoe.com/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "専用駐車場はない。近隣の有料駐車場",
    "signature": "",
    "notes": [
      "ページの上には定休日を毎週水曜とも書いてある。月・火のバーが開くかは、出かける前に店で見る。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "ちゃぶだいの公式サイト",
    "sourceUrl": "https://chabudai-kawagoe.com/",
    "lat": 35.920551,
    "lng": 139.486145,
    "pinRough": true,
    "mapsStars": 4.6,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "torokko",
    "checked": "2026-10-31",
    "name": "陶路子",
    "kana": "トロッコ",
    "prefecture": "埼玉",
    "locality": "川越",
    "moods": [
      "retro",
      "house",
      "sweet",
      "air"
    ],
    "picks": [
      "さつまいもミニ懐石",
      "クリームあんみつ",
      "おしるこ",
      "さつまいもケーキ"
    ],
    "lead": "明治26年の蔵造り。漆調の黒いテーブルで甘味。",
    "story": "陶舗やまわが明治26年に建てた蔵造りの一角、と公式が書いている。さつまいもミニ懐石と、クリームあんみつ、おしるこ。ハイチェア付きの漆調の黒塗りのハイテーブルには、コップを置く穴がある、ともある。器は陶器屋の直営なので、器も見る店。",
    "address": "埼玉県川越市幸町7-1",
    "access": "川越一番街。駅からの分数は店舗ページにない。",
    "hours": "10:00〜17:00（さつまいもミニ懐石は 11:45〜15:00）",
    "closed": "不定休",
    "phone": "049-226-1065",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.touho-yamawa.co.jp/truck/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "ミニ懐石は電話かメール。フォームは3日前まで。11:45、12:00、12:15。",
    "parking": "",
    "signature": "",
    "notes": [
      "ミニ懐石の利用は80分以内、なくなり次第終了、と公式。",
      "ピンは番地の途中まで。入口は、説明の Googleマップ で開く。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "陶路子の公式サイト",
    "sourceUrl": "https://www.touho-yamawa.co.jp/truck/",
    "lat": 35.92355,
    "lng": 139.48262,
    "pinRough": true,
    "mapsStars": 4.2,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "nankirou",
    "checked": "2026-10-31",
    "name": "南亀楼",
    "kana": "ナンキロウ",
    "prefecture": "埼玉",
    "locality": "川越",
    "moods": [
      "sweet",
      "roomy",
      "air"
    ],
    "picks": [
      "イタリアンジェラート"
    ],
    "lead": "川越のジェラート。店内と、オープンテラス。",
    "story": "公式は、店内だけでなくオープンテラスでもくつろげる、と書いている。ジェラートはイタリアの機器で作る自家製。亀屋栄泉の別館。営業は 11:00〜17:00。夏と冬は水曜が休み。",
    "address": "埼玉県川越市幸町5-6",
    "access": "川越一番街の近く。駅からの分数は店舗ページにない。",
    "hours": "11:00〜17:00",
    "closed": "夏期・冬期の水曜",
    "phone": "049-222-0228",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.kawagoe.com/kameyaeisen/nankirou.html"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "ピンは番地の途中まで。入口は、説明の Googleマップ で開く。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "南亀楼の公式サイト",
    "sourceUrl": "https://www.kawagoe.com/kameyaeisen/nankirou.html",
    "lat": 35.9231,
    "lng": 139.482117,
    "pinRough": true,
    "mapsStars": 3.7,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "smiley",
    "checked": "2026-10-31",
    "name": "古民家カフェ SMILEY",
    "kana": "スマイリー",
    "prefecture": "埼玉",
    "locality": "川越",
    "moods": [
      "house",
      "sweet",
      "meal",
      "roomy",
      "air"
    ],
    "picks": [
      "パンケーキ",
      "ハンバーガー"
    ],
    "lead": "移築した古民家。縁側とテラス。今は土日だけ。",
    "story": "川越市のページは、江戸時代後期の旧戸田家住宅を移築した建物で、店内は古民家のまま、縁側もある、と書いている。テラスはペット同伴ができる。令和8年8月29日から、古民家カフェ SMILEY は土日だけの営業。平日の食堂・伊佐沼庵は、当分休んでいる。",
    "address": "埼玉県川越市鴨田922-1",
    "access": "川越市鴨田。駅からの分数は市のページにない。",
    "hours": "土・日 11:00〜17:00。土日に続く祝日も営業",
    "closed": "月〜金。令和8年8月23日以降、平日の営業は休止",
    "phone": "049-226-3780",
    "links": [
      {
        "label": "川越市の案内",
        "href": "https://www.city.kawagoe.saitama.jp/kurashi/nogyo/1003190/1003181/1003186.html"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "市のページの更新日は2026年8月21日。",
      "ピンは番地の途中まで。入口は、説明の Googleマップ で開く。"
    ],
    "train": false,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "川越市の伊佐沼庵・SMILEY のページ",
    "sourceUrl": "https://www.city.kawagoe.saitama.jp/kurashi/nogyo/1003190/1003181/1003186.html",
    "lat": 35.928619,
    "lng": 139.515213,
    "pinRough": true,
    "mapsStars": 4,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "wawa",
    "kind": "izakaya",
    "checked": "2026-10-31",
    "name": "WAWA",
    "kana": "ワワ",
    "prefecture": "埼玉",
    "locality": "川越",
    "moods": [
      "retro",
      "meal",
      "view",
      "air"
    ],
    "picks": [
      "うなぎ飯",
      "蕎麦御膳",
      "そば茶のミルクプリン"
    ],
    "lead": "川越一番街の2階。空中階から小江戸を見る。",
    "story": "公式は、小江戸を見渡す空間で、うなぎ飯と老舗の蕎麦を出す、と書いている。うなぎは直火で炙り、俵ご飯に乗せる。蕎麦つゆは50年継ぎ足している、ともある。昼は 11:30〜15:00、月曜休み。",
    "address": "埼玉県川越市元町1-15-3 2F",
    "access": "川越一番街。駅からの分数は店舗ページにない。",
    "hours": "昼 11:30〜15:00",
    "closed": "月曜",
    "phone": "",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://wawa-cafe.jp/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "一番街の加盟店一覧には、夜 17:00〜21:00、ラストオーダーは閉店30分前、ともある。公式サイトの抜粋では昼の時間だけ確認した。",
      "ピンは番地の途中まで。入口は、説明の Googleマップ で開く。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "WAWA の公式サイト",
    "sourceUrl": "https://wawa-cafe.jp/",
    "lat": 35.924648,
    "lng": 139.483246,
    "pinRough": true,
    "mapsStars": 3.6,
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
    "access": "鎌倉市由比ガ浜。駅からの分数は店舗ページにない。",
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
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "hanayashiki",
    "checked": "2026-10-31",
    "name": "古民家cafe×beer 花やしき",
    "kana": "ハナヤシキ",
    "prefecture": "神奈川",
    "locality": "瀬谷",
    "moods": [
      "house",
      "morning",
      "air"
    ],
    "lead": "明治から150年の家。縁側と、池の音。",
    "story": "公式は、明治から150年以上続く家で、縁側に風が通り、池のせせらぎがある、と書いている。席は12。個室がある。水〜金は 10:00〜15:30、土曜は 9:00〜15:00。月・火・日が休みで、不定休があるので Instagram で見る、ともある。",
    "address": "神奈川県横浜市瀬谷区竹村町24-1",
    "access": "瀬谷駅からバスで竹村町、停留所から徒歩5分。",
    "hours": "水〜金 10:00〜15:30（15:00 ラストオーダー）／土 9:00〜15:00（14:30 ラストオーダー）",
    "closed": "月・火・日。不定休あり",
    "phone": "045-301-0090",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://kominkacafe-beer-hanayashiki.com/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "時間外は電話。予約は要相談、と公式。",
    "parking": "7台",
    "signature": "",
    "notes": [
      "不定休は公式Instagramで確認、とページにある。",
      "ピンは番地の途中まで。入口は、説明の Googleマップ で開く。"
    ],
    "train": true,
    "car": true,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "花やしきの公式サイト",
    "sourceUrl": "https://kominkacafe-beer-hanayashiki.com/",
    "lat": 35.487022,
    "lng": 139.471329,
    "pinRough": true,
    "mapsStars": 4.1,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "kyuemon",
    "checked": "2026-10-31",
    "name": "久右衛門邸",
    "kana": "キュウエモンテイ",
    "prefecture": "神奈川",
    "locality": "東戸塚",
    "moods": [
      "house",
      "air"
    ],
    "lead": "東戸塚の古民家。カフェは 11時から18時。",
    "story": "公式のカフェ案内は、横浜の古民家で過ごすやさしい時間、と書いている。カフェは 11:00〜18:00、ラストオーダー 17:00。商品がなくなれば早く閉める。月曜と火曜が休みで、祝日は営業。変則の休みはブログと Instagram。",
    "address": "神奈川県横浜市戸塚区名瀬町2026",
    "access": "横浜市戸塚区名瀬町。駅からの分数はカフェのページにない。",
    "hours": "11:00〜18:00（17:00 ラストオーダー）",
    "closed": "月・火（祝日は営業）。変則休業あり",
    "phone": "",
    "links": [
      {
        "label": "公式のカフェ案内",
        "href": "https://kyuemon.jp/cafe/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "同じサイトの別案内に、ランチとディナーの時間と電話がある。カフェの欄とは分けて読む。"
    ],
    "train": false,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "久右衛門邸のカフェ案内",
    "sourceUrl": "https://kyuemon.jp/cafe/",
    "lat": 35.434265,
    "lng": 139.533905,
    "mapsStars": 4.4,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "mario",
    "checked": "2026-10-31",
    "name": "カフェマリオ",
    "kana": "カフェマリオ",
    "prefecture": "栃木",
    "locality": "宇都宮",
    "moods": [
      "house",
      "meal",
      "late",
      "air"
    ],
    "picks": [
      "手加減なしのジンジャーシロップ"
    ],
    "lead": "昭和元年の古民家。梁と床の間が残っている。",
    "story": "公式は、昭和元年に建てられた古民家で、天井の梁や床の間が残る、と書いている。看板は自家製のジンジャーシロップと、生姜を使った食事。営業は 11:30〜22:00、ラストオーダー 21:00。火曜が休み。",
    "address": "栃木県宇都宮市昭和2-9-20",
    "access": "東武宇都宮駅から徒歩10分。大通り県庁前のバス停からも徒歩10分。",
    "hours": "11:30〜22:00（21:00 ラストオーダー）",
    "closed": "火曜",
    "phone": "028-622-5666",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://cafe-mario.net/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "11台。駐輪場あり",
    "signature": "",
    "notes": [
      "クロッフル、タコライス、月替わりの食事は、ページでは期間の付いた案内。通年の名前としてはジンジャーシロップだけにした。"
    ],
    "train": true,
    "car": true,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "カフェマリオの公式サイト",
    "sourceUrl": "https://cafe-mario.net/",
    "lat": 36.566986,
    "lng": 139.878891,
    "mapsStars": 4.1,
    "mapsChecked": "2026-10-31"
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
    "access": "千駄木。駅からの分数は店舗ページにない。",
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
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "halekura",
    "checked": "2026-10-31",
    "name": "Café 晴蔵",
    "kana": "カフェハレクラ",
    "prefecture": "東京",
    "locality": "浅草",
    "moods": [
      "house",
      "sweet",
      "morning",
      "linger",
      "air"
    ],
    "picks": [
      "フレンチトースト",
      "サイフォンコーヒー"
    ],
    "lead": "観音裏の日本家屋。吹き抜けの2階に18席。",
    "story": "公式は、古い日本家屋を直し、入ると木の温かみと吹き抜けがある、と書いている。メインの席は2階で18席。朝7時からモーニングがあり、バケットのフレンチトーストと、サイフォンのコーヒーを出している。",
    "address": "東京都台東区浅草3-34-2",
    "access": "つくばエクスプレス浅草駅から徒歩8分。",
    "hours": "7:00〜16:00",
    "closed": "木曜",
    "phone": "03-6802-3223",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://cafehalekura.com/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "可能な範囲で電話予約を受ける、と公式。",
    "parking": "店の駐車場はない。周辺の有料駐車場、と案内",
    "signature": "",
    "notes": [],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "Café 晴蔵の公式サイト",
    "sourceUrl": "https://cafehalekura.com/",
    "lat": 35.717339,
    "lng": 139.796188,
    "mapsStars": 4.5,
    "mapsChecked": "2026-10-31"
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
    "access": "清澄白河駅。徒歩の分数は店舗ページにない。",
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
    "mapsChecked": "2026-10-31"
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
    "id": "makimaki",
    "checked": "2026-10-31",
    "name": "薪まきカフェ",
    "kana": "マキマキカフェ",
    "prefecture": "東京",
    "locality": "千歳台",
    "moods": [
      "house",
      "morning",
      "linger",
      "air"
    ],
    "lead": "世田谷の、古民家風の席。カウンターと座敷。",
    "story": "公式は古民家風のカフェと名乗り、店内のインテリアやディスプレイから刺激を受け取ってほしい、と書いている。席は18で、カウンターと座敷。9:30〜18:30、ラストオーダー 18:00。定休日は不定休。夜は予約があれば 21:00 まで、ともある。",
    "address": "東京都世田谷区千歳台6-8-9",
    "access": "京王線 千歳烏山駅から徒歩20分。小田急線 祖師ヶ谷大蔵駅から徒歩20分。小田急バス 榎バス停から徒歩5分。",
    "hours": "9:30〜18:30（18:00 ラストオーダー）",
    "closed": "不定休。カレンダーで確認、と公式",
    "phone": "03-5969-8544",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://makimakicafe.com/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "夜は予約があれば 21:00 まで、と公式。",
    "parking": "駐車場はない、と公式",
    "signature": "",
    "notes": [
      "通常の閉店は 18:30。21:00 までは予約のときだけ、と公式。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "薪まきカフェの公式サイト",
    "sourceUrl": "https://makimakicafe.com/",
    "lat": 35.656975,
    "lng": 139.606339,
    "mapsStars": 4.6,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "tokisora",
    "checked": "2026-10-31",
    "name": "ガーデンカフェ ときそら",
    "kana": "トキソラ",
    "prefecture": "東京",
    "locality": "学芸大学",
    "moods": [
      "view",
      "meal",
      "air"
    ],
    "lead": "学芸大学の住宅街。自分たちで手入れする庭を見る席。",
    "story": "公式は、商店街を抜けた住宅街のガーデンカフェで、毎日違う庭を眺めながら過ごす、と書いている。庭は自分たちで手入れしている。営業時間の欄は 11:00〜17:00 と、2026年8月1日からは 11:00〜16:30、の両方が同じページにある。",
    "address": "東京都世田谷区野沢3-14-1",
    "access": "東急東横線 学芸大学駅から徒歩12分。",
    "hours": "ページには 11:00〜17:00（16:00 ラストオーダー、ドリンク 16:30）と、2026年8月1日からは 11:00〜16:30（15:30、ドリンク 16:00）の両方が書いてある",
    "closed": "月・日・祝",
    "phone": "03-6805-2174",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.tokisora.net/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "予約は電話、と公式。",
    "parking": "敷地の駐車場はない。最寄りのコインパーキングは下馬6-21-9、徒歩約2分、と案内",
    "signature": "",
    "notes": [
      "2026年10月30日の案内は、その日は通常どおり、とも書いている。出かける前にページを見る。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "ガーデンカフェ ときそらの公式サイト",
    "sourceUrl": "https://www.tokisora.net/",
    "lat": 35.629963,
    "lng": 139.676285,
    "mapsStars": 4.7,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "noie",
    "checked": "2026-10-31",
    "kind": "izakaya",
    "name": "のいえ",
    "kana": "ノイエ",
    "prefecture": "東京",
    "locality": "神楽坂",
    "moods": [
      "house",
      "linger",
      "late",
      "meal",
      "air"
    ],
    "lead": "神楽坂の路地の一軒家。自分の家でくつろぐように、と公式。",
    "story": "公式は、神楽坂の路地裏の一軒家で、都会の喧騒から離れ、日本酒と肴をゆったり、自分の家でくつろぐような時間、と書いている。園芸の品も置いている。時間は 11:30〜23:30 で、変わることがある、ともある。",
    "address": "東京都新宿区神楽坂6-23",
    "access": "神楽坂。駅からの分数は店舗ページにない。",
    "hours": "11:30〜23:30",
    "closed": "店舗ページに定休日の記載はない",
    "phone": "03-6770-0634",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://noie.tokyo/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "営業時間は変わることがある、と公式。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "のいえの公式サイト",
    "sourceUrl": "https://noie.tokyo/",
    "lat": 35.703701,
    "lng": 139.737091,
    "mapsStars": 4.3,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "hiranuma",
    "checked": "2026-10-31",
    "name": "古民家ひらぬま",
    "kana": "コミンカヒラヌマ",
    "prefecture": "埼玉",
    "locality": "飯能・名栗",
    "moods": [
      "house",
      "meal",
      "sweet",
      "air"
    ],
    "picks": [
      "石窯のナポリピッツァ",
      "自家製ジェラート"
    ],
    "lead": "名栗の、築130年。明治の座敷でピッツァ。",
    "story": "公式は、飯能・名栗の築百三十年の古民家で、明治の意匠を残す母屋は埼玉県と飯能市の景観重要建造物、と書いている。座敷で石窯のナポリピッツァとパスタを出し、古民家の一角で自家製ジェラートも売っている。",
    "address": "埼玉県飯能市上名栗201",
    "access": "名栗。駅からの分数は店舗ページにない。",
    "hours": "10:30〜16:30（16:00 ラストオーダー）",
    "closed": "火・水は不定休",
    "phone": "042-978-6998",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://kominka-hiranuma.com/"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "土日祝や紅葉の時期は予約がおすすめ、と公式。席があれば予約なしでも入れる。",
    "parking": "",
    "signature": "",
    "notes": [
      "アフタヌーンティーなど、2日前までの電話予約が要るメニューがある、と公式。"
    ],
    "train": false,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "古民家ひらぬまの公式サイト",
    "sourceUrl": "https://kominka-hiranuma.com/",
    "lat": 35.910126,
    "lng": 139.1465,
    "pinRough": true,
    "mapsStars": 4.5,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "yururi",
    "checked": "2026-10-31",
    "name": "きょうのごはん ゆるりCafe",
    "kana": "ユルリカフェ",
    "prefecture": "埼玉",
    "locality": "川越",
    "moods": [
      "house",
      "sweet",
      "air"
    ],
    "picks": [
      "ジェナーコ",
      "レアチーズケーキ"
    ],
    "lead": "連雀町。古民家を直したカフェで、自家製のきなこアイス。",
    "story": "公式は、蓮馨寺から歩いてすぐ、小江戸川越の古民家をリノベーションしたカフェ、と書いている。15時からのカフェタイムに、自家製のきなこアイスクリームと、季節のケーキ。ジェナーコは京都丹波の黒豆ときな粉を練り込んだアイス、とある。",
    "address": "埼玉県川越市連雀町32-1",
    "access": "東武東上線 川越市駅から徒歩15分。西武新宿線 本川越駅東口から徒歩10分。",
    "hours": "平日 10:30〜16:00（15:00 ラストオーダー）／土日祝 10:30〜18:00（17:30 ラストオーダー）",
    "closed": "不定休",
    "phone": "049-227-9133",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.kyounogohan-yururicafe.com/cafe.html"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "電話。ホームページを見たと伝えるとスムーズ、と公式。",
    "parking": "",
    "signature": "",
    "notes": [
      "営業時間の見出しは「ただいま」。変わる前提で書かれている。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "ゆるりCafe の公式サイト",
    "sourceUrl": "https://www.kyounogohan-yururicafe.com/cafe.html",
    "lat": 35.920006,
    "lng": 139.481918,
    "pinRough": true,
    "mapsStars": 4.3,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "yamaboushi",
    "checked": "2026-10-31",
    "name": "古民家カフェやまぼうし",
    "kana": "ヤマボウシ",
    "prefecture": "埼玉",
    "locality": "川越・笠幡",
    "moods": [
      "house",
      "meal"
    ],
    "lead": "笠幡。金曜と土曜だけの古民家カフェ。",
    "story": "公式は古民家カフェと名乗り、自然の中で過ごす場所、と書いている。カフェは金曜と土曜の 10:00〜17:00。ランチの 11:00〜14:00 は完全予約。2024年12月7日に開いた、とページにある。",
    "address": "埼玉県川越市笠幡933",
    "access": "笠幡。駅からの分数は店舗ページにない。",
    "hours": "金・土 10:00〜17:00",
    "closed": "日〜木",
    "phone": "049-232-0319",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://cafe-yamaboushi.com/"
      }
    ],
    "reservation": "required",
    "reservationNote": "ランチは完全予約。電話 049-232-0319。",
    "parking": "",
    "signature": "",
    "notes": [],
    "train": false,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "古民家カフェやまぼうしの公式サイト",
    "sourceUrl": "https://cafe-yamaboushi.com/",
    "lat": 35.919369,
    "lng": 139.415512,
    "mapsStars": 4.9,
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
    "access": "横瀬。駅からの分数は店舗ページにない。",
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
    "train": false,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "茶屋武甲の公式サイト",
    "sourceUrl": "https://chaya-buko.skomaru.com/",
    "lat": 35.985123,
    "lng": 139.099686,
    "mapsStars": 4.6,
    "mapsChecked": "2026-10-31"
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
    "id": "waniwa",
    "checked": "2026-10-31",
    "name": "和庭cafe",
    "kana": "ワニワカフェ",
    "prefecture": "埼玉",
    "locality": "行田",
    "moods": [
      "house",
      "view",
      "meal"
    ],
    "lead": "行田の日本家屋。十畳二間と、庭の向こうの富士。",
    "story": "公式は、天然木材の日本家屋で、店内は和の十畳二間、天気がよければ富士山と敷地の日本庭園が見える、と書いている。10:00〜16:00、ラストオーダー 15:00。金・土が休み。駐車場は約20台。",
    "address": "埼玉県行田市北河原1178",
    "access": "旧北河原小学校から徒歩約5分。最寄り駅からは車で約20〜30分、と公式。",
    "hours": "10:00〜16:00（15:00 ラストオーダー）",
    "closed": "金・土。臨時休業は Instagram",
    "phone": "048-594-6041",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.waniwa-cafe.com/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "約20台",
    "signature": "",
    "notes": [
      "営業電話は断っている。用件はメール、と公式。"
    ],
    "train": false,
    "car": true,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "和庭cafe の公式サイト",
    "sourceUrl": "https://www.waniwa-cafe.com/",
    "lat": 36.188576,
    "lng": 139.43605,
    "mapsStars": 4.7,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "umon",
    "checked": "2026-10-31",
    "name": "浪漫茶房 右門",
    "kana": "ロマンサボウウモン",
    "prefecture": "埼玉",
    "locality": "川越",
    "moods": [
      "retro",
      "house",
      "meal",
      "sweet"
    ],
    "picks": [
      "芋おこわ",
      "あんみつ"
    ],
    "lead": "川越一番街。奥に深い建物の、1階と2階座敷。",
    "story": "菓匠右門の会社案内は、蔵造りの町並みの一番街店に茶房を併設し、城下町独特の奥に深い建物で食事ができる、と書いている。1階はテーブル20名、2階は座敷20名とテーブル18名。茶房は 11:00〜16:00 で、芋おこわがなくなり次第終わる。当面は短縮営業、ともある。",
    "address": "埼玉県川越市幸町1-6",
    "access": "川越一番街。駅からの分数は会社案内にない。",
    "hours": "茶房 11:00〜16:00（芋おこわがなくなり次第終了）。菓子売場 10:00〜18:00",
    "closed": "なし（年末年始を除く）。茶房は当面、短縮営業",
    "phone": "049-225-6001",
    "links": [
      {
        "label": "菓匠右門の会社案内",
        "href": "https://www.imokoi.com/company"
      }
    ],
    "reservation": "recommended",
    "reservationNote": "優先して案内できる予約席がある、と案内。",
    "parking": "近くの有料駐車場、と案内",
    "signature": "",
    "notes": [
      "茶房は短縮営業中、と会社案内。菓子売場の時間とは別。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "confirm",
    "sourceLabel": "菓匠右門の会社案内",
    "sourceUrl": "https://www.imokoi.com/company",
    "lat": 35.92202,
    "lng": 139.482559,
    "pinRough": true,
    "mapsStars": 4,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "umedaya",
    "checked": "2026-10-31",
    "name": "お豆ふ処 うめだ屋",
    "kana": "ウメダヤ",
    "prefecture": "埼玉",
    "locality": "長瀞",
    "moods": [
      "house",
      "meal",
      "sweet"
    ],
    "picks": [
      "おとうふランチ",
      "おからドーナツ"
    ],
    "lead": "長瀞。築100年の養蚕農家を、半年かけて直した。",
    "story": "公式は、築100年の養蚕農家の古民家を夫婦で半年かけて再生し、2009年に開いた、と書いている。売店は 10:30〜17:30。ランチは 11:30〜14:00、カフェは 14:00〜17:00、ラストオーダー 16:30。水曜が休みで、祝日は営業する。",
    "address": "埼玉県秩父郡長瀞町長瀞268",
    "access": "長瀞。駅からの分数は店舗ページにない。",
    "hours": "売店 10:30〜17:30／ランチ 11:30〜14:00／カフェ 14:00〜17:00（16:30 ラストオーダー）",
    "closed": "水曜（祝日は営業）",
    "phone": "0494-66-4883",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.umedatofu.com/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "席の予約はしていない。おとうふランチの取り置きは電話かメール、と公式。なくなり次第、ランチは終わる。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "うめだ屋の公式サイト",
    "sourceUrl": "https://www.umedatofu.com/",
    "lat": 36.094967,
    "lng": 139.10228,
    "pinRough": true,
    "mapsStars": 4.3,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "blanco",
    "checked": "2026-10-31",
    "name": "紡ぎの家大島 cafe BLANCO",
    "kana": "ツムギノイエオオシマ",
    "prefecture": "埼玉",
    "locality": "伊奈",
    "moods": [
      "house",
      "linger",
      "air"
    ],
    "lead": "伊奈。築200年、国登録有形文化財の母屋。",
    "story": "公式は、築200年の古民家で、国登録有形文化財「大島家住宅主屋」、と書いている。来た人の感想として「古民家は落ち着く」が多い、ともある。2026年8月18日から、営業は火〜金の 11:00〜17:00。土・日・月のカフェは休みで、その日はホールのレンタルができる。",
    "address": "埼玉県北足立郡伊奈町小室11064",
    "access": "ニューシャトル伊奈中央駅から徒歩。分数は店舗ページの抜粋にはない。",
    "hours": "火〜金 11:00〜17:00",
    "closed": "土・日・月",
    "phone": "048-796-0445",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://tumuginoie-ooshima.jimdofree.com/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "県の観光ページには、これより前の休み方が残っている。時間は店のページの、2026年8月18日からの案内。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "紡ぎの家大島の公式サイト",
    "sourceUrl": "https://tumuginoie-ooshima.jimdofree.com/",
    "lat": 36.000488,
    "lng": 139.60556,
    "mapsStars": 4.1,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "miyabi",
    "checked": "2026-10-31",
    "name": "古民家カフェ雅",
    "kana": "ミヤビ",
    "prefecture": "神奈川",
    "locality": "相模原",
    "moods": [
      "house",
      "air"
    ],
    "picks": [
      "自家焙煎コーヒー"
    ],
    "lead": "青野原。築100年以上の実家を、一年半かけて直した。",
    "story": "公式は、マスターの実家である築100年以上の古民家を、約一年半かけて自分たちで直し、カフェにした、と書いている。自家焙煎のコーヒーをネルで淹れる。金〜日の 11:00〜17:00、ラストオーダー 16:00。月〜木が休みで、ほかにも不定休がある。",
    "address": "神奈川県相模原市緑区青野原997",
    "access": "神奈川中央交通「上原」バス停からすぐ。国道413号の梶野交差点から旧道へ約1キロ。",
    "hours": "金〜日 11:00〜17:00（16:00 ラストオーダー）",
    "closed": "月〜木。ほか不定休は Instagram",
    "phone": "090-2125-0382",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.kominkacafe-miyabi.com/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "店舗横に8台程度",
    "signature": "",
    "notes": [],
    "train": false,
    "car": true,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "古民家カフェ雅の公式サイト",
    "sourceUrl": "https://www.kominkacafe-miyabi.com/",
    "lat": 35.563412,
    "lng": 139.199219,
    "mapsStars": 4.4,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "sakakan",
    "checked": "2026-10-31",
    "name": "サカカンカフェ",
    "kana": "サカカンカフェ",
    "prefecture": "茨城",
    "locality": "古河",
    "moods": [
      "house",
      "meal"
    ],
    "picks": [
      "酵素玄米ご膳",
      "酵素玄米のキーマカレー"
    ],
    "lead": "古河。天保元年から続く酒貫の家を、カフェにしている。",
    "story": "公式は、古河市中田で天保元年から郵便や醤油蔵、酒屋を営んだ「酒貫」が、2018年にカフェとして蘇った古民家、と書いている。酵素玄米の食事を出す。11:30〜17:00。ランチのラストオーダーは 14:30、カフェは 16:00。木・日が休み。",
    "address": "茨城県古河市中田2161-7",
    "access": "古河市中田。駅からの分数は店舗ページにない。",
    "hours": "11:30〜17:00（ランチ 14:30、カフェ 16:00 ラストオーダー）",
    "closed": "木・日",
    "phone": "0280-23-2682",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://sakakancafe.com/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "あり。敷地の奥の共用駐車場も使える、と公式",
    "signature": "",
    "notes": [
      "臨時休業をカレンダーに書く。2026年10月30日と11月30日は臨時休業、とページにある。"
    ],
    "train": false,
    "car": true,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "サカカンカフェの公式サイト",
    "sourceUrl": "https://sakakancafe.com/",
    "lat": 36.148487,
    "lng": 139.709763,
    "pinRough": true,
    "mapsStars": 4.4,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "yumeya",
    "checked": "2026-10-31",
    "name": "古民家カフェ yumeya",
    "kana": "ユメヤ",
    "prefecture": "栃木",
    "locality": "那須",
    "moods": [
      "forest",
      "house",
      "air"
    ],
    "lead": "那須高原の雑木林。染織の工房が隣にある古民家。",
    "story": "公式は、那須高原の雑木林のなかのスローフードのカフェで、草木染と手織りの工房も併設、と書いている。10:00〜16:30、ラストオーダー 16:00。水曜と第3木曜が休み。祝日なら営業して翌日が休み。12月〜3月は水・木が休み。",
    "address": "栃木県那須郡那須町高久乙1846-92",
    "access": "東北自動車道 那須インターから車で15分。",
    "hours": "10:00〜16:30（16:00 ラストオーダー）",
    "closed": "水・第3木（祝日は営業し、翌日休み）。12月〜3月は水・木",
    "phone": "0287-78-3272",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://nasuyume.com/about"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "あり",
    "signature": "",
    "notes": [],
    "train": false,
    "car": true,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "yumeya の公式サイト",
    "sourceUrl": "https://nasuyume.com/about",
    "lat": 37.049603,
    "lng": 139.982803,
    "pinRough": true,
    "mapsStars": 4.3,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "vmg",
    "checked": "2026-10-31",
    "name": "VMG CAFE",
    "kana": "ブイエムジーカフェ",
    "prefecture": "千葉",
    "locality": "佐原",
    "moods": [
      "house",
      "retro",
      "sweet",
      "view",
      "air"
    ],
    "picks": [
      "サツマイモモンブラン"
    ],
    "lead": "佐原。安政2年の県指定文化財。階段の上は畳。",
    "story": "NIPPONIA佐原の公式は、重要伝統的建造物群保存地区の中央にある安政2年（1855年）の県指定文化財をカフェにした、と書いている。1階には昔の金庫と箱階段が残り、階段の上は畳。小野川を見る席がある。スイーツに自家製のサツマイモモンブラン、ともある。",
    "address": "千葉県香取市佐原イ1720",
    "access": "小野川沿いの歴史地区。駅からの分数はカフェの案内にない。",
    "hours": "月・水〜金 11:00〜16:00／土・日・祝 11:00〜16:30",
    "closed": "火曜",
    "phone": "0120-210-289",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://www.nipponia-sawara.jp/cafe"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "",
    "signature": "",
    "notes": [
      "ページ上部の住所は佐原イ1708-2、カフェの店舗情報は佐原イ1720。ここは店舗情報の番地。電話は VMG の総合窓口。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "NIPPONIA佐原の VMG CAFE 案内",
    "sourceUrl": "https://www.nipponia-sawara.jp/cafe",
    "lat": 35.888771,
    "lng": 140.497528,
    "mapsStars": 4.2,
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
    "id": "bach",
    "checked": "2026-10-31",
    "name": "カフェ バッハ",
    "kana": "カフェバッハ",
    "prefecture": "東京",
    "locality": "日本堤",
    "moods": [
      "retro",
      "sweet",
      "air"
    ],
    "lead": "日本堤。バッハの音楽が流れる、とGoogleマップ。星は4.4。",
    "story": "公式の時間は 10:30〜18:30、ラストオーダー 18:15。定休日は毎週火曜と、第2・第4水曜。駐車場はない。Googleマップは、昔ながらの雰囲気でバッハの音楽が流れ、コーヒーやケーキを出す、と書いている。",
    "address": "東京都台東区日本堤1-23-9",
    "access": "日本堤。駅からの分数は公式の案内にない。",
    "hours": "10:30〜18:30（18:15 ラストオーダー）",
    "closed": "火曜、第2・第4水曜",
    "phone": "03-3875-2669",
    "links": [
      {
        "label": "公式サイト",
        "href": "https://bach-kaffee.co.jp/"
      }
    ],
    "reservation": "none",
    "reservationNote": "",
    "parking": "店の駐車場はない。近くの有料駐車場、と公式",
    "signature": "",
    "notes": [
      "Googleマップの星4.4は、2026年10月31日に店名の横へ出ていた数字。"
    ],
    "train": true,
    "car": false,
    "seasonal": false,
    "confidence": "official",
    "sourceLabel": "カフェ バッハの公式サイト。店内の一文はGoogleマップ",
    "sourceUrl": "https://bach-kaffee.co.jp/",
    "lat": 35.726841,
    "lng": 139.800385,
    "mapsStars": 4.4,
    "mapsChecked": "2026-10-31"
  },
  {
    "id": "ai",
    "checked": "2026-10-31",
    "name": "古民家カフェ あい",
    "kana": "アイ",
    "prefecture": "埼玉",
    "locality": "南浦和",
    "moods": [
      "house"
    ],
    "lead": "南浦和の古民家カフェ。Googleマップの星は4.7。",
    "story": "店名は古民家カフェ。時間は食べログが、木・金・土 10:00〜16:00、月・火・水・日が休み。駐車場は3台、予約はできる、とある。Googleマップは2026年10月31日に星4.7と出していた。店の固定サイトは見当たらない。",
    "address": "埼玉県さいたま市南区文蔵4-8-6",
    "access": "JR南浦和駅から徒歩約18分。",
    "hours": "木・金・土 10:00〜16:00",
    "closed": "月・火・水・日",
    "phone": "048-861-6123",
    "links": [],
    "reservation": "recommended",
    "reservationNote": "予約可、と食べログ。",
    "parking": "3台、と食べログ",
    "signature": "",
    "notes": [
      "Googleマップの星4.7は、2026年10月31日に店名の横へ出ていた数字。"
    ],
    "train": true,
    "car": true,
    "seasonal": false,
    "confidence": "guide",
    "sourceLabel": "食べログの店舗情報。星はGoogleマップ",
    "sourceUrl": "https://tabelog.com/saitama/A1101/A110102/11060137/",
    "lat": 35.839401,
    "lng": 139.671249,
    "mapsStars": 4.7,
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
  }
];
