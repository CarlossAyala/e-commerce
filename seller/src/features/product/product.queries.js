import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "./product.api";
import { getToken } from "../../api";

const productKeys = {
  key: ["product"],
  get: (id) => [...productKeys.key, "get", id],
  getAll: (query = "") => [...productKeys.key, "get-all", query],
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
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: productKeys.getAll(),
      }),
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
    },
  });
};
