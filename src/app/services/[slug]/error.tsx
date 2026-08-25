"use client";

import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-24 text-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-red-600 mb-3">Something went wrong</h2>
      <p className="text-sm text-gray-600 mb-6">
        An error occurred while loading this enterprise service page.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B6E4F] text-white text-sm font-semibold"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
        <Link
          href="/services"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-200 text-gray-800 text-sm font-semibold"
        >
          <Home size={16} />
          Back to Services
        </Link>
      </div>
    </div>
  );
}
