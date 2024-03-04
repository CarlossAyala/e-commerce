import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create, findAll, findOne, remove, update } from "../api";
import { useAuth } from "@/shared/auth";

const addressKeys = {
  key: ["customer/address"],
  findOne: (addressId) => [...addressKeys.key, "find-one", addressId],
  findAll: () => [...addressKeys.key, "find-all"],
};

export const useGetAddress = (addressId) => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: addressKeys.findOne(addressId),
    queryFn: () => findOne(addressId, accessToken),
    enabled: !!addressId,
  });
};

export const useMGetAddress = () => {
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: (addressId) => findOne(addressId, accessToken),
  });
};

export const useGetAddresses = () => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: addressKeys.findAll(),
    queryFn: () => findAll(accessToken),
  });
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: (values) => create(values, accessToken),
    onSuccess: () => {
      return queryClient.invalidateQueries(addressKeys.findAll());
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: ({ addressId, address }) => {
      return update(addressId, address, accessToken);
    },
    onSuccess: async (_, { addressId }) => {
      await queryClient.invalidateQueries(addressKeys.findOne(addressId));
      await queryClient.invalidateQueries(addressKeys.findAll());
    },
  });
};

export const useRemoveAddress = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: (addressId) => remove(addressId, accessToken),
    onSuccess: async (_, addressId) => {
      await queryClient.invalidateQueries(addressKeys.findOne(addressId));
      await queryClient.invalidateQueries(addressKeys.findAll());
    },
  });
};
