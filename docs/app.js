const CATEGORIES = [
  { id: "all", label: "すべて" },
  { id: "painting", label: "絵画" },
  { id: "scenery", label: "景色" },
  { id: "craft", label: "工芸" },
  { id: "tokyo", label: "東京" },
  { id: "millet", label: "ミレー" },
  { id: "hammershoi", label: "ハンマースホイ" },
  { id: "gogh", label: "ゴッホ" },
  { id: "munch", label: "ムンク" },
  { id: "roussel", label: "ルーセル" },
  { id: "rousseau", label: "ルソー" },
  { id: "polenov", label: "ポレーノフ" },
  { id: "thaulow", label: "タウロウ" },
  { id: "friedrich", label: "フリードリヒ" },
  { id: "uhde", label: "ウーデ" },
  { id: "loiseau", label: "ロワゾー" },
];

const PAINTINGS = [
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Jean-Fran%C3%A7ois%20Millet%20-%20Gleaners%20-%20Google%20Art%20Project%202.jpg?width=2000",
    artist: "ジャン＝フランソワ・ミレー",
    title: "落穂拾い",
    year: "1857",
    tags: ["painting", "millet"],
    note: "刈り入れ後の畑で、残った穂を拾う貧しい女たちを描いた。当時のサロンでは「危険な社会派」と非難されたが、ミレーは農民の労働そのものを尊厳ある主題だと考えていた。遠景の豊かな収穫と手前の労苦を対比させ、バルビゾン村での観察がそのまま画面になっている。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Jean-Fran%C3%A7ois%20Millet%20-%20The%20Angelus%20-%20Google%20Art%20Project.jpg?width=2000",
    artist: "ジャン＝フランソワ・ミレー",
    title: "晩鐘",
    year: "1857–59",
    tags: ["painting", "millet"],
    note: "畑仕事の合間に、教会の鐘に合わせて祈る夫婦。ミレー自身も農民の家に生まれ、信仰と労働が日常に溶け込む景色を知っていた。後年ナポレオン3世周辺が買い求めるほど人気になり、「フランスの田園の祈りの像」として広がった。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Jean-Fran%C3%A7ois%20Millet%20-%20The%20Sower%20-%20Google%20Art%20Project.jpg?width=2000",
    artist: "ジャン＝フランソワ・ミレー",
    title: "種まく人",
    year: "1850頃",
    tags: ["painting", "millet"],
    note: "大きな歩幅で種を撒く男は、ミレーがバルビゾンで繰り返し描いたモチーフ。夜明けか黄昏の斜光のなか、労働する身体そのものが英雄のように見える。ゴッホが後に何度も模写したことでも知られ、「種を蒔く人」は近代画家の象徴にもなった。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Vilhelm%20Hammershoi%20-%20Interieur%20mit%20Rueckenansicht%20einer%20Frau%20-%201903-1904%20-%20Randers%20Kunstmuseum.jpg?width=2000",
    artist: "ヴィルヘルム・ハンマースホイ",
    title: "背を向けた女性のいる室内",
    year: "1903–04",
    tags: ["painting", "hammershoi"],
    note: "コペンハーゲンの自宅で、妻イーダを後ろ姿だけで描いた一連の室内画のひとつ。顔を見せず、家具も最小限にし、灰色の静けさだけを残す。ハンマースホイは社交的な喧噪より、光と壁の関係に執着した人で、この絵はその「沈黙の部屋」の典型。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Vilhelm%20Hammersh%C3%B8i%20-%20A%20Room%20in%20the%20Artist%27s%20Home%20in%20Strandgade%2C%20Copenhagen%2C%20with%20the%20Artist%27s%20Wife%20-%20Google%20Art%20Project.jpg?width=2000",
    artist: "ヴィルヘルム・ハンマースホイ",
    title: "ストランゲーゼの部屋と妻",
    year: "1900頃",
    tags: ["painting", "hammershoi"],
    note: "キリストアンスンのストランゲーゼ30番地。ここで彼は数十点の室内を描き、同じドアや窓を光の条件だけ変えて観察した。妻はしばしば背を向け、物語を語らない。都市の騒音のすぐそばで、彼は「音のない写真のような絵」を求めていた。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Stue%20i%20Strandgade%20med%20solskin%20p%C3%A5%20gulvet.jpg?width=2000",
    artist: "ヴィルヘルム・ハンマースホイ",
    title: "床に陽光のある室内",
    year: "1901",
    tags: ["painting", "hammershoi"],
    note: "人物さえいない部屋に、窓からの光だけが落ちる。当初はテーブルも描かれていたが、最終的に光の形だけを残したという分析もある。ハンマースホイにとって室内は舞台装置ではなく、光そのものを測る装置だった。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Van%20Gogh%20-%20Starry%20Night%20-%20Google%20Art%20Project.jpg?width=2000",
    artist: "フィンセント・ファン・ゴッホ",
    title: "星月夜",
    year: "1889",
    tags: ["painting", "gogh"],
    note: "サン＝レミの精神病院に入院中、窓から見える夜と想像上の村を重ねて描いた。渦巻く空は観測というより内面の振動に近い。弟テオへの手紙では星を「死のあとでも行ける場所」のように語っており、不安と希望が同時に渦巻いている。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Vincent%20van%20Gogh%20-%20Wheatfield%20with%20crows%20-%20Google%20Art%20Project.jpg?width=2000",
    artist: "フィンセント・ファン・ゴッホ",
    title: "カラスのいる麦畑",
    year: "1890",
    tags: ["painting", "gogh"],
    note: "オーヴェール＝シュル＝オワーズ時代の末期。暗い空と麦畑、三本の道、飛び立つカラス。自殺直前の「絶望の絵」と長く語られたが、現在は制作順が必ずしも最期ではないとも考えられている。それでも、不安な天候と行き場のない道が、晩年の心の揺れを強く残す。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Vincent%20van%20Gogh%20-%20De%20slaapkamer%20-%20Google%20Art%20Project.jpg?width=2000",
    artist: "フィンセント・ファン・ゴッホ",
    title: "アルルの寝室",
    year: "1888",
    tags: ["painting", "gogh"],
    note: "南仏アルルの「黄色い家」で、自分の部屋を安らぐ場所として描いた。ゴーギャンを迎える直前で、共同生活への期待と緊張が同居していた時期。歪んだ遠近と原色の壁は、落ち着きを求めつつも落ち着ききれないゴッホの部屋そのもの。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Edvard%20Munch%20-%20The%20Girl%20by%20the%20Window%20-%202000.50%20-%20Art%20Institute%20of%20Chicago.jpg?width=2000",
    artist: "エドヴァルド・ムンク",
    title: "窓際の少女",
    year: "1893",
    tags: ["painting", "munch"],
    note: "暗い室内から窓の外を見る少女。ムンクは同年『叫び』も描いており、個人の不安を色と構図で表す「生・愛・死」の主題に入っていた。窓は外界との膜であり、彼女が見ているものは景色というより、夜の心理そのものに近い。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/The%20Reading%20Girl%20%28Th%C3%A9odore%20Roussel%29-07251.jpg?width=2000",
    artist: "テオドール・ルーセル",
    title: "読書する少女",
    year: "1886–87",
    tags: ["painting", "roussel"],
    note: "フランス生まれでロンドンで活動したルーセルの代表作。等身大の裸婦が新聞を読むという組み合わせが、当時の展覧会で「下品な写実」と騒がれた。ホイッスラーの影響下にあり、スキャンダルのあと、彼はテムズの風景や版画へとしだいに移っていく。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/The%20Forest%20in%20Winter%20at%20Sunset%20MET%20DP247630.jpg?width=2000",
    artist: "テオドール・ルソー",
    title: "日没の冬の森",
    year: "1846–67頃",
    tags: ["painting", "rousseau"],
    note: "バルビゾン派の中心人物。何年もかけて同じ森を見つめ、冬の日没の光を積み重ねた大作。サロンに認められにくかった時期、彼はフォンテーヌブローの自然そのものを「神聖な対象」として描き続けた。細部の木肌まで、観察の執念が残る。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Pierre-%C3%A9tienne-th%C3%A9odore%20rousseau%2C%20valle%20a%20tiffauge%2C%201837-44.jpg?width=2000",
    artist: "テオドール・ルソー",
    title: "ティフォージュの谷",
    year: "1837–44頃",
    tags: ["painting", "rousseau"],
    note: "若きルソーが地方の谷を写生し、アトリエで仕上げた風景。理想化されたイタリア風景ではなく、フランスの実在の土地の空気を描こうとする態度がここにある。後のバルビゾンでの活動の、いわば前触れのような絵。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Moscow%20Courtyard%20%28Polenov%2C%201878%29%20-%20Google%20Art%20Project.jpg?width=2000",
    artist: "ワシリー・ポレーノフ",
    title: "モスクワの中庭",
    year: "1878",
    tags: ["painting", "polenov"],
    note: "戦争画家としての期待を受けつつも、ポレーノフが選んだのは日常の中庭だった。子ども、洗濯物、教会の屋根。大きな歴史画ではなく「身近な幸福の断片」を描くことで、ロシア絵画に新しい親密さを持ち込んだ一枚。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Wassilij%20Dimitriewitsch%20Polenow%20004.jpg?width=2000",
    artist: "ワシリー・ポレーノフ",
    title: "草に覆われた池",
    year: "1879",
    tags: ["painting", "polenov"],
    note: "水面と草、木陰の静けさ。ポレーノフは戸外の光を好み、自然のなかに人の気配を小さく置くことが多い。ドラマを誇張せず、夏の午後の温度だけを残すような画面で、彼の温和な観察眼がよく出ている。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Frits%20Thaulow%20-%20Winter%20at%20the%20River%20Simoa%20-%20Google%20Art%20Project.jpg?width=2000",
    artist: "フリッツ・タウロウ",
    title: "シモア川の冬",
    year: "1883頃",
    tags: ["painting", "thaulow"],
    note: "ノルウェーの川の氷と反射を、ほとんど水面だけで構成した作品。タウロウはスケーエン派にも関わり、のちフランスでも川や雪の反射を得意とした。壮大な物語より、水が光を返す一瞬の物質感に執着した画家。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Frits%20Thaulow%20-%20The%20River%20in%20Winter.jpg?width=2000",
    artist: "フリッツ・タウロウ",
    title: "冬の川",
    year: "1890年代",
    tags: ["painting", "thaulow"],
    note: "雪と川岸、冷たい反射。印象派的な筆触で北欧やフランス北部の季節を描き、同時代の画家たちから「水の専門家」と評された。派手な事件のない風景に、季節の湿度だけを丁寧に残している。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Rue%20de%20Montreuil-sur-Mer%20-%20Frits%20Thaulow%20-%201892.jpg?width=2000",
    artist: "フリッツ・タウロウ",
    title: "モントルイユ＝シュル＝メールの通り",
    year: "1892",
    tags: ["painting", "thaulow"],
    note: "フランス北部の町並み。タウロウはノルウェーを離れ、フランスの古い街や運河を好んで描いた。人の気配は少なく、石壁と空の色温度が主役。旅先で見つけた「静かな通り」への愛着が感じられる。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Caspar%20David%20Friedrich%20-%20Wanderer%20above%20the%20sea%20of%20fog.jpg?width=2000",
    artist: "カスパー・ダーヴィト・フリードリヒ",
    title: "雲海の上の旅人",
    year: "1818頃",
    tags: ["painting", "friedrich"],
    note: "背を向けた旅人が霧の海を見つめる、ロマン主義の象徴的イメージ。フリードリヒは人間を風景より小さく置き、自然の崇高さと個人の孤独を同時に見せた。見る者は旅人の背中越しに、自分自身も雲海の縁に立たされる。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Klosterruine%20Eldena%20bei%20Greifswald%20%281824%29%20-%20Caspar%20David%20Friedrich%20%28Alte%20Nationalgalerie%2C%20Berlin%29.jpg?width=2000",
    artist: "カスパー・ダーヴィト・フリードリヒ",
    title: "オークの木立の中の修道院",
    year: "1809–10",
    tags: ["painting", "friedrich"],
    note: "廃墟の修道院と冬の木立、葬列のような人影。若き日に家族の死を経験したフリードリヒにとって、廃墟は単なる古跡ではなく、信仰と死の瞑想の場だった。寒色の空の下で、生の終わりと自然の永続が重なる。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Fritz%20von%20Uhde%20-%20Das%20Tischgebet%20-%20Google%20Art%20Project.jpg?width=2000",
    artist: "フリッツ・フォン・ウーデ",
    title: "食前の祈り",
    year: "1885",
    tags: ["painting", "uhde"],
    note: "貧しい食卓で手を合わせる家族。ウーデは聖書の場面を当代の庶民の生活に移し替えることで知られる。ここでも聖なる出来事ではなく、日常の祈りの瞬間を描き、宗教画を「今の部屋」へ降ろした。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Gustave%20Loiseau%2C%20The%20Village%2C%201912.jpg?width=2000",
    artist: "ギュスターヴ・ロワゾー",
    title: "村",
    year: "1912",
    tags: ["painting", "loiseau"],
    note: "ポスト印象派のロワゾーは、セーヌやノルマンディーの町を格子状の筆触で描いた。有名画家の影に隠れがちだが、霧・雪・村道といった地味な主題を反復し、季節の空気を織物のように積み重ねる画家だった。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Barberini%20August%202023-Gustave%20Loiseau%20-%20Raureif%20in%20Pontoise%2C%201906%20-%20Sammlung%20Hasso%20Plattner.jpg?width=2000",
    artist: "ギュスターヴ・ロワゾー",
    title: "ポントワーズの霧氷",
    year: "1906",
    tags: ["painting", "loiseau"],
    note: "冬のポントワーズ。木々の霧氷と冷たい光を、細かい十字の筆触で輝かせている。ロワゾーは劇的な事件より気象の変化を好み、同じ場所を季節ごとに描き直した。静かな町が、冬だけ別の物質に見える瞬間。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Barberini%20August%202023-Gustave%20Loiseau%20-%20Der%20Strand%20von%20F%C3%A9camp%2C%201910%20-%20Sammlung%20Hasso%20Plattner.jpg?width=2000",
    artist: "ギュスターヴ・ロワゾー",
    title: "フェカンの海岸",
    year: "1910",
    tags: ["painting", "loiseau"],
    note: "ノルマンディーのフェカン。崖と海、風のある空。彼はポン＝タヴァン周辺でも制作したが、ゴーギャンの様式には染まらず、印象派的な光の記録を守り続けた。旅行先の海岸でも、主題はあくまで天候と土地の肌触り。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Mount%20Fuji%20%40%20Lake%20Kawaguchiko%20%2810862992324%29.jpg?width=2000",
    artist: "写真",
    title: "河口湖と富士山",
    year: "現代",
    tags: ["scenery"],
    note: "山梨・河口湖から望む富士。湖面と山体の対称に近い構図は、江戸以来の「名所絵」でも繰り返し描かれた景観の、写真版ともいえる。晴天の稜線が、日本の風景イメージの核になっている。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Lake%20Kawaguchiko%20Sakura%20Mount%20Fuji%204.JPG?width=2000",
    artist: "写真",
    title: "桜と富士・河口湖",
    year: "現代",
    tags: ["scenery"],
    note: "春の桜と富士の組み合わせは、観光写真の定番でありながら、季節の重なりを一目で示す日本的な時間感覚でもある。花の短さと山の永続が、同じ画面に同居している。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/131109%20Kenrokuen%20Kanazawa%20Ishikawa%20pref%20Japan01s3.jpg?width=2000",
    artist: "写真",
    title: "兼六園",
    year: "現代",
    tags: ["scenery"],
    note: "金沢の代表的な大名庭園。「兼六」は宏大・幽邃・人力・蒼古・水泉・眺望の六勝を兼ねるという意味。庭そのものが展示物であり、歩きながら景色が変わるよう設計されている。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Kiyomizu-dera%2C%20Kyoto%2C%20November%202016%20-01.jpg?width=2000",
    artist: "写真",
    title: "清水寺（秋）",
    year: "現代",
    tags: ["scenery"],
    note: "京都・清水寺の秋。舞台造りの建築と紅葉が重なり、参詣の場所であると同時に景観の装置にもなっている。写真は、観光客の視点がそのまま「名所」を更新し続ける例でもある。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Saih%C5%8D-ji%20%28Nishikyo%20Kyoto%29%20hdsr%20Garden%20S5%2091.jpg?width=2000",
    artist: "写真",
    title: "西芳寺（苔寺）の庭",
    year: "現代",
    tags: ["scenery"],
    note: "京都・西芳寺は通称「苔寺」。室町期にさかのぼる庭が、厚い苔の地表に覆われ、緑の質感そのものが主役になる。予約制の静けさも、庭を「見る体験」として際立たせている。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Jomon%20Vessel%20with%20Flame-like%20Ornamentation%2C%20attributed%20provenance%20Umataka%2C%20Nagaoka-shi%2C%20Niigata%2C%20Jomon%20period%2C%203000-2000%20BC%20-%20Tokyo%20National%20Museum%20-%20DSC05620.JPG?width=2000",
    artist: "縄文時代（東京国立博物館）",
    title: "火焔型土器",
    year: "前3000–2000年頃",
    tags: ["craft"],
    note: "新潟・馬高出土とされる火焔型土器。煮炊きの道具でありながら、炎のような突起が過剰なほど装飾的で、実用と造形が分かちがたい。博物館では「日本列島の造形の原点」として語られることが多い。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Large%20dish%20with%20camellia%20design%2C%20Imari%20ware%2C%20Edo%20period%2C%201600s%20AD%2C%20porcelain%2C%20overglaze%20enamel%20-%20Tokyo%20National%20Museum%20-%20Tokyo%2C%20Japan%20-%20DSC09464.jpg?width=2000",
    artist: "伊万里（東京国立博物館）",
    title: "椿文大皿",
    year: "17世紀",
    tags: ["craft"],
    note: "江戸前期の伊万里焼。磁器の白地に色絵の椿。肥前の窯で生まれた磁器は国内だけでなく海外へも渡り、「日本のやきもの」の顔になった。博物館のガラスケースのなかでも、食器であると同時に絵画的な面を持つ。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Tebako%20%28cosmetic%20box%29%20in%20wisteria%20and%20peony%20design%2C%20by%20Kawanobe%20Iccho%20%281830-1910%29%2C%20Japan%2C%20dated%201892%2C%20World%27s%20Columbian%20Exposition%2C%20Chicago%2C%20maki-e%20lacquer%20-%20Tokyo%20National%20Museum%20-%20Tokyo%2C%20Japan%20-%20DSC09249.jpg?width=2000",
    artist: "川之辺一朝（東京国立博物館）",
    title: "藤牡丹蒔絵手箱",
    year: "1892",
    tags: ["craft"],
    note: "明治の蒔絵師・川之辺一朝による手箱。シカゴ万博出品作で、漆と金粉の技術を「日本の工芸」として海外に示した時代の品。化粧箱という私的な道具が、国家の展示物にもなった。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Blade%20for%20a%20Sword%20%28Katana%29%20MET%20DP368606.jpg?width=2000",
    artist: "刀工（メトロポリタン美術館）",
    title: "刀（かたな）",
    year: "江戸時代など",
    tags: ["craft"],
    note: "刀身の曲線と地鉄の肌。武器であると同時に、鍛えと研ぎの技術の結晶として美術品の扱いを受ける。博物館では刃文や銘が読まれ、機能美と鑑賞美が交差する展示の典型。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Rikugien%20Garden%20%289237965732%29.jpg?width=2000",
    artist: "写真",
    title: "六義園",
    year: "現代",
    tags: ["tokyo", "scenery"],
    note: "文京区の大名庭園。和歌の浦などを模した回遊式庭園で、都心にありながら借景と築山で奥行きをつくる。紅葉の時期は特に知られ、「東京のなかの別世界」として親しまれる。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Senso-ji%20Temple%20%40%20Asakusa%20%2813824525803%29.jpg?width=2000",
    artist: "写真",
    title: "浅草寺",
    year: "現代",
    tags: ["tokyo"],
    note: "浅草・浅草寺。雷門から仲見世、本堂へと続く参道は、信仰と繁華が重なる東京の顔のひとつ。建築と人の流れそのものが、都市の「見せ場」になっている。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Meiji-jingu-pathway.jpg?width=2000",
    artist: "写真",
    title: "明治神宮の参道",
    year: "現代",
    tags: ["tokyo", "scenery"],
    note: "原宿・明治神宮。都心のすぐそばに広がる人工の杜と砂利の参道。近代化のなかでつくられた杜が、いまは「自然」として歩かれる逆説も含め、東京の緑の象徴になっている。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo%20Station-5.jpg?width=2000",
    artist: "写真",
    title: "東京駅丸の内駅舎",
    year: "現代",
    tags: ["tokyo"],
    note: "東京駅丸の内口の煉瓦駅舎。大正期の姿を復元した外観は、ビジネス街の玄関であり記念建造物でもある。鉄道のハブが、都市の景観遺産として撮られるようになった例。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Tokio%20Hamarikyu-Garten-20091017-RM-141110.jpg?width=2000",
    artist: "写真",
    title: "浜離宮恩賜庭園",
    year: "現代",
    tags: ["tokyo", "scenery"],
    note: "中央区の浜離宮。潮入の池を持つ旧将軍家の庭で、背後に高層ビルが見える対比が今の見どころ。江戸の庭園技術と、現代東京のスカイラインが同じ視界に入る。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Nezu%20Museum%20Garden%20view%20201805.jpg?width=2000",
    artist: "写真",
    title: "根津美術館の庭",
    year: "現代",
    tags: ["tokyo", "scenery"],
    note: "青山・根津美術館の庭園。東洋古美術の収集で知られる館の、屋外展示ともいえる空間。池と木立が、美術館そのものを「見る場所」から「居る場所」へ広げている。",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Cherry%20blossoms%20in%20Tokyo%2C%20beside%20the%20moat%20of%20the%20Imperial%20Palace.jpg?width=2000",
    artist: "写真",
    title: "皇居外苑の堀と桜",
    year: "現代",
    tags: ["tokyo", "scenery"],
    note: "皇居周辺の堀と桜。政治の中枢の外縁が、花見の場所としても開かれている。水面に映る花と石垣は、都心部で繰り返し撮られる春の景のひとつ。",
  }
];

