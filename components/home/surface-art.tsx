import { FOX_PATH } from "@/components/fox-mark";

/**
 * Small isometric scenes for the surface cards and the editorial rows, drawn in the soft style of the
 * layer stack: light gray and white slabs with solid sides, and an orange piece in each.
 */

const K = 0.5;

type Cmd = ["M" | "L", number, number] | ["Q", number, number, number, number] | ["Z"];
type Tone = "gray" | "white" | "brand";

const f = (n: number) => n.toFixed(1);

/** Projects a point on the floor (u, v) around (cx, cy) onto the drawing. */
function iso(cx: number, cy: number, u: number, v: number): [number, number] {
  return [cx + (u - v) / Math.SQRT2, cy + (K * (u + v)) / Math.SQRT2];
}

/** Turns a floor-space outline into an SVG path. Quadratic corners stay exact under the projection. */
function toPath(cmds: Cmd[], cx: number, cy: number) {
  return cmds
    .map((c) => {
      if (c[0] === "Z") return "Z";
      if (c[0] === "Q") {
        const [x1, y1] = iso(cx, cy, c[1], c[2]);
        const [x, y] = iso(cx, cy, c[3], c[4]);
        return `Q${f(x1)} ${f(y1)} ${f(x)} ${f(y)}`;
      }
      const [x, y] = iso(cx, cy, c[1], c[2]);
      return `${c[0]}${f(x)} ${f(y)}`;
    })
    .join(" ");
}

/** A rounded rectangle on the floor, a long along u and b along v. */
function roundRect(a: number, b: number, r: number): Cmd[] {
  return [
    ["M", -a + r, -b],
    ["L", a - r, -b],
    ["Q", a, -b, a, -b + r],
    ["L", a, b - r],
    ["Q", a, b, a - r, b],
    ["L", -a + r, b],
    ["Q", -a, b, -a, b - r],
    ["L", -a, -b + r],
    ["Q", -a, -b, -a + r, -b],
    ["Z"],
  ];
}

/** A rounded speech bubble with its tail off the front-left edge. */
function bubble(a: number, b: number, r: number): Cmd[] {
  return [
    ["M", -a + r, -b],
    ["L", a - r, -b],
    ["Q", a, -b, a, -b + r],
    ["L", a, b - r],
    ["Q", a, b, a - r, b],
    ["L", -a * 0.25, b],
    ["L", -a * 0.62, b + b * 0.6],
    ["L", -a * 0.55, b],
    ["L", -a + r, b],
    ["Q", -a, b, -a, b - r],
    ["L", -a, -b + r],
    ["Q", -a, -b, -a + r, -b],
    ["Z"],
  ];
}

function Gradients({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-top-gray`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f7f7f6" />
        <stop offset="1" stopColor="#e6e6e4" />
      </linearGradient>
      <linearGradient id={`${id}-side-gray`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#e2e2df" />
        <stop offset="1" stopColor="#c9c9c6" />
      </linearGradient>
      <linearGradient id={`${id}-top-white`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#f2f2f0" />
      </linearGradient>
      <linearGradient id={`${id}-side-white`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#e9e9e6" />
        <stop offset="1" stopColor="#d2d2cf" />
      </linearGradient>
      <radialGradient id={`${id}-top-brand`} cx="0.5" cy="0.5" r="0.65">
        <stop offset="0" stopColor="#ff7a3a" />
        <stop offset="0.55" stopColor="#ff9c66" />
        <stop offset="1" stopColor="#ffc6a6" />
      </radialGradient>
      <linearGradient id={`${id}-side-brand`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#f6a77c" />
        <stop offset="1" stopColor="#e3793f" />
      </linearGradient>
      <radialGradient id={`${id}-shadow`}>
        <stop offset="0" stopColor="#111111" stopOpacity="0.16" />
        <stop offset="1" stopColor="#111111" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

/** An extruded shape: its sides stacked from the bottom up, then the top face. `cy` is the top face. */
function Slab({ id, shape, cx, cy, depth, tone }: { id: string; shape: Cmd[]; cx: number; cy: number; depth: number; tone: Tone }) {
  const steps: number[] = [];
  for (let d = depth; d > 0; d -= 1.5) steps.push(d);
  return (
    <g>
      {steps.map((d) => (
        <path key={d} d={toPath(shape, cx, cy + d)} fill={`url(#${id}-side-${tone})`} />
      ))}
      <path
        d={toPath(shape, cx, cy)}
        fill={`url(#${id}-top-${tone})`}
        stroke={tone === "brand" ? "rgba(255,226,208,0.9)" : "rgba(255,255,255,0.95)"}
        strokeWidth={1.2}
      />
    </g>
  );
}

