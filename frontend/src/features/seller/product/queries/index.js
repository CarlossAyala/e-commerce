import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  create,
  findAll,
  findAllLowStock,
  findOne,
  remove,
  update,
} from "../api";

export const productKeys = {
  key: ["product"],
  findOne: (id) => [...productKeys.key, "find-one", id],
  findAll: (query = "") => [...productKeys.key, "find-all", query],
  lowStock: (query = "") => [...productKeys.key, "low-stock", query],
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

export const useGetLowStock = (query) => {
  return useQuery({
    queryKey: productKeys.lowStock(query),
    queryFn: () => findAllLowStock(query),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.findAll(),
      });
      queryClient.invalidateQueries({
        queryKey: productKeys.lowStock(),
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([productId, values]) => update(productId, values),
    onSuccess: (_, [productId]) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.get(productId),
      });
      queryClient.invalidateQueries({
        queryKey: productKeys.getAll(),
      });
      queryClient.invalidateQueries({
        queryKey: productKeys.lowStock(),
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => remove(productId),
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.get(productId),
      });
      queryClient.invalidateQueries({
        queryKey: productKeys.getAll(),
      });
      queryClient.invalidateQueries({
        queryKey: productKeys.lowStock(),
      });
      // TODO: Add Key of QA
    },
  });
};
