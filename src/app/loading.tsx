import { DotsLoading } from "@/shared/icons/three-dots-loading";

export default function Loading() {
  return (
    <div
      role="status"
      className="flex min-h-dvh w-full items-center justify-center text-muted-foreground"
    >
      <DotsLoading className="h-4 w-16" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
