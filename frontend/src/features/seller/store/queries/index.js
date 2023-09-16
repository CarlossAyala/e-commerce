import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create, findOne, getStats } from "../api";

export const storeKeys = {
  key: ["store"],
  current: () => [...storeKeys.key, "current-store"],
  getStats: () => [...storeKeys.key, "stats"],
};

export const useGetStore = () => {
  return useQuery({
    queryKey: storeKeys.current(),
    queryFn: () => findOne(),
  });
};

export const useGetStoreStats = () => {
  return useQuery({
    queryKey: storeKeys.getStats(),
    queryFn: () => getStats(),
  });
};

export const useCreateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: storeKeys.key,
      });
    },
  });
};

export const useUpdateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: storeKeys.current(),
      });
    },
  });
};

export const useDeleteStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => create(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: storeKeys.key,
      });
    },
  });
};
