'use client';

import { useEffect, useMemo, useState } from 'react';
import { track } from '@/lib/track';

/**
 * /go — the paid-search landing page.
 *
 * One page, one job: turn an ad click into a phone call. Built on the pattern
 * from the Junk-ify playbook (pp. 78–87): survey-style tap tiles instead of a
 * typed form, a single primary call to action, and nothing else to click.
 *
 * Four routes share this component. /go is the generic entry; /go/furniture,
 * /go/cleanouts and /go/yard pre-select step 1 and swap the headline so the
 * page matches the ad group the visitor came from (message match → better
 * conversion, better Quality Score).
 *
 * Phone: this page uses the Quo lead line, not the main business line, so
 * every call and text from paid search lands in the inbox the follow-up
 * automations read and is attributable to Google Ads.
 */

export type GoCategory = 'furniture' | 'cleanouts' | 'yard' | 'general';

const GO_PHONE = '6505025464';
const GO_PHONE_FORMATTED = '(650) 502-5464';
const WEBHOOK_URL = process.env.NEXT_PUBLIC_GO_WEBHOOK_URL ?? '';

type Tile = { id: string; label: string; sub?: string; icon: string };

const STEP1: Tile[] = [
  { id: 'furniture', label: 'Furniture & Appliances', sub: 'Couch, mattress, fridge', icon: '🛋️' },
  { id: 'cleanouts', label: 'Garage or House Cleanout', sub: 'Garage, estate, storage unit', icon: '🏠' },
  { id: 'yard', label: 'Yard & Bulky Items', sub: 'Hot tub, shed, trampoline', icon: '🌳' },
  { id: 'debris', label: 'Construction Debris', sub: 'Drywall, lumber, concrete', icon: '🧱' },
  { id: 'few', label: 'Just a Few Items', sub: 'One trip, quick pickup', icon: '📦' }
];

const STEP2: Tile[] = [
  { id: 'few', label: 'A few items', icon: '▂' },
  { id: 'half', label: 'About half a truck', icon: '▅' },
  { id: 'full', label: 'A full truck', icon: '█' },
  { id: 'multi', label: 'More than one load', icon: '█ █' }
];

const HEADLINES: Record<GoCategory, { h1: string; sub: string }> = {
  general: {
    h1: 'Overwhelmed by Clutter? Reclaim Your Space Today.',
    sub: 'No forms. Tap what you need gone and get a real price in minutes.'
  },
  furniture: {
    h1: 'Old Couch, Mattress, or Fridge? Gone Today.',
    sub: 'We carry it out, load it, and haul it away. Tap what you need gone.'
  },
  cleanouts: {
    h1: 'Garage or Estate Cleanout? Cleared in One Visit.',
    sub: 'We sort, load, donate what we can, and haul the rest. Tap what you need gone.'
  },
  yard: {
    h1: 'Hot Tub, Shed, or Yard Debris in the Way?',
    sub: 'We break it down and haul it off — no dumpster needed. Tap what you need gone.'
  }
};

const LABEL: Record<string, string> = Object.fromEntries(
  [...STEP1, ...STEP2].map((t) => [t.id, t.label])
);

type Attribution = {
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing: string;
  referrer: string;
};

function readAttribution(): Attribution {
  const p = new URLSearchParams(window.location.search);
  const pick = (k: string) => p.get(k) ?? undefined;
  return {
    gclid: pick('gclid'),
    utm_source: pick('utm_source'),
    utm_medium: pick('utm_medium'),
    utm_campaign: pick('utm_campaign'),
    utm_term: pick('utm_term'),
    utm_content: pick('utm_content'),
    landing: window.location.pathname + window.location.search,
    referrer: document.referrer
  };
}

function pushEvent(event: string, data: Record<string, unknown>) {
  try {
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push({ event, ...data });
  } catch {
    /* analytics must never break the page */
  }
}

function postLead(payload: Record<string, unknown>) {
  if (!WEBHOOK_URL) return;
  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon(WEBHOOK_URL, new Blob([body], { type: 'application/json' }));
    } else {
      fetch(WEBHOOK_URL, { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'application/json' } });
    }
  } catch {
    /* fail silent — the call still goes through */
  }
}

type Review = { name: string; where?: string; quote: string };

