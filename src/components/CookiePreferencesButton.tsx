'use client';

/**
 * Footer link that reopens the cookie consent banner so a visitor can
 * change their choice. Dispatches the event <CookieConsent /> listens for.
 */
export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('sk:open-cookie-settings'))}
      className="hover:text-gold"
    >
      Cookie Preferences
    </button>
  );
}
