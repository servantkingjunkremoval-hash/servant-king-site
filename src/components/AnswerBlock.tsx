import type { FactRow } from '@/lib/answerBlocks';

/**
 * The three extraction-friendly elements answer engines actually lift:
 * a direct answer, a real <table>, and a real <ol>. Shared by the service and
 * service-area templates so both stay in the same shape.
 *
 * Headings are H2 so the H1 -> H2 -> H3 ladder on these pages stays unbroken.
 */

export function AnswerSummary({ heading, answer }: { heading: string; answer: string }) {
  return (
    <section className="bg-white py-12 md:py-14">
      <div className="container-content max-w-narrow">
        <div className="rounded-xl border-l-4 border-gold bg-cream p-6 md:p-8">
          <h2 className="eyebrow mb-3">{heading}</h2>
          <p className="text-[17px] font-semibold leading-relaxed text-charcoal md:text-[19px]">
            {answer}
          </p>
        </div>
      </div>
    </section>
  );
}

export function FactsTable({ caption, rows }: { caption: string; rows: FactRow[] }) {
  return (
    <section className="bg-cream py-12 md:py-14">
      <div className="container-content">
        <h2 className="h2">{caption}</h2>
        <div className="mt-6 overflow-x-auto rounded-xl bg-white ring-1 ring-charcoal/5">
          <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
            <tbody>
              {rows.map(([label, value], i) => (
                <tr key={label} className={i % 2 === 1 ? 'bg-warmCream/40' : undefined}>
                  <th
                    scope="row"
                    className="w-[34%] border-t border-charcoal/10 px-5 py-4 align-top font-semibold text-charcoal"
                  >
                    {label}
                  </th>
                  <td className="border-t border-charcoal/10 px-5 py-4 align-top text-charcoal">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function BookingSteps({
  heading,
  steps
}: {
  heading: string;
  steps: { title: string; body: string }[];
}) {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container-content max-w-narrow">
        <h2 className="h2">{heading}</h2>
        <ol className="mt-8 space-y-5">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple font-display text-[16px] font-semibold text-cream"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-[19px] font-semibold leading-snug text-charcoal">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[16px] leading-relaxed text-charcoal">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
