import { Plus, Trash2 } from "lucide-react";
import { AdminIconSelect } from "@/components/admin/AdminIconSelect";
import { AdminImageField } from "@/components/admin/AdminImageField";
import { AdminField, adminInputClass } from "@/components/admin/AdminPageHeader";
import { cabsCatalogDefaults } from "@/lib/cabs-page-data";
import type {
  PublicServiceContentBlocks,
  PublicServiceFeature,
  PublicServiceStep,
  PublicVisaCountry,
} from "@/lib/public-cms";

const ACCENT_OPTIONS = ["purple", "orange", "blue", "green"] as const;

export type ServiceContentForm = {
  heroTitle: string;
  sectionTitle: string;
  detailedSectionTitle: string;
  eyebrow: string;
  titleFirst: string;
  titleAccent: string;
  layout: PublicServiceContentBlocks["layout"] | "";
  features: PublicServiceFeature[];
  detailedServices: PublicServiceFeature[];
  heroBullets: string;
  ribbon: PublicServiceFeature[];
  whyChoose: PublicServiceFeature[];
  whyUs: PublicServiceFeature[];
  catalogItems: PublicServiceFeature[];
  catalogSectionTitle: string;
  catalogSectionLead: string;
  servicesLead: string;
  whyChooseLead: string;
  detailedLead: string;
  whyUsLead: string;
  proposalLead: string;
  whyChooseTitle: string;
  whyUsTitle: string;
  proposalTitle: string;
  partnershipCallout: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonLabel: string;
  heroBadgesText: string;
  trustItemsText: string;
  trustFooterText: string;
  proposalServiceOptions: string;
  proposalMonths: string;
  proposalRequirements: string;
  steps: PublicServiceStep[];
  visaCountries: Array<{
    country: string;
    type: string;
    processing: string;
    touristType: string;
    businessType: string;
    processingNote: string;
  }>;
};

const LAYOUT_OPTIONS: { value: ServiceContentForm["layout"]; label: string }[] = [
  { value: "", label: "Standard" },
  { value: "holiday", label: "Holiday Packages hub" },
  { value: "corporate", label: "Corporate & MICE page" },
  { value: "visa", label: "Visa (steps + country table)" },
  { value: "flights", label: "Flights" },
  { value: "hotels", label: "Hotels" },
  { value: "cabs", label: "Cabs" },
  { value: "insurance", label: "Insurance" },
  { value: "forex", label: "Forex" },
];

function mapFeature(f: Partial<PublicServiceFeature>): PublicServiceFeature {
  const accent = ACCENT_OPTIONS.includes(f.accent as (typeof ACCENT_OPTIONS)[number])
    ? (f.accent as PublicServiceFeature["accent"])
    : undefined;
  const points = Array.isArray(f.points)
    ? f.points.map((p) => String(p).trim()).filter(Boolean)
    : undefined;
  return {
    icon: String(f.icon ?? "Sparkles"),
    title: String(f.title ?? ""),
    detail: String(f.detail ?? ""),
    image: String(f.image ?? ""),
    accent,
    ...(points && points.length ? { points } : {}),
  };
}

export function emptyServiceContent(): ServiceContentForm {
  return {
    heroTitle: "",
    sectionTitle: "",
    detailedSectionTitle: "",
    eyebrow: "",
    titleFirst: "",
    titleAccent: "",
    layout: "",
    features: [],
    detailedServices: [],
    heroBullets: "",
    ribbon: [],
    whyChoose: [],
    whyUs: [],
    catalogItems: [],
    catalogSectionTitle: "",
    catalogSectionLead: "",
    servicesLead: "",
    whyChooseLead: "",
    detailedLead: "",
    whyUsLead: "",
    proposalLead: "",
    whyChooseTitle: "",
    whyUsTitle: "",
    proposalTitle: "",
    partnershipCallout: "",
    ctaTitle: "",
    ctaSubtitle: "",
    ctaButtonLabel: "",
    heroBadgesText: "",
    trustItemsText: "",
    trustFooterText: "",
    proposalServiceOptions: "",
    proposalMonths: "",
    proposalRequirements: "",
    steps: [],
    visaCountries: [],
  };
}

function featuresToLines(items: PublicServiceFeature[] | undefined): string {
  if (!items?.length) return "";
  return items.map((f) => [f.icon, f.title, f.detail].filter(Boolean).join(" | ")).join("\n");
}

function linesToFeatures(text: string): PublicServiceFeature[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [icon, title, ...rest] = line.split("|").map((p) => p.trim());
      return {
        icon: icon || "Sparkles",
        title: title || icon || "",
        detail: rest.join(" | "),
      };
    });
}

function mapVisaCountry(row: Partial<PublicVisaCountry>) {
  return {
    country: String(row.country ?? ""),
    type: String(row.type ?? ""),
    processing: String(row.processing ?? ""),
    touristType: String(row.touristType ?? ""),
    businessType: String(row.businessType ?? ""),
    processingNote: String(row.processingNote ?? ""),
  };
}

