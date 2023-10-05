import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { findAll, findOne } from "../api";

export const paymentMethodKeys = {
  key: ["payment-method"],
  findOne: (paymentMethodId) => [
    ...paymentMethodKeys.key,
    "find-one",
    paymentMethodId,
  ],
  findAll: () => [...paymentMethodKeys.key, "find-all"],
};

export const useGetPaymentMethod = (paymentMethodId) => {
  return useQuery({
    queryKey: paymentMethodKeys.findOne(paymentMethodId),
    queryFn: () => findOne(paymentMethodId),
    enabled: Boolean(paymentMethodId),
  });
};

export const useGetPaymentMethods = () => {
  return useQuery({
    queryKey: paymentMethodKeys.findAll(),
    queryFn: () => findAll(),
  });
};

export const useRemovePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: findOne,
    onSuccess: (_, paymentMethodId) => {
      queryClient.removeQueries(paymentMethodKeys.findOne(paymentMethodId));
      queryClient.invalidateQueries(paymentMethodKeys.findAll());
    },
  });
};
