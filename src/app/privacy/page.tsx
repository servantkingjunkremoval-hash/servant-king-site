import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND, telHref, mailtoHref } from '@/lib/brand';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy — Servant King Junk Removal & Demolition',
  description:
    'How Servant King Junk Removal & Demolition collects, uses, and protects your information, including cookies, analytics, and your California privacy rights.',
  path: '/privacy'
});

const LAST_UPDATED = 'July 9, 2026';

export default function PrivacyPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-charcoal py-16 text-cream md:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-charcoal via-purple-darker to-purple-dark" />
        <div className="container-content text-center">
          <p className="eyebrow">Legal</p>
          <h1 className="h1 mt-3 text-white">Privacy Policy</h1>
          <p className="lede mt-5 mx-auto max-w-3xl text-cream/85">
            How we collect, use, and protect your information — and the choices you have.
          </p>
          <p className="mt-4 text-[14px] text-cream/70">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-content max-w-narrow space-y-10 text-[17px] leading-relaxed text-charcoal">
          <div>
            <p>
              {BRAND.name} (&ldquo;{BRAND.shortName},&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;) respects your privacy. This policy explains what information we
              collect when you visit our website or contact us, how we use it, and the choices you
              have. By using our website you agree to the practices described here.
            </p>
          </div>

          <div>
            <h2 className="h2">Information we collect</h2>
            <div className="mt-4 space-y-4">
              <p>
                <strong>Information you give us.</strong> When you call, text, email, or submit a
                quote request, we collect the details you provide — such as your name, phone number,
                email address, service address, and a description of the job (including any photos
                you send).
              </p>
              <p>
                <strong>Information collected automatically.</strong> Like most websites, we collect
                limited technical data such as your IP address, browser type, device information, the
                pages you view, and how you arrived at our site. This helps us keep the site working
                and understand how visitors use it.
              </p>
              <p>
                <strong>Cookies and analytics.</strong> With your consent, we use cookies and
                third-party analytics and advertising tools, including the Meta (Facebook) Pixel, to
                measure site traffic and the effectiveness of our advertising. These tools are not
                loaded until you click &ldquo;Accept&rdquo; on our cookie banner. See
                &ldquo;Cookies and your choices&rdquo; below.
              </p>
            </div>
          </div>

          <div>
            <h2 className="h2">How we use your information</h2>
            <div className="mt-4 space-y-4">
              <p>
                We use the information we collect to respond to your inquiries and provide quotes;
                schedule and perform junk removal and demolition services; communicate with you about
                your job; improve our website and services; measure and improve our advertising; and
                comply with our legal obligations. We do not sell your personal information.
              </p>
            </div>
          </div>

          <div>
            <h2 className="h2">Cookies and your choices</h2>
            <div className="mt-4 space-y-4">
              <p>
                When you first visit our site, we show a cookie banner. Analytics and advertising
                cookies — including the Meta Pixel — load only if you click &ldquo;Accept.&rdquo; If
                you click &ldquo;Decline,&rdquo; those tools are not loaded.
              </p>
              <p>
                You can change your choice at any time by clicking{' '}
                <strong>Cookie Preferences</strong> in the footer of any page. You can also block or
                delete cookies through your browser settings.
              </p>
            </div>
          </div>

          <div>
            <h2 className="h2">How we share information</h2>
            <div className="mt-4 space-y-4">
              <p>
                We share information only as needed to run our business: with service providers who
                help us operate our website, communications, scheduling, and advertising — including
                our scheduling and customer-management software (Housecall Pro), which we use to
                schedule jobs and keep track of customer requests, along with analytics and hosting
                providers; when required by law or to protect our rights; and in connection with a
                business transfer. We do not sell your personal information to third parties.
              </p>
            </div>
          </div>

          <div>
            <h2 className="h2">Your California privacy rights</h2>
            <div className="mt-4 space-y-4">
              <p>
                If you are a California resident, the California Consumer Privacy Act (CCPA/CPRA)
                gives you the right to know what personal information we collect and how we use it,
                to request a copy of it, to request deletion, and to opt out of the sale or sharing of
                personal information. We do not sell your personal information. To exercise any of
                these rights, contact us using the details below. We will not discriminate against
                you for exercising your rights.
              </p>
            </div>
          </div>

          <div>
            <h2 className="h2">Data retention &amp; security</h2>
            <div className="mt-4 space-y-4">
              <p>
                We keep personal information only as long as needed to provide our services and meet
                legal, accounting, or reporting requirements. We use reasonable administrative and
                technical measures to protect your information, though no method of transmission over
                the internet is completely secure.
              </p>
            </div>
          </div>

          <div>
            <h2 className="h2">Children&apos;s privacy</h2>
            <div className="mt-4 space-y-4">
              <p>
                Our website is intended for adults. We do not knowingly collect personal information
                from children under 13.
              </p>
            </div>
          </div>

          <div>
            <h2 className="h2">Changes to this policy</h2>
            <div className="mt-4 space-y-4">
              <p>
                We may update this policy from time to time. When we do, we will revise the
                &ldquo;Last updated&rdquo; date above. Material changes will be reflected on this page.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-cream p-8 ring-1 ring-charcoal/5">
            <h2 className="h2">Contact us</h2>
            <p className="mt-4">
              Questions about this policy or your information? Reach us at:
            </p>
            <ul className="mt-4 space-y-2 font-semibold text-charcoal">
              <li>
                {BRAND.name}
              </li>
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
