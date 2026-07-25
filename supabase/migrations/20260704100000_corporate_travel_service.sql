-- Corporate Travel as a CMS-managed service (Admin → Services)
INSERT INTO public.services (
  slug,
  title,
  short_description,
  description,
  icon,
  banner_url,
  content_blocks,
  meta_title,
  meta_description,
  is_active,
  sort_order
)
VALUES (
  'corporate',
  'Corporate Travel',
  'Business tours & MICE solutions for companies.',
  'Business travel made simple with dedicated support, GST invoicing & negotiated corporate fares.',
  'Briefcase',
  '/images/hero/corporate-hero.png',
  '{
    "layout": "corporate",
    "titleFirst": "Corporate & MICE",
    "titleAccent": "Travel Solutions",
    "sectionTitle": "Our Corporate Services"
  }'::jsonb,
  'Corporate & MICE Travel — YatraNexus',
  'Business travel, MICE, crew bookings, GST invoicing and dedicated account management for companies.',
  true,
  8
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  banner_url = COALESCE(public.services.banner_url, EXCLUDED.banner_url),
  content_blocks = EXCLUDED.content_blocks,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  is_active = EXCLUDED.is_active,
  sort_order = EXCLUDED.sort_order;
