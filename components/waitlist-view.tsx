"use client";

import { useState } from "react";
import { Compass, MessageCircle } from "lucide-react";
import FoxMark from "@/components/fox-mark";
import WaitlistForm from "@/components/waitlist-form";
import WaitlistSuccess from "@/components/waitlist-success";

export default function WaitlistView() {
  const [result, setResult] = useState<{
    email: string;
    alreadyJoined: boolean;
  } | null>(null);

  if (result) {
    return (
      <section className="flex min-h-0 flex-1 flex-col justify-center">
        <WaitlistSuccess
          email={result.email}
          alreadyJoined={result.alreadyJoined}
          layout="page"
        />
      </section>
    );
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col justify-center pt-2 md:max-w-3xl">
      <h1 className="waitlist-enter font-heading text-[36px] font-normal leading-[1.12] tracking-tight sm:text-5xl lg:text-[64px] lg:leading-[1.08]">
        <span className="block text-white">Know what your app</span>
        <span className="mt-[0.08em] flex flex-wrap items-center gap-x-[0.16em] whitespace-nowrap">
          <HeadlineMarks />
          <span className="text-accent">needs next.</span>
        </span>
      </h1>

      <p className="waitlist-enter waitlist-enter-delay-1 mt-5 max-w-[34rem] text-base leading-relaxed text-foreground-muted sm:text-lg">
        AppFox watches your app, customers, and market, then tells you what deserves attention.
      </p>

      <div className="waitlist-enter waitlist-enter-delay-2 mt-8 w-full max-w-xl">
        <WaitlistForm onSuccess={setResult} />
      </div>
    </section>
  );
}

function HeadlineMarks() {
  const tile =
    "relative inline-flex h-[0.84em] w-[0.84em] items-center justify-center rounded-[0.22em] bg-[#242424] ring-1 ring-white/10 shadow-[0_10px_24px_rgba(0,0,0,0.35)]";

  return (
    <span className="inline-flex items-center" aria-hidden="true">
      <span className={`${tile} z-30 -rotate-[8deg]`}>
        <FoxMark className="h-[0.52em] w-[0.52em] text-white" />
      </span>
      <span className={`${tile} z-20 -ml-[0.18em] rotate-[6deg]`}>
        <MessageCircle className="h-[0.4em] w-[0.4em] text-white" strokeWidth={2.1} />
      </span>
      <span className={`${tile} z-10 -ml-[0.18em] -rotate-[5deg]`}>
        <Compass className="h-[0.4em] w-[0.4em] text-white" strokeWidth={2.1} />
      </span>
    </span>
  );
}
