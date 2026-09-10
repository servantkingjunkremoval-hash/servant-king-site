import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AnswerPage } from '@/components/AnswerPage';
import { ANSWER_PAGES, answerPageBySlug } from '@/lib/answerPages';
import { BRAND } from '@/lib/brand';

const SITE = BRAND.siteUrl;

export function generateStaticParams() {
  return ANSWER_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = answerPageBySlug(slug);
  if (!page) return {};
  const title = `${page.h1} | ${page.business === 'demo' ? 'Servant King Demolition' : 'Servant King Junk Removal'}`;
  return {
    title,
    description: page.metaDescription,
    alternates: { canonical: `${SITE}/answers/${page.slug}` },
    openGraph: {
      title,
      description: page.metaDescription,
      url: `${SITE}/answers/${page.slug}`,
      images: [`${SITE}${page.hero}`],
      type: 'article'
    }
  };
}

export default async function AnswerRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = answerPageBySlug(slug);
  if (!page) notFound();

  /**
   * FAQPage markup is the whole point of the schema here: it is what lets an
   * answer engine quote these answers and attribute them to Servant King.
   * Server-rendered on purpose — AI crawlers do not run our JavaScript.
   */
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE}/answers/${page.slug}#faq`,
    name: page.h1,
    mainEntity: page.qa.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a.join(' ') }
    }))
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Answers', item: `${SITE}/answers` },
      { '@type': 'ListItem', position: 3, name: page.h1, item: `${SITE}/answers/${page.slug}` }
    ]
  };

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.h1,
    description: page.metaDescription,
    image: `${SITE}${page.hero}`,
    author: { '@type': 'Organization', name: BRAND.name, url: SITE },
    publisher: { '@type': 'Organization', name: BRAND.name, url: SITE },
    mainEntityOfPage: `${SITE}/answers/${page.slug}`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <AnswerPage page={page} />
    </>
  );
}
