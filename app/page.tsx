import DashField from "@/components/dash-field";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import WaitlistView from "@/components/waitlist-view";

export default function Home() {
  return (
    <div className="relative isolate flex h-[100dvh] min-h-[100dvh] flex-col overflow-hidden overscroll-none bg-background">
      <DashField />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <SiteHeader />
        <main className="mx-auto flex min-h-0 w-full max-w-[1200px] flex-1 flex-col px-5 sm:px-8 lg:px-12">
          <WaitlistView />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
