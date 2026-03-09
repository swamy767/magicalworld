// ANAMIKA 💜 — dreamy birthday world interactions + particles + music

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const screens = {
  login: $("#screenLogin"),
  identity: $("#screenIdentity"),
  denied: $("#screenDenied"),
};

const loveWorld = $("#loveWorld");
const fxCanvas = $("#fxCanvas");
const fx = createFx(fxCanvas);

// -------------------------
// Screen manager
// -------------------------
function showScreen(name) {
  Object.values(screens).forEach((el) => el.classList.remove("screen--active"));
  screens[name].classList.add("screen--active");
}

function openLoveWorld() {
  Object.values(screens).forEach((el) => el.classList.remove("screen--active"));
  loveWorld.hidden = false;

  // Start scene timeline
  startSceneTimeline();
  requestAnimationFrame(() => {
    document.getElementById("scene").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// -------------------------
// Login
// -------------------------
const loginForm = $("#loginForm");
const loginHint = $("#loginHint");
const usernameEl = $("#username");
const passwordEl = $("#password");

const CREDENTIALS = { username: "anamika", password: "swamy" };

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const u = (usernameEl.value || "").trim().toLowerCase();
  const p = (passwordEl.value || "").trim();

  if (u === CREDENTIALS.username && p === CREDENTIALS.password) {
    loginHint.textContent = "Welcome, Anamika 💜";

    // sparkly fade out
    fx.burst({
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.55,
      count: 120,
      kind: "sparkle",
      spread: 1.1,
    });
    fx.burst({
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.55,
      count: 60,
      kind: "heart",
      spread: 1.0,
    });

    // Start music automatically
// Start music automatically
music.play();
musicToggle.setAttribute("aria-pressed", "true");
musicToggle.textContent = "Music: On 🎵";
// move to next screen
await fadeOut(screens.login, 700);
showScreen("identity");
screens.login.style.opacity = "";
screens.login.style.display = "";

    // Autostart music after user gesture (submit)
    
  } else {
    loginHint.textContent = "Wrong credentials… try again 💜";
    fx.burst({
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.58,
      count: 26,
      kind: "sparkle",
      spread: 0.6,
      colorHint: "cool",
    });
  }
});

// -------------------------
// Identity question
// -------------------------
$("#btnYes").addEventListener("click", async () => {
  fx.burst({
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.55,
    count: 90,
    kind: "heart",
    spread: 1.05,
  });
  await fadeOut(screens.identity, 520);
  openLoveWorld();
});

$("#btnNo").addEventListener("click", () => {
  fx.burst({
    x: window.innerWidth * 0.55,
    y: window.innerHeight * 0.58,
    count: 30,
    kind: "sparkle",
    spread: 0.7,
    colorHint: "cool",
  });
  showScreen("denied");
});

$("#btnBack").addEventListener("click", () => {
  showScreen("identity");
});

// Extra floating hearts around identity buttons
setInterval(() => {
  if (!screens.identity.classList.contains("screen--active")) return;
  const rect = screens.identity.getBoundingClientRect();
  fx.emit({
    x: rect.left + rect.width * (0.35 + Math.random() * 0.30),
    y: rect.top + rect.height * (0.55 + Math.random() * 0.18),
    kind: "heart",
    vx: (Math.random() - 0.5) * 0.2,
    vy: -0.8 - Math.random() * 0.6,
    life: 1300 + Math.random() * 900,
    size: 12 + Math.random() * 10,
  });
}, 140);

// -------------------------
// Scene timeline (ribbon lines + message birds)
// -------------------------
function startSceneTimeline() {
  const l1 = $("#line1");
  const l2 = $("#line2");
  const l3 = $("#line3");

  [l1, l2, l3].forEach((el) => el.classList.remove("is-on"));

  setTimeout(() => l1.classList.add("is-on"), 500);
  setTimeout(() => l2.classList.add("is-on"), 2900);
  setTimeout(() => l3.classList.add("is-on"), 5200);

  // After 5 seconds: many birds with messages
  setTimeout(() => {
    launchMessageBirds([
      "Happy Birthday Anamika 💜",
      "I missing you",
      "You Are Special",
      "I love you mental",
      "My Favorite Person",
      "Sorry mental💜",
      "Dont leave me",
      "Please Stay with me",
      "I love you wifey"
    ]);

    // Soft auto-scroll nudge to letter after a bit
    setTimeout(() => {
      const target = $("#letter");
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 5200);
  }, 5000);

  // ambient hearts/sparkles in the scene
  const scene = $("#scene");
  const sceneTimer = setInterval(() => {
    if (document.hidden) return;
    if (!isInViewport(scene)) return;
    const x = window.innerWidth * Math.random();
    const y = window.innerHeight * (0.25 + Math.random() * 0.55);
    fx.emit({
      x,
      y,
      kind: Math.random() < 0.55 ? "sparkle" : "heart",
      vx: (Math.random() - 0.5) * 0.12,
      vy: -0.2 - Math.random() * 0.35,
      life: 1200 + Math.random() * 1100,
      size: 8 + Math.random() * 12,
    });
  }, 120);

  // stop after a while
  setTimeout(() => clearInterval(sceneTimer), 22000);
}

function launchMessageBirds(messages) {
  const layer = $("#afterBirds");
  layer.innerHTML = "";

  const count = 10;
  for (let i = 0; i < count; i++) {
    const msg = messages[i % messages.length];
    const b = document.createElement("div");
    b.className = "msgBird";
    b.style.top = `${10 + Math.random() * 70}%`;
    b.style.animationDuration = `${9 + Math.random() * 7}s`;
    b.style.animationDelay = `${Math.random() * 1.8}s`;
    b.style.setProperty("--s", `${0.7 + Math.random() * 0.7}`);
    b.innerHTML = `
      <div class="msgBird__bird"></div>
      <div class="msgBird__tag">${escapeHtml(msg)}</div>
    `;
    layer.appendChild(b);
  }
}

// Inject CSS for message birds (kept here to avoid another file)
(() => {
  const style = document.createElement("style");
  style.textContent = `
    .msgBird{
      position:absolute;
      left:-35%;
      display:flex;
      align-items:center;
      gap:10px;
      opacity:.92;
      pointer-events:none;
      animation: msgFly linear infinite;
      transform: translateZ(0) scale(var(--s,1));
      filter: drop-shadow(0 18px 35px rgba(0,0,0,.22));
    }
    .msgBird__bird{
      width: 52px;
      height: 26px;
      position:relative;
    }
    .msgBird__bird::before,.msgBird__bird::after{
      content:"";
      position:absolute;
      width: 24px;
      height: 12px;
      border: 3px solid rgba(255,255,255,.88);
      border-color: rgba(255,255,255,.88) transparent transparent transparent;
      border-radius: 999px;
      top: 10px;
    }
    .msgBird__bird::before{ left:0; transform: rotate(10deg); }
    .msgBird__bird::after{ right:0; transform: rotate(-10deg); }
    .msgBird__tag{
      font-weight: 800;
      font-size: clamp(12px, 2.2vw, 16px);
      padding: 8px 12px;
      border-radius: 999px;
      border: 1px solid rgba(255,255,255,.22);
      background: rgba(0,0,0,.12);
      backdrop-filter: blur(12px);
      text-shadow: 0 0 18px rgba(255,255,255,.16);
      white-space: nowrap;
    }
    @keyframes msgFly{
      0%{ transform: translateX(0) translateY(0) scale(var(--s,1)); }
      100%{ transform: translateX(165vw) translateY(-10px) scale(var(--s,1)); }
    }
  `;
  document.head.appendChild(style);
})();

// -------------------------
// Cake cutting game (drag knife, collision, cut animation)
// -------------------------
const knife = $("#knife");
const cakeWrap = $("#cakeWrap");
const cakeWhole = $("#cakeWhole");
const cakeSplit = $("#cakeSplit");
const cakeMsg = $("#cakeMsg");
const toDolls = $("#toDolls");

let knifeState = {
  dragging: false,
  startX: 0,
  startY: 0,
  x: 0,
  y: 0,
  cut: false,
};

function setKnifePos(x, y) {
  knifeState.x = x;
  knifeState.y = y;
  knife.style.left = `${x}px`;
  knife.style.top = `${y}px`;
}

function resetKnife() {
  knifeState.cut = false;
  cakeMsg.textContent = "Drag the knife onto the cake 💜";
  toDolls.hidden = true;
  cakeSplit.classList.remove("is-on", "is-cut");
  cakeWhole.classList.remove("is-off");
  cakeSplit.setAttribute("aria-hidden", "true");
  cakeWhole.setAttribute("aria-hidden", "false");

  const wrapRect = cakeWrap.getBoundingClientRect();
  setKnifePos(wrapRect.width * 0.10, wrapRect.height * 0.18);
}

function cakeCenterPoint() {
  const rect = cakeWrap.getBoundingClientRect();
  return { x: rect.left + rect.width * 0.5, y: rect.top + rect.height * 0.58 };
}

function knifeTipPoint() {
  const r = knife.getBoundingClientRect();
  // tip is near blade front
  return { x: r.left + r.width * 0.15, y: r.top + r.height * 0.65 };
}

function tryCut() {
  if (knifeState.cut) return;
  const c = cakeCenterPoint();
  const t = knifeTipPoint();
  const dx = c.x - t.x;
  const dy = c.y - t.y;
  const dist = Math.hypot(dx, dy);
  if (dist < 55) {
    knifeState.cut = true;
    doCutEffects();
  }
}

function doCutEffects() {
  cakeWhole.classList.add("is-off");
  cakeSplit.classList.add("is-on");
  cakeSplit.setAttribute("aria-hidden", "false");
  cakeWhole.setAttribute("aria-hidden", "true");

  // animate split
  setTimeout(() => cakeSplit.classList.add("is-cut"), 40);

  // confetti + balloons + hearts
  const rect = cakeWrap.getBoundingClientRect();
  fx.burst({ x: rect.left + rect.width * 0.5, y: rect.top + rect.height * 0.5, count: 220, kind: "confetti", spread: 1.2 });
  fx.burst({ x: rect.left + rect.width * 0.5, y: rect.top + rect.height * 0.45, count: 70, kind: "heart", spread: 1.0 });

  // balloons (simple particle type)
  for (let i = 0; i < 18; i++) {
    fx.emit({
      x: rect.left + rect.width * (0.15 + Math.random() * 0.7),
      y: rect.top + rect.height * (0.85 + Math.random() * 0.10),
      kind: "balloon",
      vx: (Math.random() - 0.5) * 0.2,
      vy: -0.9 - Math.random() * 0.8,
      life: 2400 + Math.random() * 1200,
      size: 16 + Math.random() * 16,
    });
  }

  
    music.play();
  cakeMsg.innerHTML = `Happy Birthday Anamika 💜<br/>Swamy wishes you endless happiness.`;
  toDolls.hidden = false;
}

knife.addEventListener("pointerdown", (e) => {
  knife.setPointerCapture(e.pointerId);
  knifeState.dragging = true;
  knifeState.startX = e.clientX;
  knifeState.startY = e.clientY;
  const r = knife.getBoundingClientRect();
  knifeState.offsetX = e.clientX - r.left;
  knifeState.offsetY = e.clientY - r.top;
});

knife.addEventListener("pointermove", (e) => {
  if (!knifeState.dragging) return;
  const wrapRect = cakeWrap.getBoundingClientRect();
  const x = clamp(e.clientX - wrapRect.left - knifeState.offsetX, -10, wrapRect.width - 60);
  const y = clamp(e.clientY - wrapRect.top - knifeState.offsetY, -10, wrapRect.height - 30);
  setKnifePos(x, y);
  tryCut();
});

knife.addEventListener("pointerup", () => {
  knifeState.dragging = false;
});
knife.addEventListener("pointercancel", () => {
  knifeState.dragging = false;
});

// reset knife when section enters view
const cakeObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) resetKnife();
    }
  },
  { threshold: 0.35 }
);
cakeObserver.observe($("#cake"));

