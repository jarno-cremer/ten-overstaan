"""Speelt de hele week door de echte interface.

Gebruik (vanuit de projectmap, met een server op poort 8765):
    python -m http.server 8765
    python tests/e2e.py [klokkenluider|welvarend|ontzet] [screenshotmap]
"""
import json, os, subprocess, sys
from playwright.sync_api import sync_playwright

script = sys.argv[1] if len(sys.argv) > 1 else "klokkenluider"
shots = sys.argv[2] if len(sys.argv) > 2 else None
URL = os.environ.get("URL", "http://localhost:8765/")
IDEAL = {"eerlijk": "passeren", "formeel": "weigeren", "melden": "passeren_melden", "fraude": "weigeren_melden"}
override = {"klokkenluider": {}, "welvarend": {"ronnie2": "passeren"}, "ontzet": "passeren"}[script]
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CASES = json.loads(subprocess.check_output(["node", os.path.join(root, "tests", "dump_data.mjs")]))

errors, done = [], []
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": int(os.environ.get("VW", 1440)), "height": int(os.environ.get("VH", 900))})
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("console", lambda m: m.type == "error" and errors.append(m.text))

    def snap(name):
        if shots:
            os.makedirs(shots, exist_ok=True)
            page.screenshot(path=os.path.join(shots, name + ".png"))

    page.goto(URL)
    page.evaluate("localStorage.clear()")
    page.reload()
    page.wait_for_selector("[data-act='new']")
    snap("00-titel")
    page.click("[data-act='new']")
    day = n = 0
    for _ in range(200):
        if page.query_selector("[data-act='open']"):
            day += 1
            snap(f"d{day}-0-ochtend")
            page.click("[data-act='open']")
            continue
        if page.query_selector(".office"):
            cid = page.get_attribute(".office", "data-case")
            c = CASES[cid]
            done.append(cid)
            n += 1
            if c.get("scene"):
                snap(f"d{day}-{n:02d}-scene-{cid}")
                page.click("[data-act='next']")
                continue
            while page.query_selector("[data-act='tip']"):
                if n == 1 and day == 1:
                    snap(f"d1-{n:02d}-tip")
                page.click("[data-act='tip']")
            for an in c.get("anomalies", []):
                if an.get("harmless"):
                    continue
                if not page.query_selector(".office.inspecting"):
                    page.keyboard.press("Space")
                a, b = (an["alt"][0] if an.get("alt") else [an["a"], an["b"]])
                page.click(f"[data-ref='{a}']")
                page.click(f"[data-ref='{b}']")
                if an["label"] not in page.text_content(".notes"):
                    errors.append(f"{cid}: afwijking {an['id']} niet vastgelegd via de interface")
                for ref in (a, b):
                    if "flagged" not in (page.get_attribute(f"[data-ref='{ref}']", "class") or ""):
                        errors.append(f"{cid}: aangeklikt veld {ref} niet gemarkeerd")
            if cid == "devries1":
                snap(f"d{day}-{n:02d}-{cid}-inspectie")
            if page.query_selector(".office.inspecting"):
                page.keyboard.press("Space")
            for q in c.get("questions", []):
                btn = page.locator(".q:not([disabled])", has_text=q["q"][:30])
                if btn.count():
                    btn.first.click()
            snap(f"d{day}-{n:02d}-{cid}")
            dec = override if isinstance(override, str) else override.get(cid, IDEAL[c["kind"]])
            page.click(f"[data-dec='{dec}']")
            snap(f"d{day}-{n:02d}-{cid}-gestempeld")
            page.click("[data-act='next']")
            continue
        if page.query_selector(".ledger"):
            snap(f"d{day}-99-afrekening")
            page.click("[data-act='go']")
            continue
        if page.query_selector(".report"):
            snap("d5-inspectie")
            page.click("[data-act='end']")
            continue
        if page.query_selector(".ending"):
            snap(f"einde-{script}")
            print(f"{script}: einde \"{page.text_content('.verdict').strip()}\" na {n} cliënten/scènes")
            break
        errors.append("onbekend scherm")
        break
    browser.close()

if errors:
    print("FOUTEN:\n" + "\n".join(errors))
    sys.exit(1)
print("geen fouten")
