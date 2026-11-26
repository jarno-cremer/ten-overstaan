// Stijlproef: één cliënt (de valse S. de Vries) op een fysiek bureau.
import { CASES, PORTRAITS } from './data.js';
import * as E from './engine.js';
import { portraitSVG } from './portrait.js';

const CID = 'devries1';
const C = CASES[CID];
const W = 1600, H = 900;
const stage = document.getElementById('stage');
const S = E.newGame();
const st = { inspect: false, sel: null, found: [], marked: [], obs: [], asked: new Set(), links: [], stamped: null, reported: false, done: false, z: 20, busy: false };

// ---------- schaal ----------
let scale = 1;
function fit() {
  scale = Math.min(window.innerWidth / W, window.innerHeight / H);
  stage.style.transform = `scale(${scale})`;
}
window.addEventListener('resize', () => { fit(); drawThreads(); });
fit();

// ---------- geluid (WebAudio, geen bestanden) ----------
let ac = null, muted = false;
function audio() { if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)(); return ac; }
function noise(dur, { freq = 1800, q = 0.8, gain = 0.25, type = 'bandpass' } = {}) {
  if (muted) return;
  const a = audio(), n = a.sampleRate * dur, buf = a.createBuffer(1, n, a.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
  const src = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
  src.buffer = buf; f.type = type; f.frequency.value = freq; f.Q.value = q; g.gain.value = gain;
  src.connect(f).connect(g).connect(a.destination); src.start();
}
function tone(freq, dur, { gain = 0.15, type = 'sine', delay = 0 } = {}) {
  if (muted) return;
  const a = audio(), o = a.createOscillator(), g = a.createGain(), t = a.currentTime + delay;
  o.type = type; o.frequency.value = freq;
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(a.destination); o.start(t); o.stop(t + dur + 0.05);
}
const sfx = {
  paper: () => noise(0.18, { freq: 2400, q: 0.6, gain: 0.18 }),
  slide: () => noise(0.4, { freq: 1400, q: 0.5, gain: 0.12 }),
  stamp: () => { tone(70, 0.25, { gain: 0.5 }); noise(0.08, { freq: 400, q: 1, gain: 0.4, type: 'lowpass' }); },
  bell: () => { tone(1318, 0.9, { gain: 0.12 }); tone(1046, 1.2, { gain: 0.1, delay: 0.18 }); },
  tick: () => noise(0.015, { freq: 3500, q: 2, gain: 0.05 }),
  thread: () => { tone(220, 0.12, { gain: 0.08, type: 'triangle' }); tone(330, 0.18, { gain: 0.07, type: 'triangle', delay: 0.08 }); },
  miss: () => tone(140, 0.15, { gain: 0.08, type: 'triangle' }),
  door: () => noise(0.5, { freq: 300, q: 0.7, gain: 0.25, type: 'lowpass' }),
  drawer: () => { noise(0.25, { freq: 900, q: 0.7, gain: 0.15 }); tone(180, 0.1, { gain: 0.08, delay: 0.2 }); },
};

// ---------- hulpjes ----------
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const el = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function pos(elm) {
  const r = elm.getBoundingClientRect(), s = stage.getBoundingClientRect();
  return { x: (r.left - s.left) / scale, y: (r.top - s.top) / scale, w: r.width / scale, h: r.height / scale };
}
const inside = (p, r) => p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;

function toast(msg, bad = false) {
  const t = stage.querySelector('.toast');
  t.textContent = msg; t.className = `toast show${bad ? ' bad' : ''}`;
  clearTimeout(toast.h); toast.h = setTimeout(() => (t.className = 'toast'), 3800);
}

// ---------- kantoor opbouwen ----------
const doc = (id) => C.docs.find((d) => d.id === id);
const fv = (d, k) => d.fields.find((f) => f[0] === k);
const fld = (docId, f) => `<span class="fld" data-ref="${docId}.${f[0]}">${esc(f[2])}</span>`;

const crest = `<svg class="crest" viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" fill="none" stroke="#d9bf72" stroke-width="2"/><path d="M40 14 L48 34 L66 34 L52 46 L58 64 L40 53 L22 64 L28 46 L14 34 L32 34 Z" fill="none" stroke="#d9bf72" stroke-width="2"/><path d="M10 58 Q40 72 70 58" fill="none" stroke="#d9bf72" stroke-width="1.5"/></svg>`;
const loupeIcon = `<svg viewBox="0 0 32 32"><circle cx="13" cy="13" r="9" fill="rgba(180,210,230,.4)" stroke="#2c2119" stroke-width="3"/><line x1="20" y1="20" x2="29" y2="29" stroke="#2c2119" stroke-width="4" stroke-linecap="round"/></svg>`;
const windowView = `<svg viewBox="0 0 290 210" preserveAspectRatio="none">
  <rect width="290" height="210" fill="url(#sky)"/><defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5b6c80"/><stop offset=".7" stop-color="#a7a49b"/><stop offset="1" stop-color="#d3b27e"/></linearGradient></defs>
  <path d="M0 150 L0 110 L30 110 L30 90 L45 75 L60 90 L60 110 L95 110 L95 70 L110 55 L125 70 L125 115 L160 115 L160 95 L190 95 L190 60 L198 40 L206 60 L206 95 L235 95 L235 120 L290 120 L290 210 L0 210 Z" fill="#2b2f36"/>
  <g fill="#f2cf7a" opacity=".85"><rect x="102" y="80" width="6" height="8"/><rect x="113" y="95" width="6" height="8"/><rect x="168" y="102" width="6" height="7"/><rect x="40" y="96" width="5" height="7"/><rect x="246" y="128" width="7" height="8"/></g>
  <rect y="170" width="290" height="40" fill="#3b3a38"/></svg>`;

function buildOffice() {
  const fI = doc('intake'), fId = doc('id'), fA = doc('akte');
  const circ = E.deskDocs(CID, 1).find((d) => d.id === 'circ');
  const akteText = esc(fA.text).replace(/\{(\w+)\}/g, (_, k) => fld('akte', fv(fA, k)));
  stage.innerHTML = `
    <div class="wall"><div class="wainscot"></div></div>
    <div class="window">${windowView}<div class="bar-h"></div></div>
    <div class="clock"><div class="hand h" style="transform:rotate(${15.66 * 30}deg)"></div><div class="hand m" style="transform:rotate(${40 * 6}deg)"></div><div class="pin"></div></div>
    <div class="clock-label">maandag 7 december</div>
    <div class="door"><div class="door-glass"><span>NOTARIAAT<br>ZANDHOVEN</span></div><div class="knob"></div></div>
    <div class="client" data-ref="klant" style="left:1420px;opacity:0">${portraitSVG(PORTRAITS[C.portrait], { bare: true })}</div>
    <div class="glass"><div class="hole"></div></div>
    <div class="nameplate"><span>Mr. … · notaris</span></div>
    <div class="counter"><div class="counter-label">Akte teruggeven aan de cliënt</div></div>
    <div class="bubble"></div>
    <div class="desk"></div>
    <div class="blotter"></div>
    <div class="desk-shade"></div>

    <section class="paper circ" data-paper="circ" style="left:56px;top:404px;--r:-2.5deg"><span class="pin"></span>
      <h3>Circulaire van de Orde</h3>
      ${circ.fields.map((f) => `<div class="rule">${fld('circ', f)}</div>`).join('')}
    </section>

    <section class="paper akte" data-paper="akte" style="left:610px;top:414px;--r:.6deg">
      <div class="title">${esc(fA.title)}</div><div class="sub">concept · opgemaakt door Ingrid</div>
      <p>${akteText}</p>
      <div class="sign"><div>de comparant</div><div>de notaris</div></div>
      <div class="zone"></div>
    </section>

    <section class="paper intake" data-paper="intake" style="left:290px;top:420px;--r:-1.2deg;display:none">
      <h3>Intakeformulier</h3>
      ${fI.fields.map((f) => `<div class="row"><span class="lbl">${esc(f[1])}</span>${fld('intake', f)}</div>`).join('')}
    </section>

    <section class="paper passport" data-paper="id" style="left:100px;top:590px;--r:4deg;display:none">
      <div class="cover">${crest}<div>NEDERWAARD</div><small>PASPOORT</small><div class="tap">klik om te openen</div></div>
      <div class="spread">
        <div class="page"><h3>Gemenebest Nederwaard</h3>
          <span class="fld photo" data-ref="id.foto">${portraitSVG(fv(fId, 'foto')[2], { photo: true })}</span>
          <div class="row"><span class="lbl">Documentnr.</span>${fld('id', fv(fId, 'nummer'))}</div></div>
        <div class="page"><span class="close">sluiten</span><h3>Persoonsgegevens</h3>
          ${['naam', 'voornamen', 'geslacht', 'geboren', 'geldig'].map((k) => `<div class="row"><span class="lbl">${esc(fv(fId, k)[1])}</span>${fld('id', fv(fId, k))}</div>`).join('')}
          <div class="mrz">P&lt;NWDDE&lt;VRIES&lt;&lt;S&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div></div>
      </div>
    </section>

    <div class="rack"><div class="rack-label">stempels</div></div>
    <div class="stamp pass home" data-stamp="pass" style="left:1240px;top:390px"><div class="knob"></div><div class="neck"></div><div class="base"></div><div class="rubber"></div><div class="tag">Passeren</div></div>
    <div class="stamp refuse home" data-stamp="refuse" style="left:1350px;top:390px"><div class="knob"></div><div class="neck"></div><div class="base"></div><div class="rubber"></div><div class="tag">Weigeren</div></div>

    <div class="lot-pad"><div class="sheet"></div><div class="sheet"></div></div>
    <div class="lot-pad lot-slip" data-slip style="left:1222px;top:520px"><div class="sheet">LOT · meldformulier<b>Ongebruikelijke transactie</b></div></div>
    <div class="tray"><div class="count"></div><div class="lip">Meldingen · vertrouwelijk</div></div>

    <div class="notepad"></div>
    <button class="loupe-btn" aria-label="Loep (spatie)">${loupeIcon}</button>
    <div class="loupe-hint">loep · spatie</div>

    <div class="sticky"><b>Ingrid:</b> Laatste cliënt van vandaag! Papieren kun je verslepen. Met de loep (spatie) klik je twee dingen aan die niet kloppen, ook de cliënt zelf. Stempel de akte en schuif hem over de balie terug. Twijfel? Een geel LOT-formulier in de bak. Dat ziet hij niet.<br><button>Begrepen</button></div>

    <svg class="threads" viewBox="0 0 ${W} ${H}"></svg>
    <div class="toast"></div>
    <button class="mute">geluid aan</button>
    <div class="evening"></div>
    <div class="curtain"><div class="day">Maandag 7 december</div><div class="time">15:40 · de laatste cliënt van de dag</div>
      <button>Begin</button><div class="note">Stijlproef van Ten Overstaan: één cliënt op een fysiek bureau. Met geluid.</div></div>`;
  renderNotes();
}

// ---------- notitieblok ----------
function renderNotes() {
  const pad = stage.querySelector('.notepad');
  const found = (C.anomalies || []).filter((a) => st.found.includes(a.id));
  const qs = E.availableQuestions(CID, st.found);
  pad.innerHTML = `<div class="head">Dossier De Vries, Havenkade</div>
    ${found.length || st.obs.length ? found.map((a, i) => `<div class="found">${i + 1}. ${esc(a.label)}</div>`).join('') + st.obs.map((o) => `<div class="found">• ${esc(o)}</div>`).join('') : '<div class="empty">nog niets gevonden…</div>'}
    ${qs.length ? `<div class="head" style="margin-top:4px">Vragen</div>${qs.map((q, i) => `<div class="q${st.asked.has(q.q) ? ' asked' : ''}" data-q="${i}">→ ${esc(q.q)}</div>`).join('')}` : ''}`;
  pad.querySelectorAll('.q').forEach((n) => (n.onclick = () => ask(qs[+n.dataset.q])));
}

// ---------- spraak ----------
let typing = null;
function say(text, who = 'klant', { wait = false } = {}) {
  const b = stage.querySelector('.bubble');
  b.className = `bubble show${who === 'jij' ? ' me' : ''}`;
  const name = who === 'jij' ? 'Jij' : 'S. de Vries';
  b.innerHTML = `<span class="who">${name}</span><span class="txt"></span>`;
  const more = () => { if (wait && !b.querySelector('.more')) b.insertAdjacentHTML('beforeend', '<span class="more">▸ klik</span>'); };
  const span = b.querySelector('.txt');
  clearInterval(typing);
  let i = 0;
  return new Promise((resolve) => {
    const finish = () => { clearInterval(typing); span.textContent = text; more(); if (!wait) resolve(); };
    typing = setInterval(() => { i += 1; span.textContent = text.slice(0, i); if (i % 3 === 0) sfx.tick(); if (i >= text.length) finish(); }, 22);
    b.onclick = () => { if (span.textContent.length < text.length) return finish(); if (wait) { b.onclick = null; resolve(); } };
  });
}

async function ask(q) {
  if (st.asked.has(q.q) || st.done || st.busy) return;
  st.busy = true;
  st.asked.add(q.q);
  renderNotes();
  await say(q.q, 'jij', { wait: true });
  await say(q.a, 'klant');
  st.busy = false;
}

// ---------- slepen ----------
function makeDraggable(node, { onDrop, onMove, handle } = {}) {
  node.addEventListener('pointerdown', (e) => {
    if (st.done || e.button !== 0) return;
    if (st.inspect && node.classList.contains('paper')) return;
    if (e.target.closest('.close')) return;
    if (handle && !handle(e)) return;
    e.preventDefault();
    const start = { x: e.clientX, y: e.clientY, l: parseFloat(node.style.left), t: parseFloat(node.style.top) };
    let moved = false;
    node.style.zIndex = ++st.z;
    node.setPointerCapture(e.pointerId);
    const move = (ev) => {
      const dx = (ev.clientX - start.x) / scale, dy = (ev.clientY - start.y) / scale;
      if (!moved && Math.hypot(dx, dy) < 4) return;
      if (!moved) { moved = true; node.classList.add('lift'); sfx.paper(); }
      node.style.left = `${Math.max(-80, Math.min(W - 80, start.l + dx))}px`;
      node.style.top = `${Math.max(-40, Math.min(H - 60, start.t + dy))}px`;
      onMove?.(node);
      drawThreads();
    };
    const up = () => {
      node.removeEventListener('pointermove', move);
      node.removeEventListener('pointerup', up);
      node.classList.remove('lift');
      if (moved) onDrop?.(node); else node.dispatchEvent(new CustomEvent('tap'));
      drawThreads();
    };
    node.addEventListener('pointermove', move);
    node.addEventListener('pointerup', up);
  });
}

// ---------- inspectie ----------
function setInspect(on) {
  if (st.done) return;
  st.inspect = on;
  st.sel = null;
  stage.classList.toggle('inspect', on);
  stage.querySelector('.loupe-btn').classList.toggle('on', on);
  stage.querySelectorAll('.sel').forEach((n) => n.classList.remove('sel'));
  if (on) toast('Loep: klik twee dingen aan die elkaar tegenspreken.');
}

function refNode(ref) { return stage.querySelector(`[data-ref="${ref}"]`); }

function pick(ref) {
  if (!st.inspect || st.done) return;
  const node = refNode(ref);
  if (!st.sel) { st.sel = ref; node.classList.add('sel'); return; }
  if (st.sel === ref) { st.sel = null; node.classList.remove('sel'); return; }
  const a = st.sel;
  st.sel = null;
  stage.querySelectorAll('.sel').forEach((n) => n.classList.remove('sel'));
  const an = E.checkPair(CID, a, ref);
  if (an && !st.found.includes(an.id)) {
    st.found.push(an.id);
    st.links.push({ a, b: ref, n: st.found.length });
    [a, ref].forEach((r) => refNode(r).classList.add('flag'));
    sfx.thread();
    toast(`Afwijking: ${an.label}`, true);
    renderNotes();
  } else if (an) {
    toast('Die afwijking staat al in je dossier.');
  } else {
    const tmp = { a, b: ref, miss: true };
    st.links.push(tmp);
    sfx.miss();
    toast('Geen afwijking tussen die twee.');
    setTimeout(() => { st.links = st.links.filter((l) => l !== tmp); drawThreads(); }, 900);
  }
  drawThreads();
}

function anchor(ref) {
  let n = refNode(ref);
  if (!n) return null;
  if (!n.offsetParent) n = n.closest('.paper') || n;
  const p = pos(n);
  return { x: p.x + p.w / 2, y: p.y + p.h / 2 };
}

function drawThreads() {
  const svg = stage.querySelector('.threads');
  if (!svg) return;
  svg.innerHTML = st.links.map((l) => {
    const a = anchor(l.a), b = anchor(l.b);
    if (!a || !b) return '';
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    return `<line class="${l.miss ? 'miss' : ''}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"/>` +
      (l.miss ? '' : `<circle cx="${a.x}" cy="${a.y}" r="5"/><circle cx="${b.x}" cy="${b.y}" r="5"/><g class="tag"><rect x="${mx - 13}" y="${my - 13}" width="26" height="26" rx="13"/><text x="${mx}" y="${my + 5}" text-anchor="middle">${l.n}</text></g>`);
  }).join('');
}

// ---------- stempels, melding, teruggeven ----------
function setupStamps() {
  stage.querySelectorAll('[data-stamp]').forEach((s) => {
    const home = { left: s.style.left, top: s.style.top };
    makeDraggable(s, {
      onMove: () => {
        const akte = stage.querySelector('.akte');
        const tip = { x: parseFloat(s.style.left) + 46, y: parseFloat(s.style.top) + 84 };
        akte.classList.toggle('stamp-target', !st.stamped && inside(tip, pos(akte)));
      },
      onDrop: () => {
        const akte = stage.querySelector('.akte');
        akte.classList.remove('stamp-target');
        const tip = { x: parseFloat(s.style.left) + 46, y: parseFloat(s.style.top) + 84 };
        const r = pos(akte);
        if (inside(tip, r) && !st.stamped) {
          st.stamped = s.dataset.stamp;
          const rot = (Math.random() * 14 - 10).toFixed(1);
          const imp = el(`<div class="impression ${st.stamped}" style="--r:${rot}deg;left:${tip.x - r.x - 110}px;top:${tip.y - r.y - 34}px;transform:rotate(${rot}deg)">${st.stamped === 'pass' ? 'Gepasseerd' : 'Geweigerd'}<small>7 december 2026 · Zandhoven</small></div>`);
          akte.appendChild(imp);
          sfx.stamp();
          toast(st.stamped === 'pass' ? 'Gepasseerd. Schuif de akte over de balie terug.' : 'Geweigerd. Schuif de akte over de balie terug.');
        } else if (st.stamped && inside(tip, r)) {
          toast('Er staat al een stempel op deze akte.');
        }
        s.style.left = home.left; s.style.top = home.top;
      },
    });
  });

  const slip = stage.querySelector('[data-slip]');
  const tray = stage.querySelector('.tray');
  const slipHome = { left: slip.style.left, top: slip.style.top };
  makeDraggable(slip, {
    onMove: () => tray.classList.toggle('drop-ok', inside(centre(slip), pos(tray))),
    onDrop: () => {
      tray.classList.remove('drop-ok');
      if (inside(centre(slip), pos(tray))) {
        st.reported = true;
        slip.style.display = 'none';
        tray.querySelector('.count').textContent = '1 melding';
        sfx.drawer();
        toast('Melding klaar voor het LOT. De cliënt merkt er niets van. Klik op de bak om hem terug te pakken.');
      } else { slip.style.left = slipHome.left; slip.style.top = slipHome.top; }
    },
  });
  tray.onclick = () => {
    if (!st.reported || st.done) return;
    st.reported = false;
    slip.style.display = ''; slip.style.left = slipHome.left; slip.style.top = slipHome.top;
    tray.querySelector('.count').textContent = '';
    sfx.paper();
  };
}
const centre = (n) => { const p = pos(n); return { x: p.x + p.w / 2, y: p.y + p.h / 2 }; };

function setupPapers() {
  const counter = stage.querySelector('.counter');
  const handZone = { x: 430, y: 0, w: 720, h: 362 };
  stage.querySelectorAll('.paper').forEach((p) => {
    makeDraggable(p, {
      onMove: () => { if (p.dataset.paper === 'akte') counter.classList.toggle('drop-ok', inside(centre(p), handZone)); },
      onDrop: () => {
        counter.classList.remove('drop-ok');
        if (p.dataset.paper === 'akte' && inside(centre(p), handZone)) return handBack(p);
        if (parseFloat(p.style.top) < 360) p.style.top = '372px';
      },
    });
  });
  const pass = stage.querySelector('.passport');
  pass.addEventListener('tap', () => { if (!pass.classList.contains('open')) { pass.classList.add('open'); sfx.paper(); drawThreads(); } });
  pass.querySelector('.close').addEventListener('click', () => { pass.classList.remove('open'); sfx.paper(); drawThreads(); });
}

async function handBack(akte) {
  if (!st.stamped) {
    akte.style.top = '414px';
    sfx.slide();
    say('Moet daar niet eerst een stempel op, notaris?');
    return;
  }
  st.done = true;
  setInspect(false);
  akte.style.transition = 'top .5s, opacity .5s';
  akte.style.top = '250px'; akte.style.opacity = '0';
  sfx.slide();
  const decision = (st.stamped === 'pass' ? 'passeren' : 'weigeren') + (st.reported ? '_melden' : '');
  const flags = [...st.found, ...st.obs];
  const { reaction } = E.decide(S, CID, decision, flags);
  await sleep(500);
  await say(reaction);
  await sleep(1600);
  await walkOut();
  evening(decision);
}

// ---------- binnenkomen en vertrekken ----------
async function walkIn() {
  const door = stage.querySelector('.door'), cl = stage.querySelector('.client');
  sfx.bell();
  door.classList.add('open'); sfx.door();
  await sleep(500);
  cl.style.opacity = '1'; cl.classList.add('walking');
  cl.style.left = '640px';
  await sleep(1650);
  cl.classList.remove('walking'); cl.classList.add('idle');
  door.classList.remove('open');
}
async function walkOut() {
  const door = stage.querySelector('.door'), cl = stage.querySelector('.client');
  stage.querySelector('.bubble').className = 'bubble';
  door.classList.add('open'); sfx.door();
  cl.classList.remove('idle'); cl.classList.add('walking');
  cl.style.left = '1420px';
  await sleep(1500);
  cl.style.opacity = '0';
  await sleep(300);
  door.classList.remove('open');
  sfx.bell();
}

async function handOver(sel, delay) {
  await sleep(delay);
  const p = stage.querySelector(sel);
  p.style.display = '';
  p.classList.add('arrive');
  sfx.slide();
  setTimeout(() => p.classList.remove('arrive'), 600);
}

// ---------- avond ----------
function evening(decision) {
  const ev = stage.querySelector('.evening');
  const labels = { passeren: 'gepasseerd', passeren_melden: 'gepasseerd en gemeld', weigeren: 'geweigerd', weigeren_melden: 'geweigerd en gemeld' };
  const all = C.anomalies;
  const verdict = decision === 'weigeren_melden' && st.found.length ? 'Goed gezien.' : decision.startsWith('passeren') ? 'Dat had je niet moeten doen.' : 'Bijna.';
  ev.innerHTML = `<div class="letter">
    <h2>Post · maandagavond</h2>
    <div class="verdict">${verdict}</div>
    <p>Je hebt de akte <b>${labels[decision]}</b>. Je vond ${st.found.length} van de ${all.length} afwijkingen.</p>
    ${S.mail.map((m) => `<p>${esc(m)}</p>`).join('')}
    <p style="color:var(--ink-soft);font-size:16px">Wat er niet klopte: ${all.map((a) => `${st.found.includes(a.id) ? '✓' : '✗'} ${esc(a.label.toLowerCase())}`).join('; ')}.</p>
    <div class="btns"><button class="primary" data-again>Nog een keer</button><a href="index.html">Naar het spel (versie 0.1)</a></div>
  </div>`;
  ev.classList.add('show');
  ev.querySelector('[data-again]').onclick = () => location.reload();
}

// ---------- start ----------
async function start() {
  buildOffice();
  setupPapers();
  setupStamps();
  stage.querySelectorAll('.fld, .client').forEach((n) => n.addEventListener('pointerdown', (e) => { if (st.inspect) { e.stopPropagation(); e.preventDefault(); pick(n.dataset.ref); } }));
  stage.querySelector('.loupe-btn').onclick = () => setInspect(!st.inspect);
  stage.querySelector('.sticky button').onclick = () => { stage.querySelector('.sticky').style.display = 'none'; sfx.paper(); };
  const mute = stage.querySelector('.mute');
  mute.onclick = () => { muted = !muted; mute.textContent = muted ? 'geluid uit' : 'geluid aan'; };
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') { e.preventDefault(); setInspect(!st.inspect); }
    if (e.code === 'Escape') setInspect(false);
  });
  const curtain = stage.querySelector('.curtain');
  curtain.querySelector('button').onclick = async () => {
    audio();
    curtain.classList.add('gone');
    await sleep(700);
    await walkIn();
    await say(C.intro[0], 'klant', { wait: true });
    handOver('.intake', 0);
    handOver('.passport', 350);
    await sleep(500);
    say(C.intro[1]);
  };
}
start();
