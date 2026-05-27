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

  async function handleSocialSignup(provider: "google" | "azure") {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/portal/welcome`,
      },
    });
  }

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
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/portal/welcome`,
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
            width={72}
            height={72}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-[var(--gray-900)] mb-2">
            Confirmation Sent
          </h1>
          <p className="text-[var(--gray-500)] mb-2">
            A confirmation has been dispatched to <strong>{email}</strong>.
          </p>
          <p className="text-sm text-[var(--gray-500)] mb-6">
            Please verify your email to complete your registration and gain
            access to the Official Citizen Portal of the Sultanate of Amexem.
          </p>
          <Link
            href="/auth/login"
            className="text-[var(--cherry-red)] hover:underline font-medium"
          >
            Proceed to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/images/emblem.svg"
            alt="Sultanate of Amexem"
            width={72}
            height={72}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-[var(--gray-900)]">
            Citizenship Registration
          </h1>
          <p className="text-sm text-[var(--gray-500)] mt-1">
            Register to begin your journey with the Sultanate of Amexem,
            Custodian of the Nation of Moab
          </p>
        </div>

        {/* Social Signup */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleSocialSignup("google")}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[var(--gray-300)] rounded-md text-sm font-medium text-[var(--gray-700)] bg-white hover:bg-[var(--gray-50)] transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          <button
            onClick={() => handleSocialSignup("azure")}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[var(--gray-300)] rounded-md text-sm font-medium text-[var(--gray-700)] bg-white hover:bg-[var(--gray-50)] transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#F25022" d="M1 1h10v10H1z"/>
              <path fill="#00A4EF" d="M1 13h10v10H1z"/>
              <path fill="#7FBA00" d="M13 1h10v10H13z"/>
              <path fill="#FFB900" d="M13 13h10v10H13z"/>
            </svg>
            Continue with Microsoft
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-[var(--gray-200)]" />
          <span className="text-xs text-[var(--gray-500)] uppercase tracking-wider">or register with email</span>
          <div className="flex-1 h-px bg-[var(--gray-200)]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-[var(--gray-700)] mb-1.5">
              Full Legal Name
            </label>
            <input
              type="text"
              id="fullName"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="As it will appear on official documents"
              className="w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
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
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[var(--gray-700)] mb-1.5">
              Create Password
            </label>
            <input
              type="password"
              id="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[var(--gold)] text-[var(--dark-bg)] font-semibold rounded-md hover:bg-[var(--gold-light)] transition-colors disabled:opacity-50"
          >
            {loading ? "Processing registration..." : "Submit Registration"}
          </button>

          <p className="text-xs text-[var(--gray-500)] text-center">
            By registering, you acknowledge the authority and jurisdiction
            of the Sultanate of Amexem as Custodian of the Nation of Moab.
          </p>
        </form>

        <p className="text-center text-sm text-[var(--gray-500)] mt-6">
          Already registered?{" "}
          <Link href="/auth/login" className="text-[var(--cherry-red)] hover:underline font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
