"use client";

import Link from "next/link";

const stats = [
  { label: "Total Members", value: "—", change: null, href: "/admin/members" },
  { label: "Pending Applications", value: "—", change: null, href: "/admin/members" },
  { label: "Donations (Month)", value: "—", change: null, href: "/admin/finances" },
  { label: "Merch Orders", value: "—", change: null, href: "/admin/finances" },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--gray-900)]">
          Admin Dashboard
        </h1>
        <p className="text-[var(--gray-500)] mt-1">
          Overview of the Sultanate&apos;s operations
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white p-5 rounded-lg border border-[var(--gray-200)] hover:shadow-md transition-all"
          >
            <p className="text-sm text-[var(--gray-500)] mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-[var(--gray-900)]">
              {stat.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6">
          <h2 className="font-semibold text-[var(--gray-900)] mb-4">
            Recent Applications
          </h2>
          <div className="text-center py-8 text-[var(--gray-500)] text-sm">
            <p>Connect Supabase to see live data.</p>
            <p className="text-xs mt-1">
              Set <code className="bg-[var(--gray-100)] px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code className="bg-[var(--gray-100)] px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in
              your Vercel environment variables.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6">
          <h2 className="font-semibold text-[var(--gray-900)] mb-4">
            Recent Donations
          </h2>
          <div className="text-center py-8 text-[var(--gray-500)] text-sm">
            <p>Donation tracking will show here once payment integrations are connected.</p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg border border-[var(--gray-200)] p-6">
        <h2 className="font-semibold text-[var(--gray-900)] mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/members"
            className="px-4 py-2 text-sm bg-[var(--forest-green)] text-white rounded-md hover:bg-[var(--forest-green-dark)] transition-colors"
          >
            Manage Members
          </Link>
          <Link
            href="/admin/content"
            className="px-4 py-2 text-sm bg-[var(--cherry-red)] text-white rounded-md hover:bg-[var(--cherry-red-dark)] transition-colors"
          >
            Manage Content
          </Link>
          <Link
            href="/admin/finances"
            className="px-4 py-2 text-sm border border-[var(--gray-300)] text-[var(--gray-700)] rounded-md hover:bg-[var(--gray-50)] transition-colors"
          >
            View Finances
          </Link>
        </div>
      </div>
    </div>
  );
}
