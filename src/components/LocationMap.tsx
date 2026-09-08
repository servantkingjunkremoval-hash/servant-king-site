import type { Location } from '@/lib/brand';
import { locationAddress, locationMapEmbedUrl } from '@/lib/brand';

/**
 * Embedded Google Map for one branch. Uses the key-free maps.google.com embed
 * (no Maps Platform project, no billing), lazy-loaded so it never blocks paint.
 * The visible address under the map is the same string the schema emits, so the
 * page, the map and the LocalBusiness node all agree on one place.
 */
export function LocationMap({ location, className = '' }: { location: Location; className?: string }) {
  return (
    <figure className={`overflow-hidden rounded-xl ring-1 ring-charcoal/10 ${className}`}>
      <iframe
        src={locationMapEmbedUrl(location)}
        title={`Map of Servant King ${location.city} — ${locationAddress(location)}`}
        width="100%"
        height="320"
        style={{ border: 0, display: 'block' }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
      <figcaption className="flex flex-wrap items-center justify-between gap-2 bg-cream px-4 py-3 text-[14px] text-charcoal">
        <span>{locationAddress(location)}</span>
        {location.gbpUrl && (
          <a
            href={location.gbpUrl}
            target="_blank"
            rel="noopener"
            className="font-semibold text-purple hover:underline"
          >
            Directions &amp; reviews on Google
          </a>
        )}
      </figcaption>
    </figure>
  );
}
