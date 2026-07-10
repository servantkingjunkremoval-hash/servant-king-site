'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { services } from '@/data/services';
import { ServiceIcon } from '@/components/ServiceIcon';

/**
 * Horizontal services carousel — pattern inspired by junkluggers.com's services
 * strip. Each card links to a dedicated /services/[slug] SEO page.
 *
 * Native scroll-snap — no JS carousel library dependency. Arrow buttons nudge
 * the scroll. Cards remain accessible via keyboard (tab) and touch (swipe).
 */
export function ServicesCarousel({ eyebrow, heading, subheading }: { eyebrow?: string; heading: string; subheading?: string }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const nudge = (direction: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = 320; // approx matches min card width + gap
    el.scrollBy({ left: direction === 'right' ? cardWidth : -cardWidth, behavior: 'smooth' });
  };

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container-content">
        <div className="mx-auto max-w-narrow text-center">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="h2 mt-3">{heading}</h2>
          {subheading && <p className="lede muted mt-4">{subheading}</p>}
        </div>

        <div className="relative mt-10">
          {/* Arrow buttons — hidden on mobile where native swipe is expected */}
          <button
            onClick={() => nudge('left')}
            aria-label="Scroll services left"
            className="absolute -left-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-purple hover:text-white md:flex"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => nudge('right')}
            aria-label="Scroll services right"
            className="absolute -right-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-purple hover:text-white md:flex"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:thin]"
            aria-label="Services"
          >
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative flex min-w-[280px] max-w-[320px] flex-1 shrink-0 snap-start flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-charcoal/5 transition hover:shadow-lg hover:ring-purple/20 md:min-w-[320px]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-warmCream">
                  <Image
                    src={service.cardImage}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 80vw, 320px"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-charcoal/60 to-transparent p-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-purple">
                      <ServiceIcon icon={service.cardIcon} className="h-5 w-5" />
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="font-display text-[22px] font-semibold leading-tight text-charcoal">
                    {service.cardLabel}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-muted line-clamp-3">
                    {service.heroSubhead}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[14px] font-semibold text-purple">
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

        <div className="mt-10 text-center">
          <Link href="/services" className="btn-ghost">
            See All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
