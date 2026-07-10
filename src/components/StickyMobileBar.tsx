'use client';

import Link from 'next/link';
import { telHref, smsHref } from '@/lib/brand';

export function StickyMobileBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-charcoal/10 bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.08)] md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-3">
        <a href={telHref} className="flex flex-col items-center justify-center gap-1 py-3 text-charcoal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          <span className="text-[11px] font-semibold">CALL</span>
        </a>

        <a href={smsHref()} className="flex flex-col items-center justify-center gap-1 border-l border-r border-charcoal/10 py-3 text-charcoal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple" aria-hidden="true">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          <span className="text-[11px] font-semibold">TEXT</span>
        </a>

        <Link href="/contact" className="flex items-center justify-center bg-purple py-3 text-white">
          <span className="text-[13px] font-semibold tracking-wide">GET QUOTE</span>
        </Link>
      </div>
    </div>
  );
}
