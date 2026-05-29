import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 60;

export const metadata: Metadata = {
  title:
    "Press & Updates — Official Statements from the Sultanate of Amexem",
  description:
    "Read official proclamations, news, and Moorish American community updates from the Sultanate of Amexem — announcements for the Nation of Moab descendants.",
  alternates: { canonical: "/press" },
};

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
}

const POST_TYPE_LABELS: Record<PostType, string> = {
  press_release: "Press Release",
  article: "Article",
  spotlight: "Spotlight",
  event_recap: "Event Recap",
};

// Different gold tints per post type
const POST_TYPE_BADGE_CLASSES: Record<PostType, string> = {
  press_release:
    "bg-[var(--gold)] text-[var(--dark-bg)]",
  article:
    "bg-[var(--gold)]/15 text-[var(--gold-dark)] border border-[var(--gold)]/30",
  spotlight:
    "bg-[var(--gold-light)]/25 text-[var(--gold-dark)] border border-[var(--gold-light)]/40",
  event_recap:
    "bg-[var(--gold-dark)]/15 text-[var(--gold-dark)] border border-[var(--gold-dark)]/30",
};

async function getPublishedPosts(): Promise<Post[]> {
  try {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      return [];
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error } = await supabase
      .from("posts")
      .select(
        "id, slug, title, excerpt, body, post_type, cover_image_url, author, published_at"
      )
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error || !data) return [];
    return data as Post[];
  } catch {
    return [];
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

function deriveExcerpt(post: Post): string {
  if (post.excerpt && post.excerpt.trim().length > 0) return post.excerpt;
  // Strip basic markdown noise and take first 160 chars
  const stripped = post.body
    .replace(/[#>*_`~\-]+/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return stripped.length > 160 ? `${stripped.slice(0, 160).trim()}…` : stripped;
}

export default async function PressPage() {
  const posts = await getPublishedPosts();

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

      {/* ── Articles & Updates (dynamic posts) ── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
              Articles &amp; Updates
            </span>
            <div className="h-px w-12 bg-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-10">
            Press Releases & Updates
          </h2>

          {posts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[var(--gray-300)] bg-white p-10 text-center">
              <p className="text-[var(--gray-500)]">
                No published articles yet — check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const badgeClass =
                  POST_TYPE_BADGE_CLASSES[post.post_type] ??
                  POST_TYPE_BADGE_CLASSES.article;
                const label =
                  POST_TYPE_LABELS[post.post_type] ?? "Article";
                const excerpt = deriveExcerpt(post);

                return (
                  <article
                    key={post.id}
                    className="group flex flex-col overflow-hidden rounded-xl border border-[var(--gray-200)] bg-white transition-all duration-300 hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5"
                  >
                    {post.cover_image_url && (
                      <Link
                        href={`/press/${post.slug}`}
                        className="relative block aspect-[16/9] w-full overflow-hidden bg-[var(--gray-100)]"
                      >
                        <Image
                          src={post.cover_image_url}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>
                    )}
                    <div className="flex flex-1 flex-col p-5 md:p-6">
                      <div className="mb-3 flex items-center gap-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${badgeClass}`}
                        >
                          {label}
                        </span>
                        {post.published_at && (
                          <span className="text-xs text-[var(--gray-500)]">
                            {formatDate(post.published_at)}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-2 leading-snug">
                        <Link
                          href={`/press/${post.slug}`}
                          className="hover:text-[var(--gold-dark)] transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      {excerpt && (
                        <p className="text-sm text-[var(--gray-700)] leading-relaxed mb-4 line-clamp-4">
                          {excerpt}
                        </p>
                      )}
                      <div className="mt-auto pt-2">
                        <Link
                          href={`/press/${post.slug}`}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--gold-dark)] hover:text-[var(--gold)] transition-colors"
                        >
                          Read more <span aria-hidden="true">&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

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
