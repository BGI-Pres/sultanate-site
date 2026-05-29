"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-client";

type PostType = "press_release" | "article" | "spotlight" | "event_recap";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  post_type: PostType;
  cover_image_url: string | null;
  author: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const STATUS_FILTERS = ["All", "Draft", "Published"] as const;
type StatusFilter = (typeof STATUS_FILTERS)[number];

const POST_TYPE_FILTERS: { label: string; value: "All" | PostType }[] = [
  { label: "All Types", value: "All" },
  { label: "Press Release", value: "press_release" },
  { label: "Article", value: "article" },
  { label: "Spotlight", value: "spotlight" },
  { label: "Event Recap", value: "event_recap" },
];

const POST_TYPE_LABELS: Record<PostType, string> = {
  press_release: "Press Release",
  article: "Article",
  spotlight: "Spotlight",
  event_recap: "Event Recap",
};

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString();
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [typeFilter, setTypeFilter] = useState<"All" | PostType>("All");

  useEffect(() => {
    async function loadPosts() {
      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from("posts")
          .select("*")
          .order("updated_at", { ascending: false });

        if (fetchError) {
          setError(true);
        } else if (data) {
          setPosts(data as Post[]);
        }
      } catch {
        setError(true);
      }
      setLoading(false);
    }
    loadPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      if (statusFilter === "Draft" && p.published) return false;
      if (statusFilter === "Published" && !p.published) return false;
      if (typeFilter !== "All" && p.post_type !== typeFilter) return false;
      return true;
    });
  }, [posts, statusFilter, typeFilter]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--gray-900)]">
            Blog Posts
          </h1>
          <p className="text-[var(--gray-500)] mt-1">
            Manage press releases, articles, spotlights, and event recaps
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="px-6 py-2.5 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-sm hover:bg-[var(--gold-light)] transition-colors"
        >
          New Post
        </Link>
      </div>

      {error ? (
        <div className="bg-white rounded-xl border border-[var(--gray-200)] p-8 text-center">
          <p className="text-[var(--gray-500)] mb-2">
            Connect Supabase to manage posts
          </p>
          <p className="text-sm text-[var(--gray-500)]">
            Set{" "}
            <code className="bg-[var(--gray-100)] px-1 rounded">
              NEXT_PUBLIC_SUPABASE_URL
            </code>{" "}
            and{" "}
            <code className="bg-[var(--gray-100)] px-1 rounded">
              NEXT_PUBLIC_SUPABASE_ANON_KEY
            </code>{" "}
            in your Vercel environment variables.
          </p>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center py-12">
          <svg
            className="animate-spin h-6 w-6 text-[var(--gold)]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      ) : (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-white rounded-xl border border-[var(--gray-200)] p-4">
              <p className="text-xs text-[var(--gray-500)] mb-1">Total</p>
              <p className="text-xl font-bold text-[var(--gray-900)]">
                {posts.length}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-[var(--gray-200)] p-4">
              <p className="text-xs text-[var(--gray-500)] mb-1">Published</p>
              <p className="text-xl font-bold text-[var(--gray-900)]">
                {posts.filter((p) => p.published).length}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-[var(--gray-200)] p-4">
              <p className="text-xs text-[var(--gray-500)] mb-1">Drafts</p>
              <p className="text-xl font-bold text-[var(--gray-900)]">
                {posts.filter((p) => !p.published).length}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-[var(--gray-200)] p-4">
              <p className="text-xs text-[var(--gray-500)] mb-1">Press Releases</p>
              <p className="text-xl font-bold text-[var(--gray-900)]">
                {posts.filter((p) => p.post_type === "press_release").length}
              </p>
            </div>
          </div>

          {/* Filter bars */}
          <div className="flex flex-wrap gap-2 mb-3">
            {STATUS_FILTERS.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 text-sm rounded-md font-medium transition-colors ${
                  statusFilter === status
                    ? "bg-[var(--gold)] text-[var(--dark-bg)]"
                    : "border border-[var(--gray-300)] text-[var(--gray-700)] hover:bg-[var(--gray-50)]"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {POST_TYPE_FILTERS.map((t) => (
              <button
                key={t.value}
                onClick={() => setTypeFilter(t.value)}
                className={`px-4 py-2 text-sm rounded-md font-medium transition-colors ${
                  typeFilter === t.value
                    ? "bg-[var(--dark-bg)] text-[var(--gold)]"
                    : "border border-[var(--gray-300)] text-[var(--gray-700)] hover:bg-[var(--gray-50)]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Table */}
          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-xl border border-[var(--gray-200)] p-8 text-center">
              <p className="text-[var(--gray-500)]">No posts match these filters</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[var(--gray-200)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--gray-200)]">
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-[var(--gray-500)] font-semibold">
                        Title
                      </th>
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-[var(--gray-500)] font-semibold">
                        Type
                      </th>
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-[var(--gray-500)] font-semibold">
                        Status
                      </th>
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-[var(--gray-500)] font-semibold">
                        Published
                      </th>
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-[var(--gray-500)] font-semibold">
                        Updated
                      </th>
                      <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-[var(--gray-500)] font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPosts.map((post) => (
                      <tr
                        key={post.id}
                        className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)]"
                      >
                        <td className="px-4 py-3 text-sm text-[var(--gray-700)] font-medium">
                          <div>{post.title || "—"}</div>
                          <div className="text-xs text-[var(--gray-500)] mt-0.5">
                            /{post.slug}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-[var(--gray-700)]">
                          {POST_TYPE_LABELS[post.post_type] || post.post_type}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {post.published ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-800">
                              Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-[var(--gray-100)] text-[var(--gray-700)]">
                              Draft
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-[var(--gray-700)]">
                          {formatDate(post.published_at)}
                        </td>
                        <td className="px-4 py-3 text-sm text-[var(--gray-700)]">
                          {formatDate(post.updated_at)}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex gap-3">
                            <Link
                              href={`/admin/posts/${post.id}`}
                              className="text-[var(--gold)] hover:underline font-medium"
                            >
                              Edit
                            </Link>
                            {post.published ? (
                              <a
                                href={`/press/${post.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--gray-700)] hover:underline font-medium"
                              >
                                View
                              </a>
                            ) : (
                              <span className="text-[var(--gray-400)] cursor-not-allowed">
                                View
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
