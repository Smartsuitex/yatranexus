-- =============================================================================
-- YatraNexus — cleanup logs + unused CMS storage references
-- Run in: Supabase Dashboard → SQL Editor (as postgres / service role)
--
-- HOW TO USE
--   1) Run SECTION A (preview) only first — review counts/rows.
--   2) Uncomment SECTION B deletes you want, then run those statements.
--   3) For actually removing Storage files, prefer:
--        node scripts/cleanup-unused-storage.mjs
--      (SQL delete of storage.objects alone can leave blobs behind.)
--
-- SAFE DEFAULTS
--   - Spam inquiries older than 30 days
--   - Closed inquiries older than 180 days (optional, commented)
--   - Auth audit logs older than 90 days (optional)
--   - Orphan cms-images objects (preview only here)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- SECTION A — PREVIEW (always safe)
-- -----------------------------------------------------------------------------

-- A1) Inquiry status breakdown
SELECT status, count(*) AS total,
       min(created_at) AS oldest,
       max(created_at) AS newest
FROM public.inquiries
GROUP BY status
ORDER BY total DESC;

-- A2) Spam inquiries older than 30 days (would be deleted)
SELECT id, name, email, phone, status, created_at, source_page
FROM public.inquiries
WHERE status = 'spam'
  AND created_at < now() - interval '30 days'
ORDER BY created_at ASC
LIMIT 200;

SELECT count(*) AS spam_to_delete
FROM public.inquiries
WHERE status = 'spam'
  AND created_at < now() - interval '30 days';

-- A3) Closed inquiries older than 180 days (optional cleanup)
SELECT count(*) AS closed_old_count
FROM public.inquiries
WHERE status = 'closed'
  AND created_at < now() - interval '180 days';

-- A4) Auth audit log size (if table exists)
DO $$
BEGIN
  IF to_regclass('auth.audit_log_entries') IS NOT NULL THEN
    RAISE NOTICE 'auth.audit_log_entries rows: %',
      (SELECT count(*) FROM auth.audit_log_entries);
    RAISE NOTICE 'auth.audit_log_entries older than 90 days: %',
      (SELECT count(*) FROM auth.audit_log_entries
       WHERE created_at < now() - interval '90 days');
  ELSE
    RAISE NOTICE 'auth.audit_log_entries not present on this project';
  END IF;
END $$;

-- A5) Collect every CMS image path currently referenced by app tables
CREATE TEMP TABLE IF NOT EXISTS tmp_used_cms_paths (
  object_path text PRIMARY KEY
);

TRUNCATE tmp_used_cms_paths;

-- Helper: pull path after /cms-images/ from a full public URL or raw path
CREATE OR REPLACE FUNCTION pg_temp.cms_path_from_url(u text)
RETURNS text
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT NULLIF(
    trim(BOTH '/' FROM
      CASE
        WHEN u IS NULL OR btrim(u) = '' THEN NULL
        WHEN position('/cms-images/' in u) > 0
          THEN substring(u from position('/cms-images/' in u) + length('/cms-images/'))
        WHEN u NOT LIKE 'http%' AND u NOT LIKE '/%'
          THEN u  -- already a storage object path
        ELSE NULL
      END
    ),
    ''
  );
$$;

