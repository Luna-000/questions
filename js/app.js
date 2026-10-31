const SHIORI_KEY = "sotogawa.shiori";
const RETURN_KEY = "sotogawa.return";
const MAP_KEY = "sotogawa.map";

const state = {
  view: "browse",
  id: null,
  kind: "cafe",
  q: "",
  pref: "all",
  moods: new Set(),
  train: false,
  car: false,
  reserve: false,
  seasonal: false,
  sort: "guide",
  mapOpen: false,
};

let lastRoute = "";
let map = null;
let markerLayer = null;
let detailMap = null;
let toastTimer = 0;

const $ = (sel) => document.querySelector(sel);

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[ch]));
}

function moodOf(id) {
  return MOODS.find((mood) => mood.id === id) || MOODS[0];
}

function kindOf(place) {
  return KINDS.find((kind) => kind.id === (place?.kind || "cafe")) || KINDS[0];
}

function kindPlaces() {
  return CAFES.filter((place) => kindOf(place).id === state.kind);
}

function savedInKind() {
  const ids = new Set(kindPlaces().map((place) => place.id));
  return loadShiori().filter((id) => ids.has(id));
}

function loadShiori() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SHIORI_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter((id) => CAFES.some((cafe) => cafe.id === id)) : [];
  } catch {
    return [];
  }
}

function saveShiori(ids) {
  try {
    localStorage.setItem(SHIORI_KEY, JSON.stringify(ids));
  } catch {
    /* 端末が保存を拒否しても、画面の操作は続ける */
  }
}

function isSaved(id) {
  return loadShiori().includes(id);
}

function toggleShiori(id) {
  const ids = loadShiori();
  const next = ids.includes(id) ? ids.filter((item) => item !== id) : [id, ...ids];
  saveShiori(next);
  return next.includes(id);
}

function tokyoDate() {
  const key = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  let hash = 2166136261;
  for (let i = 0; i < key.length; i += 1) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const pool = kindPlaces();
  const [year, month, day] = key.split("-");
  const label = `${year}年${Number(month)}月${Number(day)}日`;
  if (!pool.length) return { cafe: null, label };
  return {
    cafe: pool[(hash >>> 0) % pool.length],
    label,
  };
}

function readHash() {
  const raw = (location.hash || "#/").replace(/^#/, "");
  const [path, query = ""] = raw.split("?");
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "c" && parts[1]) {
    state.view = "detail";
    state.id = decodeURIComponent(parts[1]);
    return;
  }
  const params = new URLSearchParams(query);
  state.kind = KINDS.some((kind) => kind.id === params.get("kind")) ? params.get("kind") : "cafe";
  state.q = params.get("q") || "";
  state.pref = PREFS.includes(params.get("pref")) ? params.get("pref") : "all";
  state.moods = new Set((params.get("mood") || "").split(",").filter((id) => MOODS.some((mood) => mood.id === id)));
  state.train = params.get("train") === "1";
  state.car = params.get("car") === "1";
  state.reserve = params.get("reserve") === "1";
  state.seasonal = params.get("seasonal") === "1";
  state.sort = ["guide", "kana", "pref"].includes(params.get("sort")) ? params.get("sort") : "guide";
  if (parts[0] === "shiori") {
    state.view = "shiori";
    state.id = null;
  } else {
    state.view = "browse";
    state.id = null;
  }
}

function listHash(view) {
  const params = new URLSearchParams();
  if (state.kind !== "cafe") params.set("kind", state.kind);
  if (state.q) params.set("q", state.q);
  if (state.pref !== "all") params.set("pref", state.pref);
  if (state.moods.size) params.set("mood", [...state.moods].join(","));
  if (state.train) params.set("train", "1");
  if (state.car) params.set("car", "1");
  if (state.reserve) params.set("reserve", "1");
  if (state.seasonal) params.set("seasonal", "1");
  if (state.sort !== "guide") params.set("sort", state.sort);
  const query = params.toString();
  const path = view === "shiori" ? "/shiori" : "/";
  return `#${path}${query ? `?${query}` : ""}`;
}

