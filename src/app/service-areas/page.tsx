import Link from 'next/link';
import type { Metadata } from 'next';
import { serviceAreas } from '@/data/serviceAreas';
import { buildMetadata } from '@/lib/metadata';
import { BRAND, telHref, smsHref } from '@/lib/brand';

export const metadata: Metadata = buildMetadata({
  title: 'Service Areas — 26 Cities Across the Bay Area, Placer & Sacramento',
  description:
    'Servant King Junk Removal & Demolition serves 26 cities across Bay Area, Placer, and Sacramento counties. Same-day service. CSLB C-21 licensed. 320+ 5-star reviews.',
  path: '/service-areas'
});

// Group by county for scannability
function groupByCounty(areas: typeof serviceAreas) {
  const map: Record<string, typeof serviceAreas> = {};
  for (const area of areas) {
    if (!map[area.county]) map[area.county] = [];
    map[area.county].push(area);
  }
  return map;
}

export default function ServiceAreasIndexPage() {
  const grouped = groupByCounty(serviceAreas);
  const counties = Object.keys(grouped).sort();

  return (
    <>
      <section className="bg-charcoal py-16 text-cream md:py-20">
        <div className="container-content text-center">
          <p className="eyebrow">Where We Work</p>
          <h1 className="h1 mt-3 text-white">26 Cities. One Crew. Same-Day Service.</h1>
          <p className="lede mt-5 mx-auto max-w-2xl text-cream/85">
            Servant King serves the Bay Area, Placer, and Sacramento corridors. Pick your city for local pricing, neighborhood-specific service, and permit know-how.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={telHref} className="btn-gold-filled">Call {BRAND.phoneFormatted}</a>
            <a href={smsHref()} className="btn-gold">Text a Photo</a>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-20">
        <div className="container-content">
          {counties.map((county) => (
            <div key={county} className="mb-12">
              <h2 className="h2 mb-6 text-charcoal">{county}</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {grouped[county].map((sa) => (
                  <Link
                    key={sa.slug}
                    href={`/service-areas/${sa.slug}`}
                    className="group rounded-lg bg-white p-5 ring-1 ring-charcoal/5 transition hover:shadow-md hover:ring-purple/30"
                  >
                    <div className="font-display text-[19px] font-semibold leading-tight text-charcoal group-hover:text-purple">
                      {sa.title}
                    </div>
                    <div className="mt-1 text-[13px] text-muted line-clamp-2">
                      {sa.neighborhoods.slice(0, 3).join(' · ')}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
