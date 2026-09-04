import type { Metadata } from 'next';
import { GoPage } from '@/components/GoPage';

export const metadata: Metadata = {
  title: 'Get a Real Price in Minutes — Servant King Junk Removal',
  description: 'Tap what you need gone and call for your price. Same-day junk removal, licensed and insured, 350+ five-star reviews.'
};

export default function Go() {
  return <GoPage category="general" />;
}
