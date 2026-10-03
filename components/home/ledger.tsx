import Link from "next/link";
import { ArrowRight, ListOrdered, Plug, Smartphone, Star, Store, Target, type LucideIcon } from "lucide-react";
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

/** Connector rows (in the SVG's 0–100 vertical space) and how fast each one flows. */
const CONNECTORS = [
  { y: 17, dur: "1.1s" },
  { y: 50, dur: "0.9s" },
  { y: 83, dur: "1.3s" },
];

function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-[14px] font-medium uppercase leading-5 tracking-normal text-ink ${className}`}>
      {children}
    </p>
  );
}

function SurfaceCard({ surface }: { surface: (typeof SURFACES)[number] }) {
  const Icon = surface.icon;
  return (
    <div className="outline-card relative z-10 rounded-[24px] p-4">
      <div className="flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-full bg-ink">
          <Icon className="size-3.5 text-white" strokeWidth={1.9} aria-hidden="true" />
        </span>
        <Label className="text-[13px]">{surface.name}</Label>
      </div>
      <p className="pl-9 pt-2 text-[15px] leading-[21px] text-muted">{surface.question}</p>
    </div>
  );
}

/** Six surfaces around one ledger, joined by orange lines that flow into the center. */
export default function Ledger() {
  const left = SURFACES.slice(0, 3);
  const right = SURFACES.slice(3);
  return (
    <Container as="section" className="py-16 lg:py-24">
      <div className="mx-auto max-w-[560px] text-center">
        <h2 className="text-display-md text-ink">Where it all lives: six surfaces, one ledger.</h2>
        <p className="pt-2 text-[16px] leading-[26px] text-muted">
          Today, Market, My App, Customers, Actions, and Integrations. No keyword silo, no review silo, no revenue
          silo. Each surface answers a question you actually ask.
        </p>
      </div>

      <div className="relative mt-12 grid items-center gap-5 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] lg:gap-16">
        <svg
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          aria-hidden="true"
        >
          {CONNECTORS.map(({ y, dur }) => (
            <g
              key={y}
              fill="none"
              stroke="#fe5000"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="ledger-flow"
              style={{ animationDuration: dur }}
            >
              <path d={`M300 ${y} C 360 ${y}, 360 50, 420 50`} vectorEffect="non-scaling-stroke" />
              <path d={`M700 ${y} C 640 ${y}, 640 50, 580 50`} vectorEffect="non-scaling-stroke" />
            </g>
          ))}
        </svg>

        <div className="order-2 flex flex-col gap-5 lg:order-1">
          {left.map((s) => (
            <SurfaceCard key={s.name} surface={s} />
          ))}
        </div>

        <div className="outline-card relative z-10 order-1 rounded-[32px] p-6 text-center lg:order-2">
          <svg viewBox="0 0 168 177" className="mx-auto h-[50px] w-12" aria-hidden="true">
            <path d="M153.216 0L110.209 50.956L84 60.3441L57.7913 50.956L14.7837 0L0 120.683L67.8729 177H100.127L168 120.683L153.216 0ZM29.5335 81.7841L69.3405 88.0917V116.019L56.3519 96.5337L29.5279 81.7841H29.5335ZM84 152.947L63.1369 141.976L84 131.006L104.863 141.976L84 152.947ZM111.643 96.5337L98.6539 116.019V88.0917L138.461 81.7841L111.637 96.5337H111.643Z" fill="#FE5000" />
          </svg>
          <Label className="pt-4">One ledger</Label>
          <p className="pt-2 text-[15px] leading-[22px] text-muted">
            Every finding keeps its evidence, whichever surface it shows up on.
          </p>
        </div>

        <div className="order-3 flex flex-col gap-5">
          {right.map((s) => (
            <SurfaceCard key={s.name} surface={s} />
          ))}
        </div>
      </div>

      <div className="grid gap-3 pt-[100px] sm:grid-cols-3 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] lg:gap-16">
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
