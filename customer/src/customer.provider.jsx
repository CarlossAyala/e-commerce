import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CheckoutProvider } from './features/checkout';

const queryClient = new QueryClient();

export default function CustomerProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CheckoutProvider>{children}</CheckoutProvider>

      {/* <ReactQueryDevtools initialIsOpen /> */}
    </QueryClientProvider>
  );
}
