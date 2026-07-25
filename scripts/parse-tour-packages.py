#!/usr/bin/env python3
"""Parse tour-package .txt extracts into structured JSON + TypeScript seed."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

INPUT_DIR = Path(r"d:\DB BackupNew\YatraNexus\tmp-tour-packages")
OUT_JSON = INPUT_DIR / "parsed-packages.json"
OUT_TS = INPUT_DIR / "packages-seed.ts"

# Prefer these files; skip duplicates / combined / non-mapped states
SKIP_FILES = {
    "Odisha_Website_Package_1_docx.txt",
    "Odisha_-_West_Bengal__Website_Package_docx.txt",
    "Document_4_docx.txt",  # Karnataka — not in destination map
}

DESTINATION_MAP: dict[str, dict[str, str]] = {
    "goa": {"slug": "goa", "name": "Goa"},
    "kerala": {"slug": "kerala", "name": "Kerala"},
    "keralam": {"slug": "kerala", "name": "Kerala"},
    "rajasthan": {"slug": "rajasthan", "name": "Rajasthan"},
    "kashmir": {"slug": "kashmir", "name": "Kashmir"},
    "jammu and kashmir": {"slug": "kashmir", "name": "Kashmir"},
    "jammu & kashmir": {"slug": "kashmir", "name": "Kashmir"},
    "himachal": {"slug": "himachal", "name": "Himachal Pradesh"},
    "himachal pradesh": {"slug": "himachal", "name": "Himachal Pradesh"},
    "uttarakhand": {"slug": "uttarakhand", "name": "Uttarakhand"},
    "ladakh": {"slug": "ladakh", "name": "Ladakh"},
    "andaman": {"slug": "andaman", "name": "Andaman Islands"},
    "andman": {"slug": "andaman", "name": "Andaman Islands"},
    "andaman islands": {"slug": "andaman", "name": "Andaman Islands"},
    "northeast": {"slug": "northeast", "name": "North East India"},
    "north east": {"slug": "northeast", "name": "North East India"},
    "north east explorer": {"slug": "northeast", "name": "North East India"},
    "north east india": {"slug": "northeast", "name": "North East India"},
    "tamil nadu": {"slug": "tamil-nadu", "name": "Tamil Nadu"},
    "tamil-nadu": {"slug": "tamil-nadu", "name": "Tamil Nadu"},
    "madhya pradesh": {"slug": "madhya-pradesh", "name": "Madhya Pradesh"},
    "gujarat": {"slug": "gujarat", "name": "Gujarat"},
    "sikkim": {"slug": "sikkim", "name": "Sikkim"},
    "assam": {"slug": "assam", "name": "Assam"},
    "meghalaya": {"slug": "meghalaya", "name": "Meghalaya"},
    "arunachal pradesh": {"slug": "arunachal-pradesh", "name": "Arunachal Pradesh"},
    "uttar pradesh": {"slug": "uttar-pradesh", "name": "Uttar Pradesh"},
    "lakshadweep": {"slug": "lakshadweep", "name": "Lakshadweep"},
    "maharashtra": {"slug": "maharashtra", "name": "Maharashtra"},
    "odisha": {"slug": "odisha", "name": "Odisha"},
    "west bengal": {"slug": "west-bengal", "name": "West Bengal"},
}

FILE_DEST_HINTS: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"goa", re.I), "goa"),
    (re.compile(r"keral", re.I), "kerala"),
    (re.compile(r"rajasthan", re.I), "rajasthan"),
    (re.compile(r"jammu|kashmir", re.I), "kashmir"),
    (re.compile(r"himachal", re.I), "himachal"),
    (re.compile(r"uttarakhand", re.I), "uttarakhand"),
    (re.compile(r"ladakh", re.I), "ladakh"),
    (re.compile(r"andman|andaman", re.I), "andaman"),
    (re.compile(r"north.?east", re.I), "northeast"),
    (re.compile(r"tamil", re.I), "tamil-nadu"),
    (re.compile(r"madhya", re.I), "madhya-pradesh"),
    (re.compile(r"gujarat", re.I), "gujarat"),
    (re.compile(r"sikkim", re.I), "sikkim"),
    (re.compile(r"assam", re.I), "assam"),
    (re.compile(r"meghalaya", re.I), "meghalaya"),
    (re.compile(r"arunachal", re.I), "arunachal-pradesh"),
    (re.compile(r"uttar.?pradesh", re.I), "uttar-pradesh"),
    (re.compile(r"lakshadweep", re.I), "lakshadweep"),
    (re.compile(r"maharashtra", re.I), "maharashtra"),
    (re.compile(r"odisha", re.I), "odisha"),
    (re.compile(r"west.?bengal", re.I), "west-bengal"),
]

TITLE_SUFFIX_RE = re.compile(
    r"\s*(?:Best\s*Seller|Featured\s*Package|Premium\s*Package|Premium|Featured|Trending)\s*$",
    re.I,
)
PACKAGE_START_RE = re.compile(r"(?:^|\s)Package\s*\d+", re.I)
DURATION_RE = re.compile(
    r"(?:Duration\s*:?\s*)?"
    r"(?:"
    r"(?P<n1>\d+)\s*Nights?\s*/\s*(?P<d1>\d+)\s*Days?"
    r"|"
    r"(?P<n2>\d+)\s*N\s*/\s*(?P<d2>\d+)\s*D"
    r"|"
    r"(?P<d3>\d+)\s*D\s*/\s*(?P<n3>\d+)\s*N"
    r"|"
    r"(?P<n4>\d+)\s*Nights?\s*(?:/\s*|\s+)(?P<d4>\d+)\s*Days?"
    r")",
    re.I,
)
PRICE_RE = re.compile(
    r"(?:Starting\s+From|Budget\s*:?\s*|Starting\s+Price)?\s*"
    r"[₹?]?\s*(?P<price>\d{1,3}(?:,\d{2,3})+|\d{4,})"
    r"(?:\s*/-)?",
    re.I,
)
DAY_LINE_RE = re.compile(
    r"^Day\s*(?P<day>\d+)\s*[-–—:]\s*(?P<rest>.+)$",
    re.I,
)

SECTION_STOPS = (
    "how to reach",
    "holiday packages",
    "explore our",
    "frequently asked",
    "package 1",
    "package includes",
)


def strip_leading_symbols(text: str) -> str:
    s = text.strip()
    # Drop leading non-ascii / bullet / punctuation runs
    while s:
        ch = s[0]
        if ch.isalnum() or ch in "\"'(":
            break
        # Keep if it's a normal ASCII letter start after stripping junk
        if ord(ch) < 128 and ch.isalpha():
            break
        if ord(ch) < 128 and ch.isdigit():
            break
        s = s[1:].lstrip()
    # Also strip common ascii bullets left
    s = re.sub(r"^[\?\*\-\•\●\○\◦\▪\▫►▶➔→✔✓★☆✦✧]+\s*", "", s)
    return s.strip()


def clean_highlight(line: str) -> str | None:
    s = strip_leading_symbols(line)
    if not s:
        return None
    low = s.lower()
    if low.startswith(("by air", "by train", "by road", "by sea", "inter-island")):
        return None
    if PACKAGE_START_RE.search(s):
        return None
    if len(s) < 2:
        return None
    return s


def clean_title(title: str) -> str:
    t = strip_leading_symbols(title)
    t = re.sub(r"[\U0001F300-\U0001FAFF\u2605\u2606\u2728\u2B50?]+", " ", t)
    t = re.sub(r"\s+", " ", t).strip()
    tag = r"(?:Best\s*Seller|Featured\s*Package|Premium\s*Package|Premium|Featured|Trending)"
    for _ in range(6):
        nt = re.sub(rf"\s*[\(\[]?{tag}[\)\]]?\s*$", "", t, flags=re.I)
        nt = nt.strip(" -:?")
        if nt == t:
            break
        t = nt
    t = re.sub(r"\s+", " ", t).strip(" -:?")
    return t


def kebab(text: str) -> str:
    s = text.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def package_slug(title: str, nights: int, days: int) -> str:
    base = kebab(title)
    return f"{base}-{days}d{nights}n"


def normalize_price(raw: str | None) -> str:
    if not raw:
        return ""
    digits = re.sub(r"[^\d]", "", raw)
    if not digits:
        return ""
    # format with commas Indian-ish: last 3 then pairs — keep simple Western thousands
    n = int(digits)
    return f"₹ {n:,}"


def resolve_destination(filename: str, text: str) -> dict[str, str] | None:
    # Prefer filename hints
    for pat, key in FILE_DEST_HINTS:
        if pat.search(filename):
            # northeast explorer before assam etc. — filename already specific
            info = DESTINATION_MAP.get(key) or DESTINATION_MAP.get(key.replace("-", " "))
            if info:
                return dict(info)
            # key may already be slug
            for v in DESTINATION_MAP.values():
                if v["slug"] == key:
                    return dict(v)

    # Content: "X State Home Page"
    m = re.search(r"^(.{2,80}?)\s+State\s+Home\s+Page", text, re.I | re.M)
    if m:
        name = strip_leading_symbols(m.group(1)).lower()
        name = re.sub(r"^[\?\*\W]+", "", name).strip()
        for key, info in DESTINATION_MAP.items():
            if key in name or name in key:
                return dict(info)
        # try fuzzy: first significant words
        for key, info in DESTINATION_MAP.items():
            if key.split()[0] in name:
                return dict(info)

    # Holiday Packages header
    m = re.search(r"([\w\s&]+?)\s+Holiday\s+Packages", text[:500], re.I)
    if m:
        name = strip_leading_symbols(m.group(1)).lower()
        for key, info in DESTINATION_MAP.items():
            if key in name:
                return dict(info)

    return None


def next_nonempty(lines: list[str], start: int) -> tuple[int, str] | None:
    i = start
    while i < len(lines):
        if lines[i].strip():
            return i, lines[i].strip()
        i += 1
    return None


def find_line_index(lines: list[str], pred, start: int = 0) -> int:
    for i in range(start, len(lines)):
        if pred(lines[i]):
            return i
    return -1


def split_day_title_detail(rest: str) -> tuple[str, str]:
    """Split 'TitleDetail...' where detail starts with capital after title end."""
    rest = rest.strip()
    if not rest:
        return "", ""

    # If there's a clear sentence break mid-line
    # Heuristic: look for lowercase letter followed immediately by uppercase (concat)
    m = re.search(r"([a-z])([A-Z])", rest)
    if m:
        idx = m.start(2)
        title = rest[:idx].strip()
        detail = rest[idx:].strip()
        return title, detail

    # Title ending with period then detail
    m = re.match(r"^(.+?[.!?])\s+([A-Z].+)$", rest)
    if m:
        return m.group(1).strip(), m.group(2).strip()

    # Whole line is title only
    return rest, ""


def parse_itinerary(block: str) -> list[dict]:
    items: list[dict] = []
    lines = block.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        # Unstick "journey.Package Includes"
        line = re.sub(r"(Package\s+Includes.*)$", "", line, flags=re.I).strip()
        m = DAY_LINE_RE.match(line)
        if m:
            day = int(m.group("day"))
            title, detail = split_day_title_detail(m.group("rest"))
            # Collect following non-Day lines as detail continuation
            j = i + 1
            extras: list[str] = []
            while j < len(lines):
                nxt = lines[j].strip()
                if not nxt:
                    j += 1
                    continue
                if DAY_LINE_RE.match(nxt) or PACKAGE_START_RE.search(nxt):
                    break
                if re.match(r"^Package\s+Includes", nxt, re.I):
                    break
                extras.append(strip_leading_symbols(nxt))
                j += 1
            if extras:
                extra_text = " ".join(extras)
                detail = f"{detail} {extra_text}".strip() if detail else extra_text
            items.append({"day": day, "title": title, "detail": detail})
            i = j
            continue
        i += 1
    return items


def extract_section(text: str, start_pat: str, end_pats: list[str]) -> str:
    m = re.search(start_pat, text, re.I)
    if not m:
        return ""
    rest = text[m.end() :]
    end_idx = len(rest)
    for ep in end_pats:
        em = re.search(ep, rest, re.I)
        if em and em.start() < end_idx:
            end_idx = em.start()
    return rest[:end_idx].strip()


def parse_package_block(block: str) -> dict | None:
    # Title from first line
    first = block.splitlines()[0] if block.strip() else ""
    # Package N - Title / Package N: Title
    tm = re.match(
        r"^(?:.*?)?Package\s*\d+\s*[-–—:]\s*(.+)$",
        first.strip(),
        re.I,
    )
    if not tm:
        # maybe title on same line without dash after number glued
        tm = re.match(r"^(?:.*?)?Package\s*\d+\s+(.+)$", first.strip(), re.I)
    title = clean_title(tm.group(1) if tm else first)
    if not title or title.lower().startswith("package"):
        return None

    nights, days = 0, 0
    dm = DURATION_RE.search(block)
    if dm:
        if dm.group("n1"):
            nights, days = int(dm.group("n1")), int(dm.group("d1"))
        elif dm.group("n2"):
            nights, days = int(dm.group("n2")), int(dm.group("d2"))
        elif dm.group("n3"):
            nights, days = int(dm.group("n3")), int(dm.group("d3"))
        elif dm.group("n4"):
            nights, days = int(dm.group("n4")), int(dm.group("d4"))

    from_price = ""
    # Prefer Starting From / Budget lines
    for line in block.splitlines():
        if re.search(r"starting\s+from|budget|starting\s+price", line, re.I) or "₹" in line or "?" in line:
            pm = re.search(
                r"[₹?]?\s*(\d{1,3}(?:,\d{2,3})+|\d{4,6})",
                line,
            )
            if pm:
                from_price = normalize_price(pm.group(1))
                break
    if not from_price:
        pm = re.search(r"[₹?]?\s*(\d{1,3}(?:,\d{2,3})+|\d{4,6})\s*/-", block)
        if pm:
            from_price = normalize_price(pm.group(1))

    overview = extract_section(
        block,
        r"^Overview\s*$|^Overview\s+",
        [r"^Package\s+Highlights", r"^Day[- ]?wise", r"^Day\s+Wise", r"^Package\s+Includes"],
    )
    # If Overview glued: OverviewText...
    if not overview:
        om = re.search(r"Overview\s*(.+?)(?=Package\s+Highlights|Day[- ]?wise|Day\s+Wise|Package\s+Includes)", block, re.I | re.S)
        if om:
            overview = om.group(1).strip()
    overview = re.sub(r"\s+", " ", overview).strip()

    hl_block = extract_section(
        block,
        r"Package\s+Highlights\s*",
        [r"Day[- ]?wise\s+Itinerary", r"Day\s+Wise\s+Itinerary", r"^Day\s*\d+", r"Package\s+Includes"],
    )
    highlights: list[str] = []
    for line in hl_block.splitlines():
        c = clean_highlight(line)
        if c and not re.match(r"^(day[- ]?wise|package)", c, re.I):
            highlights.append(c)

    it_block = extract_section(
        block,
        r"Day[- ]?wise\s+Itinerary|Day\s+Wise\s+Itinerary",
        [r"Package\s+Includes", r"^Package\s*\d+"],
    )
    if not it_block:
        # Days may start without header
        dm2 = re.search(r"(Day\s*1\s*[-–—:].+?)(?=Package\s+Includes|$)", block, re.I | re.S)
        if dm2:
            it_block = dm2.group(1)
    itinerary = parse_itinerary(it_block)

    inc_block = extract_section(
        block,
        r"Package\s+Includes\s*",
        [r"^Package\s*\d+", r"\Z"],
    )
    inclusions: list[str] = []
    for line in inc_block.splitlines():
        c = clean_highlight(line)
        if c and not PACKAGE_START_RE.search(c):
            # stop if we hit another package glued
            if re.search(r"Package\s*\d+", c, re.I):
                break
            inclusions.append(c)

    return {
        "title": title,
        "nights": nights,
        "days": days,
        "fromPrice": from_price,
        "overview": overview,
        "highlights": highlights,
        "itinerary": itinerary,
        "inclusions": inclusions,
    }


def split_packages(text: str) -> list[str]:
    """Split text into package blocks starting at Package N."""
    # Normalize glued "PriceOverview" etc. lightly by inserting newlines before Package N
    text2 = re.sub(r"(?<!\n)(?=Package\s*\d+)", "\n", text)
    text2 = re.sub(r"(Package\s+Includes[^\n]*)(?=Package\s*\d+)", r"\1\n", text2)

    indices: list[int] = []
    for m in re.finditer(r"(?:^|\n)\s*(?:[^\n\w]*)?Package\s*\d+\s*[-–—:]", text2, re.I):
        # start of Package keyword
        start = m.start()
        # find Package within match
        sub = re.search(r"Package\s*\d+", text2[m.start() : m.end() + 80], re.I)
        if sub:
            indices.append(m.start() + sub.start())
        else:
            indices.append(m.start())

    # Fallback: Package N without dash
    if not indices:
        for m in re.finditer(r"(?:^|\n)\s*(?:[^\n\w]*)?Package\s*\d+\b", text2, re.I):
            sub = re.search(r"Package\s*\d+", text2[m.start() : m.end() + 5], re.I)
            indices.append(m.start() + (sub.start() if sub else 0))

    if not indices:
        return []

    # Dedupe close indices
    cleaned: list[int] = []
    for idx in sorted(set(indices)):
        if cleaned and idx - cleaned[-1] < 5:
            continue
        cleaned.append(idx)

    blocks: list[str] = []
    for i, start in enumerate(cleaned):
        end = cleaned[i + 1] if i + 1 < len(cleaned) else len(text2)
        blocks.append(text2[start:end].strip())
    return blocks


def parse_destination_meta(text: str) -> tuple[str, list[str]]:
    blurb = ""
    highlights: list[str] = []

    lines = text.splitlines()
    for i, line in enumerate(lines):
        if re.search(r"One[- ]Line\s+Description", line, re.I):
            nxt = next_nonempty(lines, i + 1)
            if nxt:
                blurb = nxt[1]
            break
    # Sometimes blurb is on same line after header (rare)
    if not blurb:
        m = re.search(r"One[- ]Line\s+Description\s+(.+)", text, re.I)
        if m:
            blurb = m.group(1).strip()

    # Top Experiences until How to Reach / Holiday Packages / Explore Our
    m = re.search(r"Top\s+Experiences\s*", text, re.I)
    if m:
        rest = text[m.end() :]
        end = len(rest)
        for ep in [
            r"How\s+to\s+Reach",
            r"Holiday\s+Packages",
            r"Explore\s+Our",
            r"Frequently\s+Asked",
            r"Package\s*\d+",
        ]:
            em = re.search(ep, rest, re.I)
            if em and em.start() < end:
                end = em.start()
        chunk = rest[:end]
        for line in chunk.splitlines():
            c = clean_highlight(line)
            if c:
                highlights.append(c)

    # Fallback blurb from first paragraph after title
    if not blurb:
        m = re.search(
            r"(?:Holiday\s+Packages|State\s+Home\s+Page)\s*\n+(.+)",
            text,
            re.I,
        )
        if m:
            candidate = m.group(1).splitlines()[0].strip()
            if candidate and not re.search(r"Top\s+Experiences", candidate, re.I):
                blurb = strip_leading_symbols(candidate)

    return blurb, highlights


def parse_file(path: Path) -> dict | None:
    text = path.read_text(encoding="utf-8", errors="replace")
    dest = resolve_destination(path.name, text)
    if not dest:
        print(f"SKIP (no destination map): {path.name}")
        return None

    blurb, dest_highlights = parse_destination_meta(text)
    blocks = split_packages(text)
    packages: list[dict] = []
    for block in blocks:
        pkg = parse_package_block(block)
        if pkg and pkg["title"]:
            packages.append(pkg)

    return {
        "source": path.name,
        "destination": {
            "slug": dest["slug"],
            "name": dest["name"],
            "blurb": blurb,
            "highlights": dest_highlights,
        },
        "packages": packages,
    }


def ts_string(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def emit_typescript(parsed: list[dict]) -> str:
    dest_seeds: dict[str, dict] = {}
    package_seeds: list[dict] = []
    seen_slugs: set[str] = set()

    for item in parsed:
        d = item["destination"]
        slug = d["slug"]
        if slug not in dest_seeds:
            dest_seeds[slug] = {
                "slug": slug,
                "name": d["name"],
                "blurb": d["blurb"],
                "highlights": d["highlights"],
            }
        for pkg in item["packages"]:
            pslug = package_slug(pkg["title"], pkg["nights"], pkg["days"])
            # uniquify
            base = pslug
            n = 2
            while pslug in seen_slugs:
                pslug = f"{base}-{n}"
                n += 1
            seen_slugs.add(pslug)
            package_seeds.append(
                {
                    "slug": pslug,
                    "title": pkg["title"],
                    "destination": d["name"],
                    "scope": "domestic",
                    "nights": pkg["nights"],
                    "days": pkg["days"],
                    "fromPrice": pkg["fromPrice"],
                    "image": "",
                    "overview": pkg["overview"],
                    "highlights": pkg["highlights"],
                    "inclusions": pkg["inclusions"],
                    "itinerary": pkg["itinerary"],
                }
            )

    lines: list[str] = []
    lines.append("/** Auto-generated by scripts/parse-tour-packages.py — do not edit by hand. */")
    lines.append("")
    lines.append("export type SeedItineraryDay = { day: number; title: string; detail: string };")
    lines.append("")
    lines.append("export type Package = {")
    lines.append("  slug: string;")
    lines.append("  title: string;")
    lines.append('  destination: string;')
    lines.append('  scope: "domestic" | "international";')
    lines.append("  nights: number;")
    lines.append("  days: number;")
    lines.append("  fromPrice: string;")
    lines.append("  image: string;")
    lines.append("  overview?: string;")
    lines.append("  highlights?: string[];")
    lines.append("  inclusions: string[];")
    lines.append("  itinerary: SeedItineraryDay[];")
    lines.append("};")
    lines.append("")
    lines.append("export type DestinationSeed = {")
    lines.append("  slug: string;")
    lines.append("  name: string;")
    lines.append("  blurb: string;")
    lines.append("  highlights: string[];")
    lines.append("};")
    lines.append("")
    lines.append("export const DESTINATION_SEEDS: Record<string, DestinationSeed> = {")
    for slug in sorted(dest_seeds.keys()):
        d = dest_seeds[slug]
        lines.append(f"  {ts_string(slug)}: {{")
        lines.append(f"    slug: {ts_string(d['slug'])},")
        lines.append(f"    name: {ts_string(d['name'])},")
        lines.append(f"    blurb: {ts_string(d['blurb'])},")
        lines.append("    highlights: [")
        for h in d["highlights"]:
            lines.append(f"      {ts_string(h)},")
        lines.append("    ],")
        lines.append("  },")
    lines.append("};")
    lines.append("")
    lines.append("export const PACKAGE_SEEDS: Package[] = [")
    for pkg in package_seeds:
        lines.append("  {")
        lines.append(f"    slug: {ts_string(pkg['slug'])},")
        lines.append(f"    title: {ts_string(pkg['title'])},")
        lines.append(f"    destination: {ts_string(pkg['destination'])},")
        lines.append(f"    scope: {ts_string(pkg['scope'])},")
        lines.append(f"    nights: {pkg['nights']},")
        lines.append(f"    days: {pkg['days']},")
        lines.append(f"    fromPrice: {ts_string(pkg['fromPrice'])},")
        lines.append(f"    image: {ts_string(pkg['image'])},")
        lines.append(f"    overview: {ts_string(pkg['overview'])},")
        lines.append("    highlights: [")
        for h in pkg["highlights"]:
            lines.append(f"      {ts_string(h)},")
        lines.append("    ],")
        lines.append("    inclusions: [")
        for inc in pkg["inclusions"]:
            lines.append(f"      {ts_string(inc)},")
        lines.append("    ],")
        lines.append("    itinerary: [")
        for day in pkg["itinerary"]:
            lines.append("      {")
            lines.append(f"        day: {day['day']},")
            lines.append(f"        title: {ts_string(day['title'])},")
            lines.append(f"        detail: {ts_string(day['detail'])},")
            lines.append("      },")
        lines.append("    ],")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    return "\n".join(lines)


def main() -> int:
    files = sorted(INPUT_DIR.glob("*.txt"))
    parsed: list[dict] = []
    skipped: list[str] = []

    for path in files:
        if path.name in SKIP_FILES:
            skipped.append(path.name)
            print(f"SKIP (configured): {path.name}")
            continue
        result = parse_file(path)
        if result:
            parsed.append(result)

    OUT_JSON.write_text(
        json.dumps(parsed, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    OUT_TS.write_text(emit_typescript(parsed), encoding="utf-8")

    # Summary
    print("\n=== Summary (packages per destination) ===")
    counts: dict[str, int] = {}
    for item in parsed:
        name = item["destination"]["name"]
        n = len(item["packages"])
        counts[name] = counts.get(name, 0) + n
        print(f"  {name}: {n} packages (from {item['source']})")
    print(f"\nTotal destinations: {len(parsed)}")
    print(f"Total packages: {sum(counts.values())}")
    print(f"Wrote {OUT_JSON}")
    print(f"Wrote {OUT_TS}")
    if skipped:
        print(f"Skipped files: {', '.join(skipped)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
