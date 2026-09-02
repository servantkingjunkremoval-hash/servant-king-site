import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND, LOCATIONS, BRANCH_LOCATIONS, telHref, smsHref } from '@/lib/brand';
import { buildMetadata, buildBreadcrumbJsonLd } from '@/lib/metadata';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Our Locations — Menlo Park, San Ramon, Lathrop & Stockton',
  description:
    'Servant King operates from four California locations: Menlo Park on the Peninsula, San Ramon in the East Bay, and Lathrop and Stockton in the Central Valley.',
  path: '/locations'
});

export default function LocationsPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Locations', path: '/locations' }
  ]);

  const yards = LOCATIONS.filter((l) => l.role === 'yard');

  return (
    <>
      {/* The LocalBusiness nodes for these locations are emitted site-wide from the
          root layout's entity graph, keyed to #<id> anchors on this page. */}
      <JsonLd id="ld-json-locations-breadcrumb" data={breadcrumbJsonLd} />

      <section className="bg-charcoal py-14 text-cream md:py-20">
        <div className="container-content max-w-narrow">
          <p className="eyebrow text-gold">Locations</p>
          <h1 className="h1 mt-3 text-white">Four Locations. One Crew Standard.</h1>
          <p className="lede mt-5 text-cream/85">
            Servant King runs out of Menlo Park, San Ramon, Lathrop, and Stockton.
            Same flat-rate pricing, same uniformed crew, same donation-first policy at
            every one.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={telHref} className="btn-gold-filled">
              Call {BRAND.phoneFormatted}
            </a>
            <a href={smsHref()} className="btn-gold">
              Text a Photo
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="container-content max-w-narrow">
          {BRANCH_LOCATIONS.map((loc) => (
            <article key={loc.id} id={loc.id} className="mb-12 scroll-mt-24 last:mb-0">
              <h2 className="h2">{loc.label}</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-charcoal">{loc.blurb}</p>

              <dl className="mt-6 grid gap-4 rounded-xl bg-cream p-6 sm:grid-cols-2">
                <div>
                  <dt className="eyebrow">Address</dt>
                  <dd className="mt-1 text-[16px] text-charcoal">
                    {loc.street ? (
                      <>
                        {loc.street}
                        {loc.suite ? `, ${loc.suite}` : ''}
                        <br />
                        {loc.city}, {loc.state} {loc.zip}
                      </>
                    ) : (
                      <>
                        {loc.city}, {loc.state}
                      </>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Counties Served</dt>
                  <dd className="mt-1 text-[16px] text-charcoal">
                    {loc.countiesServed.join(', ')}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Phone</dt>
                  <dd className="mt-1 text-[16px] text-charcoal">
                    <a href={telHref} className="font-semibold hover:text-purple">
                      {BRAND.phoneFormatted}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">License</dt>
                  <dd className="mt-1 text-[16px] text-charcoal">{BRAND.licenses.cslb}</dd>
                </div>
              </dl>
            </article>
          ))}

          {yards.map((yard) => (
            <article key={yard.id} id={yard.id} className="mt-12 scroll-mt-24">
              <h2 className="h2">{yard.label}</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-charcoal">{yard.blurb}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-cream py-14">
        <div className="container-content text-center">
          <h2 className="h2">Not sure which location covers you?</h2>
          <p className="lede mt-4 text-charcoal">
            One number reaches all three. Or check the{' '}
            <Link href="/service-areas" className="font-semibold text-purple hover:underline">
              full service area list
            </Link>
            .
          </p>
          <div className="mt-8">
            <a href={telHref} className="btn-primary">
              Call {BRAND.phoneFormatted}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
