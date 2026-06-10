"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase-client";

interface Invite {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string | null;
  inviter_message: string | null;
  invited_by: string | null;
  invited_by_name: string | null;
  status: string;
  sent_at: string;
  opened_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  accepted_at: string | null;
  expires_at: string;
  last_activity: string;
  application_id: string | null;
  created_at: string;
  revoked_at: string | null;
  last_resent_at: string | null;
  resend_count: number;
  bounce_reason: string | null;
}

const STATUS_META: Record<
  string,
  { label: string; class: string }
> = {
  sent:      { label: "Sent",      class: "bg-gray-100 text-gray-700" },
  opened:    { label: "Opened",    class: "bg-[#C5A55A]/15 text-[#A8893E]" },
  started:   { label: "Started",   class: "bg-blue-50 text-blue-700" },
  completed: { label: "Completed", class: "bg-[#2D5A27]/15 text-[#1E3D1A]" },
  accepted:  { label: "Accepted",  class: "bg-[#C5A55A]/15 text-[#A8893E]" },
  bounced:   { label: "Bounced",   class: "bg-red-50 text-red-700" },
  expired:   { label: "Expired",   class: "bg-gray-100 text-gray-500" },
  revoked:   { label: "Revoked",   class: "bg-gray-200 text-gray-600 line-through" },
};

