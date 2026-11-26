// node tests/run.mjs  — datavalidatie en eindes-scripts. Geen dependencies.
import { CASES, DAYS, PORTRAITS } from '../js/data.js';
import * as E from '../js/engine.js';

let fails = 0;
const ok = (cond, msg) => { if (!cond) { fails++; console.log('FAIL', msg); } };

// ---------- 1. Data ----------
const KINDS = Object.keys(E.IDEAL);
for (const day of [1, 2, 3, 4, 5]) {
  for (const cid of DAYS[day].order) {
    const c = CASES[cid];
    ok(c, `dag ${day}: onbekende zaak ${cid}`);
    if (!c) continue;
    ok(c.day === day, `${cid}: day ${c.day} staat in volgorde van dag ${day}`);
    ok(PORTRAITS[c.portrait], `${cid}: onbekend portret ${c.portrait}`);
    for (const alt of c.when || []) for (const ref of Object.keys(alt)) ok(CASES[ref], `${cid}: when verwijst naar onbekende ${ref}`);
    if (c.scene) { ok(c.lines?.length, `${cid}: scène zonder tekst`); continue; }
    ok(KINDS.includes(c.kind), `${cid}: onbekend kind ${c.kind}`);
    ok(c.fee > 0, `${cid}: geen honorarium`);
    ok(c.react?.pass && c.react?.refuse, `${cid}: react pass/refuse ontbreekt`);
    ok(c.out?.pass && c.out?.refuse, `${cid}: out pass/refuse ontbreekt`);
    ok(c.docs.some((d) => d.id === 'akte'), `${cid}: geen akte`);
    const ids = c.docs.map((d) => d.id);
    ok(new Set(ids).size === ids.length, `${cid}: dubbele document-id`);
    for (const d of c.docs) {
      if (d.text) for (const m of d.text.matchAll(/\{(\w+)\}/g)) ok(d.fields.some((f) => f[0] === m[1]), `${cid}.${d.id}: {${m[1]}} zonder veld`);
    }
    // Elke afwijking verwijst naar twee bestaande velden die echt verschillen.
    for (const an of c.anomalies || []) for (const [a, b] of E.anomalyPairs(an)) {
      const va = E.fieldValue(cid, day, a), vb = E.fieldValue(cid, day, b);
      const resolve = (v) => (typeof v === 'string' && PORTRAITS[v] ? PORTRAITS[v] : v);
      ok(va !== undefined, `${cid}/${an.id}: veld ${a} bestaat niet`);
      ok(vb !== undefined, `${cid}/${an.id}: veld ${b} bestaat niet`);
      ok(JSON.stringify(resolve(va)) !== JSON.stringify(resolve(vb)), `${cid}/${an.id}: ${a} en ${b} zijn gelijk`);
    }
    for (const q of c.questions || []) if (q.unlock) ok((c.anomalies || []).some((a) => a.id === q.unlock), `${cid}: vraag ontgrendelt onbekende ${q.unlock}`);
    // Een fraude- of meldzaak moet op te sporen zijn.
    if (c.kind === 'fraude' || c.kind === 'melden') ok((c.anomalies || []).some((a) => !a.harmless), `${cid}: ${c.kind} zonder echte afwijking`);
  }
}

// ---------- 2. Eindes ----------
function allFlags(cid) {
  const c = CASES[cid];
  return [...(c.anomalies || []).filter((a) => !a.harmless).map((a) => a.id), ...(c.questions || []).filter((q) => q.flag).map((q) => q.flag)];
}

function play(policy) {
  const s = E.newGame();
  const trail = [];
  while (true) {
    let cid;
    while ((cid = E.currentCaseId(s))) {
      const c = CASES[cid];
      if (c.scene) { E.skipScene(s, cid); trail.push(`${cid}(scène)`); continue; }
      const d = policy(cid, c) || E.IDEAL[c.kind];
      E.decide(s, cid, d, allFlags(cid));
      trail.push(`${cid}:${d}`);
    }
    const day = s.day;
    E.endDay(s);
    if (day === E.LAST_DAY) {
      const insp = E.inspection(s);
      E.checkEnding(s, { afterInspection: true, heavy: insp.heavy });
    } else E.checkEnding(s);
    if (s.ending) return { s, trail };
    E.nextDay(s);
  }
}

