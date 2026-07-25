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
