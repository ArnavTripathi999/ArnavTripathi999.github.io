/* =========================================================
   Arnav Tripathi — Portfolio · shared site script
   Edit the SITE block below to change links, email and the
   contact form endpoint. Everything else runs automatically.
   ========================================================= */

const SITE = {
  name: "Arnav Tripathi",
  handle: "SMooKER_999",
  email: "arnavcoder2011@gmail.com",
  // Contact form backend (FormSubmit, free, no account). Messages arrive at the email above.
  // Left empty, the form opens the visitor's email app instead.
  formEndpoint: "https://formsubmit.co/ajax/arnavcoder2011@gmail.com",
  links: {
    github: "https://github.com/ArnavTripathi999",
    linkedin: "https://www.linkedin.com/in/arnav-tripathi-0b8a48376",
    youtube: "https://www.youtube.com/@NoteXStudios",
    instagram: "https://www.instagram.com/notex.studios.games/",
    discord: "ballers_999",
    studio: "https://www.notexstudios.in",
    steam: "https://store.steampowered.com/app/4607190/Phantom_Echoes_Chapter_I/",
  },
};

const ROOT = document.documentElement.dataset.root || "";
const PAGE = document.body.dataset.page || "";
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  sget(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
  sset(k, v) { try { sessionStorage.setItem(k, v); } catch {} },
};

/* ---------- Icons ---------- */
const ICON = {
  github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.08 0 12 0 12s0 3.92.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.3"/><circle cx="17.6" cy="6.4" r="1" fill="currentColor" stroke="none"/></svg>',
  discord: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.32 4.37A19.8 19.8 0 0 0 15.4 2.8l-.62 1.27a18.3 18.3 0 0 0-5.56 0L8.6 2.8a19.7 19.7 0 0 0-4.93 1.57C.55 9.05-.3 13.6.12 18.1a19.9 19.9 0 0 0 6.04 3.06l1.3-1.77a12.9 12.9 0 0 1-2.04-.98l.5-.38a14.2 14.2 0 0 0 12.16 0l.5.38c-.65.38-1.33.71-2.04.98l1.3 1.77a19.8 19.8 0 0 0 6.04-3.06c.5-5.22-.84-9.73-3.56-13.73ZM8.02 15.33c-1.18 0-2.15-1.09-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.2 0 2.17 1.1 2.15 2.42 0 1.33-.95 2.42-2.15 2.42Zm7.96 0c-1.18 0-2.15-1.09-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.2 0 2.17 1.1 2.15 2.42 0 1.33-.95 2.42-2.15 2.42Z"/></svg>',
  steam: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.98 0A12 12 0 0 0 .02 11.04l6.43 2.66a3.38 3.38 0 0 1 2.15-.6l2.86-4.15v-.06a4.53 4.53 0 1 1 4.53 4.53h-.1l-4.08 2.91c0 .05.01.1.01.16a3.4 3.4 0 0 1-6.73.67L.48 15.5A12 12 0 1 0 11.98 0ZM7.54 18.21l-1.47-.61a2.55 2.55 0 1 0 1.4-3.37l1.52.63a1.88 1.88 0 1 1-1.45 3.35Zm11.42-9.3a3.02 3.02 0 1 0-6.04 0 3.02 3.02 0 0 0 6.04 0Zm-5.28-.01a2.27 2.27 0 1 1 4.53 0 2.27 2.27 0 0 1-4.53 0Z"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.6 2.8 3.9 6 3.9 9.5s-1.3 6.7-3.9 9.5c-2.6-2.8-3.9-6-3.9-9.5s1.3-6.7 3.9-9.5Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="1"/><path d="m3 5.5 9 7 9-7"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h12"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19"/></svg>',
  ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>',
  chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
};

