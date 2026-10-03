import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import Container from "@/components/ui/container";
import { cn } from "@/lib/utils";

/**
 * Building blocks for inner pages, matching the homepage: 96px section spacing, outlined white cards
 * with a faint dot grid, ruled lists with gray dividers, mono uppercase labels, and orange mono links.
 */

export function Section({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <Container as="section" id={id} className={cn("py-16 lg:py-24", className)}>
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

/** Outlined white card with a faint dot grid, as used on the homepage. */
export function OutlineCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("outline-card rounded-[28px] p-6 sm:p-8", className)}>{children}</div>;
}

/** Frames a product mock the way the homepage frames its scenes: an outlined card around a bordered tile. */
export function Showcase({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("outline-card rounded-[32px] p-4 sm:p-6", className)}>{children}</div>;
}

/** Text on one side, a visual on the other. */
export function Split({
  title,
  children,
  visual,
  reverse = false,
  className,
}: {
  title: React.ReactNode;
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
      <div>
        <h2 className="text-display-md text-ink">{title}</h2>
        {children ? <div className="space-y-4 pt-4 text-[16px] leading-[26px] text-muted">{children}</div> : null}
      </div>
      <div className="min-w-0">{visual}</div>
    </div>
  );
}

/** Numbered steps as a grid of outlined cards. */
export function StepCards({ steps, className }: { steps: { t: string; b: string }[]; className?: string }) {
  return (
    <ol className={cn("grid gap-5 md:grid-cols-2 lg:grid-cols-3", className)}>
      {steps.map((s, i) => (
        <li key={s.t} className="outline-card flex flex-col rounded-[24px] p-6">
          <span className="font-mono text-[14px] leading-5 text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
          <MonoLabel className="pt-6">{s.t}</MonoLabel>
          <p className="pt-2 text-[16px] leading-[26px] text-muted">{s.b}</p>
        </li>
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
      {items.map((item) => (
        <div
          key={item.title}
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
        </div>
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

/** Homepage-style card: a light panel with a small visual on top, and a black panel with the text below. */
export function PanelCard({ visual, title, body }: { visual: React.ReactNode; title: string; body: React.ReactNode }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[24px] border-2 border-ink bg-ink text-center">
      <div className="flex aspect-[4/3] items-center justify-center rounded-b-[24px] bg-[#f6f6f6] px-6">{visual}</div>
      <div className="flex-1 px-5 pb-6 pt-5">
        <h3 className="font-mono text-[12px] font-medium uppercase leading-4 tracking-normal text-white">{title}</h3>
        <p className="pt-2 text-[15px] leading-[24px] text-[#b8b8b4]">{body}</p>
      </div>
    </div>
  );
}
