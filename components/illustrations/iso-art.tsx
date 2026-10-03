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

/*
 * Gentle loops (see "Isometric illustration loops" in globals.css). Floating pieces bob while their
 * shadows breathe in step; columns rise and settle; keys press. All of it stops for reduced motion.
 */
function Bob({ children, delay = 0, slow = false }: { children: React.ReactNode; delay?: number; slow?: boolean }) {
  return (
    <g className={slow ? "iso-bob iso-slow" : "iso-bob"} style={{ animationDelay: `${delay}s` }}>
      {children}
    </g>
  );
}

function Shade({ cx, cy, rx, ry, id, delay = 0, slow = false }: { cx: number; cy: number; rx: number; ry: number; id: string; delay?: number; slow?: boolean }) {
  return (
    <ellipse
      className={slow ? "iso-shade iso-slow" : "iso-shade"}
      style={{ animationDelay: `${delay}s` }}
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      fill={`url(#${id}-shadow)`}
    />
  );
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
            {row.lift ? <Shade cx={cx} cy={cy0 + 2} rx={70} ry={26} id={id} /> : null}
            <g className={row.lift ? "iso-bob" : undefined}>
              <Slab id={id} shape={ROW} cx={cx} cy={cy} depth={10} tone={row.tone} />
              <ellipse cx={dx} cy={dy} rx={12} ry={6} fill={brand ? "#ffffff" : "#e4e4e1"} />
              <Mark x={dx} y={dy} size={17} color={brand ? "#fe5000" : "#8a8a87"} draw={label(String(i + 1))} />
              <Line cx={cx} cy={cy} v={0} from={-30} to={brand ? 50 : 30 - i * 12} color={brand ? "rgba(255,255,255,0.85)" : "#e0e0dd"} />
            </g>
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
      {bars.map((bar, i) => {
        const [cx, cy0] = iso(BASE.cx, BASE.cy, bar.u, 6);
        return (
          <g
            key={bar.u}
            className={bar.brand ? "iso-grow" : "iso-grow iso-grow-soft"}
            style={{ animationDelay: `${i * -0.7}s` }}
          >
            <Slab id={id} shape={PILLAR} cx={cx} cy={cy0 - bar.h} depth={bar.h} tone={bar.brand ? "brand" : "white"} />
          </g>
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
      <Shade cx={bx} cy={by0 + 4} rx={96} ry={40} id={id} slow />
      <Shade cx={sx} cy={sy0 + 2} rx={50} ry={20} id={id} delay={-1.6} />
      <Bob slow>
        <Slab id={id} shape={bubble(80, 52, 18)} cx={big.cx} cy={big.cy} depth={12} tone="white" />
        <Line cx={big.cx} cy={big.cy} v={-24} from={-52} to={44} color="#e0e0dd" />
        <Line cx={big.cx} cy={big.cy} v={-2} from={-52} to={24} color="#fe5000" />
        <Line cx={big.cx} cy={big.cy} v={20} from={-52} to={4} color="#e0e0dd" />
      </Bob>
      <Bob delay={-1.6}>
        <Slab id={id} shape={bubble(34, 28, 12)} cx={small.cx} cy={small.cy} depth={10} tone="brand" />
        <Mark x={starX} y={starY} size={22} color="#ffffff" draw={fillPath(STAR)} />
      </Bob>
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

/** A shallow groove across the floor, along a quadratic curve given in floor coordinates. */
function trackPath(cx: number, cy: number, [p0, p1, p2]: [number, number][]) {
  const [x0, y0] = iso(cx, cy, p0[0], p0[1]);
  const [x1, y1] = iso(cx, cy, p1[0], p1[1]);
  const [x2, y2] = iso(cx, cy, p2[0], p2[1]);
  return `M${f(x0)} ${f(y0)} Q${f(x1)} ${f(y1)} ${f(x2)} ${f(y2)}`;
}

/**
 * A soft gray pipe along a path. On the floor it gets a fine white highlight underneath; pipes that are
 * drawn in pieces (like the layer stack's) skip it, so no highlight peeks out at the joins.
 */
export function Groove({ d, width = 3, highlight = true }: { d: string; width?: number; highlight?: boolean }) {
  return (
    <g fill="none" strokeLinecap="round">
      {highlight ? (
        <path d={d} stroke="#ffffff" strokeWidth={width * 0.8} transform={`translate(0 ${width * 0.4})`} />
      ) : null}
      <path d={d} stroke="#d4d4d1" strokeWidth={width} />
    </g>
  );
}

/**
 * A comet of light that runs along a pipe, then waits for its next turn: a soft glow, an orange body,
 * and a bright head with a white core, all sliding together. One cycle lasts `dur` seconds; the run
 * itself takes the first `travel` share of it. Each layer is one dash on a path normalized to length 1.
 */
export function Packet({
  d,
  begin,
  dur = 2.7,
  width = 3,
  travel = 0.45,
}: {
  d: string;
  begin: number;
  dur?: number;
  width?: number;
  travel?: number;
}) {
  const layers = [
    { len: 0.34, w: width * 2.6, color: "#fe5000", op: 0.16 },
    { len: 0.22, w: width, color: "#fe5000", op: 0.55 },
    { len: 0.06, w: width * 1.3, color: "#fe5000", op: 1 },
    { len: 0.02, w: width * 0.55, color: "#ffffff", op: 0.9 },
  ];
  const run = 1.36;
  return (
    <g className="iso-packet" fill="none" strokeLinecap="round">
      {layers.map((l) => (
        <path
          key={l.len}
          d={d}
          pathLength={1}
          stroke={l.color}
          strokeOpacity={l.op}
          strokeWidth={l.w}
          strokeDasharray={`${l.len} 3`}
          strokeDashoffset={l.len}
        >
          <animate
            attributeName="stroke-dashoffset"
            values={`${l.len};${(l.len - run).toFixed(2)};${(l.len - run).toFixed(2)}`}
            keyTimes={`0;${travel};1`}
            calcMode="spline"
            keySplines="0.42 0 0.3 1;0 0 1 1"
            dur={`${dur}s`}
            begin={`${begin}s`}
            repeatCount="indefinite"
          />
        </path>
      ))}
    </g>
  );
}

/** What changed: reviews, rankings, and releases send streaks of light along grooves into Appfox, which flags one change. */
export function ChangedArt({ className }: { className?: string }) {
  const id = "art-changed";
  const C = BASE;
  const sources = [
    { u: -94, v: -50, glyph: STAR, fill: true },
    { u: -94, v: 0, glyph: BARS, fill: false },
    { u: -94, v: 50, glyph: ARROW_UP, fill: false },
  ];
  const hub = { u: 0, v: 0 };
  const out = { u: 100, v: -6 };
  const TILE = roundRect(22, 22, 8);
  const [hx, hy0] = iso(C.cx, C.cy, hub.u, hub.v);
  const hy = hy0 - 14 - 6;
  const [ox, oy0] = iso(C.cx, C.cy, out.u, out.v);
  const oy = oy0 - 10;
  const inbound = sources.map((src) =>
    trackPath(C.cx, C.cy, [
      [src.u + 24, src.v],
      [-50, src.v * 0.85],
      [hub.u - 32, src.v * 0.3],
    ]),
  );
  const outbound = trackPath(C.cx, C.cy, [
    [hub.u + 32, hub.v],
    [52, -3],
    [out.u - 32, out.v],
  ]);
  return (
    <svg viewBox="34 44 332 236" className={className} role="img" aria-label="Reviews, rankings, and releases flow into Appfox, which flags one change.">
      <Gradients id={id} />
      <Slab id={id} shape={WIDE} cx={C.cx} cy={C.cy} depth={14} tone="gray" />
      {inbound.map((d) => (
        <Groove key={d} d={d} />
      ))}
      <Groove d={outbound} />
      {inbound.map((d, i) => (
        <Packet key={d} d={d} begin={i * 0.9} />
      ))}
      <Packet d={outbound} begin={1.2} />
      {sources.map((src) => {
        const [x, y0] = iso(C.cx, C.cy, src.u, src.v);
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
      <Shade cx={hx} cy={hy0 + 2} rx={48} ry={20} id={id} slow delay={-1.2} />
      <Bob slow delay={-1.2}>
        <Slab id={id} shape={roundRect(32, 32, 11)} cx={hx} cy={hy} depth={14} tone="brand" />
        <Mark x={hx} y={hy} size={30} color="#ffffff" draw={fox} />
      </Bob>
      <Slab id={id} shape={roundRect(30, 26, 10)} cx={ox} cy={oy} depth={10} tone="white" />
      {(() => {
        const [dx, dy] = iso(ox, oy, -14, 0);
        return (
          <g className="iso-ping">
            <ellipse cx={dx} cy={dy} rx={9} ry={4.5} fill="#fe5000" />
            <Mark x={dx} y={dy} size={15} color="#ffffff" draw={label("!", 800)} />
          </g>
        );
      })()}
      <Line cx={ox} cy={oy} v={-7} from={2} to={20} color="#e0e0dd" width={5} />
      <Line cx={ox} cy={oy} v={7} from={2} to={12} color="#e0e0dd" width={5} />
    </svg>
  );
}

/**
 * The orange approve key. Every few seconds its top presses down into the key while the base stays put,
 * so the key gets shorter instead of sinking. The walls are one band (a rect plus the bottom ellipse) so
 * their height can shrink with the top. A still copy is shown instead when motion is reduced.
 */
function PressKey({
  id,
  cx,
  cy,
  r,
  depth,
  icon,
  travel = 7,
}: {
  id: string;
  cx: number;
  cy: number;
  r: number;
  depth: number;
  icon: React.ReactNode;
  travel?: number;
}) {
  const timing = {
    dur: "3.6s",
    repeatCount: "indefinite",
    keyTimes: "0;0.6;0.7;0.84;1",
    calcMode: "spline",
    keySplines: "0 0 1 1;0.4 0 0.2 1;0.3 0 0.2 1;0 0 1 1",
  } as const;
  const hold = (from: number, to: number) => `${from};${from};${to};${from};${from}`;
  const face = (
    <ellipse
      cx={cx}
      cy={cy}
      rx={r}
      ry={r * K}
      fill={`url(#${id}-top-brand)`}
      stroke="rgba(255,226,208,0.9)"
      strokeWidth={1.2}
    />
  );
  const base = <ellipse cx={cx} cy={cy + depth} rx={r} ry={r * K} fill={`url(#${id}-side-brand)`} />;
  return (
    <g>
      <g className="iso-motion">
        {base}
        <rect x={cx - r} y={cy} width={r * 2} height={depth} fill={`url(#${id}-side-brand)`}>
          <animate attributeName="y" values={hold(cy, cy + travel)} {...timing} />
          <animate attributeName="height" values={hold(depth, depth - travel)} {...timing} />
        </rect>
        <g>
          <animateTransform attributeName="transform" type="translate" values={`0 0;0 0;0 ${travel};0 0;0 0`} {...timing} />
          {face}
          {icon}
        </g>
      </g>
      <g className="iso-still">
        {base}
        <rect x={cx - r} y={cy} width={r * 2} height={depth} fill={`url(#${id}-side-brand)`} />
        {face}
        {icon}
      </g>
    </g>
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
      <Shade cx={px} cy={py0 + 2} rx={82} ry={30} id={id} slow />
      <Bob slow>
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
      </Bob>
      <Cylinder id={id} cx={kx} cy={ky0 - 6} r={44} depth={6} tone="gray" />
      <PressKey
        id={id}
        cx={kx}
        cy={ky0 - 26}
        r={34}
        depth={20}
        icon={<Mark x={kx} y={ky0 - 26} size={28} color="#ffffff" draw={strokePath(CHECK, 3)} />}
      />
    </svg>
  );
}


const LIGHTBULB =
  "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4";
const CROSS = "M18 6 6 18M6 6l12 12";
const LOCK = "M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4";
const MAIL = "M3 6h18v12H3zM3 7l9 6 9-6";
const QUESTION = "M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01";

/** A shield lying flat, its point toward the front. */
function shield(a: number, b: number, r: number): Cmd[] {
  return [
    ["M", -a, -b + r],
    ["Q", -a, -b, -a + r, -b],
    ["L", a * 0.15, -b],
    ["Q", a * 0.75, -b * 0.92, a, 0],
    ["Q", a * 0.75, b * 0.92, a * 0.15, b],
    ["L", -a + r, b],
    ["Q", -a, b, -a, b - r],
    ["Z"],
  ];
}

/** A small badge disc lying on a surface, with an icon on it. */
function Badge({ x, y, r = 9, fill, icon, color = "#ffffff", size = 13 }: { x: number; y: number; r?: number; fill: string; icon: (c: string) => React.ReactNode; color?: string; size?: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={r} ry={r * K} fill={fill} />
      <Mark x={x} y={y} size={size} color={color} draw={icon} />
    </g>
  );
}

/** Research: an idea card feeds a set of candidate apps you confirm, which becomes a written brief. */
export function ResearchArt({ className }: { className?: string }) {
  const id = "art-research";
  const C = BASE;
  const idea = { u: -80, v: -36 };
  const brief = { u: 90, v: -40 };
  const cluster = { u: 6, v: 32 };
  const tiles = [
    { du: -25, dv: -25, ok: true },
    { du: 25, dv: -25, ok: true },
    { du: -25, dv: 25, ok: false },
    { du: 25, dv: 25, ok: true },
  ];
  const TILE = roundRect(20, 20, 8);
  const IDEA = roundRect(40, 30, 11);
  const SHEET = roundRect(40, 30, 10);
  const at = (u: number, v: number) => iso(C.cx, C.cy, u, v);
  const [ix, iy0] = at(idea.u, idea.v);
  const iy = iy0 - 8 - 6;
  const [bx, by0] = at(brief.u, brief.v);
  /* Streaks run idea → candidates → brief; each lands in the first ~45% of a 3.2s cycle, and the piece it reaches pings. */
  const toCandidates = trackPath(C.cx, C.cy, [
    [idea.u + 42, idea.v],
    [cluster.u + 25, idea.v],
    [cluster.u + 25, cluster.v - 47],
  ]);
  const toBrief = trackPath(C.cx, C.cy, [
    [cluster.u + 47, cluster.v - 25],
    [brief.u, cluster.v - 25],
    [brief.u, brief.v + 32],
  ]);
  const ping = (arrive: number) => ({ animationDuration: "3.2s", animationDelay: `${(arrive - 0.86 * 3.2).toFixed(2)}s` });
  return (
    <svg viewBox="34 44 332 236" className={className} role="img" aria-label="An idea card feeds a set of candidate apps you confirm, which becomes a written brief.">
      <Gradients id={id} />
      <Slab id={id} shape={WIDE} cx={C.cx} cy={C.cy} depth={14} tone="gray" />
      <Groove d={toCandidates} />
      <Groove d={toBrief} />
      <Packet d={toCandidates} begin={0} dur={3.2} />
      <Packet d={toBrief} begin={1.6} dur={3.2} />
      <Shade cx={ix} cy={iy0 + 2} rx={60} ry={24} id={id} slow />
      <Bob slow>
      <Slab id={id} shape={IDEA} cx={ix} cy={iy} depth={8} tone="white" />
      {(() => {
        const [lx, ly] = iso(ix, iy, -22, 0);
        return <Badge x={lx} y={ly} r={11} fill="#fe5000" icon={strokePath(LIGHTBULB, 2.6)} size={15} />;
      })()}
      <Line cx={ix} cy={iy} v={-8} from={-4} to={30} color="#e0e0dd" width={5} />
      <Line cx={ix} cy={iy} v={9} from={-4} to={18} color="#fe5000" width={5} />
      </Bob>
      {tiles.map((t) => {
        const [x, y0] = at(cluster.u + t.du, cluster.v + t.dv);
        const y = y0 - 8;
        const reached = t.du > 0 && t.dv < 0;
        return (
          <g key={`${t.du}${t.dv}`}>
            <Slab id={id} shape={TILE} cx={x} cy={y} depth={8} tone="white" />
            <g className={reached ? "iso-ping" : undefined} style={reached ? ping(0.45 * 3.2) : undefined}>
            <Badge
              x={x}
              y={y}
              r={10}
              fill={t.ok ? "#fe5000" : "#dcdcd9"}
              icon={strokePath(t.ok ? CHECK : CROSS, 3.4)}
              color={t.ok ? "#ffffff" : "#8a8a87"}
              size={13}
            />
            </g>
          </g>
        );
      })}
      {[0, 1].map((i) => (
        <Slab key={i} id={id} shape={SHEET} cx={bx} cy={by0 - 7 - i * 9} depth={7} tone="white" />
      ))}
      {(() => {
        const y = by0 - 7 - 9;
        return (
          <g>
            <Line cx={bx} cy={y} v={-14} from={-24} to={22} color="#e0e0dd" width={5} />
            <g className="iso-ping" style={ping(1.6 + 0.45 * 3.2)}>
              <Line cx={bx} cy={y} v={0} from={-24} to={10} color="#fe5000" width={5} />
            </g>
            <Line cx={bx} cy={y} v={14} from={-24} to={0} color="#e0e0dd" width={5} />
          </g>
        );
      })()}
    </svg>
  );
}

/** Security: two workspaces stay locked apart, with an orange shield raised between them. */
export function SecurityArt({ className }: { className?: string }) {
  const id = "art-security";
  const C = BASE;
  const spaces = [
    { u: -44, v: 58 },
    { u: 62, v: -44 },
  ];
  const guard = { u: 6, v: 6 };
  const SPACE = roundRect(34, 34, 11);
  const [gx, gy0] = iso(C.cx, C.cy, guard.u, guard.v);
  const gy = gy0 - 8 - 28;
  const items = [...spaces.map((s) => ({ ...s, kind: "space" as const })), { ...guard, kind: "guard" as const }].sort(
    (p, q) => p.u + p.v - (q.u + q.v),
  );
  return (
    <svg viewBox="34 44 332 236" className={className} role="img" aria-label="Two workspaces locked apart, with an orange shield raised between them.">
      <Gradients id={id} />
      <Slab id={id} shape={WIDE} cx={C.cx} cy={C.cy} depth={14} tone="gray" />
      {items.map((it) => {
        if (it.kind === "guard") {
          return (
            <g key="guard">
              <Shade cx={gx} cy={gy0 + 2} rx={54} ry={22} id={id} />
              <Bob>
                <Slab id={id} shape={shield(40, 34, 10)} cx={gx} cy={gy} depth={12} tone="brand" />
                <Mark x={gx - 2} y={gy} size={28} color="#ffffff" draw={strokePath(CHECK, 3)} />
              </Bob>
            </g>
          );
        }
        const [x, y0] = iso(C.cx, C.cy, it.u, it.v);
        const y = y0 - 10;
        return (
          <g key={`${it.u}`}>
            <Slab id={id} shape={SPACE} cx={x} cy={y} depth={10} tone="white" />
            <Badge x={x} y={y} r={12} fill="#ececea" icon={strokePath(LOCK, 2.4)} color="#8a8a87" size={15} />
          </g>
        );
      })}
    </svg>
  );
}

/** Contact: your message and a reply from a person. */
export function ContactArt({ className }: { className?: string }) {
  const id = "art-contact";
  const C = BASE;
  const [bx, by0] = iso(C.cx, C.cy, -22, -24);
  const [sx, sy0] = iso(C.cx, C.cy, 50, 56);
  const big = { cx: bx, cy: by0 - 40 };
  const small = { cx: sx, cy: sy0 - 26 };
  return (
    <svg viewBox="34 44 332 236" className={className} role="img" aria-label="A message bubble and an orange reply bubble with an envelope.">
      <Gradients id={id} />
      <Base id={id} />
      <Shade cx={bx} cy={by0 + 4} rx={92} ry={38} id={id} slow />
      <Shade cx={sx} cy={sy0 + 2} rx={54} ry={22} id={id} delay={-1.6} />
      <Bob slow>
      <Slab id={id} shape={bubble(74, 48, 18)} cx={big.cx} cy={big.cy} depth={12} tone="white" />
      <Line cx={big.cx} cy={big.cy} v={-20} from={-46} to={40} color="#e0e0dd" />
      <Line cx={big.cx} cy={big.cy} v={2} from={-46} to={20} color="#e0e0dd" />
      <Line cx={big.cx} cy={big.cy} v={22} from={-46} to={0} color="#e0e0dd" />
      </Bob>
      <Bob delay={-1.6}>
        <Slab id={id} shape={bubble(38, 30, 12)} cx={small.cx} cy={small.cy} depth={10} tone="brand" />
        <Mark x={small.cx} y={small.cy} size={24} color="#ffffff" draw={strokePath(MAIL, 2.4)} />
      </Bob>
    </svg>
  );
}

/** Not found: a grid of tiles with one empty slot; the missing tile floats above it. */
export function MissingArt({ className }: { className?: string }) {
  const id = "art-missing";
  const C = BASE;
  const TILE = roundRect(32, 32, 10);
  const slots = [
    { u: -40, v: -40 },
    { u: 40, v: -40 },
    { u: -40, v: 40 },
    { u: 40, v: 40, empty: true },
  ];
  const [ex, ey0] = iso(C.cx, C.cy, 40, 40);
  return (
    <svg viewBox="34 44 332 236" className={className} role="img" aria-label="A grid of tiles with one empty slot and the missing tile floating above it.">
      <Gradients id={id} />
      <Base id={id} />
      {slots.map((s) => {
        const [x, y0] = iso(C.cx, C.cy, s.u, s.v);
        if (s.empty) {
          return (
            <g key="empty">
              <path d={toPath(TILE, x, y0 + 1.5)} fill="rgba(255,255,255,0.8)" />
              <path d={toPath(TILE, x, y0)} fill="rgba(17,17,17,0.07)" />
            </g>
          );
        }
        return <Slab key={`${s.u}${s.v}`} id={id} shape={TILE} cx={x} cy={y0 - 10} depth={10} tone="white" />;
      })}
      <Shade cx={ex} cy={ey0} rx={40} ry={18} id={id} />
      <Bob>
        <Slab id={id} shape={TILE} cx={ex} cy={ey0 - 10 - 30} depth={10} tone="brand" />
        <Mark x={ex} y={ey0 - 40} size={26} color="#ffffff" draw={strokePath(QUESTION, 2.8)} />
      </Bob>
    </svg>
  );
}
