"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";

interface Member {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  role: string;
  tier: string;
  status: string;
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMembers() {
      const supabase = createClient();
      const { data } = await supabase
        .from("members")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setMembers(data as Member[]);
      }
      setLoading(false);
    }
    loadMembers();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--gray-900)]">Members</h1>
          <p className="text-[var(--gray-500)] mt-1">
            Manage citizen registrations and applications
          </p>
        </div>
        <div className="text-sm text-[var(--gray-500)]">
          {members.length} member{members.length !== 1 ? "s" : ""}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[var(--gray-500)]">
          Loading members...
        </div>
      ) : members.length === 0 ? (
        <div className="bg-white rounded-lg border border-[var(--gray-200)] p-8 text-center">
          <p className="text-[var(--gray-500)] mb-2">No members found.</p>
          <p className="text-sm text-[var(--gray-500)]">
            Create a <code className="bg-[var(--gray-100)] px-1 rounded">members</code> table
            in Supabase with columns: <code className="bg-[var(--gray-100)] px-1 rounded">id, email, full_name, created_at, role, tier, status</code>
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
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">Tier</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">Joined</th>
                  <th className="text-right px-4 py-3 font-medium text-[var(--gray-700)]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)]">
                    <td className="px-4 py-3 font-medium text-[var(--gray-900)]">
                      {member.full_name || "—"}
                    </td>
                    <td className="px-4 py-3 text-[var(--gray-500)]">{member.email}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-[var(--forest-green)]">
                        {member.tier || "Associate"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          member.status === "active"
                            ? "bg-green-50 text-green-700"
                            : member.status === "pending"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {member.status || "pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--gray-500)]">
                      {new Date(member.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-xs text-[var(--cherry-red)] hover:underline">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
