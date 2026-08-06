-- =============================================================================
-- YatraNexus — FULL CMS bootstrap for a NEW Supabase project
-- Generated: 2026-08-06T05:57:05.316Z
--
-- PREREQUISITE (run first):
--   scripts/sql/migrate-all-packages-new-supabase.sql
--
-- HOW TO USE
--   1) New Supabase project → SQL Editor
--   2) Run packages script first (destinations + 122 packages)
--   3) Paste & run THIS entire script
--   4) Create admin user:
--        Set in .env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_PASSWORD
--        node scripts/setup-admin-user.mjs
--   5) Point app .env VITE_SUPABASE_* to the new project
--
-- INCLUDED
--   inquiries, services, blog, gallery, testimonials, faqs,
--   homepage/site/email settings, admin_profiles, is_admin() RLS,
--   cms-images storage bucket, CMS content seeds
-- SKIPPED (already covered by packages script / admin setup script)
--   destination/package bulk seeds, grant/create admin SQL
-- =============================================================================


-- ############################################################################
-- SOURCE: 20260619144833_2da4de72-1685-4f99-b41c-a0876cc70ae6.sql
-- ############################################################################

CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_type TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  destination TEXT,
  travel_date DATE,
  travelers INT,
  message TEXT,
  package_name TEXT,
  source_page TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.inquiries TO anon;
GRANT INSERT, SELECT ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit an inquiry" ON public.inquiries;
CREATE POLICY "Anyone can submit an inquiry"
  ON public.inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 100
    AND length(phone) BETWEEN 5 AND 20
    AND length(service_type) BETWEEN 1 AND 50
    AND (email IS NULL OR length(email) <= 255)
    AND (message IS NULL OR length(message) <= 2000)
  );

DROP POLICY IF EXISTS "Authenticated can read inquiries" ON public.inquiries;
CREATE POLICY "Authenticated can read inquiries"
  ON public.inquiries FOR SELECT
  TO authenticated
  USING (true);



-- ############################################################################
-- SOURCE: 20260626120000_inquiry_subject_inclusions.sql
-- ############################################################################

ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS subject TEXT,
  ADD COLUMN IF NOT EXISTS selected_inclusions TEXT[],
  ADD COLUMN IF NOT EXISTS selected_exclusions TEXT[];

DROP POLICY IF EXISTS "Anyone can submit an inquiry" ON public.inquiries;

CREATE POLICY "Anyone can submit an inquiry"
  ON public.inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 100
    AND length(phone) BETWEEN 5 AND 20
    AND length(service_type) BETWEEN 1 AND 50
    AND (email IS NULL OR length(email) <= 255)
    AND (message IS NULL OR length(message) <= 2000)
    AND (subject IS NULL OR length(subject) <= 200)
  );



-- ############################################################################
-- SOURCE: 20260626140000_phase2_cms_schema.sql
-- ############################################################################

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



-- ############################################################################
-- SOURCE: 20260626160000_seed_cms_data.sql
-- ############################################################################

-- Seed CMS data from static site content (safe to re-run)

-- Site settings
UPDATE public.site_settings SET
  contact_phone = '+91 99250 10377',
  contact_phone_raw = '919925010377',
  contact_email = 'info@yatranexus.com',
  contact_whatsapp = '919925010377',
  address = 'L/8, Gokul Complex, Opp. Gurukul Temple, Drive-In Road, Gurukul, Ahmedabad- 380052',
  business_hours = 'Mon–Sat, 9:00 AM – 7:00 PM IST',
  footer_text = 'YatraNexus Ventures LLP. We craft thoughtful journeys across India and the world.',
  social_links = '{"facebook":"","instagram":"","youtube":""}'::jsonb,
  updated_at = now()
WHERE id = 1;

-- Homepage settings
UPDATE public.homepage_settings SET
  featured_package_slugs = ARRAY[
    'goa-beach-bliss-4d3n',
    'kerala-backwater-honeymoon-5d4n',
    'rajasthan-royal-trail-6d5n',
    'dubai-city-desert-5d4n',
    'bali-island-escape-6d5n'
  ],
  why_choose_us = '[
    {"icon":"Headphones","title":"24×7 trip support","detail":"Real humans on WhatsApp & call — before, during and after your journey."},
    {"icon":"BadgeCheck","title":"Hand-picked partners","detail":"Vetted hotels, drivers and local guides — no surprises on the ground."},
    {"icon":"Wallet","title":"Best-price promise","detail":"Transparent pricing with the best fares on flights, hotels and packages."},
    {"icon":"ShieldCheck","title":"Safe & secure booking","detail":"End-to-end encrypted payments and licensed travel partner you can trust."},
    {"icon":"Sparkles","title":"Fully customisable","detail":"Every itinerary is tailored to your dates, budget and travel style."},
    {"icon":"Globe2","title":"100+ destinations","detail":"Domestic and international expertise across India, Asia, Europe & beyond."}
  ]'::jsonb,
  stats = '[
    {"label":"Happy travellers","value":"10,000+"},
    {"label":"Destinations","value":"100+"},
    {"label":"Years experience","value":"15+"},
    {"label":"Support","value":"24×7"}
  ]'::jsonb,
  cta_title = 'Ready to plan your next trip?',
  cta_subtitle = 'Share your dates and budget — our expert will call you back the same day.',
  updated_at = now()
WHERE id = 1;

-- [skipped] sample packages INSERT (use migrate-all-packages-new-supabase.sql instead)

-- Services
INSERT INTO public.services (slug, title, short_description, icon, is_active, sort_order)
VALUES
  ('flights', 'Flight Booking', 'Best fares on domestic & international flights.', 'Plane', true, 1),
  ('hotels', 'Hotel Booking', 'Hand-picked hotels worldwide at exclusive rates.', 'Hotel', true, 2),
  ('cabs', 'Outstation Cabs', 'Comfortable cabs for intercity travel across India.', 'Car', true, 3),
  ('visa', 'Visa Services', 'End-to-end visa assistance for 100+ countries.', 'Stamp', true, 4),
  ('insurance', 'Travel Insurance', 'Stay covered for medical, baggage & trip risks.', 'ShieldCheck', true, 5),
  ('forex', 'Forex Card', 'Multi-currency forex cards at competitive rates.', 'CreditCard', true, 6)
