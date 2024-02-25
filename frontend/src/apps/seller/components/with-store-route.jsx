import { Navigate, useLocation } from "react-router-dom";
import { useGetStore } from "../features/store";
import { SELLER_NAV } from "../config";

export const WithStoreRoute = ({ children }) => {
  const location = useLocation();
  const { data: store, isLoading } = useGetStore();

  if (isLoading) {
    return <div>Loading...</div>;
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

  return children;
};
