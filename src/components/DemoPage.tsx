'use client';

import { useEffect, useMemo, useState } from 'react';
import { track } from '@/lib/track';
import { REVIEWS, GOOGLE_REVIEW_COUNT, type Review } from '@/lib/reviews';
import { TRACKING, SKD } from '@/lib/brand';

/**
 * /demolition — the paid-search landing page for Servant King Demolition.
 *
 * Same pattern as /go (src/components/GoPage.tsx): survey-style tap tiles, one
 * primary call to action, nothing else to click. Differences that matter:
 *   - Brand: Servant King Demolition (SKD) logo + copy; CSLB C-21 is the
 *     demolition license class, so it is said out loud.
 *   - Phone: the SKD Quo lead line (650) 414-3366, not the 650 junk line, so demolition
 *     calls/texts land in their own inbox and are attributable to SKD ads.
 *   - Payload: every event carries business: "Demolition" so the shared Zapier
 *     Catch Hook can route it to the SKD speed-to-lead Zap.
 *
 * /demolition is the generic entry; /demolition/kitchen, /bathroom, /interior,
 * /exterior, /concrete, /contractors pre-select step 1 and swap the headline to
 * match the ad group (message match).
 */

export type DemoCategory = 'general' | 'kitchen' | 'bathroom' | 'interior' | 'exterior' | 'concrete' | 'contractors';

const PHONE = SKD.leadPhone;
const PHONE_FORMATTED = SKD.leadPhoneFormatted;
const WEBHOOK_URL = process.env.NEXT_PUBLIC_GO_WEBHOOK_URL ?? TRACKING.goWebhookUrl;

type Tile = { id: string; label: string; sub?: string; icon: string };

const STEP1: Tile[] = [
  { id: 'kitchen', label: 'Kitchen Demo', sub: 'Cabinets, counters, backsplash, floors', icon: '🍳' },
  { id: 'bathroom', label: 'Bathroom Gut', sub: 'Tile, tub, vanity — to the studs', icon: '🛁' },
  { id: 'interior', label: 'Interior Strip-Out', sub: 'Drywall, flooring, whole rooms', icon: '🏚️' },
  { id: 'exterior', label: 'Deck, Fence, Shed or Pool', sub: 'Torn down and hauled off', icon: '🪚' },
  { id: 'concrete', label: 'Concrete, Patio or Driveway', sub: 'Broken up and removed', icon: '🧱' },
  { id: 'contractors', label: "I'm a Contractor", sub: 'Need a demo sub on a job', icon: '👷' }
];

const STEP2: Tile[] = [
  { id: 'two_weeks', label: 'Next 2 weeks', icon: '⏱️' },
  { id: 'month', label: 'This month', icon: '📅' },
  { id: 'planning', label: 'Planning / getting bids', icon: '📐' },
  { id: 'asap', label: 'ASAP — crew is waiting', icon: '🚨' }
];

const HEADLINES: Record<DemoCategory, { h1: string; sub: string }> = {
  general: {
    h1: 'Remodel Starting? We Do the Demo — and Haul It All Off.',
    sub: 'Licensed C-21 demolition contractor. Tap what’s coming out and call for a real number.'
  },
  kitchen: {
    h1: 'Kitchen Demo, Done in a Day. Debris Gone the Same Day.',
    sub: 'Cabinets, counters, backsplash, flooring — out and hauled off, site swept. Tap what’s coming out.'
  },
  bathroom: {
    h1: 'Bathroom Gut to the Studs — Hauled Off, Ready for Your Contractor.',
    sub: 'Tile, tub, vanity, subfloor if needed. No dumpster on the driveway. Tap what’s coming out.'
  },
  interior: {
    h1: 'Interior Demolition Without the Mess Left Behind.',
    sub: 'Drywall, flooring, framing — protected floors, dust control, broom-clean finish. Tap what’s coming out.'
  },
  exterior: {
    h1: 'Deck, Fence, Shed or Pool? Torn Down and Gone.',
    sub: 'We dismantle, load, and haul every piece. Tap what’s coming out.'
  },
  concrete: {
    h1: 'Concrete, Patio or Driveway Removal — Broken Up and Hauled.',
    sub: 'Slab, footings, walkway — the right equipment for the job. Tap what’s coming out.'
  },
  contractors: {
    h1: 'Need a Demo Sub That Keeps Your Schedule?',
    sub: 'Licensed C-21, insured, COI on request. 2-man crew + dump truck, haul-off included. Tap the scope.'
  }
};

