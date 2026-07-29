"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { getQueryClient } from "../api/query-client";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        {children}
      </QueryClientProvider>
    </Suspense>
  );
};

export default Provider;
