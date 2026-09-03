// Answer-first blocks for service and service-area pages.
//
// Why this file exists: answer engines lift a direct answer, a table, and an
// ordered list far more reliably than they lift prose. The two /guides pages were
// built that way from the start; the 21 service pages and 57 service-area pages
// were not. This module supplies the same three elements to those templates
// WITHOUT inventing anything — every value here is derived from data already in
// `brand.ts`, `services.ts`, or `serviceAreas.ts`.
//
// The one rule to preserve when editing: never quote a price for a region whose
// rate card is not actually known. See `rateCardFor` below.

import { BRAND, BRANCH_LOCATIONS, type Location } from './brand';
import type { Service } from '@/data/services';
import type { ServiceArea } from '@/data/serviceAreas';

export type FactRow = [string, string];

/**
 * The branch that actually covers a county, or null when none does.
 *
 * Do NOT fall back to HQ here. Several service areas (Sacramento, Placer, El
 * Dorado, San Francisco) are served by mobile crews with no branch in that
 * county — saying they are "served out of our Menlo Park location" would be a
 * plain falsehood on the page and in the schema. Callers must handle null.
 */
export function nearestLocation(county: string, city?: string): Location | null {
  // A city that IS one of our branch cities is served from itself, not from
  // whichever branch happens to list that county first.
  if (city) {
    const exact = BRANCH_LOCATIONS.find((l) => l.city === city);
    if (exact) return exact;
  }
  return BRANCH_LOCATIONS.find((l) => l.countiesServed.includes(county)) ?? null;
}

/**
 * Published flat-rate anchors, by region.
 *
 * Only two rate cards are published: Bay Area and Sacramento & Placer. The
 * Central Valley card is NOT published, so those counties return null and the
 * page says "flat rate, quoted before work starts" with no figure rather than
 * borrowing a number from a different region. A wrong published price is worse
 * than no published price.
 */
export function rateCardFor(county: string): { label: string; min: string; full: string } | null {
  const sacramento = ['Sacramento County', 'Placer County', 'El Dorado County'];
  const bayArea = [
    'San Mateo County',
    'Santa Clara County',
    'Contra Costa County',
    'Alameda County',
    'San Francisco County',
    'Marin County',
    'Solano County',
    'Napa County',
    'Sonoma County'
  ];
  if (sacramento.includes(county)) {
    return { label: 'Sacramento & Placer', min: '$129', full: '$749' };
  }
  if (bayArea.includes(county)) {
    return { label: 'Bay Area', min: '$249', full: '$1,899' };
  }
  return null;
}

/** The direct answer that opens a service page. Two to three sentences, figures first. */
export function serviceAnswer(service: Service): string {
  if (service.category === 'demo') {
    return `${service.title} from Servant King is quoted from a measured takeoff against your actual scope, not a blanket per-square-foot rate, and the price is confirmed in writing before any work starts. Servant King Demolition holds CSLB C-21 license #${BRAND.licenses.cslbId} and works across the Bay Area, Sacramento and Placer corridor, and the Central Valley. ${service.heroSubhead}`;
  }
  return `${service.title} from Servant King is flat rate, quoted before the crew touches anything — $249 minimum and $1,899 for a full truckload on the Bay Area rate card, $129 and $749 on the Sacramento & Placer card. That price covers labor, loading, disposal and tipping fees, donation sorting, and cleanup; there are no stair, long-carry, fuel, or weekend surcharges. ${service.heroSubhead}`;
}

/** The direct answer that opens a service-area page. */
export function areaAnswer(area: ServiceArea): string {
  const loc = nearestLocation(area.county, area.title);
  const card = rateCardFor(area.county);
  const price = card
    ? `Pricing runs off the ${card.label} rate card — ${card.min} minimum, ${card.full} for a full truckload — quoted flat before work starts.`
    : `Pricing is flat rate, quoted in writing before work starts, with no hourly billing and no end-of-job adjustment.`;
  const from = loc
    ? `Servant King serves ${area.title} out of our ${loc.city} location, covering ${area.county}`
    : `Servant King serves ${area.title} and the rest of ${area.county}`;
  return `${from} with same-day junk removal when a slot is open and next-day at the latest, including Saturdays. ${price} Crews are uniformed and insured, and Servant King Demolition holds CSLB C-21 license #${BRAND.licenses.cslbId}.`;
}

