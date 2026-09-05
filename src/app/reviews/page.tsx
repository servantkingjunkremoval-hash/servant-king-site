import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND, PRIMARY_LOCATION } from '@/lib/brand';
import { buildMetadata, buildLocalBusinessJsonLd, buildBreadcrumbJsonLd } from '@/lib/metadata';
import { JsonLd } from '@/components/JsonLd';
import { Stars } from '@/components/Stars';
import {
  REVIEWS,
  GOOGLE_REVIEW_COUNT,
  GOOGLE_RATING,
  leadTelHref,
  LEAD_PHONE_FORMATTED
} from '@/lib/reviews';

/**
 * /reviews — the indexable destination for the Google Ads "Read Our Reviews"
 * sitelink. Unlike /go this page keeps the full site chrome; it exists to prove
 * the reputation claim and hand the visitor a phone number, not to funnel taps.
 *
 * Phone: the Quo lead line, same as /go, so calls from the sitelink stay
 * attributable to paid search.
 */

const PAGE_PATH = '/reviews';
const PAGE_URL = `${BRAND.siteUrl}${PAGE_PATH}`;
const RATING_LABEL = GOOGLE_RATING.toFixed(1);
const GBP_REVIEWS_URL = PRIMARY_LOCATION.gbpUrl ?? 'https://maps.google.com/?cid=3586641254274458822';
const BRANCH_CITIES = 'Menlo Park, San Ramon, Lathrop, Stockton';

// Rounded-down headline number. The exact GBP count is in the schema and the
// outbound link; the headline stays true as the count keeps climbing.
const HEADLINE_COUNT = `${GOOGLE_REVIEW_COUNT - (GOOGLE_REVIEW_COUNT % 50)}+`;
const TITLE = `Reviews — ${HEADLINE_COUNT} Five-Star Google Reviews | Servant King Junk Removal`;

export const metadata: Metadata = {
  ...buildMetadata({
    title: TITLE,
    description: `Read real Google reviews of Servant King Junk Removal — ${RATING_LABEL} stars across ${BRANCH_CITIES}. Same-day, licensed and insured junk removal for the Peninsula, South Bay, and Tri-Valley. Call ${LEAD_PHONE_FORMATTED}.`,
    path: PAGE_PATH
  }),
  // The title already names the business; skip the root layout's "| Servant King" template.
  title: { absolute: TITLE }
};

const WHY_FIVE_STARS = [
  {
    title: 'Licensed & insured',
    body: `${BRAND.licenses.cslb}. Full general liability and workers' comp on every job, so you're never on the hook.`
  },
  {
    title: 'Same-day service',
    body: "Call before noon and we can usually be in your driveway today. If we can't, we tell you honestly and book the next slot."
  },
  {
    title: 'Upfront pricing',
    body: 'Flat-rate quotes by phone or from a photo. The price we quote is the price you pay — no hourly meter, no surprises.'
  },
  {
    title: 'We do the lifting',
    body: "Point at it and it's gone. Upstairs, in the garage, behind the shed — our crew carries, loads, and sweeps up."
  },
  {
    title: 'Donate & recycle first',
    body: `Every load comes back to our yard and gets sorted. Usable items go to ${BRAND.donationPartners.slice(0, 3).join(', ')}, and more. Landfill is the last stop, not the first.`
  }
];

function CtaRow({ dark = false }: { dark?: boolean }) {
  return (
    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
      <a href={leadTelHref} className="btn-gold-filled">
        Call {LEAD_PHONE_FORMATTED}
      </a>
      <Link href="/go" className={dark ? 'btn-gold' : 'btn-primary'}>
        Get a Price in Minutes
      </Link>
    </div>
  );
}

