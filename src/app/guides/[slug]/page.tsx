import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { guides, getGuideBySlug, getAllGuideSlugs } from '@/data/guides';
import { BRAND, telHref, smsHref } from '@/lib/brand';
import {
  buildMetadata,
  buildArticleJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd
} from '@/lib/metadata';
import { JsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return buildMetadata({
    title: guide.seoTitle,
    description: guide.metaDescription,
    path: `/guides/${slug}`
  });
}

export default async function GuidePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const path = `/guides/${slug}`;
  const articleJsonLd = buildArticleJsonLd({
    headline: guide.h1,
    description: guide.metaDescription,
    path,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    image: guide.heroImage
  });
  const faqJsonLd = buildFaqPageJsonLd(guide.faqs, `${BRAND.siteUrl}${path}`);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
    { name: guide.title, path }
  ]);

  const otherGuides = guides.filter((g) => g.slug !== slug);

  return (
    <>
      <JsonLd id={`ld-json-guide-article-${slug}`} data={articleJsonLd} />
      <JsonLd id={`ld-json-guide-faq-${slug}`} data={faqJsonLd} />
      <JsonLd id={`ld-json-guide-breadcrumb-${slug}`} data={breadcrumbJsonLd} />

      {/* HERO — H1 only, no competing headings above the answer block */}
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div className="absolute inset-0 -z-10">
          <Image
            src={guide.heroImage}
            alt=""
            fill
            priority
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/90 to-purple-darker/80" />
        </div>
        <div className="container-content relative py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-[13px] font-semibold uppercase tracking-widest text-gold">
            <Link href="/guides" className="hover:text-gold-light">
              Guides
            </Link>
          </nav>
          <h1 className="h1 mt-4 max-w-4xl text-white">{guide.h1}</h1>
        </div>
      </section>

      {/* ANSWER BLOCK — the extractable direct answer, first content after the H1 */}
      <section className="bg-white py-12 md:py-16">
        <div className="container-content max-w-narrow">
          <div className="rounded-xl border-l-4 border-gold bg-cream p-6 md:p-8">
            <p className="eyebrow mb-3">Short Answer</p>
            <p className="text-[18px] font-semibold leading-relaxed text-charcoal md:text-[20px]">
              {guide.answerBlock}
            </p>
          </div>
          <p className="mt-6 text-[14px] text-muted">
            Last updated {guide.dateModified} · {BRAND.licenses.cslb} ·{' '}
            {BRAND.reviews.count}+ five-star reviews
          </p>
        </div>
      </section>

      {/* COMPARISON TABLE — real <table>, scrollable on mobile without breaking the page */}
      <section className="bg-cream py-14 md:py-16">
        <div className="container-content">
          <h2 className="h2">{guide.table.caption}</h2>
          <div className="mt-8 overflow-x-auto rounded-xl bg-white ring-1 ring-charcoal/5">
            <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="bg-charcoal text-cream">
                  {guide.table.columns.map((c) => (
                    <th key={c} scope="col" className="px-5 py-4 font-semibold">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {guide.table.rows.map((row, i) => (
                  <tr
                    key={row[0]}
                    className={i % 2 === 1 ? 'bg-warmCream/40' : undefined}
                  >
                    {row.map((cell, j) => (
                      <td
                        key={`${row[0]}-${j}`}
                        className={`border-t border-charcoal/10 px-5 py-4 align-top text-charcoal ${
                          j === 0 ? 'font-semibold' : ''
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {guide.table.footnote && (
            <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted">
              {guide.table.footnote}
            </p>
          )}
        </div>
      </section>

      {/* STEPS — real <ol>, sequential, one action per item */}
      <section className="bg-white py-14 md:py-20">
        <div className="container-content max-w-narrow">
          <h2 className="h2">{guide.stepsHeading}</h2>
          <p className="lede mt-4 text-charcoal">{guide.stepsIntro}</p>
          <ol className="mt-10 space-y-6">
            {guide.steps.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple font-display text-[18px] font-semibold text-cream"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-[21px] font-semibold leading-snug text-charcoal">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[17px] leading-relaxed text-charcoal">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SUPPORTING SECTIONS — H2 only, no heading-level skips */}
      <section className="bg-cream py-14 md:py-20">
        <div className="container-content max-w-narrow">
          {guide.sections.map((s) => (
            <article key={s.heading} className="mb-12 last:mb-0">
              <h2 className="h2">{s.heading}</h2>
              {s.body.map((p, i) => (
                <p
                  key={`${s.heading}-${i}`}
                  className="mt-4 text-[17px] leading-relaxed text-charcoal"
                >
                  {p}
                </p>
              ))}
            </article>
          ))}
        </div>
      </section>

      {/* FAQ — visible copy matches the FAQPage schema above, word for word */}
      <section className="bg-white py-14 md:py-20">
        <div className="container-content max-w-narrow">
          <h2 className="h2">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-4">
            {guide.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-lg bg-cream p-6 ring-1 ring-charcoal/5 transition open:ring-purple/20"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-[19px] font-semibold text-charcoal">
                  <h3 className="font-display text-[19px] font-semibold">
                    {faq.question}
                  </h3>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-purple transition group-open:rotate-45"
                    aria-hidden="true"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </summary>
                <p className="mt-3 text-[16px] leading-relaxed text-charcoal">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal py-14 text-cream md:py-20">
        <div className="container-content text-center">
          <h2 className="h2 text-white">Want a number for your actual job?</h2>
          <p className="lede mt-5 text-cream/85">
            Text a photo or the scope to {BRAND.phoneFormatted}. Free, binding, no
            obligation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={telHref} className="btn-gold-filled">
              Call {BRAND.phoneFormatted}
            </a>
            <a
              href={smsHref(`Hey Chris, I read the ${guide.title} guide — here's my job:`)}
              className="btn-gold"
            >
              Text a Photo
            </a>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS — exact-match entity anchor text */}
      <section className="bg-cream py-14">
        <div className="container-content max-w-narrow">
          <h2 className="h2">Related Pages</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {guide.relatedLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-lg bg-white px-5 py-4 font-semibold text-charcoal ring-1 ring-charcoal/5 transition hover:text-purple hover:ring-purple/20"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {otherGuides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="block rounded-lg bg-white px-5 py-4 font-semibold text-charcoal ring-1 ring-charcoal/5 transition hover:text-purple hover:ring-purple/20"
                >
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
