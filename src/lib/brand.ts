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
  reviews: {
    count: 320,
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
    instagram: 'https://www.instagram.com/servantkingjunkremoval'
  },
  siteUrl: 'https://www.servantkingdemolition.com',
  coordinates: {
    latitude: 37.4814016,
    longitude: -122.174109
  }
} as const;

export const TRACKING = {
  metaPixelId: '413008923033500',
  snipeyFormId: '711IPzJp8GKJpqaH4sOb',
  snipeyFormBase: 'https://api.leadconnectorhq.com/widget/form'
} as const;

// Tel/SMS helpers
export const telHref = `tel:+1${BRAND.phone}`;
export const smsHref = (body?: string) => {
  const defaultBody = "Hey Chris, I've got a job for Servant King — here's a photo:";
  const encoded = encodeURIComponent(body ?? defaultBody);
  return `sms:+1${BRAND.phone}?&body=${encoded}`;
};
export const mailtoHref = `mailto:${BRAND.email}`;

// Snipey form URL with city/service tracking params
export function snipeyFormUrl(opts?: { city?: string; service?: string }) {
  const city = opts?.city ?? 'home';
  const service = opts?.service ?? 'junk-removal';
  return `${TRACKING.snipeyFormBase}/${TRACKING.snipeyFormId}?source_city=${city}&source_service=${service}`;
}
