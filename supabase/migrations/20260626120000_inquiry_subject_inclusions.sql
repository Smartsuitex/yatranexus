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
