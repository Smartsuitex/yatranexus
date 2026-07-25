import { GripVertical, Plus, Trash2 } from "lucide-react";
import { adminInputClass } from "@/components/admin/AdminPageHeader";
import type { SiteNavLink } from "@/lib/page-content";

/** Curated pages for header / footer link selects. */
export const SITE_PAGE_OPTIONS: {
  key: string;
  label: string;
  to?: string;
  href?: string;
  params?: Record<string, string>;
}[] = [
  { key: "/", label: "Home", to: "/" },
  { key: "/corporate", label: "Corporate Travel", to: "/corporate" },
  { key: "/services", label: "All services", to: "/services" },
  { key: "/services/cabs", label: "Outstation Cabs", to: "/services/cabs" },
  { key: "/services/flights", label: "Flight Booking", to: "/services/flights" },
  { key: "/services/hotels", label: "Hotel Booking", to: "/services/hotels" },
  { key: "/holiday-packages", label: "Holiday Packages", to: "/holiday-packages" },
  {
    key: "/holiday-packages/domestic",
    label: "Domestic Tours",
    to: "/holiday-packages/domestic",
  },
  {
    key: "/holiday-packages/international",
    label: "International Tours",
    to: "/holiday-packages/international",
  },
  {
    key: "tour:honeymoon",
    label: "Honeymoon Packages",
    to: "/holiday-packages/tour/$type",
    params: { type: "honeymoon" },
  },
  {
    key: "tour:adventure",
    label: "Adventure Tours",
    to: "/holiday-packages/tour/$type",
    params: { type: "adventure" },
  },
  {
    key: "tour:family",
    label: "Family Tours",
    to: "/holiday-packages/tour/$type",
    params: { type: "family" },
  },
  { key: "/services/visa", label: "Visa Services", to: "/services/visa" },
  { key: "/services/insurance", label: "Travel Insurance", to: "/services/insurance" },
  { key: "/services/forex", label: "Forex Card", to: "/services/forex" },
  { key: "/about", label: "About Us", to: "/about" },
  { key: "/contact", label: "Contact", to: "/contact" },
  { key: "/blog", label: "Blog", to: "/blog" },
  { key: "/faq", label: "FAQs", to: "/faq" },
  { key: "/gallery", label: "Gallery", to: "/gallery" },
  { key: "/testimonials", label: "Testimonials", to: "/testimonials" },
  { key: "/privacy-policy", label: "Privacy Policy", to: "/privacy-policy" },
  { key: "/terms", label: "Terms & Conditions", to: "/terms" },
  { key: "/sitemap.xml", label: "Sitemap", href: "/sitemap.xml" },
  { key: "__custom__", label: "Custom URL…" },
];

function optionKeyForLink(link: SiteNavLink): string {
  if (link.href?.trim()) {
    const byHref = SITE_PAGE_OPTIONS.find((o) => o.href === link.href.trim());
    return byHref?.key ?? "__custom__";
  }
  if (link.to === "/holiday-packages/tour/$type" && link.params?.type) {
    return `tour:${link.params.type}`;
  }
  if (link.to) {
    const byTo = SITE_PAGE_OPTIONS.find((o) => o.to === link.to && !o.params);
    return byTo?.key ?? "__custom__";
  }
  return "__custom__";
}

function linkFromOption(
  key: string,
  label: string,
  customUrl: string,
): SiteNavLink {
  if (key === "__custom__") {
    const url = customUrl.trim();
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) {
      if (url.startsWith("http")) return { label, href: url };
      return { label, to: url };
    }
    return { label, href: url || "/" };
  }
  const opt = SITE_PAGE_OPTIONS.find((o) => o.key === key);
  if (!opt) return { label, to: "/" };
  if (opt.href) return { label, href: opt.href };
  return {
    label,
    to: opt.to,
    ...(opt.params ? { params: opt.params } : {}),
  };
}

