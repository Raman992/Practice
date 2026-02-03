"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-black px-6 text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/30 blur-3xl" />
      </div>

      <div className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
          404 Error
        </p>

        <h1 className="mt-4 text-6xl font-bold tracking-tight sm:text-7xl">
          Page not found
        </h1>

        <p className="mt-6 text-lg text-slate-300">
          Sorry, the user you’re looking for doesn’t exist or was removed.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
          >
            Go home
          </Link>

        <Button onClick={() => router.back()}>Go Back</Button>

        </div>
      </div>
    </div>
  );
}
