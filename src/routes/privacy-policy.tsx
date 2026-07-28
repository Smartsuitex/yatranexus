import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { useSiteConfig } from "@/contexts/site-config";
import { DEFAULT_PAGE_CONTENT } from "@/lib/page-content";
import { buildPageSeo } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    buildPageSeo({
      path: "/privacy-policy",
      title: "Privacy Policy | YatraNexus",
      description:
        "Privacy policy for YatraNexus — how we collect, use and protect your personal information when you enquire or book travel.",
    }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  const site = useSiteConfig();
  const page = site.pageContent.privacy ?? DEFAULT_PAGE_CONTENT.privacy;
  const title = page?.title || "Privacy Policy";
  const paragraphs = (page?.body || DEFAULT_PAGE_CONTENT.privacy?.body || "")
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
            This policy applies to {site.legalName} (&quot;YatraNexus&quot;, &quot;we&quot;,
            &quot;us&quot;). Contact us at {site.email} for privacy questions.
          </p>
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </>
  );
}
