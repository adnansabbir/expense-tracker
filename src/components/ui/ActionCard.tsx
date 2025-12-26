"use client";

export default function ActionCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <button
      className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-left
                 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-black dark:hover:bg-zinc-900"
    >
      <p className="font-medium">{title}</p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
    </button>
  );
}
