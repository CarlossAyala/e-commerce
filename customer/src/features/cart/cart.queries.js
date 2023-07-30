import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from './cart.api';
import { getToken } from '../../api';

export const cartKeys = {
  key: ['cart'],
};

export const useGetCart = (queries) => {
  const token = getToken();

  return useQuery({
    queryKey: cartKeys.key,
    queryFn: () => API.getCart(queries),
    enabled: Boolean(token),
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([productId, quantity]) => API.addToCart(productId, quantity),
    onSuccess: () => {
      console.log('SHOULD INVALIDATE QUERY');
      queryClient.invalidateQueries(cartKeys.key);
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => API.removeFromCart(id),
    onSuccess: () => {
      queryClient.invalidateQueries(cartKeys.key);
    },
  });
};

export const useUpdateItemCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, quantity }) => API.updateItemCart(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries(cartKeys.key);
    },
  });
};

export const useChangeVisibility = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => API.changeVisibility(id),
    onSuccess: () => {
      queryClient.invalidateQueries(cartKeys.key);
    },
  });
};
export const useClearCart = () => {};
