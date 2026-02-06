import Link from 'next/link';
import { notFound } from 'next/navigation';
import WaitlistForm from '@/components/waitlist-form';

const pages: Record<string, { title: string; description: string }> = {
  pricing: {
    title: 'Pricing',
    description: "We're finalizing our pricing plans. Join the waitlist and we'll let you know as soon as they're ready.",
  },
  download: {
    title: 'Download',
    description: "The app isn't available just yet. Join the waitlist to be the first to download when we launch.",
  },
  'partner-portal': {
    title: 'Partner Portal',
    description: "The partner portal is coming soon. Sign up and we'll notify you when it's open for developers.",
  },
  'submit-app': {
    title: 'Submit Your App',
    description: "App submissions will open soon. Join the waitlist and we'll reach out when you can submit.",
  },
  'api-docs': {
    title: 'API Documentation',
    description: "Our API documentation is being prepared. Join the waitlist to get early access.",
  },
  guidelines: {
    title: 'Guidelines',
    description: "Our developer and submission guidelines are on the way. Join the waitlist to stay updated.",
  },
  about: {
    title: 'About',
    description: "We're a small team building the best way to discover app deals. More details coming soon.",
  },
  blog: {
    title: 'Blog',
    description: "Our blog is launching soon with tips, app reviews, and deal roundups. Stay tuned.",
  },
  careers: {
    title: 'Careers',
    description: "We're not hiring just yet, but that could change soon. Join the waitlist to hear about openings.",
  },
  contact: {
    title: 'Contact',
    description: "A dedicated contact page is on the way. For now, join the waitlist and we'll be in touch.",
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // Need to handle async params for Next.js 15
  return params.then(({ slug }) => {
    const page = pages[slug];
    if (!page) return {};
    return { title: `${page.title} - Appfox` };
  });
}

export default async function ComingSoonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug];

  if (!page) notFound();

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

      <section className="pt-36 pb-24 px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-sm font-medium text-orange-600 mb-3">Coming soon</p>
          <h1 className="text-4xl md:text-5xl font-normal text-gray-900 tracking-tight leading-[1.1] mb-6">
            {page.title}
          </h1>
          <p className="text-lg text-gray-500 mb-12 leading-relaxed">
            {page.description}
          </p>
          <WaitlistForm />
          <div className="mt-12">
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition">
              &larr; Back to home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
