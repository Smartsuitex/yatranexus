# Hostinger MySQL import

## File to upload

**`hostinger-import.sql`** (~314 KB) — regenerated from local MySQL after CMS + image URL sync.

Contains:

- All 12 tables (DROP + CREATE)
- Full CMS data (117 packages, 26 destinations, 8 services, etc.)
- Image URLs as `/images/...` (local filesystem paths)
- 1 admin user (`info@yatranexus.com`)

## Import steps (phpMyAdmin) — **Live DB update**

1. Log in to **Hostinger hPanel**
2. **Websites** → **Manage** → **Databases**
3. Click **Enter phpMyAdmin** next to `u391320881_yatranexus`
4. Select database **`u391320881_yatranexus`** in the left sidebar
5. Open the **Import** tab
6. Choose file: **`hostinger-import.sql`** (from `scripts/output/`)
7. Format: **SQL**
8. Click **Import** / **Go**
9. Wait for success message (may take 30–60 seconds)

This replaces live DB content with the same data as your updated local DB.

## After import — Node.js env on Hostinger

```env
DATABASE_URL=mysql://u391320881_mysql:Yatranexus%402026@localhost:3306/u391320881_yatranexus
JWT_SECRET=006cac92af794eb92b67826d8caae11f982b6e1af9aadb290e519ed1f93eae6e
ADMIN_COOKIE_NAME=yn_admin_session
SITE_URL=https://yatranexus.com
```

Use **`localhost`** as the DB host on the server (not the public IP).

## Admin login

- URL: https://yatranexus.com/admin/login
- Email: `info@yatranexus.com`
- Password: `YatraAdmin@2026`

To change the password later, run `npm run setup-admin-user` on the server with `ADMIN_PASSWORD` set.

## Schema only (empty tables)

If you only need table structure without data, import:

**`../../database/schema.mysql.sql`**

Then run data migration separately when Remote MySQL is enabled:

```bash
npm run migrate:mysql
npm run setup-admin-user
```
