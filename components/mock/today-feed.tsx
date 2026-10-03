import { Chip } from "@/components/mock/chip";
import Sparkline from "@/components/mock/sparkline";
import Window from "@/components/mock/window";
import { cn } from "@/lib/utils";

const trials = [12, 14, 13, 15, 14, 16, 18, 22, 24, 23, 26, 27];
const paid = [40, 41, 39, 42, 41, 40, 35, 33, 34, 32, 31, 30];

export function TodayCard({ expanded = false, className }: { expanded?: boolean; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-line bg-surface", className)}>
      <div className="p-4">
        <div className="flex items-center gap-1.5">
          <Chip tone="danger">High</Chip>
          <Chip>Customers</Chip>
          <Chip>Monetization</Chip>
        </div>
        <p className="mt-3 font-heading text-[19px] leading-snug text-ink">Pricing complaints rose after v2.8</p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
          Pricing-related negative reviews are up 38% over 14 days. Trial-to-paid conversion fell 6.2 points in
          the matched cohort window.
        </p>
      </div>

      {expanded ? (
        <>
          <div className="grid grid-cols-2 gap-px border-y border-line bg-line">
            <div className="bg-surface p-3.5">
              <p className="text-[11px] text-muted">Trial starts, daily</p>
              <div className="mt-1 flex items-end justify-between">
                <span className="tabular text-[15px] text-ink">+41%</span>
                <Sparkline points={trials} marker={6} className="h-7 w-20 text-ink" />
              </div>
            </div>
            <div className="bg-surface p-3.5">
              <p className="text-[11px] text-muted">Trial to paid, matched cohorts</p>
              <div className="mt-1 flex items-end justify-between">
                <span className="tabular text-[15px] text-danger">-6.2 pts</span>
                <Sparkline points={paid} marker={6} className="h-7 w-20 text-danger" />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 text-[12px] text-muted">
            <span className="text-ink">Evidence</span> RevenueCat project metrics, 47 collected reviews, release
            v2.8 on Sep 14
          </div>
          <div className="border-t border-line px-4 py-3">
            <p className="text-[11px] text-muted">Suggested</p>
            <p className="mt-0.5 text-[13px] leading-snug text-ink">
              Review the annual-plan framing and paywall hierarchy introduced in v2.8.
            </p>
          </div>
          <div className="flex items-center gap-2 border-t border-line px-4 py-3">
            <span className="rounded-full bg-ink px-3 py-1.5 text-[12px] font-medium text-white">View evidence</span>
            <span className="rounded-full border border-line-strong px-3 py-1.5 text-[12px] font-medium text-ink">
              Create task
            </span>
            <span className="ml-auto text-[12px] text-muted">Dismiss</span>
          </div>
        </>
      ) : null}
    </div>
  );
}

function SmallCard({
  level,
  tags,
  title,
  body,
  tone = "warn",
}: {
  level: string;
  tags: string[];
  title: string;
  body: string;
  tone?: "warn" | "neutral" | "good";
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <div className="flex items-center gap-1.5">
        <Chip tone={tone}>{level}</Chip>
        {tags.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
      <p className="mt-2.5 font-heading text-[17px] leading-snug text-ink">{title}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-muted">{body}</p>
    </div>
  );
}

export default function TodayFeed({ className }: { className?: string }) {
  return (
    <Window title="Today" meta="Updated 11 minutes ago" className={className} bodyClassName="space-y-3 bg-paper p-3">
      <TodayCard expanded className="rise rise-3" />
      <div className="rise rise-4">
        <SmallCard
          level="Medium"
          tags={["Market"]}
          title="Snapfit raised its annual price to $39.99"
          body="Observed on the App Store listing in the US. Previous annual price $29.99 held since July."
        />
      </div>
      <div className="rise rise-5">
        <SmallCard
          level="Quiet"
          tone="good"
          tags={["Coverage"]}
          title="No significant change in 3 tracked search queries"
          body="Ranks within one position of last week. History: 6 weeks, US, English."
        />
      </div>
    </Window>
  );
}
