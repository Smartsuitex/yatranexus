from pathlib import Path
import json
import re

seed_path = Path(r"d:\DB BackupNew\YatraNexus\src\lib\tour-package-seeds.ts")
text = seed_path.read_text(encoding="utf-8")
text = text.replace("export type Package = {", "export type SeedPackage = {", 1)
text = text.replace(
    "export const PACKAGE_SEEDS: Package[] = [",
    "export const PACKAGE_SEEDS: SeedPackage[] = [",
    1,
)
seed_path.write_text(text, encoding="utf-8")
print("seed types updated")

site = Path(r"d:\DB BackupNew\YatraNexus\src\lib\site-data.ts")
src = site.read_text(encoding="utf-8")

if "tour-package-seeds" not in src:
    src = src.replace(
        "export type Destination = {",
        'import { DESTINATION_SEEDS, PACKAGE_SEEDS } from "@/lib/tour-package-seeds";\n\nexport type Destination = {',
        1,
    )

GOA_LONG = (
    "Escape from the hustle and bustle of city life with our South Goa Serenity Escape, "
    "a thoughtfully designed holiday package that showcases the peaceful and picturesque side of Goa. "
    "Explore pristine beaches, charming Portuguese heritage sites, breathtaking viewpoints, and tranquil "
    "coastal villages that offer the perfect blend of relaxation and sightseeing. Spend your days soaking "
    "up the sun at the famous Palolem, Butterfly, Agonda, and Benaulim Beaches, admire the panoramic views "
    "from Cabo de Rama Fort, and discover Goa's rich cultural heritage with visits to the Basilica of Bom "
    "Jesus, Se Cathedral, and Dona Paula View Point. Whether you're planning a romantic honeymoon or a "
    "relaxing getaway, this package promises comfortable accommodation, delicious MAP meals, private "
    "transportation, and unforgettable memories along Goa's serene coastline."
)

NEW_DOMESTIC = """
const DESTINATION_META: Record<string, { region: string; imageId: string }> = {
  goa: { region: "West India", imageId: "photo-1512343879784-a960bf40e7f2" },
  kerala: { region: "South India", imageId: "photo-1602216056096-3b40cc0c9944" },
  rajasthan: { region: "North India", imageId: "photo-1599661046289-e31897846e41" },
  kashmir: { region: "North India", imageId: "photo-1578662996442-48f60103fc96" },
  himachal: { region: "North India", imageId: "photo-1626621341517-bbf3d9990a23" },
  uttarakhand: { region: "North India", imageId: "photo-1506905925346-21bda4d32df4" },
  ladakh: { region: "North India", imageId: "photo-1605649487212-47bdab064df7" },
  andaman: { region: "Andaman & Nicobar", imageId: "photo-1586500036706-41963de24d8b" },
  northeast: { region: "East India", imageId: "photo-1597074866923-dc0589150358" },
  "tamil-nadu": { region: "South India", imageId: "photo-1582510003544-4d00b7f74220" },
  "madhya-pradesh": { region: "Central India", imageId: "photo-1548013146-72479768bada" },
  gujarat: { region: "West India", imageId: "photo-1477587458883-47145ed94245" },
  sikkim: { region: "East India", imageId: "photo-1501785888041-af3ef285b470" },
  assam: { region: "East India", imageId: "photo-1597074866923-dc0589150358" },
  meghalaya: { region: "East India", imageId: "photo-1464822759023-fed622ff2c3b" },
  "arunachal-pradesh": { region: "East India", imageId: "photo-1506905925346-21bda4d32df4" },
  "uttar-pradesh": { region: "North India", imageId: "photo-1564507592333-c60657eea523" },
  lakshadweep: { region: "Lakshadweep", imageId: "photo-1507525428034-b723cf961d3e" },
  maharashtra: { region: "West India", imageId: "photo-1529253355930-ddbe423a2ac7" },
  odisha: { region: "East India", imageId: "photo-1582510003544-4d00b7f74220" },
  "west-bengal": { region: "East India", imageId: "photo-1558431382-27e303142255" },
};

const DEST_ORDER = [
  "goa",
  "kerala",
  "rajasthan",
  "kashmir",
  "himachal",
  "uttarakhand",
  "ladakh",
  "andaman",
  "lakshadweep",
  "tamil-nadu",
  "madhya-pradesh",
  "gujarat",
  "maharashtra",
  "uttar-pradesh",
  "odisha",
  "west-bengal",
  "assam",
  "meghalaya",
  "sikkim",
  "arunachal-pradesh",
  "northeast",
];

export const DOMESTIC_STATES: Destination[] = DEST_ORDER.filter((slug) => DESTINATION_SEEDS[slug]).map(
  (slug) => {
    const seed = DESTINATION_SEEDS[slug];
    const meta = DESTINATION_META[slug] ?? {
      region: "India",
      imageId: "photo-1488646953014-85cb44e25828",
    };
    return {
      slug: seed.slug,
      name: seed.name,
      region: meta.region,
      image: img(meta.imageId),
      blurb: seed.blurb,
      highlights: seed.highlights,
    };
  },
);
""".strip()

