import { useLocation } from "react-router-dom";

export const urlWithQuery = (url, query) => {
  return `${url}${query ? `?${query}` : ""}`;
};

export const useActiveRoute = (route) => {
  const { pathname } = useLocation();

  return pathname === route;
};

export const useActiveGroupRoute = (route) => {
  const { pathname } = useLocation();
  const basePath = pathname.split("/")[1];

  const baseRoute = route.to.split("/")[1];

  return basePath === baseRoute;
};
