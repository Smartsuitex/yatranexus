import { createFileRoute } from "@tanstack/react-router";
import { InquirySection } from "@/components/site/InquirySection";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CmsPageHero } from "@/components/site/CmsPageHero";
import { OverlayImageCard } from "@/components/site/OverlayImageCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useSiteConfig } from "@/contexts/site-config";
import { DEFAULT_PAGE_CONTENT } from "@/lib/page-content";
import { fetchPublicBlogPosts } from "@/lib/public-cms";

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    const posts = await fetchPublicBlogPosts();
    return { posts };
  },
  head: () => ({
    meta: [
      { title: "Travel Blog — Tips & Guides | YatraNexus" },
      {
        name: "description",
        content:
          "Travel tips, visa guides and destination ideas from the YatraNexus team — for domestic and international trips.",
      },
      { property: "og:title", content: "Travel Blog | YatraNexus" },
      {
        property: "og:description",
        content: "Inspiration and practical advice for your next journey.",
      },
    ],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const { posts } = Route.useLoaderData();
  const site = useSiteConfig();
  const hero = site.pageContent.blog ?? DEFAULT_PAGE_CONTENT.blog ?? {};

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog" }]} />
      <CmsPageHero
        headingId="blog-index-heading"
        content={hero}
        fallback={DEFAULT_PAGE_CONTENT.blog ?? {}}
        simple
      />

      <section className="page-section">
        <SectionHeading title="Latest articles" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <OverlayImageCard
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              image={post.image}
              aspect="wide"
            >
              <p className="home-dest-card__tagline uppercase tracking-wider">{post.category}</p>
              <h2 className="home-dest-card__name">{post.title}</h2>
              <p className="home-dest-card__tagline home-dest-card__tagline--clamp">{post.excerpt}</p>
              <p className="home-dest-card__tagline mt-1.5">
                {new Date(post.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}{" "}
                · {post.readMinutes} min read
              </p>
            </OverlayImageCard>
          ))}
        </div>
      </section>

      <InquirySection
        sourcePage="/blog"
        heading="Need help planning your trip?"
        subtitle="Our travel experts turn inspiration into booked holidays — send an inquiry today."
      />
    </>
  );
}
