import { FOX_PATH } from "@/components/fox-mark";

/**
 * Small 3D scenes for the surface cards, the editorial rows, and the inner pages, drawn in the soft style
 * of the layer stack: light gray and white slabs with solid edges, and a vivid orange piece in each.
 * The camera faces the floor straight on from slightly above, so widths run left to right, depth runs up
 * the page, and every slab shows its top and front edge. Loops live in globals.css ("Scene loops").
 */

/** Floor units to drawing units: across (S) and into the page (T). Their ratio flattens circles. */
const S = 1.2;
const T = 0.58;
const Q = T / S;

type Cmd = ["M" | "L", number, number] | ["Q", number, number, number, number] | ["Z"];
type Tone = "gray" | "white" | "brand";

const f = (n: number) => n.toFixed(1);

/** Projects a point on the floor (u across, v into the page) around (cx, cy) onto the drawing. */
function proj(cx: number, cy: number, u: number, v: number): [number, number] {
  return [cx + u * S, cy + v * T];
}

function toPath(cmds: Cmd[], cx: number, cy: number) {
  return cmds
    .map((c) => {
      if (c[0] === "Z") return "Z";
      if (c[0] === "Q") {
        const [x1, y1] = proj(cx, cy, c[1], c[2]);
        const [x, y] = proj(cx, cy, c[3], c[4]);
        return `Q${f(x1)} ${f(y1)} ${f(x)} ${f(y)}`;
      }
      const [x, y] = proj(cx, cy, c[1], c[2]);
      return `${c[0]}${f(x)} ${f(y)}`;
    })
    .join(" ");
}

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
        <stop offset="0" stopColor="#ff4f00" />
        <stop offset="0.55" stopColor="#ff6a00" />
        <stop offset="1" stopColor="#ff9500" />
      </radialGradient>
      <linearGradient id={`${id}-side-brand`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#ff7900" />
        <stop offset="1" stopColor="#f04400" />
      </linearGradient>
      <radialGradient id={`${id}-shadow`}>
        <stop offset="0" stopColor="#111111" stopOpacity="0.16" />
        <stop offset="1" stopColor="#111111" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

/** An extruded shape: its front edge stacked from the bottom up, then the top face. `cy` is the top face. */
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
        stroke={tone === "brand" ? "#ffb300" : "rgba(255,255,255,0.95)"}
        strokeWidth={1.2}
      />
    </g>
  );
}

/** A short rounded line lying on a surface, like a line of text. */
function Line({ cx, cy, v, from, to, color, width = 6 }: { cx: number; cy: number; v: number; from: number; to: number; color: string; width?: number }) {
  const [x1, y1] = proj(cx, cy, from, v);
  const [x2, y2] = proj(cx, cy, to, v);
  return <path d={`M${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)}`} stroke={color} strokeWidth={width} strokeLinecap="round" />;
}

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

/** A round key standing on the floor: an extruded ellipse. `cy` is its top face. */
function Cylinder({ id, cx, cy, r, depth, tone }: { id: string; cx: number; cy: number; r: number; depth: number; tone: Tone }) {
  const steps: number[] = [];
  for (let d = depth; d > 0; d -= 1.5) steps.push(d);
  return (
    <g>
      {steps.map((d) => (
        <ellipse key={d} cx={cx} cy={cy + d} rx={r} ry={r * Q} fill={`url(#${id}-side-${tone})`} />
      ))}
      <ellipse
        cx={cx}
        cy={cy}
        rx={r}
        ry={r * Q}
        fill={`url(#${id}-top-${tone})`}
        stroke={tone === "brand" ? "#ffb300" : "rgba(255,255,255,0.95)"}
        strokeWidth={1.2}
      />
    </g>
  );
}

