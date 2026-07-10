# Deployment Guide — Servant King Next.js Site

This guide takes you from "file on disk" to "production site serving live traffic at servantkingdemolition.com" in about 30 minutes total of your time. No code changes required.

---

## Prerequisites (one-time, ~5 min)

### 1. Install Node.js 20+

Download from [nodejs.org](https://nodejs.org/en/download/) and install. After install, open **PowerShell** or **Command Prompt** and verify:

```powershell
node --version
npm --version
```

You should see `v20.x.x` or higher, and `npm 10.x.x` or higher.

### 2. Open a terminal in this folder

In File Explorer, navigate to `C:\Users\serva\OneDrive\Documents\Claude\Projects\Servant King Junk Removal & Demolition webpage\nextjs-site\` → right-click in empty space → **Open in Terminal**.

---

## Step 1 — Install dependencies (2 min)

```powershell
npm install
```

This downloads Next.js, React, Tailwind, and TypeScript into a `node_modules/` folder. First run takes 1-2 minutes. You might see some warnings about optional dependencies — those are fine to ignore.

---

## Step 2 — Preview locally (optional but recommended, 5 min)

```powershell
npm run dev
```

Terminal will show:

```
▲ Next.js 15.0.3
- Local:        http://localhost:3000
```

Open **http://localhost:3000** in your browser. You should see the full site — home page, services, service areas, all of it.

Click around: test the sticky mobile bar (shrink your browser to phone width), test a service area page (e.g. `http://localhost:3000/service-areas/palo-alto`), test a service page (e.g. `http://localhost:3000/services/hot-tub-removal`).

When you're done exploring, press `Ctrl+C` in the terminal to stop the dev server.

---

## Step 3 — Ship to Vercel (10 min)

### 3a. One-time Vercel setup

In the same terminal:

```powershell
npx vercel login
```

This opens your browser. Click **Continue with GitHub** (or **Continue with Email** if you don't have a GitHub account — both are free). Approve the access.

### 3b. Deploy

```powershell
npx vercel --prod
```

Vercel will ask a series of questions — accept the defaults for all of them:

1. **Set up and deploy?** → Press Enter (default: yes)
2. **Which scope?** → Pick your personal account (it's at the top)
3. **Link to existing project?** → `N` (this is a new project)
4. **Project name?** → Press Enter to accept `servant-king-site` or type something else
5. **In which directory is your code located?** → Press Enter (default: `./`)
6. **Want to modify these settings?** → `N`

Vercel will build and deploy. When it finishes (about 2 minutes), it prints a URL like:

```
✅ Production: https://servant-king-site-abc123.vercel.app
```

**That's your live site.** Open it in a browser. Everything should work exactly like the localhost preview, but now accessible from anywhere.

---

## Step 4 — Point your domain at Vercel (5 min)

Right now your domain `servantkingdemolition.com` points at Wix. We need to switch it to Vercel.

### 4a. Add the domain to Vercel

1. Open [vercel.com/dashboard](https://vercel.com/dashboard) in your browser.
2. Click the `servant-king-site` project.
3. Top tabs → **Settings** → left sidebar → **Domains**.
4. Type `servantkingdemolition.com` and click **Add**.
5. Vercel shows you DNS records to add. **Copy these** — typically an **A record** pointing to `76.76.21.21` or a **CNAME** record pointing to `cname.vercel-dns.com`.

Also add `www.servantkingdemolition.com` as a separate entry — Vercel will set up redirects automatically.

### 4b. Update DNS at your domain registrar

You registered the domain somewhere (GoDaddy, Namecheap, Google Domains, Cloudflare, or possibly through Wix itself). Log into that registrar and find the **DNS settings** for `servantkingdemolition.com`.

**Replace** the existing A record (probably pointing to Wix's IP) with the one Vercel gave you. Save.

DNS propagation takes **5 minutes to 48 hours**, but usually under 15 minutes. You can check status at [dnschecker.org](https://dnschecker.org) by entering your domain.

### 4c. Cancel Wix Premium (once the new site is live)

Once `servantkingdemolition.com` loads the new site correctly, you can cancel your Wix Premium subscription. Wix will keep the old site files for 90 days as a safety net — you can always restore if something goes sideways.

**Before cancelling:** back up anything you've customized in the Wix dashboard (Bookings settings, Forms data, etc.) to your own records.

---

## Verification checklist

After the domain propagates:

- [ ] https://www.servantkingdemolition.com/ loads the new site
- [ ] Click a service card (e.g., "Hot Tub Removal") — loads `/services/hot-tub-removal`
- [ ] Click a city tile (e.g., "Palo Alto") — loads `/service-areas/palo-alto`
- [ ] Meta Pixel is firing: open [Meta Events Manager](https://business.facebook.com/events_manager2) → **Test Events** → paste your URL → should see PageView
- [ ] Contact event fires: click a `Call 209-938-7407` button in Test Events → should see Contact
- [ ] Submit a test lead via the Contact page form → verify it lands in Snipey as a new contact
- [ ] Sitemap accessible: https://www.servantkingdemolition.com/sitemap.xml
- [ ] Robots.txt: https://www.servantkingdemolition.com/robots.txt

---

## Future changes

### Copy or content edits

Any copy change = edit the relevant file in `src/`, save, run `npx vercel --prod`, done. Deploys take ~90 seconds.

- Phone / email / address / license numbers: `src/lib/brand.ts`
- Service descriptions: `src/data/services.ts`
- City descriptions: `src/data/serviceAreas.ts`
- Home page: `src/app/page.tsx`
- About page: `src/app/about/page.tsx`

### Swapping in real photos

1. Create a folder `public/images/` and drop your photos in (e.g., `truck-hero.jpg`, `crew-folsom.jpg`).
2. In `src/app/page.tsx` or wherever the photo is referenced, change the `src` prop from an Unsplash URL to `/images/truck-hero.jpg`.
3. Run `npx vercel --prod` to redeploy.

### Adding Google Analytics (optional)

1. In `src/lib/brand.ts`, uncomment the `NEXT_PUBLIC_GA4_ID` env var line.
2. Follow [Vercel's GA4 guide](https://nextjs.org/docs/app/building-your-application/optimizing/analytics) to add the GA4 script component.

### Adding new service-area cities

Edit `src/data/serviceAreas.ts` — add a new object following the existing pattern. The new city automatically gets:
- Its own dynamic page at `/service-areas/{slug}`
- A tile on the home page and on `/service-areas` index
- A sitemap entry
- A JSON-LD LocalBusiness schema entry

No code changes needed beyond the data file.

### Adding new services

Same pattern — edit `src/data/services.ts` and the service auto-appears in the carousel, the `/services` hub, and gets its own SEO page.

---

## Rollback (if anything breaks)

Every Vercel deploy is frozen and browsable. If the latest deploy has a bug, Vercel dashboard → Deployments → find the previous working deploy → **⋯** menu → **Promote to Production**. Takes 10 seconds to roll back.

---

## Questions / things that might trip you up

**Q: Do I need a GitHub account?**
Not strictly — Vercel's CLI works without it. But if you do link GitHub, future deploys happen automatically when you push commits. Recommended but optional.

**Q: What does this cost?**
Vercel's Hobby plan is free and covers everything this site needs (unlimited bandwidth for personal projects, plenty of build minutes). Your only recurring cost is the domain registration (~$15/year wherever you have it registered).

**Q: What about Wix?**
Once the new site is live and verified, cancel Wix Premium. Keep the Wix login active for 90 days as a safety net in case you need anything from the old dashboard.

**Q: The old `/privacy-policy` or other legacy URLs?**
If Google has indexed any old Wix URLs, they'll 404 on the new site. Either (a) accept it — Google will reindex within a month, or (b) add redirects in `next.config.mjs` under the `async redirects()` function.

**Q: What if Meta Pixel stops firing?**
Check [Meta Events Manager → Test Events](https://business.facebook.com/events_manager2). The Pixel ID is baked into `src/lib/brand.ts` → `TRACKING.metaPixelId`. Redeploy after any change.

**Q: What about the Snipey form?**
It's embedded as an iframe on the Contact page. If you change the Snipey form ID, update `src/lib/brand.ts` → `TRACKING.snipeyFormId`. Redeploy.

---

## Questions for me

If anything doesn't work after deploy, paste the error into our chat and I'll fix it in minutes.
