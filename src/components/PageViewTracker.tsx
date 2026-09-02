'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@/lib/track';

/**
 * Fires a Meta Pixel PageView on client-side route changes.
 *
 * Why this is needed: the pixel's own `fbq('track','PageView')` runs once, when
 * the base code is injected. Next's App Router navigates without a full document
 * load, so every page a visitor reaches after the first was invisible to Meta —
 * traffic and landing-page reporting only ever saw the entry page.
 *
 * The initial PageView is skipped here because the pixel snippet already fired
 * it; firing again on mount would double-count the entry page.
 *
 * No-op for visitors who have not consented (track() checks for window.fbq).
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    track('PageView');
  }, [pathname]);

  return null;
}
