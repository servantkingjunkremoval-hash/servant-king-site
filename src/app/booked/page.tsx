'use client';

import { useEffect } from 'react';

/**
 * src/app/booked/page.tsx
 *
 * Thank-you page for the Housecall Pro online-booking redirect.
 * HCP sends the customer here after a successful booking, which is what
 * lets Google Ads count a real booking instead of a click toward one.
 *
 * Conversion action: "Go - Booking Completed" (id 7901991058)
 * Label: AW-499245484/Qs58CJKh-7cdEKzDh-4B
 *
 * The global gtag is already loaded site-wide by GoogleAdsTag.tsx, so this
 * page only fires the event.
 */

const PURPLE = '#4A2A7D';
const GOLD = '#C9A24A';
const CREAM = '#F7F3EA';
const INK = '#2A2A2A';
const PHONE_DISPLAY = '(650) 502-5464';
const PHONE_TEL = '+16505025464';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function BookedPage() {
  useEffect(() => {
    // GoogleAdsTag.tsx loads gtag.js with `async`, so on first paint window.gtag
    // may not exist yet. Poll briefly rather than bailing out, or the conversion
    // silently never fires.
    if (typeof window === 'undefined') return;

    let tries = 0;
    const fire = () => {
      if (typeof window.gtag !== 'function') return false;
      window.gtag('event', 'conversion', {
        send_to: 'AW-499245484/Qs58CJKh-7cdEKzDh-4B',
      });
      return true;
    };

    if (fire()) return;

    const id = window.setInterval(() => {
      tries += 1;
      if (fire() || tries > 40) window.clearInterval(id);
    }, 250);

    return () => window.clearInterval(id);
  }, []);

  return (
    <main style={{ background: CREAM, color: INK }}>
      {/* ---------- Confirmation ---------- */}
      <section style={{ background: PURPLE, color: '#fff', padding: '72px 20px 64px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div
            aria-hidden="true"
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: GOLD,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 28,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 12.5l5.5 5.5L20 7"
                stroke={PURPLE}
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 style={{ fontSize: 'clamp(2.25rem, 6vw, 3.5rem)', lineHeight: 1.08, margin: '0 0 20px' }}>
            You&rsquo;re booked.
          </h1>

          <p style={{ fontSize: 'clamp(1.05rem, 2.4vw, 1.3rem)', lineHeight: 1.55, color: '#E8DFF5', margin: 0 }}>
            Your arrival window is confirmed. A text and an email with the details are on
            their way right now.
          </p>
        </div>
      </section>

      {/* ---------- What happens next ---------- */}
      <section style={{ padding: '64px 20px 8px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.1rem)', margin: '0 0 32px' }}>
            What happens next
          </h2>

          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 20 }}>
            {[
              {
                t: 'We confirm your window',
                d: 'You get a text and email with the date and your two-hour arrival window. Reply to either one if anything changes.',
              },
              {
                t: 'We text when we are on the way',
                d: 'No sitting around waiting all day. You will know when the truck is close.',
              },
              {
                t: 'We look, then give you one flat price',
                d: 'We walk the job with you and hand you a number before anything moves. Labor, loading, dump fees and sweep-up are all in it.',
              },
              {
                t: 'Say yes and it is gone the same visit',
                d: 'No second appointment, no waiting on a quote by email. We load it and leave the space broom-clean.',
              },
            ].map((s, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  gap: 18,
                  background: '#fff',
                  borderRadius: 14,
                  padding: '22px 24px',
                  border: '1px solid #E7DECD',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    flex: '0 0 auto',
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: PURPLE,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                  }}
                >
                  {i + 1}
                </span>
                <span>
                  <strong style={{ display: 'block', fontSize: '1.08rem', marginBottom: 6 }}>{s.t}</strong>
                  <span style={{ color: '#55504A', lineHeight: 1.55 }}>{s.d}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- No-pressure promise ---------- */}
      <section style={{ padding: '36px 20px 8px' }}>
        <div
          style={{
            maxWidth: 760,
            margin: '0 auto',
            borderLeft: '4px solid ' + GOLD,
            padding: '6px 0 6px 22px',
          }}
        >
          <p style={{ fontSize: 'clamp(1.1rem, 2.6vw, 1.35rem)', lineHeight: 1.5, margin: 0, color: PURPLE }}>
            <strong>There is no obligation.</strong> If the price is not right for you, say
            so and we will head to the next job. No charge for coming out, no pressure, no
            hard sell.
          </p>
        </div>
      </section>

      {/* ---------- Guarantees ---------- */}
      <section style={{ padding: '48px 20px 8px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3.4vw, 1.75rem)', margin: '0 0 22px' }}>
            What we stand behind
          </h2>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'grid',
              gap: 14,
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            }}
          >
            {[
              ['Flat price, locked before we load', 'The number we quote is the number you pay. It does not move once the truck is full.'],
              ['Broom-clean, or we come back', 'If the space is not swept and clear when we leave, we return and finish it.'],
              ['Licensed, insured, damage covered', 'CSLB C-21 #1142322. If we damage something, that is on us, in writing.'],
              ['We will say if a dumpster is cheaper', 'For some jobs a container really is the better buy. We would rather tell you.'],
            ].map(([t, d], i) => (
              <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span aria-hidden="true" style={{ color: GOLD, fontSize: '1.2rem', lineHeight: 1.35 }}>
                  &#10003;
                </span>
                <span>
                  <strong style={{ display: 'block', marginBottom: 3 }}>{t}</strong>
                  <span style={{ color: '#55504A', fontSize: '0.96rem', lineHeight: 1.5 }}>{d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Need to change it ---------- */}
      <section style={{ padding: '56px 20px 80px' }}>
        <div
          style={{
            maxWidth: 760,
            margin: '0 auto',
            background: '#fff',
            border: '1px solid #E7DECD',
            borderRadius: 16,
            padding: '32px 28px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: 'clamp(1.3rem, 3.2vw, 1.6rem)', margin: '0 0 10px' }}>
            Need to change something?
          </h2>
          <p style={{ color: '#55504A', margin: '0 0 22px', lineHeight: 1.55 }}>
            Add an item, move the time, or ask a question before we arrive &mdash; just
            call or text.
          </p>
          <a
            href={'tel:' + PHONE_TEL}
            style={{
              display: 'inline-block',
              background: GOLD,
              color: INK,
              fontWeight: 700,
              fontSize: '1.05rem',
              textDecoration: 'none',
              padding: '15px 34px',
              borderRadius: 999,
            }}
          >
            Call or text {PHONE_DISPLAY}
          </a>
        </div>

        <p
          style={{
            maxWidth: 760,
            margin: '28px auto 0',
            textAlign: 'center',
            color: '#7A736A',
            fontSize: '0.88rem',
          }}
        >
          Servant King Junk Removal &middot; CSLB C-21 #1142322 &middot; Serving the SF
          Peninsula, San Jose, Tri-Valley and the Central Valley
        </p>
      </section>
    </main>
  );
}
