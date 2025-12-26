import HeroActions from "@/components/landing/HeroActions";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4">
        {/* Hero */}
        <HeroActions />

        {/* Features */}
        <section className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Feature
            title="Simple"
            description="No categories, no clutter. Just who owes whom."
          />
          <Feature
            title="Offline-first"
            description="Add entries even without internet. Syncs later."
          />
          <Feature
            title="Private"
            description="Your data stays between you and the people you trust."
          />
        </section>

        {/* Footer */}
        <footer className="mt-20 text-sm text-zinc-500 dark:text-zinc-400">
          Built for personal use • No ads • No noise
        </footer>
      </div>
    </main>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className="rounded-xl border border-zinc-200 bg-white p-4
                    dark:border-zinc-800 dark:bg-zinc-950"
    >
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
}
