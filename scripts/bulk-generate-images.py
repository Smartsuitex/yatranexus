#!/usr/bin/env python3
"""
Bulk-generate YatraNexus images via OpenAI or Google Gemini API.

Setup:
  pip install openai
  Add to .env:  OPENAI_API_KEY=sk-...   OR   GEMINI_API_KEY=...

Quick start (recommended — 125 images for live site):
  python scripts/bulk-generate-images.py --site-essentials --provider gemini

Overnight full run:
  python scripts/bulk-generate-images.py --type package --v1-only --provider gemini
  python scripts/bulk-generate-images.py --type service --provider gemini

Dry run:
  python scripts/bulk-generate-images.py --site-essentials --dry-run
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PROMPTS_FILE = ROOT / "public" / "image-prompts" / "bulk-prompts.json"
LOG_FILE = ROOT / "public" / "image-prompts" / "generation-log.json"
ENV_FILE = ROOT / ".env"


def load_dotenv() -> None:
    if not ENV_FILE.exists():
        return
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


def slug_path(save_as: str) -> Path:
    return ROOT / save_as.replace("/", os.sep)


def pick_size(item_id: str, model: str) -> str:
    if model == "dall-e-3":
        if "social-square" in item_id:
            return "1024x1024"
        if "social-story" in item_id or "hero-mobile" in item_id:
            return "1024x1792"
        return "1792x1024"
    # gpt-image-1
    if "social-square" in item_id:
        return "1024x1024"
    if "social-story" in item_id or "hero-mobile" in item_id:
        return "1024x1536"
    return "1536x1024"


def pick_gemini_aspect_ratio(item_id: str) -> str:
    if "social-square" in item_id:
        return "1:1"
    if "social-story" in item_id or "hero-mobile" in item_id:
        return "9:16"
    return "16:9"


def save_image_openai(client, model: str, prompt: str, size: str, out: Path) -> None:
    if model == "dall-e-3":
        result = client.images.generate(
            model="dall-e-3",
            prompt=prompt[:4000],
            size=size,
            n=1,
            response_format="b64_json",
        )
    else:
        result = client.images.generate(
            model=model,
            prompt=prompt,
            size=size,
            n=1,
        )

    data = result.data[0]
    if getattr(data, "b64_json", None):
        out.write_bytes(base64.b64decode(data.b64_json))
    elif getattr(data, "url", None):
        with urllib.request.urlopen(data.url, timeout=120) as resp:
            out.write_bytes(resp.read())
    else:
        raise RuntimeError("No image data in OpenAI response")


def save_image_gemini(api_key: str, model: str, prompt: str, item_id: str, out: Path) -> None:
    aspect_ratio = pick_gemini_aspect_ratio(item_id)
    errors: list[str] = []

    # Primary: generateContent (widely supported)
    gen_payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "responseModalities": ["IMAGE"],
            "imageConfig": {"aspectRatio": aspect_ratio},
        },
    }
    gen_url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
    try:
        data = _gemini_post(api_key, gen_url, gen_payload)
        image_b64 = _extract_gemini_image_b64(data)
        if image_b64:
            out.write_bytes(base64.b64decode(image_b64))
            return
        errors.append("generateContent: no image in response")
    except Exception as e:
        errors.append(f"generateContent: {e}")

    # Fallback: interactions API
    int_payload = {
        "model": model,
        "input": prompt,
        "response_format": {
            "type": "image",
            "aspect_ratio": aspect_ratio,
            "image_size": "1K",
        },
    }
    try:
        data = _gemini_post(
            api_key,
            "https://generativelanguage.googleapis.com/v1beta/interactions",
            int_payload,
        )
        image_b64 = _extract_gemini_image_b64(data)
        if image_b64:
            out.write_bytes(base64.b64decode(image_b64))
            return
        errors.append("interactions: no image in response")
    except Exception as e:
        errors.append(f"interactions: {e}")

    raise RuntimeError("; ".join(errors))


def _gemini_post(api_key: str, url: str, payload: dict, retries: int = 3) -> dict:
    body = json.dumps(payload).encode("utf-8")
    last_err = ""
    for attempt in range(retries):
        req = urllib.request.Request(
            url,
            data=body,
            headers={
                "Content-Type": "application/json",
                "x-goog-api-key": api_key,
            },
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=180) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            detail = e.read().decode("utf-8", errors="replace")
            last_err = f"HTTP {e.code}: {detail}"
            if e.code == 429 and attempt < retries - 1:
                wait = 35 * (attempt + 1)
                print(f"  rate limited, retry in {wait}s...")
                time.sleep(wait)
                continue
            raise RuntimeError(last_err) from e
    raise RuntimeError(last_err)


def _extract_gemini_image_b64(data: dict) -> str | None:
    output_image = data.get("output_image")
    if isinstance(output_image, dict) and output_image.get("data"):
        return output_image["data"]

    for step in data.get("steps", []):
        if step.get("type") != "model_output":
            continue
        for block in step.get("content", []):
            if block.get("type") == "image" and block.get("data"):
                return block["data"]

    for candidate in data.get("candidates", []):
        for part in candidate.get("content", {}).get("parts", []):
            inline = part.get("inlineData") or part.get("inline_data")
            if isinstance(inline, dict) and inline.get("data"):
                return inline["data"]

    return None


def load_log() -> dict:
    if LOG_FILE.exists():
        return json.loads(LOG_FILE.read_text(encoding="utf-8"))
    return {"started": None, "completed": [], "failed": [], "skipped": []}


def save_log(log: dict) -> None:
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    LOG_FILE.write_text(json.dumps(log, indent=2), encoding="utf-8")


def main() -> None:
    load_dotenv()

    parser = argparse.ArgumentParser(description="Bulk generate YatraNexus images")
    parser.add_argument("--provider", choices=["openai", "gemini"], default="gemini")
    parser.add_argument("--type", choices=["service", "package"], help="Filter by type")
    parser.add_argument("--id", help="Single prompt id")
    parser.add_argument("--v1-only", action="store_true", help="Packages: only variation 1")
    parser.add_argument(
        "--site-essentials",
        action="store_true",
        help="8 service hero-desktop + 117 package v1 (125 images)",
    )
    parser.add_argument("--limit", type=int, default=0, help="Max images to generate")
    parser.add_argument("--dry-run", action="store_true", help="List prompts only")
    parser.add_argument(
        "--model",
        default="",
        help="openai: gpt-image-1 | dall-e-3; gemini: gemini-2.5-flash-image | gemini-3.1-flash-image",
    )
    parser.add_argument("--delay", type=float, default=2.0, help="Seconds between requests")
    parser.add_argument("--force", action="store_true", help="Regenerate even if file exists")
    args = parser.parse_args()

    if args.provider == "gemini" and not args.model:
        args.model = "gemini-2.5-flash-image"
    elif args.provider == "openai" and not args.model:
        args.model = "gpt-image-1"

    if not PROMPTS_FILE.exists():
        raise SystemExit("Run first: npm run generate-image-prompts")

    data = json.loads(PROMPTS_FILE.read_text(encoding="utf-8"))
    items: list[dict] = []

    if args.id:
        items = [p for p in data["services"] + data["packages"] if p["id"] == args.id]
    elif args.site_essentials:
        items = [
            p for p in data["services"] if p["id"].endswith("-hero-desktop")
        ] + [p for p in data["packages"] if p["variation"] == 1]
    else:
        if args.type in (None, "service"):
            items.extend(data["services"])
        if args.type in (None, "package"):
            pkgs = data["packages"]
            if args.v1_only:
                pkgs = [p for p in pkgs if p["variation"] == 1]
            items.extend(pkgs)

    if args.limit:
        items = items[: args.limit]

    print(f"Provider: {args.provider} | Model: {args.model}")
    print(f"Queued: {len(items)} images")
    if args.provider == "openai":
        est_cost_low = len(items) * 0.04
        est_cost_high = len(items) * 0.12
        print(f"Estimated cost: ${est_cost_low:.0f}–${est_cost_high:.0f} USD (varies by model)")
    else:
        print("Gemini free tier: ~500 images/day (check https://ai.google.dev/gemini-api/docs/rate-limits)")

    if args.dry_run:
        for p in items[:25]:
            print(f"  {p['id']} -> {p['saveAs']}")
        if len(items) > 25:
            print(f"  ... and {len(items) - 25} more")
        return

    openai_client = None
    gemini_key = None

    if args.provider == "openai":
        api_key = os.environ.get("OPENAI_API_KEY")
        if not api_key:
            raise SystemExit(
                "OPENAI_API_KEY not found.\n"
                "Add to .env:  OPENAI_API_KEY=sk-your-key-here"
            )
        try:
            from openai import OpenAI
        except ImportError:
            raise SystemExit("Install: pip install openai")
        openai_client = OpenAI(api_key=api_key)
    else:
        gemini_key = os.environ.get("GEMINI_API_KEY")
        if not gemini_key:
            raise SystemExit(
                "GEMINI_API_KEY not found.\n"
                "Add to .env:  GEMINI_API_KEY=your-key-here\n"
                "Get a key: https://aistudio.google.com/apikey"
            )

    log = load_log()
    if not log["started"]:
        log["started"] = datetime.now(timezone.utc).isoformat()

    ok = skip = fail = 0

    for i, item in enumerate(items, 1):
        out = slug_path(item["saveAs"])
        out.parent.mkdir(parents=True, exist_ok=True)

        if out.exists() and not args.force:
            print(f"[{i}/{len(items)}] skip (exists): {out.name}")
            if item["id"] not in log["skipped"]:
                log["skipped"].append(item["id"])
            skip += 1
            continue

        print(f"[{i}/{len(items)}] generating: {item['id']}")

        try:
            if args.provider == "openai":
                size = pick_size(item["id"], args.model)
                save_image_openai(openai_client, args.model, item["prompt"], size, out)
            else:
                save_image_gemini(gemini_key, args.model, item["prompt"], item["id"], out)
            print(f"  saved: {out}")
            log["completed"].append(
                {
                    "id": item["id"],
                    "path": item["saveAs"],
                    "provider": args.provider,
                    "model": args.model,
                    "at": datetime.now(timezone.utc).isoformat(),
                }
            )
            ok += 1
        except Exception as e:
            print(f"  ERROR: {e}")
            log["failed"].append({"id": item["id"], "error": str(e), "provider": args.provider})
            fail += 1
            err = str(e).lower()
            if any(x in err for x in ("billing", "quota", "rate", "limit", "429")):
                print("Stopping — check Gemini/OpenAI quota and rate limits")
                break

        save_log(log)
        time.sleep(args.delay)

    print(f"\nDone. generated={ok} skipped={skip} failed={fail}")
    print(f"Log: {LOG_FILE}")


if __name__ == "__main__":
    main()
