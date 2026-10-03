import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import Reveal from "@/components/reveal";
import Container from "@/components/ui/container";
import { cn } from "@/lib/utils";

/**
 * Building blocks for inner pages, matching the homepage: roomy section spacing, soft gray cards with a
 * solid lower edge, ruled lists with gray dividers, mono uppercase labels, and orange mono links.
 */

export function Section({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <Container as="section" id={id} className={cn("py-24 lg:py-40", className)}>
      {children}
    </Container>
  );
}

/** Mono uppercase label used for titles of rows, cards, and steps. */
export function MonoLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-[14px] font-medium uppercase leading-5 tracking-normal text-ink", className)}>
      {children}
    </p>
  );
}

/** A soft gray card with a solid lower edge, like the cards on the homepage. It reveals on scroll; `delay` staggers siblings. */
export function SoftCard({ children, className, delay }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <Reveal delay={delay} className={cn("soft-surface rounded-[28px] p-6 sm:p-8", className)}>
      {children}
    </Reveal>
  );
}

/** Frames a product mock the way the homepage frames its scenes: a soft card around the mock. */
export function Showcase({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Reveal variant="scale" className={cn("soft-surface rounded-[32px] p-4 sm:p-6", className)}>
      {children}
    </Reveal>
  );
}

/** Text on one side, a visual on the other. `sub` adds a gray second line to the title, like the homepage. */
export function Split({
  title,
  sub,
  children,
  visual,
  reverse = false,
  className,
}: {
  title: React.ReactNode;
  sub?: React.ReactNode;
  children?: React.ReactNode;
  visual: React.ReactNode;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16",
        reverse && "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:[&>*:first-child]:order-2",
        className,
      )}
    >
      <Reveal>
        <h2 className="text-display-md text-ink">
          {sub ? (
            <>
              <span className="block">{title}</span>
              <span className="block text-quiet">{sub}</span>
            </>
          ) : (
            title
          )}
        </h2>
        {children ? <div className="space-y-4 pt-5 text-[16px] leading-[26px] text-muted">{children}</div> : null}
      </Reveal>
      <Reveal variant="scale" delay={120} className="min-w-0">
        {visual}
      </Reveal>
    </div>
  );
}

/** Numbered steps as a grid of soft cards. */
export function StepCards({ steps, className }: { steps: { t: string; b: string }[]; className?: string }) {
  return (
    <ol className={cn("grid gap-5 md:grid-cols-2 lg:grid-cols-3", className)}>
      {steps.map((s, i) => (
        <Reveal as="li" key={s.t} delay={(i % 3) * 90} className="soft-surface flex flex-col rounded-[24px] p-6">
          <span className="font-mono text-[14px] leading-5 text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
          <MonoLabel className="pt-6">{s.t}</MonoLabel>
          <p className="pt-2 text-[16px] leading-[26px] text-muted">{s.b}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/** Ruled rows: a mono title (with an optional orange tag) beside a body, separated by gray lines. */
export function RuledList({
  items,
  className,
}: {
  items: { title: string; body: React.ReactNode; tag?: string; note?: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      {items.map((item, i) => (
        <Reveal
          key={item.title}
          delay={i * 60}
          className="grid gap-2 border-b border-line py-6 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:gap-10"
        >
          <div>
            <MonoLabel>{item.title}</MonoLabel>
            {item.tag ? <p className="pt-1 font-mono text-[12px] uppercase leading-4 text-accent-ink">{item.tag}</p> : null}
          </div>
          <div>
            <div className="text-[16px] leading-[26px] text-muted">{item.body}</div>
            {item.note ? <p className="pt-2 text-[14px] leading-5 text-quiet">{item.note}</p> : null}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** A list with a check (or a cross) on each line, separated by gray lines. */
export function CheckList({
  items,
  tone = "yes",
  className,
}: {
  items: React.ReactNode[];
  tone?: "yes" | "no";
  className?: string;
}) {
  const Icon = tone === "yes" ? Check : X;
  return (
    <ul className={className}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 border-b border-line py-3.5 text-[16px] leading-[24px] text-ink-soft last:border-b-0">
          <span
            className={cn(
              "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
              tone === "yes" ? "bg-accent-soft text-accent" : "bg-[#efefed] text-quiet",
            )}
          >
            <Icon className="size-3" strokeWidth={2.6} aria-hidden="true" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Orange mono link with an arrow, like the links on the homepage. */
export function MonoLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const external = href.startsWith("mailto:") || href.startsWith("http");
  const classes = cn(
    "inline-flex items-center gap-2 font-mono text-[14px] font-medium uppercase leading-5 tracking-normal text-accent-ink transition-colors hover:text-ink",
    className,
  );
  const content = (
    <>
      {children}
      <ArrowRight className="size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
    </>
  );
  return external ? (
    <a href={href} className={classes}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

/** Homepage-style card: a small visual on top, then a mono title and the text, on a soft gray card. */
export function PanelCard({
  visual,
  title,
  body,
  delay,
}: {
  visual: React.ReactNode;
  title: string;
  body: React.ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="soft-surface flex flex-col rounded-[24px] text-center">
      <div className="flex aspect-[4/3] items-center justify-center px-6">{visual}</div>
      <div className="flex-1 px-5 pb-7">
        <h3 className="font-mono text-[12px] font-medium uppercase leading-4 tracking-normal text-ink">{title}</h3>
        <p className="pt-2 text-[15px] leading-[24px] text-muted">{body}</p>
      </div>
    </Reveal>
  );
}
