import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth";
import { create, findAll, findOne, findSession, remove } from "../api";

export const paymentMethodKeys = {
  key: ["e-commerce/payment-method"],
  findOne: (paymentMethodId) => [
    ...paymentMethodKeys.key,
    "find-one",
    paymentMethodId,
  ],
  findAll: () => [...paymentMethodKeys.key, "find-all"],
};

export const useGetPaymentMethod = (paymentMethodId) => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: paymentMethodKeys.findOne(paymentMethodId),
    queryFn: () => findOne(paymentMethodId, accessToken),
    enabled: !!paymentMethodId,
  });
};

export const useGetPaymentMethods = () => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: paymentMethodKeys.findAll(),
    queryFn: () => findAll(accessToken),
  });
};

export const useCreatePaymentMethod = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: (values) => create(values, accessToken),
    onSuccess() {
      return queryClient.invalidateQueries(paymentMethodKeys.findAll());
    },
    meta: {
      title: "Checkout - Create Payment Method",
    },
  });
};

export const useGetPaymentMethodSession = () => {
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: (sessionId) => findSession(sessionId, accessToken),
  });
};

export const useRemovePaymentMethod = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: (paymentMethodId) => remove(paymentMethodId, accessToken),
    onSuccess: (_, paymentMethodId) => {
      queryClient.removeQueries(paymentMethodKeys.findOne(paymentMethodId));
      return queryClient.invalidateQueries(paymentMethodKeys.findAll());
    },
  });
};
