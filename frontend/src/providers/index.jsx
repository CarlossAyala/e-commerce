import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { queryClient } from "../libs/react-query";

const AppProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <Toaster richColors closeButton expand position="top-right" />
      <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AppProvider;
