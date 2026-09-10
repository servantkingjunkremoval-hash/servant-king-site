/**
 * /answers/* — one page per customer mindset.
 *
 * These exist for two jobs at once. Each is the paid destination for one
 * ChatGPT ad group (matched on utm_term, which equals `tag` below), so the
 * click lands on the exact situation the visitor described. And each answers
 * its question in writing with FAQPage markup, so an AI engine can quote
 * Servant King whether or not a campaign is running that day.
 *
 * Source research: the two customer-intent studies in the Cowork project
 * (demolition_search_intent.pdf, chatgpt_hauling_search_intent_guide.pdf).
 * `asked` is the real prompt shape from that research, not a paraphrase.
 *
 * Rules for editing:
 *  - Every claim here has to be something the crew actually does. Prices come
 *    from the confirmed rate sheet; capability claims were confirmed by Chris
 *    on 2026-09-10. Do not add a promise nobody has agreed to keep.
 *  - Tenant abandoned-property stays general and points to counsel. Do not
 *    publish California notice periods or dollar thresholds here.
 *  - `tag` must keep matching the ad group's utm_term, or attribution breaks.
 */

export type AnswerQA = { q: string; a: string[] };

export type AnswerPage = {
  slug: string;
  /** Matches the ChatGPT ad group's utm_term. Attribution depends on it. */
  tag: string;
  business: 'junk' | 'demo';
  nav: string;
  /** The question a real person types, in their words. */
  asked: string;
  h1: string;
  /** Outcome without the top frustration — the hero's second line. */
  promise: string;
  dek: string;
  metaDescription: string;
  hero: string;
  ctaText: string;
  ctaLabel: string;
  qa: AnswerQA[];
};

/** What Servant King guarantees in writing. Confirmed by Chris 2026-09-10. */
export const GUARANTEES: { title: string; detail: string }[] = [
  {
    title: 'Flat price, locked before we load',
    detail: 'The number we quote is the number you pay. It does not move once the truck is full.'
  },
  {
    title: 'Broom-clean, or we come back',
    detail: "If the space isn't swept and clear when we leave, we return and finish it."
  },
  {
    title: 'Licensed, insured, damage covered',
    detail: 'CSLB C-21 #1142322. If we damage something, that is on us, in writing.'
  },
  {
    title: "We'll tell you if a dumpster is cheaper",
    detail: 'For some jobs a container really is the better buy. We would rather say so than win the job dishonestly.'
  }
];

