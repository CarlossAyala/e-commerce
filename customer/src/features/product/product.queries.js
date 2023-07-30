import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from './product.api';
import { getToken } from '../../api';

export const productKeys = {
  key: ['product'],
  one: (id) => [...productKeys.key, 'one', id],
  allQAs: (id) => [...productKeys.key, 'allQA', id],
  searchProduct: (query) => [...productKeys.key, 'search', query],
};

export const useGetProduct = (id) => {
  return useQuery({
    queryKey: productKeys.one(id),
    queryFn: () => API.getProduct(id),
    enabled: Boolean(id),
  });
};

export const useSearchProducts = (params) => {
  return useQuery({
    queryKey: productKeys.searchProduct(params),
    queryFn: () => API.searchProducts(params),
  });
};