ON CONFLICT (slug) DO NOTHING;

-- Blog posts
INSERT INTO public.blog_posts (slug, title, excerpt, category, content, featured_image_url, read_minutes, is_published, published_at)
VALUES
  ('goa-monsoon-getaway-guide', 'Goa Beyond the Beaches: A Monsoon Getaway Guide',
    'Quiet lanes, lush greenery and off-season deals make monsoon Goa a hidden gem for slow travellers.',
    'Domestic Travel',
    '["Monsoon transforms Goa into a greener, calmer version of itself.","Plan inland experiences like Dudhsagar falls and Fontainhas walks.","Pack light rain gear — our team can help swap outdoor plans if showers roll in."]'::jsonb,
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=70',
    5, true, '2026-05-12'::timestamptz),
  ('schengen-visa-checklist-2026', 'Schengen Visa Checklist for Indian Travellers (2026)',
    'Documents, timelines and common mistakes to avoid when applying for your first Europe trip.',
    'Visa Tips',
    '["Start with a valid passport, travel insurance and confirmed itinerary.","Financial proof should show sufficient balance for the trip.","Book your VFS appointment early — peak summer slots fill quickly."]'::jsonb,
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=70',
    7, true, '2026-04-28'::timestamptz),
  ('kerala-houseboat-planning-tips', 'Planning the Perfect Kerala Houseboat Experience',
    'Alleppey backwaters done right — cabin types, meal plans and the best season to cruise.',
    'Holiday Ideas',
    '["Choose between deluxe and premium houseboats based on AC hours.","October to February offers pleasant weather.","Combine Alleppey with Munnar or Thekkady for a classic Kerala circuit."]'::jsonb,
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=70',
    4, true, '2026-03-15'::timestamptz)
ON CONFLICT (slug) DO NOTHING;

