import type { Metadata } from 'next';

/**
 * src/app/booked/layout.tsx
 *
 * /booked fires a Google Ads conversion on load, so it must never be indexed
 * or reachable from search. An organic visitor landing here would file a
 * booking that never happened and corrupt the metric we use to allocate spend.
 *
 * Next only allows `metadata` exports from server components, and page.tsx is
 * 'use client', so the noindex lives in this layout instead.
 */
export const metadata: Metadata = {
  title: 'Booking confirmed | Servant King Junk Removal',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function BookedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
