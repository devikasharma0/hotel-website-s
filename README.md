# Meridian Collection — hotel website

Premium boutique hospitality marketing site built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Inspired by the information architecture of [echor.in](https://echor.in/) with original brand, copy, and design.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run lint
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` for production metadata and sitemap URLs.

## Structure

- `src/app/` — routes (home, hotels, destinations, booking, contact, legal)
- `src/components/` — UI, layout, booking, gallery
- `src/data/` — mock hotels & destinations (add entries to scale content)
- `src/lib/` — filters, site config, utilities

## Booking

The `/book` flow is a **frontend-only demo** (no payment). Wire `src/components/booking/BookingFlow.tsx` to your API when ready.

## Deploy

Per project instructions: deploy only after explicit approval. Vercel + GitHub is the intended path.
