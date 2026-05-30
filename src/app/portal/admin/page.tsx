"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";

interface Stat {
  label: string;
  value: number | string;
  href: string;
  accent?: "default" | "warn";
}

interface RecentApp {
  id: string;
  type: string;
  name: string;
  email: string;
  status: string;
  created_at: string;
}

interface RecentMember {
  id: string;
  full_name: string | null;
  email: string;
  tier: string | null;
  status: string | null;
  created_at: string;
}

const APP_TABLES = [
  { table: "applications", label: "Membership", nameCol: "full_name" },
  { table: "commerce_applications", label: "Commerce", nameCol: "contact_name" },
  { table: "service_applications", label: "Service", nameCol: "contact_name" },
  { table: "venture_proposals", label: "Venture", nameCol: "proposer_name" },
  { table: "cooperative_applications", label: "Cooperative", nameCol: "applicant_name" },
  { table: "asset_inquiries", label: "Asset", nameCol: "name" },
  { table: "certifications", label: "Certification", nameCol: "applicant_name" },
  { table: "card_requests", label: "Card Request", nameCol: "full_name" },
] as const;

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [recentApps, setRecentApps] = useState<RecentApp[]>([]);
  const [recentMembers, setRecentMembers] = useState<RecentMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      const [
        membersCount,
        pendingMembers,
        postsCount,
        rsvpsCount,
        transactionsThisMonth,
        announcementsCount,
        leadsCount,
        contactsCount,
        recentMembersRes,
      ] = await Promise.all([
        supabase.from("members").select("*", { count: "exact", head: true }),
        supabase.from("members").select("*", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("posts").select("*", { count: "exact", head: true }),
        supabase.from("event_rsvps").select("*", { count: "exact", head: true }),
        supabase
          .from("transactions")
          .select("amount")
          .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
        supabase.from("announcements").select("*", { count: "exact", head: true }),
        supabase.from("leads").select("*", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
        supabase
          .from("members")
          .select("id, full_name, email, tier, status, created_at")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      let pendingAppsTotal = 0;
      const recentAppsBuffer: RecentApp[] = [];
      for (const { table, label, nameCol } of APP_TABLES) {
        const [pendingRes, recentRes] = await Promise.all([
          supabase.from(table).select("*", { count: "exact", head: true }).eq("status", "pending"),
          supabase
            .from(table)
            .select(`id, ${nameCol}, email:contact_email, applicant_email, proposer_email, email, status, created_at`)
            .order("created_at", { ascending: false })
            .limit(3),
        ]);
        pendingAppsTotal += pendingRes.count ?? 0;
        (recentRes.data ?? []).forEach((row: Record<string, unknown>) => {
          recentAppsBuffer.push({
            id: String(row.id ?? ""),
            type: label,
            name: String(row[nameCol] ?? "—"),
            email: String(
              row.email ??
                row.contact_email ??
                row.applicant_email ??
                row.proposer_email ??
                "—"
            ),
            status: String(row.status ?? "pending"),
            created_at: String(row.created_at ?? ""),
          });
        });
      }

      const monthRevenue = (transactionsThisMonth.data ?? []).reduce(
        (sum: number, t: { amount: number | null }) => sum + Number(t.amount ?? 0),
        0
      );

      setStats([
        {
          label: "Total Members",
          value: membersCount.count ?? 0,
          href: "/portal/admin/members",
        },
        {
          label: "Pending Members",
          value: pendingMembers.count ?? 0,
          href: "/portal/admin/members",
          accent: (pendingMembers.count ?? 0) > 0 ? "warn" : "default",
        },
        {
          label: "Pending Applications",
          value: pendingAppsTotal,
          href: "/portal/admin/applications",
          accent: pendingAppsTotal > 0 ? "warn" : "default",
        },
        {
          label: "Revenue (Month)",
          value: monthRevenue > 0
            ? `$${monthRevenue.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
            : "$0",
          href: "/portal/admin/finances",
        },
        {
          label: "Event RSVPs",
          value: rsvpsCount.count ?? 0,
          href: "/portal/admin/rsvps",
        },
        {
          label: "Published Posts",
          value: postsCount.count ?? 0,
          href: "/portal/admin/posts",
        },
        {
          label: "Announcements",
          value: announcementsCount.count ?? 0,
          href: "/portal/admin/content",
        },
        {
          label: "Leads / Contacts",
          value: (leadsCount.count ?? 0) + (contactsCount.count ?? 0),
          href: "/portal/admin/applications",
        },
      ]);

      recentAppsBuffer.sort((a, b) => b.created_at.localeCompare(a.created_at));
      setRecentApps(recentAppsBuffer.slice(0, 6));
      setRecentMembers((recentMembersRes.data ?? []) as RecentMember[]);
      setLoading(false);
    }
    load();
  }, []);

  function formatDate(iso: string) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--gray-900)]">
          Admin Dashboard
        </h1>
        <p className="text-[var(--gray-500)] mt-1">
          Live overview of Sultanate operations
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {(loading ? Array(8).fill(null) : stats).map((stat, i) => (
          <Link
            key={stat?.label ?? i}
            href={stat?.href ?? "#"}
            className={`block bg-white p-4 rounded-xl border transition-all duration-300 hover:shadow-lg ${
              stat?.accent === "warn"
                ? "border-[var(--cherry-red)]/30 hover:border-[var(--cherry-red)] hover:shadow-[var(--cherry-red)]/5"
                : "border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-[var(--gold)]/5"
            }`}
          >
            <p className="text-xs text-[var(--gray-500)] mb-1">
              {stat?.label ?? "Loading"}
            </p>
            <p
              className={`text-2xl font-bold ${
                stat?.accent === "warn"
                  ? "text-[var(--cherry-red)]"
                  : "text-[var(--gray-900)]"
              }`}
            >
              {loading ? "…" : stat.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-[var(--gray-200)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[var(--gray-900)]">
              Recent Applications
            </h2>
            <Link
              href="/portal/admin/applications"
              className="text-xs font-medium text-[var(--cherry-red)] hover:underline"
            >
              View all &rarr;
            </Link>
          </div>
          {loading ? (
            <p className="text-center py-8 text-sm text-[var(--gray-400)]">Loading…</p>
          ) : recentApps.length === 0 ? (
            <p className="text-center py-8 text-sm text-[var(--gray-500)]">
              No applications yet
            </p>
          ) : (
            <ul className="divide-y divide-[var(--gray-100)]">
              {recentApps.map((app) => (
                <li key={`${app.type}-${app.id}`} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--gold-dark)] bg-[var(--gold)]/10 px-1.5 py-0.5 rounded">
                        {app.type}
                      </span>
                      <span
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                          app.status === "pending"
                            ? "bg-yellow-50 text-yellow-700"
                            : app.status === "approved" || app.status === "active"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-[var(--gray-900)] truncate">
                      {app.name}
                    </p>
                    <p className="text-xs text-[var(--gray-500)] truncate">{app.email}</p>
                  </div>
                  <span className="text-xs text-[var(--gray-400)] shrink-0">
                    {formatDate(app.created_at)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-xl border border-[var(--gray-200)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[var(--gray-900)]">
              Recent Members
            </h2>
            <Link
              href="/portal/admin/members"
              className="text-xs font-medium text-[var(--cherry-red)] hover:underline"
            >
              View all &rarr;
            </Link>
          </div>
          {loading ? (
            <p className="text-center py-8 text-sm text-[var(--gray-400)]">Loading…</p>
          ) : recentMembers.length === 0 ? (
            <p className="text-center py-8 text-sm text-[var(--gray-500)]">
              No members yet
            </p>
          ) : (
            <ul className="divide-y divide-[var(--gray-100)]">
              {recentMembers.map((m) => (
                <li key={m.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--gray-700)] bg-[var(--gray-100)] px-1.5 py-0.5 rounded">
                        {m.tier ?? "Associate"}
                      </span>
                      <span
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                          m.status === "active"
                            ? "bg-green-50 text-green-700"
                            : m.status === "pending"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {m.status ?? "pending"}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-[var(--gray-900)] truncate">
                      {m.full_name ?? "—"}
                    </p>
                    <p className="text-xs text-[var(--gray-500)] truncate">{m.email}</p>
                  </div>
                  <span className="text-xs text-[var(--gray-400)] shrink-0">
                    {formatDate(m.created_at)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[var(--gray-200)] p-6">
        <h2 className="font-semibold text-[var(--gray-900)] mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/portal/admin/applications"
            className="px-4 py-2 text-sm bg-[var(--gold)] text-[var(--dark-bg)] rounded-md hover:bg-[var(--gold-light)] transition-colors"
          >
            Review Applications
          </Link>
          <Link
            href="/portal/admin/members"
            className="px-4 py-2 text-sm bg-[var(--dark-bg)] text-[var(--gold)] rounded-md hover:bg-[var(--dark-surface)] transition-colors"
          >
            Manage Members
          </Link>
          <Link
            href="/portal/admin/posts/new"
            className="px-4 py-2 text-sm border border-[var(--gray-300)] text-[var(--gray-700)] rounded-md hover:bg-[var(--gray-50)] transition-colors"
          >
            + New Post
          </Link>
          <Link
            href="/portal/admin/content"
            className="px-4 py-2 text-sm border border-[var(--gray-300)] text-[var(--gray-700)] rounded-md hover:bg-[var(--gray-50)] transition-colors"
          >
            Announcements
          </Link>
          <Link
            href="/portal/admin/finances"
            className="px-4 py-2 text-sm border border-[var(--gray-300)] text-[var(--gray-700)] rounded-md hover:bg-[var(--gray-50)] transition-colors"
          >
            Finances
          </Link>
          <Link
            href="/portal/admin/rsvps"
            className="px-4 py-2 text-sm border border-[var(--gray-300)] text-[var(--gray-700)] rounded-md hover:bg-[var(--gray-50)] transition-colors"
          >
            RSVPs
          </Link>
        </div>
      </div>
    </div>
  );
}
