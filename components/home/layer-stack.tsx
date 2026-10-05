"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  Activity,
  Database,
  DollarSign,
  Package,
  Star,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import FoxMark, { FOX_PATH } from "@/components/fox-mark";
import ScaleToFit from "@/components/mock/scale-to-fit";
import Container from "@/components/ui/container";
import Reveal from "@/components/reveal";
import { Groove, Packet } from "@/components/illustrations/iso-art";

type Layer = { name: string; body: string; icon: LucideIcon | null; side: "left" | "right" };

/** Top to bottom, in the order the plates are stacked. A null icon is the Appfox layer. */
const LAYERS: Layer[] = [
  {
    name: "Facts",
    icon: Database,
    side: "left",
    body: "Store listings, reviews, ranks, and releases, kept as history. Revenue data is planned.",
  },
  {
    name: "Signals",
    icon: Activity,
    side: "right",
    body: "Changes checked against earlier data, with enough evidence before they become a finding.",
  },
  {
    name: "Insights",
    icon: null,
    side: "left",
    body: "AI explains what changed and why it may matter, with links to the sources it used.",
  },
  {
    name: "Outcomes",
    icon: Target,
    side: "right",
    body: "You decide what to investigate or change. A finding is a starting point, not a verdict.",
  },
];

const SOURCES: { label: string; icon: LucideIcon }[] = [
  { label: "Reviews", icon: Star },
  { label: "Rankings", icon: TrendingUp },
  { label: "Releases", icon: Package },
  { label: "Revenue", icon: DollarSign },
  { label: "Competitors", icon: Users },
];

/* Desktop drawing space. */
const CANVAS_W = 1120;
const CANVAS_H = 800;
const CX = CANVAS_W / 2;

/* A plate is a rounded square laid flat: half side, corner radius, isometric squash, and thickness. */
const S = 130;
const R = 28;
const K = 0.42;
const T = 20;
const HALF_W = S * Math.SQRT2;
const PLATE_Y = [264, 394, 524, 654];
/** The Appfox layer, drawn in orange. */
const BRAND = LAYERS.findIndex((l) => l.icon === null);
const LIFT = -12;
/** Icons sit upright on the discs, squashed a little to read as lying flat. */
const ICON_SQUASH = 0.62;

const ITEM_W = 240;
const ITEM_X = { left: 24, right: CANVAS_W - 24 - ITEM_W };
/** From an item's top to the middle of its title, where its connector sits. */
const TITLE_MID = 73;

/** Source chips arc above the stack; each line lands on the rim of the top plate's disc. */
const CHIPS = [
  { x: CX - 380, y: 104 },
  { x: CX - 200, y: 52 },
  { x: CX, y: 24 },
  { x: CX + 200, y: 52 },
  { x: CX + 380, y: 104 },
];
const CHIP_H = 42;
const DISC = { rx: 44, ry: 44 * K };
const LANDING_ANGLES = [200, 235, 270, 305, 340];
/** Streaks of light run down the source pipes slowly, one source at a time, about once a second. */
const STREAK_DUR = 4.8;
const STREAK_TRAVEL = 0.5;
const STREAK_BEGINS = [0, 1.9, 0.95, 2.85, 3.8];
/** The pipes stretch with the top plate when it lifts, in step with its own transition. */
const LIFT_EASE = "transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1)";

const CYCLE_MS = 2800;

/** Projects a point on a plate (u, v in the plate's own square) onto the canvas. */
function iso(u: number, v: number, cy: number) {
  const x = CX + (u - v) / Math.SQRT2;
  const y = cy + (K * (u + v)) / Math.SQRT2;
  return `${x.toFixed(1)} ${y.toFixed(1)}`;
}

/** A rounded square lying flat at height cy. Quadratic corners stay exact under the projection. */
function platePath(cy: number, half = S, r = R) {
  const a = half;
  const b = half - r;
  return [
    `M${iso(-b, -a, cy)}`,
    `L${iso(b, -a, cy)}`,
    `Q${iso(a, -a, cy)} ${iso(a, -b, cy)}`,
    `L${iso(a, b, cy)}`,
    `Q${iso(a, a, cy)} ${iso(b, a, cy)}`,
    `L${iso(-b, a, cy)}`,
    `Q${iso(-a, a, cy)} ${iso(-a, b, cy)}`,
    `L${iso(-a, -b, cy)}`,
    `Q${iso(-a, -a, cy)} ${iso(-b, -a, cy)}`,
    "Z",
  ].join(" ");
}

