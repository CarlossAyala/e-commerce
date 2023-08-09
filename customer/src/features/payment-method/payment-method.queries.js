import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from './payment-method.api';
import { getToken } from '../../api';
// TODO: Move this
import { CheckoutSessionAPI } from '../stripe/checkout-session';

export const paymentMethodKeys = {
  key: ['payment-method'],
  get: (id) => [...paymentMethodKeys.key, 'get', id],
  getAll: () => [...paymentMethodKeys.key, 'get-all'],
};

export const useGetPaymentMethod = (id) => {
  const token = getToken();

  return useQuery({
    queryKey: paymentMethodKeys.get(id),
    queryFn: () => API.get(id),
    enabled: Boolean(token) && Boolean(id),
  });
};

export const useGetPaymentMethods = () => {
  const token = getToken();

  return useQuery({
    queryKey: paymentMethodKeys.getAll(),
    queryFn: () => API.getAll(),
    enabled: !!token,
  });
};

export const useRemovePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => API.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: paymentMethodKeys.key,
      });
    },
  });
};

export const useGetNewPaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (checkoutSessionId) => {
      const checkoutSession = await CheckoutSessionAPI.get(checkoutSessionId);
      const { payment_method } = checkoutSession;

      return payment_method;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(paymentMethodKeys.key);
    },
  });
};
