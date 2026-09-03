const CATEGORIES = [
  { id: "all", label: "すべて" },
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
  { src: "scenes/millet-gleaners.jpg", artist: "ジャン＝フランソワ・ミレー", title: "落穂拾い", tags: ["millet"] },
  { src: "scenes/millet-angelus.jpg", artist: "ジャン＝フランソワ・ミレー", title: "晩鐘", tags: ["millet"] },
  { src: "scenes/millet-sower.jpg", artist: "ジャン＝フランソワ・ミレー", title: "種まく人", tags: ["millet"] },
  { src: "scenes/hammershoi-back.jpg", artist: "ヴィルヘルム・ハンマースホイ", title: "背を向けた女性のいる室内", tags: ["hammershoi"] },
  { src: "scenes/hammershoi-strandgade.jpg", artist: "ヴィルヘルム・ハンマースホイ", title: "ストランゲーゼの部屋と妻", tags: ["hammershoi"] },
  { src: "scenes/hammershoi-sunfloor.jpg", artist: "ヴィルヘルム・ハンマースホイ", title: "床に陽光のある室内", tags: ["hammershoi"] },
  { src: "scenes/gogh-starry.jpg", artist: "フィンセント・ファン・ゴッホ", title: "星月夜", tags: ["gogh"] },
  { src: "scenes/gogh-crows.jpg", artist: "フィンセント・ファン・ゴッホ", title: "カラスのいる麦畑", tags: ["gogh"] },
  { src: "scenes/gogh-bedroom.jpg", artist: "フィンセント・ファン・ゴッホ", title: "アルルの寝室", tags: ["gogh"] },
  { src: "scenes/munch-window.jpg", artist: "エドヴァルド・ムンク", title: "窓際の少女", tags: ["munch"] },
  { src: "scenes/roussel-reading.jpg", artist: "テオドール・ルーセル", title: "読書する少女", tags: ["roussel"] },
  { src: "scenes/rousseau-forest.jpg", artist: "テオドール・ルソー", title: "日没の冬の森", tags: ["rousseau"] },
  { src: "scenes/rousseau-valley.jpg", artist: "テオドール・ルソー", title: "ティフォージュの谷", tags: ["rousseau"] },
  { src: "scenes/polenov-yard.jpg", artist: "ワシリー・ポレーノフ", title: "モスクワの中庭", tags: ["polenov"] },
  { src: "scenes/polenov-pond.jpg", artist: "ワシリー・ポレーノフ", title: "草に覆われた池", tags: ["polenov"] },
  { src: "scenes/thaulow-simoa.jpg", artist: "フリッツ・タウロウ", title: "シモア川の冬", tags: ["thaulow"] },
  { src: "scenes/thaulow-river.jpg", artist: "フリッツ・タウロウ", title: "冬の川", tags: ["thaulow"] },
  { src: "scenes/thaulow-street.jpg", artist: "フリッツ・タウロウ", title: "モントルイユ＝シュル＝メールの通り", tags: ["thaulow"] },
  { src: "scenes/friedrich-wanderer.jpg", artist: "カスパー・ダーヴィト・フリードリヒ", title: "雲海の上の旅人", tags: ["friedrich"] },
  { src: "scenes/friedrich-abbey.jpg", artist: "カスパー・ダーヴィト・フリードリヒ", title: "オークの木立の中の修道院", tags: ["friedrich"] },
  { src: "scenes/uhde-grace.jpg", artist: "フリッツ・フォン・ウーデ", title: "食前の祈り", tags: ["uhde"] },
  { src: "scenes/loiseau-village.jpg", artist: "ギュスターヴ・ロワゾー", title: "村", tags: ["loiseau"] },
  { src: "scenes/loiseau-frost.jpg", artist: "ギュスターヴ・ロワゾー", title: "ポントワーズの霧氷", tags: ["loiseau"] },
  { src: "scenes/loiseau-beach.jpg", artist: "ギュスターヴ・ロワゾー", title: "フェカンの海岸", tags: ["loiseau"] },
];

const HOLD_MS = 45_000;
const layerA = document.getElementById("layer-a");
const layerB = document.getElementById("layer-b");
const caption = document.getElementById("caption");
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

function setCaption() {
  const cat = categoryLabel(category);
  const work = queue[index];
  if (!work) {
    caption.textContent = cat;
    return;
  }
  caption.textContent = `${cat}  ${index + 1} / ${queue.length}　　${work.artist}『${work.title}』`;
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
  setCaption();
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
    setCaption();
    return;
  }
  layerA.style.backgroundImage = `url("${queue[0].src}")`;
  layerA.classList.add("show");
  setCaption();
  preload(queue[1 % queue.length]?.src ?? queue[0].src);
  restartTimer();
}

function restartTimer() {
  clearInterval(timer);
  if (paused || queue.length < 2) return;
  timer = setInterval(() => showPainting(index + 1), HOLD_MS);
}

function togglePause() {
  paused = !paused;
  document.body.classList.toggle("paused", paused);
  if (paused) clearInterval(timer);
  else restartTimer();
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

function revealUi() {
  document.body.classList.add("show-ui");
  document.body.classList.remove("idle");
  clearTimeout(hideUiTimer);
  hideUiTimer = setTimeout(() => {
    document.body.classList.remove("show-ui");
    document.body.classList.add("idle");
  }, 2600);
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => setCategory(btn.dataset.cat));
});

document.addEventListener("mousemove", revealUi);
document.addEventListener("click", revealUi);

document.addEventListener("keydown", (event) => {
  revealUi();
  if (event.key === "f" || event.key === "F") goFullscreen();
  if (event.key === "Escape" && document.fullscreenElement) document.exitFullscreen();
  if (event.key === " ") {
    event.preventDefault();
    togglePause();
  }
  if (event.key === "ArrowRight") showPainting(index + 1);
  if (event.key === "ArrowLeft") showPainting(index - 1);
  if (/^[0-9]$/.test(event.key)) {
    const n = Number(event.key);
    if (n < CATEGORIES.length) setCategory(CATEGORIES[n].id);
  }
});

setCategory("all");
revealUi();
setTimeout(goFullscreen, 400);