-- Gallery
INSERT INTO public.gallery_images (title, album, image_url, sort_order, is_active)
SELECT v.title, v.album, v.image_url, v.sort_order, true
FROM (VALUES
  ('Dal Lake, Kashmir', 'Domestic', 'https://images.unsplash.com/photo-1566837497312-7be4a47dd6e1?auto=format&fit=crop&w=800&q=70', 1),
  ('Kerala Backwaters', 'Domestic', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=70', 2),
  ('Rajasthan Forts', 'Domestic', 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=70', 3),
  ('Goa Sunsets', 'Domestic', 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=70', 4),
  ('Maldives Lagoon', 'International', 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=70', 5),
  ('Bali Rice Terraces', 'International', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=70', 6),
  ('Dubai Skyline', 'International', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=70', 7),
  ('Thailand Islands', 'International', 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=70', 8),
  ('Swiss Alps', 'International', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=70', 9)
) AS v(title, album, image_url, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.gallery_images LIMIT 1);

-- Testimonials
INSERT INTO public.testimonials (name, city, review_text, rating, sort_order, is_active)
SELECT v.name, v.city, v.review_text, 5, v.sort_order, true
FROM (VALUES
  ('Abhinav Shukla', 'Ahmedabad', 'YatraNexus planned our Bhutan trip beautifully. Their travel expert was on WhatsApp through the entire trip.', 1),
  ('Japen Gandhi', 'Surat', 'Our Himachal honeymoon was very well planned. Hotels and food were great.', 2),
  ('Vivek Patel', 'Vadodara', 'Completely flexible, professional and understanding team.', 3),
  ('Vishvas Vadher', 'Rajkot', 'Wonderful international trip — everything was well planned.', 4),
  ('Daxesh Chaudhary', 'Ahmedabad', 'Very happy with the services — quick response and the best price.', 5),
  ('Nirav Damor', 'Anand', 'Our Himachal Pradesh trip was a fantastic experience.', 6)
) AS v(name, city, review_text, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.testimonials LIMIT 1);

-- FAQs
INSERT INTO public.faqs (question, answer, category, sort_order, is_active)
SELECT v.question, v.answer, 'general', v.sort_order, true
FROM (VALUES
  ('How do I book a holiday package with YatraNexus?', 'Browse packages online, fill the inquiry form, or message us on WhatsApp. A travel expert will call you with a customised quote within a few hours.', 1),
  ('Do you provide visa assistance?', 'Yes. We handle documentation checklists, application review, appointment booking and status tracking for 100+ countries.', 2),
  ('Can I customise an itinerary?', 'Every trip we plan is fully customisable — dates, hotels, transfers and sightseeing can be tailored to your budget.', 3),
  ('What payment methods do you accept?', 'We accept bank transfer, UPI and major cards for confirmed bookings.', 4),
  ('Is travel insurance included?', 'Insurance can be added to any package or booked separately.', 5),
  ('Do you offer corporate travel management?', 'Yes. We manage business travel, MICE events, GST invoicing and dedicated account support.', 6),
  ('How quickly will you respond to my inquiry?', 'WhatsApp inquiries are answered within minutes during business hours.', 7),
  ('What is your cancellation policy?', 'Cancellation terms depend on airlines, hotels and package partners. We share clear policies before you confirm.', 8)
) AS v(question, answer, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.faqs LIMIT 1);



-- ############################################################################
-- SOURCE: 20260627120000_full_cms_connect.sql
-- ############################################################################

-- Destinations CMS + extended homepage/service content for full public-site backend wiring

DO $do$
BEGIN
  CREATE TABLE IF NOT EXISTS public.destinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL,
    scope TEXT NOT NULL CHECK (scope IN ('domestic', 'international')),
    name TEXT NOT NULL,
    region TEXT NOT NULL,
    image_url TEXT NOT NULL,
    blurb TEXT,
    highlights TEXT[] NOT NULL DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (slug, scope)
  );

  DROP TRIGGER IF EXISTS destinations_updated_at ON public.destinations;
  CREATE TRIGGER destinations_updated_at
    BEFORE UPDATE ON public.destinations
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

  ALTER TABLE public.homepage_settings
    ADD COLUMN IF NOT EXISTS how_it_works JSONB NOT NULL DEFAULT '[]',
    ADD COLUMN IF NOT EXISTS corporate_features JSONB NOT NULL DEFAULT '[]',
    ADD COLUMN IF NOT EXISTS tour_types JSONB NOT NULL DEFAULT '[]',
    ADD COLUMN IF NOT EXISTS holiday_themes JSONB NOT NULL DEFAULT '[]';

  ALTER TABLE public.services
    ADD COLUMN IF NOT EXISTS content_blocks JSONB NOT NULL DEFAULT '{}';

  ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;

  DROP POLICY IF EXISTS "Public read destinations" ON public.destinations;
  CREATE POLICY "Public read destinations"
    ON public.destinations FOR SELECT TO anon, authenticated
    USING (is_active = true);

  DROP POLICY IF EXISTS "Admin manage destinations" ON public.destinations;
  CREATE POLICY "Admin manage destinations"
    ON public.destinations FOR ALL TO authenticated
    USING (true) WITH CHECK (true);

  GRANT SELECT ON public.destinations TO anon, authenticated;
  GRANT ALL ON public.destinations TO authenticated;
END
$do$;

-- Domestic destinations
INSERT INTO public.destinations (slug, scope, name, region, image_url, blurb, highlights, sort_order)
VALUES
  ('goa', 'domestic', 'Goa', 'West India',
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=70',
    'Sun-kissed beaches, Portuguese heritage and a buzzing nightlife.',
    ARRAY['Baga & Calangute beaches','Old Goa churches','Dudhsagar falls','Cruise & water sports'], 1),
  ('kerala', 'domestic', 'Kerala', 'South India',
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=70',
    'Backwaters, houseboats and lush hill stations of God''s Own Country.',
    ARRAY['Alleppey houseboat','Munnar tea gardens','Kovalam beach','Ayurveda spa'], 2),
  ('rajasthan', 'domestic', 'Rajasthan', 'North India',
    'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=70',
    'Forts, palaces and golden deserts of the royal land.',
    ARRAY['Udaipur lake palaces','Jaisalmer desert camp','Jaipur Amber Fort','Jodhpur blue city'], 3),
  ('kashmir', 'domestic', 'Kashmir', 'North India',
    'https://images.unsplash.com/photo-1566837497312-7be4a47dd6e1?auto=format&fit=crop&w=800&q=70',
    'Paradise on earth — snow peaks, shikaras and meadows.',
    ARRAY['Dal Lake shikara','Gulmarg gondola','Pahalgam valley','Sonmarg glacier'], 4),
  ('himachal', 'domestic', 'Himachal Pradesh', 'North India',
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=70',
    'Pine-clad hills, adventure trails and Himalayan vistas.',
    ARRAY['Manali & Solang valley','Shimla mall road','Spiti circuit','Dharamshala monasteries'], 5),
  ('uttarakhand', 'domestic', 'Uttarakhand', 'North India',
    'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=800&q=70',
    'Char Dham temples, Rishikesh rafting and Himalayan retreats.',
    ARRAY['Rishikesh rafting','Nainital lakes','Auli skiing','Valley of Flowers'], 6),
  ('ladakh', 'domestic', 'Ladakh', 'North India',
    'https://images.unsplash.com/photo-1589552416260-f5deb55a9341?auto=format&fit=crop&w=800&q=70',
    'High-altitude desert, monasteries and Pangong''s blue magic.',
    ARRAY['Pangong Tso','Nubra Valley','Magnetic Hill','Hemis Monastery'], 7),
  ('andaman', 'domestic', 'Andaman Islands', 'Andaman & Nicobar',
    'https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=800&q=70',
    'Turquoise reefs, white sand and untouched islands.',
    ARRAY['Radhanagar Beach','Scuba at Havelock','Cellular Jail','Neil Island'], 8),
  ('northeast', 'domestic', 'North East India', 'East India',
    'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=800&q=70',
    'Living root bridges, monasteries and emerald hills of the seven sisters.',
    ARRAY['Tawang Monastery','Cherrapunji falls','Kaziranga safari','Majuli island'], 9),
  ('tamil-nadu', 'domestic', 'Tamil Nadu', 'South India',
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=70',
    'Dravidian temples, French heritage and Nilgiri tea estates.',
    ARRAY['Ooty hill station','Pondicherry beach','Madurai temple','Rameshwaram'], 10)
ON CONFLICT (slug, scope) DO NOTHING;

-- International destinations (for when re-enabled)
INSERT INTO public.destinations (slug, scope, name, region, image_url, blurb, highlights, sort_order)
VALUES
  ('dubai', 'international', 'Dubai', 'Middle East',
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=70',
    'Skyscrapers, deserts and luxury shopping in the city of gold.',
    ARRAY['Burj Khalifa','Desert safari','Dubai Marina cruise','Atlantis Aquaventure'], 1),
  ('bali', 'international', 'Bali, Indonesia', 'South-East Asia',
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=70',
    'Rice terraces, temples and beach clubs on the island of gods.',
    ARRAY['Ubud rice terraces','Tanah Lot sunset','Nusa Penida','Seminyak beaches'], 2),
  ('thailand', 'international', 'Thailand', 'South-East Asia',
    'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=70',
    'Phuket beaches, Bangkok nightlife and Krabi''s emerald waters.',
    ARRAY['Phi Phi islands','Bangkok temples','Krabi','Pattaya'], 3),
  ('maldives', 'international', 'Maldives', 'Indian Ocean',
    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=70',
    'Overwater villas in the world''s most photographed lagoons.',
    ARRAY['Water villa stay','Snorkeling reefs','Sunset cruise','Private sandbank'], 4)
ON CONFLICT (slug, scope) DO NOTHING;

-- Service page content
UPDATE public.services SET
  description = 'Domestic and international flights with airline-direct rates, complimentary seat selection advice, and real human support throughout your journey.',
  meta_title = 'Flight Booking — Domestic & International | YatraNexus',
  content_blocks = '{
    "heroTitle": "Best fares, smarter routes",
    "sectionTitle": "Why book flights with us",
    "features": [
      {"icon":"BadgePercent","title":"Competitive fares","detail":"Compared across 30+ airlines and consolidators."},
      {"icon":"Globe2","title":"International routing","detail":"Multi-city, codeshare and complex stopovers handled."},
      {"icon":"Plane","title":"Cabin upgrades","detail":"Business & premium economy at the best available rates."},
      {"icon":"Headphones","title":"24×7 reschedule help","detail":"Cancellations, refunds and reschedules — we handle it."}
    ]
  }'::jsonb
WHERE slug = 'flights';

UPDATE public.services SET
  description = 'From budget-friendly hotels to luxury resorts and boutique villas — we negotiate exclusive rates and free upgrades.',
  meta_title = 'Hotel Booking — Domestic & International | YatraNexus',
  content_blocks = '{
    "heroTitle": "Stays you''ll remember",
    "sectionTitle": "Curated stays for every traveller",
    "features": [
      {"icon":"Hotel","title":"3★ to 5★ hotels","detail":"International chains and trusted local brands."},
      {"icon":"BedDouble","title":"Resorts & villas","detail":"Beachfront, hillside and private pool villas."},
      {"icon":"Sparkles","title":"Boutique stays","detail":"Heritage havelis, ryokans and design hotels."},
      {"icon":"Star","title":"Loyalty perks","detail":"Free upgrades, early check-in & late check-out where available."}
    ]
  }'::jsonb
WHERE slug = 'hotels';

UPDATE public.services SET
  description = 'Comfortable, well-maintained cabs for intercity travel across India — sedan, SUV and tempo traveller options with experienced drivers.',
  meta_title = 'Outstation Cabs — Intercity Travel | YatraNexus',
  content_blocks = '{
    "heroTitle": "Comfortable cabs, anywhere in India",
    "sectionTitle": "Why book cabs with us",
    "features": [
      {"icon":"Car","title":"Sedan, SUV & tempo","detail":"Right vehicle for couples, families and groups."},
      {"icon":"MapPin","title":"Pan-India coverage","detail":"One-way and round-trip outstation routes."},
      {"icon":"ShieldCheck","title":"Verified drivers","detail":"Experienced, courteous and GPS-tracked."},
      {"icon":"Clock","title":"Flexible timings","detail":"Early morning pickups and multi-day circuits."}
    ]
  }'::jsonb
WHERE slug = 'cabs';

UPDATE public.services SET
  description = 'From tourist visas to student and business visas — we handle paperwork, appointments and embassy follow-ups so you can focus on packing.',
  meta_title = 'Visa Services — End-to-end Visa Assistance | YatraNexus',
  content_blocks = '{
    "heroTitle": "Your visa, sorted.",
    "layout": "visa",
    "steps": [
      {"n":1,"title":"Free consultation","detail":"Tell us your destination, purpose and travel date. We assess eligibility."},
      {"n":2,"title":"Document checklist","detail":"We share a tailored checklist — passport, photos, financials, itineraries."},
      {"n":3,"title":"Application & review","detail":"We prepare and review the full application before submission."},
      {"n":4,"title":"Submission & biometrics","detail":"Appointments are booked at the right VFS/VAC/embassy."},
      {"n":5,"title":"Tracking & delivery","detail":"We track your application and hand over your passport once stamped."}
    ],
    "visaCountries": [
      {"country":"United States","type":"B1/B2 Visitor","processing":"30–45 working days"},
      {"country":"United Kingdom","type":"Standard Visitor","processing":"15–21 working days"},
      {"country":"Schengen (Europe)","type":"Short-stay (90 days)","processing":"10–15 working days"},
      {"country":"Canada","type":"Visitor (TRV)","processing":"25–35 working days"},
      {"country":"Australia","type":"Subclass 600 Visitor","processing":"20–30 working days"},
      {"country":"Dubai / UAE","type":"30/60-day Tourist","processing":"3–5 working days"},
      {"country":"Singapore","type":"Tourist eVisa","processing":"5–7 working days"},
      {"country":"Thailand","type":"Tourist / eVOA","processing":"5–10 working days"},
      {"country":"Japan","type":"Short-term Tourist","processing":"7–10 working days"},
      {"country":"Turkey","type":"eVisa","processing":"1–3 working days"}
    ],
    "features": [
      {"icon":"FileCheck","title":"Document prep","detail":"Cover letter, itinerary, financials."},
      {"icon":"Clock","title":"Appointment booking","detail":"VFS / VAC / embassy slots."},
      {"icon":"Briefcase","title":"Business & student","detail":"Beyond tourist — full support."}
    ]
  }'::jsonb
WHERE slug = 'visa';

UPDATE public.services SET
  description = 'Comprehensive travel insurance for medical emergencies, trip cancellation, baggage loss and adventure activities — domestic and international.',
  meta_title = 'Travel Insurance | YatraNexus',
  content_blocks = '{
    "heroTitle": "Travel with peace of mind",
    "sectionTitle": "Coverage that travels with you",
    "features": [
      {"icon":"ShieldCheck","title":"Medical emergencies","detail":"Hospitalisation and evacuation cover abroad."},
      {"icon":"Plane","title":"Trip cancellation","detail":"Refund non-refundable costs if plans change."},
      {"icon":"Briefcase","title":"Baggage protection","detail":"Lost, delayed or damaged luggage cover."},
      {"icon":"Sparkles","title":"Adventure add-ons","detail":"Trekking, scuba and sports coverage available."}
    ]
  }'::jsonb
WHERE slug = 'insurance';

UPDATE public.services SET
  description = 'Multi-currency forex cards and cash at competitive rates — load once, spend worldwide with better rates than airport counters.',
  meta_title = 'Forex Card — Multi-currency Travel Money | YatraNexus',
  content_blocks = '{
    "heroTitle": "Spend smarter abroad",
    "sectionTitle": "Forex made simple",
    "features": [
      {"icon":"CreditCard","title":"Multi-currency cards","detail":"Load USD, EUR, GBP, AED and more."},
      {"icon":"Wallet","title":"Competitive rates","detail":"Better than airport counters and most banks."},
      {"icon":"ShieldCheck","title":"Secure & insured","detail":"Chip-and-PIN cards with emergency replacement."},
      {"icon":"Globe2","title":"Cash + card combo","detail":"Mix of forex card and currency notes delivered."}
    ]
  }'::jsonb
WHERE slug = 'forex';

-- Homepage extended content
UPDATE public.homepage_settings SET
  about_title = 'Travel with people who pick up the phone',
  about_content = 'YatraNexus Ventures LLP is built around one promise — every traveller deserves a real expert, not a chatbot. From a weekend Goa break to a Rajasthan heritage tour, we plan, book and stay with you end-to-end.',
  hero_slides = '[
    {"name":"Kashmir Valley","tag":"Snow & Shikaras","image":"https://images.unsplash.com/photo-1566837497312-7be4a47dd6e1?auto=format&fit=crop&w=1800&q=70","slug":"kashmir"},
    {"name":"Rajasthan","tag":"Royal Heritage","image":"https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1800&q=70","slug":"rajasthan"},
    {"name":"Kerala Backwaters","tag":"Houseboats","image":"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1800&q=70","slug":"kerala"},
    {"name":"Ladakh","tag":"High Himalaya","image":"https://images.unsplash.com/photo-1589552416260-f5deb55a9341?auto=format&fit=crop&w=1800&q=70","slug":"ladakh"},
    {"name":"Goa","tag":"Beaches & Sun","image":"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1800&q=70","slug":"goa"},
    {"name":"Himachal Pradesh","tag":"Mountain Retreat","image":"https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1800&q=70","slug":"himachal"}
  ]'::jsonb,
  featured_destination_slugs = ARRAY['goa','kerala','rajasthan','kashmir','himachal','uttarakhand','ladakh','andaman'],
  featured_service_slugs = ARRAY['cabs','flights','hotels','packages','visa','insurance','forex'],
  how_it_works = '[
    {"n":1,"title":"Share your holiday need","detail":"Tell us where you want to go, your dates and budget — via form or WhatsApp."},
    {"n":2,"title":"Get in touch with our expert","detail":"A dedicated travel expert calls you back with options curated just for you."},
    {"n":3,"title":"Customise & book","detail":"Tweak the itinerary, confirm, pay securely and pack your bags — we handle the rest."}
  ]'::jsonb,
  corporate_features = '[
    {"icon":"Briefcase","title":"Business Travel","detail":"Domestic flights, hotels and ground transport — managed under one desk."},
    {"icon":"Users","title":"MICE & Group Tours","detail":"Meetings, incentives, conferences and exhibitions for teams of 10 to 1000+."},
    {"icon":"Plane","title":"Crew & Bulk Bookings","detail":"Negotiated corporate fares, GSA tie-ups and dedicated relationship manager."},
    {"icon":"FileText","title":"GST Invoicing","detail":"Compliant GST invoices, monthly reports and centralised billing for your finance team."},
    {"icon":"Stamp","title":"Visa & Forex Desk","detail":"Employee visa processing, travel insurance and multi-currency forex cards."},
    {"icon":"Headphones","title":"Dedicated Account Manager","detail":"A single point of contact reachable 24×7 for emergency re-routes and changes."}
  ]'::jsonb,
  tour_types = '[
    {"slug":"adventure","name":"Adventure","image":"https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=70"},
    {"slug":"family","name":"Family","image":"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=70"},
    {"slug":"honeymoon","name":"Honeymoon","image":"https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=70"},
    {"slug":"leisure","name":"Leisure","image":"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=70"},
    {"slug":"pilgrimage","name":"Pilgrimage","image":"https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=70"},
    {"slug":"solo","name":"Solo","image":"https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=70"}
  ]'::jsonb,
  holiday_themes = '["Beaches","Festival","Historical","Luxury","Mountain","Nightlife","Snow","Waterfalls","Wildlife"]'::jsonb,
  updated_at = now()
