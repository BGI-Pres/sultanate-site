"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import type { User } from "@supabase/supabase-js";

export default function PortalDashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const displayName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Member";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--gray-900)]">
          Welcome, {displayName}
        </h1>
        <p className="text-[var(--gray-500)] mt-1">
          Your Member Portal dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[var(--gray-500)]">Membership Status</p>
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--gold)]" />
          </div>
          <p className="text-xl font-bold text-[var(--gold)]">Active</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300">
          <p className="text-sm text-[var(--gray-500)] mb-2">Membership Tier</p>
          <p className="text-xl font-bold text-[var(--gray-900)]">Full Member</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300">
          <p className="text-sm text-[var(--gray-500)] mb-2">Member Since</p>
          <p className="text-xl font-bold text-[var(--gray-900)]">
            {user?.created_at
              ? new Date(user.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })
              : "—"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/portal/documents"
          className="group bg-white p-6 rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300"
        >
          <h3 className="font-semibold text-[var(--gray-900)] group-hover:text-[var(--gold)] transition-colors mb-1">
            Documents &rarr;
          </h3>
          <p className="text-sm text-[var(--gray-500)]">
            View and download your membership documents, certificates, and official papers.
          </p>
        </Link>

        <Link
          href="/portal/status"
          className="group bg-white p-6 rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300"
        >
          <h3 className="font-semibold text-[var(--gray-900)] group-hover:text-[var(--gold)] transition-colors mb-1">
            Application Status &rarr;
          </h3>
          <p className="text-sm text-[var(--gray-500)]">
            Track the progress of your membership application and any pending requests.
          </p>
        </Link>

        <Link
          href="/portal/resources"
          className="group bg-white p-6 rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300"
        >
          <h3 className="font-semibold text-[var(--gray-900)] group-hover:text-[var(--gold)] transition-colors mb-1">
            Exclusive Resources &rarr;
          </h3>
          <p className="text-sm text-[var(--gray-500)]">
            Access members-only educational materials, guides, and historical archives.
          </p>
        </Link>

        <Link
          href="/contact"
          className="group bg-white p-6 rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300"
        >
          <h3 className="font-semibold text-[var(--gray-900)] group-hover:text-[var(--gold)] transition-colors mb-1">
            Get Support &rarr;
          </h3>
          <p className="text-sm text-[var(--gray-500)]">
            Contact the administrative office for assistance with your account or membership.
          </p>
        </Link>
      </div>
    </div>
  );
}