export function parseServiceContentJson(json: string): ServiceContentForm {
  try {
    const raw = JSON.parse(json || "{}") as PublicServiceContentBlocks;
    return {
      heroTitle: String(raw.heroTitle ?? ""),
      sectionTitle: String(raw.sectionTitle ?? ""),
      detailedSectionTitle: String(raw.detailedSectionTitle ?? ""),
      eyebrow: String(raw.eyebrow ?? ""),
      titleFirst: String(raw.titleFirst ?? ""),
      titleAccent: String(raw.titleAccent ?? ""),
      layout: raw.layout ?? "",
      features: Array.isArray(raw.features) ? raw.features.map(mapFeature) : [],
      detailedServices: Array.isArray(raw.detailedServices)
        ? raw.detailedServices.map(mapFeature)
        : [],
      heroBullets: Array.isArray(raw.heroBullets) ? raw.heroBullets.join("\n") : "",
      ribbon: Array.isArray(raw.ribbon) ? raw.ribbon.map(mapFeature) : [],
      whyChoose: Array.isArray(raw.whyChoose) ? raw.whyChoose.map(mapFeature) : [],
      whyUs: Array.isArray(raw.whyUs) ? raw.whyUs.map(mapFeature) : [],
      catalogItems: Array.isArray(raw.catalogItems)
        ? raw.catalogItems.map(mapFeature)
        : [],
      catalogSectionTitle: String(raw.catalogSectionTitle ?? ""),
      catalogSectionLead: String(raw.catalogSectionLead ?? ""),
      servicesLead: String(raw.servicesLead ?? ""),
      whyChooseLead: String(raw.whyChooseLead ?? ""),
      detailedLead: String(raw.detailedLead ?? ""),
      whyUsLead: String(raw.whyUsLead ?? ""),
      proposalLead: String(raw.proposalLead ?? ""),
      whyChooseTitle: String(raw.whyChooseTitle ?? ""),
      whyUsTitle: String(raw.whyUsTitle ?? ""),
      proposalTitle: String(raw.proposalTitle ?? ""),
      partnershipCallout: String(raw.partnershipCallout ?? ""),
      ctaTitle: String(raw.ctaTitle ?? ""),
      ctaSubtitle: String(raw.ctaSubtitle ?? ""),
      ctaButtonLabel: String(raw.ctaButtonLabel ?? ""),
      heroBadgesText: featuresToLines(raw.heroBadges),
      trustItemsText: featuresToLines(raw.trustItems),
      trustFooterText: featuresToLines(raw.trustFooter),
      proposalServiceOptions: Array.isArray(raw.proposalServiceOptions)
        ? raw.proposalServiceOptions.join("\n")
        : "",
      proposalMonths: Array.isArray(raw.proposalMonths) ? raw.proposalMonths.join("\n") : "",
      proposalRequirements: Array.isArray(raw.proposalRequirements)
        ? raw.proposalRequirements.join("\n")
        : "",
      steps: Array.isArray(raw.steps)
        ? raw.steps.map((s, index) => ({
            n: Number(s.n) || index + 1,
            title: String(s.title ?? ""),
            detail: String(s.detail ?? ""),
          }))
        : [],
      visaCountries: Array.isArray(raw.visaCountries)
        ? raw.visaCountries.map(mapVisaCountry)
        : [],
    };
  } catch {
    return emptyServiceContent();
  }
}

export function serviceContentToEditorJson(form: ServiceContentForm): string {
  return JSON.stringify(
    {
      heroTitle: form.heroTitle,
      sectionTitle: form.sectionTitle,
      detailedSectionTitle: form.detailedSectionTitle,
      eyebrow: form.eyebrow,
      titleFirst: form.titleFirst,
      titleAccent: form.titleAccent,
      ...(form.layout ? { layout: form.layout } : {}),
      features: form.features,
      detailedServices: form.detailedServices,
      heroBullets: form.heroBullets,
      ribbon: form.ribbon,
      whyChoose: form.whyChoose,
      whyUs: form.whyUs,
      catalogItems: form.catalogItems,
      catalogSectionTitle: form.catalogSectionTitle,
      catalogSectionLead: form.catalogSectionLead,
      servicesLead: form.servicesLead,
      whyChooseLead: form.whyChooseLead,
      detailedLead: form.detailedLead,
      whyUsLead: form.whyUsLead,
      proposalLead: form.proposalLead,
      whyChooseTitle: form.whyChooseTitle,
      whyUsTitle: form.whyUsTitle,
      proposalTitle: form.proposalTitle,
      partnershipCallout: form.partnershipCallout,
      ctaTitle: form.ctaTitle,
      ctaSubtitle: form.ctaSubtitle,
      ctaButtonLabel: form.ctaButtonLabel,
      heroBadgesText: form.heroBadgesText,
      trustItemsText: form.trustItemsText,
      trustFooterText: form.trustFooterText,
      proposalServiceOptions: form.proposalServiceOptions,
      proposalMonths: form.proposalMonths,
      proposalRequirements: form.proposalRequirements,
      steps: form.steps,
      visaCountries: form.visaCountries,
    },
    null,
    2,
  );
}

