import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth";
import { parseURLSearchParams } from "@/shared/utils";
import { clear, create, findAll, findOne, remove } from "../api";

const bookmarkKeys = {
  key: ["e-commerce/bookmark"],
  findOne: (id) => [...bookmarkKeys.key, "find-one", id],
  findAllKey: () => [...bookmarkKeys.key, "find-all"],
  findAll: (query) => [...bookmarkKeys.key, "find-all", query],
};

export const useGetBookmark = (productId) => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: bookmarkKeys.findOne(productId),
    queryFn: () => findOne(productId, accessToken),
    enabled: !!productId,
  });
};

export const useGetBookmarks = (query) => {
  const { accessToken } = useAuth();
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: bookmarkKeys.findAll(_query),
    queryFn: () => findAll(query, accessToken),
  });
};

export const useCreateBookmark = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: (productId) => create(productId, accessToken),
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries(bookmarkKeys.findOne(productId));
      queryClient.invalidateQueries(bookmarkKeys.findAllKey());
    },
  });
};

export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: (productId) => remove(productId, accessToken),
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries(bookmarkKeys.findOne(productId));
      queryClient.invalidateQueries(bookmarkKeys.findAllKey());
    },
  });
};

export const useClearBookmark = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: () => clear(accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries(bookmarkKeys.key);
    },
  });
};
