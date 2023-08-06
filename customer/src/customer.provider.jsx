import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CheckoutProvider } from './features/checkout';
// import { StripeProvider } from './features/stripe';

const queryClient = new QueryClient();

export default function CustomerProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CheckoutProvider>
        {/* <StripeProvider>{children}</StripeProvider> */}
        {children}
      </CheckoutProvider>

      {/* <ReactQueryDevtools initialIsOpen /> */}
    </QueryClientProvider>
  );
}
