import Script from 'next/script';
import { TRACKING } from '@/lib/brand';

declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void;
    /** Report a ChatGPT-ads lead (deduped). Installed by <OpenAIAdsPixel />. */
    skOaiLead?: (context: string) => void;
  }
}

/**
 * OpenAI Ads (ChatGPT ads) measurement pixel.
 *
 * Loads the oaiq SDK for data source "Servant King Website Pixel" and reports
 * the "Lead - Call or Text Tap" conversion (base event lead_created) when a
 * visitor taps any tel: or sms: link. It also exposes window.skOaiLead(), which
 * src/lib/track.ts calls on every Meta "Lead" so quote-form submits count too.
 * A 1-second dedupe window means one tap is never reported twice even when
 * both paths fire (the /go and /demolition pages call track('Lead') on taps).
 *
 * Booked jobs ("Job Booked (HCP)", base event order_created) are NOT sent from
 * the browser — Zapier posts them to the Conversions API when a Housecall Pro
 * job is won, so revenue attribution stays server-side.
 *
 * Like GoogleAdsTag this is deliberately not behind <CookieConsent />: paid
 * landing pages hide the banner, so a consent-gated pixel would never fire on
 * the only pages ChatGPT traffic lands on. It measures conversions only.
 */
export function OpenAIAdsPixel() {
  const pixelId = TRACKING.openaiPixelId;
  if (!pixelId) return null;

  return (
    <Script id="openai-ads-pixel" strategy="afterInteractive">{`
      !function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");
      oaiq("init",{pixelId:"${pixelId}"});
      (function () {
        var last = 0;
        window.skOaiLead = function (context) {
          try {
            var now = Date.now();
            if (now - last < 1000) return; // one tap, one conversion
            last = now;
            window.oaiq("measure", "lead_created", {
              type: "customer_action",
              context: String(context || "unknown"),
              page: location.pathname
            });
          } catch (err) { /* never break the tap */ }
        };
        document.addEventListener("click", function (e) {
          try {
            var t = e.target;
            var a = t && t.closest ? t.closest('a[href^="tel:"], a[href^="sms:"]') : null;
            if (!a) return;
            var isCall = (a.getAttribute("href") || "").indexOf("tel:") === 0;
            window.skOaiLead(isCall ? "call_tap" : "text_tap");
          } catch (err) { /* never break the tap */ }
        }, true);
      })();
    `}</Script>
  );
}
