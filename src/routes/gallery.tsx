import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { InquirySection } from "@/components/site/InquirySection";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CmsPageHero } from "@/components/site/CmsPageHero";
import { useSiteConfig } from "@/contexts/site-config";
import { DEFAULT_PAGE_CONTENT } from "@/lib/page-content";
import { fetchPublicGallery, resolveShowInternational } from "@/lib/public-cms";
import { SafeImage } from "@/components/site/SafeImage";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  loader: async () => {
    const [images, showInternational] = await Promise.all([
      fetchPublicGallery(),
      resolveShowInternational(),
    ]);
    return { images, showInternational };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: "Photo Gallery — Destinations | YatraNexus" },
      {
        name: "description",
        content: loaderData?.showInternational
          ? "Browse photos from domestic and international trips planned by YatraNexus — inspiration for your next holiday."
          : "Browse photos from domestic trips planned by YatraNexus — inspiration for your next holiday.",
      },
      { property: "og:title", content: "Photo Gallery | YatraNexus" },
      {
        property: "og:description",
        content: "Destination snapshots from across India and the world.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { images } = Route.useLoaderData();
  const site = useSiteConfig();
  const hero = site.pageContent.gallery ?? DEFAULT_PAGE_CONTENT.gallery ?? {};
  const albums = site.showInternational
    ? (["All", "Domestic", "International"] as const)
    : (["All", "Domestic"] as const);
  const [album, setAlbum] = useState<(typeof albums)[number]>("All");
  const filtered =
    album === "All" ? images : images.filter((img) => img.album === album);

  return (
    <>
      <Breadcrumbs items={[{ label: "Gallery" }]} />
      <CmsPageHero
        headingId="gallery-heading"
        content={hero}
        fallback={DEFAULT_PAGE_CONTENT.gallery ?? {}}
        simple
      />

      <section className="page-section">
        <div className="flex flex-wrap gap-2">
          {albums.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAlbum(a)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                album === a
                  ? "bg-brand-gradient text-white shadow-soft"
                  : "border border-border bg-background text-foreground/80 hover:border-primary/40",
              )}
            >
              {a}
            </button>
          ))}
        </div>

        <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.length === 0 ? (
            <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
              No photos in this album yet.
            </p>
          ) : (
            filtered.map((img) => (
              <figure key={img.id} className="overlay-figure mb-4 break-inside-avoid">
                <SafeImage
                  src={img.image}
                  alt={img.title}
                  className="w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="overlay-figure__caption">
                  <p className="overlay-figure__title">{img.title}</p>
                  <p className="overlay-figure__meta">{img.album}</p>
                </figcaption>
              </figure>
            ))
          )}
        </div>
      </section>

      <InquirySection
        sourcePage="/gallery"
        heading="Inspired to travel?"
        subtitle="Tell us which destination caught your eye — we'll help you plan the perfect trip."
      />
    </>
  );
}
