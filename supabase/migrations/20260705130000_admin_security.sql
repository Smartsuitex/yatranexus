-- Admin-only access: restrict CMS write/read (admin tables) to admin_profiles.role = 'admin'
-- Stop auto-creating admin profiles for every auth signup

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_admin_user();

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, anon;

-- Email settings: track secret presence without exposing values to client reads
ALTER TABLE public.email_settings
  ADD COLUMN IF NOT EXISTS resend_api_key_set BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS smtp_password_set BOOLEAN NOT NULL DEFAULT false;

UPDATE public.email_settings
SET
  resend_api_key_set = COALESCE(resend_api_key, '') <> '',
  smtp_password_set = COALESCE(smtp_password, '') <> ''
WHERE id = 1;

-- Replace broad authenticated CMS policies with is_admin()

DROP POLICY IF EXISTS "Admin manage packages" ON public.packages;
CREATE POLICY "Admin manage packages"
  ON public.packages FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin manage services" ON public.services;
CREATE POLICY "Admin manage services"
  ON public.services FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin manage blog posts" ON public.blog_posts;
CREATE POLICY "Admin manage blog posts"
  ON public.blog_posts FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin manage gallery" ON public.gallery_images;
CREATE POLICY "Admin manage gallery"
  ON public.gallery_images FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin manage testimonials" ON public.testimonials;
CREATE POLICY "Admin manage testimonials"
  ON public.testimonials FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin manage faqs" ON public.faqs;
CREATE POLICY "Admin manage faqs"
  ON public.faqs FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin manage homepage settings" ON public.homepage_settings;
CREATE POLICY "Admin manage homepage settings"
  ON public.homepage_settings FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin manage site settings" ON public.site_settings;
CREATE POLICY "Admin manage site settings"
  ON public.site_settings FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin read email settings" ON public.email_settings;
DROP POLICY IF EXISTS "Admin manage email settings" ON public.email_settings;
CREATE POLICY "Admin manage email settings"
  ON public.email_settings FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Authenticated can read inquiries" ON public.inquiries;
CREATE POLICY "Admin can read inquiries"
  ON public.inquiries FOR SELECT TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Authenticated can update inquiries" ON public.inquiries;
CREATE POLICY "Admin can update inquiries"
  ON public.inquiries FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin read own profile" ON public.admin_profiles;
CREATE POLICY "Admin read own profile"
  ON public.admin_profiles FOR SELECT TO authenticated
  USING (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Admin update own profile" ON public.admin_profiles;
CREATE POLICY "Admin update own profile"
  ON public.admin_profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
