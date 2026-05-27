"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";

interface Application {
  id: string;
  user_id: string | null;
  full_name: string;
  date_of_birth: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  phone: string | null;
  email: string;
  employer: string | null;
  occupation: string | null;
  business_name: string | null;
  surname_preference: string | null;
  statement_of_intent: string | null;
  how_heard: string | null;
  constitution_acknowledged: boolean;
  status: string;
  admin_notes: string | null;
  document_url: string | null;
  created_at: string;
}

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: "bg-yellow-900/30", text: "text-yellow-400", label: "Pending" },
  under_review: { bg: "bg-blue-900/30", text: "text-blue-400", label: "Under Review" },
  approved: { bg: "bg-green-900/30", text: "text-green-400", label: "Approved" },
  denied: { bg: "bg-red-900/30", text: "text-red-400", label: "Denied" },
};

function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || statusConfig.pending;
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [notesMap, setNotesMap] = useState<Record<string, string>>({});
  const [savingNotes, setSavingNotes] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    const supabase = createClient();
    const { data } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      setApplications(data as Application[]);
      const notes: Record<string, string> = {};
      for (const app of data as Application[]) {
        notes[app.id] = app.admin_notes || "";
      }
      setNotesMap(notes);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, newStatus: string) {
    setUpdatingStatus(id);
    const supabase = createClient();
    const { error } = await supabase
      .from("applications")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
    }
    setUpdatingStatus(null);
  }

  async function saveNotes(id: string) {
    setSavingNotes(id);
    const supabase = createClient();
    const { error } = await supabase
      .from("applications")
      .update({ admin_notes: notesMap[id] || "" })
      .eq("id", id);

    if (!error) {
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, admin_notes: notesMap[id] || "" } : app
        )
      );
    }
    setSavingNotes(null);
  }

  const pendingCount = applications.filter((a) => a.status === "pending").length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--gray-900)]">
            Applications
          </h1>
          <p className="text-[var(--gray-500)] mt-1">
            Review and manage membership applications
          </p>
        </div>
        {pendingCount > 0 && (
          <div className="flex items-center gap-2 bg-yellow-900/20 border border-yellow-600/30 px-4 py-2 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-sm font-semibold text-yellow-400">
              {pendingCount} pending
            </span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12 text-[var(--gray-500)]">
          Loading applications...
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-[var(--dark-bg)] rounded-xl border border-[var(--gold)]/10 p-8 text-center">
          <p className="text-white/50 mb-2">No applications found.</p>
          <p className="text-sm text-white/30">
            Applications submitted through the portal will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Table header */}
          <div className="hidden md:grid md:grid-cols-[1fr_1fr_0.7fr_0.7fr_0.7fr_0.5fr] gap-4 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--gold)] bg-[var(--dark-bg)] rounded-xl border border-[var(--gold)]/10">
            <span>Name</span>
            <span>Email</span>
            <span>Surname Pref</span>
            <span>Status</span>
            <span>Date</span>
            <span className="text-right">Actions</span>
          </div>

          {applications.map((app) => {
            const isExpanded = expandedId === app.id;
            return (
              <div
                key={app.id}
                className="bg-[var(--dark-bg)] rounded-xl border border-[var(--gold)]/10 overflow-hidden transition-all"
              >
                {/* Row */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_0.7fr_0.7fr_0.7fr_0.5fr] gap-2 md:gap-4 px-5 py-4 items-center">
                  <div className="font-medium text-white text-sm">
                    {app.full_name || "—"}
                  </div>
                  <div className="text-white/50 text-sm truncate">
                    {app.email}
                  </div>
                  <div className="text-white/70 text-sm">
                    {app.surname_preference || "—"}
                  </div>
                  <div>
                    <StatusBadge status={app.status} />
                  </div>
                  <div className="text-white/50 text-sm">
                    {new Date(app.created_at).toLocaleDateString()}
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() =>
                        setExpandedId(isExpanded ? null : app.id)
                      }
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[var(--gold)]/10 text-[var(--gold)] hover:bg-[var(--gold)]/20 transition-colors"
                    >
                      {isExpanded ? "Close" : "Review"}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-[var(--gold)]/10 px-5 py-6 space-y-6">
                    {/* Personal Information */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-px bg-[var(--gold)]" />
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                          Personal Information
                        </span>
                        <div className="flex-1 h-px bg-[var(--gold)]/10" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DetailField label="Full Name" value={app.full_name} />
                        <DetailField label="Date of Birth" value={app.date_of_birth} />
                        <DetailField label="Phone" value={app.phone} />
                        <DetailField label="Email" value={app.email} />
                        <DetailField
                          label="Address"
                          value={
                            [app.address, app.city, app.state, app.zip]
                              .filter(Boolean)
                              .join(", ") || null
                          }
                        />
                      </div>
                    </div>

                    {/* Employment Information */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-px bg-[var(--gold)]" />
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                          Employment Information
                        </span>
                        <div className="flex-1 h-px bg-[var(--gold)]/10" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DetailField label="Employer" value={app.employer} />
                        <DetailField label="Occupation" value={app.occupation} />
                        <DetailField label="Business Name" value={app.business_name} />
                      </div>
                    </div>

                    {/* Application Details */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-px bg-[var(--gold)]" />
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                          Application Details
                        </span>
                        <div className="flex-1 h-px bg-[var(--gold)]/10" />
                      </div>
                      <div className="space-y-4">
                        <DetailField label="Surname Preference" value={app.surname_preference} />
                        <div>
                          <span className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-1">
                            Statement of Intent
                          </span>
                          <p className="text-sm text-white/80 leading-relaxed bg-white/5 rounded-lg p-3">
                            {app.statement_of_intent || "—"}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          <DetailField label="How They Heard" value={app.how_heard} />
                          <DetailField
                            label="Constitution Acknowledged"
                            value={app.constitution_acknowledged ? "Yes" : "No"}
                          />
                          {app.document_url && (
                            <div>
                              <span className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-1">
                                Document Upload
                              </span>
                              <a
                                href={app.document_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[var(--gold)] hover:underline"
                              >
                                View Document
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Admin Notes */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-px bg-[var(--gold)]" />
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                          Admin Notes
                        </span>
                        <div className="flex-1 h-px bg-[var(--gold)]/10" />
                      </div>
                      <textarea
                        value={notesMap[app.id] || ""}
                        onChange={(e) =>
                          setNotesMap((prev) => ({
                            ...prev,
                            [app.id]: e.target.value,
                          }))
                        }
                        rows={3}
                        placeholder="Add internal notes about this application..."
                        className="w-full px-4 py-3 bg-white/5 border border-[var(--gold)]/10 rounded-xl text-sm text-white/80 placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/30 focus:border-transparent resize-y"
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={() => saveNotes(app.id)}
                          disabled={savingNotes === app.id}
                          className="text-xs font-semibold px-4 py-1.5 rounded-lg bg-white/10 text-white/70 hover:bg-white/15 transition-colors disabled:opacity-50"
                        >
                          {savingNotes === app.id ? "Saving..." : "Save Notes"}
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-px bg-[var(--gold)]" />
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                          Actions
                        </span>
                        <div className="flex-1 h-px bg-[var(--gold)]/10" />
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => updateStatus(app.id, "approved")}
                          disabled={updatingStatus === app.id || app.status === "approved"}
                          className="px-5 py-2 rounded-lg text-sm font-semibold bg-green-600/20 text-green-400 border border-green-500/20 hover:bg-green-600/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(app.id, "denied")}
                          disabled={updatingStatus === app.id || app.status === "denied"}
                          className="px-5 py-2 rounded-lg text-sm font-semibold bg-red-600/20 text-red-400 border border-red-500/20 hover:bg-red-600/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Deny
                        </button>
                        <button
                          onClick={() => updateStatus(app.id, "under_review")}
                          disabled={updatingStatus === app.id || app.status === "under_review"}
                          className="px-5 py-2 rounded-lg text-sm font-semibold bg-blue-600/20 text-blue-400 border border-blue-500/20 hover:bg-blue-600/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Under Review
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DetailField({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div>
      <span className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-1">
        {label}
      </span>
      <span className="text-sm text-white/80">{value || "—"}</span>
    </div>
  );
}
