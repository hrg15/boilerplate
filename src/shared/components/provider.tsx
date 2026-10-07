"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { getQueryClient } from "../api/query-client";

type ProviderProps = {
  children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
};

export default Provider;
