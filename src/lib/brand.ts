// Central brand constants — change once, propagate everywhere.

export const BRAND = {
  name: 'Servant King Junk Removal & Demolition',
  shortName: 'Servant King',
  tagline: 'Same-Day Junk Removal & Demolition — From Stockton to Palo Alto.',
  subTagline: "Family-owned, faith-rooted crew that treats your home like it's ours.",
  phone: '2099387407',
  phoneFormatted: '(209) 938-7407',
  email: 'info@servantkingdemolition.com',
  emailSecondary: 'servantkingjunkremoval@gmail.com',
  address: {
    street: '149 Commonwealth Drive',
    suite: 'Suite 1172C',
    city: 'Menlo Park',
    state: 'CA',
    zip: '94025',
    country: 'US'
  },
  licenses: {
    cslb: 'CSLB C-21 #1142322',
    cslbId: '1142322',
    tireHauler: 'Certified Tire Hauler'
  },
  // Source of truth is the Menlo Park Google Business Profile, which shows 350+.
  // Keep this at or below the GBP number — an aggregateRating that overstates a
  // verifiable public count is the kind of mismatch that gets rich results pulled.
  reviews: {
    count: 350,
    rating: 5.0
  },
  donationPartners: [
    'Habitat for Humanity',
    'Goodwill',
    'Salvation Army',
    'St. Vincent De Paul',
    'Snowline Hospice'
  ],
  social: {
    facebook: 'https://www.facebook.com/ServantKingJunkRemoval',
    instagram: 'https://www.instagram.com/servantking_'
  },
  // Verified third-party entity profiles. These become schema.org `sameAs` values,
  // which is how answer engines resolve "Servant King" to one real business instead
  // of treating each mention as an unrelated string.
  sameAs: [
    'https://www.facebook.com/ServantKingJunkRemoval',
    'https://www.instagram.com/servantking_',
    'https://www.yelp.com/biz/servant-king-junk-removal-stockton-2',
    'https://nextdoor.com/pages/servant-king-junk-removal-stockton-ca/',
    'https://www.zoominfo.com/c/servant-king-junk-removal/557011151',
    'https://reviews.birdeye.com/servant-king-junk-removal-171744836626249',
    'https://www.servantkingjunkremoval.com',
    'https://www.servantkingdemolition.com'
  ],
  // Canonical host. Every canonical tag, schema @id, sitemap URL and OG url is built
  // from this. servantkingdemolition.com serves the same app and is treated as an
  // alternate that points its equity here.
  siteUrl: 'https://www.servantkingjunkremoval.com',
  alternateSiteUrl: 'https://www.servantkingdemolition.com',
  coordinates: {
    latitude: 37.4814016,
    longitude: -122.174109
  }
} as const;

/**
 * Physical locations. Servant King is a multi-location operator, and answer engines
 * resolve "junk removal near me" through location entities — so each one needs its
 * own LocalBusiness node with its own @id, not a single HQ address doing all the work.
 *
 * `role` distinguishes a customer-facing branch from a yard-only site. Only branches
 * are emitted as LocalBusiness; a 'yard' entry would be emitted as a Place instead,
 * because listing a site with no customer-facing presence as a business location
 * invites a GBP suspension. All four current sites are staffed branches.
 *
 * Addresses and ZIPs are confirmed against each location's Google Business Profile.
 *
 * TODO(Chris): coordinates for the three non-HQ sites are still city centroids, not
 * the actual sites — flagged with `coordinatesArePlaceholder`. A wrong lat/lng hurts
 * local ranking. All four `gbpUrl` values are verified against each profile's own
 * `1s0x0:<cid>` link — the other /maps/place URL on those pages is a shared brand
 * link that is identical across locations and must NOT be used per-location.
 */
