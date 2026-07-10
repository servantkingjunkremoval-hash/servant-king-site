'use client';

import Script from 'next/script';
import { snipeyFormUrl, TRACKING } from '@/lib/brand';

type Props = {
  city?: string;
  service?: 'junk-removal' | 'demolition';
  heightPx?: number;
  className?: string;
  title?: string;
};

/**
 * Embedded Snipey (GoHighLevel) lead form.
 * Submissions flow directly into the Snipey pipeline and trigger the
 * master workflow (SMS + email auto-replies, Lead event, pipeline assignment).
 *
 * URL params `source_city` and `source_service` are tagged onto the contact
 * for per-city conversion analytics.
 */
export function SnipeyForm({
  city,
  service = 'junk-removal',
  heightPx = 500,
  className,
  title = 'Servant King Lead Form'
}: Props) {
  const src = snipeyFormUrl({ city, service });
  return (
    <div className={className}>
      <iframe
        src={src}
        style={{ width: '100%', height: `${heightPx}px`, border: 'none', borderRadius: 8 }}
        id={`inline-${TRACKING.snipeyFormId}`}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={title}
        data-height={heightPx}
        data-layout-iframe-id={`inline-${TRACKING.snipeyFormId}`}
        data-form-id={TRACKING.snipeyFormId}
        title={title}
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </div>
  );
}
