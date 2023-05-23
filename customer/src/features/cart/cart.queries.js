import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from './cart.api';
import { historyKeys } from '../history';
import { bookmarkKeys } from '../bookmarks';

export const cartKeys = {
  key: ['cart'],
};

export const useGetCart = () => {
  return useQuery({
    queryKey: cartKeys.key,
    queryFn: () => API.getItemsCart(),
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, quantity = 1 }) => {
      return API.addItem(productId, quantity);
    },
    onSuccess: () => {
      console.log('Added to cart');

      queryClient.invalidateQueries({
        queryKey: cartKeys.key,
      });
      queryClient.invalidateQueries({
        queryKey: historyKeys.key,
      });
      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.key,
      });
    },
  });
};

export const useUpdateQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, quantity = 1 }) => {
      return API.updateQuantity(productId, quantity);
    },
    onSuccess: () => {
      console.log('Product quantity updated');

      queryClient.invalidateQueries({
        queryKey: cartKeys.key,
      });
      queryClient.invalidateQueries({
        queryKey: historyKeys.key,
      });
      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.key,
      });
    },
  });
};

export const useUpdateVisibility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemCartId) => {
      return API.updateVisibility(itemCartId);
    },
    onSuccess: () => {
      console.log('Product visibility updated');

      queryClient.invalidateQueries({
        queryKey: cartKeys.key,
      });
      queryClient.invalidateQueries({
        queryKey: historyKeys.key,
      });
      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.key,
      });
    },
  });
};

export const useRemoveItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemCartId) => {
      return API.removeItem(itemCartId);
    },
    onSuccess: () => {
      console.log('Product visibility updated');

      queryClient.invalidateQueries({
        queryKey: cartKeys.key,
      });
      queryClient.invalidateQueries({
        queryKey: historyKeys.key,
      });
      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.key,
      });
    },
  });
};
