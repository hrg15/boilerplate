"use client";

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";

type ErrorFallbackProps = {
  error: Error & { digest?: string };
  onRetry: () => void;
};

export const ErrorFallback = ({ error, onRetry }: ErrorFallbackProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-dvh items-center justify-center p-6">
      <Empty role="alert">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <TriangleAlert />
          </EmptyMedia>
          <EmptyTitle>Something went wrong</EmptyTitle>
          <EmptyDescription>
            An unexpected error occurred. Please try again.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={onRetry}>Try again</Button>
        </EmptyContent>
      </Empty>
    </main>
  );
};
