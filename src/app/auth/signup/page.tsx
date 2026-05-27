"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase-client";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <Image
            src="/images/emblem.svg"
            alt="Sultanate of Amexem"
            width={64}
            height={64}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-[var(--gray-900)] mb-2">
            Check Your Email
          </h1>
          <p className="text-[var(--gray-500)] mb-6">
            We&apos;ve sent a confirmation link to <strong>{email}</strong>.
            Click the link to activate your account and access the Citizen Portal.
          </p>
          <Link
            href="/auth/login"
            className="text-[var(--cherry-red)] hover:underline font-medium"
          >
            Return to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/images/emblem.svg"
            alt="Sultanate of Amexem"
            width={64}
            height={64}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-[var(--gray-900)]">
            Create Your Account
          </h1>
          <p className="text-sm text-[var(--gray-500)] mt-1">
            Register to access the Citizen Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-[var(--gray-700)] mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--forest-green)]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--gray-700)] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--forest-green)]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[var(--gray-700)] mb-1.5">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--forest-green)]"
            />
            <p className="text-xs text-[var(--gray-500)] mt-1">
              Minimum 8 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[var(--forest-green)] text-white font-semibold rounded-md hover:bg-[var(--forest-green-dark)] transition-colors disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--gray-500)] mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[var(--cherry-red)] hover:underline font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
