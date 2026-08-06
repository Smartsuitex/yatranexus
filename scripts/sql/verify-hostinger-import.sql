-- Run in Hostinger phpMyAdmin → SQL tab (database: u391320881_yatranexus)
-- Expected row counts after successful import

SELECT 'admin_users' AS tbl, COUNT(*) AS rows, IF(COUNT(*)=1,'OK','FAIL') AS status FROM admin_users
UNION ALL SELECT 'blog_posts', COUNT(*), IF(COUNT(*)=3,'OK','FAIL') FROM blog_posts
UNION ALL SELECT 'destinations', COUNT(*), IF(COUNT(*)=26,'OK','FAIL') FROM destinations
UNION ALL SELECT 'email_settings', COUNT(*), IF(COUNT(*)=1,'OK','FAIL') FROM email_settings
UNION ALL SELECT 'faqs', COUNT(*), IF(COUNT(*)=8,'OK','FAIL') FROM faqs
UNION ALL SELECT 'gallery_images', COUNT(*), IF(COUNT(*)=9,'OK','FAIL') FROM gallery_images
UNION ALL SELECT 'homepage_settings', COUNT(*), IF(COUNT(*)=1,'OK','FAIL') FROM homepage_settings
UNION ALL SELECT 'inquiries', COUNT(*), IF(COUNT(*)=0,'OK','FAIL') FROM inquiries
UNION ALL SELECT 'packages', COUNT(*), IF(COUNT(*)=117,'OK','FAIL') FROM packages
UNION ALL SELECT 'services', COUNT(*), IF(COUNT(*)=8,'OK','FAIL') FROM services
UNION ALL SELECT 'site_settings', COUNT(*), IF(COUNT(*)=1,'OK','FAIL') FROM site_settings
UNION ALL SELECT 'testimonials', COUNT(*), IF(COUNT(*)=5,'OK','FAIL') FROM testimonials;

-- Admin login check
SELECT email, full_name, role FROM admin_users;

-- Sample package images (should start with /images/)
SELECT slug, LEFT(image_url, 50) AS image FROM packages WHERE is_active = 1 LIMIT 5;
