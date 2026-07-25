-- Lock destinations CMS writes and cms-images storage to admins only.
-- Fixes policies that previously allowed any authenticated user.

-- Destinations: require is_admin()
DROP POLICY IF EXISTS "Admin manage destinations" ON public.destinations;
CREATE POLICY "Admin manage destinations"
  ON public.destinations FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Disallow SVG in public CMS bucket (XSS risk when opened as a document)
UPDATE storage.buckets
SET allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
WHERE id = 'cms-images';

-- cms-images storage: public read stays; write/delete require is_admin()
DROP POLICY IF EXISTS "Authenticated upload cms images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update cms images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete cms images" ON storage.objects;

CREATE POLICY "Admin upload cms images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'cms-images' AND public.is_admin());

CREATE POLICY "Admin update cms images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'cms-images' AND public.is_admin())
  WITH CHECK (bucket_id = 'cms-images' AND public.is_admin());

CREATE POLICY "Admin delete cms images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'cms-images' AND public.is_admin());
