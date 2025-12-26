import { Suspense } from "react";
import LoginClient from "./login-client";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginClient />
    </Suspense>
  );
}

function LoginSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <h1>Hello</h1>
      <div className="w-full max-w-sm rounded-xl border p-6">
        <div className="h-6 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-2 h-4 w-64 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-6 space-y-4">
          <div className="h-10 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-10 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-10 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}
