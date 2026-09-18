import type { ReactNode } from "react";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export default function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <SiteHeader />
      <article className="flex-1 px-5 pb-16 pt-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-heading text-4xl font-normal tracking-tight text-foreground md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 mb-12 text-sm text-foreground-muted">Last updated: {updated}</p>
          <div className="space-y-10 leading-relaxed text-foreground-muted [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-medium [&_h2]:text-foreground [&_strong]:text-foreground">
            {children}
          </div>
        </div>
      </article>
      <SiteFooter />
    </div>
  );
}
