(() => {
  const STORAGE_KEY = "part107-quiz-progress-v1";
  const LETTERS = ["A", "B", "C", "D"];

  const state = {
    view: "home",
    deck: [],
    index: 0,
    selected: null,
    revealed: false,
    session: { correct: 0, wrong: 0, idk: 0, answered: 0 },
  };

  const $ = (sel) => document.querySelector(sel);

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveProgress(patch) {
    const cur = loadProgress();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...patch, updatedAt: Date.now() }));
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function startDeck(filterFn, label) {
    const all = window.PART107_QUESTIONS || [];
    let deck = all.filter(filterFn);
    deck = shuffle(deck);
    if (!deck.length) {
      alert("No questions in this deck yet.");
      return;
    }
    state.view = "quiz";
    state.deck = deck;
    state.index = 0;
    state.selected = null;
    state.revealed = false;
    state.session = { correct: 0, wrong: 0, idk: 0, answered: 0, label };
    render();
  }

  function currentQ() {
    return state.deck[state.index];
  }

  function grade(choice) {
    if (state.revealed) return;
    const q = currentQ();
    state.selected = choice;
    state.revealed = true;
    state.session.answered += 1;
    if (choice === "D") state.session.idk += 1;
    else if (choice === q.correct) state.session.correct += 1;
    else state.session.wrong += 1;

    const prog = loadProgress();
    const weak = new Set(prog.weakAcs || []);
    if (choice !== q.correct) weak.add(q.acs);
    else weak.delete(q.acs);
    saveProgress({
      weakAcs: [...weak],
      lastTopic: q.topic,
      totals: {
        correct: (prog.totals?.correct || 0) + (choice === q.correct ? 1 : 0),
        attempts: (prog.totals?.attempts || 0) + 1,
      },
    });
    render();
  }

  function next() {
    if (state.index >= state.deck.length - 1) {
      state.view = "done";
      render();
      return;
    }
    state.index += 1;
    state.selected = null;
    state.revealed = false;
    render();
  }

  function rwy13Teach() {
    return `
      <div class="teach">
        <strong>Quick visual — left downwind to RWY 13</strong>
        <p style="color:var(--muted);margin:6px 0 0">Face the landing direction (SE). Left = east side of the runway. Downwind flies NW on that side.</p>
        <svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="520" height="300" fill="#0a1020"/>
          <text x="16" y="28" fill="#94a3b8" font-size="14">North ↑</text>
          <text x="500" y="28" fill="#94a3b8" font-size="13" text-anchor="end">E →</text>
          <g transform="translate(260,155) rotate(40)">
            <rect x="-110" y="-14" width="220" height="28" rx="4" fill="#64748b"/>
            <text x="-95" y="5" fill="#0f172a" font-size="14" font-weight="700">31</text>
            <text x="72" y="5" fill="#0f172a" font-size="14" font-weight="700">13</text>
            <path d="M -40 0 L 50 0" stroke="#38bdf8" stroke-width="3"/>
          </g>
          <text x="355" y="240" fill="#cbd5e1" font-size="13">SE end (landing 13)</text>
          <text x="400" y="110" fill="#4ade80" font-size="15" font-weight="700">EAST side</text>
          <circle cx="390" cy="150" r="10" fill="#4ade80"/>
          <path d="M 390 150 L 335 115" stroke="#4ade80" stroke-width="3"/>
          <text x="250" y="55" fill="#4ade80" font-size="14" font-weight="700">✈ midfield LEFT DOWNWIND</text>
          <text x="40" y="280" fill="#38bdf8" font-size="13">Landing RWY 13 → southeast · “Left” = left when facing that way</text>
        </svg>
      </div>`;
  }

  function renderHome() {
    const prog = loadProgress();
    const weakN = (prog.weakAcs || []).length;
    return `
      <header>
        <div>
          <h1>Part 107 Quiz Lab</h1>
          <p>Learn by testing · every question includes “I don’t know”</p>
        </div>
        <div class="stats">
          <div class="stat">Lifetime <b>${prog.totals?.correct || 0}</b> / ${prog.totals?.attempts || 0}</div>
          <div class="stat">Weak ACS codes <b>${weakN}</b></div>
        </div>
      </header>
      <div class="home-grid">
        <button class="mode-card" data-mode="focus-charts">
          <h2>Charts & figures</h2>
          <p>Sectionals, METAR plots, load factor — images inline.</p>
        </button>
        <button class="mode-card" data-mode="all">
          <h2>Mixed deck</h2>
          <p>All practice items shuffled.</p>
        </button>
        <button class="mode-card" data-mode="regs">
          <h2>Regs & weather (no charts)</h2>
          <p>Quick verbal knowledge drills.</p>
        </button>
        <button class="mode-card" data-mode="rwy13">
          <h2>RWY 13 workshop</h2>
          <p>Just the traffic-pattern item + diagram.</p>
        </button>
      </div>
      <p style="color:var(--muted);margin-top:18px;font-size:0.9rem">
        <a href="../" style="color:var(--accent)">Part 107 home</a>
      </p>`;
  }

  function renderQuiz() {
    const q = currentQ();
    const total = state.deck.length;
    const n = state.index + 1;
    const pct = Math.round(((n - (state.revealed ? 0 : 1)) / total) * 100);
    const img = q.figure ? `images/fig${q.figure}.jpg` : null;

    const choiceButtons = ["A", "B", "C"]
      .map((L) => {
        let cls = "choice";
        if (state.revealed) {
          if (L === q.correct) cls += " correct";
          else if (L === state.selected && L !== q.correct) cls += " wrong";
        }
        return `<button class="${cls}" data-choice="${L}" ${state.revealed ? "disabled" : ""}>
          <span class="letter">${L}</span><span>${q.choices[L]}</span>
        </button>`;
      })
      .join("");

    let idkCls = "choice idk";
    if (state.revealed && state.selected === "D") idkCls += " wrong";

    let reveal = "";
    if (state.revealed) {
      const kind =
        state.selected === q.correct ? "ok" : state.selected === "D" ? "idk" : "bad";
      const title =
        state.selected === q.correct
          ? `Correct — ${q.correct}`
          : state.selected === "D"
            ? `Answer: ${q.correct}`
            : `Not quite — correct is ${q.correct}`;
      reveal = `
        <div class="reveal ${kind}">
          <h3>${title}</h3>
          <div>${q.explain}</div>
          ${q.trap ? `<div class="trap"><b>Trap:</b> ${q.trap}</div>` : ""}
          <div class="trap">ACS ${q.acs}</div>
        </div>
        ${q.teach === "rwy13" ? rwy13Teach() : ""}
      `;
    }

    return `
      <header>
        <div>
          <h1>${state.session.label || "Quiz"}</h1>
          <p>Question ${n} of ${total}</p>
        </div>
        <div class="stats">
          <div class="stat">✓ <b>${state.session.correct}</b></div>
          <div class="stat">✗ <b>${state.session.wrong}</b></div>
          <div class="stat">? <b>${state.session.idk}</b></div>
        </div>
      </header>
      <div class="progress-bar"><span style="width:${Math.max(pct, Math.round((n / total) * 100))}%"></span></div>
      <div class="card">
        <div class="meta">
          <span class="pill">${q.topic}</span>
          <span class="pill">${q.acs}</span>
          ${q.figure ? `<span class="pill">Figure ${q.figure}</span>` : ""}
        </div>
        ${img ? `<div class="figure-wrap" data-zoom-src="${img}" data-zoom-alt="FAA Figure ${q.figure}" title="Click to zoom"><img src="${img}" alt="FAA Figure ${q.figure}" /></div>` : ""}
        ${q.figureNote ? `<p class="figure-note">${q.figureNote}</p>` : ""}
        <p class="stem">${q.stem}</p>
        <div class="choices">
          ${choiceButtons}
          <button class="${idkCls}" data-choice="D" ${state.revealed ? "disabled" : ""}>
            <span class="letter">D</span><span>I don't know</span>
          </button>
        </div>
        ${reveal}
        <div class="footer-actions">
          <button data-action="home">Home</button>
          <button class="primary" data-action="next" ${state.revealed ? "" : "disabled"}>
            ${state.index >= state.deck.length - 1 ? "Finish" : "Next question"}
          </button>
        </div>
      </div>`;
  }

  function renderDone() {
    const s = state.session;
    return `
      <header>
        <div>
          <h1>Session complete</h1>
          <p>${s.label || "Quiz"}</p>
        </div>
      </header>
      <div class="card">
        <div class="stats" style="margin-bottom:16px">
          <div class="stat">Correct <b>${s.correct}</b></div>
          <div class="stat">Wrong <b>${s.wrong}</b></div>
          <div class="stat">I don't know <b>${s.idk}</b></div>
          <div class="stat">Answered <b>${s.answered}</b></div>
        </div>
        <p style="color:var(--muted)">“I don’t know” counts as practice, not failure — those ACS codes stay in your weak list.</p>
        <div class="footer-actions">
          <button data-action="home">Home</button>
          <button class="primary" data-action="retry">Retry this deck</button>
        </div>
      </div>`;
  }

  function render() {
    const root = $("#app");
    if (state.view === "home") root.innerHTML = renderHome();
    else if (state.view === "done") root.innerHTML = renderDone();
    else root.innerHTML = renderQuiz();
  }


  function ensureLightbox() {
    if (document.getElementById("figure-lightbox")) return;
    const el = document.createElement("div");
    el.id = "figure-lightbox";
    el.className = "figure-lightbox";
    el.hidden = true;
    el.innerHTML = `
      <div class="lb-toolbar">
        <div class="lb-hint">Drag to pan · scroll / pinch to zoom · Esc to close</div>
        <div class="lb-tools">
          <button type="button" data-lb="out">−</button>
          <button type="button" data-lb="in">+</button>
          <button type="button" data-lb="reset">Reset</button>
          <button type="button" class="primary" data-lb="close">Close</button>
        </div>
      </div>
      <div class="lb-stage" id="lb-stage"><img id="lb-img" alt="" /></div>
    `;
    document.body.appendChild(el);

    const stage = el.querySelector("#lb-stage");
    const img = el.querySelector("#lb-img");
    const zoom = { scale: 1, x: 0, y: 0, min: 0.4, max: 8 };
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let pointers = new Map();
    let pinchStartDist = 0;
    let pinchStartScale = 1;

    function apply() {
      img.style.transform = `translate(-50%, -50%) translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.scale})`;
    }

    function fit() {
      const sw = stage.clientWidth;
      const sh = stage.clientHeight;
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;
      if (!iw || !ih) return;
      const fitScale = Math.min(sw / iw, sh / ih) * 0.95;
      zoom.scale = Math.max(fitScale, 0.2);
      zoom.x = 0;
      zoom.y = 0;
      img.style.width = iw + "px";
      img.style.height = ih + "px";
      apply();
    }

    function open(src, alt) {
      img.onload = () => fit();
      img.src = src;
      img.alt = alt || "";
      el.hidden = false;
      document.body.style.overflow = "hidden";
    }

    function close() {
      el.hidden = true;
      document.body.style.overflow = "";
      img.src = "";
    }

    function zoomBy(factor, cx, cy) {
      const rect = stage.getBoundingClientRect();
      const px = (cx ?? rect.left + rect.width / 2) - rect.left - rect.width / 2;
      const py = (cy ?? rect.top + rect.height / 2) - rect.top - rect.height / 2;
      const prev = zoom.scale;
      const next = Math.min(zoom.max, Math.max(zoom.min, prev * factor));
      if (next === prev) return;
      // zoom toward cursor
      zoom.x = px - ((px - zoom.x) * next) / prev;
      zoom.y = py - ((py - zoom.y) * next) / prev;
      zoom.scale = next;
      apply();
    }

    el.addEventListener("click", (e) => {
      const act = e.target.closest("[data-lb]")?.dataset.lb;
      if (act === "close") close();
      if (act === "in") zoomBy(1.25);
      if (act === "out") zoomBy(1 / 1.25);
      if (act === "reset") fit();
    });

    stage.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
        zoomBy(factor, e.clientX, e.clientY);
      },
      { passive: false }
    );

    stage.addEventListener("pointerdown", (e) => {
      stage.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 1) {
        dragging = true;
        stage.classList.add("dragging");
        lastX = e.clientX;
        lastY = e.clientY;
      } else if (pointers.size === 2) {
        dragging = false;
        const pts = [...pointers.values()];
        pinchStartDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        pinchStartScale = zoom.scale;
      }
    });

    stage.addEventListener("pointermove", (e) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2) {
        const pts = [...pointers.values()];
        const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        if (pinchStartDist > 0) {
          const next = Math.min(zoom.max, Math.max(zoom.min, pinchStartScale * (dist / pinchStartDist)));
          zoom.scale = next;
          apply();
        }
        return;
      }
      if (!dragging) return;
      zoom.x += e.clientX - lastX;
      zoom.y += e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      apply();
    });

    function endPointer(e) {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) {
        pinchStartDist = 0;
      }
      if (pointers.size === 0) {
        dragging = false;
        stage.classList.remove("dragging");
      }
    }
    stage.addEventListener("pointerup", endPointer);
    stage.addEventListener("pointercancel", endPointer);

    document.addEventListener("keydown", (e) => {
      if (el.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "+" || e.key === "=") zoomBy(1.25);
      if (e.key === "-" || e.key === "_") zoomBy(1 / 1.25);
      if (e.key === "0") fit();
    });

    window.__openFigureLightbox = open;
  }

  function onClick(e) {
    const zoomEl = e.target.closest("[data-zoom-src]");
    if (zoomEl) {
      ensureLightbox();
      window.__openFigureLightbox(zoomEl.dataset.zoomSrc, zoomEl.dataset.zoomAlt);
      return;
    }
    const mode = e.target.closest("[data-mode]")?.dataset.mode;
    if (mode === "focus-charts")
      startDeck((q) => q.figure != null, "Charts & figures");
    if (mode === "all") startDeck(() => true, "Mixed deck");
    if (mode === "regs") startDeck((q) => q.figure == null, "Regs & weather");
    if (mode === "rwy13")
      startDeck((q) => q.id === "rwy13-pattern", "RWY 13 workshop");

    const choice = e.target.closest("[data-choice]")?.dataset.choice;
    if (choice) grade(choice);

    const action = e.target.closest("[data-action]")?.dataset.action;
    if (action === "next") next();
    if (action === "home") {
      state.view = "home";
      render();
    }
    if (action === "retry") {
      const label = state.session.label;
      if (label === "Charts & figures") startDeck((q) => q.figure != null, label);
      else if (label === "Regs & weather") startDeck((q) => q.figure == null, label);
      else if (label === "RWY 13 workshop")
        startDeck((q) => q.id === "rwy13-pattern", label);
      else startDeck(() => true, label || "Mixed deck");
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    ensureLightbox();
    $("#app").addEventListener("click", onClick);
    render();
  });
})();
