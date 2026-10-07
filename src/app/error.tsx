"use client";

import { ErrorFallback } from "@/shared/components/error-fallback";

type ErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function Error({ error, retry }: ErrorProps) {
  return <ErrorFallback error={error} onRetry={retry} />;
}
