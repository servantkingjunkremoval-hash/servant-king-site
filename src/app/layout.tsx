import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StickyMobileBar } from '@/components/StickyMobileBar';
import { ContactEventTracker } from '@/components/MetaPixel';
import { CookieConsent } from '@/components/CookieConsent';
import { buildLocalBusinessJsonLd } from '@/lib/metadata';
import { BRAND } from '@/lib/brand';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['500', '600', '700']
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: 'Same-Day Junk Removal & Demolition | Stockton to Palo Alto | Servant King',
    template: '%s | Servant King'
  },
  description:
    'Family-owned junk removal & demolition serving the Bay Area, Placer, and Sacramento. CSLB C-21 licensed. 320+ 5-star reviews. Same-day service. Text or call 209-938-7407.',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: BRAND.name
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = buildLocalBusinessJsonLd();
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <Script
          id="ld-json-localbusiness"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <StickyMobileBar />
        <CookieConsent />
        <ContactEventTracker />
      </body>
    </html>
  );
}
