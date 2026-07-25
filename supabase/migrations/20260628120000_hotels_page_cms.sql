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
