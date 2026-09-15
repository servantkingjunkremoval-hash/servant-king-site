import Script from 'next/script';
import { TRACKING } from '@/lib/brand';

declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void;
    /** Report a ChatGPT-ads lead (deduped). Installed by <OpenAIAdsPixel />. */
    skOaiLead?: (context: string) => void;
    /** Report an engaged view — 30s dwell or 50% scroll, once per page. */
    skOaiEngaged?: () => void;
  }
}

/**
 * OpenAI Ads (ChatGPT ads) measurement pixel.
 *
 * Loads the oaiq SDK for data source "Servant King Website Pixel" and reports
 * two things:
 *
 *  1. "Lead - Call or Text Tap" (base event lead_created) when a visitor taps
 *     any tel: or sms: link. It also exposes window.skOaiLead(), which
 *     src/lib/track.ts calls on every Meta "Lead" so quote-form submits count
 *     too. A 1-second dedupe window means one tap is never reported twice even
 *     when both paths fire (the /go and /demolition pages call track('Lead')).
 *
 *  2. "Engaged View" (base event contents_viewed) when a visitor stays 30
 *     seconds OR scrolls past halfway, once per page view. This exists because
 *     lead_created alone is far too rare to train OpenAI's optimizer: through
 *     Sep 14 2026 it had fired zero times across 53 paid clicks, so the
 *     campaigns were bidding blind. contents_viewed is the documented event
 *     for "interactions that happen after the page has loaded" — page_viewed
 *     is for the load itself, which would count bounces as conversions.
 *
 *     IMPORTANT: this is a LEARNING signal, not a lead. It is linked to the
 *     campaigns so OpenAI can see it, but lead_created stays the optimization
 *     goal. Anything reading the dashboard's Conversions column must not read
 *     engaged views as lead volume.
 *
 * Booked jobs ("Job Booked (HCP)", base event order_created) are NOT sent from
 * the browser — Zapier posts them to the Conversions API when a Housecall Pro
 * job is won, so revenue attribution stays server-side.
 *
 * Like GoogleAdsTag this is deliberately not behind <CookieConsent />: paid
 * landing pages hide the banner, so a consent-gated pixel would never fire on
 * the only pages ChatGPT traffic lands on.
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

        // --- Engaged view: 30s dwell OR 50% scroll, whichever lands first. ---
        var engagedSent = false;
        var engagedTimer = null;
        window.skOaiEngaged = function () {
          try {
            if (engagedSent) return;          // once per page view
            engagedSent = true;
            if (engagedTimer) clearTimeout(engagedTimer);
            window.removeEventListener("scroll", onEngagedScroll);
            var path = location.pathname;
            window.oaiq("measure", "contents_viewed", {
              type: "contents",
              contents: [{
                id: path,
                name: path,
                content_type: path.indexOf("/answers/") === 0 ? "answer_page" : "landing_page"
              }]
            });
          } catch (err) { /* never break the page */ }
        };
        function onEngagedScroll() {
          try {
            var d = document.documentElement;
            var max = d.scrollHeight - window.innerHeight;
            if (max > 0 && (window.scrollY / max) >= 0.5) window.skOaiEngaged();
          } catch (err) { /* never break the page */ }
        }
        engagedTimer = setTimeout(window.skOaiEngaged, 30000);
        window.addEventListener("scroll", onEngagedScroll, { passive: true });

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
