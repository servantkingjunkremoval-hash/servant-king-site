import Script from 'next/script';
import { TRACKING, SKD } from '@/lib/brand';

/**
 * Google Ads conversion tracking.
 *
 * Loads the Google tag (gtag.js) and reports three conversions:
 *   - "Go - Website Call (30s)"  Google forwarding number swapped in for ad
 *                                visitors; the call itself is the conversion
 *   - "Go - Call Click"          when a visitor taps any tel: link (secondary)
 *   - "Go - Text Click"          when a visitor taps any sms: link
 *
 * One delegated click listener covers every page and survives client-side
 * navigation, so the /go landing pages need no extra wiring.
 *
 * Servant King Demolition runs on a separate Google Ads account. When
 * SKD.googleAdsId is set, the tag also configures that account and, on
 * /demolition pages, reports taps to the SKD conversion labels (and swaps the
 * SKD (650) 414-3366 number for a forwarding number). Paths outside /demolition keep
 * reporting to the junk-removal account only, so neither account double-counts.
 *
 * Why this is not behind <CookieConsent />: the /go and /demolition pages hide
 * the consent banner (one thing to click), so a consent-gated tag would never
 * fire on the only pages paid traffic lands on, and Google Ads would have no
 * conversions to bid toward. The Google tag here does conversion measurement
 * only — no remarketing audiences, no analytics — and Google ignores the event
 * unless the visitor arrived from a Google ad. The Meta Pixel stays opt-in.
 */
export function GoogleAdsTag() {
  const id = TRACKING.googleAdsId;
  const { goCallClick, goTextClick, goWebsiteCall } = TRACKING.googleAdsConversions;
  const phone = TRACKING.googleAdsPhoneDisplay;
  const skdId = SKD.googleAdsId;
  const skd = SKD.googleAdsConversions;
  if (!id) return null;

  return (
    <>
      <Script
        id="google-ads-tag"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){ window.dataLayer.push(arguments); }
        window.gtag = window.gtag || gtag;
        gtag('js', new Date());
        gtag('config', '${id}', { allow_enhanced_conversions: true });
        var IS_SKD = location.pathname.indexOf('/demolition') === 0;
        var SKD_ID = '${skdId}';
        if (SKD_ID) {
          gtag('config', SKD_ID, { allow_enhanced_conversions: true });
        }
        // Website-call tracking: for ad visitors Google replaces the page's number (text and tel: links)
        // with a forwarding number and reports calls >= 30s as a "Website Call (30s)" conversion.
        if (IS_SKD && SKD_ID && '${skd.websiteCall}') {
          gtag('config', '${skd.websiteCall}', { phone_conversion_number: '${SKD.leadPhoneFormatted}' });
        } else if (!IS_SKD) {
          gtag('config', '${goWebsiteCall}', { phone_conversion_number: '${phone}' });
        }
        (function () {
          var CALL = (IS_SKD && SKD_ID) ? '${skd.callClick}' : '${goCallClick}';
          var TEXT = (IS_SKD && SKD_ID) ? '${skd.textClick}' : '${goTextClick}';
          var last = 0;
          document.addEventListener('click', function (e) {
            try {
              var t = e.target;
              var a = t && t.closest ? t.closest('a[href^="tel:"], a[href^="sms:"]') : null;
              if (!a) return;
              var now = Date.now();
              if (now - last < 1000) return; // one tap, one conversion
              last = now;
              var isCall = (a.getAttribute('href') || '').indexOf('tel:') === 0;
              var sendTo = isCall ? CALL : TEXT;
              if (sendTo) window.gtag('event', 'conversion', { send_to: sendTo });
            } catch (err) { /* never break the tap */ }
          }, true);
        })();
      `}</Script>
    </>
  );
}
