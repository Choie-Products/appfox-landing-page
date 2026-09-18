import Link from "next/link";
import type { Metadata } from "next";
import LegalShell from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" updated="September 18, 2026">
      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the AppFox website (the &quot;Service&quot;), you agree to be bound
          by these Terms of Service. If you do not agree to these terms, please do not use the Service.
        </p>
      </section>

      <section>
        <h2>2. Description of Service</h2>
        <p>
          AppFox is an intelligence product for mobile apps. The public website currently offers a
          waitlist for early access. AppFox is intended to watch an app, its customers, and its
          market, then surface what deserves attention and what to do next. Features, availability,
          and integrations may change as the product develops.
        </p>
      </section>

      <section>
        <h2>3. Waitlist</h2>
        <p>
          Joining the waitlist does not guarantee access, pricing, or any specific feature. We may
          use your email to send product updates and early-access invitations. You can ask to be
          removed at any time by contacting us.
        </p>
      </section>

      <section>
        <h2>4. Acceptable Use</h2>
        <p className="mb-3">You agree not to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Use the Service for any unlawful purpose.</li>
          <li>Scrape, crawl, or otherwise automatically collect data from the Service without our written consent.</li>
          <li>Interfere with or disrupt the Service or its infrastructure.</li>
          <li>Attempt to gain unauthorized access to any part of the Service.</li>
          <li>Impersonate any person or entity, or misrepresent your affiliation.</li>
        </ul>
      </section>

      <section>
        <h2>5. Intellectual Property</h2>
        <p>
          All content on the Service, including text, graphics, logos, and software, is the
          property of AppFox or its content suppliers and is protected by applicable intellectual
          property laws. You may not reproduce, distribute, or create derivative works from any
          content without our prior written permission.
        </p>
      </section>

      <section>
        <h2>6. Limitation of Liability</h2>
        <p>
          AppFox is provided &quot;as is&quot; without warranties of any kind. To the fullest
          extent permitted by law, we shall not be liable for any indirect, incidental, special,
          or consequential damages arising from your use of the Service, including loss of data,
          revenue, or profits.
        </p>
      </section>

      <section>
        <h2>7. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to the Service at any time,
          with or without cause, and with or without notice. Upon termination, your right to use
          the Service ceases immediately.
        </p>
      </section>

      <section>
        <h2>8. Changes to These Terms</h2>
        <p>
          We may revise these Terms of Service at any time. Changes will be posted on this page
          with an updated effective date. Your continued use of the Service after changes are
          posted constitutes your acceptance of the revised terms.
        </p>
      </section>

      <section>
        <h2>9. Contact Us</h2>
        <p>
          If you have questions about these Terms, please contact us at{" "}
          <a
            href="mailto:legal@appfox.app"
            className="text-foreground underline underline-offset-2 transition hover:text-accent"
          >
            legal@appfox.app
          </a>
          .
        </p>
      </section>

      <div className="mt-16 border-t border-border pt-8">
        <Link href="/" className="text-sm text-foreground-muted transition hover:text-foreground">
          Back to home
        </Link>
      </div>
    </LegalShell>
  );
}
