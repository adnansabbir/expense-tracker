"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { usePathname } from "next/navigation";

function DropDownButton({
  name,
  onClick,
  danger,
  isActive = false,
}: {
  name: string;
  onClick: () => void;
  isActive?: boolean;
  danger?: boolean;
}) {
  console.log(name, isActive);
  return (
    <button
      type="button"
      role="menuitem"
      disabled={isActive}
      onClick={onClick}
      className={[
        "block w-full px-4 py-2 text-left text-sm",
        "hover:bg-zinc-100 dark:hover:bg-zinc-900",
        isActive ? "bg-zinc-800" : "bg-zinc-900",
        danger ? "text-red-600 dark:text-red-500" : "",
      ].join(" ")}
    >
      {name}
    </button>
  );
}

export default function AppHeader() {
  const auth = useAppSelector((s) => s.auth);
  const isLoggedIn = auth.status === "signedIn";
  const userLabel = auth.user?.displayName || auth.user?.email || "User";
  const pathname = usePathname();

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
        {/* Brand (always) */}
        <Link
          href={isLoggedIn ? "/dashboard" : "/"}
          className="flex items-center gap-2 text-base font-semibold"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black">
            $
          </div>
          <span className="text-zinc-900 dark:text-zinc-100">
            Expense Tracker
          </span>
        </Link>

        {/* Right side */}
        {isLoggedIn && (
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium
                     hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
              aria-haspopup="menu"
              aria-expanded={open}
            >
              {/* Mobile: 3 dots */}
              <span className="sm:hidden text-lg leading-none">⋯</span>
              {/* Desktop: label */}
              <span className="hidden sm:inline">Account ▾</span>
            </button>

            {open && (
              <>
                {/* Click-outside overlay */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setOpen(false)}
                />

                <div
                  className="absolute right-0 z-20 mt-2 w-56 rounded-md border
                         border-zinc-200 bg-white shadow-lg
                         dark:border-zinc-800 dark:bg-zinc-950"
                  role="menu"
                >
                  {/* Logged in as (not clickable) */}
                  <div className="px-4 py-3">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Logged in as
                    </p>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                      {userLabel}
                    </p>
                  </div>

                  <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

                  <DropDownButton
                    name="Dashboard"
                    isActive={pathname.startsWith("/dashboard")}
                    onClick={() => {
                      setOpen(false);
                      router.push("/dashboard");
                    }}
                  />

                  <DropDownButton
                    name="Profile"
                    isActive={pathname.startsWith("/profile")}
                    onClick={() => {
                      setOpen(false);
                      router.push("/profile");
                    }}
                  />

                  <DropDownButton
                    name="Logout"
                    danger
                    onClick={() => {
                      setOpen(false);
                      void logout();
                    }}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
