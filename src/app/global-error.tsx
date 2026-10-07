"use client";

import "../shared/styles/globals.css";
import { ErrorFallback } from "@/shared/components/error-fallback";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function GlobalError({ error, retry }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="antialiased">
        <title>Something went wrong</title>
        <ErrorFallback error={error} onRetry={retry} />
      </body>
    </html>
  );
}
