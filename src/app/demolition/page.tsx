import type { Metadata } from 'next';
import { DemoPage } from '@/components/DemoPage';

export const metadata: Metadata = {
  title: 'Demolition Contractor — Call for Your Price | Servant King Demolition',
  description:
    'Kitchen, bathroom, interior, deck, pool and concrete demolition with haul-off included. Licensed C-21 contractor (CSLB #1142322). Tap what’s coming out and call for a real number.'
};

export default function Demolition() {
  return <DemoPage category="general" />;
}