export default function ReviewsPage() {
  const jsonLd = {
    ...buildLocalBusinessJsonLd(),
    '@id': PAGE_URL,
    url: PAGE_URL,
    name: BRAND.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: RATING_LABEL,
      reviewCount: GOOGLE_REVIEW_COUNT.toString(),
      bestRating: '5',
      worstRating: '1'
    },
    review: REVIEWS.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
      reviewBody: r.quote,
      publisher: { '@type': 'Organization', name: 'Google' }
    }))
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Reviews', path: PAGE_PATH }
  ]);

  return (
    <>
      <JsonLd id="ld-json-reviews" data={jsonLd} />
      <JsonLd id="ld-json-reviews-breadcrumb" data={breadcrumbJsonLd} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-charcoal py-16 text-cream md:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-charcoal via-purple-darker to-purple-dark" />
        <div className="container-content text-center">
          <p className="eyebrow">Customer Reviews</p>
          <h1 className="h1 mt-3 text-white">{HEADLINE_COUNT} Five-Star Google Reviews</h1>
          <div className="mt-5 flex justify-center">
            <Stars className="text-3xl md:text-4xl" label={`Rated ${RATING_LABEL} out of 5 stars on Google`} />
          </div>
          <p className="mt-3 text-lg font-semibold text-white md:text-xl">
            {RATING_LABEL} on Google · {BRANCH_CITIES}
          </p>
          <p className="lede mt-4 mx-auto max-w-2xl text-cream/85">
            Real customers across the Peninsula, South Bay, and Tri-Valley — homeowners, landlords, and offices who needed it gone and called us.
          </p>
          <CtaRow dark />
        </div>
      </section>

      {/* REVIEWS GRID */}
      <section className="bg-cream py-16 md:py-20" aria-labelledby="reviews-heading">
        <div className="container-content">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What people say</p>
            <h2 id="reviews-heading" className="h2 mt-3 text-charcoal">
              Straight from Google, in their words.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-muted">
              Every quote below is excerpted from a public Google review. We don&apos;t edit them and we don&apos;t make them up.
            </p>
          </div>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" role="list">
            {REVIEWS.map((r) => (
              <li
                key={r.name}
                className="flex flex-col rounded-xl bg-white p-6 shadow-sm ring-1 ring-charcoal/5 transition hover:shadow-md"
              >
                <Stars className="text-lg" label="5 out of 5 stars" />
                <blockquote className="mt-3 flex-1 text-[16px] leading-relaxed text-charcoal/90">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <footer className="mt-5 border-t border-charcoal/10 pt-4">
                  <p className="font-semibold text-charcoal">
                    {r.name}
                    {r.where && <span className="font-normal text-muted"> · {r.where}</span>}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">Google review</p>
                </footer>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <a
              href={GBP_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-purple underline decoration-purple/30 underline-offset-4 transition hover:decoration-purple"
            >
              Read all {GOOGLE_REVIEW_COUNT} reviews on Google
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>

      {/* WHY 5 STARS */}
      <section className="bg-white py-16 md:py-20" aria-labelledby="why-heading">
        <div className="container-content">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Why it works</p>
            <h2 id="why-heading" className="h2 mt-3 text-charcoal">
              Why customers rate us 5 stars.
            </h2>
          </div>
          <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {WHY_FIVE_STARS.map((item) => (
              <div key={item.title} className="rounded-xl bg-cream p-6 ring-1 ring-charcoal/5">
                <dt className="flex items-start gap-3 font-display text-[20px] font-semibold leading-snug text-charcoal">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {item.title}
                </dt>
                <dd className="mt-3 text-[15px] leading-relaxed text-charcoal/85">{item.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-purple py-16 text-cream md:py-20">
        <div className="container-content text-center">
          <p className="eyebrow">Ready when you are</p>
          <h2 className="h2 mt-3 text-white">Be our next five-star review.</h2>
          <p className="lede mt-4 mx-auto max-w-2xl text-cream/85">
            Call now for a real price, or tap through a few questions and we&apos;ll call you back in minutes.
          </p>
          <CtaRow dark />
          <p className="mt-6 text-sm text-cream/70">
            {BRAND.shortName} · {BRAND.licenses.cslb} · Menlo Park, CA
          </p>
        </div>
      </section>
    </>
  );
}
