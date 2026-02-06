import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Appfox',
};

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-sm text-gray-400 mb-12">Last updated: February 6, 2026</p>

          <div className="space-y-10 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Appfox website and mobile applications (collectively, the
                &quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not
                agree to these terms, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">2. Description of Service</h2>
              <p>
                Appfox is a platform that aggregates and curates discounted mobile app deals, lifetime
                offers, and limited-time promotions. We display deal information and redirect users to
                the relevant app store or developer website to complete their purchase. Appfox does not
                process payments or sell apps directly.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">3. User Accounts</h2>
              <p className="mb-3">When you create an account with us, you agree to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide accurate and complete information.</li>
                <li>Maintain the security of your account credentials.</li>
                <li>Notify us immediately of any unauthorized use of your account.</li>
                <li>Accept responsibility for all activity that occurs under your account.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">4. Deal Accuracy</h2>
              <p>
                While we make every effort to ensure deal information is accurate and up to date,
                we cannot guarantee the availability, pricing, or terms of any deal displayed on
                the platform. Deals are sourced from third-party developers and app stores, and
                may change or expire without notice. Always verify the final price and terms on
                the app store before completing a purchase.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">5. Acceptable Use</h2>
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use the Service for any unlawful purpose.</li>
                <li>Scrape, crawl, or otherwise automatically collect data from the Service without our written consent.</li>
                <li>Interfere with or disrupt the Service or its infrastructure.</li>
                <li>Attempt to gain unauthorized access to any part of the Service.</li>
                <li>Impersonate any person or entity, or misrepresent your affiliation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">6. Intellectual Property</h2>
              <p>
                All content on the Service, including text, graphics, logos, and software, is the
                property of Appfox or its content suppliers and is protected by applicable intellectual
                property laws. You may not reproduce, distribute, or create derivative works from any
                content without our prior written permission.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">7. Developer Submissions</h2>
              <p>
                If you submit an app for listing on Appfox, you represent that you have the authority
                to do so and that the information provided is accurate. We reserve the right to review,
                approve, reject, or remove any submission at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">8. Limitation of Liability</h2>
              <p>
                Appfox is provided &quot;as is&quot; without warranties of any kind. To the fullest
                extent permitted by law, we shall not be liable for any indirect, incidental, special,
                or consequential damages arising from your use of the Service, including but not limited
                to loss of data, revenue, or profits.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">9. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your access to the Service at any time,
                with or without cause, and with or without notice. Upon termination, your right to use
                the Service ceases immediately.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">10. Changes to These Terms</h2>
              <p>
                We may revise these Terms of Service at any time. Changes will be posted on this page
                with an updated effective date. Your continued use of the Service after changes are
                posted constitutes your acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-3">11. Contact Us</h2>
              <p>
                If you have questions about these Terms, please contact us at{' '}
                <a href="mailto:legal@appfox.app" className="text-gray-900 underline underline-offset-2 hover:text-orange-600 transition">
                  legal@appfox.app
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
