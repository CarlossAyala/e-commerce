import { useQuery } from '@tanstack/react-query';
import API from './store.api';

const storeKeys = {
  key: ['store'],
  get: (slug) => [...storeKeys.key, 'slug', slug],
  getAll: () => [...storeKeys.key, 'get-all'],
  products: (slug) => [...storeKeys.key, 'products', slug],
};

export const useGetStore = (slug) => {
  return useQuery({
    queryKey: storeKeys.get(slug),
    queryFn: () => API.get(slug),
    enabled: Boolean(slug),
  });
};

export const useGetStores = () => {
  return useQuery({
    queryKey: storeKeys.getAll(),
    queryFn: () => API.getAll(),
  });
};

export const useGetStoreProducts = (slug) => {
  return useQuery({
    queryKey: storeKeys.products(slug),
    queryFn: () => API.getProducts(slug),
    enabled: Boolean(slug),
  });
};
