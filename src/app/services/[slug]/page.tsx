import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { services, getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import { BRAND, telHref, smsHref } from '@/lib/brand';
import { buildMetadata, buildLocalBusinessJsonLd } from '@/lib/metadata';
import { ServiceIcon } from '@/components/ServiceIcon';

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.metaDescription,
    path: `/services/${slug}`
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const jsonLd = {
    ...buildLocalBusinessJsonLd(),
    '@id': `${BRAND.siteUrl}/services/${slug}`,
    url: `${BRAND.siteUrl}/services/${slug}`,
    name: `${BRAND.name} — ${service.title}`,
    description: service.metaDescription,
    serviceType: service.title
  };

  const relatedServices = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <Script
        id={`ld-json-service-${slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div className="absolute inset-0 -z-10">
          <Image src={service.cardImage} alt="" fill priority className="object-cover opacity-25" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/90 to-purple-darker/80" />
        </div>
        <div className="container-content relative py-16 md:py-24">
          <div className="max-w-3xl">
            <Link href="/services" className="inline-flex items-center gap-1 text-[13px] font-semibold uppercase tracking-widest text-gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              All Services
            </Link>
            <div className="mt-4 inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
              <ServiceIcon icon={service.cardIcon} className="h-5 w-5 text-gold" />
              <span className="text-[13px] font-semibold uppercase tracking-wider text-cream/90">
                {service.title}
              </span>
            </div>
            <h1 className="h1 mt-5 text-white">{service.heroHeadline}</h1>
            <p className="lede mt-5 text-cream/90">{service.heroSubhead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={telHref} className="btn-primary">Call {BRAND.phoneFormatted}</a>
              <a href={smsHref(`Hey Chris, I need ${service.title} — here's a photo:`)} className="btn-gold">
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
          <p className="text-[18px] leading-relaxed text-charcoal md:text-[20px]">{service.intro}</p>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="bg-cream py-16">
        <div className="container-content">
          <div className="mx-auto max-w-narrow text-center">
            <p className="eyebrow">What You Get</p>
            <h2 className="h2 mt-3">Highlights</h2>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {service.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 rounded-lg bg-white p-5 ring-1 ring-charcoal/5">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-gold" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-[16px] font-semibold text-charcoal">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* DETAILS */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-content max-w-narrow">
          {service.details.map((d) => (
            <div key={d.heading} className="mb-10 last:mb-0">
              <h3 className="font-display text-[26px] font-semibold leading-tight text-charcoal">{d.heading}</h3>
              <p className="mt-3 text-[17px] leading-relaxed text-charcoal">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-16 md:py-20">
        <div className="container-content max-w-narrow">
          <div className="text-center">
            <p className="eyebrow">FAQs</p>
            <h2 className="h2 mt-3">Common Questions About {service.title}</h2>
          </div>
          <div className="mt-10 space-y-4">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-lg bg-white p-6 ring-1 ring-charcoal/5 transition open:ring-purple/20">
                <summary className="flex cursor-pointer items-center justify-between font-display text-[19px] font-semibold text-charcoal">
                  {faq.question}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-purple transition group-open:rotate-45" aria-hidden="true">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </summary>
                <p className="mt-3 text-[16px] leading-relaxed text-charcoal">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-charcoal py-16 text-cream md:py-20">
        <div className="container-content text-center">
          <h2 className="h2 text-white">Ready for your {service.title} quote?</h2>
          <p className="lede mt-5 text-cream/85">
            Text a photo to {BRAND.phoneFormatted}. Or fill the form — we&apos;ll reach out within the hour.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={telHref} className="btn-gold-filled">Call {BRAND.phoneFormatted}</a>
            <a href={smsHref(`Hey Chris, I need ${service.title} — here's a photo:`)} className="btn-gold">Text a Photo</a>
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="bg-cream py-16">
        <div className="container-content">
          <div className="mx-auto max-w-narrow text-center">
            <p className="eyebrow">Explore</p>
            <h2 className="h2 mt-3">Related Services</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {relatedServices.map((r) => (
              <Link
                key={r.slug}
                href={`/services/${r.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-charcoal/5 transition hover:shadow-md hover:ring-purple/20"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-warmCream">
                  <Image src={r.cardImage} alt={r.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition group-hover:scale-[1.04]" />
                </div>
                <div className="flex-1 p-5">
                  <h3 className="font-display text-[20px] font-semibold text-charcoal">{r.title}</h3>
                  <p className="mt-1 text-[14px] text-muted line-clamp-2">{r.heroSubhead}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
