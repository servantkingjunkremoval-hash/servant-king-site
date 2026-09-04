import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GoPage, type GoCategory } from '@/components/GoPage';

type Route = { base: GoCategory; title: string; description: string; h1?: string; sub?: string };

/**
 * One route per ad group, plus service-specific routes for the highest-intent
 * keywords so the page headline matches the exact search (message match).
 */
const CATEGORIES: Record<string, Route> = {
  furniture: {
    base: 'furniture',
    title: 'Furniture & Appliance Removal — Call for Your Price',
    description: 'Old couch, mattress, or fridge? We carry it out and haul it away, same day. Tap what you need gone and call for a real price.'
  },
  cleanouts: {
    base: 'cleanouts',
    title: 'Garage & Estate Cleanouts — Call for Your Price',
    description: 'Garage, estate, or storage unit cleared in one visit. We donate and recycle what we can. Tap what you need gone and call for a real price.'
  },
  yard: {
    base: 'yard',
    title: 'Hot Tub, Shed & Yard Debris Removal — Call for Your Price',
    description: 'We dismantle, load, and haul it off — no dumpster needed. Tap what you need gone and call for a real price.'
  },
  'hot-tub': {
    base: 'yard',
    title: 'Hot Tub Removal — Call for Your Price',
    description: 'We drain, cut, and haul your hot tub or spa away in one visit. No dumpster needed. Call for a real price.',
    h1: 'Hot Tub in the Way? Gone in One Visit.',
    sub: 'We cut it down, load it, and haul it off — no dumpster, no mess. Tap how much you have.'
  },
  shed: {
    base: 'yard',
    title: 'Shed Removal & Haul Away — Call for Your Price',
    description: 'Old shed or playset? We take it down and haul every piece. Call for a real price.',
    h1: 'Old Shed or Playset? We Take It Down and Haul It Off.',
    sub: 'Dismantled, loaded, gone — usually the same day. Tap how much you have.'
  },
  mattress: {
    base: 'furniture',
    title: 'Mattress & Couch Removal — Call for Your Price',
    description: 'Mattress, box spring, or couch picked up today. We carry it out. Call for a real price.',
    h1: 'Mattress or Couch? Picked Up Today.',
    sub: 'We carry it out of any room, any floor. Tap how much you have.'
  },
  appliance: {
    base: 'furniture',
    title: 'Appliance Removal — Call for Your Price',
    description: 'Fridge, washer, dryer, or stove hauled away and disposed of responsibly. Call for a real price.',
    h1: 'Old Fridge or Washer? Gone Today.',
    sub: 'We disconnect, carry, and dispose responsibly. Tap how much you have.'
  },
  garage: {
    base: 'cleanouts',
    title: 'Garage Cleanout — Call for Your Price',
    description: 'Reclaim your garage in one visit. We sort, load, donate what we can, and haul the rest. Call for a real price.',
    h1: 'Reclaim Your Garage in One Visit.',
    sub: 'We sort, load, donate what we can, and haul the rest. Tap how much you have.'
  },
  estate: {
    base: 'cleanouts',
    title: 'Estate Cleanout — Call for Your Price',
    description: 'Compassionate, thorough estate cleanouts. Belongings handled with dignity; we donate and recycle first. Call for a real price.',
    h1: 'Estate Cleanout, Handled With Care.',
    sub: 'Belongings treated with dignity. We donate and recycle first, haul the rest. Tap how much you have.'
  }
};

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const c = CATEGORIES[category];
  return c ? { title: c.title, description: c.description } : {};
}

export default async function GoCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const r = CATEGORIES[category];
  if (!r) notFound();
  return <GoPage category={r.base} headline={r.h1 && r.sub ? { h1: r.h1, sub: r.sub } : undefined} />;
}
