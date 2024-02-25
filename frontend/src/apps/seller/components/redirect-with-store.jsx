import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetStore } from "../features/store";
import { SELLER_NAV } from "../config";

export const RedirectWithStore = ({ children }) => {
  const location = useLocation();
  const { data: store } = useGetStore();

  if (store) {
    return (
      <Navigate to={SELLER_NAV.store.to} state={{ from: location }} replace />
    );
  }

  return children ?? <Outlet />;
};