/* ---------- Header + footer ---------- */
function buildChrome() {
  const cur = (p) => (PAGE === p ? ' aria-current="page"' : "");
  const portfolioActive = ["portfolio", "gallery", "project"].includes(PAGE);
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="wrap">
      <a class="brand" href="${ROOT}index.html" aria-label="Arnav Tripathi, home">
        <span class="brand-mark">AT</span>
        <span class="brand-text"><strong>Arnav Tripathi</strong><span>3D ARTIST · ANIMATOR · UNITY DEV</span></span>
      </a>
      <nav class="nav" id="site-nav" aria-label="Main">
        <a href="${ROOT}index.html"${cur("home")}><span class="num">01</span> Home</a>
        <div class="dd${portfolioActive ? " active" : ""}">
          <button type="button" aria-expanded="false" aria-haspopup="true"><span class="num">02</span> Portfolio ${ICON.chev}</button>
          <div class="dd-menu">
            <a href="${ROOT}portfolio.html"${cur("portfolio")}>Projects<small>Games &amp; case studies</small></a>
            <a href="${ROOT}gallery.html"${cur("gallery")}>Gallery<small>3D art, renders &amp; viewer</small></a>
          </div>
        </div>
        <a href="${ROOT}marketplace.html"${cur("marketplace")}><span class="num">03</span> Marketplace</a>
        <a href="${ROOT}contact.html"${cur("contact")}><span class="num">04</span> Bio &amp; Contact</a>
        <a href="${SITE.links.github}" target="_blank" rel="noopener"><span class="num">05</span> GitHub ${ICON.ext}</a>
      </nav>
      <div class="header-tools">
        <button class="icon-btn sound-btn" type="button" aria-pressed="false" aria-label="Toggle ambient sound" title="Ambient sound">
          <span class="sound-bars"><i></i><i></i><i></i><i></i></span>
        </button>
        <button class="icon-btn menu-btn" type="button" aria-label="Open menu" aria-controls="site-nav" aria-expanded="false">${ICON.menu}</button>
      </div>
    </div>`;
  document.body.prepend(header);

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  const year = new Date().getFullYear();
  footer.innerHTML = `
    <div class="wrap">
      <div class="foot-grid">
        <div>
          <div class="brand" style="margin-bottom:16px"><span class="brand-mark">AT</span><span class="brand-text"><strong>Arnav Tripathi</strong><span>aka ${SITE.handle}</span></span></div>
          <p style="max-width:34ch">3D artist, animator and Unity developer. Co-founder of NoteX Studios, Delhi NCR.</p>
        </div>
        <div><h4>Explore</h4><ul>
          <li><a href="${ROOT}index.html">Home</a></li>
          <li><a href="${ROOT}portfolio.html">Projects</a></li>
          <li><a href="${ROOT}gallery.html">Gallery</a></li>
          <li><a href="${ROOT}marketplace.html">Marketplace</a></li>
          <li><a href="${ROOT}contact.html">Bio &amp; Contact</a></li>
        </ul></div>
        <div><h4>Social</h4><ul>
          <li><a href="${SITE.links.github}" target="_blank" rel="noopener">GitHub</a></li>
          <li><a href="${SITE.links.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a href="${SITE.links.youtube}" target="_blank" rel="noopener">YouTube</a></li>
          <li><a href="${SITE.links.instagram}" target="_blank" rel="noopener">Instagram</a></li>
        </ul></div>
        <div><h4>Studio</h4><ul>
          <li><a href="${SITE.links.studio}" target="_blank" rel="noopener">NoteX Studios</a></li>
          <li><a href="${SITE.links.steam}" target="_blank" rel="noopener">Phantom Echoes on Steam</a></li>
          <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
        </ul></div>
      </div>
      <div class="foot-bottom">
        <span>© ${year} Arnav Tripathi · NoteX Studios</span>
        <button class="secret" type="button" data-egg title="Something is watching">↑ ↑ ↓ ↓ ← → ← → B A</button>
      </div>
    </div>`;
  document.body.append(footer);

  // FX layers
  const fx = document.createElement("div");
  fx.innerHTML = '<div class="grain" aria-hidden="true"></div><div class="vignette" aria-hidden="true"></div><div class="page-wipe" aria-hidden="true"></div>';
  document.body.append(...fx.children);

  // Scrolled state
  const onScroll = () => header.classList.toggle("scrolled", scrollY > 30);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const nav = header.querySelector(".nav");
  const menuBtn = header.querySelector(".menu-btn");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    header.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.innerHTML = open ? ICON.close : ICON.menu;
    document.body.style.overflow = open ? "hidden" : "";
  });
  // Dropdown on click (touch + keyboard)
  const dd = header.querySelector(".dd");
  const ddBtn = dd.querySelector("button");
  ddBtn.addEventListener("click", () => {
    const open = dd.classList.toggle("open");
    ddBtn.setAttribute("aria-expanded", open);
  });
  document.addEventListener("click", (e) => { if (!dd.contains(e.target)) { dd.classList.remove("open"); ddBtn.setAttribute("aria-expanded", "false"); } });
}

/* ---------- Loading screen (once per visit) ---------- */
function loader() {
  if (store.sget("seenLoader") || reduceMotion) return Promise.resolve();
  store.sset("seenLoader", "1");
  const tips = [
    "Some doors are better left <b>closed</b>.",
    "If the lights flicker, <b>stop moving</b>.",
    "Listen. The hotel <b>breathes</b>.",
    "Every echo was once a <b>voice</b>.",
    "Press <b>↑↑↓↓←→←→BA</b> if you're brave.",
  ];
  const el = document.createElement("div");
  el.className = "loader";
  el.setAttribute("role", "status");
  el.innerHTML = `
    <div class="loader-top"><span>NoteX Studios</span><span>Build 2026.10</span></div>
    <div class="loader-center">
      <div class="presents">A NoteX Studios artist presents</div>
      <div class="title glitch" data-text="Arnav Tripathi">Arnav Tripathi</div>
      <div class="presents">Portfolio · Chapter 01</div>
    </div>
    <div class="loader-foot">
      <div class="loader-row"><span class="tip">TIP: ${tips[Math.floor(Math.random() * tips.length)]}</span><span class="pct">0%</span></div>
      <div class="loader-bar"><i></i></div>
      <div class="loader-row"><span>Loading assets…</span><span class="press" hidden>Press any key</span></div>
    </div>`;
  document.body.append(el);
  document.body.style.overflow = "hidden";
  const bar = el.querySelector(".loader-bar i");
  const pct = el.querySelector(".pct");
  const title = el.querySelector(".glitch");
  return new Promise((resolve) => {
    let p = 0, loaded = document.readyState === "complete";
    addEventListener("load", () => (loaded = true), { once: true });
    const glitchT = setInterval(() => { title.classList.add("is-glitching"); setTimeout(() => title.classList.remove("is-glitching"), 350); }, 900);
    const tick = setInterval(() => {
      const target = loaded ? 100 : 88;
      p = Math.min(target, p + Math.random() * (loaded ? 14 : 6));
      bar.style.transform = `scaleX(${p / 100})`;
      pct.textContent = Math.round(p) + "%";
      if (p >= 100) {
        clearInterval(tick);
        el.querySelector(".loader-row:last-child span").textContent = "Ready.";
        el.querySelector(".press").hidden = false;
        const go = () => {
          clearInterval(glitchT);
          el.classList.add("done");
          document.body.style.overflow = "";
          removeEventListener("keydown", go); el.removeEventListener("click", go);
          setTimeout(() => el.remove(), 900);
          resolve();
        };
        addEventListener("keydown", go, { once: true });
        el.addEventListener("click", go, { once: true });
        setTimeout(go, 1600); // auto-continue
      }
    }, 90);
  });
}

/* ---------- Page transitions ---------- */
function transitions() {
  if (reduceMotion) return;
  document.body.classList.add("entering");
  // A timer (not requestAnimationFrame) so the wipe always clears, even in a background tab.
  setTimeout(() => { document.body.classList.add("entered"); document.body.classList.remove("entering"); }, 40);
  const wipe = document.querySelector(".page-wipe");
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname || a.hasAttribute("download") || a.getAttribute("href").startsWith("#") || url.protocol === "mailto:") return;
    e.preventDefault();
    document.body.classList.remove("entered");
    wipe.classList.add("cover");
    sound.whoosh();
    setTimeout(() => (location.href = a.href), 430);
  });
  addEventListener("pageshow", (e) => { if (e.persisted) { wipe.classList.remove("cover"); document.body.classList.add("entered"); } });
}

/* ---------- Custom cursor ---------- */
function cursor() {
  if (!finePointer || reduceMotion) return;
  document.documentElement.classList.add("has-cursor");
  const dot = Object.assign(document.createElement("div"), { className: "cursor" });
  const ring = Object.assign(document.createElement("div"), { className: "cursor-ring" });
  ring.innerHTML = '<span class="txt"></span>';
  document.body.append(dot, ring);
  let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
  addEventListener("pointermove", (e) => { x = e.clientX; y = e.clientY; dot.style.transform = `translate(${x}px,${y}px)`; }, { passive: true });
  addEventListener("pointerdown", () => ring.classList.add("down"));
  addEventListener("pointerup", () => ring.classList.remove("down"));
  (function loop() { rx += (x - rx) * 0.18; ry += (y - ry) * 0.18; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(loop); })();
  const txt = ring.querySelector(".txt");
  document.addEventListener("pointerover", (e) => {
    const t = e.target.closest("[data-cursor], a, button, .shot, summary, label");
    if (!t) return;
    const label = t.closest("[data-cursor]")?.dataset.cursor;
    if (label) { txt.textContent = label; ring.classList.add("has-text"); } else ring.classList.add("hover");
    sound.tick();
  });
  document.addEventListener("pointerout", (e) => {
    const t = e.target.closest("[data-cursor], a, button, .shot, summary, label");
    if (t && !t.contains(e.relatedTarget)) ring.classList.remove("hover", "has-text");
  });
  document.addEventListener("mouseleave", () => { dot.style.opacity = ring.style.opacity = 0; });
  document.addEventListener("mouseenter", () => { dot.style.opacity = ring.style.opacity = 1; });
}

/* ---------- Scroll reveal + glitch titles ---------- */
function reveals() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || reduceMotion) { els.forEach((el) => el.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  els.forEach((el) => io.observe(el));

  if (reduceMotion) return;
  const glitches = [...document.querySelectorAll(".glitch")];
  setInterval(() => {
    const g = glitches[Math.floor(Math.random() * glitches.length)];
    if (!g) return;
    const r = g.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    g.classList.add("is-glitching");
    setTimeout(() => g.classList.remove("is-glitching"), 360);
  }, 2600);
}

/* ---------- Counters ---------- */
function counters() {
  const nums = document.querySelectorAll("[data-count]");
  const run = (el) => {
    const end = +el.dataset.count, dur = 1600, t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - k, 3)));
      el.firstChild.nodeValue = v;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (reduceMotion || !("IntersectionObserver" in window)) { nums.forEach((n) => (n.firstChild.nodeValue = n.dataset.count)); return; }
  nums.forEach((n) => (n.firstChild.nodeValue = "0"));
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }), { threshold: 0.5 });
  nums.forEach((n) => io.observe(n));
}

/* ---------- Timeline progress ---------- */
function timeline() {
  const tl = document.querySelector(".timeline");
  if (!tl) return;
  const bar = tl.querySelector(".progress");
  const items = [...tl.querySelectorAll(".t-item")];
  const update = () => {
    const r = tl.getBoundingClientRect();
    const mid = innerHeight * 0.6;
    const h = Math.max(0, Math.min(r.height, mid - r.top));
    bar.style.height = h + "px";
    items.forEach((it) => it.classList.toggle("lit", it.getBoundingClientRect().top + 36 < mid));
  };
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);
  update();
}

/* ---------- Home hero: flashlight + typed roles ---------- */
function hero() {
  const h = document.querySelector(".hero");
  if (!h) return;
  let tx = 72, ty = 42, cx = tx, cy = ty;
  if (finePointer && !reduceMotion) {
    h.addEventListener("pointermove", (e) => { const r = h.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width) * 100; ty = ((e.clientY - r.top) / r.height) * 100; });
    (function loop() {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      h.style.setProperty("--mx", cx + "%"); h.style.setProperty("--my", cy + "%");
      // subtle flicker of the torch
      h.style.setProperty("--r", (Math.random() < 0.02 ? 150 : 250 + Math.sin(performance.now() / 400) * 10) + "px");
      requestAnimationFrame(loop);
    })();
  } else {
    // Touch / reduced motion: the light slowly drifts on its own
    if (!reduceMotion) (function drift(t) { h.style.setProperty("--mx", 55 + Math.sin(t / 2400) * 25 + "%"); h.style.setProperty("--my", 40 + Math.cos(t / 3100) * 12 + "%"); requestAnimationFrame(drift); })(0);
    h.style.setProperty("--r", "320px");
  }

  const typed = h.querySelector(".typed");
  if (!typed) return;
  const roles = JSON.parse(typed.dataset.roles || "[]");
  if (reduceMotion) { typed.textContent = roles[0]; return; }
  let i = 0, j = 0, del = false;
  (function type() {
    const w = roles[i];
    typed.textContent = w.slice(0, j);
    if (!del && j === w.length) { del = true; return setTimeout(type, 1600); }
    if (del && j === 0) { del = false; i = (i + 1) % roles.length; }
    j += del ? -1 : 1;
    setTimeout(type, del ? 35 : 70);
  })();
}

/* ---------- Experience modals ---------- */
function modals() {
  document.querySelectorAll("[data-modal]").forEach((btn) => {
    const tpl = document.getElementById(btn.dataset.modal);
    if (!tpl) return;
    btn.addEventListener("click", () => {
      const d = document.createElement("dialog");
      d.className = "modal";
      d.innerHTML = tpl.innerHTML;
      document.body.append(d);
      d.showModal();
      sound.open();
      const close = () => { d.close(); };
      d.addEventListener("close", () => d.remove());
      d.querySelectorAll("[data-close]").forEach((c) => c.addEventListener("click", close));
      d.addEventListener("click", (e) => { if (e.target === d) close(); });
    });
  });
}

/* ---------- Project filters ---------- */
function filters() {
  const bar = document.querySelector(".filters");
  if (!bar) return;
  bar.addEventListener("click", (e) => {
    const b = e.target.closest("[data-filter]");
    if (!b) return;
    bar.querySelectorAll(".chip").forEach((c) => { c.classList.toggle("on", c === b); c.setAttribute("aria-pressed", c === b); });
    const f = b.dataset.filter;
    document.querySelectorAll(".projects .card").forEach((c) => c.classList.toggle("is-hidden", f !== "all" && !c.dataset.tags.split(" ").includes(f)));
  });
}

/* ---------- Lightbox ---------- */
function lightbox() {
  const shots = [...document.querySelectorAll(".shot[data-full]")];
  if (!shots.length) return;
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.setAttribute("aria-label", "Image viewer");
  lb.innerHTML = `
    <button class="lb-btn lb-close" type="button" aria-label="Close">${ICON.close}</button>
    <button class="lb-btn lb-prev" type="button" aria-label="Previous">←</button>
    <button class="lb-btn lb-next" type="button" aria-label="Next">→</button>
    <figure><img alt=""><figcaption><strong></strong><span class="mono"></span></figcaption></figure>`;
  document.body.append(lb);
  const img = lb.querySelector("img"), cap = lb.querySelector("figcaption strong"), cnt = lb.querySelector("figcaption .mono");
  let i = 0, last = null;
  const show = (n) => {
    i = (n + shots.length) % shots.length;
    const s = shots[i];
    img.src = s.dataset.full; img.alt = s.querySelector("img")?.alt || "";
    cap.textContent = s.dataset.title || ""; cnt.textContent = `${String(i + 1).padStart(2, "0")} / ${String(shots.length).padStart(2, "0")}`;
  };
  const open = (n) => { last = document.activeElement; show(n); lb.classList.add("open"); document.body.style.overflow = "hidden"; lb.querySelector(".lb-close").focus(); sound.open(); };
  const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; last?.focus(); };
  shots.forEach((s, n) => s.addEventListener("click", () => open(n)));
  lb.querySelector(".lb-close").onclick = close;
  lb.querySelector(".lb-prev").onclick = () => show(i - 1);
  lb.querySelector(".lb-next").onclick = () => show(i + 1);
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") show(i - 1); else if (e.key === "ArrowRight") show(i + 1);
  });
}

/* ---------- Trailer (Steam HLS stream) ---------- */
function trailers() {
  document.querySelectorAll(".trailer[data-hls]").forEach((box) => {
    box.querySelector(".play").addEventListener("click", async () => {
      const v = document.createElement("video");
      v.controls = true; v.playsInline = true; v.poster = box.dataset.poster || "";
      box.prepend(v); box.classList.add("playing");
      const src = box.dataset.hls;
      try {
        if (v.canPlayType("application/vnd.apple.mpegurl")) v.src = src;
        else {
          await loadScript("https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.17/hls.min.js");
          const hls = new window.Hls(); hls.loadSource(src); hls.attachMedia(v);
          hls.on(window.Hls.Events.ERROR, (_, d) => { if (d.fatal) fallback(); });
        }
        await v.play().catch(() => {});
      } catch { fallback(); }
      function fallback() { window.open(box.dataset.fallback || SITE.links.steam, "_blank", "noopener"); box.classList.remove("playing"); v.remove(); }
    });
  });
}
function loadScript(src) {
  return new Promise((res, rej) => { const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = rej; document.head.append(s); });
}

/* ---------- Contact form ---------- */
function contactForm() {
  const form = document.querySelector("form[data-contact]");
  if (!form) return;
  const status = form.querySelector(".form-status");
  // Prefill the service from ?service=aod / god
  const svc = new URLSearchParams(location.search).get("service");
  if (svc && form.topic) { form.topic.value = svc; }
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (form.company?.value) return; // spam trap
    const data = Object.fromEntries(new FormData(form));
    if (!data.name || !data.email || !data.message) { status.className = "form-status err"; status.textContent = "Please fill in your name, email and message."; return; }
    const btn = form.querySelector("button[type=submit]");
    const topics = { aod: "Asset on Demand", god: "Game on Demand" };
    const topic = topics[data.topic] || data.topic || "General";
    // Fallback: open the visitor's email app with the message filled in
    const viaEmailApp = (note) => {
      const subject = encodeURIComponent(`[Portfolio] ${topic} from ${data.name}`);
      const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
      location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      status.className = "form-status ok"; status.textContent = note;
    };
    if (!SITE.formEndpoint) return viaEmailApp("Opening your email app…");
    btn.disabled = true; status.className = "form-status"; status.textContent = "Sending…";
    try {
      const r = await fetch(SITE.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name, email: data.email, topic, message: data.message,
          _subject: `[Portfolio] ${topic} from ${data.name}`, _replyto: data.email, _template: "table",
        }),
      });
      const res = await r.json().catch(() => ({}));
      if (!r.ok || String(res.success) !== "true") throw new Error(res.message || r.status);
      form.reset(); status.className = "form-status ok"; status.textContent = "Message received. I'll get back to you soon.";
    } catch {
      viaEmailApp(`Couldn't send from the site, so your email app is opening instead (or write to ${SITE.email}).`);
    } finally { btn.disabled = false; }
  });
}

