import type { MetadataRoute } from 'next';
import { BRAND } from '@/lib/brand';

// AI answer-engine crawlers. These are explicitly named — not merely covered by the
// `*` rule — for two reasons:
//   1. Some crawlers apply the most specific matching group. An explicit Allow
//      guarantees the intended behaviour if a restrictive `*` rule is ever added.
//   2. It documents the decision, so a future "block the AI bots" change has to be
//      a deliberate edit rather than a side effect.
const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'Google-Extended',
  'Applebot-Extended',
  'Bytespider',
  'meta-externalagent',
  'CCBot',
  'cohere-ai'
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/']
      },
      {
        userAgent: AI_CRAWLERS,
        allow: '/',
        disallow: ['/api/']
      }
    ],
    sitemap: `${BRAND.siteUrl}/sitemap.xml`,
    host: BRAND.siteUrl
  };
}
