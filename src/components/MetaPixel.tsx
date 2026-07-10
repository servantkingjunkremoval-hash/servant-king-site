import Script from 'next/script';
import { TRACKING } from '@/lib/brand';

/**
 * Injects the Meta Pixel base code + PageView event in <head>.
 * Loaded with strategy="afterInteractive" so it doesn't block first paint.
 *
 * Contact event tracking (tel:, sms:, mailto: clicks) is handled in
 * <ContactEventTracker /> which should be rendered at the end of <body>.
 */
export function MetaPixel() {
  const pixelId = TRACKING.metaPixelId;
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      `}</Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

/**
 * Fires fbq('track','Contact') when a visitor clicks a phone, SMS, or email link.
 * Rebinds on route changes (covered by Next.js route events).
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
