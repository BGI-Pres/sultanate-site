import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 60;

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
  published_at: string | null;
  updated_at: string | null;
}

const POST_TYPE_LABELS: Record<PostType, string> = {
  press_release: "Press Release",
  article: "Article",
  spotlight: "Spotlight",
  event_recap: "Event Recap",
};

async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      return null;
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error } = await supabase
      .from("posts")
      .select(
        "id, slug, title, excerpt, body, post_type, cover_image_url, author, published_at, updated_at"
      )
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (error || !data) return null;
    return data as Post;
  } catch {
    return null;
  }
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found — Sultanate of Amexem",
      alternates: { canonical: `/press/${slug}` },
    };
  }

  const description =
    post.excerpt ??
    post.body.replace(/\s+/g, " ").trim().slice(0, 160);

  return {
    title: `${post.title} — Sultanate of Amexem`,
    description,
    alternates: { canonical: `/press/${post.slug}` },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: `/press/${post.slug}`,
      ...(post.cover_image_url
        ? { images: [{ url: post.cover_image_url }] }
        : {}),
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const label = POST_TYPE_LABELS[post.post_type] ?? "Article";

  return (
    <>
      {/* ── Dark Hero ── */}
      <section className="bg-[var(--dark-bg)] py-12 md:py-20 border-b-2 border-[var(--gold)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/press"
            className="inline-flex items-center gap-2 text-sm text-[var(--gold)] hover:text-white transition-colors duration-300 mb-8"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Press &amp; Updates
          </Link>

          <div className="h-px w-16 bg-[var(--gold)] mb-6" />

          <div className="mb-4">
            <span className="inline-flex items-center rounded-full bg-[var(--gold)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--dark-bg)]">
              {label}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/60">
            {post.author && (
              <span className="font-medium">By {post.author}</span>
            )}
            {post.author && post.published_at && (
              <span aria-hidden="true" className="text-white/30">•</span>
            )}
            {post.published_at && (
              <time dateTime={post.published_at}>
                {formatDate(post.published_at)}
              </time>
            )}
          </div>
        </div>
      </section>

      {/* ── Cover image ── */}
      {post.cover_image_url && (
        <div className="relative w-full max-h-[400px] overflow-hidden bg-[var(--gray-100)]">
          <div className="relative w-full" style={{ height: "400px" }}>
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* ── Article body ── */}
      <article className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <div className="post-prose text-lg">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: (props) => (
                <h1
                  className="text-3xl md:text-4xl font-bold text-[var(--gray-900)] mt-10 mb-4 leading-tight"
                  {...props}
                />
              ),
              h2: (props) => (
                <h2
                  className="text-2xl md:text-3xl font-bold text-[var(--gray-900)] mt-10 mb-4 leading-tight"
                  {...props}
                />
              ),
              h3: (props) => (
                <h3
                  className="text-xl md:text-2xl font-bold text-[var(--gray-900)] mt-8 mb-3 leading-snug"
                  {...props}
                />
              ),
              h4: (props) => (
                <h4
                  className="text-lg font-semibold text-[var(--gray-900)] mt-6 mb-2"
                  {...props}
                />
              ),
              p: (props) => (
                <p
                  className="text-[var(--gray-700)] leading-relaxed mb-5"
                  {...props}
                />
              ),
              a: ({ href, ...props }) => (
                <a
                  href={href}
                  className="text-[var(--gold)] hover:text-[var(--gold-dark)] font-medium underline-offset-2 hover:underline"
                  {...props}
                />
              ),
              ul: (props) => (
                <ul
                  className="list-disc pl-6 mb-5 space-y-2 text-[var(--gray-700)]"
                  {...props}
                />
              ),
              ol: (props) => (
                <ol
                  className="list-decimal pl-6 mb-5 space-y-2 text-[var(--gray-700)]"
                  {...props}
                />
              ),
              li: (props) => (
                <li className="leading-relaxed" {...props} />
              ),
              blockquote: (props) => (
                <blockquote
                  className="border-l-4 border-[var(--gold)] pl-4 italic text-[var(--gray-700)] my-6"
                  {...props}
                />
              ),
              strong: (props) => (
                <strong
                  className="font-semibold text-[var(--gray-900)]"
                  {...props}
                />
              ),
              em: (props) => <em className="italic" {...props} />,
              hr: () => (
                <hr className="my-10 border-t border-[var(--gray-200)]" />
              ),
              code: ({ children, ...props }) => (
                <code
                  className="bg-[var(--gray-100)] text-[var(--gray-900)] px-1.5 py-0.5 rounded text-[0.9em] font-mono"
                  {...props}
                >
                  {children}
                </code>
              ),
              pre: (props) => (
                <pre
                  className="bg-[var(--dark-bg)] text-white p-4 rounded-lg overflow-x-auto my-6 text-sm"
                  {...props}
                />
              ),
              img: ({ src, alt }) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={typeof src === "string" ? src : ""}
                  alt={alt ?? ""}
                  className="rounded-lg my-6 max-w-full h-auto"
                />
              ),
              table: (props) => (
                <div className="overflow-x-auto my-6">
                  <table
                    className="min-w-full border border-[var(--gray-200)] text-sm"
                    {...props}
                  />
                </div>
              ),
              thead: (props) => (
                <thead className="bg-[var(--gray-50)]" {...props} />
              ),
              th: (props) => (
                <th
                  className="px-4 py-2 text-left font-semibold text-[var(--gray-900)] border-b border-[var(--gray-200)]"
                  {...props}
                />
              ),
              td: (props) => (
                <td
                  className="px-4 py-2 text-[var(--gray-700)] border-b border-[var(--gray-200)]"
                  {...props}
                />
              ),
            }}
          >
            {post.body}
          </ReactMarkdown>
        </div>
      </article>

      {/* ── Bottom CTA ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)] border-t border-[var(--gold)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-b from-[var(--gold)]/5 to-transparent p-6 md:p-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
                Continue Reading
              </span>
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              More from the Sultanate
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Explore additional press releases, articles, and updates from the
              Sultanate of Amexem.
            </p>
            <Link
              href="/press"
              className="inline-flex items-center gap-2 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold px-8 py-3 rounded-lg hover:bg-[var(--gold)]/90 transition-colors duration-300"
            >
              Read More
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
