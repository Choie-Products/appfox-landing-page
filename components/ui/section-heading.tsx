import { cn } from "@/lib/utils";

/**
 * A heading block for a page section, in the homepage style: optional mono label, 30px regular title,
 * and a short 16px lead.
 */
export default function SectionHeading({
  kicker,
  title,
  lead,
  align = "left",
  size = "lg",
  className,
  tone = "light",
}: {
  kicker?: string;
  title: React.ReactNode;
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
    <div className={cn("max-w-[560px]", align === "center" && "mx-auto text-center", className)}>
      {kicker ? (
        <p className="mb-3 font-mono text-[14px] font-medium uppercase leading-5 tracking-normal text-ink">{kicker}</p>
      ) : null}
      <h2 className={`${sizeClass} ${titleColor}`}>{title}</h2>
      {lead ? <p className={`mt-2 text-[16px] leading-[26px] ${leadColor}`}>{lead}</p> : null}
    </div>
  );
}
