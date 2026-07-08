'use client';

import { AlertCircle } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-4 mb-6">
        <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">Something went wrong</h2>
      <p className="text-muted-foreground text-center max-w-md mb-6">{error.message}</p>
      <button
        onClick={reset}
        className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-blue-600 transition-colors font-medium"
      >
        Try Again
      </button>
    </div>
  );
}
