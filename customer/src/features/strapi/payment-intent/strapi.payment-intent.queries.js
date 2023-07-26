import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from './strapi.payment-intent.api';

export const strapiPaymentIntentKeys = {
  key: ['strapi/payment-intent'],
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
