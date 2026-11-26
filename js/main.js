// Interface: schermen tekenen en klikken doorgeven aan de engine.
import { CASES, DAYS, PORTRAITS, LINES } from './data.js';
import * as E from './engine.js';
import { portraitSVG } from './portrait.js';

const SAVE_KEY = 'tenoverstaan.v1';
const app = document.getElementById('app');
let S = null;      // spelstate (engine)
let cur = null;    // tijdelijke state van de huidige klant
let summary = null;

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const euro = (n) => (n < 0 ? '−' : '') + '€ ' + Math.abs(n).toLocaleString('nl-NL');

function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch {} }
function load() { try { return JSON.parse(localStorage.getItem(SAVE_KEY)); } catch { return null; } }
function clearSave() { try { localStorage.removeItem(SAVE_KEY); } catch {} }

// ---------- Titelscherm ----------
function showTitle() {
  const saved = load();
  const canResume = saved && !saved.ending;
  app.innerHTML = `
  <main class="screen center">
    <article class="paper title-paper">
      <p class="kicker">Een notarisgame</p>
      <h1 class="game-title">Ten Overstaan</h1>
      <p class="formula">Heden, maandag zeven december tweeduizend zesentwintig, verscheen ten overstaan van mij, notaris te Zandhoven, een rij cliënten. Sommigen waren wie zij zeiden te zijn.</p>
      <p class="small">Je bent net benoemd. Je hebt een kantoor, een secretaresse en een lening. Controleer de stukken, stel vragen en beslis: passeren, weigeren of in stilte melden.</p>
      <div class="btns">
        ${canResume ? `<button class="btn primary" data-act="resume">Doorgaan (${DAYS[saved.day].name.toLowerCase()})</button>` : ''}
        <button class="btn ${canResume ? '' : 'primary'}" data-act="new">Nieuwe praktijk openen</button>
      </div>
    </article>
  </main>`;
  app.querySelector('[data-act="new"]').onclick = () => { S = E.newGame(); clearSave(); showMorning(); };
  const r = app.querySelector('[data-act="resume"]');
  if (r) r.onclick = () => { S = saved; S.phase === 'morning' ? showMorning() : startCase(); };
}

// ---------- Ochtend ----------
function showMorning() {
  S.phase = 'morning';
  save();
  const d = DAYS[S.day];
  const news = E.morningNews(S);
  const newRules = E.rulesForDay(S.day).filter((r) => r.day === S.day);
  app.innerHTML = `
  <main class="screen center">
    <div class="morning">
      <article class="paper newspaper">
        <div class="masthead">Zandhovens Dagblad</div>
        <div class="dateline">${esc(d.date)} · editie Zandhoven en omstreken</div>
        <h2 class="lead">${esc(news[0])}</h2>
        ${news.slice(1).map((n) => `<h3 class="sub">${esc(n)}</h3>`).join('')}
        <p class="filler">Weerbericht: grijs, later grijzer. Ingezonden brief: "Waarom zijn notarissen altijd zo duur?" (pagina 7)</p>
      </article>
      <article class="paper circular">
        <div class="doc-head">Circulaire van de Orde</div>
        ${newRules.length ? newRules.map((r) => `<p class="rule new"><b>Nieuw:</b> ${esc(r.text)}</p>`).join('') : '<p class="rule">Geen nieuwe regels vandaag. Alle eerdere regels blijven van kracht.</p>'}
        <p class="small">Dag ${S.day} van 5. Kas: <b>${euro(S.kas)}</b>. Vaste lasten per dag: ${euro(E.HUUR + E.SALARIS)}${S.day === E.LAST_DAY ? `, plus vandaag de aflossing van ${euro(E.AFLOSSING)}` : ''}.</p>
        <button class="btn primary" data-act="open">Kantoor openen</button>
      </article>
    </div>
  </main>`;
  app.querySelector('[data-act="open"]').onclick = () => { S.phase = 'desk'; save(); startCase(); };
}

// ---------- Bureau ----------
function startCase() {
  const cid = E.currentCaseId(S);
  if (!cid) return showDayEnd();
  const c = CASES[cid];
  cur = { cid, slot: S.idx, found: [], marked: [], obs: [], asked: new Set(), selected: null, decided: false, inspect: false, gone: false,
    dialogue: (c.scene ? c.lines : c.intro).map((t) => ({ who: 'klant', text: t })) };
  renderDesk();
}

