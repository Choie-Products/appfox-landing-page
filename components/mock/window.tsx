import { cn } from "@/lib/utils";

/** Framed product surface. Title bar mimics the in-app page header, not browser chrome. */
export default function Window({
  title,
  meta,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  meta?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={cn("window overflow-hidden text-ink", className)} aria-hidden="true">
      {title ? (
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-[12px]">
          <span className="font-medium text-ink">{title}</span>
          {meta ? <span className="text-muted">{meta}</span> : null}
        </div>
      ) : null}
      <div className={cn("p-4", bodyClassName)}>{children}</div>
    </div>
  );
}