/** How far a rounded plate reaches left and right of its center. */
function reach(half = S, r = R) {
  return (2 * half - 0.5 * r) / Math.SQRT2;
}

/**
 * The walls of an extruded plate as one outline: straight down from the side extremes at `top`, then
 * around the front of the bottom face at `bottom`. Drawn as a single shape so translucent fills (like the
 * orange cup) stay one even shade instead of doubling up where pieces would overlap.
 */
function Walls({ top, bottom, half, r, fill }: { top: number; bottom: number; half: number; r: number; fill: string }) {
  const a = half;
  const b = half - r;
  const pt = (u: number, v: number) => iso(u, v, bottom);
  const mid = (p: [number, number], q: [number, number]): [number, number] => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const quarter = (p0: [number, number], p1: [number, number], p2: [number, number]): [number, number] => [
    0.25 * p0[0] + 0.5 * p1[0] + 0.25 * p2[0],
    0.25 * p0[1] + 0.5 * p1[1] + 0.25 * p2[1],
  ];
  // Right corner (u = a, v = -a): its outermost point is the curve's midpoint.
  const rightMid = quarter([b, -a], [a, -a], [a, -b]);
  const rightCtrl = mid([a, -a], [a, -b]);
  // Left corner (u = -a, v = a).
  const leftCtrl = mid([-b, a], [-a, a]);
  const leftMid = quarter([-b, a], [-a, a], [-a, b]);
  const e = reach(half, r);
  const d = [
    `M${(CX - e).toFixed(1)} ${top.toFixed(1)}`,
    `L${(CX + e).toFixed(1)} ${top.toFixed(1)}`,
    `L${pt(...rightMid)}`,
    `Q${pt(...rightCtrl)} ${pt(a, -b)}`,
    `L${pt(a, b)}`,
    `Q${pt(a, a)} ${pt(b, a)}`,
    `L${pt(-b, a)}`,
    `Q${pt(...leftCtrl)} ${pt(...leftMid)}`,
    "Z",
  ].join(" ");
  return <path d={d} fill={fill} />;
}

function Plate({
  index,
  lifted,
  uid,
  children,
}: {
  index: number;
  lifted: boolean;
  uid: string;
  /** Drawn on the plate's face, so it rises with the plate. */
  children?: React.ReactNode;
}) {
  const cy = PLATE_Y[index];
  const brand = index === BRAND;
  const tone = brand ? "brand" : "gray";
  const Icon = LAYERS[index].icon;
  return (
    <g
      className="transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
      style={{ transform: `translateY(${lifted ? LIFT : 0}px)` }}
    >
      <Walls top={cy} bottom={cy + T} half={S} r={R} fill={`url(#${uid}-side-${tone})`} />
      <path
        d={platePath(cy)}
        fill={`url(#${uid}-top-${tone})`}
        stroke={brand ? "rgba(255,226,208,0.9)" : "rgba(255,255,255,0.9)"}
        strokeWidth={1.2}
      />
      {/* Recessed disc with a light lower lip */}
      <ellipse cx={CX} cy={cy + 1.5} rx={DISC.rx} ry={DISC.ry} fill={brand ? "#ffc9ab" : "#ffffff"} />
      <ellipse cx={CX} cy={cy} rx={DISC.rx} ry={DISC.ry} fill={`url(#${uid}-disc-${tone})`} />
      <g transform={`translate(${CX} ${cy}) scale(1 ${ICON_SQUASH})`}>
        {Icon ? (
          <Icon
            x={-14}
            y={-14}
            width={28}
            height={28}
            strokeWidth={1.7}
            color={lifted ? "#555555" : "#9a9a97"}
            className="transition-colors duration-500"
          />
        ) : (
          <path d={FOX_PATH} fill="#ffffff" transform="translate(-16 -16.8) scale(0.239)" />
        )}
      </g>
      {children}
    </g>
  );
}

