import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clear, create, findAll, findOne, remove } from "../api";

const bookmarkKeys = {
  key: ["bookmark"],
  findOne: (id) => [...bookmarkKeys.key, "find-one", id],
  findAll: (query) => [...bookmarkKeys.key, "find-all", query],
};

export const useGetBookmark = (bookmarkId) => {
  return useQuery({
    queryKey: bookmarkKeys.findOne(bookmarkId),
    queryFn: () => findOne(bookmarkId),
    enabled: Boolean(bookmarkId),
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
    onSuccess: () => {
      queryClient.invalidateQueries(bookmarkKeys.key);
    },
  });
};

export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries(bookmarkKeys.key);
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
