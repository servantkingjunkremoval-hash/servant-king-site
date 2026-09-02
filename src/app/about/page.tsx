import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND, telHref, smsHref } from '@/lib/brand';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'About Servant King — Family-Owned Junk Removal & Demolition',
  description:
    'Family-owned, faith-rooted junk removal and demolition serving the Bay Area and Central Valley since 2021. CSLB C-21 licensed. 350+ 5-star reviews.',
  path: '/about'
});

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-charcoal py-16 text-cream md:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-charcoal via-purple-darker to-purple-dark" />
        <div className="container-content text-center">
          <p className="eyebrow">About Servant King</p>
          <h1 className="h1 mt-3 text-white">
            Family-Owned Junk Removal &amp; Demolition — Built on Service, Not Shortcuts.
          </h1>
          <p className="lede mt-5 mx-auto max-w-3xl text-cream/85">
            From Stockton to Palo Alto. CSLB C-21 Licensed. 350+ 5-Star Reviews. Same Crew Since Day One.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={telHref} className="btn-gold-filled">Call {BRAND.phoneFormatted}</a>
            <a href={smsHref()} className="btn-gold">Text a Photo</a>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-content grid gap-12 md:grid-cols-5 md:items-start">
          <div className="md:col-span-2">
            <div className="sticky top-28 overflow-hidden rounded-xl bg-warmCream">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/First%20truck%20ever%20with%20my%20daughter.jpg"
                  alt="Chris with the first Servant King truck and his daughter — where it all started"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="md:col-span-3 space-y-10 text-[17px] leading-relaxed text-charcoal">
            <div>
              <h2 className="h2">A crew, a truck, and a simple idea.</h2>
              <div className="mt-5 space-y-4">
                <p>
                  Servant King launched in the middle of the pandemic in 2021 out of Stockton, CA. We didn&apos;t have a fancy business plan. We had a truck, a couple of strong backs, and an idea we wouldn&apos;t compromise on: if we&apos;re going to be in somebody&apos;s home, we&apos;d better treat it like it&apos;s our own.
                </p>
                <p>
                  The name came from that idea. &ldquo;Servant King&rdquo; is how we talk about leadership — it&apos;s the posture a crew leader should take when they&apos;re standing in your garage or on your driveway. Servant first. That&apos;s the whole job description.
                </p>
                <p>
                  We started with junk removal because the region needed it done better. Too many hauling companies were running late, showing up in un-lettered trucks, and pricing by the hour with no ceiling. We made ourselves the opposite: uniformed, on-time, flat-rate, and insured. People noticed, and the referrals started coming in.
                </p>
              </div>
            </div>

            <div>
              <h2 className="h2">From Stockton junk crew to Bay Area demolition partner.</h2>
              <div className="mt-5 space-y-4">
                <p>
                  By 2022 we&apos;d added our CSLB C-21 Demolition Contractor License (#1142322). By 2023 we were taking demo subcontracts from Bay Area GCs and doing certified-payroll public works. By 2024 we&apos;d crossed 300 five-star Google reviews and were serving the full Bay Area corridor — from Atherton and Palo Alto up through Walnut Creek, Danville, and Pleasanton.
                </p>
                <p>
                  We also added our Certified Tire Hauler credential because we saw too many demo jobs and estate cleanouts where tires would get dumped into the landfill. Now we handle tires the right way.
                </p>
                <p>
                  Through all of it, the crew stayed family-owned. Same standard. Same reputation-first posture. We&apos;d rather do one job well and earn a referral than run three jobs fast and cut corners on the third.
                </p>
              </div>
            </div>

            <div>
              <h2 className="h2">What you get when you hire Servant King.</h2>
              <dl className="mt-6 space-y-5">
                {[
                  { term: 'Family-owned crew.', def: "Not a franchise, not a call-center dispatch. When you call, you're talking to someone who's actually going to show up." },
                  { term: 'Flat-rate quotes.', def: 'No hourly surprises. We do free on-site estimates (or a quick remote quote if you text us a photo). The price we quote is the price you pay.' },
                  { term: 'Uniformed and background-checked.', def: "Every member of the crew wears branded Servant King gear. We know you're letting us into your home — we take that seriously." },
                  { term: 'CSLB C-21 licensed and insured.', def: "California State License Board #1142322. Full general liability + workers' comp." },
                  { term: 'Same-day available.', def: "When the slot is open, we'll be in your driveway today. Text 209-938-7407 and we'll tell you honestly whether we can make it work." },
                  { term: 'Our own processing facility.', def: "Every load comes back to our yard first. We sort. We donate what's useful to Habitat for Humanity, Goodwill, Salvation Army, St. Vincent De Paul, and Snowline Hospice. Landfill is the last option, not the first." }
                ].map((item) => (
                  <div key={item.term}>
                    <dt className="font-display text-[20px] font-semibold text-charcoal">{item.term}</dt>
                    <dd className="mt-1 text-charcoal/90">{item.def}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-xl bg-cream p-8 ring-1 ring-charcoal/5">
              <p className="eyebrow">Credentials</p>
              <ul className="mt-3 space-y-2 font-semibold text-charcoal">
                <li>· CSLB C-21 Demolition Contractor License #1142322</li>
                <li>· Certified Tire Hauler (CalRecycle)</li>
                <li>· Fully Insured — General Liability + Workers&apos; Comp</li>
                <li>· DIR-Registered for Public Works Prevailing Wage</li>
                <li>· 350+ Five-Star Google Reviews</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Link href="/contact" className="btn-primary">Get My Free Quote</Link>
              <a href={telHref} className="btn-gold">Call {BRAND.phoneFormatted}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
