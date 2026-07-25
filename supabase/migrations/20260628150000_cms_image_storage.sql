-- CMS image storage bucket + site branding fields

DO $do$
BEGIN
  ALTER TABLE public.site_settings
    ADD COLUMN IF NOT EXISTS logo_url TEXT,
    ADD COLUMN IF NOT EXISTS favicon_url TEXT;
END
$do$;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'cms-images',
  'cms-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Public read cms images" ON storage.objects;
CREATE POLICY "Public read cms images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'cms-images');

DROP POLICY IF EXISTS "Authenticated upload cms images" ON storage.objects;
CREATE POLICY "Authenticated upload cms images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'cms-images');

DROP POLICY IF EXISTS "Authenticated update cms images" ON storage.objects;
CREATE POLICY "Authenticated update cms images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'cms-images')
  WITH CHECK (bucket_id = 'cms-images');

DROP POLICY IF EXISTS "Authenticated delete cms images" ON storage.objects;
CREATE POLICY "Authenticated delete cms images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'cms-images');