const HOLD_MS = 45_000;
const layerA = document.getElementById("layer-a");
const layerB = document.getElementById("layer-b");
const noteMeta = document.getElementById("note-meta");
const noteTitle = document.getElementById("note-title");
const noteBody = document.getElementById("note-body");
const dock = document.getElementById("dock");

CATEGORIES.forEach((cat, i) => {
  const btn = document.createElement("button");
  btn.dataset.cat = cat.id;
  btn.textContent = i === 0 ? cat.label : `${i} ${cat.label}`;
  if (i === 0) btn.classList.add("active");
  dock.appendChild(btn);
});

const buttons = [...dock.querySelectorAll("button")];

let category = "all";
let queue = [];
let index = 0;
let usingA = true;
let paused = false;
let autoPlay = true;
let notePinned = false;
let chromeHidden = true;
let timer = 0;
let hideUiTimer = 0;

function categoryLabel(id) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

function paintingsIn(cat) {
  if (cat === "all") return PAINTINGS;
  return PAINTINGS.filter((p) => p.tags.includes(cat));
}

function currentLayer() {
  return usingA ? layerA : layerB;
}

function otherLayer() {
  return usingA ? layerB : layerA;
}

function setNote() {
  const cat = categoryLabel(category);
  const work = queue[index];
  if (!work) {
    noteMeta.textContent = cat;
    noteTitle.textContent = "";
    noteBody.textContent = "";
    return;
  }
  noteMeta.textContent = `${work.artist}　${work.year}　${index + 1}/${queue.length}${autoPlay && !paused ? "　AUTO" : ""}`;
  noteTitle.textContent = `『${work.title}』`;
  noteBody.textContent = work.note;
}

