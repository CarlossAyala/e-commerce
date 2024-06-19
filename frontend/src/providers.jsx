import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { BreakpointIndicator, ThemeProvider } from "./shared/components";
import { Toaster } from "./components";
import { queryClient } from "./libs";

export const Providers = ({ children }) => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BreakpointIndicator />

        {children}

        <Toaster />
        <ReactQueryDevtools position="bottom-left" initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};
