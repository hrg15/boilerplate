import type { Metadata } from "next";
import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { ROUTES } from "@/shared/constants/routes";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center p-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileQuestion />
          </EmptyMedia>
          <h1 className="text-lg font-medium tracking-tight">Page not found</h1>
          <EmptyDescription>
            The page you are looking for does not exist or has been moved.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href={ROUTES.home}>Back to home</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  );
}