/** A small icon lying flat on a surface at (x, y), squashed by the camera tilt. Drawn in a 24×24 box. */
function Mark({ x, y, size = 18, color, draw }: { x: number; y: number; size?: number; color: string; draw: (color: string) => React.ReactNode }) {
  return (
    <g transform={`translate(${f(x)} ${f(y)}) scale(1 ${Q.toFixed(3)})`}>
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

const VIEW = "34 44 332 236";
const BASE = { cx: 200, cy: 172 };
const PLATE = roundRect(112, 100, 26);
const WIDE = roundRect(128, 100, 26);

function Base({ id, shape = PLATE }: { id: string; shape?: Cmd[] }) {
  return <Slab id={id} shape={shape} cx={BASE.cx} cy={BASE.cy} depth={14} tone="gray" />;
}

/**
 * A soft gray pipe along a path. On the floor it gets a fine white highlight underneath; pipes that are
 * drawn in pieces (like the layer stack's) skip it, so no highlight peeks out at the joins.
 */
export function Groove({
  d,
  width = 3,
  highlight = true,
  nonScaling = false,
  opacity,
}: {
  d: string;
  width?: number;
  highlight?: boolean;
  /** Keep the stroke width fixed when the drawing is stretched (for SVGs with preserveAspectRatio="none"). */
  nonScaling?: boolean;
  opacity?: number;
}) {
  const ve = nonScaling ? "non-scaling-stroke" : undefined;
  return (
    <g fill="none" strokeLinecap="round" opacity={opacity}>
      {highlight ? (
        <path d={d} stroke="#ffffff" strokeWidth={width * 0.8} transform={`translate(0 ${width * 0.4})`} vectorEffect={ve} />
      ) : null}
      <path d={d} stroke="#d4d4d1" strokeWidth={width} vectorEffect={ve} />
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
  nonScaling = false,
}: {
  d: string;
  begin: number;
  dur?: number;
  width?: number;
  travel?: number;
  nonScaling?: boolean;
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
          vectorEffect={nonScaling ? "non-scaling-stroke" : undefined}
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

function trackPath(cx: number, cy: number, [p0, p1, p2]: [number, number][]) {
  const [x0, y0] = proj(cx, cy, p0[0], p0[1]);
  const [x1, y1] = proj(cx, cy, p1[0], p1[1]);
  const [x2, y2] = proj(cx, cy, p2[0], p2[1]);
  return `M${f(x0)} ${f(y0)} Q${f(x1)} ${f(y1)} ${f(x2)} ${f(y2)}`;
}

/** Today: three ranked rows; the first is orange and lifted. */
export function TodayArt({ className }: { className?: string }) {
  const id = "art-today";
  const rows = [
    { v: -56, tone: "brand" as const, lift: 22 },
    { v: 2, tone: "white" as const, lift: 0 },
    { v: 60, tone: "white" as const, lift: 0 },
  ];
  const ROW = roundRect(82, 20, 14);
  return (
    <svg viewBox={VIEW} className={className} role="img" aria-label="Three ranked rows; the first is raised and orange.">
      <Gradients id={id} />
      <Base id={id} />
      {rows.map((row, i) => {
        const [cx, cy0] = proj(BASE.cx, BASE.cy, 0, row.v);
        const cy = cy0 - 10 - row.lift;
        const brand = row.tone === "brand";
        const [dx, dy] = proj(cx, cy, -58, 0);
        return (
          <g key={row.v}>
            {row.lift ? <Shade cx={cx} cy={cy0 + 2} rx={96} ry={22} id={id} /> : null}
            <g className={row.lift ? "iso-bob" : undefined}>
              <Slab id={id} shape={ROW} cx={cx} cy={cy} depth={10} tone={row.tone} />
              <ellipse cx={dx} cy={dy} rx={12} ry={12 * Q} fill={brand ? "#ffffff" : "#e4e4e1"} />
              <Mark x={dx} y={dy} size={17} color={brand ? "#fe5000" : "#8a8a87"} draw={label(String(i + 1))} />
              <Line cx={cx} cy={cy} v={0} from={-36} to={brand ? 58 : 34 - i * 14} color={brand ? "rgba(255,255,255,0.85)" : "#e0e0dd"} />
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
    { u: -69, v: -8, h: 46 },
    { u: -23, v: -8, h: 74 },
    { u: 23, v: -8, h: 56 },
    { u: 69, v: -8, h: 108, brand: true },
  ];
  const PILLAR = roundRect(17, 17, 7);
  return (
    <svg viewBox={VIEW} className={className} role="img" aria-label="Four columns of different heights; the tallest is orange.">
      <Gradients id={id} />
      <Base id={id} />
      {bars.map((bar, i) => {
        const [cx, cy0] = proj(BASE.cx, BASE.cy, bar.u, bar.v);
        return (
          <g key={bar.u} className={bar.brand ? "iso-grow" : "iso-grow iso-grow-soft"} style={{ animationDelay: `${i * -0.7}s` }}>
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
  const [bx, by0] = proj(BASE.cx, BASE.cy, -16, -26);
  const big = { cx: bx, cy: by0 - 40 };
  const [sx, sy0] = proj(BASE.cx, BASE.cy, 60, 50);
  const small = { cx: sx, cy: sy0 - 28 };
  return (
    <svg viewBox={VIEW} className={className} role="img" aria-label="A review bubble with lines of text, and a small orange bubble with a star.">
      <Gradients id={id} />
      <Base id={id} />
      <Shade cx={bx} cy={by0 + 4} rx={104} ry={30} id={id} slow />
      <Shade cx={sx} cy={sy0 + 2} rx={52} ry={16} id={id} delay={-1.6} />
      <Bob slow>
        <Slab id={id} shape={bubble(76, 50, 18)} cx={big.cx} cy={big.cy} depth={12} tone="white" />
        <Line cx={big.cx} cy={big.cy} v={-26} from={-52} to={44} color="#e0e0dd" />
        <Line cx={big.cx} cy={big.cy} v={0} from={-52} to={22} color="#fe5000" />
        <Line cx={big.cx} cy={big.cy} v={26} from={-52} to={2} color="#e0e0dd" />
      </Bob>
      <Bob delay={-1.6}>
        <Slab id={id} shape={bubble(34, 30, 12)} cx={small.cx} cy={small.cy} depth={10} tone="brand" />
        <Mark x={small.cx} y={small.cy} size={22} color="#ffffff" draw={fillPath(STAR)} />
      </Bob>
    </svg>
  );
}

/** What changed: reviews, rankings, and releases send streaks of light along grooves into Appfox, which flags one change. */
export function ChangedArt({ className }: { className?: string }) {
  const id = "art-changed";
  const C = BASE;
  const sources = [
    { u: -96, v: -62, glyph: STAR, fill: true },
    { u: -96, v: 0, glyph: BARS, fill: false },
    { u: -96, v: 62, glyph: ARROW_UP, fill: false },
  ];
  const hub = { u: 0, v: 0 };
  const out = { u: 94, v: 0 };
  const TILE = roundRect(22, 22, 8);
  const [hx, hy0] = proj(C.cx, C.cy, hub.u, hub.v);
  const hy = hy0 - 14 - 6;
  const [ox, oy0] = proj(C.cx, C.cy, out.u, out.v);
  const oy = oy0 - 10;
  const inbound = sources.map((src) =>
    trackPath(C.cx, C.cy, [
      [src.u + 24, src.v],
      [-50, src.v * 0.85],
      [hub.u - 34, src.v * 0.3],
    ]),
  );
  const outbound = trackPath(C.cx, C.cy, [
    [hub.u + 34, hub.v],
    [48, 0],
    [out.u - 30, out.v],
  ]);
  return (
    <svg viewBox={VIEW} className={className} role="img" aria-label="Reviews, rankings, and releases flow into Appfox, which flags one change.">
      <Gradients id={id} />
      <Base id={id} shape={WIDE} />
      {inbound.map((d) => (
        <Groove key={d} d={d} />
      ))}
      <Groove d={outbound} />
      {inbound.map((d, i) => (
        <Packet key={d} d={d} begin={i * 0.9} />
      ))}
      <Packet d={outbound} begin={1.2} />
      {sources.map((src) => {
        const [x, y0] = proj(C.cx, C.cy, src.u, src.v);
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
      <Shade cx={hx} cy={hy0 + 2} rx={60} ry={18} id={id} slow delay={-1.2} />
      <Bob slow delay={-1.2}>
        <Slab id={id} shape={roundRect(32, 32, 11)} cx={hx} cy={hy} depth={14} tone="brand" />
        <Mark x={hx} y={hy} size={30} color="#ffffff" draw={fox} />
      </Bob>
      <Slab id={id} shape={roundRect(30, 26, 10)} cx={ox} cy={oy} depth={10} tone="white" />
      {(() => {
        const [dx, dy] = proj(ox, oy, -16, 0);
        return (
          <g className="iso-ping">
            <ellipse cx={dx} cy={dy} rx={9} ry={9 * Q} fill="#fe5000" />
            <Mark x={dx} y={dy} size={15} color="#ffffff" draw={label("!", 800)} />
          </g>
        );
      })()}
      <Line cx={ox} cy={oy} v={-9} from={0} to={20} color="#e0e0dd" width={5} />
      <Line cx={ox} cy={oy} v={9} from={0} to={10} color="#e0e0dd" width={5} />
    </svg>
  );
}

/** The orange approve key: every few seconds its top presses down into the key while the base stays put. */
function PressKey({ id, cx, cy, r, depth, icon, travel = 7 }: { id: string; cx: number; cy: number; r: number; depth: number; icon: React.ReactNode; travel?: number }) {
  const timing = {
    dur: "3.6s",
    repeatCount: "indefinite",
    keyTimes: "0;0.6;0.7;0.84;1",
    calcMode: "spline",
    keySplines: "0 0 1 1;0.4 0 0.2 1;0.3 0 0.2 1;0 0 1 1",
  } as const;
  const hold = (from: number, to: number) => `${from};${from};${to};${from};${from}`;
  const face = <ellipse cx={cx} cy={cy} rx={r} ry={r * Q} fill={`url(#${id}-top-brand)`} stroke="#ffb300" strokeWidth={1.2} />;
  const base = <ellipse cx={cx} cy={cy + depth} rx={r} ry={r * Q} fill={`url(#${id}-side-brand)`} />;
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
  const DRAFT = roundRect(54, 40, 13);
  const drafts = [0, 1, 2];
  const pile = { u: -52, v: -10 };
  const key = { u: 76, v: 24 };
  const [kx, ky0] = proj(BASE.cx, BASE.cy, key.u, key.v);
  const [px, py0] = proj(BASE.cx, BASE.cy, pile.u, pile.v);
  const top = drafts.length - 1;
  const at = (i: number) => {
    const [x, y0] = proj(BASE.cx, BASE.cy, pile.u + i * 4, pile.v - i * 8);
    return { x, y: y0 - 8 - i * 12 };
  };
  return (
    <svg viewBox={VIEW} className={className} role="img" aria-label="A pile of drafts waits beside an orange approve key.">
      <Gradients id={id} />
      <Base id={id} shape={WIDE} />
      <Shade cx={px} cy={py0 + 2} rx={92} ry={26} id={id} slow />
      <Bob slow>
        {drafts.map((i) => {
          const { x, y } = at(i);
          return <Slab key={i} id={id} shape={DRAFT} cx={x} cy={y} depth={8} tone="white" />;
        })}
        {(() => {
          const { x, y } = at(top);
          return (
            <g>
              <Line cx={x} cy={y} v={-20} from={-36} to={34} color="#e0e0dd" />
              <Line cx={x} cy={y} v={0} from={-36} to={14} color="#fe5000" />
              <Line cx={x} cy={y} v={20} from={-36} to={-2} color="#e0e0dd" />
            </g>
          );
        })()}
      </Bob>
      <Cylinder id={id} cx={kx} cy={ky0 - 6} r={50} depth={6} tone="gray" />
      <PressKey
        id={id}
        cx={kx}
        cy={ky0 - 26}
        r={38}
        depth={20}
        icon={<Mark x={kx} y={ky0 - 26} size={30} color="#ffffff" draw={strokePath(CHECK, 3)} />}
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

const SHIELD = "M-28 -18Q-28 -25 -21 -25L21 -25Q28 -25 28 -18L28 2Q26 19 0 29Q-26 19 -28 2Z";

/** A shield standing upright and facing the viewer; its thickness shows along the top. */
function UprightShield({ id, x, y, thickness = 9, children }: { id: string; x: number; y: number; thickness?: number; children?: React.ReactNode }) {
  const steps: number[] = [];
  for (let t = thickness; t > 0; t -= 1.5) steps.push(t);
  return (
    <g transform={`translate(${f(x)} ${f(y)})`}>
      {steps.map((t) => (
        <path key={t} d={SHIELD} transform={`translate(0 ${-t * T})`} fill={`url(#${id}-side-brand)`} />
      ))}
      <path d={SHIELD} fill={`url(#${id}-top-brand)`} stroke="#ffb300" strokeWidth={1.2} />
      {children}
    </g>
  );
}

/** A small badge disc lying on a surface, with an icon on it. */
function Badge({ x, y, r = 9, fill, icon, color = "#ffffff", size = 13 }: { x: number; y: number; r?: number; fill: string; icon: (c: string) => React.ReactNode; color?: string; size?: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={r} ry={r * Q} fill={fill} />
      <Mark x={x} y={y} size={size} color={color} draw={icon} />
    </g>
  );
}

/** Research: an idea card feeds a set of candidate apps you confirm, which becomes a written brief. */
export function ResearchArt({ className }: { className?: string }) {
  const id = "art-research";
  const C = BASE;
  const idea = { u: -80, v: -46 };
  const brief = { u: 84, v: -46 };
  const cluster = { u: 2, v: 36 };
  const tiles = [
    { du: -25, dv: -25, ok: true },
    { du: 25, dv: -25, ok: true },
    { du: -25, dv: 25, ok: false },
    { du: 25, dv: 25, ok: true },
  ];
  const TILE = roundRect(20, 20, 8);
  const IDEA = roundRect(40, 30, 11);
  const SHEET = roundRect(40, 30, 10);
  const at = (u: number, v: number) => proj(C.cx, C.cy, u, v);
  const [ix, iy0] = at(idea.u, idea.v);
  const iy = iy0 - 8 - 6;
  const [bx, by0] = at(brief.u, brief.v);
  /* Streaks run idea → candidates → brief; each lands in the first ~45% of a 3.2s cycle, and the piece it reaches pings. */
  const toCandidates = trackPath(C.cx, C.cy, [
    [idea.u, idea.v + 32],
    [idea.u, cluster.v - 25],
    [cluster.u - 47, cluster.v - 25],
  ]);
  const toBrief = trackPath(C.cx, C.cy, [
    [cluster.u + 47, cluster.v - 25],
    [brief.u, cluster.v - 25],
    [brief.u, brief.v + 32],
  ]);
  const ping = (arrive: number) => ({ animationDuration: "3.2s", animationDelay: `${(arrive - 0.86 * 3.2).toFixed(2)}s` });
  return (
    <svg viewBox={VIEW} className={className} role="img" aria-label="An idea card feeds a set of candidate apps you confirm, which becomes a written brief.">
      <Gradients id={id} />
      <Base id={id} shape={WIDE} />
      <Groove d={toCandidates} />
      <Groove d={toBrief} />
      <Packet d={toCandidates} begin={0} dur={3.2} />
      <Packet d={toBrief} begin={1.6} dur={3.2} />
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
      <Shade cx={ix} cy={iy0 + 2} rx={66} ry={18} id={id} slow />
      <Bob slow>
        <Slab id={id} shape={IDEA} cx={ix} cy={iy} depth={8} tone="white" />
        {(() => {
          const [lx, ly] = proj(ix, iy, -22, 0);
          return <Badge x={lx} y={ly} r={11} fill="#fe5000" icon={strokePath(LIGHTBULB, 2.6)} size={15} />;
        })()}
        <Line cx={ix} cy={iy} v={-9} from={-4} to={28} color="#e0e0dd" width={5} />
        <Line cx={ix} cy={iy} v={9} from={-4} to={16} color="#fe5000" width={5} />
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
                r={11}
                fill={t.ok ? "#fe5000" : "#dcdcd9"}
                icon={strokePath(t.ok ? CHECK : CROSS, 3.4)}
                color={t.ok ? "#ffffff" : "#8a8a87"}
                size={13}
              />
            </g>
          </g>
        );
      })}
    </svg>
  );
}

/** Security: two workspaces stay locked apart, with an orange shield raised between them. */
export function SecurityArt({ className }: { className?: string }) {
  const id = "art-security";
  const C = BASE;
  const spaces = [
    { u: -80, v: -20 },
    { u: 80, v: -20 },
  ];
  const guard = { u: 0, v: 30 };
  const SPACE = roundRect(34, 34, 11);
  const [gx, gy0] = proj(C.cx, C.cy, guard.u, guard.v);
  const gy = gy0 - 44;
  return (
    <svg viewBox={VIEW} className={className} role="img" aria-label="Two workspaces locked apart, with an orange shield raised between them.">
      <Gradients id={id} />
      <Base id={id} shape={WIDE} />
      {spaces.map((s) => {
        const [x, y0] = proj(C.cx, C.cy, s.u, s.v);
        const y = y0 - 10;
        return (
          <g key={s.u}>
            <Slab id={id} shape={SPACE} cx={x} cy={y} depth={10} tone="white" />
            <Badge x={x} y={y} r={14} fill="#ececea" icon={strokePath(LOCK, 2.4)} color="#8a8a87" size={16} />
          </g>
        );
      })}
      <Shade cx={gx} cy={gy0 + 2} rx={50} ry={14} id={id} />
      <Bob>
        <UprightShield id={id} x={gx} y={gy}>
          <g transform="translate(-13 -14) scale(1.1)">{strokePath(CHECK, 3)("#ffffff")}</g>
        </UprightShield>
      </Bob>
    </svg>
  );
}

/** Contact: your message and a reply from a person. */
export function ContactArt({ className }: { className?: string }) {
  const id = "art-contact";
  const [bx, by0] = proj(BASE.cx, BASE.cy, -16, -26);
  const big = { cx: bx, cy: by0 - 40 };
  const [sx, sy0] = proj(BASE.cx, BASE.cy, 60, 50);
  const small = { cx: sx, cy: sy0 - 28 };
  return (
    <svg viewBox={VIEW} className={className} role="img" aria-label="A message bubble and an orange reply bubble with an envelope.">
      <Gradients id={id} />
      <Base id={id} />
      <Shade cx={bx} cy={by0 + 4} rx={104} ry={30} id={id} slow />
      <Shade cx={sx} cy={sy0 + 2} rx={56} ry={16} id={id} delay={-1.6} />
      <Bob slow>
        <Slab id={id} shape={bubble(76, 50, 18)} cx={big.cx} cy={big.cy} depth={12} tone="white" />
        <Line cx={big.cx} cy={big.cy} v={-26} from={-52} to={44} color="#e0e0dd" />
        <Line cx={big.cx} cy={big.cy} v={0} from={-52} to={22} color="#e0e0dd" />
        <Line cx={big.cx} cy={big.cy} v={26} from={-52} to={2} color="#e0e0dd" />
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
  const TILE = roundRect(34, 30, 10);
  const slots = [
    { u: -42, v: -40 },
    { u: 42, v: -40 },
    { u: -42, v: 40 },
    { u: 42, v: 40, empty: true },
  ];
  const [ex, ey0] = proj(C.cx, C.cy, 42, 40);
  return (
    <svg viewBox={VIEW} className={className} role="img" aria-label="A grid of tiles with one empty slot and the missing tile floating above it.">
      <Gradients id={id} />
      <Base id={id} />
      {slots.map((s) => {
        const [x, y0] = proj(C.cx, C.cy, s.u, s.v);
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
      <Shade cx={ex} cy={ey0} rx={50} ry={14} id={id} />
      <Bob>
        <Slab id={id} shape={TILE} cx={ex} cy={ey0 - 10 - 30} depth={10} tone="brand" />
        <Mark x={ex} y={ey0 - 40} size={26} color="#ffffff" draw={strokePath(QUESTION, 2.8)} />
      </Bob>
    </svg>
  );
}
