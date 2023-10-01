import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create, findAll, findOne, remove, update } from "../api";

const addressKeys = {
  key: ["address"],
  findOne: (addressId) => [...addressKeys.key, "find-one", addressId],
  findAllKey: () => [...addressKeys.key, "find-all"],
  findAll: (query) => [...addressKeys.findAllKey(), query],
};

export const useGetAddress = (addressId) => {
  return useQuery({
    queryKey: addressKeys.findOne(addressId),
    queryFn: () => findOne(addressId),
    enabled: Boolean(addressId),
  });
};

export const useGetAddresses = (query) => {
  return useQuery({
    queryKey: addressKeys.findAll(query),
    queryFn: () => findAll(query),
  });
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries(addressKeys.findAllKey());
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([addressId, address]) => update(addressId, address),
    onSuccess: (_, [addressId]) => {
      queryClient.invalidateQueries(addressKeys.findOne(addressId));
      queryClient.invalidateQueries(addressKeys.findAllKey());
    },
  });
};

export const useRemoveAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: remove,
    onSuccess: (_, addressId) => {
      queryClient.removeQueries(addressKeys.findOne(addressId));
      queryClient.invalidateQueries(addressKeys.findAllKey());
    },
  });
};
