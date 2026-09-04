import type { Metadata } from 'next';

/**
 * /go is a paid-search landing page: no site header, footer, or sticky bar,
 * and no indexing. The root layout still renders the chrome (it wraps every
 * route), so this layout hides it — the page keeps exactly one thing to click.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false }
};

export default function GoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`header, footer, [data-chrome="sticky"], [role="dialog"][aria-label="Cookie consent"] { display: none !important; } main { padding-bottom: 0 !important; }`}</style>
      {children}
    </>
  );
}
