/**
 * Safe Meta Pixel event helper.
 *
 * Every call is a no-op unless the visitor has consented and the pixel has
 * actually loaded (see src/components/CookieConsent.tsx). Nothing here loads
 * the pixel or changes the consent posture — it only reports events for
 * visitors who already opted in.
 */

type TrackParams = Record<string, string | number | boolean | undefined>;

export function track(event: string, params?: TrackParams): void {
  if (typeof window === 'undefined') return;
  try {
    if (typeof window.fbq === 'function') {
      window.fbq('track', event, params ?? {});
    }
    // OpenAI Ads pixel: every Meta "Lead" is also a ChatGPT-ads lead_created.
    // The helper is installed by <OpenAIAdsPixel /> and dedupes against the
    // tel:/sms: tap listener so one tap never counts twice.
    if (event === 'Lead' && typeof window.skOaiLead === 'function') {
      window.skOaiLead(String(params?.content_category ?? 'form'));
    }
  } catch {
    /* never let analytics break the page */
  }
}

/**
 * Which line of business a lead belongs to.
 *
 * Both servantkingjunkremoval.com and servantkingdemolition.com serve the same
 * app, so the domain cannot tell the two apart — the service the visitor picked
 * is the only reliable signal. Meta custom conversions filter on this value.
 */
export type LeadCategory = 'junk_removal' | 'demolition' | 'cleanout' | 'other';

export function leadCategory(service: string): LeadCategory {
  switch (service) {
    case 'Junk Removal':
      return 'junk_removal';
    case 'Demolition':
      return 'demolition';
    case 'Estate / Hoarder Cleanout':
      return 'cleanout';
    default:
      return 'other';
  }
}