function customUrlForLink(link: SiteNavLink): string {
  if (link.href) return link.href;
  if (link.to && optionKeyForLink(link) === "__custom__") return link.to;
  return "";
}

type Props = {
  label: string;
  hint?: string;
  value: SiteNavLink[];
  onChange: (links: SiteNavLink[]) => void;
};

export function AdminNavLinksEditor({ label, hint, value, onChange }: Props) {
  function updateAt(index: number, next: SiteNavLink) {
    onChange(value.map((item, i) => (i === index ? next : item)));
  }

  function removeAt(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function addLink() {
    onChange([...value, { label: "New link", to: "/" }]);
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    const [row] = next.splice(index, 1);
    next.splice(target, 0, row!);
    onChange(next);
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {hint ? <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p> : null}
      </div>

      {value.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border bg-muted/30 px-4 py-5 text-center text-sm text-muted-foreground">
          No links yet. Click “Add link” to create one.
        </p>
      ) : null}

      <div className="space-y-2">
        {value.map((item, index) => {
          const pageKey = optionKeyForLink(item);
          const isCustom = pageKey === "__custom__";
          return (
            <div
              key={`nav-${index}-${item.label}`}
              className="rounded-xl border border-border bg-muted/15 p-3"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                  <GripVertical className="h-3.5 w-3.5 opacity-50" aria-hidden />
                  Link {index + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-40"
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === value.length - 1}
                    className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-40"
                  >
                    Down
                  </button>
                  <button
                    type="button"
                    onClick={() => removeAt(index)}
                    className="rounded-md p-1.5 text-red-600 hover:bg-red-50"
                    aria-label={`Remove link ${index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <label className="text-[11px] font-medium text-muted-foreground">
                    Display label
                  </label>
                  <input
                    value={item.label}
                    onChange={(e) => {
                      const labelValue = e.target.value;
                      updateAt(index, { ...item, label: labelValue });
                    }}
                    placeholder="e.g. About Us"
                    className={`${adminInputClass} mt-1`}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-muted-foreground">
                    Page / destination
                  </label>
                  <select
                    value={pageKey}
                    onChange={(e) => {
                      const key = e.target.value;
                      const next = linkFromOption(
                        key,
                        item.label,
                        customUrlForLink(item) || "/",
                      );
                      // Prefer option’s friendly label when switching from New link / empty
                      if (
                        key !== "__custom__" &&
                        (!item.label.trim() || item.label === "New link")
                      ) {
                        const opt = SITE_PAGE_OPTIONS.find((o) => o.key === key);
                        if (opt) next.label = opt.label;
                      }
                      updateAt(index, next);
                    }}
                    className={`${adminInputClass} mt-1`}
                  >
                    {SITE_PAGE_OPTIONS.map((opt) => (
                      <option key={opt.key} value={opt.key}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {isCustom ? (
                <div className="mt-2">
                  <label className="text-[11px] font-medium text-muted-foreground">
                    Custom URL
                  </label>
                  <input
                    value={customUrlForLink(item)}
                    onChange={(e) => {
                      const url = e.target.value;
                      updateAt(
                        index,
                        linkFromOption("__custom__", item.label, url),
                      );
                    }}
                    placeholder="/path or https://…"
                    className={`${adminInputClass} mt-1`}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={addLink}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted/50"
      >
        <Plus className="h-4 w-4" />
        Add link
      </button>
    </div>
  );
}

export function cleanNavLinksForSave(links: SiteNavLink[]): SiteNavLink[] {
  return links
    .filter((l) => l.label.trim() && (l.to?.trim() || l.href?.trim()))
    .map((l) => {
      const cleaned: SiteNavLink = { label: l.label.trim() };
      if (l.href?.trim()) cleaned.href = l.href.trim();
      else if (l.to?.trim()) cleaned.to = l.to.trim();
      if (l.params && Object.keys(l.params).length > 0) cleaned.params = l.params;
      return cleaned;
    });
}
