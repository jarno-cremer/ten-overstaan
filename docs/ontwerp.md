# Ten Overstaan: ontwerp prototype

*Werktitel. Versie 0.1, 26 november 2026.*

> "Heden, de zesentwintigste november tweeduizend zesentwintig, verscheen ten overstaan van mij, notaris te Zandhoven..."

## Pitch

Je bent net benoemd tot notaris in Zandhoven, een slaperig provinciestadje. Je hebt een kantoor gehuurd, een secretaresse aangenomen en een praktijklening afgesloten. Elke dag komen er klanten aan je balie die een akte willen laten passeren. Meestal zijn het gewone mensen met gewone, soms absurde wensen. Soms is het iemand met een zonnebril, een envelop vol contant geld en grote haast.

Je controleert elk dossier en beslist dan: passeren, weigeren of in stilte melden. Elke weigering kost omzet. Elke gemiste rode vlag is een risico bij de toezichthouder. Aan het eind van de week komt de inspecteur langs.

Toon: droog-satirisch. Het notariaat is van zichzelf al komisch formeel; de humor zit in het contrast tussen die plechtige taal en wat er aan de balie gebeurt.

## De wereld

Fictief land, met processen die gebaseerd zijn op het Nederlandse notariaat. Namen zijn verzonnen, de mechanismen kloppen in grote lijnen.

| In de game | Nederlands voorbeeld | Rol in het spel |
|---|---|---|
| Gemenebest Nederwaard, stad Zandhoven | Nederland | Setting |
| Het Grondboek | Kadaster | Wie is eigenaar, welke hypotheken, laatste koopprijs |
| Het Handelsregister | KvK | Bestuurders, adres, oprichtingsdatum van een BV |
| Register Uiteindelijk Belanghebbenden (RUB) | UBO-register | Wie er echt achter een BV zit |
| Wet Integer Geldverkeer (WIG) | Wwft | Cliëntonderzoek en meldplicht |
| Loket Ongebruikelijke Transacties (LOT) | FIU-Nederland | Hier meld je in stilte. De klant mag het niet weten. |
| Bureau Notarieel Toezicht (BNT) | BFT | Inspecteert vrijdag een steekproef van je dossiers |
| De Tuchtkamer | Kamer voor het notariaat | Spreekt straffen uit, tot en met ontzetting uit het ambt |
| Circulaire van de Orde | KNB-berichten | Elke ochtend een nieuwe regel (zoals de bulletins in Papers, Please) |

Een satirisch gegeven dat echt bestaat: een notaris heeft *ministerieplicht*. Je mag niet zomaar weigeren. Een eerlijke klant zonder goede reden wegsturen levert een klacht op. Paranoia wordt dus ook bestraft.

## Kernloop

Per klant:

1. **Binnenkomst.** De klant verschijnt aan de balie (portret als silhouet of pasfoto) met een korte openingstekst.
2. **Dossier.** Er schuiven documenten over je bureau: de concept-akte plus bijlagen (legitimatie, uittreksel uit het Grondboek, Handelsregister, RUB, betaalbewijs, verklaring van een arts, enzovoort).
3. **Inspecteren.** Zet de inspectiemodus aan en klik twee velden aan die elkaar tegenspreken, bijvoorbeeld de geboortedatum op het paspoort tegenover die in het Grondboek. Zo leg je een afwijking vast. Daarmee ontgrendel je een vraag aan de klant ("Uw paspoort is verlopen?"), en het antwoord kan de afwijking verklaren of juist verergeren.
4. **Beslissen.** Je hebt vier stempels:
   - **Passeren.** Je zet een paraaf en een stempel, het honorarium komt binnen.
   - **Weigeren.** Er komt geen honorarium binnen. Weiger je zonder vastgelegde afwijking, dan volgt een kans op een klacht.
   - **Passeren en melden.** Het honorarium komt binnen en je doet in stilte een melding bij het LOT. Dit is soms de juiste route: verdacht, maar niet aantoonbaar onrechtmatig.
   - **Weigeren en melden.**
5. **Dagafsluiting.** Een overzicht van het honorarium, de kosten, de krantenkop van de dag en post (brieven van het BNT, bedankjes, dreigbrieven).

Moeilijkheid per dag: meer klanten, meer documentsoorten, een nieuwe regel uit de circulaire en minder tijd. Er is een klok: om 17:00 gaat de deur dicht, en wie dan nog wacht, komt morgen terug of gaat naar de concurrent.

## Twee meters

