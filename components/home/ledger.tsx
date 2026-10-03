import Link from "next/link";
import { ArrowRight, ListOrdered, Plug, Smartphone, Star, Store, Target, type LucideIcon } from "lucide-react";
import { FOX_PATH } from "@/components/fox-mark";
import ScaleToFit from "@/components/mock/scale-to-fit";
import Container from "@/components/ui/container";

/** The six surfaces, each with the question it answers (wording from the product page). */
const SURFACES: { name: string; question: string; icon: LucideIcon }[] = [
  { name: "Today", question: "What needs my attention?", icon: ListOrdered },
  { name: "Market", question: "Who is out there, and what is changing?", icon: Store },
  { name: "My App", question: "How is my app doing, across sources?", icon: Smartphone },
  { name: "Customers", question: "What are people telling us?", icon: Star },
  { name: "Actions", question: "What did we decide, and did it help?", icon: Target },
  { name: "Integrations", question: "What does Appfox read, and can it write?", icon: Plug },
];

const JOURNEY_LINKS = [
  { label: "Research an idea", href: "/research" },
  { label: "Operate a live app", href: "/live-app" },
  { label: "Watch session replays", href: "/replay" },
];

/* Desktop drawing space: three cards a side, the ledger plate in the middle. */
const CANVAS_W = 1200;
const CANVAS_H = 500;
const CX = CANVAS_W / 2;
const CARD_W = 360;
const CARD_H = 96;
const CARD_Y = [40, 196, 352];
const FLOW_DURATIONS = ["1.1s", "0.9s", "1.3s"];

/* The ledger plate: half side of its square, corner radius, isometric squash, thickness. */
const PLATE_CY = 206;
const S = 106;
const R = 24;
const K = 0.46;
const T = 20;
const REACH = (2 * S - 0.5 * R) / Math.SQRT2;

/** Projects a point on the plate (u, v in its own square) onto the canvas. */
function iso(cx: number, cy: number, u: number, v: number) {
  return `${(cx + (u - v) / Math.SQRT2).toFixed(1)} ${(cy + (K * (u + v)) / Math.SQRT2).toFixed(1)}`;
}

/** A rounded square lying flat; quadratic corners stay exact under the projection. */
function platePath(cx: number, cy: number) {
  const a = S;
  const b = S - R;
  const p = (u: number, v: number) => iso(cx, cy, u, v);
  return `M${p(-b, -a)} L${p(b, -a)} Q${p(a, -a)} ${p(a, -b)} L${p(a, b)} Q${p(a, a)} ${p(b, a)} L${p(-b, a)} Q${p(-a, a)} ${p(-a, b)} L${p(-a, -b)} Q${p(-a, -a)} ${p(-b, -a)} Z`;
}

/**
 * The orange ledger plate with the fox on a recessed disc, glowing softly. `cx` and `cy` place its top face;
 * `uid` keeps gradient ids unique, since the page draws the plate twice (desktop and mobile).
 */