function fmt(dt: string | null | undefined) {
  if (!dt) return "—";
  return new Date(dt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ago(dt: string | null | undefined) {
  if (!dt) return "—";
  const diff = Date.now() - new Date(dt).getTime();
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.round(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.round(diff / 3_600_000)}h ago`;
  return `${Math.round(diff / 86_400_000)}d ago`;
}

function effectiveStatus(inv: Invite): string {
  return inv.revoked_at ? "revoked" : inv.status;
}

export default function AdminInvitesPage() {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(true);
  const [composeOpen, setComposeOpen] = useState(false);
  const [active, setActive] = useState<Invite | null>(null);
  const [linkOnlyCreated, setLinkOnlyCreated] = useState<Invite | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [toast, setToast] = useState<{ msg: string; kind: "ok" | "err" } | null>(null);

  const flash = useCallback((msg: string, kind: "ok" | "err" = "ok") => {
    setToast({ msg, kind });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const loadInvites = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("invites")
      .select("*")
      .order("last_activity", { ascending: false });
    if (error) flash(`Load failed: ${error.message}`, "err");
    setInvites((data as Invite[]) ?? []);
    setLoading(false);
  }, [flash]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadInvites();
  }, [loadInvites]);

  /* ─── Funnel metrics (revoked excluded) ─── */
  const funnel = useMemo(() => {
    const live = invites.filter((i) => !i.revoked_at);
    const total = live.length;
    const delivered = live.filter((i) => i.status !== "bounced").length;
    const opened = live.filter((i) =>
      ["opened", "started", "completed", "accepted"].includes(i.status),
    ).length;
    const started = live.filter((i) =>
      ["started", "completed", "accepted"].includes(i.status),
    ).length;
    const completed = live.filter((i) =>
      ["completed", "accepted"].includes(i.status),
    ).length;
    const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0);
    return { total, delivered, opened, started, completed, pct };
  }, [invites]);

  /* ─── Filter + search ─── */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return invites.filter((i) => {
      const status = effectiveStatus(i);
      if (statusFilter === "all") {
        // Hide revoked from default view
        if (status === "revoked") return false;
      } else if (status !== statusFilter) {
        return false;
      }
      if (!q) return true;
      return (
        i.name.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        i.code.toLowerCase().includes(q) ||
        (i.invited_by_name ?? "").toLowerCase().includes(q)
      );
    });
  }, [invites, query, statusFilter]);

  /* ─── Create invite (server-generated code) ─── */
  async function createInvite(input: {
    name: string;
    email: string;
    inviter_message?: string;
    sendEmail: boolean;
  }): Promise<Invite | null> {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let invitedByName: string | null = null;
    if (user) {
      const { data: member } = await supabase
        .from("members")
        .select("full_name")
        .eq("user_id", user.id)
        .maybeSingle();
      invitedByName = member?.full_name ?? user.email ?? null;
    }

    const normalizedEmail = input.email.trim().toLowerCase();

    const { data: code, error: codeErr } = await supabase.rpc("generate_invite_code");
    if (codeErr || !code) {
      flash(`Code generation failed: ${codeErr?.message ?? "unknown"}`, "err");
      return null;
    }

    const { data, error } = await supabase
      .from("invites")
      .insert({
        code,
        name: input.name.trim(),
        email: normalizedEmail,
        inviter_message: input.inviter_message?.trim() || null,
        invited_by: user?.id ?? null,
        invited_by_name: invitedByName,
        status: "sent",
      })
      .select()
      .single();

    if (error) {
      flash(`Create failed: ${error.message}`, "err");
      return null;
    }

    const created = data as Invite;
    setInvites((prev) => [created, ...prev]);

    if (input.sendEmail) {
      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "enrollment_invite",
          name: input.name.trim(),
          email: normalizedEmail,
          details: {
            code,
            invited_by_name: invitedByName,
            inviter_message: input.inviter_message?.trim() || null,
          },
        }),
      });
      flash(`Invitation sent to ${normalizedEmail}`);
    } else {
      flash(`Link generated for ${normalizedEmail}`);
    }

    return created;
  }

  /* ─── Resend via RPC (1h cooldown enforced server-side) ─── */
  async function resendInvite(inv: Invite) {
    if (inv.revoked_at) {
      flash("Cannot resend a revoked invitation.", "err");
      return;
    }
    const supabase = createClient();
    const { data, error } = await supabase.rpc("resend_invite", { p_id: inv.id });
    if (error) {
      const msg = error.message.includes("cooldown_active")
        ? "Resend cooldown: please wait at least 1 hour between sends."
        : `Resend failed: ${error.message}`;
      flash(msg, "err");
      return;
    }
    const updated = data as Invite;
    setInvites((prev) => prev.map((i) => (i.id === inv.id ? updated : i)));
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "enrollment_invite",
        name: inv.name,
        email: inv.email,
        details: {
          code: inv.code,
          invited_by_name: inv.invited_by_name,
          inviter_message: inv.inviter_message,
        },
      }),
    });
    flash(`Nudge sent to ${inv.email}`);
  }

  /* ─── Revoke (soft-delete) ─── */
  async function revokeInvite(inv: Invite) {
    const supabase = createClient();
    const { error } = await supabase.rpc("revoke_invite", { p_id: inv.id });
    if (error) {
      flash(`Revoke failed: ${error.message}`, "err");
      return;
    }
    const now = new Date().toISOString();
    setInvites((prev) =>
      prev.map((i) => (i.id === inv.id ? { ...i, revoked_at: now, last_activity: now } : i)),
    );
    setActive(null);
    flash("Invitation revoked. The link will no longer work.");
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--gray-900)]">Invite Hub</h1>
          <p className="text-[var(--gray-500)] mt-1 text-sm">
            Send personal enrollment invitations and track their progress
          </p>
        </div>
        <button
          onClick={() => setComposeOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-[var(--dark-bg)] text-[var(--gold)] rounded-md hover:bg-black"
        >
          + New Invitation
        </button>
      </div>

      {/* Funnel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <FunnelCell label="Sent" num={funnel.total} sub={`${funnel.delivered} delivered`} accent="#1E3D1A" />
        <FunnelCell
          label="Opened"
          num={funnel.opened}
          sub={`${funnel.pct(funnel.opened, funnel.delivered)}% open rate`}
          accent="#A8893E"
        />
        <FunnelCell
          label="Started"
          num={funnel.started}
          sub={`${funnel.pct(funnel.started, funnel.opened)}% of opened`}
          accent="#2f6aa8"
        />
        <FunnelCell
          label="Completed"
          num={funnel.completed}
          sub={`${funnel.pct(funnel.completed, funnel.delivered)}% conversion`}
          accent="#2D5A27"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <input
          type="search"
          placeholder="Search name, email, code…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 min-w-[220px] px-3 py-2 text-sm border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-[var(--gray-300)] rounded-md"
        >
          <option value="all">All (active)</option>
          {Object.entries(STATUS_META).map(([k, m]) => (
            <option key={k} value={k}>
              {m.label}
            </option>
          ))}
        </select>
        <span className="ml-auto text-xs text-[var(--gray-500)]">
          {filtered.length} of {invites.length}
        </span>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[var(--gray-500)]">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-lg border border-[var(--gray-200)] p-10 text-center">
          <p className="text-[var(--gray-500)] text-sm">
            {invites.length === 0
              ? "No invitations sent yet. Click + New Invitation to begin."
              : "No invitations match those filters."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-[var(--gray-200)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">Invitee</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">Code</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">Inviter</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">Sent</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">Last activity</th>
                  <th className="text-right px-4 py-3 font-medium text-[var(--gray-700)]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] cursor-pointer"
                    onClick={() => setActive(inv)}
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-[var(--gray-900)]">{inv.name}</div>
                      <div className="text-xs text-[var(--gray-500)]">{inv.email}</div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--gray-700)]">
                      {inv.code}
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill status={effectiveStatus(inv)} />
                    </td>
                    <td className="px-4 py-3 text-[var(--gray-500)] text-xs">
                      {inv.invited_by_name ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-[var(--gray-500)] text-xs whitespace-nowrap">
                      {fmt(inv.sent_at)}
                    </td>
                    <td className="px-4 py-3 text-[var(--gray-500)] text-xs whitespace-nowrap">
                      {ago(inv.last_activity)}
                    </td>
                    <td
                      className="px-4 py-3 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => resendInvite(inv)}
                        disabled={!!inv.revoked_at}
                        className="text-xs px-2 py-1 rounded border border-[var(--gray-300)] hover:bg-[var(--gray-50)] mr-1 disabled:opacity-40 disabled:cursor-not-allowed"
                        title={inv.revoked_at ? "Revoked — cannot resend" : "Resend (1h cooldown)"}
                      >
                        Resend
                      </button>
                      <button
                        onClick={() => setActive(inv)}
                        className="text-xs px-2 py-1 rounded bg-[var(--dark-bg)] text-[var(--gold)]"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {composeOpen && (
        <ComposeModal
          onClose={() => setComposeOpen(false)}
          onCreate={async (input) => {
            const created = await createInvite(input);
            if (created) {
              setComposeOpen(false);
              if (!input.sendEmail) {
                setLinkOnlyCreated(created);
              }
            }
          }}
        />
      )}

      {linkOnlyCreated && (
        <LinkOnlyModal
          invite={linkOnlyCreated}
          onClose={() => setLinkOnlyCreated(null)}
        />
      )}

      {active && (
        <InviteDrawer
          invite={active}
          onClose={() => setActive(null)}
          onResend={() => resendInvite(active)}
          onRevoke={() => revokeInvite(active)}
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

/* ─── Sub-components ─── */

function StatusPill({ status }: { status: string }) {
  const m = STATUS_META[status] ?? STATUS_META.sent;
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${m.class}`}>
      {m.label}
    </span>
  );
}