// -------------------------
// Dolls buttons
// -------------------------
const likeMsg = $("#likeMsg");
$("#btnLikeYes").addEventListener("click", () => {
  likeMsg.textContent = "Yay! Swamy is the luckiest person in the world 💜";
  const r = $("#dolls").getBoundingClientRect();
  fx.burst({ x: r.left + r.width * 0.5, y: r.top + r.height * 0.45, count: 150, kind: "heart", spread: 1.2 });
  fx.burst({ x: r.left + r.width * 0.5, y: r.top + r.height * 0.45, count: 120, kind: "sparkle", spread: 1.0 });
});

$("#btnLikeNo").addEventListener("click", () => {
  likeMsg.textContent = "Hehe… think again 🙈💜";
  const r = $("#dolls").getBoundingClientRect();
  fx.burst({ x: r.left + r.width * 0.58, y: r.top + r.height * 0.55, count: 45, kind: "sparkle", spread: 0.7, colorHint: "cool" });
});

// -------------------------
// Music (gentle romantic loop generated with WebAudio)
// -------------------------
// -------------------------
// Music (spiano.mp3)
// -------------------------
// -------------------------
// Music (spiano.mp3)
// -------------------------
// -------------------------
// Music (spiano.mp3)
// -------------------------
const musicToggle = $("#musicToggle");
const music = document.getElementById("bgMusic");

