import type { MetadataRoute } from 'next';
import { BRAND } from '@/lib/brand';
import { serviceAreas } from '@/data/serviceAreas';
import { services } from '@/data/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BRAND.siteUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BRAND.siteUrl}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BRAND.siteUrl}/service-areas`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BRAND.siteUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BRAND.siteUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 }
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

  return [...staticRoutes, ...serviceRoutes, ...areaRoutes];
}