function preload(src) {
  const img = new Image();
  img.src = src;
}

function showPainting(nextIndex, { resetTimer = true } = {}) {
  if (!queue.length) return;
  index = (nextIndex + queue.length) % queue.length;
  const painting = queue[index];
  const next = otherLayer();
  const prev = currentLayer();

  next.style.backgroundImage = `url("${painting.src}")`;
  next.classList.add("show");
  prev.classList.remove("show");
  usingA = !usingA;
  setNote();
  preload(queue[(index + 1) % queue.length].src);
  if (resetTimer) restartTimer();
}

function setCategory(nextCat) {
  category = nextCat;
  queue = paintingsIn(category);
  buttons.forEach((btn) => btn.classList.toggle("active", btn.dataset.cat === category));
  index = 0;
  usingA = true;
  layerA.classList.remove("show");
  layerB.classList.remove("show");
  if (!queue.length) {
    setNote();
    return;
  }
  layerA.style.backgroundImage = `url("${queue[0].src}")`;
  layerA.classList.add("show");
  setNote();
  preload(queue[1 % queue.length]?.src ?? queue[0].src);
  restartTimer();
}

function restartTimer() {
  clearInterval(timer);
  if (!autoPlay || paused || queue.length < 2) return;
  timer = setInterval(() => showPainting(index + 1), HOLD_MS);
}

