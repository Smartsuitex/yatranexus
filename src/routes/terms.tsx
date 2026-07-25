import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { useSiteConfig } from "@/contexts/site-config";
import { DEFAULT_PAGE_CONTENT } from "@/lib/page-content";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | YatraNexus" },
      {
        name: "description",
        content: "Terms and conditions for using YatraNexus website and travel booking services.",
      },
      { property: "og:title", content: "Terms & Conditions | YatraNexus" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  const site = useSiteConfig();
  const page = site.pageContent.terms ?? DEFAULT_PAGE_CONTENT.terms;
  const title = page?.title || "Terms & Conditions";
  const paragraphs = (page?.body || DEFAULT_PAGE_CONTENT.terms?.body || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <Breadcrumbs items={[{ label: title }]} />
      <div className="page-narrow">
        <h1 className="page-hero-title">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
        </p>
        <div className="mt-10 space-y-6 text-sm leading-relaxed text-foreground/90">
          <p>
            These terms apply to the website and services of {site.legalName}. For questions,
            contact {site.email} or {site.phone}.
          </p>
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </>
  );
}
