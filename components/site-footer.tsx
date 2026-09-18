import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 flex h-16 shrink-0 items-center px-5 sm:h-[72px] sm:px-8 lg:px-12">
      <nav className="flex items-center gap-5 text-sm font-semibold text-foreground-muted sm:gap-7">
        <Link href="/privacy" className="transition-colors hover:text-foreground">
          Privacy
        </Link>
        <Link href="/terms" className="transition-colors hover:text-foreground">
          Terms
        </Link>
      </nav>
    </footer>
  );
}
