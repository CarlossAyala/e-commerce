import { useQuery } from "@tanstack/react-query";
import { findAll, findOne, related } from "../api";

export const productKeys = {
  key: ["product"],
  findOne: (id) => [...productKeys.key, "find-one", id],
  findAll: (query) => [...productKeys.key, "find-all", query],
  related: (id) => [...productKeys.key, "related", id],
};

export const useGetProduct = (productId) => {
  return useQuery({
    queryKey: productKeys.findOne(productId),
    queryFn: () => findOne(productId),
    enabled: Boolean(productId),
  });
};

export const useGetProducts = (query) => {
  return useQuery({
    queryKey: productKeys.findAll(query),
    queryFn: () => findAll(query),
  });
};

export const useGetRelatedProducts = (productId) => {
  return useQuery({
    queryKey: productKeys.related(productId),
    queryFn: () => related(productId),
    enabled: Boolean(productId),
  });
};
