/* =========================================================
   Easter egg: FLASHLIGHT ESCAPE
   Triggered by the Konami code (↑↑↓↓←→←→BA) or by tapping the
   footer code 5 times. Find the exit before your battery dies
   and before the thing in the dark reaches your light.
   ========================================================= */
(() => {
  let root, cv, ctx, hud, msg, scene, raf, opts, state;

  const BEST_KEY = "flashlightBest";
  const best = () => { try { return parseFloat(localStorage.getItem(BEST_KEY)) || null; } catch { return null; } };
  const saveBest = (t) => { try { const b = best(); if (!b || t < b) localStorage.setItem(BEST_KEY, t.toFixed(1)); } catch {} };

  function build() {
    root = document.createElement("div");
    root.className = "egg";
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-label", "Flashlight Escape mini-game");
    root.innerHTML = `
      <canvas></canvas>
      <div class="egg-hud"><span class="bat">Battery 100%</span><span class="obj">Find the exit</span><span>Esc to leave</span></div>
      <div class="egg-msg"></div>`;
    document.body.append(root);
    cv = root.querySelector("canvas");
    ctx = cv.getContext("2d");
    hud = { bat: root.querySelector(".bat"), obj: root.querySelector(".obj") };
    msg = root.querySelector(".egg-msg");
    const move = (e) => {
      const p = e.touches ? e.touches[0] : e;
      if (!p || !state) return;
      state.tx = p.clientX; state.ty = p.clientY;
    };
    root.addEventListener("pointermove", move);
    root.addEventListener("touchmove", (e) => { e.preventDefault(); move(e); }, { passive: false });
    addEventListener("resize", () => { if (root.classList.contains("on")) { size(); scene = makeScene(); } });
    addEventListener("keydown", (e) => { if (e.key === "Escape" && root.classList.contains("on")) stop(); });
  }

  function size() {
    const dpr = Math.min(2, devicePixelRatio || 1);
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /* --- Haunted room, drawn once into an offscreen canvas --- */
  function makeScene() {
    const W = innerWidth, H = innerHeight;
    const off = document.createElement("canvas");
    off.width = W; off.height = H;
    const g = off.getContext("2d");
    // floor
    const tile = 64;
    for (let y = 0; y < H; y += tile) for (let x = 0; x < W; x += tile) {
      const odd = ((x + y) / tile) % 2;
      g.fillStyle = odd ? "#2b211c" : "#241b17";
      g.fillRect(x, y, tile, tile);
    }
    g.strokeStyle = "rgba(0,0,0,0.35)"; g.lineWidth = 1;
    for (let x = 0; x < W; x += tile) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    for (let y = 0; y < H; y += tile) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
    // walls
    g.fillStyle = "#3a2f2a";
    g.fillRect(0, 0, W, 34); g.fillRect(0, H - 34, W, 34); g.fillRect(0, 0, 34, H); g.fillRect(W - 34, 0, 34, H);
    // stains
    for (let i = 0; i < 9; i++) {
      const x = Math.random() * W, y = Math.random() * H, r = 10 + Math.random() * 40;
      const grd = g.createRadialGradient(x, y, 0, x, y, r);
      grd.addColorStop(0, "rgba(110,0,12,0.75)"); grd.addColorStop(1, "rgba(110,0,12,0)");
      g.fillStyle = grd; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
    }
    // furniture
    const props = [];
    for (let i = 0; i < 7; i++) {
      const w = 60 + Math.random() * 110, h = 40 + Math.random() * 90;
      const x = 60 + Math.random() * (W - w - 120), y = 60 + Math.random() * (H - h - 120);
      g.fillStyle = "#1a1310"; g.fillRect(x + 6, y + 8, w, h);
      g.fillStyle = i % 2 ? "#5b4636" : "#4a3a33"; g.fillRect(x, y, w, h);
      g.strokeStyle = "rgba(0,0,0,0.5)"; g.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
      props.push({ x, y, w, h });
    }
    // scrawled words
    g.font = "700 28px 'Big Shoulders Display', sans-serif";
    g.fillStyle = "rgba(150,10,25,0.8)";
    const words = ["HELP", "IT HEARS YOU", "DON'T LOOK BACK", "ROOM 404", "RONNY?"];
    for (let i = 0; i < 4; i++) {
      g.save(); g.translate(80 + Math.random() * (W - 260), 80 + Math.random() * (H - 160)); g.rotate((Math.random() - 0.5) * 0.4);
      g.fillText(words[Math.floor(Math.random() * words.length)], 0, 0); g.restore();
    }
    // the exit door, on a random wall, away from the start in the centre
    const side = Math.floor(Math.random() * 4), dw = 90, dh = 120;
    let door;
    if (side === 0) door = { x: 80 + Math.random() * (W - 260), y: 34, w: dw, h: 30 };
    if (side === 1) door = { x: 80 + Math.random() * (W - 260), y: H - 64, w: dw, h: 30 };
    if (side === 2) door = { x: 34, y: 80 + Math.random() * (H - 260), w: 30, h: dh };
    if (side === 3) door = { x: W - 64, y: 80 + Math.random() * (H - 260), w: 30, h: dh };
    g.fillStyle = "#120d0b"; g.fillRect(door.x - 6, door.y - 6, door.w + 12, door.h + 12);
    g.fillStyle = "#6b4a2e"; g.fillRect(door.x, door.y, door.w, door.h);
    g.fillStyle = "#c9a227"; g.beginPath(); g.arc(door.x + door.w * 0.75, door.y + door.h * 0.55, 4, 0, 7); g.fill();
    g.fillStyle = "#d0102b"; g.font = "700 16px 'IBM Plex Mono', monospace";
    const sx = Math.min(Math.max(door.x + door.w / 2 - 22, 40), W - 90), sy = Math.min(Math.max(door.y + (side === 0 ? 50 : side === 1 ? -14 : -10), 50), H - 40);
    g.fillText("EXIT", sx, sy);
    // batteries to pick up
    const bats = [];
    for (let i = 0; i < 2; i++) bats.push({ x: 120 + Math.random() * (W - 240), y: 120 + Math.random() * (H - 240), taken: false });
    return { canvas: off, door, bats, signX: sx + 22, signY: sy - 6 };
  }

  /* --- Game loop --- */
  function reset() {
    scene = makeScene();
    const W = innerWidth, H = innerHeight;
    const edge = Math.floor(Math.random() * 4);
    const ex = edge === 0 ? -40 : edge === 1 ? W + 40 : Math.random() * W;
    const ey = edge === 2 ? -40 : edge === 3 ? H + 40 : Math.random() * H;
    state = {
      x: W / 2, y: H / 2, tx: W / 2, ty: H / 2,
      battery: 100, t0: performance.now(), last: performance.now(),
      hold: 0, over: false,
      ent: { x: ex, y: ey, speed: 34, blink: 0 },
    };
  }

  function frame(now) {
    const s = state, dt = Math.min(0.05, (now - s.last) / 1000); s.last = now;
    const W = innerWidth, H = innerHeight;
    s.x += (s.tx - s.x) * Math.min(1, dt * 10);
    s.y += (s.ty - s.y) * Math.min(1, dt * 10);
    const elapsed = (now - s.t0) / 1000;
    s.battery = Math.max(0, s.battery - dt * 3.4);
    const flick = s.battery < 20 && Math.random() < 0.12 ? 0.4 : 1;
    const radius = (60 + s.battery * 1.3) * flick;

    // entity hunts the light and gets faster over time
    const e = s.ent, dx = s.x - e.x, dy = s.y - e.y, dist = Math.hypot(dx, dy);
    e.speed = 34 + elapsed * 3.2 + (s.battery < 25 ? 30 : 0);
    e.x += (dx / dist) * e.speed * dt; e.y += (dy / dist) * e.speed * dt;
    e.blink -= dt; if (e.blink < -3 - Math.random() * 3) e.blink = 0.15;

    // batteries
    scene.bats.forEach((b) => { if (!b.taken && Math.hypot(b.x - s.x, b.y - s.y) < 30) { b.taken = true; s.battery = Math.min(100, s.battery + 35); opts.sound?.open(); } });

    // door check: keep the light on the door
    const d = scene.door, pad = 30;
    const onDoor = s.x > d.x - pad && s.x < d.x + d.w + pad && s.y > d.y - pad && s.y < d.y + d.h + pad;
    s.hold = onDoor ? s.hold + dt : Math.max(0, s.hold - dt * 2);

    // draw
    ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);
    ctx.save();
    ctx.beginPath(); ctx.arc(s.x, s.y, radius, 0, 7); ctx.clip();
    ctx.drawImage(scene.canvas, 0, 0);
    scene.bats.forEach((b) => { if (b.taken) return; ctx.fillStyle = "#3ddc84"; ctx.fillRect(b.x - 7, b.y - 12, 14, 24); ctx.fillStyle = "#1b5e3a"; ctx.fillRect(b.x - 3, b.y - 16, 6, 4); });
    // entity body is only visible inside the light
    if (dist < radius + 40) drawEntity(e.x, e.y, 1);
    ctx.restore();
    // light falloff
    const grd = ctx.createRadialGradient(s.x, s.y, radius * 0.2, s.x, s.y, radius);
    grd.addColorStop(0, "rgba(255,230,180,0.08)"); grd.addColorStop(0.7, "rgba(0,0,0,0.25)"); grd.addColorStop(1, "rgba(0,0,0,0.95)");
    ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(s.x, s.y, radius, 0, 7); ctx.fill();
    // the EXIT sign glows faintly every few seconds as a hint
    if (Math.sin(now / 700) > 0.92) { ctx.fillStyle = "rgba(208,16,43,0.35)"; ctx.font = "700 16px 'IBM Plex Mono', monospace"; ctx.fillText("EXIT", scene.signX - 22, scene.signY + 6); }
    // eyes are always faintly visible in the dark
    if (e.blink <= 0) { ctx.fillStyle = `rgba(230,20,40,${0.35 + Math.random() * 0.25})`; ctx.beginPath(); ctx.arc(e.x - 7, e.y - 6, 2.4, 0, 7); ctx.arc(e.x + 7, e.y - 6, 2.4, 0, 7); ctx.fill(); }
    // escape progress ring
    if (s.hold > 0) { ctx.strokeStyle = "#3ddc84"; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(s.x, s.y, 22, -Math.PI / 2, -Math.PI / 2 + (s.hold / 1.2) * Math.PI * 2); ctx.stroke(); }

    hud.bat.textContent = `Battery ${Math.round(s.battery)}%`;
    hud.bat.style.color = s.battery < 25 ? "#d0102b" : "";
    hud.obj.textContent = onDoor ? "Hold the light on the door…" : `Find the exit · ${elapsed.toFixed(1)}s`;

    if (s.hold >= 1.2) return end(true, elapsed);
    if (dist < 26 || s.battery <= 0) return end(false, elapsed);
    raf = requestAnimationFrame(frame);
  }

  function drawEntity(x, y, a) {
    ctx.save(); ctx.globalAlpha = a;
    ctx.fillStyle = "#050505";
    ctx.beginPath(); ctx.ellipse(x, y + 26, 22, 40, 0, 0, 7); ctx.fill();
    ctx.fillStyle = "#d9d4cc";
    ctx.beginPath(); ctx.ellipse(x, y - 4, 16, 20, 0, 0, 7); ctx.fill();
    ctx.fillStyle = "#000";
    ctx.beginPath(); ctx.ellipse(x - 6, y - 7, 4, 6, 0, 0, 7); ctx.ellipse(x + 6, y - 7, 4, 6, 0, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.ellipse(x, y + 8, 5, 8, 0, 0, 7); ctx.fill();
    // hair
    ctx.strokeStyle = "#050505"; ctx.lineWidth = 2;
    for (let i = -14; i <= 14; i += 4) { ctx.beginPath(); ctx.moveTo(x + i, y - 22); ctx.quadraticCurveTo(x + i * 1.3, y, x + i * 1.6, y + 22 + Math.random() * 6); ctx.stroke(); }
    ctx.restore();
  }

  function jumpscare() {
    const W = innerWidth, H = innerHeight;
    let n = 0;
    root.classList.add("scare");
    opts.sound?.scare();
    (function shake() {
      n++;
      ctx.fillStyle = n % 2 ? "#000" : "#2a0006"; ctx.fillRect(0, 0, W, H);
      const s = Math.min(W, H) / 70, x = W / 2 + (Math.random() - 0.5) * 30, y = H / 2 + (Math.random() - 0.5) * 30;
      ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
      drawEntity(0, 0, 1);
      ctx.fillStyle = "#e0102e"; ctx.beginPath(); ctx.arc(-6, -7, 1.6, 0, 7); ctx.arc(6, -7, 1.6, 0, 7); ctx.fill();
      ctx.restore();
      if (n < 16) setTimeout(shake, 45);
    })();
    setTimeout(() => root.classList.remove("scare"), 1300);
  }

  function end(won, t) {
    state.over = true;
    cancelAnimationFrame(raf);
    if (won) {
      saveBest(t);
      opts.sound?.open();
      show(`<div class="box"><p class="label" style="justify-content:center">Chapter complete</p><h2>You escaped</h2>
        <p>Out in <b style="color:var(--text)">${t.toFixed(1)}s</b>. Best: ${best()}s.<br>The hotel will remember you.</p>
        <div class="btn-row"><button class="btn btn-primary" data-act="again">Play again</button><button class="btn" data-act="quit">Back to the site</button></div></div>`);
    } else {
      jumpscare();
      setTimeout(() => show(`<div class="box"><p class="label" style="justify-content:center">${state.battery <= 0 ? "Battery dead" : "It found you"}</p><h2 class="red">Caught</h2>
        <p>Survived ${t.toFixed(1)}s. Keep moving, and grab the green batteries.</p>
        <div class="btn-row"><button class="btn btn-primary" data-act="again">Try again</button><button class="btn" data-act="quit">Run away</button></div></div>`), 1000);
    }
  }

  function show(html) {
    msg.innerHTML = html;
    msg.querySelector('[data-act="again"]')?.addEventListener("click", play);
    msg.querySelector('[data-act="quit"]')?.addEventListener("click", stop);
    msg.querySelector("button")?.focus();
  }

  function intro() {
    const b = best();
    show(`<div class="box"><p class="label" style="justify-content:center">Secret unlocked</p><h2>Flashlight escape</h2>
      <p>Something is in the hotel with you. Find the <b style="color:var(--red)">EXIT</b> before your battery dies.<br>
      Move your mouse (or finger) to aim the light. Hold it on the door to escape. Watch for red eyes.</p>
      ${b ? `<p class="mono">Best escape: ${b}s</p>` : ""}
      <div class="btn-row"><button class="btn btn-primary" data-act="again">Enter the dark</button><button class="btn" data-act="quit">Nope</button></div></div>`);
    ctx.fillStyle = "#000"; ctx.fillRect(0, 0, innerWidth, innerHeight);
  }

  function play() {
    msg.innerHTML = "";
    reset();
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    cancelAnimationFrame(raf);
    root.classList.remove("on");
    document.body.style.overflow = "";
    document.documentElement.classList.remove("egg-open");
  }

  window.FlashlightEscape = {
    start(o = {}) {
      opts = o;
      if (!root) build();
      root.classList.add("on");
      document.body.style.overflow = "hidden";
      size();
      intro();
    },
    stop,
  };
})();
