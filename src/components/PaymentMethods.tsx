"use client";

const paymentMethods = [
  {
    name: "CashApp",
    tag: "$unitedroyalmonarchs",
    href: "https://cash.app/$unitedroyalmonarchs",
    color: "#00D632",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M23.59 3.47A5.1 5.1 0 0020.55.42C19.72.15 18.61 0 17.13 0H6.87C5.39 0 4.28.15 3.45.42A5.1 5.1 0 00.41 3.47C.14 4.29 0 5.4 0 6.87v10.26c0 1.47.14 2.58.41 3.4a5.1 5.1 0 003.04 3.05c.83.28 1.94.42 3.42.42h10.26c1.48 0 2.59-.14 3.42-.42a5.1 5.1 0 003.04-3.05c.27-.82.41-1.93.41-3.4V6.87c0-1.47-.14-2.58-.41-3.4zM17.4 14.63c-.47.47-1.14.82-2.03 1.06l.28 1.27a.49.49 0 01-.47.58h-1.76a.49.49 0 01-.48-.4l-.22-1.09c-.81-.07-1.64-.25-2.49-.54a.49.49 0 01-.31-.6l.33-1.31a.49.49 0 01.65-.33c.85.35 1.67.53 2.45.53.73 0 1.26-.18 1.26-.7 0-.47-.46-.67-1.55-.99-1.55-.45-3.25-1.07-3.25-3.08 0-1.39.93-2.53 2.55-2.94l-.23-1.04a.49.49 0 01.47-.59h1.76c.23 0 .43.16.48.39l.2.99c.62.07 1.25.2 1.88.42a.49.49 0 01.3.61l-.32 1.24a.49.49 0 01-.64.32 5.5 5.5 0 00-2-.4c-.85 0-1.18.28-1.18.64 0 .44.53.66 1.54.96 1.62.43 3.36 1.06 3.36 3.12 0 .73-.22 1.37-.63 1.88z" />
      </svg>
    ),
  },
  {
    name: "Zelle",
    tag: "Send via Zelle",
    href: null,
    color: "#6D1ED4",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M13.559 24h-2.841a.483.483 0 0 1-.483-.483v-5.765H3.12a.483.483 0 0 1-.369-.793l10.9-13.424a.483.483 0 0 1.853.31v5.765h7.115a.483.483 0 0 1 .369.793L11.088 23.828a.483.483 0 0 1-.369.172h2.84z" />
      </svg>
    ),
  },
  {
    name: "Square",
    tag: "Pay with Square",
    href: null,
    color: "#006AFF",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M4.01 0A4.01 4.01 0 000 4.01v15.98A4.01 4.01 0 004.01 24h15.98A4.01 4.01 0 0024 19.99V4.01A4.01 4.01 0 0019.99 0zm1.62 4.36h12.74c.7 0 1.27.57 1.27 1.27v12.74c0 .7-.57 1.27-1.27 1.27H5.63c-.7 0-1.27-.57-1.27-1.27V5.63c0-.7.57-1.27 1.27-1.27zm3.18 3.18a.64.64 0 00-.63.64v7.64c0 .35.28.64.63.64h6.38c.35 0 .63-.29.63-.64V8.18a.64.64 0 00-.63-.64z" />
      </svg>
    ),
  },
];

export default function PaymentMethods() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {paymentMethods.map((method) => {
        const content = (
          <div className="flex items-center gap-4 p-5 border border-[var(--gray-200)] rounded-lg hover:shadow-md transition-all group cursor-pointer">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: method.color }}
            >
              {method.icon}
            </div>
            <div>
              <p className="font-semibold text-[var(--gray-900)] group-hover:text-[var(--cherry-red)] transition-colors">
                {method.name}
              </p>
              <p className="text-sm text-[var(--gray-500)]">{method.tag}</p>
            </div>
          </div>
        );

        if (method.href) {
          return (
            <a
              key={method.name}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content}
            </a>
          );
        }

        return <div key={method.name}>{content}</div>;
      })}
    </div>
  );
}
