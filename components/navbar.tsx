"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div
        className={`mx-auto flex justify-between items-center transition-all duration-300 ${
          scrolled
            ? "max-w-3xl mt-3 px-6 h-12 rounded-full bg-white/70 backdrop-blur-md shadow-lg shadow-black/5 border border-white/50"
            : "max-w-6xl px-6 lg:px-8 h-16"
        }`}
      >
        <Link href="/" className="flex items-center">
          <img src="/logo.svg" alt="Appfox" className="h-7" />
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="#features"
            className="text-sm text-gray-700 hover:text-gray-900 transition"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm text-gray-700 hover:text-gray-900 transition"
          >
            How It Works
          </Link>
          <Link
            href="#developers"
            className="text-sm text-gray-700 hover:text-gray-900 transition"
          >
            For Developers
          </Link>
        </div>
      </div>
    </nav>
  );
}
