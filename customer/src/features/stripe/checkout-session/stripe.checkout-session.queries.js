import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from './stripe.checkout-session.api';

const stripeCheckoutKeys = {
  key: ['stripe/checkout-session'],
  get: (id) => [...stripeCheckoutKeys.key, 'get', id],
};

export const useGetCheckoutSession = (id) => {
  return useQuery({
    queryKey: stripeCheckoutKeys.get(id),
    queryFn: () => API.get(id),
    enabled: !!id,
  });
};

export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: (query) => API.create(query),
    onSuccess: () => {
      console.log('Checkout session created');
    },
    onError: () => {
      console.log('Checkout session failed');
    },
  });
};
