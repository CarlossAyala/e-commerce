import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth";
import { parseURLSearchParams } from "@/shared/utils";
import { create, findAll, findOne, remove, update } from "./api";

export const productKeys = {
  key: ["seller/product"],
  findOne: (id) => [...productKeys.key, "find-one", id],
  findAllKey: () => [...productKeys.key, "find-all"],
  findAll: (query) => [...productKeys.findAllKey(), query],
};

export const useGetProduct = (id) => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: productKeys.findOne(id),
    queryFn: () => findOne(id, accessToken),
    enabled: !!id,
  });
};

export const useGetProducts = (query) => {
  const { accessToken } = useAuth();
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: productKeys.findAll(_query),
    queryFn: () => findAll(query, accessToken),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: (values) => create(values, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.findAllKey(),
      });
    },
    meta: {
      title: "Product",
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: ({ productId, values }) => {
      return update(productId, values, accessToken);
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
  const { accessToken } = useAuth();

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
