import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { services } from '@/data/services';
import { ServiceIcon } from '@/components/ServiceIcon';
import { buildMetadata } from '@/lib/metadata';
import { BRAND, telHref, smsHref } from '@/lib/brand';

export const metadata: Metadata = buildMetadata({
  title: 'Our Services — Junk Removal, Demolition, & Specialty Hauling',
  description:
    'Every service Servant King offers, from junk removal and demolition to estate cleanouts, hot tub removal, and certified tire hauling. Same-day service across the Bay Area.',
  path: '/services'
});

export default function ServicesIndexPage() {
  return (
    <>
      <section className="bg-charcoal py-16 text-cream md:py-20">
        <div className="container-content text-center">
          <p className="eyebrow">Services</p>
          <h1 className="h1 mt-3 text-white">Everything We Haul, Remove, and Tear Down.</h1>
          <p className="lede mt-5 max-w-2xl mx-auto text-cream/85">
            Two core service lines and eight specialty services. All family-owned, flat-rate, same-day when we have the slot.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={telHref} className="btn-gold-filled">Call {BRAND.phoneFormatted}</a>
            <a href={smsHref()} className="btn-gold">Text a Photo</a>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-20">
        <div className="container-content">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-charcoal/5 transition hover:shadow-lg hover:ring-purple/20"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-warmCream">
                  <Image
                    src={service.cardImage}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-charcoal/50 to-transparent p-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-purple">
                      <ServiceIcon icon={service.cardIcon} className="h-5 w-5" />
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <h2 className="font-display text-[24px] font-semibold leading-tight text-charcoal">
                    {service.title}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-muted">
                    {service.heroSubhead}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[14px] font-semibold text-purple">
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
