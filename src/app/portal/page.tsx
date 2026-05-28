"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import type { User } from "@supabase/supabase-js";

interface MemberData {
  status?: string;
  tier?: string;
}

interface Announcement {
  id: string;
  title: string;
  body: string;
  created_at: string;
}

const DUES_LINK = "https://square.link/u/iFCGR159";

const tierOrder = ["Affiliate", "Community", "General", "Lead"];

const rankUpSteps: Record<string, string[]> = {
  Affiliate: [
    "Attend meetings consistently for 3 months",
    "Complete orientation study (sacred texts & Constitution)",
    "Apply for Community membership",
  ],
  Community: [
    "Demonstrate active involvement in community affairs",
    "Complete leadership training",
    "Organize a local chapter/temple body",
  ],
  General: [
    "Maintain an active chapter with regular attendance",
    "Secure a physical location for your body",
    "Receive leadership approval",
  ],
  Lead: [],
};

const nextEvent = {
  title: "Holy Day Meeting",
  schedule: "Every Friday",
  time: "7:30 PM CST",
};

export default function PortalDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [hasRsvpd, setHasRsvpd] = useState(false);

  useEffect(() => {
    async function init() {
      const supabase = createClient();
      const { data: authData } = await supabase.auth.getUser();
      const currentUser = authData.user;
      setUser(currentUser);

      if (currentUser) {
        supabase
          .from("members")
          .select("status, tier")
          .eq("id", currentUser.id)
          .single()
          .then(({ data: member }) => {
            if (member) setMemberData(member);
          });

        if (currentUser.email) {
          supabase
            .from("event_rsvps")
            .select("id")
            .eq("email", currentUser.email)
            .eq("event_name", "Holy Day Meeting")
            .limit(1)
            .then(({ data }) => {
              if (data && data.length > 0) setHasRsvpd(true);
            });
        }

        supabase
          .from("announcements")
          .select("id, title, body, created_at")
          .order("created_at", { ascending: false })
          .limit(3)
          .then(({ data }) => {
            if (data) setAnnouncements(data);
          });
      }
    }
    init();
  }, []);

  const displayName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Member";

  const memberStatus = memberData?.status || "Pending";
  const memberTier = memberData?.tier || "Affiliate";
  const isActive = memberStatus.toLowerCase() === "active";
  const tierIndex = tierOrder.indexOf(memberTier);
  const nextTier = tierIndex < tierOrder.length - 1 ? tierOrder[tierIndex + 1] : null;
  const steps = rankUpSteps[memberTier] || [];
  const hasDues = ["Community", "General", "Lead"].includes(memberTier);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--gray-900)]">
          Welcome, {displayName}
        </h1>
        <p className="text-[var(--gray-500)] mt-1">
          Your Member Portal
        </p>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-[var(--gray-200)]">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-[var(--gray-500)]">Status</p>
            <span className={`w-2 h-2 rounded-full ${isActive ? "bg-[var(--gold)]" : "bg-gray-300"}`} />
          </div>
          <p className={`text-lg font-bold ${isActive ? "text-[var(--gold)]" : "text-gray-400"}`}>
            {memberStatus}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[var(--gray-200)]">
          <p className="text-xs text-[var(--gray-500)] mb-1">Tier</p>
          <p className="text-lg font-bold text-[var(--gray-900)]">{memberTier}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[var(--gray-200)]">
          <p className="text-xs text-[var(--gray-500)] mb-1">Member Since</p>
          <p className="text-lg font-bold text-[var(--gray-900)]">
            {user?.created_at
              ? new Date(user.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long" })
              : "—"}
          </p>
        </div>
      </div>

      {/* ── Next Event + Dues ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-[var(--gray-200)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-[var(--dark-bg)] flex items-center justify-center">
              <svg className="w-5 h-5 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-[var(--gray-500)]">Next Event</p>
              <p className="font-semibold text-sm text-[var(--gray-900)]">{nextEvent.title}</p>
            </div>
          </div>
          <p className="text-xs text-[var(--gray-500)] mb-3">{nextEvent.schedule} &middot; {nextEvent.time}</p>
          {hasRsvpd ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--gold)]">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              RSVPd
            </span>
          ) : (
            <Link href="/portal/events" className="text-xs font-semibold text-[var(--gold)] hover:text-[var(--gold-dark)]">
              RSVP &rarr;
            </Link>
          )}
        </div>

        {hasDues ? (
          <div className="bg-white p-5 rounded-xl border border-[var(--gray-200)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--dark-bg)] flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-[var(--gray-500)]">Monthly Dues</p>
                <p className="font-semibold text-sm text-[var(--gray-900)]">$50/month</p>
              </div>
            </div>
            <a
              href={DUES_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-4 py-1.5 bg-[var(--gold)] text-[var(--dark-bg)] text-xs font-semibold rounded-lg hover:bg-[var(--gold-light)] transition-colors"
            >
              Pay Dues &rarr;
            </a>
          </div>
        ) : (
          <div className="bg-white p-5 rounded-xl border border-[var(--gray-200)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--dark-bg)] flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-[var(--gray-500)]">Monthly Dues</p>
                <p className="font-semibold text-sm text-[var(--gray-900)]">No dues at Affiliate tier</p>
              </div>
            </div>
            <p className="text-xs text-[var(--gray-500)]">
              Dues begin at Community tier ($50/month)
            </p>
          </div>
        )}
      </div>

      {/* ── Growth / Rank Up ── */}
      {nextTier && steps.length > 0 && (
        <div className="bg-white p-5 rounded-xl border border-[var(--gray-200)] mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-sm text-[var(--gray-900)]">
              Growth Path
            </h2>
            <span className="text-xs text-[var(--gold)] font-medium">
              {memberTier} &rarr; {nextTier}
            </span>
          </div>
          <div className="h-1.5 bg-[var(--gray-200)] rounded-full mb-4">
            <div
              className="h-full bg-[var(--gold)] rounded-full"
              style={{ width: `${((tierIndex + 1) / tierOrder.length) * 100}%` }}
            />
          </div>
          <ul className="space-y-2">
            {steps.map((step) => (
              <li key={step} className="flex items-start gap-2 text-xs text-[var(--gray-600)]">
                <span className="w-1 h-1 rounded-full bg-[var(--gold)] mt-1.5 shrink-0" />
                {step}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Announcements ── */}
      <div className="bg-white p-5 rounded-xl border border-[var(--gray-200)] mb-6">
        <h2 className="font-semibold text-sm text-[var(--gray-900)] mb-3">
          Announcements
        </h2>
        {announcements.length > 0 ? (
          <div className="space-y-3">
            {announcements.map((a) => (
              <div key={a.id} className="border-b border-[var(--gray-100)] last:border-0 pb-3 last:pb-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-[var(--gray-900)]">{a.title}</p>
                  <span className="text-[10px] text-[var(--gray-400)]">
                    {new Date(a.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-[var(--gray-500)] leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[var(--gray-400)] text-center py-4">
            No announcements yet
          </p>
        )}
      </div>

      {/* ── Quick Links ── */}
      <h2 className="font-semibold text-sm text-[var(--gray-900)] mb-3">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { href: "/portal/events", label: "Events" },
          { href: "/portal/status", label: "Status" },
          { href: "/portal/documents", label: "Documents" },
          { href: "/portal/resources", label: "Resources" },
          { href: "/apply/membership-card", label: "Card Request" },
          { href: "/contact", label: "Contact" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="p-3 text-center text-sm font-medium text-[var(--gray-700)] bg-white rounded-lg border border-[var(--gray-200)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
