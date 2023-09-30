import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { add, cart, remove, updateQuantity, updateVisibility } from "../api";

export const cartKeys = {
  key: ["cart"],
  get: (query) => [...cartKeys.key, "get", query],
};

export const useGetCart = (query) => {
  return useQuery({
    queryKey: cartKeys.get(query),
    queryFn: () => cart(query),
  });
};

export const useAddCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([productId, quantity]) => add(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries(cartKeys.key);
    },
  });
};

export const useRemoveCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries(cartKeys.key);
    },
  });
};

export const useUpdateQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([itemId, quantity]) => updateQuantity(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries(cartKeys.key);
    },
  });
};

export const useUpdateVisibility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([itemId, quantity]) => updateVisibility(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries(cartKeys.key);
    },
  });
};
