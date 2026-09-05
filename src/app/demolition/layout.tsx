import type { Metadata } from 'next';

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
    </>
  );
}
