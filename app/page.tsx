import Link from 'next/link';
import {
  Sparkles,
  Timer,
  Bell,
  Heart,
  Filter,
  Zap,
  TrendingUp,
  Users,
  Shield,
  Smartphone
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🦊</span>
              </div>
              <span className="text-2xl font-bold gradient-text">Appfox</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition">
                Features
              </Link>
              <Link href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition">
                How It Works
              </Link>
              <Link href="#developers" className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition">
                For Developers
              </Link>
              <Link
                href="https://partners.appfox.app"
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition shadow-md hover:shadow-lg"
              >
                Partner Portal
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Discover the best mobile app deals</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              The clever fox that
              <br />
              <span className="gradient-text">hunts down deals</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              Save money on premium mobile apps with curated lifetime deals,
              deep discounts, and limited-time offers — all in one native app.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition flex items-center justify-center space-x-2">
                <Smartphone className="w-5 h-5" />
                <span>Download on iOS</span>
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-gray-900 dark:bg-gray-700 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition flex items-center justify-center space-x-2">
                <Smartphone className="w-5 h-5" />
                <span>Get it on Android</span>
              </button>
            </div>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-orange-600" />
                <span>100% Free to use</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-orange-600" />
                <span>Curated & verified</span>
              </div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-3xl shadow-2xl p-8 aspect-video flex items-center justify-center border border-orange-300 dark:border-orange-700">
              <div className="text-center">
                <div className="text-6xl mb-4">📱</div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">App Preview Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to find great deals
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A mobile-first experience designed for serious deal hunters
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <FeatureCard
              icon={<Timer className="w-8 h-8" />}
              title="Time-Sensitive Deals"
              description="Never miss out with real-time expiration countdowns on every deal"
              color="orange"
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="Lifetime Access"
              description="Find apps offering lifetime premium unlocks and one-time purchases"
              color="orange"
            />
            <FeatureCard
              icon={<Bell className="w-8 h-8" />}
              title="Push Notifications"
              description="Get instant alerts for new deals and expiring favorites"
              color="orange"
            />
            <FeatureCard
              icon={<Filter className="w-8 h-8" />}
              title="Smart Filters"
              description="Search by discount percentage, ratings, category, and expiration"
              color="orange"
            />
            <FeatureCard
              icon={<Heart className="w-8 h-8" />}
              title="Wishlist & Favorites"
              description="Save deals and get notified when prices drop even further"
              color="orange"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Native Performance"
              description="True iOS & Android native experience, not a wrapped website"
              color="orange"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-orange-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              How Appfox works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Start saving in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <StepCard
              number="1"
              title="Browse Curated Deals"
              description="Explore hand-picked deals across all categories, from productivity to games"
            />
            <StepCard
              number="2"
              title="Find Your Perfect App"
              description="Use smart filters and search to discover apps you'll love at unbeatable prices"
            />
            <StepCard
              number="3"
              title="Redeem & Enjoy"
              description="Tap to open in App Store or Google Play, redeem your deal, and start saving"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCard number="500+" label="Active Deals" />
            <StatCard number="50-90%" label="Avg. Discount" />
            <StatCard number="100K+" label="Downloads" />
            <StatCard number="15+" label="Categories" />
          </div>
        </div>
      </section>

      {/* Developers Section */}
      <section id="developers" className="py-20 bg-gradient-to-b from-orange-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-12 md:p-16 text-white shadow-2xl">
            <div className="max-w-3xl mx-auto text-center">
              <TrendingUp className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Promote Your App
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-orange-100">
                Reach thousands of engaged users looking for their next favorite app.
                Submit your app and get featured on Appfox.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="https://partners.appfox.app"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-orange-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition"
                >
                  Submit Your App
                </Link>
                <button className="w-full sm:w-auto px-8 py-4 bg-orange-700 text-white rounded-xl font-semibold hover:bg-orange-800 transition">
                  Learn More
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-orange-100">
                <div>✓ Manual review process</div>
                <div>✓ Quality-focused curation</div>
                <div>✓ Performance analytics</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🦊</span>
                </div>
                <span className="text-xl font-bold text-white">Appfox</span>
              </div>
              <p className="text-sm text-gray-400">
                The clever fox that hunts down the best mobile app deals.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="hover:text-orange-400 transition">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-orange-400 transition">How It Works</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition">Pricing</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition">Download</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Developers</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="https://partners.appfox.app" className="hover:text-orange-400 transition">Partner Portal</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition">Submit App</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition">API Documentation</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition">Guidelines</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-orange-400 transition">About</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition">Blog</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition">Careers</Link></li>
                <li><Link href="#" className="hover:text-orange-400 transition">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <p>&copy; 2026 Appfox. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="#" className="hover:text-orange-400 transition">Privacy Policy</Link>
                <Link href="#" className="hover:text-orange-400 transition">Terms of Service</Link>
                <Link href="#" className="hover:text-orange-400 transition">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Component: Feature Card
function FeatureCard({
  icon,
  title,
  description,
  color
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition border border-gray-100 dark:border-gray-700">
      <div className={`w-14 h-14 bg-${color}-100 dark:bg-${color}-900/30 text-${color}-600 dark:text-${color}-400 rounded-xl flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
}

// Component: Step Card
function StepCard({
  number,
  title,
  description
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
        {number}
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-lg">
        {description}
      </p>
    </div>
  );
}

// Component: Stat Card
function StatCard({
  number,
  label
}: {
  number: string;
  label: string;
}) {
  return (
    <div>
      <div className="text-5xl font-bold gradient-text mb-2">
        {number}
      </div>
      <div className="text-gray-600 dark:text-gray-400 font-medium">
        {label}
      </div>
    </div>
  );
}
