import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth";
import { parseURLSearchParams } from "@/shared/utils";
import {
  create,
  createRequestVerify,
  getStore,
  remove,
  requestsVerify,
  update,
} from "../api";

export const storeKeys = {
  key: ["seller/store"],
  current: () => [...storeKeys.key, "current"],
  requestsVerifyKey: () => [...storeKeys.key, "requests-verify"],
  requestsVerify: (query) => [...storeKeys.requestsVerifyKey(), query],
};

export const useGetStore = () => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: storeKeys.current(),
    queryFn: () => getStore(accessToken),
  });
};

export const useGetRequestsVerify = (query) => {
  const { accessToken } = useAuth();
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: storeKeys.requestsVerify(_query),
    queryFn: () => requestsVerify(query, accessToken),
  });
};

export const useCreateStore = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

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

export const useCreateRequestVerify = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: (values) => createRequestVerify(values, accessToken),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: storeKeys.requestsVerifyKey(),
      });
    },
    meta: {
      title: "Request Official Store",
    },
  });
};

export const useUpdateStore = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: (values) => update(values, accessToken),
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
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: () => remove(accessToken),
    onSuccess: async () => {
      queryClient.setQueryData(storeKeys.current(), null);
      return queryClient.invalidateQueries({
        queryKey: storeKeys.key,
      });
    },
    meta: {
      title: "Store",
    },
  });
};