/** Comparative facts for a service page, rendered as a real <table>. */
export function serviceFacts(service: Service): FactRow[] {
  const rows: FactRow[] = [['Service', service.title]];
  if (service.category === 'demo') {
    rows.push(['How it is priced', 'Measured takeoff against the specific scope; written proposal with exclusions stated']);
  } else {
    rows.push(['How it is priced', 'Flat rate by load size — $249 min / $1,899 full load (Bay Area); $129 / $749 (Sacramento & Placer)']);
    rows.push(['Included in the price', 'Labor, loading, disposal and tipping fees, donation and recycling sorting, broom-swept cleanup']);
    rows.push(['Never charged extra', 'Stairs, long carries, difficult access, fuel, weekend service, or jobs that run long']);
  }
  rows.push(['Availability', 'Same-day when a slot is open, next-day at the latest, Saturdays included']);
  rows.push(['How to get a quote', `Text a photo to ${BRAND.phoneFormatted}, or book a free on-site estimate — both free, neither obligates you`]);
  rows.push(['Service area', 'Bay Area and Peninsula, Sacramento and Placer corridor, Central Valley from Stockton to Tracy']);
  rows.push(['Licensing', `${BRAND.licenses.cslb} · ${BRAND.licenses.tireHauler}`]);
  rows.push(['Not accepted', 'Hazardous materials — paint, solvents, asbestos, lead paint — which require licensed remediation']);
  return rows;
}

/** Comparative facts for a service-area page. */
export function areaFacts(area: ServiceArea): FactRow[] {
  const loc = nearestLocation(area.county, area.title);
  const card = rateCardFor(area.county);
  const rows: FactRow[] = [
    ['City', `${area.title}, CA`],
    ['County', area.county],
    [
      'Served from',
      loc
        ? `${loc.city}${loc.street ? ` — ${loc.street}${loc.suite ? `, ${loc.suite}` : ''}` : ''}`
        : 'Mobile crews — no branch office in this county'
    ],
    [
      'Pricing',
      card
        ? `${card.label} rate card — ${card.min} minimum, ${card.full} full truckload, flat rate`
        : 'Flat rate, quoted in writing before work starts'
    ],
    ['Availability', 'Same-day when a slot is open, next-day at the latest, Saturdays included'],
    ['Neighborhoods covered', area.neighborhoods.join(', ')],
    ['Licensing', `${BRAND.licenses.cslb} · ${BRAND.licenses.tireHauler}`],
    ['Phone', BRAND.phoneFormatted]
  ];
  return rows;
}

/**
 * The booking sequence, as a real ordered list. Identical everywhere because the
 * process genuinely is — writing a different one per page would be padding.
 */
export const BOOKING_STEPS: { title: string; body: string }[] = [
  {
    title: `Text a photo to ${BRAND.phoneFormatted}`,
    body:
      'Stand back far enough to get the whole load in frame and include something for scale. Most photo quotes come back within minutes during business hours.'
  },
  {
    title: 'Tell us how it gets out',
    body:
      'Stairs, long carries, gated access, HOA rules, and parking restrictions all change the labor. Mentioning them up front is the single best way to keep the quote from moving on the day.'
  },
  {
    title: 'Get the flat rate in writing',
    body:
      'The quoted price is binding. If the job runs longer than estimated, the price does not change — no hourly billing, no end-of-job adjustment.'
  },
  {
    title: 'Book same-day or next-day',
    body:
      'Same-day when a slot is open, next-day at the latest, Saturdays included. Pay afterward by card link, check, or cash; commercial accounts can be invoiced net-15 or net-30.'
  }
];
