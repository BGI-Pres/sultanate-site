"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";

interface Member {
  id: string;
  user_id: string | null;
  email: string;
  full_name: string | null;
  created_at: string;
  role: string | null;
  tier: string | null;
  status: string | null;
}

const TIERS = ["Associate", "Full Citizen", "Diplomatic"] as const;
const STATUSES = ["pending", "active", "suspended", "denied"] as const;
const ROLES = ["member", "admin"] as const;

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("members")
      .select("id, user_id, email, full_name, created_at, role, tier, status")
      .order("created_at", { ascending: false });
    setMembers((data as Member[]) ?? []);
    setLoading(false);
  }

  async function updateMember(
    id: string,
    patch: Partial<Pick<Member, "role" | "tier" | "status">>
  ) {
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from("members").update(patch).eq("id", id);
    if (error) {
      alert(`Update failed: ${error.message}`);
    } else {
      setMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...patch } : m))
      );
    }
    setSaving(false);
  }

  const filtered = members.filter((m) => {
    if (filterStatus !== "all" && m.status !== filterStatus) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      (m.full_name ?? "").toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--gray-900)]">Members</h1>
          <p className="text-[var(--gray-500)] mt-1">
            Manage roles, tiers, and membership status
          </p>
        </div>
        <div className="text-sm text-[var(--gray-500)]">
          {filtered.length} of {members.length}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input
          type="search"
          placeholder="Search by name or email…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 min-w-[200px] px-3 py-2 text-sm border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40 focus:border-transparent"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 text-sm border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40"
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[var(--gray-500)]">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-lg border border-[var(--gray-200)] p-8 text-center">
          <p className="text-[var(--gray-500)]">
            {query || filterStatus !== "all"
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
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">
                    Name
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">
                    Email
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">
                    Role
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">
                    Tier
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">
                    Joined
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-[var(--gray-700)]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((member) => {
                  const isEditing = editingId === member.id;
                  return (
                    <tr
                      key={member.id}
                      className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)]"
                    >
                      <td className="px-4 py-3 font-medium text-[var(--gray-900)]">
                        {member.full_name || "—"}
                      </td>
                      <td className="px-4 py-3 text-[var(--gray-500)]">
                        {member.email}
                      </td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <select
                            value={member.role ?? "member"}
                            onChange={(e) =>
                              updateMember(member.id, { role: e.target.value })
                            }
                            disabled={saving}
                            className="text-xs px-2 py-1 border border-[var(--gray-300)] rounded"
                          >
                            {ROLES.map((r) => (
                              <option key={r} value={r}>
                                {r}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${
                              member.role === "admin"
                                ? "bg-[var(--cherry-red)]/10 text-[var(--cherry-red)]"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {member.role ?? "member"}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <select
                            value={member.tier ?? "Associate"}
                            onChange={(e) =>
                              updateMember(member.id, { tier: e.target.value })
                            }
                            disabled={saving}
                            className="text-xs px-2 py-1 border border-[var(--gray-300)] rounded"
                          >
                            {TIERS.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-[var(--gold)]/10 text-[var(--gold-dark)]">
                            {member.tier ?? "Associate"}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <select
                            value={member.status ?? "pending"}
                            onChange={(e) =>
                              updateMember(member.id, { status: e.target.value })
                            }
                            disabled={saving}
                            className="text-xs px-2 py-1 border border-[var(--gray-300)] rounded"
                          >
                            {STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${
                              member.status === "active"
                                ? "bg-green-50 text-green-700"
                                : member.status === "pending"
                                ? "bg-yellow-50 text-yellow-700"
                                : member.status === "suspended" || member.status === "denied"
                                ? "bg-red-50 text-red-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {member.status ?? "pending"}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-[var(--gray-500)]">
                        {new Date(member.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() =>
                            setEditingId(isEditing ? null : member.id)
                          }
                          className="text-xs font-medium text-[var(--cherry-red)] hover:underline"
                        >
                          {isEditing ? "Done" : "Edit"}
                        </button>
                      </td>
                    </tr>
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