function writeHash(mode) {
  const next = listHash(state.view === "shiori" ? "shiori" : "browse");
  if (next === location.hash) return;
  if (mode === "replace") {
    try {
      history.replaceState(null, "", next);
      return;
    } catch {
      /* 別オリジンの base があると、相対ハッシュの replaceState は拒否される */
    }
  }
  location.hash = next;
}

function appRoute(href) {
  return href === "#/" || href.startsWith("#/?") || href.startsWith("#/shiori") || href.startsWith("#/c/");
}

function hashStaysHere(href) {
  try {
    return new URL(href, document.baseURI).origin === location.origin;
  } catch {
    return false;
  }
}

function rememberReturn() {
  try {
    sessionStorage.setItem(RETURN_KEY, location.hash || "#/");
  } catch {
    /* 戻れなくても詳細は開く */
  }
}

function openCafe(id) {
  rememberReturn();
  location.hash = `#/c/${encodeURIComponent(id)}`;
}

function goBack() {
  let ret = listHash("browse");
  try {
    const saved = sessionStorage.getItem(RETURN_KEY);
    if (saved && saved.startsWith("#/") && !saved.startsWith("#/c/")) ret = saved;
  } catch {
    ret = listHash("browse");
  }
  if (location.hash === ret) {
    state.view = ret.startsWith("#/shiori") ? "shiori" : "browse";
    state.id = null;
    render();
    return;
  }
  location.hash = ret;
}

function haystack(cafe) {
  return [
    cafe.name, cafe.kana, kindOf(cafe).label, cafe.prefecture, cafe.locality, cafe.address,
    cafe.lead, cafe.story, cafe.signature, cafe.access, cafe.hours,
    ...cafe.moods.map((id) => moodOf(id).label),
  ].join(" ").toLowerCase().replace(/\s+/g, "");
}

function matches(cafe) {
  if (kindOf(cafe).id !== state.kind) return false;
  if (state.view === "shiori" && !isSaved(cafe.id)) return false;
  if (state.pref !== "all" && cafe.prefecture !== state.pref) return false;
  const selected = [...state.moods];
  const scene = selected.filter((id) => moodOf(id).group === "scene");
  const visit = selected.filter((id) => moodOf(id).group === "visit");
  if (scene.length && !scene.some((id) => cafe.moods.includes(id))) return false;
  if (visit.some((id) => !cafe.moods.includes(id))) return false;
  if (state.train && !cafe.train) return false;
  if (state.car && !cafe.car) return false;
  if (state.reserve && cafe.reservation !== "required") return false;
  if (state.seasonal && !cafe.seasonal) return false;
  const q = state.q.toLowerCase().replace(/\s+/g, "");
  if (q && !haystack(cafe).includes(q)) return false;
  return true;
}

function sorted(list) {
  const copy = [...list];
  if (state.sort === "kana") {
    copy.sort((a, b) => a.kana.localeCompare(b.kana, "ja"));
  } else if (state.sort === "pref") {
    copy.sort((a, b) => PREFS.indexOf(a.prefecture) - PREFS.indexOf(b.prefecture) || a.kana.localeCompare(b.kana, "ja"));
  } else {
    copy.sort((a, b) => CAFES.indexOf(a) - CAFES.indexOf(b));
  }
  return copy;
}

function visibleCafes() {
  return sorted(CAFES.filter(matches));
}

function filtersActive() {
  return Boolean(state.q || state.pref !== "all" || state.moods.size || state.train || state.car || state.reserve || state.seasonal);
}

function clearFilters() {
  state.q = "";
  state.pref = "all";
  state.moods = new Set();
  state.train = false;
  state.car = false;
  state.reserve = false;
  state.seasonal = false;
  state.sort = "guide";
  writeHash("replace");
  renderBrowse();
}

function bookmarkSvg() {
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3.5h12V21l-6-3.4L6 21z"></path></svg>';
}

function heartButton(cafe) {
  const on = isSaved(cafe.id);
  const label = on ? `${cafe.name}を、しおりから外す` : `${cafe.name}を、しおりに入れる`;
  return `<button class="heart" type="button" data-save="${esc(cafe.id)}" aria-pressed="${on}" aria-label="${esc(label)}">${bookmarkSvg()}</button>`;
}

