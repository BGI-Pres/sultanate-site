import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--gray-900)] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Sultanate of Amexem</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Custodian of the Nation of Moab. Preserving heritage, upholding
              sovereignty, and building community for future generations.
            </p>
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
            <h3 className="text-lg font-semibold mb-3">Connect</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Reach out to learn more about the Sultanate and how to get involved
              with our mission.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-3 px-4 py-2 text-sm bg-[var(--cherry-red)] text-white rounded-md hover:bg-[var(--cherry-red-dark)] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} Sultanate of Amexem. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
