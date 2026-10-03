import Reveal from "@/components/reveal";
import { cn } from "@/lib/utils";

/**
 * A heading block for a page section, in the homepage style: optional mono label, a 30px title with an
 * optional gray second line, and a short 16px lead.
 */
export default function SectionHeading({
  kicker,
  title,
  sub,
  lead,
  align = "left",
  size = "lg",
  className,
  tone = "light",
}: {
  kicker?: string;
  title: React.ReactNode;
  /** A second line in gray, like the homepage headings. */
  sub?: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  size?: "lg" | "md";
  className?: string;
  tone?: "light" | "dark";
}) {
  // Display sizes are joined with template strings, not cn(), because
  // tailwind-merge misreads `text-display-*` as a text color and drops it.
  const sizeClass = size === "lg" ? "text-display-md" : "text-display-sm";
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const leadColor = tone === "dark" ? "text-dark-muted" : "text-muted";

  return (
    <Reveal className={cn("max-w-[560px]", align === "center" && "mx-auto text-center", className)}>
      {kicker ? <p className="label-mono mb-4 text-ink">{kicker}</p> : null}
      <h2 className={`${sizeClass} ${titleColor}`}>
        {sub ? (
          <>
            <span className="block">{title}</span>
            <span className="block text-quiet">{sub}</span>
          </>
        ) : (
          title
        )}
      </h2>
      {lead ? <p className={`${sub ? "mt-4" : "mt-2"} text-[16px] leading-[26px] ${leadColor}`}>{lead}</p> : null}
    </Reveal>
  );
}
