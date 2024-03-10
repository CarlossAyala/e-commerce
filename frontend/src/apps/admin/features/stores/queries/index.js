import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { parseURLSearchParams } from "@/shared/utils";
import { useAuth } from "@/shared/auth";
import {
  findAll,
  findAllRequestsVerify,
  findOne,
  updateRequestVerify,
} from "../api";

const storeKeys = {
  key: ["admin/stores"],
  findOne: (storeId) => [...storeKeys.key, "find-one", storeId],
  findAllKey: () => [...storeKeys.key, "find-all"],
  findAll: (query) => [...storeKeys.findAllKey(), query],
  findAllRequestsVerifyKey: () => [
    ...storeKeys.key,
    "find-all-requests-verify",
  ],
  findAllRequestsVerify: (query) => [
    ...storeKeys.findAllRequestsVerifyKey(),
    query,
  ],
};

export const useGetStores = (query) => {
  const { accessToken } = useAuth();
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: storeKeys.findAll(_query),
    queryFn: () => findAll(query, accessToken),
  });
};

export const useGetStore = (storeId) => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: storeKeys.findOne(storeId),
    queryFn: () => findOne(storeId, accessToken),
    enabled: !!storeId,
  });
};

export const useGetRequestsVerify = (query) => {
  const { accessToken } = useAuth();
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: storeKeys.findAllRequestsVerify(_query),
    queryFn: () => findAllRequestsVerify(query, accessToken),
  });
};

export const useUpdateRequestVerify = (requestId) => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: (values) => updateRequestVerify(requestId, values, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: storeKeys.key,
      });
    },
  });
};
