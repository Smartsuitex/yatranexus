import { SectionHeading } from "@/components/site/SectionHeading";
import { InquirySection } from "@/components/site/InquirySection";
import { ServiceCmsExtras } from "@/components/site/ServiceCmsExtras";
import { resolveCmsIcon } from "@/lib/cms-icons";
import type { PublicService } from "@/lib/public-cms";

type Props = {
  service: PublicService;
};

export function ServiceDetailPage({ service }: Props) {
  const blocks = service.contentBlocks;
  const heroTitle = blocks.heroTitle ?? service.title;
  const isVisa = blocks.layout === "visa" || service.slug === "visa";

  return (
    <>
      <section className="page-hero-light page-hero-light--compact">
        <div className="page-hero">
          <span className="page-hero-light__eyebrow">{service.title}</span>
          <h1 className="page-hero-title">{heroTitle}</h1>
          <p className="page-hero-light__lead">{service.description}</p>
        </div>
      </section>

      {isVisa && blocks.steps && blocks.steps.length > 0 && (
        <section className="page-section">
          <SectionHeading
            title="How the visa process works"
            subtitle="A simple, transparent five-step journey."
          />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
            {blocks.steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient font-display font-bold text-white">
                  {s.n}
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.detail}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className={isVisa ? "bg-soft-gradient" : undefined}>
        <div className="page-section space-y-10">
          {isVisa && blocks.visaCountries && blocks.visaCountries.length > 0 && (
            <>
              <SectionHeading
                eyebrow="Popular destinations"
                title="Indicative processing times"
                subtitle="Times depend on embassy load and your profile. We give you exact estimates after a quick chat."
              />
              <div className="overflow-x-auto overflow-touch rounded-2xl border border-border bg-card">
                <table className="w-full min-w-[480px] text-sm">
                  <thead className="bg-muted/60 text-left">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Country</th>
                      <th className="px-5 py-3 font-semibold">Visa type</th>
                      <th className="px-5 py-3 font-semibold">Processing time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blocks.visaCountries.map((v) => (
                      <tr key={v.country} className="border-t border-border">
                        <td className="px-5 py-3 font-medium">{v.country}</td>
                        <td className="px-5 py-3 text-muted-foreground">{v.type}</td>
                        <td className="px-5 py-3 text-muted-foreground">{v.processing}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {blocks.features && blocks.features.length > 0 && (
            <>
              {!isVisa && (
                <SectionHeading title={blocks.sectionTitle ?? `Why choose our ${service.title.toLowerCase()}`} />
              )}
              <div className={`grid grid-cols-2 gap-3 sm:gap-5 ${isVisa ? "sm:grid-cols-3" : "lg:grid-cols-3"}`}>
                {blocks.features.map((f) => {
                  const Icon = resolveCmsIcon(f.icon);
                  return (
                    <div
                      key={f.title}
                      className="rounded-2xl border border-border bg-card p-5 shadow-soft"
                    >
                      <Icon className="h-6 w-6 text-[color:var(--brand-orange)]" />
                      <h3 className="mt-3 font-display text-lg font-semibold">{f.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{f.detail}</p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <ServiceCmsExtras service={service} />

      <InquirySection
        heading={`Inquire about ${service.title.toLowerCase()}`}
        subtitle="Share your travel details — our team will contact you within working hours."
        defaultService={service.slug}
        hideServiceSelect
        sourcePage={`/services/${service.slug}`}
      />
    </>
  );
}
