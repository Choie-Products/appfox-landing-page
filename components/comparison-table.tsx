import type { Row } from "@/content/competitors";

/**
 * The side-by-side table on comparison pages. A real table, so the rows read as a
 * structured comparison for crawlers; on phones each row stacks its two cells.
 */
export default function ComparisonTable({ name, rows }: { name: string; rows: Row[] }) {
  return (
    <div className="soft-surface overflow-hidden rounded-[28px]">
      <table className="w-full border-collapse text-left text-[15px] leading-[22px]">
        <thead className="hidden md:table-header-group">
          <tr className="border-b border-line">
            <th scope="col" className="w-[22%] px-6 py-4 font-mono text-[12px] font-medium uppercase leading-4 text-quiet">
              Feature
            </th>
            <th scope="col" className="w-[39%] px-6 py-4 font-mono text-[12px] font-medium uppercase leading-4 text-ink">
              {name}
            </th>
            <th scope="col" className="w-[39%] px-6 py-4 font-mono text-[12px] font-medium uppercase leading-4 text-accent-ink">
              Appfox
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="grid border-b border-line last:border-b-0 md:table-row">
              <th scope="row" className="px-6 pt-5 font-mono text-[12px] font-medium uppercase leading-4 text-ink md:py-5 md:align-top">
                {row.label}
              </th>
              <td className="px-6 pt-3 text-muted md:py-5 md:align-top">
                <span className="block pb-1 font-mono text-[11px] uppercase leading-4 text-quiet md:hidden">{name}</span>
                {row.them}
              </td>
              <td className="px-6 pb-5 pt-3 text-ink-soft md:py-5 md:align-top">
                <span className="block pb-1 font-mono text-[11px] uppercase leading-4 text-accent-ink md:hidden">Appfox</span>
                {row.us}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
