import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { createQueryKey } from "@/shared/utils";
import { create, findAll, findOne, remove, update } from "./api";

const addressKeys = {
  key: createQueryKey({
    prefix: "ecommerce",
    entity: "addresses",
    config: {
      removeOnSignout: true,
    },
  }),
  findOne: (addressId) => [...addressKeys.key, "find-one", addressId],
  findAll: () => [...addressKeys.key, "find-all"],
};

export const useGetAddress = (addressId) => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: addressKeys.findOne(addressId),
    queryFn: () => findOne(addressId, accessToken),
    enabled: !!addressId,
  });
};

export const useMGetAddress = () => {
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: (addressId) => findOne(addressId, accessToken),
  });
};

export const useGetAddresses = () => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: addressKeys.findAll(),
    queryFn: () => findAll(accessToken),
  });
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: (values) => create(values, accessToken),
    onSuccess: () => {
      return queryClient.invalidateQueries(addressKeys.findAll());
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: ({ addressId, values }) => {
      return update(addressId, values, accessToken);
    },
    onSuccess: (_, { addressId }) => {
      queryClient.invalidateQueries(addressKeys.findOne(addressId));
      queryClient.invalidateQueries(addressKeys.findAll());
    },
  });
};

export const useRemoveAddress = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: (addressId) => remove(addressId, accessToken),
    onSuccess: (_, addressId) => {
      queryClient.invalidateQueries(addressKeys.findOne(addressId));
      queryClient.invalidateQueries(addressKeys.findAll());
    },
  });
};
