import type { Metadata } from 'next';
import { BRAND } from './brand';

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
    telephone: `+1-${BRAND.phone.slice(0, 3)}-${BRAND.phone.slice(3, 6)}-${BRAND.phone.slice(6)}`,
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
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${BRAND.address.street} ${BRAND.address.suite}`,
      addressLocality: BRAND.address.city,
      addressRegion: BRAND.address.state,
      postalCode: BRAND.address.zip,
      addressCountry: BRAND.address.country
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BRAND.coordinates.latitude,
      longitude: BRAND.coordinates.longitude
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BRAND.reviews.rating.toString(),
      reviewCount: BRAND.reviews.count.toString()
    },
    serviceType: [
      'Junk Removal',
      'Demolition',
      'Estate Cleanouts',
      'Hot Tub Removal',
      'Construction Debris Hauling',
      'Hoarder Cleanouts',
      'E-Waste Disposal',
      'Tire Hauling'
    ]
  };
}
