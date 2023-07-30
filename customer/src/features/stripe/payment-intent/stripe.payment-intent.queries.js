import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from './stripe.payment-intent.api';

export const stripePaymentIntentKeys = {
  key: ['stripe/payment-intent'],
};

export const useCreatePaymentIntent = () => {
  return useMutation({
    mutationFn: () => API.create(),
  });
};

export const useConfirmPaymentIntent = () => {
  return useMutation({
    mutationFn: (data) => API.confirm(data),
  });
};
