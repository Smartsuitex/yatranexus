#!/usr/bin/env python3
"""Crop YatraNexus brand mockups into hero images for public/images/hero/."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "YatraNexus" / "YatraNexus" / "Website Images and Content"
OUT = ROOT / "public" / "images" / "hero"


def crop_service_hero(img: Image.Image) -> Image.Image:
    """Landscape service mockup — keep the photographic hero on the right."""
    w, h = img.size
    left = int(w * 0.42)
    top = 0
    right = w
    bottom = int(h * 0.58)
    return img.crop((left, top, right, bottom))


def crop_portrait_hero(img: Image.Image, height_ratio: float = 0.34) -> Image.Image:
    """Portrait page mockup — keep the top hero band."""
    w, h = img.size
    return img.crop((0, 0, w, int(h * height_ratio)))


def save_hero(name: str, image: Image.Image) -> None:
    path = OUT / name
    image.save(path, format="PNG", optimize=True)
    print(f"Wrote {path} ({image.size[0]}x{image.size[1]})")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    landscape_map = {
        "flights-hero.png": "ChatGPT Image Jun 28, 2026, 04_00_22 PM.png",
        "cabs-hero.png": "ChatGPT Image Jun 28, 2026, 04_18_19 PM.png",
        "insurance-hero.png": "ChatGPT Image Jun 28, 2026, 04_31_29 PM.png",
        "forex-hero.png": "ChatGPT Image Jun 28, 2026, 04_35_44 PM.png",
    }

    for out_name, src_name in landscape_map.items():
        src = SRC / src_name
        if not src.exists():
            print(f"Skip missing {src}")
            continue
        with Image.open(src) as img:
            save_hero(out_name, crop_service_hero(img.convert("RGB")))

    about_src = SRC / "ChatGPT Image Jun 28, 2026, 05_03_35 PM.png"
    if about_src.exists():
        with Image.open(about_src) as img:
            save_hero("about-hero.png", crop_portrait_hero(img.convert("RGB"), 0.32))

    corporate_src = SRC / "ChatGPT Image Jun 28, 2026, 04_55_41 PM.png"
    if corporate_src.exists():
        with Image.open(corporate_src) as img:
            save_hero("corporate-hero.png", crop_portrait_hero(img.convert("RGB"), 0.22))

    contact_src = ROOT / "YatraNexus" / "YatraNexus" / "Backgroundimage.png"
    if contact_src.exists():
        with Image.open(contact_src) as img:
            w, h = img.size
            save_hero("contact-hero.png", img.crop((int(w * 0.25), 0, w, h)).convert("RGB"))

    # Refresh visa hero from source mockup for consistency
    visa_src = SRC / "ChatGPT Image Jun 28, 2026, 04_25_44 PM.png"
    if visa_src.exists():
        with Image.open(visa_src) as img:
            save_hero("visa-hero.png", crop_service_hero(img.convert("RGB")))


if __name__ == "__main__":
    main()
