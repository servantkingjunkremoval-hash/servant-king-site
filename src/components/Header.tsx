'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { BRAND, telHref, smsHref } from '@/lib/brand';
import { services } from '@/data/services';

type NavItem = { label: string; href: string };
type DropdownColumn = { heading?: string; items: NavItem[] };

// Build dropdown contents from the services + how-it-works data
const residentialServices = services
  .filter((s) => s.navGroup === 'residential')
  .map((s) => ({ label: s.title, href: `/services/${s.slug}` }));

const commercialServices = services
  .filter((s) => s.navGroup === 'commercial')
  .map((s) => ({ label: s.title, href: `/services/${s.slug}` }));

const howItWorksItems: NavItem[] = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Where Your Stuff Goes', href: '/where-your-stuff-goes' },
  { label: 'How We Price', href: '/how-we-price' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About Us', href: '/about' }
];

function DropdownNav({ label, items }: { label: string; items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-charcoal hover:text-purple"
      >
        {label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
          <div className="min-w-[260px] rounded-lg bg-white p-3 shadow-xl ring-1 ring-charcoal/10">
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-[14px] font-medium text-charcoal hover:bg-cream hover:text-purple"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="inline-flex items-center justify-center rounded-md p-2 text-charcoal md:hidden"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-charcoal/60 md:hidden" onClick={() => setOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-[88%] max-w-sm overflow-y-auto bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-[18px] font-semibold">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-md p-2"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="space-y-7">
              <div>
                <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-widest text-gold">Residential</h3>
                <ul className="space-y-1">
                  {residentialServices.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} onClick={() => setOpen(false)} className="block py-1.5 text-[15px] text-charcoal hover:text-purple">{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-widest text-gold">Commercial</h3>
                <ul className="space-y-1">
                  {commercialServices.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} onClick={() => setOpen(false)} className="block py-1.5 text-[15px] text-charcoal hover:text-purple">{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-widest text-gold">How It Works</h3>
                <ul className="space-y-1">
                  {howItWorksItems.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} onClick={() => setOpen(false)} className="block py-1.5 text-[15px] text-charcoal hover:text-purple">{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-widest text-gold">Locations</h3>
                <Link href="/service-areas" onClick={() => setOpen(false)} className="block py-1.5 text-[15px] text-charcoal hover:text-purple">All 44 Service Areas</Link>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <a href={telHref} className="btn-primary w-full">
                Call {BRAND.phoneFormatted}
              </a>
              <a href={smsHref()} className="btn-gold w-full">
                Text Us
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * DualLogoMark — both Demolition + Junk Removal logos side-by-side.
 * Uses CSS `mix-blend-mode: lighten` so the black background of either logo
 * drops out cleanly against any non-black backdrop.
 *
 * If a logo file isn't yet uploaded, falls back to a styled "SK" badge so
 * the header doesn't show a broken image during the transition.
 */
function DualLogoMark() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label={BRAND.name}>
      {/* Demolition logo */}
      <span className="relative inline-block h-12 w-32" style={{ mixBlendMode: 'lighten' }}>
        <Image
          src="/images/logo-demolition-horizontal.png"
          alt="Servant King Demolition"
          fill
          className="object-contain"
          sizes="160px"
          priority
        />
      </span>
      {/* Divider — only shows on md+ */}
      <span className="hidden h-8 w-px bg-charcoal/20 md:inline-block" aria-hidden="true" />
      {/* Junk Removal logo */}
      <span className="relative hidden h-12 w-36 md:inline-block" style={{ mixBlendMode: 'lighten' }}>
        <Image
          src="/images/logo-junk-removal-horizontal.png"
          alt="Servant King Junk Removal"
          fill
          className="object-contain"
          sizes="180px"
        />
      </span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/5 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      {/* Top utility strip */}
      <div className="bg-charcoal text-cream">
        <div className="container-content flex h-9 items-center justify-between text-[12px] md:text-[13px]">
          <span className="font-semibold tracking-wide truncate">
            Same-Day Junk Removal &amp; Demolition · {BRAND.licenses.cslb}
          </span>
          <a
            href={telHref}
            className="ml-3 hidden shrink-0 items-center gap-1.5 font-semibold text-gold hover:text-gold-light md:inline-flex"
          >
            Call {BRAND.phoneFormatted}
          </a>
        </div>
      </div>

      {/* Main header row */}
      <div className="container-content flex h-20 items-center justify-between md:h-24">
        {/* Logos */}
        <DualLogoMark />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          <DropdownNav label="Residential" items={residentialServices} />
          <DropdownNav label="Commercial" items={commercialServices} />
          <DropdownNav label="How It Works" items={howItWorksItems} />
          <Link href="/service-areas" className="text-[15px] font-semibold text-charcoal hover:text-purple">
            Locations
          </Link>
        </nav>

        {/* Right-side CTAs */}
        <div className="flex items-center gap-2">
          <a
            href={smsHref()}
            className="hidden rounded-lg border-2 border-gold px-4 py-2 text-[14px] font-semibold text-gold transition hover:bg-gold hover:text-charcoal sm:inline-flex"
          >
            Text Us
          </a>
          <a
            href={telHref}
            className="hidden rounded-lg bg-purple px-4 py-2 text-[14px] font-semibold text-white transition hover:bg-purple-dark md:inline-flex"
          >
            Call {BRAND.phoneFormatted}
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
