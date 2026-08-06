# YatraNexus Gateway

TanStack Start travel site for YatraNexus Ventures LLP.

## Structure

- `src/routes/` — file-based routes
- `src/components/site/` — site-specific UI
- `src/components/ui/` — shadcn/ui primitives
- `src/lib/` — shared utilities, MySQL db layer, and server functions
- `src/lib/db-queries/` — MySQL CMS queries
- `database/schema.mysql.sql` — MySQL schema

## Commands

- `npm run dev` — start dev server (requires local MySQL + `.env` DATABASE_URL)
- `npm run build` — production build
- `npm run apply:mysql-schema` — create tables
- `npm run migrate:mysql` — import CMS from snapshot
- `npm run setup-admin-user` — create admin login
- `bun run lint` — ESLint