function card(cafe) {
  const mood = moodOf(cafe.moods[0]);
  const tags = [];
  if (cafe.reservation === "required") tags.push("予約必須");
  if (cafe.seasonal) tags.push("季節で変わる");
  if (cafe.train && !cafe.car) tags.push("電車向き");
  if (cafe.car && !cafe.train) tags.push("車が確実");
  cafe.moods.forEach((id) => {
    const mood = moodOf(id);
    if (mood.group === "visit" && mood.id !== "air") tags.push(mood.label);
  });
  return `<li>
    <article class="card">
      <div class="bandline" data-mood="${esc(mood.id)}"></div>
      <a class="card-link" href="#/c/${esc(cafe.id)}">
        <p class="kicker">${esc(mood.label)} · ${esc(cafe.prefecture)} · ${esc(cafe.locality)}</p>
        <h2>${esc(cafe.name)}</h2>
        <p class="lead">${esc(cafe.lead)}</p>
        ${recommendations(cafe)[0] ? `<p class="pick">おすすめ ${esc(recommendations(cafe)[0])}</p>` : ""}
        <div class="tags">${tags.map((tag) => `<span class="tagchip">${esc(tag)}</span>`).join("")}</div>
      </a>
      ${heartButton(cafe)}
    </article>
  </li>`;
}

function renderToday() {
  const el = $("#today");
  if (state.view === "shiori") {
    const label = kindOf({ kind: state.kind }).label;
    el.innerHTML = `<p class="today-kicker">しおり · ${esc(label)}</p><strong>この端末だけに残る、行きたい店。</strong><span>今開いている種類だけを出す。アカウントはない。</span>`;
    return;
  }
  const today = tokyoDate();
  if (!today.cafe) {
    const label = kindOf({ kind: state.kind }).label;
    el.innerHTML = `<p class="today-kicker">今日の一軒 · ${esc(today.label)}（日本時間）</p><strong>この種類は、いま手帳にありません。</strong><span>公開文で部屋や来歴が辿れた${esc(label)}は、今回は載せていません。</span>`;
    return;
  }
  el.innerHTML = `<p class="today-kicker">今日の一軒 · ${esc(today.label)}（日本時間）</p>
    <a href="#/c/${esc(today.cafe.id)}">
      <strong>${esc(today.cafe.name)}</strong>
      <span>${esc(today.cafe.lead)}</span>
    </a>`;
}

function renderKinds() {
  const buttons = (withCount) => KINDS.map((kind) => {
    const on = state.kind === kind.id;
    const n = CAFES.filter((place) => kindOf(place).id === kind.id).length;
    const count = withCount ? `<span>${n}</span>` : "";
    return `<button type="button" role="tab" data-kind="${kind.id}" aria-selected="${on}">${esc(kind.label)}${count}</button>`;
  }).join("");
  $("#kinds").innerHTML = buttons(true);
  $("#tab-kinds").innerHTML = buttons(false);
}

