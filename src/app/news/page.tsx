import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "News",
  description:
    "Latest news, updates, and announcements from the Sultanate of Amexem.",
};

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
      "The Sultanate of Amexem is proud to launch our redesigned official website, built to better serve our citizens and community.",
    category: "Announcement",
    created_at: "2026-05-27T00:00:00Z",
  },
  {
    id: "fallback-2",
    title: "Citizenship Applications Now Open",
    excerpt:
      "We are now accepting applications for citizenship in the Sultanate of Amexem. Learn about the process and membership tiers available.",
    category: "Citizenship",
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

async function getPosts(): Promise<Post[]> {
  try {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      return fallbackPosts;
    }

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, excerpt, category, created_at")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackPosts;
    }

    return data as Post[];
  } catch {
    return fallbackPosts;
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsPage() {
  const posts = await getPosts();
  return (
    <>
      <section className="bg-[var(--dark-bg)] py-12 md:py-20 border-b-2 border-[var(--gold)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-16 h-1 bg-[var(--gold)] mb-6" />
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            News &amp; Updates
          </h1>
          <p className="text-lg text-white/70 max-w-3xl">
            Stay informed with the latest announcements, events, and
            developments from the Sultanate of Amexem.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px w-8 bg-[var(--gold)]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              Latest Articles
            </span>
            <div className="h-px flex-1 bg-[var(--gold)]/20" />
          </div>

          <div className="max-w-4xl space-y-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="p-5 md:p-8 border border-[var(--gray-200)] rounded-xl hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-[var(--cherry-red)] bg-red-50 px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-[var(--gray-500)]">
                    {formatDate(post.created_at)}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-[var(--gray-900)] mb-3">
                  {post.title}
                </h2>
                <p className="text-[var(--gray-500)] leading-relaxed">
                  {post.excerpt}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[var(--gold)]" />
              <div className="w-2 h-2 rounded-full bg-[var(--gold)]" />
              <div className="h-px w-12 bg-[var(--gold)]" />
            </div>
            <p className="text-[var(--gray-500)]">
              More updates coming soon. Check back regularly for the latest
              news from the Sultanate.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
