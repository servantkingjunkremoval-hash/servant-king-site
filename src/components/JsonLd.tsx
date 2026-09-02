// Server-rendered JSON-LD.
//
// IMPORTANT: do NOT replace this with next/script. `<Script strategy="afterInteractive">`
// injects the tag client-side, so the structured data never appears in the raw HTML
// response. AI crawlers (GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended)
// do not execute JavaScript, so schema delivered that way is invisible to them.
// This component emits a real <script type="application/ld+json"> in the server response.

export function JsonLd({ id, data }: { id: string; data: unknown }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c')
      }}
    />
  );
}
