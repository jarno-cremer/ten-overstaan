// Alle inhoud van het spel. De engine leest dit alleen; nieuwe klanten of dagen voeg je hier toe.

// ---------- Portretten ----------
const P = (o) => ({ sex: 'm', age: 'mid', hair: 'kort', hc: '#4a3b2c', skin: '#e9c7a5', glasses: 0, shades: 0, beard: 'geen', coat: '#5b6470', tie: null, ...o });

export const PORTRAITS = {
  jansen:   P({ sex: 'v', hair: 'lang', hc: '#b8873f', coat: '#7d5a6a' }),
  bos:      P({ age: 'oud', hair: 'kaal', hc: '#bbb', glasses: 1, coat: '#6b6a4a', beard: 'snor' }),
  nepvries: P({ hair: 'pet', hc: '#2d2a26', beard: 'stoppel', coat: '#3f4a3c' }),
  sjoukjeFoto: P({ sex: 'v', age: 'oud', hair: 'knot', hc: '#cfcfcf', glasses: 1, coat: '#6f7d8c' }),
  ronnie:   P({ hair: 'kort', hc: '#1d1d1d', shades: 1, coat: '#2b2b33', tie: '#a3262a', skin: '#e2b48c' }),
  tine:     P({ sex: 'v', age: 'oud', hair: 'krul', hc: '#e4e4e4', glasses: 1, coat: '#8a6f8f' }),
  marco:    P({ age: 'jong', hair: 'kort', hc: '#6b4a2a', coat: '#34506b', beard: 'stoppel' }),
  noor:     P({ sex: 'v', age: 'jong', hair: 'knot', hc: '#c0703a', coat: '#3f6b6b' }),
  vandijk:  P({ age: 'jong', hair: 'krul', hc: '#2a1d14', skin: '#c99872', coat: '#a4643a' }),
  yildiz:   P({ sex: 'v', hair: 'lang', hc: '#1f1712', skin: '#d6a77f', coat: '#4c6b5a' }),
  henk:     P({ age: 'oud', hair: 'kaal', hc: '#ddd', coat: '#7a6d58', beard: 'geen', glasses: 1 }),
  hendriks: P({ hair: 'pet', hc: '#7a5a35', skin: '#dba882', coat: '#4f6a3a', beard: 'baard' }),
  kiki:     P({ sex: 'v', age: 'jong', hair: 'lang', hc: '#e8c27a', coat: '#d77fa1', shades: 1 }),
  bakker:   P({ sex: 'v', hair: 'kort', hc: '#8a5a3c', coat: '#5a6b8a' }),
  ahmed:    P({ age: 'jong', hair: 'krul', hc: '#15110e', skin: '#b98962', coat: '#58607a' }),
  sjoukje:  P({ sex: 'v', age: 'oud', hair: 'knot', hc: '#cfcfcf', glasses: 1, coat: '#6f7d8c' }),
  duiven:   P({ age: 'oud', hair: 'pet', hc: '#999', coat: '#6a5a3a', beard: 'snor' }),
  lammers:  P({ sex: 'v', hair: 'knot', hc: '#5a3a2a', coat: '#7a4a4a' }),
  recherche: P({ hair: 'kort', hc: '#5a5a5a', coat: '#444b55', tie: '#2f3f5f' }),
  dennis:   P({ age: 'jong', hair: 'kort', hc: '#1a1a1a', coat: '#1f1f22', beard: 'stoppel' }),
  ingrid:   P({ sex: 'v', hair: 'knot', hc: '#a0522d', glasses: 1, coat: '#6b7a6b' }),
};

// ---------- Kalender en regels ----------
export const DAYS = [
  null,
  { name: 'Maandag', date: 'maandag 7 december 2026', short: '07-12-2026',
    headline: 'Nieuwe notaris opent praktijk aan de Markt: "Ik heb er zin in"',
    order: ['jansen', 'bos', 'devries1'] },
  { name: 'Dinsdag', date: 'dinsdag 8 december 2026', short: '08-12-2026',
    headline: 'Huizenprijzen Zandhoven stijgen opnieuw; makelaars spreken van "gezonde markt"',
    order: ['ronnie1', 'vandijk', 'tine1', 'yildiz1'] },
  { name: 'Woensdag', date: 'woensdag 9 december 2026', short: '09-12-2026',
    headline: 'Raad wil onderzoek naar leegstaande panden in de binnenstad',
    order: ['ronnie2', 'ronnie2_weg', 'henk', 'hendriks', 'kiki', 'bakker'] },
  { name: 'Donderdag', date: 'donderdag 10 december 2026', short: '10-12-2026',
    headline: 'Duivenvereniging De Vrolijke Wiek viert eeuwfeest met nieuwe statuten',
    order: ['recherche', 'ronnie3', 'tine2', 'tine2_taart', 'devries2', 'yildiz2', 'ahmed'] },
  { name: 'Vrijdag', date: 'vrijdag 11 december 2026', short: '11-12-2026',
    headline: 'Bureau Notarieel Toezicht kondigt steekproeven aan in de regio',
    order: ['ronnie4_boos', 'ronnie4_blij', 'sjoukje_zwaar', 'sjoukje', 'duiven', 'lammers'] },
];

export const RULES = [
  { id: 'r1', day: 1, text: 'Gegevens van iedere verschijnende partij moeten op legitimatie, intakeformulier en akte overeenkomen. Legitimatie is geldig op de dag van passeren.' },
  { id: 'r2', day: 2, text: 'Contante betalingen boven € 10.000 zijn een ongebruikelijke transactie. Melden bij het LOT is verplicht; de cliënt wordt daarover niet ingelicht.' },
  { id: 'r3', day: 3, text: 'Doorverkoop van een pand binnen zes maanden tegen een veel hogere prijs is een signaal van witwassen.' },
  { id: 'r4', day: 3, text: 'Een BV vestigt zich op een bezoekadres; een postbus is geen vestigingsadres. Wie het kapitaal stort, hoort als belanghebbende in het RUB.' },
  { id: 'r5', day: 4, text: 'Controleer bij twijfel het documentnummer in het Register Vermiste Documenten.' },
];

export const MISSING_REGISTER = {
  day: 4,
  fields: [
    ['n1', 'Paspoort', 'NW4410B8 (gestolen, Dorpdam)'],
    ['n2', 'Rijbewijs', '5501 3398 22 (verloren)'],
    ['n3', 'Paspoort', 'NW9902X5 (blanco gestolen, gemeentehuis Noordwaard)'],
    ['n4', 'ID-kaart', 'IK77AB01 (verloren)'],
  ],
};

// ---------- Documenten ----------
const id = (o) => ({ id: 'id', type: 'paspoort', title: o.kaart ? 'Identiteitskaart' : 'Paspoort',
  fields: [['foto', 'Foto', o.foto], ['naam', 'Naam', o.naam], ['voornamen', 'Voornamen', o.voornamen],
    ['geslacht', 'Geslacht', o.geslacht], ['geboren', 'Geboren', o.geboren], ['nummer', 'Documentnr.', o.nummer],
    ['geldig', 'Geldig tot', o.geldig]] });
const id2 = (o) => ({ ...id(o), id: 'id2', title: (o.kaart ? 'Identiteitskaart' : 'Paspoort') + ' (2)' });

const intake = (o) => ({ id: 'intake', type: 'intake', title: 'Intakeformulier',
  fields: [['aanhef', 'Aanhef', o.aanhef], ['naam', 'Naam', o.naam], ['geboren', 'Geboortedatum', o.geboren],
    ['adres', 'Adres', o.adres], ['wens', 'Waarvoor komt u?', o.wens]] });

const grondboek = (o) => ({ id: 'grond', type: 'grondboek', title: 'Uittreksel Grondboek',
  fields: [['perceel', 'Perceel', o.perceel], ['eigenaar', 'Eigenaar', o.eigenaar], ['sinds', 'Eigenaar sinds', o.sinds],
    ['koopsom', 'Laatste koopsom', o.koopsom], ['hypotheek', 'Hypotheek', o.hypotheek || 'geen']] });

const betaal = (o) => ({ id: 'betaal', type: 'betaal', title: 'Betaalbewijs',
  fields: [['van', 'Betaald door', o.van], ['bedrag', 'Bedrag', o.bedrag], ['wijze', 'Wijze', o.wijze], ['oms', 'Omschrijving', o.oms]] });

