import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create, findAll, findOne, remove, update } from "../api";

const addressKeys = {
  key: ["address"],
  findOne: (addressId) => [...addressKeys.key, "find-one", addressId],
  findAll: () => [...addressKeys.key, "find-all"],
};

export const useGetAddress = (addressId) => {
  return useQuery({
    queryKey: addressKeys.findOne(addressId),
    queryFn: () => findOne(addressId),
    enabled: Boolean(addressId),
  });
};

export const useMGetAddress = () => {
  return useMutation({
    mutationFn: (addressId) => findOne(addressId),
  });
};

export const useGetAddresses = () => {
  return useQuery({
    queryKey: addressKeys.findAll(),
    queryFn: () => findAll(),
  });
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries(addressKeys.findAll());
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([addressId, address]) => update(addressId, address),
    onSuccess: (_, [addressId]) => {
      queryClient.invalidateQueries(addressKeys.findOne(addressId));
      queryClient.invalidateQueries(addressKeys.findAll());
    },
  });
};

export const useRemoveAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: remove,
    onSuccess: (_, addressId) => {
      queryClient.removeQueries(addressKeys.findOne(addressId));
      queryClient.invalidateQueries(addressKeys.findAll());
    },
  });
};
