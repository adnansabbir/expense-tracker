"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createClient, supabaseForgotPassword } from "@/lib/supabase/client";
import Link from "next/link";
import AppHeader from "@/components/layouts/AppHeader";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [info, setInfo] = useState<string | null>(null);

  async function onForgotPassword() {
    setError(null);
    setInfo(null);

    if (!email) {
      setError("Enter your email first.");
      return;
    }

    const { error } = await supabaseForgotPassword(email);

    if (error) {
      setError(error.message);
      return;
    }

    setInfo("Password reset email sent. Check your inbox.");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setSubmitting(false);
      return;
    }

    // Make sure the server sees the updated auth cookies.
    router.replace(next);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Auth header */}
      <AppHeader />

      {/* Centered login card */}
      <div className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4">
        <div
          className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-6
                      dark:border-zinc-800 dark:bg-zinc-950"
        >
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Sign in with your email and password.
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-sm underline text-zinc-600 hover:text-zinc-900
                         dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <div
                className="rounded-md border border-red-300 bg-red-50 p-3 text-sm
                            dark:border-red-900 dark:bg-red-950 dark:text-red-200"
              >
                {error}
              </div>
            )}

            {info && (
              <div
                className="rounded-md border border-green-300 bg-green-50 p-3 text-sm
                            dark:border-green-900 dark:bg-green-950 dark:text-green-200"
              >
                {info}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-black px-4 py-2 text-white
                       disabled:opacity-60
                       dark:bg-white dark:text-black"
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            Do not have an account?{" "}
            <Link href="/register" className="font-medium underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
