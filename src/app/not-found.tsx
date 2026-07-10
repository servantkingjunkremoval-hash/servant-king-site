import Link from 'next/link';
import { BRAND, telHref } from '@/lib/brand';

export default function NotFound() {
  return (
    <section className="bg-cream py-24">
      <div className="container-content text-center">
        <p className="eyebrow">404</p>
        <h1 className="h1 mt-3">This page took the trash truck and never came back.</h1>
        <p className="lede muted mt-5 max-w-xl mx-auto">
          Try the home page, or call us at {BRAND.phoneFormatted} — we actually answer.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">Back to Home</Link>
          <a href={telHref} className="btn-gold">Call {BRAND.phoneFormatted}</a>
        </div>
      </div>
    </section>
  );
}
