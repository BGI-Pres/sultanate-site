"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import styles from "./invites.module.css";

/* ─── Types ─── */
interface Invite {
  id: string;
  code: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  inviter_message: string | null;
  invited_by: string | null;
  invited_by_name: string | null;
  admin_label: string | null;
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

type View = "all" | "awaiting" | "completed";

/* ─── Status configuration ─── */
const STATUS_LABEL: Record<string, string> = {
  sent: "Generated",
  opened: "Opened",
  started: "Started",
  completed: "Completed",
  accepted: "Accepted",
  bounced: "Bounced",
  expired: "Expired",
  revoked: "Revoked",
};

const STATUS_PILL: Record<string, string> = {
  sent: styles.pillSent,
  opened: styles.pillOpened,
  started: styles.pillStarted,
  completed: styles.pillCompleted,
  accepted: styles.pillAccepted,
  bounced: styles.pillBounced,
  expired: styles.pillExpired,
  revoked: styles.pillRevoked,
};

/* ─── Icons (stroke, 24vb) ─── */
const I = {
  send: "M3.5 20.5 21 12 3.5 3.5 3.5 10l12 2-12 2z",
  link: "M9 15l6-6M10 6l1-1a4 4 0 016 6l-1 1M14 18l-1 1a4 4 0 01-6-6l1-1",
  copy: "M9 9h10v12H9zM5 15H4V4h11v1",
  check: "M5 13l4 4L19 7",
  close: "M6 6l12 12M18 6L6 18",
  search: "M11 4a7 7 0 105 12 7 7 0 00-5-12zM20 20l-3.5-3.5",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z M12 9a3 3 0 100 6 3 3 0 000-6z",
  pencil: "M4 20h4L18.5 9.5a2 2 0 00-2.8-2.8L5 17.2zM14 7l3 3",
  layers: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5",
  users: "M8 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM2 20a6 6 0 0112 0M17 11a3 3 0 100-6M16 20a6 6 0 016-6",
  refresh: "M4 12a8 8 0 0113-6l3 2M20 12a8 8 0 01-13 6l-3-2M19 4v4h-4M5 20v-4h4",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  alert: "M12 3 2 20h20zM12 9v5M12 17h.01",
  clock: "M12 3a9 9 0 100 18 9 9 0 000-18zM12 8v4l3 2",
  badge: "M12 2l2.4 5 5.6.6-4 4 1 5.4L12 19l-5 3 1-5.4-4-4 5.6-.6z",
  ban: "M5.6 5.6l12.8 12.8M12 3a9 9 0 100 18 9 9 0 000-18z",
  trash: "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6",
};

function Icon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {d.split(" M").map((seg, i) => (
        <path key={i} d={(i ? "M" : "") + seg} />
      ))}
    </svg>
  );
}