function LedgerPlate({ cx, cy, uid }: { cx: number; cy: number; uid: string }) {
  return (
    <g>
      <defs>
        <radialGradient id={`${uid}-glow`}>
          <stop offset="0" stopColor="#fe5000" stopOpacity="0.28" />
          <stop offset="1" stopColor="#fe5000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-top`} cx="0.5" cy="0.5" r="0.62">
          <stop offset="0" stopColor="#ff7a3a" />
          <stop offset="0.5" stopColor="#ffab80" />
          <stop offset="1" stopColor="#ffd8c3" />
        </radialGradient>
        <linearGradient id={`${uid}-side`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f9bf9f" />
          <stop offset="0.5" stopColor="#f3a479" />
          <stop offset="1" stopColor="#ea8c5c" />
        </linearGradient>
        <radialGradient id={`${uid}-disc`} cx="0.5" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#e94a06" />
          <stop offset="1" stopColor="#fe5f17" />
        </radialGradient>
      </defs>
      <ellipse className="fox-glow" cx={cx} cy={cy + 14} rx={REACH + 70} ry={(REACH + 70) * 0.55} fill={`url(#${uid}-glow)`} />
      <path d={platePath(cx, cy + T)} fill={`url(#${uid}-side)`} />
      <rect x={cx - REACH} y={cy} width={REACH * 2} height={T} fill={`url(#${uid}-side)`} />
      <path d={platePath(cx, cy)} fill={`url(#${uid}-top)`} stroke="rgba(255,226,208,0.9)" strokeWidth={1.2} />
      <ellipse cx={cx} cy={cy + 1.5} rx={36} ry={36 * K} fill="#ffc9ab" />
      <ellipse cx={cx} cy={cy} rx={36} ry={36 * K} fill={`url(#${uid}-disc)`} />
      <path d={FOX_PATH} fill="#ffffff" transform={`translate(${cx - 13.4} ${cy - 8.7}) scale(0.2 0.124)`} />
    </g>
  );
}

function SurfaceCard({
  surface,
  className = "",
  style,
}: {
  surface: (typeof SURFACES)[number];
  className?: string;
  style?: React.CSSProperties;
}) {
  const Icon = surface.icon;
  return (
    <div style={style} className={`soft-card group flex items-center gap-4 rounded-[22px] px-5 py-[18px] ${className}`}>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#e9e9e7] text-[#8a8a87] shadow-[inset_0_2px_3px_rgba(17,17,17,0.08),0_1px_0_#ffffff] transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
        <Icon className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[13px] font-medium uppercase leading-5 text-ink">{surface.name}</span>
        <span className="block pt-0.5 text-[15px] leading-[21px] text-muted">{surface.question}</span>
      </span>
    </div>
  );
}

function LedgerCaption() {
  return (
    <div className="text-center">
      <p className="font-mono text-[14px] font-medium uppercase leading-5 text-ink">One ledger</p>
      <p className="pt-2 text-[15px] leading-[22px] text-muted">
        Every finding keeps its evidence, whichever surface it shows up on.
      </p>
    </div>
  );
}

/** Six surfaces around one ledger, joined by orange lines that flow into the plate. */
export default function Ledger() {
  const left = SURFACES.slice(0, 3);
  const right = SURFACES.slice(3);
  const lineY = PLATE_CY + T / 2;
  return (
    <Container as="section" className="py-24 lg:py-40">
      <div className="mx-auto max-w-[560px] text-center">
        <h2 className="text-display-md text-ink">
          <span className="block">Where it all lives:</span>
          <span className="block text-quiet">six surfaces, one ledger.</span>
        </h2>
        <p className="pt-4 text-[16px] leading-[26px] text-muted">
          Today, Market, My App, Customers, Actions, and Integrations. No keyword silo, no review silo, no revenue
          silo. Each surface answers a question you actually ask.
        </p>
      </div>

      {/* Desktop: one composition, scaled to fit */}
      <ScaleToFit width={CANVAS_W} height={CANVAS_H} className="mx-auto mt-10 hidden max-w-[1200px] lg:mt-16 lg:block">
        <div className="relative" style={{ width: CANVAS_W, height: CANVAS_H }}>
          <svg
            viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
            width={CANVAS_W}
            height={CANVAS_H}
            className="absolute inset-0 overflow-visible"
            aria-hidden="true"
          >
            <LedgerPlate cx={CX} cy={PLATE_CY} uid="ledger-desktop" />
            {CARD_Y.map((y, i) => {
              const cardMid = y + CARD_H / 2;
              const fromL = CARD_W + 14;
              const toL = CX - REACH - 10;
              const fromR = CANVAS_W - CARD_W - 14;
              const toR = CX + REACH + 10;
              const bend = (toL - fromL) / 2;
              return (
                <g
                  key={y}
                  fill="none"
                  stroke="#fe5000"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  className="ledger-flow"
                  style={{ animationDuration: FLOW_DURATIONS[i] }}
                >
                  <path d={`M${fromL} ${cardMid} C ${fromL + bend} ${cardMid}, ${toL - bend} ${lineY}, ${toL} ${lineY}`} />
                  <path d={`M${fromR} ${cardMid} C ${fromR - bend} ${cardMid}, ${toR + bend} ${lineY}, ${toR} ${lineY}`} />
                </g>
              );
            })}
          </svg>
          {left.map((s, i) => (
            <SurfaceCard key={s.name} surface={s} className="absolute" style={{ left: 0, top: CARD_Y[i], width: CARD_W, height: CARD_H }} />
          ))}
          {right.map((s, i) => (
            <SurfaceCard
              key={s.name}
              surface={s}
              className="absolute"
              style={{ left: CANVAS_W - CARD_W, top: CARD_Y[i], width: CARD_W, height: CARD_H }}
            />
          ))}
          <div className="absolute w-[300px]" style={{ left: CX - 150, top: PLATE_CY + 2 * S * K * Math.SQRT1_2 + T + 34 }}>
            <LedgerCaption />
          </div>
        </div>
      </ScaleToFit>

      {/* Mobile and tablet: the plate, then the surfaces */}
      <div className="mt-10 lg:hidden">
        <svg viewBox={`${CX - 200} ${PLATE_CY - 110} 400 230`} className="mx-auto h-auto w-full max-w-[320px]" aria-hidden="true">
          <LedgerPlate cx={CX} cy={PLATE_CY} uid="ledger-mobile" />
        </svg>
        <div className="mx-auto max-w-[320px] pt-2">
          <LedgerCaption />
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {SURFACES.map((s) => (
            <SurfaceCard key={s.name} surface={s} />
          ))}
        </div>
      </div>

      <div className="grid gap-3 pt-10 sm:grid-cols-3 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] lg:gap-16 lg:pt-16">
        {JOURNEY_LINKS.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 font-mono text-[14px] font-medium uppercase leading-5 tracking-normal text-accent-ink transition-colors hover:text-ink ${
              ["sm:justify-self-start", "sm:justify-self-center", "sm:justify-self-end"][i]
            }`}
          >
            {item.label}
            <ArrowRight className="size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </Container>
  );
}
