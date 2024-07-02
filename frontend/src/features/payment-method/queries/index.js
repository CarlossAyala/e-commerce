import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { createQueryKey } from "@/shared/utils";
import { create, findAll, findOne, findSession, remove } from "../api";

export const paymentMethodKeys = {
  key: createQueryKey({
    prefix: "ecommerce",
    entity: "payment-methods",
    config: {
      removeOnSignout: true,
    },
  }),
  findOne: (paymentMethodId) => [
    ...paymentMethodKeys.key,
    "find-one",
    paymentMethodId,
  ],
  findAll: () => [...paymentMethodKeys.key, "find-all"],
};

export const useGetPaymentMethod = (paymentMethodId) => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: paymentMethodKeys.findOne(paymentMethodId),
    queryFn: () => findOne(paymentMethodId, accessToken),
    enabled: !!paymentMethodId,
  });
};

export const useGetPaymentMethods = () => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: paymentMethodKeys.findAll(),
    queryFn: () => findAll(accessToken),
  });
};

export const useCreatePaymentMethod = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

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
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: (sessionId) => findSession(sessionId, accessToken),
  });
};

export const useRemovePaymentMethod = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: (paymentMethodId) => remove(paymentMethodId, accessToken),
    onSuccess: (_, paymentMethodId) => {
      queryClient.removeQueries(paymentMethodKeys.findOne(paymentMethodId));
      return queryClient.invalidateQueries(paymentMethodKeys.findAll());
    },
  });
};