export const ANSWER_PAGES: AnswerPage[] = [
  {
    slug: 'estate-cleanout-probate',
    tag: 'probate',
    business: 'junk',
    nav: 'Inherited house / probate',
    asked: '“My sibling and I just inherited our parents\' home in probate. What is the step-by-step checklist to prepare an inherited house for sale when it\'s full of 40 years of belongings?”',
    h1: 'Clearing Out an Inherited House',
    promise: 'An empty, broom-clean house ready to list — without flying in, sorting it alone, or making a single dump run.',
    dek: 'A step-by-step plan for executors and families in the Bay Area — what order to work in, whether to hold an estate sale first, and what it costs to have someone else do the lifting.',
    metaDescription: 'A step-by-step plan for executors clearing an inherited house in the Bay Area: what order to work in, whether to hold an estate sale first, and what a full cleanout costs.',
    hero: '/images/ads/junk-m1-a.jpg',
    ctaText: 'Send a few photos and we will come back with a real number and a schedule that fits your closing date.',
    ctaLabel: 'Get an estate cleanout price',
    qa: [
      { q: 'Where do I start with a house full of forty years of belongings?', a: ['Work room by room in one pass, in this order: documents and valuables, then anything a family member has claimed, then donations, then haul. Do not start in the garage — it is the highest volume and the lowest-value decisions, and it is where most families stall out and quit.', 'A single-story three-bedroom usually runs two days end to end. Larger homes, or homes where several relatives still need to walk through, run three to four.'] },
      { q: 'Should we hold an estate sale first, or just clear it out?', a: ['An estate sale earns its keep when there is real furniture, jewelry, tools, or collectibles in the house. The company takes 30–40% and needs two to three weeks on site, so it also delays your listing by most of a month.', 'The test is not how full the house is — it is how much of it a stranger would pay for. Mid-century furniture, tools, jewelry, and collectibles carry a sale. Forty years of ordinary household goods usually does not, and the sale ends up costing more in carrying time than it returns. Send us photos and we will tell you which side of that line you are on, even when the answer is that you do not need us yet.'] },
      { q: 'I live out of state and have thirty days. Can this happen without me?', a: ['Yes, and it is a large share of the estate work we do. Ask and we will walk the house on video with you before anything moves, so you approve the keep pile yourself. Either way you get before-and-after photos and donation receipts for the estate\'s records, and keys go back to your realtor or the lockbox when we are done.'] },
      { q: 'What should we look for before a crew touches anything?', a: ['Deeds and titles, insurance policies, tax records, safe deposit keys, savings bonds, discharge papers, and anything handwritten. Check inside books, coat pockets, freezers, and taped underneath drawers — that is where that generation hid things.', 'Tell us what you are still hunting for and we set anything resembling it aside on a table rather than loading it.'] }
    ]
  },
  {
    slug: 'hoarding-cleanout-help',
    tag: 'hoarding',
    business: 'junk',
    nav: 'Hoarded home / elderly parent',
    asked: '“How do I help an elderly parent clean out a hoarded house without causing extreme anxiety or conflict? Give me a multi-stage approach.”',
    h1: 'Helping a Parent Clear a Hoarded Home',
    promise: 'Your parent\'s house cleared room by room — without a fight, and without anyone being made to feel ashamed.',
    dek: 'How to approach it without a fight, what to check for before anyone starts, and honestly how many truckloads a full house takes.',
    metaDescription: 'How to clear a hoarded house for an elderly parent without a fight, what safety risks to check first, and how many truckloads a full home actually takes.',
    hero: '/images/ads/junk-m2-a.jpg',
    ctaText: 'We have done these before, and we do them quietly. No signage on the truck if you would rather the neighbors not know.',
    ctaLabel: 'Talk through the situation',
    qa: [
      { q: 'How do we do this without it turning into a fight?', a: ['Start with a room your parent does not sleep in or use daily — a spare bedroom or the garage — and finish it completely. A single finished room does more to build trust than a whole day of arguing about the whole house.', 'Give them veto power over a set number of items per room and honor it, even when the item is worthless. What people are protecting is usually the decision, not the object. Our crews are told to ask before anything ambiguous goes on the truck.'] },
      { q: 'What safety risks should we check for first?', a: ['Blocked exits and hallways, anything stacked above shoulder height, water damage and mold behind stacks, rodent droppings, and whether the smoke detectors are reachable. In kitchens and bathrooms, check what has been sitting behind the piles.', 'Our crews are trained and equipped for contaminated interiors — protective gear, containment, and the disposal routing that goes with it — so rodent contamination, mold, and spoiled food are not a reason we walk away. Tell us what you are seeing and we will tell you straight whether it is within what we do.'] },
      { q: 'How many truckloads does a full house actually take?', a: ['A heavily filled 2,500 square foot home commonly runs eight to twelve truckloads. Volume is hard to eyeball from inside the house — everyone underestimates it, including us, until we see photos of every room.', 'Send photos of each room including closets and we will give you a load count and a price before we show up, not after.'] }
    ]
  },
  {
    slug: 'dumpster-rental-vs-junk-removal',
    tag: 'dumpstervscrew',
    business: 'junk',
    nav: 'Dumpster vs. crew / HOA',
    asked: '“Compare the total cost, labor effort, and time difference between renting a 30-yard roll-off dumpster versus hiring a full-service demolition and hauling crew.”',
    h1: 'Dumpster vs. Crew: What You Actually Pay For',
    promise: 'Everything gone in one afternoon — without renting a box, pulling a permit, or lifting anything yourself.',
    dek: 'A rented container bills you for the whole box whether you fill it or not. Here is what each option really costs once labor and dump fees are counted — and what to do when your HOA or your driveway will not take a roll-off at all.',
    metaDescription: 'Roll-off dumpster or a hauling crew? Real Bay Area numbers on both, why you pay for space you never use with a container, and what to do when your HOA says 48 hours.',
    hero: '/images/ads/junk-m3-b.jpg',
    ctaText: 'Get our number before you book a container. If a dumpster really is cheaper for your job, we will tell you so.',
    ctaLabel: 'Get both numbers',
    qa: [
      { q: 'Which one actually costs less?', a: ['The difference people miss is what you are buying. With a container you rent the whole box. A 10-yard roll-off in the South Bay runs around <strong>$430</strong> for a seven-day rental with a one-to-two-ton allowance, and you pay that whether you fill it to the rim or stop halfway. Go over the tonnage and overage runs roughly $150 a ton. Placed on the street it also needs a right-of-way permit; on your own driveway it does not.', 'With us you pay for the space your load actually takes up in the truck. <strong>No wasted half loads.</strong> Most jobs land in the quarter-to-half range at <strong>$250–$700</strong>, and that number already includes the labor, the loading, the dump fees, and the sweep-up. Single items start at <strong>$149</strong>. A full truck or a whole-house cleanout runs <strong>$800–$1,500</strong>.', 'So the honest comparison: if you will genuinely fill a container to the top, and you have a free weekend and someone to help, a dumpster is competitive. If you fill two-thirds of it — which is what usually happens — you have paid for a third of a box you never used, on top of every hour you spent loading it yourself.'] },
      { q: 'My HOA only allows a dumpster for 48 hours. What do I do?', a: ['Skip the container. A crew is not subject to the rule, because nothing sits on your driveway overnight — the truck arrives, loads, and leaves the same day. A packed three-car garage is typically one afternoon.', 'The same answer applies to street-permit cities and to anyone who does not want a dumpster parked in front of the house for a week.'] },
      { q: 'My driveway is narrow and there are low branches. Can a truck even get in?', a: ['Usually yes, and where it cannot, we carry. Our trucks need less clearance than a roll-off delivery truck, which has to swing a container off the back. Send a photo of the approach and we will tell you before we dispatch rather than after.', 'Ask for protection on a finished driveway or floor and we lay it down — and where it is obviously needed, we bring it without being asked.'] },
      { q: 'What can\'t just be thrown in a container?', a: ['Tires, electronics, appliances with refrigerant, paint and solvents, batteries, and pressure-treated lumber are all handled separately — a transfer station will either refuse the load or surcharge it. Concrete, dirt, and tile are accepted but priced by weight, which is exactly where dumpster overage charges come from.', 'We sort that on the truck and route each stream where it belongs. Servant King is a certified tire hauler, and anything still usable goes to donation rather than the landfill. You do not have to learn the rules.'] }
    ]
  },
  {
    slug: 'how-to-vet-a-junk-removal-company',
    tag: 'vetting',
    business: 'junk',
    nav: 'Vetting & red flags',
    asked: '“What are red flags to watch out for when hiring a local junk removal or site cleanup service on Craigslist or Facebook Marketplace?”',
    h1: 'How to Vet a Junk Removal Company',
    promise: 'A hauler with a license, insurance, and a price that holds — without the Marketplace gamble.',
    dek: 'The questions worth asking, the paperwork worth requiring, and the specific things that go wrong when you hire the cheapest truck on Marketplace.',
    metaDescription: 'The five questions worth asking before you hire a junk removal company, the insurance to require, and what actually goes wrong with a Marketplace hauler.',
    hero: '/images/ads/junk-m4-a.jpg',
    ctaText: 'Ask us all five. We will answer them in writing before you commit to anything.',
    ctaLabel: 'Ask the five questions',
    qa: [
      { q: 'What should I ask before I hire anyone?', a: ['Five questions cover most of the risk. Are you insured, and can I see the certificate? Are you licensed? Where does my material actually go? Is this price fixed or does it move on the day? And can I see recent reviews with names attached?', 'A company that answers all five in writing before the job is a company that will still be reachable if something goes wrong.'] },
      { q: 'What insurance should they carry, and why does it matter to me?', a: ['General liability protects your property if something gets damaged carrying a couch down your stairs. Workers\' compensation matters more than people realize — if an uninsured hauler is hurt on your property, that exposure can land on your homeowner\'s policy.', 'Servant King is licensed and insured, CSLB C-21 #1142322, and we will send the certificate before the job without being chased for it.'] },
      { q: 'What actually goes wrong with a Marketplace hauler?', a: ['Three things, in order of frequency. The price changes once the truck is loaded. The load gets illegally dumped and, because the paperwork trail leads back to the property it came from, the citation can follow you. And there is nobody to call afterward.', 'The second one is the expensive one, and it is the reason to ask where material goes.'] }
    ]
  },
  {
    slug: 'rental-turnover-and-pre-listing-cleanouts',
    tag: 'turnover',
    business: 'junk',
    nav: 'Realtor & PM turnovers',
    asked: '“I need a fixer-upper cleared and photo-ready before it lists this week — and a tenant left a unit full of furniture.”',
    h1: 'Turnovers and Pre-Listing Cleanouts',
    promise: 'Unit emptied and photo-ready in 24 hours — without chasing three haulers or holding up your listing.',
    dek: 'For agents and property managers: how fast a house can go from full to photo-ready, what to do about a tenant\'s abandoned belongings, and how the billing works.',
    metaDescription: 'For agents and property managers: how fast a house goes from full to photo-ready, what to do about a tenant’s abandoned belongings, and how the billing works.',
    hero: '/images/ads/junk-m5-b.jpg',
    ctaText: 'One call, unit cleared, photos in your inbox. Set it up once and stop chasing haulers between tenants.',
    ctaLabel: 'Set up a turnover account',
    qa: [
      { q: 'How fast can a house be cleared before photos?', a: ['Most single-family homes clear in a day, and we schedule around your photographer rather than the other way around. Same-day or next-day is normal for us, not an upcharge — book in the morning and we are usually on site before your listing deadline.', 'We sweep and leave it broom-clean, which is usually what the listing photos need — not a deep clean, but nothing on the floor.'] },
      { q: 'A tenant left everything behind. Can I just throw it out?', a: ['Not immediately, and this is where landlords get themselves in trouble. California requires written notice to the former tenant and a waiting period before you can dispose of abandoned personal property, with different handling above a dollar threshold.', 'We are not attorneys and this is not legal advice — check the current requirement or ask your counsel before anything is hauled. What we can do is inventory and photograph every item before it moves, so you have dated documentation of exactly what was in the unit if the deposit is ever disputed.'] },
      { q: 'Can we set this up as a standing arrangement?', a: ['Yes. Property managers who turn units regularly keep us on call — same crews, consistent pricing, one invoice per property, billed to the owner or the management company as you prefer.', 'Photo documentation before and after comes standard on turnover work, because you will eventually need it for a deposit dispute.'] }
    ]
  },
  {
    slug: 'demolition-cost-teardown-vs-remodel',
    tag: 'feasibility',
    business: 'demo',
    nav: 'Teardown vs. remodel vs. ADU',
    asked: '“Is it cheaper to knock down a detached garage or turn it into an ADU? And how much does it actually cost to tear down a 1,500 sq ft house versus remodeling it?”',
    h1: 'Tear Down, Remodel, or Convert?',
    promise: 'A real demolition number before you commit the budget — without waiting two weeks for a site visit.',
    dek: 'The demolition number is the piece nobody prices until late, and it decides the whole project. Here is how to get it early enough to matter.',
    metaDescription: 'Tear down, remodel, or convert the garage to an ADU? Real Bay Area demolition costs, and how to get the number early enough to budget with.',
    hero: '/images/ads/demo-m1-a.jpg',
    ctaText: 'Get the demolition number before you finalize the budget, not after. Licensed C-21 contractor, CSLB #1142322.',
    ctaLabel: 'Price the demo',
    qa: [
      { q: 'Garage to ADU, or knock it down and build new?', a: ['Converting is usually cheaper when the slab is sound, the walls are plumb, and the structure is within setbacks — you keep the foundation, which is the expensive part. Knocking down wins when the slab is cracked or under-thickness, the garage sits on a setback line, or you want a footprint the existing walls do not allow.', 'Your architect decides this, but they need a real demolition number to decide with. That is the part we can give you in a day.'] },
      { q: 'What does demolition actually cost per square foot around here?', a: ['It varies more by access and material than by size. A kitchen or bath tear-out is priced as a job, not per foot. Full interior gut work and whole-structure teardowns price by square footage, disposal weight, and how hard it is to get a truck close.', 'Our published rates: bathroom guts <strong>$500–$850</strong>, kitchens <strong>$750–$1,500</strong>, flooring tear-out <strong>$3 per square foot</strong>, and a full demo day with a two-man crew and dump truck at <strong>$2,500</strong>. Haul-off is included in all of it, the job minimum is $450, and we can usually mobilize in one to two days.'] },
      { q: 'Can I keep the slab?', a: ['Often, yes — and we do selective demolition specifically so you can. We take the structure down to whatever line your builder needs and leave the rest intact, rather than clearing everything because it is faster for us.', 'Tell us what the plans call for keeping and that is what stays.'] }
    ]
  },
  {
    slug: 'demolition-permits-load-bearing-walls',
    tag: 'permits',
    business: 'demo',
    nav: 'Permits & load-bearing walls',
    asked: '“Can I demolish a load-bearing wall myself, or do I need a licensed contractor and city permits? And what happens if you demolish without a permit?”',
    h1: 'Permits, Load-Bearing Walls, and Doing It Legally',
    promise: 'Walls down, permit pulled, inspection passed — without you learning your city\'s building code.',
    dek: 'What Bay Area cities require before a wall or a structure comes down, and what it costs when the work gets done without that paperwork.',
    metaDescription: 'What Bay Area cities require before a wall or a structure comes down, whether you can pull it yourself, and what unpermitted demolition costs later.',
    hero: '/images/ads/demo-m2-b.jpg',
    ctaText: 'Tell us the city and what is coming out. We will tell you what it needs before anything starts.',
    ctaLabel: 'Check what your city requires',
    qa: [
      { q: 'Can I take out a load-bearing wall myself?', a: ['Legally, a homeowner can pull a permit on their own residence in California. Practically, removing a bearing wall requires an engineered beam sized for the load, temporary shoring while the beam goes in, and an inspection — and the failure mode is the ceiling.', 'If you are not sure whether a wall is bearing, assume it is until someone checks. Walls running perpendicular to the ceiling joists usually are.'] },
      { q: 'Do I need a permit to tear down a garage or a shed?', a: ['A detached garage almost always requires a demolition permit. Sheds usually depend on square footage — many cities exempt structures under 120 square feet, but the threshold and the process vary city to city across the Bay Area.', 'Utility disconnects have to be signed off before demolition, and that lead time is what surprises people — not the permit itself. We pull the permit for you and schedule the inspections, so this is not a stack of paperwork you work out city by city on your own.'] },
      { q: 'What actually happens if the work gets done without one?', a: ['A stop-work order, a penalty that is commonly several times the original permit fee, and a requirement to open the finished work back up for inspection. The one that costs real money comes later: unpermitted work surfaces during resale and can either kill the sale or come straight off the price.', 'It is worth doing once, correctly, with the paperwork.'] }
    ]
  },
  {
    slug: 'diy-demo-went-wrong',
    tag: 'panic',
    business: 'demo',
    nav: 'Mid-project problems',
    asked: '“I started knocking down a wall and found heavy electrical wiring and plumbing inside — what do I do?”',
    h1: 'You Started the Demo and Hit a Problem',
    promise: 'Your project finished safely and the debris gone — without starting over or paying for it twice.',
    dek: 'Wiring in the wall, rot under the subfloor, a slab that will not break, more debris than you can haul. What to do right now, and how fast someone can finish it.',
    metaDescription: 'Wiring in the wall, rot under the subfloor, a slab that won’t break, more debris than you can haul. What to do right now, and how fast someone can finish it.',
    hero: '/images/ads/demo-m3-a.jpg',
    ctaText: 'We finish what other people started, and we do not make it weird. Send a photo of where you are.',
    ctaLabel: 'Get someone out',
    qa: [
      { q: 'There is wiring and plumbing inside the wall I opened. Now what?', a: ['Stop, and kill the circuit at the panel before anything else. Then find out what is in there: live romex can be rerouted by an electrician in a few hours, but a stack vent or a main drain line inside a wall changes the plan entirely and sometimes changes which wall you take out.', 'Do not cut anything you have not traced. This is the single most common reason a weekend demo becomes a three-week project.'] },
      { q: 'I found rot under the bathroom subfloor.', a: ['Rot means water has been running somewhere for a long time, so the first job is finding the source — usually a wax ring, a shower pan, or a supply line — before any new material goes down.', 'Rot also tends to be larger than what is visible. Once the surface is open, it is worth pulling the full extent of the damage rather than stopping at the stain.'] },
      { q: 'I have more debris than I can get rid of.', a: ['Do not put construction debris in the household bin and do not haul mixed loads to a transfer station without checking what they accept — drywall, concrete, and treated lumber are handled differently and are often surcharged.', 'We haul demolition debris same-day with dump fees included, whether or not we did the demolition. You do not have to hire us for the whole job to get the pile gone.'] },
      { q: 'Should I just rent a bobcat and finish it?', a: ['For a detached structure with clear space around it, equipment is the right call — but the danger is not the machine, it is what the machine is standing on and what is buried under it. Gas and electrical service to a garage is often shallower than people expect.', 'If you are asking the question, it is cheaper to have it done than to have it undone.'] }
    ]
  },
  {
    slug: 'asbestos-testing-before-demolition',
    tag: 'asbestos',
    business: 'demo',
    nav: 'Asbestos & old houses',
    asked: '“My house was built in 1968. Do I need an asbestos test before knocking down popcorn ceilings or plaster walls?”',
    h1: 'Asbestos Testing Before You Demo an Older House',
    promise: 'Tested, abated, and demolished on one schedule — without you managing a lab, an abatement crew, and a contractor.',
    dek: 'What needs testing in a pre-1980 home, how long results take, who is legally allowed to remove it, and how the demolition schedule works around all of it.',
    metaDescription: 'What needs testing in a pre-1980 home, how long lab results take, who is licensed to remove asbestos in California, and how the demolition schedule works around it.',
    hero: '/images/ads/demo-m4-a.jpg',
    ctaText: 'One call covers testing, licensed abatement through our partner, and the demolition after. No gaps to manage yourself.',
    ctaLabel: 'Plan an older-home demo',
    qa: [
      { q: 'My house is from the sixties. Does the popcorn ceiling need testing?', a: ['Yes — test before you scrape. Asbestos was used in ceiling texture, plaster, floor tile and the mastic under it, pipe and duct insulation, and roofing through the late 1970s and, in some products, into the eighties.', 'Testing is inexpensive relative to the project and it is the step that protects everyone in the house. Intact material that is not being disturbed is generally not a hazard; demolition is precisely the act of disturbing it.'] },
      { q: 'How long does testing take, and can demo start while we wait?', a: ['Lab turnaround is typically a few days, with rush options. Demolition on the suspect material cannot start until results are back — but work in unaffected areas of the house usually can, which is how we keep a schedule from slipping a week.', 'Locally we see two to three business days, with rush options when the schedule is tight. We sequence around it routinely.'] },
      { q: 'If asbestos is found, who removes it?', a: ['A licensed abatement contractor — in California, a C-22 licensee with the appropriate registration. Servant King is a C-21 demolition contractor, so we do not perform abatement ourselves; we bring in our C-22 partner, and we handle the coordination so you are not managing two contractors and a lab.', 'Abatement finishes, clearance comes back, and then we demo. One point of contact through the whole sequence.'] },
      { q: 'What if the property failed its environmental inspection?', a: ['That usually means the demolition permit is on hold until abatement is documented and closed out. The path forward is the same sequence — abate, get clearance, submit, then demo — and it is a schedule problem rather than a dead end.', 'Send us what the inspection flagged and we will map out the order of operations.'] }
    ]
  },
  {
    slug: 'commercial-interior-demolition-subcontractor',
    tag: 'commercial',
    business: 'demo',
    nav: 'GC & commercial TI',
    asked: '“How long does selective interior demolition take for a 5,000 sq ft office space, and how do I find a licensed C-21 sub with full insurance?”',
    h1: 'Interior Demolition for GCs and Property Managers',
    promise: 'Space stripped and broom-clean on your critical path — without chasing a sub who doesn\'t call back.',
    dek: 'Schedule, safety requirements in occupied buildings, and what to check before you put a demolition sub on a tenant improvement job.',
    metaDescription: 'Selective interior demolition for GCs and property managers: schedule, containment in occupied buildings, and what to check before hiring a C-21 sub.',
    hero: '/images/ads/demo-m5-b.jpg',
    ctaText: 'Send drawings or a scope and we will turn a number around fast. GCs keep us because we call back.',
    ctaLabel: 'Request a sub bid',
    qa: [
      { q: 'How long does 5,000 square feet of selective interior demo take?', a: ['Typically two to four days for a standard office build-out — ceiling grid, partitions, flooring, and casework — with the variables being after-hours restrictions, elevator and loading dock access, and whether MEP has to be preserved in place.', 'Scope moves that range more than square footage does — a strip-out with MEP staying live is a different job from an open demo. We schedule around your critical path, not ours. Tell us when the next trade needs the space.'] },
      { q: 'What does interior demo require in an occupied building?', a: ['Negative-air containment or hard barriers where dust could reach tenants, protected paths and floor protection through common areas, and work windows that keep noise off the neighboring suites during business hours.', 'In an active shopping center that usually means nights and weekends, which we work. Property management typically wants the containment plan and the insurance certificate before day one; both should arrive without being requested.'] },
      { q: 'What should I check before hiring a demolition sub?', a: ['A current C-21 license, general liability and workers\' comp at your required limits with the correct additional insured endorsement, and public works registration with the DIR if the job is prevailing wage.', 'Then ask a question that is not on the checklist: who is actually on site running the crew, and will the same people be there Thursday. That is what separates a schedule that holds from one that does not.'] },
      { q: 'What condition do you leave the space in?', a: ['Broom-clean, debris removed, and the space ready for the next trade — not a pile in the corner for someone else to deal with. Same-day haul-off is part of the scope rather than a change order.', 'Servant King Demolition, CSLB C-21 #1142322, licensed and insured, based in Walnut Creek and working across the Bay Area.'] }
    ]
  }
];

export function answerPageBySlug(slug: string): AnswerPage | undefined {
  return ANSWER_PAGES.find((p) => p.slug === slug);
}
