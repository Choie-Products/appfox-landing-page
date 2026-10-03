import { cn } from "@/lib/utils";

export function Chip({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "good" | "warn" | "danger";
  className?: string;
}) {
  const tones = {
    neutral: "bg-paper text-ink-soft border-line",
    accent: "bg-accent-soft text-accent-ink border-transparent",
    good: "bg-[#e6f4ec] text-good border-transparent",
    warn: "bg-[#fff3d6] text-[#8a5a00] border-transparent",
    danger: "bg-[#fdebe8] text-danger border-transparent",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded-md border px-1.5 text-[11px] font-medium leading-none",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Delta({ value, good }: { value: string; good?: boolean }) {
  return <span className={cn("tabular text-[12px]", good ? "text-good" : "text-danger")}>{value}</span>;
}