/* ─── Helpers ─── */
function fmt(dt: string | null | undefined) {
  if (!dt) return "—";
  return new Date(dt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function fmtDateTime(dt: string | null | undefined) {
  if (!dt) return "—";
  return new Date(dt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function ago(dt: string | null | undefined) {
  if (!dt) return "—";
  const diff = Date.now() - new Date(dt).getTime();
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.round(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.round(diff / 3_600_000)}h ago`;
  const d = Math.round(diff / 86_400_000);
  if (d < 30) return `${d}d ago`;
  return new Date(dt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function initials(name: string | null | undefined): string {
  if (!name) return "—";
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function avatarTone(seed: string): [string, string] {
  const tones: [string, string][] = [
    ["#e9f0e6", "#1E3D1A"],
    ["#f6efdd", "#A8893E"],
    ["#fbeaed", "#9B1B30"],
    ["#eef4fb", "#2f6aa8"],
    ["#f0efe9", "#5a5c52"],
  ];
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) % tones.length;
  return tones[h];
}

function effectiveStatus(inv: Invite): string {
  return inv.revoked_at ? "revoked" : inv.status;
}

function displayName(inv: Invite): string {
  return inv.name?.trim() || inv.admin_label?.trim() || "Unclaimed invitation";
}

function buildInviteUrl(code: string): string {
  if (typeof window === "undefined") return `/enroll/${code}`;
  return `${window.location.origin}/enroll/${code}`;
}

/* ============================================================ */
/* Main page                                                    */
/* ============================================================ */
export default function AdminInvitesPage() {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>("all");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [composeOpen, setComposeOpen] = useState(false);
  const [active, setActive] = useState<Invite | null>(null);
  const [toast, setToast] = useState<{ msg: string; kind: "ok" | "err" } | null>(null);

  const flash = useCallback((msg: string, kind: "ok" | "err" = "ok") => {
    setToast({ msg, kind });
    setTimeout(() => setToast(null), 3200);
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

  /* ─── View counts ─── */
  const counts = useMemo(() => {
    const live = invites.filter((i) => !i.revoked_at);
    return {
      all: live.length,
      awaiting: live.filter((i) =>
        ["sent", "opened", "started"].includes(i.status)
      ).length,
      completed: live.filter((i) =>
        ["completed", "accepted"].includes(i.status)
      ).length,
    };
  }, [invites]);

  /* ─── Base list per view ─── */
  const base = useMemo(() => {
    return invites.filter((i) => {
      if (i.revoked_at && view !== "all") return false;
      if (view === "awaiting") return ["sent", "opened", "started"].includes(i.status);
      if (view === "completed") return ["completed", "accepted"].includes(i.status);
      return true;
    });
  }, [invites, view]);

  /* ─── Funnel metrics (Generated → Opened → Started → Completed) ─── */
  const funnel = useMemo(() => {
    const live = invites.filter((i) => !i.revoked_at);
    const generated = live.length;
    const opened = live.filter((i) =>
      ["opened", "started", "completed", "accepted"].includes(i.status)
    ).length;
    const started = live.filter((i) =>
      ["started", "completed", "accepted"].includes(i.status)
    ).length;
    const completed = live.filter((i) =>
      ["completed", "accepted"].includes(i.status)
    ).length;
    const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0);
    return { generated, opened, started, completed, pct };
  }, [invites]);

  /* ─── Filter chips for the active view ─── */
  const filterChips = useMemo(() => {
    const present: Record<string, number> = {};
    base.forEach((i) => {
      const s = effectiveStatus(i);
      present[s] = (present[s] ?? 0) + 1;
    });
    const order = ["sent", "opened", "started", "completed", "accepted", "bounced", "expired", "revoked"];
    return order
      .filter((s) => present[s])
      .map((s) => ({ key: s, count: present[s] }));
  }, [base]);

  /* ─── Search/filter ─── */
  const filtered = useMemo(() => {
    let r = base;
    if (statusFilter !== "all") r = r.filter((i) => effectiveStatus(i) === statusFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      r = r.filter((i) =>
        (
          (i.name ?? "") +
          " " +
          (i.email ?? "") +
          " " +
          i.code +
          " " +
          (i.invited_by_name ?? "") +
          " " +
          (i.admin_label ?? "")
        )
          .toLowerCase()
          .includes(q)
      );
    }
    return [...r].sort(
      (a, b) =>
        new Date(b.last_activity).getTime() - new Date(a.last_activity).getTime()
    );
  }, [base, statusFilter, query]);

  /* ─── Create invitation (link only) ─── */
  async function createInvite(label: string): Promise<Invite | null> {
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

    const { data: code, error: codeErr } = await supabase.rpc("generate_invite_code");
    if (codeErr || !code) {
      flash(`Code generation failed: ${codeErr?.message ?? "unknown"}`, "err");
      return null;
    }

    const { data, error } = await supabase
      .from("invites")
      .insert({
        code,
        admin_label: label.trim() || null,
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
    flash(`Invitation link generated${label ? ` for "${label}"` : ""}`);
    return created;
  }

  /* ─── Resend ─── */
  async function resendInvite(inv: Invite) {
    if (inv.revoked_at) {
      flash("Cannot resend a revoked invitation.", "err");
      return;
    }
    const supabase = createClient();
    const { data, error } = await supabase.rpc("resend_invite", { p_id: inv.id });
    if (error) {
      const msg = error.message.includes("cooldown_active")
        ? "Resend cooldown — please wait at least 1 hour between sends."
        : `Resend failed: ${error.message}`;
      flash(msg, "err");
      return;
    }
    const updated = data as Invite;
    setInvites((prev) => prev.map((i) => (i.id === inv.id ? updated : i)));
    if (active && active.id === inv.id) setActive(updated);
    flash(`Invitation reset — link refreshed for 30 more days`);
  }

  /* ─── Delete (hard) — only for dead links that no one claimed ─── */
  async function deleteInvite(inv: Invite) {
    const supabase = createClient();
    const { error } = await supabase.rpc("delete_invite", { p_id: inv.id });
    if (error) {
      const msg = error.message.includes("invite_has_application")
        ? "Can't delete — an application was already submitted from this link. Revoke it instead."
        : `Delete failed: ${error.message}`;
      flash(msg, "err");
      return;
    }
    setInvites((prev) => prev.filter((i) => i.id !== inv.id));
    if (active && active.id === inv.id) setActive(null);
    flash("Invitation deleted");
  }

  /* ─── Revoke ─── */
  async function revokeInvite(inv: Invite) {
    const supabase = createClient();
    const { error } = await supabase.rpc("revoke_invite", { p_id: inv.id });
    if (error) {
      flash(`Revoke failed: ${error.message}`, "err");
      return;
    }
    const now = new Date().toISOString();
    setInvites((prev) =>
      prev.map((i) =>
        i.id === inv.id ? { ...i, revoked_at: now, last_activity: now } : i
      )
    );
    setActive(null);
    flash("Invitation revoked — the link will no longer work");
  }

  /* ─── Titles per view ─── */
  const titleMap: Record<View, { t: string; s: string }> = {
    all: { t: "All Invitations", s: "Every invitation link generated by the Council" },
    awaiting: { t: "Awaiting Response", s: "Invitations still moving through the funnel" },
    completed: { t: "Completed", s: "Applicants who finished their enrollment" },
  };

  return (
    <div className={styles.page}>
      {/* Topbar */}
      <header className={styles.topbar}>
        <div className={styles.topbarL}>
          <h1 className={styles.topbarTitle}>{titleMap[view].t}</h1>
          <p className={styles.topbarSub}>{titleMap[view].s}</p>
        </div>
        <div className={styles.topbarR}>
          <button
            type="button"
            onClick={() => setComposeOpen(true)}
            className={`${styles.btn} ${styles.btnGold}`}
          >
            <Icon d={I.link} /> New Invitation Link
          </button>
        </div>
      </header>

      {/* View tabs */}
      <div className={styles.seg}>
        {(["all", "awaiting", "completed"] as View[]).map((v) => (
          <button
            type="button"
            key={v}
            onClick={() => {
              setView(v);
              setStatusFilter("all");
              setQuery("");
            }}
            className={view === v ? styles.on : ""}
          >
            <Icon d={v === "all" ? I.layers : v === "awaiting" ? I.eye : I.users} />
            {v === "all" ? "All Invitations" : v === "awaiting" ? "Awaiting Response" : "Completed"}
            <span className={styles.count}>{counts[v]}</span>
          </button>
        ))}
      </div>

      {/* Funnel */}
      {view !== "completed" && (
        <div className={styles.funnel}>
          <FunnelCell
            label="Generated"
            num={funnel.generated}
            icon={I.link}
            tone="#1E3D1A"
            bg="var(--forest-tint)"
            meta={<span>Live invitation links</span>}
            bar={100}
            barColor="var(--forest)"
          />
          <FunnelCell
            label="Opened"
            num={funnel.opened}
            icon={I.eye}
            tone="#A8893E"
            bg="var(--gold-tint)"
            meta={
              <>
                <span className={styles.funnelRate}>
                  {funnel.pct(funnel.opened, funnel.generated)}%
                </span>
                <span>open rate</span>
              </>
            }
            bar={funnel.pct(funnel.opened, funnel.generated)}
            barColor="var(--gold)"
          />
          <FunnelCell
            label="Started"
            num={funnel.started}
            icon={I.pencil}
            tone="#2f6aa8"
            bg="#eef4fb"
            meta={
              <>
                <span className={styles.funnelRate} style={{ background: "#eef4fb", color: "#2f6aa8" }}>
                  {funnel.pct(funnel.started, funnel.opened)}%
                </span>
                <span>of opened</span>
              </>
            }
            bar={funnel.pct(funnel.started, funnel.generated)}
            barColor="#2f6aa8"
          />
          <FunnelCell
            label="Completed"
            num={funnel.completed}
            icon={I.check}
            tone="#2D5A27"
            bg="var(--forest-tint)"
            meta={
              <>
                <span className={styles.funnelRate} style={{ background: "var(--forest-tint)", color: "var(--forest-dark)" }}>
                  {funnel.pct(funnel.completed, funnel.generated)}%
                </span>
                <span>conversion</span>
              </>
            }
            bar={funnel.pct(funnel.completed, funnel.generated)}
            barColor="var(--forest-dark)"
          />
        </div>
      )}

      {/* Panel */}
      <div className={styles.panel}>
        <div className={styles.panelBar}>
          <div className={styles.panelTitle}>
            Invitations <span className="dim">· {filtered.length}</span>
          </div>
          <div className={styles.panelBarR}>
            <div className={styles.filters}>
              <button
                type="button"
                onClick={() => setStatusFilter("all")}
                className={`${styles.chipFilter} ${statusFilter === "all" ? styles.on : ""}`}
              >
                All <span className="c">{base.length}</span>
              </button>
              {filterChips.map((c) => (
                <button
                  type="button"
                  key={c.key}
                  onClick={() => setStatusFilter(c.key)}
                  className={`${styles.chipFilter} ${statusFilter === c.key ? styles.on : ""}`}
                >
                  {STATUS_LABEL[c.key] ?? c.key} <span className="c">{c.count}</span>
                </button>
              ))}
            </div>
            <div className={styles.search}>
              <Icon d={I.search} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search code, label, claimant…"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className={styles.empty}>
            <p>Loading invitations…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.ico}>
              <Icon d={I.search} />
            </div>
            <h4>No matching invitations</h4>
            <p>
              {invites.length === 0
                ? "Generate your first invitation link to begin."
                : "Adjust your search or filters to see results."}
            </p>
          </div>
        ) : (
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Code</th>
                  <th>Status</th>
                  <th>Invited By</th>
                  <th>Generated</th>
                  <th>Last Activity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inv) => (
                  <InviteRow
                    key={inv.id}
                    inv={inv}
                    onOpen={setActive}
                    onResend={resendInvite}
                    onDelete={deleteInvite}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Compose modal */}
      {composeOpen && (
        <ComposeModal
          onClose={() => setComposeOpen(false)}
          onCreate={createInvite}
        />
      )}

      {/* Drawer */}
      {active && (
        <DetailDrawer
          invite={invites.find((i) => i.id === active.id) ?? active}
          onClose={() => setActive(null)}
          onResend={() => resendInvite(active)}
          onRevoke={() => revokeInvite(active)}
          onDelete={() => deleteInvite(active)}
        />
      )}

      {/* Toasts */}
      {toast && (
        <div className={styles.toastWrap}>
          <div className={`${styles.toast} ${toast.kind === "err" ? styles.toastErr : ""}`}>
            <Icon d={toast.kind === "ok" ? I.check : I.alert} />
            {toast.msg}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================ */
/* Sub-components                                               */
/* ============================================================ */

function StatusPill({ status }: { status: string }) {
  const cls = STATUS_PILL[status] ?? STATUS_PILL.sent;
  const label = STATUS_LABEL[status] ?? status;
  return (
    <span className={`${styles.pill} ${cls}`}>
      <span className="d" />
      {label}
    </span>
  );
}

function FunnelCell({
  label,
  num,
  icon,
  tone,
  bg,
  meta,
  bar,
  barColor,
}: {
  label: string;
  num: number;
  icon: string;
  tone: string;
  bg: string;
  meta: React.ReactNode;
  bar: number;
  barColor: string;
}) {
  return (
    <div className={styles.funnelCell}>
      <div className={styles.funnelTop}>
        <span className={styles.funnelIco} style={{ background: bg, color: tone }}>
          <Icon d={icon} />
        </span>
        <span className={styles.funnelLabel}>{label}</span>
      </div>
      <div className={styles.funnelNum}>{num}</div>
      <div className={styles.funnelMeta}>{meta}</div>
      <div className={styles.funnelBar}>
        <span style={{ width: bar + "%", background: barColor }} />
      </div>
    </div>
  );
}

function InviteRow({
  inv,
  onOpen,
  onResend,
  onDelete,
}: {
  inv: Invite;
  onOpen: (i: Invite) => void;
  onResend: (i: Invite) => void;
  onDelete: (i: Invite) => void;
}) {
  const seed = inv.name ?? inv.admin_label ?? inv.code;
  const [bg, fg] = avatarTone(seed);
  const status = effectiveStatus(inv);
  const canNudge = ["sent", "opened", "started", "bounced", "expired"].includes(status);
  // A "dead link" is one no recipient has claimed — safe to hard delete.
  // If someone already submitted, the server refuses anyway; we hide the
  // button so admins don't confuse it with revoke.
  const canDelete = !inv.application_id && !inv.completed_at && !inv.accepted_at;

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    const tag = inv.admin_label || inv.name || inv.code;
    if (window.confirm(`Delete invitation "${tag}"? This permanently removes the link.`)) {
      onDelete(inv);
    }
  }
  return (
    <tr onClick={() => onOpen(inv)}>
      <td>
        <div className={styles.cellName}>
          <span className={styles.cellAv} style={{ background: bg, color: fg }}>
            {initials(seed)}
          </span>
          <div className={styles.cellNameT}>
            <span className="nm">{displayName(inv)}</span>
            {inv.email ? (
              <span className="em">{inv.email}</span>
            ) : inv.admin_label && inv.name ? (
              <span className="label">{inv.admin_label}</span>
            ) : !inv.name ? (
              <span className="em">Awaiting submission</span>
            ) : null}
          </div>
        </div>
      </td>
      <td className={styles.cellCode}>{inv.code}</td>
      <td>
        <StatusPill status={status} />
      </td>
      <td className={styles.cellDim}>{inv.invited_by_name ?? "—"}</td>
      <td className={styles.cellMono}>{fmt(inv.sent_at)}</td>
      <td className={styles.cellMono}>{ago(inv.last_activity)}</td>
      <td className={styles.actionCell} onClick={(e) => e.stopPropagation()}>
        <div className={styles.rowActions}>
          {canNudge && (
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => onResend(inv)}
              title="Resend (1h cooldown)"
              disabled={!!inv.revoked_at}
            >
              <Icon d={I.refresh} />
            </button>
          )}
          {canDelete && (
            <button
              type="button"
              className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
              onClick={handleDelete}
              title="Delete this dead link"
            >
              <Icon d={I.trash} />
            </button>
          )}
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => onOpen(inv)}
            title="View details"
          >
            <Icon d={I.arrowRight} />
          </button>
        </div>
      </td>
    </tr>
  );
}

/* ─── Compose modal — label + linkbox only ─── */
function ComposeModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (label: string) => Promise<Invite | null>;
}) {
  const [label, setLabel] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [created, setCreated] = useState<Invite | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    setErr("");
    setBusy(true);
    const inv = await onCreate(label);
    setBusy(false);
    if (!inv) {
      setErr("Could not generate the invitation. Try again.");
      return;
    }
    setCreated(inv);
  }

  async function handleCopy() {
    if (!created) return;
    try {
      await navigator.clipboard.writeText(buildInviteUrl(created.code));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  const url = created ? buildInviteUrl(created.code) : null;

  return (
    <div
      className={styles.overlay}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.modal} role="dialog" aria-modal="true">
        <div className={styles.modalHead}>
          <div className={styles.mhPattern} />
          <button type="button" className={styles.mhClose} onClick={onClose} aria-label="Close">
            <Icon d={I.close} />
          </button>
          <p className={styles.mhEyebrow}>
            {created ? "Invitation Generated" : "Extend an Invitation"}
          </p>
          <h3>
            {created ? "Share this private link" : "Generate an enrollment link"}
          </h3>
        </div>
        <div className={styles.modalBody}>
          {err && <div className={styles.errBlock}>{err}</div>}

          {!created && (
            <>
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="invite-label">
                  Label <span className="hint">· optional, private to admins</span>
                </label>
                <input
                  id="invite-label"
                  className={styles.input}
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder='e.g. "Cousin Marcus" or "Friday meeting attendee"'
                  autoFocus
                  maxLength={80}
                />
                <p className={styles.fieldHint}>
                  Helps you find this link later. The recipient never sees it.
                </p>
              </div>
              <p style={{ fontSize: 12.5, color: "var(--ink-3)", lineHeight: 1.55 }}>
                Each link is single-use, expires in 30 days, and tracks opens and
                completions back to this row. The recipient fills in their own name
                and contact details when they submit the application.
              </p>
            </>
          )}

          {created && url && (
            <div className={styles.linkbox}>
              <div className={styles.linkboxLabel}>
                <Icon d={I.link} /> Shareable invitation link
              </div>
              <div className={styles.linkboxRow}>
                <input
                  readOnly
                  value={url}
                  onFocus={(e) => e.currentTarget.select()}
                />
                <span className={styles.codeTag}>{created.code}</span>
                <button type="button" className={styles.copyBtn} onClick={handleCopy}>
                  <Icon d={copied ? I.check : I.copy} /> {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <p className={styles.fieldHint} style={{ marginTop: 10 }}>
                Hand this link off through any channel — DM, signal, in person.
                It expires in 30 days and can be revoked from the row at any time.
              </p>
            </div>
          )}
        </div>
        <div className={styles.modalFoot}>
          {!created ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className={`${styles.btn} ${styles.btnGhost}`}
                disabled={busy}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleGenerate}
                className={`${styles.btn} ${styles.btnGold}`}
                disabled={busy}
              >
                <Icon d={I.link} /> {busy ? "Generating…" : "Generate Link"}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className={`${styles.btn} ${styles.btnGold}`}
            >
              <Icon d={I.check} /> Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Drawer ─── */
function DetailDrawer({
  invite,
  onClose,
  onResend,
  onRevoke,
  onDelete,
}: {
  invite: Invite;
  onClose: () => void;
  onResend: () => void;
  onRevoke: () => void;
  onDelete: () => void;
}) {
  const status = effectiveStatus(invite);
  const url = buildInviteUrl(invite.code);
  const [copied, setCopied] = useState(false);
  const [confirmRevoke, setConfirmRevoke] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isRevoked = !!invite.revoked_at;
  const canResend = !isRevoked &&
    ["sent", "opened", "started", "bounced", "expired"].includes(status);
  // Only a dead link — never claimed — is safe to hard delete.
  const canDelete = !invite.application_id && !invite.completed_at && !invite.accepted_at;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  }

  const seed = invite.name ?? invite.admin_label ?? invite.code;
  const headerName = displayName(invite);
  const headerSub = invite.email
    ? invite.email
    : invite.admin_label && !invite.name
      ? invite.admin_label
      : "Awaiting submission";

  /* Build timeline entries from invite columns */
  const events: { t: string; at: string | null; note?: string }[] = [
    { t: "sent", at: invite.sent_at, note: invite.admin_label ? `Labeled "${invite.admin_label}"` : undefined },
    { t: "opened", at: invite.opened_at },
    { t: "started", at: invite.started_at },
    { t: "completed", at: invite.completed_at, note: invite.application_id ? "Application submitted" : undefined },
    { t: "accepted", at: invite.accepted_at },
    { t: "bounced", at: invite.status === "bounced" ? invite.last_activity : null, note: invite.bounce_reason ?? undefined },
    { t: "expired", at: invite.status === "expired" ? invite.expires_at : null },
    { t: "revoked", at: invite.revoked_at },
  ].filter((e) => e.at);

  const tlIcon: Record<string, string> = {
    sent: I.link, opened: I.eye, started: I.pencil,
    completed: I.check, accepted: I.badge,
    bounced: I.alert, expired: I.clock, revoked: I.ban,
  };
  const tlTone: Record<string, string> = {
    sent: styles.tlDotGold, opened: styles.tlDotGold, started: styles.tlDotDone,
    completed: styles.tlDotDone, accepted: styles.tlDotGold,
    bounced: styles.tlDotCherry, expired: styles.tlDotPending, revoked: styles.tlDotCherry,
  };
  const tlLabel: Record<string, string> = {
    sent: "Link generated", opened: "Opened", started: "Started application",
    completed: "Application submitted", accepted: "Accepted by Council",
    bounced: "Bounced", expired: "Expired", revoked: "Revoked",
  };

  return (
    <div className={styles.drawerWrap}>
      <div className={styles.drawerScrim} onClick={onClose} />
      <aside className={styles.drawer} role="dialog" aria-modal="true">
        <div className={styles.drawerHead}>
          <div className={styles.dhPattern} />
          <button type="button" className={styles.dhClose} onClick={onClose} aria-label="Close">
            <Icon d={I.close} />
          </button>
          <div className={styles.drawerId}>
            <span className={styles.drawerAv}>{initials(seed)}</span>
            <div className="di">
              <span className="diName">{headerName}</span>
              <span className="diEmail">{headerSub}</span>
              <span style={{ marginTop: 4 }}>
                <StatusPill status={status} />
              </span>
            </div>
          </div>
        </div>

        <div className={styles.drawerBody}>
          {invite.bounce_reason && status === "bounced" && (
            <div className={styles.bounceBlock}>
              <strong>Delivery failed:</strong> {invite.bounce_reason}
            </div>
          )}

          {/* Link box */}
          <div>
            <div className={styles.sectionLabel}>Invitation Link</div>
            <div className={styles.drawerLinkRow}>
              <input readOnly value={url} onFocus={(e) => e.currentTarget.select()} />
              <button type="button" className={styles.copyBtn} onClick={copyLink}>
                <Icon d={copied ? I.check : I.copy} /> {copied ? "Copied" : "Copy"}
              </button>
            </div>
            {isRevoked && (
              <p style={{ fontSize: 11.5, color: "var(--cherry-dark)", marginTop: 8 }}>
                Revoked — this link will no longer accept submissions.
              </p>
            )}
          </div>

          {/* Meta grid */}
          <div className={styles.drawerMeta}>
            <div className={styles.drawerMetaCell}>
              <div className={styles.dmLabel}>Invite Code</div>
              <div className={`${styles.dmValue} ${styles.dmValueMono}`}>{invite.code}</div>
            </div>
            <div className={styles.drawerMetaCell}>
              <div className={styles.dmLabel}>Invited By</div>
              <div className={styles.dmValue}>{invite.invited_by_name ?? "—"}</div>
            </div>
            <div className={styles.drawerMetaCell}>
              <div className={styles.dmLabel}>Generated</div>
              <div className={styles.dmValue}>{fmt(invite.sent_at)}</div>
            </div>
            <div className={styles.drawerMetaCell}>
              <div className={styles.dmLabel}>Expires</div>
              <div className={styles.dmValue}>{fmt(invite.expires_at)}</div>
            </div>
            {invite.admin_label && (
              <div className={styles.drawerMetaCell} style={{ gridColumn: "1 / -1" }}>
                <div className={styles.dmLabel}>Label</div>
                <div className={styles.dmValue}>{invite.admin_label}</div>
              </div>
            )}
            {invite.resend_count > 0 && (
              <div className={styles.drawerMetaCell} style={{ gridColumn: "1 / -1" }}>
                <div className={styles.dmLabel}>Resends</div>
                <div className={styles.dmValue}>
                  {invite.resend_count}× — last {ago(invite.last_resent_at)}
                </div>
              </div>
            )}
            {invite.application_id && (
              <div className={styles.drawerMetaCell} style={{ gridColumn: "1 / -1" }}>
                <div className={styles.dmLabel}>Linked Application</div>
                <div className={`${styles.dmValue} ${styles.dmValueMono}`}>
                  {invite.application_id}
                </div>
              </div>
            )}
          </div>

          {invite.inviter_message && (
            <div>
              <div className={styles.sectionLabel}>Personal Note</div>
              <div className={styles.messageBlock}>
                &ldquo;{invite.inviter_message}&rdquo;
              </div>
            </div>
          )}

          {/* Timeline */}
          <div>
            <div className={styles.sectionLabel}>Activity Timeline</div>
            <div className={styles.timeline}>
              {events.length === 0 ? (
                <p style={{ fontSize: 13, color: "var(--ink-3)", fontStyle: "italic" }}>
                  No activity yet.
                </p>
              ) : (
                events.map((e, i) => (
                  <div key={e.t} className={styles.tlItem}>
                    <div className={styles.tlRail}>
                      <div className={`${styles.tlDot} ${tlTone[e.t] ?? styles.tlDotDone}`}>
                        <Icon d={tlIcon[e.t] ?? I.check} />
                      </div>
                      {i < events.length - 1 && <div className={styles.tlLine} />}
                    </div>
                    <div className={styles.tlBody}>
                      <div className={styles.tlTitle}>{tlLabel[e.t] ?? e.t}</div>
                      <div className={styles.tlTime}>
                        {fmtDateTime(e.at)} · {ago(e.at)}
                      </div>
                      {e.note && <div className={styles.tlNote}>{e.note}</div>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className={styles.drawerFoot}>
          {confirmDelete ? (
            <>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className={`${styles.btn} ${styles.btnGhost}`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onDelete}
                className={`${styles.btn} ${styles.btnCherry}`}
              >
                <Icon d={I.trash} /> Confirm Delete
              </button>
            </>
          ) : confirmRevoke ? (
            <>
              <button
                type="button"
                onClick={() => setConfirmRevoke(false)}
                className={`${styles.btn} ${styles.btnGhost}`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onRevoke}
                className={`${styles.btn} ${styles.btnCherry}`}
              >
                <Icon d={I.ban} /> Confirm Revoke
              </button>
            </>
          ) : (
            <>
              {canDelete && (
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className={`${styles.btn} ${styles.btnGhost}`}
                  title="Permanently remove this dead link"
                >
                  <Icon d={I.trash} /> Delete
                </button>
              )}
              {!isRevoked && (
                <button
                  type="button"
                  onClick={() => setConfirmRevoke(true)}
                  className={`${styles.btn} ${styles.btnGhost}`}
                  title="Disable this link without deleting it"
                >
                  <Icon d={I.ban} /> Revoke
                </button>
              )}
              {canResend && (
                <button
                  type="button"
                  onClick={onResend}
                  className={`${styles.btn} ${styles.btnGold}`}
                >
                  <Icon d={I.refresh} /> Refresh Link
                </button>
              )}
              {!canResend && isRevoked && !canDelete && (
                <button
                  type="button"
                  onClick={onClose}
                  className={`${styles.btn} ${styles.btnGhost}`}
                  style={{ flex: 1 }}
                >
                  Close
                </button>
              )}
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
