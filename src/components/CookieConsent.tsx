'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TRACKING } from '@/lib/brand';

/**
 * CIPA / CCPA-friendly opt-in cookie consent.
 *
 * The Meta Pixel is NOT loaded until the visitor explicitly clicks "Accept".
 * Choice is stored in localStorage under 'sk_cookie_consent' ('granted' | 'denied').
 * The footer "Cookie Preferences" link dispatches 'sk:open-cookie-settings'
 * to reopen this banner so a visitor can change their mind.
 *
 * Global Privacy Control (GPC): if the visitor's browser sends a GPC signal
 * (navigator.globalPrivacyControl === true), we treat that as an opt-out. The
 * banner is not shown, the Meta Pixel is never loaded, and — per CCPA/CPRA — we
 * honor the signal automatically without requiring any click.
 */

const STORAGE_KEY = 'sk_cookie_consent';

declare global {
  interface Window {
    __skPixelLoaded?: boolean;
    fbq?: (...args: unknown[]) => void;
  }
  interface Navigator {
    globalPrivacyControl?: boolean;
  }
}

function gpcEnabled(): boolean {
  return typeof navigator !== 'undefined' && navigator.globalPrivacyControl === true;
}

function loadMetaPixel() {
  if (typeof window === 'undefined' || window.__skPixelLoaded) return;
  window.__skPixelLoaded = true;

  const pixelId = TRACKING.metaPixelId;
  const s = document.createElement('script');
  s.id = 'meta-pixel';
  s.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(s);
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Respect Global Privacy Control: auto opt-out, no banner, no pixel.
    if (gpcEnabled()) {
      try {
        window.localStorage.setItem(STORAGE_KEY, 'denied');
      } catch {
        /* ignore */
      }
      return;
    }

    let choice: string | null = null;
    try {
      choice = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      choice = null;
    }

    if (choice === 'granted') {
      loadMetaPixel();
    } else if (choice !== 'denied') {
      setVisible(true);
    }

    const reopen = () => {
      // Even if a visitor reopens settings, keep honoring an active GPC signal.
      if (gpcEnabled()) return;
      setVisible(true);
    };
    window.addEventListener('sk:open-cookie-settings', reopen);
    return () => window.removeEventListener('sk:open-cookie-settings', reopen);
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'granted');
    } catch {
      /* ignore */
    }
    loadMetaPixel();
    setVisible(false);
  };

  const decline = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'denied');
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-16 z-[60] md:bottom-0"
    >
      <div className="mx-auto mb-3 max-w-3xl rounded-xl bg-charcoal px-5 py-4 text-cream shadow-[0_4px_24px_rgba(0,0,0,0.25)] ring-1 ring-cream/10 md:mb-4 md:px-6 md:py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-[14px] leading-relaxed text-cream/90">
            We use cookies and analytics (including the Meta Pixel) to understand
            site traffic and improve your experience. These load only if you acce
