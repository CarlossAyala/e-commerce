import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from './stripe.payment-intent.api';
import { cartKeys } from '../../cart';
import { reviewKeys } from '../../review';

export const stripePaymentIntentKeys = {
  key: ['stripe/payment-intent'],
};

export const useCreatePaymentIntent = () => {
  return useMutation({
    mutationFn: () => API.create(),
  });
};

export const useConfirmPaymentIntent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => API.confirm(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartKeys.key,
      });
      queryClient.invalidateQueries({
        queryKey: reviewKeys.pending(),
      });
    },
  });
};