function FunnelCell({
  label,
  num,
  sub,
  accent,
}: {
  label: string;
  num: number;
  sub: string;
  accent: string;
}) {
  return (
    <div className="bg-white rounded-lg border border-[var(--gray-200)] p-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--gray-500)]">
          {label}
        </span>
        <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
      </div>
      <div className="text-2xl font-bold text-[var(--gray-900)]">{num}</div>
      <div className="text-xs text-[var(--gray-500)] mt-1">{sub}</div>
    </div>
  );
}

interface DuplicateMatch {
  id: string;
  code: string;
  name: string;
  email: string;
  status: string;
  sent_at: string;
}

function ComposeModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (input: {
    name: string;
    email: string;
    inviter_message?: string;
    sendEmail: boolean;
  }) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");
  const [duplicate, setDuplicate] = useState<DuplicateMatch | null>(null);
  const [proceedAnyway, setProceedAnyway] = useState(false);

  // Debounced duplicate check
  useEffect(() => {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDuplicate(null);
      return;
    }
    const t = setTimeout(async () => {
      const supabase = createClient();
      const { data } = await supabase
        .rpc("find_live_invite", { p_email: trimmed })
        .maybeSingle();
      setDuplicate((data as DuplicateMatch | null) ?? null);
      setProceedAnyway(false);
    }, 350);
    return () => clearTimeout(t);
  }, [email]);

  async function handleSubmit(sendEmail: boolean) {
    if (!name.trim() || !email.trim()) {
      setErr("Name and email are required.");
      return;
    }
    if (duplicate && !proceedAnyway) {
      setErr("A live invitation already exists for this email. Confirm to send anyway.");
      return;
    }
    setErr("");
    setSending(true);
    await onCreate({ name, email, inviter_message: message, sendEmail });
    setSending(false);
  }

  const inputCls =
    "w-full px-3 py-2 text-sm border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40";

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
        <header className="px-6 py-4 border-b border-[var(--gray-200)] flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--gray-900)]">Send invitation</h2>
          <button
            onClick={onClose}
            className="text-[var(--gray-500)] hover:text-[var(--gray-900)] text-xl leading-none"
          >
            ×
          </button>
        </header>
        <div className="px-6 py-5 space-y-3">
          <label className="block">
            <span className="block text-xs font-medium text-[var(--gray-700)] mb-1">
              Full name *
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="block text-xs font-medium text-[var(--gray-700)] mb-1">
              Email *
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
            />
          </label>

          {duplicate && (
            <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs">
              <p className="text-amber-800 font-medium mb-1">
                A live invitation already exists for this email
              </p>
              <p className="text-amber-700">
                {duplicate.name} · code{" "}
                <span className="font-mono">{duplicate.code}</span> · status{" "}
                <span className="font-medium">{duplicate.status}</span> ·{" "}
                {fmt(duplicate.sent_at)}
              </p>
              <label className="mt-2 flex items-center gap-2 text-amber-800">
                <input
                  type="checkbox"
                  checked={proceedAnyway}
                  onChange={(e) => setProceedAnyway(e.target.checked)}
                />
                <span>Send anyway (creates a second invitation)</span>
              </label>
            </div>
          )}

          <label className="block">
            <span className="block text-xs font-medium text-[var(--gray-700)] mb-1">
              Personal message <span className="text-[var(--gray-500)] font-normal">(optional)</span>
            </span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="A short, personal note. Included in the email and shown on the landing page."
              className={inputCls}
            />
          </label>
          {err && <p className="text-xs text-[var(--cherry-red)]">{err}</p>}
          <p className="text-[11px] text-[var(--gray-500)]">
            Invitation expires in 30 days. Use <strong>Generate link</strong> to skip the
            email and copy the URL to deliver yourself.
          </p>
        </div>
        <footer className="px-6 py-4 border-t border-[var(--gray-200)] flex justify-end gap-2 bg-[var(--gray-50)]">
          <button
            onClick={onClose}
            disabled={sending}
            className="text-sm px-3 py-2 rounded-md border border-[var(--gray-300)]"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSubmit(false)}
            disabled={sending}
            className="text-sm px-3 py-2 rounded-md border border-[var(--gray-300)] disabled:opacity-50"
          >
            {sending ? "Working…" : "Generate link only"}
          </button>
          <button
            onClick={() => handleSubmit(true)}
            disabled={sending}
            className="text-sm px-3 py-2 rounded-md bg-[var(--dark-bg)] text-[var(--gold)] font-semibold disabled:opacity-50"
          >
            {sending ? "Sending…" : "Send invitation"}
          </button>
        </footer>
      </div>
    </div>
  );
}

