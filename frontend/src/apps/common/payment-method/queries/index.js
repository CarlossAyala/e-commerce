import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { create, findAll, findOne, findSession, remove } from "../api";

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
  const values = useQuery({
    queryKey: paymentMethodKeys.findAll(),
    queryFn: () => findAll(),
  });

  return {
    paymentMethods: values.data,
    isEmpty: values.data?.length === 0,
    ...values,
  };
};

export const useCreatePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: create,
    onSuccess() {
      queryClient.invalidateQueries(paymentMethodKeys.findAll());
    },
  });
};

export const useGetPaymentMethodSession = () => {
  return useMutation({
    mutationFn: findSession,
  });
};

export const useRemovePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: remove,
    onSuccess: (_, paymentMethodId) => {
      queryClient.removeQueries(paymentMethodKeys.findOne(paymentMethodId));
      queryClient.invalidateQueries(paymentMethodKeys.findAll());
    },
  });
};
