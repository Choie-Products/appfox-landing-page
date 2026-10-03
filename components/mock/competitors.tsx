import { Chip, Delta } from "@/components/mock/chip";
import Window from "@/components/mock/window";

const rows = [
  { app: "Fitly", type: "Direct", rating: "4.7", rd: "+0.1", reviews: "+312", rank: "#3", rk: "+2", price: "$6.99 wk", change: "Subtitle changed", good: true },
  { app: "Snapfit", type: "Direct", rating: "4.5", rd: "-0.2", reviews: "+88", rank: "#8", rk: "-3", price: "$39.99 yr", change: "Price increased", good: false },
  { app: "Dressr", type: "Direct", rating: "4.6", rd: "0.0", reviews: "+140", rank: "#11", rk: "+1", price: "$4.99 wk", change: "Version 3.2", good: true },
  { app: "Outfit Lab", type: "Adjacent", rating: "4.3", rd: "+0.3", reviews: "+54", rank: "—", rk: "", price: "Free, IAP", change: "New screenshots", good: true },
  { app: "Mirror AI", type: "Direct", rating: "4.1", rd: "-0.4", reviews: "+201", rank: "#19", rk: "-6", price: "$9.99 wk", change: "1-star velocity", good: false },
];

export default function Competitors({ className }: { className?: string }) {
  return (
    <Window title="Market" meta="US, English. 7-day window" className={className} bodyClassName="p-0">
      <table className="w-full text-left text-[12.5px]">
        <thead className="text-[11px] text-muted">
          <tr className="border-b border-line">
            <th className="px-4 py-2.5 font-medium">App</th>
            <th className="px-2 py-2.5 font-medium">Rating</th>
            <th className="px-2 py-2.5 font-medium">New reviews</th>
            <th className="px-2 py-2.5 font-medium">Query rank</th>
            <th className="hidden px-2 py-2.5 font-medium sm:table-cell">Pricing</th>
            <th className="hidden px-4 py-2.5 font-medium md:table-cell">Last change</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.app} className="border-b border-line last:border-0">
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="size-6 shrink-0 rounded-md bg-gradient-to-br from-line to-line-strong" />
                  <span className="text-ink">{r.app}</span>
                  <Chip className="hidden sm:inline-flex">{r.type}</Chip>
                </div>
              </td>
              <td className="px-2 py-2.5 tabular">
                {r.rating} <Delta value={r.rd} good={!r.rd.startsWith("-")} />
              </td>
              <td className="px-2 py-2.5 tabular text-ink">{r.reviews}</td>
              <td className="px-2 py-2.5 tabular">
                {r.rank} {r.rk ? <Delta value={r.rk} good={r.rk.startsWith("+")} /> : null}
              </td>
              <td className="hidden px-2 py-2.5 text-ink-soft sm:table-cell">{r.price}</td>
              <td className="hidden px-4 py-2.5 md:table-cell">
                <span className={r.good ? "text-ink-soft" : "text-danger"}>{r.change}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Window>
  );
}
