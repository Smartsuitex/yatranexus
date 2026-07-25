import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AdminFeatureItemsEditor,
  cleanFeatureItems,
} from "@/components/admin/AdminFeatureItemsEditor";
import { AdminImageField } from "@/components/admin/AdminImageField";
import {
  AdminKeyValueEditor,
  recordToRows,
  rowsToRecord,
  type KeyValueRow,
} from "@/components/admin/AdminKeyValueEditor";
import {
  AdminCard,
  AdminErrorBanner,
  AdminField,
  AdminLoading,
  AdminPageHeader,
  adminInputClass,
} from "@/components/admin/AdminPageHeader";
import { AdminFloatingSaveButton } from "@/components/admin/AdminFloatingSaveButton";
import { getSiteSettings, saveSiteSettings } from "@/lib/admin-cms-api";
import {
  DEFAULT_PAGE_CONTENT,
  parsePageContent,
  type PageHeroContent,
  type PublicPageContent,
} from "@/lib/page-content";

export const Route = createFileRoute("/admin/pages")({
  head: () => ({ meta: [{ title: "Page Content | YatraNexus Admin" }] }),
  component: AdminPagesPage,
});

type SectionId =
  | "about"
  | "contact"
  | "privacy"
  | "terms"
  | "servicesIndex"
  | "blog"
  | "gallery"
  | "faq"
  | "testimonials"
  | "holidayDomestic"
  | "holidayInternational"
  | "homepage";

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms" },
  { id: "servicesIndex", label: "Services list" },
  { id: "blog", label: "Blog list" },
  { id: "gallery", label: "Gallery list" },
  { id: "faq", label: "FAQ list" },
  { id: "testimonials", label: "Testimonials list" },
  { id: "holidayDomestic", label: "Holiday Domestic" },
  { id: "holidayInternational", label: "Holiday International" },
  { id: "homepage", label: "Homepage chrome" },
];

function HeroFields({
  value,
  onChange,
}: {
  value: PageHeroContent;
  onChange: (next: PageHeroContent) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <AdminField label="Eyebrow">
        <input
          value={value.eyebrow ?? ""}
          onChange={(e) => onChange({ ...value, eyebrow: e.target.value })}
          className={adminInputClass}
        />
      </AdminField>
      <AdminField label="Title (first part)">
        <input
          value={value.titleFirst ?? ""}
          onChange={(e) => onChange({ ...value, titleFirst: e.target.value })}
          className={adminInputClass}
        />
      </AdminField>
      <AdminField label="Title accent (gradient)">
        <input
          value={value.titleAccent ?? ""}
          onChange={(e) => onChange({ ...value, titleAccent: e.target.value })}
          className={adminInputClass}
        />
      </AdminField>
      <AdminImageField
        label="Hero section image"
        hint="Upload or pick the page hero background. Shown full-bleed behind the title. You can also paste /images/hero/… paths."
        folder="banners"
        value={value.bannerUrl ?? ""}
        onChange={(bannerUrl) => onChange({ ...value, bannerUrl })}
      />
      <div className="md:col-span-2">
        <AdminField label="Subtitle">
          <textarea
            rows={3}
            value={value.subtitle ?? ""}
            onChange={(e) => onChange({ ...value, subtitle: e.target.value })}
            className={adminInputClass}
          />
        </AdminField>
      </div>
    </div>
  );
}

function AdminPagesPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [section, setSection] = useState<SectionId>("about");
  const [content, setContent] = useState<PublicPageContent>(DEFAULT_PAGE_CONTENT);
  const [destinationPrices, setDestinationPrices] = useState<KeyValueRow[]>([]);
  const [destinationTaglines, setDestinationTaglines] = useState<KeyValueRow[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    setDbError(null);
    try {
      const row = await getSiteSettings();
      const rowExt = row as typeof row & { page_content?: unknown };
      const parsed = parsePageContent(rowExt?.page_content);
      setContent(parsed);
      setDestinationPrices(recordToRows(parsed.homepage?.destinationPrices));
      setDestinationTaglines(recordToRows(parsed.homepage?.destinationTaglines));
    } catch (err) {
      setDbError(err instanceof Error ? err.message : "Could not load page content");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const nextContent: PublicPageContent = {
        ...content,
        about: content.about
          ? {
              ...content.about,
              offerItems: cleanFeatureItems(content.about.offerItems ?? []),
              valuesItems: cleanFeatureItems(content.about.valuesItems ?? []),
            }
          : content.about,
        contact: content.contact
          ? {
              ...content.contact,
              promises: cleanFeatureItems(content.contact.promises ?? []),
            }
          : content.contact,
        homepage: {
          ...content.homepage,
          trustBar: cleanFeatureItems(content.homepage?.trustBar ?? []),
          destinationPrices: rowsToRecord(destinationPrices),
          destinationTaglines: rowsToRecord(destinationTaglines),
        },
      };

      await saveSiteSettings({
        page_content: nextContent,
      });
      setContent(nextContent);
      toast.success("Page content saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <AdminLoading />;

  return (
    <div className="relative space-y-6 pb-24">
      <AdminPageHeader
        title="Page content"
        description="Edit heroes (title + hero section image), About/Contact copy, holiday indexes, and homepage chrome. Holiday Packages hub hero is under Services → Holiday Packages."
      />
      {dbError && <AdminErrorBanner message={dbError} />}

      <div className="rounded-2xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
        <strong className="text-foreground">Hero section images:</strong> set each page’s{" "}
        <em>Hero section image</em> below (About, Contact, Domestic, International, list pages).
        Service heroes (Flights, Hotels, Cabs, Visa, Insurance, Forex, Corporate, Holiday Packages)
        are under <strong className="text-foreground">Admin → Services</strong>. Package card/detail
        images are under <strong className="text-foreground">Admin → Holiday Packages</strong>.
        Homepage slides are under <strong className="text-foreground">Admin → Homepage</strong>.
      </div>

      <div className="flex flex-wrap gap-2">
        {SECTIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSection(item.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              section === item.id
                ? "bg-brand-gradient text-white"
                : "border border-border bg-card hover:bg-muted/50"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <AdminCard>
        <form id="admin-page-content-form" onSubmit={handleSave} className="space-y-6">
          {section === "about" && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold">About page</h2>
              <HeroFields
                value={content.about ?? {}}
                onChange={(about) => setContent((c) => ({ ...c, about: { ...c.about, ...about } }))}
              />
              <AdminField label="Who we are title">
                <input
                  value={content.about?.whoWeAreTitle ?? ""}
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      about: { ...c.about, whoWeAreTitle: e.target.value },
                    }))
                  }
                  className={adminInputClass}
                />
              </AdminField>
              <AdminField label="Who we are body" hint="Separate paragraphs with a blank line">
                <textarea
                  rows={6}
                  value={content.about?.whoWeAreBody ?? ""}
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      about: { ...c.about, whoWeAreBody: e.target.value },
                    }))
                  }
                  className={adminInputClass}
                />
              </AdminField>
              <div className="grid gap-4 md:grid-cols-2">
                <AdminField label="Mission title">
                  <input
                    value={content.about?.missionTitle ?? ""}
                    onChange={(e) =>
                      setContent((c) => ({
                        ...c,
                        about: { ...c.about, missionTitle: e.target.value },
                      }))
                    }
                    className={adminInputClass}
                  />
                </AdminField>
                <AdminField label="Vision title">
                  <input
                    value={content.about?.visionTitle ?? ""}
                    onChange={(e) =>
                      setContent((c) => ({
                        ...c,
                        about: { ...c.about, visionTitle: e.target.value },
                      }))
                    }
                    className={adminInputClass}
                  />
                </AdminField>
                <AdminField label="Mission detail">
                  <textarea
                    rows={3}
                    value={content.about?.missionDetail ?? ""}
                    onChange={(e) =>
                      setContent((c) => ({
                        ...c,
                        about: { ...c.about, missionDetail: e.target.value },
                      }))
                    }
                    className={adminInputClass}
                  />
                </AdminField>
                <AdminField label="Vision detail">
                  <textarea
                    rows={3}
                    value={content.about?.visionDetail ?? ""}
                    onChange={(e) =>
                      setContent((c) => ({
                        ...c,
                        about: { ...c.about, visionDetail: e.target.value },
                      }))
                    }
                    className={adminInputClass}
                  />
                </AdminField>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <AdminField label="CTA title">
                  <input
                    value={content.about?.ctaTitle ?? ""}
                    onChange={(e) =>
                      setContent((c) => ({
                        ...c,
                        about: { ...c.about, ctaTitle: e.target.value },
                      }))
                    }
                    className={adminInputClass}
                  />
                </AdminField>
                <AdminField label="CTA subtitle">
                  <input
                    value={content.about?.ctaSubtitle ?? ""}
                    onChange={(e) =>
                      setContent((c) => ({
                        ...c,
                        about: { ...c.about, ctaSubtitle: e.target.value },
                      }))
                    }
                    className={adminInputClass}
                  />
                </AdminField>
              </div>
              <AdminField label="Offer section title">
                <input
                  value={content.about?.offerTitle ?? ""}
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      about: { ...c.about, offerTitle: e.target.value },
                    }))
                  }
                  className={adminInputClass}
                />
              </AdminField>
              <AdminFeatureItemsEditor
                label="What we offer items"
                hint="Add cards with icon, title, detail, and colour."
                value={content.about?.offerItems ?? []}
                onChange={(offerItems) =>
                  setContent((c) => ({
                    ...c,
                    about: { ...c.about, offerItems },
                  }))
                }
              />
              <AdminField label="Values section title">
                <input
                  value={content.about?.valuesTitle ?? ""}
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      about: { ...c.about, valuesTitle: e.target.value },
                    }))
                  }
                  className={adminInputClass}
                />
              </AdminField>
              <AdminFeatureItemsEditor
                label="Values items"
                hint="Short value cards shown on the About page."
                value={content.about?.valuesItems ?? []}
                onChange={(valuesItems) =>
                  setContent((c) => ({
                    ...c,
                    about: { ...c.about, valuesItems },
                  }))
                }
              />
            </div>
          )}

          {section === "contact" && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold">Contact page</h2>
              <HeroFields
                value={content.contact ?? {}}
                onChange={(contact) =>
                  setContent((c) => ({ ...c, contact: { ...c.contact, ...contact } }))
                }
              />
              <div className="grid gap-4 md:grid-cols-2">
                <AdminField label="Form title">
                  <input
                    value={content.contact?.formTitle ?? ""}
                    onChange={(e) =>
                      setContent((c) => ({
                        ...c,
                        contact: { ...c.contact, formTitle: e.target.value },
                      }))
                    }
                    className={adminInputClass}
                  />
                </AdminField>
                <AdminField label="Form subtitle">
                  <input
                    value={content.contact?.formSubtitle ?? ""}
                    onChange={(e) =>
                      setContent((c) => ({
                        ...c,
                        contact: { ...c.contact, formSubtitle: e.target.value },
                      }))
                    }
                    className={adminInputClass}
                  />
                </AdminField>
                <AdminField label="CTA title">
                  <input
                    value={content.contact?.ctaTitle ?? ""}
                    onChange={(e) =>
                      setContent((c) => ({
                        ...c,
                        contact: { ...c.contact, ctaTitle: e.target.value },
                      }))
                    }
                    className={adminInputClass}
                  />
                </AdminField>
                <AdminField label="CTA subtitle">
                  <input
                    value={content.contact?.ctaSubtitle ?? ""}
                    onChange={(e) =>
                      setContent((c) => ({
                        ...c,
                        contact: { ...c.contact, ctaSubtitle: e.target.value },
                      }))
                    }
                    className={adminInputClass}
                  />
                </AdminField>
              </div>
              <AdminField label="Form note">
                <input
                  value={content.contact?.formNote ?? ""}
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      contact: { ...c.contact, formNote: e.target.value },
                    }))
                  }
                  className={adminInputClass}
                />
              </AdminField>
              <AdminField label="Promises section title">
                <input
                  value={content.contact?.promisesTitle ?? ""}
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      contact: { ...c.contact, promisesTitle: e.target.value },
                    }))
                  }
                  className={adminInputClass}
                />
              </AdminField>
              <AdminFeatureItemsEditor
                label="Promises"
                hint="Trust / promise cards on the Contact page."
                value={content.contact?.promises ?? []}
                onChange={(promises) =>
                  setContent((c) => ({
                    ...c,
                    contact: { ...c.contact, promises },
                  }))
                }
              />
            </div>
          )}

          {(section === "privacy" || section === "terms") && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold">
                {section === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
              </h2>
              <AdminField label="Page title">
                <input
                  value={content[section]?.title ?? ""}
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      [section]: { ...c[section], title: e.target.value },
                    }))
                  }
                  className={adminInputClass}
                />
              </AdminField>
              <AdminField label="Page body" hint="Separate paragraphs with a blank line">
                <textarea
                  rows={12}
                  value={content[section]?.body ?? ""}
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      [section]: { ...c[section], body: e.target.value },
                    }))
                  }
                  className={adminInputClass}
                />
              </AdminField>
            </div>
          )}

          {[
            "servicesIndex",
            "blog",
            "gallery",
            "faq",
            "testimonials",
            "holidayDomestic",
            "holidayInternational",
          ].includes(section) && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold">
                {SECTIONS.find((s) => s.id === section)?.label} hero
              </h2>
              <HeroFields
                value={(content[section as keyof PublicPageContent] as PageHeroContent) ?? {}}
                onChange={(hero) =>
                  setContent((c) => ({
                    ...c,
                    [section]: { ...(c[section as keyof PublicPageContent] as object), ...hero },
                  }))
                }
              />
            </div>
          )}

          {section === "homepage" && (
            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold">Homepage chrome</h2>
              <AdminField label="Hero trust pills" hint="One label per line">
                <textarea
                  rows={4}
                  value={(content.homepage?.trustPills ?? []).join("\n")}
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      homepage: {
                        ...c.homepage,
                        trustPills: e.target.value
                          .split("\n")
                          .map((line) => line.trim())
                          .filter(Boolean),
                      },
                    }))
                  }
                  className={adminInputClass}
                />
              </AdminField>
              <AdminFeatureItemsEditor
                label="Trust bar under hero"
                hint="Icon cards shown under the homepage hero."
                value={content.homepage?.trustBar ?? []}
                onChange={(trustBar) =>
                  setContent((c) => ({
                    ...c,
                    homepage: { ...c.homepage, trustBar },
                  }))
                }
              />
              <AdminImageField
                label="Corporate banner image"
                folder="corporate"
                value={content.homepage?.corporateBannerUrl ?? ""}
                onChange={(corporateBannerUrl) =>
                  setContent((c) => ({
                    ...c,
                    homepage: { ...c.homepage, corporateBannerUrl },
                  }))
                }
              />
              <AdminKeyValueEditor
                label="Destination prices"
                hint="Destination slug + starting price shown on cards."
                keyPlaceholder="Destination slug (e.g. goa)"
                valuePlaceholder="₹8,999"
                value={destinationPrices}
                onChange={setDestinationPrices}
              />
              <AdminKeyValueEditor
                label="Destination taglines"
                hint="Destination slug + short tagline."
                keyPlaceholder="Destination slug (e.g. goa)"
                valuePlaceholder="Beach Bliss"
                value={destinationTaglines}
                onChange={setDestinationTaglines}
              />

              <h3 className="pt-2 font-display text-base font-semibold">Section headings</h3>
              <p className="text-xs text-muted-foreground">
                Eyebrows, titles and leads for homepage sections below the hero.
              </p>
              {(
                [
                  ["tourTypesEyebrow", "Tour types eyebrow"],
                  ["tourTypesTitle", "Tour types title"],
                  ["tourTypesLead", "Tour types lead"],
                  ["featuredEyebrow", "Featured packages eyebrow"],
                  ["featuredTitle", "Featured packages title"],
                  ["domesticEyebrow", "Domestic destinations eyebrow"],
                  ["domesticTitle", "Domestic destinations title"],
                  ["whyChooseEyebrow", "Why choose us eyebrow"],
                  ["whyChooseTitle", "Why choose us title"],
                  ["whyChooseLead", "Why choose us lead"],
                  ["howItWorksEyebrow", "How it works eyebrow"],
                  ["howItWorksTitle", "How it works title"],
                  ["howItWorksLead", "How it works lead"],
                  ["testimonialsEyebrow", "Testimonials eyebrow"],
                  ["testimonialsTitle", "Testimonials title"],
                  ["testimonialsLead", "Testimonials lead"],
                ] as const
              ).map(([key, label]) => (
                <AdminField key={key} label={label}>
                  <input
                    value={content.homepage?.[key] ?? ""}
                    onChange={(e) =>
                      setContent((c) => ({
                        ...c,
                        homepage: { ...c.homepage, [key]: e.target.value },
                      }))
                    }
                    className={adminInputClass}
                    placeholder={DEFAULT_PAGE_CONTENT.homepage?.[key] ?? ""}
                  />
                </AdminField>
              ))}
            </div>
          )}

        </form>
      </AdminCard>

      {/* Always visible while scrolling — fixed to the viewport bottom-right */}
      <AdminFloatingSaveButton
        formId="admin-page-content-form"
        label="Save page content"
        saving={saving}
      />
    </div>
  );
}
