import Script from 'next/script';
import { TRACKING } from '@/lib/brand';

/**
 * Google Ads conversion tracking.
 *
 * Loads the Google tag (gtag.js) and reports two conversions:
 *   - "Go - Call Click"  when a visitor taps any tel: link
 *   - "Go - Text Click"  when a visitor taps any sms: link
 *
 * One delegated click listener covers every page and survives client-side
 * navigation, so the /go landing pages need no extra wiring.
 *
 * Why this is not behind <CookieConsent />: the /go pages hide the consent
 * banner (one thing to click), so a consent-gated tag would never fire on the
 * only pages paid traffic lands on, and Google Ads would have no conversions to
 * bid toward. The Google tag here does conversion measurement only — no
 * remarketing audiences, no analytics — and Google ignores the event unless the
 * visitor arrived from a Google ad. The Meta Pixel stays opt-in as before.
 */
export function GoogleAdsTag() {
  const id = TRACKING.googleAdsId;
  const { goCallClick, goTextClick } = TRACKING.googleAdsConversions;
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
        (function () {
          var CALL = '${goCallClick}';
          var TEXT = '${goTextClick}';
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
              window.gtag('event', 'conversion', { send_to: isCall ? CALL : TEXT });
            } catch (err) { /* never break the tap */ }
          }, true);
        })();
      `}</Script>
    </>
  );
}
