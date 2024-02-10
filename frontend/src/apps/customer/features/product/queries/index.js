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
  const values = useQuery({
    queryKey: productKeys.findAll(query),
    queryFn: () => findAll(query),
  });

  return {
    products: values.data?.rows,
    count: values.data?.count,
    isEmpty: values.data?.rows?.length === 0,
    ...values,
  };
};

export const useGetRelatedProducts = (productId) => {
  return useQuery({
    queryKey: productKeys.related(productId),
    queryFn: () => related(productId),
    enabled: Boolean(productId),
  });
};
