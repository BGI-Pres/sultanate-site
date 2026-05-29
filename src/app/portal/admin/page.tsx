"use client";

import Link from "next/link";

const stats = [
  { label: "Total Members", value: "—", change: null, href: "/portal/admin/members" },
  { label: "Pending Applications", value: "—", change: null, href: "/portal/admin/members" },
  { label: "Donations (Month)", value: "—", change: null, href: "/portal/admin/finances" },
  { label: "Merch Orders", value: "—", change: null, href: "/portal/admin/finances" },
  { label: "Event RSVPs", value: "—", change: null, href: "/portal/admin/rsvps" },
  { label: "Blog Posts", value: "—", change: null, href: "/portal/admin/posts" },
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
            className="bg-white p-5 rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300"
          >
            <p className="text-sm text-[var(--gray-500)] mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-[var(--gray-900)]">
              {stat.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-[var(--gray-200)] p-6">
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

        <div className="bg-white rounded-xl border border-[var(--gray-200)] p-6">
          <h2 className="font-semibold text-[var(--gray-900)] mb-4">
            Recent Donations
          </h2>
          <div className="text-center py-8 text-[var(--gray-500)] text-sm">
            <p>Donation tracking will show here once payment integrations are connected.</p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl border border-[var(--gray-200)] p-6">
        <h2 className="font-semibold text-[var(--gray-900)] mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/portal/admin/members"
            className="px-4 py-2 text-sm bg-[var(--gold)] text-[var(--dark-bg)] rounded-md hover:bg-[var(--gold-light)] transition-colors"
          >
            Manage Members
          </Link>
          <Link
            href="/portal/admin/content"
            className="px-4 py-2 text-sm bg-[var(--dark-bg)] text-[var(--gold)] rounded-md hover:bg-[var(--dark-surface)] transition-colors"
          >
            Manage Content
          </Link>
          <Link
            href="/portal/admin/finances"
            className="px-4 py-2 text-sm border border-[var(--gray-300)] text-[var(--gray-700)] rounded-md hover:bg-[var(--gray-50)] transition-colors"
          >
            View Finances
          </Link>
          <Link
            href="/portal/admin/rsvps"
            className="px-4 py-2 text-sm border border-[var(--gray-300)] text-[var(--gray-700)] rounded-md hover:bg-[var(--gray-50)] transition-colors"
          >
            View RSVPs
          </Link>
          <Link
            href="/portal/admin/posts"
            className="px-4 py-2 text-sm border border-[var(--gray-300)] text-[var(--gray-700)] rounded-md hover:bg-[var(--gray-50)] transition-colors"
          >
            Manage Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
