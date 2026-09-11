/**
 * /go/<slug> service landings — one page per Google Ads ad group.
 *
 * Same idea as the /answers mindset pages, pointed at a different moment.
 * /answers catches people mid-research ("how do I clear a hoarded house?").
 * These catch people who already know what they need ("hoarder cleanup near
 * me") and want three things answered fast: can you do exactly this, what
 * will it cost, and can I trust you. Each page opens on the thought in the
 * search, answers those three, and keeps a phone number in front of them.
 *
 * Page shape (Hormozi landing-page blueprint, adapted — see the build doc in
 * the Cowork project, google-ads-service-pages-plan-2026-09-10.md):
 *   hook headline → promise (outcome without the frustration) → "so that"
 *   line → call/text → pains ("sound familiar?") → tap-to-price sizer →
 *   everything in the flat price → 3-step plan → reviews → objection FAQ →
 *   the four guarantees → honest capacity line → call/text again.
 *
 * Deliberately NOT here: a value stack with invented dollar values, a fake
 * countdown, a form. Prices are the published Sep 3 bands only.
 *
 * Rules for editing:
 *  - Every claim has to be something the crew actually does. Prices come from
 *    the confirmed rate sheet ($149 min / $250–700 typical / $800–1,500 full
 *    truck). Capability claims: confirmed by Chris 2026-09-10. Do not add
 *    "unmarked trucks", "background-checked", or any certification unless
 *    Chris confirms it for this page.
 *  - Reviews are referenced by reviewer name from src/lib/reviews.ts. Never
 *    write a review here.
 *  - The phone number is NOT set here. The page shows (650) 502-5464 so
 *    Google's forwarding-number swap (GoogleAdsTag.tsx) can replace it for ad
 *    visitors. Do not add a utm_source=google override.
 *  - `slug` is the join key: one ad group → one page → `page` in the
 *    Go Events tab. Renaming a slug means updating that ad group's final URL.
 *  - Never use Servant King Demolition graphics on these pages.
 *  - Heroes are web-optimized 1400×1050 crops in public/images/go/<slug>.jpg,
 *    cut from real job photos in public/images (AI-generated images only where
 *    no real photo exists yet: appliance, storage unit, yard waste).
 */

export type SizerTile = { id: string; label: string; price: string };

export type ServiceLanding = {
  slug: string;
  /** Google Ads ad group this page serves (Campaign A, 349-173-6698). */
  adGroup: string;
  /** Short noun phrase, used in the prefilled text and alt text. */
  nav: string;
  eyebrow: string;
  /** Echoes the search. Message match is the whole point. */
  h1: string;
  /** Dream outcome without the top frustrations, with a timeframe where honest. */
  promise: string;
  /** Feature → benefit, joined with "so that". */
  soThat: string;
  hero: string;
  pains: string[];
  /** One line that turns from the pain to the offer. */
  painTurn: string;
  sizerQuestion: string;
  sizer: SizerTile[];
  /** Everything the flat price covers — the honest version of a value stack. */
  included: string[];
  steps: { title: string; detail: string }[];
  qa: { q: string; a: string }[];
  /** Reviewer names from src/lib/reviews.ts, category-matched. */
  reviews: string[];
  ctaLabel: string;
  smsBody: string;
  title: string;
  metaDescription: string;
};

/** Published price bands (Sep 3 rate sheet, approved for publishing). */
const P = {
  min: 'From $149',
  typical: '$250–$700',
  full: '$800–$1,500',
  multi: 'Priced per load from photos'
};

