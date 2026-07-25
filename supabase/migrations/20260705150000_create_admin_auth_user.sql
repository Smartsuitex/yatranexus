-- Bootstrap an admin auth user + admin_profiles row.
-- Run once in Supabase Dashboard → SQL Editor AFTER setting passwords below.
--
-- SECURITY: Never commit a real production password. Set admin_password locally
-- before running, then change it immediately after first sign-in via
-- Admin → Forgot password (or Supabase Dashboard → Authentication → Users).

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  admin_email    TEXT := 'superadmin@yatranexus.com';
  -- Replace before running. Must be at least 12 characters.
  admin_password TEXT := NULL;
  user_id        UUID;
  instance       UUID := '00000000-0000-0000-0000-000000000000';
BEGIN
  IF admin_password IS NULL OR length(admin_password) < 12 THEN
    RAISE EXCEPTION
      'Set admin_password in this migration to a strong temporary password (12+ chars) before running. Do not use a shared default.';
  END IF;

  SELECT id INTO user_id FROM auth.users WHERE email = admin_email LIMIT 1;

  IF user_id IS NULL THEN
    user_id := gen_random_uuid();

    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      instance,
      user_id,
      'authenticated',
      'authenticated',
      admin_email,
      crypt(admin_password, gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"Admin"}'::jsonb,
      now(),
      now(),
      '',
      '',
      '',
      ''
    );

    INSERT INTO auth.identities (
      provider_id,
      user_id,
      identity_data,
      provider,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      user_id::text,
      user_id,
      jsonb_build_object(
        'sub', user_id::text,
        'email', admin_email,
        'email_verified', true,
        'phone_verified', false
      ),
      'email',
      now(),
      now(),
      now()
    );
  ELSE
    UPDATE auth.users
    SET
      encrypted_password = crypt(admin_password, gen_salt('bf')),
      email_confirmed_at = COALESCE(email_confirmed_at, now()),
      updated_at = now()
    WHERE id = user_id;

    INSERT INTO auth.identities (
      provider_id,
      user_id,
      identity_data,
      provider,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      user_id::text,
      user_id,
      jsonb_build_object(
        'sub', user_id::text,
        'email', admin_email,
        'email_verified', true,
        'phone_verified', false
      ),
      'email',
      now(),
      now(),
      now()
    )
    ON CONFLICT (provider_id, provider) DO NOTHING;
  END IF;

  INSERT INTO public.admin_profiles (id, email, full_name, role)
  VALUES (user_id, admin_email, 'Admin', 'admin')
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email, role = 'admin';

  RAISE NOTICE 'Admin ready for email: %. Change the password immediately after first sign-in.', admin_email;
END $$;
