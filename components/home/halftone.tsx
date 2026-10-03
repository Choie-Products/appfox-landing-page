import type { CSSProperties } from "react";

/** The full logo mark, with its inner cut-outs. 134 x 141 viewBox. */
const FOX =
  "M122.208 0L87.9046 40.5921L67 48.0707L46.0954 40.5921L11.7917 0L0 96.137L54.1367 141H79.8633L134 96.137L122.208 0ZM23.5565 65.1501L55.3073 70.1747V92.4223L44.9473 76.8997L23.552 65.1501H23.5565ZM67 121.839L50.3592 113.1L67 104.36L83.6408 113.1L67 121.839ZM89.0482 76.8997L78.6882 92.4223V70.1747L110.439 65.1501L89.0437 76.8997H89.0482Z";
const W = 2000;
const WAVE_SECONDS = 5;

const INK = "#111111";
const GRAY = "#c8c8c4";
const LIGHT = "#9b9b97";

/**
 * Six rows of marks. Base sizes follow a slow wave along each row, like a halftone screen.
 * Each row has a resting color and a "hot" color it flashes to as the wave crest passes:
 * every row turns the same mid gray, so the crest reads as a band of light sweeping across.
 */
const ROWS = [
  { y: 60, color: INK, hot: LIGHT, min: 10, max: 34, count: 19, x0: 35, phase: 0.4 },
  { y: 162, color: INK, hot: LIGHT, min: 10, max: 34, count: 18, x0: 68, phase: 2.1 },
  { y: 262, color: INK, hot: LIGHT, min: 14, max: 52, count: 18, x0: 100, phase: 1.0 },
  { y: 370, color: INK, hot: LIGHT, min: 14, max: 52, count: 19, x0: 48, phase: 3.2 },
  { y: 475, color: GRAY, hot: LIGHT, min: 12, max: 44, count: 19, x0: 65, phase: 0.0 },
  { y: 548, color: GRAY, hot: LIGHT, min: 8, max: 26, count: 19, x0: 35, phase: 2.6 },
];

const marks = ROWS.flatMap((row, r) => {
  const step = (W - 2 * row.x0) / (row.count - 1);
  return Array.from({ length: row.count }, (_, i) => {
    const cx = row.x0 + i * step;
    const wave = 0.5 + 0.5 * Math.sin(i * 0.95 + row.phase);
    const s = (row.min + (row.max - row.min) * wave) / 134;
    // One crest for the whole band: delay depends only on horizontal position, so every row
    // moves together and the wave sweeps left to right as a single vertical front.
    const delay = -(cx / W) * WAVE_SECONDS;
    return { key: `${r}-${i}`, color: row.color, hot: row.hot, cx, cy: row.y, s, delay };
  });
});

/**
 * The halftone pattern alone, sized by the caller. A wave of scale, lift, and color runs
 * through the marks. Marks are solid by default; pass `outline` for hairline outlines instead.
 */
export function HalftoneSvg({ className, outline = false }: { className?: string; outline?: boolean }) {
  return (
    <svg
      viewBox={`0 0 ${W} 583`}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      className={`${outline ? "halftone-outline " : ""}${className ?? ""}`}
      aria-hidden="true"
    >
      {marks.map((m) => (
        <g key={m.key} transform={`translate(${m.cx.toFixed(1)} ${m.cy})`}>
          <g
            className="halftone-fox"
            style={{ "--delay": `${m.delay.toFixed(2)}s`, "--base": m.color, "--hot": m.hot } as CSSProperties}
          >
            <path
              d={FOX}
              transform={`scale(${m.s.toFixed(4)}) translate(-67 -70.5)`}
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </g>
      ))}
    </svg>
  );
}

/** Decorative halftone band on its own. */
export default function Halftone() {
  return (
    <section className="bg-transparent" aria-hidden="true">
      <HalftoneSvg className="block h-[280px] w-full sm:h-[380px] lg:h-[440px]" />
    </section>
  );
}
