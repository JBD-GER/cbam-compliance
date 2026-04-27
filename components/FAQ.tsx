type FAQItem = {
  question: string;
  answer: string;
};

export function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <div className="divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-white/80 shadow-sm">
      {items.map((item) => (
        <details key={item.question} className="group px-6 py-5 open:bg-white">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left font-semibold text-navy">
            {item.question}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-lg transition group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
