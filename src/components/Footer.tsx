import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--gray-900)] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Sultanate of Amexem</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Custodian of the Nation of Moab. Preserving heritage, upholding
              sovereignty, and building community for future generations.
            </p>
            <SocialLinks />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Navigation</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/government" className="hover:text-white transition-colors">Government</Link></li>
              <li><Link href="/citizenship" className="hover:text-white transition-colors">Citizenship</Link></li>
              <li><Link href="/gifting" className="hover:text-white transition-colors">Gifting</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors">News</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="https://cash.app/$unitedroyalmonarchs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  CashApp: $unitedroyalmonarchs
                </a>
              </li>
              <li>
                <Link href="/gifting" className="hover:text-white transition-colors">
                  Zelle &amp; Square
                </Link>
              </li>
              <li>
                <Link href="/gifting" className="hover:text-white transition-colors">
                  Browse Merchandise
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Get Involved</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">
              Join the movement. Apply for citizenship or support our mission.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/citizenship"
                className="inline-block text-center px-4 py-2 text-sm bg-[var(--forest-green)] text-white rounded-md hover:bg-[var(--forest-green-dark)] transition-colors"
              >
                Apply for Citizenship
              </Link>
              <Link
                href="/gifting"
                className="inline-block text-center px-4 py-2 text-sm bg-[var(--cherry-red)] text-white rounded-md hover:bg-[var(--cherry-red-dark)] transition-colors"
              >
                Make a Gift
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {currentYear} Sultanate of Amexem. All rights reserved.</p>
          <SocialLinks iconSize="sm" />
        </div>
      </div>
    </footer>
  );
}