pattern_dom = re.compile(
    r"export const DOMESTIC_STATES: Destination\[\] = \[[\s\S]*?\];\n\nexport const INTERNATIONAL_COUNTRIES",
    re.M,
)
if not pattern_dom.search(src):
    raise SystemExit("DOMESTIC_STATES block not found")
src = pattern_dom.sub(NEW_DOMESTIC + "\n\nexport const INTERNATIONAL_COUNTRIES", src)

intl_match = re.search(
    r'(  \{\s*\n    slug: "dubai-city-desert-5d4n"[\s\S]*?destination: "Bali, Indonesia"[\s\S]*?\n  \},)\n\];',
    src,
)
intl_block = intl_match.group(1) if intl_match else ""
if not intl_block:
    print("WARN: international packages not captured; keeping empty intl append")

NEW_PACKAGES = f"""
const DESTINATION_IMAGE_BY_NAME: Record<string, string> = Object.fromEntries(
  DOMESTIC_STATES.map((d) => [d.name, d.image]),
);

const GOA_SERENITY_OVERVIEW = {json.dumps(GOA_LONG)};

function withPackageImage<T extends {{ destination: string; image: string; slug: string; overview?: string }}>(
  pkg: T,
): T {{
  const image =
    pkg.image ||
    DESTINATION_IMAGE_BY_NAME[pkg.destination] ||
    img("photo-1488646953014-85cb44e25828", 1200);
  const overview =
    pkg.slug === "south-goa-serenity-escape-4d3n" || pkg.slug === "goa-beach-bliss-4d3n"
      ? GOA_SERENITY_OVERVIEW
      : pkg.overview;
  return {{ ...pkg, image, overview }};
}}

const SOUTH_GOA = PACKAGE_SEEDS.find((p) => p.slug === "south-goa-serenity-escape-4d3n");

export const PACKAGES: Package[] = [
  ...PACKAGE_SEEDS.map((pkg) => withPackageImage({{ ...pkg }})),
  ...(SOUTH_GOA
    ? [withPackageImage({{ ...SOUTH_GOA, slug: "goa-beach-bliss-4d3n" }})]
    : []),
{intl_block}
];
""".strip()

pattern_pkg = re.compile(
    r"export const PACKAGES: Package\[\] = \[[\s\S]*?\];\n\nexport const VISA_COUNTRIES",
    re.M,
)
if not pattern_pkg.search(src):
    raise SystemExit("PACKAGES block not found")
src = pattern_pkg.sub(NEW_PACKAGES + "\n\nexport const VISA_COUNTRIES", src)

site.write_text(src, encoding="utf-8")
print("site-data updated")
print("has meta", "DESTINATION_META" in src)
print("has seeds map", "PACKAGE_SEEDS.map" in src)
print("has import", "tour-package-seeds" in src)
print("intl lines", len(intl_block.splitlines()))