musicToggle.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicToggle.setAttribute("aria-pressed", "true");
    musicToggle.textContent = "Music: On 🎵";
  } else {
    music.pause();
    musicToggle.setAttribute("aria-pressed", "false");
    musicToggle.textContent = "Music: Off";
  }
});

// -------------------------
// Helpers
// -------------------------
function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

function isInViewport(el) {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight;
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function fadeOut(el, ms = 500) {
  return new Promise((resolve) => {
    el.style.willChange = "opacity, filter";
    el.style.transition = `opacity ${ms}ms ease, filter ${ms}ms ease`;
    el.style.opacity = "0";
    el.style.filter = "blur(6px)";
    setTimeout(() => {
      el.style.transition = "";
      el.style.filter = "";
      resolve();
    }, ms + 30);
  });
}

// -------------------------
// FX: particles (hearts, sparkles, confetti, balloons)
// -------------------------
function createFx(canvas) {
  const ctx = canvas.getContext("2d", { alpha: true });
  const DPR = Math.min(2, window.devicePixelRatio || 1);
  let w = 0;
  let h = 0;

  const particles = [];

  function resize() {
    w = Math.floor(window.innerWidth * DPR);
    h = Math.floor(window.innerHeight * DPR);
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
  }
  window.addEventListener("resize", resize, { passive: true });
  resize();

  function emit(p) {
    particles.push({
      kind: p.kind,
      x: p.x * DPR,
      y: p.y * DPR,
      vx: (p.vx ?? 0) * DPR,
      vy: (p.vy ?? 0) * DPR,
      life: p.life ?? 1200,
      age: 0,
      size: (p.size ?? 12) * DPR,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.05,
      colorHint: p.colorHint ?? "warm",
      hue: p.hue ?? (p.colorHint === "cool" ? 210 : 315),
      sat: 92,
      light: 72,
      gravity: p.gravity ?? (p.kind === "confetti" ? 0.035 : 0.012),
      drag: p.drag ?? (p.kind === "confetti" ? 0.995 : 0.992),
    });
  }

  function burst({ x, y, count, kind, spread = 1, colorHint = "warm" }) {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = (0.6 + Math.random() * 1.4) * spread;
      emit({
        kind,
        x,
        y,
        vx: Math.cos(a) * s * 1.4,
        vy: Math.sin(a) * s * 1.4 - (kind === "confetti" ? 0.6 : 0.35),
        life: kind === "confetti" ? 2200 + Math.random() * 900 : 1400 + Math.random() * 900,
        size: kind === "confetti" ? 8 + Math.random() * 12 : 10 + Math.random() * 14,
        colorHint,
        hue:
          kind === "confetti"
            ? (Math.random() < 0.5 ? 320 : 250) + (Math.random() - 0.5) * 25
            : colorHint === "cool"
              ? 210 + (Math.random() - 0.5) * 18
              : 315 + (Math.random() - 0.5) * 18,
      });
    }
  }

  function drawHeart(px, py, s, alpha) {
    ctx.save();
    ctx.translate(px, py);
    ctx.scale(s, s);
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.moveTo(0, 0.35);
    ctx.bezierCurveTo(-0.5, -0.05, -0.6, -0.55, -0.15, -0.65);
    ctx.bezierCurveTo(0.1, -0.7, 0.3, -0.55, 0, -0.25);
    ctx.bezierCurveTo(-0.3, -0.55, -0.1, -0.7, 0.15, -0.65);
    ctx.bezierCurveTo(0.6, -0.55, 0.5, -0.05, 0, 0.35);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawSparkle(px, py, s, alpha) {
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(Math.random() * 0.2);
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const r = i % 2 === 0 ? s : s * 0.44;
      const ang = (i / 8) * Math.PI * 2;
      ctx.lineTo(Math.cos(ang) * r, Math.sin(ang) * r);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawConfetti(px, py, s, rot, alpha) {
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(rot);
    ctx.globalAlpha = alpha;
    ctx.fillRect(-s * 0.55, -s * 0.18, s * 1.1, s * 0.36);
    ctx.restore();
  }

  function drawBalloon(px, py, s, alpha) {
    ctx.save();
    ctx.translate(px, py);
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.55, s * 0.72, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = alpha * 0.7;
    ctx.fillStyle = "rgba(255,255,255,.55)";
    ctx.beginPath();
    ctx.ellipse(-s * 0.15, -s * 0.18, s * 0.15, s * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,.45)";
    ctx.lineWidth = Math.max(1, s * 0.04);
    ctx.beginPath();
    ctx.moveTo(0, s * 0.72);
    ctx.lineTo(0, s * 1.6);
    ctx.stroke();
    ctx.restore();
  }

  let last = performance.now();
  function tick(now) {
    const dt = Math.min(33, now - last);
    last = now;

    ctx.clearRect(0, 0, w, h);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.age += dt;
      if (p.age >= p.life) {
        particles.splice(i, 1);
        continue;
      }

      p.vx *= p.drag;
      p.vy = p.vy * p.drag + p.gravity * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;

      const t = p.age / p.life;
      const alpha = 1 - Math.pow(t, 1.8);
      const size = p.size * (0.85 + (1 - t) * 0.25);
      const hue = p.hue + Math.sin((p.age / 180) + i) * (p.kind === "confetti" ? 8 : 4);

      ctx.fillStyle = `hsla(${hue}, ${p.sat}%, ${p.light}%, ${alpha})`;

      if (p.kind === "heart") {
        drawHeart(p.x, p.y, size / 40, alpha);
      } else if (p.kind === "sparkle") {
        drawSparkle(p.x, p.y, size * 0.55, alpha);
      } else if (p.kind === "confetti") {
        drawConfetti(p.x, p.y, size, p.rot, alpha);
      } else if (p.kind === "balloon") {
        drawBalloon(p.x, p.y, size, alpha);
      }
    }

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // ambient sparkles + hearts on entry screen
  setInterval(() => {
    if (!screens.login.classList.contains("screen--active")) return;
    emit({
      kind: Math.random() < 0.65 ? "sparkle" : "heart",
      x: window.innerWidth * Math.random(),
      y: window.innerHeight * (0.25 + Math.random() * 0.65),
      vx: (Math.random() - 0.5) * 0.08,
      vy: -0.12 - Math.random() * 0.22,
      life: 1400 + Math.random() * 1200,
      size: 9 + Math.random() * 14,
    });
  }, 110);

  return { emit, burst };
}

// -------------------------
// Music
// -------------------------
function createMusic() {
  /** @type {AudioContext | null} */
  let ctx = null;
  let master = null;
  let playing = false;
  let timer = null;

  const progression = [
    // very soft: Am - F - C - G (romantic pop-ish)
    ["A3", "C4", "E4"],
    ["F3", "A3", "C4"],
    ["C3", "E3", "G3"],
    ["G2", "B2", "D3"],
  ];
  let step = 0;

  function noteToFreq(n) {
    const map = { C: 0, "C#": 1, D: 2, "D#": 3, E: 4, F: 5, "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11 };
    const m = String(n).match(/^([A-G])(#?)(\d)$/);
    if (!m) return 440;
    const name = m[1] + (m[2] || "");
    const oct = Number(m[3]);
    const semis = map[name];
    const midi = 12 * (oct + 1) + semis;
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  function ensureContext() {
    if (ctx) return ctx;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0.0;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1200;
    master.connect(filter);
    filter.connect(ctx.destination);
    return ctx;
  }

  function playChord(notes, time) {
    if (!ctx || !master) return;
    const chordGain = ctx.createGain();
    chordGain.gain.setValueAtTime(0.0, time);
    chordGain.gain.linearRampToValueAtTime(0.14, time + 0.06);
    chordGain.gain.exponentialRampToValueAtTime(0.001, time + 1.9);
    chordGain.connect(master);

    notes.forEach((n, i) => {
      const o = ctx.createOscillator();
      o.type = i === 0 ? "triangle" : "sine";
      o.frequency.setValueAtTime(noteToFreq(n), time);
      o.detune.setValueAtTime((Math.random() - 0.5) * 5, time);
      o.connect(chordGain);
      o.start(time);
      o.stop(time + 2.0);
    });
  }

  function schedule() {
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = progression[step % progression.length];
    playChord(notes, now + 0.02);
    step++;
  }

  function start() {
    ensureContext();
    if (!ctx || !master) return false;
    if (ctx.state === "suspended") ctx.resume();
    playing = true;

    // fade in
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.32, ctx.currentTime + 0.7);

    schedule();
    timer = setInterval(schedule, 1900);
    return true;
  }

  function stop() {
    if (!ctx || !master) return false;
    playing = false;
    clearInterval(timer);
    timer = null;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.35);
    return false;
  }

  async function toggle() {
    if (!ctx) ensureContext();
    if (!ctx) return false;
    if (ctx.state === "suspended") await ctx.resume();
    if (!playing) return start();
    stop();
    return false;
  }

  async function ensure() {
    if (!ctx) ensureContext();
    if (!ctx) return;
    if (ctx.state === "suspended") await ctx.resume();
  }

  function chime() {
    try {
      ensureContext();
      if (!ctx || !master) return;
      const t = ctx.currentTime + 0.02;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0, t);
      g.gain.linearRampToValueAtTime(0.18, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      g.connect(master);
      [880, 1320, 1760].forEach((f, i) => {
        const o = ctx.createOscillator();
        o.type = "sine";
        o.frequency.setValueAtTime(f, t);
        o.detune.setValueAtTime((Math.random() - 0.5) * 8, t);
        o.connect(g);
        o.start(t + i * 0.01);
        o.stop(t + 0.4);
      });
    } catch {
      // ignore
    }
  }

  return { toggle, ensure, chime };
}

// -------------------------
// Boot
// -------------------------
showScreen("login");

