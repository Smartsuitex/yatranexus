-- Update site address to full Ahmedabad office address.
UPDATE public.site_settings
SET
  address = 'L/8, Gokul Complex, Opp. Gurukul Temple, Drive-In Road, Gurukul, Ahmedabad- 380052',
  contact_phone = '+91 99250 10377',
  contact_phone_raw = '919925010377',
  contact_email = 'info@yatranexus.com',
  updated_at = now()
WHERE id = 1;