WHERE id = 1;



-- ############################################################################
-- SOURCE: 20260627130000_inquiry_customer_tracking.sql
-- ############################################################################

-- Customer inquiry tracking: phone lookup, booking history, submit-or-update RPC

ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS phone_normalized TEXT,
  ADD COLUMN IF NOT EXISTS booking_history JSONB NOT NULL DEFAULT '[]'::jsonb;

UPDATE public.inquiries
SET phone_normalized = right(regexp_replace(COALESCE(phone, ''), '\D', '', 'g'), 10)
WHERE phone_normalized IS NULL OR phone_normalized = '';

CREATE INDEX IF NOT EXISTS idx_inquiries_phone_normalized
  ON public.inquiries (phone_normalized, updated_at DESC);

CREATE OR REPLACE FUNCTION public.set_inquiry_phone_normalized()
RETURNS TRIGGER AS $$
BEGIN
  NEW.phone_normalized := right(regexp_replace(COALESCE(NEW.phone, ''), '\D', '', 'g'), 10);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS inquiries_phone_normalized ON public.inquiries;
CREATE TRIGGER inquiries_phone_normalized
  BEFORE INSERT OR UPDATE OF phone ON public.inquiries
  FOR EACH ROW EXECUTE FUNCTION public.set_inquiry_phone_normalized();

