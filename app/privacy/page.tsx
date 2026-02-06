import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Appfox',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <img src="/logo.svg" alt="Appfox" className="h-7" />
            </Link>
          </div>
        </div>
      </nav>

      <article className="pt-36 pb-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-medium text-orange-600 mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-normal text-gray-900 tracking-tight leading-[1.1] mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400 mb-12">Last updated: February 6, 2026</p>

          <div className="space-y-10 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">1. Introduction</h2>
              <p>
                Appfox (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, and safeguard your information when you
                visit our website at appfox.app and use our mobile applications.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">2. Information We Collect</h2>
              <p className="mb-3">We may collect the following types of information:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-gray-900">Email address</strong> — when you sign up for our waitlist or create an account.</li>
                <li><strong className="text-gray-900">Usage data</strong> — such as pages visited, features used, and interactions within the app.</li>
                <li><strong className="text-gray-900">Device information</strong> — including device type, operating system, and browser type.</li>
                <li><strong className="text-gray-900">Analytics data</strong> — anonymized data collected through third-party analytics services to help us improve the product.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">3. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide, maintain, and improve our services.</li>
                <li>Send you updates about new deals, features, and product launches.</li>
                <li>Respond to your requests and provide customer support.</li>
                <li>Analyze usage trends to improve user experience.</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">4. Data Sharing</h2>
              <p>
                We do not sell your personal information. We may share data with trusted third-party
                service providers who assist us in operating our platform (e.g., email delivery, analytics),
                but only to the extent necessary for them to perform their services. We may also disclose
                information if required by law or to protect our rights.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">5. Data Security</h2>
              <p>
                We implement reasonable technical and organizational measures to protect your personal
                information against unauthorized access, loss, or misuse. However, no method of
                transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">6. Your Rights</h2>
              <p className="mb-3">Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Access the personal data we hold about you.</li>
                <li>Request correction or deletion of your data.</li>
                <li>Opt out of marketing communications at any time.</li>
                <li>Request data portability.</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us at the email below.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">7. Third-Party Links</h2>
              <p>
                Our platform may contain links to third-party websites, including app store listings.
                We are not responsible for the privacy practices of these external sites. We encourage
                you to review their privacy policies before providing any personal information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant
                changes by posting the updated policy on this page and updating the &quot;Last updated&quot;
                date above.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">9. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@appfox.app" className="text-gray-900 underline underline-offset-2 hover:text-orange-600 transition">
                  privacy@appfox.app
                </a>.
              </p>
            </section>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-100">
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition">
              &larr; Back to home
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
