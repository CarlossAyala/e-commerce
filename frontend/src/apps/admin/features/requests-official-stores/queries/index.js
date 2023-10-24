import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { findAll, findHistory, findOne, update } from "../api";

const requestOfficialStoreKeys = {
  key: ["admin/official-store"],
  findAllKey: () => [...requestOfficialStoreKeys.key, "find-all"],
  findAll: (query) => [...requestOfficialStoreKeys.findAllKey(), query],
  findOne: (requestId) => [
    ...requestOfficialStoreKeys.key,
    "find-one",
    requestId,
  ],
  findHistoryKey: (requestId) => [
    ...requestOfficialStoreKeys.key,
    "find-history",
    requestId,
  ],
  findHistory: (requestId, query) => [
    ...requestOfficialStoreKeys.findHistoryKey(requestId),
    query,
  ],
};

export const useGetRequestsOfficialStores = (query) => {
  return useQuery({
    queryKey: requestOfficialStoreKeys.findAll(query),
    queryFn: () => findAll(query),
  });
};

export const useGetRequestOfficialStore = (requestId) => {
  return useQuery({
    queryKey: requestOfficialStoreKeys.findOne(requestId),
    queryFn: () => findOne(requestId),
    enabled: !!requestId,
  });
};

export const useGetHistoryRequestsOfficialStore = (requestId, query) => {
  return useQuery({
    queryKey: requestOfficialStoreKeys.findHistory(requestId, query),
    queryFn: () => findHistory(requestId, query),
    enabled: !!requestId,
  });
};

export const useUpdateRequestOfficialStore = (requestId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => update(requestId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: requestOfficialStoreKeys.key,
      });
    },
  });
};
