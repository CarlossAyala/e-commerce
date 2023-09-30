import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clear, create, findAll, findOne, remove } from "../api";

const bookmarkKeys = {
  key: ["bookmark"],
  findOne: (id) => [...bookmarkKeys.key, "find-one", id],
  findAllKey: () => [...bookmarkKeys.key, "find-all"],
  findAll: (query) => [...bookmarkKeys.key, "find-all", query],
};

export const useGetBookmark = (productId) => {
  return useQuery({
    queryKey: bookmarkKeys.findOne(productId),
    queryFn: () => findOne(productId),
    enabled: Boolean(productId),
  });
};

export const useGetBookmarks = (query) => {
  return useQuery({
    queryKey: bookmarkKeys.findAll(query),
    queryFn: () => findAll(query),
  });
};

export const useCreateBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: create,
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries(bookmarkKeys.findOne(productId));
      queryClient.invalidateQueries(bookmarkKeys.findAllKey());
    },
  });
};

export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: remove,
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries(bookmarkKeys.findOne(productId));
      queryClient.invalidateQueries(bookmarkKeys.findAllKey());
    },
  });
};

export const useClearBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => clear(),
    onSuccess: () => {
      queryClient.invalidateQueries(bookmarkKeys.key);
    },
  });
};
