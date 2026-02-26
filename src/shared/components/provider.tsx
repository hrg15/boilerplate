"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { queryClient } from "../api/query-client";
import { Suspense } from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
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
