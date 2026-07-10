import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND, telHref, smsHref } from '@/lib/brand';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Where Your Stuff Goes — Donation, Recycling & Disposal',
  description:
    "Servant King's donation-first sorting process. Habitat, Goodwill, Salvation Army, St. Vincent De Paul, and Snowline Hospice partners. Landfill is the last resort.",
  path: '/where-your-stuff-goes'
});

export default function WhereYourStuffGoesPage() {
  return (
    <>
      <section className="relative bg-charcoal py-16 text-cream md:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-charcoal via-purple-darker to-purple-dark" />
        <div className="container-content text-center">
          <p className="eyebrow">Eco / Donation</p>
          <h1 className="h1 mt-3 text-white">Your Junk Doesn&apos;t Go Straight to the Landfill.</h1>
          <p className="lede mt-5 mx-auto max-w-2xl text-cream/85">
            Every load gets sorted at our facility first. Donate. Recycle. Reuse. Landfill is last.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-20">
        <div className="container-content max-w-narrow">
          <p className="lede text-charcoal">
            Most junk removal companies operate as a one-step service: pick up your stuff, drive directly to the landfill or transfer station, dump it, drive home. Cheaper for them, worse for everyone else.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-charcoal">
            We built Servant King differently. Every load comes back to our own processing facility first. We sort everything into four streams before anything leaves our yard, and we coordinate with our donation partners and certified recyclers to keep as much as possible out of the landfill.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-content max-w-narrow">
          <h2 className="h2">The Four Streams</h2>
          <div className="mt-8 space-y-8">
            <div>
              <h3 className="font-display text-[24px] font-semibold text-charcoal">1. Donate</h3>
              <p className="mt-2 text-[17px] leading-relaxed text-charcoal">
                Furniture, appliances, housewares, clothing, books, building materials, and home goods in usable condition go to one of our five 501(c)(3) partner charities. Each partner specializes:
              </p>
              <ul className="mt-3 space-y-2 text-[16px] leading-relaxed text-charcoal">
                <li><strong>Habitat for Humanity ReStore</strong> — furniture, cabinets, appliances, doors, building materials</li>
                <li><strong>Goodwill</strong> — clothing, housewares, books, small electronics</li>
                <li><strong>Salvation Army</strong> — clothing, furniture, household goods</li>
                <li><strong>St. Vincent De Paul</strong> — clothing, furniture, household goods</li>
                <li><strong>Snowline Hospice</strong> — estate items, artwork, home goods (proceeds fund hospice care)</li>
              </ul>
              <p className="mt-3 text-[17px] leading-relaxed text-charcoal">
                If your job is a full estate cleanout, we can request itemized donation receipts from these charities — useful for tax filings.
              </p>
            </div>

            <div>
              <h3 className="font-display text-[24px] font-semibold text-charcoal">2. Recycle</h3>
              <p className="mt-2 text-[17px] leading-relaxed text-charcoal">
                Items that can&apos;t be donated but have material value go to certified recycling streams:
              </p>
              <ul className="mt-3 space-y-2 text-[16px] leading-relaxed text-charcoal">
                <li><strong>E-waste</strong> — TVs, monitors, computers, printers, phones go to California-certified e-waste processors</li>
                <li><strong>Metal</strong> — appliances, sheet metal, frames, scrap go to metal recyclers</li>
                <li><strong>Tires</strong> — handled through our Certified Tire Hauler permit, processed at CalRecycle-compliant facilities</li>
                <li><strong>Clean wood</strong> — sorted for chip and biomass recycling where accepted</li>
                <li><strong>Concrete</strong> — crushed and recycled at aggregate facilities</li>
                <li><strong>Cardboard / paper</strong> — paper-mill recycling</li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-[24px] font-semibold text-charcoal">3. Reuse</h3>
              <p className="mt-2 text-[17px] leading-relaxed text-charcoal">
                A small portion of every load gets reused — sometimes by us (tools, equipment, hardware), sometimes by community groups we partner with (school art programs, makerspaces, community gardens that take landscape debris for compost).
              </p>
            </div>

            <div>
              <h3 className="font-display text-[24px] font-semibold text-charcoal">4. Landfill (last resort)</h3>
              <p className="mt-2 text-[17px] leading-relaxed text-charcoal">
                Items that can&apos;t be donated, recycled, or reused go to proper landfill disposal at certified transfer stations. We pay the dump fees and obtain weight tickets — these are included in your flat-rate quote, never billed separately.
              </p>
              <p className="mt-3 text-[17px] leading-relaxed text-charcoal">
                Our typical landfill rate per load is around 20-30% by weight, well below industry average.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warmCream py-16 md:py-20">
        <div className="container-content max-w-narrow">
          <h2 className="h2">Donation Receipts and Reporting</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-charcoal">
            For estate cleanouts, downsizing jobs, and any situation where donated items have meaningful tax value, we can coordinate itemized donation receipts from our 501(c)(3) partners. Receipts typically take 7-14 days after donation intake. Ask us for this when we quote the job — it&apos;s easiest if we know in advance.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-charcoal">
            For property managers, foreclosure servicers, and commercial customers, we provide weight tickets, disposal manifests, and (where applicable) donation summaries. These are formatted for asset manager submission and audit-ready.
          </p>
        </div>
      </section>

      <section className="bg-charcoal py-16 text-cream md:py-20">
        <div className="container-content text-center">
          <h2 className="h2 text-white">Want a crew that takes this seriously?</h2>
          <p className="lede mt-5 text-cream/85">
            Text a photo to {BRAND.phoneFormatted}. We&apos;ll tell you exactly what we expect to donate, recycle, and dispose of from your job.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={telHref} className="btn-gold-filled">Call {BRAND.phoneFormatted}</a>
            <a href={smsHref()} className="btn-gold">Text a Photo</a>
          </div>
        </div>
      </section>
    </>
  );
}
