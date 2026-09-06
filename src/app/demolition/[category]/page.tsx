import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DemoPage, type DemoCategory } from '@/components/DemoPage';

type Route = { base: DemoCategory; title: string; description: string; h1?: string; sub?: string };

/** One route per Google Ads ad group so the headline matches the search (message match). */
const CATEGORIES: Record<string, Route> = {
  kitchen: {
    base: 'kitchen',
    title: 'Kitchen Demolition — Call for Your Price | Servant King Demolition',
    description: 'Cabinets, counters, backsplash and flooring out in a day, debris hauled the same day. Licensed C-21. Call for a real number.'
  },
  bathroom: {
    base: 'bathroom',
    title: 'Bathroom Demolition — Call for Your Price | Servant King Demolition',
    description: 'Bathroom gut to the studs, tile and tub removal, haul-off included. Licensed C-21. Call for a real number.'
  },
  interior: {
    base: 'interior',
    title: 'Interior Demolition — Call for Your Price | Servant King Demolition',
    description: 'Drywall, flooring and full interior strip-outs with dust control and a broom-clean finish. Licensed C-21. Call for a real number.'
  },
  exterior: {
    base: 'exterior',
    title: 'Deck, Fence, Shed & Pool Removal — Call for Your Price | Servant King Demolition',
    description: 'Decks, fences, sheds and pools torn down and hauled off. Licensed C-21. Call for a real number.'
  },
  concrete: {
    base: 'concrete',
    title: 'Concrete & Driveway Removal — Call for Your Price | Servant King Demolition',
    description: 'Slabs, patios, walkways and driveways broken up and hauled away. Licensed C-21. Call for a real number.'
  },
  contractors: {
    base: 'contractors',
    title: 'Demolition Subcontractor for GCs — Bay Area | Servant King Demolition',
    description: 'Licensed C-21 demo sub with a 2-man crew and dump truck, haul-off included, COI on request. Call for rates.'
  },
  pool: {
    base: 'exterior',
    title: 'Pool Removal & Demolition — Call for Your Price | Servant King Demolition',
    description: 'Above-ground and in-ground pool demolition and haul-off. Licensed C-21. Call for a real number.',
    h1: 'Pool Demolition — Removed, Filled, Hauled.',
    sub: 'Above-ground or in-ground. The right equipment, the debris gone. Tap when you need it done.'
  },
  deck: {
    base: 'exterior',
    title: 'Deck Removal — Call for Your Price | Servant King Demolition',
    description: 'Old deck torn down and hauled off, usually in a day. Licensed C-21. Call for a real number.',
    h1: 'Old Deck? Torn Down and Gone in a Day.',
    sub: 'Boards, framing, footings — dismantled, loaded, hauled. Tap when you need it done.'
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

export default async function DemolitionCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const r = CATEGORIES[category];
  if (!r) notFound();
  return <DemoPage category={r.base} headline={r.h1 && r.sub ? { h1: r.h1, sub: r.sub } : undefined} />;
}