CREATE OR REPLACE FUNCTION public.submit_inquiry(
  p_service_type TEXT,
  p_name TEXT,
  p_phone TEXT,
  p_email TEXT DEFAULT NULL,
  p_subject TEXT DEFAULT NULL,
  p_destination TEXT DEFAULT NULL,
  p_travel_date TEXT DEFAULT NULL,
  p_travelers INT DEFAULT NULL,
  p_message TEXT DEFAULT NULL,
  p_package_name TEXT DEFAULT NULL,
  p_source_page TEXT DEFAULT NULL,
  p_selected_inclusions TEXT[] DEFAULT NULL,
  p_selected_exclusions TEXT[] DEFAULT NULL,
  p_existing_inquiry_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_phone_norm TEXT;
  v_existing public.inquiries%ROWTYPE;
  v_snapshot JSONB;
  v_history JSONB;
  v_new_id UUID;
  v_travel_date DATE;
BEGIN
  v_phone_norm := right(regexp_replace(COALESCE(p_phone, ''), '\D', '', 'g'), 10);

  IF length(trim(COALESCE(p_name, ''))) < 1 OR length(trim(COALESCE(p_phone, ''))) < 5 THEN
    RAISE EXCEPTION 'Invalid inquiry payload';
  END IF;

  v_travel_date := NULL;
  IF p_travel_date IS NOT NULL AND trim(p_travel_date) <> '' THEN
    v_travel_date := p_travel_date::date;
  END IF;

  -- Exact duplicate within 5 minutes (double-click protection)
  SELECT * INTO v_existing
  FROM public.inquiries
  WHERE phone_normalized = v_phone_norm
    AND lower(trim(name)) = lower(trim(p_name))
    AND COALESCE(package_name, '') = COALESCE(p_package_name, '')
    AND COALESCE(source_page, '') = COALESCE(p_source_page, '')
    AND COALESCE(destination, '') = COALESCE(p_destination, '')
    AND COALESCE(service_type, '') = COALESCE(p_service_type, '')
    AND created_at > now() - interval '5 minutes'
  ORDER BY created_at DESC
  LIMIT 1;

  IF FOUND THEN
    RETURN jsonb_build_object(
      'ok', true,
      'alreadySubmitted', true,
      'inquiryId', v_existing.id,
      'updated', false
    );
  END IF;

  -- Client-provided inquiry id (returning customer on same device)
  v_existing := NULL;
  IF p_existing_inquiry_id IS NOT NULL THEN
    SELECT * INTO v_existing
    FROM public.inquiries
    WHERE id = p_existing_inquiry_id
      AND phone_normalized = v_phone_norm
      AND status IN ('new', 'contacted', 'quoted')
    LIMIT 1;
  END IF;

  -- Active inquiry for same phone
  IF v_existing.id IS NULL THEN
    SELECT * INTO v_existing
    FROM public.inquiries
    WHERE phone_normalized = v_phone_norm
      AND status IN ('new', 'contacted', 'quoted')
    ORDER BY updated_at DESC
    LIMIT 1;
  END IF;

  IF v_existing.id IS NOT NULL THEN
    v_snapshot := jsonb_build_object(
      'package_name', v_existing.package_name,
      'destination', v_existing.destination,
      'service_type', v_existing.service_type,
      'source_page', v_existing.source_page,
      'message', v_existing.message,
      'travel_date', v_existing.travel_date,
      'travelers', v_existing.travelers,
      'saved_at', v_existing.updated_at
    );
    v_history := COALESCE(v_existing.booking_history, '[]'::jsonb) || v_snapshot;

    UPDATE public.inquiries
    SET
      name = trim(p_name),
      phone = trim(p_phone),
      email = NULLIF(trim(COALESCE(p_email, '')), ''),
      subject = NULLIF(trim(COALESCE(p_subject, '')), ''),
      destination = NULLIF(trim(COALESCE(p_destination, '')), ''),
      travel_date = v_travel_date,
      travelers = p_travelers,
      message = NULLIF(trim(COALESCE(p_message, '')), ''),
      package_name = NULLIF(trim(COALESCE(p_package_name, '')), ''),
      source_page = NULLIF(trim(COALESCE(p_source_page, '')), ''),
      service_type = trim(p_service_type),
      selected_inclusions = p_selected_inclusions,
      selected_exclusions = p_selected_exclusions,
      booking_history = v_history,
      status = CASE WHEN status = 'quoted' THEN 'new'::public.inquiry_status ELSE status END,
      updated_at = now()
    WHERE id = v_existing.id;

    RETURN jsonb_build_object(
      'ok', true,
      'alreadySubmitted', false,
      'inquiryId', v_existing.id,
      'updated', true
    );
  END IF;

  INSERT INTO public.inquiries (
    service_type,
    name,
    phone,
    email,
    subject,
    destination,
    travel_date,
    travelers,
    message,
    package_name,
    source_page,
    selected_inclusions,
    selected_exclusions,
    phone_normalized
  ) VALUES (
    trim(p_service_type),
    trim(p_name),
    trim(p_phone),
    NULLIF(trim(COALESCE(p_email, '')), ''),
    NULLIF(trim(COALESCE(p_subject, '')), ''),
    NULLIF(trim(COALESCE(p_destination, '')), ''),
    v_travel_date,
    p_travelers,
    NULLIF(trim(COALESCE(p_message, '')), ''),
    NULLIF(trim(COALESCE(p_package_name, '')), ''),
    NULLIF(trim(COALESCE(p_source_page, '')), ''),
    p_selected_inclusions,
    p_selected_exclusions,
    v_phone_norm
  )
  RETURNING id INTO v_new_id;

  RETURN jsonb_build_object(
    'ok', true,
    'alreadySubmitted', false,
    'inquiryId', v_new_id,
    'updated', false
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.submit_inquiry TO anon, authenticated;



-- ############################################################################
-- SOURCE: 20260628120000_hotels_page_cms.sql
-- ############################################################################

-- Hotels premium page CMS alignment
UPDATE public.services SET
  content_blocks = '{
    "layout": "hotels",
    "heroTitle": "Stay Better, Pay Less",
    "sectionTitle": "Why book hotels with Yatra Nexus?",
    "features": [
      {"icon":"Hotel","title":"Wide Hotel Selection","detail":"3★ to 5★ hotels, resorts and boutique stays."},
      {"icon":"BadgePercent","title":"Best Rate Guarantee","detail":"Competitive rates negotiated for you."},
      {"icon":"Globe2","title":"Flexible Options","detail":"Free upgrades and flexible check-in where available."},
      {"icon":"Headphones","title":"24×7 Customer Support","detail":"Dedicated travel expert on WhatsApp."},
      {"icon":"Lock","title":"Secure & Private","detail":"Your inquiry data is always protected."}
    ]
  }'::jsonb,
  description = 'Find and inquire about the best hotels across 500+ destinations worldwide — from budget-friendly stays to luxury resorts.',
  meta_title = 'Hotel Booking — Stay Better, Pay Less | YatraNexus'
WHERE slug = 'hotels';



-- ############################################################################
-- SOURCE: 20260628140000_service_pages_cms.sql
-- ############################################################################

-- Premium service pages CMS layouts
UPDATE public.services SET
  content_blocks = content_blocks || '{"layout":"cabs"}'::jsonb
WHERE slug = 'cabs';

UPDATE public.services SET
  content_blocks = content_blocks || '{"layout":"insurance"}'::jsonb
WHERE slug = 'insurance';

UPDATE public.services SET
  content_blocks = content_blocks || '{"layout":"forex"}'::jsonb
WHERE slug = 'forex';

UPDATE public.services SET
  content_blocks = content_blocks || '{"layout":"flights"}'::jsonb
WHERE slug = 'flights';

UPDATE public.services SET
  content_blocks = content_blocks || '{"layout":"hotels","heroTitle":"Stay Better, Pay Less"}'::jsonb
WHERE slug = 'hotels';



-- ############################################################################
-- SOURCE: 20260628150000_cms_image_storage.sql
-- ############################################################################

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



-- ############################################################################
-- SOURCE: 20260703120000_holiday_packages_service.sql
-- ############################################################################

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



-- ############################################################################
-- SOURCE: 20260704100000_corporate_travel_service.sql
-- ############################################################################

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



-- ############################################################################
-- SOURCE: 20260704120000_site_page_content.sql
-- ############################################################################

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



-- ############################################################################
-- SOURCE: 20260704180000_homepage_hero_interval.sql
-- ############################################################################

-- Homepage hero auto-rotate interval (milliseconds)
ALTER TABLE public.homepage_settings
  ADD COLUMN IF NOT EXISTS hero_interval_ms integer NOT NULL DEFAULT 10000;

COMMENT ON COLUMN public.homepage_settings.hero_interval_ms IS
  'Hero background auto-rotate interval in milliseconds (default 10000 = 10 seconds).';



-- ############################################################################
-- SOURCE: 20260705120000_email_settings.sql
-- ############################################################################

-- Admin-only email configuration (credentials + templates)
CREATE TABLE IF NOT EXISTS public.email_settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  is_enabled BOOLEAN NOT NULL DEFAULT false,
  provider TEXT NOT NULL DEFAULT 'resend' CHECK (provider IN ('resend', 'smtp')),
  from_name TEXT,
  from_email TEXT,
  reply_to_email TEXT,
  admin_notification_email TEXT,
  resend_api_key TEXT,
  smtp_host TEXT,
  smtp_port INT DEFAULT 587,
  smtp_username TEXT,
  smtp_password TEXT,
  smtp_secure BOOLEAN NOT NULL DEFAULT false,
  is_authenticated BOOLEAN NOT NULL DEFAULT false,
  last_tested_at TIMESTAMPTZ,
  last_test_error TEXT,
  welcome_enabled BOOLEAN NOT NULL DEFAULT true,
  welcome_subject TEXT,
  welcome_body_html TEXT,
  inquiry_customer_enabled BOOLEAN NOT NULL DEFAULT true,
  inquiry_customer_subject TEXT,
  inquiry_customer_body_html TEXT,
  inquiry_admin_enabled BOOLEAN NOT NULL DEFAULT true,
  inquiry_admin_subject TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.email_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.email_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin read email settings" ON public.email_settings;
CREATE POLICY "Admin read email settings"
  ON public.email_settings FOR SELECT TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Admin manage email settings" ON public.email_settings;
CREATE POLICY "Admin manage email settings"
  ON public.email_settings FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.email_settings TO authenticated;



-- ############################################################################
-- SOURCE: 20260705130000_admin_security.sql
-- ############################################################################

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



-- ############################################################################
-- SOURCE: 20260709120000_rename_global_to_ventures_llp.sql
-- ############################################################################

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



-- ############################################################################
-- SOURCE: 20260709130000_update_site_address.sql
-- ############################################################################

-- Update site address to full Ahmedabad office address.
UPDATE public.site_settings
SET
  address = 'L/8, Gokul Complex, Opp. Gurukul Temple, Drive-In Road, Gurukul, Ahmedabad- 380052',
  contact_phone = '+91 99250 10377',
  contact_phone_raw = '919925010377',
  contact_email = 'info@yatranexus.com',
  updated_at = now()
WHERE id = 1;



-- ############################################################################
-- SOURCE: 20260709140000_update_visa_service_content.sql
-- ############################################################################

-- Refresh visa service page with full country table and updated hero copy.
UPDATE public.services
SET
  description = 'End-to-end visa assistance for tourist and business travel — document prep, appointments and tracking across popular destinations.',
  meta_title = 'Visa Services — Tourist & Business Visa Assistance | YatraNexus',
  content_blocks = '{
    "heroTitle": "Visa Made Simple",
    "layout": "visa",
    "sectionTitle": "Tourist and business visa types with indicative processing timelines for Indian passport holders.",
    "steps": [
      {"n":1,"title":"Free consultation","detail":"Share your destination, travel dates and visa type with our expert."},
      {"n":2,"title":"Document checklist","detail":"We review your documents and guide you on anything missing."},
      {"n":3,"title":"Application filing","detail":"Forms completed and embassy or VFS appointment booked for you."},
      {"n":4,"title":"Tracking & updates","detail":"Real-time status updates until your visa is approved."},
      {"n":5,"title":"Travel ready","detail":"Collect your visa and depart with complete peace of mind."}
    ],
    "visaCountries": [
      {"country":"Australia","touristType":"Visitor Visa (Subclass 600)","businessType":"Business Visitor Stream (Subclass 600)","processingNote":"Tourist: 15–30 days; Business: 15–30 days (Some applications may take longer)"},
      {"country":"Canada","touristType":"Temporary Resident Visa (TRV)","businessType":"Business Visitor","processingNote":"Tourist: 3–8 weeks; Business: 3–8 weeks (Varies by biometrics & IRCC workload)"},
      {"country":"Dubai / UAE","touristType":"30/60-Day Tourist Visa","businessType":"Business Visit Visa","processingNote":"Tourist: 2–5 working days (Express: 24–48 hours); Business: 3–5 working days"},
      {"country":"Schengen Countries (Europe)","touristType":"Short-Stay (Type C)","businessType":"Business Schengen Visa","processingNote":"Tourist: 15–30 calendar days; Business: 15–30 calendar days (Apply 30–45 days before travel)"},
      {"country":"Indonesia (Bali)","touristType":"Tourist Visa / Visa on Arrival","businessType":"Business Visa","processingNote":"Tourist: Instant (VOA) / 3–5 working days (eVisa); Business: 5–10 working days"},
      {"country":"Japan","touristType":"Short-Term Tourist","businessType":"Temporary Business Visitor","processingNote":"Tourist: 5–7 working days; Business: 5–7 working days"},
      {"country":"Malaysia","touristType":"Tourist eVisa","businessType":"Business Visa","processingNote":"Tourist: 2–5 working days; Business: 3–5 working days"},
      {"country":"Maldives","touristType":"Visa on Arrival","businessType":"Business Visa","processingNote":"Tourist: Visa on Arrival; Business: 5–10 working days"},
      {"country":"New Zealand","touristType":"Visitor Visa","businessType":"Business Visitor Visa","processingNote":"Tourist: 20–30 working days; Business: 20–30 working days"},
      {"country":"Saudi Arabia","touristType":"Tourist eVisa","businessType":"Business Visit Visa","processingNote":"Tourist: 1–3 working days; Business: 3–7 working days"},
      {"country":"Singapore","touristType":"Tourist eVisa","businessType":"Business Visit Visa","processingNote":"Tourist: 3–5 working days; Business: 3–5 working days"},
      {"country":"South Africa","touristType":"Visitor Visa","businessType":"Business Visa","processingNote":"Tourist: 5–10 working days; Business: 5–10 working days"},
      {"country":"South Korea","touristType":"Tourist Visa","businessType":"Business Visa","processingNote":"Tourist: 7–15 working days; Business: 7–15 working days"},
      {"country":"Thailand","touristType":"Tourist Visa / eVOA","businessType":"Non-Immigrant B (Business)","processingNote":"Tourist: 3–7 working days; Business: 5–10 working days"},
      {"country":"Turkey","touristType":"eVisa","businessType":"Business eVisa / Sticker Visa","processingNote":"Tourist eVisa: Within 24 hours; Business: 5–15 working days"},
      {"country":"United Kingdom","touristType":"Standard Visitor","businessType":"Standard Visitor (Business Activities)","processingNote":"Tourist: 15 working days (Priority: 5 days); Business: 15 working days (Priority & Super Priority available)"},
      {"country":"United States","touristType":"B1/B2 Visitor","businessType":"B1 Business","processingNote":"Tourist: Visa approval 3–10 working days after interview. Interview appointment may take a few days to several months. Business: Same timeline."},
      {"country":"Vietnam","touristType":"Tourist eVisa","businessType":"Business Visa","processingNote":"Tourist: 3–5 working days; Business: 5–7 working days"}
    ],
    "ctaTitle": "Planning your international trip?",
    "ctaSubtitle": "Let our visa experts help you get your visa approved with ease.",
    "ctaButtonLabel": "Send Visa Inquiry"
  }'::jsonb,
  updated_at = now()