/** Strip empty rows before saving to the database. */
export function cleanServiceContentForSave(form: ServiceContentForm): PublicServiceContentBlocks {
  const blocks: PublicServiceContentBlocks = {};

  if (form.heroTitle.trim()) blocks.heroTitle = form.heroTitle.trim();
  if (form.sectionTitle.trim()) blocks.sectionTitle = form.sectionTitle.trim();
  if (form.detailedSectionTitle.trim()) {
    blocks.detailedSectionTitle = form.detailedSectionTitle.trim();
  }
  if (form.eyebrow.trim()) blocks.eyebrow = form.eyebrow.trim();
  if (form.titleFirst.trim()) blocks.titleFirst = form.titleFirst.trim();
  if (form.titleAccent.trim()) blocks.titleAccent = form.titleAccent.trim();
  if (form.layout) blocks.layout = form.layout;

  const mapFeatureForSave = (f: PublicServiceFeature): PublicServiceFeature => {
    const row: PublicServiceFeature = {
      icon: f.icon || "Sparkles",
      title: f.title.trim(),
      detail: f.detail.trim(),
    };
    if (f.image?.trim()) row.image = f.image.trim();
    if (f.accent) row.accent = f.accent;
    const points = (f.points ?? []).map((p) => p.trim()).filter(Boolean);
    if (points.length) row.points = points;
    return row;
  };

  const features = form.features
    .filter((f) => f.title.trim() || f.detail.trim())
    .map(mapFeatureForSave);
  if (features.length) blocks.features = features;

  const detailedServices = form.detailedServices
    .filter((f) => f.title.trim() || f.detail.trim() || f.image?.trim())
    .map(mapFeatureForSave);
  if (detailedServices.length) blocks.detailedServices = detailedServices;

  const heroBullets = form.heroBullets
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (heroBullets.length) blocks.heroBullets = heroBullets;

  const saveList = (items: PublicServiceFeature[]) =>
    items.filter((f) => f.title.trim() || f.detail.trim()).map(mapFeatureForSave);

  const ribbon = saveList(form.ribbon);
  if (ribbon.length) blocks.ribbon = ribbon;
  const whyChoose = saveList(form.whyChoose);
  if (whyChoose.length) blocks.whyChoose = whyChoose;
  const whyUs = saveList(form.whyUs);
  if (whyUs.length) blocks.whyUs = whyUs;
  const catalogItems = form.catalogItems
    .filter((f) => f.title.trim() || f.detail.trim() || f.image?.trim())
    .map(mapFeatureForSave);
  if (catalogItems.length) blocks.catalogItems = catalogItems;

  if (form.catalogSectionTitle.trim()) blocks.catalogSectionTitle = form.catalogSectionTitle.trim();
  if (form.catalogSectionLead.trim()) blocks.catalogSectionLead = form.catalogSectionLead.trim();
  if (form.servicesLead.trim()) blocks.servicesLead = form.servicesLead.trim();
  if (form.whyChooseLead.trim()) blocks.whyChooseLead = form.whyChooseLead.trim();
  if (form.detailedLead.trim()) blocks.detailedLead = form.detailedLead.trim();
  if (form.whyUsLead.trim()) blocks.whyUsLead = form.whyUsLead.trim();
  if (form.proposalLead.trim()) blocks.proposalLead = form.proposalLead.trim();
  if (form.whyChooseTitle.trim()) blocks.whyChooseTitle = form.whyChooseTitle.trim();
  if (form.whyUsTitle.trim()) blocks.whyUsTitle = form.whyUsTitle.trim();
  if (form.proposalTitle.trim()) blocks.proposalTitle = form.proposalTitle.trim();
  if (form.partnershipCallout.trim()) blocks.partnershipCallout = form.partnershipCallout.trim();
  if (form.ctaTitle.trim()) blocks.ctaTitle = form.ctaTitle.trim();
  if (form.ctaSubtitle.trim()) blocks.ctaSubtitle = form.ctaSubtitle.trim();
  if (form.ctaButtonLabel.trim()) blocks.ctaButtonLabel = form.ctaButtonLabel.trim();

  const heroBadges = linesToFeatures(form.heroBadgesText);
  if (heroBadges.length) blocks.heroBadges = heroBadges;
  const trustItems = linesToFeatures(form.trustItemsText);
  if (trustItems.length) blocks.trustItems = trustItems;
  const trustFooter = linesToFeatures(form.trustFooterText);
  if (trustFooter.length) blocks.trustFooter = trustFooter;

  const proposalServiceOptions = form.proposalServiceOptions
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (proposalServiceOptions.length) blocks.proposalServiceOptions = proposalServiceOptions;
  const proposalMonths = form.proposalMonths
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (proposalMonths.length) blocks.proposalMonths = proposalMonths;
  const proposalRequirements = form.proposalRequirements
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (proposalRequirements.length) blocks.proposalRequirements = proposalRequirements;

  const steps = form.steps
    .filter((s) => s.title.trim() || s.detail.trim())
    .map((s, index) => ({
      n: s.n || index + 1,
      title: s.title.trim(),
      detail: s.detail.trim(),
    }));
  if (steps.length) blocks.steps = steps;

  const visaCountries = form.visaCountries
    .filter((v) => v.country.trim())
    .map((v) => {
      const row: PublicVisaCountry = {
        country: v.country.trim(),
        type: v.type.trim(),
        processing: v.processing.trim(),
      };
      if (v.touristType.trim()) row.touristType = v.touristType.trim();
      if (v.businessType.trim()) row.businessType = v.businessType.trim();
      if (v.processingNote.trim()) row.processingNote = v.processingNote.trim();
      return row;
    });
  if (visaCountries.length) blocks.visaCountries = visaCountries;

  return blocks;
}

/** @deprecated Use serviceContentToEditorJson in forms; cleanServiceContentForSave on save. */
export function serviceContentToJson(form: ServiceContentForm): string {
  return JSON.stringify(cleanServiceContentForSave(form), null, 2);
}

type Props = {
  value: string;
  onChange: (json: string) => void;
};

