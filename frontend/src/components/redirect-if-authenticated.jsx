import { useLocation, Navigate, Outlet } from "react-router-dom";
import { APP_NAVIGATION } from "@/configs";
import { useAuth } from "@/shared/auth";

export const RedirectIfAuthenticated = ({ redirectTo, children }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  const to = redirectTo || APP_NAVIGATION.customer.to;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to={to} state={{ from: location }} replace />;
  }

  return children ?? <Outlet />;
};
