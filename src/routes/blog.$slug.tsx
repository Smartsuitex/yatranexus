import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { InquirySection } from "@/components/site/InquirySection";
import { OverlayImageCard } from "@/components/site/OverlayImageCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SafeImage, hasImageSrc } from "@/components/site/SafeImage";
import { fetchPublicBlogPostBySlug, fetchPublicBlogPosts } from "@/lib/public-cms";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const [post, posts] = await Promise.all([
      fetchPublicBlogPostBySlug(params.slug),
      fetchPublicBlogPosts(),
    ]);
    if (!post) throw notFound();
    const related = posts
      .filter((p) => p.slug !== post.slug)
      .filter((p) => !post.category || p.category === post.category)
      .slice(0, 3);
    const relatedFallback =
      related.length > 0
        ? related
        : posts.filter((p) => p.slug !== post.slug).slice(0, 3);
    return { post, relatedPosts: relatedFallback };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [] };
    return {
      meta: [
        {
          title: post.metaTitle ?? `${post.title} | YatraNexus Blog`,
        },
        {
          name: "description",
          content: post.metaDescription ?? post.excerpt,
        },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        ...(post.image ? [{ property: "og:image", content: post.image }] : []),
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post, relatedPosts } = Route.useLoaderData();
  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", to: "/blog" }, { label: post.title }]} />
      <article>
        <header className="page-hero-light">
          <div className="page-narrow">
            <span className="page-hero-light__eyebrow">{post.category}</span>
            <h1 className="mt-2 font-display text-3xl font-bold text-[color:var(--brand-navy-deep)] sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readMinutes} min read
              </span>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8 lg:py-10">
          {hasImageSrc(post.image) && (
            <div className="group overflow-hidden rounded-2xl shadow-soft transition hover:-translate-y-1 hover:shadow-card">
              <SafeImage
                src={post.image}
                alt=""
                className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          )}
          <div className="prose prose-neutral mt-10 max-w-none dark:prose-invert">
            {post.content.map((para, i) => (
              <p key={i} className="mb-4 text-base leading-relaxed text-foreground/90">
                {para}
              </p>
            ))}
          </div>
          <Link
            to="/blog"
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-[color:var(--brand-orange)]"
          >
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>
        </div>
      </article>

      {relatedPosts.length > 0 ? (
        <section className="page-section border-t border-border/60 bg-muted/20">
          <SectionHeading title="Related articles" />
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((related) => (
              <OverlayImageCard
                key={related.slug}
                to="/blog/$slug"
                params={{ slug: related.slug }}
                image={related.image}
                aspect="wide"
              >
                <p className="home-dest-card__tagline uppercase tracking-wider">{related.category}</p>
                <h2 className="home-dest-card__name">{related.title}</h2>
                <p className="home-dest-card__tagline home-dest-card__tagline--clamp">
                  {related.excerpt}
                </p>
              </OverlayImageCard>
            ))}
          </div>
        </section>
      ) : null}

      <InquirySection
        sourcePage={`/blog/${post.slug}`}
        heading="Plan a trip like this"
        subtitle="Loved this destination idea? Send an inquiry and our expert will help you book."
      />
    </>
  );
}
