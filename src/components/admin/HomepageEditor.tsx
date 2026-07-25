import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { AdminImageField } from "@/components/admin/AdminImageField";
import {
  AdminCard,
  AdminField,
  adminInputClass,
} from "@/components/admin/AdminPageHeader";
import { CMS_ICON_OPTIONS, resolveCmsIcon } from "@/lib/cms-icons";
import type { HomepageFormState } from "@/lib/homepage-admin";
import { MAX_HERO_SLIDES } from "@/lib/homepage-admin";

type SlugOption = { slug: string; label: string };

type HomepageEditorProps = {
  value: HomepageFormState;
  onChange: (next: HomepageFormState) => void;
  packageOptions: SlugOption[];
  serviceOptions: SlugOption[];
  destinationOptions: SlugOption[];
};

function IconSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (icon: string) => void;
}) {
  const Icon = resolveCmsIcon(value);
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40">
        <Icon className="h-4 w-4 text-[color:var(--brand-navy)]" />
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${adminInputClass} flex-1`}
      >
        {CMS_ICON_OPTIONS.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

function FeaturedPicker({
  label,
  hint,
  options,
  selected,
  onChange,
}: {
  label: string;
  hint?: string;
  options: SlugOption[];
  selected: string[];
  onChange: (slugs: string[]) => void;
}) {
  function toggle(slug: string) {
    if (selected.includes(slug)) {
      onChange(selected.filter((s) => s !== slug));
    } else {
      onChange([...selected, slug]);
    }
  }

  function move(slug: string, direction: -1 | 1) {
    const index = selected.indexOf(slug);
    if (index < 0) return;
    const next = [...selected];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  const selectedItems = selected
    .map((slug) => options.find((o) => o.slug === slug))
    .filter(Boolean) as SlugOption[];

  return (
    <AdminField label={label} hint={hint}>
      {options.length === 0 ? (
        <p className="text-sm text-muted-foreground">No published items yet — add them in Packages, Services, or Destinations.</p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="max-h-56 space-y-1 overflow-y-auto rounded-xl border border-border bg-muted/20 p-3">
            {options.map((opt) => (
              <label
                key={opt.slug}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-muted/50"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(opt.slug)}
                  onChange={() => toggle(opt.slug)}
                  className="rounded border-border"
                />
                <span className="font-medium">{opt.label}</span>
                <span className="text-xs text-muted-foreground">{opt.slug}</span>
              </label>
            ))}
          </div>
          {selectedItems.length > 0 && (
            <div className="rounded-xl border border-border bg-muted/20 p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Display order
              </p>
              <ul className="space-y-1">
                {selectedItems.map((item, index) => (
                  <li
                    key={item.slug}
                    className="flex items-center justify-between gap-2 rounded-lg bg-background px-2 py-1.5 text-sm"
                  >
                    <span>
                      {index + 1}. {item.label}
                    </span>
                    <span className="flex gap-0.5">
                      <button
                        type="button"
                        onClick={() => move(item.slug, -1)}
                        disabled={index === 0}
                        className="rounded p-1 hover:bg-muted disabled:opacity-30"
                        aria-label="Move up"
                      >
                        <ChevronUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => move(item.slug, 1)}
                        disabled={index === selectedItems.length - 1}
                        className="rounded p-1 hover:bg-muted disabled:opacity-30"
                        aria-label="Move down"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </AdminField>
  );
}

function RowActions({
  onRemove,
  label,
}: {
  onRemove: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="rounded-md p-1.5 text-red-600 hover:bg-red-50"
      aria-label={label}
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

export function HomepageEditor({
  value,
  onChange,
  packageOptions,
  serviceOptions,
  destinationOptions,
}: HomepageEditorProps) {
  function patch(partial: Partial<HomepageFormState>) {
    onChange({ ...value, ...partial });
  }

  return (
    <div className="space-y-6">
      <AdminCard>
        <div className="mb-4">
          <h2 className="text-base font-semibold text-[color:var(--brand-navy)]">Hero slides</h2>
          <p className="text-sm text-muted-foreground">
            Add up to {MAX_HERO_SLIDES} images for the homepage hero. They auto-rotate on the live
            site — change any slide image anytime.
          </p>
        </div>
        <AdminField
          label="Auto-rotate interval (seconds)"
          hint="How long each image stays before the next one (default 10 seconds)."
        >
          <input
            type="number"
            min={1}
            max={120}
            value={value.heroIntervalSeconds}
            onChange={(e) =>
              patch({ heroIntervalSeconds: Math.max(1, Number(e.target.value) || 10) })
            }
            className={`${adminInputClass} max-w-[10rem]`}
          />
        </AdminField>
        <div className="mt-4 space-y-3">
          {value.heroSlides.map((slide, index) => (
            <div key={`hero-${index}`} className="rounded-xl border border-border bg-muted/20 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-orange)]">
                  Slide {index + 1} of {MAX_HERO_SLIDES}
                </span>
                {value.heroSlides.length > 1 && (
                  <RowActions
                    label={`Remove slide ${index + 1}`}
                    onRemove={() =>
                      patch({ heroSlides: value.heroSlides.filter((_, i) => i !== index) })
                    }
                  />
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Destination name</label>
                  <input
                    value={slide.name}
                    onChange={(e) => {
                      const heroSlides = [...value.heroSlides];
                      heroSlides[index] = { ...slide, name: e.target.value };
                      patch({ heroSlides });
                    }}
                    placeholder="e.g. Goa"
                    className={`${adminInputClass} mt-1`}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Tag line</label>
                  <input
                    value={slide.tag}
                    onChange={(e) => {
                      const heroSlides = [...value.heroSlides];
                      heroSlides[index] = { ...slide, tag: e.target.value };
                      patch({ heroSlides });
                    }}
                    placeholder="e.g. Beaches & nightlife"
                    className={`${adminInputClass} mt-1`}
                  />
                </div>
                <div className="sm:col-span-2">
                  <AdminImageField
                    label="Slide image"
                    folder="homepage/hero"
                    value={slide.image}
                    onChange={(image) => {
                      const heroSlides = [...value.heroSlides];
                      heroSlides[index] = { ...slide, image };
                      patch({ heroSlides });
                    }}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Link slug (optional)</label>
                  <input
                    value={slide.slug}
                    onChange={(e) => {
                      const heroSlides = [...value.heroSlides];
                      heroSlides[index] = { ...slide, slug: e.target.value };
                      patch({ heroSlides });
                    }}
                    placeholder="Package or destination slug"
                    className={`${adminInputClass} mt-1`}
                  />
                </div>
              </div>
            </div>
          ))}
          {value.heroSlides.length < MAX_HERO_SLIDES ? (
            <button
              type="button"
              onClick={() =>
                patch({
                  heroSlides: [...value.heroSlides, { name: "", tag: "", image: "", slug: "" }],
                })
              }
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted/50"
            >
              <Plus className="h-4 w-4" />
              Add slide ({value.heroSlides.length}/{MAX_HERO_SLIDES})
            </button>
          ) : (
            <p className="text-sm text-muted-foreground">
              Maximum of {MAX_HERO_SLIDES} hero images reached. Remove a slide to add another.
            </p>
          )}
        </div>
      </AdminCard>

      <AdminCard>
        <div className="mb-4">
          <h2 className="text-base font-semibold text-[color:var(--brand-navy)]">Featured on homepage</h2>
          <p className="text-sm text-muted-foreground">Pick items to highlight — no slugs to type manually.</p>
        </div>
        <div className="grid gap-6">
          <FeaturedPicker
            label="Featured packages"
            hint="Checked items appear in homepage package section, in the order shown."
            options={packageOptions}
            selected={value.featuredPackageSlugs}
            onChange={(featuredPackageSlugs) => patch({ featuredPackageSlugs })}
          />
          <FeaturedPicker
            label="Featured services"
            hint='Includes "Holiday Packages" for the homepage card that links to /holiday-packages.'
            options={serviceOptions}
            selected={value.featuredServiceSlugs}
            onChange={(featuredServiceSlugs) => patch({ featuredServiceSlugs })}
          />
          <FeaturedPicker
            label="Featured destinations"
            options={destinationOptions}
            selected={value.featuredDestinationSlugs}
            onChange={(featuredDestinationSlugs) => patch({ featuredDestinationSlugs })}
          />
        </div>
      </AdminCard>

      <AdminCard>
        <h2 className="mb-4 text-base font-semibold text-[color:var(--brand-navy)]">Hero headline</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <AdminField
            label="Hero title"
            hint='Main headline, e.g. "Plan trips that feel unforgettable."'
          >
            <input
              value={value.aboutTitle}
              onChange={(e) => patch({ aboutTitle: e.target.value })}
              className={adminInputClass}
            />
          </AdminField>
          <div className="md:col-span-2">
            <AdminField
              label="Hero subtitle"
              hint="Short paragraph under the headline on the homepage hero."
            >
              <textarea
                rows={4}
                value={value.aboutContent}
                onChange={(e) => patch({ aboutContent: e.target.value })}
                className={adminInputClass}
              />
            </AdminField>
          </div>
        </div>
      </AdminCard>

      <AdminCard>
        <div className="mb-4">
          <h2 className="text-base font-semibold text-[color:var(--brand-navy)]">Why choose us</h2>
          <p className="text-sm text-muted-foreground">Trust points shown on the homepage.</p>
        </div>
        <div className="space-y-3">
          {value.whyChooseUs.map((item, index) => (
            <div key={`why-${index}`} className="rounded-xl border border-border bg-muted/20 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Point {index + 1}
                </span>
                {value.whyChooseUs.length > 1 && (
                  <RowActions
                    label={`Remove point ${index + 1}`}
                    onRemove={() =>
                      patch({ whyChooseUs: value.whyChooseUs.filter((_, i) => i !== index) })
                    }
                  />
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Icon</label>
                  <div className="mt-1">
                    <IconSelect
                      value={item.icon}
                      onChange={(icon) => {
                        const whyChooseUs = [...value.whyChooseUs];
                        whyChooseUs[index] = { ...item, icon };
                        patch({ whyChooseUs });
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Title</label>
                  <input
                    value={item.title}
                    onChange={(e) => {
                      const whyChooseUs = [...value.whyChooseUs];
                      whyChooseUs[index] = { ...item, title: e.target.value };
                      patch({ whyChooseUs });
                    }}
                    className={`${adminInputClass} mt-1`}
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="text-xs font-medium text-muted-foreground">Detail</label>
                <textarea
                  rows={2}
                  value={item.detail}
                  onChange={(e) => {
                    const whyChooseUs = [...value.whyChooseUs];
                    whyChooseUs[index] = { ...item, detail: e.target.value };
                    patch({ whyChooseUs });
                  }}
                  className={`${adminInputClass} mt-1`}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              patch({
                whyChooseUs: [...value.whyChooseUs, { icon: "Sparkles", title: "", detail: "" }],
              })
            }
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted/50"
          >
            <Plus className="h-4 w-4" />
            Add point
          </button>
        </div>
      </AdminCard>

      <AdminCard>
        <div className="mb-4">
          <h2 className="text-base font-semibold text-[color:var(--brand-navy)]">Stats</h2>
          <p className="text-sm text-muted-foreground">Numbers shown on the homepage (e.g. happy travellers).</p>
        </div>
        <div className="space-y-3">
          {value.stats.map((stat, index) => (
            <div key={`stat-${index}`} className="flex flex-wrap items-end gap-3 rounded-xl border border-border bg-muted/20 p-4">
              <div className="min-w-[140px] flex-1">
                <label className="text-xs font-medium text-muted-foreground">Label</label>
                <input
                  value={stat.label}
                  onChange={(e) => {
                    const stats = [...value.stats];
                    stats[index] = { ...stat, label: e.target.value };
                    patch({ stats });
                  }}
                  placeholder="Happy travellers"
                  className={`${adminInputClass} mt-1`}
                />
              </div>
              <div className="min-w-[100px] flex-1">
                <label className="text-xs font-medium text-muted-foreground">Value</label>
                <input
                  value={stat.value}
                  onChange={(e) => {
                    const stats = [...value.stats];
                    stats[index] = { ...stat, value: e.target.value };
                    patch({ stats });
                  }}
                  placeholder="10,000+"
                  className={`${adminInputClass} mt-1`}
                />
              </div>
              {value.stats.length > 1 && (
                <RowActions
                  label={`Remove stat ${index + 1}`}
                  onRemove={() => patch({ stats: value.stats.filter((_, i) => i !== index) })}
                />
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => patch({ stats: [...value.stats, { label: "", value: "" }] })}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted/50"
          >
            <Plus className="h-4 w-4" />
            Add stat
          </button>
        </div>
      </AdminCard>

      <AdminCard>
        <div className="mb-4">
          <h2 className="text-base font-semibold text-[color:var(--brand-navy)]">How it works</h2>
          <p className="text-sm text-muted-foreground">Step-by-step booking flow on the homepage.</p>
        </div>
        <div className="space-y-3">
          {value.howItWorks.map((step, index) => (
            <div key={`how-${index}`} className="rounded-xl border border-border bg-muted/20 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Step {step.n || index + 1}
                </span>
                {value.howItWorks.length > 1 && (
                  <RowActions
                    label={`Remove step ${index + 1}`}
                    onRemove={() =>
                      patch({ howItWorks: value.howItWorks.filter((_, i) => i !== index) })
                    }
                  />
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-[80px_1fr]">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Step #</label>
                  <input
                    type="number"
                    min={1}
                    value={step.n}
                    onChange={(e) => {
                      const howItWorks = [...value.howItWorks];
                      howItWorks[index] = { ...step, n: Number(e.target.value) || index + 1 };
                      patch({ howItWorks });
                    }}
                    className={`${adminInputClass} mt-1`}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Title</label>
                  <input
                    value={step.title}
                    onChange={(e) => {
                      const howItWorks = [...value.howItWorks];
                      howItWorks[index] = { ...step, title: e.target.value };
                      patch({ howItWorks });
                    }}
                    className={`${adminInputClass} mt-1`}
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="text-xs font-medium text-muted-foreground">Detail</label>
                <textarea
                  rows={2}
                  value={step.detail}
                  onChange={(e) => {
                    const howItWorks = [...value.howItWorks];
                    howItWorks[index] = { ...step, detail: e.target.value };
                    patch({ howItWorks });
                  }}
                  className={`${adminInputClass} mt-1`}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              patch({
                howItWorks: [
                  ...value.howItWorks,
                  { n: value.howItWorks.length + 1, title: "", detail: "" },
                ],
              })
            }
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted/50"
          >
            <Plus className="h-4 w-4" />
            Add step
          </button>
        </div>
      </AdminCard>

      <AdminCard>
        <div className="mb-4">
          <h2 className="text-base font-semibold text-[color:var(--brand-navy)]">Corporate features</h2>
          <p className="text-sm text-muted-foreground">Also used on the corporate travel page.</p>
        </div>
        <div className="space-y-3">
          {value.corporateFeatures.map((item, index) => (
            <div key={`corp-${index}`} className="rounded-xl border border-border bg-muted/20 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Feature {index + 1}
                </span>
                {value.corporateFeatures.length > 1 && (
                  <RowActions
                    label={`Remove feature ${index + 1}`}
                    onRemove={() =>
                      patch({
                        corporateFeatures: value.corporateFeatures.filter((_, i) => i !== index),
                      })
                    }
                  />
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Icon</label>
                  <div className="mt-1">
                    <IconSelect
                      value={item.icon}
                      onChange={(icon) => {
                        const corporateFeatures = [...value.corporateFeatures];
                        corporateFeatures[index] = { ...item, icon };
                        patch({ corporateFeatures });
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Title</label>
                  <input
                    value={item.title}
                    onChange={(e) => {
                      const corporateFeatures = [...value.corporateFeatures];
                      corporateFeatures[index] = { ...item, title: e.target.value };
                      patch({ corporateFeatures });
                    }}
                    className={`${adminInputClass} mt-1`}
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="text-xs font-medium text-muted-foreground">Detail</label>
                <textarea
                  rows={2}
                  value={item.detail}
                  onChange={(e) => {
                    const corporateFeatures = [...value.corporateFeatures];
                    corporateFeatures[index] = { ...item, detail: e.target.value };
                    patch({ corporateFeatures });
                  }}
                  className={`${adminInputClass} mt-1`}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              patch({
                corporateFeatures: [
                  ...value.corporateFeatures,
                  { icon: "Briefcase", title: "", detail: "" },
                ],
              })
            }
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted/50"
          >
            <Plus className="h-4 w-4" />
            Add feature
          </button>
        </div>
      </AdminCard>

      <AdminCard>
        <div className="mb-4">
          <h2 className="text-base font-semibold text-[color:var(--brand-navy)]">Tour types</h2>
          <p className="text-sm text-muted-foreground">Holiday category cards on the homepage.</p>
        </div>
        <div className="space-y-3">
          {value.tourTypes.map((tour, index) => (
            <div key={`tour-${index}`} className="rounded-xl border border-border bg-muted/20 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tour type {index + 1}
                </span>
                {value.tourTypes.length > 1 && (
                  <RowActions
                    label={`Remove tour type ${index + 1}`}
                    onRemove={() =>
                      patch({ tourTypes: value.tourTypes.filter((_, i) => i !== index) })
                    }
                  />
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Slug</label>
                  <input
                    value={tour.slug}
                    onChange={(e) => {
                      const tourTypes = [...value.tourTypes];
                      tourTypes[index] = { ...tour, slug: e.target.value };
                      patch({ tourTypes });
                    }}
                    placeholder="beach"
                    className={`${adminInputClass} mt-1`}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Name</label>
                  <input
                    value={tour.name}
                    onChange={(e) => {
                      const tourTypes = [...value.tourTypes];
                      tourTypes[index] = { ...tour, name: e.target.value };
                      patch({ tourTypes });
                    }}
                    placeholder="Beach holidays"
                    className={`${adminInputClass} mt-1`}
                  />
                </div>
                <div className="sm:col-span-3">
                  <AdminImageField
                    label="Tour type image"
                    folder="homepage/tour-types"
                    value={tour.image}
                    onChange={(image) => {
                      const tourTypes = [...value.tourTypes];
                      tourTypes[index] = { ...tour, image };
                      patch({ tourTypes });
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              patch({
                tourTypes: [...value.tourTypes, { slug: "", name: "", image: "" }],
              })
            }
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted/50"
          >
            <Plus className="h-4 w-4" />
            Add tour type
          </button>
        </div>
      </AdminCard>

      <AdminCard>
        <div className="mb-4">
          <h2 className="text-base font-semibold text-[color:var(--brand-navy)]">Holiday themes</h2>
          <p className="text-sm text-muted-foreground">Theme labels for holiday browsing (one per row).</p>
        </div>
        <div className="space-y-2">
          {value.holidayThemes.map((theme, index) => (
            <div key={`theme-${index}`} className="flex items-center gap-2">
              <input
                value={theme}
                onChange={(e) => {
                  const holidayThemes = [...value.holidayThemes];
                  holidayThemes[index] = e.target.value;
                  patch({ holidayThemes });
                }}
                placeholder="e.g. Honeymoon"
                className={`${adminInputClass} flex-1`}
              />
              {value.holidayThemes.length > 1 && (
                <RowActions
                  label={`Remove theme ${index + 1}`}
                  onRemove={() =>
                    patch({ holidayThemes: value.holidayThemes.filter((_, i) => i !== index) })
                  }
                />
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => patch({ holidayThemes: [...value.holidayThemes, ""] })}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted/50"
          >
            <Plus className="h-4 w-4" />
            Add theme
          </button>
        </div>
      </AdminCard>

      <AdminCard>
        <div className="mb-4">
          <h2 className="text-base font-semibold text-[color:var(--brand-navy)]">Call to action</h2>
          <p className="text-sm text-muted-foreground">Bottom banner on the homepage.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <AdminField label="CTA title">
            <input
              value={value.ctaTitle}
              onChange={(e) => patch({ ctaTitle: e.target.value })}
              className={adminInputClass}
            />
          </AdminField>
          <AdminField label="CTA subtitle">
            <input
              value={value.ctaSubtitle}
              onChange={(e) => patch({ ctaSubtitle: e.target.value })}
              className={adminInputClass}
            />
          </AdminField>
        </div>
      </AdminCard>
    </div>
  );
}
