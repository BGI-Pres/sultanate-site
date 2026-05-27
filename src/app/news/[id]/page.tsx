import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  created_at: string;
}

const fallbackPosts: Post[] = [
  {
    id: "fallback-1",
    title: "Welcome to Our New Website",
    excerpt:
      "The Sultanate of Amexem is proud to launch our redesigned official website, built to better serve our members and community.",
    category: "Announcement",
    created_at: "2026-05-27T00:00:00Z",
  },
  {
    id: "fallback-2",
    title: "Membership Applications Now Open",
    excerpt:
      "We are now accepting applications for membership in the Sultanate of Amexem. Learn about the process and membership tiers available.",
    category: "Membership",
    created_at: "2026-05-27T00:00:00Z",
  },
  {
    id: "fallback-3",
    title: "Preserving Our Heritage for Future Generations",
    excerpt:
      "An overview of our ongoing initiatives to document, preserve, and share the cultural heritage of the Nation of Moab.",
    category: "Heritage",
    created_at: "2026-05-27T00:00:00Z",
  },
];

async function getPost(id: string): Promise<Post | null> {
  // Check fallback posts first
  const fallback = fallbackPosts.find((p) => p.id === id);
  if (fallback) return fallback;

  try {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      return null;
    }

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, excerpt, category, created_at")
      .eq("id", id)
      .single();

    if (error || !data) {
      return null;
    }

    return data as Post;
  } catch {
    return null;
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* ── Hero header ── */}
      <section className="bg-[var(--dark-bg)] py-12 md:py-20 border-b-2 border-[var(--gold)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm text-[var(--gold)] hover:text-white transition-colors duration-300 mb-8"
          >
            <span aria-hidden="true">&larr;</span>
            Back to News
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-[var(--cherry-red)] bg-red-900/30 px-2.5 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-white/50">
              {formatDate(post.created_at)}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>
        </div>
      </section>

      {/* ── Post content ── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-[var(--gray-500)] leading-relaxed text-lg">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* ── Membership CTA ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)] border-t border-[var(--gold)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-b from-[var(--gold)]/5 to-transparent p-6 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Join the Sultanate of Amexem
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Stay connected with our nation and gain access to exclusive
              updates, events, and resources. Membership is open to those who
              share our vision of sovereignty and heritage.
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold px-8 py-3 rounded-lg hover:bg-[var(--gold)]/90 transition-colors duration-300"
            >
              Become a Member
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
