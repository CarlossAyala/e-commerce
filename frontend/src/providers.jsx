import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components";
import { queryClient } from "@/libs";
import { BreakpointIndicator } from "./shared/components";

export const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BreakpointIndicator />

      {children}

      <Toaster />
      <ReactQueryDevtools position="bottom-left" initialIsOpen={false} />
    </QueryClientProvider>
  );
};
