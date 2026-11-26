# Ten Overstaan

Een droog-satirische notarisgame in de browser. Je bent net benoemd tot notaris in Zandhoven. Controleer de stukken, stel vragen en beslis: passeren, weigeren of in stilte melden. Geld en toezicht trekken aan je; aan het eind van de week komt de inspecteur.

Speel: https://jarno-cremer.github.io/ten-overstaan/

## Opbouw

- `js/data.js`: alle inhoud (klanten, documenten, afwijkingen, dialogen, gevolgen). Nieuwe klanten voeg je hier toe.
- `js/engine.js`: spellogica zonder DOM (beslissingen, dagafsluiting, inspectie, eindes).
- `js/main.js`, `js/portrait.js`, `css/style.css`: interface.
- `docs/ontwerp.md`: het ontwerp.

Geen build-stap: open via een webserver (`python -m http.server 8765`) en ga naar http://localhost:8765/.

## Tests

- `node tests/run.mjs`: valideert de data (elke afwijking wijst naar twee bestaande, verschillende velden) en speelt vijf scripts die elk bij een ander einde moeten uitkomen.
- `python tests/e2e.py [klokkenluider|welvarend|ontzet] [screenshotmap]`: speelt de week door de echte interface met Playwright (server op poort 8765).
