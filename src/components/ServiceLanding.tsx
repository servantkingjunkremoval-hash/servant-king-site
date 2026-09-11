'use client';

import { useEffect, useMemo, useState } from 'react';
import { track } from '@/lib/track';
import { GUARANTEES } from '@/lib/answerPages';
import { REVIEWS, GOOGLE_REVIEW_COUNT, LEAD_PHONE, LEAD_PHONE_FORMATTED, type Review } from '@/lib/reviews';
import { BRAND, TRACKING } from '@/lib/brand';
import type { ServiceLanding as ServiceLandingData } from '@/lib/serviceLandings';

/**
 * /go/<slug> — Google Ads service landings, one per ad group.
 *
 * One page, one thought: the headline repeats what the visitor searched, and
 * everything below answers "can you do exactly this, what will it cost, can I
 * trust you" in that order. There is no navigation and no form — the only
 * things to tap are call, text, and the price sizer (which prefills the text).
 *
 * Phone: always the Quo lead line (650) 502-5464, rendered as plain text so
 * Google's forwarding-number snippet can swap it for ad visitors. The only
 * override is the ChatGPT line, same rule as /go and /answers.
 *
 * Tracking: every sizer tap, call tap and text tap posts to the /go Catch Hook
 * with the same keys GoPage uses (Zap 379128584 → "Go Events" tab), so no Zap
 * change is needed. `page` and `category` carry the slug — that is the ad group.
 */

type Attribution = {
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
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
    utm_content: pick('utm_content')
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

/** Same transport as GoPage: payload in the query string, empty beacon body. */
function postLead(payload: Record<string, unknown>) {
  const url = TRACKING.goWebhookUrl;
  if (!url) return;
  try {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(payload)) qs.set(k, v == null ? '' : String(v));
    const full = `${url}?${qs.toString()}`;
    if (navigator.sendBeacon) navigator.sendBeacon(full);
    else fetch(full, { method: 'POST', keepalive: true });
  } catch {
    /* fail silent — the call still goes through */
  }
}

function reviewsFor(names: string[]): Review[] {
  return names
    .map((n) => REVIEWS.find((r) => r.name === n))
    .filter((r): r is Review => Boolean(r));
}

