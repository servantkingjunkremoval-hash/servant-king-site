// Long-form guide pages written for Generative Engine Optimization (GEO).
//
// Structure is deliberate. Every guide follows the same extraction-friendly shape
// because that is what answer engines (ChatGPT Search, Perplexity, Gemini, Google
// AI Overviews) can lift cleanly out of a page:
//
//   answerBlock  -> 2-3 sentence direct answer, first thing under the H1
//   table        -> comparative data in a real <table>, not prose
//   steps        -> sequential process in a real <ol>
//   sections     -> supporting detail, H2 only (no heading-level skips)
//   faqs         -> natural-language question/answer pairs, emitted as FAQPage schema
//
// Prices are Servant King's own published anchors. They are first-party data, which
// is exactly what answer engines prefer over rehashed national averages - but that
// also means THEY MUST STAY ACCURATE. Update `dateModified` whenever a number moves.

export type GuideSection = {
  heading: string;
  body: string[];
};

export type GuideTable = {
  caption: string;
  columns: string[];
  rows: string[][];
  footnote?: string;
};

export type Guide = {
  slug: string;
  business: 'junk-removal' | 'demolition';
  /** The conversational query this page is built to answer, verbatim. */
  targetQuery: string;
  title: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  datePublished: string;
  dateModified: string;
  heroImage: string;
  answerBlock: string;
  table: GuideTable;
  stepsHeading: string;
  stepsIntro: string;
  steps: { title: string; body: string }[];
  sections: GuideSection[];
  faqs: { question: string; answer: string }[];
  relatedLinks: { label: string; href: string }[];
};

