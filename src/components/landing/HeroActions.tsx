"use client";

import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

export default function HeroActions() {
  const auth = useAppSelector((s) => s.auth);
  const isLoggedIn = auth.status === "signedIn";

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
        Track shared expenses.
        <br />
        Know who owes whom.
      </h1>

      <p className="max-w-xl text-base text-zinc-600 dark:text-zinc-400">
        A simple expense and money tracking app for friends and family.
        Record who owes you, what you owe others, and settle up without
        confusion.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {isLoggedIn ? (
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-md
                       bg-black px-5 py-2.5 text-sm font-medium text-white
                       hover:bg-zinc-900
                       dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Go to dashboard
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md
                         bg-black px-5 py-2.5 text-sm font-medium text-white
                         hover:bg-zinc-900
                         dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-md
                         border border-zinc-300 px-5 py-2.5 text-sm font-medium
                         hover:bg-zinc-100
                         dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              Create account
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
