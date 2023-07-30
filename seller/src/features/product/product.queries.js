import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from './product.api';

const systemUiKeys = {
  key: ['systemUi'],
  categories: (filters) => [...systemUiKeys.key, 'categories', filters],
};

const categoyKeys = {
  key: ['category'],
  getOne: (id) => [...categoyKeys.key, id],
};

const productKeys = {
  key: ['product'],
  getOne: (id) => [...productKeys.key, 'one', id],
  all: (filters) => [...productKeys.key, 'all', filters],
};

const questionKeys = {
  key: ['question'],
  getOne: (id) => [...questionKeys.key, 'one', id],
  all: (filters) => [...questionKeys.key, 'all', filters],
  product: (id, query) => [...questionKeys.key, 'product', id, query],
};

export const useSearchCategories = (filters) => {
  const params = new URLSearchParams(filters);

  return useQuery({
    queryKey: systemUiKeys.categories(Object.fromEntries(params)),
    queryFn: () => API.searchCategories(params.toString()),
    initialData: { count: 0, rows: [] },
  });
};

export const useGetCategory = (id) => {
  return useQuery({
    queryKey: categoyKeys.getOne(id),
    queryFn: () => API.getCategory(id),
    enabled: !!id,
  });
};

export const usePublish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => API.publishProduct(data),
    onSuccess: () => {
      console.log('Product published successfully');

      queryClient.invalidateQueries(productKeys.key);
    },
  });
};

export const useGetProducts = (filters) => {
  const params = new URLSearchParams(filters);

  return useQuery({
    queryKey: productKeys.all(Object.fromEntries(params)),
    queryFn: () => API.getProducts(params.toString()),
  });
};

export const useGetProduct = (id) => {
  return useQuery({
    queryKey: productKeys.getOne(id),
    queryFn: () => API.getProduct(id),
    enabled: !!id,
  });
};

export const useEditProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }) => API.editProduct(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.key,
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => API.deleteProduct(id),
    onSuccess: (_, keyToRemove) => {
      console.log('Product deleted successfully');
      console.log('keyToRemove', keyToRemove);

      queryClient.removeQueries({
        queryKey: productKeys.getOne(keyToRemove),
      });

      queryClient.invalidateQueries({
        queryKey: productKeys.key,
      });
    },
  });
};

// PRODUCT QUESTIONS
export const useGetQuestion = (questionId) => {
  return useQuery({
    queryKey: questionKeys.getOne(questionId),
    queryFn: () => API.getQuestion(questionId),
    enabled: !!questionId,
  });
};

export const useGetQuestions = (query) => {
  return useQuery({
    queryKey: questionKeys.all(query),
    queryFn: () => API.getQuestions(query),
  });
};

export const useProductQuestions = (id, query) => {
  return useQuery({
    queryKey: questionKeys.product(id, query),
    queryFn: () => API.getProductQuestions(id, query),

    enabled: !!id,
  });
};

export const useSendAnswerToQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }) => API.sendAnswerToQuestion(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: questionKeys.key,
      });
    },
  });
};

export const useSendStateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }) => API.sendStateQuestion(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: questionKeys.key,
      });
    },
  });
};
