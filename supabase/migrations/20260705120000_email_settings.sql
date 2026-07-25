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
