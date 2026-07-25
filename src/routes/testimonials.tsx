import { createFileRoute } from "@tanstack/react-router";
import { Quote, Star } from "lucide-react";
import { InquirySection } from "@/components/site/InquirySection";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CmsPageHero } from "@/components/site/CmsPageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useSiteConfig } from "@/contexts/site-config";
import { DEFAULT_PAGE_CONTENT } from "@/lib/page-content";
import { fetchPublicTestimonials } from "@/lib/public-cms";

export const Route = createFileRoute("/testimonials")({
  staleTime: 0,
  loader: async () => {
    const testimonials = await fetchPublicTestimonials();
    return { testimonials };
  },
  head: () => ({
    meta: [
      { title: "Customer Testimonials | YatraNexus" },
      {
        name: "description",
        content:
          "Read what travellers across India say about YatraNexus — holidays, visas and corporate trips planned with care.",
      },
      { property: "og:title", content: "Testimonials | YatraNexus" },
      {
        property: "og:description",
        content: "Real reviews from real travellers.",
      },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const { testimonials } = Route.useLoaderData();
  const site = useSiteConfig();
  const hero = site.pageContent.testimonials ?? DEFAULT_PAGE_CONTENT.testimonials ?? {};

  return (
    <>
      <Breadcrumbs items={[{ label: "Testimonials" }]} />
      <CmsPageHero
        headingId="testimonials-heading"
        content={hero}
        fallback={DEFAULT_PAGE_CONTENT.testimonials ?? {}}
        simple
      />

      <section className="page-section">
        <SectionHeading title="What our customers say" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.id}
              className="group flex flex-col rounded-2xl border border-border/70 bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-[color:var(--brand-orange)]/35 hover:shadow-card"
            >
              <Quote className="h-8 w-8 text-primary/40" />
              <div
                className="mt-3 flex items-center gap-0.5 text-[color:var(--brand-orange)]"
                aria-label={`${Math.min(5, Math.max(1, Number(t.rating) || 5))} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => {
                  const filled = i < Math.min(5, Math.max(1, Number(t.rating) || 5));
                  return (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${filled ? "fill-current" : "fill-none opacity-35"}`}
                      aria-hidden="true"
                    />
                  );
                })}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">{t.text}</p>
              <footer className="mt-5 border-t border-border/60 pt-4">
                <cite className="not-italic">
                  <span className="font-semibold text-foreground transition-colors group-hover:text-[color:var(--brand-orange)]">
                    {t.name}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {t.city}
                    {t.designation ? ` · ${t.designation}` : ""}
                  </span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <InquirySection
        sourcePage="/testimonials"
        heading="Ready for your own story?"
        subtitle="Join thousands of happy travellers — send an inquiry and we'll plan your trip."
      />
    </>
  );
}
