-- =============================================================================
-- OLD Supabase project: fgrsjqkboltbwatfhcnm
-- Run in SQL Editor → export results as CSV, or use the download script locally.
--
-- Script (recommended): npm run download:old-images
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1) ALL image URLs in CMS tables with source (table, field, id, label)
-- -----------------------------------------------------------------------------
WITH image_rows AS (
  -- packages
  SELECT
    'packages'::text AS source_table,
    'image_url'::text AS source_field,
    p.slug AS source_id,
    p.title AS source_label,
    p.image_url AS image_url
  FROM public.packages p
  WHERE p.image_url IS NOT NULL AND btrim(p.image_url) <> ''

  UNION ALL

  SELECT
    'packages',
    'gallery_urls',
    p.slug,
    p.title || ' [gallery ' || g.ord::text || ']',
    g.url
  FROM public.packages p
  CROSS JOIN LATERAL unnest(COALESCE(p.gallery_urls, '{}'::text[]))
    WITH ORDINALITY AS g(url, ord)
  WHERE g.url IS NOT NULL AND btrim(g.url) <> ''

  UNION ALL

  -- destinations
  SELECT
    'destinations',
    'image_url',
    d.slug || ' (' || d.scope || ')',
    d.name,
    d.image_url
  FROM public.destinations d
  WHERE d.image_url IS NOT NULL AND btrim(d.image_url) <> ''

  UNION ALL

  -- services banner
  SELECT
    'services',
    'banner_url',
    s.slug,
    s.title,
    s.banner_url
  FROM public.services s
  WHERE s.banner_url IS NOT NULL AND btrim(s.banner_url) <> ''

  UNION ALL

  SELECT
    'services',
    'gallery_urls',
    s.slug,
    s.title || ' [gallery ' || g.ord::text || ']',
    g.url
  FROM public.services s
  CROSS JOIN LATERAL unnest(COALESCE(s.gallery_urls, '{}'::text[]))
    WITH ORDINALITY AS g(url, ord)
  WHERE g.url IS NOT NULL AND btrim(g.url) <> ''

  UNION ALL

  -- blog
  SELECT
    'blog_posts',
    'featured_image_url',
    b.slug,
    b.title,
    b.featured_image_url
  FROM public.blog_posts b
  WHERE b.featured_image_url IS NOT NULL AND btrim(b.featured_image_url) <> ''

  UNION ALL

  -- gallery
  SELECT
    'gallery_images',
    'image_url',
    g.id::text,
    g.title || ' (' || g.album || ')',
    g.image_url
  FROM public.gallery_images g
  WHERE g.image_url IS NOT NULL AND btrim(g.image_url) <> ''

  UNION ALL

  -- testimonials
  SELECT
    'testimonials',
    'photo_url',
    t.id::text,
    t.name || ' (' || COALESCE(t.city, '') || ')',
    t.photo_url
  FROM public.testimonials t
  WHERE t.photo_url IS NOT NULL AND btrim(t.photo_url) <> ''

  UNION ALL

  -- site settings
  SELECT
    'site_settings',
    'logo_url',
    '1',
    'Site logo',
    ss.logo_url
  FROM public.site_settings ss
  WHERE ss.logo_url IS NOT NULL AND btrim(ss.logo_url) <> ''

  UNION ALL

  SELECT
    'site_settings',
    'favicon_url',
    '1',
    'Site favicon',
    ss.favicon_url
  FROM public.site_settings ss
  WHERE ss.favicon_url IS NOT NULL AND btrim(ss.favicon_url) <> ''

  UNION ALL

  -- homepage hero slides
  SELECT
    'homepage_settings',
    'hero_slides.image',
    'slide-' || slide.ord::text,
    COALESCE(slide.elem->>'title', slide.elem->>'headline', 'Hero slide ' || slide.ord::text),
    slide.elem->>'image'
  FROM public.homepage_settings hs
  CROSS JOIN LATERAL jsonb_array_elements(COALESCE(hs.hero_slides::jsonb, '[]'::jsonb))
    WITH ORDINALITY AS slide(elem, ord)
  WHERE slide.elem->>'image' IS NOT NULL AND btrim(slide.elem->>'image') <> ''

  UNION ALL

  -- homepage tour types
  SELECT
    'homepage_settings',
    'tour_types.image',
    COALESCE(tt.elem->>'slug', 'tour-' || tt.ord::text),
    COALESCE(tt.elem->>'title', tt.elem->>'label', 'Tour type ' || tt.ord::text),
    tt.elem->>'image'
  FROM public.homepage_settings hs
  CROSS JOIN LATERAL jsonb_array_elements(COALESCE(hs.tour_types::jsonb, '[]'::jsonb))
    WITH ORDINALITY AS tt(elem, ord)
  WHERE tt.elem->>'image' IS NOT NULL AND btrim(tt.elem->>'image') <> ''

  UNION ALL

  -- homepage holiday themes (if image field exists)
  SELECT
    'homepage_settings',
    'holiday_themes.image',
    COALESCE(ht.elem->>'slug', 'theme-' || ht.ord::text),
    COALESCE(ht.elem->>'title', ht.elem->>'label', 'Holiday theme ' || ht.ord::text),
    ht.elem->>'image'
  FROM public.homepage_settings hs
  CROSS JOIN LATERAL jsonb_array_elements(COALESCE(hs.holiday_themes::jsonb, '[]'::jsonb))
    WITH ORDINALITY AS ht(elem, ord)
  WHERE ht.elem->>'image' IS NOT NULL AND btrim(ht.elem->>'image') <> ''
)
SELECT
  source_table,
  source_field,
  source_id,
  source_label,
  image_url,
  CASE
    WHEN image_url LIKE '%/cms-images/%' THEN 'supabase-upload'
    WHEN image_url LIKE '%unsplash.com%' THEN 'unsplash-external'
    WHEN image_url LIKE '/images/%' THEN 'local-path'
    ELSE 'other'
  END AS image_source,
  CASE
    WHEN image_url LIKE '%/cms-images/%' THEN
      regexp_replace(image_url, '.*\/cms-images\/', '')
    ELSE NULL
  END AS storage_path,
  CASE
    WHEN image_url LIKE '%/cms-images/%' THEN
      '/images/' || regexp_replace(image_url, '.*\/cms-images\/', '')
    ELSE NULL
  END AS local_path
