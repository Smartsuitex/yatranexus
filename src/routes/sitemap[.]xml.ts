import { createFileRoute } from "@tanstack/react-router";
import {
  fetchSitemapBlogSlugs,
  fetchSitemapDestinationSlugs,
  fetchSitemapPackageSlugs,
  fetchSitemapServiceSlugs,
  fetchPublicHomepageSettings,
  resolveShowInternational,
} from "@/lib/public-cms";
import { TOUR_TYPES } from "@/lib/site-data";

const SITE_URL = "https://yatranexus.com";

type SitemapEntry = { loc: string; changefreq: string; priority: string };

async function buildSitemapUrls(): Promise<SitemapEntry[]> {
  const showInternational = await resolveShowInternational();
  const [packageSlugs, blogSlugs, serviceSlugs, domesticSlugs, internationalSlugs, homepage] =
    await Promise.all([
      fetchSitemapPackageSlugs(),
      fetchSitemapBlogSlugs(),
      fetchSitemapServiceSlugs(),
      fetchSitemapDestinationSlugs("domestic"),
      showInternational ? fetchSitemapDestinationSlugs("international") : Promise.resolve([]),
      fetchPublicHomepageSettings(),
    ]);

  const tourTypeSlugs =
    (homepage.tourTypes.length > 0 ? homepage.tourTypes : TOUR_TYPES)
      .map((t) => t.slug.trim())
      .filter(Boolean);

  const staticPages: SitemapEntry[] = [
    { loc: "/", changefreq: "weekly", priority: "1.0" },
    { loc: "/about", changefreq: "monthly", priority: "0.8" },
    { loc: "/contact", changefreq: "monthly", priority: "0.8" },
    { loc: "/services", changefreq: "monthly", priority: "0.9" },
    { loc: "/corporate", changefreq: "monthly", priority: "0.8" },
    { loc: "/holiday-packages", changefreq: "weekly", priority: "0.9" },
    { loc: "/holiday-packages/domestic", changefreq: "weekly", priority: "0.9" },
    ...(showInternational
      ? [{ loc: "/holiday-packages/international", changefreq: "weekly", priority: "0.9" }]
      : []),
    { loc: "/blog", changefreq: "weekly", priority: "0.7" },
    { loc: "/gallery", changefreq: "monthly", priority: "0.6" },
    { loc: "/faq", changefreq: "monthly", priority: "0.6" },
    { loc: "/testimonials", changefreq: "monthly", priority: "0.6" },
    { loc: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
    { loc: "/terms", changefreq: "yearly", priority: "0.3" },
  ];

  const services = serviceSlugs
    .filter((slug) => slug !== "packages" && slug !== "corporate")
    .map((slug) => ({
      loc: `/services/${slug}`,
      changefreq: "monthly",
      priority: "0.8",
    }));

  const domestic = domesticSlugs.map((slug) => ({
    loc: `/holiday-packages/domestic/${slug}`,
    changefreq: "weekly",
    priority: "0.8",
  }));

  const international = internationalSlugs.map((slug) => ({
    loc: `/holiday-packages/international/${slug}`,
    changefreq: "weekly",
    priority: "0.8",
  }));

  const packages = packageSlugs.map((slug) => ({
    loc: `/holiday-packages/package/${slug}`,
    changefreq: "weekly",
    priority: "0.8",
  }));

  const tourTypes = tourTypeSlugs.map((slug) => ({
    loc: `/holiday-packages/tour/${slug}`,
    changefreq: "weekly",
    priority: "0.8",
  }));

  const blog = blogSlugs.map((slug) => ({
    loc: `/blog/${slug}`,
    changefreq: "monthly",
    priority: "0.6",
  }));

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

function toXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (e) =>
        `  <url><loc>${SITE_URL}${e.loc === "/" ? "" : e.loc}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
    )
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
        const xml = toXml(await buildSitemapUrls());
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
