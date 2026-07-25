import { resolveCmsIcon } from "@/lib/cms-icons";
import { BadgeCheck, Headphones, ShieldCheck, Sparkles } from "lucide-react";
import type { PageFeatureItem } from "@/lib/page-content";

const FALLBACK_ITEMS: PageFeatureItem[] = [
  { icon: "BadgeCheck", title: "Best Prices", detail: "Guaranteed" },
  { icon: "Headphones", title: "24/7 Customer", detail: "Support" },
  { icon: "ShieldCheck", title: "Secure Payments", detail: "100% Safe" },
  { icon: "Sparkles", title: "Hassle-Free", detail: "Experience" },
];

const DEFAULT_TRUST_PILLS = [
  "Domestic & International Travel",
  "Personalized Planning",
  "Trusted Travel Partners",
  "Dedicated Customer Support",
];

const ICON_FALLBACKS = [BadgeCheck, Headphones, ShieldCheck, Sparkles];

/** Normalize CMS or fallback titles into a top + bottom trust line. */
function splitTrustLabel(title: string, detail?: string) {
  if (detail?.trim()) {
    return { top: title.trim(), bottom: detail.trim() };
  }

  const known: Record<string, { top: string; bottom: string }> = {
    "Best Prices Guaranteed": { top: "Best Prices", bottom: "Guaranteed" },
    "Best Prices\nGuaranteed": { top: "Best Prices", bottom: "Guaranteed" },
    "24/7 Customer Support": { top: "24/7 Customer", bottom: "Support" },
    "24/7 Customer\nSupport": { top: "24/7 Customer", bottom: "Support" },
    "Secure Payments 100% Safe": { top: "Secure Payments", bottom: "100% Safe" },
    "Secure Payments\n100% Safe": { top: "Secure Payments", bottom: "100% Safe" },
    "Hassle-Free Experience": { top: "Hassle-Free", bottom: "Experience" },
    "Hassle-Free\nExperience": { top: "Hassle-Free", bottom: "Experience" },
  };

  const key = title.replace(/\r/g, "").trim();
  if (known[key]) return known[key];

  const spaced = key.replace(/\s+/g, " ");
  if (known[spaced]) return known[spaced];

  const lines = key.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length >= 2) return { top: lines[0], bottom: lines.slice(1).join(" ") };

  return { top: spaced, bottom: "" };
}

type Props = {
  items?: PageFeatureItem[];
  pills?: string[];
};

export function HomeTrustRibbon({ items, pills }: Props) {
  const ribbonItems = items && items.length > 0 ? items.slice(0, 4) : FALLBACK_ITEMS;
  const trustPills = (pills && pills.length > 0 ? pills : DEFAULT_TRUST_PILLS)
    .map((p) => p.trim().replace(/\.+$/, ""))
    .filter(Boolean)
    .slice(0, 4);

  return (
    <section className="home-trust-ribbon" aria-label="Travel booking guarantees">
      <div className="home-trust-ribbon__panel">
        <ul className="home-trust-ribbon__grid">
          {ribbonItems.map((item, index) => {
            const Icon = resolveCmsIcon(item.icon) ?? ICON_FALLBACKS[index % ICON_FALLBACKS.length];
            const { top, bottom } = splitTrustLabel(item.title, item.detail);
            return (
              <li key={`${top}-${bottom}-${index}`} className="home-trust-ribbon__item">
                <span className="home-trust-ribbon__icon" aria-hidden="true">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="home-trust-ribbon__copy">
                  <span className="home-trust-ribbon__title">{top}</span>
                  {bottom ? <span className="home-trust-ribbon__detail">{bottom}</span> : null}
                </span>
              </li>
            );
          })}
        </ul>
        {trustPills.length > 0 ? (
          <ul className="home-trust-ribbon__pills" aria-label="Trust highlights">
            {trustPills.map((pill) => (
              <li key={pill} className="home-trust-ribbon__pill">
                {pill}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
