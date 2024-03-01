import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components";
import { queryClient } from "@/libs";

export const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <Toaster />
      <ReactQueryDevtools position="bottom-left" initialIsOpen={false} />
    </QueryClientProvider>
  );
};