function LinkOnlyModal({
  invite,
  onClose,
}: {
  invite: Invite;
  onClose: () => void;
}) {
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/enroll/${invite.code}`
      : `/enroll/${invite.code}`;
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
        <header className="px-6 py-4 border-b border-[var(--gray-200)]">
          <h2 className="text-lg font-bold text-[var(--gray-900)]">Invitation link ready</h2>
          <p className="text-xs text-[var(--gray-500)] mt-1">
            For {invite.name} · {invite.email} · no email was sent.
          </p>
        </header>
        <div className="px-6 py-5 space-y-3">
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={url}
              className="flex-1 px-3 py-2 text-xs font-mono border border-[var(--gray-300)] rounded-md bg-[var(--gray-50)]"
            />
            <button
              onClick={copy}
              className="text-xs px-3 py-2 rounded-md bg-[var(--dark-bg)] text-[var(--gold)] whitespace-nowrap"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-[11px] text-[var(--gray-500)]">
            The invitation is recorded in the hub. You can send it through any channel —
            DM, signal, hand-deliver. The invite expires in 30 days.
          </p>
        </div>
        <footer className="px-6 py-4 border-t border-[var(--gray-200)] flex justify-end gap-2 bg-[var(--gray-50)]">
          <button
            onClick={onClose}
            className="text-sm px-3 py-2 rounded-md bg-[var(--dark-bg)] text-[var(--gold)]"
          >
            Done
          </button>
        </footer>
      </div>
    </div>
  );
}

function InviteDrawer({
  invite,
  onClose,
  onResend,
  onRevoke,
}: {
  invite: Invite;
  onClose: () => void;
  onResend: () => void;
  onRevoke: () => void;
}) {
  const [confirmRevoke, setConfirmRevoke] = useState(false);
  const timeline = [
    { label: "Sent", at: invite.sent_at },
    { label: "Opened", at: invite.opened_at },
    { label: "Started", at: invite.started_at },
    { label: "Completed", at: invite.completed_at },
    { label: "Accepted", at: invite.accepted_at },
    { label: "Revoked", at: invite.revoked_at },
  ].filter((e) => e.at);

  const enrollUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/enroll/${invite.code}`
      : `/enroll/${invite.code}`;

  const isRevoked = !!invite.revoked_at;

  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <aside className="w-full max-w-lg bg-white shadow-2xl flex flex-col overflow-hidden">
        <header className="px-6 py-4 border-b border-[var(--gray-200)] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--gray-900)]">{invite.name}</h2>
            <p className="text-xs text-[var(--gray-500)] mt-0.5">{invite.email}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--gray-500)] hover:text-[var(--gray-900)] text-xl leading-none"
          >
            ×
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <StatusPill status={effectiveStatus(invite)} />
              <span className="text-xs text-[var(--gray-500)]">
                Code: <span className="font-mono">{invite.code}</span>
              </span>
            </div>
            {invite.bounce_reason && (
              <p className="text-xs text-red-700 mt-1">Bounce: {invite.bounce_reason}</p>
            )}
            {invite.resend_count > 0 && (
              <p className="text-xs text-[var(--gray-500)] mt-1">
                Resent {invite.resend_count}× — last {ago(invite.last_resent_at)}
              </p>
            )}
          </div>

          <section>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[var(--gray-500)] mb-2">
              Invitation link
            </h3>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={enrollUrl}
                className="flex-1 px-3 py-2 text-xs font-mono border border-[var(--gray-300)] rounded-md bg-[var(--gray-50)]"
              />
              <button
                onClick={() => navigator.clipboard.writeText(enrollUrl)}
                className="text-xs px-3 py-2 rounded-md border border-[var(--gray-300)] hover:bg-[var(--gray-50)]"
              >
                Copy
              </button>
            </div>
            {isRevoked && (
              <p className="text-[11px] text-red-700 mt-1">
                This link has been revoked and will no longer accept submissions.
              </p>
            )}
          </section>

          <section>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[var(--gray-500)] mb-3">
              Timeline
            </h3>
            <ol className="space-y-2">
              {timeline.map((e) => (
                <li key={e.label} className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#2D5A27]" />
                  <span className="font-medium text-[var(--gray-700)]">{e.label}</span>
                  <span className="text-[var(--gray-500)] text-xs ml-auto whitespace-nowrap">
                    {fmt(e.at)}
                  </span>
                </li>
              ))}
              {timeline.length === 0 && (
                <li className="text-sm text-[var(--gray-500)] italic">No activity yet</li>
              )}
            </ol>
          </section>

          {invite.inviter_message && (
            <section>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[var(--gray-500)] mb-2">
                Personal message
              </h3>
              <p className="text-sm text-[var(--gray-700)] italic leading-relaxed bg-[var(--gray-50)] p-3 rounded-md border border-[var(--gray-200)]">
                &ldquo;{invite.inviter_message}&rdquo;
              </p>
            </section>
          )}

          <section>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[var(--gray-500)] mb-2">
              Details
            </h3>
            <div className="text-xs space-y-1 text-[var(--gray-700)]">
              <div>
                <span className="text-[var(--gray-500)]">Inviter:</span>{" "}
                {invite.invited_by_name ?? "—"}
              </div>
              <div>
                <span className="text-[var(--gray-500)]">Expires:</span>{" "}
                {fmt(invite.expires_at)}
              </div>
              <div>
                <span className="text-[var(--gray-500)]">Last activity:</span>{" "}
                {ago(invite.last_activity)}
              </div>
              {invite.application_id && (
                <div>
                  <span className="text-[var(--gray-500)]">Linked application:</span>{" "}
                  <span className="font-mono text-[10px]">{invite.application_id}</span>
                </div>
              )}
            </div>
          </section>
        </div>
        <footer className="px-6 py-4 border-t border-[var(--gray-200)] flex items-center justify-between gap-2">
          {confirmRevoke ? (
            <>
              <span className="text-xs text-[var(--cherry-red)]">Revoke this invitation?</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setConfirmRevoke(false)}
                  className="text-sm px-3 py-2 rounded-md border border-[var(--gray-300)]"
                >
                  Cancel
                </button>
                <button
                  onClick={onRevoke}
                  className="text-sm px-3 py-2 rounded-md bg-[var(--cherry-red)] text-white"
                >
                  Revoke
                </button>
              </div>
            </>
          ) : (
            <>
              {!isRevoked ? (
                <button
                  onClick={() => setConfirmRevoke(true)}
                  className="text-sm text-[var(--cherry-red)] hover:underline"
                >
                  Revoke
                </button>
              ) : (
                <span className="text-xs text-[var(--gray-500)]">Revoked {ago(invite.revoked_at)}</span>
              )}
              <div className="flex gap-2">
                <button
                  onClick={onResend}
                  disabled={isRevoked}
                  className="text-sm px-3 py-2 rounded-md border border-[var(--gray-300)] hover:bg-[var(--gray-50)] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Resend
                </button>
                <button
                  onClick={onClose}
                  className="text-sm px-3 py-2 rounded-md bg-[var(--dark-bg)] text-[var(--gold)]"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </footer>
      </aside>
    </div>
  );
}
