import { Chip } from "@/components/mock/chip";
import Window from "@/components/mock/window";

export default function Task({ className }: { className?: string }) {
  return (
    <Window title="Actions" meta="Done Sep 26" className={className}>
      <div className="flex items-center gap-1.5">
        <Chip tone="good">Done</Chip>
        <Chip>From recommendation</Chip>
      </div>
      <p className="mt-3 font-heading text-[19px] leading-snug text-ink">Fix HEIC upload failures in onboarding</p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
        18 recent reviews mentioned upload failures after v3.2. Shipped in v3.3 on Sep 19.
      </p>

      <div className="mt-4 overflow-hidden rounded-lg border border-line">
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 bg-paper px-3.5 py-2 text-[11px] text-muted">
          <span>HEIC upload mentions</span>
          <span className="text-right">Before</span>
          <span className="text-right">After</span>
        </div>
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 px-3.5 py-2.5 text-[13px]">
          <span className="text-ink-soft">Collected reviews</span>
          <span className="tabular text-right text-ink">500</span>
          <span className="tabular text-right text-ink">100</span>
        </div>
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-t border-line px-3.5 py-2.5 text-[13px]">
          <span className="text-ink-soft">Mentions</span>
          <span className="tabular text-right text-ink">47 (9.4%)</span>
          <span className="tabular text-right text-ink">6 (6.0%)</span>
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-x-4 border-t border-line bg-paper px-3.5 py-2.5 text-[12px]">
          <span className="text-ink">Observed decrease of 3.4 points in mention share</span>
          <span className="text-right text-muted">Cause not established</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[12px]">
        <span className="text-muted">Your assessment</span>
        <div className="flex gap-1.5">
          <span className="rounded-full bg-ink px-2.5 py-1 text-white">Helped</span>
          <span className="rounded-full border border-line-strong px-2.5 py-1 text-ink">Unclear</span>
          <span className="rounded-full border border-line-strong px-2.5 py-1 text-ink">Did not help</span>
        </div>
      </div>
    </Window>
  );
}
