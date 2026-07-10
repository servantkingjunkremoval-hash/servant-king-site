import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND, telHref, mailtoHref } from '@/lib/brand';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Accessibility Statement — Servant King Junk Removal & Demolition',
  description:
    'Our commitment to making the Servant King Junk Removal & Demolition website accessible to everyone, our WCAG 2.1 AA target, and how to report an access barrier.',
  path: '/accessibility'
});

const LAST_UPDATED = 'July 9, 2026';

export default function AccessibilityPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-charcoal py-16 text-cream md:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-charcoal via-purple-darker to-purple-dark" />
        <div className="container-content text-center">
          <p className="eyebrow">Legal</p>
          <h1 className="h1 mt-3 text-white">Accessibility Statement</h1>
          <p className="lede mt-5 mx-auto max-w-3xl text-cream/85">
            We want everyone to be able to use our website — including people who rely on
            assistive technology.
          </p>
          <p className="mt-4 text-[14px] text-cream/70">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-content max-w-narrow space-y-10 text-[17px] leading-relaxed text-charcoal">
          <div>
            <p>
              {BRAND.name} is committed to making our website accessible to as many people as
              possible, regardless of ability or technology. We believe every visitor should be
              able to find our services, request a quote, and reach us without barriers.
            </p>
          </div>

          <div>
            <h2 className="h2">Our standard</h2>
            <div className="mt-4 space-y-4">
              <p>
                We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA,
                the standard widely used to measure website accessibility. These guidelines explain
                how to make web content more accessible to people with a wide range of disabilities,
                including visual, auditory, motor, and cognitive differences.
              </p>
            </div>
          </div>

          <div>
            <h2 className="h2">What we do</h2>
            <div className="mt-4 space-y-4">
              <p>
                As we build and maintain the site, we work to use clear heading structure and page
                landmarks, provide text alternatives for meaningful images, maintain sufficient
                color contrast, support keyboard navigation with visible focus, label form fields
                clearly, and use descriptive links. Accessibility is built into our pages rather
                than added on afterward, and we review it as we make changes.
              </p>
            </div>
          </div>

          <div>
            <h2 className="h2">Ongoing effort</h2>
            <div className="mt-4 space-y-4">
              <p>
                Accessibility is an ongoing process, not a one-time fix. Some content — such as
                third-party embeds or newly added material — may not yet fully meet our target. We
                continue to test and improve the site over time and welcome feedback that helps us
                do better.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-cream p-8 ring-1 ring-charcoal/5">
            <h2 className="h2">Report an accessibility barrier</h2>
            <p className="mt-4">
              If you have trouble using any part of our website, or need information in a different
              format, please let us know and we&apos;ll help right away. We also welcome suggestions
              for how we can improve.
            </p>
            <ul className="mt-4 space-y-2 font-semibold text-charcoal">
              <li>{BRAND.name}</li>
              <li>
                <a href={telHref} className="text-purple hover:text-purple-light">
                  {BRAND.phoneFormatted}
                </a>
              </li>
              <li>
                <a href={mailtoHref} className="text-purple hover:text-purple-light">
                  {BRAND.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/contact" className="btn-primary">Get My Free Quote</Link>
            <a href={telHref} className="btn-gold">Call {BRAND.phoneFormatted}</a>
          </div>
        </div>
      </section>
    </>
  );
}
