import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth";
import {
  create,
  findAll,
  findAllStockAlert,
  findOne,
  remove,
  update,
  updateStockAlert,
} from "../api";

export const productKeys = {
  key: ["seller/product"],
  findOne: (id) => [...productKeys.key, "find-one", id],
  findAllKey: () => [...productKeys.key, "find-all"],
  findAll: (query) => [...productKeys.findAllKey(), query],
  stockAlertKey: () => [...productKeys.key, "stock-alert"],
  stockAlert: (query = "") => [...productKeys.stockAlertKey(), query],
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

  return useQuery({
    queryKey: productKeys.findAll(query),
    queryFn: () => findAll(query, accessToken),
  });
};

export const useGetStockAlert = (query = "") => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: productKeys.stockAlert(query),
    queryFn: () => findAllStockAlert(query, accessToken),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: (values) => create(values, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.findAll().slice(0, 2),
      });
      queryClient.invalidateQueries({
        queryKey: productKeys.stockAlert().slice(0, 2),
      });
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
  });
};

export const useUpdateStockAlert = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: ({ productId, values }) => {
      return updateStockAlert(productId, values, accessToken);
    },
    onSuccess: async (product) => {
      queryClient.setQueryData(productKeys.findOne(product.id), product);
      await queryClient.invalidateQueries({
        queryKey: productKeys.findAllKey(),
      });
      await queryClient.invalidateQueries({
        queryKey: productKeys.stockAlertKey(),
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: (productId) => remove(productId, accessToken),
    onSuccess: async (_, productId) => {
      queryClient.removeQueries(productKeys.findOne(productId));
      await queryClient.invalidateQueries({
        queryKey: productKeys.findAllKey(),
      });
      await queryClient.invalidateQueries({
        queryKey: productKeys.stockAlertKey(),
      });
    },
  });
};
