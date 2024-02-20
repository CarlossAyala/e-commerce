import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./libs/query-client";
import { Toaster } from "./components";

export const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <Toaster />
      <ReactQueryDevtools position="bottom-left" initialIsOpen={false} />
    </QueryClientProvider>
  );
};
