"use client";

import { queryClient } from "@/services/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "sonner";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {children}
    </QueryClientProvider>
  );
};

export default Provider;
