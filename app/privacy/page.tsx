import Link from "next/link";
import type { Metadata } from "next";
import LegalShell from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="September 18, 2026">
      <section>
        <h2>1. Introduction</h2>
        <p>
          AppFox (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, and safeguard your information when you
          visit our website at appfox.app.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p className="mb-3">We may collect the following types of information:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Email address:</strong> when you join our waitlist or contact us.
          </li>
          <li>
            <strong>Optional profile details:</strong> such as the role you choose after joining the waitlist.
          </li>
          <li>
            <strong>Usage data:</strong> such as pages visited and interactions with the waitlist form.
          </li>
          <li>
            <strong>Device information:</strong> including device type, operating system, and browser type.
          </li>
          <li>
            <strong>Analytics data:</strong> anonymized data collected through third-party analytics services to help us improve the product.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p className="mb-3">We use the information we collect to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Operate the waitlist and send early-access invitations.</li>
          <li>Send product updates related to AppFox.</li>
          <li>Respond to your requests.</li>
          <li>Understand how the site is used so we can improve it.</li>
          <li>Comply with legal obligations.</li>
        </ul>
      </section>

      <section>
        <h2>4. Data Sharing</h2>
        <p>
          We do not sell your personal information. We may share data with trusted third-party
          service providers who help us operate the site (for example, email delivery and analytics),
          but only to the extent necessary for them to perform their services. We may also disclose
          information if required by law or to protect our rights.
        </p>
      </section>

      <section>
        <h2>5. Data Security</h2>
        <p>
          We implement reasonable technical and organizational measures to protect your personal
          information against unauthorized access, loss, or misuse. No method of transmission over
          the internet is completely secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section>
        <h2>6. Your Rights</h2>
        <p className="mb-3">Depending on your location, you may have the right to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Access the personal data we hold about you.</li>
          <li>Request correction or deletion of your data.</li>
          <li>Opt out of marketing communications at any time.</li>
          <li>Request data portability.</li>
        </ul>
        <p className="mt-3">To exercise any of these rights, please contact us at the email below.</p>
      </section>

      <section>
        <h2>7. Third-Party Links</h2>
        <p>
          Our site may contain links to third-party websites. We are not responsible for the privacy
          practices of these external sites. Review their privacy policies before providing any
          personal information.
        </p>
      </section>

      <section>
        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of significant
          changes by posting the updated policy on this page and updating the &quot;Last updated&quot;
          date above.
        </p>
      </section>

      <section>
        <h2>9. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at{" "}
          <a
            href="mailto:privacy@appfox.app"
            className="text-foreground underline underline-offset-2 transition hover:text-accent"
          >
            privacy@appfox.app
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
