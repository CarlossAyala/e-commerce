import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from './strapi.payment-method.api';
import { getToken } from '../../../api';
import { CheckoutSessionAPI } from '../checkout-session';

export const strapiPaymentMethodKeys = {
  key: ['strapi/payment-method'],
  get: (id) => [...strapiPaymentMethodKeys.key, 'get', id],
  all: () => [...strapiPaymentMethodKeys.key, 'all'],
  newOne: (id) => [...strapiPaymentMethodKeys.key, 'newOne', id],
};

export const useGetPaymentMethod = (id) => {
  const token = getToken();

  return useQuery({
    queryKey: strapiPaymentMethodKeys.get(id),
    queryFn: () => API.get(id),
    enabled: !!id && !!token,
  });
};

export const useGetPaymentMethods = () => {
  const token = getToken();

  return useQuery({
    queryKey: strapiPaymentMethodKeys.all(),
    queryFn: () => API.getAll(),
    enabled: !!token,
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
    onSuccess: () => {
      queryClient.invalidateQueries(strapiPaymentMethodKeys.key);
    },
  });
};
