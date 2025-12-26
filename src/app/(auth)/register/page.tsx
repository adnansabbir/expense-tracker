"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AppHeader from "@/components/layouts/AppHeader";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // If you later enable email confirmations, this controls where the
        // user lands after clicking the email link.
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    if (error) {
      setError(error.message);
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setSuccess(
      "Account created. If email confirmation is enabled, check your inbox before logging in."
    );

    // You can redirect straight to login
    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Auth header */}
      <AppHeader />

      {/* Centered register card */}
      <div className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4">
        <div
          className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-6
                      dark:border-zinc-800 dark:bg-zinc-950"
        >
          <h1 className="text-xl font-semibold">Register</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Create an account with email and password.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2
                         dark:border-zinc-700 dark:bg-black"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2
                         dark:border-zinc-700 dark:bg-black"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Use at least 8 characters.
              </p>
            </div>

            {error && (
              <div
                className="rounded-md border border-red-300 bg-red-50 p-3 text-sm
                            dark:border-red-900 dark:bg-red-950 dark:text-red-200"
              >
                {error}
              </div>
            )}

            {success && (
              <div
                className="rounded-md border border-green-300 bg-green-50 p-3 text-sm
                            dark:border-green-900 dark:bg-green-950 dark:text-green-200"
              >
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-black px-4 py-2 text-white
                       disabled:opacity-60
                       dark:bg-white dark:text-black"
            >
              {submitting ? "Creating…" : "Create account"}
            </button>
          </form>

          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            Already have an account?{" "}
            <Link href="/login" className="font-medium underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
