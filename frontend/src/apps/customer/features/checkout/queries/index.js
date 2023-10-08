import { useMutation, useQuery } from "@tanstack/react-query";
import { confirm, create, findOne } from "../api";

const checkoutKeys = {
  key: ["checkout"],
  findOne: (paymentIntentId) => [
    ...checkoutKeys.key,
    "find-one",
    paymentIntentId,
  ],
};

export const useGetCheckout = (paymentIntentId) => {
  return useQuery({
    queryKey: checkoutKeys.findOne(paymentIntentId),
    queryFn: () => findOne(paymentIntentId),
    enabled: !!paymentIntentId,
  });
};

export const useCreateCheckout = () => {
  return useMutation({
    mutationFn: create,
  });
};

export const useConfirmCheckout = (paymentIntentId) => {
  return useMutation({
    mutationFn: (data) => confirm(paymentIntentId, data),
  });
};
