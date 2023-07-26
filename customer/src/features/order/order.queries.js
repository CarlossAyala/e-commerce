import { useQuery } from '@tanstack/react-query';
import API from './order.api';
import { getToken } from '../../api';

const orderKeys = {
  key: ['order'],
  get: (id) => [...orderKeys.key, id],
  getAll: () => [...orderKeys.key, 'all'],
};

export const useGetOrders = () => {
  const token = getToken();

  return useQuery({
    queryKey: orderKeys.getAll(),
    queryFn: () => API.getAll(),
    enabled: !!token,
  });
};

export const useGetOrder = (id) => {
  const token = getToken();

  return useQuery({
    queryKey: orderKeys.get(id),
    queryFn: () => API.get(id),
    enabled: !!id && !!token,
  });
};
