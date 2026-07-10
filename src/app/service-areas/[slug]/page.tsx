import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { serviceAreas, getServiceAreaBySlug, getAllServiceAreaSlugs } from '@/data/serviceAreas';
import { services } from '@/data/services';
import { BRAND, telHref, smsHref } from '@/lib/brand';
import { buildMetadata, buildLocalBusinessJsonLd } from '@/lib/metadata';
import { ServicesCarousel } from '@/components/ServicesCarousel';

export function generateStaticParams() {
  return getAllServiceAreaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);
  if (!area) return {};
  return buildMetadata({
    title: area.seoTitle,
    description: area.metaDescription,
    path: `/service-areas/${slug}`
  });
}

export default async function ServiceAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);
  if (!area) notFound();

  const jsonLd = buildLocalBusinessJsonLd({ city: area.title, county: area.county, slug: area.slug });
  const relatedAreas = serviceAreas
    .filter((sa) => sa.county === area.county && sa.slug !== area.slug)
    .slice(0, 6);

  return (
    <>
      <Script
        id={`ld-json-area-${slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-charcoal via-purple-darker to-purple-dark" />
        <div className="container-content relative py-16 md:py-24">
          <div className="max-w-3xl">
            <Link href="/service-areas" className="inline-flex items-center gap-1 text-[13px] font-semibold uppercase tracking-widest text-gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              All Service Areas
            </Link>
            <p className="eyebrow mt-5">
              JUNK REMOVAL &amp; DEMOLITION · {area.county.toUpperCase()}
            </p>
            <h1 className="h1 mt-3 text-white">{area.heroHeadline}</h1>
            <p className="lede mt-5 text-cream/90">{area.heroSubhead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={telHref} className="btn-primary">Call {BRAND.phoneFormatted}</a>
              <a href={smsHref(`Hey Chris, I need junk removal in ${area.title} — here's a photo:`)} className="btn-gold">
                Text a Photo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST ROW */}
      <section className="bg-charcoal-light text-cream">
        <div className="container-content flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-4 text-center text-[13px] font-semibold uppercase tracking-[0.12em]">
          <span>{BRAND.licenses.cslb}</span>
          <span className="text-gold">·</span>
          <span>{BRAND.reviews.count}+ ★ Reviews</span>
          <span className="text-gold">·</span>
          <span>Family Owned</span>
          <span className="text-gold">·</span>
          <span>Same-Day Service</span>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-content max-w-narrow">
          <h2 className="h2">{area.title} Junk Removal Done Right</h2>
          <p className="mt-5 text-[18px] leading-relaxed text-charcoal md:text-[20px]">{area.intro}</p>
        </div>
      </section>

      {/* NEIGHBORHOODS */}
      <section className="bg-cream py-16">
        <div className="container-content max-w-narrow">
          <h2 className="h2">Serving All of {area.title} and Nearby</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {area.neighborhoods.map((n) => (
              <li
                key={n}
                className="rounded-full bg-white px-4 py-2 text-[14px] font-semibold text-charcoal ring-1 ring-charcoal/10"
              >
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* LOCAL NOTES */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-content max-w-narrow">
          <h2 className="h2">What Makes {area.title} Different</h2>
          <p className="mt-5 text-[18px] leading-relaxed text-charcoal md:text-[20px]">{area.localNotes}</p>
        </div>
      </section>

      {/* SERVICES CAROUSEL */}
      <ServicesCarousel
        eyebrow="Our Services"
        heading={`What We Offer in ${area.title}`}
        subheading="Every service below is available in your area, same-day when we have the slot."
      />

      {/* FINAL CTA */}
      <section className="bg-charcoal py-16 text-cream md:py-20">
        <div className="container-content text-center">
          <h2 className="h2 text-white">Ready for Your {area.title} Quote?</h2>
          <p className="lede mt-5 text-cream/85">
            Text a photo to {BRAND.phoneFormatted}. We reply within the hour.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={telHref} className="btn-gold-filled">Call {BRAND.phoneFormatted}</a>
            <a href={smsHref(`Hey Chris, I need junk removal in ${area.title} — here's a photo:`)} className="btn-gold">Text a Photo</a>
          </div>
        </div>
      </section>

      {/* NEIGHBORING AREAS */}
      {relatedAreas.length > 0 && (
        <section className="bg-cream py-16">
          <div className="container-content">
            <div className="mx-auto max-w-narrow text-center">
              <p className="eyebrow">Nearby</p>
              <h2 className="h2 mt-3">Other Cities We Serve in {area.county}</h2>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {relatedAreas.map((r) => (
                <Link
                  key={r.slug}
                  href={`/service-areas/${r.slug}`}
                  className="group rounded-lg bg-white p-4 text-center ring-1 ring-charcoal/5 transition hover:shadow-md hover:ring-purple/30"
                >
                  <div className="font-display text-[17px] font-semibold leading-tight text-charcoal group-hover:text-purple">
                    {r.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
