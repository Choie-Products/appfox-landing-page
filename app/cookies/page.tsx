import Link from "next/link";
import type { Metadata } from "next";
import LegalShell from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Cookie Policy",
};

export default function CookiesPage() {
  return (
    <LegalShell title="Cookie Policy" updated="September 18, 2026">
      <section>
        <h2>1. What Are Cookies</h2>
        <p>
          Cookies are small text files stored on your device when you visit a website. They
          help the site remember your preferences and understand how you interact with the
          content. Cookies are widely used to make websites work more efficiently and to
          provide information to site owners.
        </p>
      </section>

      <section>
        <h2>2. How We Use Cookies</h2>
        <p className="mb-3">AppFox uses cookies for the following purposes:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Essential cookies:</strong> required for the website to function properly.
          </li>
          <li>
            <strong>Analytics cookies:</strong> help us understand how visitors interact with the site so we can improve it.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Cookies We Use</h2>
        <div className="overflow-x-auto">
          <table className="w-full overflow-hidden rounded-2xl border border-border text-sm">
            <thead>
              <tr className="bg-surface-muted">
                <th className="border-b border-border px-4 py-3 text-left font-medium text-foreground">Cookie</th>
                <th className="border-b border-border px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="border-b border-border px-4 py-3 text-left font-medium text-foreground">Purpose</th>
                <th className="border-b border-border px-4 py-3 text-left font-medium text-foreground">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs">_ga</td>
                <td className="px-4 py-3">Analytics</td>
                <td className="px-4 py-3">Anonymous usage measurement</td>
                <td className="px-4 py-3">Up to 2 years</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">_gid</td>
                <td className="px-4 py-3">Analytics</td>
                <td className="px-4 py-3">Distinguishes visitors</td>
                <td className="px-4 py-3">24 hours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>4. Third-Party Cookies</h2>
        <p>
          Some cookies may be set by third-party services we use, such as analytics providers.
          These cookies are governed by the respective third party&apos;s privacy policy. We do
          not control how these third parties use cookie data.
        </p>
      </section>

      <section>
        <h2>5. Managing Cookies</h2>
        <p className="mb-3">You can control and manage cookies through your browser settings. Most browsers allow you to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>View what cookies are stored and delete them individually.</li>
          <li>Block third-party cookies.</li>
          <li>Block cookies from specific sites.</li>
          <li>Block all cookies from being set.</li>
          <li>Delete all cookies when you close your browser.</li>
        </ul>
        <p className="mt-3">
          Blocking or deleting cookies may affect the functionality of the website and your
          experience on it.
        </p>
      </section>

      <section>
        <h2>6. Changes to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time. Any changes will be posted on this
          page with an updated effective date.
        </p>
      </section>

      <section>
        <h2>7. Contact Us</h2>
        <p>
          If you have questions about our use of cookies, please contact us at{" "}
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
