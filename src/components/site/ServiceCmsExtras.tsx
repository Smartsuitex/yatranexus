import { SectionHeading } from "@/components/site/SectionHeading";
import type { PublicService } from "@/lib/public-cms";

type Props = {
  service: PublicService;
  className?: string;
};

/** Renders CMS inclusions, exclusions, and FAQs when present. */
export function ServiceCmsExtras({ service, className }: Props) {
  const inclusions = service.inclusions ?? [];
  const exclusions = service.exclusions ?? [];
  const faqs = service.faqs ?? [];

  if (!inclusions.length && !exclusions.length && !faqs.length) return null;

  return (
    <section className={className ?? "page-section"}>
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        {(inclusions.length > 0 || exclusions.length > 0) && (
          <div className="grid gap-6 md:grid-cols-2">
            {inclusions.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="font-display text-lg font-semibold text-[color:var(--brand-navy-deep)]">
                  Inclusions
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {inclusions.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[color:var(--brand-orange)]" aria-hidden="true">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {exclusions.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="font-display text-lg font-semibold text-[color:var(--brand-navy-deep)]">
                  Exclusions
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {exclusions.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-muted-foreground" aria-hidden="true">
                        –
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {faqs.length > 0 && (
          <div>
            <SectionHeading
              title={`${service.title} FAQs`}
              subtitle="Common questions about this service."
            />
            <div className="mt-6 space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-2xl border border-border bg-card px-5 py-4 shadow-soft"
                >
                  <summary className="cursor-pointer font-display text-base font-semibold text-[color:var(--brand-navy-deep)]">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
