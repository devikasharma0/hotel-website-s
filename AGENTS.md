# Agent instructions

Guidance for AI coding agents working in this repository.

## Project overview

**Antara** — premium boutique hotel website (Next.js 15, TypeScript, Tailwind). Original brand inspired by [echor.in](https://echor.in/) UX patterns, not a copy. Mock booking flow; connect backend/payment later.

## Repository layout

- `src/app/` — App Router pages and metadata (SEO, sitemap, robots)
- `src/components/` — layout, hotels, booking, gallery, UI
- `src/data/` — structured mock data (`hotels.ts`, `destinations.ts`)
- `src/lib/` — filters, site config, helpers
- `public/` — static assets (if added)

## Commands

| Task | Command |
|------|---------|
| Install dependencies | `npm install` |
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Test | _No test runner configured yet_ |

Run `npm run build` and `npm run lint` after meaningful changes.

## Code conventions

- Keep hotel/destination content in `src/data/`, not embedded in components.
- Match existing Tailwind tokens (`cream`, `ink`, `accent`) and typography (`font-display`, `font-sans`).
- Prefer accessible semantics; respect `prefers-reduced-motion`.
- Do not commit secrets; use `.env.local` from `.env.example`.

## Git and PRs

- Create commits only when the user explicitly asks.
- Do not force-push to `main` / `master`.

## Security

- Validate forms on the client; add server validation when APIs exist.
- Never commit `.env` with credentials.

## Deployment

Do **not** deploy until the user explicitly says to deploy. First deliver build for local review.
