# Routes

File-based routes for TanStack Router. Each file in this folder maps to a URL path.

| File                     | Path                  |
| ------------------------ | --------------------- |
| `index.tsx`              | `/`                   |
| `contact.tsx`            | `/contact`            |
| `services.*.tsx`         | `/services/*`         |
| `holiday-packages.*.tsx` | `/holiday-packages/*` |

Run `bun run dev` to regenerate `src/routeTree.gen.ts` after adding routes.
