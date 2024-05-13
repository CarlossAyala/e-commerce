import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Spinner } from "@/shared/components";
import { useGetStore } from "../features/store";

export const RedirectWithStore = ({ children }) => {
  const location = useLocation();
  const { data: store, isLoading } = useGetStore();

  if (isLoading) {
    return (
      <main className="grid flex-1 place-content-center">
        <Spinner className="size-6 text-gray-600" />
      </main>
    );
  }

  if (store) {
    return <Navigate to="/seller" state={{ from: location }} replace />;
  }

  return children ?? <Outlet />;
};