/* ---------- Ambient sound (generated, no audio files) ---------- */
const sound = (() => {
  let ctx, master, on = false, nodes = [];
  const ensure = () => {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
  };
  const startDrone = () => {
    // Low detuned drone + filtered noise "room tone"
    [55, 55.4, 82.4].forEach((f, k) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = k === 2 ? "triangle" : "sawtooth"; o.frequency.value = f;
      const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 220;
      g.gain.value = k === 2 ? 0.03 : 0.05;
      const lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = 0.07 + k * 0.03; lg.gain.value = 60;
      lfo.connect(lg); lg.connect(lp.frequency); lfo.start();
      o.connect(lp); lp.connect(g); g.connect(master); o.start(); nodes.push(o, lfo);
    });
    const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.5;
    const n = ctx.createBufferSource(); n.buffer = buf; n.loop = true;
    const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 500; bp.Q.value = 0.6;
    const ng = ctx.createGain(); ng.gain.value = 0.025;
    n.connect(bp); bp.connect(ng); ng.connect(master); n.start(); nodes.push(n);
  };
  const blip = (freq, dur, vol = 0.05, type = "sine") => {
    if (!on || !ctx) return;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, ctx.currentTime);
    g.gain.setValueAtTime(vol, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + dur);
  };
  let lastTick = 0;
  return {
    get on() { return on; },
    toggle(force) {
      on = force ?? !on;
      if (on) { ensure(); ctx.resume(); if (!nodes.length) startDrone(); master.gain.cancelScheduledValues(ctx.currentTime); master.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 1.5); }
      else if (ctx) { master.gain.cancelScheduledValues(ctx.currentTime); master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6); }
      store.set("sound", on ? "on" : "off");
      document.querySelectorAll(".sound-btn").forEach((b) => b.setAttribute("aria-pressed", on));
      return on;
    },
    tick() { const t = performance.now(); if (t - lastTick < 60) return; lastTick = t; blip(1800 + Math.random() * 400, 0.04, 0.015, "square"); },
    open() { blip(220, 0.35, 0.05, "triangle"); },
    whoosh() { blip(90, 0.5, 0.08, "sawtooth"); },
    scare() { blip(70, 1.2, 0.2, "sawtooth"); blip(1400, 0.6, 0.06, "square"); },
    ctx: () => ctx,
  };
})();
function soundButton() {
  const b = document.querySelector(".sound-btn");
  if (!b) return;
  b.addEventListener("click", () => sound.toggle());
  // Browsers only allow audio after a click, so "remembered on" resumes on the first interaction.
  if (store.get("sound") === "on") {
    const resume = () => { sound.toggle(true); removeEventListener("pointerdown", resume); removeEventListener("keydown", resume); };
    addEventListener("pointerdown", resume, { once: true }); addEventListener("keydown", resume, { once: true });
    b.setAttribute("aria-pressed", "true");
  }
}

/* ---------- Easter egg trigger ---------- */
function easterEgg() {
  const code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let pos = 0;
  const launch = async () => {
    if (!window.FlashlightEscape) await loadScript(ROOT + "assets/js/egg.js");
    window.FlashlightEscape.start({ sound });
  };
  addEventListener("keydown", (e) => {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    pos = k === code[pos] ? pos + 1 : k === code[0] ? 1 : 0;
    if (pos === code.length) { pos = 0; launch(); }
  });
  // Touch-friendly trigger: tap the footer code 5 times
  let taps = 0, t;
  document.querySelector("[data-egg]")?.addEventListener("click", () => { taps++; clearTimeout(t); t = setTimeout(() => (taps = 0), 1500); if (taps >= 5) { taps = 0; launch(); } });
  window.launchEgg = launch;
}

/* ---------- Boot ---------- */
buildChrome();
const ready = loader();
transitions();
cursor();
hero();
counters();
timeline();
modals();
filters();
lightbox();
trailers();
contactForm();
soundButton();
easterEgg();
ready.then(reveals);
