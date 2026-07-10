import Script from 'next/script';

/**
 * The Meta Pixel base code is NO LONGER loaded here.
 *
 * For CIPA / CCPA compliance the pixel is loaded only AFTER the visitor
 * opts in via <CookieConsent />. See src/components/CookieConsent.tsx.
 *
 * This file now only exports <ContactEventTracker />, which fires a
 * 'Contact' event when a visitor clicks a phone / SMS / email link — but
 * ONLY if the pixel has already been loaded (it checks for window.fbq),
 * so it is safe to render unconditionally.
 */

/**
 * Fires fbq('track','Contact') when a visitor clicks a phone, SMS, or email link.
 * No-op unless the visitor has consented and the pixel has loaded.
 */
export function ContactEventTracker() {
  return (
    <Script id="meta-pixel-contact-tracker" strategy="afterInteractive">{`
      (function() {
        function fire(ctx) {
          try { if (typeof window.fbq === 'function') window.fbq('track', 'Contact', { context: ctx }); } catch (e) {}
        }
        function bind() {
          document.querySelectorAll('a[href^="tel:"]').forEach(function(el) {
            if (el.dataset.skFbqBound) return;
            el.dataset.skFbqBound = '1';
            el.addEventListener('click', function() { fire('phone-click'); });
          });
          document.querySelectorAll('a[href^="sms:"]').forEach(function(el) {
            if (el.dataset.skFbqBound) return;
            el.dataset.skFbqBound = '1';
            el.addEventListener('click', function() { fire('sms-click'); });
          });
          document.querySelectorAll('a[href^="mailto:"]').forEach(function(el) {
            if (el.dataset.skFbqBound) return;
            el.dataset.skFbqBound = '1';
            el.addEventListener('click', function() { fire('email-click'); });
          });
        }
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
          bind();
        } else {
          document.addEventListener('DOMContentLoaded', bind);
        }
        // Rebind on client-side route changes
        var lastHref = location.href;
        setInterval(function() { if (location.href !== lastHref) { lastHref = location.href; setTimeout(bind, 400); } }, 1200);
      })();
    `}</Script>
  );
}
