import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "./bookmark.api";
import { getToken } from "../../api";

const bookmarkKeys = {
  key: ["bookmark"],
  get: (id) => [...bookmarkKeys.key, "get", id],
};

export const useGetBookmark = (id) => {
  const token = getToken();

  return useQuery({
    queryKey: bookmarkKeys.get(id),
    queryFn: () => API.get(id),
    enabled: Boolean(token) && Boolean(id),
  });
};

export const useGetBookmarks = () => {
  const token = getToken();

  return useQuery({
    queryKey: bookmarkKeys.key,
    queryFn: () => API.getAll(),
    enabled: Boolean(token),
  });
};

export const useAddBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => API.add(productId),
    onSuccess: () => {
      queryClient.invalidateQueries(bookmarkKeys.key);
    },
  });
};

export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => API.remove(productId),
    onSuccess: () => {
      queryClient.invalidateQueries(bookmarkKeys.key);
    },
  });
};

export const useClearBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => API.clear(),
    onSuccess: () => {
      queryClient.invalidateQueries(bookmarkKeys.key);
    },
  });
};
