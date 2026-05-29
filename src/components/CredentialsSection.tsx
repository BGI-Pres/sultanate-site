"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { trackSquareClick } from "@/lib/analytics";

export default function CredentialsSection() {
  const [isActiveMember, setIsActiveMember] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setIsActiveMember(!!data.user);
      setLoading(false);
    });
  }, []);

  const credentials = [
    {
      name: "Moorish Pin",
      price: "$15",
      description:
        "Official pin representing your standing and identity.",
      href: "https://square.link/u/rPfSwh6U",
    },
    {
      name: "Membership Card",
      price: "$20",
      description:
        "Official laminated identification card with your name and tier.",
      href: "https://checkout.square.site/merchant/MLY7VX3JN2XVT/checkout/ZSBH2MH4VRP7OB3NQ5LQHMPZ",
      restriction: "Approved members only",
      applyHref: "/apply/membership-card",
      applyLabel: "Apply Now",
    },
    {
      name: "Business Certification",
      price: "$75",
      description:
        "Official business certification for enterprises operating under the custodianship.",
      href: "https://checkout.square.site/merchant/MLY7VX3JN2XVT/checkout/KAFT73NFETT66RBDDKLQFJWG",
      restriction: "Current members only",
      applyHref: "/certify",
      applyLabel: "Apply Now",
    },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-[var(--gold)]" />
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] font-semibold">
            Official Credentials
          </span>
          <div className="h-px w-12 bg-[var(--gold)]" />
        </div>
        <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-10">
          Credentials &amp; Identification
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {credentials.map((item) => (
            <div
              key={item.name}
              className="group p-6 rounded-xl border border-[var(--gray-200)] bg-white hover:border-[var(--gold)] hover:shadow-lg hover:shadow-[var(--gold)]/5 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--dark-bg)] text-[var(--gold)] flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                    />
                  </svg>
                </div>
                <span className="text-xl font-bold text-[var(--gold)]">
                  {item.price}
                </span>
              </div>
              <h3 className="font-semibold text-[var(--gray-900)] mb-1">
                {item.name}
              </h3>
              <p className="text-sm text-[var(--gray-500)] mb-3 leading-relaxed">
                {item.description}
              </p>

              <div className="flex items-center justify-between gap-2 flex-wrap">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackSquareClick(item.name, item.href)}
                  className="text-xs font-medium text-[var(--gold)] hover:text-[var(--gold-dark)] transition-colors"
                >
                  Purchase &rarr;
                </a>

                {item.applyHref && !loading && (
                  isActiveMember ? (
                    <Link
                      href={item.applyHref}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[var(--gold)] text-[var(--dark-bg)] text-xs font-semibold rounded-lg hover:bg-[var(--gold-light)] transition-colors"
                    >
                      {item.applyLabel}
                    </Link>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 border border-[var(--gray-300)] text-[var(--gray-500)] text-xs font-medium rounded-lg hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
                    >
                      Sign in to apply
                    </Link>
                  )
                )}
              </div>

              {item.restriction && (
                <span className="inline-block mt-3 text-[11px] text-[var(--cherry-red)] bg-red-50 px-2.5 py-1 rounded-full font-medium">
                  {item.restriction}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
