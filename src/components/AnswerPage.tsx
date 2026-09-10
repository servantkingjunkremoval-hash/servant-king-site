'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GUARANTEES, type AnswerPage as AnswerPageData } from '@/lib/answerPages';
import { REVIEWS, GOOGLE_REVIEW_COUNT, LEAD_PHONE, LEAD_PHONE_FORMATTED } from '@/lib/reviews';
import { BRAND, SKD, TRACKING } from '@/lib/brand';

/**
 * /answers/[slug] — the mindset landing pages.
 *
 * Structure is deliberate. The hero gives a visitor who is ready to act a
 * number to tap in the first second, but it is sized so the first answer stays
 * on screen: most of this traffic arrives mid-research from an AI answer, and
 * the answer text is also what an AI engine reads when deciding whether to
 * cite us. A hero that fills the viewport hides both.
 *
 * Phone: junk pages use the Quo lead line, demo pages the SKD line, and either
 * swaps to the dedicated CHATGPT line when utm_source=chatgpt — same rule as
 * /go, so calls land in the inbox the follow-up automations read and stay
 * attributable to the campaign that produced them.
 */

type Attribution = {
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing?: string;
  referrer?: string;
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
    /* fail silent — the tap still works */
  }
}

/**
 * Same shape as the /go hook: the payload rides in the query string because a
 * Zapier Catch Hook does not parse a beacon body. No phone number is ever sent
 * — the caller's own number arrives in Quo when they call or text.
 */
function postLead(webhookUrl: string, payload: Record<string, unknown>) {
  if (!webhookUrl) return;
  try {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(payload)) qs.set(k, v == null ? '' : String(v));
    const url = `${webhookUrl}?${qs.toString()}`;
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url);
    } else {
      fetch(url, { method: 'POST', keepalive: true });
    }
  } catch {
    /* fail silent — the call still goes through */
  }
}