WHERE slug = 'visa';



-- ############################################################################
-- SOURCE: 20260721120000_lock_destinations_and_cms_storage.sql
-- ############################################################################

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



-- =============================================================================
-- Verify CMS bootstrap
-- =============================================================================
SELECT 'inquiries' AS table_name, count(*)::text AS info FROM public.inquiries
UNION ALL SELECT 'services', count(*)::text FROM public.services
UNION ALL SELECT 'blog_posts', count(*)::text FROM public.blog_posts
UNION ALL SELECT 'gallery_images', count(*)::text FROM public.gallery_images
UNION ALL SELECT 'testimonials', count(*)::text FROM public.testimonials
UNION ALL SELECT 'faqs', count(*)::text FROM public.faqs
UNION ALL SELECT 'packages', count(*)::text FROM public.packages
UNION ALL SELECT 'destinations', count(*)::text FROM public.destinations
UNION ALL SELECT 'admin_profiles', count(*)::text FROM public.admin_profiles
UNION ALL SELECT 'homepage_settings', count(*)::text FROM public.homepage_settings
UNION ALL SELECT 'site_settings', count(*)::text FROM public.site_settings
UNION ALL SELECT 'email_settings', count(*)::text FROM public.email_settings
UNION ALL SELECT 'cms-images bucket',
  CASE WHEN EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'cms-images')
    THEN 'ok' ELSE 'MISSING' END;
