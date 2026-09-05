/**
 * Real Google reviews from the Menlo Park profile (365 reviews, 5.0 as of Sep 2026).
 * Excerpted, not edited. Shared by /reviews and the /go landing pages so the
 * quotes stay identical everywhere they appear.
 *
 * Do not add reviews here that are not on the Google Business Profile.
 */

export type GoCategory = 'furniture' | 'cleanouts' | 'yard' | 'general';

export type Review = { name: string; where?: string; quote: string };

/** The lead line used on /go and /reviews — Quo, attributable to paid search. */
export const LEAD_PHONE = '6505025464';
export const LEAD_PHONE_FORMATTED = '(650) 502-5464';
export const leadTelHref = `tel:+1${LEAD_PHONE}`;

/** Public review count on the Menlo Park Google Business Profile. */
export const GOOGLE_REVIEW_COUNT = 365;
export const GOOGLE_RATING = 5.0;

/** One entry per reviewer — the canonical, deduplicated list. */
export const REVIEWS: Review[] = [
  { name: 'Chris M.', where: 'Livermore', quote: 'Showed up the same day, on time, worked fast, and extremely courteous.' },
  { name: 'Nathan T.', quote: 'Super professional, handled with care, got the job done quick, fair quote.' },
  { name: 'Jim L.', where: 'San Francisco', quote: 'Fantastic service — on time and very reasonable price.' },
  { name: 'Jennifer H.', quote: 'We needed help removing junk furniture… They made my life so much less stressful.' },
  { name: 'Domonique M.', where: 'Burlingame', quote: 'He responded that same night and came the next day… His prices are amazing.' },
  { name: 'Debra L.', quote: 'He handled everything with genuine compassion… treating belongings with dignity and respect.' },
  { name: 'Valeria G.', quote: 'Office cleanouts, junk removal, storage… they always leave the space looking great.' },
  { name: 'Gage', where: 'San Jose', quote: 'Excellent and extremely professional — highly recommend them.' }
];

function byName(name: string): Review {
  const r = REVIEWS.find((x) => x.name === name);
  if (!r) throw new Error(`Unknown reviewer: ${name}`);
  return r;
}

/** A second excerpt from Domonique M.'s review, used where the yard angle fits. */
const DOMONIQUE_YARD: Review = {
  ...byName('Domonique M.'),
  quote: 'I had so much junk to remove… I can finally see the side of my house again.'
};

/** Category-matched picks for the /go landing pages. */
export const GO_REVIEWS: Record<GoCategory, Review[]> = {
  general: [byName('Chris M.'), byName('Nathan T.'), byName('Jim L.')],
  furniture: [byName('Jennifer H.'), byName('Domonique M.'), byName('Nathan T.')],
  cleanouts: [byName('Debra L.'), byName('Valeria G.'), byName('Chris M.')],
  yard: [DOMONIQUE_YARD, byName('Gage'), byName('Jim L.')]
};
