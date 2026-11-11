import { CallRailNoSwap } from '@/components/CallRailTracking';

/**
 * /answers/* are the ChatGPT-ads landing pages. They keep the site chrome (a
 * reader arriving from an answer card should be able to look around), so this
 * layout exists only to add CallRail session tracking with number swapping
 * disabled. See src/components/CallRailTracking.tsx for why swapping is off.
 */
export default function AnswersLayout({ children }: { children: React.ReactNode }) {
  return <CallRailNoSwap>{children}</CallRailNoSwap>;
}
