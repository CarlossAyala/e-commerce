import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { createQueryKey, parseURLSearchParams } from "@/shared/utils";
import {
  create,
  findAll,
  findOne,
  remove,
  update,
  getCount,
  getCountStatus,
  growthStats,
} from "./api";

export const productKeys = {
  key: createQueryKey({
    prefix: "seller",
    entity: "products",
    config: {
      removeOnSignout: true,
    },
  }),
  findOne: (id) => [...productKeys.key, "find-one", id],
  findAllKey: () => [...productKeys.key, "find-all"],
  findAll: (query) => [...productKeys.findAllKey(), query],
  count: () => [...productKeys.key, "count"],
  countStatus: () => [...productKeys.key, "count-status"],
  growthStats: (query) => [...productKeys.key, "growth-stats", query],
};

export const useGetProduct = (id) => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: productKeys.findOne(id),
    queryFn: () => findOne(id, accessToken),
    enabled: !!id,
  });
};

export const useGetProducts = (query) => {
  const { data: accessToken } = useAuth();
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: productKeys.findAll(_query),
    queryFn: () => findAll(query, accessToken),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: (formData) => create(formData, accessToken),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: productKeys.findAllKey(),
      });
    },
    meta: {
      title: "Product",
    },
  });
};

export const useUpdateProduct = (productId) => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: (formData) => {
      return update(productId, formData, accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.key,
      });
    },
    meta: {
      title: "Product",
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: (productId) => remove(productId, accessToken),
    onSuccess: async (_, productId) => {
      queryClient.removeQueries({
        queryKey: productKeys.findOne(productId),
      });
      return queryClient.invalidateQueries({
        queryKey: productKeys.findAllKey(),
      });
    },
    meta: {
      title: "Product",
    },
  });
};

export const useGetProductCount = () => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: productKeys.count(),
    queryFn: () => getCount(accessToken),
  });
};

export const useGetProductCountStatus = () => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: productKeys.countStatus(),
    queryFn: () => getCountStatus(accessToken),
  });
};

export const useGetProductsGrowthStats = (query) => {
  const { data: accessToken } = useAuth();
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: productKeys.growthStats(_query),
    queryFn: () => growthStats(query, accessToken),
  });
};
