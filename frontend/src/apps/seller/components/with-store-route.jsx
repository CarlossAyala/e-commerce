import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Spinner } from "@/shared/components";
import { useGetStore } from "../features/store";
import { SELLER_NAV } from "../config";

export const WithStoreRoute = ({ children }) => {
  const location = useLocation();
  const { data: store, isLoading } = useGetStore();

  if (isLoading) {
    return (
      <main className="grid flex-1 place-content-center">
        <Spinner className="size-6 text-gray-600" />
      </main>
    );
  }

  if (!store) {
    return (
      <Navigate
        to={SELLER_NAV.createStore.to}
        state={{ from: location }}
        replace
      />
    );
  }

  return children ?? <Outlet />;
};