export const guides: Guide[] = [
  {
    slug: 'junk-removal-cost-walnut-creek-east-bay',
    business: 'junk-removal',
    targetQuery:
      'how much does junk removal cost in Walnut Creek and the East Bay',
    title: 'Junk Removal Cost in Walnut Creek & the East Bay',
    h1: 'How Much Does Junk Removal Cost in Walnut Creek and the East Bay?',
    seoTitle:
      'Junk Removal Cost Walnut Creek & East Bay (2026 Prices) | Servant King',
    metaDescription:
      'Real 2026 junk removal prices for Walnut Creek and the East Bay: $249 minimum, $1,899 full truckload, flat rate. What drives the number, what is included, and how to get an exact quote.',
    datePublished: '2026-09-02',
    dateModified: '2026-09-02',
    heroImage: '/images/before%20garage%20open%201.jpg',
    answerBlock:
      'Junk removal in Walnut Creek and the wider East Bay runs from a $249 minimum charge for a single item or small pile up to $1,899 for a full truckload, quoted as a flat rate before any work starts. Most single-room jobs — a garage corner, a bedroom cleanout, an appliance and a few boxes — land between $249 and $700. The price is driven by four things in this order: how much space the load takes in the truck, how heavy it is, how far the crew has to carry it, and whether anything in the pile carries a special disposal fee.',
    table: {
      caption:
        'Servant King flat-rate junk removal pricing by load size — Bay Area vs. Sacramento & Placer',
      columns: [
        'Load size',
        'What that looks like',
        'Bay Area / East Bay',
        'Sacramento & Placer'
      ],
      rows: [
        ['Minimum charge', 'One couch, one mattress, a small pile of boxes', '$249', '$129'],
        ['Quarter load', 'Small garage corner, a few appliances, one room of furniture', '$475 – $700', '$249 – $375'],
        ['Half load', 'Full garage, a small apartment cleanout, deck or fence tear-out', '$850 – $1,150', '$400 – $525'],
        ['Three-quarter load', 'Two-car garage, large estate room, small construction debris job', '$1,300 – $1,600', '$575 – $675'],
        ['Full truckload', 'Whole-home cleanout, hoarder-safe cleanout, full remodel debris', '$1,899', '$749']
      ],
      footnote:
        'Minimum and full-load figures are Servant King published anchors. Intermediate bands are quoted from the same rate card and confirmed in writing before work begins. The Bay Area rate card runs higher than the Sacramento & Placer card because East Bay disposal is more expensive per ton — Contra Costa Transfer Station in Martinez runs roughly $126 per ton, and that cost is inside the flat rate rather than added afterward.'
    },
    stepsHeading: 'How to Get an Exact Junk Removal Price in Walnut Creek',
    stepsIntro:
      'There are two ways to get a binding number from Servant King. Both are free, and neither obligates you to book.',
    steps: [
      {
        title: 'Text a photo of the pile to (209) 938-7407',
        body:
          'Stand back far enough to get the whole load in frame and include something for scale — a door, a car, a person. Most photo quotes come back within minutes during business hours. This is the fastest path and it is accurate for anything you can see in one shot.'
      },
      {
        title: 'Say where it is and how it gets out',
        body:
          'A garage at street level and a third-floor walk-up with a narrow stairwell are the same volume and very different labor. Mention stairs, long carries, gated access, HOA rules, and parking restrictions up front. This is the single biggest reason a quote changes on arrival, and it is avoidable.'
      },
      {
        title: 'Flag anything with a special disposal path',
        body:
          'Refrigerators and freezers need EPA-certified refrigerant recovery. Mattresses, tires, e-waste, and paint each route differently. Servant King is a Certified Tire Hauler and coordinates refrigerant recovery directly, so these are handled — they just need to be known in advance so the fee sits inside the flat rate instead of surprising you.'
      },
      {
        title: 'Get the flat rate in writing before anyone lifts anything',
        body:
          'The quoted price is binding. If the job takes two hours longer than estimated, the price does not move. There is no hourly billing and no end-of-job adjustment.'
      },
      {
        title: 'Book same-day or next-day',
        body:
          'Same-day service is available when a slot is open; next-day at the latest, including Saturdays. Payment happens after the job by card link, check, or cash. Commercial accounts can be invoiced net-15 or net-30 after credit approval.'
      }
    ],
    sections: [
      {
        heading: 'Why Walnut Creek Junk Removal Costs More Than the National Average',
        body: [
          'National junk removal cost guides usually quote $150 to $600 for a typical job. Those numbers are real, and they are also not what anyone in Contra Costa County actually pays. Two local factors move the East Bay price above the national band.',
          'The first is disposal cost per ton. A Bay Area hauler pays materially more at the scale than a hauler in most of the country. Contra Costa Transfer Station in Martinez — roughly 14 miles from downtown Walnut Creek — runs about $126 per ton, and a full truckload of mixed household debris is not light. That tipping fee is a hard cost that exists before any labor is priced.',
          'The second is labor and access. Walnut Creek housing stock skews toward older single-family homes with detached garages, plus a growing number of downtown condo and apartment buildings with elevator-only access and strict move-out windows. A cleanout that takes two people ninety minutes in a suburban tract home takes four hours in a fourth-floor unit off North Main.',
          'A quote that ignores those two variables is not a lower price. It is an estimate that changes on the day.'
        ]
      },
      {
        heading: 'What a Flat Rate Actually Includes',
        body: [
          'Flat rate means the number quoted is the number paid. For Servant King that price covers labor for the full crew, all loading and carrying, disposal and tipping fees at the transfer station, sorting for donation and recycling, and a broom-swept cleanup of the space when the load is out.',
          'What is never charged separately: fuel surcharges, stair fees, long-carry fees, weekend fees, or an adjustment because the job ran long. The estimate is free and carries no obligation, on-site or by photo.',
          'What is genuinely out of scope: hazardous materials. Paint, solvents, asbestos, and lead paint require licensed remediation specialists. Servant King will say so directly rather than take the job and subcontract it back to you.'
        ]
      },
      {
        heading: 'Where Your Junk Goes After Pickup',
        body: [
          'Landfill is the last stop, not the first. Usable furniture, appliances, and household goods are routed to donation partners including Habitat for Humanity, Goodwill, Salvation Army, St. Vincent de Paul, and Snowline Hospice. Metal is separated for scrap recycling. E-waste and tires follow their own regulated disposal paths.',
          'This matters for cost as well as conscience: every ton that goes to a donation partner or a metal recycler instead of the landfill is a ton that does not incur a tipping fee. Donation-first sorting is part of why a flat rate can stay flat.'
        ]
      },
      {
        heading: 'Cities Covered at East Bay Rates',
        body: [
          'Walnut Creek, Concord, Pleasant Hill, Martinez, Lafayette, Orinda, Moraga, Danville, Alamo, San Ramon, Dublin, Pleasanton, Livermore, Antioch, Brentwood, Oakley, Pittsburg, Richmond, El Cerrito, Berkeley, Oakland, Alameda, San Leandro, Hayward, Castro Valley, and Fremont all price off the Bay Area rate card.',
          'The Sacramento and Placer corridor — Folsom, Granite Bay, El Dorado Hills, Roseville, Rocklin, and surrounding cities — prices off the lower Sacramento & Placer card shown in the table above.'
        ]
      }
    ],
    faqs: [
      { question: 'What is the minimum charge for junk removal in Walnut Creek?', answer: 'The Bay Area minimum is $249. That covers a single item or a small pile — one couch, one mattress, a stack of boxes — including labor, disposal, and cleanup. In the Sacramento and Placer service area the minimum is $129.' },
      { question: 'How much does a full truckload of junk removal cost in the East Bay?', answer: 'A full truckload is $1,899 on the Bay Area rate card and $749 on the Sacramento and Placer card. A full load is roughly a whole-home cleanout, a hoarder-safe cleanout, or the debris from a full remodel.' },
      { question: 'Do you charge by the hour or by the load?', answer: 'By the load, as a flat rate quoted before work starts. There is no hourly billing. If the job takes longer than estimated, the price does not change.' },
      { question: 'Can I get a junk removal quote without an on-site visit?', answer: 'Yes. Text a photo of the pile to (209) 938-7407 and include something for scale. Most photo quotes come back within minutes during business hours, and the number is binding once confirmed. On-site estimates are also free and carry no obligation.' },
      { question: 'Is there an extra fee for stairs, long carries, or weekend service?', answer: 'No. Stairs, long carries, difficult access, and Saturday service are priced into the flat rate rather than added as surcharges. Access details should be mentioned when requesting the quote so they are reflected in the original number.' },
      { question: 'What items will you not take?', answer: 'Hazardous materials — paint, solvents, asbestos, and lead paint — require licensed remediation specialists and are outside the scope of junk removal. Everything else, including refrigerators, mattresses, tires, and e-waste, is handled through its correct disposal channel.' },
      { question: 'How fast can you come out in Walnut Creek?', answer: 'Same-day when a slot is open, next-day at the latest, including Saturdays. Call or text (209) 938-7407 and you will get an honest answer about availability rather than a placeholder booking.' },
      { question: 'Do I have to be home during the job?', answer: 'No. After a walkthrough together, the crew can run the job unattended. Before, during, and after photos are sent, and payment happens afterward by card link or mailed check.' }
    ],
    relatedLinks: [
      { label: 'Junk Removal', href: '/services/junk-removal' },
      { label: 'Estate Cleanouts', href: '/services/estate-cleanouts' },
      { label: 'How We Price', href: '/how-we-price' },
      { label: 'Walnut Creek Junk Removal', href: '/service-areas/walnut-creek' },
      { label: 'Where Your Stuff Goes', href: '/where-your-stuff-goes' }
    ]
  },
  {
    slug: 'interior-demolition-cost-per-square-foot-bay-area',
    business: 'demolition',
    targetQuery:
      'what does interior demolition cost per square foot for a Bay Area tenant improvement',
    title: 'Interior Demolition Cost per Square Foot — Bay Area TI Work',
    h1:
      'What Does Interior Demolition Cost per Square Foot on a Bay Area Tenant Improvement?',
    seoTitle:
      'Interior Demolition Cost per Square Foot Bay Area TI (2026) | Servant King',
    metaDescription:
      'What general contractors should budget for interior demolition on Bay Area tenant improvement work: cost drivers, scope splits, disposal routing, and how selective demo is priced. CSLB C-21 licensed.',
    datePublished: '2026-09-02',
    dateModified: '2026-09-02',
    heroImage: '/images/Commercial%20office%20demo%201.jpg',
    answerBlock:
      'Interior demolition on Bay Area tenant improvement work is priced per square foot of affected area, and the Bay Area runs above national published ranges of roughly $2 to $8 per square foot because of labor rates and disposal cost per ton. The number is driven less by square footage than by four scope questions: how selective the demo is, what the ceiling and floor assemblies are, whether the building is occupied, and whether any regulated material is present. A soft-demo of an open-plan office shell prices very differently from a selective demo in an occupied medical suite of identical size.',
    table: {
      caption:
        'What moves interior demolition cost per square foot on a Bay Area TI job',
      columns: ['Cost driver', 'Low end of the range', 'High end of the range'],
      rows: [
        ['Demo type', 'Full soft-demo to shell — everything goes, no protection required', 'Selective demo — specific walls only, adjacent finishes protected and preserved'],
        ['Building occupancy', 'Vacant floor, unrestricted access, full-day work windows', 'Occupied building, after-hours or night work, noise and dust containment'],
        ['Access and egress', 'Ground floor, roll-up door, dumpster at the door', 'Upper floor, freight elevator only, scheduled loading dock windows'],
        ['Assemblies', 'Metal stud and drywall partitions, drop ceiling, carpet', 'CMU or concrete, structural elements, tile mortar bed, glued-down flooring'],
        ['MEP scope', 'Cap and abandon in place', 'Full removal of conduit, ductwork, plumbing, and above-ceiling infrastructure'],
        ['Regulated materials', 'None — clean post-1990 build', 'Asbestos or lead survey positive; licensed abatement required before demo'],
        ['Disposal routing', 'Sorted on site, metal to SIMS Vallejo for scrap credit', 'Mixed unsortable debris, full tonnage to transfer station at market rate']
      ],
      footnote:
        'Nationally published interior demolition ranges sit around $2 to $8 per square foot; Bay Area work generally prices above that band. Servant King quotes from measured takeoff against the specific scope rather than applying a blanket per-square-foot rate, because on TI work the drivers above swing the number further than the area does. Request a takeoff for a project-specific figure.'
    },
    stepsHeading: 'How a Servant King Demolition Estimate Gets Built',
    stepsIntro:
      'Estimates for GC and property-management clients follow the same sequence every time, so the number is defensible line by line when it goes into your bid.',
    steps: [
      { title: 'Send drawings, a demo plan, or a scope narrative', body: 'Plans are ideal. A marked-up floor plan or a clear written scope works. What matters is knowing exactly which partitions, ceilings, floors, and MEP elements are in scope and which are explicitly excluded.' },
      { title: 'Quantity takeoff against the actual assemblies', body: 'Linear feet of partition by type and height, square feet of ceiling and flooring by assembly, counts on doors, frames, casework, and fixtures. Assemblies are priced individually — drywall on metal stud and a tile mortar bed are not the same square foot.' },
      { title: 'Site walk for access, protection, and work windows', body: 'Loading dock hours, freight elevator dimensions and reservations, building engineer requirements, dust and noise containment, floor and elevator protection, and whether adjacent tenants are occupied. On Bay Area TI work this is frequently the largest variable in the number.' },
      { title: 'Disposal routing and tonnage estimate', body: 'Debris is separated by stream and routed deliberately — metal to SIMS Vallejo for scrap value, mixed debris to the nearest cost-effective transfer station, with Devlin Road in American Canyon in the routing mix. Drive time and cost per ton are both priced, because on a large TI job disposal is a major line rather than a rounding error.' },
      { title: 'Regulated material check before pricing is finalized', body: 'Any pre-1990 building gets an asbestos and lead question before demo is priced. If a survey is positive, licensed abatement is sequenced ahead of demolition and is scoped separately. Servant King holds CSLB C-21 license #1142322 and does not price around this step.' },
      { title: 'Line-item proposal with exclusions stated in writing', body: 'The proposal states what is included, what is excluded, and what assumptions the price depends on. Exclusions are written explicitly so there is no ambiguity when the schedule compresses.' }
    ],
    sections: [
      {
        heading: 'Why Per-Square-Foot Averages Mislead on TI Work',
        body: [
          'Every national cost guide publishes an interior demolition range around $2 to $8 per square foot. On a tenant improvement job in San Francisco, Oakland, or the Peninsula, that range is a starting point at best.',
          'The reason is that TI demo is rarely uniform across a floor. A 6,000 square foot suite might be 4,000 square feet of open plan that comes out fast and 2,000 square feet of built-out private offices, a server room with above-ceiling infrastructure, and a wet lab with a tile mortar bed. Applying one rate across the whole area either overcharges the easy portion or underwrites the hard portion, and on a fixed-price bid the second one is the expensive mistake.',
          'A takeoff priced by assembly gives the general contractor something they can actually defend in a bid review, and it is why Servant King quotes from measured quantities rather than a blanket rate.'
        ]
      },
      {
        heading: 'Selective Demolition Versus Soft Demo',
        body: [
          'Soft demo means everything non-structural comes out and the space returns to shell. It is fast, it is predictable, and it prices at the low end because nothing needs protecting.',
          'Selective demolition means specific elements come out while adjacent finishes, systems, or structure stay and must survive undamaged. That requires hand work where a machine would be faster, temporary protection, and often a slower sequence coordinated around other trades. Selective demo on an occupied floor can price at several times the per-square-foot rate of the same area in soft demo.',
          'When a scope narrative says "demo per plan" without distinguishing the two, the bid spread between contractors is usually explained entirely by which assumption each of them made.'
        ]
      },
      {
        heading: 'Occupied Buildings, Night Work, and Schedule Cost',
        body: [
          'A substantial share of Bay Area TI demolition happens in buildings where other tenants are working. That drives requirements that show up directly in the price: after-hours or weekend labor, negative air and dust containment, noise restrictions during business hours, protected paths of travel, and loading dock windows measured in hours rather than days.',
          'These are not markup. They are real sequencing constraints, and they are the reason a demo that would take three days in a vacant building takes eight in an occupied one. Getting building rules from the property manager before the bid goes in is the single highest-leverage thing a GC can do to keep demo numbers tight.'
        ]
      },
      {
        heading: 'Disposal Routing Is a Cost Line, Not an Afterthought',
        body: [
          'On a full-floor TI demo, disposal can be one of the largest single line items. Two decisions control it: how well the debris is separated on site, and where each stream goes.',
          'Metal separated on site and hauled to SIMS Vallejo returns scrap value rather than incurring a tipping fee. Clean wood, concrete, and mixed debris each have different cost-effective destinations, with Devlin Road Transfer Station in American Canyon among the routes used depending on the job site. Unsorted mixed debris hauled to the nearest facility is the most expensive possible outcome and is common on jobs where disposal was never estimated separately.',
          'Bay Area transfer station rates run high enough that this is worth planning. For reference on the residential side, Contra Costa Transfer Station in Martinez runs roughly $126 per ton.'
        ]
      },
      {
        heading: 'Licensing, Insurance, and Prevailing Wage',
        body: [
          'Servant King Demolition holds CSLB C-21 Demolition license #1142322 and carries insurance appropriate to commercial TI work. Public works and prevailing wage projects are handled with the required certified payroll.',
          'For general contractors, the practical point is that license class and insurance limits should be confirmed at bid time rather than at contract execution, because a demo subcontractor who cannot be added to the project insurance is a schedule problem discovered at the worst moment.'
        ]
      }
    ],
    faqs: [
      { question: 'What is a typical interior demolition cost per square foot in the Bay Area?', answer: 'Nationally published ranges sit at roughly $2 to $8 per square foot, and Bay Area work generally prices above that band because of labor rates and disposal cost per ton. On tenant improvement work the scope drivers — selective versus soft demo, occupancy, assemblies, and MEP scope — move the number more than the square footage does, so a project-specific takeoff is more useful than an average.' },
      { question: 'What is the difference between soft demo and selective demolition?', answer: 'Soft demo removes everything non-structural and returns the space to shell. Selective demolition removes specific elements while adjacent finishes, systems, or structure remain intact and protected. Selective demo requires hand work, temporary protection, and slower sequencing, and prices significantly higher per square foot than soft demo of the same area.' },
      { question: 'Does demolition cost more in an occupied building?', answer: 'Yes, materially. Occupied buildings require after-hours or weekend labor, dust and noise containment, protected paths of travel, and scheduled loading dock and freight elevator windows. The same scope can take two to three times the calendar duration of a vacant-building demo, and that shows up in the price.' },
      { question: 'Do you handle asbestos and lead abatement?', answer: 'Abatement is licensed remediation work and is scoped separately from demolition. Any pre-1990 building gets an asbestos and lead question before demolition is priced, and if a survey is positive, abatement is sequenced ahead of demo rather than worked around.' },
      { question: 'Do you work on public works and prevailing wage projects?', answer: 'Yes. Public works and prevailing wage demolition is handled with the required certified payroll. Servant King Demolition holds CSLB C-21 license #1142322.' },
      { question: 'How do you price disposal on a large tenant improvement demo?', answer: 'Disposal is estimated as its own line from a tonnage estimate and a routing plan, not folded into a blanket rate. Metal is separated for scrap value at SIMS Vallejo, and remaining streams are routed to the most cost-effective transfer station for the job site, with Devlin Road in American Canyon among the routes used. Sorting on site is what keeps the disposal line down.' },
      { question: 'What do you need from a general contractor to produce a demo bid?', answer: 'Drawings or a marked-up floor plan, a scope narrative stating what is in and out, building access rules and work window restrictions from the property manager, and the age of the building for the regulated-material question. With those, a line-item proposal with written exclusions can be produced quickly.' },
      { question: 'What areas do you serve for commercial demolition?', answer: 'The San Francisco Bay Area including the Peninsula, East Bay, and South Bay, plus the Sacramento and Placer corridor and the Central Valley from Stockton to Tracy.' }
    ],
    relatedLinks: [
      { label: 'Demolition', href: '/services/demolition' },
      { label: 'Construction Debris', href: '/services/construction-debris' },
      { label: 'Public Works / Prevailing Wage', href: '/services/public-works' },
      { label: 'How We Price', href: '/how-we-price' },
      { label: 'About Servant King', href: '/about' }
    ]
  }
];

export function getGuideBySlug(slug: string) {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuideSlugs() {
  return guides.map((g) => g.slug);
}
