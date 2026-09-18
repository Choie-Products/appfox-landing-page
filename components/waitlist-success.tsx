"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

const ROLES = [
  { id: "indie", label: "Indie" },
  { id: "founder", label: "Founder" },
  { id: "product", label: "Product" },
  { id: "studio", label: "Studio" },
  { id: "exploring", label: "Exploring" },
] as const;

export default function WaitlistSuccess({
  email,
  alreadyJoined,
  layout = "card",
}: {
  email: string;
  alreadyJoined: boolean;
  layout?: "card" | "page";
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [role, setRole] = useState<string | null>(null);
  const [roleSaved, setRoleSaved] = useState(false);

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

  const isPage = layout === "page";

  return (
    <div
      className={cn(
        "waitlist-enter",
        isPage
          ? "max-w-xl"
          : "w-full rounded-[28px] border border-border bg-surface p-5 shadow-[0_12px_40px_rgba(23,23,23,0.05)] sm:p-6",
      )}
    >
      <div className={cn("flex", isPage ? "flex-col" : "items-start gap-4")}>
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground",
            isPage ? "mb-6 size-12" : "size-11",
          )}
        >
          <Check className="size-5" strokeWidth={2.25} />
        </span>
        <div>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className={cn(
              "font-heading tracking-tight text-foreground outline-none",
              isPage ? "text-4xl leading-[1.12] sm:text-5xl" : "text-xl sm:text-2xl",
            )}
          >
            {alreadyJoined ? "You're already on the list." : "You're on the list."}
          </h2>
          <p
            className={cn(
              "mt-2 max-w-[38ch] leading-relaxed text-foreground-muted",
              isPage ? "text-base sm:text-lg" : "text-sm",
            )}
          >
            We'll email you when AppFox is ready to watch your app.
          </p>
        </div>
      </div>

      <div className={cn(isPage ? "mt-8" : "mt-5 border-t border-border pt-5")}>
        <p className="text-sm text-foreground">What best describes you?</p>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Your role">
          {ROLES.map((item) => {
            const selected = role === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => saveRole(item.id)}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm transition-colors",
                    selected
                      ? "bg-accent text-accent-foreground"
                      : "bg-surface-muted text-foreground hover:bg-border",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        {roleSaved ? (
          <p className="mt-3 text-sm text-foreground-muted" aria-live="polite">
            Got it. That helps us shape early access.
          </p>
        ) : null}
      </div>
    </div>
  );
}
