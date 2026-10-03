"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wraps an illustration and marks it `data-inview="true"` the first time it scrolls into view.
 * Entrance animations (elements with `data-anim`) wait in their first frame until then.
 */
export default function InView({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`illo ${className ?? ""}`} data-inview={inView ? "true" : "false"}>
      {children}
    </div>
  );
}