const honest = (c) => c.kind === 'eerlijk';
const scripts = {
  klokkenluider: () => null,
  keurig: (cid) => (cid === 'henk' ? 'weigeren' : null),
  welvarend: (cid) => (cid === 'ronnie2' ? 'passeren' : null),
  ontzet: () => 'passeren',
  failliet: (cid, c) => (['jansen', 'kiki', 'bakker', 'ahmed'].includes(cid) ? 'weigeren' : null),
};
for (const [want, pol] of Object.entries(scripts)) {
  const { s, trail } = play(pol);
  console.log(`${want.padEnd(14)} -> ${String(s.ending).padEnd(14)} dag ${s.day}, kas € ${s.kas}, druk ${s.druk}, toeslagen € ${s.bribes}`);
  ok(s.ending === want, `script ${want} eindigt in ${s.ending}\n   ${trail.join(' ')}`);
}

// Elke zaak en scène moet in minstens één script voorbijkomen.
const seenAll = new Set();
for (const pol of [...Object.values(scripts), () => 'weigeren', (cid) => (cid === 'ronnie1' ? 'weigeren' : cid === 'tine1' ? 'passeren' : cid === 'devries1' ? 'passeren' : null), (cid) => (cid === 'ronnie2' ? 'passeren' : cid === 'ronnie3' ? 'weigeren_melden' : null)]) {
  play(pol).s.seen.forEach((x) => seenAll.add(x));
}
for (const cid of Object.keys(CASES)) ok(seenAll.has(cid), `zaak/scène ${cid} komt in geen enkel script voor`);

// ---------- 3. Regressies uit de evaluatie van 26-11 ----------
// Equivalente tegenstrijdigheden tellen ook.
ok(E.checkPair('devries1', 'intake.aanhef', 'akte.aanhef')?.id === 'geslacht', 'devries1: aanhef intake vs akte niet herkend');
ok(E.checkPair('devries1', 'intake.geboren', 'akte.geboren')?.id === 'geboren', 'devries1: geboren intake vs akte niet herkend');
ok(E.checkPair('ronnie1', 'betaal.bedrag', 'circ.r2')?.id === 'cash', 'ronnie1: bedrag vs regel 2 niet herkend');
ok(E.checkPair('jansen', 'intake.naam', 'akte.naam') === null, 'jansen: niet-afwijking herkend als afwijking');
// Ronnie1 weigeren + melden met afwijking: geen klacht en de lijn telt als correct gemeld.
{
  const { s } = play((cid) => (cid === 'ronnie1' ? 'weigeren_melden' : null));
  ok(s.ending === 'klokkenluider', `ronnie1 weigeren+melden: einde ${s.ending}, verwacht klokkenluider`);
}
// Ronnie brengt geen kerstpakket als je hem donderdag weigerde.
{
  const { trail } = play((cid) => (cid === 'ronnie2' ? 'passeren' : cid === 'ronnie3' ? 'weigeren' : null));
  ok(!trail.includes('ronnie4_blij(scène)'), 'ronnie4_blij verschijnt na weigering van ronnie3');
}
// Alles melden is geen gratis klokkenluider.
{
  const { s } = play((cid, c) => (c.kind === 'eerlijk' ? 'passeren_melden' : null));
  ok(s.ending !== 'klokkenluider' && s.druk >= 30, `alles melden levert nog klokkenluider op (druk ${s.druk})`);
}
// Weigeren zonder vastgelegde afwijking kost iets.
{
  const s = E.newGame();
  E.decide(s, 'devries1', 'weigeren_melden', []);
  ok(s.druk > 0, 'melding zonder afwijking is gratis');
}

console.log(fails ? `\n${fails} fout(en)` : '\nAlle tests geslaagd');
process.exit(fails ? 1 : 0);
