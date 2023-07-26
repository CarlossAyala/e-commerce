import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from './strapi.checkout-session.api';

const strapiCheckoutKeys = {
  key: ['strapi/checkout-session'],
  get: (id) => [...strapiCheckoutKeys.key, 'get', id],
};

export const useGetCheckoutSession = (id) => {
  return useQuery({
    queryKey: strapiCheckoutKeys.get(id),
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
