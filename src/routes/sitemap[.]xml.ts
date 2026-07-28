import { createFileRoute } from "@tanstack/react-router";
import {
  fetchSitemapBlogSlugs,
  fetchSitemapDestinationSlugs,
  fetchSitemapPackageSlugs,
  fetchSitemapServiceSlugs,
  fetchPublicHomepageSettings,
  resolveShowInternational,
} from "@/lib/public-cms";
import { getSiteUrl } from "@/lib/seo";
import { TOUR_TYPES } from "@/lib/site-data";

type SitemapEntry = {
  loc: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
};

async function buildSitemapUrls(): Promise<SitemapEntry[]> {
  const showInternational = await resolveShowInternational();
  const lastmod = new Date().toISOString().slice(0, 10);
  const [packageSlugs, blogSlugs, serviceSlugs, domesticSlugs, internationalSlugs, homepage] =
    await Promise.all([
      fetchSitemapPackageSlugs(),
      fetchSitemapBlogSlugs(),
      fetchSitemapServiceSlugs(),
      fetchSitemapDestinationSlugs("domestic"),
      showInternational ? fetchSitemapDestinationSlugs("international") : Promise.resolve([]),
      fetchPublicHomepageSettings(),
    ]);

  const tourTypeSlugs = (homepage.tourTypes.length > 0 ? homepage.tourTypes : TOUR_TYPES)
    .map((t) => t.slug.trim())
    .filter(Boolean);

  const withMeta = (
    loc: string,
    changefreq: string,
    priority: string,
  ): SitemapEntry => ({ loc, changefreq, priority, lastmod });

  const staticPages: SitemapEntry[] = [
    withMeta("/", "daily", "1.0"),
    withMeta("/about", "monthly", "0.8"),
    withMeta("/contact", "monthly", "0.9"),
    withMeta("/services", "weekly", "0.9"),
    withMeta("/corporate", "monthly", "0.8"),
    withMeta("/holiday-packages", "daily", "0.95"),
    withMeta("/holiday-packages/domestic", "weekly", "0.9"),
    ...(showInternational
      ? [withMeta("/holiday-packages/international", "weekly", "0.9")]
      : []),
    withMeta("/blog", "weekly", "0.7"),
    withMeta("/gallery", "monthly", "0.5"),
    withMeta("/faq", "monthly", "0.7"),
    withMeta("/testimonials", "monthly", "0.6"),
    withMeta("/privacy-policy", "yearly", "0.2"),
    withMeta("/terms", "yearly", "0.2"),
  ];

  const services = serviceSlugs
    .filter((slug) => slug !== "packages" && slug !== "corporate")
    .map((slug) => withMeta(`/services/${slug}`, "weekly", "0.85"));

  const domestic = domesticSlugs.map((slug) =>
    withMeta(`/holiday-packages/domestic/${slug}`, "weekly", "0.85"),
  );

  const international = internationalSlugs.map((slug) =>
    withMeta(`/holiday-packages/international/${slug}`, "weekly", "0.85"),
  );

  const packages = packageSlugs.map((slug) =>
    withMeta(`/holiday-packages/package/${slug}`, "weekly", "0.9"),
  );

  const tourTypes = tourTypeSlugs.map((slug) =>
    withMeta(`/holiday-packages/tour/${slug}`, "weekly", "0.8"),
  );

  const blog = blogSlugs.map((slug) => withMeta(`/blog/${slug}`, "monthly", "0.65"));

  return [
    ...staticPages,
    ...services,
    ...domestic,
    ...international,
    ...packages,
    ...tourTypes,
    ...blog,
  ];
}

function toXml(entries: SitemapEntry[], siteUrl: string): string {
  const urls = entries
    .map((e) => {
      const loc = `${siteUrl}${e.loc === "/" ? "" : e.loc}`;
      const lastmod = e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : "";
      return `  <url><loc>${loc}</loc>${lastmod}<changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const xml = toXml(await buildSitemapUrls(), getSiteUrl());
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
