import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/shared/auth";
import { getCurrentApp } from "@/shared/utils";
import { Spinner } from ".";

export const RedirectIfAuthenticated = ({ children }) => {
  const location = useLocation();
  const { originalTo } = getCurrentApp(
    location.state?.from.pathname ?? location.pathname,
  );
  const { data, isLoading } = useAuth(originalTo);
  const isAuthenticated = !!data;

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-content-center">
        <Spinner className="size-6 text-gray-600" />
      </main>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={originalTo} replace />;
  }

  return children ?? <Outlet />;
};
