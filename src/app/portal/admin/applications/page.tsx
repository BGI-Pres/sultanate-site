"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { MEMBER_TIERS, tierPriceLabel } from "@/lib/tiers";

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
  reviewed_at?: string | null;
  reviewed_by?: string | null;
  decision_reason?: string | null;
};

type DecisionModalState =
  | { kind: "approve"; row: Row }
  | { kind: "reject"; row: Row }
  | null;

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("applications");
  const [counts, setCounts] = useState<Record<TabKey, { total: number; pending: number }>>(
    {} as Record<TabKey, { total: number; pending: number }>
  );
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  // Default to pending so decided applications (approved / rejected /
  // completed) drop out of the inbox view. The data is preserved in the DB —
  // admin can switch the filter to view decided items.
  const [statusFilter, setStatusFilter] = useState<string>("pending");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [decisionModal, setDecisionModal] = useState<DecisionModalState>(null);
  const [toast, setToast] = useState<{ msg: string; kind: "ok" | "err" } | null>(null);

  const flash = useCallback((msg: string, kind: "ok" | "err" = "ok") => {
    setToast({ msg, kind });
    setTimeout(() => setToast(null), 3500);
  }, []);

  useEffect(() => {
    loadCounts();
  }, []);

  useEffect(() => {
    loadRows();
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  /**
   * Decide a membership application: updates the application's status + audit
   * fields, syncs the matching members row (linking the user_id when an auth
   * user exists for that email), and fires the applicant + admin emails via
   * the /api/notify pipeline.
   */
  async function decideMembership(
    row: Row,
    decision: "approved" | "rejected",
    opts: { tier?: string; reason?: string },
  ) {
    setSavingId(row.id);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const applicantEmail = String(row.email ?? "").trim();
    const applicantName = String(row.full_name ?? "").trim();
    const reason = opts.reason?.trim() || null;
    const reviewedAt = new Date().toISOString();

    // 1. Persist the decision on the application.
    const { error: appErr } = await supabase
      .from("applications")
      .update({
        status: decision,
        reviewed_at: reviewedAt,
        reviewed_by: user?.id ?? null,
        decision_reason: reason,
      })
      .eq("id", row.id);

    if (appErr) {
      flash(`Application update failed: ${appErr.message}`, "err");
      setSavingId(null);
      return;
    }

    // 2. Sync the matching members row.
    if (applicantEmail) {
      const lowerEmail = applicantEmail.toLowerCase();
      const { data: existing } = await supabase
        .from("members")
        .select("id, status, tier, user_id")
        .ilike("email", lowerEmail)
        .maybeSingle();

      if (decision === "approved") {
        const newTier = opts.tier ?? "Community";
        if (existing) {
          await supabase
            .from("members")
            .update({
              status: "active",
              tier: newTier,
              full_name: applicantName || null,
            })
            .eq("id", existing.id);
        } else {
          await supabase.from("members").insert({
            email: lowerEmail,
            full_name: applicantName || null,
            tier: newTier,
            status: "active",
            role: "member",
          });
        }
      } else if (decision === "rejected" && existing) {
        await supabase
          .from("members")
          .update({ status: "denied" })
          .eq("id", existing.id);
      }
    }

    // 3. Notify applicant (and admin copy).
    if (applicantEmail) {
      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: decision === "approved" ? "membership_approved" : "membership_rejected",
          name: applicantName,
          email: applicantEmail,
          details: {
            tier: opts.tier ?? null,
            decision_reason: reason,
            application_id: row.id,
          },
        }),
      });
    }

    // 4. Update local state.
    setRows((prev) =>
      prev.map((r) =>
        r.id === row.id
          ? {
              ...r,
              status: decision,
              reviewed_at: reviewedAt,
              reviewed_by: user?.id ?? null,
              decision_reason: reason,
            }
          : r,
      ),
    );
    loadCounts();
    setSavingId(null);
    setDecisionModal(null);
    flash(decision === "approved" ? "Approved — welcome email sent" : "Rejected — applicant notified");
  }

  const activeDef = TABS.find((t) => t.key === activeTab)!;
  const filtered = rows.filter(
    (r) => statusFilter === "all" || r.status === statusFilter
  );
  const isMembershipTab = activeTab === "applications";

  function formatDate(iso: string | null | undefined) {
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
                                if (
                                  k === "id" ||
                                  k === "status" ||
                                  k === "created_at" ||
                                  k === "updated_at" ||
                                  k === "reviewed_at" ||
                                  k === "reviewed_by" ||
                                  k === "decision_reason"
                                )
                                  return null;
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

                            {/* Decision history for membership applications */}
                            {isMembershipTab && row.reviewed_at && (
                              <div className="mb-3 p-3 rounded-md bg-white border border-[var(--gray-200)] text-xs">
                                <div className="font-medium text-[var(--gray-700)]">
                                  Decided {formatDate(row.reviewed_at)}
                                </div>
                                {row.decision_reason && (
                                  <div className="mt-1 text-[var(--gray-600)]">
                                    <span className="font-medium">Reason:</span>{" "}
                                    {row.decision_reason}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Action row */}
                            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[var(--gray-200)]">
                              {isMembershipTab ? (
                                <MembershipActionRow
                                  row={row}
                                  saving={savingId === row.id}
                                  onApprove={() => setDecisionModal({ kind: "approve", row })}
                                  onReject={() => setDecisionModal({ kind: "reject", row })}
                                  onSetStatus={(s) => updateStatus(row.id, s)}
                                />
                              ) : (
                                <>
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
                                </>
                              )}
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

      {decisionModal?.kind === "approve" && (
        <ApproveModal
          row={decisionModal.row}
          onClose={() => setDecisionModal(null)}
          onConfirm={(tier) =>
            decideMembership(decisionModal.row, "approved", { tier })
          }
        />
      )}

      {decisionModal?.kind === "reject" && (
        <RejectModal
          row={decisionModal.row}
          onClose={() => setDecisionModal(null)}
          onConfirm={(reason) =>
            decideMembership(decisionModal.row, "rejected", { reason })
          }
        />
      )}

      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-md shadow-lg text-sm z-50 ${
            toast.kind === "ok" ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}

/* ─── Membership action row ─── */
function MembershipActionRow({
  row,
  saving,
  onApprove,
  onReject,
  onSetStatus,
}: {
  row: Row;
  saving: boolean;
  onApprove: () => void;
  onReject: () => void;
  onSetStatus: (s: string) => void;
}) {
  const status = row.status ?? "pending";
  const isDecided = status === "approved" || status === "rejected";

  return (
    <div className="flex flex-wrap items-center gap-2 w-full">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onApprove();
        }}
        disabled={saving}
        className="text-xs px-3 py-1.5 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50"
      >
        Approve
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onReject();
        }}
        disabled={saving}
        className="text-xs px-3 py-1.5 rounded-md bg-[var(--cherry-red)] text-white font-semibold hover:opacity-90 disabled:opacity-50"
      >
        Reject
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSetStatus("in_review");
        }}
        disabled={saving || status === "in_review"}
        className="text-xs px-3 py-1.5 rounded-md bg-white border border-[var(--gray-300)] text-[var(--gray-700)] hover:bg-[var(--gray-50)] disabled:opacity-50"
      >
        Mark in review
      </button>
      {isDecided && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSetStatus("pending");
          }}
          disabled={saving}
          className="text-xs px-3 py-1.5 rounded-md bg-white border border-[var(--gray-300)] text-[var(--gray-500)] hover:bg-[var(--gray-50)] disabled:opacity-50 ml-auto"
        >
          Reopen as pending
        </button>
      )}
    </div>
  );
}