function renderControls() {
  const q = $("#q");
  if (q.value !== state.q) q.value = state.q;
  const placeholders = {
    cafe: "吉祥寺、ケーキ、谷中、静かに",
    izakaya: "立川、焼き鳥、海鮮、川越",
    bar: "吉祥寺、ワイン、横浜、カクテル",
  };
  q.placeholder = placeholders[state.kind] || placeholders.cafe;
  const pool = kindPlaces();
  const moodButtons = (group) => MOODS.filter((mood) => mood.group === group && (pool.some((cafe) => cafe.moods.includes(mood.id)) || state.moods.has(mood.id))).map((mood) => {
    const on = state.moods.has(mood.id);
    return `<button type="button" class="chip" data-mood="${mood.id}" aria-pressed="${on}"><span class="dot" data-mood="${mood.id}"></span>${esc(mood.label)}</button>`;
  }).join("");
  const sceneHtml = moodButtons("scene");
  const visitHtml = moodButtons("visit");
  $("#moods").innerHTML = sceneHtml;
  $("#moods").hidden = !sceneHtml;
  $("#visits").innerHTML = visitHtml;
  $("#visits").hidden = !visitHtml;
  $("#visit-label").hidden = !visitHtml;
  const counts = Object.fromEntries(PREFS.map((pref) => [pref, pool.filter((cafe) => cafe.prefecture === pref).length]));
  $("#prefs").innerHTML = [`all`, ...PREFS].map((pref) => {
    const on = state.pref === pref;
    const label = pref === "all" ? `すべて ${pool.length}` : `${pref} ${counts[pref]}`;
    return `<button type="button" class="chip" data-pref="${esc(pref)}" aria-pressed="${on}">${esc(label)}</button>`;
  }).join("");
  const flags = [
    ["train", "電車で着ける", state.train],
    ["car", "車が向く", state.car],
    ["reserve", "予約必須", state.reserve],
    ["seasonal", "季節で変わる", state.seasonal],
  ];
  $("#flags").innerHTML = flags.map(([key, label, on]) =>
    `<button type="button" class="chip" data-flag="${key}" aria-pressed="${on}">${label}</button>`).join("");
  const list = visibleCafes();
  const kindLabel = kindOf({ kind: state.kind }).label;
  const scope = state.view === "shiori" ? "しおり" : "手帳";
  const total = state.view === "shiori" ? savedInKind().length : pool.length;
  $("#count").textContent = `${scope}の${kindLabel} ${total} 軒のうち ${list.length} 軒`;
  $("#sort").value = state.sort;
  $("#reset").hidden = !filtersActive();
  $("#map-toggle").setAttribute("aria-pressed", String(state.mapOpen));
  $("#map-toggle").textContent = state.mapOpen ? "地図を閉じる" : "地図を開く";
  $("#map-wrap").hidden = !state.mapOpen;
}

function renderList() {
  const list = visibleCafes();
  const root = $("#list");
  if (!list.length) {
    const kindLabel = kindOf({ kind: state.kind }).label;
    const noun = state.view === "shiori" && !savedInKind().length
      ? `この種類のしおりは、まだ空です。${kindLabel}のカードの栞を押すと、ここに残ります。`
      : `この条件に合う${kindLabel}は、手帳にありません。`;
    root.innerHTML = `<div class="empty"><p>${noun}</p>${filtersActive() ? '<button class="textbtn" type="button" id="clear-empty">条件をクリア</button>' : ""}</div>`;
    $("#clear-empty")?.addEventListener("click", clearFilters);
    return;
  }
  root.innerHTML = `<ul class="cards">${list.map(card).join("")}</ul>`;
}

function destroyDetailMap() {
  if (detailMap) {
    detailMap.remove();
    detailMap = null;
  }
}

function recommendations(cafe) {
  if (cafe.picks?.length) return cafe.picks;
  if (!cafe.signature) return [];
  return cafe.signature.split("、").map((item) => item.trim()).filter(Boolean);
}

function recommendFact(cafe) {
  const items = recommendations(cafe);
  if (!items.length) return "";
  return fact("おすすめ", `<ul class="picks">${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul><span class="fine">店の公開文に名前があるもの</span>`);
}

function pinCaption(cafe) {
  if (cafe.pinSource === "shop" && cafe.pinRough) {
    return "このピンは店が公開している座標で、番地が途中までの位置です。入口は住所の Googleマップ から。";
  }
  if (cafe.pinSource === "shop") {
    return "このピンは店が公開している座標。入口そのものとは限らない。";
  }
  if (cafe.pinRough) {
    return "このピンは町名までの位置です。番地は住所の Googleマップ から。";
  }
  return "ピンは国土地理院の住所検索。入口そのものとは限らない。";
}

function fact(term, html) {
  if (!html) return "";
  return `<div><dt>${esc(term)}</dt><dd>${html}</dd></div>`;
}

