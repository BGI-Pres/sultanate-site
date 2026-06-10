"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase-client";

interface Resource {
  id: string;
  title: string;
  description: string | null;
  category: string;
  type: string;
  url: string;
  order_index: number;
  view_count: number;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const CATEGORIES = [
  "Heritage",
  "Governance",
  "Education",
  "Spiritual",
  "Economics",
  "Community",
] as const;

const TYPES = ["Article", "Guide", "Manual", "Video", "PDF", "Link"] as const;

type Draft = {
  title: string;
  description: string;
  category: string;
  type: string;
  url: string;
  featured: boolean;
  published: boolean;
};

const emptyDraft: Draft = {
  title: "",
  description: "",
  category: "Heritage",
  type: "Article",
  url: "",
  featured: false,
  published: true,
};

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("all");
  const [editing, setEditing] = useState<Resource | null>(null);
  const [adding, setAdding] = useState(false);
  const [toast, setToast] = useState<{ msg: string; kind: "ok" | "err" } | null>(null);

  const flash = useCallback((msg: string, kind: "ok" | "err" = "ok") => {
    setToast({ msg, kind });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const loadResources = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .order("category", { ascending: true })
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) flash(`Load failed: ${error.message}`, "err");
    setResources((data as Resource[]) ?? []);
    setLoading(false);
  }, [flash]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadResources();
  }, [loadResources]);

  async function patch(id: string, partial: Partial<Resource>) {
    const supabase = createClient();
    setResources((prev) => prev.map((r) => (r.id === id ? { ...r, ...partial } : r)));
    const { error } = await supabase.from("resources").update(partial).eq("id", id);
    if (error) {
      flash(`Save failed: ${error.message}`, "err");
      await loadResources();
      return false;
    }
    return true;
  }

  async function create(draft: Draft) {
    const supabase = createClient();
    // Place new items at the end of their category
    const maxOrder = Math.max(
      0,
      ...resources.filter((r) => r.category === draft.category).map((r) => r.order_index),
    );
    const { data, error } = await supabase
      .from("resources")
      .insert({
        title: draft.title,
        description: draft.description || null,
        category: draft.category,
        type: draft.type,
        url: draft.url,
        featured: draft.featured,
        published: draft.published,
        order_index: maxOrder + 1,
      })
      .select()
      .single();
    if (error) {
      flash(`Create failed: ${error.message}`, "err");
      return false;
    }
    setResources((prev) => [...prev, data as Resource]);
    flash("Resource added");
    return true;
  }

  async function remove(id: string) {
    const supabase = createClient();
    const { error } = await supabase.from("resources").delete().eq("id", id);
    if (error) {
      flash(`Delete failed: ${error.message}`, "err");
      return;
    }
    setResources((prev) => prev.filter((r) => r.id !== id));
    setEditing(null);
    flash("Resource deleted");
  }

  async function move(id: string, direction: "up" | "down") {
    const item = resources.find((r) => r.id === id);
    if (!item) return;
    const siblings = resources
      .filter((r) => r.category === item.category)
      .sort((a, b) => a.order_index - b.order_index);
    const i = siblings.findIndex((r) => r.id === id);
    const j = direction === "up" ? i - 1 : i + 1;
    if (j < 0 || j >= siblings.length) return;
    const other = siblings[j];
    // Swap their order_index values
    const supabase = createClient();
    setResources((prev) =>
      prev.map((r) => {
        if (r.id === item.id) return { ...r, order_index: other.order_index };
        if (r.id === other.id) return { ...r, order_index: item.order_index };
        return r;
      }),
    );
    const [a, b] = await Promise.all([
      supabase.from("resources").update({ order_index: other.order_index }).eq("id", item.id),
      supabase.from("resources").update({ order_index: item.order_index }).eq("id", other.id),
    ]);
    if (a.error || b.error) {
      flash("Reorder failed", "err");
      await loadResources();
    }
  }

  const filtered = useMemo(() => {
    return filterCategory === "all"
      ? resources
      : resources.filter((r) => r.category === filterCategory);
  }, [resources, filterCategory]);

  const grouped = useMemo(() => {
    const map = new Map<string, Resource[]>();
    for (const r of filtered) {
      if (!map.has(r.category)) map.set(r.category, []);
      map.get(r.category)!.push(r);
    }
    // Each category list is already ordered by query
    return map;
  }, [filtered]);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--gray-900)]">Resources</h1>
          <p className="text-[var(--gray-500)] mt-1 text-sm">
            Curate the members-only library at /portal/resources
          </p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="text-sm px-3 py-2 rounded-md bg-[var(--dark-bg)] text-[var(--gold)] hover:bg-black"
        >
          + Add Resource
        </button>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 text-sm border border-[var(--gray-300)] rounded-md"
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <span className="ml-auto text-xs text-[var(--gray-500)]">
          {resources.length} total · {resources.filter((r) => !r.published).length} draft
        </span>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[var(--gray-500)]">Loading…</div>
      ) : resources.length === 0 ? (
        <div className="bg-white rounded-lg border border-[var(--gray-200)] p-10 text-center">
          <p className="text-[var(--gray-500)] text-sm">
            No resources yet. Click <strong>Add Resource</strong> to seed the library.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {CATEGORIES.filter((c) => grouped.has(c)).map((category) => {
            const items = grouped.get(category)!;
            return (
              <section key={category}>
                <h2 className="text-sm font-semibold text-[var(--gray-700)] mb-2 px-1">
                  {category}{" "}
                  <span className="text-xs text-[var(--gray-500)] font-normal">
                    ({items.length})
                  </span>
                </h2>
                <div className="bg-white rounded-lg border border-[var(--gray-200)] overflow-hidden">
                  {items.map((r, idx) => (
                    <div
                      key={r.id}
                      className={`flex items-center gap-3 px-3 py-3 ${
                        idx > 0 ? "border-t border-[var(--gray-100)]" : ""
                      } ${!r.published ? "opacity-60" : ""}`}
                    >
                      <div className="flex flex-col gap-0.5 shrink-0">
                        <button
                          onClick={() => move(r.id, "up")}
                          disabled={idx === 0}
                          className="text-[var(--gray-400)] hover:text-[var(--gray-700)] disabled:opacity-30 leading-none text-xs"
                          aria-label="Move up"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => move(r.id, "down")}
                          disabled={idx === items.length - 1}
                          className="text-[var(--gray-400)] hover:text-[var(--gray-700)] disabled:opacity-30 leading-none text-xs"
                          aria-label="Move down"
                        >
                          ▼
                        </button>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-[var(--gray-900)]">
                            {r.title}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-[var(--gray-100)] text-[var(--gray-600)]">
                            {r.type}
                          </span>
                          {r.featured && (
                            <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-[var(--gold)]/15 text-[var(--gold-dark)]">
                              Featured
                            </span>
                          )}
                          {!r.published && (
                            <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-gray-200 text-gray-700">
                              Draft
                            </span>
                          )}
                        </div>
                        {r.description && (
                          <p className="text-xs text-[var(--gray-500)] mt-1 line-clamp-1">
                            {r.description}
                          </p>
                        )}
                        <p className="text-[11px] text-[var(--gray-400)] mt-1 truncate">
                          {r.url} · {r.view_count} views
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => patch(r.id, { published: !r.published })}
                          className="text-xs px-2 py-1 rounded border border-[var(--gray-300)] hover:bg-[var(--gray-50)]"
                        >
                          {r.published ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          onClick={() => setEditing(r)}
                          className="text-xs px-2 py-1 rounded bg-[var(--dark-bg)] text-[var(--gold)]"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {editing && (
        <EditModal
          resource={editing}
          onClose={() => setEditing(null)}
          onSave={async (patchData) => {
            const ok = await patch(editing.id, patchData);
            if (ok) {
              setEditing(null);
              flash("Saved");
            }
          }}
          onDelete={() => remove(editing.id)}
        />
      )}

      {adding && (
        <AddModal
          onClose={() => setAdding(false)}
          onCreate={async (draft) => {
            const ok = await create(draft);
            if (ok) setAdding(false);
          }}
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

/* ─── Add modal ─── */
function AddModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (d: Draft) => Promise<void>;
}) {
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  async function handleCreate() {
    if (!draft.title.trim() || !draft.url.trim()) {
      setErr("Title and URL are required.");
      return;
    }
    setErr("");
    setSaving(true);
    await onCreate(draft);
    setSaving(false);
  }

  return (
    <Modal title="Add resource" onClose={onClose}>
      <DraftForm draft={draft} setDraft={setDraft} />
      {err && <p className="text-xs text-[var(--cherry-red)] mt-2">{err}</p>}
      <ModalFooter>
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
          {saving ? "Adding…" : "Add resource"}
        </button>
      </ModalFooter>
    </Modal>
  );
}

/* ─── Edit modal ─── */
function EditModal({
  resource,
  onClose,
  onSave,
  onDelete,
}: {
  resource: Resource;
  onClose: () => void;
  onSave: (patch: Partial<Resource>) => Promise<void>;
  onDelete: () => void;
}) {
  const [draft, setDraft] = useState<Draft>({
    title: resource.title,
    description: resource.description ?? "",
    category: resource.category,
    type: resource.type,
    url: resource.url,
    featured: resource.featured,
    published: resource.published,
  });
  const [saving, setSaving] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);

  async function handleSave() {
    setSaving(true);
    await onSave({
      title: draft.title,
      description: draft.description || null,
      category: draft.category,
      type: draft.type,
      url: draft.url,
      featured: draft.featured,
      published: draft.published,
    });
    setSaving(false);
  }

  return (
    <Modal title="Edit resource" onClose={onClose}>
      <DraftForm draft={draft} setDraft={setDraft} />
      <p className="text-[11px] text-[var(--gray-500)] mt-3">
        {resource.view_count} views · created {new Date(resource.created_at).toLocaleDateString()}
      </p>
      <ModalFooter>
        {confirmDel ? (
          <>
            <span className="text-xs text-[var(--cherry-red)] mr-auto">Delete this resource?</span>
            <button
              onClick={() => setConfirmDel(false)}
              className="text-sm px-3 py-2 rounded-md border border-[var(--gray-300)]"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="text-sm px-3 py-2 rounded-md bg-[var(--cherry-red)] text-white"
            >
              Confirm delete
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setConfirmDel(true)}
              className="text-sm text-[var(--cherry-red)] hover:underline mr-auto"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="text-sm px-3 py-2 rounded-md border border-[var(--gray-300)]"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="text-sm px-3 py-2 rounded-md bg-[var(--dark-bg)] text-[var(--gold)] disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </>
        )}
      </ModalFooter>
    </Modal>
  );
}

/* ─── Shared draft form ─── */
function DraftForm({
  draft,
  setDraft,
}: {
  draft: Draft;
  setDraft: (d: Draft) => void;
}) {
  return (
    <div className="space-y-3">
      <Field label="Title *">
        <input
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          className={inputCls}
        />
      </Field>
      <Field label="Description">
        <textarea
          value={draft.description}
          onChange={(e) => setDraft({ ...draft, description: e.target.value })}
          rows={2}
          className={inputCls}
        />
      </Field>
      <Field label="URL *">
        <input
          value={draft.url}
          onChange={(e) => setDraft({ ...draft, url: e.target.value })}
          placeholder="https://… or /documents/foo.pdf"
          className={inputCls}
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Category">
          <select
            value={draft.category}
            onChange={(e) => setDraft({ ...draft, category: e.target.value })}
            className={inputCls}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Type">
          <select
            value={draft.type}
            onChange={(e) => setDraft({ ...draft, type: e.target.value })}
            className={inputCls}
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="flex items-center gap-6 pt-1">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={draft.featured}
            onChange={(e) => setDraft({ ...draft, featured: e.target.checked })}
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={draft.published}
            onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
          />
          Published
        </label>
      </div>
    </div>
  );
}

/* ─── Modal shells ─── */
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
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <header className="px-6 py-4 border-b border-[var(--gray-200)] flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--gray-900)]">{title}</h2>
          <button
            onClick={onClose}
            className="text-[var(--gray-500)] hover:text-[var(--gray-900)] text-xl leading-none"
          >
            ×
          </button>
        </header>
        <div className="px-6 py-5 overflow-y-auto">{children}</div>
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
