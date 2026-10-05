"use client";

import { FormEvent, useId, useState } from "react";
import { AlertCircle } from "lucide-react";
import { isValidEmail, normalizeEmail } from "@/lib/email";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";
import WaitlistSuccess from "@/components/waitlist-success";
import { captureAttribution } from "@/lib/attribution";

type FormStatus =
  | { type: "idle" }
  | { type: "invalid"; message: string }
  | { type: "loading" }
  | { type: "success"; alreadyJoined: boolean; confirmation?: "sent" | "failed" | "not_requested" }
  | { type: "error"; message: string };

export default function WaitlistForm({
  className,
  source = "page",
  tone = "light",
  compact = false,
}: {
  className?: string;
  source?: string;
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  const inputId = useId();
  const errorId = useId();
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });
  const [shake, setShake] = useState(false);

  function flashError(message: string, type: "invalid" | "error" = "invalid") {
    setStatus({ type, message });
    setShake(true);
    window.setTimeout(() => setShake(false), 420);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) return flashError("Enter your email address.");
    if (!isValidEmail(normalizeEmail(trimmed))) return flashError("That email doesn't look right.");

    setStatus({ type: "loading" });
    track("waitlist_submit", { source });

    const attribution = captureAttribution();

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          website: honeypot,
          ...attribution,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        saved?: boolean;
        alreadyJoined?: boolean;
        confirmation?: "sent" | "failed" | "not_requested";
        error?: string;
        message?: string;
      };

      if (!res.ok || !data.ok || (data.saved !== true && !honeypot)) {
        const message =
          data.error === "invalid_email"
            ? "That email doesn't look right."
            : data.error === "rate_limited"
              ? "Too many tries. Wait a moment and try again."
              : data.message || "Something went wrong. Try again in a moment.";
        flashError(message, "error");
        track("waitlist_error", { source, error_type: data.error === "rate_limited" ? "rate_limited" : "request_failed" });
        return;
      }

      const alreadyJoined = Boolean(data.alreadyJoined);
      setStatus({ type: "success", alreadyJoined, confirmation: data.confirmation });
      if (data.saved) track(alreadyJoined ? "waitlist_existing" : "waitlist_success", { source });
    } catch {
      flashError("Couldn't reach Appfox. Try again.", "error");
      track("waitlist_error", { source, error_type: "network_error" });
    }
  }

  if (status.type === "success") {
    return (
      <div className={cn("w-full", className)}>
        <WaitlistSuccess email={email} alreadyJoined={status.alreadyJoined} confirmation={status.confirmation} tone={tone} />
      </div>
    );
  }

  const errorMessage = status.type === "invalid" || status.type === "error" ? status.message : "";
  const showError = Boolean(errorMessage);
  const isBusy = status.type === "loading";
  const dark = tone === "dark";

  return (
    <div className={cn("w-full", className)}>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <div className={cn("flex flex-col gap-2 sm:flex-row", shake && "shake")}>
          <input
            id={inputId}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            value={email}
            disabled={isBusy}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status.type === "invalid" || status.type === "error") setStatus({ type: "idle" });
            }}
            aria-invalid={showError}
            aria-describedby={showError ? errorId : undefined}
            className={cn(
              "h-10 w-full rounded-full border px-4 text-[16px] outline-none transition sm:flex-1",
              dark
                ? "border-dark-line bg-dark-surface text-white placeholder:text-dark-muted focus:border-white"
                : "border-line-strong bg-white text-ink placeholder:text-quiet focus:border-ink",
              showError && "border-danger focus:border-danger",
              isBusy && "opacity-70",
            )}
          />
          <button
            type="submit"
            disabled={isBusy}
            className={cn(
              "h-10 shrink-0 rounded-full px-[18px] text-[14px] font-bold disabled:cursor-not-allowed disabled:opacity-60",
              "k3d k3d-accent text-white",
            )}
          >
            {isBusy ? "Sending" : compact ? "Request access" : "Request access"}
          </button>
        </div>

        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label>
            Website
            <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </label>
        </div>

        <div className="min-h-5 px-1" aria-live="polite">
          {showError ? (
            <p id={errorId} className="flex items-center gap-1.5 text-sm text-danger">
              <AlertCircle className="size-4 shrink-0" strokeWidth={1.75} />
              {errorMessage}
            </p>
          ) : (
            <p className={cn("text-[12px] leading-[18px]", dark ? "text-dark-muted" : "text-quiet")}>
              Private beta. We will email you when an invitation is available.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