INSERT INTO tmp_used_cms_paths (object_path)
SELECT DISTINCT p FROM (
  SELECT pg_temp.cms_path_from_url(image_url) AS p FROM public.packages
  UNION ALL
  SELECT pg_temp.cms_path_from_url(x) FROM public.packages, unnest(coalesce(gallery_urls, '{}'::text[])) AS x
  UNION ALL
  SELECT pg_temp.cms_path_from_url(banner_url) FROM public.services
  UNION ALL
  SELECT pg_temp.cms_path_from_url(x) FROM public.services, unnest(coalesce(gallery_urls, '{}'::text[])) AS x
  UNION ALL
  SELECT pg_temp.cms_path_from_url(featured_image_url) FROM public.blog_posts
  UNION ALL
  SELECT pg_temp.cms_path_from_url(image_url) FROM public.gallery_images
  UNION ALL
  SELECT pg_temp.cms_path_from_url(photo_url) FROM public.testimonials
  UNION ALL
  SELECT pg_temp.cms_path_from_url(image_url) FROM public.destinations
  UNION ALL
  SELECT pg_temp.cms_path_from_url(logo_url) FROM public.site_settings
  UNION ALL
  SELECT pg_temp.cms_path_from_url(favicon_url) FROM public.site_settings
  UNION ALL
  -- homepage hero_slides / tour types JSON (common keys)
  SELECT pg_temp.cms_path_from_url(elem->>'image')
  FROM public.homepage_settings,
       lateral jsonb_array_elements(coalesce(hero_slides::jsonb, '[]'::jsonb)) AS elem
  UNION ALL
  SELECT pg_temp.cms_path_from_url(elem->>'image_url')
  FROM public.homepage_settings,
       lateral jsonb_array_elements(coalesce(hero_slides::jsonb, '[]'::jsonb)) AS elem
  UNION ALL
  SELECT pg_temp.cms_path_from_url(elem->>'url')
  FROM public.homepage_settings,
       lateral jsonb_array_elements(coalesce(hero_slides::jsonb, '[]'::jsonb)) AS elem
  UNION ALL
  SELECT pg_temp.cms_path_from_url(elem->>'image')
  FROM public.homepage_settings,
       lateral jsonb_array_elements(coalesce(tour_types::jsonb, '[]'::jsonb)) AS elem
  UNION ALL
  SELECT pg_temp.cms_path_from_url(elem->>'image_url')
  FROM public.homepage_settings,
       lateral jsonb_array_elements(coalesce(tour_types::jsonb, '[]'::jsonb)) AS elem
  UNION ALL
  -- services.content_blocks may embed image URLs in nested JSON
  SELECT pg_temp.cms_path_from_url(match[1])
  FROM public.services,
       lateral regexp_matches(
         coalesce(content_blocks::text, ''),
         '/cms-images/([^"''\\s]+)',
         'g'
       ) AS match
) s
WHERE p IS NOT NULL
ON CONFLICT DO NOTHING;

SELECT count(*) AS referenced_cms_paths FROM tmp_used_cms_paths;

-- A6) Orphan storage objects in cms-images (not referenced by any CMS row)
SELECT o.name AS orphan_path,
       o.metadata->>'size' AS size_bytes,
       o.created_at,
       o.updated_at
FROM storage.objects o
LEFT JOIN tmp_used_cms_paths u ON u.object_path = o.name
WHERE o.bucket_id = 'cms-images'
  AND u.object_path IS NULL
ORDER BY o.created_at ASC
LIMIT 500;

SELECT count(*) AS orphan_cms_files
FROM storage.objects o
LEFT JOIN tmp_used_cms_paths u ON u.object_path = o.name
WHERE o.bucket_id = 'cms-images'
  AND u.object_path IS NULL;

-- -----------------------------------------------------------------------------
-- SECTION B — DELETES (uncomment carefully after reviewing preview)
-- -----------------------------------------------------------------------------

-- B1) Delete spam inquiries older than 30 days
-- BEGIN;
-- DELETE FROM public.inquiries
-- WHERE status = 'spam'
--   AND created_at < now() - interval '30 days';
-- COMMIT;

-- B2) Delete closed inquiries older than 180 days (optional)
-- BEGIN;
-- DELETE FROM public.inquiries
-- WHERE status = 'closed'
--   AND created_at < now() - interval '180 days';
-- COMMIT;

-- B3) Trim auth audit logs older than 90 days (optional)
-- BEGIN;
-- DELETE FROM auth.audit_log_entries
-- WHERE created_at < now() - interval '90 days';
-- COMMIT;

-- B4) DO NOT delete storage.objects here unless you accept possible orphan blobs.
--     Prefer: node scripts/cleanup-unused-storage.mjs --delete
--
-- BEGIN;
-- DELETE FROM storage.objects o
-- USING (
--   SELECT o2.id
--   FROM storage.objects o2
--   LEFT JOIN tmp_used_cms_paths u ON u.object_path = o2.name
--   WHERE o2.bucket_id = 'cms-images'
--     AND u.object_path IS NULL
-- ) orphans
-- WHERE o.id = orphans.id;
-- COMMIT;

-- Cleanup temp helper for this session
DROP FUNCTION IF EXISTS pg_temp.cms_path_from_url(text);