function clock() {
  const mins = 9 * 60 + (cur ? cur.slot : S.idx) * 80;
  return `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
}

function topbar() {
  const pct = Math.min(100, S.druk);
  return `
  <header class="topbar">
    <div class="tb-title">Notariskantoor · Markt 1, Zandhoven</div>
    <div class="tb-item">${esc(DAYS[S.day].date)}</div>
    <div class="tb-item mono">${clock()}</div>
    <div class="tb-item">Kas <b class="mono">${euro(S.kas)}</b></div>
    <div class="tb-item meter" title="Bij 100 volgt ontzetting uit het ambt">Toezichtsdruk
      <span class="bar"><span style="width:${pct}%" class="${pct >= 60 ? 'hot' : ''}"></span></span><b class="mono">${S.druk}</b></div>
  </header>`;
}

function fieldHTML(docId, f) {
  const [key, , val] = f;
  const ref = `${docId}.${key}`;
  const mark = foundRefs().has(ref) ? ' flagged' : '';
  const sel = cur.selected === ref ? ' selected' : '';
  if (typeof val === 'object') return `<span class="fld photo${mark}${sel}" data-ref="${ref}">${portraitSVG(val, { photo: true })}</span>`;
  return `<span class="fld${mark}${sel}" data-ref="${ref}">${esc(val)}</span>`;
}

function foundRefs() {
  return new Set(cur.marked);
}

function docHTML(d, i) {
  const tilt = [-1.2, 0.8, -0.5, 1.1, -0.9, 0.6, -1.4, 0.4][i % 8];
  let body;
  if (d.text) {
    body = `<p class="akte-text">${esc(d.text).replace(/\{(\w+)\}/g, (_, k) => fieldHTML(d.id, d.fields.find((f) => f[0] === k)))}</p>
            <div class="sign"><span>w.g. de comparant</span><span>w.g. de notaris</span></div>`;
  } else if (d.type === 'paspoort') {
    const photo = d.fields.find((f) => f[0] === 'foto');
    body = `<div class="pp"><div class="pp-photo">${fieldHTML(d.id, photo)}</div><div class="rows">${d.fields.filter((f) => f[0] !== 'foto').map((f) => `<div class="row"><span class="lbl">${esc(f[1])}</span>${fieldHTML(d.id, f)}</div>`).join('')}</div></div>
            <div class="mrz">P&lt;NWD${esc(d.fields.find((f) => f[0] === 'naam')[2].toUpperCase()).replace(/\s/g, '&lt;')}&lt;&lt;${esc(d.fields.find((f) => f[0] === 'voornamen')[2].toUpperCase().replace(/\./g, ''))}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>`;
  } else if (d.type === 'circulaire') {
    body = d.fields.map((f) => `<div class="row rule-row${E.rulesForDay(S.day).find((r) => r.id === f[0])?.day === S.day ? ' new' : ''}"><span class="lbl">${esc(f[1])}</span>${fieldHTML(d.id, f)}</div>`).join('');
  } else {
    body = `<div class="rows">${d.fields.map((f) => `<div class="row"><span class="lbl">${esc(f[1])}</span>${fieldHTML(d.id, f)}</div>`).join('')}</div>`;
  }
  return `<section class="doc doc-${d.type}" style="--tilt:${tilt}deg" data-doc="${d.id}"><div class="doc-head">${esc(d.title)}</div>${body}</section>`;
}

function speakerHTML(t) {
  return esc(t).replace(/\b([A-Z]{3,}):/g, (_, w) => `<b>${w[0] + w.slice(1).toLowerCase()}:</b>`);
}

function renderDesk() {
  const keep = { desk: app.querySelector('.desk')?.scrollTop || 0, counter: app.querySelector('.counter')?.scrollTop || 0, cid: renderDesk.last };
  renderDesk.last = cur.cid;
  const c = CASES[cur.cid];
  const rank = (d) => (d.id === 'circ' ? 0 : d.id === 'reg' ? 1 : 2);
  const docs = c.scene ? [] : E.deskDocs(cur.cid, S.day).sort((a, b) => rank(a) - rank(b));
  const qs = c.scene ? [] : E.availableQuestions(cur.cid, cur.found);
  const notes = [...(c.anomalies || []).filter((a) => cur.found.includes(a.id)).map((a) => a.label), ...cur.obs];
  const tip = S.day === 1 && !c.scene ? tutorialTip() : '';
  app.innerHTML = `
  ${topbar()}
  <div class="office${cur.inspect ? ' inspecting' : ''}" data-case="${cur.cid}">
    <aside class="counter">
      <div class="portrait-wrap">
        <div class="frame fld klant${cur.selected === 'klant' ? ' selected' : ''}${foundRefs().has('klant') ? ' flagged' : ''}" data-ref="klant">${portraitSVG(PORTRAITS[c.portrait])}</div>
        ${c.companion && !cur.gone ? `<div class="frame companion" title="Begeleider">${portraitSVG(PORTRAITS[c.companion])}</div>` : ''}
      </div>
      <div class="nameplate">${esc(c.name)}</div>
      <div class="dialogue" id="dlg">${cur.dialogue.map((l) => `<p class="say ${l.who}">${l.who === 'jij' ? '<b>Jij:</b> ' : ''}${speakerHTML(l.text)}</p>`).join('')}</div>
      ${!c.scene && !cur.decided ? `<div class="questions">${qs.map((q, i) => `<button class="q${cur.asked.has(q.q) ? ' asked' : ''}" data-q="${i}" ${cur.asked.has(q.q) ? 'disabled' : ''}>${esc(q.q)}</button>`).join('')}</div>` : ''}
      ${!c.scene ? `<div class="notes"><div class="notes-head">Dossiernotities</div>${notes.length ? notes.map((n) => `<p>• ${esc(n)}</p>`).join('') : '<p class="muted">Nog niets vastgelegd.</p>'}</div>` : ''}
      ${(c.scene || cur.decided) ? `<button class="btn primary next" data-act="next">${c.scene ? 'Verder' : 'Volgende cliënt'}</button>` : ''}
    </aside>
    <section class="desk">
      ${tip}
      ${c.scene ? `<div class="scene-note">Geen akte. Alleen een gesprek.</div>` : `<div class="docs">${docs.map(docHTML).join('')}</div>`}
    </section>
  </div>
  ${!c.scene ? `
  <footer class="stampbar">
    <button class="btn inspect-btn${cur.inspect ? ' on' : ''}" data-act="inspect" ${cur.decided ? 'disabled' : ''}>${cur.inspect ? 'Inspectie aan' : 'Inspecteren'} <kbd>spatie</kbd></button>
    <div class="hint" id="hint">${cur.inspect ? (cur.selected ? 'Klik het tweede veld dat hiermee in strijd is.' : 'Klik twee velden aan die elkaar tegenspreken. Ook de cliënt zelf telt mee.') : 'Lees de stukken. Zie je iets dat niet klopt, zet dan de inspectie aan.'}</div>
    <div class="stamps">
      ${E.DECISIONS.map((d) => `<button class="stamp st-${d}" data-dec="${d}" ${cur.decided ? 'disabled' : ''}>${{ passeren: 'Passeren', passeren_melden: 'Passeren + melden', weigeren: 'Weigeren', weigeren_melden: 'Weigeren + melden' }[d]}</button>`).join('')}
    </div>
  </footer>` : ''}
  <div class="toast" id="toast"></div>`;

  const dlg = document.getElementById('dlg');
  dlg.scrollTop = dlg.scrollHeight;
  if (keep.cid === cur.cid) {
    app.querySelector('.desk').scrollTop = keep.desk;
    app.querySelector('.counter').scrollTop = keep.counter;
  }
  app.querySelectorAll('[data-q]').forEach((b) => (b.onclick = () => ask(qs[+b.dataset.q])));
  app.querySelectorAll('[data-dec]').forEach((b) => (b.onclick = () => decideNow(b.dataset.dec)));
  app.querySelector('[data-act="inspect"]')?.addEventListener('click', toggleInspect);
  app.querySelector('[data-act="next"]')?.addEventListener('click', nextCase);
  app.querySelector('[data-act="tip"]')?.addEventListener('click', () => { S.tipDone = (S.tipDone || 0) + 1; renderDesk(); });
  app.querySelectorAll('.fld').forEach((f) => (f.onclick = () => clickField(f.dataset.ref)));
}

function tutorialTip() {
  const n = S.tipDone || 0;
  const tips = [
    '<b>Ingrid:</b> Welkom op kantoor! Zo werkt het. Lees het intakeformulier, de legitimatie en de akte. Kloppen naam, geboortedatum en aanhef overal? Rechts ligt de circulaire met de regels.',
    '<b>Ingrid:</b> Klopt er iets niet? Zet de inspectie aan (spatie) en klik twee velden aan die elkaar tegenspreken. Zo leg je een afwijking vast in het dossier, en kun je de cliënt erover bevragen. Ook de cliënt zelf is een veld: vergelijk hem met de pasfoto.',
    '<b>Ingrid:</b> Dan de stempels. Passeren levert honorarium op. Weigeren zonder goede reden levert een klacht op; we hebben ministerieplicht. Melden gaat in stilte naar het LOT, de cliënt merkt er niets van. Een melding zonder vastgelegde afwijking is waardeloos.',
  ];
  if (n >= tips.length) return '';
  return `<div class="tip">${tips[n]} <button class="btn small" data-act="tip">${n < tips.length - 1 ? 'Volgende tip' : 'Begrepen'}</button></div>`;
}

function toast(msg, kind = '') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.className = `toast show ${kind}`;
  t.textContent = msg;
  clearTimeout(toast.h);
  toast.h = setTimeout(() => (t.className = 'toast'), 4200);
}

function toggleInspect() {
  if (cur.decided || CASES[cur.cid].scene) return;
  cur.inspect = !cur.inspect;
  cur.selected = null;
  renderDesk();
  if (cur.inspect) toast('Inspectie aan: klik twee velden aan die elkaar tegenspreken. Ook de cliënt zelf telt mee.');
}

function clickField(ref) {
  if (!cur.inspect || cur.decided) return;
  if (!cur.selected) { cur.selected = ref; return renderDesk(); }
  if (cur.selected === ref) { cur.selected = null; return renderDesk(); }
  const first = cur.selected;
  const an = E.checkPair(cur.cid, first, ref);
  cur.selected = null;
  if (an) cur.marked.push(first, ref);
  if (an && !cur.found.includes(an.id)) {
    cur.found.push(an.id);
    renderDesk();
    toast(`Afwijking vastgelegd: ${an.label}`, 'bad');
  } else if (an) {
    renderDesk();
    toast('Deze afwijking staat al in het dossier.');
  } else {
    renderDesk();
    toast('Geen afwijking tussen deze twee velden.');
  }
}

function ask(q) {
  cur.asked.add(q.q);
  cur.dialogue.push({ who: 'jij', text: q.q }, { who: 'klant', text: q.a });
  if (q.flag && !cur.obs.includes(q.flag)) cur.obs.push(q.flag);
  if (q.dismiss) cur.gone = true;
  renderDesk();
}

function decideNow(decision) {
  const flags = [...cur.found, ...cur.obs];
  const { reaction } = E.decide(S, cur.cid, decision, flags);
  cur.decided = true;
  cur.inspect = false;
  cur.selected = null;
  cur.dialogue.push({ who: 'klant', text: reaction });
  save();
  renderDesk();
  const akte = app.querySelector('[data-doc="akte"]');
  if (akte) {
    const st = document.createElement('div');
    const pass = decision.startsWith('passeren');
    st.className = `stamp-mark ${pass ? 'ok' : 'no'}`;
    st.innerHTML = `${pass ? 'Gepasseerd' : 'Geweigerd'}${decision.endsWith('_melden') ? '<small>gemeld bij het LOT</small>' : ''}`;
    akte.appendChild(st);
  }
}

function nextCase() {
  if (CASES[cur.cid].scene) { E.skipScene(S, cur.cid); save(); }
  startCase();
}

// ---------- Dagafsluiting ----------
function showDayEnd() {
  summary = E.endDay(S);
  S.phase = 'dayend';
  const last = S.day === E.LAST_DAY;
  const ending = last ? null : E.checkEnding(S);
  const sum = (arr) => arr.reduce((s, x) => s + x.amount, 0);
  app.innerHTML = `
  <main class="screen center">
    <article class="paper ledger">
      <div class="doc-head">Dagafrekening · ${esc(DAYS[summary.day].date)}</div>
      <table>
        ${summary.income.map((r) => `<tr><td>${esc(r.label)}</td><td class="num">${euro(r.amount)}</td></tr>`).join('') || '<tr><td class="muted">Geen inkomsten vandaag</td><td></td></tr>'}
        ${summary.costs.map((r) => `<tr class="cost"><td>${esc(r.label)}</td><td class="num">${euro(r.amount)}</td></tr>`).join('')}
        <tr class="total"><td>Saldo vandaag</td><td class="num">${euro(sum(summary.income) + sum(summary.costs))}</td></tr>
        <tr class="total"><td>Kas</td><td class="num ${S.kas < 0 ? 'neg' : ''}">${euro(S.kas)}</td></tr>
        <tr><td>Toezichtsdruk</td><td class="num">${S.druk} / 100</td></tr>
      </table>
      <div class="doc-head">Post</div>
      <div class="mail">${summary.mail.length ? summary.mail.map((m) => `<p class="letter">${esc(m)}</p>`).join('') : '<p class="muted">Geen post vandaag.</p>'}</div>
      <button class="btn primary" data-act="go">${ending ? 'Verder' : last ? 'De inspecteur staat voor de deur' : 'Naar huis'}</button>
    </article>
  </main>`;
  app.querySelector('[data-act="go"]').onclick = () => {
    if (ending) return showEnding();
    if (last) return showInspection();
    E.nextDay(S);
    showMorning();
  };
}

// ---------- Inspectie ----------
function showInspection() {
  const insp = E.inspection(S);
  E.checkEnding(S, { afterInspection: true, heavy: insp.heavy });
  app.innerHTML = `
  <main class="screen center">
    <article class="paper report">
      <div class="doc-head">Bureau Notarieel Toezicht · Inspectierapport</div>
      <p>Inspecteur mr. drs. A. Kalkman heeft op ${esc(DAYS[E.LAST_DAY].date)} alle dossiers van deze week ingezien.</p>
      ${insp.found.length ? `<p>De volgende gebreken zijn aangetroffen. Elk gebrek telt bij een inspectie dubbel.</p>
        <ul>${insp.found.map((m) => `<li>${esc(m.text)} <b>+${m.pts}</b>${m.heavy ? ' (ernstig)' : ''}</li>`).join('')}</ul>` : '<p>Er zijn geen gebreken aangetroffen. De inspecteur knikt en neemt nog een koekje.</p>'}
      <p>Toezichtsdruk na inspectie: <b>${insp.druk}</b>.</p>
      <button class="btn primary" data-act="end">Uitslag</button>
    </article>
  </main>`;
  app.querySelector('[data-act="end"]').onclick = showEnding;
}

// ---------- Einde ----------
function showEnding() {
  const en = E.ENDINGS[S.ending];
  const lines = E.lineResults(S);
  save();
  app.innerHTML = `
  <main class="screen center">
    <article class="paper ending ending-${S.ending}">
      <div class="doc-head">${esc(en.title)}</div>
      <h1 class="verdict">${esc(en.verdict)}</h1>
      <p class="formula">${esc(S.findings && en.textFindings ? en.textFindings : en.text)}</p>
      <table class="stats">
        <tr><td>Kas</td><td class="num">${euro(S.kas)}</td></tr>
        <tr><td>Toezichtsdruk</td><td class="num">${S.druk}</td></tr>
        <tr><td>Aangenomen "spoedtoeslagen"</td><td class="num">${euro(S.bribes)}</td></tr>
        ${Object.entries(LINES).map(([k, label]) => `<tr><td>${esc(label)}</td><td class="num">${lines[k] ? 'correct gemeld' : 'niet correct gemeld'}</td></tr>`).join('')}
      </table>
      <div class="stamp-mark big ${['ontzet', 'failliet'].includes(S.ending) ? 'no' : 'ok'}">${['ontzet', 'failliet'].includes(S.ending) ? 'Einde' : 'Overleefd'}</div>
      <button class="btn primary" data-act="again">Opnieuw beginnen</button>
    </article>
  </main>`;
  app.querySelector('[data-act="again"]').onclick = () => { clearSave(); S = E.newGame(); showMorning(); };
}

document.addEventListener('keydown', (e) => {
  if (!cur || !document.querySelector('.office')) return;
  if (e.code === 'Space' && e.target.tagName !== 'BUTTON') { e.preventDefault(); toggleInspect(); }
  if (e.code === 'Escape' && cur.selected) { cur.selected = null; renderDesk(); }
});

showTitle();
