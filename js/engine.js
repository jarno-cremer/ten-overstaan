// Spellogica zonder DOM: state, beslissingen, dagafsluiting, inspectie en eindes.
import { CASES, DAYS, RULES, MISSING_REGISTER, LINES } from './data.js';

export const START_KAS = 1500;
export const HUUR = 350;
export const SALARIS = 250;
export const AFLOSSING = 4500;
export const LAST_DAY = 5;
export const DECISIONS = ['passeren', 'passeren_melden', 'weigeren', 'weigeren_melden'];

// Gevolg per soort zaak en beslissing. vis = direct zichtbaar, hid = verborgen tot de inspectie.
// reportBonus geldt alleen als er minstens één afwijking of observatie is vastgelegd.
const RULESET = {
  eerlijk: {
    passeren: {}, passeren_melden: { vis: 6, letter: 'overmelding' },
    weigeren: { vis: 8, letter: 'klacht' }, weigeren_melden: { vis: 8, letter: 'klacht' },
  },
  formeel: {
    passeren: { vis: 5, letter: 'formeel' }, passeren_melden: { vis: 5, letter: 'formeel' },
    weigeren: {}, weigeren_melden: {},
  },
  melden: {
    passeren: { hid: 20, miss: 'Meldplichtige transactie niet gemeld' },
    passeren_melden: { reportBonus: 5 },
    weigeren: { vis: 8, letter: 'klacht', hid: 10, miss: 'Meldplichtige transactie niet gemeld' },
    weigeren_melden: { vis: 8, letter: 'klacht', reportBonus: 5 },
    // Bij een zaak met okRefuse (echt verdacht) is weigeren met vastgelegde afwijking gerechtvaardigd.
    weigeren_melden_gegrond: { reportBonus: 5 },
  },
  fraude: {
    passeren: { hid: 25, miss: 'Frauduleuze akte gepasseerd', heavy: true },
    passeren_melden: { hid: 12, miss: 'Akte gepasseerd ondanks eigen melding' },
    weigeren: { hid: 10, miss: 'Fraude geweigerd maar niet gemeld' },
    weigeren_melden: { reportBonus: 5 },
  },
};

export const IDEAL = { eerlijk: 'passeren', formeel: 'weigeren', melden: 'passeren_melden', fraude: 'weigeren_melden' };

// Is deze beslissing (met deze vastgelegde punten) de juiste voor deze zaak?
export function isCorrect(c, decision, flags = []) {
  if (decision === IDEAL[c.kind]) return c.kind === 'eerlijk' || c.kind === 'formeel' || flags.length > 0;
  return c.kind === 'melden' && c.okRefuse && decision === 'weigeren_melden' && flags.length > 0;
}

export function newGame() {
  return {
    day: 1, idx: 0, phase: 'morning',
    kas: START_KAS, druk: 0,
    decisions: {},          // caseId -> { decision, flags: [] }
    misses: [],             // { caseId, day, text, pts, heavy }
    bribes: 0,
    dayLog: [],             // regels voor de dagafrekening van vandaag
    mail: [],               // post voor de dagafrekening van vandaag
    later: [],              // krantenkoppen voor een latere ochtend
    seen: [],               // ids van scènes/zaken die al voorbij kwamen
    ending: null,
  };
}

export function matches(decision, want) {
  if (!decision) return false;
  switch (want) {
    case 'pass': return decision.startsWith('passeren');
    case 'refuse': return decision.startsWith('weigeren');
    case 'report': return decision.endsWith('_melden');
    case 'quiet': return !decision.endsWith('_melden');
    default: return decision === want;
  }
}

export function conditionMet(state, when) {
  if (!when) return true;
  return when.some((alt) => Object.entries(alt).every(([cid, want]) => matches(state.decisions[cid]?.decision, want)));
}

export function queueForDay(state, day = state.day) {
  return DAYS[day].order.filter((cid) => conditionMet(state, CASES[cid].when));
}

export function currentCaseId(state) {
  return queueForDay(state)[state.idx] ?? null;
}

export function rulesForDay(day) {
  return RULES.filter((r) => r.day <= day);
}

// Documenten op het bureau: die van de zaak plus de circulaire en (vanaf donderdag) het register.
export function deskDocs(caseId, day) {
  const c = CASES[caseId];
  const docs = [...(c.docs || [])];
  docs.push({ id: 'circ', type: 'circulaire', title: 'Circulaire van de Orde',
    fields: rulesForDay(day).map((r) => [r.id, `Regel ${r.id.slice(1)}`, r.text]) });
  if (day >= MISSING_REGISTER.day) docs.push({ id: 'reg', type: 'register', title: 'Register Vermiste Documenten', fields: MISSING_REGISTER.fields });
  return docs;
}

