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
