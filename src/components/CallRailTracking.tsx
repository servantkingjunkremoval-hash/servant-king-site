import Script from 'next/script';

/**
 * CallRail session tracking, WITHOUT dynamic number insertion.
 *
 * Why this exists separately from the plain <Script> on /demolition:
 *
 * CallRail's swap.js does two jobs. It records the visit — source, campaign,
 * and OpenAI's `oppref` click id, which CallRail reads automatically — and it
 * rewrites phone numbers on the page to a pool number. We want the first job
 * on the ChatGPT landing pages and emphatically NOT the second.
 *
 * The reason is the text thread. /answers and /go lead with an sms: link that
 * pre-fills "Here's a photo:", and photo texts are how jobs actually get
 * quoted. Those texts have to land in Quo — the CHATGPT line (650) 383-3366 on
 * junk pages, the SKD DEMO line (650) 414-3366 on demolition ones — because
 * that is where the threads, missed-call rules and follow-up Zaps live. If
 * CallRail swapped the number, the photo would arrive in CallRail's inbox
 * instead and the lead would be invisible to every automation we have.
 *
 * So `data-calltrk-noswap` wraps the page: per CallRail's docs, nothing inside
 * that element or its children is ever swapped. The wrapper is display:contents
 * so it adds no box and cannot disturb the layout.
 *
 * The trade: ChatGPT CALLS are not attributed down to the ad group, because the
 * caller dials a Quo number CallRail never sees. Channel attribution is already
 * handled without CallRail — the Quo line that rings says ChatGPT vs Google and
 * junk vs demo. What this adds is sessions and form submissions resolved to the
 * right campaign instead of "Direct / Unknown".
 *
 * To turn swapping on later, drop the wrapper and point the CallRail tracker's
 * swap target at the Quo number, with the tracking number forwarding back into
 * that same Quo line so the thread survives. Do not do it without that forward.
 *
 * /demolition deliberately does NOT use this component — it swaps on purpose
 * for Google paid traffic. See src/app/demolition/layout.tsx.
 */
export function CallRailNoSwap({ children }: { children: React.ReactNode }) {
  return (
    <div data-calltrk-noswap className="contents">
      {children}
      <Script
        id="callrail-swap-noswap"
        src="https://cdn.callrail.com/companies/449033682/68972f73c82c5619a310/12/swap.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
