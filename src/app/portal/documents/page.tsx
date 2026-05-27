"use client";

const documents = [
  {
    name: "Constitution & Bylaws",
    description:
      "The supreme governing instrument of the Sultanate of Amexem, adopted May 27, 2026.",
    type: "PDF",
    status: "Available",
    href: "/documents/constitution.pdf",
  },
  {
    name: "Membership Certificate",
    description: "Your official membership certificate for the Sultanate of Amexem.",
    type: "PDF",
    status: "Available",
  },
  {
    name: "Membership ID Card",
    description: "Your digital membership identification card.",
    type: "PDF",
    status: "Available",
  },
  {
    name: "Official Proclamation",
    description: "Official proclamation and declaration documents.",
    type: "PDF",
    status: "Available",
  },
  {
    name: "Heritage Guide",
    description: "Comprehensive guide to the history and heritage of the Nation of Moab.",
    type: "PDF",
    status: "Available",
  },
];

export default function DocumentsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--gray-900)]">Documents</h1>
        <p className="text-[var(--gray-500)] mt-1">
          View and download your official membership documents
        </p>
      </div>

      <div className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.name}
            className="bg-white p-5 rounded-lg border border-[var(--gray-200)] flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-[var(--cherry-red)] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-[var(--gray-900)] text-sm">
                  {doc.name}
                </h3>
                <p className="text-xs text-[var(--gray-500)] truncate">
                  {doc.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-[var(--gray-500)] bg-[var(--gray-100)] px-2 py-1 rounded">
                {doc.type}
              </span>
              {"href" in doc && doc.href ? (
                <a
                  href={doc.href}
                  download
                  className="text-sm text-[var(--forest-green)] hover:underline font-medium"
                >
                  Download
                </a>
              ) : (
                <button className="text-sm text-[var(--forest-green)] hover:underline font-medium">
                  Download
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-[var(--gray-100)] rounded-lg">
        <p className="text-sm text-[var(--gray-500)]">
          Document downloads will be enabled once your account is verified by an
          administrator. Contact us if you need immediate access.
        </p>
      </div>
    </div>
  );
}
