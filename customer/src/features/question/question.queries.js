import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from './question.api';
import { getToken } from '../../api';

const questionKeys = {
  key: ['question'],
  productQAs: (id) => [...questionKeys.key, 'productQAs', id],
  customerQAs: (id) => [...questionKeys.key, 'product', id, 'customerQAs'],
};

export const useGetCustomerQAs = (id) => {
  const token = getToken();

  return useQuery({
    queryKey: questionKeys.customerQAs(id),
    queryFn: () => API.fromCustomer(id),
    enabled: Boolean(token) && Boolean(id),
  });
};

export const useGetProductQAs = (id) => {
  return useQuery({
    queryKey: questionKeys.productQAs(id),
    queryFn: () => API.fromProduct(id),
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
      queryClient.invalidateQueries(questionKeys.customerQAs(productId));
    },
  });
};
