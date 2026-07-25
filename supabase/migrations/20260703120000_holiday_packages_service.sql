-- Holiday Packages as a CMS-managed service (Admin → Services)
INSERT INTO public.services (
  slug,
  title,
  short_description,
  description,
  icon,
  content_blocks,
  meta_title,
  meta_description,
  is_active,
  sort_order
)
VALUES (
  'packages',
  'Holiday Packages',
  'Curated holidays across India and abroad.',
  'Hand-crafted itineraries across India — fully customisable with real experts on WhatsApp.',
  'Palmtree',
  '{
    "layout": "holiday",
    "eyebrow": "Holiday packages",
    "titleFirst": "Holidays you''ll",
    "titleAccent": "Remember",
    "sectionTitle": "Browse by region"
  }'::jsonb,
  'Holiday Packages — Domestic & International | YatraNexus',
  'Curated holiday packages across India — Goa, Kerala, Rajasthan, Kashmir and more.',
  true,
  4
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  content_blocks = EXCLUDED.content_blocks,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  is_active = EXCLUDED.is_active,
  sort_order = EXCLUDED.sort_order;
