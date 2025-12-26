"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function AppHeader() {
  const auth = useAppSelector((s) => s.auth);
  const isLoggedIn = auth.status === "signedIn";
  const userLabel = auth.user?.name || auth.user?.email || "User";

  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        {/* Brand / Welcome */}
        {isLoggedIn ? (
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Welcome</p>
            <p className="text-base font-semibold">{userLabel}</p>
          </div>
        ) : (
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-semibold"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black">
              $
            </div>
            Expense Tracker
          </Link>
        )}

        {/* Right side */}
        {isLoggedIn && (
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium
                         hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              Account ▾
            </button>

            {open && (
              <>
                {/* Click-outside overlay */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setOpen(false)}
                />

                <div
                  className="absolute right-0 z-20 mt-2 w-40 rounded-md border
                             border-zinc-200 bg-white shadow-lg
                             dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <button
                    className="block w-full px-4 py-2 text-left text-sm
                               hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    onClick={() => {
                      setOpen(false);
                      router.push("/profile");
                    }}
                  >
                    Profile
                  </button>

                  <button
                    className="block w-full px-4 py-2 text-left text-sm text-red-600
                               hover:bg-zinc-100 dark:text-red-500 dark:hover:bg-zinc-900"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
