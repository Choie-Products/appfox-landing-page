import CtaBand from "@/components/cta-band";
import { PageJsonLd } from "@/components/json-ld";
import Replay from "@/components/mock/replay";
import { MonoLabel, SoftCard, Section, Showcase, StepCards } from "@/components/ui/blocks";
import PageIntro from "@/components/ui/page-intro";
import SectionHeading from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/seo";

const PAGE = {
  path: "/replay",
  title: "Mobile Session Replay for React Native & Expo",
  description:
    "Privacy-first mobile session replay for iOS and Android. A small React Native and Expo SDK records masked snapshots and events, never keyboard values, and replays completed sessions inside Appfox. On every plan.",
};

export const metadata = pageMetadata(PAGE);

const controls = [
  { t: "Consent and a visible indicator", b: "Recording starts only after explicit consent, and the device shows that a session is being recorded." },
  { t: "Masking before anything leaves the device", b: "Text inputs, sensitive views, and anything you mark are masked on the device, before persistence and before upload." },
  { t: "Bounded storage and uploads", b: "Sessions are spooled locally within fixed limits and uploaded only when complete. No live streaming." },
  { t: "Sampling and a kill switch", b: "Remote policy controls the sample rate and can stop recording across every device immediately." },
  { t: "Retention and deletion", b: "Every session has a retention window. Deletion removes the storage object, not just the row." },
  { t: "Owner and admin only, at first", b: "Viewing and managing replays is restricted to workspace owners and admins during the initial release." },
];

const excluded = [
  "Browser recording",
  "System-wide screen capture",
  "Background capture",
  "Live streaming",
  "Remote control",
  "Audio",
  "Keyboard values",
  "Request and response bodies",
  "Automatic logs",
  "Heatmaps and funnels",
  "AI interpretation of replays",
  "Crash-triggered prebuffering",
];

export default function ReplayPage() {
  return (
    <>
      <PageJsonLd path={PAGE.path} name={PAGE.title} description={PAGE.description} />
      <PageIntro
        kicker="Mobile session replay"
        title="See what customers actually did, without seeing what they typed."
        lead="A small session replay SDK for React Native and Expo apps on iOS and Android. It captures masked native snapshots and a short event timeline, uploads completed sessions, and plays them back in Appfox."
      />

      <Section className="pt-4 lg:pt-8">
        <Showcase className="mx-auto max-w-3xl">
          <Replay />
        </Showcase>
      </Section>

      <Section>
        <SectionHeading
          title="Snapshots and events,"
          sub="not video."
          lead="Replay uses masked native snapshots plus a small event timeline, reconstructed by the Appfox browser player. There is no continuous screen video and no server-side transcoding, which keeps payloads small and masking verifiable."
        />
        <StepCards steps={controls} className="mt-10" />
      </Section>

      <Section>
        <div className="grid gap-5 lg:grid-cols-2">
          <SoftCard>
            <MonoLabel>Platforms</MonoLabel>
            <ol className="pt-3">
              {[
                ["React Native with Expo, iOS and Android", "Development and production builds, delivered first."],
                [
                  "Private beta",
                  "Documented compatibility, retention, deletion, consent, privacy controls, and operational limits.",
                ],
                [
                  "Native UIKit, SwiftUI, Views, and Compose",
                  "Through the same iOS and Android engines, validated separately. Sharing an engine does not assume framework compatibility.",
                ],
              ].map(([t, b], i) => (
                <li key={t} className="flex gap-5 border-b border-line py-4 last:border-b-0">
                  <span className="font-mono text-[14px] leading-5 text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-[16px] font-medium leading-[24px] text-ink">{t}</p>
                    <p className="pt-1 text-[16px] leading-[26px] text-muted">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </SoftCard>
          <SoftCard delay={100}>
            <MonoLabel>Deliberately not included</MonoLabel>
            <ul className="flex flex-wrap gap-2 pt-5">
              {excluded.map((e) => (
                <li
                  key={e}
                  className="soft-panel rounded-full px-3.5 py-1.5 text-[14px] leading-5 text-quiet line-through decoration-[#c8c8c4]"
                >
                  {e}
                </li>
              ))}
            </ul>
            <p className="pt-6 text-[16px] leading-[26px] text-muted">
              Replay exists to show you a completed session from your own app. Anything that would turn it into
              surveillance stays out.
            </p>
          </SoftCard>
        </div>
      </Section>

      <CtaBand
        title="See what your customers actually did."
        lead="Session replay is on every plan, starting with 1,000 sessions and 7-day retention on Free."
      />
    </>
  );
}
