/** Five stars filled to `value` out of 5. */
export default function Stars({
  value,
  className = "",
  empty = "#d6d6d3",
}: {
  value: number;
  className?: string;
  empty?: string;
}) {
  return (
    <span className={`relative inline-block whitespace-nowrap leading-none ${className}`} aria-hidden="true">
      <span style={{ color: empty }}>★★★★★</span>
      <span className="absolute inset-0 overflow-hidden text-[#ffa31a]" style={{ width: `${(value / 5) * 100}%` }}>
        ★★★★★
      </span>
    </span>
  );
}