/** A short rounded line lying on a surface, like a line of text. */
function Line({ cx, cy, v, from, to, color, width = 6 }: { cx: number; cy: number; v: number; from: number; to: number; color: string; width?: number }) {
  const [x1, y1] = iso(cx, cy, from, v);
  const [x2, y2] = iso(cx, cy, to, v);
  return <path d={`M${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)}`} stroke={color} strokeWidth={width} strokeLinecap="round" />;
}

const BASE = { cx: 200, cy: 168 };
const PLATE = roundRect(112, 112, 26);

function Base({ id }: { id: string }) {
  return <Slab id={id} shape={PLATE} cx={BASE.cx} cy={BASE.cy} depth={14} tone="gray" />;
}

/** Today: three ranked rows; the first is orange and lifted. */
export function TodayArt({ className }: { className?: string }) {
  const id = "art-today";
  const rows = [
    { v: -58, tone: "brand" as const, lift: 22 },
    { v: 0, tone: "white" as const, lift: 0 },
    { v: 58, tone: "white" as const, lift: 0 },
  ];
  const ROW = roundRect(82, 21, 14);
  return (
    <svg viewBox="34 44 332 236" className={className} role="img" aria-label="Three ranked rows; the first is raised and orange.">
      <Gradients id={id} />
      <Base id={id} />
      {rows.map((row, i) => {
        const [cx, cy0] = iso(BASE.cx, BASE.cy, 0, row.v);
        const cy = cy0 - 10 - row.lift;
        const brand = row.tone === "brand";
        const [dx, dy] = iso(cx, cy, -56, 0);
        return (
          <g key={row.v}>
            {row.lift ? <ellipse cx={cx} cy={cy0 + 2} rx={70} ry={26} fill={`url(#${id}-shadow)`} /> : null}
            <Slab id={id} shape={ROW} cx={cx} cy={cy} depth={10} tone={row.tone} />
            <ellipse cx={dx} cy={dy} rx={12} ry={6} fill={brand ? "#ffffff" : "#e4e4e1"} />
            <Mark x={dx} y={dy} size={17} color={brand ? "#fe5000" : "#8a8a87"} draw={label(String(i + 1))} />
            <Line cx={cx} cy={cy} v={0} from={-30} to={brand ? 50 : 30 - i * 12} color={brand ? "rgba(255,255,255,0.85)" : "#e0e0dd"} />
          </g>
        );
      })}
    </svg>
  );
}

/** Market: a row of competitor columns of different heights; the tallest is orange. */
export function MarketArt({ className }: { className?: string }) {
  const id = "art-market";
  const bars = [
    { u: -66, h: 44 },
    { u: -22, h: 70 },
    { u: 22, h: 54 },
    { u: 66, h: 104, brand: true },
  ];
  const PILLAR = roundRect(19, 19, 8);
  return (
    <svg viewBox="34 44 332 236" className={className} role="img" aria-label="Four columns of different heights; the tallest is orange.">
      <Gradients id={id} />
      <Base id={id} />
      {bars.map((bar) => {
        const [cx, cy0] = iso(BASE.cx, BASE.cy, bar.u, 6);
        return (
          <Slab
            key={bar.u}
            id={id}
            shape={PILLAR}
            cx={cx}
            cy={cy0 - bar.h}
            depth={bar.h}
            tone={bar.brand ? "brand" : "white"}
          />
        );
      })}
    </svg>
  );
}

/** Customers: a review bubble with lines of text, and a small orange bubble with a star. */
export function CustomersArt({ className }: { className?: string }) {
  const id = "art-customers";
  const [bx, by0] = iso(BASE.cx, BASE.cy, -8, -18);
  const big = { cx: bx, cy: by0 - 44 };
  const [sx, sy0] = iso(BASE.cx, BASE.cy, 52, 62);
  const small = { cx: sx, cy: sy0 - 30 };
  const [starX, starY] = [small.cx, small.cy];
  return (
    <svg viewBox="34 44 332 236" className={className} role="img" aria-label="A review bubble with lines of text, and a small orange bubble with a star.">
      <Gradients id={id} />
      <Base id={id} />
      <ellipse cx={bx} cy={by0 + 4} rx={96} ry={40} fill={`url(#${id}-shadow)`} />
      <ellipse cx={sx} cy={sy0 + 2} rx={50} ry={20} fill={`url(#${id}-shadow)`} />
      <Slab id={id} shape={bubble(80, 52, 18)} cx={big.cx} cy={big.cy} depth={12} tone="white" />
      <Line cx={big.cx} cy={big.cy} v={-24} from={-52} to={44} color="#e0e0dd" />
      <Line cx={big.cx} cy={big.cy} v={-2} from={-52} to={24} color="#fe5000" />
      <Line cx={big.cx} cy={big.cy} v={20} from={-52} to={4} color="#e0e0dd" />
      <Slab id={id} shape={bubble(34, 28, 12)} cx={small.cx} cy={small.cy} depth={10} tone="brand" />
      <Mark x={starX} y={starY} size={22} color="#ffffff" draw={fillPath(STAR)} />
    </svg>
  );
}

