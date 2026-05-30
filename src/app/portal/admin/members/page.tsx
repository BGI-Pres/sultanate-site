"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase-client";

interface Member {
  id: string;
  user_id: string | null;
  email: string;
  full_name: string | null;
  phone: string | null;
  notes: string | null;
  created_at: string;
  role: string | null;
  tier: string | null;
  status: string | null;
}

interface ApplicationRow {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  occupation: string | null;
  employer: string | null;
  business_name: string | null;
  surname_preference: string | null;
  statement_of_intent: string | null;
  how_heard: string | null;
  moorish_status: string | null;
  lineage: string | null;
  prior_affiliations: string | null;
  identification_duration: string | null;
  skills: string | null;
  constitution_read: string | null;
  affirm_principles: boolean | null;
  can_attend_assemblies: boolean | null;
  can_pay_dues: boolean | null;
  can_participate: boolean | null;
  emergency_name: string | null;
  emergency_phone: string | null;
  emergency_relationship: string | null;
  reference_name: string | null;
  reference_phone: string | null;
  reference_email: string | null;
  reference_relationship: string | null;
  status: string | null;
  created_at: string;
}

const TIERS = ["Affiliate", "Community", "General", "Lead"] as const;
const STATUSES = ["pending", "active", "suspended", "denied"] as const;
const ROLES = ["member", "admin"] as const;
const PAGE_SIZE = 25;

type SortKey = "name" | "email" | "tier" | "status" | "joined";
type SortDir = "asc" | "desc";

const tierClass: Record<string, string> = {
  Affiliate: "bg-gray-100 text-gray-700",
  Community: "bg-[var(--gold)]/15 text-[var(--gold-dark)]",
  General: "bg-blue-50 text-blue-700",
  Lead: "bg-purple-50 text-purple-700",
};

const statusClass: Record<string, string> = {
  active: "bg-green-50 text-green-700",
  pending: "bg-yellow-50 text-yellow-700",
  suspended: "bg-red-50 text-red-700",
  denied: "bg-red-50 text-red-700",
};

/* ─── CSV helpers ─────────────────────────────────────────── */
function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

