import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminImageField } from "@/components/admin/AdminImageField";
import { AdminEmailSettingsCard } from "@/components/admin/AdminEmailSettingsCard";
import {
  AdminNavLinksEditor,
  cleanNavLinksForSave,
} from "@/components/admin/AdminNavLinksEditor";
import {
  AdminSocialLinksFields,
  EMPTY_SOCIAL_LINKS,
  socialFromRecord,
  socialToRecord,
  type SocialLinksForm,
} from "@/components/admin/AdminSocialLinksFields";
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
  type PublicPageContent,
  type SiteNavLink,
} from "@/lib/page-content";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Site Settings | YatraNexus Admin" }] }),
  component: AdminSettingsPage,
});

type SettingsForm = {
  logo_url: string;
  favicon_url: string;
  legal_name: string;
  tagline: string;
  contact_phone: string;
  contact_phone_raw: string;
  contact_email: string;
  contact_whatsapp: string;
  corporate_phone: string;
  corporate_phone_raw: string;
  corporate_email: string;
  corporate_hours: string;
  address: string;
  map_embed_url: string;
  business_hours: string;
  social: SocialLinksForm;
  footer_text: string;
  show_international: boolean;
  whatsapp_preset: string;
  corporate_whatsapp_message: string;
  seo_title: string;
  seo_description: string;
  common_exclusions: string;
  headerLinks: SiteNavLink[];
  exploreLinks: SiteNavLink[];
  companyLinks: SiteNavLink[];
  bottomLinks: SiteNavLink[];
};

function defaultForm(): SettingsForm {
  return {
    logo_url: "",
    favicon_url: "",
    legal_name: "",
    tagline: "",
    contact_phone: "",
    contact_phone_raw: "",
    contact_email: "",
    contact_whatsapp: "",
    corporate_phone: "",
    corporate_phone_raw: "",
    corporate_email: "",
    corporate_hours: "",
    address: "",
    map_embed_url: "",
    business_hours: "",
    social: { ...EMPTY_SOCIAL_LINKS },
    footer_text: "",
    show_international: false,
    whatsapp_preset: "",
    corporate_whatsapp_message: "",
    seo_title: "",
    seo_description: "",
    common_exclusions: "",
    headerLinks: [...(DEFAULT_PAGE_CONTENT.navigation?.headerLinks ?? [])],
    exploreLinks: [...(DEFAULT_PAGE_CONTENT.navigation?.exploreLinks ?? [])],
    companyLinks: [...(DEFAULT_PAGE_CONTENT.navigation?.companyLinks ?? [])],
    bottomLinks: [...(DEFAULT_PAGE_CONTENT.navigation?.bottomLinks ?? [])],
  };
}

