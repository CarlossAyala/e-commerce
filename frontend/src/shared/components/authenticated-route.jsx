import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/shared/auth";
import { Spinner } from ".";

export const AuthenticatedRoute = ({ children }) => {
  const location = useLocation();
  const { data, isLoading } = useAuth();
  const isAuthenticated = !!data;

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-content-center">
        <Spinner className="size-6 text-muted-foreground" />
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children ?? <Outlet />;
};
