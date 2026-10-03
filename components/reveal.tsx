"use client";

import { useEffect, useRef } from "react";

type Variant = "up" | "scale" | "fade";

let observer: IntersectionObserver | null = null;

/** One observer for every revealed element on the page. Each element is shown once, then forgotten. */
function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.shown = "";
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0 },
  );
  return observer;
}

/**
 * Fades and lifts its content into place the first time it scrolls into view. The motion lives in CSS
 * (`[data-reveal]` in globals.css), so content stays visible without JavaScript or with reduced motion.
 * `delay` staggers siblings, in milliseconds.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
  as?: "div" | "li" | "span";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.dataset.shown = "";
      return;
    }
    const o = getObserver();
    o.observe(el);
    return () => o.unobserve(el);
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-reveal={variant}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
