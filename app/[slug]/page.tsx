import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import WaitlistForm from "@/components/waitlist-form";

const pages: Record<string, { title: string; description: string }> = {
  pricing: {
    title: "Pricing",
    description:
      "Pricing will stay simple and built for indie teams. Join the waitlist and we will share details as we get closer.",
  },
  download: {
    title: "Download",
    description:
      "AppFox starts on the web. Join the waitlist and we will tell you when there is something to open.",
  },
  "partner-portal": {
    title: "Partner Portal",
    description: "A partner surface is not available yet. Join the waitlist for product updates.",
  },
  "submit-app": {
    title: "Add your app",
    description:
      "You'll add an App Store or Google Play app after early access opens. Join the waitlist to be first in line.",
  },
  "api-docs": {
    title: "API",
    description: "Public API docs are not ready yet. Join the waitlist for product updates.",
  },
  guidelines: {
    title: "Guidelines",
    description: "Product guidelines will land with early access. Join the waitlist to stay close.",
  },
  about: {
    title: "About",
    description:
      "AppFox is an intelligence layer for mobile apps. It watches your product, customers, and market, then tells you what deserves attention.",
  },
  blog: {
    title: "Blog",
    description: "Writing will come later. Join the waitlist and we will keep the product updates here.",
  },
  careers: {
    title: "Careers",
    description: "We are not hiring yet. Join the waitlist if you want to hear when that changes.",
  },
  contact: {
    title: "Contact",
    description: "The fastest way to reach us right now is to join the waitlist.",
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const page = pages[slug];
    if (!page) return {};
    return { title: `${page.title} - AppFox` };
  });
}

export default async function ComingSoonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug];

  if (!page) notFound();

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <SiteHeader />
      <section className="flex flex-1 items-center px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-xl">
          <h1 className="font-heading text-4xl font-normal tracking-tight text-foreground sm:text-5xl">
            {page.title}
          </h1>
          <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-foreground-muted sm:text-lg">
            {page.description}
          </p>
          <div className="mt-10">
            <WaitlistForm />
          </div>
          <div className="mt-10">
            <Link href="/" className="text-sm text-foreground-muted transition-colors hover:text-foreground">
              Back to home
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
