import { useQuery } from "@tanstack/react-query";
import { findAll, findOne } from "../api";

export const saleKeys = {
  key: ["sales"],
  findOne: (id) => [...saleKeys.key, "find-one", id],
  findAll: (query = "") => [...saleKeys.key, "find-all", query],
};

export const useGetSale = (id) => {
  return useQuery({
    queryKey: saleKeys.findOne(id),
    queryFn: () => findOne(id),
    enabled: Boolean(id),
  });
};

export const useGetSales = (query) => {
  return useQuery({
    queryKey: saleKeys.findAll(query),
    queryFn: () => findAll(query),
  });
};
