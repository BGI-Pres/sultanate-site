"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/government", label: "Government" },
  { href: "/citizenship", label: "Membership" },
  { href: "/gifting", label: "Support" },
  { href: "/news", label: "News" },
  { href: "/events", label: "Events" },
  { href: "/press", label: "Press" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="bg-[var(--dark-bg)] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
          <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--gold)]">
            Reestablished October 2020
          </p>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-gray-400">
            <Link href="/portal" className="hover:text-[var(--gold)] transition-colors">
              Member Portal
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="/auth/login" className="hover:text-[var(--gold)] transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-[var(--dark-bg)]/95 backdrop-blur-md border-b border-[var(--gold)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/emblem.svg"
                alt="Sultanate of Amexem Emblem"
                width={34}
                height={34}
                className="w-[34px] h-[34px]"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-white leading-tight">
                  Sultanate of Amexem
                </p>
                <p className="text-[10px] text-gray-400 leading-tight">
                  Custodian of the Nation of Moab
                </p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-[13px] text-gray-300 hover:text-[var(--gold)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-400 hover:text-[var(--gold)] transition-colors"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <Link
                href="/portal"
                className="hidden md:inline-flex px-4 py-1.5 text-xs font-medium bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/30 rounded-md hover:bg-[var(--gold)]/20 transition-colors"
              >
                Portal
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-gray-300"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search dropdown */}
      {searchOpen && (
        <div className="bg-[var(--dark-bg)] border-b border-[var(--gold)]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search the Sultanate of Amexem..."
                className="w-full px-5 py-3 pl-12 bg-[var(--dark-surface)] border border-[var(--gold)]/20 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40 focus:border-transparent"
                autoFocus
              />
              <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-[var(--gold)]/10 bg-[var(--dark-bg)]">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-3 text-sm text-gray-300 hover:text-[var(--gold)] rounded-md"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-[var(--gold)]/10 mt-2 pt-2">
              <Link
                href="/portal"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-3 text-sm text-[var(--gold)] font-medium"
              >
                Member Portal
              </Link>
              <Link
                href="/auth/login"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-3 text-sm text-gray-400"
              >
                Sign In
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
