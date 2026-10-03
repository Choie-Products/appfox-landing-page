import { Chip } from "@/components/mock/chip";
import Window from "@/components/mock/window";

const events = [
  { t: "0:00", e: "Session start, consent recorded" },
  { t: "0:04", e: "Tap Upload photo" },
  { t: "0:11", e: "Screen Generate result" },
  { t: "0:19", e: "Tap Try annual" },
  { t: "0:23", e: "Paywall dismissed" },
];

export default function Replay({ className }: { className?: string }) {
  return (
    <Window title="Replays" meta="Owner and admin only" className={className}>
      <div className="grid gap-4 sm:grid-cols-[11rem_1fr]">
        <div className="soft-surface mx-auto w-[11rem] rounded-[1.8rem] p-2">
          <div className="soft-panel rounded-[1.4rem] p-2.5">
          <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-[#dcdcd9]" />
          <div className="space-y-2">
            <div className="h-3 w-20 rounded bg-[#cfcfcc]" />
            <div className="h-24 rounded-lg bg-line" />
            <div className="h-2.5 w-full rounded bg-line-strong" />
            <div className="h-2.5 w-3/4 rounded bg-line-strong" />
            <div className="rounded-md border border-dashed border-accent bg-accent-soft p-1.5 text-center text-[9px] text-accent-ink">
              Masked input
            </div>
            <div className="rounded-md border border-dashed border-accent bg-accent-soft p-1.5 text-center text-[9px] text-accent-ink">
              Masked text
            </div>
            <div className="h-7 rounded-full bg-ink" />
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-accent" />
            <span className="text-[9px] text-muted">Recording</span>
          </div>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-1.5">
            <Chip tone="accent">Masked before upload</Chip>
            <Chip>iOS, Expo</Chip>
            <Chip>0:41</Chip>
          </div>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {events.map((ev) => (
              <li key={ev.t} className="flex gap-3 py-2 text-[12.5px]">
                <span className="tabular w-8 shrink-0 text-muted">{ev.t}</span>
                <span className="text-ink">{ev.e}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11.5px] leading-relaxed text-muted">
            No keyboard values, no network bodies, no audio. Retention 30 days, then deleted with the storage object.
          </p>
        </div>
      </div>
    </Window>
  );
}
