import type { Metadata } from "next";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title:
    "Press & Updates — Official Statements from the Sultanate of Amexem",
  description:
    "Read official proclamations, news, and Moorish American community updates from the Sultanate of Amexem — announcements for the Nation of Moab descendants.",
  alternates: { canonical: "/press" },
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

const pressReleases = [
  {
    title: "Sultanate of Amexem Reconstituted as Custodial Authority",
    date: "October 2020",
    summary:
      "The Sultanate of Amexem was formally reconstituted as the custodial governing authority for the protection, security, and advancement of the descendants of the Nation of Moab. This restoration marks the continuation of governance rooted in nationality, law, and the customs of our ancestors — a governing body that had always existed in principle and in the hearts of our people.",
  },
  {
    title: "Digital Platform Launched for Member Services",
    date: "May 2026",
    summary:
      "The Sultanate launched its official digital platform to serve the membership with streamlined access to nationality services, governance updates, and institutional resources. The platform represents a critical step in modernizing the administrative infrastructure of the nation while maintaining the authority and traditions of our governance.",
  },
  {
    title: "Collective Economics Initiative Announced",
    date: "2026",
    summary:
      "The Sultanate announced a comprehensive collective economics initiative through Bey Group International, establishing cooperative commerce frameworks for the membership. This initiative focuses on wealth building, business development, and economic self-determination as the material foundation of national sovereignty.",
  },
];

export default async function PressPage() {
  const posts = await getPosts();

  return (
    <>
      {/* ── Hero header ── */}
      <section className="bg-[var(--dark-bg)] py-12 md:py-20 border-b-2 border-[var(--gold)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px w-16 bg-[var(--gold)] mb-6" />
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Press &amp; Updates
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            Official statements, news, and media resources from the Sultanate of
            Amexem. The world will know us as we are — not as we have been
            described. All press inquiries should be directed through our
            official channels.
          </p>
        </div>
      </section>

      {/* ── Official Statements ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Official Statements
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-10">
            Press Releases
          </h2>

          <div className="space-y-6">
            {pressReleases.map((release) => (
              <div
                key={release.title}
                className="rounded-xl border border-[var(--gray-200)] bg-white p-6 md:p-8 transition-all duration-300 hover:border-[var(--gold)] hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--dark-bg)] shrink-0">
                    <svg
                      className="w-6 h-6 text-[var(--gold)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm text-[var(--gold)] font-medium">
                      {release.date}
                    </span>
                    <h3 className="text-lg font-semibold text-[var(--gray-900)] mt-1 mb-3">
                      {release.title}
                    </h3>
                    <p className="text-[var(--gray-700)] leading-relaxed text-[15px]">
                      {release.summary}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── News Feed ── */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="border border-[var(--gray-200)] bg-white rounded-xl hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300"
              >
                <Link href={`/news/${post.id}`} className="block p-5 md:p-8">
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
                </Link>
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

      {/* ── Media Kit ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Media Kit
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-10 text-center">
            For Press &amp; Media Professionals
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="rounded-xl border border-[var(--gold)]/20 bg-gradient-to-b from-[var(--gold)]/5 to-transparent p-6 md:p-8">
              <h3 className="text-lg font-semibold text-white mb-4">
                About the Sultanate of Amexem
              </h3>
              <div className="space-y-4 text-white/60 leading-relaxed text-[15px]">
                <p>
                  The Sultanate of Amexem is the custodial governing authority
                  for the protection and security of the descendants of the
                  Nation of Moab, reconstituted in October 2020. The Sultanate
                  operates under the supreme authority of Allah, administered
                  by the Executive Director and Supreme Grand Counsel.
                </p>
                <p>
                  Our mandate encompasses three pillars: the proclamation and
                  protection of nationality, the establishment of economic
                  security through collective economics, and the comprehensive
                  presentation of our customs, traditions, and culture on the
                  global stage. Bey Group International serves as the economic
                  arm of this institutional framework.
                </p>
                <p>
                  Media professionals seeking to report on or engage with the
                  Sultanate are expected to do so with accuracy and respect for
                  our institutional authority. We welcome responsible coverage
                  that reflects the facts of our governance and mission.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-[var(--gold)]/20 p-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--gold)]/10 mb-4">
                  <svg
                    className="w-5 h-5 text-[var(--gold)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                    />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-2">
                  Interview Requests
                </h4>
                <p className="text-white/50 text-sm leading-relaxed">
                  All interview requests must be submitted through our official
                  contact channels. We review each request and respond based on
                  editorial context and alignment with our mission.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--gold)]/20 p-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--gold)]/10 mb-4">
                  <svg
                    className="w-5 h-5 text-[var(--gold)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                    />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-2">
                  Brand &amp; Visual Assets
                </h4>
                <p className="text-white/50 text-sm leading-relaxed">
                  Official logos, emblems, and visual assets of the Sultanate
                  may only be used with express authorization. Contact us for
                  approved media assets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Media Inquiries CTA ── */}
      <section className="py-12 md:py-20 bg-[var(--dark-bg)] border-t border-[var(--gold)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center rounded-2xl border border-[var(--gold)]/20 bg-gradient-to-b from-[var(--gold)]/5 to-transparent p-6 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Media Inquiries
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              For press inquiries, interview requests, or media-related
              questions, please reach out through our official contact page. All
              inquiries will be reviewed and responded to by the appropriate
              office of the Sultanate.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold px-8 py-3 rounded-lg hover:bg-[var(--gold)]/90 transition-colors duration-300"
            >
              Contact Us
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
