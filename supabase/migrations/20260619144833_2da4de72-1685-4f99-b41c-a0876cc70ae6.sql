
CREATE TABLE public.inquiries (
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

CREATE POLICY "Authenticated can read inquiries"
  ON public.inquiries FOR SELECT
  TO authenticated
  USING (true);
