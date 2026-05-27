import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News",
  description:
    "Latest news, updates, and announcements from the Sultanate of Amexem.",
};

const posts = [
  {
    title: "Welcome to Our New Website",
    date: "2026-05-27",
    excerpt:
      "The Sultanate of Amexem is proud to launch our redesigned official website, built to better serve our citizens and community.",
    category: "Announcement",
  },
  {
    title: "Citizenship Applications Now Open",
    date: "2026-05-27",
    excerpt:
      "We are now accepting applications for citizenship in the Sultanate of Amexem. Learn about the process and membership tiers available.",
    category: "Citizenship",
  },
  {
    title: "Preserving Our Heritage for Future Generations",
    date: "2026-05-27",
    excerpt:
      "An overview of our ongoing initiatives to document, preserve, and share the cultural heritage of the Nation of Moab.",
    category: "Heritage",
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NewsPage() {
  return (
    <>
      <section className="bg-[var(--gray-50)] py-16 border-b border-[var(--gray-200)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[var(--gray-900)] mb-4">
            News &amp; Updates
          </h1>
          <p className="text-lg text-[var(--gray-500)] max-w-3xl">
            Stay informed with the latest announcements, events, and
            developments from the Sultanate of Amexem.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-8">
            {posts.map((post) => (
              <article
                key={post.title}
                className="p-8 border border-[var(--gray-200)] rounded-lg hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-[var(--cherry-red)] bg-red-50 px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-[var(--gray-500)]">
                    {formatDate(post.date)}
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

          <div className="mt-12 text-center">
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
