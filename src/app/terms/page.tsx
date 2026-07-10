import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND, telHref, mailtoHref } from '@/lib/brand';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service — Servant King Junk Removal & Demolition',
  description:
    'The terms that govern your use of the Servant King Junk Removal & Demolition website and the quotes, estimates, and services we provide.',
  path: '/terms'
});

const LAST_UPDATED = 'July 9, 2026';

export default function TermsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-charcoal py-16 text-cream md:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-charcoal via-purple-darker to-purple-dark" />
        <div className="container-content text-center">
          <p className="eyebrow">Legal</p>
          <h1 className="h1 mt-3 text-white">Terms of Service</h1>
          <p className="lede mt-5 mx-auto max-w-3xl text-cream/85">
            The ground rules for using our website and working with us.
          </p>
          <p className="mt-4 text-[14px] text-cream/70">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-content max-w-narrow space-y-10 text-[17px] leading-relaxed text-charcoal">
          <div>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the {BRAND.name}{' '}
              (&ldquo;{BRAND.shortName},&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;) website and the quotes, estimates, and services we provide. By using
              our website or requesting a quote, you agree to these Terms. If you do not agree, please
              do not use the site.
            </p>
          </div>

          <div>
            <h2 className="h2">Our services</h2>
            <div className="mt-4 space-y-4">
              <p>
                We provide junk removal, demolition, and related cleanout services in the areas we
                serve. Descriptions of our services on this website are for general information and do
                not create a contract. A binding agreement is formed only when we and you confirm the
                specific work, price, and schedule for your job.
              </p>
            </div>
          </div>

          <div>
            <h2 className="h2">Quotes &amp; estimates</h2>
            <div className="mt-4 space-y-4">
              <p>
                Quotes and estimates are based on the information you provide — including photos,
                descriptions, and access details — and on what our crew observes on site. Final
                pricing may change if the actual scope, volume, materials, access, or disposal
                requirements differ from what was described. We will let you know before performing
                work that exceeds an agreed quote whenever possible.
              </p>
            </div>
          </div>

          <div>
            <h2 className="h2">Scheduling &amp; cancellations</h2>
            <div className="mt-4 space-y-4">
              <p>
                We do our best to arrive within scheduled windows, but times are estimates and may be
                affected by traffic, weather, prior jobs, or conditions on site. If you need to
                reschedule or cancel, please contact us as early as you can so we can offer your slot
                to someone else.
              </p>
            </div>
          </div>

          <div>
            <h2 className="h2">Your responsibilities</h2>
            <div className="mt-4 space-y-4">
              <p>
                You agree to provide accurate information about the job and to have the legal right to
                request removal or demolition of the items and structures involved. You are
                responsible for identifying anything you want kept, and for removing valuables and
                personal items you do not want hauled away. Please tell us in advance about hazardous
                materials, as some items cannot be legally hauled and may require special handling.
              </p>
            </div>
          </div>

          <div>
            <h2 className="h2">Payment</h2>
            <div className="mt-4 space-y-4">
              <p>
                Payment is due as agreed at the time of service unless we arrange otherwise in
                writing. If a job requires additional labor, disposal, or materials beyond the agreed
                scope, any added charges will be discussed with you before the extra work is done
                whenever practical.
              </p>
            </div>
          </div>

          <div>
            <h2 className="h2">Licensing &amp; insurance</h2>
            <div className="mt-4 space-y-4">
              <p>
                {BRAND.name} operates under {BRAND.licenses.cslb} and is a {BRAND.licenses.tireHauler}.
                We carry insurance appropriate to the work we perform. Proof of licensing and
                insurance is available on request.
              </p>
            </div>
          </div>

          <div>
            <h2 className="h2">Disclaimers &amp; limitation of liability</h2>
            <div className="mt-4 space-y-4">
              <p>
                Our website is provided &ldquo;as is&rdquo; without warranties of any kind. To the
                fullest extent permitted by law, we are not liable for indirect, incidental, or
                consequential damages arising from your use of the website. Nothing in these Terms
                limits any rights you have under applicable law, or any warranty we expressly provide
                in a written service agreement.
              </p>
            </div>
          </div>

          <div>
            <h2 className="h2">Intellectual property</h2>
            <div className="mt-4 space-y-4">
              <p>
                The content on this website — including text, logos, and images — belongs to{' '}
                {BRAND.name} or is used with permission, and may not be copied or reused without our
                consent.
              </p>
            </div>
          </div>

          <div>
            <h2 className="h2">Governing law</h2>
            <div className="mt-4 space-y-4">
              <p>
                These Terms are governed by the laws of the State of California, without regard to its
                conflict-of-law rules. Any dispute relating to these Terms or our services will be
                handled in the state or federal courts located in California.
              </p>
            </div>
          </div>

          <div>
            <h2 className="h2">Changes to these Terms</h2>
            <div className="mt-4 space-y-4">
              <p>
                We may update these Terms from time to time. When we do, we will revise the
                &ldquo;Last updated&rdquo; date above. Your continued use of the website after changes
                take effect means you accept the updated Terms.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-cream p-8 ring-1 ring-charcoal/5">
            <h2 className="h2">Questions about these Terms?</h2>
            <p className="mt-4">
              We&apos;re happy to explain anything here in plain language. Reach us at:
            </p>
            <ul className="mt-4 space-y-2 font-semibold text-charcoal">
              <li>{BRAND.name}</li>
              <li>
                {BRAND.address.street}, {BRAND.address.suite}, {BRAND.address.city},{' '}
                {BRAND.address.state} {BRAND.address.zip}
              </li>
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
