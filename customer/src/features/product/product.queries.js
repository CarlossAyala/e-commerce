import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from './product.api';
import { getToken } from '../../api';

export const productKeys = {
  key: ['product'],
  one: (id) => [...productKeys.key, 'one', id],
  allQAs: (id) => [...productKeys.key, 'allQA', id],
  customerQAs: (id) => [...productKeys.key, 'customerQA', id],
  productStore: (id) => [...productKeys.key, 'productStore', id],
  searchProduct: (query) => [...productKeys.key, 'search', query],
};

export const useGetProduct = (id) => {
  return useQuery({
    queryKey: productKeys.one(id),
    queryFn: () => API.getProduct(id),
    enabled: Boolean(id),
  });
};

export const useGetQAProduct = (id) => {
  return useQuery({
    queryKey: productKeys.allQAs(id),
    queryFn: () => API.getQAProduct(id),
    enabled: !!id,
  });
};

export const useGetCustomerQAProduct = (id) => {
  const token = getToken();

  return useQuery({
    queryKey: productKeys.customerQAs(id),
    queryFn: () => API.getCustomerQAProduct(id),
    enabled: !!id && !!token,
  });
};

export const useSendQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }) => API.sendQuestion(id, values),
    onSuccess: () => {
      console.log('Send it');
      queryClient.invalidateQueries(productKeys.key);
    },
  });
};

export const useSearchProducts = (q) => {
  return useQuery({
    queryKey: productKeys.searchProduct(q),
    queryFn: () => API.searchProducts(q),
  });
};
