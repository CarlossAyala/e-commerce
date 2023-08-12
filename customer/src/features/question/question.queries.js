import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from './question.api';
import { getToken } from '../../api';

const QAKeys = {
  key: ['QA'],
  customer: () => [...QAKeys.key, 'customer'],
  product: (id) => [...QAKeys.key, 'product', id],
  productCustomer: (id) => [...QAKeys.key, 'product', id, 'customer'],
};

export const useGetQAsCustomer = () => {
  const token = getToken();

  return useQuery({
    queryKey: QAKeys.customer(),
    queryFn: () => API.customer(),
    enabled: Boolean(token),
  });
};

export const useGetQAsProductCustomer = (id) => {
  const token = getToken();

  return useQuery({
    queryKey: QAKeys.productCustomer(id),
    queryFn: () => API.productCustomer(id),
    enabled: Boolean(token) && Boolean(id),
  });
};

export const useGetQAsProduct = (id) => {
  return useQuery({
    queryKey: QAKeys.product(id),
    queryFn: () => API.product(id),
    enabled: Boolean(id),
  });
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([productId, question]) => {
      return API.createQuestion(productId, question);
    },
    onSuccess: (_, [productId]) => {
      queryClient.invalidateQueries(QAKeys.customer());
      queryClient.invalidateQueries(QAKeys.productCustomer(productId));
    },
  });
};
