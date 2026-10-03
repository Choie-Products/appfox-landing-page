"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

const ROLES = [
  { id: "indie", label: "Indie developer" },
  { id: "founder", label: "Founder" },
  { id: "product", label: "Product or growth" },
  { id: "studio", label: "Studio or agency" },
  { id: "exploring", label: "Just exploring" },
] as const;

export default function WaitlistSuccess({
  email,
  alreadyJoined,
  tone = "light",
}: {
  email: string;
  alreadyJoined: boolean;
  tone?: "light" | "dark";
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [role, setRole] = useState<string | null>(null);
  const [roleSaved, setRoleSaved] = useState(false);
  const dark = tone === "dark";

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  async function saveRole(nextRole: string) {
    setRole(nextRole);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: nextRole }),
      });
      setRoleSaved(true);
      track("secondary_profile_completed", { role: nextRole });
    } catch {
      setRoleSaved(false);
    }
  }

  return (
    <div
      className={cn(
        "rise w-full border p-5 sm:p-6",
        dark ? "border-dark-line bg-dark-surface" : "border-line bg-surface",
      )}
    >
      <div className="flex items-start gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
          <Check className="size-5" strokeWidth={2.25} />
        </span>
        <div>
          <h3
            ref={headingRef}
            tabIndex={-1}
            className={cn("text-xl font-medium tracking-[-0.015em] outline-none sm:text-2xl", dark ? "text-white" : "text-ink")}
          >
            {alreadyJoined ? "You're already on the list." : "You're on the list."}
          </h3>
          <p className={cn("mt-1.5 text-sm leading-relaxed", dark ? "text-dark-muted" : "text-muted")}>
            We sent a note to {email}. We'll email you when your workspace is ready.
          </p>
        </div>
      </div>

      <div className={cn("mt-5 border-t pt-5", dark ? "border-dark-line" : "border-line")}>
        <p className={cn("text-sm", dark ? "text-white" : "text-ink")}>What best describes you?</p>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Your role">
          {ROLES.map((item) => {
            const selected = role === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => saveRole(item.id)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                  selected
                    ? "border-accent bg-accent text-white"
                    : dark
                      ? "border-dark-line text-dark-muted hover:border-dark-muted hover:text-white"
                      : "border-line-strong text-ink-soft hover:border-ink hover:text-ink",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        {roleSaved ? (
          <p className={cn("mt-3 text-sm", dark ? "text-dark-muted" : "text-muted")} aria-live="polite">
            Got it. That helps us shape early access.
          </p>
        ) : null}
      </div>
    </div>
  );
}
