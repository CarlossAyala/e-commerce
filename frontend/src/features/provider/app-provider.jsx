import { AuthProvider } from '../auth';

// children are routes
const AppProvider = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProvider;
