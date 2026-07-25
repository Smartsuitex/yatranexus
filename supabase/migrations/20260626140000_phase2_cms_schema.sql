-- Phase 2: CMS schema + inquiry workflow + admin RLS

DO $$
BEGIN
  CREATE TYPE public.inquiry_status AS ENUM ('new', 'contacted', 'quoted', 'closed', 'spam');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

  ALTER TABLE public.inquiries
    ADD COLUMN IF NOT EXISTS status public.inquiry_status NOT NULL DEFAULT 'new',
    ADD COLUMN IF NOT EXISTS admin_notes TEXT,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

  CREATE OR REPLACE FUNCTION public.set_updated_at()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = now();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  DROP TRIGGER IF EXISTS inquiries_updated_at ON public.inquiries;
  CREATE TRIGGER inquiries_updated_at
    BEFORE UPDATE ON public.inquiries
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

  -- Packages
  CREATE TABLE IF NOT EXISTS public.packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    destination TEXT NOT NULL,
    scope TEXT NOT NULL CHECK (scope IN ('domestic', 'international')),
    nights INT NOT NULL CHECK (nights >= 0),
    days INT NOT NULL CHECK (days >= 1),
    from_price TEXT NOT NULL,
    discount_price TEXT,
    package_code TEXT,
    image_url TEXT,
    gallery_urls TEXT[] NOT NULL DEFAULT '{}',
    inclusions TEXT[] NOT NULL DEFAULT '{}',
    exclusions TEXT[] NOT NULL DEFAULT '{}',
    itinerary JSONB NOT NULL DEFAULT '[]',
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    meta_title TEXT,
    meta_description TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  DROP TRIGGER IF EXISTS packages_updated_at ON public.packages;
  CREATE TRIGGER packages_updated_at
    BEFORE UPDATE ON public.packages
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

  -- Services
  CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    short_description TEXT,
    description TEXT,
    banner_url TEXT,
    icon TEXT,
    gallery_urls TEXT[] NOT NULL DEFAULT '{}',
    inclusions TEXT[] NOT NULL DEFAULT '{}',
    exclusions TEXT[] NOT NULL DEFAULT '{}',
    faqs JSONB NOT NULL DEFAULT '[]',
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  DROP TRIGGER IF EXISTS services_updated_at ON public.services;
  CREATE TRIGGER services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

  -- Blog posts
  CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    category TEXT,
    content JSONB NOT NULL DEFAULT '[]',
    featured_image_url TEXT,
    tags TEXT[] NOT NULL DEFAULT '{}',
    read_minutes INT NOT NULL DEFAULT 5,
    is_published BOOLEAN NOT NULL DEFAULT false,
    published_at TIMESTAMPTZ,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  DROP TRIGGER IF EXISTS blog_posts_updated_at ON public.blog_posts;
  CREATE TRIGGER blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

  -- Gallery
  CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    album TEXT NOT NULL DEFAULT 'General',
    image_url TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- Testimonials
  CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    city TEXT,
    designation TEXT,
    review_text TEXT NOT NULL,
    rating INT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    photo_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- FAQs
  CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'general',
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- Homepage CMS (singleton)
  CREATE TABLE IF NOT EXISTS public.homepage_settings (
    id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    hero_slides JSONB NOT NULL DEFAULT '[]',
    featured_service_slugs TEXT[] NOT NULL DEFAULT '{}',
    featured_package_slugs TEXT[] NOT NULL DEFAULT '{}',
    featured_destination_slugs TEXT[] NOT NULL DEFAULT '{}',
    about_title TEXT,
    about_content TEXT,
    why_choose_us JSONB NOT NULL DEFAULT '[]',
    stats JSONB NOT NULL DEFAULT '[]',
    cta_title TEXT,
    cta_subtitle TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  INSERT INTO public.homepage_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

  -- Site / footer / contact settings (singleton)
  CREATE TABLE IF NOT EXISTS public.site_settings (
    id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    contact_phone TEXT,
    contact_phone_raw TEXT,
    contact_email TEXT,
    contact_whatsapp TEXT,
    address TEXT,
    map_embed_url TEXT,
    business_hours TEXT,
    social_links JSONB NOT NULL DEFAULT '{}',
    footer_text TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  INSERT INTO public.site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

  -- Admin profiles (optional metadata for auth.users)
  CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  -- RLS
  ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.homepage_settings ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

  -- Public read policies
  DROP POLICY IF EXISTS "Public read active packages" ON public.packages;
  CREATE POLICY "Public read active packages"
    ON public.packages FOR SELECT TO anon, authenticated
    USING (is_active = true);

  DROP POLICY IF EXISTS "Public read active services" ON public.services;
  CREATE POLICY "Public read active services"
    ON public.services FOR SELECT TO anon, authenticated
    USING (is_active = true);

  DROP POLICY IF EXISTS "Public read published blog posts" ON public.blog_posts;
  CREATE POLICY "Public read published blog posts"
    ON public.blog_posts FOR SELECT TO anon, authenticated
    USING (is_published = true);

  DROP POLICY IF EXISTS "Public read active gallery images" ON public.gallery_images;
  CREATE POLICY "Public read active gallery images"
    ON public.gallery_images FOR SELECT TO anon, authenticated
    USING (is_active = true);

  DROP POLICY IF EXISTS "Public read active testimonials" ON public.testimonials;
  CREATE POLICY "Public read active testimonials"
    ON public.testimonials FOR SELECT TO anon, authenticated
    USING (is_active = true);

  DROP POLICY IF EXISTS "Public read active faqs" ON public.faqs;
  CREATE POLICY "Public read active faqs"
    ON public.faqs FOR SELECT TO anon, authenticated
    USING (is_active = true);

  DROP POLICY IF EXISTS "Public read homepage settings" ON public.homepage_settings;
  CREATE POLICY "Public read homepage settings"
    ON public.homepage_settings FOR SELECT TO anon, authenticated
    USING (true);

  DROP POLICY IF EXISTS "Public read site settings" ON public.site_settings;
  CREATE POLICY "Public read site settings"
    ON public.site_settings FOR SELECT TO anon, authenticated
    USING (true);

  -- Admin full access (authenticated users = admins for MVP)
  DROP POLICY IF EXISTS "Admin manage packages" ON public.packages;
  CREATE POLICY "Admin manage packages"
    ON public.packages FOR ALL TO authenticated
    USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "Admin manage services" ON public.services;
  CREATE POLICY "Admin manage services"
    ON public.services FOR ALL TO authenticated
    USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "Admin manage blog posts" ON public.blog_posts;
  CREATE POLICY "Admin manage blog posts"
    ON public.blog_posts FOR ALL TO authenticated
    USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "Admin manage gallery" ON public.gallery_images;
  CREATE POLICY "Admin manage gallery"
    ON public.gallery_images FOR ALL TO authenticated
    USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "Admin manage testimonials" ON public.testimonials;
  CREATE POLICY "Admin manage testimonials"
    ON public.testimonials FOR ALL TO authenticated
    USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "Admin manage faqs" ON public.faqs;
  CREATE POLICY "Admin manage faqs"
    ON public.faqs FOR ALL TO authenticated
    USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "Admin manage homepage settings" ON public.homepage_settings;
  CREATE POLICY "Admin manage homepage settings"
    ON public.homepage_settings FOR ALL TO authenticated
    USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "Admin manage site settings" ON public.site_settings;
  CREATE POLICY "Admin manage site settings"
    ON public.site_settings FOR ALL TO authenticated
    USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "Admin read own profile" ON public.admin_profiles;
  CREATE POLICY "Admin read own profile"
    ON public.admin_profiles FOR SELECT TO authenticated
    USING (auth.uid() = id);

  DROP POLICY IF EXISTS "Admin update own profile" ON public.admin_profiles;
  CREATE POLICY "Admin update own profile"
    ON public.admin_profiles FOR UPDATE TO authenticated
    USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

  -- Inquiry admin policies
  DROP POLICY IF EXISTS "Authenticated can read inquiries" ON public.inquiries;

  CREATE POLICY "Authenticated can read inquiries"
    ON public.inquiries FOR SELECT TO authenticated
    USING (true);

  DROP POLICY IF EXISTS "Authenticated can update inquiries" ON public.inquiries;
  CREATE POLICY "Authenticated can update inquiries"
    ON public.inquiries FOR UPDATE TO authenticated
    USING (true) WITH CHECK (true);

  -- Grants
  GRANT SELECT ON public.packages, public.services, public.blog_posts,
    public.gallery_images, public.testimonials, public.faqs,
    public.homepage_settings, public.site_settings TO anon, authenticated;

  GRANT ALL ON public.packages, public.services, public.blog_posts,
    public.gallery_images, public.testimonials, public.faqs,
    public.homepage_settings, public.site_settings TO authenticated;

  GRANT SELECT, UPDATE ON public.inquiries TO authenticated;
  GRANT SELECT ON public.admin_profiles TO authenticated;

  -- Auto-create admin profile on signup
  CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
  RETURNS TRIGGER AS $$
  BEGIN
    INSERT INTO public.admin_profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''))
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

  DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
  CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin_user();