export function fieldValue(caseId, day, ref) {
  if (ref === 'klant') return CASES[caseId].portrait;
  const [docId, key] = ref.split('.');
  const doc = deskDocs(caseId, day).find((d) => d.id === docId);
  const f = doc?.fields.find((x) => x[0] === key);
  return f ? f[2] : undefined;
}

// Controleert of twee aangeklikte velden samen een afwijking vormen. Volgorde maakt niet uit.
export function checkPair(caseId, refA, refB) {
  const c = CASES[caseId];
  const same = ([a, b]) => (a === refA && b === refB) || (a === refB && b === refA);
  return (c.anomalies || []).find((an) => anomalyPairs(an).some(same)) || null;
}

export function anomalyPairs(an) {
  return [[an.a, an.b], ...(an.alt || [])];
}

export function availableQuestions(caseId, found) {
  return (CASES[caseId].questions || []).filter((q) => !q.unlock || found.includes(q.unlock));
}

export function outcomeText(map, decision) {
  if (!map) return null;
  const fallback = decision.startsWith('passeren') ? map.pass : map.refuse;
  const exact = { passeren: map.pass, passeren_melden: map.passReport, weigeren: map.refuse, weigeren_melden: map.refuseReport }[decision];
  return exact || fallback || null;
}

const LETTERS = {
  klacht: (c) => `Klacht ingediend bij de Tuchtkamer door ${c.name}: weigering zonder geldige reden (ministerieplicht). +8 toezichtsdruk.`,
  overmelding: (c) => `Het LOT vraagt zich af waarom u de akte van ${c.name} heeft gemeld. Ongegronde meldingen kosten iedereen tijd. +6 toezichtsdruk.`,
  formeel: (c) => `Brief van het BNT: akte van ${c.name} gepasseerd met ongeldige legitimatie. Formele fout, +5 toezichtsdruk.`,
};

// Verwerkt een beslissing. flags = ids van gevonden afwijkingen + teksten van observaties.
export function decide(state, caseId, decision, flags = []) {
  const c = CASES[caseId];
  const gegrond = c.kind === 'melden' && c.okRefuse && decision === 'weigeren_melden' && flags.length > 0;
  const eff = RULESET[c.kind][gegrond ? 'weigeren_melden_gegrond' : decision];
  state.decisions[caseId] = { decision, flags: [...flags] };
  if (decision.startsWith('passeren')) {
    state.kas += c.fee;
    state.dayLog.push({ label: `Honorarium ${c.name}`, amount: c.fee });
    if (c.bribe) {
      state.kas += c.bribe;
      state.bribes += c.bribe;
      state.dayLog.push({ label: `"Spoedtoeslag" ${c.name}`, amount: c.bribe });
    }
  }
  if (eff.vis) state.druk += eff.vis;
  if (eff.letter) state.mail.push(LETTERS[eff.letter](c));
  if (eff.hid) state.misses.push({ caseId, day: state.day, text: `${eff.miss} (${c.name})`, pts: eff.hid, heavy: !!eff.heavy });
  if (eff.reportBonus) {
    if (flags.length) {
      state.druk = Math.max(0, state.druk - eff.reportBonus);
      state.mail.push(`Het BNT noteert een zorgvuldige melding in het dossier ${c.name}. −${eff.reportBonus} toezichtsdruk.`);
    } else {
      state.druk += 3;
      state.mail.push(`Het LOT meldt dat uw melding over ${c.name} onvoldoende onderbouwd is: er is geen afwijking vastgelegd. +3 toezichtsdruk.`);
    }
  }
  const out = outcomeText(c.out, decision);
  if (out) state.mail.push(out);
  const later = c.later && (decision.startsWith('passeren') ? c.later.pass : c.later.refuse);
  if (later) state.later.push(later);
  state.seen.push(caseId);
  state.idx += 1;
  return { reaction: outcomeText(c.react, decision) };
}

export function skipScene(state, caseId) {
  state.seen.push(caseId);
  state.idx += 1;
}

export function morningNews(state) {
  const day = state.day;
  return [DAYS[day].headline, ...state.later.filter((l) => l.day === day).map((l) => l.text)];
}

