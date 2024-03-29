import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/shared/auth";
import { Spinner } from ".";

export const AuthenticatedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-content-center">
        <Spinner className="size-6 text-gray-600" />
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children ?? <Outlet />;
};
