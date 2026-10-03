import { Chip } from "@/components/mock/chip";
import Window from "@/components/mock/window";

function Line({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr] gap-3 border-t border-line py-2.5 text-[12.5px]">
      <span className="text-muted">{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  );
}

export default function Integration({ className }: { className?: string }) {
  return (
    <Window title="Integrations" className={className}>
      <div className="flex items-start justify-between gap-4 pb-3">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-ink text-[13px] font-semibold text-white">
            RC
          </span>
          <div>
            <p className="text-[14px] text-ink">RevenueCat</p>
            <p className="text-[12px] text-muted">Project Fitly, app Fitly iOS</p>
          </div>
        </div>
        <Chip tone="good">Connected</Chip>
      </div>
      <Line label="Reads" value="Revenue, active subscriptions, trials, paid conversions. Project and app scope kept separate." />
      <Line label="Can write" value={<span className="text-ink">Nothing. Appfox never writes to RevenueCat.</span>} />
      <Line label="Credential" value="Stored in Supabase Vault. Server-side only." />
      <Line label="Last sync" value="Today 09:40, complete through yesterday" />
      <Line
        label="Usage"
        value={
          <span>
            18 of 20 metric reads this hour <span className="text-muted">under the provider limit</span>
          </span>
        }
      />
      <div className="mt-3 flex items-center gap-2 border-t border-line pt-3 text-[12px]">
        <span className="rounded-full border border-line-strong px-2.5 py-1 text-ink">Re-verify binding</span>
        <span className="ml-auto text-danger">Disconnect</span>
      </div>
    </Window>
  );
}
