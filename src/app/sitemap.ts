import type { MetadataRoute } from 'next';
import { BRAND } from '@/lib/brand';
import { serviceAreas } from '@/data/serviceAreas';
import { services } from '@/data/services';
import { guides } from '@/data/guides';
import { ANSWER_PAGES } from '@/lib/answerPages';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BRAND.siteUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BRAND.siteUrl}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BRAND.siteUrl}/service-areas`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BRAND.siteUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BRAND.siteUrl}/reviews`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BRAND.siteUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BRAND.siteUrl}/guides`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BRAND.siteUrl}/answers`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BRAND.siteUrl}/locations`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BRAND.siteUrl}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BRAND.siteUrl}/how-we-price`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BRAND.siteUrl}/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BRAND.siteUrl}/where-your-stuff-goes`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 }
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BRAND.siteUrl}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  const areaRoutes: MetadataRoute.Sitemap = serviceAreas.map((sa) => ({
    url: `${BRAND.siteUrl}/service-areas/${sa.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  const guideRoutes: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${BRAND.siteUrl}/guides/${g.slug}`,
    lastModified: new Date(g.dateModified),
    changeFrequency: 'monthly',
    priority: 0.9
  }));

  // The mindset answer pages — written to be quotable by answer engines, so
  // they matter more than a typical service page and are weighted accordingly.
  const answerRoutes: MetadataRoute.Sitemap = ANSWER_PAGES.map((p) => ({
    url: `${BRAND.siteUrl}/answers/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9
  }));

  return [...staticRoutes, ...serviceRoutes, ...areaRoutes, ...guideRoutes, ...answerRoutes];
}
