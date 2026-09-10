import type { Metadata } from 'next';
import Link from 'next/link';
import { ANSWER_PAGES } from '@/lib/answerPages';
import { BRAND } from '@/lib/brand';

const SITE = BRAND.siteUrl;

export const metadata: Metadata = {
  title: 'Straight Answers About Junk Removal & Demolition | Servant King',
  description:
    'Real answers to the questions Bay Area homeowners, executors, agents and contractors actually ask — estate cleanouts, hoarded homes, dumpster costs, demolition permits, asbestos and more.',
  alternates: { canonical: `${SITE}/answers` }
};

/**
 * /answers — the index. Its job is discovery: give crawlers and AI engines one
 * page that links every answer, and give a visitor who landed on one mindset a
 * way into the others.
 */
export default function AnswersIndex() {
  const junk = ANSWER_PAGES.filter((p) => p.business === 'junk');
  const demo = ANSWER_PAGES.filter((p) => p.business === 'demo');

  const listLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Servant King answers',
    itemListElement: ANSWER_PAGES.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.h1,
      url: `${SITE}/answers/${p.slug}`
    }))
  };

  const Group = ({ title, pages }: { title: string; pages: typeof ANSWER_PAGES }) => (
    <section className="mt-10">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">{title}</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {pages.map((p) => (
          <li key={p.slug} className="rounded-xl border border-charcoal/10 bg-white/60 p-5">
            <h3 className="font-display text-lg font-semibold leading-snug text-purple">
              <Link href={`/answers/${p.slug}`} className="underline-offset-2 hover:underline">
                {p.h1}
              </Link>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/75">{p.metaDescription}</p>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listLd) }}
      />
      <div className="min-h-screen bg-cream text-charcoal">
        <header className="flex items-center justify-between px-5 py-4">
          <Link href="/" className="font-display text-lg font-semibold text-purple">
            {BRAND.shortName}
          </Link>
        </header>

        <main className="mx-auto w-full max-w-4xl px-5 pb-16">
          <h1 className="font-display text-3xl font-semibold leading-tight tracking-tightest text-charcoal md:text-4xl">
            Straight answers, before you hire anyone
          </h1>
          <p className="mt-4 max-w-prose text-base text-charcoal/80 md:text-lg">
            These are the questions people actually ask when a parent&rsquo;s house needs emptying, a
            remodel hits a wall, or a container is sitting in the driveway costing money. We answer them
            here in full, including the times the answer is that you don&rsquo;t need us.
          </p>

          <Group title="Junk removal & cleanouts" pages={junk} />
          <Group title="Demolition" pages={demo} />

          <p className="mt-10 text-xs text-muted">
            {BRAND.name} · {BRAND.licenses.cslb} · Serving the SF Peninsula, San Jose and the Tri-Valley.
          </p>
        </main>
      </div>
    </>
  );
}