export type Location = {
  id: string;
  city: string;
  label: string;
  role: 'branch' | 'yard';
  isPrimary: boolean;
  street?: string;
  suite?: string;
  state: string;
  zip?: string;
  country: string;
  latitude: number;
  longitude: number;
  /** Approximate — replace when the real site coordinates are known. */
  coordinatesArePlaceholder: boolean;
  /**
   * This location's own Google Business Profile, as a stable maps.google.com/?cid=
   * URL. Emitted as `sameAs` on that branch's LocalBusiness node and linked from
   * /locations, so Google and the answer engines can tie the page, the schema and
   * the profile together as one place instead of three unrelated records.
   */
  gbpUrl?: string;
  blurb: string;
  countiesServed: string[];
};

export const LOCATIONS: Location[] = [
  {
    id: 'menlo-park',
    city: 'Menlo Park',
    label: 'Menlo Park (Headquarters)',
    role: 'branch',
    isPrimary: true,
    street: '149 Commonwealth Drive',
    suite: 'Suite 1172C',
    state: 'CA',
    zip: '94025',
    country: 'US',
    gbpUrl: 'https://maps.google.com/?cid=3586641254274458822',
    latitude: 37.4814016,
    longitude: -122.174109,
    coordinatesArePlaceholder: false,
    blurb:
      'Our headquarters and the base for Peninsula work — Menlo Park, Palo Alto, Redwood City, Atherton, Mountain View, and the surrounding San Mateo and Santa Clara County cities.',
    countiesServed: ['San Mateo County', 'Santa Clara County']
  },
  {
    id: 'san-ramon',
    city: 'San Ramon',
    label: 'San Ramon',
    role: 'branch',
    isPrimary: false,
    street: '2010 Crow Canyon Place',
    suite: 'Suite 100',
    state: 'CA',
    zip: '94583',
    country: 'US',
    gbpUrl: 'https://maps.google.com/?cid=8743281642351882757',
    latitude: 37.7799,
    longitude: -121.978,
    coordinatesArePlaceholder: true,
    blurb:
      'Our East Bay base, covering the I-680 corridor — San Ramon, Danville, Alamo, Walnut Creek, Dublin, Pleasanton, Concord, and the rest of Contra Costa and Alameda County.',
    countiesServed: ['Contra Costa County', 'Alameda County']
  },
  {
    id: 'lathrop',
    city: 'Lathrop',
    label: 'Lathrop',
    role: 'branch',
    isPrimary: false,
    street: '3085 Garden Farms Avenue',
    state: 'CA',
    zip: '95330',
    country: 'US',
    gbpUrl: 'https://maps.google.com/?cid=12178289965899810438',
    latitude: 37.8227,
    longitude: -121.2766,
    coordinatesArePlaceholder: true,
    blurb:
      'Our Central Valley base, covering Lathrop, Manteca, Tracy, Stockton, Modesto, Ripon, and the surrounding San Joaquin County communities.',
    countiesServed: ['San Joaquin County', 'Stanislaus County']
  },
  {
    id: 'stockton',
    city: 'Stockton',
    label: 'Stockton',
    role: 'branch',
    isPrimary: false,
    street: '1221 N El Dorado Street',
    state: 'CA',
    zip: '95202',
    country: 'US',
    gbpUrl: 'https://maps.google.com/?cid=10400907704616522833',
    latitude: 37.9577,
    longitude: -121.2908,
    coordinatesArePlaceholder: true,
    blurb:
      'Our Stockton location, with a meeting room and working space for customers and contractors, and the yard the fleet is parked and dispatched from. Covers Stockton, Lodi, Manteca, Tracy, and the surrounding San Joaquin County communities.',
    countiesServed: ['San Joaquin County']
  }
];

export const BRANCH_LOCATIONS = LOCATIONS.filter((l) => l.role === 'branch');
export const PRIMARY_LOCATION = LOCATIONS.find((l) => l.isPrimary) ?? LOCATIONS[0];

export const TRACKING = {
  metaPixelId: '413008923033500'
} as const;

// Tel/SMS helpers
export const telHref = `tel:+1${BRAND.phone}`;
export const smsHref = (body?: string) => {
  const defaultBody = "Hey Chris, I've got a job for Servant King — here's a photo:";
  const encoded = encodeURIComponent(body ?? defaultBody);
  return `sms:+1${BRAND.phone}?&body=${encoded}`;
};
export const mailtoHref = `mailto:${BRAND.email}`;