/** A round key standing on the floor: an extruded ellipse. `cy` is its top face. */
function Cylinder({ id, cx, cy, r, depth, tone }: { id: string; cx: number; cy: number; r: number; depth: number; tone: Tone }) {
  const steps: number[] = [];
  for (let d = depth; d > 0; d -= 1.5) steps.push(d);
  return (
    <g>
      {steps.map((d) => (
        <ellipse key={d} cx={cx} cy={cy + d} rx={r} ry={r * K} fill={`url(#${id}-side-${tone})`} />
      ))}
      <ellipse
        cx={cx}
        cy={cy}
        rx={r}
        ry={r * K}
        fill={`url(#${id}-top-${tone})`}
        stroke={tone === "brand" ? "rgba(255,226,208,0.9)" : "rgba(255,255,255,0.95)"}
        strokeWidth={1.2}
      />
    </g>
  );
}

/** A dotted orange line across the floor from one point to another, flowing toward the end. */
function Flow({ cx, cy, from, to, bend = 0, duration = "1s" }: { cx: number; cy: number; from: [number, number]; to: [number, number]; bend?: number; duration?: string }) {
  const [x1, y1] = iso(cx, cy, from[0], from[1]);
  const [x2, y2] = iso(cx, cy, to[0], to[1]);
  const [mx, my] = iso(cx, cy, (from[0] + to[0]) / 2 + bend, (from[1] + to[1]) / 2 - bend);
  return (
    <path
      d={`M${f(x1)} ${f(y1)} Q${f(mx)} ${f(my)} ${f(x2)} ${f(y2)}`}
      fill="none"
      stroke="#fe5000"
      strokeWidth={2.5}
      strokeLinecap="round"
      className="ledger-flow"
      style={{ animationDuration: duration }}
    />
  );
}

/**
 * A small icon lying flat on a surface at (x, y), turned the same way as the text lines.
 * The icon is drawn by `draw` in a 24×24 box.
 */
function Mark({
  x,
  y,
  size = 18,
  color,
  draw,
}: {
  x: number;
  y: number;
  size?: number;
  color: string;
  draw: (color: string) => React.ReactNode;
}) {
  return (
    <g transform={`translate(${f(x)} ${f(y)}) scale(1 ${K}) rotate(45)`}>
      <g transform={`scale(${size / 24}) translate(-12 -12)`}>{draw(color)}</g>
    </g>
  );
}

const fillPath = (d: string) => (c: string) => <path d={d} fill={c} />;
const strokePath = (d: string, width = 2.4) => (c: string) => (
  <path d={d} fill="none" stroke={c} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
);
const label = (text: string, weight = 700) => (c: string) => (
  <text x={12} y={12.5} textAnchor="middle" dominantBaseline="central" fontSize={18} fontWeight={weight} fill={c}>
    {text}
  </text>
);
const fox = (c: string) => <path d={FOX_PATH} fill={c} transform="translate(0 -0.6) scale(0.179)" />;

const STAR =
  "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z";
const BARS = "M4 7h11M4 12h16M4 17h8";
const ARROW_UP = "M12 20V5M5 11l7-7 7 7";
const CHECK = "M20 6 9 17l-5-5";

const WIDE = roundRect(132, 104, 26);

