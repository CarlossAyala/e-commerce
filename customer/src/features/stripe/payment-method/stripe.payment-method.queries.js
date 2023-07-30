import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from './stripe.payment-method.api';
import { getToken } from '../../../api';
import { CheckoutSessionAPI } from '../checkout-session';

export const stripePaymentMethodKeys = {
  key: ['stripe/payment-method'],
  get: (id) => [...stripePaymentMethodKeys.key, 'get', id],
  all: () => [...stripePaymentMethodKeys.key, 'all'],
  newOne: (id) => [...stripePaymentMethodKeys.key, 'newOne', id],
};

export const useGetPaymentMethod = (id) => {
  const token = getToken();

  return useQuery({
    queryKey: stripePaymentMethodKeys.get(id),
    queryFn: () => API.get(id),
    enabled: !!id && !!token,
  });
};

export const useGetPaymentMethods = () => {
  const token = getToken();

  return useQuery({
    queryKey: stripePaymentMethodKeys.all(),
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
      queryClient.invalidateQueries(stripePaymentMethodKeys.key);
    },
  });
};
