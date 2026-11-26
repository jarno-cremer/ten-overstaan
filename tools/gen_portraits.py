"""Genereert figuren voor Ten Overstaan met SDXL (diffusers), in één vaste stijl.

Draait in de Python-omgeving van ComfyUI (heeft torch, diffusers en OpenCV):
    C:\\Users\\jarno\\Documents\\ComfyUI\\.venv\\Scripts\\python.exe tools/gen_portraits.py --out assets/portraits/test2 [--only ronnie,tine] [--seeds 2]

Lessen uit test 1 (27-11):
- CLIP leest maar 77 tokens: het figuur komt vóór de stijl, en de stijl is kort. Anders verdwijnen pak en grijns.
- img2img over het hele beeld verandert de expressie nauwelijks. Expressies komen nu uit inpainting van alleen het gezicht
  (gezicht gevonden met OpenCV), zodat kleding, houding en achtergrond gelijk blijven.
- Stijl "gouache" bleef consistent; "inkt en waterverf" negeerde de beschrijving van de figuren.
"""
import argparse, json, os, time, zlib
import numpy as np
import cv2
import torch
from PIL import Image, ImageFilter
from diffusers import StableDiffusionXLPipeline, StableDiffusionXLInpaintPipeline

CKPT = r"C:\Users\jarno\Documents\ComfyUI\models\checkpoints\sd_xl_base_1.0.safetensors"
STYLE = ("gouache illustration, visible brush strokes, muted earthy palette, soft light, "
         "slightly caricatured, waist-up portrait facing viewer, plain flat warm grey background")
NEG = ("photo, photorealistic, 3d render, text, letters, watermark, signature, frame, window, room, furniture, "
       "extra fingers, deformed hands, blurry, lowres, multiple people, cropped head, nsfw")

CHARACTERS = {
    "ronnie": "flashy dutch property dealer, 45, slicked-back black hair, tinted aviator glasses, shiny navy suit, open shirt collar, gold chain, smug grin",
    "tine": "dutch grandmother, 88, curly white hair, big round glasses, lilac cardigan with brooch, clutching handbag, gentle confused look",
    "henk": "dutch retiree, 71, bald with grey fringe, reading glasses, beige windbreaker, holding crumpled paper note, friendly puzzled look",
    "nepvries": "shifty man, 40, flat cap, stubble, dark green work jacket, forced polite smile",
}
EXPRESSIONS = {
    "nerveus": "nervous face, sweating, eyes glancing sideways, tense lips",
    "boos": "angry face, deep frown, narrowed eyes, clenched jaw",
}


def face_mask(img):
    """Ovaal masker rond het grootste gezicht (OpenCV); valt terug op het bovenste midden."""
    g = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2GRAY)
    cas = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    faces = cas.detectMultiScale(g, 1.1, 5, minSize=(120, 120))
    w, h = img.size
    if len(faces):
        x, y, fw, fh = max(faces, key=lambda f: f[2] * f[3])
    else:
        fw, fh = int(w * 0.32), int(h * 0.26)
        x, y = (w - fw) // 2, int(h * 0.12)
    m = np.zeros((h, w), np.uint8)
    cv2.ellipse(m, (x + fw // 2, y + int(fh * 0.55)), (int(fw * 0.62), int(fh * 0.72)), 0, 0, 360, 255, -1)
    return Image.fromarray(m).filter(ImageFilter.GaussianBlur(18)), bool(len(faces))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="assets/portraits/test2")
    ap.add_argument("--only", default="")
    ap.add_argument("--seeds", type=int, default=2)
    ap.add_argument("--steps", type=int, default=30)
    ap.add_argument("--expr", default="nerveus,boos")
    ap.add_argument("--expr-strength", type=float, default=0.8)
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    names = [n for n in a.only.split(",") if n] or list(CHARACTERS)
    t0 = time.time()
    pipe = StableDiffusionXLPipeline.from_single_file(CKPT, torch_dtype=torch.float16, use_safetensors=True)
    pipe.to("cuda")
    pipe.enable_vae_slicing()
    inp = StableDiffusionXLInpaintPipeline(**pipe.components)
    print(f"geladen in {time.time() - t0:.0f}s", flush=True)
    meta = []
    for name in names:
        for seed in range(1, a.seeds + 1):
            prompt = f"{CHARACTERS[name]}, {STYLE}"
            s = seed * 1000 + zlib.crc32(name.encode()) % 997
            t = time.time()
            img = pipe(prompt, negative_prompt=NEG, num_inference_steps=a.steps, guidance_scale=6.5, width=896, height=1152,
                       generator=torch.Generator("cuda").manual_seed(s)).images[0]
            base = f"{name}_{seed}"
            img.save(os.path.join(a.out, base + ".png"))
            entry = {"file": base + ".png", "prompt": prompt, "seed": s, "sec": round(time.time() - t, 1), "expr": {}}
            print(f"{base} {entry['sec']}s", flush=True)
            if seed == 1:
                mask, found = face_mask(img)
                mask.save(os.path.join(a.out, base + "_mask.png"))
                for ex in [e for e in a.expr.split(",") if e]:
                    out = inp(f"{CHARACTERS[name]}, {EXPRESSIONS[ex]}, {STYLE}", negative_prompt=NEG, image=img, mask_image=mask,
                              strength=a.expr_strength, num_inference_steps=a.steps, guidance_scale=7,
                              generator=torch.Generator("cuda").manual_seed(s + 7)).images[0]
                    out.save(os.path.join(a.out, f"{base}_{ex}.png"))
                    entry["expr"][ex] = {"file": f"{base}_{ex}.png", "face_found": found}
                    print(f"{base}_{ex} (gezicht {'gevonden' if found else 'geschat'})", flush=True)
            meta.append(entry)
    json.dump(meta, open(os.path.join(a.out, "meta.json"), "w"), indent=1)
    print(f"klaar in {time.time() - t0:.0f}s", flush=True)


if __name__ == "__main__":
    main()
