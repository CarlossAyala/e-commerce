import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  create,
  findAll,
  findAllLowStock as findAllStockAlert,
  findOne,
  remove,
  update,
} from "../api";

export const productKeys = {
  key: ["product"],
  findOne: (id) => [...productKeys.key, "find-one", id],
  findAll: (query = "") => [...productKeys.key, "find-all", query],
  stockAlert: (query = "") => [...productKeys.key, "stock-alert", query],
};

export const useGetProduct = (id) => {
  return useQuery({
    queryKey: productKeys.findOne(id),
    queryFn: () => findOne(id),
    enabled: Boolean(id),
  });
};

export const useGetProducts = (query) => {
  return useQuery({
    queryKey: productKeys.findAll(query),
    queryFn: () => findAll(query),
  });
};

export const useGetStockAlert = (query = "") => {
  return useQuery({
    queryKey: productKeys.stockAlert(query),
    queryFn: () => findAllStockAlert(query),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => create(values),
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

  return useMutation({
    mutationFn: ([productId, values]) => update(productId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.key,
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => remove(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.key,
      });
      // TODO: Add Key of QA
    },
  });
};
