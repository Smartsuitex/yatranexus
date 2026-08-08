import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { HomepageEditor } from "@/components/admin/HomepageEditor";
import { AdminFloatingSaveButton } from "@/components/admin/AdminFloatingSaveButton";
import {
  AdminErrorBanner,
  AdminLoading,
  AdminPageHeader,
} from "@/components/admin/AdminPageHeader";
import {
  getHomepageSettings,
  listDestinations,
  listPackages,
  listServices,
  saveHomepageSettings,
} from "@/lib/admin-cms-api";
import {
  defaultHomepageForm,
  homepageFormToPayload,
  homepageRowToForm,
  type HomepageFormState,
} from "@/lib/homepage-admin";

export const Route = createFileRoute("/admin/homepage")({
  head: () => ({ meta: [{ title: "Homepage | YatraNexus Admin" }] }),
  component: AdminHomepagePage,
});

function AdminHomepagePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [form, setForm] = useState<HomepageFormState>(defaultHomepageForm());
  const [packageOptions, setPackageOptions] = useState<{ slug: string; label: string }[]>([]);
  const [serviceOptions, setServiceOptions] = useState<{ slug: string; label: string }[]>([]);
  const [destinationOptions, setDestinationOptions] = useState<{ slug: string; label: string }[]>(
    [],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setDbError(null);
    try {
      const [row, packages, services, destinations] = await Promise.all([
        getHomepageSettings(),
        listPackages(),
        listServices(),
        listDestinations(),
      ]);
      setForm(homepageRowToForm(row));
      setPackageOptions(
        packages
          .filter((p) => p.is_active !== false)
          .map((p) => ({ slug: p.slug, label: p.title })),
      );
      setServiceOptions([
        { slug: "packages", label: "Holiday Packages (homepage card)" },
        ...services
          .filter((s) => s.is_active !== false)
          .map((s) => ({ slug: s.slug, label: s.title })),
      ]);
      setDestinationOptions(
        destinations.map((d) => ({ slug: d.slug, label: d.name })),
      );
    } catch (err) {
      setDbError(err instanceof Error ? err.message : "Could not load homepage settings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const dirtyHint = useMemo(
    () => "Changes are saved to the live homepage when you click Save.",
    [],
  );

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const missingPackages = form.featuredPackageSlugs.filter(
        (slug) => !packageOptions.some((p) => p.slug === slug),
      );
      const missingServices = form.featuredServiceSlugs.filter(
        (slug) => !serviceOptions.some((s) => s.slug === slug),
      );
      const missingDestinations = form.featuredDestinationSlugs.filter(
        (slug) => !destinationOptions.some((d) => d.slug === slug),
      );
      if (missingPackages.length || missingServices.length || missingDestinations.length) {
        const parts = [
          missingPackages.length ? `packages: ${missingPackages.join(", ")}` : "",
          missingServices.length ? `services: ${missingServices.join(", ")}` : "",
          missingDestinations.length ? `destinations: ${missingDestinations.join(", ")}` : "",
        ].filter(Boolean);
        toast.warning(`Some featured items no longer exist (${parts.join(" · ")}).`);
      }

      const payload = homepageFormToPayload(form);
      // #region agent log
      fetch("http://127.0.0.1:7377/ingest/fa815d2a-6e74-490b-be7b-8bf8047ce565", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "00bc0d",
        },
        body: JSON.stringify({
          sessionId: "00bc0d",
          runId: "hero-pre",
          hypothesisId: "C",
          location: "admin.homepage.tsx:save",
          message: "Admin homepage save payload hero fields",
          data: {
            slideCount: Array.isArray(payload.hero_slides)
              ? payload.hero_slides.length
              : 0,
            intervalSeconds: form.heroIntervalSeconds,
            slides: Array.isArray(payload.hero_slides)
              ? payload.hero_slides.map((s) => {
                  const slide = s as { name?: string; image?: string };
                  return { name: slide.name, image: slide.image };
                })
              : [],
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
      const { skippedHeroInterval } = await saveHomepageSettings(payload);
      // #region agent log
      fetch("http://127.0.0.1:7377/ingest/fa815d2a-6e74-490b-be7b-8bf8047ce565", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "00bc0d",
        },
        body: JSON.stringify({
          sessionId: "00bc0d",
          runId: "hero-pre",
          hypothesisId: "C",
          location: "admin.homepage.tsx:save-result",
          message: "Admin homepage save finished",
          data: { skippedHeroInterval: !!skippedHeroInterval },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
      if (skippedHeroInterval) {
        toast.warning(
          "Homepage saved, but hero slide interval could not be updated. Check MySQL schema (homepage_settings.hero_interval_ms).",
          { duration: 8000 },
        );
      } else {
        toast.success("Homepage settings saved");
      }
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
        title="Homepage"
        description="Edit homepage hero, services, destinations, stats, testimonials area, and CTA — no JSON or code required."
      />
      {dbError && <AdminErrorBanner message={dbError} />}
      <form id="admin-homepage-form" onSubmit={handleSave} className="space-y-6">
        <HomepageEditor
          value={form}
          onChange={setForm}
          packageOptions={packageOptions}
          serviceOptions={serviceOptions}
          destinationOptions={destinationOptions}
        />
      </form>
      <AdminFloatingSaveButton
        formId="admin-homepage-form"
        label="Save homepage settings"
        saving={saving}
        hint={dirtyHint}
      />
    </div>
  );
}
