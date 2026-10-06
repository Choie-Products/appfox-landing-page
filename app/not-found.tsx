import { MissingArt } from "@/components/illustrations/iso-art";
import { ButtonLink } from "@/components/ui/button";
import PageIntro from "@/components/ui/page-intro";

export default function NotFound() {
  return (
    <PageIntro
      kicker="404"
      title="That page is not here."
      lead="The link may be old, or the page may not exist yet. The product overview is a good place to start."
    >
      <div className="flex flex-wrap justify-center gap-4">
        <ButtonLink href="/" variant="dark" size="hero">
          Home
        </ButtonLink>
        <ButtonLink href="/product" variant="secondary" size="hero">
          Product overview
        </ButtonLink>
      </div>
      <MissingArt className="mt-6 h-auto w-full max-w-[420px] lg:mt-10" />
    </PageIntro>
  );
}
