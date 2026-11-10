import type { Metadata } from 'next';
import Script from 'next/script';

/**
 * /demolition is the Servant King Demolition paid-search landing page: no site
 * header, footer, or sticky bar, and no indexing — same treatment as /go.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false }
};

export default function DemolitionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`header, footer, [data-chrome="sticky"], [role="dialog"][aria-label="Cookie consent"] { display: none !important; } main { padding-bottom: 0 !important; }`}</style>
      {children}
      {/*
        CallRail dynamic number insertion. Swaps the SKD (650) 414-3366 number for a
        pool number for Google paid visitors, so each call carries its keyword and
        gclid. Scoped to /demolition: the junk-removal pages are untouched.
      */}
      <Script
        id="callrail-swap"
        src="https://cdn.callrail.com/companies/449033682/68972f73c82c5619a310/12/swap.js"
        strategy="afterInteractive"
      />
    </>
  );
}
