import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create, getStore, getStats, remove, update } from "../api";
import { authKeys, useAuth } from "@/shared/auth";

export const storeKeys = {
  key: ["store"],
  current: () => [...storeKeys.key, "current"],
  getStats: () => [...storeKeys.key, "stats"],
};

export const useGetStore = () => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: storeKeys.current(),
    queryFn: () => getStore(accessToken),
  });
};

export const useGetStoreStats = () => {
  return useQuery({
    queryKey: storeKeys.getStats(),
    queryFn: getStats,
  });
};

export const useCreateStore = () => {
  const queryClient = useQueryClient();
  const accessToken = queryClient.getQueryData(authKeys.accessToken());

  return useMutation({
    mutationFn: (values) => create(values, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: storeKeys.key,
      });
    },
  });
};

export const useUpdateStore = () => {
  const queryClient = useQueryClient();
  const accessToken = queryClient.getQueryData(authKeys.accessToken());

  return useMutation({
    mutationFn: (values) => update(values, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: storeKeys.current(),
      });
    },
  });
};

export const useDeleteStore = () => {
  const queryClient = useQueryClient();
  const accessToken = queryClient.getQueryData(authKeys.accessToken());

  return useMutation({
    mutationFn: () => remove(accessToken),
    onSuccess: async () => {
      queryClient.setQueryData(storeKeys.current(), null);
      queryClient.invalidateQueries({
        queryKey: storeKeys.key,
      });
    },
  });
};
