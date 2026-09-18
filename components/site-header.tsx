import Link from "next/link";
import Logo from "@/components/logo";

export default function SiteHeader() {
  return (
    <header className="relative z-10 flex h-16 shrink-0 items-center bg-gradient-to-b from-background via-background/80 to-transparent px-5 sm:h-[72px] sm:px-8 lg:px-12">
      <Link href="/" className="flex items-center text-foreground" aria-label="AppFox home">
        <Logo className="h-6 sm:h-7" />
      </Link>
    </header>
  );
}
