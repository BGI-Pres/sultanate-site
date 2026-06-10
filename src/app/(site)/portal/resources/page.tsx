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
  featured: boolean;
  view_count: number;
}

const CATEGORIES = [
  "Heritage",
  "Governance",
  "Education",
  "Spiritual",
  "Economics",
  "Community",
] as const;

const categoryBlurb: Record<string, string> = {
  Heritage: "Origins, lineage, and the long arc of the nation.",
  Governance: "Constitution, bylaws, and how the Sultanate is run.",
  Education: "Study guides, orientation, and curriculum.",
  Spiritual: "Sacred texts and devotional practice.",
  Economics: "Trade, dues, and economic self-determination.",
  Community: "Chapter life, assemblies, and building together.",
};

const typeClass: Record<string, string> = {
  Article: "bg-blue-50 text-blue-700",
  Guide: "bg-emerald-50 text-emerald-700",
  Manual: "bg-purple-50 text-purple-700",
  Video: "bg-rose-50 text-rose-700",
  PDF: "bg-amber-50 text-amber-700",
  Link: "bg-gray-100 text-gray-600",
};

export default function PortalResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const loadResources = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("resources")
      .select("id, title, description, category, type, url, featured, view_count")
      .eq("published", true)
      .order("featured", { ascending: false })
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) setError(error.message);
    setResources((data as Resource[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadResources();
  }, [loadResources]);

  const handleOpen = useCallback((r: Resource) => {
    // Fire-and-forget click tracking
    const supabase = createClient();
    supabase
      .rpc("bump_resource_view", { p_resource_id: r.id })
      .then(() => undefined);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      if (activeCategory !== "all" && r.category !== activeCategory) return false;
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        (r.description ?? "").toLowerCase().includes(q)
      );
    });
  }, [resources, query, activeCategory]);

  const featured = useMemo(
    () => filtered.filter((r) => r.featured && (activeCategory === "all" || activeCategory === r.category)),
    [filtered, activeCategory],
  );

  const grouped = useMemo(() => {
    const map = new Map<string, Resource[]>();
    for (const r of filtered) {
      if (!map.has(r.category)) map.set(r.category, []);
      map.get(r.category)!.push(r);
    }
    return map;
  }, [filtered]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-[var(--gray-500)]">
        Loading library…
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--gray-900)]">Member Library</h1>
        <p className="text-[var(--gray-500)] mt-1 text-sm">
          Foundational documents, study materials, and curated resources for citizens of the
          Sultanate.
        </p>
      </div>

      {/* Search + category filter */}
      <div className="mb-6 flex flex-col gap-3">
        <input
          type="search"
          placeholder="Search the library…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2.5 text-sm border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40 bg-white"
        />
        <div className="flex flex-wrap gap-2">
          <CategoryChip
            label="All"
            active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          />
          {CATEGORIES.map((c) => (
            <CategoryChip
              key={c}
              label={c}
              active={activeCategory === c}
              onClick={() => setActiveCategory(c)}
            />
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-md bg-red-50 text-red-700 text-sm border border-red-200">
          Failed to load resources: {error}
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && !error && (
        <div className="bg-white rounded-lg border border-[var(--gray-200)] p-10 text-center">
          <p className="text-[var(--gray-500)] text-sm">
            {resources.length === 0
              ? "The library is being prepared. Check back soon."
              : "No resources match your filters."}
          </p>
        </div>
      )}

      {/* Featured strip — only when not filtered, or when matches filter */}
      {featured.length > 0 && activeCategory === "all" && !query && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <svg
              className="w-4 h-4 text-[var(--gold)]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l2.4 7.4H22l-6.2 4.5L18.2 22 12 17.3 5.8 22l2.4-8.1L2 9.4h7.6z" />
            </svg>
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-[var(--gold)]">
              Featured
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {featured.map((r) => (
              <FeaturedCard key={r.id} resource={r} onOpen={handleOpen} />
            ))}
          </div>
        </section>
      )}

      {/* Category sections */}
      <div className="space-y-8">
        {CATEGORIES.filter((c) => grouped.has(c)).map((category) => {
          const items = grouped.get(category)!;
          return (
            <section key={category}>
              <div className="mb-3">
                <h2 className="text-lg font-semibold text-[var(--gray-900)]">{category}</h2>
                <p className="text-xs text-[var(--gray-500)] mt-0.5">
                  {categoryBlurb[category]}
                </p>
              </div>
              <div className="space-y-2">
                {items.map((r) => (
                  <ResourceRow key={r.id} resource={r} onOpen={handleOpen} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
        active
          ? "bg-[var(--dark-bg)] text-[var(--gold)] border-[var(--dark-bg)]"
          : "bg-white text-[var(--gray-700)] border-[var(--gray-300)] hover:border-[var(--gold)]/40"
      }`}
    >
      {label}
    </button>
  );
}

function ResourceRow({
  resource,
  onOpen,
}: {
  resource: Resource;
  onOpen: (r: Resource) => void;
}) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onOpen(resource)}
      className="group flex items-center gap-4 bg-white p-4 rounded-lg border border-[var(--gray-200)] hover:border-[var(--gold)]/40 hover:shadow-sm transition-all"
    >
      <div className="w-9 h-9 rounded-md bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center shrink-0">
        <ResourceIcon type={resource.type} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-[var(--gray-900)] group-hover:text-[var(--gold-dark)]">
            {resource.title}
          </span>
          <span
            className={`text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded ${
              typeClass[resource.type] ?? "bg-gray-100 text-gray-600"
            }`}
          >
            {resource.type}
          </span>
        </div>
        {resource.description && (
          <p className="text-xs text-[var(--gray-500)] mt-1 line-clamp-2">{resource.description}</p>
        )}
      </div>
      <svg
        className="w-4 h-4 text-[var(--gray-300)] group-hover:text-[var(--gold)] shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </a>
  );
}

function FeaturedCard({
  resource,
  onOpen,
}: {
  resource: Resource;
  onOpen: (r: Resource) => void;
}) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onOpen(resource)}
      className="group block p-5 rounded-xl border border-[var(--gold)]/40 bg-gradient-to-br from-[var(--gold)]/5 to-transparent hover:border-[var(--gold)] hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-[var(--gold)]/15 text-[var(--gold)] flex items-center justify-center shrink-0">
          <ResourceIcon type={resource.type} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-[var(--gray-900)] group-hover:text-[var(--gold-dark)] leading-snug">
            {resource.title}
          </h3>
          <p className="text-[11px] uppercase tracking-wider text-[var(--gray-500)] mt-1">
            {resource.category} · {resource.type}
          </p>
        </div>
      </div>
      {resource.description && (
        <p className="text-xs text-[var(--gray-500)] leading-relaxed line-clamp-3">
          {resource.description}
        </p>
      )}
    </a>
  );
}

function ResourceIcon({ type }: { type: string }) {
  switch (type) {
    case "Video":
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      );
    case "PDF":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" />
        </svg>
      );
    case "Link":
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 015.656 0l1.415 1.415a4 4 0 010 5.656l-3 3a4 4 0 01-5.656 0l-1.415-1.415m-1.414-7.07L9 9.999a4 4 0 00-5.656 0l-3 3a4 4 0 000 5.657l1.414 1.414a4 4 0 005.657 0L9 18.585" />
        </svg>
      );
    default:
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
  }
}
