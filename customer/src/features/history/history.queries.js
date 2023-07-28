import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from './history.api';
import { getToken } from '../../api';
import { groupByMonth } from '../../utils/group-by';

const historyKeys = {
  key: ['history'],
  withParams: (params) => [...historyKeys.key, 'params', params],
};

export const useGetHistory = (params) => {
  const token = getToken();

  return useQuery({
    queryKey: historyKeys.withParams(params),
    queryFn: () => API.getHistory(params),
    enabled: !!token,
    select: (data) => groupByMonth(data?.rows, 'lastSeenAt'),
  });
};

export const useAddToHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => API.addToHistory(id),
    onSuccess: () => {
      console.log('Added to history!');

      queryClient.invalidateQueries(historyKeys.key);
    },
  });
};

export const useRemoveFromHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => API.removeFromHistory(id),
    onSuccess: () => {
      console.log('Deleted from history!');

      queryClient.invalidateQueries(historyKeys.key);
    },
  });
};

export const useClearHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => API.clearHistory(),
    onSuccess: () => {
      console.log('Cleared history!');

      queryClient.invalidateQueries(historyKeys.key);
    },
  });
};
