import type { Metadata } from 'next';
import Link from 'next/link';
import { guides } from '@/data/guides';
import { BRAND, telHref } from '@/lib/brand';
import { buildMetadata, buildBreadcrumbJsonLd } from '@/lib/metadata';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing & Planning Guides — Junk Removal and Demolition',
  description:
    'Straight answers on what junk removal and demolition actually cost in the Bay Area, what drives the number, and how to get an exact quote.',
  path: '/guides'
});

export default function GuidesIndexPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' }
  ]);

  const junkGuides = guides.filter((g) => g.business === 'junk-removal');
  const demoGuides = guides.filter((g) => g.business === 'demolition');

  return (
    <>
      <JsonLd id="ld-json-guides-breadcrumb" data={breadcrumbJsonLd} />

      <section className="bg-charcoal py-14 text-cream md:py-20">
        <div className="container-content max-w-narrow">
          <p className="eyebrow text-gold">Guides</p>
          <h1 className="h1 mt-3 text-white">
            What This Work Actually Costs, and Why.
          </h1>
          <p className="lede mt-5 text-cream/85">
            No lead-gen forms in front of the numbers. Real Bay Area pricing, the
            factors that move it, and what is included before anyone quotes you.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="container-content max-w-narrow">
          <h2 className="h2">Junk Removal</h2>
          <ul className="mt-6 space-y-4">
            {junkGuides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="block rounded-xl bg-cream p-6 ring-1 ring-charcoal/5 transition hover:ring-purple/20"
                >
                  <h3 className="font-display text-[22px] font-semibold leading-snug text-charcoal">
                    {g.h1}
                  </h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-muted">
                    {g.metaDescription}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="h2 mt-14">Demolition</h2>
          <ul className="mt-6 space-y-4">
            {demoGuides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="block rounded-xl bg-cream p-6 ring-1 ring-charcoal/5 transition hover:ring-purple/20"
                >
                  <h3 className="font-display text-[22px] font-semibold leading-snug text-charcoal">
                    {g.h1}
                  </h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-muted">
                    {g.metaDescription}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream py-14">
        <div className="container-content text-center">
          <h2 className="h2">Have a job that is not covered here?</h2>
          <p className="lede mt-4 text-charcoal">
            Call or text {BRAND.phoneFormatted}. Free quote, no obligation.
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
