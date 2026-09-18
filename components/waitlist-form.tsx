"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { AlertCircle } from "lucide-react";
import { isValidEmail, normalizeEmail } from "@/lib/email";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";
import WaitlistSuccess from "@/components/waitlist-success";

type FormStatus =
  | { type: "idle" }
  | { type: "invalid"; message: string }
  | { type: "loading" }
  | { type: "success"; alreadyJoined: boolean }
  | { type: "error"; message: string };

export default function WaitlistForm({
  className,
  onSuccess,
}: {
  className?: string;
  onSuccess?: (result: { email: string; alreadyJoined: boolean }) => void;
}) {
  const inputId = useId();
  const errorId = useId();
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });
  const [shake, setShake] = useState(false);

  useEffect(() => {
    track("landing_view");
  }, []);

  function flashError(message: string, type: "invalid" | "error" = "invalid") {
    setStatus({ type, message });
    setShake(true);
    window.setTimeout(() => setShake(false), 420);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      flashError("Enter your work email.");
      return;
    }

    if (!isValidEmail(normalizeEmail(trimmed))) {
      flashError("That email doesn't look right.");
      return;
    }

    setStatus({ type: "loading" });
    track("waitlist_submit");
    track("hero_waitlist_click");

    const params = new URLSearchParams(window.location.search);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          website: honeypot,
          utmSource: params.get("utm_source") ?? undefined,
          utmMedium: params.get("utm_medium") ?? undefined,
          utmCampaign: params.get("utm_campaign") ?? undefined,
          referrer: document.referrer || undefined,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        alreadyJoined?: boolean;
        error?: string;
        message?: string;
      };

      if (!res.ok) {
        const message =
          data.error === "invalid_email"
            ? "That email doesn't look right."
            : data.error === "rate_limited"
              ? "Too many tries. Wait a moment and try again."
              : data.message || "Something went wrong. Try again in a moment.";
        flashError(message, "error");
        return;
      }

      const alreadyJoined = Boolean(data.alreadyJoined);
      setStatus({ type: "success", alreadyJoined });
      track("waitlist_success", { already_joined: alreadyJoined });
      onSuccess?.({ email: trimmed, alreadyJoined });
    } catch {
      flashError("Couldn't reach AppFox. Try again.", "error");
    }
  }

  const errorMessage =
    status.type === "invalid" || status.type === "error" ? status.message : "";
  const showError = Boolean(errorMessage) && status.type !== "loading";
  const isBusy = status.type === "loading";

  if (status.type === "success" && !onSuccess) {
    return (
      <div className={cn("w-full", className)}>
        <WaitlistSuccess email={email} alreadyJoined={status.alreadyJoined} />
      </div>
    );
  }

  if (status.type === "success" && onSuccess) {
    return null;
  }

  return (
    <div className={cn("w-full", className)}>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
        <label htmlFor={inputId} className="text-sm text-foreground">
          Work email
        </label>

        <div
          className={cn(
            "flex flex-col gap-3 sm:flex-row sm:items-center",
            shake && "waitlist-shake",
          )}
        >
          <input
            id={inputId}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@company.com"
            value={email}
            disabled={isBusy}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status.type === "invalid" || status.type === "error") {
                setStatus({ type: "idle" });
              }
            }}
            aria-invalid={showError}
            aria-describedby={showError ? errorId : undefined}
            className={cn(
              "h-12 w-full rounded-full border bg-surface px-5 text-base text-foreground outline-none transition placeholder:text-foreground-muted/80 focus-visible:ring-2 focus-visible:ring-accent/40 sm:flex-1",
              showError
                ? "border-danger focus:border-danger"
                : "border-border focus:border-accent",
              isBusy && "opacity-70",
            )}
          />
          <button
            type="submit"
            disabled={isBusy}
            className="h-12 shrink-0 rounded-full bg-accent px-7 text-sm font-medium text-white transition-transform hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isBusy ? "Joining" : "Join waitlist"}
          </button>
        </div>

        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label>
            Website
            <input
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
            />
          </label>
        </div>

        <div className="min-h-5" aria-live="polite">
          {showError ? (
            <p id={errorId} className="flex items-center gap-1.5 text-sm text-danger">
              <AlertCircle className="size-4 shrink-0" strokeWidth={1.75} />
              {errorMessage}
            </p>
          ) : (
            <p className="text-sm text-foreground-muted">No spam. Just early access.</p>
          )}
        </div>
      </form>
    </div>
  );
}
