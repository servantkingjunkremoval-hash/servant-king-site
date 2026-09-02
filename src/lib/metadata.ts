import type { Metadata } from 'next';
import { BRAND, LOCATIONS, BRANCH_LOCATIONS, PRIMARY_LOCATION, type Location } from './brand';

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  openGraphImage?: string;
};

export function buildMetadata({ title, description, path = '/', openGraphImage }: MetadataInput): Metadata {
  const url = `${BRAND.siteUrl}${path}`;
  const ogImage = openGraphImage ?? `${BRAND.siteUrl}/og-default.jpg`;

  return {
    title,
    description,
    metadataBase: new URL(BRAND.siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: BRAND.name,
      type: 'website',
      locale: 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: BRAND.name }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    },
    robots: { index: true, follow: true },
    icons: { icon: '/favicon.ico' }
  };
}

const SERVICE_TYPES = [
  'Junk Removal',
  'Demolition',
  'Estate Cleanouts',
  'Hot Tub Removal',
  'Construction Debris Hauling',
  'Hoarder Cleanouts',
  'E-Waste Disposal',
  'Tire Hauling'
];

const TELEPHONE = `+1-${BRAND.phone.slice(0, 3)}-${BRAND.phone.slice(3, 6)}-${BRAND.phone.slice(6)}`;

function postalAddress(loc: Location) {
  return {
    '@type': 'PostalAddress',
    // streetAddress is omitted where it is genuinely unknown. A PostalAddress with
    // locality/region/country is valid; a fabricated street address is not.
    ...(loc.street && {
      streetAddress: loc.suite ? `${loc.street} ${loc.suite}` : loc.street
    }),
    addressLocality: loc.city,
    addressRegion: loc.state,
    ...(loc.zip && { postalCode: loc.zip }),
    addressCountry: loc.country
  };
}

export function locationId(loc: Location) {
  return `${BRAND.siteUrl}/locations#${loc.id}`;
}

/**
 * One LocalBusiness node per customer-facing branch. Each gets a distinct @id so
 * answer engines treat Menlo Park, San Ramon, and Lathrop as three real places
 * rather than three mentions of one address.
 */
export function buildBranchJsonLd(loc: Location) {
  return {
    '@type': 'LocalBusiness',
    '@id': locationId(loc),
    name: `${BRAND.name} — ${loc.city}`,
    description: loc.blurb,
    url: `${BRAND.siteUrl}/locations`,
    telephone: TELEPHONE,
    email: BRAND.email,
    priceRange: '$$',
    address: postalAddress(loc),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: loc.latitude,
      longitude: loc.longitude
    },
    areaServed: loc.countiesServed.map((c) => ({
      '@type': 'AdministrativeArea',
      name: c
    })),
    parentOrganization: { '@id': `${BRAND.siteUrl}#organization` },
    ...(loc.gbpUrl && { sameAs: [loc.gbpUrl], hasMap: loc.gbpUrl }),
    serviceType: SERVICE_TYPES,
    ...(loc.isPrimary && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: BRAND.reviews.rating.toString(),
        reviewCount: BRAND.reviews.count.toString()
      }
    })
  };
}

/**
 * The parent Organization. aggregateRating lives here and on the primary branch
 * only — repeating one review count across every location reads as inflation.
 */
export function buildOrganizationJsonLd() {
  return {
    '@type': 'Organization',
    '@id': `${BRAND.siteUrl}#organization`,
    name: BRAND.name,
    alternateName: BRAND.shortName,
    description: BRAND.tagline,
    url: BRAND.siteUrl,
    telephone: TELEPHONE,
    email: BRAND.email,
    logo: {
      '@type': 'ImageObject',
      url: `${BRAND.siteUrl}/images/logo-junk-removal-horizontal.png`
    },
    sameAs: [...BRAND.sameAs],
    address: postalAddress(PRIMARY_LOCATION),
    location: BRANCH_LOCATIONS.map((l) => ({ '@id': locationId(l) })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BRAND.reviews.rating.toString(),
      reviewCount: BRAND.reviews.count.toString()
    },
    hasCredential: BRAND.licenses.cslb,
    areaServed: Array.from(
      new Set(BRANCH_LOCATIONS.flatMap((l) => l.countiesServed))
    ).map((c) => ({ '@type': 'AdministrativeArea', name: c }))
  };
}

