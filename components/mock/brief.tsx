import { Chip } from "@/components/mock/chip";
import Window from "@/components/mock/window";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-t border-line py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
      <p className="text-[12px] text-muted">{label}</p>
      <div className="text-[13px] leading-relaxed text-ink">{children}</div>
    </div>
  );
}

export default function Brief({ className }: { className?: string }) {
  return (
    <Window title="Research brief" meta="Saved Sep 29" className={className}>
      <div className="pb-3">
        <p className="font-heading text-[20px] leading-snug text-ink">AI virtual try-on for online clothing</p>
        <p className="mt-1 text-[12px] text-muted">
          App Store, United States, English. 9 confirmed competitors (6 direct, 3 adjacent). 1,840 collected
          reviews.
        </p>
      </div>
      <Row label="Positioning">
        Six apps lead with photo-realism; two lead with speed. None of the nine mention body-type consistency
        on their listings.
      </Row>
      <Row label="Observed monetization">
        Weekly subscriptions in 7 of 9 listings, $4.99 to $9.99. Two offer a 3-day trial. Lifetime pricing not
        observed.
      </Row>
      <Row label="Recurring complaints">
        <div className="flex flex-wrap gap-1.5">
          <Chip tone="danger">Body consistency, 212</Chip>
          <Chip tone="danger">Generation speed, 148</Chip>
          <Chip tone="warn">Trial cancels, 97</Chip>
          <Chip>HEIC uploads, 41</Chip>
        </div>
      </Row>
      <Row label="Evidence against">
        Review activity for the top three is flat since May. Monetization is already crowded at the same price
        point. Store feature placement is held by two incumbents.
      </Row>
      <Row label="Not established">
        Market size and willingness to pay. Reviews cannot show either. Historical movement is unavailable until
        the first comparable snapshot.
      </Row>
      <Row label="Next validation">
        Interview 8 recent reviewers who mention body consistency. Decision recorded: pursue with a 30-day
        monitoring window.
      </Row>
    </Window>
  );
}
