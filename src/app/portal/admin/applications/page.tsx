"use client";

import { Fragment, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";

type TabKey =
  | "applications"
  | "commerce_applications"
  | "service_applications"
  | "venture_proposals"
  | "cooperative_applications"
  | "asset_inquiries"
  | "certifications"
  | "card_requests";

interface TabDef {
  key: TabKey;
  label: string;
  nameCol: string;
  emailCol: string;
  extraCol?: { key: string; label: string };
}

const TABS: TabDef[] = [
  { key: "applications", label: "Membership", nameCol: "full_name", emailCol: "email" },
  { key: "commerce_applications", label: "Commerce", nameCol: "contact_name", emailCol: "contact_email", extraCol: { key: "business_name", label: "Business" } },
  { key: "service_applications", label: "Service", nameCol: "contact_name", emailCol: "contact_email", extraCol: { key: "provider_name", label: "Provider" } },
  { key: "venture_proposals", label: "Venture", nameCol: "proposer_name", emailCol: "proposer_email", extraCol: { key: "proposal_name", label: "Proposal" } },
  { key: "cooperative_applications", label: "Cooperative", nameCol: "applicant_name", emailCol: "applicant_email", extraCol: { key: "venture_name", label: "Venture" } },
  { key: "asset_inquiries", label: "Asset", nameCol: "name", emailCol: "email", extraCol: { key: "inquiry_type", label: "Type" } },
  { key: "certifications", label: "Certification", nameCol: "applicant_name", emailCol: "applicant_email", extraCol: { key: "business_name", label: "Business" } },
  { key: "card_requests", label: "Card Request", nameCol: "full_name", emailCol: "email", extraCol: { key: "membership_tier", label: "Tier" } },
];

const STATUSES = ["pending", "approved", "rejected", "in_review", "completed"] as const;

type Row = Record<string, unknown> & {
  id: string;
  status: string | null;
  created_at: string;
};

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("applications");
  const [counts, setCounts] = useState<Record<TabKey, { total: number; pending: number }>>(
    {} as Record<TabKey, { total: number; pending: number }>
  );
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    loadCounts();
  }, []);

  useEffect(() => {
    loadRows();
    setExpandedId(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  async function loadCounts() {
    const supabase = createClient();
    const results = await Promise.all(
      TABS.map(async (t) => {
        const [totalRes, pendingRes] = await Promise.all([
          supabase.from(t.key).select("*", { count: "exact", head: true }),
          supabase
            .from(t.key)
            .select("*", { count: "exact", head: true })
            .eq("status", "pending"),
        ]);
        return [t.key, { total: totalRes.count ?? 0, pending: pendingRes.count ?? 0 }] as const;
      })
    );
    setCounts(Object.fromEntries(results) as Record<TabKey, { total: number; pending: number }>);
  }

  async function loadRows() {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from(activeTab)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    setRows((data as Row[]) ?? []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    setSavingId(id);
    const supabase = createClient();
    const { error } = await supabase
      .from(activeTab)
      .update({ status })
      .eq("id", id);
    if (!error) {
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      loadCounts();
    }
    setSavingId(null);
  }

  const activeDef = TABS.find((t) => t.key === activeTab)!;
  const filtered = rows.filter(
    (r) => statusFilter === "all" || r.status === statusFilter
  );

  function formatDate(iso: string) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function statusBadge(status: string | null) {
    const s = status ?? "pending";
    const classes: Record<string, string> = {
      pending: "bg-yellow-50 text-yellow-700",
      approved: "bg-green-50 text-green-700",
      completed: "bg-green-50 text-green-700",
      in_review: "bg-blue-50 text-blue-700",
      rejected: "bg-red-50 text-red-700",
    };
    return (
      <span
        className={`text-xs font-medium px-2 py-1 rounded-full ${
          classes[s] ?? "bg-gray-100 text-gray-600"
        }`}
      >
        {s}
      </span>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--gray-900)]">Applications</h1>
        <p className="text-[var(--gray-500)] mt-1">
          Unified inbox for every submission type
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 border-b border-[var(--gray-200)] pb-3">
        {TABS.map((tab) => {
          const c = counts[tab.key];
          const isActive = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[var(--dark-bg)] text-[var(--gold)]"
                  : "bg-[var(--gray-100)] text-[var(--gray-700)] hover:bg-[var(--gray-200)]"
              }`}
            >
              {tab.label}
              {c?.total ? (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-[var(--gold)]/20 text-[var(--gold)]"
                      : "bg-white text-[var(--gray-500)]"
                  }`}
                >
                  {c.total}
                </span>
              ) : null}
              {c?.pending ? (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--cherry-red)]/15 text-[var(--cherry-red)] font-semibold">
                  {c.pending}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40"
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <span className="text-sm text-[var(--gray-500)]">
          {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[var(--gray-500)]">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-lg border border-[var(--gray-200)] p-8 text-center">
          <p className="text-[var(--gray-500)]">
            {statusFilter === "all"
              ? `No ${activeDef.label.toLowerCase()} submissions yet.`
              : `No ${statusFilter} submissions.`}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-[var(--gray-200)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">Email</th>
                  {activeDef.extraCol && (
                    <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">
                      {activeDef.extraCol.label}
                    </th>
                  )}
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">Submitted</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">Status</th>
                  <th className="text-right px-4 py-3 font-medium text-[var(--gray-700)]">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => {
                  const isExpanded = expandedId === row.id;
                  return (
                    <Fragment key={row.id}>
                      <tr
                        className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] cursor-pointer"
                        onClick={() => setExpandedId(isExpanded ? null : row.id)}
                      >
                        <td className="px-4 py-3 font-medium text-[var(--gray-900)]">
                          {String(row[activeDef.nameCol] ?? "—")}
                        </td>
                        <td className="px-4 py-3 text-[var(--gray-500)]">
                          {String(row[activeDef.emailCol] ?? "—")}
                        </td>
                        {activeDef.extraCol && (
                          <td className="px-4 py-3 text-[var(--gray-700)]">
                            {String(row[activeDef.extraCol.key] ?? "—")}
                          </td>
                        )}
                        <td className="px-4 py-3 text-[var(--gray-500)]">
                          {formatDate(row.created_at)}
                        </td>
                        <td className="px-4 py-3">{statusBadge(row.status)}</td>
                        <td className="px-4 py-3 text-right">
                          <span className="text-xs text-[var(--cherry-red)] font-medium">
                            {isExpanded ? "Close" : "Open"}
                          </span>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="bg-[var(--gray-50)]">
                          <td
                            colSpan={5 + (activeDef.extraCol ? 1 : 0)}
                            className="px-4 py-4"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mb-4">
                              {Object.entries(row).map(([k, v]) => {
                                if (k === "id" || k === "status" || k === "created_at" || k === "updated_at") return null;
                                if (v === null || v === "" || v === undefined) return null;
                                return (
                                  <div key={k} className="text-xs">
                                    <span className="font-medium text-[var(--gray-700)] capitalize">
                                      {k.replace(/_/g, " ")}:
                                    </span>{" "}
                                    <span className="text-[var(--gray-600)]">
                                      {typeof v === "boolean"
                                        ? v
                                          ? "Yes"
                                          : "No"
                                        : String(v)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[var(--gray-200)]">
                              <span className="text-xs font-medium text-[var(--gray-700)]">
                                Set status:
                              </span>
                              {STATUSES.map((s) => (
                                <button
                                  key={s}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateStatus(row.id, s);
                                  }}
                                  disabled={savingId === row.id || row.status === s}
                                  className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                                    row.status === s
                                      ? "bg-[var(--gold)] text-[var(--dark-bg)] border-[var(--gold)] cursor-default"
                                      : "bg-white text-[var(--gray-700)] border-[var(--gray-300)] hover:bg-[var(--gray-50)]"
                                  } disabled:opacity-50`}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
