import PageIntro from "@/components/ui/page-intro";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageIntro
      kicker="404"
      title="That page is not here."
      lead="The link may be old, or the page may not exist yet. The product overview is a good place to start."
    >
      <div className="flex flex-wrap gap-4">
        <ButtonLink href="/" variant="dark" size="lg">
          Home
        </ButtonLink>
        <ButtonLink href="/product" variant="secondary" size="lg">
          Product overview
        </ButtonLink>
      </div>
    </PageIntro>
  );
}