const akte = (title, text, fields) => ({ id: 'akte', type: 'akte', title, text, fields });

// ---------- Klanten en scènes ----------
// kind: eerlijk | formeel (papieren niet in orde, wel te goeder trouw) | melden (rechtmatig maar meldplichtig) | fraude
// out: post aan het eind van de dag. react: wat de klant meteen zegt. Sleutels: pass, passReport, refuse, refuseReport.
export const CASES = {
  // ======== MAANDAG ========
  jansen: {
    day: 1, kind: 'eerlijk', fee: 900, name: 'Mevrouw L. Jansen', portrait: 'jansen',
    tutorial: true,
    intro: ['Goedemorgen! Ik kom voor de levering van mijn nieuwe huis. Mijn eerste huis, eigenlijk.', 'Ik heb nog nooit een notaris gesproken. Moet ik ergens op letten?'],
    docs: [
      intake({ aanhef: 'mevrouw', naam: 'L. Jansen', geboren: '02-06-1994', adres: 'Molenweg 3, Zandhoven', wens: 'Levering woning Lindelaan 14' }),
      id({ foto: PORTRAITS.jansen, naam: 'Jansen', voornamen: 'Lotte', geslacht: 'V', geboren: '02-06-1994', nummer: 'NW1182C4', geldig: '14-02-2031' }),
      akte('Akte van levering', 'Heden, {datum}, verscheen voor mij, notaris te Zandhoven: {aanhef} {naam}, geboren {geboren}, hierna: de koper. Verkoper levert aan koper de woning {object} voor een koopsom van {koopsom}, welke koopsom is voldaan.',
        [['datum', 'Datum', '7 december 2026'], ['aanhef', 'Aanhef', 'mevrouw'], ['naam', 'Naam', 'Lotte Jansen'], ['geboren', 'Geboren', '02-06-1994'], ['object', 'Object', 'Lindelaan 14 te Zandhoven'], ['koopsom', 'Koopsom', '€ 312.000']]),
    ],
    anomalies: [],
    questions: [
      { q: 'Heeft u de koopsom via de bank betaald?', a: 'Ja, alles via de hypotheek. Mijn vader wilde contant betalen, maar dat heb ik hem uit zijn hoofd gepraat.' },
    ],
    react: { pass: 'Dat was het? Ik had iets plechtigers verwacht. Maar: dank u wel!', refuse: 'Maar... alles klopte toch? Mijn verhuiswagen staat al buiten.' },
    out: { pass: 'Lotte Jansen stuurt een kaartje: "Dank voor de rustige uitleg. Het huis is prachtig."', refuse: 'Lotte Jansen dient een klacht in bij de Tuchtkamer: geweigerd zonder opgaaf van reden.' },
  },

  bos: {
    day: 1, kind: 'eerlijk', fee: 350, name: 'De heer G. Bos', portrait: 'bos',
    intro: ['Ik wil mijn testament laten maken. Alles gaat naar Minoes.', 'Minoes is mijn kat. Mijn neven hebben me in twaalf jaar niet opgezocht. Minoes wel. Elke dag.'],
    docs: [
      intake({ aanhef: 'de heer', naam: 'G. Bos', geboren: '19-09-1941', adres: 'Kerkpad 2, Zandhoven', wens: 'Testament (kat)' }),
      id({ foto: PORTRAITS.bos, naam: 'Bos', voornamen: 'Gerrit', geslacht: 'M', geboren: '19-09-1941', nummer: 'NW3301A9', geldig: '30-08-2029' }),
      akte('Testament', 'Heden, {datum}, verscheen voor mij {aanhef} {naam}, geboren {geboren}. Comparant benoemt tot enig erfgenaam {erfgenaam}, onder de last om zijn kat Minoes levenslang te verzorgen.',
        [['datum', 'Datum', '7 december 2026'], ['aanhef', 'Aanhef', 'de heer'], ['naam', 'Naam', 'Gerrit Bos'], ['geboren', 'Geboren', '19-09-1941'], ['erfgenaam', 'Erfgenaam', 'Stichting Dierenasiel Zandhoven']]),
    ],
    anomalies: [],
    questions: [
      { q: 'Een kat kan helaas niet erven. Mag het asiel erven, met de last om voor Minoes te zorgen?', a: 'Dat had uw secretaresse ook al gezegd. Als Minoes maar haar zalm krijgt. Op vrijdag.' },
    ],
    react: { pass: 'Mooi. Dan kan ik rustig sterven. Niet vandaag, hoop ik.', refuse: 'Wat? Mag een mens niet eens meer voor zijn kat zorgen?' },
    out: { pass: 'Het dierenasiel bedankt u voor de nette regeling rond Minoes.', refuse: 'De heer Bos dient een klacht in. Zijn brief bevat een foto van Minoes.' },
  },

  devries1: {
    day: 1, kind: 'fraude', fee: 900, bribe: 1500, line: 'devries', name: '"S. de Vries"', portrait: 'nepvries',
    intro: ['Goedemiddag. Ik kom mijn appartement verkopen. Het moet vandaag, ik vertrek morgen naar Spanje.', 'Ik betaal graag € 1.500 extra voor de spoed. Contant, als u wilt.'],
    docs: [
      intake({ aanhef: 'de heer', naam: 'S. de Vries', geboren: '15-03-1946', adres: 'Havenkade 9-C, Zandhoven', wens: 'Verkoop appartement, spoed' }),
      id({ foto: PORTRAITS.sjoukjeFoto, naam: 'de Vries', voornamen: 'S.', geslacht: 'V', geboren: '15-03-1946', nummer: 'NW7731K2', geldig: '01-04-2030' }),
      akte('Akte van levering', 'Heden, {datum}, verscheen voor mij: {aanhef} {naam}, geboren {geboren}, hierna: de verkoper. Verkoper levert het appartement {object} aan Kustvast BV voor een koopsom van {koopsom}.',
        [['datum', 'Datum', '7 december 2026'], ['aanhef', 'Aanhef', 'mevrouw'], ['naam', 'Naam', 'Sjoukje de Vries'], ['geboren', 'Geboren', '14-03-1946'], ['object', 'Object', 'Havenkade 9-C te Zandhoven'], ['koopsom', 'Koopsom', '€ 238.000']]),
    ],
    anomalies: [
      { id: 'foto', a: 'id.foto', b: 'klant', label: 'Pasfoto lijkt niet op de verschijnende persoon' },
      { id: 'geslacht', a: 'id.geslacht', b: 'intake.aanhef', alt: [['intake.aanhef', 'akte.aanhef']], label: 'Aanhef wisselt: paspoort V en akte "mevrouw", intake "de heer"' },
      { id: 'geboren', a: 'id.geboren', b: 'akte.geboren', alt: [['intake.geboren', 'akte.geboren']], label: 'Geboortedatum wijkt af van de akte' },
    ],
    questions: [
      { unlock: 'foto', q: 'De foto in uw paspoort lijkt niet op u.', a: 'Oude foto. Ik ben sindsdien... veranderd. Dat doen mensen.' },
      { unlock: 'geslacht', q: 'In uw paspoort staat geslacht V.', a: 'Typfout van de gemeente. Daar bellen ze nooit over terug, hè.' },
      { unlock: 'geboren', q: 'Uw geboortedatum in de akte is 14 maart, in uw paspoort 15 maart.', a: 'Dan klopt de akte niet. Zet er maar 15 neer. Wat maakt één dag nou uit?' },
    ],
    react: { pass: 'Fijn. Tot nooit meer.', refuse: 'Prima. Er zijn genoeg notarissen in dit land.' },
    out: { pass: 'Het appartement aan de Havenkade staat sinds vanmiddag op naam van Kustvast BV.', refuse: '"S. de Vries" heeft een boze voicemail ingesproken.', refuseReport: 'Het LOT bevestigt de ontvangst van uw melding over de verkoop Havenkade 9-C.' },
  },

  // ======== DINSDAG ========
  ronnie1: {
    day: 2, kind: 'melden', okRefuse: true, fee: 900, line: 'ronnie', name: 'De heer R. Brouwer', portrait: 'ronnie',
    intro: ['Ronnie Brouwer. Zakenman in onroerend goed. U bent nieuw, hè? Leuk kantoortje.', 'Ik koop het pand Kerkstraat 12. Veertigduizend aanbetaald, cash. Dat is toch geen probleem?'],
    docs: [
      intake({ aanhef: 'de heer', naam: 'R. Brouwer', geboren: '21-07-1979', adres: 'Villapark 1, Zandhoven', wens: 'Aankoop Kerkstraat 12' }),
      id({ foto: PORTRAITS.ronnie, naam: 'Brouwer', voornamen: 'Ronald', geslacht: 'M', geboren: '21-07-1979', nummer: 'NW5520P1', geldig: '11-11-2032' }),
      grondboek({ perceel: 'Kerkstraat 12, Zandhoven', eigenaar: 'Erven J. Pieters', sinds: '03-05-1988', koopsom: 'ƒ 210.000' }),
      betaal({ van: 'R. Brouwer', bedrag: '€ 40.000', wijze: 'Contant, op kantoor makelaar', oms: 'Aanbetaling Kerkstraat 12' }),
      akte('Akte van levering', 'Heden, {datum}, verschenen: de erven Pieters als verkoper en {aanhef} {naam}, geboren {geboren}, als koper. Verkoper levert het pand {object} voor {koopsom}, waarvan {aanbetaling} reeds is voldaan.',
        [['datum', 'Datum', '8 december 2026'], ['aanhef', 'Aanhef', 'de heer'], ['naam', 'Naam', 'Ronald Brouwer'], ['geboren', 'Geboren', '21-07-1979'], ['object', 'Object', 'Kerkstraat 12 te Zandhoven'], ['koopsom', 'Koopsom', '€ 450.000'], ['aanbetaling', 'Aanbetaling', '€ 40.000 contant']]),
    ],
    anomalies: [
      { id: 'cash', a: 'betaal.wijze', b: 'circ.r2', alt: [['betaal.bedrag', 'circ.r2'], ['akte.aanbetaling', 'circ.r2']], label: 'Contante aanbetaling boven € 10.000' },
    ],
    questions: [
      { unlock: 'cash', q: 'Waar komt die veertigduizend contant vandaan?', a: 'Uit mijn zaak. Ik heb een autowasstraat. Mensen betalen cash. Veel mensen. Heel veel auto\'s.' },
    ],
    react: { pass: 'Zie je wel. Wij gaan het goed vinden samen, notaris. Tot snel.', refuse: 'Jammer. Ik dacht dat u slimmer was dan die vorige notaris.' },
    out: { pass: 'Kerkstraat 12 staat op naam van R. Brouwer.', passReport: 'Kerkstraat 12 staat op naam van R. Brouwer. Het LOT bevestigt uw melding over de contante aanbetaling.', refuse: 'Ronnie Brouwer laat weten dat hij "voortaan naar Hoekstra in Dorpdam gaat".' },
  },

  vandijk: {
    day: 2, kind: 'eerlijk', fee: 400, name: 'Sem van Dijk en Noor Kok', portrait: 'vandijk',
    intro: ['We komen voor ons samenlevingscontract.', '...en Noor wil de airfryer. Die heb ík gekocht. Dat moet erin.'],
    docs: [
      intake({ aanhef: 'de heer', naam: 'S. van Dijk (en N. Kok)', geboren: '30-01-1998', adres: 'Esdoornstraat 21, Zandhoven', wens: 'Samenlevingscontract' }),
      id({ foto: PORTRAITS.vandijk, naam: 'van Dijk', voornamen: 'Sem', geslacht: 'M', geboren: '30-01-1998', nummer: 'IK20CD44', geldig: '05-05-2033', kaart: true }),
      id2({ foto: PORTRAITS.noor, naam: 'Kok', voornamen: 'Noor', geslacht: 'V', geboren: '14-08-1997', nummer: 'NW3375N9', geldig: '22-02-2030' }),
      akte('Samenlevingscontract', 'Heden, {datum}, verschenen {naam} en {naam2}, samenwonend te Zandhoven. Partijen regelen hun samenleving. Artikel 9: {airfryer}.',
        [['datum', 'Datum', '8 december 2026'], ['naam', 'Naam', 'Sem van Dijk'], ['naam2', 'Naam', 'Noor Kok'], ['airfryer', 'Artikel 9', 'de airfryer is gemeenschappelijk eigendom']]),
    ],
    anomalies: [],
    questions: [
      { q: 'Zal ik artikel 9 laten staan?', a: 'Noor zegt ja. Ik zeg... ja, oké. Maar ík bepaal wat erin gaat.' },
    ],
    react: { pass: 'Romantisch was het niet, maar het staat op papier.', refuse: 'Wat? Door die airfryer?' },
    out: { pass: 'Sem en Noor sturen een foto: zij met de airfryer, hij met een nieuwe.', refuse: 'Sem van Dijk en Noor Kok dienen samen een klacht in. Het eerste waar ze het over eens zijn.' },
  },

  tine1: {
    day: 2, kind: 'fraude', fee: 350, bribe: 700, line: 'tine', name: 'Mevrouw T. Ooms (met Marco)', portrait: 'tine', companion: 'marco',
    intro: ['Goedemiddag, notaris. Ik wil mijn testament wijzigen.', 'MARCO: Ik blijf er even bij hoor, Tine raakt snel in de war. Als het vandaag kan, betaal ik het dubbele.'],
    docs: [
      intake({ aanhef: 'mevrouw', naam: 'T. Ooms', geboren: '12-05-1938', adres: 'De Hooge Weide (zorgflat), Zandhoven', wens: 'Testament wijzigen' }),
      id({ foto: PORTRAITS.tine, naam: 'Ooms', voornamen: 'Tine', geslacht: 'V', geboren: '12-05-1938', nummer: 'NW2214T7', geldig: '20-10-2028' }),
      { id: 'arts', type: 'arts', title: 'Verklaring huisarts', fields: [
        ['patient', 'Patiënt', 'T. Ooms, geb. 12-05-1937'], ['oordeel', 'Oordeel', 'Volledig wilsbekwaam'], ['datum', 'Datum', 'zondag 6 december 2026'],
        ['spreekuur', 'Spreekuur praktijk', 'ma t/m vr, 8:00-17:00'], ['arts', 'Arts', 'dr. P. Visser']] },
      akte('Testament', 'Heden, {datum}, verscheen {aanhef} {naam}, geboren {geboren}. Comparante herroept haar eerdere testament ten gunste van haar kinderen en benoemt tot enig erfgenaam: {erfgenaam}.',
        [['datum', 'Datum', '8 december 2026'], ['aanhef', 'Aanhef', 'mevrouw'], ['naam', 'Naam', 'Tine Ooms'], ['geboren', 'Geboren', '12-05-1938'], ['erfgenaam', 'Erfgenaam', 'Marco de Bruijn (34)']]),
    ],
    anomalies: [
      { id: 'zondag', a: 'arts.datum', b: 'arts.spreekuur', alt: [['arts.datum', 'akte.datum']], label: 'Artsverklaring gedateerd op een zondag' },
      { id: 'jaartal', a: 'arts.patient', b: 'id.geboren', alt: [['arts.patient', 'intake.geboren'], ['arts.patient', 'akte.geboren']], label: 'Geboortejaar op artsverklaring klopt niet' },
    ],
    questions: [
      { flag: 'Marco wil niet weg; mevrouw Ooms praat hem na', q: 'Meneer, wilt u even in de wachtkamer plaatsnemen?', a: 'MARCO: Echt niet. Ze heeft mij nodig. Toch, Tine? TINE: ...Marco zegt dat mijn kinderen me in een tehuis willen stoppen.' },
      { q: 'Mevrouw Ooms, weet u welke dag het vandaag is?', a: 'Het is... zondag? Nee. Marco, welke dag is het?' },
      { unlock: 'zondag', q: 'Uw huisarts heeft op zondag een verklaring getekend?', a: 'MARCO: Dokter Visser is een vriend van me. Die doet dat even tussendoor.' },
    ],
    react: { pass: 'MARCO: Kijk eens aan. Kom Tine, we gaan taart eten. Van jouw pinpas.', refuse: 'MARCO: Dit gaat u nog spijten. TINE: Gaan we nu naar huis, Marco?' },
    out: { pass: 'Het nieuwe testament van mevrouw Ooms is ingeschreven in het Centraal Testamentenregister.', refuse: 'Marco de Bruijn laat via een advocaat weten dat hij "alle opties onderzoekt".', refuseReport: 'Het LOT en het Meldpunt Ouderenmishandeling bevestigen uw melding over mevrouw Ooms.' },
  },

  yildiz1: {
    day: 2, kind: 'formeel', fee: 900, line: 'yildiz', name: 'Mevrouw A. Yildiz', portrait: 'yildiz',
    intro: ['Goedemiddag! Ik verkoop het huis van mijn moeder. Ze woont nu bij mij in.', 'Alles is geregeld, de koper zit al te wachten in de wachtkamer.'],
    docs: [
      intake({ aanhef: 'mevrouw', naam: 'A. Yildiz', geboren: '09-11-1981', adres: 'Beukenlaan 7, Zandhoven', wens: 'Verkoop Wilgenhof 3 (volmacht moeder)' }),
      id({ foto: PORTRAITS.yildiz, naam: 'Yildiz', voornamen: 'Ayse', geslacht: 'V', geboren: '09-11-1981', nummer: 'NW6643Y2', geldig: '02-10-2025' }),
      grondboek({ perceel: 'Wilgenhof 3, Zandhoven', eigenaar: 'mevrouw F. Yildiz', sinds: '12-03-2004', koopsom: '€ 189.000' }),
      akte('Akte van levering', 'Heden, {datum}, verscheen {aanhef} {naam}, geboren {geboren}, handelend krachtens volmacht van mevrouw F. Yildiz. Verkoper levert {object} voor {koopsom}.',
        [['datum', 'Datum', '8 december 2026'], ['aanhef', 'Aanhef', 'mevrouw'], ['naam', 'Naam', 'Ayse Yildiz'], ['geboren', 'Geboren', '09-11-1981'], ['object', 'Object', 'Wilgenhof 3 te Zandhoven'], ['koopsom', 'Koopsom', '€ 345.000']]),
    ],
    anomalies: [
      { id: 'verlopen', a: 'id.geldig', b: 'akte.datum', alt: [['id.geldig', 'circ.r1']], label: 'Paspoort is verlopen' },
    ],
    questions: [
      { unlock: 'verlopen', q: 'Uw paspoort is verlopen sinds oktober vorig jaar.', a: 'O nee. Echt? Ik heb er een afspraak voor bij de gemeente, donderdagochtend. Kan het niet toch?' },
    ],
    react: { pass: 'Fijn, dan kan ik de koper vertellen dat het rond is!', refuse: 'Ach. U heeft gelijk natuurlijk. Ik kom donderdag terug met mijn nieuwe paspoort.' },
    out: { pass: 'De verkoop van Wilgenhof 3 is ingeschreven.', refuse: 'Mevrouw Yildiz heeft een nieuwe afspraak gemaakt voor donderdag.' },
  },

  // ======== WOENSDAG ========
  ronnie2: {
    day: 3, kind: 'fraude', fee: 900, bribe: 4000, line: 'ronnie', when: [{ ronnie1: 'pass' }], name: 'De heer R. Brouwer', portrait: 'ronnie',
    intro: ['Daar ben ik weer! Ik verkoop Kerkstraat 12 door. Aan een vriend. Nou ja, aan zijn BV.', 'Vierduizend extra voor u, voor de moeite. Gewoon omdat ik u mag.'],
    docs: [
      intake({ aanhef: 'de heer', naam: 'R. Brouwer', geboren: '21-07-1979', adres: 'Villapark 1, Zandhoven', wens: 'Verkoop Kerkstraat 12' }),
      id({ foto: PORTRAITS.ronnie, naam: 'Brouwer', voornamen: 'Ronald', geslacht: 'M', geboren: '21-07-1979', nummer: 'NW5520P1', geldig: '11-11-2032' }),
      grondboek({ perceel: 'Kerkstraat 12, Zandhoven', eigenaar: 'R. Brouwer', sinds: '08-12-2026', koopsom: '€ 450.000' }),
      { id: 'rub', type: 'rub', title: 'RUB-uittreksel koper', fields: [['bv', 'Rechtspersoon', 'Zuidas Prime Invest BV'], ['ubo', 'Uiteindelijk belanghebbende', 'R. Brouwer (100%)'], ['sinds', 'Ingeschreven', '01-12-2026']] },
      akte('Akte van levering', 'Heden, {datum}, verscheen {aanhef} {naam} als verkoper. Verkoper levert het pand {object} aan {koper} voor een koopsom van {koopsom}.',
        [['datum', 'Datum', '9 december 2026'], ['aanhef', 'Aanhef', 'de heer'], ['naam', 'Naam', 'Ronald Brouwer'], ['object', 'Object', 'Kerkstraat 12 te Zandhoven'], ['koper', 'Koper', 'Zuidas Prime Invest BV'], ['koopsom', 'Koopsom', '€ 1.150.000']]),
    ],
    anomalies: [
      { id: 'abc', a: 'akte.koopsom', b: 'grond.koopsom', alt: [['akte.koopsom', 'circ.r3'], ['grond.sinds', 'circ.r3'], ['grond.sinds', 'akte.datum']], label: 'Pand gisteren gekocht voor € 450.000, nu verkocht voor € 1.150.000' },
      { id: 'zelf', a: 'rub.ubo', b: 'akte.naam', alt: [['rub.ubo', 'grond.eigenaar'], ['rub.ubo', 'intake.naam']], label: 'Koper is een BV van de verkoper zelf' },
    ],
    questions: [
      { unlock: 'abc', q: 'Het pand is in één dag € 700.000 meer waard geworden?', a: 'De markt, notaris. Heeft u de krant niet gelezen? Gezonde markt.' },
      { unlock: 'zelf', q: 'U bent zelf eigenaar van de koper.', a: 'Dat is... efficiënt. Korte lijnen. Daar houden we van in Zandhoven.' },
    ],
    react: { pass: 'Ik wist het. U en ik, notaris. Dit wordt een mooie vriendschap.', refuse: 'U maakt een grote fout. Ik onthoud gezichten.' },
    out: { pass: 'Zuidas Prime Invest BV is eigenaar van Kerkstraat 12. Er ligt een envelop met € 4.000 in uw la.', refuse: 'Ronnie Brouwer is zonder groeten vertrokken.', refuseReport: 'Het LOT bevestigt uw melding over Kerkstraat 12 en vraagt om het dossier.' },
  },

  ronnie2_weg: {
    day: 3, scene: true, when: [{ ronnie1: 'refuse' }], name: 'Ingrid (secretaresse)', portrait: 'ingrid',
    lines: ['Ik hoorde van de secretaresse van notaris Hoekstra in Dorpdam dat Ronnie Brouwer daar gisteren Kerkstraat 12 heeft gekocht.', 'En vanochtend heeft hij het daar voor ruim een miljoen doorverkocht. Hoekstra heeft er een nieuwe auto van gekocht, zegt ze.'],
  },

  henk: {
    day: 3, kind: 'fraude', fee: 750, bribe: 1000, line: 'henk', name: 'De heer H. Veldkamp (met neef Dennis)', portrait: 'henk', companion: 'dennis',
    intro: ['Goedemorgen. Ik ben Henk. Ik ga... een BV oprichten.', '(leest van een briefje) Veldkamp Global Trading BV. Voor... internationale handel. In... goederen.', 'DENNIS: Ik leg er duizend euro bij voor de moeite, notaris. Contant.'],
    docs: [
      intake({ aanhef: 'de heer', naam: 'H. Veldkamp', geboren: '04-02-1955', adres: 'Eikenlaan 40, Zandhoven', wens: 'Oprichting BV' }),
      id({ foto: PORTRAITS.henk, naam: 'Veldkamp', voornamen: 'Hendrik', geslacht: 'M', geboren: '04-02-1955', nummer: 'NW8008H3', geldig: '17-06-2027' }),
      { id: 'hr', type: 'handelsregister', title: 'Handelsregister (concept)', fields: [['naam', 'Naam', 'Veldkamp Global Trading BV'], ['adres', 'Vestigingsadres', 'Postbus 112, Zandhoven'], ['bestuur', 'Bestuurder', 'H. Veldkamp'], ['activiteit', 'Activiteit', 'Groothandel, diverse goederen, wereldwijd']] },
      { id: 'rub', type: 'rub', title: 'RUB-opgave', fields: [['ubo', 'Uiteindelijk belanghebbende', 'H. Veldkamp (100%)']] },
      betaal({ van: 'D. Veldkamp', bedrag: '€ 50.000', wijze: 'Overboeking, rekening Curaçao', oms: 'Storting kapitaal Veldkamp Global Trading BV' }),
      akte('Akte van oprichting', 'Heden, {datum}, verscheen {aanhef} {naam}, die verklaarde een besloten vennootschap op te richten met de naam {bv}, gevestigd te Zandhoven, met als enig bestuurder de comparant.',
        [['datum', 'Datum', '9 december 2026'], ['aanhef', 'Aanhef', 'de heer'], ['naam', 'Naam', 'Hendrik Veldkamp'], ['bv', 'Naam BV', 'Veldkamp Global Trading BV']]),
    ],
    anomalies: [
      { id: 'postbus', a: 'hr.adres', b: 'circ.r4', alt: [['hr.adres', 'intake.adres']], label: 'Vestigingsadres is een postbus' },
      { id: 'storter', a: 'betaal.van', b: 'rub.ubo', alt: [['betaal.van', 'circ.r4'], ['betaal.van', 'hr.bestuur'], ['betaal.van', 'akte.naam']], label: 'Dennis stort het kapitaal, maar Henk staat als enige belanghebbende in het RUB' },
    ],
    questions: [
      { flag: 'Henk krijgt € 500 voor zijn handtekening (katvanger)', dismiss: true, q: 'Dennis, wilt u even in de wachtkamer wachten?', a: 'DENNIS: ...Prima. (deur dicht) HENK: Weet u, notaris, Dennis geeft me vijfhonderd euro als ik vandaag teken. Dat is veel geld voor een handtekening, hè?' },
      { q: 'Wat gaat uw BV precies doen, meneer Veldkamp?', a: '(kijkt op briefje) Internationale... handel. In goederen. (kijkt naar Dennis) Klopt dat?' },
      { unlock: 'storter', q: 'Waarom stort Dennis het kapitaal?', a: 'HENK: Dennis zegt dat dat beter is voor de belasting. Hij is slim, Dennis. Hij heeft ook een auto met een telefoon erin.' },
    ],
    react: { pass: 'HENK: Hè hè. Dat was het? Dan ga ik maar eens internationaal handelen.', refuse: 'DENNIS: Kom oom, we gaan. Er zijn notarissen genoeg.' },
    out: { pass: 'Veldkamp Global Trading BV is ingeschreven in het Handelsregister.', refuse: 'Henk Veldkamp en Dennis zijn vertrokken.', refuseReport: 'Het LOT bevestigt uw melding over een mogelijke katvanger-constructie.' },
    later: { pass: { day: 5, text: 'Gepensioneerde Henk V. (71) aansprakelijk voor miljoenenfraude met "handels-BV"' } },
  },

  hendriks: {
    day: 3, kind: 'melden', fee: 900, name: 'Boer J. Hendriks', portrait: 'hendriks',
    intro: ['Ik koop het weiland naast mijn boerderij. Dat wil ik al dertig jaar.', 'Twaalfduizend heb ik vast contant aanbetaald. Banken vertrouw ik niet. Dat zijn de echte boeven.'],
    docs: [
      intake({ aanhef: 'de heer', naam: 'J. Hendriks', geboren: '22-08-1962', adres: 'Hoeve De Lange Akker, Zandhoven', wens: 'Aankoop weiland' }),
      id({ foto: PORTRAITS.hendriks, naam: 'Hendriks', voornamen: 'Jan', geslacht: 'M', geboren: '22-08-1962', nummer: 'NW4471J8', geldig: '08-03-2030' }),
      grondboek({ perceel: 'Sectie B 1123 (weiland, 3 ha)', eigenaar: 'C. Smit', sinds: '15-06-1999', koopsom: '€ 61.000' }),
      betaal({ van: 'J. Hendriks', bedrag: '€ 12.000', wijze: 'Contant (in sigarenkist)', oms: 'Aanbetaling weiland' }),
      akte('Akte van levering', 'Heden, {datum}, verscheen {aanhef} {naam}, geboren {geboren}, als koper. De heer C. Smit levert {object} voor {koopsom}.',
        [['datum', 'Datum', '9 december 2026'], ['aanhef', 'Aanhef', 'de heer'], ['naam', 'Naam', 'Jan Hendriks'], ['geboren', 'Geboren', '22-08-1962'], ['object', 'Object', 'het weiland sectie B 1123'], ['koopsom', 'Koopsom', '€ 96.000']]),
    ],
    anomalies: [
      { id: 'cash', a: 'betaal.wijze', b: 'circ.r2', alt: [['betaal.bedrag', 'circ.r2']], label: 'Contante betaling boven € 10.000' },
    ],
    questions: [
      { unlock: 'cash', q: 'Waar komt dat contante geld vandaan?', a: 'Van de melk. Dertig jaar lang elke maand een beetje in de kist. Mijn vrouw weet er niks van. Nou ja, nu wel.' },
    ],
    react: { pass: 'Dertig jaar. Dertig jaar! Ik ga het mijn koeien vertellen.', refuse: 'Wat? Om een sigarenkist? Dan ga ik wel naar de stad.' },
    out: { pass: 'Het weiland is van boer Hendriks.', passReport: 'Het weiland is van boer Hendriks. Het LOT bevestigt de standaardmelding; er volgt geen onderzoek.', refuse: 'Boer Hendriks dient een klacht in. Handgeschreven, met een vlek van iets.' },
  },

  kiki: {
    day: 3, kind: 'eerlijk', fee: 900, name: 'Kiki Smulders (@kikiwoont)', portrait: 'kiki',
    intro: ['Hiii! Ik koop mijn eerste appartement en ik vlog alles. Mag ik filmen? Mijn volgers willen écht weten hoe een notaris werkt.', 'Je hoeft niks te doen hoor, gewoon jezelf zijn. Maar dan iets enthousiaster.'],
    docs: [
      intake({ aanhef: 'mevrouw', naam: 'K. Smulders', geboren: '11-04-2001', adres: 'Stationsweg 88, Zandhoven', wens: 'Aankoop appartement (en filmen?)' }),
      id({ foto: { ...PORTRAITS.kiki, shades: 0 }, naam: 'Smulders', voornamen: 'Kiki', geslacht: 'V', geboren: '11-04-2001', nummer: 'IK55KS12', geldig: '19-09-2034', kaart: true }),
      grondboek({ perceel: 'Marktstraat 5-B, Zandhoven', eigenaar: 'P. de Lange', sinds: '01-07-2015', koopsom: '€ 165.000', hypotheek: 'Rabo Zandhoven (wordt afgelost)' }),
      betaal({ van: 'Hypotheekbank Nederwaard', bedrag: '€ 279.000', wijze: 'Overboeking derdengeldrekening', oms: 'Hypotheek K. Smulders' }),
      akte('Akte van levering', 'Heden, {datum}, verscheen {aanhef} {naam}, geboren {geboren}, als koper. De heer P. de Lange levert {object} voor {koopsom}.',
        [['datum', 'Datum', '9 december 2026'], ['aanhef', 'Aanhef', 'mevrouw'], ['naam', 'Naam', 'Kiki Smulders'], ['geboren', 'Geboren', '11-04-2001'], ['object', 'Object', 'Marktstraat 5-B te Zandhoven'], ['koopsom', 'Koopsom', '€ 279.000']]),
    ],
    anomalies: [
      { id: 'foto', a: 'id.foto', b: 'klant', label: 'Zonnebril op, op de pasfoto niet', harmless: true },
    ],
    questions: [
      { q: 'Filmen mag niet tijdens het passeren. Wilt u ook uw zonnebril afzetten?', a: 'Oké oké, geen camera. (zet bril af) Zo beter? Het is gewoon een vibe, snap je.' },
    ],
    react: { pass: 'OMG ik heb een huis! Mag ik wel een selfie met de stempel?', refuse: 'Wacht wat? Dit zet ik in mijn stories.' },
    out: { pass: 'Kiki\'s vlog "MIJN EERSTE HUIS (notaris was best chill)" heeft 80.000 views.', refuse: 'Kiki\'s vlog "NOTARIS WEIGERT MIJ ZONDER REDEN??" heeft 200.000 views. En een klacht bij de Tuchtkamer.' },
  },

  bakker: {
    day: 3, kind: 'eerlijk', fee: 900, name: 'Mevrouw M. Bakker-de Groot', portrait: 'bakker',
    intro: ['Goedemiddag. Ik kom voor de levering van ons huis aan de Dorpsstraat.', 'Mijn man kon niet, hij heeft een volmacht getekend. Die heeft uw secretaresse al.'],
    docs: [
      intake({ aanhef: 'mevrouw', naam: 'M. Bakker', geboren: '27-12-1970', adres: 'Dorpsstraat 61, Zandhoven', wens: 'Verkoop woning (met volmacht echtgenoot)' }),
      id({ foto: PORTRAITS.bakker, naam: 'de Groot', voornamen: 'Marjan', geslacht: 'V', geboren: '27-12-1970', nummer: 'NW3390M5', geldig: '12-12-2028' }),
      grondboek({ perceel: 'Dorpsstraat 61, Zandhoven', eigenaar: 'P. Bakker en M. de Groot', sinds: '20-09-2001', koopsom: '€ 198.000', hypotheek: 'ING (wordt afgelost)' }),
      akte('Akte van levering', 'Heden, {datum}, verscheen {aanhef} {naam}, geboren {geboren}, mede handelend voor haar echtgenoot P. Bakker. Verkopers leveren {object} voor {koopsom}.',
        [['datum', 'Datum', '9 december 2026'], ['aanhef', 'Aanhef', 'mevrouw'], ['naam', 'Naam', 'Marjan Bakker-de Groot'], ['geboren', 'Geboren', '27-12-1970'], ['object', 'Object', 'Dorpsstraat 61 te Zandhoven'], ['koopsom', 'Koopsom', '€ 420.000']]),
    ],
    anomalies: [
      { id: 'naam', a: 'id.naam', b: 'intake.naam', label: 'Achternaam op paspoort wijkt af van intake', harmless: true },
    ],
    questions: [
      { unlock: 'naam', q: 'Op uw paspoort staat "de Groot", op het formulier "Bakker".', a: 'De Groot is mijn eigen naam, Bakker die van mijn man. Ik gebruik ze door elkaar. Dertig jaar getrouwd, ik weet zelf niet meer hoe ik heet.' },
    ],
    react: { pass: 'Dank u. Mijn man zal opgelucht zijn. Hij haat papierwerk.', refuse: 'Om mijn naam? Ik ben al dertig jaar getrouwd!' },
    out: { pass: 'De verkoop van Dorpsstraat 61 is ingeschreven.', refuse: 'Mevrouw Bakker-de Groot dient een klacht in, ondertekend met beide namen.' },
  },

  // ======== DONDERDAG ========
  recherche: {
    day: 4, scene: true, when: [{ ronnie2: 'report' }], name: 'Rechercheur Van Leeuwen', portrait: 'recherche',
    lines: ['Goedemorgen. Ik kom even langs, puur informatief. Het gaat over een zekere R. Brouwer.', 'U hoeft niets te zeggen. Ik mag niet zeggen waarom ik hier ben. U mag niet zeggen dat u iets gemeld heeft. Fijn dat we elkaar begrijpen.', 'Mocht hij langskomen: doe gewoon normaal. Prettige dag nog.'],
  },

  ronnie3: {
    day: 4, kind: 'fraude', fee: 1800, bribe: 5000, line: 'ronnie', when: [{ ronnie2: 'pass' }], name: 'De heer R. Brouwer', portrait: 'ronnie',
    intro: ['Partner! Ik heb er nog twee. Molenstraat 4 en 6. Zelfde constructie, zelfde vriend.', 'En dit keer vijfduizend. Omdat het zo soepel ging.'],
    docs: [
      intake({ aanhef: 'de heer', naam: 'R. Brouwer', geboren: '21-07-1979', adres: 'Villapark 1, Zandhoven', wens: 'Verkoop Molenstraat 4 en 6' }),
      id({ foto: PORTRAITS.ronnie, naam: 'Brouwer', voornamen: 'Ronald', geslacht: 'M', geboren: '21-07-1979', nummer: 'NW5520P1', geldig: '11-11-2032' }),
      grondboek({ perceel: 'Molenstraat 4 en 6, Zandhoven', eigenaar: 'R. Brouwer', sinds: '09-12-2026', koopsom: '€ 380.000 (samen)' }),
      akte('Akte van levering', 'Heden, {datum}, verscheen {aanhef} {naam} als verkoper. Verkoper levert {object} aan {koper} voor {koopsom}.',
        [['datum', 'Datum', '10 december 2026'], ['aanhef', 'Aanhef', 'de heer'], ['naam', 'Naam', 'Ronald Brouwer'], ['object', 'Object', 'Molenstraat 4 en 6 te Zandhoven'], ['koper', 'Koper', 'Zuidas Prime Invest BV'], ['koopsom', 'Koopsom', '€ 1.400.000']]),
    ],
    anomalies: [
      { id: 'abc', a: 'akte.koopsom', b: 'grond.koopsom', alt: [['akte.koopsom', 'circ.r3'], ['grond.sinds', 'circ.r3'], ['grond.sinds', 'akte.datum']], label: 'Panden gisteren gekocht voor € 380.000, nu € 1.400.000' },
    ],
    questions: [
      { unlock: 'abc', q: 'Weer een verdrievoudiging in één dag?', a: 'Zandhoven groeit, notaris. Ik ook.' },
    ],
    react: { pass: 'Zo mag ik het zien. Volgende week nog vijf.', refuse: 'Hé. Wat is dit nou? We hadden een afspraak, wij twee.' },
    out: { pass: 'Molenstraat 4 en 6 zijn van Zuidas Prime Invest BV. De la met enveloppen begint vol te raken.', refuse: 'Ronnie Brouwer vertrok met een klap van de deur.', refuseReport: 'Het LOT bevestigt uw melding over Molenstraat 4 en 6.' },
  },

  tine2: {
    day: 4, kind: 'eerlijk', fee: 350, line: 'tine', when: [{ tine1: 'pass' }], name: 'Mevrouw T. Ooms (alleen)', portrait: 'tine',
    intro: ['Goedemorgen. Ik ben alleen gekomen. Met de taxi, Marco weet het niet.', 'Ik wil dat testament van dinsdag terugdraaien. Mijn dochter is gisteren langs geweest. Ze wil me helemaal niet in een tehuis stoppen.'],
    docs: [
      intake({ aanhef: 'mevrouw', naam: 'T. Ooms', geboren: '12-05-1938', adres: 'De Hooge Weide (zorgflat), Zandhoven', wens: 'Testament herroepen' }),
      id({ foto: PORTRAITS.tine, naam: 'Ooms', voornamen: 'Tine', geslacht: 'V', geboren: '12-05-1938', nummer: 'NW2214T7', geldig: '20-10-2028' }),
      akte('Testament', 'Heden, {datum}, verscheen {aanhef} {naam}, geboren {geboren}. Comparante herroept haar testament van 8 december 2026 en benoemt tot erfgenamen: {erfgenaam}.',
        [['datum', 'Datum', '10 december 2026'], ['aanhef', 'Aanhef', 'mevrouw'], ['naam', 'Naam', 'Tine Ooms'], ['geboren', 'Geboren', '12-05-1938'], ['erfgenaam', 'Erfgenamen', 'haar kinderen, bij gelijke delen']]),
    ],
    anomalies: [],
    questions: [
      { q: 'Mevrouw Ooms, weet u welke dag het vandaag is?', a: 'Donderdag. De tiende. Ik heb vanochtend mijn pillen genomen en mijn kruiswoordpuzzel afgemaakt. Zonder Marco.' },
    ],
    react: { pass: 'Dank u wel. Ik voel me tien jaar jonger. Nou ja, vijf.', refuse: 'O. Dan... dan weet ik het ook niet meer.' },
    out: { pass: 'Mevrouw Ooms heeft haar testament herroepen. Marco is uit de zorgflat verdwenen.', refuse: 'Mevrouw Ooms dient via haar dochter een klacht in. Het testament ten gunste van Marco blijft staan.' },
  },

  tine2_taart: {
    day: 4, scene: true, when: [{ tine1: 'refuse' }], name: 'Mevrouw T. Ooms', portrait: 'tine',
    lines: ['Ik kom u even een stukje appeltaart brengen. Zelf gebakken.', 'Marco bleek nog drie andere "vriendinnen" te hebben in de zorgflat. De politie is langs geweest.', 'Mijn dochter zegt dat u een verstandige notaris bent. Dat zei ze vroeger nooit over iemand.'],
  },

  devries2: {
    day: 4, kind: 'fraude', fee: 900, bribe: 2500, line: 'devries', when: [{ devries1: 'refuse' }], name: '"S. de Vries"', portrait: 'nepvries',
    intro: ['Daar ben ik weer. Ik heb mijn paspoort laten corrigeren. Alles klopt nu.', 'Vijfentwintighonderd extra, en u ziet me nooit meer.'],
    docs: [
      intake({ aanhef: 'de heer', naam: 'S. de Vries', geboren: '14-03-1946', adres: 'Havenkade 9-C, Zandhoven', wens: 'Verkoop appartement' }),
      id({ foto: PORTRAITS.nepvries, naam: 'de Vries', voornamen: 'Sjoerd', geslacht: 'M', geboren: '14-03-1946', nummer: 'NW9902X5', geldig: '09-12-2036' }),
      grondboek({ perceel: 'Havenkade 9-C, Zandhoven', eigenaar: 'mevrouw Sjoukje de Vries', sinds: '01-02-1979', koopsom: 'ƒ 89.000' }),
      akte('Akte van levering', 'Heden, {datum}, verscheen {aanhef} {naam}, geboren {geboren}, als verkoper. Verkoper levert {object} aan Kustvast BV voor {koopsom}.',
        [['datum', 'Datum', '10 december 2026'], ['aanhef', 'Aanhef', 'de heer'], ['naam', 'Naam', 'Sjoerd de Vries'], ['geboren', 'Geboren', '14-03-1946'], ['object', 'Object', 'Havenkade 9-C te Zandhoven'], ['koopsom', 'Koopsom', '€ 238.000']]),
    ],
    anomalies: [
      { id: 'vermist', a: 'id.nummer', b: 'reg.n3', alt: [['id.nummer', 'circ.r5']], label: 'Paspoortnummer staat in het Register Vermiste Documenten' },
      { id: 'eigenaar', a: 'akte.naam', b: 'grond.eigenaar', alt: [['id.voornamen', 'grond.eigenaar'], ['id.geslacht', 'grond.eigenaar'], ['intake.aanhef', 'grond.eigenaar']], label: 'Eigenaar is Sjoukje, verkoper heet nu Sjoerd' },
    ],
    questions: [
      { unlock: 'eigenaar', q: 'Het appartement staat op naam van Sjoukje de Vries, niet Sjoerd.', a: 'Sjoukje is... mijn tante. Ik heb een volmacht. Thuis. Die kan ik mailen.' },
      { unlock: 'vermist', q: 'Dit paspoortnummer staat geregistreerd als gestolen.', a: '(staat op) Weet u wat, ik kom een andere keer terug.' },
    ],
    react: { pass: 'Eindelijk. Was dat nou zo moeilijk?', refuse: 'U hoort nog van me. Of eigenlijk: niet.' },
    out: { pass: 'Het appartement aan de Havenkade staat sinds vanmiddag op naam van Kustvast BV.', refuse: '"S. de Vries" is vertrokken.', refuseReport: 'De politie heeft een man aangehouden bij de Havenkade, met drie paspoorten op zak. Het LOT dankt u voor uw melding.' },
  },

  yildiz2: {
    day: 4, kind: 'eerlijk', fee: 900, line: 'yildiz', when: [{ yildiz1: 'refuse' }], name: 'Mevrouw A. Yildiz', portrait: 'yildiz',
    intro: ['Daar ben ik weer! Vers paspoort, nog warm van de gemeente.', 'De koper heeft gelukkig gewacht. Hij heeft er zelfs bloemen bij gekocht. Voor u.'],
    docs: [
      intake({ aanhef: 'mevrouw', naam: 'A. Yildiz', geboren: '09-11-1981', adres: 'Beukenlaan 7, Zandhoven', wens: 'Verkoop Wilgenhof 3 (volmacht moeder)' }),
      id({ foto: PORTRAITS.yildiz, naam: 'Yildiz', voornamen: 'Ayse', geslacht: 'V', geboren: '09-11-1981', nummer: 'NW9120Y6', geldig: '10-12-2036' }),
      grondboek({ perceel: 'Wilgenhof 3, Zandhoven', eigenaar: 'mevrouw F. Yildiz', sinds: '12-03-2004', koopsom: '€ 189.000' }),
      akte('Akte van levering', 'Heden, {datum}, verscheen {aanhef} {naam}, geboren {geboren}, handelend krachtens volmacht van mevrouw F. Yildiz. Verkoper levert {object} voor {koopsom}.',
        [['datum', 'Datum', '10 december 2026'], ['aanhef', 'Aanhef', 'mevrouw'], ['naam', 'Naam', 'Ayse Yildiz'], ['geboren', 'Geboren', '09-11-1981'], ['object', 'Object', 'Wilgenhof 3 te Zandhoven'], ['koopsom', 'Koopsom', '€ 345.000']]),
    ],
    anomalies: [],
    questions: [],
    react: { pass: 'Mijn moeder gaat zo blij zijn. Ze wilde eigenlijk zelf komen, maar ze haat notarissen. No offense.', refuse: 'Nu wéér niet? Maar alles klopt toch?' },
    out: { pass: 'De verkoop van Wilgenhof 3 is ingeschreven. Op uw bureau staan bloemen.', refuse: 'Mevrouw Yildiz dient een klacht in. De koper ook.' },
  },

  ahmed: {
    day: 4, kind: 'eerlijk', fee: 900, name: 'De heer A. El Amrani', portrait: 'ahmed',
    intro: ['Goedemiddag. Ik koop mijn eerste huis. Mijn ouders schenken me een deel van het geld.', 'Mijn moeder heeft de schenkingsbrief drie keer laten controleren. Door drie verschillende neven.'],
    docs: [
      intake({ aanhef: 'de heer', naam: 'A. El Amrani', geboren: '03-03-1999', adres: 'Studentenhof 12, Zandhoven', wens: 'Aankoop woning + schenking ouders' }),
      id({ foto: PORTRAITS.ahmed, naam: 'El Amrani', voornamen: 'Ahmed', geslacht: 'M', geboren: '03-03-1999', nummer: 'NW7015A3', geldig: '28-01-2031' }),
      grondboek({ perceel: 'Kastanjelaan 9, Zandhoven', eigenaar: 'W. Hofman', sinds: '14-08-2010', koopsom: '€ 205.000' }),
      betaal({ van: 'M. en F. El Amrani', bedrag: '€ 60.000', wijze: 'Overboeking derdengeldrekening', oms: 'Schenking zoon Ahmed, eigen woning' }),
      akte('Akte van levering', 'Heden, {datum}, verscheen {aanhef} {naam}, geboren {geboren}, als koper. De heer W. Hofman levert {object} voor {koopsom}.',
        [['datum', 'Datum', '10 december 2026'], ['aanhef', 'Aanhef', 'de heer'], ['naam', 'Naam', 'Ahmed El Amrani'], ['geboren', 'Geboren', '03-03-1999'], ['object', 'Object', 'Kastanjelaan 9 te Zandhoven'], ['koopsom', 'Koopsom', '€ 298.000']]),
    ],
    anomalies: [
      { id: 'storter', a: 'betaal.van', b: 'akte.naam', label: 'Een deel van het geld komt van iemand anders dan de koper', harmless: true },
    ],
    questions: [
      { unlock: 'storter', q: 'Zestigduizend van uw ouders: is dat een schenking of een lening?', a: 'Een schenking. Alles via de bank, met een brief erbij. Mijn moeder belt u vanmiddag waarschijnlijk nog even om dat te bevestigen.' },
    ],
    react: { pass: 'Mijn moeder gaat huilen. Mijn vader ook, maar dat zegt hij niet.', refuse: 'Maar... het is gewoon geld van mijn ouders. Via de bank!' },
    out: { pass: 'Ahmed El Amrani is eigenaar van Kastanjelaan 9. Zijn moeder belde om u te bedanken. Twee keer.', refuse: 'De familie El Amrani dient een klacht in. Drie neven hebben meegeschreven.' },
  },

  // ======== VRIJDAG ========
  ronnie4_boos: {
    day: 5, scene: true, when: [{ ronnie2: 'report' }, { ronnie3: 'report' }], name: 'De heer R. Brouwer', portrait: 'ronnie',
    lines: ['De recherche is bij mijn wasstraat geweest. Ze hebben de kassa meegenomen. En de wasborstels.', 'Iemand heeft gekletst, notaris. Ik weet niet wie. Nog niet.', '(buigt naar voren) Ik onthoud gezichten.'],
  },

  ronnie4_blij: {
    day: 5, scene: true, when: [{ ronnie2: 'passeren', ronnie3: 'passeren' }], name: 'De heer R. Brouwer', portrait: 'ronnie',
    lines: ['Even een kerstpakketje brengen. Voor mijn favoriete notaris.', 'Er zit een fles champagne in. En iets wat u beter niet aan uw boekhouder laat zien.', 'Ik hoorde trouwens dat het Bureau Notarieel Toezicht vandaag langskomt. Toeval, hè?'],
  },

  sjoukje_zwaar: {
    day: 5, scene: true, when: [{ devries1: 'pass' }, { devries2: 'pass' }], name: 'Mevrouw S. de Vries', portrait: 'sjoukje',
    lines: ['Goedemorgen. Ik ben Sjoukje de Vries. Ik woon aan de Havenkade 9-C.', 'Vanochtend stonden er twee mannen in mijn woonkamer. Ze zeiden dat het appartement van hen is. Ze hadden een akte. Van dit kantoor.', 'Ik woon daar sinds 1979. Mijn man is er overleden. Kunt u mij uitleggen hoe dit kan?'],
  },

  sjoukje: {
    day: 5, kind: 'eerlijk', fee: 350, line: 'devries', when: [{ devries1: 'refuse', devries2: 'refuse' }], name: 'Mevrouw S. de Vries', portrait: 'sjoukje',
    intro: ['Goedemorgen. Ik ben Sjoukje de Vries, van de Havenkade.', 'Er belde een makelaar dat mijn appartement te koop stond. Een man had zich hier voor mij uitgegeven, zei uw secretaresse. Ik schrok me rot. Nu ik toch hier ben: ik wil een testament laten maken. Je weet maar nooit.'],
    docs: [
      intake({ aanhef: 'mevrouw', naam: 'S. de Vries', geboren: '14-03-1946', adres: 'Havenkade 9-C, Zandhoven', wens: 'Testament' }),
      id({ foto: PORTRAITS.sjoukje, naam: 'de Vries', voornamen: 'Sjoukje', geslacht: 'V', geboren: '14-03-1946', nummer: 'NW1010S4', geldig: '03-07-2029' }),
      akte('Testament', 'Heden, {datum}, verscheen {aanhef} {naam}, geboren {geboren}, die verklaarde tot erfgenaam te benoemen: {erfgenaam}.',
        [['datum', 'Datum', '11 december 2026'], ['aanhef', 'Aanhef', 'mevrouw'], ['naam', 'Naam', 'Sjoukje de Vries'], ['geboren', 'Geboren', '14-03-1946'], ['erfgenaam', 'Erfgenaam', 'haar nichtje Femke de Vries']]),
    ],
    anomalies: [],
    questions: [
      { q: 'Wat goed dat u langskomt, mevrouw De Vries.', a: 'U heeft hem weggestuurd, hoorde ik. Ik woon daar sinds 1979. Mijn man is er overleden. Dank u wel, notaris.' },
    ],
    react: { pass: 'Zo. Nu kunnen ze me niks meer maken. Dood of levend.', refuse: 'Ook u nu? Ik dacht dat u de goede was.' },
    out: { pass: 'Sjoukje de Vries stuurt een doos zelfgebakken kruidnoten.', refuse: 'Mevrouw De Vries dient een klacht in. Haar nichtje helpt met de brief.' },
  },

  duiven: {
    day: 5, kind: 'eerlijk', fee: 600, name: 'De heer K. Wiersma (De Vrolijke Wiek)', portrait: 'duiven',
    intro: ['Goedemorgen. Ik ben voorzitter van duivenvereniging De Vrolijke Wiek. Honderd jaar dit jaar.', 'We willen de statuten wijzigen. Artikel 4: "Leden mogen geen duiven van andermans hok lokken." Dat gebeurde te vaak.'],
    docs: [
      intake({ aanhef: 'de heer', naam: 'K. Wiersma', geboren: '01-01-1950', adres: 'Duivenhof 1, Zandhoven', wens: 'Statutenwijziging vereniging' }),
      id({ foto: PORTRAITS.duiven, naam: 'Wiersma', voornamen: 'Klaas', geslacht: 'M', geboren: '01-01-1950', nummer: 'NW2828K1', geldig: '15-05-2027' }),
      { id: 'notulen', type: 'notulen', title: 'Notulen ledenvergadering', fields: [['datum', 'Vergadering', '28-11-2026'], ['aanwezig', 'Aanwezig', '41 van 52 leden'], ['besluit', 'Besluit', 'Statutenwijziging aangenomen (39 voor, 2 tegen)'], ['tegen', 'Tegen', 'K. Wiersma en zijn broer']] },
      akte('Akte van statutenwijziging', 'Heden, {datum}, verscheen {aanhef} {naam}, voorzitter van de vereniging {vereniging}, die verklaarde dat de algemene vergadering heeft besloten de statuten te wijzigen. Artikel 4 luidt voortaan: {artikel}.',
        [['datum', 'Datum', '11 december 2026'], ['aanhef', 'Aanhef', 'de heer'], ['naam', 'Naam', 'Klaas Wiersma'], ['vereniging', 'Vereniging', 'De Vrolijke Wiek'], ['artikel', 'Artikel 4', 'Leden mogen geen duiven van andermans hok lokken']]),
    ],
    anomalies: [
      { id: 'tegen', a: 'notulen.tegen', b: 'akte.naam', label: 'De voorzitter stemde zelf tegen', harmless: true },
    ],
    questions: [
      { unlock: 'tegen', q: 'U stemde zelf tegen deze wijziging?', a: 'Ja. Mijn broer en ik lokken al veertig jaar elkaars duiven. Dat hoort bij de sport. Maar de vergadering heeft besloten, dus ik teken. Democratie, hè.' },
    ],
    react: { pass: 'Honderd jaar en eindelijk regels. Mijn broer gaat woedend zijn.', refuse: 'De vergadering heeft besloten! Dit is een schande voor de duivensport!' },
    out: { pass: 'De Vrolijke Wiek stuurt u een erelidmaatschap. En een duif.', refuse: 'De Vrolijke Wiek dient met 39 leden een klacht in.' },
  },

  lammers: {
    day: 5, kind: 'eerlijk', fee: 600, name: 'Mevrouw E. Lammers', portrait: 'lammers',
    intro: ['Goedemiddag. Ik sluit mijn hypotheek over naar een andere bank. Lagere rente.', 'Het is mijn laatste afspraak voor het weekend, en de uwe ook, zie ik. Laten we het kort houden.'],
    docs: [
      intake({ aanhef: 'mevrouw', naam: 'E. Lammers', geboren: '16-10-1976', adres: 'Ringweg 30, Zandhoven', wens: 'Hypotheek oversluiten' }),
      id({ foto: PORTRAITS.lammers, naam: 'Lammers', voornamen: 'Eva', geslacht: 'V', geboren: '16-10-1976', nummer: 'NW6060E2', geldig: '30-11-2030' }),
      grondboek({ perceel: 'Ringweg 30, Zandhoven', eigenaar: 'mevrouw E. Lammers', sinds: '01-04-2012', koopsom: '€ 240.000', hypotheek: 'ABN (wordt afgelost)' }),
      akte('Hypotheekakte', 'Heden, {datum}, verscheen {aanhef} {naam}, geboren {geboren}, die ten behoeve van Hypotheekbank Nederwaard een recht van hypotheek verleent op {object} tot een bedrag van {bedrag}.',
        [['datum', 'Datum', '11 december 2026'], ['aanhef', 'Aanhef', 'mevrouw'], ['naam', 'Naam', 'Eva Lammers'], ['geboren', 'Geboren', '16-10-1976'], ['object', 'Object', 'Ringweg 30 te Zandhoven'], ['bedrag', 'Bedrag', '€ 185.000']]),
    ],
    anomalies: [],
    questions: [],
    react: { pass: 'Fijn weekend, notaris. U ziet eruit alsof u het nodig heeft.', refuse: 'Serieus? Op vrijdagmiddag?' },
    out: { pass: 'De hypotheek van mevrouw Lammers is overgesloten.', refuse: 'Mevrouw Lammers dient een klacht in. Op vrijdagmiddag, uit principe.' },
  },
};

export const LINES = {
  ronnie: 'Ronnie Brouwer (Kerkstraat 12)',
  henk: 'Henk Veldkamp (katvanger)',
  tine: 'Mevrouw Ooms en Marco',
  devries: 'De valse S. de Vries',
};
