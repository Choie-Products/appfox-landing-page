import Image from "next/image";
import {
  ChevronDown,
  ChevronRight,
  Download,
  Banknote,
  LayoutGrid,
  ListFilter,
  PanelLeft,
  Search,
  Settings,
  Settings2,
  Users,
} from "lucide-react";
import ScaleToFit from "@/components/mock/scale-to-fit";

export const DASHBOARD_WIDTH = 1400;
export const DASHBOARD_HEIGHT = 660;

const INK = "text-[#1a1a1a]";
const MUTED = "text-[#6b6b6b]";

const competitors = [
  { name: "sweetgreen", dev: "sweetgreen", rating: "4.88", revenue: "<$5K", downloads: "40K", icon: "sweetgreen" },
  { name: "Yuka - Food & Cosmetic…", dev: "Yuca", rating: "4.82", revenue: "$1M", downloads: "800K", icon: "yuka" },
  { name: "Strava: Run, Bike, Walk", dev: "Strava, Inc.", rating: "4.81", revenue: "$18M", downloads: "3M", icon: "strava" },
  { name: "MenuFit - Healthy Eati…", dev: "Kosco Digital LLC", rating: "4.77", revenue: "$800K", downloads: "300K", icon: "menufit" },
  { name: "Healthy Recipe Book : Fi…", dev: "Hitbytes Technologies", rating: "4.58", revenue: "<$5K", downloads: "<5K", icon: "fitme" },
];


/** 120 thin ticks from red through amber to green, with a marker near the red end. */
function SentimentBar() {
  const ticks = Array.from({ length: 120 }, (_, i) => {
    const t = i / 119;
    const hue = Math.round(t * 120);
    return `hsl(${hue} 85% ${t < 0.5 ? 52 : 45}%)`;
  });
  return (
    <div className="relative flex h-[30px] items-stretch justify-between" aria-hidden="true">
      {ticks.map((color, i) => (
        <span key={i} className="w-[2px] flex-none rounded-full" style={{ backgroundColor: color }} />
      ))}
      <span className="absolute left-[20%] top-[-3px] h-[36px] w-[6px] -translate-x-1/2 rounded-full bg-[#ff4d1f]" />
    </div>
  );
}