/** Real Google reviews from the Menlo Park profile (365 reviews, 5.0 as of Sep 2026). Excerpted, not edited. */
const REVIEWS: Record<GoCategory, Review[]> = {
  general: [
    { name: 'Chris M.', where: 'Livermore', quote: 'Showed up the same day, on time, worked fast, and extremely courteous.' },
    { name: 'Nathan T.', quote: 'Super professional, handled with care, got the job done quick, fair quote.' },
    { name: 'Jim L.', where: 'San Francisco', quote: 'Fantastic service — on time and very reasonable price.' }
  ],
  furniture: [
    { name: 'Jennifer H.', quote: 'We needed help removing junk furniture… They made my life so much less stressful.' },
    { name: 'Domonique M.', where: 'Burlingame', quote: 'He responded that same night and came the next day… His prices are amazing.' },
    { name: 'Nathan T.', quote: 'Super professional, handled with care, got the job done quick, fair quote.' }
  ],
  cleanouts: [
    { name: 'Debra L.', quote: 'He handled everything with genuine compassion… treating belongings with dignity and respect.' },
    { name: 'Valeria G.', quote: 'Office cleanouts, junk removal, storage… they always leave the space looking great.' },
    { name: 'Chris M.', where: 'Livermore', quote: 'Showed up the same day, on time, worked fast, and extremely courteous.' }
  ],
  yard: [
    { name: 'Domonique M.', where: 'Burlingame', quote: 'I had so much junk to remove… I can finally see the side of my house again.' },
    { name: 'Gage', where: 'San Jose', quote: 'Excellent and extremely professional — highly recommend them.' },
    { name: 'Jim L.', where: 'San Francisco', quote: 'Fantastic service — on time and very reasonable price.' }
  ]
};

