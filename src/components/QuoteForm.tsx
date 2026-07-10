'use client';

import { useState } from 'react';
import { BRAND } from '@/lib/brand';

/**
 * Native quote-request form. No third-party processor and no external iframe —
 * on submit it composes a pre-filled text message (or email) to Servant King
 * from the visitor's own device. Nothing is transmitted to a third party from
 * the page, so there is no cookie/tracking exposure from the form itself.
 *
 * Chris receives the lead straight to his business line (Text) or inbox (Email)
 * and works it in Housecall Pro from there.
 */

type Service = 'Junk Removal' | 'Demolition' | 'Estate / Hoarder Cleanout' | 'Other';

const SERVICES: Service[] = [
  'Junk Removal',
  'Demolition',
  'Estate / Hoarder Cleanout',
  'Other'
];

function buildMessage(f: {
  name: string;
  phone: string;
  location: string;
  service: string;
  details: string;
}): string {
  const lines = [
    'New quote request from servantkingdemolition.com:',
    `Name: ${f.name || '(not provided)'}`,
    `Phone: ${f.phone || '(not provided)'}`,
    `Location / ZIP: ${f.location || '(not provided)'}`,
    `Service: ${f.service || '(not provided)'}`,
    `Details: ${f.details || '(not provided)'}`
  ];
  return lines.join('\n');
}

export function QuoteForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [service, setService] = useState<Service>('Junk Removal');
  const [details, setDetails] = useState('');

  const sendText = () => {
    const body = encodeURIComponent(buildMessage({ name, phone, location, service, details }));
    window.location.href = `sms:+1${BRAND.phone}?&body=${body}`;
  };

  const sendEmail = () => {
    const subject = encodeURIComponent(`Quote request — ${service}`);
    const body = encodeURIComponent(buildMessage({ name, phone, location, service, details }));
    window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
  };

  const inputClass =
    'w-full rounded-md border border-charcoal/15 bg-white px-3.5 py-2.5 text-[15px] text-charcoal outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20';

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        sendText();
      }}
    >
      <div>
        <label htmlFor="qf-name" className="mb-1 block text-[13px] font-semibold text-charcoal">
          Name
        </label>
        <input
          id="qf-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Your name"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="qf-phone" className="mb-1 block text-[13px] font-semibold text-charcoal">
            Phone
          </label>
          <input
            id="qf-phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            placeholder="(209) 555-0123"
          />
        </div>
        <div>
          <label htmlFor="qf-location" className="mb-1 block text-[13px] font-semibold text-charcoal">
            City or ZIP
          </label>
          <input
            id="qf-location"
            type="text"
            autoComplete="postal-code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={inputClass}
            placeholder="e.g. Menlo Park / 94025"
          />
        </div>
      </div>

      <div>
        <label htmlFor="qf-service" className="mb-1 block text-[13px] font-semibold text-charcoal">
          Service needed
        </label>
        <select
          id="qf-service"
          value={service}
          onChange={(e) => setService(e.target.value as Service)}
          className={inputClass}
        >
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="qf-details" className="mb-1 block text-[13px] font-semibold text-charcoal">
          Job details
        </label>
        <textarea
          id="qf-details"
          rows={4}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className={inputClass}
          placeholder="What needs to go? Roughly how much, and where is it on the property?"
        />
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row">
        <button
          type="submit"
          className="inline-flex flex-1 items-center justify-center rounded-md bg-purple px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-purple-dark"
        >
          Send as Text
        </button>
        <button
          type="button"
          onClick={sendEmail}
          className="inline-flex flex-1 items-center justify-center rounded-md border border-purple px-5 py-3 text-[15px] font-semibold text-purple transition hover:bg-purple/5"
        >
          Send as Email
        </button>
      </div>

      <p className="text-[12px] leading-relaxed text-muted">
        Tapping a button opens your own text or email app with the details filled in — you just hit
        send. Your information goes straight to us; it is not submitted to any third-party form
        service.
      </p>
    </form>
  );
}
