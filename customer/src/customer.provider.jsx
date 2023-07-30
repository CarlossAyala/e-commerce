import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './auth/auth.provider';
import { CheckoutProvider } from './features/checkout';
// import { StripeProvider } from './features/stripe';

const queryClient = new QueryClient();

export default function CustomerProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CheckoutProvider>
          {/* <StripeProvider>{children}</StripeProvider> */}
          {children}
        </CheckoutProvider>
      </AuthProvider>

      {/* <ReactQueryDevtools initialIsOpen /> */}
    </QueryClientProvider>
  );
}
