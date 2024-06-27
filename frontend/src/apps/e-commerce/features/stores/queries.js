import { useQuery } from "@tanstack/react-query";
import { parseURLSearchParams } from "@/shared/utils";
import { findAll, findByProductId, findOne, products } from "./api";

const storeKeys = {
  key: ["ecommerce/stores"],
  findOne: (storeId) => [...storeKeys.key, "find-one", storeId],
  findByProductId: (id) => [...storeKeys.key, "find-by-product-id", id],
  findAll: (query) => [...storeKeys.key, "find-all", query],
  products: (storeId, query) => [...storeKeys.key, "products", storeId, query],
};

export const useGetStore = (storeId) => {
  return useQuery({
    queryKey: storeKeys.findOne(storeId),
    queryFn: () => findOne(storeId),
    enabled: !!storeId,
  });
};

export const useGetStoreByProductId = (productId) => {
  return useQuery({
    queryKey: storeKeys.findByProductId(productId),
    queryFn: () => findByProductId(productId),
    enabled: !!productId,
  });
};

export const useGetStores = (query) => {
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: storeKeys.findAll(_query),
    queryFn: () => findAll(query),
  });
};

export const useGetStoreProducts = (storeId, query) => {
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: storeKeys.products(storeId, _query),
    queryFn: () => products(storeId, query),
    enabled: !!storeId,
  });
};
