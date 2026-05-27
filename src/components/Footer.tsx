import Link from "next/link";
import Image from "next/image";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--dark-bg)] text-white mt-auto">
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/emblem.svg"
                alt="Sultanate of Amexem"
                width={36}
                height={36}
              />
              <div>
                <p className="text-sm font-semibold text-white">Sultanate of Amexem</p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--gold)]">
                  Custodian of the Nation of Moab
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Self-Determination. Collective Economics. Cultural Identity.
              Building a nation that endures.
            </p>
            <SocialLinks />
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-[var(--gold)] transition-colors">About</Link></li>
              <li><Link href="/government" className="hover:text-[var(--gold)] transition-colors">Government</Link></li>
              <li><Link href="/citizenship" className="hover:text-[var(--gold)] transition-colors">Membership</Link></li>
              <li><Link href="/gifting" className="hover:text-[var(--gold)] transition-colors">Support</Link></li>
              <li><Link href="/news" className="hover:text-[var(--gold)] transition-colors">News</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--gold)] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold mb-4">
              Support the Nation
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <a
                  href="https://cash.app/$unitedroyalmonarchs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  CashApp: $unitedroyalmonarchs
                </a>
              </li>
              <li>
                <Link href="/gifting" className="hover:text-[var(--gold)] transition-colors">
                  Zelle &amp; Square
                </Link>
              </li>
              <li>
                <Link href="/gifting" className="hover:text-[var(--gold)] transition-colors">
                  Official Merchandise
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold mb-4">
              Take Action
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Your nation awaits. Claim your membership or support the mission.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/citizenship"
                className="inline-block text-center px-4 py-2.5 text-sm bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-md hover:bg-[var(--gold-light)] transition-colors"
              >
                Apply for Membership
              </Link>
              <Link
                href="/gifting"
                className="inline-block text-center px-4 py-2.5 text-sm border border-[var(--gold)]/30 text-[var(--gold)] rounded-md hover:bg-[var(--gold)]/10 transition-colors"
              >
                Support the Mission
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--gold)]/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} Sultanate of Amexem. All rights reserved.
          </p>
          <SocialLinks iconSize="sm" />
        </div>
      </div>
    </footer>
  );
}
