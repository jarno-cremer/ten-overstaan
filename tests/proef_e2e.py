"""Speelt de stijlproef (proef.html) door met muis en toetsenbord.

    python -m http.server 8765        (in de projectmap)
    python tests/proef_e2e.py [screenshotmap]

Speelt de vier beslissingen op 1280x720 en de ideale route ook op 1920x1080.
"""
import os, sys
from playwright.sync_api import sync_playwright

URL = os.environ.get("URL", "http://localhost:8765/proef.html")
shots = sys.argv[1] if len(sys.argv) > 1 else None
errors = []


def center(page, sel):
    b = page.locator(sel).first.bounding_box()
    return b["x"] + b["width"] / 2, b["y"] + b["height"] / 2


def drag(page, sel, to, grab=None):
    x, y = grab or center(page, sel)
    page.mouse.move(x, y)
    page.mouse.down()
    for i in range(1, 11):
        page.mouse.move(x + (to[0] - x) * i / 10, y + (to[1] - y) * i / 10)
    page.mouse.up()


def play(p, decision, size, tag, find_all=True):
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": size[0], "height": size[1]})
    page.on("pageerror", lambda e: errors.append(f"{tag}: {e}"))
    page.on("console", lambda m: m.type == "error" and errors.append(f"{tag}: {m.text}"))

    def snap(name):
        if shots:
            os.makedirs(shots, exist_ok=True)
            page.screenshot(path=os.path.join(shots, f"{tag}-{name}.png"))

    page.goto(URL)
    page.wait_for_selector(".curtain button")
    snap("0-gordijn")
    page.click(".curtain button")
    page.wait_for_selector(".bubble .more", timeout=15000)
    page.click(".bubble")
    page.wait_for_selector(".passport", state="visible")
    page.wait_for_timeout(2200)
    snap("1-binnen")
    page.click(".sticky button")

    # paspoort openslaan en naar een vrije plek slepen
    page.click(".passport .cover")
    if not page.locator(".passport.open").count():
        errors.append(f"{tag}: paspoort gaat niet open")
    drag(page, ".passport", center(page, ".blotter"), grab=center(page, ".passport .page:first-child h3"))
    drag(page, ".passport", (center(page, ".circ")[0] + 60, center(page, ".circ")[1] + 150), grab=center(page, ".passport .page:first-child h3"))

    pairs = [("id.foto", "klant"), ("intake.aanhef", "akte.aanhef"), ("id.geboren", "akte.geboren")] if find_all else []
    if pairs:
        page.keyboard.press("Space")
        for a, b in pairs:
            page.click(f"[data-ref='{a}']", force=True)
            page.click(f"[data-ref='{b}']", force=True)
        page.wait_for_timeout(300)
        snap("2-draden")
        n = page.locator(".notepad .found").count()
        if n != len(pairs):
            errors.append(f"{tag}: {n} afwijkingen op het notitieblok, verwacht {len(pairs)}")
        # draden bewegen mee met het papier
        before = page.locator(".threads line").first.get_attribute("x1")
        page.keyboard.press("Space")
        drag(page, ".intake", (center(page, ".intake")[0] + 40, center(page, ".intake")[1] + 60), grab=center(page, ".intake h3"))
        after = page.locator(".threads line").all()
        if not after:
            errors.append(f"{tag}: draden verdwenen na slepen")
        # een vraag stellen
        page.locator(".notepad .q").first.click()
        page.wait_for_selector(".bubble.me .more")
        page.click(".bubble")
        page.wait_for_timeout(2500)
        snap("3-vraag")

    stamp = "pass" if decision.startswith("passeren") else "refuse"
    ax, ay = center(page, ".akte p")
    sx, sy = center(page, f"[data-stamp='{stamp}']")
    sb = page.locator(f"[data-stamp='{stamp}']").bounding_box()
    # punt van de stempel ligt onderaan het blok: verschuif zodat de punt op de akte landt
    drag(page, f"[data-stamp='{stamp}']", (ax, ay - sb["height"] * 0.35), grab=(sx, sy))
    if not page.locator(".impression").count():
        errors.append(f"{tag}: geen stempelafdruk")
    if decision.endswith("_melden"):
        drag(page, "[data-slip]", center(page, ".tray"))
        if "melding" not in page.text_content(".tray .count"):
            errors.append(f"{tag}: melding niet in de bak")
    snap("4-gestempeld")
    gx, gy = center(page, ".glass")
    drag(page, ".akte", (gx, gy + 40), grab=center(page, ".akte .title"))
    page.wait_for_selector(".evening.show", timeout=20000)
    page.wait_for_timeout(900)
    snap("5-avond")
    text = page.text_content(".letter")
    want = {"passeren": "gepasseerd", "passeren_melden": "gepasseerd en gemeld", "weigeren": "geweigerd", "weigeren_melden": "geweigerd en gemeld"}[decision]
    if f"akte {want}." not in text.replace("\n", " "):
        errors.append(f"{tag}: avondbrief noemt beslissing niet ({want})")
    print(f"{tag}: {decision} -> {text.split('Je hebt')[0].replace('Post · maandagavond', '').strip()}")
    browser.close()


with sync_playwright() as p:
    for d in ["weigeren_melden", "passeren", "weigeren", "passeren_melden"]:
        play(p, d, (1280, 720), f"1280-{d}", find_all=(d != "passeren"))
    play(p, "weigeren_melden", (1920, 1080), "1920-weigeren_melden")

if errors:
    print("FOUTEN:\n" + "\n".join(errors))
    sys.exit(1)
print("geen fouten")
