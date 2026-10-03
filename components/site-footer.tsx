import Link from "next/link";
import { HalftoneSvg } from "@/components/home/halftone";
import Logo from "@/components/logo";
import Container from "@/components/ui/container";
import { CONTACT_EMAIL, footerColumns } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer>
      <Container className="pt-16 lg:pt-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,1fr))] lg:grid-cols-[440px_repeat(4,minmax(0,1fr))] lg:gap-0">
          <div className="md:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-flex items-center text-ink" aria-label="Appfox home">
              <Logo className="h-[26px] w-auto" />
            </Link>
            <p className="mt-4 max-w-[340px] text-[16px] leading-[26px] text-muted">
              The AI app tracker for indie founders and mobile studios. Reviews, rankings, releases, revenue, and
              competitors, read for you. Evidence on every finding, and quiet days reported as quiet days.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-block font-mono text-[11px] leading-[14px] text-ink hover:text-accent"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          {footerColumns.map((column) => (
            <div key={column.heading} className="flex flex-col gap-2.5">
              <p className="label-mono pb-1.5">{column.heading}</p>
              {column.links.map((link) => (
                <Link
                  key={`${column.heading}-${link.label}`}
                  href={link.href}
                  className="text-[14px] font-medium leading-[18px] text-ink transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </Container>
      {/* The same slow halftone fox wave as the hero, as a band along the bottom edge */}
      <div className="relative mt-12 h-[220px] overflow-hidden lg:h-[280px]" aria-hidden="true">
        <HalftoneSvg className="absolute inset-0 h-full w-full opacity-[0.08]" />
      </div>
      <p className="sr-only">
        Copyright {new Date().getFullYear()} Appfox. Independent of Apple, Google, and RevenueCat.
      </p>
    </footer>
  );
}
