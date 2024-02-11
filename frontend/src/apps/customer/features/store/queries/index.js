import { useQuery } from "@tanstack/react-query";
import { findAll, findByProductId, findByName, products } from "../api";

const storeKeys = {
  key: ["store"],
  findOne: (name) => [...storeKeys.key, "find-one", name],
  findByProductId: (id) => [...storeKeys.key, "find-by-product-id", id],
  findAll: (query) => [...storeKeys.key, "find-all", query],
  products: (name, query) => [...storeKeys.key, "products", name, query],
};

export const useGetStore = (name) => {
  return useQuery({
    queryKey: storeKeys.findOne(name),
    queryFn: () => findByName(name),
    enabled: Boolean(name),
  });
};
export const useGetStoreByProductId = (productId) => {
  return useQuery({
    queryKey: storeKeys.findByProductId(productId),
    queryFn: () => findByProductId(productId),
    enabled: Boolean(productId),
  });
};

export const useGetStores = (query) => {
  const params = new URLSearchParams(window.location.search);

  const values = useQuery({
    queryKey: storeKeys.findAll(query),
    queryFn: () => findAll(query),
  });

  return {
    stores: values.data?.rows,
    count: values.data?.count,
    hasContent: values.data?.rows.length > 0,
    isEmpty: values.data?.rows.length === 0,
    hasFilters: params.toString() !== "",
    ...values,
  };
};

export const useGetStoreProducts = (name, query) => {
  const params = new URLSearchParams(window.location.search);

  const result = useQuery({
    queryKey: storeKeys.products(name, query),
    queryFn: () => products(name, query),
    enabled: Boolean(name),
  });

  return {
    products: result.products,
    hasContent: result.isSuccess && result.data.rows.length > 0,
    hasFilters: params.toString() !== "",
    ...result,
  };
};