**Geld (zichtbaar, de kas).** Je begint met € 6.000. Vaste lasten: huur en het salaris van je secretaresse per dag, plus vrijdag de aflossing van de lening (€ 3.500). Honoraria: levering € 900, hypotheek € 600, BV-oprichting € 750, testament € 350, samenlevingscontract € 400. Louche klanten bieden een "spoedtoeslag" van € 1.500 tot € 5.000.

**Toezichtsdruk (zichtbaar als meter van 0 tot 100, de oorzaken deels verborgen).**
- Passeren met een gemiste rode vlag: +10 tot +25, maar je merkt het pas bij de inspectie of door een krantenbericht.
- Een melding vergeten die verplicht was: +20.
- Een formele fout, zoals een verlopen ID geaccepteerd of een ontbrekende paraaf: +5.
- Zonder grond weigeren (een klacht wegens ministerieplicht): +8.
- Een terechte melding: −5. Het BNT ziet een zorgvuldige notaris.

Vrijdag trekt de BNT-inspectie een steekproef uit je dossiers van de week. Elke gevonden misser telt dubbel.

## Eindes

Harde eindes, elk met een eigen eindscherm in de vorm van een officieel document:

| Einde | Voorwaarde |
|---|---|
| **Faillissement** | Kas onder nul na de afrekening op vrijdag (of op een eerdere dag als je de huur niet kunt betalen) |
| **Ontzet uit het ambt** | Toezichtsdruk 100, of de inspectie vindt twee zware missers. De uitspraak van de Tuchtkamer is het eindscherm. |
| **Keurig en blut** | Week overleefd, alles gemeld, maar de kas is net positief. "De praktijk is gered. Voorlopig." |
| **Welvarend, met schaduw** | Week overleefd met veel spoedtoeslagen. Epiloog: Ronnie belt maandag weer. |
| **De klokkenluider** | Week overleefd met alle vier de louche verhaallijnen correct gemeld. Krantenkop over de opgerolde fraude, zonder je naam. |

## Vier verhaallijnen

Elke lijn heeft een vast personage dat meerdere keren terugkomt. Hun reactie op je keuze is verhaal, geen extra meter.

**1. Vastgoed-witwas: Ronnie Brouwer** (zonnebril, "zakenman in onroerend goed")
- Di: Ronnie koopt Kerkstraat 12 voor € 450.000. Netjes, op een flinke contante aanbetaling na.
- Wo: hij verkoopt hetzelfde pand door voor € 1.150.000 aan een BV van een vriend. Het Grondboek toont de koop van gisteren. Dit is een ABC-transactie.
- Helpen: hij komt donderdag terug met een bedankenvelop en nog twee panden. Vrijdag vindt het BNT het patroon.
- Melden: donderdag belt de recherche "voor een praatje". Vrijdag staat Ronnie boos aan de balie, maar hij weet niet zeker dat jij het was.

**2. Stroman en BV: Henk Veldkamp** (71, vriendelijk, verward)
- Wo: oprichting van Veldkamp Global Trading BV met Henk als enige bestuurder en UBO. Het adres is een postbus. Henk leest zijn antwoorden voor van een briefje. Neef Dennis betaalt contant en wil per se bij het gesprek zijn.
- Vragen helpt: als je Dennis vraagt even buiten te wachten, vertelt Henk dat hij € 500 krijgt "voor een handtekening".
- Afloop: passeren betekent dat Henk vrijdag in de krant staat (aansprakelijk voor een miljoenenfraude) en dat het BNT vragen stelt. Weigeren en melden leidt tot een kerstkaart van Henk in de epiloog.

**3. Erfenis onder druk: mevrouw Tine Ooms** (89) **en Marco** (haar "goede vriend", 34)
- Di: Tine wil haar testament wijzigen ten gunste van Marco. Marco wil per se bij het gesprek zijn.
- Mechaniek: je kunt Marco laten wegsturen en dan vragen stellen om haar wilsbekwaamheid te toetsen. De arts heeft een verklaring meegegeven, maar die is gedateerd op een zondag en de handtekening wijkt af.
- Do: Tine komt terug, alleen. Ze vraagt of ze het testament "toch weer terug kan draaien".
- Let op: je kunt hier ook té streng zijn. Als Tine wel wilsbekwaam is en het echt wil, is weigeren een schending van de ministerieplicht. De rode vlaggen moeten dus echt gevonden worden.

