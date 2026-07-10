import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND, telHref, smsHref } from '@/lib/brand';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'How It Works — From Phone Call to Clean Property',
  description:
    'How Servant King handles every job: free on-site quote, flat-rate pricing, uniformed crew, donation-first sorting. Step-by-step process for your junk removal or demolition project.',
  path: '/how-it-works'
});

export default function HowItWorksPage() {
  return (
    <>
      <section className="relative bg-charcoal py-16 text-cream md:py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-charcoal via-purple-darker to-purple-dark" />
        <div className="container-content text-center">
          <p className="eyebrow">How It Works</p>
          <h1 className="h1 mt-3 text-white">From Phone Call to Clean Property — Here&apos;s What Happens.</h1>
          <p className="lede mt-5 mx-auto max-w-2xl text-cream/85">
            No surprises. No upsells. Three steps and we&apos;re done.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={telHref} className="btn-gold-filled">Call {BRAND.phoneFormatted}</a>
            <a href={smsHref()} className="btn-gold">Text a Photo</a>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-20">
        <div className="container-content max-w-narrow">
          <ol className="space-y-12">
            {[
              {
                step: '1',
                title: 'Call, Text, or Submit a Photo',
                body: "Call 209-938-7407 or text us a photo of what needs to go. For most single-item or small-job pickups, we can give you a flat-rate quote over the phone or text. For larger jobs (estate cleanouts, demolition, full-house clearouts), we schedule a free on-site walkthrough — usually within 24-48 hours."
              },
              {
                step: '2',
                title: 'We Show Up — On Time, Uniformed, in a Branded Truck',
                body: "On the day of the job, our crew arrives in a Servant King purple-and-gold branded truck, in matching uniform polos, with the equipment for whatever you've hired us to do. We confirm the scope before we start moving anything. If you've changed your mind about an item or added something to the haul list, we update the quote on the spot — no surprises."
              },
              {
                step: '3',
                title: 'We Haul, Sort, and Sweep Up',
                body: "Crew loads everything onto the truck. We protect floors, doorframes, and landscaping during the carry-out. Once the truck is loaded, we sweep the area clean and have you walk through to confirm. Payment happens at the end — flat rate as quoted, card or check accepted, with a written receipt provided."
              }
            ].map((item) => (
              <li key={item.step} className="flex gap-6">
                <div className="shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple font-display text-2xl font-semibold text-gold">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h2 className="font-display text-[26px] font-semibold leading-tight text-charcoal">{item.title}</h2>
                  <p className="mt-3 text-[17px] leading-relaxed text-charcoal">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-content max-w-narrow">
          <h2 className="h2">What Happens After We Leave</h2>
          <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-charcoal">
            <p>
              Every load comes back to our processing facility before anything goes to the landfill. We sort items into four categories: <strong>donate, recycle, reuse, dispose</strong>.
            </p>
            <p>
              Donations go to Habitat for Humanity, Goodwill, Salvation Army, St. Vincent De Paul, and Snowline Hospice. Recyclables (e-waste, tires, metals, clean wood, concrete) go to certified recycling streams. Anything we can&apos;t donate or recycle goes to proper disposal — landfill is genuinely the last resort, not the first.
            </p>
            <p>
              Want to know what happened to your specific items? Ask us for a donation summary. We can tell you which charity received your couch, where your e-waste was processed, and how much of your load avoided the landfill.
            </p>
            <p className="pt-2">
              <Link href="/where-your-stuff-goes" className="font-semibold text-purple underline hover:text-purple-dark">
                Read more about our donation and recycling process →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-16 text-cream md:py-20">
        <div className="container-content text-center">
          <h2 className="h2 text-white">Ready to start the job?</h2>
          <p className="lede mt-5 text-cream/85">
            Text a photo to {BRAND.phoneFormatted}. We&apos;ll quote it within the hour.
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
