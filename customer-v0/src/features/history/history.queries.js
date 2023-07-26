import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from './history.api';

export const historyKeys = {
  key: ['history'],
  allFilter: (filters = {}) => [...historyKeys.key, 'all', filters],
};

export const useGetHistory = (params) => {
  const filters = new URLSearchParams(params);

  return useQuery({
    queryKey: historyKeys.allFilter(Object.fromEntries(filters)),
    queryFn: () => API.getHistoryProducts(filters.toString()),
  });
};

export const useAddHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => API.addToHistory(productId),
    onSuccess: () => {
      console.log('Added to history!');

      queryClient.invalidateQueries({
        queryKey: historyKeys.key,
      });
    },
  });
};

export const useRemoveHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => API.removeFromHistory(productId),
    onSuccess: () => {
      console.log('Deleted from history!');

      queryClient.invalidateQueries({
        queryKey: historyKeys.key,
      });
    },
  });
};

export const useClearHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => API.clearHistory(),
    onSuccess: () => {
      console.log('Cleared history!');

      queryClient.invalidateQueries({
        queryKey: historyKeys.key,
      });
    },
  });
};