/* ─── Approve modal: tier picker ─── */
function ApproveModal({
  row,
  onClose,
  onConfirm,
}: {
  row: Row;
  onClose: () => void;
  onConfirm: (tier: string) => void;
}) {
  const [tier, setTier] = useState<string>("Community");
  const [saving, setSaving] = useState(false);

  async function handleConfirm() {
    setSaving(true);
    await onConfirm(tier);
    // parent closes the modal on success
  }

  const name = String(row.full_name ?? row.email ?? "this applicant");

  return (
    <Modal title="Approve membership" onClose={onClose}>
      <p className="text-sm text-[var(--gray-700)] mb-4">
        Approve <strong>{name}</strong> and set their initial tier. The applicant
        will receive a welcome email; the matching members row will be created or
        updated to <code>active</code> at the chosen tier.
      </p>
      <label className="block">
        <span className="block text-xs font-medium text-[var(--gray-700)] mb-1">
          Initial tier
        </span>
        <select
          value={tier}
          onChange={(e) => setTier(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-[var(--gray-300)] rounded-md"
        >
          {MEMBER_TIERS.map((t) => (
            <option key={t.name} value={t.name}>
              {t.name} — {tierPriceLabel(t)}
            </option>
          ))}
        </select>
      </label>
      <ModalFooter>
        <button
          onClick={onClose}
          disabled={saving}
          className="text-sm px-3 py-2 rounded-md border border-[var(--gray-300)]"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          disabled={saving}
          className="text-sm px-3 py-2 rounded-md bg-green-600 text-white font-semibold disabled:opacity-50"
        >
          {saving ? "Approving…" : "Approve & send email"}
        </button>
      </ModalFooter>
    </Modal>
  );
}

/* ─── Reject modal: optional reason ─── */
function RejectModal({
  row,
  onClose,
  onConfirm,
}: {
  row: Row;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleConfirm() {
    setSaving(true);
    await onConfirm(reason);
  }

  const name = String(row.full_name ?? row.email ?? "this applicant");

  return (
    <Modal title="Reject membership" onClose={onClose}>
      <p className="text-sm text-[var(--gray-700)] mb-4">
        Reject <strong>{name}</strong>. The applicant will be emailed a polite
        rejection. Their members row (if any) will be set to <code>denied</code>.
      </p>
      <label className="block">
        <span className="block text-xs font-medium text-[var(--gray-700)] mb-1">
          Reason (optional, included in the email)
        </span>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          placeholder="Leave blank to send the generic message."
          className="w-full px-3 py-2 text-sm border border-[var(--gray-300)] rounded-md"
        />
      </label>
      <ModalFooter>
        <button
          onClick={onClose}
          disabled={saving}
          className="text-sm px-3 py-2 rounded-md border border-[var(--gray-300)]"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          disabled={saving}
          className="text-sm px-3 py-2 rounded-md bg-[var(--cherry-red)] text-white font-semibold disabled:opacity-50"
        >
          {saving ? "Rejecting…" : "Reject & send email"}
        </button>
      </ModalFooter>
    </Modal>
  );
}

/* ─── Modal shell ─── */
function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
        <header className="px-6 py-4 border-b border-[var(--gray-200)] flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--gray-900)]">{title}</h2>
          <button
            onClick={onClose}
            className="text-[var(--gray-500)] hover:text-[var(--gray-900)] text-xl leading-none"
          >
            ×
          </button>
        </header>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

function ModalFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-6 -mb-5 mt-5 px-6 py-4 border-t border-[var(--gray-200)] flex items-center justify-end gap-2 bg-[var(--gray-50)]">
      {children}
    </div>
  );
}
