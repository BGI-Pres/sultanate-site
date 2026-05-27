"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import type { User } from "@supabase/supabase-js";

interface MemberData {
  status?: string;
  tier?: string;
}

const quickLinks = [
  {
    href: "/portal/events",
    title: "Events",
    description: "Browse upcoming community events, gatherings, and ceremonies.",
    icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
  },
  {
    href: "/portal/status",
    title: "Status",
    description: "Track the progress of your membership application and any pending requests.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    href: "/portal/documents",
    title: "Documents",
    description: "View and download your membership documents, certificates, and official papers.",
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
  },
  {
    href: "/portal/resources",
    title: "Resources",
    description: "Access members-only educational materials, guides, and historical archives.",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    href: "/apply/membership-card",
    title: "Card Request",
    description: "Request or renew your official membership identification card.",
    icon: "M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z",
  },
  {
    href: "/contact",
    title: "Contact",
    description: "Contact the administrative office for assistance with your account or membership.",
    icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
  },
];

export default function PortalDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [memberData, setMemberData] = useState<MemberData | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) {
        supabase
          .from("members")
          .select("status, tier")
          .eq("id", data.user.id)
          .single()
          .then(({ data: member }) => {
            if (member) {
              setMemberData(member);
            }
          });
      }
    });
  }, []);

  const displayName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Member";

  const memberStatus = memberData?.status || "Pending";
  const memberTier = memberData?.tier || "Affiliate";
  const isActive = memberStatus.toLowerCase() === "active";

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
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isActive ? "bg-[var(--gold)]" : "bg-gray-400"
              }`}
            />
          </div>
          <p
            className={`text-xl font-bold ${
              isActive ? "text-[var(--gold)]" : "text-gray-400"
            }`}
          >
            {memberStatus}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300">
          <p className="text-sm text-[var(--gray-500)] mb-2">Membership Tier</p>
          <p className="text-xl font-bold text-[var(--gray-900)]">{memberTier}</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group bg-white p-6 rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[var(--gold)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d={link.icon}
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-[var(--gray-900)] group-hover:text-[var(--gold)] transition-colors">
                {link.title} &rarr;
              </h3>
            </div>
            <p className="text-sm text-[var(--gray-500)]">{link.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
