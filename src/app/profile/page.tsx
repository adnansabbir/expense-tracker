"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseUpdateUserData } from "@/lib/supabase/client";
import { useAppSelector } from "@/store/hooks";
import AppHeader from "@/components/layouts/AppHeader";

export default function ProfilePage() {
  const router = useRouter();
  const auth = useAppSelector((s) => s.auth);
  const initialDisplayName = auth.user?.displayName ?? "";

  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const email = auth.user?.email ?? "—";
  const phone = auth.user?.phone ?? "—";

  const isDirty = displayName !== (auth.user?.displayName ?? "");

  async function onSave() {
    setSubmitting(true);
    setError(null);
    setInfo(null);

    const { error } = await supabaseUpdateUserData({
      data: {
        display_name: displayName,
      },
    });

    if (error) {
      setError(error.message);
      setSubmitting(false);
      return;
    }

    // Trigger your AuthHydrator to pick up the latest user metadata:
    // easiest approach: refresh the route (and auth listener will update redux)
    setInfo("Saved.");
    router.refresh();
    setSubmitting(false);
  }

  function onCancel() {
    setError(null);
    setInfo(null);
    setDisplayName(auth.user?.displayName ?? "");
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-6 space-y-6">
        <h1 className="text-2xl font-semibold">Profile</h1>

        <section className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950 space-y-4">
          <Field label="Email" value={email} />
          <Field label="Phone" value={phone} />

          <div>
            <label className="block text-sm font-medium">Display name</label>
            <input
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2
                         dark:border-zinc-700 dark:bg-black"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
            />
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

          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting || !isDirty}
              className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium
                         hover:bg-zinc-100 disabled:opacity-50
                         dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onSave}
              disabled={submitting || !isDirty}
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white
                         hover:bg-zinc-900 disabled:opacity-50
                         dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {submitting ? "Saving…" : "Save"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
