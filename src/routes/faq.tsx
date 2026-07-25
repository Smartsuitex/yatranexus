import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CmsPageHero } from "@/components/site/CmsPageHero";
import { InquiryForm } from "@/components/site/InquiryForm";
import { useSiteConfig } from "@/contexts/site-config";
import { DEFAULT_PAGE_CONTENT } from "@/lib/page-content";
import { fetchPublicFaqs } from "@/lib/public-cms";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  loader: async () => {
    const faqs = await fetchPublicFaqs();
    return { faqs };
  },
  head: () => ({
    meta: [
      { title: "FAQ — Frequently Asked Questions | YatraNexus" },
      {
        name: "description",
        content:
          "Answers to common questions about booking holidays, visas, payments and corporate travel with YatraNexus.",
      },
      { property: "og:title", content: "FAQ | YatraNexus" },
      {
        property: "og:description",
        content: "Quick answers before you plan your next trip with us.",
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { faqs } = Route.useLoaderData();
  const site = useSiteConfig();
  const hero = site.pageContent.faq ?? DEFAULT_PAGE_CONTENT.faq ?? {};
  const whatsappHref = `${site.whatsappBase}?text=${encodeURIComponent("Hi YatraNexus, I have a question about booking.")}`;

  return (
    <>
      <Breadcrumbs items={[{ label: "FAQ" }]} />
      <CmsPageHero
        headingId="faq-heading"
        content={{
          ...hero,
          subtitle:
            hero.subtitle ||
            `Can't find what you need? Message us on WhatsApp or call ${site.phone} — we're happy to help.`,
        }}
        fallback={DEFAULT_PAGE_CONTENT.faq ?? {}}
        simple
      />

      <section className="page-narrow">
        <Accordion type="single" collapsible className="faq-accordion">
          {faqs.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="faq-accordion__item">
              <AccordionTrigger className="faq-accordion__trigger text-left text-base pr-2 sm:pr-4">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-8 rounded-2xl border border-border/70 bg-muted/30 p-6 text-center transition hover:-translate-y-0.5 hover:border-[color:var(--brand-orange)]/35 hover:shadow-card">
          <p className="text-sm text-muted-foreground">Still have questions?</p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:brightness-110 hover:shadow-glow"
          >
            Chat on WhatsApp
          </a>
        </div>
        <div className="mt-10 border-t border-border/60 pt-8">
          <InquiryForm sourcePage="/faq" />
        </div>
      </section>
    </>
  );
}
