"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase-client";

type PostType = "press_release" | "article" | "spotlight" | "event_recap";

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

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [postType, setPostType] = useState<PostType>("press_release");
  const [excerpt, setExcerpt] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [author, setAuthor] = useState("Sultanate of Amexem");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugEdited) {
      setSlug(slugify(value));
    }
  }

  function handleSlugChange(value: string) {
    setSlugEdited(true);
    setSlug(slugify(value));
  }

  async function save(publish: boolean) {
    setError(null);

    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!slug.trim()) {
      setError("Slug is required");
      return;
    }
    if (!body.trim()) {
      setError("Body is required");
      return;
    }

    setSaving(true);
    try {
      const supabase = createClient();
      const payload = {
        title: title.trim(),
        slug: slug.trim(),
        post_type: postType,
        excerpt: excerpt.trim() ? excerpt.trim() : null,
        cover_image_url: coverImageUrl.trim() ? coverImageUrl.trim() : null,
        author: author.trim() || "Sultanate of Amexem",
        body,
        published: publish,
        published_at: publish ? new Date().toISOString() : null,
      };

      const { data, error: insertError } = await supabase
        .from("posts")
        .insert(payload)
        .select("id")
        .single();

      if (insertError) {
        setError(insertError.message);
        setSaving(false);
        return;
      }

      if (data?.id) {
        router.push(`/admin/posts/${data.id}`);
      } else {
        router.push("/portal/admin/posts");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--gray-900)]">
            New Post
          </h1>
          <p className="text-[var(--gray-500)] mt-1">
            Create a press release, article, spotlight, or event recap
          </p>
        </div>
        <Link
          href="/portal/admin/posts"
          className="text-sm text-[var(--gray-500)] hover:text-[var(--gray-700)]"
        >
          ← Back to posts
        </Link>
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
            onChange={(e) => handleTitleChange(e.target.value)}
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
            onChange={(e) => handleSlugChange(e.target.value)}
            required
          />
          <p className="text-xs text-[var(--gray-500)] mt-1">
            URL-friendly identifier (auto-generated from title)
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

        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-2 border-t border-[var(--gray-100)]">
          <button
            type="button"
            onClick={() => save(true)}
            disabled={saving}
            className={primaryBtn}
          >
            {saving ? "Saving…" : "Publish Now"}
          </button>
          <button
            type="button"
            onClick={() => save(false)}
            disabled={saving}
            className={secondaryBtn}
          >
            {saving ? "Saving…" : "Save as Draft"}
          </button>
        </div>
      </div>
    </div>
  );
}
