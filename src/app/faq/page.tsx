import type { Metadata } from 'next';
import { BRAND, telHref, smsHref } from '@/lib/brand';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'FAQ — Servant King Junk Removal & Demolition',
  description:
    'Frequently asked questions about Servant King junk removal, demolition, pricing, scheduling, donations, and licensing.',
  path: '/faq'
});

const faqGroups = [
  {
    heading: 'Scheduling & Service',
    items: [
      {
        q: 'How fast can you come out?',
        a: 'Same-day when we have an open slot, next-day at the latest. Saturday and weekend service available. Call or text 209-938-7407 and we\u2019ll tell you honestly whether we can make it work.'
      },
      {
        q: 'What service area do you cover?',
        a: 'The Bay Area (San Francisco, Peninsula, East Bay, South Bay), Sacramento and Placer corridor, and the Central Valley including Stockton, Modesto, Manteca, Tracy. 44 cities have dedicated service-area pages \u2014 if yours isn\u2019t there, text us and we\u2019ll quote it anyway.'
      },
      {
        q: 'Can I be away while you do the job?',
        a: 'Yes \u2014 many of our customers are. Once we\u2019ve done the on-site walkthrough together, we can run the job without you present. We send before/during/after photos. Payment happens after via card link or check by mail.'
      }
    ]
  },
  {
    heading: 'Pricing',
    items: [
      {
        q: 'Do you charge for estimates?',
        a: 'Never. On-site estimates and photo-based quotes are always free and no-obligation.'
      },
      {
        q: 'How is pricing structured?',
        a: 'Flat rate based on volume, weight, labor, and access. No hourly billing. No surprise fees at the end. The quoted price is binding even if the job takes longer than we expected. Read more on our pricing page.'
      },
      {
        q: 'Do you offer discounts for property managers or repeat customers?',
        a: 'Yes. Recurring service contracts for property management portfolios get negotiated flat rates per unit type. Repeat customers get priority on scheduling.'
      },
      {
        q: 'What payment methods do you accept?',
        a: 'Card (we email a payment link), check, or cash. Commercial customers can be invoiced with net-15 or net-30 terms after credit approval.'
      }
    ]
  },
  {
    heading: 'What We Take',
    items: [
      {
        q: 'What do you haul?',
        a: 'Furniture, appliances, mattresses, hot tubs, e-waste, yard waste, construction debris, tires (we\u2019re Certified Tire Haulers), and full estate cleanouts. Pretty much anything except hazardous materials \u2014 paint, solvents, asbestos, lead paint require licensed remediation specialists.'
      },
      {
        q: 'Do you take refrigerators and freezers?',
        a: 'Yes. We coordinate with EPA-certified disposal partners for refrigerant recovery. Slightly higher disposal fee than other appliances, included in flat rate.'
      },
      {
        q: 'Can you take tires?',
        a: 'Yes \u2014 we\u2019re a California Certified Tire Hauler. Most general junk haulers can\u2019t legally transport tires; we can.'
      },
      {
        q: 'Hazardous waste?',
        a: 'No. Asbestos, lead paint, large quantities of solvents, and other hazardous materials require licensed remediation contractors. We can refer you to specialists we trust.'
      }
    ]
  },
  {
    heading: 'Donations & Recycling',
    items: [
      {
        q: 'Do you actually donate stuff or is it just marketing?',
        a: 'We actually donate. Our partners are Habitat for Humanity, Goodwill, Salvation Army, St. Vincent De Paul, and Snowline Hospice \u2014 all 501(c)(3) charities. Items go through our processing facility for sorting before donation. We can provide donation receipts when applicable.'
      },
      {
        q: 'How much of my load actually avoids the landfill?',
        a: 'Roughly 70-80% by weight is donated, recycled, or reused. The remaining 20-30% goes to certified landfill disposal. Higher than industry average because we sort before disposal.'
      },
      {
        q: 'Can I get a donation receipt for tax purposes?',
        a: 'Yes \u2014 itemized donation receipts from our 501(c)(3) partners. Most useful for estate cleanouts and downsizing jobs. Receipts typically take 7-14 days after donation intake.'
      }
    ]
  },
  {
    heading: 'Demolition & Licensing',
    items: [
      {
        q: 'Are you licensed for demolition?',
        a: 'Yes. CSLB C-21 Demolition Contractor License #1142322. Full general liability + workers\u2019 comp insurance. Documentation provided for any job.'
      },
      {
        q: 'Do you pull permits?',
        a: 'Yes, for most residential and commercial demolition work. We handle the permit application, city interface, and inspections as part of the job.'
      },
      {
        q: 'Can you do prevailing wage / public works projects?',
        a: 'Yes. We\u2019re DIR-registered and run a payroll system compliant with certified payroll reporting. Weekly reports filed on time for every active public project.'
      },
      {
        q: 'Do you handle asbestos or lead abatement?',
        a: 'No. Those require specialty remediation contractors with separate licenses. We can refer you to partners we trust for those scopes.'
      }
    ]
  },
  {
    heading: 'About Servant King',
    items: [
      {
        q: 'Who owns Servant King?',
        a: 'Servant King is family-owned, headquartered in Stockton, California. We started in 2021 as a junk removal crew and have grown to handle full demolition and public works while keeping the same family-owned, reputation-first posture.'
      },
      {
        q: 'Are your crew background-checked?',
        a: 'Yes. Every member of the crew is background-checked, uniformed, and trained on residential property protection (hardwood floors, landscaping, neighbor relations).'
      },
      {
        q: 'Can I request unmarked trucks?',
        a: 'Yes. For sensitive estate or commercial situations, we can dispatch with unmarked trucks. Just ask when you book.'
      },
      {
        q: 'Why "Servant King"?',
        a: 'The idea behind the name is that leadership means service. A servant-king is the crew leader who picks up the heaviest thing first. The one who treats your home like it\u2019s his own. That\u2019s the standard the name holds us to.'
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <>
      <section className="bg-charcoal py-16 text-cream md:py-20">
        <div className="container-content text-center">
          <p className="eyebrow">FAQ</p>
          <h1 className="h1 mt-3 text-white">Frequently Asked Questions.</h1>
          <p className="lede mt-5 mx-auto max-w-2xl text-cream/85">
            Don&apos;t see your question? Text us at {BRAND.phoneFormatted} — we answer fast.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-20">
        <div className="container-content max-w-narrow">
          {faqGroups.map((group) => (
            <div key={group.heading} className="mb-12">
              <h2 className="h2 mb-5">{group.heading}</h2>
              <div className="space-y-3">
                {group.items.map((faq) => (
                  <details
                    key={faq.q}
                    className="group rounded-lg bg-white p-6 ring-1 ring-charcoal/5 transition open:ring-purple/20"
                  >
                    <summary className="flex cursor-pointer items-center justify-between font-display text-[18px] font-semibold text-charcoal">
                      {faq.q}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0 text-purple transition group-open:rotate-45"
                        aria-hidden="true"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </summary>
                    <p className="mt-3 text-[16px] leading-relaxed text-charcoal">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-charcoal py-16 text-cream md:py-20">
        <div className="container-content text-center">
          <h2 className="h2 text-white">Still have a question?</h2>
          <p className="lede mt-5 text-cream/85">
            Text us. Real human, fast reply.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={telHref} className="btn-gold-filled">Call {BRAND.phoneFormatted}</a>
            <a href={smsHref()} className="btn-gold">Text {BRAND.phoneFormatted}</a>
          </div>
        </div>
      </section>
    </>
  );
}