export function AnswerPage({ page }: { page: AnswerPageData }) {
  const [attr, setAttr] = useState<Attribution | null>(null);
  const isDemo = page.business === 'demo';

  useEffect(() => {
    const a = readAttribution();
    setAttr(a);
    pushEvent('answer_view', { answer_slug: page.slug, answer_tag: page.tag, ...a });
  }, [page.slug, page.tag]);

  const isChatGPT = (attr?.utm_source ?? '').toLowerCase() === 'chatgpt';
  const basePhone = isDemo ? SKD.leadPhone : LEAD_PHONE;
  const baseFormatted = isDemo ? SKD.leadPhoneFormatted : LEAD_PHONE_FORMATTED;
  const phone = isChatGPT ? TRACKING.chatgptLeadPhone : basePhone;
  const phoneFormatted = isChatGPT ? TRACKING.chatgptLeadPhoneFormatted : baseFormatted;
  const webhookUrl = isDemo ? SKD.webhookUrl : TRACKING.goWebhookUrl;

  const smsBody = isDemo
    ? `Hi Servant King, I need a demolition quote — ${page.nav.toLowerCase()}. Here's a photo:`
    : `Hi Servant King, I need a hand with ${page.nav.toLowerCase()}. Here's a photo:`;

  const telHref = `tel:+1${phone}`;
  const smsHref = `sms:+1${phone}?&body=${encodeURIComponent(smsBody)}`;

  function tap(intent: 'call' | 'sms', where: string) {
    pushEvent(intent === 'call' ? 'answer_call_click' : 'answer_sms_click', {
      answer_slug: page.slug,
      answer_tag: page.tag,
      cta_position: where
    });
    postLead(webhookUrl, {
      intent,
      page: page.slug,
      mindset: page.tag,
      business: page.business,
      cta_position: where,
      ...attr
    });
  }

  const reviews = REVIEWS.slice(0, 3);
  const trust = isDemo
    ? ['C-21 demolition contractor', BRAND.licenses.cslb, 'Licensed & insured', 'C-22 abatement partner']
    : ['Licensed & insured', BRAND.licenses.cslb, `${GOOGLE_REVIEW_COUNT}+ Google reviews`, BRAND.licenses.tireHauler];

  const CallButton = ({ where }: { where: string }) => (
    <a
      href={telHref}
      onClick={() => tap('call', where)}
      className="inline-flex flex-1 items-center justify-center rounded-lg bg-gold px-6 py-3.5 text-center text-base font-bold text-charcoal transition hover:brightness-105"
    >
      Call {phoneFormatted}
    </a>
  );

  const TextButton = ({ where }: { where: string }) => (
    <a
      href={smsHref}
      onClick={() => tap('sms', where)}
      className="inline-flex flex-1 items-center justify-center rounded-lg bg-gold px-6 py-3.5 text-center text-base font-bold text-charcoal transition hover:brightness-105"
    >
      Text a photo
    </a>
  );

  return (
    <div className="answer-page min-h-screen bg-cream text-charcoal">
      <header className="flex items-center justify-between px-5 py-4">
        <Link href="/" className="font-display text-lg font-semibold text-purple">
          {BRAND.shortName}
        </Link>
        <a
          href={telHref}
          onClick={() => tap('call', 'header')}
          className="text-sm font-semibold text-purple underline-offset-2 hover:underline"
        >
          {phoneFormatted}
        </a>
      </header>

      {/* Hero */}
      <section className="bg-purple text-cream">
        <div className="mx-auto grid w-full max-w-5xl gap-8 px-5 py-10 md:grid-cols-[1.15fr_.85fr] md:items-center md:py-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              {isDemo ? SKD.name : 'Servant King Junk Removal'}
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tightest md:text-4xl">
              {page.h1}
            </h1>
            <p className="mt-4 text-base font-semibold text-gold md:text-lg">{page.promise}</p>
            <p className="mt-3 max-w-prose text-base text-cream/80 md:text-lg">{page.dek}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <CallButton where="hero" />
              <TextButton where="hero" />
            </div>
            <p className="mt-3 text-xs text-cream/70">
              Whichever you prefer — call and talk it through, or text a photo and get a real price back.
              No forms either way.
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-cream/70">
              {trust.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="order-first md:order-last">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={page.hero}
              alt={`Servant King crew on a ${page.nav.toLowerCase()} job in the Bay Area`}
              width={1024}
              height={1024}
              className="aspect-square w-full max-w-full rounded-xl object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* The question, in the visitor's words */}
      <section className="border-b border-charcoal/10 bg-cream">
        <div className="mx-auto w-full max-w-3xl px-5 py-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            The question this page answers
          </p>
          <p className="mt-2 border-l-2 border-gold pl-4 text-base italic text-charcoal/80 md:text-lg">
            {page.asked}
          </p>
        </div>
      </section>

      {/* Answers */}
      <section className="mx-auto w-full max-w-3xl px-5">
        {page.qa.map((item, i) => (
          <div key={item.q}>
            <article className="border-b border-charcoal/10 py-7">
              <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-charcoal">
                {item.q}
              </h2>
              {item.a.map((par) => (
                <p key={par.slice(0, 40)} className="mt-3 max-w-prose text-base leading-relaxed text-charcoal/80">
                  {par}
                </p>
              ))}
            </article>

            {i === 1 && (
              <div className="my-7 rounded-xl border border-charcoal/10 border-l-4 border-l-gold bg-white/60 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
                <p className="max-w-prose text-base text-charcoal/80">{page.ctaText}</p>
                <a
                  href={smsHref}
                  onClick={() => tap('sms', 'mid')}
                  className="mt-4 inline-flex shrink-0 items-center justify-center rounded-lg bg-purple px-5 py-3 text-sm font-bold text-cream transition hover:brightness-110 sm:mt-0"
                >
                  Text a photo · {phoneFormatted}
                </a>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Proof */}
      <section className="mx-auto w-full max-w-3xl px-5 py-9">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="text-gold" aria-hidden="true">
            ★★★★★
          </span>
          <span className="text-base font-bold text-charcoal">{GOOGLE_REVIEW_COUNT}+ Google reviews</span>
          <span className="text-xs text-muted">Menlo Park · San Ramon · Lathrop · Stockton</span>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {reviews.map((r) => (
            <blockquote key={r.name} className="border-l-2 border-gold/60 pl-4">
              <p className="text-sm leading-relaxed text-charcoal/80">&ldquo;{r.quote}&rdquo;</p>
              <cite className="mt-2 block text-xs not-italic text-muted">
                {r.name}
                {r.where ? ` · ${r.where}` : ''}
              </cite>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Guarantees */}
      <section className="border-y border-charcoal/10 bg-white/50">
        <div className="mx-auto w-full max-w-3xl px-5 py-9">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">What we guarantee</h2>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2">
            {GUARANTEES.map((g) => (
              <li key={g.title} className="grid grid-cols-[20px_1fr] items-start gap-3">
                <span
                  className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-gold text-[11px] font-black text-charcoal"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span>
                  <b className="block text-sm font-bold text-charcoal">{g.title}</b>
                  <span className="mt-0.5 block text-sm leading-relaxed text-charcoal/75">{g.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Close */}
      <section className="bg-purple text-cream">
        <div className="mx-auto w-full max-w-3xl px-5 py-10">
          <p className="max-w-prose text-lg">
            <strong className="font-semibold">{page.ctaLabel}.</strong>{' '}
            <span className="text-cream/80">Send photos and we come back with a real number, not a range.</span>
          </p>
          <p className="mt-2 text-xs text-cream/70">
            We run four jobs a day, six days a week — Mondays and Saturdays fill first.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CallButton where="footer" />
            <TextButton where="footer" />
          </div>
        </div>
      </section>

      <footer className="mx-auto w-full max-w-3xl px-5 py-8 text-xs text-muted">
        <p>
          {BRAND.name} · {BRAND.licenses.cslb} · Serving the SF Peninsula, San Jose and the Tri-Valley.
        </p>
        <p className="mt-2">
          <Link href="/answers" className="text-purple underline-offset-2 hover:underline">
            More answers
          </Link>{' '}
          ·{' '}
          <Link href="/reviews" className="text-purple underline-offset-2 hover:underline">
            Reviews
          </Link>{' '}
          ·{' '}
          <Link href="/locations" className="text-purple underline-offset-2 hover:underline">
            Locations
          </Link>
        </p>
      </footer>
    </div>
  );
}