export function ServiceContentEditor({ value, onChange }: Props) {
  const form = parseServiceContentJson(value);
  const isVisa = form.layout === "visa";
  const isHoliday = form.layout === "holiday";
  const isCorporate = form.layout === "corporate";
  const isHubHero = isHoliday || isCorporate;

  function commit(next: ServiceContentForm) {
    onChange(serviceContentToEditorJson(next));
  }

  function patch(partial: Partial<ServiceContentForm>) {
    commit({ ...form, ...partial });
  }

  function updateFeatures(next: PublicServiceFeature[]) {
    commit({ ...form, features: next });
  }

  function updateDetailedServices(next: PublicServiceFeature[]) {
    commit({ ...form, detailedServices: next });
  }

  function updateRibbon(next: PublicServiceFeature[]) {
    commit({ ...form, ribbon: next });
  }

  function updateWhyChoose(next: PublicServiceFeature[]) {
    commit({ ...form, whyChoose: next });
  }

  function updateWhyUs(next: PublicServiceFeature[]) {
    commit({ ...form, whyUs: next });
  }

  function updateCatalogItems(next: PublicServiceFeature[]) {
    commit({ ...form, catalogItems: next });
  }

  function updateSteps(next: PublicServiceStep[]) {
    commit({ ...form, steps: next });
  }

  const showCatalog = ["hotels", "cabs", "insurance", "forex"].includes(
    form.layout ?? "",
  );
  const isCabsCatalog = form.layout === "cabs";

  function seedCabsCatalog() {
    updateCatalogItems(cabsCatalogDefaults());
  }

  function updateVisaCountries(next: ServiceContentForm["visaCountries"]) {
    commit({ ...form, visaCountries: next });
  }

  return (
    <div className="md:col-span-2 space-y-6 rounded-xl border border-border bg-muted/10 p-4">
      <div>
        <h3 className="font-display text-base font-semibold">Page content</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in headings and feature cards — no code required.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AdminField
          label="Hero headline"
          hint="Large title on the service page. Example: Visa made simple, for every destination"
        >
          <input
            value={form.heroTitle}
            onChange={(e) => patch({ heroTitle: e.target.value })}
            className={adminInputClass}
            placeholder="Optional — uses service title if empty"
          />
        </AdminField>
        <AdminField
          label="Features section title"
          hint={
            isHoliday
              ? 'Holiday hub browse heading — e.g. "Browse by region" (last word is highlighted)'
              : isCorporate
                ? 'Heading for "Our Corporate Services" — last word is highlighted'
                : "Heading above the feature cards"
          }
        >
          <input
            value={form.sectionTitle}
            onChange={(e) => patch({ sectionTitle: e.target.value })}
            className={adminInputClass}
            placeholder={
              isCorporate ? "Our Corporate Services" : "e.g. Why book with us"
            }
          />
        </AdminField>
        <AdminField label="Page style">
          <select
            value={form.layout}
            onChange={(e) =>
              patch({ layout: e.target.value as ServiceContentForm["layout"] })
            }
            className={adminInputClass}
          >
            {LAYOUT_OPTIONS.map((opt) => (
              <option key={opt.value || "standard"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </AdminField>
      </div>

      {isHubHero && (
        <div className="grid gap-4 md:grid-cols-2 rounded-xl border border-[color:var(--brand-orange)]/20 bg-[color:var(--brand-orange)]/5 p-4">
          <p className="md:col-span-2 text-sm text-muted-foreground">
            {isCorporate ? (
              <>
                These fields control the hero on the Corporate page at{" "}
                <code className="text-xs">/corporate</code>. Use slug{" "}
                <code className="text-xs">corporate</code> for this service.
              </>
            ) : (
              <>
                These fields control the hero on the Holiday Packages page at{" "}
                <code className="text-xs">/holiday-packages</code>. Use slug{" "}
                <code className="text-xs">packages</code> for this service.
              </>
            )}
          </p>
          {isHoliday && (
            <AdminField label="Hero eyebrow" hint='Small label above the title, e.g. "Holiday packages"'>
              <input
                value={form.eyebrow}
                onChange={(e) => patch({ eyebrow: e.target.value })}
                className={adminInputClass}
                placeholder="Holiday packages"
              />
            </AdminField>
          )}
          <AdminField
            label="Hero accent word"
            hint={
              isCorporate
                ? 'Gradient words in the headline, e.g. "Travel Solutions"'
                : 'Gradient word in the headline, e.g. "Remember"'
            }
          >
            <input
              value={form.titleAccent}
              onChange={(e) => patch({ titleAccent: e.target.value })}
              className={adminInputClass}
              placeholder={isCorporate ? "Travel Solutions" : "Remember"}
            />
          </AdminField>
          <AdminField
            label="Hero title (first line)"
            hint={
              isCorporate
                ? 'Main headline before the accent, e.g. "Corporate & MICE"'
                : 'Main headline before the accent word, e.g. "Holidays you\'ll"'
            }
          >
            <input
              value={form.titleFirst}
              onChange={(e) => patch({ titleFirst: e.target.value })}
              className={adminInputClass}
              placeholder={isCorporate ? "Corporate & MICE" : "Holidays you'll"}
            />
          </AdminField>
        </div>
      )}

      <AdminField
        label={isCorporate ? "Our Corporate Services cards" : "Feature cards"}
        hint={
          isCorporate
            ? "Icon grid on /corporate. Upload a photo for each card (icon is used if no photo)."
            : "Highlight key benefits — shown as icon cards on the service page."
        }
      >
        <div className="space-y-3">
          {form.features.length === 0 && (
            <p className="rounded-lg border border-dashed border-border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
              {isCorporate
                ? "No corporate service cards yet. Click “Add service card” to build this section."
                : "No feature cards yet. Click “Add feature” to highlight benefits."}
            </p>
          )}
          {form.features.map((feature, index) => (
            <div key={`feature-${index}`} className="rounded-xl border border-border bg-background p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-orange)]">
                  {isCorporate ? "Service" : "Feature"} {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => updateFeatures(form.features.filter((_, i) => i !== index))}
                  className="rounded-md p-1.5 text-red-600 hover:bg-red-50"
                  aria-label={`Remove feature ${index + 1}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {isCorporate && (
                <div className="mb-3">
                  <AdminImageField
                    label="Card photo"
                    hint="Upload or pick an image for this service card on /corporate."
                    folder="services"
                    value={feature.image ?? ""}
                    onChange={(image) =>
                      updateFeatures(
                        form.features.map((f, i) => (i === index ? { ...f, image } : f)),
                      )
                    }
                  />
                </div>
              )}
              <div className="grid gap-3 md:grid-cols-2">
                <AdminIconSelect
                  label={isCorporate ? "Icon (fallback if no photo)" : "Icon"}
                  value={feature.icon}
                  onChange={(icon) =>
                    updateFeatures(
                      form.features.map((f, i) => (i === index ? { ...f, icon } : f)),
                    )
                  }
                />
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Title</label>
                  <input
                    value={feature.title}
                    onChange={(e) =>
                      updateFeatures(
                        form.features.map((f, i) =>
                          i === index ? { ...f, title: e.target.value } : f,
                        ),
                      )
                    }
                    placeholder="e.g. Best-price fares"
                    className={`${adminInputClass} mt-1`}
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="text-xs font-medium text-muted-foreground">Description</label>
                <textarea
                  rows={2}
                  value={feature.detail}
                  onChange={(e) =>
                    updateFeatures(
                      form.features.map((f, i) =>
                        i === index ? { ...f, detail: e.target.value } : f,
                      ),
                    )
                  }
                  placeholder="Short explanation for this benefit…"
                  className={`${adminInputClass} mt-1`}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              updateFeatures([
                ...form.features,
                { icon: "Sparkles", title: "", detail: "", image: "" },
              ])
            }
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted/50"
          >
            <Plus className="h-4 w-4" />
            {isCorporate ? "Add service card" : "Add feature"}
          </button>
        </div>
      </AdminField>

      {isCorporate && (
        <div className="space-y-4 rounded-xl border border-[color:var(--brand-orange)]/20 bg-[color:var(--brand-orange)]/5 p-4">
          <div>
            <h4 className="font-display text-sm font-semibold text-[color:var(--brand-navy)]">
              Our Corporate Services (with images)
            </h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Photo rows on /corporate — upload or pick an image for each service.
            </p>
          </div>
          <AdminField
            label="Section heading"
            hint='e.g. "Our Corporate Services" (last word is highlighted)'
          >
            <input
              value={form.detailedSectionTitle}
              onChange={(e) => patch({ detailedSectionTitle: e.target.value })}
              className={adminInputClass}
              placeholder="Our Corporate Services"
            />
          </AdminField>
          <div className="space-y-3">
            {form.detailedServices.length === 0 && (
              <p className="rounded-lg border border-dashed border-border bg-background/60 px-4 py-6 text-center text-sm text-muted-foreground">
                No photo rows yet. Click “Add photo service” to add one.
              </p>
            )}
            {form.detailedServices.map((item, index) => (
              <div key={`detailed-${index}`} className="rounded-xl border border-border bg-background p-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-orange)]">
                    Photo service {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateDetailedServices(
                        form.detailedServices.filter((_, i) => i !== index),
                      )
                    }
                    className="rounded-md p-1.5 text-red-600 hover:bg-red-50"
                    aria-label={`Remove photo service ${index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <AdminImageField
                  label="Service image"
                  hint="Shown on the left/right photo row on the corporate page."
                  folder="services"
                  value={item.image ?? ""}
                  onChange={(image) =>
                    updateDetailedServices(
                      form.detailedServices.map((f, i) =>
                        i === index ? { ...f, image } : f,
                      ),
                    )
                  }
                />
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <AdminIconSelect
                    label="Icon"
                    value={item.icon}
                    onChange={(icon) =>
                      updateDetailedServices(
                        form.detailedServices.map((f, i) =>
                          i === index ? { ...f, icon } : f,
                        ),
                      )
                    }
                  />
                  <AdminField label="Accent color">
                    <select
                      value={item.accent ?? "purple"}
                      onChange={(e) =>
                        updateDetailedServices(
                          form.detailedServices.map((f, i) =>
                            i === index
                              ? {
                                  ...f,
                                  accent: e.target.value as PublicServiceFeature["accent"],
                                }
                              : f,
                          ),
                        )
                      }
                      className={adminInputClass}
                    >
                      {ACCENT_OPTIONS.map((accent) => (
                        <option key={accent} value={accent}>
                          {accent}
                        </option>
                      ))}
                    </select>
                  </AdminField>
                </div>
                <div className="mt-3">
                  <label className="text-xs font-medium text-muted-foreground">Title</label>
                  <input
                    value={item.title}
                    onChange={(e) =>
                      updateDetailedServices(
                        form.detailedServices.map((f, i) =>
                          i === index ? { ...f, title: e.target.value } : f,
                        ),
                      )
                    }
                    placeholder="e.g. Corporate Travel Management"
                    className={`${adminInputClass} mt-1`}
                  />
                </div>
                <div className="mt-3">
                  <label className="text-xs font-medium text-muted-foreground">Description</label>
                  <textarea
                    rows={2}
                    value={item.detail}
                    onChange={(e) =>
                      updateDetailedServices(
                        form.detailedServices.map((f, i) =>
                          i === index ? { ...f, detail: e.target.value } : f,
                        ),
                      )
                    }
                    placeholder="Describe this corporate service…"
                    className={`${adminInputClass} mt-1`}
                  />
                </div>
                <div className="mt-3">
                  <label className="text-xs font-medium text-muted-foreground">
                    Bullet points
                  </label>
                  <textarea
                    rows={3}
                    value={(item.points ?? []).join("\n")}
                    onChange={(e) =>
                      updateDetailedServices(
                        form.detailedServices.map((f, i) =>
                          i === index
                            ? {
                                ...f,
                                points: e.target.value
                                  .split("\n")
                                  .map((line) => line.trim())
                                  .filter(Boolean),
                              }
                            : f,
                        ),
                      )
                    }
                    placeholder={"One benefit per line\nGST billing\nDedicated desk"}
                    className={`${adminInputClass} mt-1`}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                updateDetailedServices([
                  ...form.detailedServices,
                  {
                    icon: "Briefcase",
                    title: "",
                    detail: "",
                    image: "",
                    accent: "purple",
                  },
                ])
              }
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted/50"
            >
              <Plus className="h-4 w-4" />
              Add photo service
            </button>
          </div>
        </div>
      )}

      {isCorporate && (
        <div className="space-y-4 rounded-xl border border-border bg-background p-4">
          <h4 className="font-display text-sm font-semibold text-[color:var(--brand-navy)]">
            Corporate page sections
          </h4>
          <FeatureListEditor
            label="Service ribbon items"
            hint="Icon row under the hotel-style hero trust bar (icon, title, short detail)."
            items={form.ribbon}
            onChange={updateRibbon}
            addLabel="Add ribbon item"
          />
          <div className="grid gap-3 md:grid-cols-2">
            <AdminField label="Services section lead">
              <input
                value={form.servicesLead}
                onChange={(e) => patch({ servicesLead: e.target.value })}
                className={adminInputClass}
                placeholder="Everything you need for a seamless business travel experience."
              />
            </AdminField>
            <AdminField label="Detailed section lead">
              <input
                value={form.detailedLead}
                onChange={(e) => patch({ detailedLead: e.target.value })}
                className={adminInputClass}
              />
            </AdminField>
            <AdminField label="Why Choose title">
              <input
                value={form.whyChooseTitle}
                onChange={(e) => patch({ whyChooseTitle: e.target.value })}
                className={adminInputClass}
                placeholder="Why Choose YatraNexus?"
              />
            </AdminField>
            <AdminField label="Why Choose lead">
              <input
                value={form.whyChooseLead}
                onChange={(e) => patch({ whyChooseLead: e.target.value })}
                className={adminInputClass}
              />
            </AdminField>
          </div>
          <FeatureListEditor
            label="Why Choose cards"
            items={form.whyChoose}
            onChange={updateWhyChoose}
            addLabel="Add why-choose card"
          />
          <AdminField label="Partnership callout">
            <textarea
              rows={2}
              value={form.partnershipCallout}
              onChange={(e) => patch({ partnershipCallout: e.target.value })}
              className={adminInputClass}
            />
          </AdminField>
          <div className="grid gap-3 md:grid-cols-2">
            <AdminField label="Why Choose Us title">
              <input
                value={form.whyUsTitle}
                onChange={(e) => patch({ whyUsTitle: e.target.value })}
                className={adminInputClass}
                placeholder="Why Choose Us?"
              />
            </AdminField>
            <AdminField label="Why Choose Us lead">
              <input
                value={form.whyUsLead}
                onChange={(e) => patch({ whyUsLead: e.target.value })}
                className={adminInputClass}
              />
            </AdminField>
          </div>
          <FeatureListEditor
            label="Why Choose Us stats"
            hint="Icon + title only (detail optional)."
            items={form.whyUs}
            onChange={updateWhyUs}
            addLabel="Add stat"
            titleOnly
          />
          <div className="grid gap-3 md:grid-cols-2">
            <AdminField label="CTA title">
              <input
                value={form.ctaTitle}
                onChange={(e) => patch({ ctaTitle: e.target.value })}
                className={adminInputClass}
              />
            </AdminField>
            <AdminField label="CTA subtitle">
              <input
                value={form.ctaSubtitle}
                onChange={(e) => patch({ ctaSubtitle: e.target.value })}
                className={adminInputClass}
              />
            </AdminField>
            <AdminField label="Proposal form title">
              <input
                value={form.proposalTitle}
                onChange={(e) => patch({ proposalTitle: e.target.value })}
                className={adminInputClass}
                placeholder="Request a Corporate Travel Proposal"
              />
            </AdminField>
            <AdminField label="Proposal form lead">
              <input
                value={form.proposalLead}
                onChange={(e) => patch({ proposalLead: e.target.value })}
                className={adminInputClass}
              />
            </AdminField>
          </div>
          <AdminField label="Proposal service options" hint="One option per line">
            <textarea
              rows={4}
              value={form.proposalServiceOptions}
              onChange={(e) => patch({ proposalServiceOptions: e.target.value })}
              className={adminInputClass}
            />
          </AdminField>
          <AdminField label="Proposal months" hint="One month per line">
            <textarea
              rows={4}
              value={form.proposalMonths}
              onChange={(e) => patch({ proposalMonths: e.target.value })}
              className={adminInputClass}
            />
          </AdminField>
          <AdminField label="Proposal requirements" hint="One option per line">
            <textarea
              rows={4}
              value={form.proposalRequirements}
              onChange={(e) => patch({ proposalRequirements: e.target.value })}
              className={adminInputClass}
            />
          </AdminField>
        </div>
      )}

      {!isHoliday && (
        <div className="space-y-4 rounded-xl border border-border bg-background p-4">
          <h4 className="font-display text-sm font-semibold text-[color:var(--brand-navy)]">
            Hero badges, trust bar & CTA button
          </h4>
          <AdminField
            label="Hero badges"
            hint="One per line: Icon | Title | Detail (optional)"
          >
            <textarea
              rows={4}
              value={form.heroBadgesText}
              onChange={(e) => patch({ heroBadgesText: e.target.value })}
              className={adminInputClass}
              placeholder={"Plane | Best fares | Domestic & international"}
            />
          </AdminField>
          <AdminField
            label="Trust bar items"
            hint="One per line: Icon | Title | Detail (optional)"
          >
            <textarea
              rows={4}
              value={form.trustItemsText}
              onChange={(e) => patch({ trustItemsText: e.target.value })}
              className={adminInputClass}
            />
          </AdminField>
          <AdminField
            label="Trust footer items"
            hint="Bottom guarantees strip. One per line: Icon | Title | Detail (optional)"
          >
            <textarea
              rows={4}
              value={form.trustFooterText}
              onChange={(e) => patch({ trustFooterText: e.target.value })}
              className={adminInputClass}
            />
          </AdminField>
          <AdminField label="CTA button label">
            <input
              value={form.ctaButtonLabel}
              onChange={(e) => patch({ ctaButtonLabel: e.target.value })}
              className={adminInputClass}
              placeholder="Send Inquiry"
            />
          </AdminField>
          <div className="grid gap-3 md:grid-cols-2">
            <AdminField label="CTA title">
              <input
                value={form.ctaTitle}
                onChange={(e) => patch({ ctaTitle: e.target.value })}
                className={adminInputClass}
              />
            </AdminField>
            <AdminField label="CTA subtitle">
              <input
                value={form.ctaSubtitle}
                onChange={(e) => patch({ ctaSubtitle: e.target.value })}
                className={adminInputClass}
              />
            </AdminField>
          </div>
        </div>
      )}

      {showCatalog && (
        <div className="space-y-4 rounded-xl border border-border bg-background p-4">
          <h4 className="font-display text-sm font-semibold text-[color:var(--brand-navy)]">
            {isCabsCatalog ? "Cab categories" : "Product catalog"}
          </h4>
          <p className="text-sm text-muted-foreground">
            {isCabsCatalog
              ? "Sedan, SUV, Innova / Crysta and Tempo Traveller — upload a vehicle photo for each category. Use description format: first line seats · bags, then the one-line detail."
              : "Categories / plans / destinations shown on this service page (with optional photo)."}
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <AdminField label="Catalog section title">
              <input
                value={form.catalogSectionTitle}
                onChange={(e) => patch({ catalogSectionTitle: e.target.value })}
                className={adminInputClass}
                placeholder="Our Cab Categories"
              />
            </AdminField>
            <AdminField label="Catalog section lead">
              <input
                value={form.catalogSectionLead}
                onChange={(e) => patch({ catalogSectionLead: e.target.value })}
                className={adminInputClass}
              />
            </AdminField>
          </div>
          {isCabsCatalog && form.catalogItems.length === 0 ? (
            <button
              type="button"
              onClick={seedCabsCatalog}
              className="rounded-lg border border-dashed border-[color:var(--brand-orange)] bg-[color:var(--brand-orange)]/5 px-4 py-3 text-sm font-semibold text-[color:var(--brand-navy)] hover:bg-[color:var(--brand-orange)]/10"
            >
              Load default cab categories (then upload images)
            </button>
          ) : null}
          <FeatureListEditor
            label={isCabsCatalog ? "Cab category cards" : "Catalog items"}
            hint={
              isCabsCatalog
                ? "Upload/replace the vehicle image for each card. Description line 1: 4 Seater · 2 Bags"
                : undefined
            }
            items={form.catalogItems}
            onChange={updateCatalogItems}
            addLabel={isCabsCatalog ? "Add cab category" : "Add catalog item"}
            withImage
          />
        </div>
      )}

      {isVisa && (
        <>
          <AdminField
            label="Visa process steps"
            hint="Numbered steps shown on the visa page (typically 5 steps)."
          >
            <div className="space-y-3">
              {form.steps.length === 0 && (
                <p className="rounded-lg border border-dashed border-border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
                  No steps yet. Click “Add step” to describe the visa process.
                </p>
              )}
              {form.steps.map((step, index) => (
                <div key={`step-${index}`} className="rounded-xl border border-border bg-background p-4">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-orange)]">
                      Step {step.n}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateSteps(form.steps.filter((_, i) => i !== index))}
                      className="rounded-md p-1.5 text-red-600 hover:bg-red-50"
                      aria-label={`Remove step ${step.n}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Step number</label>
                      <input
                        type="number"
                        min={1}
                        value={step.n}
                        onChange={(e) =>
                          updateSteps(
                            form.steps.map((s, i) =>
                              i === index ? { ...s, n: Number(e.target.value) || index + 1 } : s,
                            ),
                          )
                        }
                        className={`${adminInputClass} mt-1`}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-medium text-muted-foreground">Title</label>
                      <input
                        value={step.title}
                        onChange={(e) =>
                          updateSteps(
                            form.steps.map((s, i) =>
                              i === index ? { ...s, title: e.target.value } : s,
                            ),
                          )
                        }
                        placeholder="e.g. Submit documents"
                        className={`${adminInputClass} mt-1`}
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="text-xs font-medium text-muted-foreground">Description</label>
                    <textarea
                      rows={2}
                      value={step.detail}
                      onChange={(e) =>
                        updateSteps(
                          form.steps.map((s, i) =>
                            i === index ? { ...s, detail: e.target.value } : s,
                          ),
                        )
                      }
                      className={`${adminInputClass} mt-1`}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  updateSteps([...form.steps, { n: form.steps.length + 1, title: "", detail: "" }])
                }
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted/50"
              >
                <Plus className="h-4 w-4" />
                Add step
              </button>
            </div>
          </AdminField>

          <AdminField
            label="Visa countries table"
            hint="Countries and visa types shown in the visa page table."
          >
            <div className="space-y-3">
              {form.visaCountries.length === 0 && (
                <p className="rounded-lg border border-dashed border-border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
                  No countries yet. Click “Add country” for the visa table.
                </p>
              )}
              {form.visaCountries.map((row, index) => (
                <div key={`visa-${index}`} className="rounded-xl border border-border bg-background p-4">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-orange)]">
                      Country {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateVisaCountries(form.visaCountries.filter((_, i) => i !== index))
                      }
                      className="rounded-md p-1.5 text-red-600 hover:bg-red-50"
                      aria-label={`Remove country ${index + 1}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Country *</label>
                      <input
                        value={row.country}
                        onChange={(e) =>
                          updateVisaCountries(
                            form.visaCountries.map((v, i) =>
                              i === index ? { ...v, country: e.target.value } : v,
                            ),
                          )
                        }
                        placeholder="e.g. United Arab Emirates"
                        className={`${adminInputClass} mt-1`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Visa type</label>
                      <input
                        value={row.type}
                        onChange={(e) =>
                          updateVisaCountries(
                            form.visaCountries.map((v, i) =>
                              i === index ? { ...v, type: e.target.value } : v,
                            ),
                          )
                        }
                        placeholder="e.g. Tourist e-Visa"
                        className={`${adminInputClass} mt-1`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Processing time</label>
                      <input
                        value={row.processing}
                        onChange={(e) =>
                          updateVisaCountries(
                            form.visaCountries.map((v, i) =>
                              i === index ? { ...v, processing: e.target.value } : v,
                            ),
                          )
                        }
                        placeholder="e.g. 3–5 working days"
                        className={`${adminInputClass} mt-1`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Tourist visa</label>
                      <input
                        value={row.touristType}
                        onChange={(e) =>
                          updateVisaCountries(
                            form.visaCountries.map((v, i) =>
                              i === index ? { ...v, touristType: e.target.value } : v,
                            ),
                          )
                        }
                        className={`${adminInputClass} mt-1`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Business visa</label>
                      <input
                        value={row.businessType}
                        onChange={(e) =>
                          updateVisaCountries(
                            form.visaCountries.map((v, i) =>
                              i === index ? { ...v, businessType: e.target.value } : v,
                            ),
                          )
                        }
                        className={`${adminInputClass} mt-1`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Processing note</label>
                      <input
                        value={row.processingNote}
                        onChange={(e) =>
                          updateVisaCountries(
                            form.visaCountries.map((v, i) =>
                              i === index ? { ...v, processingNote: e.target.value } : v,
                            ),
                          )
                        }
                        className={`${adminInputClass} mt-1`}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  updateVisaCountries([
                    ...form.visaCountries,
                    {
                      country: "",
                      type: "",
                      processing: "",
                      touristType: "",
                      businessType: "",
                      processingNote: "",
                    },
                  ])
                }
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted/50"
              >
                <Plus className="h-4 w-4" />
                Add country
              </button>
            </div>
          </AdminField>
        </>
      )}
    </div>
  );
}

function FeatureListEditor({
  label,
  hint,
  items,
  onChange,
  addLabel,
  withImage = false,
  titleOnly = false,
}: {
  label: string;
  hint?: string;
  items: PublicServiceFeature[];
  onChange: (next: PublicServiceFeature[]) => void;
  addLabel: string;
  withImage?: boolean;
  titleOnly?: boolean;
}) {
  return (
    <AdminField label={label} hint={hint}>
      <div className="space-y-3">
        {items.length === 0 && (
          <p className="rounded-lg border border-dashed border-border bg-muted/30 px-4 py-4 text-center text-sm text-muted-foreground">
            No items yet.
          </p>
        )}
        {items.map((item, index) => (
          <div key={`${label}-${index}`} className="rounded-xl border border-border bg-muted/10 p-3">
            <div className="mb-2 flex justify-end">
              <button
                type="button"
                onClick={() => onChange(items.filter((_, i) => i !== index))}
                className="rounded-md p-1.5 text-red-600 hover:bg-red-50"
                aria-label={`Remove ${label} ${index + 1}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            {withImage && (
              <div className="mb-3">
                <AdminImageField
                  label="Image"
                  folder="services"
                  value={item.image ?? ""}
                  onChange={(image) =>
                    onChange(items.map((f, i) => (i === index ? { ...f, image } : f)))
                  }
                />
              </div>
            )}
            <div className="grid gap-3 md:grid-cols-2">
              <AdminIconSelect
                label="Icon"
                value={item.icon}
                onChange={(icon) =>
                  onChange(items.map((f, i) => (i === index ? { ...f, icon } : f)))
                }
              />
              <div>
                <label className="text-xs font-medium text-muted-foreground">Title</label>
                <input
                  value={item.title}
                  onChange={(e) =>
                    onChange(
                      items.map((f, i) => (i === index ? { ...f, title: e.target.value } : f)),
                    )
                  }
                  className={`${adminInputClass} mt-1`}
                />
              </div>
            </div>
            {!titleOnly && (
              <div className="mt-3">
                <label className="text-xs font-medium text-muted-foreground">Description</label>
                <textarea
                  rows={2}
                  value={item.detail}
                  onChange={(e) =>
                    onChange(
                      items.map((f, i) => (i === index ? { ...f, detail: e.target.value } : f)),
                    )
                  }
                  className={`${adminInputClass} mt-1`}
                />
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            onChange([...items, { icon: "Sparkles", title: "", detail: "", image: "" }])
          }
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted/50"
        >
          <Plus className="h-4 w-4" />
          {addLabel}
        </button>
      </div>
    </AdminField>
  );
}
