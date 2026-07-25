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

-- Packages
INSERT INTO public.packages (slug, title, destination, scope, nights, days, from_price, image_url, inclusions, itinerary, is_active, is_featured, sort_order)
VALUES
  ('goa-beach-bliss-4d3n', 'Goa Beach Bliss', 'Goa', 'domestic', 3, 4, '₹ 12,999',
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=70',
    ARRAY['3 nights 4★ beach-side hotel','Daily breakfast','Airport transfers','Half-day North Goa sightseeing','Cruise on Mandovi river'],
    '[{"day":1,"title":"Arrival & Baga Beach","detail":"Pickup from Goa airport, check-in and evening at Baga beach."},{"day":2,"title":"North Goa Tour","detail":"Calangute, Anjuna, Fort Aguada and Sinquerim with sunset cruise."},{"day":3,"title":"South Goa & Dudhsagar","detail":"Optional Dudhsagar falls or laid-back Palolem & Colva beaches."},{"day":4,"title":"Departure","detail":"Breakfast, free time and airport drop."}]'::jsonb,
    true, true, 1),
  ('kerala-backwater-honeymoon-5d4n', 'Kerala Backwater Honeymoon', 'Kerala', 'domestic', 4, 5, '₹ 22,499',
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=70',
    ARRAY['Munnar & Thekkady stays','Alleppey houseboat night','Daily breakfast + dinner','All transfers in private cab','Spice plantation tour'],
    '[{"day":1,"title":"Cochin → Munnar","detail":"Drive through tea estates, check-in at hill resort."},{"day":2,"title":"Munnar sightseeing","detail":"Mattupetty dam, Echo point, Eravikulam national park."},{"day":3,"title":"Munnar → Thekkady","detail":"Periyar lake cruise & spice plantation visit."},{"day":4,"title":"Alleppey houseboat","detail":"Cruise the backwaters with onboard chef & cabin stay."},{"day":5,"title":"Departure","detail":"Drive to Cochin airport for return."}]'::jsonb,
    true, true, 2),
  ('rajasthan-royal-trail-6d5n', 'Royal Rajasthan Trail', 'Rajasthan', 'domestic', 5, 6, '₹ 28,900',
    'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=70',
    ARRAY['Jaipur, Jodhpur, Udaipur stays','Heritage hotel upgrades','Daily breakfast','Air-conditioned sedan','Monument entries'],
    '[{"day":1,"title":"Arrive Jaipur","detail":"City Palace and Hawa Mahal at golden hour."},{"day":2,"title":"Amber Fort","detail":"Elephant ride, Jal Mahal photo stop."},{"day":3,"title":"Jaipur → Jodhpur","detail":"Mehrangarh fort and blue city walk."},{"day":4,"title":"Jodhpur → Udaipur","detail":"Stop at Ranakpur Jain temples."},{"day":5,"title":"Udaipur","detail":"Lake Pichola boat ride, City Palace."},{"day":6,"title":"Departure","detail":"Transfer to Udaipur airport."}]'::jsonb,
    true, true, 3),
  ('dubai-city-desert-5d4n', 'Dubai City & Desert', 'Dubai, UAE', 'international', 4, 5, '₹ 54,900',
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=70',
    ARRAY['4★ city hotel','Burj Khalifa 124th floor','Desert safari with BBQ','Marina dhow cruise','All transfers','Tourist visa assistance'],
    '[{"day":1,"title":"Arrival","detail":"Meet & greet, transfer to hotel, evening free."},{"day":2,"title":"City tour + Burj Khalifa","detail":"Old & new Dubai with At The Top entry."},{"day":3,"title":"Desert safari","detail":"Dune bashing, camel ride and BBQ dinner with shows."},{"day":4,"title":"Marina cruise / Aquaventure","detail":"Choose dhow cruise or Atlantis water park (optional)."},{"day":5,"title":"Departure","detail":"Drop to airport."}]'::jsonb,
    true, true, 4),
  ('bali-island-escape-6d5n', 'Bali Island Escape', 'Bali, Indonesia', 'international', 5, 6, '₹ 48,500',
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=70',
    ARRAY['3N Kuta + 2N Ubud','Daily breakfast','Ubud rice terrace tour','Tanah Lot sunset','Nusa Penida day tour','All private transfers'],
    '[{"day":1,"title":"Arrival Kuta","detail":"Airport pickup, hotel check-in."},{"day":2,"title":"Ubud cultural tour","detail":"Tegalalang rice terrace, Monkey Forest, art village."},{"day":3,"title":"Ubud free / spa","detail":"Optional Mt Batur sunrise trek."},{"day":4,"title":"Nusa Penida","detail":"Speedboat to Kelingking, Broken Beach, Angel''s Billabong."},{"day":5,"title":"Tanah Lot sunset","detail":"Visit Tanah Lot temple with sunset photography."},{"day":6,"title":"Departure","detail":"Transfer to Denpasar airport."}]'::jsonb,
    true, true, 5)
ON CONFLICT (slug) DO NOTHING;

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
