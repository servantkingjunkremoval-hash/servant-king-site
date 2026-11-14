import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GoPage, type GoCategory } from '@/components/GoPage';
import { ServiceLanding } from '@/components/ServiceLanding';
import { SERVICE_LANDINGS, serviceLandingBySlug } from '@/lib/serviceLandings';

type Route = { base: GoCategory; title: string; description: string; h1?: string; sub?: string };

/**
 * One route per ad group, plus service-specific routes for the highest-intent
 * keywords so the page headline matches the exact search (message match).
 *
 * Two kinds of page share this route:
 *  - CATEGORIES below → the survey-style GoPage (tap tiles, one CTA).
 *  - SERVICE_LANDINGS (src/lib/serviceLandings.ts) → full one-thought pages,
 *    one per themed Google Ads ad group. Checked first. Adding one = adding an
 *    entry to that file; generateStaticParams and metadata pick it up here.
 * Both inherit /go/layout.tsx: noindex, no site header/footer, no cookie banner.
 *
 * No titles or descriptions here may quote a price or offer a price from a
 * photo. The offer on every paid page is a free on-site quote.
 */
const CATEGORIES: Record<string, Route> = {
  furniture: {
    base: 'furniture',
    title: 'Furniture & Appliance Removal — Free On-Site Quote',
    description: 'Old couch, mattress, or fridge? We carry it out and haul it away, same day. Tap what you need gone and book a free on-site quote.'
  },
  cleanouts: {
    base: 'cleanouts',
    title: 'Garage & Estate Cleanouts — Free On-Site Quote',
    description: 'Garage, estate, or storage unit cleared in one visit. We donate and recycle what we can. Tap what you need gone and book a free on-site quote.'
  },
  yard: {
    base: 'yard',
    title: 'Hot Tub, Shed & Yard Debris Removal — Free On-Site Quote',
    description: 'We dismantle, load, and haul it off — no dumpster needed. Tap what you need gone and book a free on-site quote.'
  },
  'hot-tub': {
    base: 'yard',
    title: 'Hot Tub Removal — Free On-Site Quote',
    description: 'We drain, cut, and haul your hot tub or spa away in one visit. No dumpster needed. Free on-site quote, flat price.',
    h1: 'Hot Tub in the Way? Gone in One Visit.',
    sub: 'We cut it down, load it, and haul it off — no dumpster, no mess. Tap how much you have.'
  },
  shed: {
    base: 'yard',
    title: 'Shed Removal & Haul Away — Free On-Site Quote',
    description: 'Old shed or playset? We take it down and haul every piece. Free on-site quote, flat price.',
    h1: 'Old Shed or Playset? We Take It Down and Haul It Off.',
    sub: 'Dismantled, loaded, gone — usually the same day. Tap how much you have.'
  },
  mattress: {
    base: 'furniture',
    title: 'Mattress & Couch Removal — Free On-Site Quote',
    description: 'Mattress, box spring, or couch picked up today. We carry it out. Free on-site quote, flat price.',
    h1: 'Mattress or Couch? Picked Up Today.',
    sub: 'We carry it out of any room, any floor. Tap how much you have.'
  },
  appliance: {
    base: 'furniture',
    title: 'Appliance Removal — Free On-Site Quote',
    description: 'Fridge, washer, dryer, or stove hauled away and disposed of responsibly. Free on-site quote, flat price.',
    h1: 'Old Fridge or Washer? Gone Today.',
    sub: 'We disconnect, carry, and dispose responsibly. Tap how much you have.'
  },
  garage: {
    base: 'cleanouts',
    title: 'Garage Cleanout — Free On-Site Quote',
    description: 'Reclaim your garage in one visit. We sort, load, donate what we can, and haul the rest. Free on-site quote, flat price.',
    h1: 'Reclaim Your Garage in One Visit.',
    sub: 'We sort, load, donate what we can, and haul the rest. Tap how much you have.'
  },
  estate: {
    base: 'cleanouts',
    title: 'Estate Cleanout — Free On-Site Quote',
    description: 'Compassionate, thorough estate cleanouts. Belongings handled with dignity; we donate and recycle first. Free on-site quote.',
    h1: 'Estate Cleanout, Handled With Care.',
    sub: 'Belongings treated with dignity. We donate and recycle first, haul the rest. Tap how much you have.'
  }
};

export function generateStaticParams() {
  return [
    ...Object.keys(CATEGORIES).map((category) => ({ category })),
    ...SERVICE_LANDINGS.map((p) => ({ category: p.slug }))
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const s = serviceLandingBySlug(category);
  if (s) return { title: s.title, description: s.metaDescription };
  const c = CATEGORIES[category];
  return c ? { title: c.title, description: c.description } : {};
}

export default async function GoCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const service = serviceLandingBySlug(category);
  if (service) return <ServiceLanding page={service} />;
  const r = CATEGORIES[category];
  if (!r) notFound();
  return <GoPage category={r.base} headline={r.h1 && r.sub ? { h1: r.h1, sub: r.sub } : undefined} />;
}