function togglePause() {
  paused = !paused;
  document.body.classList.toggle("paused", paused);
  setNote();
  if (paused) clearInterval(timer);
  else restartTimer();
}

function toggleAuto() {
  autoPlay = !autoPlay;
  if (!autoPlay) {
    clearInterval(timer);
  } else if (!paused) {
    restartTimer();
  }
  setNote();
}

function toggleNotePin() {
  if (chromeHidden) {
    chromeHidden = false;
    document.body.classList.remove("chrome-hidden");
  }
  notePinned = !notePinned;
  document.body.classList.toggle("show-note", notePinned);
  if (notePinned) {
    document.body.classList.remove("show-ui");
  } else {
    revealUi();
  }
}

function toggleChrome() {
  chromeHidden = !chromeHidden;
  document.body.classList.toggle("chrome-hidden", chromeHidden);
  if (chromeHidden) {
    notePinned = false;
    document.body.classList.remove("show-note", "show-ui");
    document.body.classList.add("idle");
    clearTimeout(hideUiTimer);
  } else {
    revealUi(true);
  }
}

async function goFullscreen() {
  if (!document.fullscreenElement) {
    try {
      await document.documentElement.requestFullscreen();
    } catch {
      /* browser may require a later keypress */
    }
  }
}

function revealUi(keepLonger = false) {
  if (chromeHidden) return;
  document.body.classList.add("show-ui");
  document.body.classList.remove("idle");
  clearTimeout(hideUiTimer);
  const ms = keepLonger ? 10000 : 4500;
  hideUiTimer = setTimeout(() => {
    document.body.classList.remove("show-ui");
    if (!notePinned) document.body.classList.add("idle");
  }, ms);
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => setCategory(btn.dataset.cat));
});

document.addEventListener("mousemove", () => revealUi());
document.addEventListener("click", () => {
  if (chromeHidden) return;
  revealUi();
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key === "h" || key === "H") {
    toggleChrome();
    return;
  }
  if (key === "i" || key === "I") {
    toggleNotePin();
    return;
  }
  if (key === "a" || key === "A") {
    toggleAuto();
    return;
  }
  if (!chromeHidden) revealUi(key === " ");
  if (key === "f" || key === "F") goFullscreen();
  if (key === "Escape" && document.fullscreenElement) document.exitFullscreen();
  if (key === " ") {
    event.preventDefault();
    togglePause();
  }
  if (key === "ArrowRight") showPainting(index + 1);
  if (key === "ArrowLeft") showPainting(index - 1);
  if (/^[0-9]$/.test(key)) {
    const n = Number(key);
    if (n < CATEGORIES.length) setCategory(CATEGORIES[n].id);
  }
});

setCategory("all");
setTimeout(goFullscreen, 400);
