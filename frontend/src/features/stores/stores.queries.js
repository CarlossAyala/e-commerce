import { useQuery } from '@tanstack/react-query';
import API from './stores.api';

export const storesKeys = {
  key: ['stores'],
  allFilter: (filters = {}) => [...storesKeys.key, 'all', filters],
};

export const useGetStores = (params) => {
  const filters = new URLSearchParams(params);

  return useQuery({
    queryKey: storesKeys.allFilter(Object.fromEntries(filters)),
    queryFn: () => API.getStores(filters.toString()),
  });
};
