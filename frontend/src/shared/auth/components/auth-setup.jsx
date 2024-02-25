import { useAuth } from "../queries";

export const AuthSetup = ({ children }) => {
  useAuth();

  return children;
};
