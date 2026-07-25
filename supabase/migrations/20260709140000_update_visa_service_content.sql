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
