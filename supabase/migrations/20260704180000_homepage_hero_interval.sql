-- Homepage hero auto-rotate interval (milliseconds)
ALTER TABLE public.homepage_settings
  ADD COLUMN IF NOT EXISTS hero_interval_ms integer NOT NULL DEFAULT 10000;

COMMENT ON COLUMN public.homepage_settings.hero_interval_ms IS
  'Hero background auto-rotate interval in milliseconds (default 10000 = 10 seconds).';
