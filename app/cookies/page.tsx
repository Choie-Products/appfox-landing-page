import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy - Appfox',
};

export default function CookiesPage() {
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
            Cookie Policy
          </h1>
          <p className="text-sm text-gray-400 mb-12">Last updated: February 6, 2026</p>

          <div className="space-y-10 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">1. What Are Cookies</h2>
              <p>
                Cookies are small text files stored on your device when you visit a website. They
                help the site remember your preferences and understand how you interact with the
                content. Cookies are widely used to make websites work more efficiently and to
                provide information to site owners.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">2. How We Use Cookies</h2>
              <p className="mb-3">Appfox uses cookies for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-gray-900">Essential cookies</strong> — required for the website to function properly, such as maintaining your session and security settings.</li>
                <li><strong className="text-gray-900">Analytics cookies</strong> — help us understand how visitors interact with the site so we can improve the user experience.</li>
                <li><strong className="text-gray-900">Preference cookies</strong> — remember your settings and choices, such as language or region.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">3. Cookies We Use</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-3 font-medium text-gray-900 border-b border-gray-200">Cookie</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-900 border-b border-gray-200">Type</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-900 border-b border-gray-200">Purpose</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-900 border-b border-gray-200">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 font-mono text-xs">_session</td>
                      <td className="px-4 py-3">Essential</td>
                      <td className="px-4 py-3">Maintains your session state</td>
                      <td className="px-4 py-3">Session</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 font-mono text-xs">_analytics</td>
                      <td className="px-4 py-3">Analytics</td>
                      <td className="px-4 py-3">Tracks anonymous usage data</td>
                      <td className="px-4 py-3">1 year</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">_preferences</td>
                      <td className="px-4 py-3">Preference</td>
                      <td className="px-4 py-3">Stores your display preferences</td>
                      <td className="px-4 py-3">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">4. Third-Party Cookies</h2>
              <p>
                Some cookies may be set by third-party services we use, such as analytics providers.
                These cookies are governed by the respective third party&apos;s privacy policy. We do
                not control how these third parties use cookie data.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">5. Managing Cookies</h2>
              <p className="mb-3">
                You can control and manage cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>View what cookies are stored and delete them individually.</li>
                <li>Block third-party cookies.</li>
                <li>Block cookies from specific sites.</li>
                <li>Block all cookies from being set.</li>
                <li>Delete all cookies when you close your browser.</li>
              </ul>
              <p className="mt-3">
                Please note that blocking or deleting cookies may affect the functionality of the
                website and your user experience.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">6. Changes to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time. Any changes will be posted on this
                page with an updated effective date.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">7. Contact Us</h2>
              <p>
                If you have questions about our use of cookies, please contact us at{' '}
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
