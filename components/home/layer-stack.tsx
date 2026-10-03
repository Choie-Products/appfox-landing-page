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

type Layer = { name: string; body: string; icon: LucideIcon | null; side: "left" | "right" };

/** Top to bottom, in the order the plates are stacked. A null icon is the Appfox layer. */
const LAYERS: Layer[] = [
  {
    name: "Facts",
    icon: Database,
    side: "left",
    body: "Listings, reviews, ranks, releases, and metrics. Stored once, never backdated.",
  },
  {
    name: "Signals",
    icon: Activity,
    side: "right",
    body: "Deterministic detections with a threshold, a minimum sample, and a cooldown.",
  },
  {
    name: "Insights",
    icon: null,
    side: "left",
    body: "AI joins independent sources into one plain explanation and cites its evidence.",
  },
  {
    name: "Outcomes",
    icon: Target,
    side: "right",
    body: "You accept, dismiss, or snooze. Matched windows then show whether it helped.",
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
const CHIP_H = 36;
const DISC = { rx: 44, ry: 44 * K };
const LANDING_ANGLES = [200, 235, 270, 305, 340];
const FLOW_DURATIONS = ["1.2s", "0.9s", "1.1s", "1s", "1.3s"];

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

/** The walls of an extruded plate: its bottom face plus the band between the side extremes. */
function Walls({ top, bottom, half, r, fill }: { top: number; bottom: number; half: number; r: number; fill: string }) {
  const e = reach(half, r);
  return (
    <>
      <path d={platePath(bottom, half, r)} fill={fill} />
      <rect x={CX - e} y={top} width={e * 2} height={bottom - top} fill={fill} />
    </>
  );
}

function Plate({ index, lifted, uid }: { index: number; lifted: boolean; uid: string }) {
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
    </g>
  );
}

/** The stack itself, plus the source lines and item connectors when drawn on the full canvas. */
function StackArt({ active, full }: { active: number; full: boolean }) {
  const uid = useId().replace(/:/g, "");
  const cupTop = PLATE_Y[BRAND] - 20;
  const cupBottom = PLATE_Y[PLATE_Y.length - 1] + 46;
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
        <filter id={`${uid}-blur`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      {/* A soft orange cup holds the lower layers */}
      <g filter={`url(#${uid}-blur)`} opacity={0.6}>
        <Walls top={cupTop - 30} bottom={cupBottom + 10} half={S * 1.34} r={R * 1.6} fill={`url(#${uid}-cup)`} />
      </g>
      <g opacity={0.75}>
        <Walls top={cupTop} bottom={cupBottom} half={S * 1.18} r={R * 1.4} fill={`url(#${uid}-cup)`} />
      </g>
      <ellipse cx={CX} cy={PLATE_Y[BRAND] + 8} rx={270} ry={140} fill={`url(#${uid}-glow)`} />

      {/* Drawn bottom up, so each plate sits over the one beneath it */}
      {PLATE_Y.map((_, i) => PLATE_Y.length - 1 - i).map((i) => (
        <Plate key={i} index={i} lifted={i === active} uid={uid} />
      ))}

      {full ? (
        <>
          {CHIPS.map((chip, i) => {
            const angle = (LANDING_ANGLES[i] * Math.PI) / 180;
            const tx = CX + DISC.rx * Math.cos(angle);
            const ty = PLATE_Y[0] + DISC.ry * Math.sin(angle);
            const sy = chip.y + CHIP_H + 4;
            return (
              <path
                key={chip.x}
                d={`M${chip.x} ${sy} C ${chip.x} ${sy + 80}, ${tx} ${ty - 100}, ${tx} ${ty}`}
                fill="none"
                stroke="#fe5000"
                strokeWidth={2}
                strokeLinecap="round"
                className="ledger-flow"
                style={{ animationDuration: FLOW_DURATIONS[i] }}
              />
            );
          })}
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
      className={`inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white py-1.5 pl-1.5 pr-3.5 text-[14px] font-medium leading-5 text-ink ${className}`}
    >
      <span className="flex size-6 items-center justify-center rounded-full bg-ink">
        <Icon className="size-3 text-white" strokeWidth={2} aria-hidden="true" />
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
      <h2 className="mx-auto max-w-[640px] text-balance text-center text-display-md text-ink">
        <span className="block">So we built it in four layers.</span>
        <span className="block text-quiet">Every answer traces back to its source.</span>
      </h2>

      {/* Desktop: one composition, scaled to fit */}
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

      {/* Mobile and tablet: sources, the stack, then the four layers */}
      <div className="mt-10 lg:hidden">
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
      </div>
    </section>
  );
}