function downloadCsv(rows: Member[]) {
  const header = ["full_name", "email", "phone", "role", "tier", "status", "joined", "notes"];
  const lines = [
    header.join(","),
    ...rows.map((m) =>
      [
        m.full_name,
        m.email,
        m.phone,
        m.role,
        m.tier,
        m.status,
        new Date(m.created_at).toISOString(),
        m.notes,
      ]
        .map(csvEscape)
        .join(","),
    ),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `members-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ─── Page ─────────────────────────────────────────── */
export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterTier, setFilterTier] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("joined");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [detailMember, setDetailMember] = useState<Member | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [toast, setToast] = useState<{ msg: string; kind: "ok" | "err" } | null>(null);

  function flash(msg: string, kind: "ok" | "err" = "ok") {
    setToast({ msg, kind });
    setTimeout(() => setToast(null), 3500);
  }

  async function loadMembers() {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("members")
      .select(
        "id, user_id, email, full_name, phone, notes, created_at, role, tier, status",
      )
      .order("created_at", { ascending: false });
    if (error) {
      flash(`Failed to load members: ${error.message}`, "err");
    }
    setMembers((data as Member[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
    loadMembers();
  }, []);

  function resetPaging() {
    setPage(1);
    setSelectedIds(new Set());
  }

  /* ─── Filter + sort + paginate ─── */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return members.filter((m) => {
      if (filterStatus !== "all" && m.status !== filterStatus) return false;
      if (filterTier !== "all" && m.tier !== filterTier) return false;
      if (filterRole !== "all" && m.role !== filterRole) return false;
      if (!q) return true;
      return (
        (m.full_name ?? "").toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        (m.phone ?? "").toLowerCase().includes(q)
      );
    });
  }, [members, query, filterStatus, filterTier, filterRole]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      switch (sortKey) {
        case "name":
          return ((a.full_name ?? "") > (b.full_name ?? "") ? 1 : -1) * dir;
        case "email":
          return (a.email > b.email ? 1 : -1) * dir;
        case "tier":
          return ((a.tier ?? "") > (b.tier ?? "") ? 1 : -1) * dir;
        case "status":
          return ((a.status ?? "") > (b.status ?? "") ? 1 : -1) * dir;
        case "joined":
        default:
          return (a.created_at > b.created_at ? 1 : -1) * dir;
      }
    });
    return copy;
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir(key === "joined" ? "desc" : "asc");
    }
  }

  /* ─── Selection ─── */
  function toggleRow(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAllOnPage() {
    setSelectedIds((prev) => {
      const pageIds = pageRows.map((m) => m.id);
      const allOn = pageIds.every((id) => prev.has(id));
      const next = new Set(prev);
      if (allOn) pageIds.forEach((id) => next.delete(id));
      else pageIds.forEach((id) => next.add(id));
      return next;
    });
  }

  /* ─── Writes ─── */
  async function bulkPatch(patch: Partial<Pick<Member, "status" | "tier" | "role">>) {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    const supabase = createClient();
    // Optimistic update
    setMembers((prev) => prev.map((m) => (selectedIds.has(m.id) ? { ...m, ...patch } : m)));
    const { error } = await supabase.from("members").update(patch).in("id", ids);
    if (error) {
      flash(`Bulk update failed: ${error.message}`, "err");
      await loadMembers();
      return;
    }
    flash(`Updated ${ids.length} member${ids.length === 1 ? "" : "s"}`);
    setSelectedIds(new Set());
  }

  async function patchOne(id: string, patch: Partial<Member>) {
    const supabase = createClient();
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
    if (detailMember?.id === id) setDetailMember({ ...detailMember, ...patch } as Member);
    const { error } = await supabase.from("members").update(patch).eq("id", id);
    if (error) {
      flash(`Save failed: ${error.message}`, "err");
      await loadMembers();
      return false;
    }
    return true;
  }

  async function deleteMember(id: string) {
    const supabase = createClient();
    const { error } = await supabase.from("members").delete().eq("id", id);
    if (error) {
      flash(`Delete failed: ${error.message}`, "err");
      return false;
    }
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setDetailMember(null);
    flash("Member deleted");
    return true;
  }

  async function createMember(input: {
    full_name: string;
    email: string;
    phone?: string;
    tier: string;
    status: string;
    role: string;
    notes?: string;
  }) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("members")
      .insert({
        full_name: input.full_name,
        email: input.email,
        phone: input.phone || null,
        tier: input.tier,
        status: input.status,
        role: input.role,
        notes: input.notes || null,
      })
      .select()
      .single();
    if (error) {
      flash(`Create failed: ${error.message}`, "err");
      return false;
    }
    setMembers((prev) => [data as Member, ...prev]);
    flash("Member added");
    return true;
  }

  /* ─── Render ─── */
  const pageSelectedCount = pageRows.filter((m) => selectedIds.has(m.id)).length;
  const allOnPageSelected = pageRows.length > 0 && pageSelectedCount === pageRows.length;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--gray-900)]">Members</h1>
          <p className="text-[var(--gray-500)] mt-1 text-sm">
            Manage roles, tiers, status, and contact details
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => downloadCsv(sorted)}
            disabled={sorted.length === 0}
            className="text-sm px-3 py-2 rounded-md border border-[var(--gray-300)] text-[var(--gray-700)] hover:bg-white disabled:opacity-50"
          >
            Export CSV
          </button>
          <button
            onClick={() => setAddOpen(true)}
            className="text-sm px-3 py-2 rounded-md bg-[var(--dark-bg)] text-[var(--gold)] hover:bg-black"
          >
            + Add Member
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <input
          type="search"
          placeholder="Search name, email, phone…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            resetPaging();
          }}
          className="flex-1 min-w-[220px] px-3 py-2 text-sm border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40"
        />
        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            resetPaging();
          }}
          className="px-3 py-2 text-sm border border-[var(--gray-300)] rounded-md"
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={filterTier}
          onChange={(e) => {
            setFilterTier(e.target.value);
            resetPaging();
          }}
          className="px-3 py-2 text-sm border border-[var(--gray-300)] rounded-md"
        >
          <option value="all">All tiers</option>
          {TIERS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          value={filterRole}
          onChange={(e) => {
            setFilterRole(e.target.value);
            resetPaging();
          }}
          className="px-3 py-2 text-sm border border-[var(--gray-300)] rounded-md"
        >
          <option value="all">All roles</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <div className="ml-auto text-xs text-[var(--gray-500)]">
          {sorted.length} of {members.length}
        </div>
      </div>

      {/* Bulk action bar */}
      {selectedIds.size > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-3 px-3 py-2 rounded-md bg-[var(--dark-bg)] text-white">
          <span className="text-sm">{selectedIds.size} selected</span>
          <div className="h-4 w-px bg-white/20 mx-2" />
          <button
            onClick={() => bulkPatch({ status: "active" })}
            className="text-xs px-2 py-1 rounded bg-green-600 hover:bg-green-700"
          >
            Approve
          </button>
          <button
            onClick={() => bulkPatch({ status: "suspended" })}
            className="text-xs px-2 py-1 rounded bg-red-600 hover:bg-red-700"
          >
            Suspend
          </button>
          <select
            onChange={(e) => {
              if (e.target.value) {
                bulkPatch({ tier: e.target.value });
                e.target.value = "";
              }
            }}
            defaultValue=""
            className="text-xs px-2 py-1 rounded text-[var(--gray-900)]"
          >
            <option value="" disabled>
              Set tier…
            </option>
            {TIERS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <button
            onClick={() => setSelectedIds(new Set())}
            className="text-xs px-2 py-1 rounded text-white/70 hover:text-white ml-auto"
          >
            Clear
          </button>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-center py-12 text-[var(--gray-500)]">Loading…</div>
      ) : sorted.length === 0 ? (
        <div className="bg-white rounded-lg border border-[var(--gray-200)] p-8 text-center">
          <p className="text-[var(--gray-500)]">
            {query || filterStatus !== "all" || filterTier !== "all" || filterRole !== "all"
              ? "No matches for those filters."
              : "No members yet."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-[var(--gray-200)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
                  <th className="px-3 py-3 w-10">
                    <input
                      type="checkbox"
                      checked={allOnPageSelected}
                      onChange={toggleAllOnPage}
                    />
                  </th>
                  <SortHeader label="Name" k="name" sortKey={sortKey} sortDir={sortDir} onClick={toggleSort} />
                  <SortHeader label="Email" k="email" sortKey={sortKey} sortDir={sortDir} onClick={toggleSort} />
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">Role</th>
                  <SortHeader label="Tier" k="tier" sortKey={sortKey} sortDir={sortDir} onClick={toggleSort} />
                  <SortHeader label="Status" k="status" sortKey={sortKey} sortDir={sortDir} onClick={toggleSort} />
                  <SortHeader label="Joined" k="joined" sortKey={sortKey} sortDir={sortDir} onClick={toggleSort} />
                </tr>
              </thead>
              <tbody>
                {pageRows.map((m) => (
                  <tr
                    key={m.id}
                    className={`border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] cursor-pointer ${
                      selectedIds.has(m.id) ? "bg-[var(--gold)]/5" : ""
                    }`}
                    onClick={() => setDetailMember(m)}
                  >
                    <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedIds.has(m.id)}
                        onChange={() => toggleRow(m.id)}
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-[var(--gray-900)]">
                      {m.full_name || "—"}
                    </td>
                    <td className="px-4 py-3 text-[var(--gray-500)]">{m.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          m.role === "admin"
                            ? "bg-[var(--cherry-red)]/10 text-[var(--cherry-red)]"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {m.role ?? "member"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          tierClass[m.tier ?? ""] ?? "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {m.tier ?? "Affiliate"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          statusClass[m.status ?? ""] ?? "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {m.status ?? "pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--gray-500)] whitespace-nowrap">
                      {new Date(m.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--gray-200)] text-sm">
              <span className="text-[var(--gray-500)]">
                Page {safePage} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(Math.max(1, safePage - 1))}
                  disabled={safePage === 1}
                  className="px-3 py-1 rounded border border-[var(--gray-300)] disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, safePage + 1))}
                  disabled={safePage === totalPages}
                  className="px-3 py-1 rounded border border-[var(--gray-300)] disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Detail drawer */}
      {detailMember && (
        <MemberDrawer
          member={detailMember}
          onClose={() => setDetailMember(null)}
          onSave={patchOne}
          onDelete={deleteMember}
        />
      )}

      {/* Add member modal */}
      {addOpen && (
        <AddMemberModal
          onClose={() => setAddOpen(false)}
          onCreate={createMember}
        />
      )}

      {/* Toast */}
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

/* ─── Sortable header cell ─── */
function SortHeader({
  label,
  k,
  sortKey,
  sortDir,
  onClick,
}: {
  label: string;
  k: SortKey;
  sortKey: SortKey;
  sortDir: SortDir;
  onClick: (k: SortKey) => void;
}) {
  const active = sortKey === k;
  return (
    <th
      onClick={() => onClick(k)}
      className="text-left px-4 py-3 font-medium text-[var(--gray-700)] cursor-pointer select-none hover:text-[var(--gray-900)]"
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {active && <span className="text-[10px]">{sortDir === "asc" ? "▲" : "▼"}</span>}
      </span>
    </th>
  );
}

/* ─── Detail drawer ─── */
function MemberDrawer({
  member,
  onClose,
  onSave,
  onDelete,
}: {
  member: Member;
  onClose: () => void;
  onSave: (id: string, patch: Partial<Member>) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
}) {
  const [draft, setDraft] = useState({
    full_name: member.full_name ?? "",
    email: member.email,
    phone: member.phone ?? "",
    notes: member.notes ?? "",
    role: member.role ?? "member",
    tier: member.tier ?? "Affiliate",
    status: member.status ?? "pending",
  });
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [app, setApp] = useState<ApplicationRow | null>(null);
  const [appLoading, setAppLoading] = useState(false);

  useEffect(() => {
    // Look up linked application if available
    async function loadApp() {
      setAppLoading(true);
      const supabase = createClient();
      let query = supabase.from("applications").select("*").limit(1);
      if (member.user_id) {
        query = query.eq("user_id", member.user_id);
      } else {
        query = query.eq("email", member.email);
      }
      const { data } = await query.maybeSingle();
      setApp((data as ApplicationRow | null) ?? null);
      setAppLoading(false);
    }
    loadApp();
  }, [member.id, member.user_id, member.email]);

  const dirty =
    draft.full_name !== (member.full_name ?? "") ||
    draft.email !== member.email ||
    draft.phone !== (member.phone ?? "") ||
    draft.notes !== (member.notes ?? "") ||
    draft.role !== (member.role ?? "member") ||
    draft.tier !== (member.tier ?? "Affiliate") ||
    draft.status !== (member.status ?? "pending");

  async function handleSave() {
    setSaving(true);
    const patch: Partial<Member> = {
      full_name: draft.full_name || null,
      email: draft.email,
      phone: draft.phone || null,
      notes: draft.notes || null,
      role: draft.role,
      tier: draft.tier,
      status: draft.status,
    };
    const ok = await onSave(member.id, patch);
    setSaving(false);
    if (ok) onClose();
  }

  async function handleDelete() {
    setSaving(true);
    await onDelete(member.id);
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <aside className="w-full max-w-xl bg-white shadow-2xl flex flex-col overflow-hidden">
        <header className="px-6 py-4 border-b border-[var(--gray-200)] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--gray-900)]">
              {member.full_name || member.email}
            </h2>
            <p className="text-xs text-[var(--gray-500)] mt-0.5">Member detail</p>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--gray-500)] hover:text-[var(--gray-900)] text-xl leading-none"
          >
            ×
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Editable section */}
          <section>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[var(--gray-500)] mb-3">
              Membership record
            </h3>
            <div className="space-y-3">
              <Field label="Full name">
                <input
                  value={draft.full_name}
                  onChange={(e) => setDraft({ ...draft, full_name: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  value={draft.email}
                  onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Phone">
                <input
                  value={draft.phone}
                  onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <div className="grid grid-cols-3 gap-3">
                <Field label="Role">
                  <select
                    value={draft.role}
                    onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                    className={inputCls}
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Tier">
                  <select
                    value={draft.tier}
                    onChange={(e) => setDraft({ ...draft, tier: e.target.value })}
                    className={inputCls}
                  >
                    {TIERS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Status">
                  <select
                    value={draft.status}
                    onChange={(e) => setDraft({ ...draft, status: e.target.value })}
                    className={inputCls}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="Admin notes">
                <textarea
                  value={draft.notes}
                  onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
                  rows={3}
                  placeholder="Internal notes — visible only to admins"
                  className={inputCls}
                />
              </Field>
            </div>
          </section>

          {/* Read-only application context */}
          <section>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[var(--gray-500)] mb-3">
              Linked application
            </h3>
            {appLoading ? (
              <p className="text-sm text-[var(--gray-500)]">Loading…</p>
            ) : !app ? (
              <p className="text-sm text-[var(--gray-500)] italic">
                No application on file for this member.
              </p>
            ) : (
              <div className="bg-[var(--gray-50)] rounded-md border border-[var(--gray-200)] p-4 text-xs space-y-2">
                <ReadField label="Submitted" value={new Date(app.created_at).toLocaleString()} />
                <ReadField label="Application status" value={app.status} />
                <ReadField label="Surname preference" value={app.surname_preference} />
                <ReadField label="Phone" value={app.phone} />
                <ReadField
                  label="Address"
                  value={[app.address, app.city, app.state, app.zip].filter(Boolean).join(", ")}
                />
                <ReadField label="Occupation" value={app.occupation} />
                <ReadField label="Employer" value={app.employer} />
                <ReadField label="Business" value={app.business_name} />
                <ReadField label="Moorish status" value={app.moorish_status} />
                <ReadField label="Lineage" value={app.lineage} />
                <ReadField label="Prior affiliations" value={app.prior_affiliations} />
                <ReadField label="Identified for" value={app.identification_duration} />
                <ReadField label="Skills" value={app.skills} />
                <ReadField label="How heard" value={app.how_heard} />
                <ReadField label="Constitution read" value={app.constitution_read} />
                <ReadField
                  label="Affirms 5 principles"
                  value={app.affirm_principles ? "Yes" : "No"}
                />
                <ReadField
                  label="Statement of intent"
                  value={app.statement_of_intent}
                  multiline
                />
                <ReadField
                  label="Commitments"
                  value={
                    [
                      app.can_attend_assemblies && "Assemblies",
                      app.can_pay_dues && "Dues",
                      app.can_participate && "Participate",
                    ]
                      .filter(Boolean)
                      .join(" · ") || "—"
                  }
                />
                <ReadField
                  label="Emergency contact"
                  value={[app.emergency_name, app.emergency_phone, app.emergency_relationship]
                    .filter(Boolean)
                    .join(" · ")}
                />
                <ReadField
                  label="Reference"
                  value={[app.reference_name, app.reference_phone, app.reference_email, app.reference_relationship]
                    .filter(Boolean)
                    .join(" · ")}
                />
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-[var(--gray-200)] flex items-center justify-between gap-3">
          {confirmDelete ? (
            <>
              <span className="text-xs text-[var(--cherry-red)]">Delete this member?</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setConfirmDelete(false)}
                  disabled={saving}
                  className="text-sm px-3 py-2 rounded-md border border-[var(--gray-300)]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={saving}
                  className="text-sm px-3 py-2 rounded-md bg-[var(--cherry-red)] text-white"
                >
                  Confirm delete
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setConfirmDelete(true)}
                disabled={saving}
                className="text-sm text-[var(--cherry-red)] hover:underline"
              >
                Delete member
              </button>
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="text-sm px-3 py-2 rounded-md border border-[var(--gray-300)]"
                >
                  Close
                </button>
                <button
                  onClick={handleSave}
                  disabled={!dirty || saving}
                  className="text-sm px-3 py-2 rounded-md bg-[var(--dark-bg)] text-[var(--gold)] disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Save changes"}
                </button>
              </div>
            </>
          )}
        </footer>
      </aside>
    </div>
  );
}

/* ─── Add member modal ─── */
function AddMemberModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (input: {
    full_name: string;
    email: string;
    phone?: string;
    tier: string;
    status: string;
    role: string;
    notes?: string;
  }) => Promise<boolean>;
}) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    tier: "Affiliate",
    status: "active",
    role: "member",
    notes: "",
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  async function handleCreate() {
    if (!form.email.trim()) {
      setErr("Email is required.");
      return;
    }
    setErr("");
    setSaving(true);
    const ok = await onCreate({
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      tier: form.tier,
      status: form.status,
      role: form.role,
      notes: form.notes.trim() || undefined,
    });
    setSaving(false);
    if (ok) onClose();
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
        <header className="px-6 py-4 border-b border-[var(--gray-200)] flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--gray-900)]">Add member</h2>
          <button
            onClick={onClose}
            className="text-[var(--gray-500)] hover:text-[var(--gray-900)] text-xl leading-none"
          >
            ×
          </button>
        </header>

        <div className="px-6 py-5 space-y-3">
          <Field label="Full name">
            <input
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              className={inputCls}
            />
          </Field>
          <Field label="Email *">
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputCls}
            />
          </Field>
          <Field label="Phone">
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputCls}
            />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Role">
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className={inputCls}
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Tier">
              <select
                value={form.tier}
                onChange={(e) => setForm({ ...form, tier: e.target.value })}
                className={inputCls}
              >
                {TIERS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Status">
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className={inputCls}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Notes">
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className={inputCls}
            />
          </Field>
          {err && <p className="text-xs text-[var(--cherry-red)]">{err}</p>}
          <p className="text-xs text-[var(--gray-500)]">
            Creates a member record without a linked auth account. When the person signs in with
            this email, they can be linked to the record from this page.
          </p>
        </div>

        <footer className="px-6 py-4 border-t border-[var(--gray-200)] flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-sm px-3 py-2 rounded-md border border-[var(--gray-300)]"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={saving}
            className="text-sm px-3 py-2 rounded-md bg-[var(--dark-bg)] text-[var(--gold)] disabled:opacity-50"
          >
            {saving ? "Adding…" : "Add member"}
          </button>
        </footer>
      </div>
    </div>
  );
}

/* ─── Tiny field wrappers ─── */
const inputCls =
  "w-full px-3 py-2 text-sm border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-[var(--gray-700)] mb-1">{label}</span>
      {children}
    </label>
  );
}

function ReadField({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string | null | undefined;
  multiline?: boolean;
}) {
  if (!value) return null;
  return (
    <div className={multiline ? "" : "flex gap-2"}>
      <span className="text-[var(--gray-500)] shrink-0">{label}:</span>
      <span className="text-[var(--gray-900)] whitespace-pre-wrap break-words">{value}</span>
    </div>
  );
}
