import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "dark" | "ghost" | "inverse" | "flat";
type Size = "sm" | "md" | "lg" | "hero";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold disabled:pointer-events-none disabled:opacity-60";

/** Filled buttons are 3D keys (see `.k3d` in globals.css): orange, light gray, or black. `flat` is the plain orange pill used in the header. */
const variants: Record<Variant, string> = {
  primary: "k3d k3d-accent text-white",
  secondary: "k3d k3d-light text-ink",
  dark: "k3d k3d-dark text-white",
  ghost: "text-ink transition-colors hover:bg-ink/[0.05]",
  inverse: "k3d k3d-light text-ink",
  flat: "bg-accent text-white transition-colors hover:bg-[#e94800]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] font-semibold",
  md: "h-10 px-[18px] text-[14px]",
  lg: "h-12 px-6 text-[15px]",
  /** The homepage hero buttons: 12px by 20px padding. */
  hero: "px-5 py-3 text-[14px] leading-5",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
}) {
  const classes = buttonClasses(variant, size, className);
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </button>
  );
}
