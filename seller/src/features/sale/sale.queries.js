import { useQuery } from "@tanstack/react-query";
import API from "./sale.api";

export const saleKeys = {
  key: ["sales"],
  get: (id) => [...saleKeys.key, "get", id],
  getAll: (query = "") => [...saleKeys.key, "get-all", query],
};

export const useGetSales = (query) => {
  return useQuery({
    queryKey: saleKeys.getAll(query),
    queryFn: () => API.getAll(query),
  });
};

export const useGetSale = (id) => {
  return useQuery({
    queryKey: saleKeys.get(id),
    queryFn: () => API.get(id),
    enabled: Boolean(id),
  });
};
