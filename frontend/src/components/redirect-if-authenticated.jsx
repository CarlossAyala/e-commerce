import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/shared/auth";
import { Spinner } from ".";

export const RedirectIfAuthenticated = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-content-center">
        <Spinner className="size-6 text-gray-600" />
      </main>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/portal" state={{ from: location }} replace />;
  }

  return children ?? <Outlet />;
};
