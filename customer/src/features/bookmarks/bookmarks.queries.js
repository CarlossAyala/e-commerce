import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from './bookmarks.api';
import { historyKeys } from '../history';
import { cartKeys } from '../cart';

export const bookmarkKeys = {
  key: ['bookmarks'],
  one: (productId) => [...bookmarkKeys.key, 'one', productId],
  allFilter: (filters = {}) => [...bookmarkKeys.key, 'all', filters],
};

export const useGetBookmark = (productId) => {
  return useQuery({
    queryKey: bookmarkKeys.one(productId),
    queryFn: () => API.getBookmark(productId),
  });
};

export const useGetBookmarks = (params) => {
  const filters = new URLSearchParams(params);

  return useQuery({
    queryKey: bookmarkKeys.allFilter(Object.fromEntries(filters)),
    queryFn: () => API.getBookmarks(filters.toString()),
  });
};

export const useAddBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => API.addBookmark(productId),
    onSuccess: () => {
      console.log('Added to bookmarks!');

      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.key,
      });
      queryClient.invalidateQueries({
        queryKey: historyKeys.key,
      });
      queryClient.invalidateQueries({
        queryKey: cartKeys.key,
      });
    },
  });
};

export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => API.removeBookmark(productId),
    onSuccess: () => {
      console.log('Bookmark deleted!');

      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.key,
      });
      queryClient.invalidateQueries({
        queryKey: historyKeys.key,
      });
      queryClient.invalidateQueries({
        queryKey: cartKeys.key,
      });
    },
  });
};

export const useClearBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => API.clearBookmarks(),
    onSuccess: () => {
      console.log('Cleared Bookmarks!');

      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.key,
      });
      queryClient.invalidateQueries({
        queryKey: historyKeys.key,
      });
      queryClient.invalidateQueries({
        queryKey: cartKeys.key,
      });
    },
  });
};
