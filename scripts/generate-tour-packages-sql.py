#!/usr/bin/env python3
"""Generate Supabase SQL migrations from parsed tour package JSON."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PACKAGES_JSON = ROOT / "scripts" / "output" / "tour-packages.json"
DESTINATIONS_JSON = ROOT / "scripts" / "output" / "tour-destinations.json"
DESTINATIONS_SQL = ROOT / "supabase" / "migrations" / "20260628140000_seed_domestic_destinations.sql"
PACKAGES_SQL = ROOT / "supabase" / "migrations" / "20260628140100_seed_tour_packages_from_word.sql"

EXISTING_DESTINATION_SLUGS = {
    "goa",
    "kerala",
    "rajasthan",
    "kashmir",
    "himachal",
    "uttarakhand",
    "ladakh",
    "andaman",
    "northeast",
    "tamil-nadu",
}

DESTINATION_REGION: dict[str, str] = {
    "Karnataka": "South India",
    "Madhya Pradesh": "Central India",
    "Gujarat": "West India",
    "Uttar Pradesh": "North India",
    "Maharashtra": "West India",
    "Lakshadweep": "South India",
    "Odisha": "East India",
    "West Bengal": "East India",
}


def sql_str(value: str) -> str:
    return "'" + value.replace("'", "''") + "'"


def sql_text_array(values: list[str]) -> str:
    if not values:
        return "ARRAY[]::TEXT[]"
    items = ", ".join(sql_str(v) for v in values)
    return f"ARRAY[{items}]"


def sql_json(value: object) -> str:
    return sql_str(json.dumps(value, ensure_ascii=False)) + "::jsonb"


def generate_destinations_sql(destinations: list[dict]) -> str:
    lines = [
        "-- Seed domestic destinations required for Word tour package imports",
        "",
        "INSERT INTO public.destinations (slug, scope, name, region, image_url, blurb, highlights, sort_order)",
        "VALUES",
    ]
    rows: list[str] = []
    sort_order = 20
    for dest in destinations:
        slug = dest["slug"]
        if slug in EXISTING_DESTINATION_SLUGS:
            continue
        name = dest["name"]
        region = DESTINATION_REGION.get(name, "India")
        blurb = dest.get("blurb") or f"Holiday packages in {name}."
        highlights = dest.get("highlights") or []
        # Trim noisy merged highlights
        highlights = [h[:100] for h in highlights[:4]]
        image = dest["image_url"]
        rows.append(
            "  ({slug}, 'domestic', {name}, {region}, {image}, {blurb}, {highlights}, {sort})".format(
                slug=sql_str(slug),
                name=sql_str(name),
                region=sql_str(region),
                image=sql_str(image),
                blurb=sql_str(blurb),
                highlights=sql_text_array(highlights),
                sort=sort_order,
            )
        )
        sort_order += 1

    if not rows:
        return "-- No new destinations to seed\n"

    lines.append(",\n".join(rows))
    lines.append("ON CONFLICT (slug, scope) DO NOTHING;")
    lines.append("")
    return "\n".join(lines)


def generate_packages_sql(packages: list[dict]) -> str:
    lines = [
        "-- Seed tour packages parsed from Word source files",
        "",
        "INSERT INTO public.packages (",
        "  slug, title, destination, scope, nights, days, from_price, image_url,",
        "  inclusions, exclusions, itinerary, is_active, is_featured, sort_order",
        ")",
        "VALUES",
    ]
    rows: list[str] = []
    for pkg in packages:
        rows.append(
            "  ({slug}, {title}, {destination}, 'domestic', {nights}, {days}, {price}, {image}, "
            "{inclusions}, ARRAY[]::TEXT[], {itinerary}, true, false, {sort})".format(
                slug=sql_str(pkg["slug"]),
                title=sql_str(pkg["title"]),
                destination=sql_str(pkg["destination"]),
                nights=pkg["nights"],
                days=pkg["days"],
                price=sql_str(pkg["from_price"]),
                image=sql_str(pkg["image_url"]),
                inclusions=sql_text_array(pkg.get("inclusions") or []),
                itinerary=sql_json(pkg.get("itinerary") or []),
                sort=pkg["sort_order"],
            )
        )

    lines.append(",\n".join(rows))
    lines.append(
        "ON CONFLICT (slug) DO UPDATE SET\n"
        "  title = EXCLUDED.title,\n"
        "  destination = EXCLUDED.destination,\n"
        "  scope = EXCLUDED.scope,\n"
        "  nights = EXCLUDED.nights,\n"
        "  days = EXCLUDED.days,\n"
        "  from_price = EXCLUDED.from_price,\n"
        "  image_url = EXCLUDED.image_url,\n"
        "  inclusions = EXCLUDED.inclusions,\n"
        "  exclusions = EXCLUDED.exclusions,\n"
        "  itinerary = EXCLUDED.itinerary,\n"
        "  is_active = EXCLUDED.is_active,\n"
        "  is_featured = EXCLUDED.is_featured,\n"
        "  sort_order = EXCLUDED.sort_order,\n"
        "  updated_at = now();"
    )
    lines.append("")
    return "\n".join(lines)


def main() -> None:
    packages = json.loads(PACKAGES_JSON.read_text(encoding="utf-8"))
    destinations = json.loads(DESTINATIONS_JSON.read_text(encoding="utf-8"))

    DESTINATIONS_SQL.write_text(generate_destinations_sql(destinations), encoding="utf-8")
    PACKAGES_SQL.write_text(generate_packages_sql(packages), encoding="utf-8")

    print(f"Wrote {DESTINATIONS_SQL}")
    print(f"Wrote {PACKAGES_SQL} ({len(packages)} packages)")


if __name__ == "__main__":
    main()
