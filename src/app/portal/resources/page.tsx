"use client";

const resources = [
  {
    category: "Heritage & History",
    items: [
      { title: "Origins of the Nation of Moab", type: "Article" },
      { title: "Historical Timeline", type: "Guide" },
      { title: "Cultural Traditions & Practices", type: "Article" },
    ],
  },
  {
    category: "Governance & Law",
    items: [
      { title: "Understanding the Constitution", type: "Guide" },
      { title: "Rights & Responsibilities of Members", type: "Article" },
      { title: "Governance Structure Overview", type: "Guide" },
    ],
  },
  {
    category: "Education",
    items: [
      { title: "New Member Orientation Guide", type: "Guide" },
      { title: "Community Building Handbook", type: "Manual" },
      { title: "Heritage Preservation Methods", type: "Article" },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--gray-900)]">
          Exclusive Resources
        </h1>
        <p className="text-[var(--gray-500)] mt-1">
          Members-only educational materials and historical archives
        </p>
      </div>

      <div className="space-y-8">
        {resources.map((section) => (
          <div key={section.category}>
            <h2 className="text-lg font-semibold text-[var(--gray-900)] mb-3">
              {section.category}
            </h2>
            <div className="space-y-2">
              {section.items.map((item) => (
                <div
                  key={item.title}
                  className="bg-white p-4 rounded-lg border border-[var(--gray-200)] flex items-center justify-between hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-[var(--gray-900)]">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-xs text-[var(--gray-500)] bg-[var(--gray-100)] px-2 py-1 rounded">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-[var(--gray-100)] rounded-lg">
        <p className="text-sm text-[var(--gray-500)]">
          New resources are added regularly. Check back often for updated
          materials and archives.
        </p>
      </div>
    </div>
  );
}
