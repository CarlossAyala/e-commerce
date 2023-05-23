import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './features/auth';

const queryClient = new QueryClient();

const SellerProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export default SellerProvider;
