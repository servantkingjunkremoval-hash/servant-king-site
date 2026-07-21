// All SEO-worthy services. Each gets its own /services/[slug] page.

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  heroHeadline: string;
  heroSubhead: string;
  seoTitle: string;
  metaDescription: string;
  // Card display (used on home + services index carousel)
  cardLabel: string;
  cardIcon:
    | 'couch'
    | 'building'
    | 'home'
    | 'boxes'
    | 'waves'
    | 'refrigerator'
    | 'bed'
    | 'hardhat'
    | 'tire'
    | 'briefcase'
    | 'leaf'
    | 'truck'
    | 'tools'
    | 'office'
    | 'shop'
    | 'lock'
    | 'garage'
    | 'pool';
  cardImage: string; // Unsplash URL (placeholder until real photos)
  // SEO body content — unique per service
  intro: string;
  highlights: string[];
  details: { heading: string; body: string }[];
  faqs: { question: string; answer: string }[];
  // Navigation grouping
  category: 'junk' | 'demo' | 'commercial';
  navGroup: 'residential' | 'commercial' | 'core';
};

export const services: Service[] = [
  {
    slug: 'junk-removal',
    title: 'Junk Removal',
    shortTitle: 'Junk Removal',
    cardLabel: 'Full-Service Junk Removal',
    cardIcon: 'couch',
    cardImage: '/images/hauling%20away%20jetski.JPG',
    heroHeadline: 'Same-Day Junk Removal — From Stockton to Palo Alto.',
    heroSubhead: 'Flat-rate quotes. Uniformed, insured crew. Everything hauled, sorted, and donated when we can.',
    seoTitle: 'Junk Removal Bay Area | Same-Day Service | Servant King',
    metaDescription: 'Family-owned junk removal serving the Bay Area, Placer, and Sacramento. Flat-rate, same-day, insured, 320+ 5-star reviews. Call 209-938-7407.',
    intro: "Junk removal is our primary service and the thing we've been perfecting since 2021. We handle everything from a single mattress pickup to a full estate cleanout — with the same family-owned crew, same flat-rate pricing, and same policy of trying to donate or recycle before anything hits the landfill.",
    highlights: [
      'Same-day availability when the slot is open',
      'Flat-rate quotes — no hourly surprises',
      'Free on-site estimates with no obligation',
      'Uniformed, background-checked crew',
      'Own processing facility — donation-first, landfill-last',
      'Text a photo to 209-938-7407 for a remote quote'
    ],
    details: [
      {
        heading: 'What we haul',
        body: 'Furniture, appliances, mattresses, hot tubs, e-waste, yard waste, construction debris, tires (we\'re Certified Tire Haulers), estate cleanouts, hoarder-safe cleanouts, garage/attic/basement cleanouts, office and tenant-turnover cleanouts. If you\'re unsure whether we take something, text us a photo — we\'ll answer in minutes.'
      },
      {
        heading: 'How pricing works',
        body: 'We quote flat rate based on volume and weight. No hourly clock running. No surprise fees at the end. Every quote includes labor, truck, dump fees, and disposal. For larger jobs, we do a free on-site estimate. For smaller jobs, a photo via text is usually enough.'
      },
      {
        heading: 'Where your junk goes',
        body: 'Every load comes back to our own sorting facility first. We donate what\'s still useful to Habitat for Humanity, Goodwill, Salvation Army, St. Vincent De Paul, and Snowline Hospice. What can\'t be donated gets recycled through certified streams (especially e-waste and tires). Landfill is the last resort, not the first.'
      }
    ],
    faqs: [
      {
        question: 'How fast can you come out?',
        answer: 'Same-day when we have an open slot, next-day at the latest. Call or text 209-938-7407 and we\'ll tell you honestly whether we can make it work today.'
      },
      {
        question: 'Do you charge for estimates?',
        answer: 'No. On-site estimates are always free and no-obligation.'
      },
      {
        question: 'What if I only need one or two items removed?',
        answer: 'We handle single-item pickups too — mattresses, couches, appliances, hot tubs. Flat rate, in and out in 20 minutes.'
      },
      {
        question: 'Do you recycle and donate?',
        answer: 'Yes. Everything comes back to our own facility for sorting before disposal. Our donation partners include Habitat, Goodwill, Salvation Army, St. Vincent De Paul, and Snowline Hospice.'
      }
    ],
    category: 'junk',
    navGroup: 'core'
  },
  {
    slug: 'demolition',
    title: 'Demolition',
    shortTitle: 'Demolition',
    cardLabel: 'Licensed Demolition',
    cardIcon: 'building',
    cardImage: '/images/Site%20demolition%20and%20cleanup%20with%20skid%20steer.JPG',
    heroHeadline: 'Licensed C-21 Demolition — Residential & Commercial.',
    heroSubhead: 'From interior tear-outs to full residential demo. CSLB C-21 Licensed #1142322. Insured, bonded, public-works compliant.',
    seoTitle: 'Demolition Contractor Bay Area | CSLB C-21 Licensed | Servant King',
    metaDescription: 'Licensed demolition contractor serving the Bay Area and Central Valley. Interior, residential, commercial, ADU prep, public works. CSLB C-21 #1142322. Call 209-938-7407.',
    intro: "Servant King is a CSLB C-21 Demolition Contractor (License #1142322) with extensive experience across the Bay Area, Placer, Sacramento, and Central Valley. We handle interior tear-outs, selective demolition, residential tear-downs, ADU site prep, commercial interior demo, and public works with proper certified-payroll compliance.",
    highlights: [
      'CSLB C-21 Demolition Contractor License #1142322',
      'General liability + workers\' comp insured',
      'Commercial & residential — interior & exterior',
      'Public works / prevailing wage compliant',
      'Permit coordination handled by our office',
      'Partner of choice for multiple Bay Area GCs'
    ],
    details: [
      {
        heading: 'Residential demolition',
        body: 'Interior tear-outs (kitchens, bathrooms, flooring), full-home demo (smaller footprints), ADU site prep, garage and shed demolition, pool deck removal, hot tub and pergola teardowns. We coordinate permits, HOA notifications, and utility disconnects — you just approve the scope.'
      },
      {
        heading: 'Commercial demolition',
        body: 'Retail fit-outs, tenant improvement demo, selective interior demo for office renovations, warehouse space clearouts, and light-commercial tear-downs. We work around your business schedule and provide proper disposal documentation for compliance.'
      },
      {
        heading: 'Public works',
        body: 'Servant King is certified for prevailing wage and certified payroll on public works projects. Our office handles the DIR registration, weekly payroll reporting, and compliance documentation so GCs can focus on the build.'
      },
      {
        heading: 'Debris hauling included',
        body: 'Every demo job includes haul-off and proper disposal. Construction materials (concrete, metal, wood) are sorted for recycling where possible. This is a major cost savings compared to hiring a separate hauler.'
      }
    ],
    faqs: [
      {
        question: 'Are you licensed and insured?',
        answer: 'Yes. CSLB C-21 Demolition Contractor License #1142322. Full general liability + workers\' compensation. Documentation provided for any job.'
      },
      {
        question: 'Do you pull permits?',
        answer: 'For most residential and commercial demo work, yes — we handle the permit application and inspections as part of the job.'
      },
      {
        question: 'Can you do prevailing wage / public works?',
        answer: 'Yes. We\'re DIR-registered and handle certified payroll reporting. We\'ve worked as a subcontractor on multiple public-works demo projects.'
      },
      {
        question: 'How do you price demolition?',
        answer: 'Most demo jobs are flat-rate by scope. We do a free on-site walkthrough, review drawings if available, and send a written quote within 48 hours.'
      }
    ],
    category: 'demo',
    navGroup: 'core'
  },
  {
    slug: 'estate-cleanouts',
    title: 'Estate Cleanouts',
    shortTitle: 'Estate Cleanouts',
    cardLabel: 'Estate Cleanouts',
    cardIcon: 'home',
    cardImage: '/images/before%20garage%20open%201.jpg',
    heroHeadline: 'Respectful, Discreet Estate Cleanouts.',
    heroSubhead: 'Full-property cleanouts for estates, probate, downsizing, and inherited homes. Donation-first, on your timeline.',
    seoTitle: 'Estate Cleanout Services Bay Area | Servant King',
    metaDescription: 'Respectful, full-property estate cleanouts across the Bay Area. Probate, downsizing, inherited homes. 320+ 5-star reviews. Call 209-938-7407.',
    intro: "Estate cleanouts are our most emotionally sensitive work, and we approach every one with the respect the family deserves. Whether it's a probate situation, a parent downsizing, or an inherited home being prepped for sale, we coordinate with the executor, family, or realtor to clear the property on your timeline — with donation receipts and itemized documentation when requested.",
    highlights: [
      'Experienced with probate and executor protocols',
      'Donation receipts for tax purposes',
      'Coordinate with realtors for pre-sale cleanouts',
      'Background-checked, insured crew',
      'Discreet — unmarked trucks available on request',
      'Flat-rate pricing on full-property scopes'
    ],
    details: [
      {
        heading: 'How estate cleanouts work',
        body: 'We start with a free on-site walkthrough. The executor or family walks us through what stays, what goes, and any items of sentimental or monetary value to preserve. We provide a flat-rate quote for the full scope. On job day, our crew works efficiently and respectfully, asking before removing anything we\'re uncertain about.'
      },
      {
        heading: 'Donation handling',
        body: 'For estate work specifically, we document what gets donated and to which charity. We can provide itemized donation receipts from our 501(c)(3) partners — useful for estate tax purposes. Our regular partners are Habitat for Humanity, Goodwill, Salvation Army, St. Vincent De Paul, and Snowline Hospice.'
      },
      {
        heading: 'Working with realtors',
        body: 'When you\'re prepping an estate home for sale, every day on the market matters. We can do full cleanouts in 1-2 days for most single-family homes, leaving the property broom-swept and ready for staging or showing.'
      }
    ],
    faqs: [
      {
        question: 'Do you handle hoarding situations within estates?',
        answer: 'Yes. Many estates include decades of accumulation that effectively qualify as hoarder-level cleanouts. We\'re trained for that work and can do it respectfully.'
      },
      {
        question: 'What if we find valuables during the cleanout?',
        answer: 'We stop and consult with the executor or family. Anything uncertain gets set aside for review. We do not keep or dispose of items without explicit approval.'
      },
      {
        question: 'Can you provide donation receipts?',
        answer: 'Yes, through our 501(c)(3) partner charities. Itemized receipts take 7-14 days to generate after donation intake.'
      }
    ],
    category: 'junk',
    navGroup: 'residential'
  },
  {
    slug: 'hoarder-cleanouts',
    title: 'Hoarder Cleanouts',
    shortTitle: 'Hoarder Cleanouts',
    cardLabel: 'Hoarder-Safe Cleanouts',
    cardIcon: 'boxes',
    cardImage: '/images/before%20a%20crawlspace%20cleanout%20under%20the%20home.JPG',
    heroHeadline: 'Compassionate, Non-Judgmental Hoarder Cleanouts.',
    heroSubhead: "No shame, no shock, no quick judgments. Just a respectful crew with the equipment and experience to handle properties safely and privately.",
    seoTitle: 'Hoarder Cleanout Services Bay Area | Compassionate & Discreet',
    metaDescription: 'Experienced hoarder cleanout services in the Bay Area and Central Valley. Non-judgmental, PPE-equipped crew. Discreet and compassionate. Call 209-938-7407.',
    intro: "Hoarder cleanouts require a specific kind of crew — one that arrives without judgment, handles the work with compassion, and has the equipment and training to do it safely. Servant King has cleaned out homes in every condition imaginable, from mild clutter to severe compaction. We're PPE-equipped, insured, and experienced with the documentation that sometimes accompanies these situations.",
    highlights: [
      'Non-judgmental, compassionate approach',
      'Crew trained and PPE-equipped for biohazard exposure',
      'Discreet unmarked trucks on request',
      'Coordinate with family, social workers, or APS',
      'Sort for sentimental / valuable items before disposal',
      'Flat-rate pricing on full-property scopes'
    ],
    details: [
      {
        heading: 'How we approach hoarder work',
        body: 'Every hoarder situation is different. Some are the result of grief. Some are mental health conditions. Some are just decades of life accumulating. We don\'t ask why — we just do the work the family needs done, on the timeline that respects everyone involved.'
      },
      {
        heading: 'Safety protocols',
        body: 'For severe hoarding, our crew wears appropriate PPE (respirators, Tyvek suits, gloves). We use HEPA-filtered vacuums where needed. For biohazard situations, we coordinate with licensed remediation specialists when the scope goes beyond our certifications.'
      },
      {
        heading: 'Item recovery',
        body: 'Even in severe cases, there are usually items worth recovering — photos, documents, valuables, heirlooms. We sort before we haul, and we confirm with the homeowner, family, or case worker before disposing of anything that looks personal.'
      }
    ],
    faqs: [
      {
        question: 'How long does a hoarder cleanout take?',
        answer: 'Ranges from 1 day for light cases to a full week for severe ones. We\'ll give you a realistic estimate after the on-site walkthrough.'
      },
      {
        question: 'Do you coordinate with Adult Protective Services or social workers?',
        answer: 'Yes. We\'ve worked alongside APS, county case workers, and family members on cleanouts where the homeowner has diminished capacity or ongoing mental health needs.'
      },
      {
        question: 'Is this covered by insurance?',
        answer: 'Some homeowners insurance policies cover hoarding-related cleanup, especially if there\'s documented biohazard. We can provide invoices formatted for insurance submission.'
      }
    ],
    category: 'junk',
    navGroup: 'residential'
  },
  {
    slug: 'hot-tub-removal',
    title: 'Hot Tub Removal',
    shortTitle: 'Hot Tub Removal',
    cardLabel: 'Hot Tub & Spa Removal',
    cardIcon: 'waves',
    cardImage: '/images/hot%20tub%20demo%201.jpg',
    heroHeadline: 'Hot Tub Removal, Done Right.',
    heroSubhead: 'Drain, disassemble, haul away — all in one trip. Deck and concrete pad removal optional. Flat rate, no surprises.',
    seoTitle: 'Hot Tub Removal Bay Area | Same-Day Service | Servant King',
    metaDescription: 'Professional hot tub and spa removal across the Bay Area. Drain, disassemble, haul. Deck and pad removal available. Flat rate. Call 209-938-7407.',
    intro: "Hot tubs are one of the most common — and most painful-to-DIY — removal jobs. They're heavy (300-500 lbs empty), awkward to maneuver, and hard to dispose of legally. Servant King handles the entire job: drain, disassemble or remove whole, haul away, and dispose of properly. Optional add-ons: deck removal, concrete pad demo, and electrical disconnect coordination.",
    highlights: [
      'Full drain, disassembly, and removal in one trip',
      'Small crews able to fit through 36" gates',
      'Deck and pad removal available as add-on',
      'Proper disposal — fiberglass shells are recycled when possible',
      'Flat-rate pricing, including labor and disposal fees',
      'Same-day and next-day availability'
    ],
    details: [
      {
        heading: 'What\'s included',
        body: 'Draining the tub (usually into the landscape, but we can run a hose to the street if requested), disassembly if needed to fit through gates or doors, loading onto the truck, and proper disposal at our processing facility. Electrical disconnect is your responsibility or your electrician\'s — we don\'t touch live wiring.'
      },
      {
        heading: 'Deck and pad removal',
        body: 'Many hot tub removals come with a deck that also needs to go, or a concrete pad that looks ugly once the tub is gone. We\'re licensed for the demo (CSLB C-21 #1142322) and can quote that as an add-on or separate job.'
      },
      {
        heading: 'Where it goes',
        body: 'Fiberglass shells are recycled through specialized streams when accepted. Metal frames and plumbing are sorted for scrap. Landfill is the last resort.'
      }
    ],
    faqs: [
      {
        question: 'How heavy is a hot tub?',
        answer: 'Typically 300-500 lbs empty, 3,000+ lbs full. We drain first, then handle the empty shell with appropriate equipment.'
      },
      {
        question: 'Can you get it out through a narrow side gate?',
        answer: 'Usually yes, as long as the gate is at least 30" wide. For tighter situations we can disassemble the shell on-site.'
      },
      {
        question: 'Do I need to disconnect the electrical?',
        answer: 'Yes, that\'s done by a licensed electrician before we arrive. We can refer you to one in the area if needed.'
      }
    ],
    category: 'junk',
    navGroup: 'residential'
  },
  {
    slug: 'appliance-removal',
    title: 'Appliance Removal',
    shortTitle: 'Appliance Removal',
    cardLabel: 'Appliance Removal',
    cardIcon: 'refrigerator',
    cardImage: '/images/dresser%20removal.jpg',
    heroHeadline: 'Refrigerator, Washer, Dryer, Stove — We Haul It All.',
    heroSubhead: 'Including refrigerant recovery for fridges and freezers. Properly recycled, never illegally dumped.',
    seoTitle: 'Appliance Removal Bay Area | Refrigerator, Washer, Dryer | Servant King',
    metaDescription: 'Appliance removal and recycling across the Bay Area. Refrigerators, washers, dryers, stoves, dishwashers. Refrigerant recovery compliant. Call 209-938-7407.',
    intro: "Old appliances are bulky, heavy, and have specific disposal rules — especially refrigerators, freezers, and air conditioners, which have to be handled by EPA-certified techs for refrigerant recovery. Servant King handles all of it properly, with flat-rate pricing that includes haul-off and recycling.",
    highlights: [
      'EPA-compliant refrigerant recovery for fridges/freezers/AC',
      'All major appliance types: fridge, washer, dryer, stove, dishwasher, microwave',
      'Recycling through proper channels — most appliances are scrapped for metal',
      'Tight-space maneuvering (kitchens, second-floor laundry)',
      'Single appliance or full-house replacement jobs',
      'Same-day availability'
    ],
    details: [
      {
        heading: 'Refrigerators and freezers',
        body: 'Federal EPA rules require refrigerant to be recovered before disposal. Our disposal partners are certified for this — we can\'t do refrigerant recovery on-site, but the unit gets properly processed at the facility.'
      },
      {
        heading: 'Washers, dryers, stoves',
        body: 'Straight haul and recycle. We disconnect gas lines and water lines as part of the job (for gas, we recommend confirmation from a licensed plumber for anything beyond a simple shutoff).'
      },
      {
        heading: 'Whole-house appliance swaps',
        body: 'If you\'re doing a kitchen or laundry renovation, we\'ll haul all the old appliances in one visit. Flat rate for the whole set is typically less than individual pickups.'
      }
    ],
    faqs: [
      {
        question: 'Do you disconnect the appliance?',
        answer: 'Yes for water and electric. Gas lines we recommend confirmed by a licensed plumber for safety.'
      },
      {
        question: 'Is there an extra fee for refrigerators?',
        answer: 'Slightly higher than non-refrigerant appliances due to EPA-compliant disposal, but still flat rate — no surprises.'
      },
      {
        question: 'Can you take it if it doesn\'t work?',
        answer: 'Yes. Working or broken, we haul both. Working units get donated through our partners when possible.'
      }
    ],
    category: 'junk',
    navGroup: 'residential'
  },
  {
    slug: 'mattress-disposal',
    title: 'Mattress Disposal',
    shortTitle: 'Mattress Disposal',
    cardLabel: 'Mattress Disposal',
    cardIcon: 'bed',
    cardImage: '/images/mattress-disposal.jpg',
    heroHeadline: 'Mattress & Box Spring Removal — Any Size.',
    heroSubhead: "California mattress disposal rules are strict. We follow them. Recycled through the state's Bye Bye Mattress program when accepted.",
    seoTitle: 'Mattress Removal Bay Area | California Compliant | Servant King',
    metaDescription: 'Mattress and box spring removal across the Bay Area. California state law compliant. Recycled through Bye Bye Mattress. Flat rate. Call 209-938-7407.',
    intro: "California has specific disposal rules for mattresses under the Used Mattress Recovery and Recycling Act. You can't just put a mattress in a dumpster. Servant King handles mattresses properly — taking them to recycling partners under the state's Bye Bye Mattress program when they\'re accepted.",
    highlights: [
      'California Used Mattress Recovery Act compliant',
      'Twin through California King — any size',
      'Box springs, mattress toppers, and bed frames',
      'Upstairs and multi-floor removal',
      'Same-day availability',
      'Single mattress or whole-house sets'
    ],
    details: [
      {
        heading: 'California disposal rules',
        body: 'Since 2016, California has required mattress retailers to collect a recycling fee and has established Bye Bye Mattress, a state-funded program for mattress recycling. We take mattresses to participating recycling facilities when they\'re in good enough shape — or to proper disposal when they\'re not.'
      },
      {
        heading: 'Multi-floor pickups',
        body: 'Our crew handles second-story bedrooms, apartment units, and condo high-rises. If elevators are tight, we can disassemble box springs on-site for easier transport.'
      }
    ],
    faqs: [
      {
        question: 'Do you take mattresses with stains or bed bugs?',
        answer: 'Stained mattresses yes. Bed bug-infested mattresses require special handling — tell us in advance and we\'ll bring proper containment.'
      },
      {
        question: 'What about bed frames?',
        answer: 'Yes. Wooden frames, metal frames, adjustable bases — all hauled.'
      }
    ],
    category: 'junk',
    navGroup: 'residential'
  },
  {
    slug: 'construction-debris',
    title: 'Construction Debris Hauling',
    shortTitle: 'Construction Debris',
    cardLabel: 'Construction Debris',
    cardIcon: 'hardhat',
    cardImage: '/images/commercial%20structure%20demo%20before.jpg',
    heroHeadline: 'Construction Debris & Remodel Cleanup.',
    heroSubhead: 'Drywall, concrete, lumber, metal, tile, roofing. Post-remodel, post-demo, or job-site cleanup.',
    seoTitle: 'Construction Debris Removal Bay Area | Post-Remodel Cleanup',
    metaDescription: 'Construction debris hauling for GCs, remodelers, and homeowners. Drywall, concrete, lumber, metal. Same-day. Call 209-938-7407.',
    intro: "Construction and remodeling jobs generate more debris than most homeowners expect. A full kitchen remodel can produce 3-5 cubic yards of debris. A bathroom remodel, 1-2 cubic yards. A roof tear-off, 4-8 cubic yards. Servant King handles all of it — for contractors, for homeowners doing DIY remodels, and as cleanup after our own demolition work.",
    highlights: [
      'Drywall, concrete, lumber, metal, tile, roofing shingles',
      'Contractor-friendly scheduling',
      'Clean-as-you-go or end-of-job cleanouts',
      'Proper disposal with documentation when needed',
      'Recycling for metals, concrete, and clean wood',
      'Can coordinate with your dump trailer rentals'
    ],
    details: [
      {
        heading: 'For contractors',
        body: 'We work alongside GCs across the Bay Area on remodel jobs, tenant improvements, and new construction. We can do scheduled end-of-day cleanups or lump-sum end-of-job hauls. Our flat-rate pricing works better than hourly dumpster rentals for most jobs.'
      },
      {
        heading: 'For homeowners',
        body: 'Doing a DIY remodel? We can set up a debris pile location, haul it as it fills up, and give you flat-rate pricing up front. Most kitchen or bathroom remodels cost less than renting a dumpster.'
      },
      {
        heading: 'Recycling',
        body: 'Clean wood, metal, and concrete are sorted for recycling. Mixed debris goes to proper disposal. Disposal documentation is available for jobs that require it.'
      }
    ],
    faqs: [
      {
        question: 'Do you work with general contractors?',
        answer: 'Yes. We\'re a preferred subcontractor for several Bay Area GCs on demolition and debris hauling.'
      },
      {
        question: 'Can you handle hazardous materials?',
        answer: 'No. Asbestos, lead paint, and other hazardous materials require licensed remediation contractors. We can refer you to specialists we trust.'
      }
    ],
    category: 'demo',
    navGroup: 'commercial'
  },
  {
    slug: 'tire-hauling',
    title: 'Tire Hauling',
    shortTitle: 'Tire Hauling',
    cardLabel: 'Tire Hauling',
    cardIcon: 'tire',
    cardImage: '/images/hauling%20away%20jetski.JPG',
    heroHeadline: 'Certified Tire Hauler — Legal Disposal for Any Quantity.',
    heroSubhead: "California requires a licensed Tire Hauler permit. We have it. From a handful to hundreds.",
    seoTitle: 'Tire Hauling & Disposal Bay Area | Certified Tire Hauler',
    metaDescription: 'California Certified Tire Hauler serving the Bay Area and Central Valley. Legal tire disposal for any quantity. Call 209-938-7407.',
    intro: "California requires anyone transporting used tires to hold a Certified Tire Hauler permit — which most general junk haulers don't have. Servant King is a Certified Tire Hauler, which means we can legally haul and properly dispose of tires in any quantity, from a single set to an entire fleet\u2019s worth. Tires go to CalRecycle-compliant processors where they're recycled into rubber products, asphalt additive, and civil engineering material.",
    highlights: [
      'California Certified Tire Hauler (CalRecycle)',
      'Any quantity — single tire to hundreds',
      'Passenger, light truck, and commercial tires',
      'Manifest documentation for commercial customers',
      'Proper recycling through CalRecycle-compliant processors',
      'Flat-rate pricing per tire or per load'
    ],
    details: [
      {
        heading: 'Why most haulers won\'t take tires',
        body: "California law requires a Tire Hauler permit for transporting more than nine used tires at a time. Most general junk haulers aren't certified, which is why they'll decline tires or charge premium rates to sneak them into regular debris. We're certified, so tires are a normal part of our service."
      },
      {
        heading: 'Commercial tire disposal',
        body: 'Auto shops, tire stores, and fleets: we can set up scheduled pickups with tire manifests for compliance documentation. Flat-rate per load or per tire, whichever works better for your volume.'
      }
    ],
    faqs: [
      {
        question: 'How many tires can you take at once?',
        answer: 'Any quantity. Our permit allows us to transport unlimited tires to certified processors.'
      },
      {
        question: 'Do you provide manifest documentation?',
        answer: 'Yes, for commercial customers or anyone who needs the paperwork for compliance.'
      }
    ],
    category: 'commercial',
    navGroup: 'commercial'
  },
  {
    slug: 'public-works',
    title: 'Public Works & Prevailing Wage',
    shortTitle: 'Public Works',
    cardLabel: 'Public Works / Prevailing Wage',
    cardIcon: 'briefcase',
    cardImage: '/images/Commercial%20demolition%20of%20a%20storefront%20in%20Pleasant%20Hill%20for%20a%20commercial%20contractor.JPG',
    heroHeadline: 'Public Works Demolition — Prevailing Wage Compliant.',
    heroSubhead: 'DIR-registered. Certified payroll handled. Partner-of-choice for GCs on public projects.',
    seoTitle: 'Public Works Demolition Bay Area | Prevailing Wage | Servant King',
    metaDescription: 'Licensed demolition subcontractor for public works projects. DIR-registered, certified payroll compliant. CSLB C-21 #1142322. Call 209-938-7407.',
    intro: "Public works projects have compliance requirements that stop most small contractors cold — prevailing wage, certified payroll, DIR registration, weekly reporting. Servant King handles all of it. We\u2019re DIR-registered, our payroll runs through a compliant system with weekly certified reports, and our field crews understand the additional documentation these jobs require.",
    highlights: [
      'DIR registration current',
      'Certified payroll reporting (weekly)',
      'Prevailing wage compliant across demo trades',
      'CSLB C-21 Demolition Contractor License #1142322',
      'Experience on federal, state, and municipal projects',
      'Partner-of-choice for multiple Bay Area GCs'
    ],
    details: [
      {
        heading: 'What makes us different',
        body: 'Most small demolition contractors can\'t bid public works because the compliance overhead is too high. Our office handles DIR, certified payroll, weekly reporting, and documentation so your project manager doesn\'t have to chase us. That reliability is why we win repeat work on public projects.'
      },
      {
        heading: 'What we handle',
        body: 'Interior demo for public buildings, selective demo on tenant improvements for public agencies, site demo prep for new construction, and cleanup/debris hauling for larger public works crews.'
      }
    ],
    faqs: [
      {
        question: 'Are you DIR-registered?',
        answer: 'Yes. Our DIR registration is current and in good standing. We can provide the number for bid packages.'
      },
      {
        question: 'How do you handle certified payroll?',
        answer: 'We use a dedicated payroll system compliant with DIR electronic certified payroll reporting. Weekly reports are filed on time for every active public project.'
      }
    ],
    category: 'commercial',
    navGroup: 'commercial'
  },
  {
    slug: 'whole-home-cleanout',
    title: 'Whole Home Cleanouts',
    shortTitle: 'Whole Home Cleanouts',
    cardLabel: 'Whole Home Cleanouts',
    cardIcon: 'home',
    cardImage: '/images/before%20-flooring%20pile.jpg',
    heroHeadline: 'Whole Home Cleanouts — Top to Bottom, in One Trip.',
    heroSubhead: 'Clearing a parents house. Prepping for sale. Foreclosure or eviction recovery. We handle it all in one job.',
    seoTitle: 'Whole Home Cleanout Services Bay Area | Servant King',
    metaDescription: 'Whole-house cleanouts for moves, sales, downsizing, and inherited homes. Family-owned. 320+ 5-star reviews. Call 209-938-7407.',
    intro: 'Whole home cleanouts are the deepest version of what we do — every closet, every drawer, every shelf, every corner of the garage and shed. Servant King handles these cleanly: a free on-site walkthrough first, a flat-rate quote, then a 1-2 day job (3+ for severely accumulated properties) where we leave the property broom-swept and ready for the next chapter.',
    highlights: [
      'Free on-site walkthrough and flat-rate quote',
      '1-2 days for typical single-family homes',
      'Donation-first sorting at our facility',
      'Coordinate with realtors, executors, or owners',
      'Discreet, unmarked trucks available',
      'Donation receipts available for tax purposes'
    ],
    details: [
      { heading: 'How a whole home cleanout runs', body: 'Step one is the walkthrough — usually under 30 minutes. We tour the home with you, note what stays, what goes, what to set aside for valuables review. Step two is the written quote. Step three is the job: full crew, multiple trips if needed, sweep-out at the end.' },
      { heading: 'For real estate prep', body: 'Selling a home with decades of accumulation? Our cleanouts are timed to your listing schedule. We coordinate with your agent on staging dates and can usually deliver a broom-swept property in 1-2 days for most single-family homes.' },
      { heading: 'For probate and estate situations', body: 'Estate work is its own thing — emotional, often tied to legal timelines, and requires careful documentation. Donation receipts can be itemized for tax filings.' }
    ],
    faqs: [
      { question: 'How long does a whole home cleanout take?', answer: '1-2 days for most single-family homes. Larger properties can take 3-5 days. We give you a realistic estimate during the walkthrough.' },
      { question: 'What if we do not want everything thrown out?', answer: 'We sort. You tell us what stays, what goes, what gets donated.' }
    ],
    category: 'junk',
    navGroup: 'residential'
  },
  {
    slug: 'garage-attic-basement',
    title: 'Garage, Attic & Basement Cleanouts',
    shortTitle: 'Garage / Attic / Basement',
    cardLabel: 'Garage, Attic & Basement',
    cardIcon: 'garage',
    cardImage: '/images/garage%20demo%20with%20mini%20excavator%201.jpg',
    heroHeadline: 'Garage, Attic, and Basement Cleanouts — One Truck, One Day.',
    heroSubhead: 'The three rooms most homeowners postpone for years. We clear them in hours.',
    seoTitle: 'Garage, Attic & Basement Cleanout Bay Area | Servant King',
    metaDescription: 'Garage, attic, and basement cleanouts across the Bay Area, Placer, and Sacramento. Flat-rate. Same-day when we have the slot. Call 209-938-7407.',
    intro: 'These three spaces — the garage, the attic, the basement — are where life accumulates. Old furniture, broken appliances, holiday decorations from twenty years ago, the kid\'s outgrown bikes. Servant King clears them out in one visit, flat rate.',
    highlights: [
      'Garage, attic, basement, and crawlspace work',
      'Single-trip flat-rate pricing',
      'Sorting and donation included',
      'Same-day available for smaller spaces',
      'Insured for the awkward access',
      'Equipment: dollies, hand-trucks, lift gates'
    ],
    details: [
      { heading: 'Garage cleanouts', body: 'Most garages we clear take 2-4 hours from start to finish. We move the contents into the driveway for sorting (with your input), then load and haul. Sweep-out included.' },
      { heading: 'Attic cleanouts', body: 'Attics are awkward — pull-down ladders, low ceilings, often hot. We bring respirators, lighting, multiple crew members.' },
      { heading: 'Basement cleanouts', body: 'Bay Area basements are typically partial-height or finished. Stairs are no obstacle.' }
    ],
    faqs: [
      { question: 'Will you take everything in the garage, even broken stuff?', answer: 'Yes. Working or broken, we haul it all.' }
    ],
    category: 'junk',
    navGroup: 'residential'
  },
  {
    slug: 'yard-waste',
    title: 'Yard Waste & Landscape Debris',
    shortTitle: 'Yard Waste',
    cardLabel: 'Yard Waste & Landscape Debris',
    cardIcon: 'leaf',
    cardImage: '/images/yard-waste-landscape-debris.jpg',
    heroHeadline: 'Yard Waste, Tree Debris, and Landscape Cleanouts.',
    heroSubhead: 'Storm cleanup, tree-removal aftermath, full-yard overhauls. We haul what does not fit in your green bin.',
    seoTitle: 'Yard Waste Removal Bay Area | Tree Debris Hauling | Servant King',
    metaDescription: 'Yard waste, tree debris, and landscape cleanout hauling across the Bay Area. After-storm cleanup. Same-day. Call 209-938-7407.',
    intro: 'Some yard waste fits in the green bin — most does not. Tree limbs after a Bay Area storm, full-yard overhauls when you renovate the landscaping, dirt and rock from a hardscape job. Servant King hauls all of it. Recycled into mulch and compost where the disposal stream allows.',
    highlights: [
      'Tree debris, branches, brush, leaves',
      'Full-yard overhaul cleanouts',
      'Storm cleanup with same-day availability',
      'Hardscape removal: dirt, rock, sod, broken concrete',
      'Recycled into mulch / compost where possible',
      'Coordinate with your landscaper or arborist'
    ],
    details: [
      { heading: 'After-storm cleanup', body: 'When storms drop trees in your yard, we usually have same-day or next-day capacity to clear the debris.' },
      { heading: 'Landscape renovation', body: 'Pulling out the old to make room for the new? We haul old sod, rip-out shrubs, dirt from grade changes, and old fence panels.' }
    ],
    faqs: [
      { question: 'Can you take debris already cut up by my tree service?', answer: 'Yes. We can do haul-only when your arborist has already bucked everything.' }
    ],
    category: 'junk',
    navGroup: 'residential'
  },
  {
    slug: 'furniture-removal',
    title: 'Furniture Removal',
    shortTitle: 'Furniture Removal',
    cardLabel: 'Furniture Removal',
    cardIcon: 'couch',
    cardImage: '/images/dresser%20removal.jpg',
    heroHeadline: 'Furniture Removal — Single Item or Whole House.',
    heroSubhead: 'Couches, sectionals, dining sets, dressers, headboards, china cabinets. We carry it down, out, and away.',
    seoTitle: 'Furniture Removal Bay Area | Same-Day Pickup | Servant King',
    metaDescription: 'Single-item to whole-house furniture removal. Couches, sectionals, dressers, dining sets. Same-day available. Call 209-938-7407.',
    intro: 'Furniture removal is the most common single-item call we get. A new couch is being delivered tomorrow and the old one has to go. Servant King handles it: flat-rate, in and out in 20 minutes for most single pieces.',
    highlights: [
      'Single item to full-house furniture removal',
      'Stairs, second-story bedrooms, condo high-rises',
      'Disassembly on-site if needed',
      'Donation when furniture is in good condition',
      'Recycling for items beyond donation',
      'Same-day pickup for most calls'
    ],
    details: [
      { heading: 'Single-item pickups', body: 'A couch in your driveway or living room takes us about 20 minutes. Flat rate.' },
      { heading: 'Whole-house furniture removal', body: 'Moving and the new place does not have room for the old furniture? We will clear the entire house in one visit.' }
    ],
    faqs: [
      { question: 'Will you take a couch with stains or pet damage?', answer: 'Yes. We haul whether or not the item is donatable.' }
    ],
    category: 'junk',
    navGroup: 'residential'
  },
  {
    slug: 'pool-removal',
    title: 'Pool Removal',
    shortTitle: 'Pool Removal',
    cardLabel: 'Pool Removal',
    cardIcon: 'pool',
    cardImage: '/images/pool-spa-removal.jpg',
    heroHeadline: 'Above-Ground Pool & Pool Deck Removal.',
    heroSubhead: 'Drain, disassemble, haul. Optional: remove the deck and restore the yard.',
    seoTitle: 'Pool Removal Bay Area | Above-Ground & Deck Removal',
    metaDescription: 'Above-ground pool removal, pool deck demolition, and yard restoration. CSLB C-21 licensed. Call 209-938-7407.',
    intro: 'Pool removal is a job most homeowners DIY into a disaster. Servant King handles above-ground pools, pool decking, and surrounding hardscape with our licensed C-21 demo team.',
    highlights: [
      'Above-ground pools (any size)',
      'Pool deck and hardscape removal',
      'CSLB C-21 licensed demolition for permanent pools',
      'Yard restoration available',
      'Coordinate utility disconnects',
      'Proper disposal of liner, frame, and pump equipment'
    ],
    details: [
      { heading: 'Above-ground pool removal', body: 'Drain, disassemble the frame and liner, haul. Metal frames sorted for recycling.' },
      { heading: 'Pool decking & hardscape', body: 'Wood decks, composite decks, concrete pads — we tear them out and haul.' },
      { heading: 'In-ground pool note', body: 'Full in-ground pool excavation requires heavy equipment beyond our standard fleet. We can refer you to a partner.' }
    ],
    faqs: [
      { question: 'Do you do in-ground pool removal?', answer: 'Not directly — that is specialty excavation work. We can refer you.' }
    ],
    category: 'junk',
    navGroup: 'residential'
  },
  {
    slug: 'shed-demolition',
    title: 'Shed Demolition',
    shortTitle: 'Shed Demolition',
    cardLabel: 'Shed & Outbuilding Demo',
    cardIcon: 'tools',
    cardImage: '/images/garage%20demo%20with%20mini%20excavator%204.jpg',
    heroHeadline: 'Shed, Outbuilding & Detached Garage Demolition.',
    heroSubhead: 'Tear it down, haul it away, sweep the slab. Licensed C-21 demo with proper permitting.',
    seoTitle: 'Shed Demolition Bay Area | Outbuilding & Detached Garage',
    metaDescription: 'Shed, outbuilding, and detached garage demolition. CSLB C-21 licensed. Permitting included. Call 209-938-7407.',
    intro: 'That dilapidated shed in the back corner of the yard. The detached garage from the 1940s. The barn that came with the property and never got used. Servant King has the C-21 license and equipment to take all of it down.',
    highlights: [
      'Wood, metal, and concrete-block sheds',
      'Detached garages and carports',
      'Barns and small outbuildings',
      'Permit coordination included',
      'Concrete slab removal optional',
      'CSLB C-21 licensed and insured'
    ],
    details: [
      { heading: 'How shed demolition runs', body: 'Walkthrough first, permit pulled with the city, demo day: tear down, sort materials, haul away.' },
      { heading: 'Why hire a licensed crew', body: 'California requires a C-21 license for demolition over $500, and most cities require permits.' }
    ],
    faqs: [
      { question: 'How long does it take?', answer: 'Most sheds: 1 day. Detached garages: 1-2 days. Barns: 2-3 days.' }
    ],
    category: 'demo',
    navGroup: 'residential'
  },
  {
    slug: 'office-cleanout',
    title: 'Office Cleanouts',
    shortTitle: 'Office Cleanouts',
    cardLabel: 'Office Cleanouts',
    cardIcon: 'office',
    cardImage: '/images/Commercial%20office%20demo%201.jpg',
    heroHeadline: 'Office Cleanouts for Tenant Turnovers and Closures.',
    heroSubhead: 'Desks, cubicles, server racks, files. After-hours service so we do not disrupt the business.',
    seoTitle: 'Office Cleanout Services Bay Area | After-Hours Available',
    metaDescription: 'Office cleanouts and commercial furniture removal. Tenant turnovers, business closures, downsizing. After-hours service. Call 209-938-7407.',
    intro: 'Office cleanouts run on a different timeline than residential. The lease is up, the new tenant is moving in next Monday, and you have one weekend to clear out 5,000 square feet. Servant King handles these tight-window commercial jobs with after-hours and weekend crews.',
    highlights: [
      'After-hours and weekend availability',
      'Tenant-turnover tight-window scheduling',
      'Cubicle, desk, conference room, and lobby furniture',
      'IT equipment proper disposal (e-waste compliant)',
      'Disposal documentation for property managers',
      'Coordinate with building management on freight elevator times'
    ],
    details: [
      { heading: 'Tenant turnover cleanouts', body: 'Most office tenant turnovers happen between Friday close and Monday morning. We staff up for these windows.' },
      { heading: 'IT and electronics', body: 'Office cleanouts often include hundreds of monitors, computers, printers. We route all electronics to certified e-waste recyclers.' }
    ],
    faqs: [
      { question: 'Can you work after-hours?', answer: 'Yes. Evenings, overnight, and weekends are common for office cleanouts.' }
    ],
    category: 'commercial',
    navGroup: 'commercial'
  },
  {
    slug: 'retail-cleanout',
    title: 'Retail Cleanouts',
    shortTitle: 'Retail Cleanouts',
    cardLabel: 'Retail Cleanouts',
    cardIcon: 'shop',
    cardImage: '/images/commercial%20site%20demolition%20during.jpg',
    heroHeadline: 'Retail Store Cleanouts and Tenant Improvements.',
    heroSubhead: 'Fixtures, shelving, mannequins, signage. Cleared between leases or after closures.',
    seoTitle: 'Retail Store Cleanout Services Bay Area | Servant King',
    metaDescription: 'Retail store cleanouts, fixture removal, and tenant improvement debris hauling. Bay Area, Sacramento, Central Valley. Call 209-938-7407.',
    intro: 'Retail cleanouts have a particular feel — fixtures, shelving, displays, mannequins, signage, custom counters. Servant King handles all of it, with discretion and timeline pressure.',
    highlights: [
      'Retail fixtures, shelving, and displays',
      'Restaurant kitchen equipment removal',
      'Sign and signage takedown',
      'Discreet handling for sensitive closures',
      'Tenant improvement demo (CSLB C-21)',
      'Disposal documentation for landlords'
    ],
    details: [
      { heading: 'Closures and bankruptcies', body: 'When a retail business closes, the cleanout has to happen fast and discreetly.' },
      { heading: 'Tenant improvement demo', body: 'Between tenants, the new business often wants the previous fit-out completely stripped. Our C-21 license covers this work.' }
    ],
    faqs: [
      { question: 'Can items with resale value be sold?', answer: 'Yes — we coordinate with restaurant equipment dealers and fixture buyers.' }
    ],
    category: 'commercial',
    navGroup: 'commercial'
  },
  {
    slug: 'property-management',
    title: 'Property Management Cleanouts',
    shortTitle: 'Property Management',
    cardLabel: 'Property Management',
    cardIcon: 'briefcase',
    cardImage: '/images/demolition%20cleanup%20before.jpg',
    heroHeadline: 'Cleanouts for Property Managers — Tenant Turnover Specialists.',
    heroSubhead: 'Recurring service, fast turnaround, invoiced billing for portfolios.',
    seoTitle: 'Property Management Cleanouts Bay Area | Servant King',
    metaDescription: 'Property management cleanout services. Tenant turnovers, eviction recovery, recurring service for portfolios. Call 209-938-7407.',
    intro: 'Property managers do not have time for retail-priced one-off junk removal. Servant King is set up for portfolio work — recurring service, consolidated invoicing, fast response on tenant-turnover deadlines.',
    highlights: [
      'Recurring service contracts for portfolios',
      'Tenant turnover same-day or next-day',
      'Eviction recovery cleanouts',
      'Consolidated monthly invoicing',
      'Disposal documentation for owner reporting',
      'Coordinate with maintenance and turnover crews'
    ],
    details: [
      { heading: 'Recurring service', body: 'We work with several Bay Area property management companies on recurring tenant-turnover schedules.' },
      { heading: 'Eviction recovery', body: 'When a tenant leaves a unit destroyed, we handle the cleanup with discretion.' }
    ],
    faqs: [
      { question: 'Do you offer volume discounts?', answer: 'Yes — we negotiate flat rates per unit type for recurring service contracts.' }
    ],
    category: 'commercial',
    navGroup: 'commercial'
  },
  {
    slug: 'foreclosure-cleanout',
    title: 'Foreclosure Cleanouts',
    shortTitle: 'Foreclosure Cleanouts',
    cardLabel: 'Foreclosure Cleanouts',
    cardIcon: 'lock',
    cardImage: '/images/foreclosure-property-cleanout.jpg',
    heroHeadline: 'Foreclosure Cleanouts for Banks, Servicers, and Asset Managers.',
    heroSubhead: 'REO-property cleanout, broker-price-opinion preparation, and pre-listing turnover.',
    seoTitle: 'Foreclosure Cleanout Services Bay Area | REO Property',
    metaDescription: 'Foreclosure and REO property cleanouts for banks, servicers, and asset managers. Documented service. Call 209-938-7407.',
    intro: 'Foreclosure cleanouts have specific compliance and documentation requirements that most haulers cannot meet. Servant King provides photo documentation, weight tickets, donation receipts, and broker-ready broom-swept properties.',
    highlights: [
      'Photo documentation before/during/after',
      'Weight tickets and disposal manifests',
      'Broker-price-opinion (BPO) ready cleanouts',
      'Coordinate with field service vendors',
      'Discreet handling for sensitive properties',
      'Insured for vacant property work'
    ],
    details: [
      { heading: 'Documentation standards', body: 'REO properties require detailed documentation: before-photos, item listings, weight tickets, broom-swept after-photos.' },
      { heading: 'Personal property handling', body: 'California has specific rules for handling abandoned personal property in foreclosed homes. We follow them.' }
    ],
    faqs: [
      { question: 'Do you work with national field service vendors?', answer: 'Yes. We accept work orders through major asset management portals.' }
    ],
    category: 'commercial',
    navGroup: 'commercial'
  },
  {
    slug: 'storage-unit-cleanout',
    title: 'Storage Unit Cleanouts',
    shortTitle: 'Storage Unit Cleanouts',
    cardLabel: 'Storage Unit Cleanouts',
    cardIcon: 'boxes',
    cardImage: '/images/storage-unit-cleanout.jpg',
    heroHeadline: 'Storage Unit Cleanouts for Owners and Auction Buyers.',
    heroSubhead: 'Units up to 10x30. Sort, haul, and document. Donation receipts when possible.',
    seoTitle: 'Storage Unit Cleanout Services Bay Area | Servant King',
    metaDescription: 'Storage unit cleanout services. Sort, haul, and document. For owners, lien holders, and auction buyers. Call 209-938-7407.',
    intro: 'Storage unit cleanouts come in two flavors: a family clearing out a deceased relatives unit, and an auction buyer who just won the lien-sale bid. Servant King handles both.',
    highlights: [
      'Units up to 10x30',
      'On-site sorting (keep / donate / haul)',
      'Auction-buyer fast turnaround',
      'Donation receipts when applicable',
      'Documentation for inheritance / probate situations',
      'Same-day for smaller units'
    ],
    details: [
      { heading: 'For families', body: 'We bring extra patience to these jobs — sort, ask, double-check before disposing.' },
      { heading: 'For auction buyers', body: 'You bought the unit. Coordinate with the facility on access times and we will have it cleared the same day.' }
    ],
    faqs: [
      { question: 'How fast can you clear a unit?', answer: '5x10: 1-2 hours. 10x10: 2-3 hours. 10x20+: half-day to full-day.' }
    ],
    category: 'commercial',
    navGroup: 'commercial'
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
