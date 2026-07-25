-- Grant admin access by email (run once after creating the user in Supabase Auth)
-- Change the email below to match your Supabase Authentication user

DO $$
DECLARE
  admin_user_id UUID;
  admin_email TEXT := 'superadmin@yatranexus.com';
BEGIN
  SELECT id INTO admin_user_id
  FROM auth.users
  WHERE email = admin_email
  LIMIT 1;

  IF admin_user_id IS NULL THEN
    RAISE EXCEPTION 'No auth user found for %. Create the user first in Supabase → Authentication → Users.', admin_email;
  END IF;

  INSERT INTO public.admin_profiles (id, email, full_name, role)
  VALUES (admin_user_id, admin_email, 'Admin', 'admin')
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email, role = 'admin';

  RAISE NOTICE 'Admin access granted for % (id: %)', admin_email, admin_user_id;
END $$;
