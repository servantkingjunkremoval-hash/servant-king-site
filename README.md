# Servant King — Next.js Site

Production site for [servantkingdemolition.com](https://www.servantkingdemolition.com).

Built with **Next.js 15 (App Router)** · **TypeScript** · **Tailwind CSS** · **React 18**.

---

## What's in this project

- **Home page** with hero, trust row, how-it-works, services tabs, services carousel, social proof, eco / donation partners, about section, 26-city service-area grid, lead magnet opt-in, and sticky mobile Call/Text/Quote bar.
- **Services hub** (`/services`) + dedicated SEO pages for 10 services (Junk Removal, Demolition, Estate Cleanouts, Hoarder Cleanouts, Hot Tub Removal, Appliance Removal, Mattress Disposal, Construction Debris, Tire Hauling, Public Works).
- **Service Areas hub** (`/service-areas`) + dynamic pages for 26 cities (auto-generated from the data in `src/data/serviceAreas.ts`). Unique copy per city — not templated doorway pages.
- **About page** (`/about`) — servant-leadership origin story.
- **Contact page** (`/contact`) — embedded Snipey form with city/service URL tagging.
- **Meta Pixel** (`413008923033500`) injected in `<head>` — fires PageView.
- **Meta Pixel Contact event** tracker — fires on every tel/sms/mailto click, even after client-side navigation.
- **Snipey form embed** — iframe with `source_city` and `source_service` params per page.
- **Dynamic SEO** — per-page title, meta description, canonical URL, Open Graph, LocalBusiness JSON-LD.
- **Sitemap** (`/sitemap.xml`) and **robots.txt** auto-generated.
- **Mobile-first responsive** with sticky bottom bar for mobile visitors.
- **iPhone safe-area support** for the sticky mobile bar.

---

## Quick start

```bash
npm install
npm run dev
# → http://localhost:3000
```

For production build:

```bash
npm run build
npm start
```

---

## Project structure

```
nextjs-site/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout, Meta Pixel, fonts
│   │   ├── page.tsx                      # Home page (all sections inline)
│   │   ├── globals.css                   # Tailwind + brand system
│   │   ├── sitemap.ts                    # Auto sitemap.xml
│   │   ├── robots.ts                     # Auto robots.txt
│   │   ├── not-found.tsx                 # 404 page
│   │   ├── services/
│   │   │   ├── page.tsx                  # /services hub
│   │   │   └── [slug]/page.tsx           # Dynamic service page (10 pages)
│   │   ├── service-areas/
│   │   │   ├── page.tsx                  # /service-areas hub
│   │   │   └── [slug]/page.tsx           # Dynamic city page (26 pages)
│   │   ├── about/page.tsx                # About
│   │   └── contact/page.tsx              # Contact (Snipey form)
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── StickyMobileBar.tsx
│   │   ├── MetaPixel.tsx                 # Pixel + ContactEventTracker
│   │   ├── SnipeyForm.tsx
│   │   ├── ServicesCarousel.tsx          # Junkluggers-style horizontal carousel
│   │   └── ServiceIcon.tsx
│   ├── data/
│   │   ├── services.ts                   # 10 service records
│   │   └── serviceAreas.ts               # 26 city records
│   └── lib/
│       ├── brand.ts                      # Phone, email, address, Pixel ID, etc.
│       └── metadata.ts                   # SEO + JSON-LD helpers
├── public/                               # Static assets (favicon, og-image, photos)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
└── .env.example
```

---

## Where things live (edit map)

| Want to change... | Edit... |
|---|---|
| Phone, email, address, license # | `src/lib/brand.ts` |
| Meta Pixel ID, Snipey form ID | `src/lib/brand.ts` (`TRACKING`) |
| Brand colors | `tailwind.config.ts` + `src/app/globals.css` |
| Service descriptions (any of 10) | `src/data/services.ts` |
| Service area content (any of 26) | `src/data/serviceAreas.ts` |
| Home page section order or copy | `src/app/page.tsx` |
| Header navigation | `src/components/Header.tsx` |
| Footer | `src/components/Footer.tsx` |

**Most content changes live in `src/data/` or `src/lib/brand.ts`.** Cards, SEO titles, meta descriptions, and city-level copy update automatically everywhere they're used.

---

## Placeholder imagery

The site currently pulls photos from Unsplash for hero, service cards, and about sections. See `DEPLOY.md` for how to swap in real Servant King photos (crew, truck, before/after jobs). The swap is a 2-line edit per image once photos are uploaded.

---

## Environment variables

Copy `.env.example` → `.env.local` if you want to override defaults. All the defaults work out of the box.

```
NEXT_PUBLIC_SITE_URL=https://www.servantkingdemolition.com
NEXT_PUBLIC_META_PIXEL_ID=413008923033500
NEXT_PUBLIC_SNIPEY_FORM_ID=711IPzJp8GKJpqaH4sOb
```

---

## Deployment

See **`DEPLOY.md`** for step-by-step Vercel deployment + domain cutover instructions.

---

## License

Private. © Servant King Junk Removal & Demolition.