**4. Valse identiteit: "meneer S. de Vries"**
- Ma (avond, laatste klant): iemand verkoopt het appartement van S. de Vries. De paspoortfoto lijkt redelijk, maar de geboortedatum wijkt een dag af van het Grondboek en de handtekening klopt niet.
- Do: dezelfde man komt terug met een "gecorrigeerd" paspoort met een ander nummer. Dezelfde foto, een andere naam van de uitgevende gemeente.
- Vr: de echte S. de Vries (een tachtigjarige vrouw, Sjoukje) komt vragen waarom er post over de verkoop van haar huis binnenkomt. Als je hebt gepasseerd, is dit het zwaarste moment van de week.

**Gekke maar eerlijke klanten (vulling en valse alarmen):**
- Een echtpaar dat aan de balie ruziet over wie de airfryer krijgt in hun samenlevingscontract.
- Een man die zijn kat tot erfgenaam wil benoemen (dat kan niet, maar wel via een legaat met een last, dus passeren mag).
- Een boer die contant betaalt, omdat hij banken niet vertrouwt. Dat is ongebruikelijk, maar zijn papieren kloppen. Is dit melden of discriminatie van boeren?
- Een influencer die haar akte wil filmen voor TikTok.

Zo leert de speler dat niet elke rare klant louche is en niet elke nette klant eerlijk.

## Week-indeling

| Dag | Klanten | Nieuw | Verhaallijnen |
|---|---|---|---|
| Ma | 3 | Tutorial: legitimatie en de concept-akte | De Vries (1) |
| Di | 4 | Het Grondboek | Ronnie (1), Tine (1) |
| Wo | 5 | Handelsregister en RUB | Ronnie (2), Henk |
| Do | 5 | Circulaire: contant boven € 10.000 is meldplichtig | Ronnie (3), Tine (2), De Vries (2) |
| Vr | 4 + inspectie | BNT-steekproef, ontknopingen | Ronnie (4), De Vries (3) |

Verwachte speeltijd: 25 tot 35 minuten.

## Techniek

- **Browser:** HTML, CSS en JavaScript (ES-modules), zonder build-stap. Gehost op GitHub Pages en speelbaar via een link.
- **Data los van de engine:** alle klanten, documenten, afwijkingen, dialogen en gevolgen staan in databestanden. De engine leest ze alleen. Zo kunnen we later naar Godot of een andere engine zonder de inhoud opnieuw te schrijven.
- **Opslaan:** de voortgang per dag in localStorage.
- **Stijl B:** papier en typografie. Een serif-letter voor documenten, stempels als SVG, een groene bureaumat, de klant als silhouet of pasfoto. Desktop eerst (minimaal 1024 px breed); een telefoon is later een wens, geen eis.
- **Taal:** alleen Nederlands.

## Acceptatiecriteria prototype

Het prototype is af als:

1. Alle vijf dagen van begin tot eind speelbaar zijn zonder fouten in de console.
2. Elke rode vlag in de vier verhaallijnen te vinden is via de inspectiemodus. Een geautomatiseerde test controleert dat elke afwijking in de data twee velden heeft die echt verschillen.
3. Alle vijf de eindes bereikbaar zijn. Een geautomatiseerde test speelt vijf scripts van keuzes en controleert dat elk script bij het verwachte einde uitkomt.
4. Elke louche verhaallijn minstens twee verschillende afloopteksten heeft, die afhangen van je keuze.
5. Een onafhankelijke evaluatie (screenshots van elke dag en elk einde) bevestigt dat documenten leesbaar zijn en dat het verloop van een dag duidelijk is zonder uitleg buiten het spel.

## Open punten voor Jarno

- [ ] **Ministerieplicht-klachten bij onterecht weigeren: erin (voorgesteld)**, of weglaten zodat weigeren alleen geld kost.
- [ ] **Melden is geheim en de klant merkt het niet direct (voorgesteld, en realistisch)**, of de klant merkt het meteen (meer drama, minder realistisch).
- [ ] Werktitel "Ten Overstaan" houden of later vervangen.

## Realisme

De regels zijn vereenvoudigd. Wat in grote lijnen klopt met het Nederlandse notariaat: cliëntonderzoek en meldplicht onder de Wwft, het tipping-off-verbod (de klant mag niet weten dat je meldt), ABC-transacties als bekend witwassignaal, de katvanger als bestuurder, het toetsen van wilsbekwaamheid bij een testament, de ministerieplicht en het BFT-toezicht met de tuchtrechter. Bedragen en kansen zijn spelbalans, geen werkelijkheid.
