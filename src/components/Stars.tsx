/**
 * Five gold stars, server-renderable. The glyphs are hidden from assistive tech
 * and replaced by a plain-language label so a screen reader hears "5 out of 5
 * stars" instead of five star characters.
 */
export function Stars({
  label = '5 out of 5 stars',
  className = ''
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span role="img" aria-label={label} className={`inline-block leading-none tracking-[0.08em] text-gold ${className}`}>
      <span aria-hidden="true">★★★★★</span>
    </span>
  );
}
