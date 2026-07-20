import Link from 'next/link';
import Image from 'next/image';
import { BRAND, telHref, smsHref } from '@/lib/brand';
import { serviceAreas } from '@/data/serviceAreas';
import { ServicesCarousel } from '@/components/ServicesCarousel';

export default function HomePage() {
  return (
    <>
      {/* =================================================== HERO */}
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[46%] md:block">
          <Image
            src="/images/Our%20first%20truck%20wrap.jpg"
            alt="The Servant King crew in front of the branded junk removal truck"
            fill
            priority
            className="object-cover opacity-100"
            sizes="(min-width: 768px) 46vw, 0px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/35 to-transparent" />
        </div>
        <div className="container-content relative z-10 py-20 md:py-32">
          <div className="max-w-3xl md:max-w-[50%]">
            <p className="eyebrow">FAMILY-OWNED · BAY AREA · CENTRAL VALLEY</p>
            <h1 className="h1 mt-4 text-white">
              Same-Day Junk Removal &amp; Demolition — From Stockton to Palo Alto.
            </h1>
            <p className="lede mt-6 text-cream/90">
              Family-owned, faith-rooted crew that treats your home like it&apos;s ours. Free on-site estimate. No obligation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={telHref} className="btn-primary">
                Call {BRAND.phoneFormatted}
              </a>
              <a href={smsHref()} className="btn-gold">
                Text a Photo of Your Junk
              </a>
              <Link href="/contact" className="text-[15px] font-semibold text-cream/80 underline hover:text-gold">
                Or get a quote online →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================== TRUST ROW */}
      <section className="bg-charcoal-light text-cream">
        <div className="container-content flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-4 text-center text-[13px] font-semibold uppercase tracking-[0.12em] md:text-[14px]">
          <span>{BRAND.licenses.cslb}</span>
          <span className="text-gold">·</span>
          <span>{BRAND.reviews.count}+ ★★★★★ Google Reviews</span>
          <span className="text-gold">·</span>
          <span>Family Owned</span>
          <span className="text-gold">·</span>
          <span>Licensed &amp; Insured</span>
          <span className="text-gold">·</span>
          <span>Same-Day Service</span>
        </div>
      </section>

      {/* =================================================== HOW IT WORKS */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-content">
          <div className="mx-auto max-w-narrow text-center">
            <p className="eyebrow">How It Works</p>
            <h2 className="h2 mt-3">Call. Crew. Clean.</h2>
            <p className="lede muted mt-4 italic">
              Free on-site estimate. No obligation. We show up, we quote flat, we haul it clean.
            </p>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Call or Text Us',
                body: 'Send a photo of what needs to go. We reply with an on-site quote window — usually same-day.'
              },
              {
                step: '2',
                title: 'Our Crew Hauls It',
                body: 'Uniformed, background-checked crew shows up with the truck, dollies, and tarps. We protect floors, landscaping, and neighbors.'
              },
              {
                step: '3',
                title: 'We Sweep Up & Donate',
                body: 'You pay flat rate — no hourly surprises. We sort, donate what we can, recycle what we can. Landfill is last resort.'
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple font-display text-2xl font-semibold text-gold">
                  {item.step}
                </div>
                <h3 className="h3">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-[16px] font-semibold text-charcoal">
            Takes 60 seconds.{' '}
            <a href={smsHref()} className="text-purple underline hover:text-purple-dark">
              Text a photo to {BRAND.phoneFormatted}
            </a>{' '}
            or call.
          </p>
        </div>
      </section>

      {/* =================================================== SERVICES (Junk / Demo) */}
      <section id="services" className="bg-white py-20 md:py-24">
        <div className="container-content">
          <div className="mx-auto max-w-narrow text-center">
            <p className="eyebrow">What We Do</p>
            <h2 className="h2 mt-3">Two Services. One Crew. One Standard.</h2>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {/* Junk Removal card */}
            <div className="flex flex-col rounded-xl bg-cream p-8 ring-1 ring-charcoal/5">
              <h3 className="font-display text-[28px] font-semibold leading-tight">
                Premium Junk Removal for Homes, Estates &amp; Businesses
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-charcoal">
                Servant King handles everything from garage cleanouts and hoarder-safe removals to post-remodel construction debris, hot tubs, e-waste, tires, mattresses, and full estate clearouts. Flat-rate pricing, same-day service.
              </p>
              <ul className="mt-5 space-y-2 text-[15px]">
                {[
                  'Same-day & next-day availability',
                  'Flat-rate quotes — no hourly surprises',
                  'Uniformed, insured, background-checked crew',
                  '320+ 5-star Google reviews'
                ].map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-gold" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/services/junk-removal" className="btn-primary">
                  Learn More
                </Link>
                <Link href="/contact" className="btn-gold">
                  Get Free Quote
                </Link>
              </div>
            </div>

            {/* Demolition card */}
            <div className="flex flex-col rounded-xl bg-charcoal p-8 text-cream ring-1 ring-charcoal/5">
              <h3 className="font-display text-[28px] font-semibold leading-tight text-white">
                Licensed Demolition — Commercial &amp; Residential
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-cream/90">
                CSLB C-21 licensed demolition contractor for interior tear-outs, selective demo, residential tear-downs, ADU prep, and public works. We handle permits, compliance, and site cleanup — you tell us what to take down.
              </p>
              <ul className="mt-5 space-y-2 text-[15px]">
                {[
                  'CSLB C-21 License #1142322',
                  'Commercial & residential — interior & exterior',
                  'Prevailing wage / public works compliant',
                  'Partner-of-choice for multiple Bay Area GCs'
                ].map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-gold" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/services/demolition" className="btn-gold-filled">
                  Learn More
                </Link>
                <Link href="/contact" className="btn-gold">
                  Get Free Demo Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================== SERVICES CAROUSEL (Chris ask) */}
      <ServicesCarousel
        eyebrow="Every Service, Its Own Specialty"
        heading="What We Haul, Remove, and Tear Down"
        subheading="Tap any service to see specifics — pricing, prep, and what to expect."
      />

      {/* =================================================== SOCIAL PROOF */}
      <section className="bg-white py-20 md:py-24">
        <div className="container-content">
          <div className="mx-auto max-w-narrow text-center">
            <p className="eyebrow">Proof of Work</p>
            <h2 className="h2 mt-3">Rated 5 Stars by 320+ Bay Area &amp; Central Valley Families.</h2>
            <p className="lede muted mt-4 italic">
              Every single review is real, verified, and on Google — nothing cherry-picked.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                name: 'Sandra Shirley',
                quote:
                  'Nice guys. Efficient and no problems. I will contact them again if I need them, I\u2019ll tell my friends.',
                location: 'Via Google'
              },
              {
                name: 'Kristina Marchessault',
                quote:
                  'I cannot speak highly enough of this company. Every time we are in need, they have been available to come. Punctual, very flexible and always professional and never leaving anything behind. A+ rating. Definitely recommend to everyone.',
                location: 'Via Google'
              },
              {
                name: 'Angela Iglesias',
                quote: 'Excellent company to work with and very flexible.',
                location: 'Via Google'
              }
            ].map((r) => (
              <figure key={r.name} className="rounded-xl bg-cream p-8 ring-1 ring-charcoal/5">
                <div className="mb-4 flex text-gold" aria-label="Five stars">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5" />
                    </svg>
                  ))}
                </div>
                <blockquote className="font-display text-[18px] italic leading-relaxed text-charcoal">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-6">
                  <div className="font-semibold text-purple">{r.name}</div>
                  <div className="text-[13px] italic text-muted">{r.location}</div>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-12 text-center text-[15px] font-semibold">
            <a href="https://g.co/kgs/servantkingdemolition" className="text-purple underline hover:text-purple-dark">
              Read all 320+ reviews on Google →
            </a>
          </p>
        </div>
      </section>

      {/* =================================================== ECO SECTION */}
      <section className="bg-warmCream py-20 md:py-24">
        <div className="container-content grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">Where Your Stuff Goes</p>
            <h2 className="h2 mt-3">Your Junk Doesn&apos;t Go Straight to the Landfill.</h2>
            <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-charcoal">
              <p>
                Every load we haul comes back to our own processing facility first. We sort. We donate what&apos;s still useful. We recycle what isn&apos;t. Landfill is the last resort — not the first.
              </p>
              <p>
                Our donation partners take the furniture, appliances, housewares, and building materials worth a second life. What can&apos;t be donated gets properly recycled or disposed of. It&apos;s how a junk removal company ought to work — and how we&apos;ve built our reputation with 320+ families.
              </p>
              <p className="italic text-purple">
                Want to know what happened to your items? Ask us for a donation summary — we&apos;ll tell you exactly where everything went.
              </p>
            </div>
          </div>
          <div className="space-y-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white ring-1 ring-charcoal/5">
              <Image
                src="/images/donating%20at%20st.%20vincents%20de%20paul.JPG"
                alt="Servant King crew sorting items for donation"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="rounded-xl bg-white p-8 ring-1 ring-charcoal/5">
              <p className="eyebrow text-purple">Donation Partners</p>
              <ul className="mt-5 grid grid-cols-1 gap-3 text-[15px] font-semibold text-charcoal sm:grid-cols-2">
                {BRAND.donationPartners.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-1 text-gold" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================== ABOUT */}
      <section className="bg-white py-20 md:py-24">
        <div className="container-content grid gap-12 md:grid-cols-5 md:items-center">
          <div className="relative md:col-span-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-warmCream">
              <Image
                src="/images/First%20truck%20ever%20with%20my%20daughter.jpg"
                alt="Servant King crew in front of branded truck"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow">Our Story</p>
            <h2 className="h2 mt-3">Family-Owned. Faith-Rooted. Serving the Bay Area and Central Valley.</h2>
            <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-charcoal">
              <p>
                Servant King started in Stockton during the pandemic as a hauling and junk removal crew. The name came from a simple idea: leadership means service, and a servant-king treats every home like it&apos;s his own.
              </p>
              <p>
                Over the next four years we grew into a licensed CSLB C-21 Demolition Contractor, a Certified Tire Hauler, and a partner of choice for general contractors across the Bay Area. But the idea never changed. Same family-owned crew. Same focus on doing right by the homeowner. Same commitment to earning every one of our 320+ 5-star reviews.
              </p>
              <p>
                If that sounds like the kind of crew you want in your driveway, text us a photo of what needs to go. We&apos;ll take it from there.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Get My Free Quote
              </Link>
              <Link href="/about" className="text-[15px] font-semibold text-purple underline hover:text-purple-dark">
                Read our full story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================== SERVICE AREA GRID */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-content">
          <div className="mx-auto max-w-narrow text-center">
            <p className="eyebrow">Where We Work</p>
            <h2 className="h2 mt-3">We Serve the Bay Area, Placer, and Sacramento.</h2>
            <p className="lede muted mt-4 italic">
              Licensed, insured, and on-time in all 26 cities below. Click your city for local pricing and estate-specific services.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {serviceAreas.map((sa) => (
              <Link
                key={sa.slug}
                href={`/service-areas/${sa.slug}`}
                className="group rounded-lg bg-white p-5 ring-1 ring-charcoal/5 transition hover:shadow-md hover:ring-purple/30"
              >
                <div className="font-display text-[19px] font-semibold leading-tight text-charcoal group-hover:text-purple">
                  {sa.title}
                </div>
                <div className="mt-1 text-[13px] text-muted">{sa.county}</div>
              </Link>
            ))}
          </div>
          <p className="mt-12 text-center text-[15px] font-semibold">
            Don&apos;t see your city?{' '}
            <a href={smsHref()} className="text-gold underline hover:text-gold-dark">
              Text {BRAND.phoneFormatted}
            </a>{' '}
            — we still haul from Sacramento to San Jose for larger jobs.
          </p>
        </div>
      </section>

      {/* =================================================== LEAD MAGNET */}
      <section className="bg-gradient-to-br from-purple to-purple-dark py-20 text-cream md:py-24">
        <div className="container-content grid gap-10 md:grid-cols-5 md:items-center">
          <div className="md:col-span-3">
            <p className="eyebrow">Free Guide</p>
            <h2 className="h2 mt-3 text-white">
              The Bay Area Homeowner&apos;s Declutter &amp; Estate Clean-Out Guide.
            </h2>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-cream/90">
              A 10-page field guide we built from 320+ cleanouts across Palo Alto, Atherton, Walnut Creek, and Folsom. What to keep, what to donate, what to haul, and how to prep for a pro crew — whether that&apos;s us or someone else. Free PDF, no spam.
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="rounded-xl bg-white p-6 text-charcoal shadow-2xl">
              <h3 className="font-display text-[22px] font-semibold">Get the Free Guide</h3>
              <p className="mt-1 text-[13px] text-muted">
                Delivered to your inbox in 60 seconds. Unsubscribe any time.
              </p>
              <form
                action={`mailto:${BRAND.emailSecondary}?subject=Declutter Guide Request`}
                method="POST"
                className="mt-4 space-y-3"
              >
                <input
                  type="text"
                  name="firstName"
                  placeholder="Your first name"
                  required
                  className="w-full rounded-lg border border-charcoal/10 bg-cream px-4 py-3 text-[15px] placeholder:text-muted focus:border-purple focus:outline-none focus:ring-2 focus:ring-purple/20"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-lg border border-charcoal/10 bg-cream px-4 py-3 text-[15px] placeholder:text-muted focus:border-purple focus:outline-none focus:ring-2 focus:ring-purple/20"
                />
                <button type="submit" className="btn-gold-filled w-full">
                  Send Me the Guide →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================== FINAL CTA */}
      <section className="bg-charcoal py-20 text-cream md:py-24">
        <div className="container-content text-center">
          <h2 className="h2 text-white">Ready to work with a crew that treats your home like it&apos;s theirs?</h2>
          <p className="lede mt-5 text-cream/85">
            Text a photo of what needs to go. Call. Fill the form. However you want to reach us — we answer fast.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={telHref} className="btn-gold-filled">
              Call {BRAND.phoneFormatted}
            </a>
            <a href={smsHref()} className="btn-gold">
              Text a Photo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