// Dagafsluiting: kosten afboeken. Geeft het overzicht terug en wist het daglog.
export function endDay(state) {
  const costs = [{ label: 'Huur kantoor', amount: -HUUR }, { label: 'Salaris Ingrid', amount: -SALARIS }];
  if (state.day === LAST_DAY) costs.push({ label: 'Aflossing praktijklening', amount: -AFLOSSING });
  for (const k of costs) state.kas += k.amount;
  const summary = { day: state.day, income: state.dayLog, costs, mail: state.mail, kas: state.kas, druk: state.druk };
  state.dayLog = [];
  state.mail = [];
  return summary;
}

export function inspection(state) {
  const found = state.misses.map((m) => ({ ...m, pts: m.pts * 2 }));
  const extra = found.reduce((s, m) => s + m.pts, 0);
  state.druk += extra;
  return { found, extra, druk: state.druk, heavy: found.filter((m) => m.heavy).length };
}

export function lineResults(state) {
  const res = {};
  for (const line of Object.keys(LINES)) {
    const cases = Object.entries(CASES).filter(([cid, c]) => c.line === line && !c.scene && (c.kind === 'fraude' || c.kind === 'melden') && state.decisions[cid]);
    res[line] = cases.length > 0 && cases.every(([cid, c]) => isCorrect(c, state.decisions[cid].decision, state.decisions[cid].flags));
  }
  return res;
}

// Wordt aangeroepen na de dagafsluiting (en op vrijdag na de inspectie).
export function checkEnding(state, { afterInspection = false, heavy = 0 } = {}) {
  state.findings = state.misses.length;
  if (state.druk >= 100 || heavy >= 2) return (state.ending = 'ontzet');
  if (state.kas < 0) return (state.ending = 'failliet');
  if (!afterInspection) return null;
  const lines = lineResults(state);
  // Wie alles meldt, wordt door het LOT niet meer serieus genomen.
  if (Object.values(lines).every(Boolean) && state.druk < 30) return (state.ending = 'klokkenluider');
  if (state.bribes >= 3000) return (state.ending = 'welvarend');
  return (state.ending = 'keurig');
}

export function nextDay(state) {
  state.day += 1;
  state.idx = 0;
  state.phase = 'morning';
}

export const ENDINGS = {
  ontzet: { title: 'Uitspraak van de Tuchtkamer', verdict: 'Ontzetting uit het ambt',
    text: 'De Tuchtkamer acht bewezen dat de notaris de zorgplicht en de meldplicht ernstig heeft geschonden. De notaris wordt met onmiddellijke ingang uit het ambt ontzet. Het protocol wordt overgedragen aan notaris Hoekstra te Dorpdam.' },
  failliet: { title: 'Vonnis van de rechtbank', verdict: 'Faillissement',
    text: 'De rechtbank verklaart de notarispraktijk te Zandhoven in staat van faillissement. Ingrid heeft een baan gevonden bij notaris Hoekstra. Het naambord aan de Markt wordt geveild; bieding vanaf € 15.' },
  keurig: { title: 'Brief van het Bureau Notarieel Toezicht', verdict: 'Overleefd',
    text: 'Bij de inspectie zijn geen gebreken aangetroffen. De praktijk heeft de eerste week overleefd. De kas is mager, de dossiers zijn op orde. Maandag staat er weer een rij voor de deur.',
    textFindings: 'Bij de inspectie zijn gebreken aangetroffen. Het BNT legt een schriftelijke waarschuwing op en komt over drie maanden terug. De praktijk heeft de eerste week overleefd, maar niet ongeschonden.' },
  welvarend: { title: 'Kasboek, vrijdagavond', verdict: 'Welvarend, met een schaduw',
    text: 'Het BNT vond niets. De praktijk draait uitstekend. In de la ligt een stapel enveloppen. Maandagochtend om negen uur gaat de telefoon. Het is Ronnie.',
    textFindings: 'Het BNT heeft een berisping opgelegd en de praktijk onder verscherpt toezicht gesteld. Toch klopt het kasboek als nooit tevoren: in de la ligt een stapel enveloppen. Maandagochtend om negen uur gaat de telefoon. Het is Ronnie.' },
  klokkenluider: { title: 'Zandhovens Dagblad, zaterdageditie', verdict: 'Fraudenetwerk opgerold',
    text: 'Politie en LOT hebben deze week een netwerk opgerold dat panden witwaste, katvangers inzette en ouderen bestal. "Dankzij zorgvuldige meldingen van een notaris", aldus de officier van justitie. Welke notaris? Dat mag niemand weten. U weet het wel.' },
};