FROM image_rows
ORDER BY image_source, source_table, source_id;


-- -----------------------------------------------------------------------------
-- 2) Supabase URLs inside services.content_blocks JSON (nested images)
--    Run separately if you need catalog/hero images from service pages.
-- -----------------------------------------------------------------------------
SELECT
  'services'::text AS source_table,
  'content_blocks (nested)'::text AS source_field,
  s.slug AS source_id,
  s.title AS source_label,
  m[1] AS image_url,
  'supabase-upload'::text AS image_source,
  regexp_replace(m[1], '.*\/cms-images\/', '') AS storage_path,
  '/images/' || regexp_replace(m[1], '.*\/cms-images\/', '') AS local_path
FROM public.services s
CROSS JOIN LATERAL regexp_matches(
  s.content_blocks::text,
  'https://[^''"\s]+/cms-images/[^''"\s]+',
  'g'
) AS m
ORDER BY s.slug, storage_path;


-- -----------------------------------------------------------------------------
-- 3) List ALL files in Supabase Storage bucket (cms-images)
--    Requires access to storage.objects
-- -----------------------------------------------------------------------------
SELECT
  o.name AS storage_path,
  '/images/' || o.name AS local_path,
  o.bucket_id,
  o.metadata->>'mimetype' AS mime_type,
  (o.metadata->>'size')::bigint AS size_bytes,
  o.created_at,
  o.updated_at
FROM storage.objects o
WHERE o.bucket_id = 'cms-images'
ORDER BY o.name;


-- -----------------------------------------------------------------------------
-- 4) Summary counts by source type
-- -----------------------------------------------------------------------------
WITH all_urls AS (
  SELECT image_url FROM (
    SELECT image_url FROM public.packages WHERE image_url IS NOT NULL
    UNION ALL SELECT image_url FROM public.destinations WHERE image_url IS NOT NULL
    UNION ALL SELECT banner_url FROM public.services WHERE banner_url IS NOT NULL
    UNION ALL SELECT featured_image_url FROM public.blog_posts WHERE featured_image_url IS NOT NULL
    UNION ALL SELECT image_url FROM public.gallery_images WHERE image_url IS NOT NULL
    UNION ALL SELECT photo_url FROM public.testimonials WHERE photo_url IS NOT NULL
  ) t
)
SELECT
  CASE
    WHEN image_url LIKE '%/cms-images/%' THEN 'supabase-upload'
    WHEN image_url LIKE '%unsplash.com%' THEN 'unsplash-external'
    WHEN image_url LIKE '/images/%' THEN 'local-path'
    ELSE 'other'
  END AS image_source,
  COUNT(*) AS row_count
FROM all_urls
GROUP BY 1
ORDER BY 2 DESC;
