(() => {
  const DATA = window.FC_DATA;
  const KEY = {
    session: "tsukimi-fc-session",
    reads: "tsukimi-fc-reads",
    checks: "tsukimi-fc-checks",
    qsc: "tsukimi-fc-qsc",
    mails: "tsukimi-fc-mails",
  };

  const NAV = [
    { href: "#/home", key: "home", label: "今日" },
    { href: "#/notices", key: "notices", label: "通達" },
    { href: "#/improve", key: "improve", label: "改善" },
    { href: "#/pops", key: "pops", label: "POP" },
    { href: "#/campaigns", key: "campaigns", label: "催し" },
    { href: "#/drinks", key: "drinks", label: "一杯" },
    { href: "#/manuals", key: "manuals", label: "手順" },
    { href: "#/calendar", key: "calendar", label: "暦" },
    { href: "#/stories", key: "stories", label: "現場" },
    { href: "#/contact", key: "contact", label: "本部" },
  ];

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[char]));
  }

  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function saveJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function session() {
    return loadJSON(KEY.session, null);
  }

  function reads() {
    return new Set(loadJSON(KEY.reads, []));
  }

  function saveReads(set) {
    saveJSON(KEY.reads, [...set]);
  }

  function unreadMust() {
    const seen = reads();
    return DATA.notices.filter((item) => item.level === "必須" && !seen.has(item.id));
  }

  function route() {
    const raw = location.hash.slice(1) || "/home";
    const [path, query] = raw.split("?");
    const parts = path.split("/").filter(Boolean);
    const params = new URLSearchParams(query || "");
    return {
      name: parts[0] || "home",
      id: parts[1] || "",
      q: params.get("q") || "",
      filter: params.get("f") || "",
    };
  }

  function fmtDate(iso) {
    const date = new Date(`${iso}T12:00:00`);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  }

  function fmtDateLong(iso) {
    const date = new Date(`${iso}T12:00:00`);
    const week = "日月火水木金土"[date.getDay()];
    return `${date.getMonth() + 1}月${date.getDate()}日（${week}）`;
  }

  function todayIso() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${now.getFullYear()}-${month}-${day}`;
  }

  function badgeClass(level) {
    if (level === "必須") return "badge-must";
    if (level === "手順変更") return "badge-change";
    if (level === "実施中") return "badge-live";
    if (level === "予約開始") return "badge-soon";
    if (level === "本店試験") return "badge-test";
    if (level === "通年") return "badge-always";
    return "badge-info";
  }

  function find(list, id) {
    return list.find((item) => item.id === id);
  }

  function searchAll(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const hit = (parts) => parts.join(" ").toLowerCase().includes(q);
    const rows = [];
    DATA.notices.forEach((item) => {
      if (hit([item.title, item.body, item.level])) {
        rows.push({ href: `#/notices/${item.id}`, kind: "通達", title: item.title, text: item.body });
      }
    });
    DATA.improvements.forEach((item) => {
      if (hit([item.title, item.summary, item.category, ...(item.steps || [])])) {
        rows.push({ href: `#/improve/${item.id}`, kind: "改善", title: item.title, text: item.summary });
      }
    });
    DATA.pops.forEach((item) => {
      if (hit([item.name, item.use, item.note, item.size])) {
        rows.push({ href: `#/pops/${item.id}`, kind: "POP", title: item.name, text: item.note });
      }
    });
    DATA.campaigns.forEach((item) => {
      if (hit([item.title, item.summary, item.offer, ...(item.how || [])])) {
        rows.push({ href: `#/campaigns/${item.id}`, kind: "催し", title: item.title, text: item.summary });
      }
    });
    DATA.drinks.forEach((item) => {
      if (hit([item.name, item.blurb, item.talk, ...(item.recipe || []), ...(item.tips || [])])) {
        rows.push({ href: `#/drinks/${item.id}`, kind: "一杯", title: item.name, text: item.blurb });
      }
    });
    DATA.manuals.forEach((item) => {
      if (hit([item.title, item.body])) {
        rows.push({ href: "#/manuals", kind: "手順", title: item.title, text: item.body });
      }
    });
    DATA.stories.forEach((item) => {
      if (hit([item.store, item.title, item.body])) {
        rows.push({ href: "#/stories", kind: "現場", title: item.title, text: item.body });
      }
    });
    return rows;
  }

  function navHtml(active) {
    const count = unreadMust().length;
    return NAV.map((item) => {
      const current = item.key === active ? ' aria-current="page"' : "";
      const badge = item.key === "notices" && count
        ? `<span class="nav-count">${count}</span>`
        : "";
      return `<a href="${item.href}"${current}><span>${item.label}</span>${badge}</a>`;
    }).join("");
  }

  function chrome(active, main, title) {
    const user = session();
    const count = unreadMust().length;
    document.title = title ? `${title} · ${DATA.brand.portal}` : DATA.brand.portal;
    return `
      <div class="app">
        <header class="app-bar">
          <a class="logo" href="#/home">
            <span class="logo-mark">月</span>
            <span>
              <strong>${esc(DATA.brand.name)}</strong>
              <small>${esc(DATA.brand.portal)}</small>
            </span>
          </a>
          <form class="search" data-action="search">
            <label class="sr-only" for="q">検索</label>
            <input id="q" name="q" type="search" placeholder="改善、POP、ドリンクを探す" />
          </form>
          <div class="store-chip">
            <span>${esc(user.storeName)} · ${esc(user.owner)}</span>
            <button class="btn btn-ghost" type="button" data-action="logout">出る</button>
          </div>
        </header>
        <div class="app-body">
          <nav class="app-nav" aria-label="主なページ">${navHtml(active)}</nav>
          <main class="app-main">${main}</main>
        </div>
        <nav class="bottom-nav" aria-label="モバイル">
          <a href="#/home"${active === "home" ? ' aria-current="page"' : ""}>今日</a>
          <a href="#/improve"${active === "improve" ? ' aria-current="page"' : ""}>改善</a>
          <a href="#/pops"${active === "pops" ? ' aria-current="page"' : ""}>POP</a>
          <a href="#/campaigns"${active === "campaigns" ? ' aria-current="page"' : ""}>催し</a>
          <button type="button" data-action="more">もっと${count ? ` (${count})` : ""}</button>
        </nav>
        <div class="more-sheet" id="more-sheet" hidden>
          <div class="more-panel">
            ${NAV.filter((item) => !["home", "improve", "pops", "campaigns"].includes(item.key))
              .map((item) => `<a href="${item.href}" data-action="close-more">${item.label}</a>`)
              .join("")}
            <button class="btn btn-ghost btn-wide" type="button" data-action="close-more">閉じる</button>
          </div>
        </div>
      </div>
    `;
  }

  function loginView(error) {
    document.title = `${DATA.brand.portal} · 入店`;
    return `
      <div class="login">
        <form class="login-card" data-action="login">
          <div class="moon" aria-hidden="true"></div>
          <p class="brand-en">${esc(DATA.brand.nameEn)}</p>
          <h1>${esc(DATA.brand.name)}</h1>
          <p class="portal">${esc(DATA.brand.portal)}</p>
          <p class="tag">${esc(DATA.brand.tagline)}</p>
          <label class="field">
            <span>店番</span>
            <input name="storeId" autocomplete="username" placeholder="FC-014" required />
          </label>
          <label class="field">
            <span>合言葉</span>
            <input name="password" type="password" autocomplete="current-password" required />
          </label>
          <p class="login-error" role="alert">${esc(error || "")}</p>
          <button class="btn btn-wide" type="submit">店に入る</button>
          <p class="login-hint">試し見は店番 <strong>FC-014</strong> / 合言葉 <strong>tsukimi</strong>。本店が効いた打ち手だけを置いてあります。</p>
        </form>
      </div>
    `;
  }

  function homeView() {
    const user = session();
    const must = unreadMust();
    const today = todayIso();
    const upcoming = DATA.calendar.filter((item) => item.date >= today).slice(0, 4);
    const live = DATA.campaigns.filter((item) => item.status === "実施中" || item.status === "予約開始");
    const drink = DATA.drinks[0];
    const picks = DATA.improvements.slice(0, 3);
    const qsc = loadJSON(KEY.qsc, {});
    const qscDone = DATA.qsc.filter((item) => qsc[item.id]).length;
    return chrome(
      "home",
      `
      <section class="home-hello page-head">
        <div>
          <p class="tiny">${fmtDateLong(today)} · ${esc(user.storeId)}</p>
          <h1>${esc(user.owner)}さん、${esc(user.storeName.replace(DATA.brand.name + " ", ""))}</h1>
          <p class="lede">${esc(DATA.brand.tagline)}</p>
        </div>
      </section>
      ${must.length ? `
        <a class="banner" href="#/notices/${must[0].id}">
          未読の必須が${must.length}件あります。先に「${esc(must[0].title)}」
        </a>
      ` : ""}
      <div class="grid grid-home" style="margin-top:16px">
        <article class="card">
          <p class="kicker">今週の暦</p>
          ${upcoming.map((item) => `
            <div class="cal-row">
              <strong>${fmtDate(item.date)}</strong>
              <div><span class="badge ${badgeClass(item.kind)}">${esc(item.kind)}</span> ${esc(item.title)}</div>
            </div>
          `).join("")}
          <div class="actions no-print"><a class="back" href="#/calendar">暦を全部見る</a></div>
        </article>
        <article class="card">
          <p class="kicker">今日のQSC · ${qscDone}/${DATA.qsc.length}</p>
          ${DATA.qsc.map((item) => `
            <label class="check">
              <input type="checkbox" data-qsc="${item.id}" ${qsc[item.id] ? "checked" : ""} />
              <span>${esc(item.text)}</span>
            </label>
          `).join("")}
        </article>
      </div>
      <h2 class="page-head" style="margin-top:28px"><span>動いている催し</span></h2>
      <div class="grid grid-2">
        ${live.map((item) => `
          <a class="tile" href="#/campaigns/${item.id}">
            <p class="kicker"><span class="badge ${badgeClass(item.status)}">${esc(item.status)}</span> ${esc(item.period)}</p>
            <h3>${esc(item.title)}</h3>
            <p class="muted">${esc(item.summary)}</p>
          </a>
        `).join("")}
      </div>
      <div class="grid grid-2" style="margin-top:14px">
        <a class="tile" href="#/drinks/${drink.id}">
          <p class="kicker">今月推す一杯</p>
          <div class="rank">${drink.rank}</div>
          <h3>${esc(drink.name)}</h3>
          <p class="muted">${esc(drink.blurb)}</p>
          <p class="tiny">${esc(drink.price)} · 原価 ${esc(drink.cost)}</p>
        </a>
        <article class="card">
          <p class="kicker">先に終わる改善</p>
          ${picks.map((item) => `
            <a class="tile" href="#/improve/${item.id}" style="box-shadow:none;padding:12px 0;border:0;border-bottom:1px dashed var(--line);border-radius:0">
              <p class="kicker">${esc(item.category)} · ${item.minutes}分</p>
              <strong>${esc(item.title)}</strong>
            </a>
          `).join("")}
        </article>
      </div>
      <section class="card" style="margin-top:18px">
        <p class="kicker">直営が一緒に置いたもの</p>
        <p class="lede">改善案・POP・キャンペーン・人気ドリンクだけでは、朝の現場は動きません。下は「あった方がよい」ものとして最初から載せています。</p>
        <div class="why-list" style="margin-top:14px">
          ${DATA.extras.map((item) => `
            <article>
              <h3>${esc(item.title)}</h3>
              <p class="muted">${esc(item.text)}</p>
            </article>
          `).join("")}
        </div>
      </section>
    `,
      "今日"
    );
  }

  function noticesView(current) {
    const seen = reads();
    const filter = current.filter;
    const list = DATA.notices.filter((item) => {
      if (filter === "必須") return item.level === "必須";
      if (filter === "未読") return !seen.has(item.id);
      return true;
    });
    if (current.id) {
      const item = find(DATA.notices, current.id);
      if (!item) return notFound();
      const next = new Set(seen);
      next.add(item.id);
      saveReads(next);
      return chrome(
        "notices",
        `
        <p class="back"><a class="back" href="#/notices">通達にもどる</a></p>
        <article class="card detail">
          <p class="kicker"><span class="badge ${badgeClass(item.level)}">${esc(item.level)}</span> ${fmtDateLong(item.date)}</p>
          <h1>${esc(item.title)}</h1>
          <p>${esc(item.body)}</p>
        </article>
      `,
        item.title
      );
    }
    return chrome(
      "notices",
      `
      <div class="page-head">
        <div>
          <h1>通達</h1>
          <p class="lede">メールに混ぜると読まれません。必須・手順変更・お知らせを分け、開いた通達は店の既読になります。</p>
        </div>
        <div class="chips">
          <a class="chip ${!filter ? "is-on" : ""}" href="#/notices">すべて</a>
          <a class="chip ${filter === "必須" ? "is-on" : ""}" href="#/notices?f=必須">必須</a>
          <a class="chip ${filter === "未読" ? "is-on" : ""}" href="#/notices?f=未読">未読</a>
        </div>
      </div>
      <div class="grid">
        ${list.map((item) => `
          <a class="tile" href="#/notices/${item.id}">
            <p class="kicker">
              ${seen.has(item.id) ? "" : '<span class="unread" aria-label="未読"></span>'}
              <span class="badge ${badgeClass(item.level)}">${esc(item.level)}</span>
              ${fmtDate(item.date)}
            </p>
            <h2>${esc(item.title)}</h2>
            <p class="muted">${esc(item.body)}</p>
          </a>
        `).join("") || '<p class="empty card">該当する通達はありません。</p>'}
      </div>
    `,
      "通達"
    );
  }

  function improveView(current) {
    const filter = current.filter;
    const checks = loadJSON(KEY.checks, {});
    const list = DATA.improvements.filter((item) => !filter || item.category === filter);
    const cats = [...new Set(DATA.improvements.map((item) => item.category))];
    if (current.id) {
      const item = find(DATA.improvements, current.id);
      if (!item) return notFound();
      const done = checks[item.id] || [];
      const all = item.check.every((_, index) => done[index]);
      return chrome(
        "improve",
        `
        <p><a class="back" href="#/improve">改善にもどる</a></p>
        <article class="card detail">
          <p class="kicker">${esc(item.category)} · ${item.minutes}分で終わる ${all ? '<span class="stamp">実施済</span>' : ""}</p>
          <h1>${esc(item.title)}</h1>
          <p>${esc(item.summary)}</p>
          <p class="tiny">なぜ: ${esc(item.why)}</p>
          <h2>手順</h2>
          <ol class="steps">${item.steps.map((step) => `<li><span>${esc(step)}</span></li>`).join("")}</ol>
          <h2>その週に終わる確認</h2>
          ${item.check.map((line, index) => `
            <label class="check">
              <input type="checkbox" data-check="${item.id}" data-index="${index}" ${done[index] ? "checked" : ""} />
              <span>${esc(line)}</span>
            </label>
          `).join("")}
          <p class="hon"><span>本店</span>${esc(item.honTen)}</p>
        </article>
      `,
        item.title
      );
    }
    return chrome(
      "improve",
      `
      <div class="page-head">
        <div>
          <h1>店舗改善</h1>
          <p class="lede">机の案ではなく、本店で数字が動いた打ち手だけです。読んだだけで終わらないよう、末尾をチェックにしています。</p>
        </div>
        <div class="chips">
          <a class="chip ${!filter ? "is-on" : ""}" href="#/improve">すべて</a>
          ${cats.map((cat) => `
            <a class="chip ${filter === cat ? "is-on" : ""}" href="#/improve?f=${encodeURIComponent(cat)}">${esc(cat)}</a>
          `).join("")}
        </div>
      </div>
      <div class="grid grid-2">
        ${list.map((item) => {
          const done = (checks[item.id] || []).filter(Boolean).length;
          return `
            <a class="tile" href="#/improve/${item.id}">
              <p class="kicker">${esc(item.category)} · ${item.minutes}分 · 確認 ${done}/${item.check.length}</p>
              <h2>${esc(item.title)}</h2>
              <p class="muted">${esc(item.summary)}</p>
            </a>
          `;
        }).join("")}
      </div>
    `,
      "店舗改善"
    );
  }

  function popsView(current) {
    if (current.id) {
      const item = find(DATA.pops, current.id);
      if (!item) return notFound();
      const isStory = item.size.includes("1080");
      return chrome(
        "pops",
        `
        <p><a class="back" href="#/pops">POPにもどる</a></p>
        <div class="grid grid-2">
          <div class="pop-frame">
            <iframe class="pop-preview ${isStory ? "story" : ""}" title="${esc(item.name)}" src="${esc(item.file)}"></iframe>
          </div>
          <article class="card">
            <p class="kicker">${esc(item.size)} · ${esc(item.use)}</p>
            <h1>${esc(item.name)}</h1>
            <p>${esc(item.note)}</p>
            <p class="tiny">掲出期間 ${esc(item.period)}</p>
            <div class="actions no-print">
              <a class="btn" href="${esc(item.file)}" download>データをもらう</a>
              <a class="btn btn-ghost" href="${esc(item.file)}" target="_blank" rel="noopener">印刷用に開く</a>
            </div>
          </article>
        </div>
      `,
        item.name
      );
    }
    return chrome(
      "pops",
      `
      <div class="page-head">
        <div>
          <h1>POPライブラリ</h1>
          <p class="lede">便利な紙を全部置く場所ではありません。使う場所と枚数まで決めてあります。4枚目は捨ててください。</p>
        </div>
      </div>
      <div class="grid grid-3">
        ${DATA.pops.map((item) => `
          <a class="tile" href="#/pops/${item.id}">
            <p class="kicker">${esc(item.size)} · ${esc(item.use)}</p>
            <h2>${esc(item.name)}</h2>
            <p class="muted">${esc(item.note)}</p>
            <p class="tiny">${esc(item.period)}</p>
          </a>
        `).join("")}
      </div>
    `,
      "POP"
    );
  }

  function campaignsView(current) {
    if (current.id) {
      const item = find(DATA.campaigns, current.id);
      if (!item) return notFound();
      return chrome(
        "campaigns",
        `
        <p><a class="back" href="#/campaigns">催しにもどる</a></p>
        <article class="card detail">
          <p class="kicker"><span class="badge ${badgeClass(item.status)}">${esc(item.status)}</span> ${esc(item.period)} · ${esc(item.place)}</p>
          <h1>${esc(item.title)}</h1>
          <p>${esc(item.summary)}</p>
          <p class="tiny">出すもの ${esc(item.offer)}</p>
          <h2>店での進め方</h2>
          <ol class="steps">${item.how.map((step) => `<li><span>${esc(step)}</span></li>`).join("")}</ol>
          <p class="hon"><span>本店の結果</span>${esc(item.result)}</p>
        </article>
      `,
        item.title
      );
    }
    return chrome(
      "campaigns",
      `
      <div class="page-head">
        <div>
          <h1>本店のキャンペーン</h1>
          <p class="lede">ポスターの共有ではなく、本店で先行した進め方と数字です。値引きの話より先に、置き方を揃えます。</p>
        </div>
      </div>
      <div class="grid grid-2">
        ${DATA.campaigns.map((item) => `
          <a class="tile" href="#/campaigns/${item.id}">
            <p class="kicker"><span class="badge ${badgeClass(item.status)}">${esc(item.status)}</span> ${esc(item.period)}</p>
            <h2>${esc(item.title)}</h2>
            <p class="muted">${esc(item.summary)}</p>
          </a>
        `).join("")}
      </div>
    `,
      "キャンペーン"
    );
  }

  function drinksView(current) {
    if (current.id) {
      const item = find(DATA.drinks, current.id);
      if (!item) return notFound();
      return chrome(
        "drinks",
        `
        <p><a class="back" href="#/drinks">一杯にもどる</a></p>
        <article class="card detail">
          <p class="kicker">
            <span class="rank">${item.rank}</span>
            ${item.tags.map((tag) => `<span class="tag-pill">${esc(tag)}</span>`).join("")}
          </p>
          <h1>${esc(item.name)}</h1>
          <p>${esc(item.blurb)}</p>
          <p><span class="price">${esc(item.price)}</span> <span class="tiny">${esc(item.temp)} · 原価 ${esc(item.cost)}</span></p>
          <h2>レシピ</h2>
          <ol class="steps">${item.recipe.map((step) => `<li><span>${esc(step)}</span></li>`).join("")}</ol>
          <h2>現場のコツ</h2>
          <ul class="list">${item.tips.map((tip) => `<li>${esc(tip)}</li>`).join("")}</ul>
          <p class="fail"><strong>やりがちな失敗</strong> ${esc(item.fail)}</p>
          <p class="talk">推奨トーク「${esc(item.talk)}」</p>
          <div class="actions no-print">
            <button class="btn" type="button" data-action="print">壁に貼る用に印刷</button>
          </div>
        </article>
      `,
        item.name
      );
    }
    return chrome(
      "drinks",
      `
      <div class="page-head">
        <div>
          <h1>人気のドリンク</h1>
          <p class="lede">名前と写真だけでは店は売れません。原価・失敗・言い方まで本店の勝ち方を添えています。</p>
        </div>
      </div>
      <div class="grid">
        ${DATA.drinks.map((item) => `
          <a class="tile" href="#/drinks/${item.id}">
            <p class="kicker"><span class="rank">${item.rank}</span> ${esc(item.temp)} · ${esc(item.price)}</p>
            <h2>${esc(item.name)}</h2>
            <p class="muted">${esc(item.blurb)}</p>
            <p class="tiny">原価 ${esc(item.cost)} · ${item.tags.map((tag) => esc(tag)).join(" / ")}</p>
          </a>
        `).join("")}
      </div>
    `,
      "人気のドリンク"
    );
  }

  function manualsView() {
    return chrome(
      "manuals",
      `
      <div class="page-head">
        <div>
          <h1>手順</h1>
          <p class="lede">改善案の前に、朝と事故の型を揃えます。印刷して壁に貼れる長さにしてあります。</p>
        </div>
      </div>
      <div class="grid">
        ${DATA.manuals.map((item) => `
          <article class="card">
            <h2>${esc(item.title)}</h2>
            <p>${esc(item.body)}</p>
          </article>
        `).join("")}
      </div>
    `,
      "手順"
    );
  }

  function calendarView() {
    const today = todayIso();
    return chrome(
      "calendar",
      `
      <div class="page-head">
        <div>
          <h1>発注と催しの暦</h1>
          <p class="lede">キャンペーン開始日より、仕入れの締切の方が現場は見ます。</p>
        </div>
      </div>
      <article class="card">
        ${DATA.calendar.map((item) => `
          <div class="cal-row">
            <strong>${fmtDateLong(item.date)}${item.date === today ? " 今日" : ""}</strong>
            <div><span class="badge ${badgeClass(item.kind)}">${esc(item.kind)}</span> ${esc(item.title)}</div>
          </div>
        `).join("")}
      </article>
    `,
      "暦"
    );
  }

  function storiesView() {
    return chrome(
      "stories",
      `
      <div class="page-head">
        <div>
          <h1>現場の話</h1>
          <p class="lede">本部の机の案より、隣の店の一文の方が実装されます。短い失敗も載せています。</p>
        </div>
      </div>
      <div class="grid">
        ${DATA.stories.map((item) => `
          <article class="card">
            <p class="kicker">${esc(item.store)}</p>
            <h2>${esc(item.title)}</h2>
            <p>${esc(item.body)}</p>
          </article>
        `).join("")}
      </div>
    `,
      "現場の話"
    );
  }

  function contactView() {
    const mails = loadJSON(KEY.mails, []);
    return chrome(
      "contact",
      `
      <div class="page-head">
        <div>
          <h1>本部へ</h1>
          <p class="lede">${esc(DATA.hq.note)} ${esc(DATA.hq.hours)}</p>
        </div>
      </div>
      <div class="grid grid-2">
        <form class="card" data-action="mail">
          <label class="field">
            <span>種別</span>
            <select name="type" required>
              ${DATA.contactTypes.map((item) => `<option value="${esc(item.id)}">${esc(item.label)}</option>`).join("")}
            </select>
          </label>
          <label class="field">
            <span>本文（時間・商品・いま店にある事実）</span>
            <textarea name="body" required placeholder="例: 蜜芋ペーストが本日15時で切れそうです。火曜便は2kg上限のままですか。"></textarea>
          </label>
          <button class="btn" type="submit">送る（この店の端末に控えが残ります）</button>
          <p class="tiny">実サーバ未接続の試し見です。送った内容はブラウザにだけ残します。</p>
        </form>
        <article class="card">
          <p class="kicker">この店から出した控え</p>
          ${mails.length ? mails.map((item) => `
            <div class="mail-row">
              <strong>${esc(item.when)}</strong>
              <div>
                <span class="badge badge-info">${esc(item.typeLabel)}</span>
                <p>${esc(item.body)}</p>
              </div>
            </div>
          `).join("") : '<p class="muted">まだありません。欠品・クレーム・希望を同じ型で残してください。</p>'}
        </article>
      </div>
    `,
      "本部へ"
    );
  }

  function searchView(current) {
    const rows = searchAll(current.q);
    return chrome(
      "home",
      `
      <div class="page-head">
        <div>
          <h1>検索</h1>
          <p class="lede">「${esc(current.q)}」 ${rows.length}件</p>
        </div>
      </div>
      <div class="grid">
        ${rows.map((item) => `
          <a class="tile" href="${esc(item.href)}">
            <p class="kicker">${esc(item.kind)}</p>
            <h2>${esc(item.title)}</h2>
            <p class="muted">${esc(item.text)}</p>
          </a>
        `).join("") || '<p class="empty card">見つかりませんでした。通達・改善・POP・催し・一杯を横断しています。</p>'}
      </div>
    `,
      "検索"
    );
  }

  function notFound() {
    return chrome(
      "home",
      `<article class="card"><h1>見つかりません</h1><p><a href="#/home">今日にもどる</a></p></article>`,
      "見つかりません"
    );
  }

  function render(error) {
    const app = document.getElementById("app");
    const current = route();
    const user = session();
    if (!user && current.name !== "login") {
      location.hash = "#/login";
      app.innerHTML = loginView(error);
      return;
    }
    if (user && (current.name === "login" || !location.hash)) {
      location.hash = "#/home";
    }
    const views = {
      login: () => loginView(error),
      home: () => homeView(),
      notices: () => noticesView(current),
      improve: () => improveView(current),
      pops: () => popsView(current),
      campaigns: () => campaignsView(current),
      drinks: () => drinksView(current),
      manuals: () => manualsView(),
      calendar: () => calendarView(),
      stories: () => storiesView(),
      contact: () => contactView(),
      search: () => searchView(current),
    };
    app.innerHTML = (views[current.name] || notFound)();
    const searchInput = app.querySelector("#q");
    if (searchInput && current.q) searchInput.value = current.q;
  }

  function onLogin(form) {
    const storeId = String(form.storeId.value || "").trim().toUpperCase();
    const password = String(form.password.value || "");
    if (storeId === DATA.demo.storeId && password === DATA.demo.password) {
      saveJSON(KEY.session, {
        storeId: DATA.demo.storeId,
        storeName: DATA.demo.storeName,
        owner: DATA.demo.owner,
      });
      location.hash = "#/home";
      render();
      return;
    }
    render("店番か合言葉が違います。試し見は FC-014 / tsukimi です。");
  }

  document.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-action]");
    if (!form) return;
    event.preventDefault();
    if (form.dataset.action === "login") {
      onLogin(form);
      return;
    }
    if (form.dataset.action === "search") {
      const q = String(form.q.value || "").trim();
      location.hash = q ? `#/search?q=${encodeURIComponent(q)}` : "#/home";
      return;
    }
    if (form.dataset.action === "mail") {
      const type = DATA.contactTypes.find((item) => item.id === form.type.value);
      const mails = loadJSON(KEY.mails, []);
      mails.unshift({
        when: fmtDateLong(todayIso()),
        type: form.type.value,
        typeLabel: type ? type.label : form.type.value,
        body: String(form.body.value || "").trim(),
      });
      saveJSON(KEY.mails, mails.slice(0, 20));
      form.reset();
      render();
    }
  });

  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;
    if (action === "logout") {
      localStorage.removeItem(KEY.session);
      location.hash = "#/login";
      render();
      return;
    }
    if (action === "print") {
      window.print();
      return;
    }
    if (action === "more") {
      const sheet = document.getElementById("more-sheet");
      if (sheet) {
        sheet.hidden = false;
        sheet.classList.add("is-open");
      }
      return;
    }
    if (action === "close-more") {
      const sheet = document.getElementById("more-sheet");
      if (sheet) {
        sheet.hidden = true;
        sheet.classList.remove("is-open");
      }
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.id === "more-sheet") {
      event.target.hidden = true;
      event.target.classList.remove("is-open");
    }
  });

  document.addEventListener("change", (event) => {
    const qsc = event.target.closest("[data-qsc]");
    if (qsc) {
      const state = loadJSON(KEY.qsc, {});
      state[qsc.dataset.qsc] = qsc.checked;
      saveJSON(KEY.qsc, state);
      return;
    }
    const box = event.target.closest("[data-check]");
    if (!box) return;
    const state = loadJSON(KEY.checks, {});
    const id = box.dataset.check;
    const index = Number(box.dataset.index);
    const next = state[id] ? [...state[id]] : [];
    next[index] = box.checked;
    state[id] = next;
    saveJSON(KEY.checks, state);
    render();
  });

  window.addEventListener("hashchange", () => render());
  if (!location.hash) {
    location.hash = session() ? "#/home" : "#/login";
  }
  render();
})();
