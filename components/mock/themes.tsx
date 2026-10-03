import { Chip } from "@/components/mock/chip";
import Window from "@/components/mock/window";

const themes = [
  { name: "Body consistency", kind: "Bug", share: 24, trend: "+9 pts", bad: true },
  { name: "Generation speed", kind: "Quality", share: 17, trend: "+2 pts", bad: true },
  { name: "Cancel flow", kind: "Pricing", share: 11, trend: "-3 pts", bad: false },
  { name: "Outfit variety", kind: "Request", share: 9, trend: "+1 pt", bad: false },
  { name: "Looks real", kind: "Praise", share: 22, trend: "0", bad: false },
];

export default function Themes({ className }: { className?: string }) {
  return (
    <Window title="Customers" meta="880 collected reviews, 30 days" className={className} bodyClassName="p-0">
      <div className="grid md:grid-cols-[1.1fr_1fr]">
        <ul className="divide-y divide-line">
          {themes.map((t) => (
            <li key={t.name} className="flex items-center gap-3 px-4 py-2.5">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-[13px] text-ink">{t.name}</span>
                  <Chip>{t.kind}</Chip>
                </div>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-line">
                  <div className="h-full rounded-full bg-ink" style={{ width: `${t.share * 3}%` }} />
                </div>
              </div>
              <div className="w-20 text-right">
                <span className="tabular block text-[13px] text-ink">{t.share}%</span>
                <span className={`tabular block text-[11px] ${t.bad ? "text-danger" : "text-muted"}`}>{t.trend}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="border-t border-line bg-paper p-4 md:border-l md:border-t-0">
          <p className="text-[11px] text-muted">Original review, 2 stars, v2.8, US</p>
          <p className="mt-2 font-heading text-[15px] leading-relaxed text-ink">
            &ldquo;The try-on looks great on the model but my own photos come out with a different body shape every
            time. Cancelled after the trial.&rdquo;
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Chip tone="accent">Body consistency</Chip>
            <Chip tone="accent">Trial cancels</Chip>
            <Chip>Severity high</Chip>
            <Chip>Confidence 0.86</Chip>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-muted">
            Labels are model-derived. The customer&rsquo;s words stay attached to every count.
          </p>
        </div>
      </div>
    </Window>
  );
}