function renderDetail() {
  destroyDetailMap();
  const cafe = CAFES.find((item) => item.id === state.id);
  const root = $("#detail");
  if (!cafe) {
    root.innerHTML = `<p>この店は手帳にありません。</p><button class="back" type="button" id="back">一覧へ戻る</button>`;
    $("#back").addEventListener("click", goBack);
    document.title = "見つからない店 — ソトガワ";
    return;
  }
  const mood = moodOf(cafe.moods[0]);
  const moodLabels = cafe.moods.map((id) => moodOf(id).label).join(" · ");
  const checked = (cafe.checked || "2026-10-30").split("-");
  const checkedLabel = `${checked[0]}年${Number(checked[1])}月${Number(checked[2])}日`;
  const saved = isSaved(cafe.id);
  const phone = cafe.phone ? `<a href="tel:${esc(cafe.phone)}">${esc(cafe.phone)}</a>` : "";
  const links = cafe.links.map((link, index) =>
    `<a class="${index === 0 ? "" : "ghost"}" href="${esc(link.href)}" target="_blank" rel="noopener noreferrer">${esc(link.label)}</a>`).join("");
  const notes = cafe.notes.length ? `<ul class="notes">${cafe.notes.map((note) => `<li>${esc(note)}</li>`).join("")}</ul>` : "";
  const nearby = CAFES.filter((item) => item.id !== cafe.id && kindOf(item).id === kindOf(cafe).id && (item.prefecture === cafe.prefecture || item.moods.some((id) => cafe.moods.includes(id))))
    .sort((a, b) => (a.prefecture === cafe.prefecture ? 0 : 1) - (b.prefecture === cafe.prefecture ? 0 : 1))
    .slice(0, 3);
  root.innerHTML = `
    <button class="back" type="button" id="back">一覧へ戻る</button>
    <header class="hero" data-mood="${esc(mood.id)}">
      <p class="kicker">${esc(kindOf(cafe).label)} · ${esc(moodLabels)} · ${esc(cafe.prefecture)}</p>
      <h2 tabindex="-1">${esc(cafe.name)}</h2>
      <p class="kana">${esc(cafe.kana)}</p>
      <p class="lead">${esc(cafe.lead)}</p>
    </header>
    <p class="story">${esc(cafe.story)}</p>
    <div class="detail-grid">
      <div>
        <dl class="facts">
          ${fact("時間", `${esc(cafe.hours)}<br><span class="fine">${esc(CONFIDENCE[cafe.confidence])}</span>`)}
          ${fact("休み", esc(cafe.closed))}
          ${fact("予約", cafe.reservation === "none" ? "指定なし。混む日は店に確認" : `${esc({ required: "必須", recommended: "できる", unavailable: "不可" }[cafe.reservation])}${cafe.reservationNote ? `<br>${esc(cafe.reservationNote)}` : ""}`)}
          ${fact("住所", `${esc(cafe.address)}<br><a class="map-open" href="${mapLink(cafe)}" target="_blank" rel="noopener noreferrer">Googleマップ</a>`)}
          ${fact("行き方", esc(cafe.access))}
          ${fact("電話", phone)}
          ${fact("車", esc(cafe.parking))}
          ${recommendFact(cafe)}
        </dl>
        ${notes}
        <div class="actions">
          <a class="action" href="${mapLink(cafe)}" target="_blank" rel="noopener noreferrer">Googleマップで開く</a>
          <button class="action ghost" type="button" id="copy">住所をコピー</button>
          <button class="action ghost" type="button" id="save" aria-pressed="${saved}">${saved ? "しおりから外す" : "しおりに入れる"}</button>
        </div>
        <div class="links">${links}</div>
        <p class="source">情報の出どころ：<a href="${esc(cafe.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(cafe.sourceLabel)}</a><br>${esc(checkedLabel)}に公開情報を確認。営業は変わります。</p>
      </div>
      <div>
        <div id="detail-map" role="region" aria-label="${esc(cafe.name)}の位置"></div>
        <p class="map-note">${pinCaption(cafe)} タイル © OpenStreetMap</p>
      </div>
    </div>
    <h3>近くの手帳</h3>
    <ul class="nearby">${nearby.map((item) => `<li><a href="#/c/${esc(item.id)}">${esc(item.name)}<br><small>${esc(item.prefecture)} · ${esc(item.locality)} · ${esc(item.lead)}</small></a></li>`).join("")}</ul>`;
  $("#back").addEventListener("click", goBack);
  $("#copy").addEventListener("click", () => copyAddress(cafe));
  $("#save").addEventListener("click", () => {
    const on = toggleShiori(cafe.id);
    $("#save").setAttribute("aria-pressed", String(on));
    $("#save").textContent = on ? "しおりから外す" : "しおりに入れる";
    updateShioriCount();
  });
  root.querySelector("h2").focus();
  document.title = `${cafe.name} — ソトガワ`;
  requestAnimationFrame(() => initDetailMap(cafe));
}