/**
 * The truck yard, emitted as a Place the fleet operates from rather than a
 * LocalBusiness. Listing a yard as a business location is how businesses get
 * their Google Business Profile suspended.
 */
export function buildYardJsonLd(loc: Location) {
  return {
    '@type': 'Place',
    '@id': locationId(loc),
    name: `${BRAND.shortName} — ${loc.label}`,
    description: loc.blurb,
    address: postalAddress(loc),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: loc.latitude,
      longitude: loc.longitude
    }
  };
}

/**
 * Full entity graph: the Organization plus every location, in one @graph so the
 * relationships between them are explicit rather than inferred.
 */
export function buildEntityGraphJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationJsonLd(),
      ...BRANCH_LOCATIONS.map(buildBranchJsonLd),
      ...LOCATIONS.filter((l) => l.role === 'yard').map(buildYardJsonLd)
    ]
  };
}

/**
 * Page-scoped LocalBusiness for service and service-area pages. Keeps its own @id
 * so it does not collide with the branch nodes, and points back at the parent
 * Organization so the graph stays connected.
 */
export function buildLocalBusinessJsonLd(opts?: { city?: string; county?: string; slug?: string }) {
  const { city, county, slug } = opts ?? {};
  const idUrl = slug ? `${BRAND.siteUrl}/service-areas/${slug}` : BRAND.siteUrl;
  const name = city ? `${BRAND.name} — ${city}` : BRAND.name;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': idUrl,
    name,
    description: BRAND.tagline,
    url: idUrl,
    telephone: TELEPHONE,
    email: BRAND.email,
    priceRange: '$$',
    ...(city && {
      areaServed: {
        '@type': 'City',
        name: city,
        ...(county && {
          containedInPlace: { '@type': 'AdministrativeArea', name: county }
        })
      }
    }),
    address: postalAddress(PRIMARY_LOCATION),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: PRIMARY_LOCATION.latitude,
      longitude: PRIMARY_LOCATION.longitude
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BRAND.reviews.rating.toString(),
      reviewCount: BRAND.reviews.count.toString()
    },
    sameAs: [...BRAND.sameAs],
    parentOrganization: { '@id': `${BRAND.siteUrl}#organization` },
    serviceType: SERVICE_TYPES
  };
}

/**
 * FAQPage schema. Answer engines lift these Q&A pairs directly into generated
 * answers, so every page that already renders question/answer content should
 * also emit this. Answers are plain text — strip any markup before passing in.
 */
export function buildFaqPageJsonLd(
  faqs: { question: string; answer: string }[],
  pageUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    url: pageUrl,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer
      }
    }))
  };
}

/**
 * Article schema for guide pages, with an explicit publisher Organization so the
 * content is attributed to the Servant King entity rather than floating free.
 */
export function buildArticleJsonLd(opts: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}) {
  const url = `${BRAND.siteUrl}${opts.path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: opts.headline,
    description: opts.description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: 'en-US',
    ...(opts.image && { image: [`${BRAND.siteUrl}${opts.image}`] }),
    author: {
      '@type': 'Organization',
      name: BRAND.name,
      url: BRAND.siteUrl,
      sameAs: [...BRAND.sameAs]
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND.name,
      url: BRAND.siteUrl,
      sameAs: [...BRAND.sameAs],
      logo: {
        '@type': 'ImageObject',
        url: `${BRAND.siteUrl}/images/logo-junk-removal-horizontal.png`
      }
    },
    about: [
      { '@type': 'Thing', name: 'Junk Removal' },
      { '@type': 'Thing', name: 'Demolition' }
    ],
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'San Francisco Bay Area, California'
    }
  };
}

/**
 * BreadcrumbList — gives answer engines the site's hierarchy explicitly instead
 * of forcing them to infer it from URL structure.
 */
export function buildBreadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${BRAND.siteUrl}${t.path}`
    }))
  };
}
