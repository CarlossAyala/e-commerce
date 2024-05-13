import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth";
import { create, earnings, getStore, remove, update } from "./api";

export const storeKeys = {
  key: ["seller/store"],
  current: () => [...storeKeys.key, "current"],
  earnings: () => [...storeKeys.key, "earnings"],
};

export const useGetStore = () => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: storeKeys.current(),
    queryFn: () => getStore(accessToken),
  });
};

export const useCreateStore = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: (values) => create(values, accessToken),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: storeKeys.key,
      });
    },
    meta: {
      title: "Store",
    },
  });
};

export const useUpdateStore = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: (formData) => update(formData, accessToken),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: storeKeys.current(),
      });
    },
    meta: {
      title: "Store",
    },
  });
};

export const useDeleteStore = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: () => remove(accessToken),
    onSuccess: () => {
      queryClient.setQueryData(storeKeys.current(), null);
    },
    meta: {
      title: "Store",
    },
  });
};

export const useGetStoreEarnings = () => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: storeKeys.earnings(),
    queryFn: () => earnings(accessToken),
  });
};
