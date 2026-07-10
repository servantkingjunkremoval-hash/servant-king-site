import Link from 'next/link';
import { BRAND, telHref, smsHref, mailtoHref } from '@/lib/brand';
import { serviceAreas } from '@/data/serviceAreas';
import { CookiePreferencesButton } from './CookiePreferencesButton';

export function Footer() {
  const topCities = [
    'palo-alto', 'atherton', 'menlo-park', 'walnut-creek',
    'danville', 'pleasanton', 'folsom', 'granite-bay'
  ];
  const topServiceAreas = topCities
    .map((slug) => serviceAreas.find((sa) => sa.slug === slug))
    .filter(Boolean) as typeof serviceAreas;

  return (
    <footer className="bg-charcoal text-cream">
      <div className="container-content grid grid-cols-1 gap-12 py-16 md:grid-cols-4">
        {/* Brand column */}
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2" aria-label={BRAND.name}>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded bg-purple text-xl font-display font-semibold text-gold">SK</span>
            <span className="font-display text-[22px] font-semibold leading-tight">
              {BRAND.shortName}
            </span>
          </Link>
          <p className="mt-4 text-[15px] leading-relaxed text-cream/85">
            Same-Day Junk Removal & Demolition. Family-owned. Bay Area to Central Valley.
          </p>
          <p className="mt-3 text-[14px] font-semibold text-gold">
            ★★★★★ {BRAND.reviews.count}+ Google Reviews
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-4 font-display text-[18px] font-semibold text-gold">Services</h3>
          <ul className="space-y-2 text-[15px]">
            <li><Link className="hover:text-gold" href="/#services">Junk Removal</Link></li>
            <li><Link className="hover:text-gold" href="/#services">Demolition</Link></li>
            <li><Link className="hover:text-gold" href="/#services">Estate Cleanouts</Link></li>
            <li><Link className="hover:text-gold" href="/#services">Hoarder Cleanouts</Link></li>
            <li><Link className="hover:text-gold" href="/#services">Hot Tub Removal</Link></li>
            <li><Link className="hover:text-gold" href="/#services">Construction Debris</Link></li>
            <li><Link className="hover:text-gold" href="/#services">E-Waste & Tires</Link></li>
            <li><Link className="hover:text-gold" href="/#services">Public Works / Prevailing Wage</Link></li>
          </ul>
        </div>

        {/* Service areas */}
        <div>
          <h3 className="mb-4 font-display text-[18px] font-semibold text-gold">Areas We Serve</h3>
          <ul className="space-y-2 text-[15px]">
            {topServiceAreas.map((sa) => (
              <li key={sa.slug}>
                <Link className="hover:text-gold" href={`/service-areas/${sa.slug}`}>{sa.title}</Link>
              </li>
            ))}
            <li className="pt-2">
              <Link className="font-semibold text-gold hover:text-gold-light" href="/service-areas">
                See all 26 cities →
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 font-display text-[18px] font-semibold text-gold">Get in Touch</h3>
          <ul className="space-y-3 text-[15px]">
            <li>
              <a href={telHref} className="font-semibold hover:text-gold">
                {BRAND.phoneFormatted}
              </a>
            </li>
            <li>
              <a href={smsHref()} className="hover:text-gold">
                Text: {BRAND.phoneFormatted}
              </a>
            </li>
            <li>
              <a href={mailtoHref} className="hover:text-gold">
                {BRAND.email}
              </a>
            </li>
            <li className="pt-2 text-[14px] text-cream/75">
              {BRAND.address.street} {BRAND.address.suite}<br />
              {BRAND.address.city}, {BRAND.address.state} {BRAND.address.zip}
            </li>
          </ul>
          <div className="mt-6 flex items-center gap-4">
            <a href={BRAND.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gold">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.9 3.77-3.9 1.09 0 2.24.19 2.24.19v2.47H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z" />
              </svg>
            </a>
            <a href={BRAND.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gold">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.2c3.2 0 3.6 0 4.8.07 1.17.05 1.8.24 2.22.4.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.36 1.05.4 2.22.07 1.26.08 1.64.08 4.83 0 3.2 0 3.6-.07 4.84-.05 1.17-.24 1.8-.4 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.05.36-2.22.4-1.26.07-1.64.08-4.84.08-3.2 0-3.6 0-4.84-.07-1.17-.05-1.8-.24-2.22-.4a3.72 3.72 0 01-1.38-.9 3.72 3.72 0 01-.9-1.38c-.17-.42-.36-1.05-.4-2.22C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.84c.05-1.17.24-1.8.4-2.22.22-.56.48-.96.9-1.38a3.72 3.72 0 011.38-.9c.42-.17 1.05-.36 2.22-.4C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.74 0 8.33 0 7.05.07 5.78.13 4.9.33 4.14.63a6.07 6.07 0 00-2.2 1.42A6.07 6.07 0 00.52 4.24C.22 5 0 5.88-.04 7.15-.11 8.43-.11 8.84-.11 12.1s0 3.66.07 4.94c.06 1.27.26 2.15.56 2.91.3.78.72 1.44 1.42 2.14s1.36 1.12 2.14 1.42c.76.3 1.64.5 2.91.56C8.34 24 8.74 24 12 24s3.66 0 4.94-.07c1.27-.06 2.15-.26 2.91-.56.78-.3 1.44-.72 2.14-1.42s1.12-1.36 1.42-2.14c.3-.76.5-1.64.56-2.91.07-1.28.07-1.68.07-4.94s0-3.66-.07-4.94c-.06-1.27-.26-2.15-.56-2.91a6.07 6.07 0 00-1.42-2.14A6.07 6.07 0 0019.86.63C19.1.33 18.22.13 16.95.07 15.67 0 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm6.4-11.84a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Donation partner strip */}
      <div className="border-t border-cream/10">
        <div className="container-content flex flex-col items-center gap-3 py-6 md:flex-row md:justify-between">
          <span className="text-[13px] text-muted">Proudly donating to:</span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-cream/70">
            {BRAND.donationPartners.map((partner) => (
              <span key={partner}>{partner}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="container-content flex flex-col gap-3 py-5 text-[12px] text-muted md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {BRAND.name}. {BRAND.licenses.cslb} · {BRAND.licenses.tireHauler} · Licensed & Insured.
          </span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gold">Privacy</Link>
            <Link href="/terms" className="hover:text-gold">Terms</Link>
            <CookiePreferencesButton />
            <Link href="/accessibility" className="hover:text-gold">Accessibility</Link>
            <Link href="/sitemap.xml" className="hover:text-gold">Sitemap<
