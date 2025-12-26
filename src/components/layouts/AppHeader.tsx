"use client";

import { logout } from "@/lib/supabase/client";
import { useAppSelector } from "@/store/hooks";

export default function AppHeader() {
  const auth = useAppSelector((s) => s.auth);
  const userLabel = auth.user?.name || auth.user?.email || "User";

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Welcome</p>
          <p className="text-base font-semibold">{userLabel}</p>
        </div>
        <button
          onClick={logout}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium
                       hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