function mapLink(cafe) {
  const query = encodeURIComponent(`${cafe.name} ${cafe.address}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function copyAddress(cafe) {
  const text = `${cafe.name}\n${cafe.address}`;
  const done = () => showToast("住所をコピーしました");
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
}

function fallbackCopy(text, done) {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.left = "-999px";
  document.body.appendChild(area);
  area.select();
  try {
    document.execCommand("copy");
    done();
  } catch {
    showToast("コピーできませんでした。住所を長押しで選択してください");
  }
  area.remove();
}

function showToast(message) {
  let toast = $("#toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 2200);
}

function tiles() {
  return L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  });
}

function pinIcon(cafe) {
  const mood = moodOf(cafe.moods[0]);
  return L.divIcon({
    className: `soto-pin${cafe.pinRough ? " rough" : ""}`,
    html: `<span data-mood="${mood.id}">${mood.label.slice(0, 1)}</span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}

function fit(target, cafes) {
  const located = cafes.filter((cafe) => Number.isFinite(cafe.lat) && Number.isFinite(cafe.lng));
  if (!located.length) {
    target.setView([36.2, 139.6], 8);
    return;
  }
  if (located.length === 1) {
    target.setView([located[0].lat, located[0].lng], located[0].pinRough ? 12 : 15);
    return;
  }
  target.fitBounds(located.map((cafe) => [cafe.lat, cafe.lng]), { padding: [28, 28], maxZoom: 14 });
}

function ensureMap() {
  if (!state.mapOpen || $("#map-wrap").hidden) return;
  if (!map) {
    map = L.map("map", { scrollWheelZoom: false });
    tiles().addTo(map);
    markerLayer = L.layerGroup().addTo(map);
  }
  map.invalidateSize();
  markerLayer.clearLayers();
  const list = visibleCafes();
  list.forEach((cafe) => {
    const marker = L.marker([cafe.lat, cafe.lng], { icon: pinIcon(cafe), keyboard: true, alt: cafe.name });
    marker.bindPopup(`<strong>${esc(cafe.name)}</strong><br><a href="#/c/${esc(cafe.id)}">詳しく見る</a>`);
    marker.on("click", () => marker.openPopup());
    marker.addTo(markerLayer);
  });
  fit(map, list);
}

function initDetailMap(cafe) {
  const node = $("#detail-map");
  if (!node || typeof L === "undefined") return;
  detailMap = L.map(node, { scrollWheelZoom: false });
  tiles().addTo(detailMap);
  L.marker([cafe.lat, cafe.lng], { icon: pinIcon(cafe), alt: cafe.name }).addTo(detailMap);
  detailMap.setView([cafe.lat, cafe.lng], cafe.pinRough ? 13 : 16);
  requestAnimationFrame(() => detailMap.invalidateSize());
}

function updateNav() {
  const browseOn = state.view === "browse";
  document.querySelectorAll("[data-nav='browse']").forEach((el) => {
    el.setAttribute("href", listHash("browse"));
    if (browseOn) el.setAttribute("aria-current", "page");
    else el.removeAttribute("aria-current");
  });
  document.querySelectorAll("[data-nav='shiori']").forEach((el) => {
    el.setAttribute("href", listHash("shiori"));
    if (state.view === "shiori") el.setAttribute("aria-current", "page");
    else el.removeAttribute("aria-current");
  });
  updateShioriCount();
}

function updateShioriCount() {
  const n = loadShiori().length;
  document.querySelectorAll("[data-shiori-count]").forEach((el) => {
    el.textContent = n ? String(n) : "";
  });
}

function renderBrowse() {
  renderToday();
  renderControls();
  renderList();
  updateNav();
  if (state.mapOpen) ensureMap();
  const kindLabel = kindOf({ kind: state.kind }).label;
  document.title = state.view === "shiori" ? `しおり — ソトガワ` : `ソトガワ — 関東の${kindLabel}`;
}

function render() {
  const route = `${state.view}:${state.id || ""}`;
  const routeChanged = route !== lastRoute;
  lastRoute = route;
  renderKinds();
  const browsing = state.view !== "detail";
  $("#browse").hidden = !browsing;
  $("#detail").hidden = browsing;
  updateNav();
  if (browsing) {
    destroyDetailMap();
    renderBrowse();
  } else {
    renderDetail();
  }
  if (routeChanged) window.scrollTo(0, 0);
}

function onListClick(event) {
  const save = event.target.closest("[data-save]");
  if (save) {
    event.preventDefault();
    event.stopPropagation();
    const id = save.getAttribute("data-save");
    const on = toggleShiori(id);
    if (state.view === "shiori" && !on) {
      const y = window.scrollY;
      renderList();
      renderControls();
      if (state.mapOpen) ensureMap();
      window.scrollTo(0, y);
    } else {
      save.setAttribute("aria-pressed", String(on));
      save.setAttribute("aria-label", on ? `${save.closest(".card").querySelector("h2").textContent}を、しおりから外す` : `${save.closest(".card").querySelector("h2").textContent}を、しおりに入れる`);
      updateShioriCount();
    }
    return;
  }
  const link = event.target.closest("a.card-link, a[href^='#/c/']");
  if (link && link.getAttribute("href").startsWith("#/c/")) rememberReturn();
}

function bind() {
  $("#q").addEventListener("input", () => {
    state.q = $("#q").value;
    writeHash("replace");
    renderControls();
    renderList();
    if (state.mapOpen) ensureMap();
  });
  for (const root of [$("#moods"), $("#visits")]) {
    root.addEventListener("click", (event) => {
      const button = event.target.closest("[data-mood]");
      if (!button) return;
      const id = button.getAttribute("data-mood");
      if (state.moods.has(id)) state.moods.delete(id);
      else state.moods.add(id);
      writeHash("replace");
      renderBrowse();
    });
  }
  $("#prefs").addEventListener("click", (event) => {
    const button = event.target.closest("[data-pref]");
    if (!button) return;
    state.pref = button.getAttribute("data-pref");
    writeHash("replace");
    renderBrowse();
  });
  $("#flags").addEventListener("click", (event) => {
    const button = event.target.closest("[data-flag]");
    if (!button) return;
    const key = button.getAttribute("data-flag");
    state[key] = !state[key];
    writeHash("replace");
    renderBrowse();
  });
  $("#sort").addEventListener("change", () => {
    state.sort = $("#sort").value;
    writeHash("replace");
    renderList();
  });
  $("#reset").addEventListener("click", clearFilters);
  $("#map-toggle").addEventListener("click", () => {
    state.mapOpen = !state.mapOpen;
    try { sessionStorage.setItem(MAP_KEY, state.mapOpen ? "1" : "0"); } catch { /* 表示だけ維持 */ }
    $("#map-wrap").hidden = !state.mapOpen;
    $("#map-toggle").setAttribute("aria-pressed", String(state.mapOpen));
    $("#map-toggle").textContent = state.mapOpen ? "地図を閉じる" : "地図を開く";
    if (state.mapOpen) requestAnimationFrame(() => ensureMap());
  });
  for (const root of [$("#kinds"), $("#tab-kinds")]) {
    root.addEventListener("click", (event) => {
      const button = event.target.closest("[data-kind]");
      if (!button) return;
      state.kind = button.getAttribute("data-kind");
      state.view = "browse";
      state.id = null;
      writeHash("replace");
      render();
    });
  }
  $("#list").addEventListener("click", onListClick);
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;
    const href = link.getAttribute("href") || "";
    if (!appRoute(href)) return;
    if (href.startsWith("#/c/") && state.view !== "detail") rememberReturn();
    if (hashStaysHere(href)) return;
    event.preventDefault();
    if (location.hash !== href) location.hash = href;
  }, true);
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href^='#/c/']");
    if (link && state.view !== "detail") rememberReturn();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && document.activeElement !== $("#q") && state.view !== "detail") {
      event.preventDefault();
      $("#q").focus();
    }
  });
  window.addEventListener("hashchange", () => {
    readHash();
    render();
  });
}

function boot() {
  try {
    state.mapOpen = sessionStorage.getItem(MAP_KEY) === "1";
  } catch {
    state.mapOpen = false;
  }
  readHash();
  bind();
  render();
}

boot();
