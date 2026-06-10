"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { use, useEffect, useState } from "react";
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

const POST_TYPES: { label: string; value: PostType }[] = [
  { label: "Press Release", value: "press_release" },
  { label: "Article", value: "article" },
  { label: "Spotlight", value: "spotlight" },
  { label: "Event Recap", value: "event_recap" },
];

const EXCERPT_MAX = 200;

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const inputClass =
  "w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]";
const labelClass =
  "block text-sm font-medium text-[var(--gray-700)] mb-1.5";
const primaryBtn =
  "px-6 py-2.5 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-lg text-sm hover:bg-[var(--gold-light)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed";
const secondaryBtn =
  "px-6 py-2.5 border border-[var(--gray-300)] text-[var(--gray-700)] font-semibold rounded-lg text-sm hover:bg-[var(--gray-50)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed";
const dangerBtn =
  "px-6 py-2.5 border border-red-300 text-red-600 font-semibold rounded-lg text-sm hover:bg-red-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [postType, setPostType] = useState<PostType>("press_release");
  const [excerpt, setExcerpt] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [author, setAuthor] = useState("Sultanate of Amexem");
  const [body, setBody] = useState("");
  const [published, setPublished] = useState(false);
  const [publishedAt, setPublishedAt] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          setLoadError(error.message);
        } else if (data) {
          const post = data as Post;
          setTitle(post.title ?? "");
          setSlug(post.slug ?? "");
          setPostType(post.post_type);
          setExcerpt(post.excerpt ?? "");
          setCoverImageUrl(post.cover_image_url ?? "");
          setAuthor(post.author ?? "Sultanate of Amexem");
          setBody(post.body ?? "");
          setPublished(post.published);
          setPublishedAt(post.published_at);
        }
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : "Failed to load post");
      }
      setLoading(false);
    }
    load();
  }, [id]);

  function validate(): string | null {
    if (!title.trim()) return "Title is required";
    if (!slug.trim()) return "Slug is required";
    if (!body.trim()) return "Body is required";
    return null;
  }

  async function handleSave() {
    setActionError(null);
    setStatusMessage(null);
    const v = validate();
    if (v) {
      setActionError(v);
      return;
    }
    setSaving(true);
    try {
      const supabase = createClient();
      const payload = {
        title: title.trim(),
        slug: slugify(slug),
        post_type: postType,
        excerpt: excerpt.trim() ? excerpt.trim() : null,
        cover_image_url: coverImageUrl.trim() ? coverImageUrl.trim() : null,
        author: author.trim() || "Sultanate of Amexem",
        body,
      };
      const { error } = await supabase
        .from("posts")
        .update(payload)
        .eq("id", id);
      if (error) {
        setActionError(error.message);
      } else {
        setStatusMessage("Changes saved");
      }
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to save");
    }
    setSaving(false);
  }

  async function handlePublishToggle() {
    setActionError(null);
    setStatusMessage(null);
    setSaving(true);
    try {
      const supabase = createClient();
      const nowIso = new Date().toISOString();
      const update = published
        ? { published: false }
        : {
            published: true,
            published_at: publishedAt ?? nowIso,
          };

      const { error } = await supabase
        .from("posts")
        .update(update)
        .eq("id", id);

      if (error) {
        setActionError(error.message);
      } else {
        const nextPublished = !published;
        setPublished(nextPublished);
        if (nextPublished && !publishedAt) {
          setPublishedAt(nowIso);
        }
        setStatusMessage(nextPublished ? "Post published" : "Post unpublished");
      }
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to update");
    }
    setSaving(false);
  }

  async function handleDelete() {
    if (
      !window.confirm(
        "Delete this post permanently? This cannot be undone."
      )
    ) {
      return;
    }
    setActionError(null);
    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) {
        setActionError(error.message);
        setSaving(false);
      } else {
        router.push("/portal/admin/posts");
      }
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to delete");
      setSaving(false);
    }
  }

  if (loading) {
    return (
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
    );
  }

  if (loadError) {
    return (
      <div className="bg-white rounded-xl border border-[var(--gray-200)] p-8 text-center">
        <p className="text-[var(--gray-700)] mb-2">Could not load post</p>
        <p className="text-sm text-[var(--gray-500)] mb-4">{loadError}</p>
        <Link
          href="/portal/admin/posts"
          className="text-sm text-[var(--gold)] hover:underline"
        >
          ← Back to posts
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--gray-900)]">
            Edit Post
          </h1>
          <p className="text-[var(--gray-500)] mt-1">
            {published ? "Published" : "Draft"}
            {publishedAt
              ? ` · ${new Date(publishedAt).toLocaleDateString()}`
              : ""}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {published && slug && (
            <a
              href={`/press/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--gold)] hover:underline font-medium"
            >
              View Live →
            </a>
          )}
          <Link
            href="/portal/admin/posts"
            className="text-sm text-[var(--gray-500)] hover:text-[var(--gray-700)]"
          >
            ← Back to posts
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[var(--gray-200)] p-6 space-y-5">
        <div>
          <label className={labelClass} htmlFor="title">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            className={inputClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="slug">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            id="slug"
            type="text"
            className={inputClass}
            value={slug}
            onChange={(e) => setSlug(slugify(e.target.value))}
            required
          />
          <p className="text-xs text-[var(--gray-500)] mt-1">
            URL-friendly identifier
          </p>
        </div>

        <div>
          <label className={labelClass} htmlFor="post_type">
            Post Type <span className="text-red-500">*</span>
          </label>
          <select
            id="post_type"
            className={inputClass}
            value={postType}
            onChange={(e) => setPostType(e.target.value as PostType)}
            required
          >
            {POST_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="excerpt">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            className={inputClass}
            rows={2}
            maxLength={EXCERPT_MAX}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
          <p className="text-xs text-[var(--gray-500)] mt-1 text-right">
            {excerpt.length} / {EXCERPT_MAX}
          </p>
        </div>

        <div>
          <label className={labelClass} htmlFor="cover_image_url">
            Cover Image URL
          </label>
          <input
            id="cover_image_url"
            type="url"
            className={inputClass}
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="author">
            Author
          </label>
          <input
            id="author"
            type="text"
            className={inputClass}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="body">
            Body <span className="text-red-500">*</span>
          </label>
          <textarea
            id="body"
            className={`${inputClass} font-mono`}
            rows={18}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <p className="text-xs text-[var(--gray-500)] mt-1">
            Markdown supported (GFM)
          </p>
        </div>

        {statusMessage && (
          <div className="rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-700">
            {statusMessage}
          </div>
        )}
        {actionError && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            {actionError}
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-2 border-t border-[var(--gray-100)] items-center">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className={primaryBtn}
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={handlePublishToggle}
            disabled={saving}
            className={secondaryBtn}
          >
            {published ? "Unpublish" : "Publish"}
          </button>
          <div className="ml-auto">
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving}
              className={dangerBtn}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