function AppIcon({ id, size, className = "" }: { id: string; size: number; className?: string }) {
  return (
    <Image
      src={`/icons/${id}.jpg`}
      width={size}
      height={size}
      alt=""
      className={`flex-none rounded-[22%] ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl bg-[#fbfbfb] ${className}`}>{children}</div>;
}

/** A static recreation of the Appfox app overview, built in code so it stays crisp at any size. */
export default function Dashboard({ className }: { className?: string }) {
  return (
    <ScaleToFit width={DASHBOARD_WIDTH} height={DASHBOARD_HEIGHT} className={className}>
      <div
        className={`flex h-full w-full overflow-hidden bg-[#f6f6f6] font-sans antialiased ${INK}`}
        style={{ fontFeatureSettings: '"tnum"' }}
        aria-hidden="true"
      >
        {/* Sidebar */}
        <aside className="flex w-[228px] flex-none flex-col justify-between px-4 pb-5 pt-4">
          <div>
            <div className="flex h-[38px] items-center gap-2.5 rounded-xl border border-[#e6e6e6] bg-white px-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <AppIcon id="leanbites" size={22} />
              <span className="flex-1 truncate text-[13px] font-semibold">LeanBites - Healthy …</span>
              <ChevronDown className="size-3.5 text-[#8a8a8a]" strokeWidth={2} />
            </div>
            <nav className="mt-6 flex flex-col gap-1 text-[14px] font-medium">
              <span className="flex h-[36px] items-center gap-3 rounded-xl bg-[#e9e9e9] px-3">
                <LayoutGrid className="size-[17px]" strokeWidth={1.8} />
                Dashboard
              </span>
              <span className="flex h-[36px] items-center gap-3 px-3">
                <Users className="size-[17px]" strokeWidth={1.8} />
                Customers
              </span>
              <span className="flex h-[36px] items-center gap-3 px-3">
                <Search className="size-[17px]" strokeWidth={1.8} />
                Market
              </span>
              <span className="flex h-[36px] items-center gap-3 px-3">
                <ListFilter className="size-[17px]" strokeWidth={1.8} />
                Keywords
              </span>
            </nav>
          </div>
          <span className="flex h-[36px] items-center gap-3 px-3 text-[14px] font-medium">
            <Settings className="size-[17px]" strokeWidth={1.8} />
            Settings
          </span>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col px-8 pt-4">
          <div className="flex items-center gap-4 pb-4">
            <span className="flex size-8 items-center justify-center rounded-lg bg-[#fbfbfb]">
              <PanelLeft className="size-4" strokeWidth={1.8} />
            </span>
            <span className={`flex items-center gap-2 text-[14px] ${MUTED}`}>
              <span className={INK}>Dashboard</span>
              <ChevronRight className="size-3.5" strokeWidth={2} />
              LeanBites - Healthy Dining
            </span>
          </div>

          <div className="flex items-center justify-between pb-6 pt-7">
            <h3 className="text-[28px] font-semibold tracking-[-0.02em]">App overview</h3>
            <span className="flex h-[34px] items-center gap-2 rounded-full bg-[#fbfbfb] px-4 text-[14px] font-medium">
              <Search className="size-4" strokeWidth={2} />
              Explore market
            </span>
          </div>

          <div className="grid grid-cols-[1fr_380px] gap-7">
            {/* App overview card */}
            <Card className="px-7 pb-7 pt-7">
              <div className="flex items-start gap-5">
                <AppIcon id="leanbites" size={66} />
                <div>
                  <p className="flex gap-3 text-[13px]">
                    <span className="font-medium">App Store</span>
                    <span className={MUTED}>Health &amp; Fitness</span>
                  </p>
                  <p className="pt-1 text-[24px] font-semibold tracking-[-0.01em]">LeanBites - Healthy Dining</p>
                  <p className={`pt-1 text-[14px] ${MUTED}`}>Chorus Labs LLC (CA)</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-9">
                {[
                  { label: "Store rating", value: "4.64", suffix: "/5", note: "3,874 ratings · US" },
                  { label: "Rating vs. peers", value: "-0.17", note: "Median 4.81 · 5 comparable apps" },
                  { label: "Estimated revenue", value: "<$5K", note: "iOS · Worldwide" },
                ].map((m) => (
                  <div key={m.label}>
                    <p className={`text-[13px] ${MUTED}`}>{m.label}</p>
                    <p className="pt-1.5 text-[40px] font-medium leading-none tracking-[-0.02em]">
                      {m.value}
                      {"suffix" in m && m.suffix ? (
                        <span className={`text-[16px] font-normal ${MUTED}`}>{m.suffix}</span>
                      ) : null}
                    </p>
                    <p className={`pt-2.5 text-[12px] ${MUTED}`}>{m.note}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-9">
                <p className="text-[15px] font-semibold">Store comment sentiment</p>
                <p className={`text-[14px] ${MUTED}`}>Mostly negative</p>
              </div>
              <div className="pt-4">
                <SentimentBar />
              </div>

              <dl className="grid grid-cols-2 gap-x-8 pt-6 text-[13px]">
                <div className="flex justify-between border-b border-[#e6e6e5] pb-2.5">
                  <dt className={MUTED}>Price</dt>
                  <dd className="font-semibold">Free</dd>
                </div>
                <div className="flex justify-between border-b border-[#e6e6e5] pb-2.5">
                  <dt className={MUTED}>MRR</dt>
                  <dd className="font-semibold">—</dd>
                </div>
                <div className="flex justify-between pt-2.5">
                  <dt className={MUTED}>Version</dt>
                  <dd className="font-semibold">1.3.2</dd>
                </div>
                <div className="flex justify-between pt-2.5">
                  <dt className={MUTED}>Latest release</dt>
                  <dd className="font-semibold">Sep 17, 2026</dd>
                </div>
              </dl>
            </Card>

            {/* How you compare */}
            <Card className="px-6 pb-4 pt-6">
              <div className="flex items-center justify-between">
                <p className="text-[16px] font-semibold">How you compare</p>
                <Settings2 className={`size-4 ${MUTED}`} strokeWidth={1.8} />
              </div>
              <ul className="pt-5">
                {competitors.map((c) => (
                  <li key={c.name} className="flex items-center gap-3 py-[13px]">
                    <AppIcon id={c.icon} size={38} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-semibold">{c.name}</p>
                      <p className={`truncate pt-0.5 text-[13px] ${MUTED}`}>{c.dev}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[14px] font-semibold">{c.rating}</p>
                      <p className={`flex items-center justify-end gap-3 pt-0.5 text-[13px] ${MUTED}`}>
                        <span className="flex items-center gap-1">
                          <Banknote className="size-3.5" strokeWidth={1.8} />
                          {c.revenue}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="size-3.5" strokeWidth={1.8} />
                          {c.downloads}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

          </div>
        </div>
      </div>
    </ScaleToFit>
  );
}
