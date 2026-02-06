import Link from 'next/link';
import {
  Sparkles,
  Timer,
  Bell,
  Heart,
  Filter,
  Zap,
  ArrowRight,
  TrendingUp,
  Shield,
  Users
} from 'lucide-react';
import WaitlistForm from '@/components/waitlist-form';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🦊</span>
              <span className="text-lg font-semibold text-gray-900 tracking-tight font-heading">Appfox</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-sm text-gray-500 hover:text-gray-900 transition">
                Features
              </Link>
              <Link href="#how-it-works" className="text-sm text-gray-500 hover:text-gray-900 transition">
                How It Works
              </Link>
              <Link href="#developers" className="text-sm text-gray-500 hover:text-gray-900 transition">
                For Developers
              </Link>
              <Link
                href="https://partners.appfox.app"
                className="text-sm px-5 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition"
              >
                Partner Portal
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal text-gray-900 tracking-tight leading-[1.1] mb-6">
            The clever fox that
            <br />
            hunts down deals
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            We&apos;re building the best way to find lifetime deals and deep discounts
            on premium mobile apps. Be the first to know when we launch.
          </p>
          <div className="mb-12">
            <WaitlistForm />
          </div>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <span>Join 500+ others on the waitlist</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>Launching soon</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 lg:px-8 bg-gray-50/70">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-medium text-orange-600 mb-3">Features</p>
            <h2 className="text-3xl md:text-4xl font-normal text-gray-900 tracking-tight mb-4">
              Everything you need to find great deals
            </h2>
            <p className="text-lg text-gray-500">
              A mobile-first experience designed for serious deal hunters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            <FeatureCard
              icon={<Timer className="w-5 h-5" />}
              title="Time-Sensitive Deals"
              description="Never miss out with real-time expiration countdowns on every deal."
            />
            <FeatureCard
              icon={<Sparkles className="w-5 h-5" />}
              title="Lifetime Access"
              description="Find apps offering lifetime premium unlocks and one-time purchases."
            />
            <FeatureCard
              icon={<Bell className="w-5 h-5" />}
              title="Push Notifications"
              description="Get instant alerts for new deals and expiring favorites."
            />
            <FeatureCard
              icon={<Filter className="w-5 h-5" />}
              title="Smart Filters"
              description="Search by discount percentage, ratings, category, and expiration."
            />
            <FeatureCard
              icon={<Heart className="w-5 h-5" />}
              title="Wishlist & Favorites"
              description="Save deals and get notified when prices drop even further."
            />
            <FeatureCard
              icon={<Zap className="w-5 h-5" />}
              title="Native Performance"
              description="True iOS & Android native experience, not a wrapped website."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-medium text-orange-600 mb-3">How it works</p>
            <h2 className="text-3xl md:text-4xl font-normal text-gray-900 tracking-tight mb-4">
              Start saving in three steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <StepCard
              number="01"
              title="Browse Curated Deals"
              description="Explore hand-picked deals across all categories, from productivity to games."
            />
            <StepCard
              number="02"
              title="Find Your Perfect App"
              description="Use smart filters and search to discover apps you'll love at unbeatable prices."
            />
            <StepCard
              number="03"
              title="Redeem & Enjoy"
              description="Tap to open in App Store or Google Play, redeem your deal, and start saving."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="500+" label="Active Deals" />
            <StatCard number="50-90%" label="Avg. Discount" />
            <StatCard number="100K+" label="Downloads" />
            <StatCard number="15+" label="Categories" />
          </div>
        </div>
      </section>

      {/* Developers Section */}
      <section id="developers" className="py-24 px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-medium text-orange-600 mb-3">For developers</p>
              <h2 className="text-3xl md:text-4xl font-normal text-gray-900 tracking-tight mb-4">
                Promote Your App
              </h2>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                Reach thousands of engaged users looking for their next favorite app.
                Submit your app and get featured on Appfox.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href="https://partners.appfox.app"
                  className="px-7 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition inline-flex items-center space-x-2"
                >
                  <span>Submit Your App</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button className="px-7 py-3 text-gray-600 rounded-full font-medium border border-gray-200 hover:border-gray-300 transition">
                  Learn More
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-gray-900" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-1">Manual review process</h3>
                  <p className="text-sm text-gray-500">Every app is reviewed by our team to ensure quality and trust.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-gray-900" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-1">Performance analytics</h3>
                  <p className="text-sm text-gray-500">Track impressions, clicks, and conversions in real time.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-gray-900" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-1">Quality-focused curation</h3>
                  <p className="text-sm text-gray-500">Your app is shown to users who are actively looking for deals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-lg">🦊</span>
                <span className="font-semibold text-gray-900">Appfox</span>
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
                <li><Link href="#" className="text-gray-400 hover:text-gray-600 transition">Pricing</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-gray-600 transition">Download</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Developers</h3>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="https://partners.appfox.app" className="text-gray-400 hover:text-gray-600 transition">Partner Portal</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-gray-600 transition">Submit App</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-gray-600 transition">API Documentation</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-gray-600 transition">Guidelines</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="#" className="text-gray-400 hover:text-gray-600 transition">About</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-gray-600 transition">Blog</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-gray-600 transition">Careers</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-gray-600 transition">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <p>&copy; 2026 Appfox. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="#" className="hover:text-gray-600 transition">Privacy</Link>
                <Link href="#" className="hover:text-gray-600 transition">Terms</Link>
                <Link href="#" className="hover:text-gray-600 transition">Cookies</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
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
