import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./features/theme";
import { BreakpointIndicator, Toaster } from "./shared/components";
import { queryClient } from "./shared/libs";
import { router } from "./configs/router";
import { MODE } from "./configs";

export const Providers = ({ children }) => {
  return (
    <ThemeProvider>
      {MODE === "development" && <BreakpointIndicator />}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>{children}</RouterProvider>
        <Toaster />
        {MODE === "development" && (
          <ReactQueryDevtools position="bottom-left" initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </ThemeProvider>
  );
};
