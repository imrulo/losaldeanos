# AGENTS.md

## Cursor Cloud specific instructions

This is a single **Next.js 16 (App Router, React 19, Turbopack)** app managed with **pnpm** (`packageManager: pnpm@11.1.3`). There is no database, backend service, or external dependency — the app is fully self-contained. See `README.md` for the product overview and `package.json` for the canonical scripts.

### Services
- **Only one service**: the Next.js app. Start dev with `pnpm dev` (Turbopack, serves http://localhost:3000, which redirects `/` -> `/es`). Production check: `pnpm build` then `pnpm start`.
- The three API routes (`src/app/api/{search,stories,newsletter}/route.ts`) are self-contained: `search` runs Fuse.js in-memory; `stories`/`newsletter` only `console.info(...)` the payload (no DB/email provider wired). Submissions succeed and are logged to the dev-server output.

### Non-obvious notes
- **No test framework exists** — there is no `pnpm test` script and no vitest/jest/playwright. Verify changes via `pnpm build`, `pnpm lint`, and manual browser testing.
- `pnpm lint` currently reports **pre-existing** `react-hooks/set-state-in-effect` errors in `src/components/museum/theme-toggle.tsx` and `src/components/search/global-search.tsx`. These are not environment issues; `pnpm build` still succeeds.
- The community story form (`src/components/comunidad/story-form.tsx`) has a **pre-existing bug**: it calls `e.currentTarget.reset()` after an `await`, so an `unhandledRejection: Cannot read properties of null (reading 'reset')` shows in the dev overlay on submit. The submission itself still succeeds (API returns 200, success message shows) — the failure is only the post-submit form reset.
- Only optional env var is `NEXT_PUBLIC_SITE_URL` (defaults to `https://losaldeanos.com`); the app runs without any `.env` file (the `.env.example` referenced in the README does not exist).
- `pnpm-workspace.yaml` exists only to allow-list native build deps (`sharp`, `unrs-resolver`); this is not a multi-package monorepo.