const LABEL: Record<string, string> = Object.fromEntries([...STEP1, ...STEP2].map((t) => [t.id, t.label]));

/** Real Google reviews — same canonical list as /reviews; demolition-relevant picks. */
const DEMO_REVIEWS: Review[] = REVIEWS.filter((r) => ['Chris M.', 'Nathan T.', 'Gage'].includes(r.name));

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

export function DemoPage({
  category = 'general',
  headline
}: {
  category?: DemoCategory;
  headline?: { h1: string; sub: string };
}) {
  const [what, setWhat] = useState<string | null>(category === 'general' ? null : category);
  const [when, setWhen] = useState<string | null>(null);
  const [attr, setAttr] = useState<Attribution | null>(null);
  const copy = headline ?? HEADLINES[category];

  useEffect(() => {
    const a = readAttribution();
    setAttr(a);
    pushEvent('demo_view', { demo_category: category, ...a });
  }, [category]);

  const step: 1 | 2 | 3 = !what ? 1 : !when ? 2 : 3;

  const smsBody = useMemo(() => {
    const w = what ? LABEL[what] : 'a demolition job';
    const t = when ? ` — timing: ${LABEL[when].toLowerCase()}` : '';
    return `Hi Servant King Demolition, I need a quote on ${w.toLowerCase()}${t}. Here are photos:`;
  }, [what, when]);

  const telHref = `tel:+1${PHONE}`;
  const smsHref = `sms:+1${PHONE}?&body=${encodeURIComponent(smsBody)}`;

  function chooseWhat(id: string) {
    setWhat(id);
    pushEvent('demo_step1', { demo_what: id });
  }

  function chooseWhen(id: string) {
    setWhen(id);
    pushEvent('demo_step2', { demo_what: what, demo_when: id });
    postLead(leadPayload('selected', what, id));
  }

  function onContact(kind: 'call' | 'sms') {
    pushEvent(kind === 'call' ? 'demo_call_click' : 'demo_sms_click', { demo_what: what, demo_when: when });
    track('Lead', { content_category: 'demolition', content_name: what ?? category });
    postLead(leadPayload(kind, what, when));
  }

  /**
   * Same key names as the /go payload (the Zap maps against them) plus
   * business: "Demolition" so the shared Catch Hook can route SKD events.
   * No phone is collected here; the caller's number arrives in Quo on the SKD 650-414 line.
   */
  function leadPayload(intent: 'selected' | 'call' | 'sms', w: string | null, t: string | null) {
    return {
      source: 'Google Ads',
      business: 'Demolition',
      intent,
      page: typeof window !== 'undefined' ? window.location.pathname : `/demolition/${category}`,
      category,
      service: w ? `Demolition – ${LABEL[w]}` : 'Demolition',
      volume: t ? LABEL[t] : '',
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      zip: '',
      city: '',
      notes: `${intent} on /demolition`,
      gclid: attr?.gclid ?? '',
      utm_source: attr?.utm_source ?? '',
      utm_medium: attr?.utm_medium ?? '',
      utm_campaign: attr?.utm_campaign ?? '',
      utm_term: attr?.utm_term ?? '',
      utm_content: attr?.utm_content ?? '',
      submitted_at: new Date().toISOString()
    };
  }

  const isPro = what === 'contractors';

  return (
    <div className="demo-page min-h-screen bg-cream text-charcoal">
      {/* Top bar — SKD logo + phone, nothing else to click */}
      <div className="flex items-center justify-between px-5 py-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo-demolition-horizontal.png" alt="Servant King Demolition" className="h-14 w-auto md:h-16" />
        <a href={telHref} onClick={() => onContact('call')} className="text-sm font-semibold text-purple underline-offset-2 hover:underline">
          {PHONE_FORMATTED}
        </a>
      </div>

      <div className="mx-auto w-full max-w-narrow px-5 pb-40 pt-2 md:pb-16 md:pt-8">
        <h1 className="font-display text-3xl font-semibold leading-tight tracking-tightest md:text-5xl">{copy.h1}</h1>
        <p className="mt-3 text-base text-muted md:text-lg">{copy.sub}</p>

        {/* Trust row */}
        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-charcoal/70 md:text-sm">
          <li>Licensed C-21 demolition contractor · CSLB #1142322</li>
          <li>Insured · COI on request</li>
          <li>★★★★★ {GOOGLE_REVIEW_COUNT}+ Google reviews</li>
          <li>Haul-off included</li>
        </ul>
        <p className="mt-3 inline-block rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-charcoal md:text-sm">
          Free on-site estimate · Debris hauled the same day · No dumpster on your driveway
        </p>

        {/* Step 1 */}
        <section className="mt-8" aria-labelledby="demo-step1">
          <h2 id="demo-step1" className="text-sm font-semibold uppercase tracking-wide text-purple">
            1 · What’s coming out?
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
          <section className="mt-8 animate-fade-in" aria-labelledby="demo-step2">
            <h2 id="demo-step2" className="text-sm font-semibold uppercase tracking-wide text-purple">
              2 · When does it need to happen?
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {STEP2.map((t) => {
                const active = when === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => chooseWhen(t.id)}
                    aria-pressed={active}
                    className={`rounded-xl border-2 px-4 py-4 text-center font-semibold transition ${
                      active ? 'border-purple bg-white shadow-md' : 'border-charcoal/10 bg-white hover:border-purple/40'
                    }`}
                  >
                    <span className="block text-xl" aria-hidden="true">{t.icon}</span>
                    <span className="mt-1 block text-sm">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Step 3 — the one CTA */}
        {step === 3 && (
          <section className="mt-10 animate-fade-in" aria-labelledby="demo-step3">
            <h2 id="demo-step3" className="text-sm font-semibold uppercase tracking-wide text-purple">
              3 · Get your number
            </h2>
            <a
              href={telHref}
              onClick={() => onContact('call')}
              className="mt-3 hidden w-full items-center justify-center rounded-xl bg-purple px-6 py-5 text-lg font-bold text-white shadow-lg transition hover:bg-purple-dark md:flex"
            >
              Call for Your Price — {PHONE_FORMATTED}
            </a>
            <a href={smsHref} onClick={() => onContact('sms')} className="mt-3 block text-center text-sm font-medium text-purple underline underline-offset-4">
              or text us photos of the space
            </a>
            <p className="mt-4 text-center text-xs text-muted">
              {isPro ? 'Rate sheet and COI on request. We answer 6am–8pm Mon–Sat.' : 'Real number, no pressure. We answer 6am–8pm Mon–Sat.'}
            </p>
          </section>
        )}

        {/* What it costs — honest anchors from the rate sheet */}
        <section className="mt-10 rounded-xl border border-charcoal/10 bg-white p-5" aria-labelledby="demo-pricing">
          <h2 id="demo-pricing" className="font-display text-lg font-semibold">What demo usually runs</h2>
          <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <li className="flex justify-between gap-3 border-b border-charcoal/10 pb-2"><span>Bathroom gut (to studs)</span><span className="font-semibold">$500 – $850</span></li>
            <li className="flex justify-between gap-3 border-b border-charcoal/10 pb-2"><span>Kitchen demo</span><span className="font-semibold">$750 – $1,500</span></li>
            <li className="flex justify-between gap-3 border-b border-charcoal/10 pb-2"><span>Flooring removal</span><span className="font-semibold">from $3 / sq ft</span></li>
            <li className="flex justify-between gap-3 border-b border-charcoal/10 pb-2"><span>Full crew day (2 + dump truck)</span><span className="font-semibold">$2,500 / day</span></li>
          </ul>
          <p className="mt-3 text-xs text-muted">Haul-off and disposal included in every number. $450 minimum. Firm price after a photo or a quick walk-through.</p>
        </section>

        {/* Reputation — real Google reviews */}
        <section className="mt-8" aria-label="Recent Google reviews">
          <ul className="grid gap-3 sm:grid-cols-3">
            {DEMO_REVIEWS.map((r) => (
              <li key={r.name} className="rounded-xl border border-charcoal/10 bg-white p-4 text-sm">
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
          Servant King Demolition · a DBA of Servant King Services LLC · CSLB C-21 #1142322 · <a href="/privacy" className="underline">Privacy</a>
        </p>
      </div>

      {/* Sticky CTA — always reachable on mobile */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 border-t border-charcoal/10 bg-white p-3 shadow-[0_-2px_12px_rgba(0,0,0,0.08)] md:hidden"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 12px)' }}
      >
        <a
          href={telHref}
          onClick={() => onContact('call')}
          className="flex w-full items-center justify-center rounded-xl bg-purple py-4 text-base font-bold text-white"
        >
          {step === 3 ? `Call for Your Price — ${PHONE_FORMATTED}` : 'Skip the taps — call now'}
        </a>
      </div>
    </div>
  );
}
