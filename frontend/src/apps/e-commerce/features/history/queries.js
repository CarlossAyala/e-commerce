import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth";
import { parseURLSearchParams } from "@/shared/utils";
import { clear, add, findAll, remove } from "./api";

export const historyKeys = {
  key: ["ecommerce/history"],
  finAll: (query) => [...historyKeys.key, "find-all", query],
};

export const useGetHistory = (query) => {
  const { data: accessToken } = useAuth();
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: historyKeys.finAll(_query),
    queryFn: () => findAll(query, accessToken),
    enabled: !!accessToken,
  });
};

export const useAddHistory = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: (productId) => add(productId, accessToken),
    onSuccess: () => {
      return queryClient.invalidateQueries(historyKeys.key);
    },
  });
};

export const useRemoveHistory = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: (productId) => remove(productId, accessToken),
    onSuccess: () => {
      return queryClient.invalidateQueries(historyKeys.key);
    },
    meta: {
      title: "History",
    },
  });
};

export const useClearHistory = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: () => clear(accessToken),
    onSuccess: () => {
      return queryClient.invalidateQueries(historyKeys.key);
    },
    meta: {
      title: "History",
    },
  });
};