export function GoPage({
  category = 'general',
  headline
}: {
  category?: GoCategory;
  /** Optional headline override for service-specific routes (/go/hot-tub etc.). */
  headline?: { h1: string; sub: string };
}) {
  const [what, setWhat] = useState<string | null>(category === 'general' ? null : category);
  const [size, setSize] = useState<string | null>(null);
  const [attr, setAttr] = useState<Attribution | null>(null);
  const copy = headline ?? HEADLINES[category];
  const reviews = REVIEWS[category];

  useEffect(() => {
    const a = readAttribution();
    setAttr(a);
    pushEvent('go_view', { go_category: category, ...a });
  }, [category]);

  const step: 1 | 2 | 3 = !what ? 1 : !size ? 2 : 3;

  const smsBody = useMemo(() => {
    const w = what ? LABEL[what] : 'some junk';
    const s = size ? ` — ${LABEL[size].toLowerCase()}` : '';
    return `Hi Servant King, I need ${w.toLowerCase()} removed${s}. Here's a photo:`;
  }, [what, size]);

  const telHref = `tel:+1${GO_PHONE}`;
  const smsHref = `sms:+1${GO_PHONE}?&body=${encodeURIComponent(smsBody)}`;

  function chooseWhat(id: string) {
    setWhat(id);
    pushEvent('go_step1', { go_what: id });
  }

  function chooseSize(id: string) {
    setSize(id);
    pushEvent('go_step2', { go_what: what, go_size: id });
    postLead({
      source: 'go_page',
      intent: 'selected',
      category,
      what,
      size: id,
      ...attr,
      ts: new Date().toISOString()
    });
  }

  function onContact(kind: 'call' | 'sms') {
    pushEvent(kind === 'call' ? 'go_call_click' : 'go_sms_click', { go_what: what, go_size: size });
    track('Lead', { content_category: 'go_page', content_name: what ?? category });
    postLead({
      source: 'go_page',
      intent: kind,
      category,
      what,
      size,
      ...attr,
      ts: new Date().toISOString()
    });
  }

  return (
    <div className="go-page min-h-screen bg-cream text-charcoal">
      {/* Top bar — logo mark + phone, nothing else to click */}
      <div className="flex items-center justify-between px-5 py-4">
        <span className="font-display text-lg font-semibold text-purple">Servant King</span>
        <a href={telHref} onClick={() => onContact('call')} className="text-sm font-semibold text-purple underline-offset-2 hover:underline">
          {GO_PHONE_FORMATTED}
        </a>
      </div>

      <div className="mx-auto w-full max-w-narrow px-5 pb-40 pt-2 md:pb-16 md:pt-8">
        <h1 className="font-display text-3xl font-semibold leading-tight tracking-tightest md:text-5xl">{copy.h1}</h1>
        <p className="mt-3 text-base text-muted md:text-lg">{copy.sub}</p>

        {/* Trust row */}
        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-charcoal/70 md:text-sm">
          <li>★★★★★ 360+ Google reviews</li>
          <li>Licensed &amp; insured</li>
          <li>Same-day available</li>
          <li>Free, no-obligation price</li>
        </ul>
        <p className="mt-3 inline-block rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-charcoal md:text-sm">
          New customers: 10% off for life — mention this page when you call.
        </p>

        {/* Step 1 */}
        <section className="mt-8" aria-labelledby="go-step1">
          <h2 id="go-step1" className="text-sm font-semibold uppercase tracking-wide text-purple">
            1 · What do you need gone?
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {STEP1.map((t) => {
              const active = what === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => chooseWhat(t.id)}
                  aria-pressed={active}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-4 text-left transition ${
                    active ? 'border-purple bg-white shadow-md' : 'border-charcoal/10 bg-white hover:border-purple/40'
                  }`}
                >
                  <span className="text-2xl" aria-hidden="true">{t.icon}</span>
                  <span>
                    <span className="block font-semibold">{t.label}</span>
                    {t.sub && <span className="block text-xs text-muted">{t.sub}</span>}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 2 */}
        {step >= 2 && (
          <section className="mt-8 animate-fade-in" aria-labelledby="go-step2">
            <h2 id="go-step2" className="text-sm font-semibold uppercase tracking-wide text-purple">
              2 · How much is there?
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {STEP2.map((t) => {
                const active = size === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => chooseSize(t.id)}
                    aria-pressed={active}
                    className={`rounded-xl border-2 px-4 py-4 text-center font-semibold transition ${
                      active ? 'border-purple bg-white shadow-md' : 'border-charcoal/10 bg-white hover:border-purple/40'
                    }`}
                  >
                    <span className="block text-xl text-purple" aria-hidden="true">{t.icon}</span>
                    <span className="mt-1 block text-sm">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Step 3 — the one CTA. Inline button on desktop; on mobile the sticky bar below is the button. */}
        {step === 3 && (
          <section className="mt-10 animate-fade-in" aria-labelledby="go-step3">
            <h2 id="go-step3" className="text-sm font-semibold uppercase tracking-wide text-purple">
              3 · Get your price
            </h2>
            <a
              href={telHref}
              onClick={() => onContact('call')}
              className="mt-3 hidden w-full items-center justify-center rounded-xl bg-purple px-6 py-5 text-lg font-bold text-white shadow-lg transition hover:bg-purple-dark md:flex"
            >
              Call for Your Price — {GO_PHONE_FORMATTED}
            </a>
            <a href={smsHref} onClick={() => onContact('sms')} className="mt-3 block text-center text-sm font-medium text-purple underline underline-offset-4">
              or text us a photo
            </a>
            <p className="mt-4 text-center text-xs text-muted">Real price, no pressure. We answer 6am–8pm Mon–Sat.</p>
          </section>
        )}

        {/* Reputation — real Google reviews, matched to the category */}
        <section className="mt-10" aria-label="Recent Google reviews">
          <ul className="grid gap-3 sm:grid-cols-3">
            {reviews.map((r) => (
              <li key={r.name + r.quote.slice(0, 12)} className="rounded-xl border border-charcoal/10 bg-white p-4 text-sm">
                <div className="text-gold" aria-label="5 stars">★★★★★</div>
                <p className="mt-1 text-charcoal/85">“{r.quote}”</p>
                <p className="mt-2 text-xs font-semibold text-muted">
                  {r.name}
                  {r.where ? ` · ${r.where}` : ''} · Google
                </p>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-12 text-center text-[11px] text-muted/70">
          Servant King Junk Removal · CSLB C-21 #1142322 · <a href="/privacy" className="underline">Privacy</a>
        </p>
      </div>

      {/* Sticky CTA — always reachable on mobile once they've tapped anything */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 border-t border-charcoal/10 bg-white p-3 shadow-[0_-2px_12px_rgba(0,0,0,0.08)] md:hidden"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 12px)' }}
      >
        <a
          href={telHref}
          onClick={() => onContact('call')}
          className="flex w-full items-center justify-center rounded-xl bg-purple py-4 text-base font-bold text-white"
        >
          {step === 3 ? `Call for Your Price — ${GO_PHONE_FORMATTED}` : 'Skip the taps — call now'}
        </a>
      </div>
    </div>
  );
}
