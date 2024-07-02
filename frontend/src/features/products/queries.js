import { useQuery } from "@tanstack/react-query";
import { createQueryKey, parseURLSearchParams } from "@/shared/utils";
import { findAll, findOne, related } from "./api";

export const productKeys = {
  key: createQueryKey({
    prefix: "shared",
    entity: "products",
  }),
  findOne: (productId) => [...productKeys.key, "find-one", productId],
  findAllKey: () => [...productKeys.key, "find-all"],
  findAll: (query) => [...productKeys.findAllKey(), query],
  related: (productId) => [...productKeys.key, "related", productId],
};

export const useGetProduct = (productId) => {
  return useQuery({
    queryKey: productKeys.findOne(productId),
    queryFn: () => findOne(productId),
    enabled: !!productId,
  });
};

export const useGetProducts = (query) => {
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: productKeys.findAll(_query),
    queryFn: () => findAll(query),
    keepPreviousData: true,
  });
};

export const useGetRelatedProducts = (productId) => {
  return useQuery({
    queryKey: productKeys.related(productId),
    queryFn: () => related(productId),
    enabled: !!productId,
  });
};
