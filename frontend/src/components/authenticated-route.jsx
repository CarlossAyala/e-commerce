import { Navigate, Outlet, useLocation } from "react-router-dom";
import { APP_NAVIGATION } from "@/configs";
import { useAuth } from "@/shared/auth";

export const AuthenticatedRoute = ({ redirectTo, children }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  const to = redirectTo ?? APP_NAVIGATION.signin.to;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={to} state={{ from: location }} replace />;
  }

  return children ?? <Outlet />;
};
