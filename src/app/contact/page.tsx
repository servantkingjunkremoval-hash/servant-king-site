import type { Metadata } from 'next';
import { BRAND, telHref, smsHref, mailtoHref } from '@/lib/brand';
import { buildMetadata } from '@/lib/metadata';
import { QuoteForm } from '@/components/QuoteForm';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Servant King — Free Quote, Same-Day Service',
  description:
    'Call, text, or fill out the form for a free no-obligation quote. Family-owned junk removal and demolition, same-day service across the Bay Area.',
  path: '/contact'
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-charcoal py-16 text-cream md:py-20">
        <div className="container-content text-center">
          <p className="eyebrow">Contact</p>
          <h1 className="h1 mt-3 text-white">Get Your Free Quote.</h1>
          <p className="lede mt-5 mx-auto max-w-2xl text-cream/85">
            Fastest way: text a photo to {BRAND.phoneFormatted}. We reply with a flat-rate quote within the hour during business hours.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-20">
        <div className="container-content grid gap-12 md:grid-cols-5">
          {/* Contact info */}
          <div className="md:col-span-2">
            <h2 className="h2">Talk to Chris or the Crew</h2>
            <div className="mt-6 space-y-5 text-[16px] text-charcoal">
              <div>
                <div className="font-semibold">Phone</div>
                <a href={telHref} className="text-[22px] font-display font-semibold text-purple hover:text-purple-dark">
                  {BRAND.phoneFormatted}
                </a>
                <div className="text-[13px] text-muted">No phone tree. Real human answers.</div>
              </div>
              <div>
                <div className="font-semibold">Text</div>
                <a href={smsHref()} className="text-[18px] font-semibold text-purple hover:text-purple-dark">
                  {BRAND.phoneFormatted}
                </a>
                <div className="text-[13px] text-muted">Attach a photo for the fastest quote.</div>
              </div>
              <div>
                <div className="font-semibold">Email</div>
                <a href={mailtoHref} className="text-[16px] text-purple hover:text-purple-dark">
                  {BRAND.email}
                </a>
              </div>
              <div>
                <div className="font-semibold">Address</div>
                <div>
                  {BRAND.address.street} {BRAND.address.suite}<br />
                  {BRAND.address.city}, {BRAND.address.state} {BRAND.address.zip}
                </div>
                <div className="text-[13px] text-muted">Serving the Bay Area, Placer &amp; Sacramento.</div>
              </div>
              <div>
                <div className="font-semibold">Credentials</div>
                <div className="text-[15px]">
                  {BRAND.licenses.cslb}<br />
                  {BRAND.licenses.tireHauler}<br />
                  Fully Insured · Background-Checked Crew
                </div>
              </div>
            </div>
          </div>

          {/* Quote form */}
          <div className="md:col-span-3">
            <div className="rounded-xl bg-white p-6 ring-1 ring-charcoal/5 md:p-8">
              <h2 className="font-display text-[26px] font-semibold">Request a Free Quote</h2>
              <p className="mt-2 text-[14px] text-muted">
                Fill it out and send it as a text or email — we&apos;ll reply with a flat-rate quote,
                usually within the hour during business hours.
              </p>
              <div className="mt-6">
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
