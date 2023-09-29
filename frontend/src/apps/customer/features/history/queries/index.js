import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clear, create, findAll, remove } from "../api";

export const historyKeys = {
  key: ["history"],
  finAll: (query) => [...historyKeys.key, "find-all", query],
};

export const useGetHistory = (query) => {
  return useQuery({
    queryKey: historyKeys.finAll(query),
    queryFn: () => findAll(query),
  });
};

export const useCreateHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: create,
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
