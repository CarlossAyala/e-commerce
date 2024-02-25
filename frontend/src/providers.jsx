import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components";
import { queryClient } from "@/libs";
import { AuthSetup } from "@/shared/auth";

export const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthSetup>{children}</AuthSetup>

      <Toaster />
      <ReactQueryDevtools position="bottom-left" initialIsOpen={false} />
    </QueryClientProvider>
  );
};