/** What changed: reviews, rankings, and releases flow into Appfox, which raises one flagged change. */
export function ChangedArt({ className }: { className?: string }) {
  const id = "art-changed";
  const sources = [
    { u: -78, v: -52, glyph: STAR, fill: true },
    { u: -78, v: 0, glyph: BARS, fill: false },
    { u: -78, v: 52, glyph: ARROW_UP, fill: false },
  ];
  const hub = { u: -4, v: 6 };
  const out = { u: 98, v: -34 };
  const TILE = roundRect(22, 22, 8);
  const [hx, hy0] = iso(BASE.cx, BASE.cy, hub.u, hub.v);
  const hy = hy0 - 14 - 8;
  const [ox, oy0] = iso(BASE.cx, BASE.cy, out.u, out.v);
  const oy = oy0 - 8 - 20;
  return (
    <svg viewBox="34 44 332 236" className={className} role="img" aria-label="Reviews, rankings, and releases flow into Appfox, which raises one flagged change.">
      <Gradients id={id} />
      <Slab id={id} shape={WIDE} cx={BASE.cx} cy={BASE.cy} depth={14} tone="gray" />
      {sources.map((src, i) => (
        <Flow key={src.v} cx={BASE.cx} cy={BASE.cy} from={[src.u, src.v]} to={[hub.u, hub.v]} bend={src.v / 3} duration={["1.1s", "0.9s", "1.3s"][i]} />
      ))}
      <Flow cx={BASE.cx} cy={BASE.cy} from={[hub.u, hub.v]} to={[out.u, out.v]} duration="1s" />
      {sources.map((src) => {
        const [x, y0] = iso(BASE.cx, BASE.cy, src.u, src.v);
        const y = y0 - 10;
        return (
          <g key={src.v}>
            <Slab id={id} shape={TILE} cx={x} cy={y} depth={10} tone="white" />
            <Mark
              x={x}
              y={y}
              size={src.fill ? 18 : 17}
              color={src.fill ? "#fe5000" : "#8f8f8c"}
              draw={src.fill ? fillPath(src.glyph) : strokePath(src.glyph)}
            />
          </g>
        );
      })}
      <ellipse cx={hx} cy={hy0 + 2} rx={48} ry={20} fill={`url(#${id}-shadow)`} />
      <Slab id={id} shape={roundRect(32, 32, 11)} cx={hx} cy={hy} depth={14} tone="brand" />
      <Mark x={hx} y={hy} size={30} color="#ffffff" draw={fox} />
      <ellipse cx={ox} cy={oy0 + 2} rx={58} ry={22} fill={`url(#${id}-shadow)`} />
      <Slab id={id} shape={roundRect(40, 28, 11)} cx={ox} cy={oy} depth={10} tone="white" />
      {(() => {
        const [dx, dy] = iso(ox, oy, -20, 0);
        return (
          <g>
            <ellipse cx={dx} cy={dy} rx={10} ry={5} fill="#fe5000" />
            <Mark x={dx} y={dy} size={16} color="#ffffff" draw={label("!", 800)} />
          </g>
        );
      })()}
      <Line cx={ox} cy={oy} v={-8} from={0} to={26} color="#e0e0dd" width={5} />
      <Line cx={ox} cy={oy} v={8} from={0} to={14} color="#e0e0dd" width={5} />
    </svg>
  );
}

/** What didn't change: a pile of drafts waits for you; the orange key is yours to press. */
export function DecisionArt({ className }: { className?: string }) {
  const id = "art-decision";
  const DRAFT = roundRect(58, 40, 13);
  const drafts = [0, 1, 2];
  const pile = { u: -56, v: -18 };
  const key = { u: 84, v: 36 };
  const [px, py0] = iso(BASE.cx, BASE.cy, pile.u, pile.v);
  const [kx, ky0] = iso(BASE.cx, BASE.cy, key.u, key.v);
  const top = drafts.length - 1;
  return (
    <svg viewBox="34 44 332 236" className={className} role="img" aria-label="A pile of drafts waits beside an orange approve key.">
      <Gradients id={id} />
      <Slab id={id} shape={WIDE} cx={BASE.cx} cy={BASE.cy} depth={14} tone="gray" />
      <ellipse cx={px} cy={py0 + 2} rx={82} ry={30} fill={`url(#${id}-shadow)`} />
      {drafts.map((i) => {
        const [x, y0] = iso(BASE.cx, BASE.cy, pile.u + i * 5, pile.v - i * 5);
        return <Slab key={i} id={id} shape={DRAFT} cx={x} cy={y0 - 8 - i * 12} depth={8} tone="white" />;
      })}
      {(() => {
        const [x, y0] = iso(BASE.cx, BASE.cy, pile.u + top * 5, pile.v - top * 5);
        const y = y0 - 8 - top * 12;
        return (
          <g>
            <Line cx={x} cy={y} v={-18} from={-36} to={34} color="#e0e0dd" />
            <Line cx={x} cy={y} v={0} from={-36} to={14} color="#fe5000" />
            <Line cx={x} cy={y} v={18} from={-36} to={-2} color="#e0e0dd" />
          </g>
        );
      })()}
      <Cylinder id={id} cx={kx} cy={ky0 - 6} r={44} depth={6} tone="gray" />
      <Cylinder id={id} cx={kx} cy={ky0 - 6 - 20} r={34} depth={20} tone="brand" />
      <Mark x={kx} y={ky0 - 26} size={28} color="#ffffff" draw={strokePath(CHECK, 3)} />
    </svg>
  );
}

