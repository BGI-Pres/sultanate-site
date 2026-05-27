"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/government", label: "Government" },
  { href: "/citizenship", label: "Citizenship" },
  { href: "/gifting", label: "Support" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--dark-bg)]/95 backdrop-blur-md border-b border-[var(--gold)]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/emblem.svg"
              alt="Sultanate of Amexem Emblem"
              width={36}
              height={36}
              className="w-9 h-9"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-white leading-tight">
                Sultanate of Amexem
              </p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--gold)] leading-tight">
                Custodian of the Nation of Moab
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-gray-300 hover:text-[var(--gold)] transition-colors rounded-md"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/portal"
              className="ml-2 px-4 py-1.5 text-sm font-medium bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/30 rounded-md hover:bg-[var(--gold)]/20 transition-colors"
            >
              Portal
            </Link>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-300"
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

      {mobileOpen && (
        <nav className="md:hidden border-t border-[var(--gold)]/10 bg-[var(--dark-bg)]">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm text-gray-300 hover:text-[var(--gold)] rounded-md"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/portal"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm text-[var(--gold)] font-medium"
            >
              Citizen Portal
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