export const SERVICE_LANDINGS: ServiceLanding[] = [
  {
    slug: 'estate-cleanout',
    adGroup: 'Estate Cleanouts',
    nav: 'an estate cleanout',
    eyebrow: 'Estate & probate cleanouts',
    h1: 'Estate Cleanouts, Handled With Care',
    promise:
      'An empty, broom-clean house ready to list — without flying in, sorting it alone, or making a single dump run.',
    soThat:
      'We sort with you, set aside anything that looks important, donate what is still good, and haul the rest — so that the estate moves on your timeline, not the house’s.',
    hero: '/images/go/estate-cleanout.jpg',
    pains: [
      'Forty years of belongings, and every drawer needs a decision.',
      'You live out of state, and the listing date is not moving.',
      'Family can’t agree on what to keep — and nobody has a free weekend.',
      'The realtor wants it empty and photographed next week.'
    ],
    painTurn: 'You don’t have to do this alone, and you don’t have to be there for all of it.',
    sizerQuestion: 'How much is left in the house?',
    sizer: [
      { id: 'few', label: 'Just a few items', price: P.min },
      { id: 'rooms', label: 'A room or two', price: P.typical },
      { id: 'truck', label: 'About a full truck', price: P.full },
      { id: 'house', label: 'The whole house', price: P.multi }
    ],
    included: [
      'Sorting with you — keep, family, donate, haul',
      'Documents, keys and valuables set aside, never loaded',
      'Donation drop-off, with receipts for the estate',
      'All labor, loading and dump fees',
      'Before-and-after photos for your records',
      'Broom-clean finish, keys back to your realtor or lockbox'
    ],
    steps: [
      { title: 'Send photos or walk it on video', detail: 'A few photos of each room is enough. Ask and we walk the house with you on video.' },
      { title: 'Get a flat price and a date', detail: 'A real number, not a range, on a schedule that fits your closing date.' },
      { title: 'We clear it — you get the proof', detail: 'Keep pile protected, donations dropped, house swept. Photos and receipts sent to you.' }
    ],
    qa: [
      {
        q: 'Should we hold an estate sale first?',
        a: 'Only if there is real value in the house — good furniture, tools, jewelry, collectibles. A sale company typically takes 30–40% and two to three weeks on site. Send photos and we will tell you honestly which side of that line you are on. If the sale already happened, we clear what is left.'
      },
      {
        q: 'I live out of state. Can this happen without me?',
        a: 'Yes, and it is a large share of our estate work. We walk the house with you on video before anything moves so you approve the keep pile yourself, then send before-and-after photos and donation receipts. Keys go back to your realtor or the lockbox.'
      },
      {
        q: 'What if we are still looking for papers or valuables?',
        a: 'Tell us what you are hunting for. Anything that looks like deeds, titles, policies, keys, photos or jewelry goes on a set-aside table, not the truck.'
      },
      {
        q: 'How much does an estate cleanout cost?',
        a: 'Single items start at $149. A room or two usually lands between $250 and $700, and a full truck runs $800–$1,500. Whole-house estates are priced per load from photos — and the number is locked before we load.'
      }
    ],
    reviews: ['Debra L.', 'Valeria G.', 'Chris M.'],
    ctaLabel: 'Get your estate cleanout price',
    smsBody: 'Hi Servant King, I need an estate cleanout. Here are some photos:',
    title: 'Estate Cleanouts — Flat Price, Broom-Clean',
    metaDescription:
      'Estate and probate cleanouts across the SF Peninsula, San Jose and Tri-Valley. We sort, donate and haul — flat price locked before we load. Call or text a photo.'
  },
  {
    slug: 'hoarding-cleanup',
    adGroup: 'Hoarding Cleanups',
    nav: 'a hoarding cleanout',
    eyebrow: 'Hoarding cleanouts',
    h1: 'Hoarder Cleanouts, Without Judgment',
    promise:
      'A safe, livable house again, room by room — without a fight, without shame, and without you hauling a single bag.',
    soThat:
      'Our crews are trained and equipped for tough interiors and ask before anything unclear goes on the truck — so that your family gets through this and is still speaking afterward.',
    hero: '/images/go/hoarding-cleanup.jpg',
    pains: [
      'Narrow paths through the rooms, and exits you can’t reach.',
      'A parent who panics the moment anyone touches a pile.',
      'Smells, pests or water damage you are worried about behind the stacks.',
      'A landlord, a sale or a deadline — and no idea where to start.'
    ],
    painTurn: 'We have done these before. We go at the pace the house — and the person — can handle.',
    sizerQuestion: 'How much of the house is affected?',
    sizer: [
      { id: 'room', label: 'A room or a hallway', price: P.typical },
      { id: 'truck', label: 'About a truckload', price: P.full },
      { id: 'several', label: 'Several rooms', price: P.multi },
      { id: 'house', label: 'The whole house', price: 'A full 2,500 sq ft home is commonly 8–12 loads' }
    ],
    included: [
      'Protective gear and containment for contaminated rooms',
      'Sorting as we go — keep, ask, donate, haul',
      'A set number of veto items per room, honored',
      'All labor, loading and disposal routing',
      'Broom-clean finish, room by room',
      'A load count and flat price before we arrive'
    ],
    steps: [
      { title: 'Tell us what you’re facing', detail: 'Call to talk it through, or text photos of each room — closets included.' },
      { title: 'Get a load count and a flat price', detail: 'Before we show up, not after. It does not move once we start.' },
      { title: 'We clear it room by room', detail: 'Starting where it is easiest to win. Anything unclear, we ask first.' }
    ],
    qa: [
      {
        q: 'How do we do this without it turning into a fight?',
        a: 'Start with a room your parent does not use every day and finish it completely — one finished room builds more trust than a day of arguing about the whole house. Give them veto power over a set number of items per room and honor it. Our crews ask before anything ambiguous goes on the truck.'
      },
      {
        q: 'Is it safe — for us and for your crew?',
        a: 'Rodent contamination, mold and spoiled food are not a reason we walk away. Our crews are trained and equipped for contaminated interiors: protective gear, containment, and the disposal routing that goes with it. Tell us what you are seeing and we will tell you straight whether it is within what we do.'
      },
      {
        q: 'How many truckloads will it take?',
        a: 'A heavily filled 2,500 sq ft home commonly runs eight to twelve loads. Everyone underestimates volume from inside the house, so send photos of every room and we give you a load count and a price before we come.'
      },
      {
        q: 'Can we keep things?',
        a: 'Yes. Tell us what matters and it gets set aside, not loaded. Nothing ambiguous leaves without a yes.'
      }
    ],
    reviews: ['Debra L.', 'Jennifer H.', 'Nathan T.'],
    ctaLabel: 'Talk through your situation',
    smsBody: 'Hi Servant King, I need help with a hoarding cleanout. Here are some photos:',
    title: 'Hoarder Cleanouts, Without Judgment',
    metaDescription:
      'Compassionate hoarder cleanouts on the SF Peninsula, San Jose and Tri-Valley. Crews equipped for contaminated interiors, flat price before we arrive. Call or text.'
  },
  {
    slug: 'construction-debris',
    adGroup: 'Construction Debris',
    nav: 'construction debris hauling',
    eyebrow: 'Construction & remodel debris',
    h1: 'Construction Debris Hauling, No Dumpster Needed',
    promise:
      'Drywall, tile, lumber and fixtures gone — without renting a roll-off, pulling a street permit, or losing a day to dump runs.',
    soThat:
      'We load it from where it sits, pull out the recyclables and sweep up — so that your crew stays on the work that pays and the driveway never hosts a dumpster.',
    hero: '/images/go/construction-debris.jpg',
    pains: [
      'A demo pile that grows every day the dumpster doesn’t show.',
      'A roll-off you’ll fill two-thirds of — and pay for all of.',
      'An HOA or a city that won’t allow a container on the street.',
      'Tile and concrete that blow through a dumpster’s weight limit.'
    ],
    painTurn: 'With a crew you pay for the space your load takes — not the half of a box you never fill.',
    sizerQuestion: 'How big is the pile?',
    sizer: [
      { id: 'small', label: 'A few pieces', price: P.min },
      { id: 'half', label: 'About half a truck', price: P.typical },
      { id: 'full', label: 'A full truck', price: P.full },
      { id: 'heavy', label: 'Concrete, tile or dirt', price: 'Priced by weight — send a photo' }
    ],
    included: [
      'All loading — carried from wherever it sits',
      'Drywall, lumber, tile, flooring, cabinets, fixtures, metal',
      'Recycling for metal, concrete and clean wood',
      'Dump fees included',
      'Sweep-up once the truck is loaded',
      'One pickup, or clean-as-you-go on your schedule'
    ],
    steps: [
      { title: 'Text a photo of the pile', detail: 'Plus the address and when you need it gone.' },
      { title: 'Get a flat price', detail: 'By volume; heavy material by weight. Locked before we load.' },
      { title: 'We haul it and sweep up', detail: 'End of job, or on a schedule while the work continues.' }
    ],
    qa: [
      {
        q: 'Is this cheaper than a dumpster?',
        a: 'Sometimes not, and we will say so. A 10-yard roll-off in the South Bay runs around $430 for seven days with a one-to-two-ton allowance, and overage runs roughly $150 a ton. If you will genuinely fill it and load it yourself, it is competitive. If you would fill two-thirds, you paid for a third of a box you never used — plus every hour of loading.'
      },
      {
        q: 'What do you take?',
        a: 'Drywall, lumber, tile, flooring, cabinets, fixtures, roofing, metal and mixed remodel debris. Concrete, dirt and tile are accepted and priced by weight. Tell us about anything that might contain asbestos before we come — it has to be tested first.'
      },
      {
        q: 'Do you work with contractors?',
        a: 'Yes. Contractor-friendly scheduling, clean-as-you-go or end-of-job pickups, and disposal documentation when your job needs it.'
      },
      {
        q: 'Can you do the tear-out too?',
        a: 'Yes, through our demolition company, Servant King Demolition — licensed CSLB C-21, and we pull the permit. Mention it when you call.'
      }
    ],
    reviews: ['Chris M.', 'Valeria G.', 'Nathan T.'],
    ctaLabel: 'Get your debris price',
    smsBody: 'Hi Servant King, I need construction debris hauled. Here is a photo of the pile:',
    title: 'Construction Debris Hauling, No Dumpster',
    metaDescription:
      'Remodel and construction debris hauled from the SF Peninsula, San Jose and Tri-Valley. No roll-off, no permit, dump fees included. Text a photo for a price.'
  },
  {
    slug: 'garage-cleanout',
    adGroup: 'Garage Cleanouts',
    nav: 'a garage cleanout',
    eyebrow: 'Garage cleanouts',
    h1: 'Get Your Garage Back',
    promise:
      'Park in your garage again — cleared, sorted and swept in a single visit, without renting a dumpster or giving up another weekend.',
    soThat:
      'We sort as we load, set aside what you want to keep, donate what is still good and haul the rest — so that the car goes back where it belongs.',
    hero: '/images/go/garage-cleanout.jpg',
    pains: [
      'The car has lived in the driveway for a year.',
      'Boxes from the last move that never got opened.',
      'Old furniture, paint cans and exercise gear nobody uses.',
      'Every free Saturday you meant to deal with it.'
    ],
    painTurn: 'One visit. You point, we lift.',
    sizerQuestion: 'How full is the garage?',
    sizer: [
      { id: 'few', label: 'A corner, a few items', price: P.min },
      { id: 'half', label: 'About half full', price: P.typical },
      { id: 'packed', label: 'Wall to wall', price: P.full },
      { id: 'more', label: 'Garage plus attic or more', price: P.multi }
    ],
    included: [
      'All the lifting, carrying and loading',
      'Sorting with you as we go',
      'Donation drop-off for anything still good',
      'Dump fees included',
      'Swept clean when we leave',
      'Driveway protection when it’s needed'
    ],
    steps: [
      { title: 'Text a photo of the garage', detail: 'One wide shot from the driveway is usually enough.' },
      { title: 'Get a flat price', detail: 'A real number back, usually in minutes. Locked before we load.' },
      { title: 'We clear it and sweep', detail: 'Most garages in one afternoon. You point at what stays.' }
    ],
    qa: [
      {
        q: 'How long does it take?',
        a: 'A packed three-car garage is typically one afternoon. Smaller garages are often done the same day you call.'
      },
      {
        q: 'Do I have to sort everything first?',
        a: 'No. Point at what stays. We ask about anything unclear and set aside whatever you want to look through.'
      },
      {
        q: 'What about paint cans and chemicals?',
        a: 'Tell us what is there. Paint, solvents and batteries are handled separately from the rest of the load, and we route each one where it belongs — you do not have to learn the rules.'
      },
      {
        q: 'Wouldn’t a dumpster be cheaper?',
        a: 'For some jobs it is, and we will tell you. For most garages it is not: with a crew you only pay for the space your load takes, and the labor, dump fees and sweep-up are already in the price.'
      }
    ],
    reviews: ['Chris M.', 'Domonique M.', 'Gage'],
    ctaLabel: 'Get your garage price',
    smsBody: 'Hi Servant King, I need a garage cleanout. Here is a photo:',
    title: 'Garage Cleanouts — One Visit, Flat Price',
    metaDescription:
      'Garage cleanouts on the SF Peninsula, San Jose and Tri-Valley. We sort, donate and haul in one visit, swept clean. Text a photo, get a flat price in minutes.'
  },
  {
    slug: 'house-cleanout',
    adGroup: 'Whole-House Cleanouts',
    nav: 'a whole-house cleanout',
    eyebrow: 'Whole-house cleanouts',
    h1: 'Whole-House Cleanouts, Every Room',
    promise:
      'A completely empty, broom-clean house — most homes in one to two days — without renting a dumpster, making dump runs or lifting a single box.',
    soThat:
      'One crew clears every room, attic to garage, donating what is still good along the way — so that you can sell, rent, renovate or move in on schedule.',
    hero: '/images/go/house-cleanout.jpg',
    pains: [
      'Every room is full, and you don’t know where to start.',
      'A sale, a renovation or a new tenant on a fixed date.',
      'Far too much for one weekend and a borrowed truck.',
      'Quotes that sound cheap, then change once the truck is loaded.'
    ],
    painTurn: 'A flat price, locked before we load — and a house that is empty when we leave.',
    sizerQuestion: 'How much needs to go?',
    sizer: [
      { id: 'rooms', label: 'A room or two', price: P.typical },
      { id: 'truck', label: 'About a full truck', price: P.full },
      { id: 'house', label: 'The whole house', price: P.multi }
    ],
    included: [
      'Every room, closet, attic, garage and yard',
      'Sorting and donation drop-off',
      'All labor, loading and dump fees',
      'Floor and driveway protection when needed',
      'Before-and-after photos',
      'Broom-clean finish'
    ],
    steps: [
      { title: 'Send photos of each room', detail: 'Or book a walkthrough. Closets and garage included.' },
      { title: 'Get a flat price and a date', detail: 'A real number, locked before we load. It does not move on the day.' },
      { title: 'We clear every room', detail: 'Most single-family homes in one to two days. Swept when we leave.' }
    ],
    qa: [
      {
        q: 'How long does a whole house take?',
        a: 'Most single-family homes take one to two days. Larger homes, or homes where family still needs to walk through first, can run three to four.'
      },
      {
        q: 'Will the price change once you see it?',
        a: 'No. We price from photos or a walkthrough, and the number is locked before we load.'
      },
      {
        q: 'What happens to furniture that is still good?',
        a: 'Donation first. What is still usable goes to local charities, what can be recycled is, and the rest goes to a licensed transfer station.'
      },
      {
        q: 'Can you coordinate with my realtor or property manager?',
        a: 'Yes. We schedule around their dates, and keys go back to them or the lockbox when we are done.'
      }
    ],
    reviews: ['Valeria G.', 'Chris M.', 'Jim L.'],
    ctaLabel: 'Get your whole-house price',
    smsBody: 'Hi Servant King, I need a whole-house cleanout. Here are some photos:',
    title: 'Whole-House Cleanouts — Flat Price',
    metaDescription:
      'Whole-house cleanouts on the SF Peninsula, San Jose and Tri-Valley. Every room cleared, donation first, broom-clean. Flat price locked before we load.'
  },
  {
    slug: 'move-out',
    adGroup: 'Move-Out Cleanouts',
    nav: 'a move-out haul',
    eyebrow: 'Move-out junk removal',
    h1: 'Moving Out? We Haul What You’re Leaving',
    promise:
      'An empty, swept place before your walkthrough — without renting a truck, making dump runs or losing moving day to junk.',
    soThat:
      'Tell us your move-out date and we schedule around it — so that the only thing on your mind on moving day is the new place.',
    hero: '/images/go/move-out.jpg',
    pains: [
      'Furniture that won’t fit in the new place.',
      'Paying movers by the hour to carry things you don’t even want.',
      'A walkthrough, a closing or new owners on a fixed day.',
      'The garage you’ve been ignoring since you moved in.'
    ],
    painTurn: 'Book the haul before the move. We work around your date.',
    sizerQuestion: 'How much is staying behind?',
    sizer: [
      { id: 'few', label: 'A few items', price: P.min },
      { id: 'half', label: 'About half a truck', price: P.typical },
      { id: 'full', label: 'A full truck', price: P.full },
      { id: 'more', label: 'More than one load', price: P.multi }
    ],
    included: [
      'Furniture, mattresses, appliances, boxes — whatever isn’t coming',
      'Carried out from any room, any floor',
      'Donation drop-off for anything still good',
      'Dump fees included',
      'Swept clean when we leave',
      'Scheduled around your move-out date'
    ],
    steps: [
      { title: 'Text a photo of what’s staying', detail: 'Plus your move-out date.' },
      { title: 'Get a flat price and a slot', detail: 'Before the movers or after them — your call.' },
      { title: 'We haul it and sweep', detail: 'The place is empty and swept for your walkthrough.' }
    ],
    qa: [
      {
        q: 'Should you come before or after the movers?',
        a: 'Before usually saves money: haul the junk first and you are not paying movers to carry it. Or come after, and we clear whatever is left.'
      },
      {
        q: 'How soon can you come?',
        a: 'Same-day slots are often open. We run four jobs a day, six days a week, and Mondays and Saturdays fill first — so if your date is fixed, book early.'
      },
      {
        q: 'Do you do move-out cleaning?',
        a: 'We are not a cleaning service. We clear everything out and sweep up, so your cleaner walks into an empty place.'
      },
      {
        q: 'Wouldn’t a dumpster be cheaper?',
        a: 'For some jobs it is, and we will tell you. With a crew you pay only for the space your load takes, nothing sits in the driveway overnight, and the loading is done for you.'
      }
    ],
    reviews: ['Domonique M.', 'Chris M.', 'Jim L.'],
    ctaLabel: 'Get your move-out price',
    smsBody: 'Hi Servant King, I am moving out and need some things hauled. Here is a photo:',
    title: 'Move-Out Junk Removal — Flat Price',
    metaDescription:
      'Moving out on the SF Peninsula, San Jose or Tri-Valley? We haul what you are leaving and sweep up before your walkthrough. Text a photo for a flat price.'
  },
  // ── Wave 2 (drafted Sep 10, 2026) ────────────────────────────────────────
  {
    slug: 'hot-tub-removal',
    adGroup: 'Hot Tub Removal',
    nav: 'a hot tub removal',
    eyebrow: 'Hot tub & spa removal',
    h1: 'Hot Tub Removal, Gone in One Visit',
    promise:
      'Your backyard back — the tub drained, cut down and hauled away in a single trip, without renting a dumpster or wrestling it through the side gate yourself.',
    soThat:
      'Our crews drain it, cut it into pieces that fit through a 36-inch gate and carry every one out — so that the only thing left is the pad.',
    hero: '/images/go/hot-tub-removal.jpg',
    pains: [
      'It hasn’t worked in years, and it’s still taking up the patio.',
      'The cover is shot and the water has turned green.',
      'It’s too big for the gate — nobody remembers how it got in.',
      'You’re listing soon, and it’s the first thing buyers will see.'
    ],
    painTurn: 'It came in in one piece. It leaves in several — in one visit.',
    sizerQuestion: 'Send one photo of the tub and the path to the street',
    sizer: [],
    included: [
      'Draining the tub',
      'Cutting it down on-site',
      'Carrying every piece through the gate',
      'Steps, cover and equipment hauled too',
      'Fiberglass shell recycled when possible',
      'Dump fees and sweep-up included'
    ],
    steps: [
      { title: 'Text a photo of the tub', detail: 'One of the tub, one of the way out to the street.' },
      { title: 'Get a flat price', detail: 'Size, access and whether it sits in a deck decide it. Locked before we cut.' },
      { title: 'We drain, cut and haul', detail: 'In one visit. Same-day and next-day slots are often open.' }
    ],
    qa: [
      {
        q: 'How do you get it out?',
        a: 'We drain it, cut the shell into sections on-site, and carry them out. Our crews are small enough to work through a standard 36-inch side gate, so nothing needs a crane or a fence panel removed.'
      },
      {
        q: 'Can you take the deck or pad too?',
        a: 'Yes. Deck and pad removal is available as an add-on — mention it when you send the photo so it is in the price.'
      },
      {
        q: 'What do I need to do before you come?',
        a: 'Tell us how it is wired and powered when you text the photo. We will tell you exactly what needs to happen before we arrive.'
      },
      {
        q: 'What does hot tub removal cost?',
        a: 'Every tub is priced flat from a photo, because size, access and whether it is set into a deck change the job. The number you get is the number you pay — it is locked before we cut.'
      }
    ],
    reviews: ['Domonique M.', 'Chris M.', 'Gage'],
    ctaLabel: 'Get your hot tub price',
    smsBody: 'Hi Servant King, I need a hot tub removed. Here is a photo:',
    title: 'Hot Tub Removal — One Visit, Flat Price',
    metaDescription:
      'Hot tub and spa removal on the SF Peninsula, San Jose and Tri-Valley. Drained, cut down and hauled in one visit through a 36-inch gate. Text a photo for a flat price.'
  },
  {
    slug: 'shed-removal',
    adGroup: 'Shed & Playset Removal',
    nav: 'a shed or playset removal',
    eyebrow: 'Shed & playset removal',
    h1: 'Shed & Playset Removal',
    promise:
      'The old shed or playset gone — taken apart, hauled and the ground swept, without a weekend with a sledgehammer or a dumpster in the driveway.',
    soThat:
      'We clear what’s inside, take the structure down, and load every panel, beam and bolt — so that the space is ready for whatever comes next.',
    hero: '/images/go/shed-removal.jpg',
    pains: [
      'A rotting shed full of things nobody wants.',
      'A playset the kids outgrew years ago — splinters and all.',
      'A leaking roof, a lean, and a home for rodents.',
      'You want the space back for a garden, a patio or an ADU.'
    ],
    painTurn: 'Emptied, taken down and hauled — in one visit.',
    sizerQuestion: 'Send a photo of the structure',
    sizer: [],
    included: [
      'Clearing what’s inside',
      'Taking the structure down',
      'Wood, metal and resin sheds, playsets and swing sets',
      'Carports and small outbuildings',
      'Concrete slab removal available',
      'Dump fees and sweep-up included'
    ],
    steps: [
      { title: 'Text a photo', detail: 'Of the structure and what’s inside it.' },
      { title: 'Get a flat price', detail: 'Locked before we start. Slab removal priced separately if you want it.' },
      { title: 'We take it down and haul it', detail: 'Contents and structure in the same visit.' }
    ],
    qa: [
      {
        q: 'Do I need a permit?',
        a: 'It depends on the structure and your city. Send a photo and the address and we will tell you. When a permit is needed, we pull it — Servant King is licensed CSLB C-21.'
      },
      {
        q: 'Can you take what’s inside too?',
        a: 'Yes. We clear the contents and take the structure down in the same visit, so you are not scheduling two jobs.'
      },
      {
        q: 'What about the concrete slab?',
        a: 'Slab removal is available. Concrete is heavy, so it is priced by weight — ask for it with your photo and it goes in the same flat price.'
      },
      {
        q: 'Do you do detached garages and carports?',
        a: 'Yes — carports, detached garages and small outbuildings, as well as wood, metal and resin sheds.'
      }
    ],
    reviews: ['Chris M.', 'Gage', 'Jim L.'],
    ctaLabel: 'Get your shed price',
    smsBody: 'Hi Servant King, I need a shed or playset taken down and hauled. Here is a photo:',
    title: 'Shed & Playset Removal — Flat Price',
    metaDescription:
      'Shed, playset and carport removal on the SF Peninsula, San Jose and Tri-Valley. Contents cleared, structure taken down and hauled. Licensed CSLB C-21.'
  },
  {
    slug: 'furniture-removal',
    adGroup: 'Furniture Removal',
    nav: 'a furniture removal',
    eyebrow: 'Furniture removal',
    h1: 'Furniture Removal, Carried Out for You',
    promise:
      'The couch, sectional or bedroom set gone today or tomorrow — without borrowing a truck, scraping the walls, or waiting weeks for a buyer.',
    soThat:
      'We carry it from any room and any floor, take it apart when it won’t fit the door, and donate what’s still good — so that you never lift a thing.',
    hero: '/images/go/furniture-removal.jpg',
    pains: [
      'A sectional that won’t fit down the stairs.',
      'Listed on Marketplace for a month — no takers.',
      'New furniture arriving, and the old set has nowhere to go.',
      'A second-floor bedroom set and a bad back.'
    ],
    painTurn: 'Point at it. It’s gone.',
    sizerQuestion: 'How much furniture?',
    sizer: [
      { id: 'one', label: 'One piece', price: 'From $149' },
      { id: 'few', label: 'A few pieces or a room', price: '$250–$700' },
      { id: 'truck', label: 'A full truck', price: '$800–$1,500' }
    ],
    included: [
      'Carried from any room, any floor',
      'Taken apart on-site when it won’t fit',
      'Donation when it’s in good condition',
      'Recycling for what can’t be donated',
      'Dump fees included',
      'Swept clean when we leave'
    ],
    steps: [
      { title: 'Text a photo', detail: 'Of the pieces, and tell us the floor.' },
      { title: 'Get a flat price', detail: 'Usually in minutes. Locked before we load.' },
      { title: 'We carry it out', detail: 'Same-day or next-day for most calls.' }
    ],
    qa: [
      {
        q: 'Will you take it apart?',
        a: 'Yes. If a sectional or bed frame won’t make the turn, we take it apart on-site rather than scraping it through.'
      },
      {
        q: 'Do you donate furniture?',
        a: 'Donation first when it’s in good condition. What can’t be donated is recycled where it can be, and the rest goes to a licensed transfer station.'
      },
      {
        q: 'How soon can you come?',
        a: 'Same-day or next-day for most calls. Mondays and Saturdays fill first.'
      },
      {
        q: 'What does removing one couch cost?',
        a: 'Single items start at $149. Send a photo and you get your exact flat price back, usually in minutes.'
      }
    ],
    reviews: ['Jennifer H.', 'Domonique M.', 'Nathan T.'],
    ctaLabel: 'Get your furniture price',
    smsBody: 'Hi Servant King, I need some furniture removed. Here is a photo:',
    title: 'Furniture Removal — From $149',
    metaDescription:
      'Couch, sectional and furniture removal on the SF Peninsula, San Jose and Tri-Valley. Carried from any floor, donation first. Single items from $149.'
  },
  {
    slug: 'mattress-disposal',
    adGroup: 'Mattress Disposal',
    nav: 'a mattress pickup',
    eyebrow: 'Mattress disposal',
    h1: 'Mattress Disposal, Picked Up From Your Bedroom',
    promise:
      'The old mattress out of the house — without dragging it down the stairs, strapping it to a car, or finding a drop-off that’s open.',
    soThat:
      'We carry it out from any floor and handle it the way California’s mattress recovery law requires — so that it doesn’t end up on a curb.',
    hero: '/images/go/mattress-disposal.jpg',
    pains: [
      'It won’t fit in the car, and the drop-off is across town.',
      'The new mattress arrives this week.',
      'A king, a narrow hallway and a flight of stairs.',
      'Nobody wants it, and it can’t go out with the trash.'
    ],
    painTurn: 'We carry it out. You go back to your day.',
    sizerQuestion: 'How many beds?',
    sizer: [
      { id: 'one', label: 'One mattress or set', price: 'From $149' },
      { id: 'more', label: 'Mattresses plus other furniture', price: '$250–$700' }
    ],
    included: [
      'Any size, twin to California king',
      'Box springs, toppers and frames too',
      'Carried out from any floor',
      'Handled under California’s mattress recovery rules',
      'Dump fees included',
      'Same-day slots often open'
    ],
    steps: [
      { title: 'Text a photo', detail: 'Tell us the size and the floor.' },
      { title: 'Get a flat price', detail: 'Single items start at $149.' },
      { title: 'We carry it out', detail: 'Box spring and frame included if you want them gone.' }
    ],
    qa: [
      {
        q: 'Can’t I just drop it off for free?',
        a: 'Often, yes — California’s mattress recovery program runs free drop-off sites, and if you can get it there, that is the cheapest option. We are for when you would rather not haul it yourself.'
      },
      {
        q: 'Box spring and frame too?',
        a: 'Yes — box springs, toppers and bed frames, any size.'
      },
      {
        q: 'How soon can you come?',
        a: 'Same-day slots are often open, and next-day almost always. Mondays and Saturdays fill first.'
      },
      {
        q: 'What does it cost?',
        a: 'Single items start at $149. More beds, or a mattress plus other furniture, usually land in the $250–$700 range.'
      }
    ],
    reviews: ['Jennifer H.', 'Chris M.', 'Nathan T.'],
    ctaLabel: 'Get your mattress price',
    smsBody: 'Hi Servant King, I need a mattress picked up. Here is a photo:',
    title: 'Mattress Disposal & Pickup — From $149',
    metaDescription:
      'Mattress, box spring and bed frame pickup on the SF Peninsula, San Jose and Tri-Valley. Carried from any floor. Single items from $149.'
  },
  {
    slug: 'appliance-removal',
    adGroup: 'Appliance Removal',
    nav: 'an appliance removal',
    eyebrow: 'Appliance removal',
    h1: 'Appliance Removal: Fridge, Washer, Dryer, Gone',
    promise:
      'The old fridge or washer out of the kitchen or laundry room — without renting a dolly, scratching the floors, or waiting on a store pickup.',
    soThat:
      'We carry it out of tight kitchens and upstairs laundry rooms and route it to metal recycling, with refrigerant recovered the way the EPA requires — so that it’s gone and done right.',
    hero: '/images/go/appliance-removal.jpg',
    pains: [
      'The new one is coming, and the old one has to go first.',
      'A dead fridge in the garage that stopped working years ago.',
      'A washer and dryer on the second floor.',
      'You can’t put a refrigerator out with the trash.'
    ],
    painTurn: 'We do the heavy lifting. You pick the day.',
    sizerQuestion: 'How many appliances?',
    sizer: [
      { id: 'one', label: 'One appliance', price: 'From $149' },
      { id: 'more', label: 'A few, plus other junk', price: '$250–$700' }
    ],
    included: [
      'Fridge, freezer, washer, dryer, stove, dishwasher, microwave',
      'Carried out of tight spaces and upstairs',
      'Refrigerant recovered the way the EPA requires',
      'Metal recycling, not landfill',
      'Floor protection when it’s needed',
      'Dump fees included'
    ],
    steps: [
      { title: 'Text a photo', detail: 'Tell us what it is and where it sits.' },
      { title: 'Get a flat price', detail: 'Single items start at $149.' },
      { title: 'We carry it out', detail: 'Same-day slots are often open.' }
    ],
    qa: [
      {
        q: 'Do you take refrigerators and freezers?',
        a: 'Yes. Refrigerant is recovered the way the EPA requires, and the unit goes to metal recycling.'
      },
      {
        q: 'Do I need to disconnect it first?',
        a: 'Unplug it and, for a washer, shut the water off. If it is gas or hardwired, tell us when you send the photo and we will tell you what has to happen before we arrive.'
      },
      {
        q: 'Can you get it out of a tight kitchen or upstairs laundry?',
        a: 'Yes — tight kitchens, stairs and second-floor laundry rooms are routine. Ask for floor protection and we lay it down.'
      },
      {
        q: 'What does it cost?',
        a: 'Single items start at $149. A few appliances plus other junk usually land in the $250–$700 range.'
      }
    ],
    reviews: ['Nathan T.', 'Chris M.', 'Jim L.'],
    ctaLabel: 'Get your appliance price',
    smsBody: 'Hi Servant King, I need an appliance removed. Here is a photo:',
    title: 'Appliance Removal — From $149',
    metaDescription:
      'Fridge, washer, dryer and stove removal on the SF Peninsula, San Jose and Tri-Valley. Refrigerant recovered, metal recycled. Single items from $149.'
  },
  {
    slug: 'office-cleanout',
    adGroup: 'Office Cleanouts',
    nav: 'an office cleanout',
    eyebrow: 'Office cleanouts & furniture removal',
    h1: 'Office Cleanouts & Furniture Removal',
    promise:
      'Desks, cubicles and conference rooms cleared by your move-out date — after hours if you need it — without shutting down the floor or missing the lease deadline.',
    soThat:
      'We work around your building’s freight elevator and after-hours windows and hand you disposal documentation — so that facilities signs off and moves on.',
    hero: '/images/go/office-cleanout.jpg',
    pains: [
      'The lease ends on the 31st, and the space is still full of desks.',
      'Cubicles nobody will buy and nobody will take.',
      'Building management wants it done after hours.',
      'Old monitors and printers that can’t go in the dumpster.'
    ],
    painTurn: 'One crew, your schedule, and paperwork your landlord accepts.',
    sizerQuestion: 'How big is the job?',
    sizer: [
      { id: 'few', label: 'A few desks and chairs', price: '$250–$700' },
      { id: 'truck', label: 'A small office (a full truck)', price: '$800–$1,500' },
      { id: 'floor', label: 'A full floor or cubicle farm', price: 'Priced per load from a walkthrough' }
    ],
    included: [
      'Cubicles, desks, chairs, conference tables, filing cabinets',
      'After-hours and weekend crews',
      'Freight elevator times coordinated with the building',
      'IT equipment to e-waste-compliant recycling',
      'Donation first for usable furniture',
      'Disposal documentation for your landlord or PM'
    ],
    steps: [
      { title: 'Send photos or book a walkthrough', detail: 'Plus your building’s move-out rules and dates.' },
      { title: 'Get a flat price and a window', detail: 'After hours or weekends if the building requires it.' },
      { title: 'We clear it and document it', detail: 'Disposal paperwork handed over when we are done.' }
    ],
    qa: [
      {
        q: 'Can you work after hours or on weekends?',
        a: 'Yes. We schedule around your building’s freight elevator and after-hours rules so the floor never has to shut down.'
      },
      {
        q: 'What happens to computers and monitors?',
        a: 'IT equipment goes to e-waste-compliant recycling. If drives need wiping or destroying, handle that before pickup or ask us about it when you call.'
      },
      {
        q: 'Can you send a certificate of insurance?',
        a: 'Yes — licensed and insured, CSLB C-21 #1142322, and we send the certificate before the job without being chased for it.'
      },
      {
        q: 'What about taking out walls or flooring?',
        a: 'That is tenant-improvement demolition, handled by Servant King Demolition (CSLB C-21). Mention it when you call and we will scope both together.'
      }
    ],
    reviews: ['Valeria G.', 'Nathan T.', 'Chris M.'],
    ctaLabel: 'Get your office cleanout price',
    smsBody: 'Hi Servant King, I need an office cleanout. Here are some photos:',
    title: 'Office Cleanouts & Furniture Removal',
    metaDescription:
      'Office cleanouts and cubicle removal on the SF Peninsula, San Jose and Tri-Valley. After-hours crews, e-waste handled, disposal documentation provided.'
  },
  {
    slug: 'storage-unit-cleanout',
    adGroup: 'Storage Unit Cleanouts',
    nav: 'a storage unit cleanout',
    eyebrow: 'Storage unit cleanouts',
    h1: 'Storage Unit Cleanouts: Stop Paying Rent on It',
    promise:
      'The unit emptied and swept for move-out — without renting a truck, losing a weekend to boxes, or paying for another month.',
    soThat:
      'We sort on-site into keep, donate and haul, and leave the unit broom-clean for the facility — so that the rent stops this month.',
    hero: '/images/go/storage-unit-cleanout.jpg',
    pains: [
      'Paying every month for things you haven’t seen in years.',
      'A parent’s unit, and you live out of state.',
      'You bought a unit at auction and need it cleared fast.',
      'The facility’s move-out deadline is this week.'
    ],
    painTurn: 'One visit. The unit is empty and the rent stops.',
    sizerQuestion: 'What size is the unit?',
    sizer: [
      { id: 'few', label: 'Just a few items', price: 'From $149' },
      { id: 'small', label: '5×5 or 5×10', price: '$250–$700' },
      { id: 'mid', label: '10×10', price: '$800–$1,500' },
      { id: 'large', label: '10×15 to 10×30', price: 'Priced per load from photos' }
    ],
    included: [
      'On-site sorting: keep, donate, haul',
      'Donation drop-off, with receipts when applicable',
      'All loading and dump fees',
      'Units up to 10×30',
      'Broom-clean for the facility',
      'Same-day for smaller units'
    ],
    steps: [
      { title: 'Text a photo of the unit', detail: 'With the door open, plus the facility address.' },
      { title: 'Get a flat price', detail: 'Locked before we load.' },
      { title: 'We empty it and sweep', detail: 'We text you when it’s clear.' }
    ],
    qa: [
      {
        q: 'Do I need to be there?',
        a: 'Not always. Ask the facility to add us to your access list, tell us what to keep, and we text you when the unit is empty.'
      },
      {
        q: 'Can you clear an auction unit fast?',
        a: 'Yes. Auction units usually come with a short clock, so tell us your deadline and we schedule to it.'
      },
      {
        q: 'What about things worth keeping or donating?',
        a: 'We sort on-site. Your keep pile stays with you, usable items go to donation with receipts when applicable, and the rest is hauled.'
      },
      {
        q: 'What does a storage unit cleanout cost?',
        a: 'A full 5×10 usually lands between $250 and $700, and a full 10×10 runs $800–$1,500. Bigger units are priced per load from photos, locked before we load.'
      }
    ],
    reviews: ['Valeria G.', 'Chris M.', 'Jim L.'],
    ctaLabel: 'Get your storage unit price',
    smsBody: 'Hi Servant King, I need a storage unit cleaned out. Here is a photo:',
    title: 'Storage Unit Cleanouts — Flat Price',
    metaDescription:
      'Storage unit cleanouts on the SF Peninsula, San Jose and Tri-Valley. Sorted on-site, donation first, broom-clean for move-out. Units up to 10×30.'
  },
  {
    slug: 'yard-waste',
    adGroup: 'Yard Waste Removal',
    nav: 'a yard waste pickup',
    eyebrow: 'Yard waste & brush removal',
    h1: 'Yard Waste & Brush Removal',
    promise:
      'Branches, brush and the pile behind the fence gone — without overfilling the green bin for months or renting a trailer.',
    soThat:
      'We load it, rake up after, and send what we can to mulch and compost — so that the yard is clean before next weekend.',
    hero: '/images/go/yard-waste.jpg',
    pains: [
      'The green bin fills in ten minutes and the pile is still there.',
      'Tree work left a mountain of branches.',
      'A side yard nobody has touched in years.',
      'Old sod, dirt and broken concrete from a landscaping project.'
    ],
    painTurn: 'Bigger than the bin? That’s what we’re for.',
    sizerQuestion: 'How big is the pile?',
    sizer: [
      { id: 'small', label: 'A small pile or a few bags', price: 'From $149' },
      { id: 'half', label: 'About half a truck', price: '$250–$700' },
      { id: 'full', label: 'A full truck', price: '$800–$1,500' },
      { id: 'heavy', label: 'Dirt, sod, rock or concrete', price: 'Priced by weight — send a photo' }
    ],
    included: [
      'Branches, brush, leaves and clippings',
      'Sod, dirt, rock and broken concrete (by weight)',
      'All loading, plus raking up after',
      'Mulch and compost recycling where possible',
      'Storm cleanup with same-day availability',
      'We coordinate with your landscaper or arborist'
    ],
    steps: [
      { title: 'Text a photo of the pile', detail: 'And tell us where the truck can park.' },
      { title: 'Get a flat price', detail: 'By volume; heavy material by weight.' },
      { title: 'We load and rake up', detail: 'The yard is clear when we leave.' }
    ],
    qa: [
      {
        q: 'Do you cut trees?',
        a: 'No — we are not a tree service. We haul what your arborist or landscaper leaves behind, and we are happy to coordinate with them.'
      },
      {
        q: 'Why not just use the green bin?',
        a: 'If it fits in a few weeks of green bins, use them — that is free. We are for the piles that won’t.'
      },
      {
        q: 'Do you take dirt and concrete?',
        a: 'Yes. Sod, dirt, rock and broken concrete are heavy, so they are priced by weight. Send a photo and we will give you the number.'
      },
      {
        q: 'Can you come after a storm?',
        a: 'Yes — storm cleanup has same-day availability when the schedule allows. Mondays and Saturdays fill first.'
      }
    ],
    reviews: ['Domonique M.', 'Gage', 'Jim L.'],
    ctaLabel: 'Get your yard waste price',
    smsBody: 'Hi Servant King, I need yard waste hauled away. Here is a photo:',
    title: 'Yard Waste & Brush Removal — Flat Price',
    metaDescription:
      'Yard waste, brush and branch removal on the SF Peninsula, San Jose and Tri-Valley. Loaded, hauled and raked up. Heavy material priced by weight.'
  },
  {
    slug: 'rental-turnover',
    adGroup: 'Rental Turnovers',
    nav: 'a rental turnover cleanout',
    eyebrow: 'For landlords & property managers',
    h1: 'Rental Turnover Cleanouts',
    promise:
      'Units cleared and broom-clean between tenants — same day or next day — without chasing haulers or losing another week of rent.',
    soThat:
      'We work to your turnover window, send photos, and hand over the disposal paperwork your owners want — so that the unit is back on the market on schedule.',
    hero: '/images/go/rental-turnover.jpg',
    pains: [
      'A tenant moved out and left half their stuff behind.',
      'Every vacant day is rent you don’t get back.',
      'A hauler who shows up Thursday instead of Monday.',
      'Owners who want photos and paperwork for every job.'
    ],
    painTurn: 'One call per unit. Same crew, same standard, every time.',
    sizerQuestion: 'How much is left in the unit?',
    sizer: [
      { id: 'room', label: 'A room’s worth', price: '$250–$700' },
      { id: 'unit', label: 'A full unit', price: '$800–$1,500' },
      { id: 'portfolio', label: 'Several units or recurring', price: 'Portfolio pricing — call us' }
    ],
    included: [
      'Same-day or next-day turnover',
      'Before-and-after photos',
      'Weight tickets and disposal paperwork',
      'Donation first for usable items',
      'Broom-clean every unit',
      'Consolidated monthly invoicing for portfolios'
    ],
    steps: [
      { title: 'Text photos and the address', detail: 'Plus lockbox or key details and your deadline.' },
      { title: 'Get a flat price', detail: 'Per unit, or portfolio pricing for recurring work.' },
      { title: 'We clear it and document it', detail: 'Photos and paperwork sent when we’re done.' }
    ],
    qa: [
      {
        q: 'What about belongings the tenant left behind?',
        a: 'Follow your attorney’s guidance on notice and storage before anything is removed — California has specific rules for this. Once you are cleared to dispose, we handle the rest.'
      },
      {
        q: 'Do you do foreclosures and REO properties?',
        a: 'Yes — with before, during and after photos, weight tickets and disposal manifests for brokers and field-service vendors.'
      },
      {
        q: 'Can you handle recurring turnovers?',
        a: 'Yes. Recurring service for portfolios, one point of contact, and consolidated monthly invoicing.'
      },
      {
        q: 'Can you send a certificate of insurance?',
        a: 'Yes — licensed and insured, CSLB C-21 #1142322, and we send the certificate before the first job.'
      }
    ],
    reviews: ['Valeria G.', 'Chris M.', 'Nathan T.'],
    ctaLabel: 'Get your turnover price',
    smsBody: 'Hi Servant King, I manage a rental that needs a turnover cleanout. Here are some photos:',
    title: 'Rental Turnover Cleanouts for Landlords & PMs',
    metaDescription:
      'Tenant turnover, eviction and foreclosure cleanouts on the SF Peninsula, San Jose and Tri-Valley. Same or next day, photos and disposal paperwork included.'
  },
  {
    slug: 'dumpster-alternative',
    adGroup: 'Dumpster Alternative',
    nav: 'a haul instead of a dumpster',
    eyebrow: 'Before you rent a dumpster',
    h1: 'Before You Rent a Dumpster, Get Our Number',
    promise:
      'Everything gone in one afternoon — without a box on your driveway for a week, a permit for the street, or loading it all yourself.',
    soThat:
      'You pay for the space your load actually takes in our truck, with the labor and dump fees included — so that you’re not paying for the half of a box you never fill.',
    hero: '/images/go/dumpster-alternative.jpg',
    pains: [
      'A 10-yard box for a load that would fill six.',
      'An HOA that allows a container for 48 hours.',
      'Overage fees because tile and dirt weigh more than they look.',
      'A whole weekend of lifting you didn’t plan for.'
    ],
    painTurn: 'If a dumpster really is cheaper for your job, we’ll tell you.',
    sizerQuestion: 'How much do you have?',
    sizer: [
      { id: 'few', label: 'A few items', price: 'From $149' },
      { id: 'half', label: 'About half a truck', price: '$250–$700' },
      { id: 'full', label: 'A full truck', price: '$800–$1,500' },
      { id: 'more', label: 'More than one load', price: 'Priced per load from photos' }
    ],
    included: [
      'All the lifting and loading',
      'Dump fees included',
      'Nothing parked on your driveway overnight',
      'No street permit to pull',
      'Tires, electronics and appliances sorted and routed',
      'Swept clean when we leave'
    ],
    steps: [
      { title: 'Text a photo', detail: 'Of the pile, the room or the garage.' },
      { title: 'Get our number — and the dumpster math', detail: 'If a container is cheaper for your job, we say so.' },
      { title: 'We load it and leave', detail: 'Usually one afternoon, same day or next.' }
    ],
    qa: [
      {
        q: 'Is a dumpster ever cheaper?',
        a: 'Yes. A 10-yard roll-off in the South Bay runs around $430 for seven days with a one-to-two-ton allowance, and overage runs roughly $150 a ton. If you will genuinely fill it and load it yourself, it is competitive. If you would fill two-thirds, you paid for a third of a box you never used — plus every hour of loading.'
      },
      {
        q: 'My HOA only allows a dumpster for 48 hours.',
        a: 'Then skip the container. A crew is not subject to the rule — the truck arrives, loads and leaves the same day.'
      },
      {
        q: 'My driveway is narrow. Can a truck even get in?',
        a: 'Usually yes, and where it cannot, we carry. Our trucks need less clearance than a roll-off delivery truck. Send a photo of the approach and we will tell you before we dispatch.'
      },
      {
        q: 'What can’t go in a dumpster anyway?',
        a: 'Tires, electronics, appliances with refrigerant, paint and batteries all get refused or surcharged at a transfer station. We sort that on the truck and route each one where it belongs. Servant King is a certified tire hauler.'
      }
    ],
    reviews: ['Chris M.', 'Nathan T.', 'Jim L.'],
    ctaLabel: 'Get our number first',
    smsBody: 'Hi Servant King, I was about to rent a dumpster. Can you price this instead? Here is a photo:',
    title: 'Dumpster Rental Alternative — Pay for What You Use',
    metaDescription:
      'Thinking about a dumpster rental on the SF Peninsula, San Jose or Tri-Valley? Get our number first — you pay only for the space your load takes, labor included.'
  },
  // ── Wave 3: life situations (drafted Sep 10, 2026) ───────────────────────
  {
    slug: 'code-violation-cleanup',
    adGroup: 'Code Violation Cleanup',
    nav: 'a code violation cleanup',
    eyebrow: 'Code violation & blight cleanup',
    h1: 'Got a Notice From the City? We’ll Clear It Before Your Deadline',
    promise:
      'The yard, driveway or side yard cleared and photographed before the reinspection — without fines stacking up, borrowing a truck, or losing weekends to dump runs.',
    soThat:
      'Tell us your compliance date and we schedule to beat it, then send before-and-after photos and disposal receipts — so that you have proof in hand when the inspector comes back.',
    hero: '/images/go/code-violation-cleanup.jpg',
    pains: [
      'A notice on the door with a date circled.',
      'Fines that grow every week the pile is still there.',
      'Junk that piled up during a hard year, and no truck to move it.',
      'A rental or inherited property you’re responsible for but don’t live at.'
    ],
    painTurn: 'Tell us your deadline. We work backward from it.',
    sizerQuestion: 'How much did the notice cite?',
    sizer: [
      { id: 'few', label: 'A few items', price: 'From $149' },
      { id: 'half', label: 'About half a truck', price: '$250–$700' },
      { id: 'full', label: 'A full truck', price: '$800–$1,500' },
      { id: 'more', label: 'The whole yard, or more', price: 'Priced per load from photos' }
    ],
    included: [
      'Yard, driveway, side-yard and carport junk',
      'Overgrown brush and yard waste',
      'Tires handled by a certified tire hauler',
      'Before-and-after photos for your reinspection',
      'Disposal receipts',
      'Scheduled ahead of your compliance date'
    ],
    steps: [
      { title: 'Text a photo and your notice date', detail: 'A photo of the cited area and the compliance date on the notice.' },
      { title: 'Get a flat price and a date before it', detail: 'Locked before we load. Same-day slots are often open.' },
      { title: 'We clear it and send the proof', detail: 'Before-and-after photos and disposal receipts for the inspector.' }
    ],
    qa: [
      {
        q: 'Will this close my case?',
        a: 'That is the city’s call, and your notice lists what they need to see. We clear what was cited and give you before-and-after photos and disposal receipts to show the inspector.'
      },
      {
        q: 'My deadline is this week.',
        a: 'Put the date in your first text. Same-day and next-day slots are often open; Mondays and Saturdays fill first, so book as soon as you have the notice.'
      },
      {
        q: 'I don’t live at the property. Can you still do it?',
        a: 'Yes. Send photos and the address, and we send you photos when it is done — you do not have to be there.'
      },
      {
        q: 'Do you take tires and old appliances?',
        a: 'Yes. Servant King is a certified tire hauler, and appliances with refrigerant are handled the way the EPA requires.'
      }
    ],
    reviews: ['Chris M.', 'Domonique M.', 'Jim L.'],
    ctaLabel: 'Get it cleared before your deadline',
    smsBody: 'Hi Servant King, I got a notice from the city and need this cleared. Here is a photo:',
    title: 'Code Violation & Blight Cleanup',
    metaDescription:
      'Got a code violation notice for junk in your yard or driveway? We clear it before your deadline and send before-and-after photos and disposal receipts.'
  },
  {
    slug: 'previous-owner-left-junk',
    adGroup: 'Previous Owner Left Junk',
    nav: 'what the previous owner left',
    eyebrow: 'For new homeowners',
    h1: 'The Sellers Left Their Junk? We’ll Clear It Before You Move In',
    promise:
      'Your new house empty and yours — without spending your first weekend on dump runs or arguing over a garage full of someone else’s stuff.',
    soThat:
      'We haul whatever came with the house that you didn’t want — garage, attic, yard — and sweep up, so that move-in day is about your things, not theirs.',
    hero: '/images/go/previous-owner-left-junk.jpg',
    pains: [
      'A garage full of the last owner’s boxes.',
      'Old paint cans and a broken fridge that “came with the house.”',
      'Movers arriving Saturday and no room to put anything.',
      'The listing said broom-clean. It wasn’t.'
    ],
    painTurn: 'Congratulations on the house. Let’s get their stuff out of it.',
    sizerQuestion: 'How much did they leave?',
    sizer: [
      { id: 'few', label: 'A few items', price: 'From $149' },
      { id: 'half', label: 'About half a truck', price: '$250–$700' },
      { id: 'full', label: 'A full truck', price: '$800–$1,500' },
      { id: 'more', label: 'More than one load', price: 'Priced per load from photos' }
    ],
    included: [
      'Garage, attic, basement, side-yard leftovers',
      'Old appliances, paint and batteries routed properly',
      'Donation first for anything still usable',
      'Photos before we load, if you want them for your agent',
      'All labor, loading and dump fees',
      'Swept clean before your movers arrive'
    ],
    steps: [
      { title: 'Text a photo of what they left', detail: 'Plus your move-in date.' },
      { title: 'Get a flat price', detail: 'Usually in minutes. Locked before we load.' },
      { title: 'We clear it before the movers', detail: 'Same-day and next-day slots are often open.' }
    ],
    qa: [
      {
        q: 'Shouldn’t the seller pay for this?',
        a: 'Maybe — it depends on your purchase agreement. Photograph everything and talk to your agent first. If you are pursuing it, we can send photos before we load and a receipt when we are done.'
      },
      {
        q: 'Can you come before my movers?',
        a: 'Yes, and that is the best order: clear it first and your movers carry your things into an empty garage.'
      },
      {
        q: 'They left paint, chemicals and a dead fridge.',
        a: 'Tell us what is there. Paint, solvents and batteries are handled separately from the rest, and refrigerators have their refrigerant recovered the way the EPA requires.'
      },
      {
        q: 'What does it cost?',
        a: 'Single items start at $149. Half a truck usually lands between $250 and $700, and a full truck runs $800–$1,500 — locked before we load.'
      }
    ],
    reviews: ['Chris M.', 'Nathan T.', 'Jim L.'],
    ctaLabel: 'Get their stuff out',
    smsBody: 'Hi Servant King, we just bought a house and the previous owner left a lot behind. Here is a photo:',
    title: 'Previous Owner Left Junk? New-Home Cleanouts',
    metaDescription:
      'Just bought a house and the sellers left their stuff? We clear the garage, attic and yard before you move in. Flat price, same or next day.'
  },
  {
    slug: 'senior-downsizing',
    adGroup: 'Senior Downsizing',
    nav: 'a senior downsizing cleanout',
    eyebrow: 'Senior moves & downsizing',
    h1: 'Moving a Parent to Assisted Living? We’ll Handle the House',
    promise:
      'Mom or Dad settled into the new place with the things they love — and the house cleared behind them — without you sorting it alone or rushing their decisions.',
    soThat:
      'We work from the list of what’s moving, set aside anything for family, donate what’s still good and haul the rest — so that you can spend the move with your parent, not in the garage.',
    hero: '/images/go/senior-downsizing.jpg',
    pains: [
      'A move-in date at the new community, and a whole house to sort.',
      'A parent who needs to choose what comes — and can’t be rushed.',
      'Siblings in other states, and you’re the one here.',
      'A home full of good furniture that deserves a second life.'
    ],
    painTurn: 'They choose. We carry. The rest goes to a good home.',
    sizerQuestion: 'How much is staying behind?',
    sizer: [
      { id: 'few', label: 'Just a few items', price: 'From $149' },
      { id: 'rooms', label: 'A room or two', price: '$250–$700' },
      { id: 'truck', label: 'About a full truck', price: '$800–$1,500' },
      { id: 'house', label: 'The whole house', price: 'Priced per load from photos' }
    ],
    included: [
      'Working from your parent’s move list',
      'Family items set aside, not loaded',
      'Donation first, with receipts',
      'All labor, loading and dump fees',
      'Scheduled around the move-in date',
      'Broom-clean finish, ready to list or rent'
    ],
    steps: [
      { title: 'Send photos and the move date', detail: 'Or book a walkthrough. Tell us what is moving with your parent.' },
      { title: 'Get a flat price and a plan', detail: 'In stages if that is easier — keepsakes first, the rest after the move.' },
      { title: 'We clear it with care', detail: 'Donations dropped, receipts sent, house swept.' }
    ],
    qa: [
      {
        q: 'Can we do this in stages?',
        a: 'Yes. Many families move the keepsakes first and clear the rest after move-in day. We schedule around the community’s date.'
      },
      {
        q: 'Can you work while my parent is still living there?',
        a: 'Yes. We go at their pace, and nothing ambiguous goes on the truck without a yes.'
      },
      {
        q: 'What happens to furniture that’s still good?',
        a: 'Donation first, with receipts. What cannot be donated is recycled where it can be, and the rest goes to a licensed transfer station.'
      },
      {
        q: 'Do you work with move managers and movers?',
        a: 'Yes — we are happy to work alongside a senior move manager or your movers and fit around their schedule.'
      }
    ],
    reviews: ['Debra L.', 'Jennifer H.', 'Nathan T.'],
    ctaLabel: 'Get your downsizing price',
    smsBody: 'Hi Servant King, my parent is moving to assisted living and we need help with the house. Here are some photos:',
    title: 'Senior Downsizing & Assisted Living Move Cleanouts',
    metaDescription:
      'Moving a parent to assisted living on the SF Peninsula, San Jose or Tri-Valley? We clear the house at their pace — donation first, flat price.'
  },
  {
    slug: 'damaged-belongings',
    adGroup: 'Water & Fire Damaged Items',
    nav: 'a damaged-belongings haul',
    eyebrow: 'Water, fire & storm damaged items',
    h1: 'Water-Damaged Furniture and Belongings, Hauled Out',
    promise:
      'The ruined furniture and soaked boxes out of the house — without dragging heavy, wet loads yourself or waiting on a busy restoration crew’s schedule.',
    soThat:
      'We photograph what’s going before it leaves and haul it the same day or next — so that your adjuster has the record and the dry-out crew has room to work.',
    hero: '/images/go/damaged-belongings.jpg',
    pains: [
      'A flooded garage or basement full of soaked boxes.',
      'Furniture that smells of smoke and can’t be saved.',
      'An adjuster who wants photos of everything before it’s thrown out.',
      'Mold starting on things nobody can use anymore.'
    ],
    painTurn: 'Drying out the house is the restoration company’s job. Hauling out what’s ruined is ours.',
    sizerQuestion: 'How much was damaged?',
    sizer: [
      { id: 'few', label: 'A few pieces', price: 'From $149' },
      { id: 'half', label: 'About half a truck', price: '$250–$700' },
      { id: 'full', label: 'A full truck', price: '$800–$1,500' },
      { id: 'heavy', label: 'Soaked drywall, plaster or tile', price: 'Priced by weight — send a photo' }
    ],
    included: [
      'Photos of what’s going before it leaves',
      'Water, smoke and storm damaged furniture and contents',
      'Protective gear for moldy or contaminated items',
      'Tear-out debris from the dry-out',
      'All labor, loading and dump fees',
      'A receipt for your claim file'
    ],
    steps: [
      { title: 'Text photos of the damage', detail: 'And tell us if your adjuster needs to see anything first.' },
      { title: 'Get a flat price', detail: 'Wet, heavy material priced by weight. Locked before we load.' },
      { title: 'We photograph and haul', detail: 'Same day or next, before or after the restoration crew.' }
    ],
    qa: [
      {
        q: 'Will insurance pay for this?',
        a: 'Removing damaged contents is often part of a claim, but your policy and adjuster decide. Ask them before we haul — we give you photos and a receipt for the file either way.'
      },
      {
        q: 'Are you a restoration company?',
        a: 'No. We don’t do water extraction, drying or mold remediation — a restoration company does. We haul out what is ruined, before or after they work.'
      },
      {
        q: 'Some of it is moldy.',
        a: 'Our crews are trained and equipped for contaminated interiors, so moldy contents are not a reason we walk away. Tell us what you are seeing when you send photos.'
      },
      {
        q: 'How fast can you come?',
        a: 'Same day or next day for most calls. Mondays and Saturdays fill first.'
      }
    ],
    reviews: ['Chris M.', 'Nathan T.', 'Jim L.'],
    ctaLabel: 'Get your damaged-items price',
    smsBody: 'Hi Servant King, we had water/fire damage and need ruined items hauled. Here are some photos:',
    title: 'Water & Fire Damaged Furniture Removal',
    metaDescription:
      'Flood, fire or storm damaged furniture and belongings hauled out the same or next day. Photos for your adjuster, receipt for your claim file.'
  },
  {
    slug: 'selling-your-house',
    adGroup: 'Selling Your House',
    nav: 'a pre-listing cleanout',
    eyebrow: 'Selling your home',
    h1: 'Selling Your House? Clear It Before the Photos',
    promise:
      'A listing-ready house — rooms decluttered, garage empty, yard clean — before the photographer arrives, without losing your weekends or a dumpster showing up in every listing photo.',
    soThat:
      'We work to your listing date, take only what you point at, donate what’s still good and leave every room ready for staging — so that buyers see the house, not the stuff.',
    hero: '/images/go/selling-your-house.jpg',
    pains: [
      'Your agent said “declutter” and handed you a date.',
      'A garage that makes buyers wonder what else is hiding.',
      'A stager coming Tuesday and a spare room full of boxes.',
      'You’re moving away and can’t take most of it with you.'
    ],
    painTurn: 'Tell us the listing date. It will be ready before the photographer.',
    sizerQuestion: 'How much needs to go before you list?',
    sizer: [
      { id: 'few', label: 'A few items', price: 'From $149' },
      { id: 'rooms', label: 'A room or the garage', price: '$250–$700' },
      { id: 'truck', label: 'About a full truck', price: '$800–$1,500' },
      { id: 'house', label: 'Most of the house', price: 'Priced per load from photos' }
    ],
    included: [
      'Rooms, closets, garage, attic and yard',
      'Only what you point at — you decide room by room',
      'Donation first, with receipts',
      'Scheduled before photos and staging',
      'We coordinate with your agent or stager',
      'Broom-clean finish'
    ],
    steps: [
      { title: 'Text photos and your listing date', detail: 'Or have your agent send them.' },
      { title: 'Get a flat price and a date', detail: 'Scheduled ahead of the photographer and stager.' },
      { title: 'We clear it and sweep', detail: 'The house is ready to stage when we leave.' }
    ],
    qa: [
      {
        q: 'Is decluttering really worth it?',
        a: 'HomeLight’s agent survey puts the value of decluttering and deep cleaning at roughly $16,800 on the West Coast, and a third of agents say prepared homes sell one to two weeks faster. Clearing the clutter is the cheapest part of that.'
      },
      {
        q: 'Can you work around our stager and photographer?',
        a: 'Yes. Give us the dates and we schedule ahead of both.'
      },
      {
        q: 'What about things we’re keeping or moving?',
        a: 'We only take what you point at. Keep, donate or haul — you decide room by room.'
      },
      {
        q: 'Can my agent book this?',
        a: 'Yes. Agents can send the address, photos and listing date, and we coordinate with them directly.'
      }
    ],
    reviews: ['Valeria G.', 'Chris M.', 'Jim L.'],
    ctaLabel: 'Get your pre-listing price',
    smsBody: 'Hi Servant King, we are getting our house ready to sell and need some things hauled. Here are some photos:',
    title: 'Pre-Listing Cleanouts for Home Sellers',
    metaDescription:
      'Selling your home on the SF Peninsula, San Jose or Tri-Valley? We clear rooms, garage and yard before the photographer and stager. Flat price.'
  }
];

export function serviceLandingBySlug(slug: string): ServiceLanding | undefined {
  return SERVICE_LANDINGS.find((p) => p.slug === slug);
}