export function ServiceLanding({ page }: { page: ServiceLandingData }) {
  const [attr, setAttr] = useState<Attribution>({});
  const [size, setSize] = useState<string | null>(null);

  useEffect(() => {
    const a = readAttribution();
    setAttr(a);
    pushEvent('go_view', { go_category: page.slug, ...a });
  }, [page.slug]);

  const isChatGPT = (attr.utm_source ?? '').toLowerCase() === 'chatgpt';
  const phone = isChatGPT ? TRACKING.chatgptLeadPhone : LEAD_PHONE;
  const phoneFormatted = isChatGPT ? TRACKING.chatgptLeadPhoneFormatted : LEAD_PHONE_FORMATTED;
  const tile = page.sizer.find((t) => t.id === size) ?? null;

  const smsBody = useMemo(
    () => (tile ? page.smsBody.replace(/:$/, ` (${tile.label.toLowerCase()}):`) : page.smsBody),
    [tile, page.smsBody]
  );
  const telHref = `tel:+1${phone}`;
  const smsHref = `sms:+1${phone}?&body=${encodeURIComponent(smsBody)}`;

  function payload(intent: 'selected' | 'call' | 'sms', where: string) {
    return {
      source: 'Google Ads',
      intent,
      page: `/go/${page.slug}`,
      category: page.slug,
      service: page.adGroup,
      volume: tile?.label ?? '',
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      zip: '',
      city: '',
      notes: `${intent} on /go/${page.slug} (${where})`,
      gclid: attr.gclid ?? '',
      utm_source: attr.utm_source ?? '',
      utm_medium: attr.utm_medium ?? '',
      utm_campaign: attr.utm_campaign ?? '',
      utm_term: attr.utm_term ?? '',
      utm_content: attr.utm_content ?? '',
      submitted_at: new Date().toISOString()
    };
  }

  function chooseSize(id: string) {
    setSize(id);
    const t = page.sizer.find((x) => x.id === id);
    pushEvent('go_step2', { go_what: page.slug, go_size: id });
    postLead({ ...payload('selected', 'sizer'), volume: t?.label ?? '' });
  }

  function tap(kind: 'call' | 'sms', where: string) {
    pushEvent(kind === 'call' ? 'go_call_click' : 'go_sms_click', {
      go_what: page.slug,
      go_size: size,
      cta_position: where
    });
    track('Lead', { content_category: 'go_service_page', content_name: page.slug });
    postLead(payload(kind, where));
  }

  const reviews = reviewsFor(page.reviews);

  const Buttons = ({ where }: { where: string }) => (
    <div className="flex flex-wrap gap-3">
      <a
        href={telHref}
        onClick={() => tap('call', where)}
        className="inline-flex flex-1 items-center justify-center rounded-lg bg-gold px-6 py-3.5 text-center text-base font-bold text-charcoal transition hover:brightness-105"
      >
        Call {phoneFormatted}
      </a>
      <a
        href={smsHref}
        onClick={() => tap('sms', where)}
        className="inline-flex flex-1 items-center justify-center rounded-lg bg-gold px-6 py-3.5 text-center text-base font-bold text-charcoal transition hover:brightness-105"
      >
        Text a photo
      </a>
    </div>
  );

  return (
    <div className="service-landing min-h-screen bg-cream text-charcoal">
      {/* Top bar — brand and phone, nothing else to click */}
      <div className="flex items-center justify-between px-5 py-4">
        <span className="font-display text-lg font-semibold text-purple">{BRAND.shortName}</span>
        <a
          href={telHref}
          onClick={() => tap('call', 'header')}
          className="text-sm font-semibold text-purple underline-offset-2 hover:underline"
        >
          {phoneFormatted}
        </a>
      </div>

      {/* 1 · Hook: search echo, promise, "so that", CTA, micro-copy, trust */}
      <section className="bg-purple text-cream">
        <div className="mx-auto grid w-full max-w-5xl gap-8 px-5 py-9 md:grid-cols-[1.15fr_.85fr] md:items-center md:py-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">{page.eyebrow}</p>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tightest md:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-4 text-base font-semibold text-gold md:text-lg">{page.promise}</p>
            <p className="mt-3 max-w-prose text-base text-cream/80">{page.soThat}</p>
            <div className="mt-6">
              <Buttons where="hero" />
            </div>
            <p className="mt-3 text-xs text-cream/70">
              No forms. Text a photo of the job and get a real price back, usually in minutes.
            </p>
            <p className="mt-4 inline-block rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-cream">
              New customers: 10% off for life — mention this page when you call.
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-cream/70">
              <li>★★★★★ {GOOGLE_REVIEW_COUNT}+ Google reviews</li>
              <li>Licensed &amp; insured</li>
              <li>{BRAND.licenses.cslb}</li>
              <li>Same-day available</li>
            </ul>
          </div>
          <div className="md:order-last">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={encodeURI(page.hero)}
              alt={`Servant King crew on ${page.nav} in the Bay Area`}
              width={1024}
              height={1024}
              className="aspect-[16/10] w-full max-w-full rounded-xl object-cover md:aspect-square"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* 2 · Pain is the pitch */}
      <section className="mx-auto w-full max-w-3xl px-5 py-9">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Sound familiar?</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {page.pains.map((p) => (
            <li key={p} className="rounded-xl border border-charcoal/10 bg-white p-4 text-base text-charcoal/85">
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-5 border-l-4 border-gold pl-4 text-lg font-semibold text-purple">{page.painTurn}</p>
      </section>

      {/* 3 · Tap-to-price: micro-commitment + price anchor + prefilled text.
           Pages with no published band for their item (sizer: []) get a
           one-photo price card instead of tiles. */}
      <section className="border-y border-charcoal/10 bg-white/60" aria-labelledby="sizer">
        <div className="mx-auto w-full max-w-3xl px-5 py-9">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">What will it cost?</p>
          <h2 id="sizer" className="mt-1 font-display text-2xl font-semibold tracking-tight">
            {page.sizerQuestion}
          </h2>
          {page.sizer.length === 0 ? (
            <div className="mt-5 rounded-xl bg-purple p-5 text-cream">
              <p className="font-display text-3xl font-semibold text-gold">One photo, one flat price</p>
              <p className="mt-2 text-sm text-cream/80">
                Labor, hauling, dump fees and sweep-up included. The number comes back usually in minutes — and it’s
                locked before we start.
              </p>
              <a
                href={smsHref}
                onClick={() => tap('sms', 'sizer')}
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-gold px-5 py-3.5 text-base font-bold text-charcoal sm:w-auto"
              >
                Text a photo for my price
              </a>
            </div>
          ) : (
            <>
              <div
                className={`mt-4 grid grid-cols-2 gap-3 ${
                  page.sizer.length === 2 ? 'sm:grid-cols-2' : page.sizer.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-4'
                }`}
              >
                {page.sizer.map((t) => {
                  const active = size === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => chooseSize(t.id)}
                      aria-pressed={active}
                      className={`rounded-xl border-2 px-3 py-4 text-center transition ${
                        active ? 'border-purple bg-white shadow-md' : 'border-charcoal/10 bg-white hover:border-purple/40'
                      }`}
                    >
                      <span className="block text-sm font-semibold">{t.label}</span>
                    </button>
                  );
                })}
              </div>
              {tile ? (
                <div className="mt-5 animate-fade-in rounded-xl bg-purple p-5 text-cream">
                  <p className="text-sm text-cream/75">{tile.label}</p>
                  <p className="mt-1 font-display text-3xl font-semibold text-gold">{tile.price}</p>
                  <p className="mt-2 text-sm text-cream/80">
                    Labor, loading, dump fees and sweep-up included. Your exact number comes back from a photo — and
                    it’s locked before we load.
                  </p>
                  <a
                    href={smsHref}
                    onClick={() => tap('sms', 'sizer')}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-gold px-5 py-3.5 text-base font-bold text-charcoal sm:w-auto"
                  >
                    Text a photo for my exact price
                  </a>
                </div>
              ) : (
                <p className="mt-4 text-sm text-muted">Tap one — we’ll show you what jobs like it usually cost.</p>
              )}
            </>
          )}
        </div>
      </section>

      {/* 4 · Everything in the flat price (value stack, no invented dollar values) */}
      <section className="mx-auto w-full max-w-3xl px-5 py-9">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Everything in one flat price</h2>
        <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {page.included.map((i) => (
            <li key={i} className="grid grid-cols-[20px_1fr] items-start gap-3 text-base text-charcoal/85">
              <span className="mt-1 grid h-5 w-5 place-items-center rounded-full bg-gold text-[11px] font-black text-charcoal" aria-hidden="true">
                ✓
              </span>
              <span>{i}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-muted">
          With a crew you only pay for the space your load takes. With a container you pay for the half you never fill.
        </p>
      </section>

      {/* 5 · The plan */}
      <section className="bg-warmCream">
        <div className="mx-auto w-full max-w-3xl px-5 py-9">
          <h2 className="font-display text-2xl font-semibold tracking-tight">How it works</h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-3">
            {page.steps.map((s, i) => (
              <li key={s.title} className="rounded-xl bg-white p-5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-purple text-sm font-bold text-cream">{i + 1}</span>
                <b className="mt-3 block text-base font-bold">{s.title}</b>
                <span className="mt-1 block text-sm leading-relaxed text-charcoal/75">{s.detail}</span>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <Buttons where="plan" />
          </div>
        </div>
      </section>

      {/* 6 · Proof */}
      <section className="mx-auto w-full max-w-3xl px-5 py-9">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="text-gold" aria-hidden="true">★★★★★</span>
          <span className="text-base font-bold">{GOOGLE_REVIEW_COUNT}+ Google reviews</span>
          <span className="text-xs text-muted">Menlo Park · San Ramon · Lathrop · Stockton</span>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {reviews.map((r) => (
            <blockquote key={r.name} className="rounded-xl border border-charcoal/10 bg-white p-4">
              <p className="text-sm leading-relaxed text-charcoal/85">&ldquo;{r.quote}&rdquo;</p>
              <cite className="mt-2 block text-xs not-italic text-muted">
                {r.name}
                {r.where ? ` · ${r.where}` : ''} · Google
              </cite>
            </blockquote>
          ))}
        </div>
      </section>

      {/* 7 · Objections */}
      <section className="mx-auto w-full max-w-3xl px-5 pb-4">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Questions people ask first</h2>
        {page.qa.map((item) => (
          <article key={item.q} className="border-b border-charcoal/10 py-5">
            <h3 className="text-lg font-semibold leading-snug">{item.q}</h3>
            <p className="mt-2 max-w-prose text-base leading-relaxed text-charcoal/80">{item.a}</p>
          </article>
        ))}
      </section>

      {/* 8 · Risk reversal */}
      <section className="border-y border-charcoal/10 bg-white/50">
        <div className="mx-auto w-full max-w-3xl px-5 py-9">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">What we guarantee</h2>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2">
            {GUARANTEES.map((g) => (
              <li key={g.title} className="grid grid-cols-[20px_1fr] items-start gap-3">
                <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-gold text-[11px] font-black text-charcoal" aria-hidden="true">
                  ✓
                </span>
                <span>
                  <b className="block text-sm font-bold">{g.title}</b>
                  <span className="mt-0.5 block text-sm leading-relaxed text-charcoal/75">{g.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9 · Close: honest capacity + CTA */}
      <section className="bg-purple text-cream">
        <div className="mx-auto w-full max-w-3xl px-5 pb-32 pt-10 md:pb-12">
          <p className="max-w-prose text-lg">
            <strong className="font-semibold">{page.ctaLabel}.</strong>{' '}
            <span className="text-cream/80">Send a photo and we come back with a real number, not a range.</span>
          </p>
          <p className="mt-2 text-xs text-cream/70">
            We run four jobs a day, six days a week — Mondays and Saturdays fill first.
          </p>
          <div className="mt-6">
            <Buttons where="footer" />
          </div>
          <p className="mt-10 text-[11px] text-cream/60">
            Servant King Junk Removal · {BRAND.licenses.cslb} · Serving the SF Peninsula, San Jose and the Tri-Valley ·{' '}
            <a href="/privacy" className="underline">Privacy</a>
          </p>
        </div>
      </section>

      {/* Sticky mobile bar — the two actions, always reachable */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t border-charcoal/10 bg-white p-3 shadow-[0_-2px_12px_rgba(0,0,0,0.08)] md:hidden"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 12px)' }}
      >
        <a href={telHref} onClick={() => tap('call', 'sticky')} className="flex flex-1 items-center justify-center rounded-xl bg-purple py-3.5 text-base font-bold text-white">
          Call now
        </a>
        <a href={smsHref} onClick={() => tap('sms', 'sticky')} className="flex flex-1 items-center justify-center rounded-xl bg-gold py-3.5 text-base font-bold text-charcoal">
          Text a photo
        </a>
      </div>
    </div>
  );
}
