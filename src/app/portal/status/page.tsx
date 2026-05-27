"use client";

const steps = [
  { label: "Application Submitted", completed: true, date: "Pending" },
  { label: "Under Review", completed: false, date: null },
  { label: "Orientation Scheduled", completed: false, date: null },
  { label: "Citizenship Granted", completed: false, date: null },
];

export default function StatusPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--gray-900)]">
          Application Status
        </h1>
        <p className="text-[var(--gray-500)] mt-1">
          Track the progress of your citizenship application
        </p>
      </div>

      <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <p className="font-semibold text-[var(--gray-900)]">
            Application In Progress
          </p>
        </div>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <div key={step.label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    step.completed
                      ? "bg-[var(--forest-green)] text-white"
                      : "border-2 border-[var(--gray-300)] text-[var(--gray-300)]"
                  }`}
                >
                  {step.completed ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-xs font-bold">{i + 1}</span>
                  )}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-0.5 h-12 ${
                      step.completed ? "bg-[var(--forest-green)]" : "bg-[var(--gray-200)]"
                    }`}
                  />
                )}
              </div>
              <div className="pb-12">
                <p
                  className={`font-medium text-sm ${
                    step.completed ? "text-[var(--gray-900)]" : "text-[var(--gray-500)]"
                  }`}
                >
                  {step.label}
                </p>
                {step.date && (
                  <p className="text-xs text-[var(--gray-500)] mt-0.5">
                    {step.date}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[var(--gray-100)] rounded-lg p-4">
        <p className="text-sm text-[var(--gray-500)]">
          Your application status is updated by our administrative office. If you
          have questions about your application, please{" "}
          <a href="/contact" className="text-[var(--cherry-red)] hover:underline">
            contact us
          </a>
          .
        </p>
      </div>
    </div>
  );
}
