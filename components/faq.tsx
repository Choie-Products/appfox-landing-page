import { Plus } from "lucide-react";

export type FaqItem = { q: string; a: React.ReactNode };

/** Ruled list of expandable questions, in the same register as the pricing table rows. */
export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-line">
          <summary className="flex items-start justify-between gap-6 py-4 text-left text-[16px] font-medium leading-6 text-ink">
            <span>{item.q}</span>
            <Plus className="faq-icon mt-0.5 size-4 shrink-0 text-quiet" strokeWidth={2} />
          </summary>
          <div className="max-w-[600px] pb-5 text-[16px] leading-[26px] text-muted">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