/** Pseudo-random but stable numbers, so the embers sit in the same places on every render. Values drawn
 * from it are rounded before use so the server and browser print identical attributes. */
function seeded(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** The soft orange cup that holds the lower layers, with embers drifting up through it. */
function StackGlow({ uid, cupTop, cupBottom }: { uid: string; cupTop: number; cupBottom: number }) {
  const inner = { half: S * 1.18, r: R * 1.4 };
  const innerReach = reach(inner.half, inner.r);
  return (
    <>
      <g filter={`url(#${uid}-blur)`} opacity={0.6}>
        <Walls top={cupTop - 30} bottom={cupBottom + 10} half={S * 1.34} r={R * 1.6} fill={`url(#${uid}-cup)`} />
      </g>
      <g opacity={0.75}>
        <Walls top={cupTop} bottom={cupBottom} half={inner.half} r={inner.r} fill={`url(#${uid}-cup)`} />
      </g>
      <ellipse cx={CX} cy={PLATE_Y[BRAND] + 8} rx={270} ry={140} fill={`url(#${uid}-glow)`} />
      <g className="iso-motion" filter={`url(#${uid}-soft)`}>
        {Array.from({ length: 14 }, (_, i) => {
          const x = CX + (seeded(i + 1) - 0.5) * innerReach * 1.7;
          const start = cupBottom + 20 - seeded(i + 7) * 40;
          const rise = 150 + seeded(i + 13) * 90;
          const drift = (seeded(i + 21) - 0.5) * 30;
          const dur = 4.5 + seeded(i + 29) * 3.5;
          const begin = `${(-seeded(i + 43) * dur).toFixed(2)}s`;
          return (
            <circle
              key={i}
              cx={x.toFixed(1)}
              cy={start.toFixed(1)}
              r={(2.5 + seeded(i + 37) * 2.5).toFixed(1)}
              fill="#ff7a3a"
              opacity={0}
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values={`0 0;${drift.toFixed(1)} ${(-rise).toFixed(1)}`}
                dur={`${dur.toFixed(2)}s`}
                begin={begin}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0.85;0.6;0"
                keyTimes="0;0.2;0.7;1"
                dur={`${dur.toFixed(2)}s`}
                begin={begin}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}
      </g>
    </>
  );
}

/** The stack itself, plus the source lines and item connectors when drawn on the full canvas. */
function StackArt({ active, full }: { active: number; full: boolean }) {
  const uid = useId().replace(/:/g, "");
  const cupTop = PLATE_Y[BRAND] - 20;
  const cupBottom = PLATE_Y[PLATE_Y.length - 1] + 46;
  /*
   * Each source pipe is one smooth curve from its chip down into a port on the rim of the top disc. When the
   * top plate lifts, each pipe is squeezed vertically from its chip end by exactly the lift, so its tip
   * stays in the port without a joint.
   */
  const topLifted = active === 0;
  const pipes = CHIPS.map((chip, i) => {
    const angle = (LANDING_ANGLES[i] * Math.PI) / 180;
    const tx = CX + DISC.rx * Math.cos(angle);
    const ty = PLATE_Y[0] + DISC.ry * Math.sin(angle);
    const sy = chip.y + CHIP_H + 4;
    return {
      key: chip.x,
      tx,
      ty,
      sy,
      squeeze: (ty + LIFT - sy) / (ty - sy),
      d: `M${chip.x} ${sy} C ${chip.x} ${sy + 80}, ${tx} ${ty - 110}, ${tx} ${ty}`,
    };
  });
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-top-gray`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdfdfc" />
          <stop offset="1" stopColor="#eaeae8" />
        </linearGradient>
        <linearGradient id={`${uid}-side-gray`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e7e7e4" />
          <stop offset="0.5" stopColor="#dcdcd9" />
          <stop offset="1" stopColor="#cdcdca" />
        </linearGradient>
        <radialGradient id={`${uid}-disc-gray`} cx="0.5" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#e4e4e2" />
          <stop offset="1" stopColor="#efefed" />
        </radialGradient>
        <radialGradient id={`${uid}-top-brand`} cx="0.5" cy="0.5" r="0.62">
          <stop offset="0" stopColor="#ff7a3a" />
          <stop offset="0.5" stopColor="#ffab80" />
          <stop offset="1" stopColor="#ffd8c3" />
        </radialGradient>
        <linearGradient id={`${uid}-side-brand`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f9bf9f" />
          <stop offset="0.5" stopColor="#f3a479" />
          <stop offset="1" stopColor="#ea8c5c" />
        </linearGradient>
        <radialGradient id={`${uid}-disc-brand`} cx="0.5" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#e94a06" />
          <stop offset="1" stopColor="#fe5f17" />
        </radialGradient>
        <radialGradient id={`${uid}-glow`}>
          <stop offset="0" stopColor="#fe5000" stopOpacity="0.3" />
          <stop offset="1" stopColor="#fe5000" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={`${uid}-cup`}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1={cupTop - 40}
          x2="0"
          y2={cupBottom + 110}
        >
          <stop offset="0" stopColor="#ff9a66" stopOpacity="0" />
          <stop offset="0.45" stopColor="#ff9a66" stopOpacity="0.14" />
          <stop offset="1" stopColor="#ff9a66" stopOpacity="0.5" />
        </linearGradient>
        <filter id={`${uid}-soft`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
        <filter id={`${uid}-blur`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      {/* A soft orange cup holds the lower layers */}
      <StackGlow uid={uid} cupTop={cupTop} cupBottom={cupBottom} />

      {/* Drawn bottom up, so each plate sits over the one beneath it */}
      {PLATE_Y.map((_, i) => PLATE_Y.length - 1 - i).map((i) => (
        <Plate key={i} index={i} lifted={i === active} uid={uid}>
          {full && i === 0
            ? pipes.map((pipe, k) => (
                <g key={pipe.key}>
                  <ellipse cx={pipe.tx} cy={pipe.ty} rx={5.5} ry={5.5 * K} fill="#cfcfcc" />
                  <ellipse className="iso-packet" cx={pipe.tx} cy={pipe.ty} rx={7} ry={7 * K} fill="#fe5000" opacity={0}>
                    <animate
                      attributeName="opacity"
                      values="0;0;1;0;0"
                      keyTimes={`0;${STREAK_TRAVEL - 0.02};${STREAK_TRAVEL + 0.03};${STREAK_TRAVEL + 0.2};1`}
                      dur={`${STREAK_DUR}s`}
                      begin={`${STREAK_BEGINS[k]}s`}
                      repeatCount="indefinite"
                    />
                  </ellipse>
                </g>
              ))
            : null}
        </Plate>
      ))}

      {full ? (
        <>
          {pipes.map((pipe, i) => (
            <g
              key={pipe.key}
              style={{
                transform: topLifted ? `scaleY(${pipe.squeeze.toFixed(4)})` : "none",
                transformOrigin: `0px ${pipe.sy}px`,
                transition: LIFT_EASE,
              }}
            >
              <Groove d={pipe.d} width={4} highlight={false} />
              <Packet d={pipe.d} begin={STREAK_BEGINS[i]} dur={STREAK_DUR} travel={STREAK_TRAVEL} width={3.5} />
            </g>
          ))}
          {LAYERS.map((layer, i) => {
            const y = PLATE_Y[i] + 2;
            const [from, to] =
              layer.side === "left"
                ? [ITEM_X.left + ITEM_W + 16, CX - HALF_W - 18]
                : [ITEM_X.right - 16, CX + HALF_W + 18];
            return (
              <path
                key={layer.name}
                d={`M${from} ${y} H${to}`}
                pathLength={1}
                fill="none"
                stroke="#fe5000"
                strokeWidth={1.5}
                strokeDasharray="1 1"
                strokeDashoffset={i === active ? 0 : 1}
                style={{ transition: "stroke-dashoffset 700ms cubic-bezier(0.2, 0.7, 0.2, 1)" }}
              />
            );
          })}
        </>
      ) : null}
    </>
  );
}

function SourceChip({ source, className = "", style }: { source: (typeof SOURCES)[number]; className?: string; style?: React.CSSProperties }) {
  const Icon = source.icon;
  return (
    <span
      style={style}
      className={`soft-chip inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full py-1.5 pl-1.5 pr-4 text-[14px] font-medium leading-5 text-ink ${className}`}
    >
      <span className="flex size-7 items-center justify-center rounded-full bg-[#e9e9e7] text-[#8a8a87] shadow-[inset_0_2px_3px_rgba(17,17,17,0.08),0_1px_0_#ffffff]">
        <Icon className="size-3.5" strokeWidth={1.9} aria-hidden="true" />
      </span>
      {source.label}
    </span>
  );
}

function LayerItem({
  layer,
  on,
  onSelect,
  className = "",
  style,
}: {
  layer: Layer;
  on: boolean;
  onSelect: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  const Icon = layer.icon;
  return (
    <button
      type="button"
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={onSelect}
      aria-pressed={on}
      style={style}
      className={`block text-left outline-none ${className}`}
    >
      <span
        className={`flex size-10 items-center justify-center rounded-full transition-colors duration-500 ${
          on ? "bg-accent text-white" : "bg-[#e5e5e3] text-[#8a8a87]"
        }`}
      >
        {Icon ? (
          <Icon className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />
        ) : (
          <FoxMark className="size-[18px]" />
        )}
      </span>
      <span className="block pt-4 text-[26px] font-medium leading-[34px] tracking-[-0.02em] text-ink">
        {layer.name}
      </span>
      <span className="block pt-2 text-[15px] leading-[21px] text-muted">{layer.body}</span>
    </button>
  );
}

/** Sources flow into a stack of four layers; the active layer lifts and its note lights up. */
export default function LayerStack() {
  const [active, setActive] = useState(BRAND);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    const timer = window.setInterval(() => {
      if (visible) setActive((a) => (a + 1) % LAYERS.length);
    }, CYCLE_MS);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [paused]);

  return (
    <section ref={ref} className="mx-auto w-full max-w-site px-5 py-24 sm:px-8 lg:px-10 lg:py-40">
      <Reveal>
        <h2 className="mx-auto max-w-[640px] text-balance text-center text-display-md text-ink">
          <span className="block">From store data to a decision.</span>
          <span className="block text-quiet">See the evidence at every step.</span>
        </h2>
      </Reveal>

      {/* Desktop: one composition, scaled to fit */}
      <Reveal variant="scale" delay={100}>
      <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <ScaleToFit
          width={CANVAS_W}
          height={CANVAS_H}
          className="mx-auto mt-10 hidden max-w-[1120px] lg:mt-16 lg:block"
        >
          <div className="relative" style={{ width: CANVAS_W, height: CANVAS_H }}>
            <svg
              viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
              width={CANVAS_W}
              height={CANVAS_H}
              className="absolute inset-0 overflow-visible"
              aria-hidden="true"
            >
              <StackArt active={active} full />
            </svg>
            {SOURCES.map((source, i) => (
              <SourceChip
                key={source.label}
                source={source}
                className="absolute -translate-x-1/2"
                style={{ left: CHIPS[i].x, top: CHIPS[i].y }}
              />
            ))}
            {LAYERS.map((layer, i) => (
              <LayerItem
                key={layer.name}
                layer={layer}
                on={i === active}
                onSelect={() => setActive(i)}
                className="absolute"
                style={{ left: ITEM_X[layer.side], top: PLATE_Y[i] + 2 - TITLE_MID, width: ITEM_W }}
              />
            ))}
          </div>
        </ScaleToFit>
      </div>
      </Reveal>

      {/* Mobile and tablet: sources, the stack, then the four layers */}
      <Reveal className="mt-10 lg:hidden">
        <div className="flex flex-wrap justify-center gap-2">
          {SOURCES.map((source) => (
            <SourceChip key={source.label} source={source} />
          ))}
        </div>
        <svg
          viewBox={`${CX - 250} 160 500 650`}
          className="mx-auto mt-6 h-auto w-full max-w-[420px] overflow-visible"
          aria-hidden="true"
        >
          <StackArt active={active} full={false} />
        </svg>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {LAYERS.map((layer, i) => (
            <LayerItem key={layer.name} layer={layer} on={i === active} onSelect={() => setActive(i)} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
