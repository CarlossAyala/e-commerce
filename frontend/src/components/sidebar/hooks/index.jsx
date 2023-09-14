import { useContext } from "react";
import { useLocation } from "react-router-dom";
import SidebarContext from "../contexts/sidebar-context";

export const useActiveRoute = (route) => {
  const { pathname } = useLocation();

  return pathname === route;
};

export const useActiveGroupRoute = (route) => {
  const { pathname } = useLocation();

  const basePath = pathname.split("/").slice(1, 2);
  const baseRoute = route.to.split("/").slice(1, 2);

  return basePath === baseRoute;
};

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};
