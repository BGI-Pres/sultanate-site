"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";

export default function WelcomePage() {
  const [name, setName] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setName(
        data.user?.user_metadata?.full_name ||
          data.user?.email?.split("@")[0] ||
          "Citizen"
      );
    });
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="text-center mb-10">
        <Image
          src="/images/emblem.svg"
          alt="Sultanate of Amexem"
          width={80}
          height={80}
          className="mx-auto mb-5"
        />
        <h1 className="text-3xl font-bold text-[var(--gray-900)] mb-3">
          Welcome, {name}
        </h1>
        <p className="text-[var(--gray-500)] leading-relaxed">
          Your registration with the Sultanate of Amexem has been received.
          As Custodian of the Nation of Moab, we are honored to welcome you
          to our community. Below are your next steps to complete your
          citizenship process.
        </p>
      </div>

      <div className="space-y-4 mb-10">
        <div className="bg-white p-6 rounded-lg border border-[var(--gray-200)]">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-[var(--forest-green)] text-white flex items-center justify-center text-sm font-bold shrink-0">
              1
            </div>
            <div>
              <h3 className="font-semibold text-[var(--gray-900)] mb-1">
                Begin Your Citizenship Application
              </h3>
              <p className="text-sm text-[var(--gray-500)] mb-3">
                Submit your formal application for citizenship in the
                Sultanate of Amexem. This initiates the official review process
                administered by our governing body.
              </p>
              <Link
                href="/portal/status"
                className="inline-block px-4 py-2 text-sm bg-[var(--forest-green)] text-white rounded-md hover:bg-[var(--forest-green-dark)] transition-colors"
              >
                Start Application
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-[var(--gray-200)]">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-[var(--cherry-red)] text-white flex items-center justify-center text-sm font-bold shrink-0">
              2
            </div>
            <div>
              <h3 className="font-semibold text-[var(--gray-900)] mb-1">
                Review Official Documents
              </h3>
              <p className="text-sm text-[var(--gray-500)] mb-3">
                Access the Constitution, founding proclamations, and
                governance documents of the Sultanate. Understanding our
                framework is essential to citizenship.
              </p>
              <Link
                href="/portal/documents"
                className="inline-block px-4 py-2 text-sm border border-[var(--gray-300)] text-[var(--gray-700)] rounded-md hover:bg-[var(--gray-50)] transition-colors"
              >
                View Documents
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-[var(--gray-200)]">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full border-2 border-[var(--gray-300)] text-[var(--gray-300)] flex items-center justify-center text-sm font-bold shrink-0">
              3
            </div>
            <div>
              <h3 className="font-semibold text-[var(--gray-900)] mb-1">
                Explore Exclusive Resources
              </h3>
              <p className="text-sm text-[var(--gray-500)]">
                Access members-only educational materials covering heritage,
                governance, and community building within the Nation of Moab.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/portal"
          className="text-sm text-[var(--cherry-red)] hover:underline font-medium"
        >
          Skip to Dashboard &rarr;
        </Link>
      </div>
    </div>
  );
}
