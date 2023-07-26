import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from './bookmark.api';
import { getToken } from '../../api';
import { cartKeys } from '../cart';

const bookmarkKeys = {
  key: ['bookmark'],
};

// export const useGetBookmark = () => {};
export const useGetBookmarks = () => {
  const token = getToken();

  return useQuery({
    queryKey: bookmarkKeys.key,
    queryFn: () => API.getBookmarks(),
    enabled: !!token,
  });
};
export const useAddBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => API.addBookmark(productId),
    onSuccess: () => {
      queryClient.invalidateQueries(bookmarkKeys.key);
      queryClient.invalidateQueries(cartKeys.key);
    },
  });
};
export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => API.removeBookmark(productId),
    onSuccess: () => {
      queryClient.invalidateQueries(bookmarkKeys.key);
      queryClient.invalidateQueries(cartKeys.key);
    },
  });
};
export const useClearBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => API.clearBookmark(),
    onSuccess: () => {
      queryClient.invalidateQueries(bookmarkKeys.key);
    },
  });
};
