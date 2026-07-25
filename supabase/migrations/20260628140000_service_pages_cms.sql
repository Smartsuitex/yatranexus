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
