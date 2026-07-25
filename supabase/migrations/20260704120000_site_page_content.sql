-- Brand fields + flexible page content for About, Contact, Legal, list heroes, etc.
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS legal_name text,
  ADD COLUMN IF NOT EXISTS tagline text,
  ADD COLUMN IF NOT EXISTS page_content jsonb NOT NULL DEFAULT '{}'::jsonb;

UPDATE public.site_settings
SET
  legal_name = COALESCE(legal_name, 'YatraNexus Ventures LLP'),
  tagline = COALESCE(tagline, 'Your Journey, Our Priority')
WHERE id = 1;
