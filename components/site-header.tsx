"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/logo";
import { ButtonLink } from "@/components/ui/button";
import { APP_URL, CTA_HREF, primaryNav, productLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 40;
const WIDE_MAX = 1280;
const PILL_GAP = 20;
const PILL_PAD = 16 + 6;

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [width, setWidth] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The bar's width is set in pixels in both states so it can be transitioned:
  // the wide bar contracts from both sides into a pill exactly as wide as its contents.
  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const bar = barRef.current;
    if (!wrap || !bar) return;
    if (!scrolled) {
      setWidth(Math.min(window.innerWidth, WIDE_MAX));
      return;
    }
    const widths = Array.from(bar.children)
      .map((child) => child.getBoundingClientRect().width)
      .filter((w) => w > 0);
    setWidth(widths.reduce((sum, w) => sum + w, 0) + PILL_GAP * (widths.length - 1) + PILL_PAD);
  }, [scrolled]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // The header keeps a fixed height in the flow; only the bar inside it changes shape,
  // so the page never shifts when it compacts.
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[72px] lg:h-[88px]">
      <div
        ref={wrapRef}
        className={cn(
          "absolute inset-x-0 top-0 flex justify-center transition-[padding] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          scrolled ? "px-4 pt-3" : "pt-0",
        )}
      >
        <div
          ref={barRef}
          style={width ? { width } : undefined}
          className={cn(
            "flex max-w-full items-center justify-between backdrop-blur-md transition-[width,height,padding,border-radius,background-color,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
            scrolled
              ? "h-12 gap-5 rounded-[24px] border border-white/60 bg-white/90 pl-4 pr-1.5 shadow-[0_12px_40px_-16px_rgba(17,17,17,0.28)]"
              : "h-[72px] w-full max-w-site rounded-none border border-transparent bg-transparent px-5 sm:px-8 lg:h-[88px] lg:px-10",
          )}
        >
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center text-ink" aria-label="Appfox home">
              <Logo className={cn("w-auto", scrolled ? "h-[22px]" : "h-[26px]")} />
            </Link>
            <nav className="hidden items-center gap-4 pl-4 md:flex" aria-label="Primary">
              {primaryNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-[13px] font-semibold leading-4 transition-colors hover:text-accent",
                    pathname === link.href ? "text-black" : "text-ink",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {APP_URL && !scrolled ? (
              <ButtonLink href={APP_URL} variant="ghost" size="sm" external>
                Sign in
              </ButtonLink>
            ) : null}
            <ButtonLink
              href={CTA_HREF}
              external={Boolean(APP_URL)}
              size={scrolled ? "sm" : "md"}
            >
              Start for free
            </ButtonLink>
          </div>

          <button
            type="button"
            className={cn("flex size-10 items-center justify-center text-ink md:hidden", !scrolled && "-mr-2")}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto border-t border-line bg-paper px-5 pb-10 pt-4 md:hidden">
          <p className="label-mono px-1 pb-2">Product</p>
          <div className="flex flex-col">
            {productLinks.map((link) => (
              <Link key={link.href} href={link.href} className="px-1 py-3 text-lg text-ink">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-col border-t border-line pt-4">
            {primaryNav
              .filter((link) => link.href !== "/product")
              .map((link) => (
                <Link key={link.href} href={link.href} className="px-1 py-3 text-lg text-ink">
                  {link.label}
                </Link>
              ))}
            <Link href="/contact" className="px-1 py-3 text-lg text-ink">
              Contact
            </Link>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <ButtonLink href={CTA_HREF} size="lg" external={Boolean(APP_URL)}>
              Start for free
            </ButtonLink>
            {APP_URL ? (
              <ButtonLink href={APP_URL} variant="secondary" size="lg" external>
                Sign in
              </ButtonLink>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
