import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "./address.api";
import { getToken } from "../../api";

const addressKeys = {
  key: ["address"],
  get: (id) => [...addressKeys.key, id],
  getAll: () => [...addressKeys.key, "all"],
};

export const useGetAddresses = () => {
  const token = getToken();

  return useQuery({
    queryKey: addressKeys.getAll(),
    queryFn: () => API.getAll(),
    enabled: !!token,
  });
};

export const useGetAddress = (id) => {
  const token = getToken();

  return useQuery({
    queryKey: addressKeys.get(id),
    queryFn: () => API.get(id),
    enabled: !!id && !!token,
  });
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (address) => API.create(address),
    onSuccess: () => {
      queryClient.invalidateQueries(addressKeys.key);
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([addressId, address]) => API.update(addressId, address),
    onSuccess: () => {
      queryClient.invalidateQueries(addressKeys.key);
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (addressId) => API.remove(addressId),
    onSuccess: (_, addressId) => {
      queryClient.removeQueries(addressKeys.get(addressId));
      queryClient.invalidateQueries(addressKeys.key);
    },
  });
};
