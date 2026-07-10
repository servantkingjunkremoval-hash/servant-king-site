import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND, telHref, smsHref } from '@/lib/brand';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'How We Price — Flat Rate, No Surprises',
  description:
    'Servant King quotes flat rate based on volume, weight, and labor. No hourly clock. No surprise fees. Free on-site estimates with no obligation.',
  path: '/how-we-price'
});

export default function HowWePricePage() {
  return (
    <>
      <section className="relative bg-charcoal py-16 text-cream md:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-charcoal via-purple-darker to-purple-dark" />
        <div className="container-content text-center">
          <p className="eyebrow">Pricing</p>
          <h1 className="h1 mt-3 text-white">Flat Rate. Free Quotes. No Surprises.</h1>
          <p className="lede mt-5 mx-auto max-w-2xl text-cream/85">
            The price we quote is the price you pay. Period.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={telHref} className="btn-gold-filled">Call {BRAND.phoneFormatted}</a>
            <a href={smsHref()} className="btn-gold">Text a Photo for a Quote</a>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-20">
        <div className="container-content max-w-narrow">
          <h2 className="h2">Why we don&apos;t publish a rate card</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-charcoal">
            Most junk removal pricing online is either misleading (the &ldquo;starting at $99&rdquo; ad that becomes $400 when the truck arrives) or so generic it&apos;s useless (&ldquo;1/8 of a truck = $X&rdquo; without telling you what that means in real-world terms).
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-charcoal">
            We do it differently: <strong>free on-site or photo-based estimate, written quote, flat rate.</strong> What you&apos;re hauling and where you&apos;re hauling from genuinely affects the price, so we look at your job before we quote it. Then the quoted price is binding — even if the job takes longer than we expected.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-content max-w-narrow">
          <h2 className="h2">What affects the price</h2>
          <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-charcoal">
            <div>
              <h3 className="font-display text-[20px] font-semibold">Volume</h3>
              <p className="mt-1">How much truck space your job fills. A single couch is a fraction of a load. A garage cleanout is half to three-quarters. A whole-home cleanout might be 2-3 truck loads.</p>
            </div>
            <div>
              <h3 className="font-display text-[20px] font-semibold">Weight</h3>
              <p className="mt-1">Dirt, concrete, tile, and construction debris are heavy. Furniture and household items are lighter for the same volume. Disposal facilities charge by weight, so we factor it in.</p>
            </div>
            <div>
              <h3 className="font-display text-[20px] font-semibold">Labor and access</h3>
              <p className="mt-1">A driveway pickup is the easiest scenario. A third-floor walk-up in a Bay Area building is more work. Hot tubs that need disassembly take more time than ones that come out whole. We adjust for the job.</p>
            </div>
            <div>
              <h3 className="font-display text-[20px] font-semibold">Special items</h3>
              <p className="mt-1">Items with special disposal rules (refrigerators with refrigerant, mattresses under California recycling law, tires, e-waste, hazardous household waste) may have small line-item adjustments. These are still flat-rate — just disclosed up front.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warmCream py-16 md:py-20">
        <div className="container-content max-w-narrow">
          <h2 className="h2">What&apos;s always included</h2>
          <ul className="mt-6 space-y-3 text-[17px] leading-relaxed text-charcoal">
            <li className="flex gap-3"><span className="text-gold font-bold">✓</span><span><strong>Labor.</strong> Two-person crew minimum, more for bigger jobs.</span></li>
            <li className="flex gap-3"><span className="text-gold font-bold">✓</span><span><strong>Truck and equipment.</strong> Dollies, hand-trucks, tarps, lift gate.</span></li>
            <li className="flex gap-3"><span className="text-gold font-bold">✓</span><span><strong>Dump fees and disposal.</strong> All landfill, recycling, and donation handling.</span></li>
            <li className="flex gap-3"><span className="text-gold font-bold">✓</span><span><strong>Sweep-out.</strong> Your space is cleaner than we found it.</span></li>
            <li className="flex gap-3"><span className="text-gold font-bold">✓</span><span><strong>Receipts.</strong> Written invoice and (where applicable) donation summary.</span></li>
            <li className="flex gap-3"><span className="text-gold font-bold">✓</span><span><strong>Insurance coverage.</strong> Full general liability + workers&apos; comp.</span></li>
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-content max-w-narrow">
          <h2 className="h2">What&apos;s never charged</h2>
          <ul className="mt-6 space-y-3 text-[17px] leading-relaxed text-charcoal">
            <li className="flex gap-3"><span className="text-purple font-bold">✕</span><span><strong>Hourly billing.</strong> If the job takes us longer than expected, that&apos;s our problem, not yours.</span></li>
            <li className="flex gap-3"><span className="text-purple font-bold">✕</span><span><strong>Estimate fees.</strong> Free on-site quotes, no obligation. Always.</span></li>
            <li className="flex gap-3"><span className="text-purple font-bold">✕</span><span><strong>Trip charges.</strong> Same flat rate whether we&apos;re in Stockton or Palo Alto.</span></li>
            <li className="flex gap-3"><span className="text-purple font-bold">✕</span><span><strong>Cancellation fees.</strong> Plans change. We get it.</span></li>
            <li className="flex gap-3"><span className="text-purple font-bold">✕</span><span><strong>Surprise fees at completion.</strong> The quote is binding.</span></li>
          </ul>
        </div>
      </section>

      <section className="bg-charcoal py-16 text-cream md:py-20">
        <div className="container-content text-center">
          <h2 className="h2 text-white">Get your quote in under an hour.</h2>
          <p className="lede mt-5 text-cream/85">
            Text a photo to {BRAND.phoneFormatted} for the fastest reply. Or call for a phone quote.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={telHref} className="btn-gold-filled">Call {BRAND.phoneFormatted}</a>
            <a href={smsHref()} className="btn-gold">Text a Photo</a>
            <Link href="/contact" className="btn-ghost">Or fill the form</Link>
          </div>
        </div>
      </section>
    </>
  );
}
