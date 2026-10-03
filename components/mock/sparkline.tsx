export default function Sparkline({
  points,
  className = "h-8 w-24",
  stroke = "currentColor",
  marker,
}: {
  points: number[];
  className?: string;
  stroke?: string;
  marker?: number;
}) {
  const w = 100;
  const h = 32;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => [i * step, h - ((p - min) / range) * (h - 4) - 2] as const);
  const d = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const mk = marker !== undefined ? coords[marker] : null;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none" aria-hidden="true">
      <path d={d} fill="none" stroke={stroke} strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" />
      {mk ? <line x1={mk[0]} x2={mk[0]} y1="0" y2={h} stroke="var(--line-strong)" strokeDasharray="2 2" /> : null}
    </svg>
  );
}
