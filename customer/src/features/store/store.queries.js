import { useQuery } from '@tanstack/react-query';
import API from './store.api';
import { getToken } from '../../api';

const storeKeys = {
  key: ['store'],
  get: (id) => [...storeKeys.key, 'get', id],
};

export const useGetStore = (id) => {
  return useQuery({
    queryKey: storeKeys.get(id),
    queryFn: () => API.get(id),
    enabled: Boolean(id),
  });
};
