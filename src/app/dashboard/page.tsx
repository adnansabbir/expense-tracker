"use client";

import Link from "next/link";
import ActionCard from "@/components/ui/ActionCard";
import StatCard from "@/components/ui/StatCard";
import AppHeader from "@/components/layouts/AppHeader";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      {/* Top bar */}
      <AppHeader />

      {/* Content */}
      <main className="mx-auto max-w-3xl px-4 py-6 space-y-4">
        {/* Quick action */}
        <section className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold">Quick action</h2>
          <div className="mt-3">
            <ActionCard
              title="Money to collect"
              description="Record money that someone needs to pay you"
            />
          </div>
        </section>

        {/* Stats */}
        <section className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">This month</h2>
            <Link
              href="/"
              className="text-sm underline text-zinc-600 hover:text-zinc-900
                         dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              View landing
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <StatCard label="You owe" value="—" />
            <StatCard label="Owed to you" value="—" />
          </div>

          <p className="mt-4 text-sm text-zinc-500">
            Next: connect transactions + offline sync.
          </p>
        </section>
      </main>
    </div>
  );
}
