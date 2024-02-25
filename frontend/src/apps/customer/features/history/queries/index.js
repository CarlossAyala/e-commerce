import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clear, add, findAll, remove } from "../api";

export const historyKeys = {
  key: ["history"],
  finAll: (query) => [...historyKeys.key, "find-all", query],
};

export const useGetHistory = (query) => {
  const token = localStorageManager.getToken();

  return useQuery({
    queryKey: historyKeys.finAll(query),
    queryFn: () => findAll(query),
    enabled: !!token,
  });
};

export const useAddHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: add,
    onSuccess: () => {
      queryClient.invalidateQueries(historyKeys.key);
    },
  });
};

export const useRemoveHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries(historyKeys.key);
    },
  });
};

export const useClearHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clear,
    onSuccess: () => {
      queryClient.invalidateQueries(historyKeys.key);
    },
  });
};
