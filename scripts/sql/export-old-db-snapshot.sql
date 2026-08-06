-- Run in OLD Supabase project SQL Editor (fgrsjqkboltbwatfhcnm)
-- when REST API is blocked but SQL Editor still works.
-- Copy the single JSON result and save as: scripts/output/old-snapshot.json

SELECT json_build_object(
  'exportedAt', now(),
  'project', 'fgrsjqkboltbwatfhcnm',
  'packages', (SELECT COALESCE(json_agg(p ORDER BY sort_order, slug), '[]'::json) FROM public.packages p),
  'destinations', (SELECT COALESCE(json_agg(d ORDER BY sort_order, slug), '[]'::json) FROM public.destinations d),
  'services', (SELECT COALESCE(json_agg(s ORDER BY sort_order, slug), '[]'::json) FROM public.services s),
  'blog_posts', (SELECT COALESCE(json_agg(b ORDER BY slug), '[]'::json) FROM public.blog_posts b),
  'gallery_images', (SELECT COALESCE(json_agg(g ORDER BY sort_order, title), '[]'::json) FROM public.gallery_images g),
  'testimonials', (SELECT COALESCE(json_agg(t ORDER BY sort_order, name), '[]'::json) FROM public.testimonials t),
  'faqs', (SELECT COALESCE(json_agg(f ORDER BY sort_order, question), '[]'::json) FROM public.faqs f),
  'homepage_settings', (SELECT COALESCE(json_agg(h), '[]'::json) FROM public.homepage_settings h),
  'site_settings', (SELECT COALESCE(json_agg(s), '[]'::json) FROM public.site_settings s),
  'email_settings', (SELECT COALESCE(json_agg(e), '[]'::json) FROM public.email_settings e)
) AS snapshot;