function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [pageContent, setPageContent] = useState<PublicPageContent>(DEFAULT_PAGE_CONTENT);
  const [form, setForm] = useState<SettingsForm>(defaultForm);

  const load = useCallback(async () => {
    setLoading(true);
    setDbError(null);
    try {
      const row = await getSiteSettings();
      if (row) {
        const rowExt = row as typeof row & {
          legal_name?: string | null;
          tagline?: string | null;
          page_content?: unknown;
        };
        const content = parsePageContent(rowExt.page_content);
        setPageContent(content);
        const social =
          row.social_links && typeof row.social_links === "object" && !Array.isArray(row.social_links)
            ? (row.social_links as Record<string, string>)
            : {};
        const {
          corporate_phone = "",
          corporate_phone_raw = "",
          corporate_email = "",
          corporate_hours = "",
          ...publicSocial
        } = social;

        setForm({
          logo_url: row.logo_url ?? "",
          favicon_url: row.favicon_url ?? "",
          legal_name: rowExt.legal_name ?? "",
          tagline: rowExt.tagline ?? "",
          contact_phone: row.contact_phone ?? "",
          contact_phone_raw: row.contact_phone_raw ?? "",
          contact_email: row.contact_email ?? "",
          contact_whatsapp: row.contact_whatsapp ?? "",
          corporate_phone,
          corporate_phone_raw,
          corporate_email,
          corporate_hours,
          address: row.address ?? "",
          map_embed_url: row.map_embed_url ?? "",
          business_hours: row.business_hours ?? "",
          social: socialFromRecord(publicSocial),
          footer_text: row.footer_text ?? "",
          show_international: Boolean(content.site?.showInternational),
          whatsapp_preset: content.site?.whatsappPreset ?? "",
          corporate_whatsapp_message: content.site?.corporateWhatsappMessage ?? "",
          seo_title: content.site?.seoTitle ?? "",
          seo_description: content.site?.seoDescription ?? "",
          common_exclusions: (content.site?.commonPackageExclusions ?? []).join("\n"),
          headerLinks:
            content.navigation?.headerLinks ??
            DEFAULT_PAGE_CONTENT.navigation?.headerLinks ??
            [],
          exploreLinks:
            content.navigation?.exploreLinks ??
            DEFAULT_PAGE_CONTENT.navigation?.exploreLinks ??
            [],
          companyLinks:
            content.navigation?.companyLinks ??
            DEFAULT_PAGE_CONTENT.navigation?.companyLinks ??
            [],
          bottomLinks:
            content.navigation?.bottomLinks ??
            DEFAULT_PAGE_CONTENT.navigation?.bottomLinks ??
            [],
        });
      }
    } catch (err) {
      setDbError(err instanceof Error ? err.message : "Could not load site settings");
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
      const social_links = socialToRecord(form.social);
      const headerLinks = cleanNavLinksForSave(form.headerLinks);
      const exploreLinks = cleanNavLinksForSave(form.exploreLinks);
      const companyLinks = cleanNavLinksForSave(form.companyLinks);
      const bottomLinks = cleanNavLinksForSave(form.bottomLinks);

      const nextContent: PublicPageContent = {
        ...pageContent,
        site: {
          ...pageContent.site,
          showInternational: form.show_international,
          whatsappPreset: form.whatsapp_preset || undefined,
          corporateWhatsappMessage: form.corporate_whatsapp_message || undefined,
          seoTitle: form.seo_title || undefined,
          seoDescription: form.seo_description || undefined,
          commonPackageExclusions: form.common_exclusions
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean),
        },
        navigation: {
          headerLinks,
          exploreLinks,
          companyLinks,
          bottomLinks,
        },
      };

      await saveSiteSettings({
        logo_url: form.logo_url || null,
        favicon_url: form.favicon_url || null,
        legal_name: form.legal_name || null,
        tagline: form.tagline || null,
        contact_phone: form.contact_phone || null,
        contact_phone_raw: form.contact_phone_raw || null,
        contact_email: form.contact_email || null,
        contact_whatsapp: form.contact_whatsapp || null,
        address: form.address || null,
        map_embed_url: form.map_embed_url || null,
        business_hours: form.business_hours || null,
        social_links: {
          ...social_links,
          ...(form.corporate_phone ? { corporate_phone: form.corporate_phone } : {}),
          ...(form.corporate_phone_raw
            ? { corporate_phone_raw: form.corporate_phone_raw }
            : {}),
          ...(form.corporate_email ? { corporate_email: form.corporate_email } : {}),
          ...(form.corporate_hours ? { corporate_hours: form.corporate_hours } : {}),
        },
        footer_text: form.footer_text || null,
        page_content: nextContent as never,
      });
      setPageContent(nextContent);
      toast.success("Site settings saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <AdminLoading />;

  return (
    <div className="relative space-y-6 pb-28">
      <AdminPageHeader
        title="Site settings"
        description="Branding, contact, international visibility, navigation, SEO, and email."
      />
      {dbError && <AdminErrorBanner message={dbError} />}
      <AdminCard>
        <form id="admin-site-settings-form" onSubmit={handleSave} className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <h2 className="mb-3 text-sm font-semibold text-[color:var(--brand-navy)]">Branding</h2>
          </div>
          <AdminImageField
            label="Site logo (SVG)"
            hint="Upload an SVG only. Leave empty to use the default YatraNexus SVG logo."
            folder="site/logo"
            value={form.logo_url}
            onChange={(logo_url) => setForm((f) => ({ ...f, logo_url }))}
          />
          <AdminImageField
            label="Favicon"
            hint="Browser tab icon. Recommended: square PNG, at least 64×64."
            folder="site/favicon"
            value={form.favicon_url}
            onChange={(favicon_url) => setForm((f) => ({ ...f, favicon_url }))}
          />
          <AdminField label="Legal company name" hint="Used on Privacy, Terms and footer">
            <input
              value={form.legal_name}
              onChange={(e) => setForm((f) => ({ ...f, legal_name: e.target.value }))}
              className={adminInputClass}
              placeholder="YatraNexus Ventures LLP"
            />
          </AdminField>
          <AdminField
            label="Brand tagline"
            hint="Short slogan (e.g. Your Journey, Our Priority). Homepage hero line is edited under Admin → Homepage → Hero tagline."
          >
            <input
              value={form.tagline}
              onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
              className={adminInputClass}
              placeholder="Your Journey, Our Priority"
            />
          </AdminField>

          <div className="md:col-span-2">
            <h2 className="mb-1 mt-2 text-sm font-semibold text-[color:var(--brand-navy)]">
              Features
            </h2>
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm">
              <input
                type="checkbox"
                checked={form.show_international}
                onChange={(e) =>
                  setForm((f) => ({ ...f, show_international: e.target.checked }))
                }
                className="h-4 w-4"
              />
              <span>
                <span className="font-medium">Show international holidays</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  When off, international destinations, packages, gallery albums and nav links are
                  hidden.
                </span>
              </span>
            </label>
          </div>

          <div className="md:col-span-2">
            <h2 className="mb-1 mt-2 text-sm font-semibold text-[color:var(--brand-navy)]">
              Contact
            </h2>
          </div>
          <AdminField label="Contact phone (display)">
            <input
              value={form.contact_phone}
              onChange={(e) => setForm((f) => ({ ...f, contact_phone: e.target.value }))}
              className={adminInputClass}
              placeholder="+91 98765 43210"
            />
          </AdminField>
          <AdminField label="Contact phone (raw / tel link)">
            <input
              value={form.contact_phone_raw}
              onChange={(e) => setForm((f) => ({ ...f, contact_phone_raw: e.target.value }))}
              className={adminInputClass}
              placeholder="+919876543210"
            />
          </AdminField>
          <AdminField label="Contact email">
            <input
              type="email"
              value={form.contact_email}
              onChange={(e) => setForm((f) => ({ ...f, contact_email: e.target.value }))}
              className={adminInputClass}
            />
          </AdminField>
          <AdminField label="WhatsApp number">
            <input
              value={form.contact_whatsapp}
              onChange={(e) => setForm((f) => ({ ...f, contact_whatsapp: e.target.value }))}
              className={adminInputClass}
            />
          </AdminField>
          <div className="md:col-span-2">
            <AdminField label="Default WhatsApp message" hint="Used by header / floating button">
              <input
                value={form.whatsapp_preset}
                onChange={(e) => setForm((f) => ({ ...f, whatsapp_preset: e.target.value }))}
                className={adminInputClass}
              />
            </AdminField>
          </div>

          <div className="md:col-span-2">
            <h2 className="mb-1 mt-2 text-sm font-semibold text-[color:var(--brand-navy)]">
              Corporate desk
            </h2>
          </div>
          <AdminField label="Corporate phone (display)">
            <input
              value={form.corporate_phone}
              onChange={(e) => setForm((f) => ({ ...f, corporate_phone: e.target.value }))}
              className={adminInputClass}
            />
          </AdminField>
          <AdminField label="Corporate phone (raw)">
            <input
              value={form.corporate_phone_raw}
              onChange={(e) => setForm((f) => ({ ...f, corporate_phone_raw: e.target.value }))}
              className={adminInputClass}
            />
          </AdminField>
          <AdminField label="Corporate email">
            <input
              type="email"
              value={form.corporate_email}
              onChange={(e) => setForm((f) => ({ ...f, corporate_email: e.target.value }))}
              className={adminInputClass}
            />
          </AdminField>
          <AdminField label="Corporate hours">
            <input
              value={form.corporate_hours}
              onChange={(e) => setForm((f) => ({ ...f, corporate_hours: e.target.value }))}
              className={adminInputClass}
            />
          </AdminField>
          <div className="md:col-span-2">
            <AdminField label="Corporate WhatsApp message">
              <input
                value={form.corporate_whatsapp_message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, corporate_whatsapp_message: e.target.value }))
                }
                className={adminInputClass}
              />
            </AdminField>
          </div>

          <div className="md:col-span-2">
            <AdminField label="Address">
              <textarea
                rows={2}
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                className={adminInputClass}
              />
            </AdminField>
          </div>
          <div className="md:col-span-2">
            <AdminField label="Map embed URL">
              <input
                value={form.map_embed_url}
                onChange={(e) => setForm((f) => ({ ...f, map_embed_url: e.target.value }))}
                className={adminInputClass}
              />
            </AdminField>
          </div>
          <div className="md:col-span-2">
            <AdminField label="Business hours">
              <textarea
                rows={2}
                value={form.business_hours}
                onChange={(e) => setForm((f) => ({ ...f, business_hours: e.target.value }))}
                className={adminInputClass}
              />
            </AdminField>
          </div>

          <AdminSocialLinksFields
            value={form.social}
            onChange={(social) => setForm((f) => ({ ...f, social }))}
          />

          <div className="md:col-span-2">
            <AdminField label="Footer text">
              <textarea
                rows={2}
                value={form.footer_text}
                onChange={(e) => setForm((f) => ({ ...f, footer_text: e.target.value }))}
                className={adminInputClass}
              />
            </AdminField>
          </div>

          <div className="md:col-span-2">
            <h2 className="mb-1 mt-2 text-sm font-semibold text-[color:var(--brand-navy)]">
              SEO defaults
            </h2>
          </div>
          <div className="md:col-span-2">
            <AdminField label="Default meta title">
              <input
                value={form.seo_title}
                onChange={(e) => setForm((f) => ({ ...f, seo_title: e.target.value }))}
                className={adminInputClass}
              />
            </AdminField>
          </div>
          <div className="md:col-span-2">
            <AdminField label="Default meta description">
              <textarea
                rows={2}
                value={form.seo_description}
                onChange={(e) => setForm((f) => ({ ...f, seo_description: e.target.value }))}
                className={adminInputClass}
              />
            </AdminField>
          </div>
          <div className="md:col-span-2">
            <AdminField
              label="Common package exclusions"
              hint="One per line — used on inquiry forms"
            >
              <textarea
                rows={5}
                value={form.common_exclusions}
                onChange={(e) => setForm((f) => ({ ...f, common_exclusions: e.target.value }))}
                className={adminInputClass}
              />
            </AdminField>
          </div>

          <div className="md:col-span-2 space-y-6 border-t border-border pt-4">
            <div>
              <h2 className="text-sm font-semibold text-[color:var(--brand-navy)]">
                Navigation
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Pick a page from the list or choose Custom URL. No JSON editing required.
              </p>
            </div>

            <AdminNavLinksEditor
              label="Header links"
              hint="Main menu items (Services dropdown is added automatically from active services)."
              value={form.headerLinks}
              onChange={(headerLinks) => setForm((f) => ({ ...f, headerLinks }))}
            />

            <AdminNavLinksEditor
              label="Footer Explore / Services links"
              hint="Shown in the footer Services columns when used; keep service pages here."
              value={form.exploreLinks}
              onChange={(exploreLinks) => setForm((f) => ({ ...f, exploreLinks }))}
            />

            <AdminNavLinksEditor
              label="Footer Company links"
              hint="Typically About Us, Contact, Blog."
              value={form.companyLinks}
              onChange={(companyLinks) => setForm((f) => ({ ...f, companyLinks }))}
            />

            <AdminNavLinksEditor
              label="Footer bottom legal links"
              hint="Privacy, Terms, and similar links in the footer bar."
              value={form.bottomLinks}
              onChange={(bottomLinks) => setForm((f) => ({ ...f, bottomLinks }))}
            />
          </div>

        </form>
      </AdminCard>

      <AdminEmailSettingsCard floatingSave stackIndex={1} />

      <AdminFloatingSaveButton
        formId="admin-site-settings-form"
        label="Save site settings"
        saving={saving}
        stackIndex={0}
      />
    </div>
  );
}
