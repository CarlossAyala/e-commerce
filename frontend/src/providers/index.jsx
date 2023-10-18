import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../libs/react-query";
import { Toaster } from "../components";

const AppProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <Toaster />
      <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AppProvider;
