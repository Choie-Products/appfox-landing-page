import Link from 'next/link';
import {
  Sparkles,
  Timer,
  Bell,
  Heart,
  Filter,
  Zap,
  TrendingUp,
  Shield,
  Users
} from 'lucide-react';
import WaitlistForm from '@/components/waitlist-form';
import Navbar from '@/components/navbar';
import FadeIn from '@/components/fade-in';
import Scroll3DOverlay from '@/components/scroll-3d-overlay';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section data-scroll-section="hero" className="relative pb-24">
        <Navbar />

        <div className="relative z-10 max-w-6xl mx-auto pt-40 px-6 lg:px-8">
          <div className="hero-animate text-left max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-900 tracking-tight leading-[1.1] mb-6 max-w-3xl">
              The clever fox that
              <br />
              hunts down deals
            </h1>
            <p className="text-base md:text-lg text-gray-500 mb-10 max-w-2xl leading-relaxed">
              We&apos;re building the best way to find lifetime deals and deep discounts
              on premium mobile apps. Be the first to know when we launch.
            </p>
            <div className="mb-3 max-w-md">
              <WaitlistForm />
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>Join 500+ others on the waitlist</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>Launching soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" data-scroll-section="features" className="py-24 px-6 lg:px-8 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="max-w-2xl mb-16">
              <p className="text-sm font-medium text-orange-600 mb-3">Features</p>
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 tracking-tight mb-4">
                Everything you need to find great deals
              </h2>
              <p className="text-lg text-gray-500">
                A mobile-first experience designed for serious deal hunters.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            <FadeIn delay={0}>
              <FeatureCard
                icon={<Timer className="w-5 h-5" />}
                title="Time-Sensitive Deals"
                description="Never miss out with real-time expiration countdowns on every deal."
              />
            </FadeIn>
            <FadeIn delay={80}>
              <FeatureCard
                icon={<Sparkles className="w-5 h-5" />}
                title="Lifetime Access"
                description="Find apps offering lifetime premium unlocks and one-time purchases."
              />
            </FadeIn>
            <FadeIn delay={160}>
              <FeatureCard
                icon={<Bell className="w-5 h-5" />}
                title="Push Notifications"
                description="Get instant alerts for new deals and expiring favorites."
              />
            </FadeIn>
            <FadeIn delay={240}>
              <FeatureCard
                icon={<Filter className="w-5 h-5" />}
                title="Smart Filters"
                description="Search by discount percentage, ratings, category, and expiration."
              />
            </FadeIn>
            <FadeIn delay={320}>
              <FeatureCard
                icon={<Heart className="w-5 h-5" />}
                title="Wishlist & Favorites"
                description="Save deals and get notified when prices drop even further."
              />
            </FadeIn>
            <FadeIn delay={400}>
              <FeatureCard
                icon={<Zap className="w-5 h-5" />}
                title="Native Performance"
                description="True iOS & Android native experience, not a wrapped website."
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" data-scroll-section="how-it-works" className="py-24 px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="max-w-2xl mb-16">
              <p className="text-sm font-medium text-orange-600 mb-3">How it works</p>
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 tracking-tight mb-4">
                Start saving in three steps
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-12">
            <FadeIn delay={0}>
              <StepCard
                number="01"
                title="Browse Curated Deals"
                description="Explore hand-picked deals across all categories, from productivity to games."
              />
            </FadeIn>
            <FadeIn delay={120}>
              <StepCard
                number="02"
                title="Find Your Perfect App"
                description="Use smart filters and search to discover apps you'll love at unbeatable prices."
              />
            </FadeIn>
            <FadeIn delay={240}>
              <StepCard
                number="03"
                title="Redeem & Enjoy"
                description="Tap to open in App Store or Google Play, redeem your deal, and start saving."
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section data-scroll-section="stats" className="py-24 px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <FadeIn delay={0}><StatCard number="500+" label="Active Deals" /></FadeIn>
            <FadeIn delay={100}><StatCard number="50-90%" label="Avg. Discount" /></FadeIn>
            <FadeIn delay={200}><StatCard number="100K+" label="Downloads" /></FadeIn>
            <FadeIn delay={300}><StatCard number="15+" label="Categories" /></FadeIn>
          </div>
        </div>
      </section>

      {/* Developers Section */}
      <section id="developers" data-scroll-section="developers" className="py-24 px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <p className="text-sm font-medium text-orange-600 mb-3">For developers</p>
                <h2 className="text-3xl md:text-4xl font-normal text-gray-900 tracking-tight mb-4">
                  Promote Your App
                </h2>
                <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                  Reach thousands of engaged users looking for their next favorite app.
                  Join the waitlist and we&apos;ll notify you when the partner portal opens.
                </p>
                <WaitlistForm fullWidth />
              </div>
            </FadeIn>
            <div className="space-y-4">
              <FadeIn delay={100}>
                <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-1">Manual review process</h3>
                    <p className="text-sm text-gray-500">Every app is reviewed by our team to ensure quality and trust.</p>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={200}>
                <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-1">Performance analytics</h3>
                    <p className="text-sm text-gray-500">Track impressions, clicks, and conversions in real time.</p>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={300}>
                <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-1">Quality-focused curation</h3>
                    <p className="text-sm text-gray-500">Your app is shown to users who are actively looking for deals.</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FadeIn>
      <footer data-scroll-section="footer" className="border-t border-gray-100 py-12 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="mb-3">
                <img src="/logo.svg" alt="Appfox" className="h-6" />
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                The clever fox that hunts down the best mobile app deals.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="#features" className="text-gray-400 hover:text-gray-600 transition">Features</Link></li>
                <li><Link href="#how-it-works" className="text-gray-400 hover:text-gray-600 transition">How It Works</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-gray-600 transition">Pricing</Link></li>
                <li><Link href="/download" className="text-gray-400 hover:text-gray-600 transition">Download</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Developers</h3>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/partner-portal" className="text-gray-400 hover:text-gray-600 transition">Partner Portal</Link></li>
                <li><Link href="/submit-app" className="text-gray-400 hover:text-gray-600 transition">Submit App</Link></li>
                <li><Link href="/api-docs" className="text-gray-400 hover:text-gray-600 transition">API Documentation</Link></li>
                <li><Link href="/guidelines" className="text-gray-400 hover:text-gray-600 transition">Guidelines</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-gray-600 transition">About</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-gray-600 transition">Blog</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-gray-600 transition">Careers</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-gray-600 transition">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <p>&copy; 2026 Appfox. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="hover:text-gray-600 transition">Privacy</Link>
                <Link href="/terms" className="hover:text-gray-600 transition">Terms</Link>
                <Link href="/cookies" className="hover:text-gray-600 transition">Cookies</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </FadeIn>

      <Scroll3DOverlay />
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 text-gray-900 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-base font-medium text-gray-900 mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <span className="text-sm font-mono text-orange-600 mb-3 block">{number}</span>
      <h3 className="text-xl font-normal text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function StatCard({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div>
      <div className="text-4xl font-normal text-gray-900 mb-1">
        {number}
      </div>
      <div className="text-sm text-gray-400">
        {label}
      </div>
    </div>
  );
}
