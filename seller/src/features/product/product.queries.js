import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getToken } from "../../utils/local-storage";
import { qaKeys } from "../qa";
import { storeKeys } from "../store";
import API from "./product.api";

const productKeys = {
  key: ["product"],
  get: (id) => [...productKeys.key, "get", id],
  getAll: (query = "") => [...productKeys.key, "get-all", query],
  stockAlert: (query = "") => [...productKeys.key, "stock-alert", query],
};

export const useGetProduct = (id) => {
  const token = getToken();

  return useQuery({
    queryKey: productKeys.get(id),
    queryFn: () => API.getProduct(id),
    enabled: Boolean(token) && Boolean(id),
  });
};

export const useGetProducts = (query) => {
  const token = getToken();

  return useQuery({
    queryKey: productKeys.getAll(query),
    queryFn: () => API.getProducts(query),
    enabled: Boolean(token),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => API.createProduct(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.getAll(),
      });
      queryClient.invalidateQueries({
        queryKey: productKeys.stockAlert(),
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([productId, values]) => API.updateProduct(productId, values),
    onSuccess: (_, [productId]) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.get(productId),
      });
      queryClient.invalidateQueries({
        queryKey: productKeys.getAll(),
      });
      queryClient.invalidateQueries({
        queryKey: productKeys.stockAlert(),
      });
      queryClient.invalidateQueries({
        queryKey: storeKeys.getStats(),
      });
      queryClient.invalidateQueries({
        queryKey: qaKeys.key,
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => API.deleteProduct(productId),
    onSuccess: (_, productId) => {
      queryClient.removeQueries({
        queryKey: productKeys.get(productId),
      });
      queryClient.invalidateQueries({
        queryKey: productKeys.getAll(),
      });
      queryClient.invalidateQueries({
        queryKey: productKeys.stockAlert(),
      });
      queryClient.invalidateQueries({
        queryKey: storeKeys.getStats(),
      });
      queryClient.invalidateQueries({
        queryKey: qaKeys.key,
      });
    },
  });
};

export const useStockAlert = (query) => {
  return useQuery({
    queryKey: productKeys.stockAlert(query),
    queryFn: () => API.stockAlert(query),
  });
};
