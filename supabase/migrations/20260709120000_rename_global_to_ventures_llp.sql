-- Rename legacy legal entity name across CMS settings.
UPDATE public.site_settings
SET
  legal_name = REPLACE(legal_name, 'YatraNexus Global LLP', 'YatraNexus Ventures LLP'),
  footer_text = REPLACE(footer_text, 'YatraNexus Global LLP', 'YatraNexus Ventures LLP'),
  address = REPLACE(address, 'YatraNexus Global LLP', 'YatraNexus Ventures LLP')
WHERE COALESCE(legal_name, '') ILIKE '%YatraNexus Global LLP%'
   OR COALESCE(footer_text, '') ILIKE '%YatraNexus Global LLP%'
   OR COALESCE(address, '') ILIKE '%YatraNexus Global LLP%';

UPDATE public.homepage_settings
SET about_content = REPLACE(about_content, 'YatraNexus Global LLP', 'YatraNexus Ventures LLP')
WHERE COALESCE(about_content, '') ILIKE '%YatraNexus Global LLP%';

UPDATE public.site_settings
SET page_content = REPLACE(page_content::text, 'YatraNexus Global LLP', 'YatraNexus Ventures LLP')::jsonb
WHERE page_content::text ILIKE '%YatraNexus Global LLP%';
